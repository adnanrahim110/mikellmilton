export const runtime = "nodejs";

import { getPool } from "@/lib/db";
import { sendOrderEmails } from "@/lib/email";
import { paypalCaptureOrder } from "@/lib/paypal";
import crypto from "crypto";

function centsFromPayPalAmount(obj) {
  const val = obj?.value;
  if (typeof val !== "string") return null;
  const n = Math.round(parseFloat(val) * 100);
  return Number.isFinite(n) ? n : null;
}
function uuid() {
  return crypto.randomUUID();
}
function makePublicId() {
  return Buffer.from(crypto.randomBytes(9)).toString("base64url").slice(0, 12);
}

export async function POST(req) {
  const pool = getPool();
  const conn = await pool.getConnection();
  try {
    const { paypalOrderId } = await req.json();
    if (!paypalOrderId) {
      return new Response(JSON.stringify({ error: "Missing paypalOrderId" }), { status: 400 });
    }

    const cap = await paypalCaptureOrder(paypalOrderId);
    const pu = cap?.purchase_units?.[0];
    const amt = pu?.payments?.captures?.[0]?.amount || pu?.amount;
    const currency = amt?.currency_code || "USD";
    const total_cents = centsFromPayPalAmount(amt) ?? 0;
    const captureId = pu?.payments?.captures?.[0]?.id || cap?.id || null;
    const payerEmail =
      cap?.payer?.email_address ||
      pu?.payee?.email_address ||
      null;
    const payerName = [cap?.payer?.name?.given_name, cap?.payer?.name?.surname].filter(Boolean).join(" ") || null;

    const [coRows] = await pool.query(
      "SELECT * FROM checkout_orders WHERE paypal_order_id=? LIMIT 1",
      [paypalOrderId]
    );
    const checkout = coRows?.[0] || null;
    if (!checkout) {
      return new Response(JSON.stringify({ error: "No checkout order found for this PayPal order" }), { status: 404 });
    }

    let items;
    try {
      items = JSON.parse(checkout.items_json || "[]");
    } catch {
      items = [];
    }
    if (!Array.isArray(items) || !items.length) {
      return new Response(JSON.stringify({ error: "Empty cart in checkout order" }), { status: 422 });
    }

    const skus = items.map(i => String(i.sku));
    const [fmtRows] = await pool.query(
      `SELECT pf.*, p.title AS product_title
       FROM product_formats pf
       JOIN products p ON p.id = pf.product_id
       WHERE pf.sku IN (${skus.map(() => "?").join(",")})`,
      skus
    );
    if (!fmtRows.length) {
      return new Response(JSON.stringify({ error: "SKUs not found" }), { status: 422 });
    }
    const fmtBySku = Object.fromEntries(fmtRows.map(r => [r.sku, r]));

    await conn.beginTransaction();

    let public_id;
    while (true) {
      public_id = makePublicId();
      const [ck] = await conn.query("SELECT id FROM orders WHERE public_id=? LIMIT 1", [public_id]);
      if (ck.length === 0) break;
    }

    const email = checkout.customer_email || payerEmail || "";
    const name = checkout.customer_name || payerName || null;

    const [orderRes] = await conn.query(
      `INSERT INTO orders
        (public_id, customer_id, email, status, currency,
         subtotal_cents, discount_cents, shipping_cents, tax_cents, total_cents,
         shipping_option, paypal_order_id, paypal_capture_id)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        public_id, null, email || "",
        "paid", currency,
        checkout.total_cents - 0, 0, 0, 0, total_cents,
        "digital", paypalOrderId, captureId
      ]
    );
    const orderId = orderRes.insertId;

    for (const it of items) {
      const sku = String(it.sku);
      const qty = Math.max(1, parseInt(it.quantity ?? 1, 10) || 1);
      const fmt = fmtBySku[sku];
      if (!fmt) continue;

      const unit = fmt.price_cents ?? 0;
      const line = unit * qty;

      await conn.query(
        `INSERT INTO order_items
          (order_id, product_id, format, sku, title_snapshot, unit_price_cents, quantity, line_total_cents)
         VALUES (?,?,?,?,?,?,?,?)`,
        [
          orderId, fmt.product_id, fmt.format, sku,
          fmt.product_title, unit, qty, line
        ]
      );

      if (fmt.is_digital && fmt.file_url) {
        const token = uuid();
        const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        await conn.query(
          `INSERT INTO downloads
            (order_id, product_id, format, file_url, download_token, expires_at, download_count, max_downloads)
           VALUES (?,?,?,?,?,?,?,?)`,
          [
            orderId, fmt.product_id, fmt.format, fmt.file_url, token, expiresAt, 0, 5
          ]
        );
      }
    }

    await conn.query(
      `INSERT INTO payments
        (order_id, provider, status, amount_cents, currency, remote_id, raw_json)
       VALUES (?,?,?,?,?,?,?)`,
      [orderId, "paypal", "captured", total_cents, currency, captureId || paypalOrderId, JSON.stringify(cap)]
    );

    await conn.query(
      "UPDATE checkout_orders SET status='CAPTURED', updated_at=NOW() WHERE id=?",
      [checkout.id]
    );

    await conn.commit();

    try {
      const [oRows] = await pool.query(
        "SELECT * FROM orders WHERE public_id=? LIMIT 1",
        [public_id]
      );
      const orderRow = oRows?.[0];

      if (orderRow) {
        let recipient = (orderRow.email || "").trim();
        if (!recipient) {
          const [coRows2] = await pool.query(
            "SELECT customer_email FROM checkout_orders WHERE paypal_order_id=? LIMIT 1",
            [paypalOrderId]
          );
          const co2 = coRows2?.[0];
          if (co2?.customer_email) recipient = String(co2.customer_email).trim();
        }
        if (!recipient) {
          const ppEmail =
            cap?.payer?.email_address ||
            cap?.purchase_units?.[0]?.payee?.email_address ||
            null;
          if (ppEmail) recipient = String(ppEmail).trim();
        }

        if (recipient && !orderRow.email) {
          try {
            await pool.query("UPDATE orders SET email=? WHERE id=?", [recipient, orderRow.id]);
            orderRow.email = recipient;
          } catch { }
        }

        if (!recipient) {
          const message = "We couldn’t find an email address for this order.";
          try {
            await pool.query(
              "UPDATE orders SET email_sent=0, email_error=1, email_error_message=? WHERE id=?",
              [message, orderRow.id]
            );
          } catch { }
          try {
            await pool.query(
              "UPDATE checkout_orders SET email_sent=0, email_error=1, email_error_message=? WHERE paypal_order_id=?",
              [message, paypalOrderId || null]
            );
          } catch { }
        } else {
          const [iRows] = await pool.query(
            `SELECT oi.*, p.title AS product_title
             FROM order_items oi
             LEFT JOIN products p ON p.id = oi.product_id
             WHERE oi.order_id=?`,
            [orderRow.id]
          );
          const itemsForEmail = (iRows || []).map(r => ({
            id: r.id,
            title: r.product_title || r.title_snapshot || "Item",
            format: r.format || null,
            quantity: r.quantity ?? 1,
            price_cents: r.unit_price_cents ?? null,
            sku: r.sku || null,
          }));

          const [dRows] = await pool.query(
            "SELECT download_token, format FROM downloads WHERE order_id=?",
            [orderRow.id]
          );
          const downloadsForEmail = (dRows || []).map(r => ({
            download_token: r.download_token,
            format: r.format || null,
          }));

          await sendOrderEmails({
            order: orderRow,
            items: itemsForEmail,
            downloads: downloadsForEmail,
            recipient,
          });

          try {
            await pool.query(
              "UPDATE orders SET email_sent=1, email_error=NULL, email_error_message=NULL WHERE id=?",
              [orderRow.id]
            );
          } catch { }
          try {
            await pool.query(
              "UPDATE checkout_orders SET email_sent=1, email_error=NULL, email_error_message=NULL WHERE paypal_order_id=?",
              [orderRow.paypal_order_id || paypalOrderId || null]
            );
          } catch { }
        }
      }
    } catch (emailErr) {
      console.error("Order email failed", emailErr);
      const raw = String((emailErr && (emailErr.response || emailErr.message)) || emailErr || "");
      let message = "Something went wrong while sending your email.";
      if (/mailbox unavailable|user unknown|invalid recipient|550|553|relay denied|mailbox full|spam/i.test(raw)) {
        message = "Recipient address was rejected by the mail server.";
      }
      try {
        const [oRows2] = await pool.query(
          "SELECT id, paypal_order_id FROM orders WHERE public_id=? LIMIT 1",
          [public_id]
        );
        const or2 = oRows2?.[0];
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
              [message, or2.paypal_order_id || paypalOrderId || null]
            );
          } catch { }
        }
      } catch { }
    }

    const next = `/download/${encodeURIComponent(public_id)}`;
    return new Response(JSON.stringify({ ok: true, next, capture: cap }), { status: 200 });
  } catch (e) {
    try { await conn.rollback(); } catch { }
    console.error("POST /api/checkout/paypal/capture error", e);
    return new Response(JSON.stringify({ error: e.message || "Server error" }), { status: 500 });
  } finally {
    try { conn.release(); } catch { }
  }
}
