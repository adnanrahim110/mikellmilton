export const runtime = "nodejs";
import { getPool } from "@/lib/db";
import { paypalVerifyWebhook } from "@/lib/paypal";

export async function POST(req) {
  try {
    const raw = await req.text();
    const body = JSON.parse(raw);
    const ok = await paypalVerifyWebhook(req.headers, body);
    if (!ok) return new Response("invalid", { status: 400 });

    const event = body.event_type;
    const resource = body.resource;
    const pool = getPool();

    if (event === "PAYMENT.CAPTURE.COMPLETED") {
      const captureId = resource.id;
      const amountCents = Math.round(Number(resource.amount.value) * 100);
      const currency = resource.amount.currency_code;

      const [ord] = await pool.query(
        `SELECT o.* FROM orders o
         LEFT JOIN payments p ON p.order_id=o.id
         WHERE o.paypal_capture_id=? OR p.remote_id=? LIMIT 1`,
        [captureId, captureId]
      );
      const order = ord[0];
      if (order) {
        await pool.query(
          `INSERT INTO payments (order_id, provider, status, amount_cents, currency, remote_id, raw_json)
           VALUES (?, 'paypal', 'captured', ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE status='captured', amount_cents=VALUES(amount_cents), raw_json=VALUES(raw_json)`,
          [order.id, amountCents, currency, captureId, JSON.stringify(resource)]
        );
        await pool.query(`UPDATE orders SET status='paid', paypal_capture_id=? WHERE id=?`, [captureId, order.id]);
      }
    }

    return new Response("ok", { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 400 });
  }
}
