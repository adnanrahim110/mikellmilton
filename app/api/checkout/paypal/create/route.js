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

    const pp = await paypalCreateOrder({ total: quote.total_cents, currency: quote.currency });

    const pool = getPool();
    await pool.query(
      "INSERT INTO customers (email, name, phone) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE name=VALUES(name), phone=VALUES(phone)",
      [customer.email, customer.name || null, customer.phone || null]
    );
    const [cRow] = await pool.query("SELECT id FROM customers WHERE email=? LIMIT 1", [customer.email]);
    const customerId = cRow[0]?.id;

    const publicId = nanoid(12);
    const [orderRes] = await pool.query(
      `INSERT INTO orders (public_id, customer_id, email, phone, status, currency,
        subtotal_cents, discount_cents, shipping_cents, tax_cents, total_cents, shipping_option, paypal_order_id)
       VALUES (?, ?, ?, ?, 'pending', ?, ?, ?, ?, ?, ?, 'digital', ?)`,
      [
        publicId, customerId || null, customer.email, customer.phone || null,
        quote.currency, quote.subtotal_cents, quote.discount_cents,
        quote.shipping_cents, quote.tax_cents, quote.total_cents, pp.id
      ]
    );
    const orderId = orderRes.insertId;

    const values = quote.lines.map(l => [
      orderId, l.productId, l.format, l.sku, l.title, l.unit_price_cents, l.quantity, l.line_total_cents
    ]);
    await pool.query(
      `INSERT INTO order_items (order_id, product_id, format, sku, title_snapshot, unit_price_cents, quantity, line_total_cents)
       VALUES ?`, [values]
    );

    const approve = (pp.links || []).find(l => l.rel === "approve")?.href || null;
    return new Response(JSON.stringify({ orderId, publicId, paypalOrderId: pp.id, approveUrl: approve }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 400 });
  }
}
