export const runtime = "nodejs";
import { getPool } from "@/lib/db";

export async function GET(_req, { params }) {
  try {
    const publicId = params.publicId;
    const pool = getPool();
    const [o] = await pool.query(`SELECT * FROM orders WHERE public_id=? LIMIT 1`, [publicId]);
    const order = o[0];
    if (!order) return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });

    const [items] = await pool.query(`SELECT * FROM order_items WHERE order_id=?`, [order.id]);
    const [dl] = await pool.query(
      `SELECT download_token, format, file_url, expires_at, download_count FROM downloads WHERE order_id=?`,
      [order.id]
    );

    return new Response(JSON.stringify({ order, items, downloads: dl }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 400 });
  }
}
