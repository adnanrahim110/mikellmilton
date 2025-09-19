// app/api/checkout/paypal/create/route.js
export const runtime = "nodejs";

import { getPool } from "@/lib/db";
import { verifyDraft } from "@/lib/draft";
import { paypalCreateOrder } from "@/lib/paypal";
import { computeQuote } from "@/lib/quote";

function dollarsFromCents(cents) {
  const n = Number(cents);
  if (!Number.isFinite(n)) return null;
  return (n / 100).toFixed(2);
}

export async function POST(req) {
  try {
    const { draftId, customer } = await req.json();
    if (!draftId) {
      return new Response(JSON.stringify({ error: "Missing draftId" }), { status: 400 });
    }

    // Verify draft & recompute totals
    const { items, coupon } = verifyDraft(draftId);
    const quote = await computeQuote(items, coupon);
    const amountStr = dollarsFromCents(quote.total_cents);
    if (!amountStr) {
      return new Response(JSON.stringify({ error: "Invalid totals" }), { status: 400 });
    }

    // Create PayPal order
    const paypalOrderId = await paypalCreateOrder({
      amount: amountStr,
      currency: quote.currency || "USD",
      description: quote.description || "Order",
    });

    // ✅ Persist order (so capture can find it)
    const pool = getPool();
    await pool.query(
      `INSERT INTO checkout_orders
         (paypal_order_id, draft_token, status, currency, total_cents, customer_email, customer_name, items_json)
       VALUES (?, ?, 'CREATED', ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         status = VALUES(status),
         currency = VALUES(currency),
         total_cents = VALUES(total_cents),
         customer_email = VALUES(customer_email),
         customer_name  = VALUES(customer_name),
         items_json     = VALUES(items_json)`,
      [
        paypalOrderId,
        draftId,
        quote.currency || "USD",
        quote.total_cents,
        customer?.email || null,
        customer?.name || null,
        JSON.stringify(items),
      ]
    );

    return new Response(JSON.stringify({ paypalOrderId }), { status: 200 });
  } catch (e) {
    console.error("POST /api/checkout/paypal/create error", e);
    return new Response(JSON.stringify({ error: e.message || "Server error" }), { status: 500 });
  }
}
