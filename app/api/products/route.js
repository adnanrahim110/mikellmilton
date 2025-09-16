export const runtime = "nodejs";
import { getPool } from "@/lib/db";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const format = searchParams.get("format");
    const q = searchParams.get("q");
    const limit = Math.min(100, Number(searchParams.get("limit") || 50));

    const args = [];
    let sql = `
      SELECT p.id AS product_id, p.slug, p.title, pf.format, pf.sku, pf.price_cents, pf.is_digital, pf.file_url
      FROM products p JOIN product_formats pf ON pf.product_id = p.id
      WHERE p.active=1
    `;
    if (format) { sql += " AND pf.format=?"; args.push(format); }
    if (q) { sql += " AND (p.title LIKE ? OR p.slug LIKE ? OR pf.sku LIKE ?)"; args.push(`%${q}%`, `%${q}%`, `%${q}%`); }
    sql += " ORDER BY p.id DESC LIMIT ?"; args.push(limit);

    const [rows] = await getPool().query(sql, args);
    return new Response(JSON.stringify({ items: rows }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 400 });
  }
}
