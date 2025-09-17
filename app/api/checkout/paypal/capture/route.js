export const runtime = "nodejs";
import { getPool } from "@/lib/db";
import { sendOrderEmails } from "@/lib/email";
import { paypalCaptureOrder } from "@/lib/paypal";
import { nanoid } from "nanoid";

export async function POST(req) {
  try {
    const { paypalOrderId } = await req.json();
    if (!paypalOrderId) throw new Error("Missing paypalOrderId");

    const pool = getPool();
    const [ordersRows] = await pool.query(
      "SELECT * FROM orders WHERE paypal_order_id=? LIMIT 1",
      [paypalOrderId]
    );
    const order = ordersRows[0];
    if (!order) throw new Error("Order not found");

    const cap = await paypalCaptureOrder(paypalOrderId);
    const pu = cap?.purchase_units?.[0];
    const capObj = pu?.payments?.captures?.[0] || pu?.payments?.authorizations?.[0];
    if (!capObj) throw new Error("No capture");
    const amountCents = Math.round(Number(capObj.amount.value) * 100);
    const currency = capObj.amount.currency_code;

    if (currency !== order.currency || amountCents !== order.total_cents) {
      throw new Error("PayPal amount/currency mismatch");
    }

    await pool.query(
      `INSERT IGNORE INTO payments (order_id, provider, remote_id, amount_cents, currency, status)
       VALUES (?, 'paypal', ?, ?, ?, ?)`,
      [order.id, capObj.id, amountCents, currency, capObj.status || "COMPLETED"]
    );

    await pool.query(
      "UPDATE orders SET status='paid', paid_at=NOW() WHERE id=? AND status<>'paid'",
      [order.id]
    );

    const [items] = await pool.query("SELECT * FROM order_items WHERE order_id=?", [order.id]);

    const digitalItems = items.filter(i => i.is_digital);
    if (digitalItems.length) {
      const skus = [...new Set(digitalItems.map(i => i.sku))];
      const [pfr] = await pool.query(
        "SELECT sku, file_url FROM product_formats WHERE sku IN (?)",
        [skus]
      );
      const bySku = new Map(pfr.map(r => [r.sku, r.file_url]));

      const rows = digitalItems.map(it => [
        order.id,
        nanoid(40),
        it.format,
        bySku.get(it.sku) || "",
        new Date(Date.now() + 7 * 24 * 3600 * 1000), // 7 days
        0, // download_count
        5, // max_downloads
      ]);

      await pool.query(
        `INSERT INTO downloads
          (order_id, download_token, format, file_url, expires_at, download_count, max_downloads)
         VALUES ?`,
        [rows]
      );
    }

    const [downloads] = await pool.query(
      "SELECT download_token FROM downloads WHERE order_id=?",
      [order.id]
    );

    await sendOrderEmails({ order, items, downloads });

    return new Response(JSON.stringify({ ok: true, publicId: order.public_id }), { status: 200 });
  } catch (e) {
    console.error("POST /api/checkout/paypal/capture error", e);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
