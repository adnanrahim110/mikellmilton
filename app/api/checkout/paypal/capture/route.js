export const runtime = "nodejs";
import { getPool } from "@/lib/db";
import { sendOrderEmails } from "@/lib/email";
import { paypalCaptureOrder } from "@/lib/paypal";

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0, v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export async function POST(req) {
  try {
    const { paypalOrderId } = await req.json();
    if (!paypalOrderId) throw new Error("Missing paypalOrderId");

    const cap = await paypalCaptureOrder(paypalOrderId);
    const capture = cap?.purchase_units?.[0]?.payments?.captures?.[0]
      || cap?.purchase_units?.[0]?.payments?.authorizations?.[0];
    if (!capture) throw new Error("No capture");
    const amountCents = Math.round(Number(capture.amount.value) * 100);
    const currency = capture.amount.currency_code;

    const pool = getPool();
    const [orders] = await pool.query(`SELECT * FROM orders WHERE paypal_order_id=? LIMIT 1`, [paypalOrderId]);
    const order = orders[0];
    if (!order) throw new Error("Order not found");
    if (order.total_cents !== amountCents || order.currency !== currency) throw new Error("Capture amount mismatch");

    await pool.query(`UPDATE orders SET status='paid', paypal_capture_id=?, updated_at=NOW() WHERE id=?`, [capture.id, order.id]);
    await pool.query(
      `INSERT INTO payments (order_id, provider, status, amount_cents, currency, remote_id, raw_json)
       VALUES (?, 'paypal', 'captured', ?, ?, ?, ?)`,
      [order.id, amountCents, currency, capture.id, JSON.stringify(cap)]
    );

    // Create download tokens for all digital items
    const [items] = await pool.query(`SELECT * FROM order_items WHERE order_id=?`, [order.id]);
    for (const it of items) {
      if (it.format === "ebook" || it.format === "audiobook") {
        const [fmt] = await pool.query(`SELECT file_url FROM product_formats WHERE sku=? LIMIT 1`, [it.sku]);
        const url = fmt[0]?.file_url || "";
        const token = uuidv4();
        const exp = new Date(Date.now() + 1000 * 60 * 60 * 24 * 14); // 14 days
        await pool.query(
          `INSERT INTO downloads (order_id, product_id, format, file_url, download_token, expires_at)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [order.id, it.product_id, it.format, url, token, exp]
        );
      }
    }

    // Build download page URL
    const downloadUrl = `${process.env.APP_URL}/download/${order.public_id}`;

    // Try sending email, but do not block redirect if it fails
    let emailWarning = false;
    try {
      await sendOrderEmails({ order, items, downloadUrl });
    } catch {
      emailWarning = true;
    }

    return new Response(
      JSON.stringify({
        orderId: order.id,
        publicId: order.public_id,
        status: "paid",
        next: `/download/${order.public_id}${emailWarning ? "?email=failed" : ""}`,
        emailWarning
      }),
      { status: 200 }
    );
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 400 });
  }
}
