export const runtime = "nodejs";
import { getPool } from "@/lib/db";
import fs from "fs";
import path from "path";

function safeJoin(base, rel) {
  const p = path.normalize(path.join(base, rel));
  if (!p.startsWith(base)) throw new Error("Bad path");
  return p;
}
function mimeByExt(p) {
  const ext = path.extname(p).toLowerCase();
  if (ext === ".pdf") return "application/pdf";
  if (ext === ".zip") return "application/zip";
  return "application/octet-stream";
}

export async function GET(_req, { params }) {
  try {
    const token = params.token;
    const pool = getPool();
    const [rows] = await pool.query(
      `SELECT d.*, o.status, o.public_id
       FROM downloads d JOIN orders o ON o.id = d.order_id
       WHERE d.download_token=? LIMIT 1`, [token]
    );
    const dl = rows[0];
    if (!dl) return new Response("Not found", { status: 404 });
    if (dl.status !== "paid") return new Response("Forbidden", { status: 403 });
    if (dl.expires_at && new Date(dl.expires_at) < new Date()) return new Response("Expired", { status: 410 });

    const protectedRoot = path.join(process.cwd(), "protected");
    const abs = safeJoin(protectedRoot, dl.file_url);
    if (!fs.existsSync(abs)) return new Response("File missing", { status: 404 });

    // increment download count (best-effort)
    pool.query(`UPDATE downloads SET download_count = download_count + 1 WHERE download_token=?`, [token]).catch(() => { });

    const stat = fs.statSync(abs);
    const headers = new Headers();
    headers.set("Content-Type", mimeByExt(abs));
    headers.set("Content-Length", String(stat.size));
    headers.set("Content-Disposition", `attachment; filename="${path.basename(abs)}"`);

    const stream = fs.createReadStream(abs);
    return new Response(stream, { status: 200, headers });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 400 });
  }
}
