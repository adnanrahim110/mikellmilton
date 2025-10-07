export const runtime = "nodejs";

import { getPool } from "@/lib/db";
import { sendOrderEmails } from "@/lib/email";
import { NextResponse } from "next/server";

export async function POST(_req, ctx) {
  const { publicId } = await ctx.params;
  if (!publicId) {
    return NextResponse.json({ error: "Missing publicId" }, { status: 400 });
  }

  const pool = getPool();

  try {
    const [oRows] = await pool.query(
      "SELECT * FROM orders WHERE public_id=? LIMIT 1",
      [publicId]
    );
    const order = oRows?.[0];
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    let recipient = (order.email || "").trim();
    if (!recipient) {
      const [coRows] = await pool.query(
        "SELECT customer_email FROM checkout_orders WHERE paypal_order_id=? LIMIT 1",
        [order.paypal_order_id || publicId]
      );
      const co = coRows?.[0];
      if (co?.customer_email) recipient = String(co.customer_email).trim();
    }
    if (!recipient) {
      return NextResponse.json(
        { error: "We couldn’t find an email address for this order." },
        { status: 400 }
      );
    }

    const [iRows] = await pool.query(
      `SELECT oi.*, p.title AS product_title
       FROM order_items oi
       LEFT JOIN products p ON p.id = oi.product_id
       WHERE oi.order_id=?`,
      [order.id]
    );
    const items = (iRows || []).map(r => ({
      id: r.id,
      title: r.product_title || r.title_snapshot || "Item",
      format: r.format || null,
      quantity: r.quantity ?? 1,
      price_cents: r.unit_price_cents ?? null,
      sku: r.sku || null,
    }));

    const [dRows] = await pool.query(
      "SELECT download_token, format FROM downloads WHERE order_id=?",
      [order.id]
    );
    const downloads = (dRows || []).map(r => ({
      download_token: r.download_token,
      format: r.format || null,
    }));

    await sendOrderEmails({ order, items, downloads, recipient });

    try {
      await pool.query(
        "UPDATE orders SET email_sent=1, email_error=NULL, email_error_message=NULL WHERE id=?",
        [order.id]
      );
    } catch { }
    try {
      await pool.query(
        "UPDATE checkout_orders SET email_sent=1, email_error=NULL, email_error_message=NULL WHERE paypal_order_id=?",
        [order.paypal_order_id || null]
      );
    } catch { }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    const raw = String((err && (err.response || err.message)) || err || "");
    let message = "Something went wrong while sending your email.";
    if (/mailbox unavailable|user unknown|invalid recipient|550|553|relay denied|mailbox full|spam/i.test(raw)) {
      message = "Recipient address was rejected by the mail server.";
    }

    try {
      const [oRows] = await pool.query(
        "SELECT id, paypal_order_id FROM orders WHERE public_id=? LIMIT 1",
        [publicId]
      );
      const or2 = oRows?.[0];
      if (or2) {
        try {
          await pool.query(
            "UPDATE orders SET email_sent=0, email_error=1, email_error_message=? WHERE id=?",
            [message, or2.id]
          );
        } catch { }
        try {
          await pool.query(
            "UPDATE checkout_orders SET email_sent=0, email_error=1, email_error_message=? WHERE paypal_order_id=?",
            [message, or2.paypal_order_id || null]
          );
        } catch { }
      }
    } catch { }

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
