// app/api/checkout/paypal/webhook/route.js
export const runtime = "nodejs";

import { getPool } from "@/lib/db";
import { paypalVerifyWebhook } from "@/lib/paypal";

export async function POST(req) {
  try {
    // Read RAW body first (needed for signature verification)
    const raw = await req.text();

    // Verify the webhook via PayPal API
    const h = req.headers;
    const verified = await paypalVerifyWebhook({
      transmissionId: h.get("paypal-transmission-id"),
      timestamp: h.get("paypal-transmission-time"),
      signature: h.get("paypal-transmission-sig"),
      certUrl: h.get("paypal-cert-url"),
      authAlgo: h.get("paypal-auth-algo"),
      body: raw, // pass RAW string here
    });

    if (!verified) {
      return new Response("invalid", { status: 400 });
    }

    // Safe to parse now
    const body = JSON.parse(raw);
    const event = body?.event_type;
    const resource = body?.resource;

    const pool = getPool();

    if (event === "PAYMENT.CAPTURE.COMPLETED") {
      const captureId = resource?.id;
      const amountCents = Math.round(Number(resource?.amount?.value) * 100);
      const currency = resource?.amount?.currency_code;

      // Try to find the order by capture id (or prior payment remote_id)
      const [ord] = await pool.query(
        `SELECT o.* FROM orders o
         LEFT JOIN payments p ON p.order_id = o.id
         WHERE o.paypal_capture_id = ? OR p.remote_id = ?
         LIMIT 1`,
        [captureId, captureId]
      );

      const order = ord?.[0];

      if (order) {
        await pool.query(
          `INSERT INTO payments (order_id, provider, status, amount_cents, currency, remote_id, raw_json)
           VALUES (?, 'paypal', 'captured', ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE
             status='captured',
             amount_cents = VALUES(amount_cents),
             raw_json     = VALUES(raw_json)`,
          [order.id, amountCents, currency, captureId, JSON.stringify(resource)]
        );

        await pool.query(
          `UPDATE orders SET status = 'paid', paypal_capture_id = ? WHERE id = ?`,
          [captureId, order.id]
        );
      } else {
        // Optional: log/no-op so PayPal doesn't keep retrying forever
        // console.warn("Capture received but order not found", { captureId });
      }
    }

    return new Response("ok", { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 400 });
  }
}
