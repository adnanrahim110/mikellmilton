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
  if (ext === ".mp3") return "audio/mpeg";
  return "application/octet-stream";
}

export async function GET(_req, { params }) {
  try {
    const token = params.token;
    const pool = getPool();
    const [rows] = await pool.query(
      "SELECT d.*, o.status FROM downloads d JOIN orders o ON o.id=d.order_id WHERE d.download_token=? LIMIT 1",
      [token]
    );
    const dl = rows[0];
    if (!dl) return new Response("Not found", { status: 404 });
    if (dl.status !== "paid") return new Response("Unauthorized", { status: 403 });
    if (new Date(dl.expires_at).getTime() < Date.now()) return new Response("Expired", { status: 410 });
    if (dl.max_downloads && dl.download_count >= dl.max_downloads) return new Response("Limit reached", { status: 429 });

    const base = path.resolve(process.cwd(), "protected");
    const filePath = safeJoin(base, dl.file_url);
    if (!fs.existsSync(filePath)) return new Response("File missing", { status: 500 });

    await pool.query("UPDATE downloads SET download_count=download_count+1 WHERE id=?", [dl.id]);

    const stream = fs.createReadStream(filePath);
    return new Response(stream, {
      headers: {
        "Content-Type": mimeByExt(filePath),
        "Content-Disposition": `attachment; filename="${path.basename(filePath)}"`,
      },
    });
  } catch (e) {
    console.error("GET /api/downloads error", e);
    return new Response("Server error", { status: 500 });
  }
}
