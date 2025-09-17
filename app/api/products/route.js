export const runtime = "nodejs";
import { getPool } from "@/lib/db";
import { signMediaPath } from "@/lib/media";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const format = searchParams.get("format");
    const q = searchParams.get("q")?.trim();
    const limit = Math.min(100, Number(searchParams.get("limit") || 50));

    const args = [];
    let sql = `
      SELECT
        p.id AS product_id,
        p.slug,
        p.title,
        pf.format,
        pf.sku,
        pf.price_cents,
        pf.is_digital,
        COALESCE(pf.image_path, p.image_path) AS image_path
      FROM products p
      JOIN product_formats pf ON pf.product_id = p.id
      WHERE p.active = 1
    `;

    if (format) { sql += " AND pf.format = ?"; args.push(format); }
    if (q) { sql += " AND (p.title LIKE ? OR p.slug LIKE ?)"; args.push(`%${q}%`, `%${q}%`); }
    sql += " ORDER BY p.id DESC LIMIT ?";
    args.push(limit);

    const pool = getPool();
    const [rows] = await pool.query(sql, args);

    // Map to include a signed URL computed from the path
    const out = rows.map((r) => {
      const rel = (r.image_path || "").replace(/^\/+/, "").replace(/\.\./g, "");
      let image_url = null;
      if (rel) {
        image_url = signMediaPath(rel); // e.g. /api/media/products/the-dope-breakthrough/cover.jpg?exp=...&sig=...
      }
      return { ...r, image_url };
    });

    return new Response(JSON.stringify(out), { status: 200 });
  } catch (e) {
    console.error("GET /api/products error", e);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
