export const runtime = "nodejs";
import { getPool } from "@/lib/db";
import { verifyDraft } from "@/lib/draft";
import { paypalCreateOrder } from "@/lib/paypal";
import { getServerQuote } from "@/lib/quote";
import { nanoid } from "nanoid";

export async function POST(req) {
  try {
    const { draftId, customer } = await req.json();
    if (!draftId || !customer?.email) throw new Error("Missing draft/customer");

    const draft = verifyDraft(draftId);
    const quote = await getServerQuote({ items: draft.items, coupon: draft.coupon });

    const pp = await paypalCreateOrder({
      total_cents: quote.total_cents,
      currency: quote.currency,
    });

    const pool = getPool();

    await pool.query(
      "INSERT INTO customers (email, name, phone) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE name=VALUES(name), phone=VALUES(phone)",
      [customer.email, customer.name || "", customer.phone || ""]
    );
    const [cRows] = await pool.query("SELECT id FROM customers WHERE email=? LIMIT 1", [customer.email]);
    const customerId = cRows[0].id;

    const publicId = nanoid(12);
    await pool.query(
      `INSERT INTO orders
        (public_id, customer_id, customer_email, customer_name, status, currency,
         subtotal_cents, discount_cents, shipping_cents, tax_cents, total_cents, paypal_order_id)
       VALUES (?, ?, ?, ?, 'pending', ?, ?, ?, ?, ?, ?, ?)`,
      [
        publicId, customerId, customer.email, customer.name || "",
        quote.currency, quote.subtotal_cents, quote.discount_cents,
        quote.shipping_cents, quote.tax_cents, quote.total_cents, pp.id,
      ]
    );

    const [[{ id: orderId }]] = await Promise.all([
      pool.query("SELECT id FROM orders WHERE public_id=? LIMIT 1", [publicId]),
    ]);

    const values = quote.items.map(li => [
      orderId, li.product_id, li.title, li.format, li.sku,
      li.unit_price_cents, li.quantity, li.line_total_cents, li.is_digital ? 1 : 0
    ]);

    await pool.query(
      `INSERT INTO order_items
        (order_id, product_id, title, format, sku, unit_price_cents, quantity, line_total_cents, is_digital)
       VALUES ?`,
      [values]
    );

    return new Response(JSON.stringify({ paypalOrderId: pp.id, publicId }), { status: 200 });
  } catch (e) {
    console.error("POST /api/checkout/paypal/create error", e);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
