export const runtime = "nodejs";

import { mediaProductsRoot, normalizeRelPath, verifyMediaSignature } from "@/lib/media";
import fs from "fs";
import path from "path";

function safeJoin(base, rel) {
  const normalized = path.normalize(path.join(base, rel));
  if (!normalized.startsWith(base)) throw new Error("Bad path");
  return normalized;
}

function mimeByExt(p) {
  const ext = path.extname(p).toLowerCase();
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".png") return "image/png";
  if (ext === ".webp") return "image/webp";
  if (ext === ".gif") return "image/gif";
  if (ext === ".svg") return "image/svg+xml";
  return "application/octet-stream";
}

export async function GET(req, ctx) {
  try {
    const { path: parts } = await ctx.params;
    const relRaw = Array.isArray(parts) ? parts.map(decodeURIComponent).join("/") : "";
    const relPath = normalizeRelPath(relRaw); // 🔑 same canonical form used during signing

    const url = new URL(req.url);
    const exp = url.searchParams.get("exp");
    const sig = url.searchParams.get("sig");

    if (!verifyMediaSignature(relPath, exp, sig)) {
      return new Response("Forbidden", { status: 403 });
    }

    const base = mediaProductsRoot();
    const filePath = safeJoin(base, relPath);

    if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
      return new Response("Not found", { status: 404 });
    }

    const stat = fs.statSync(filePath);
    const etag = `"${stat.mtimeMs}-${stat.size}"`;
    if (req.headers.get("if-none-match") === etag) {
      return new Response(null, { status: 304, headers: { ETag: etag } });
    }

    const stream = fs.createReadStream(filePath);
    return new Response(stream, {
      headers: {
        "Content-Type": mimeByExt(filePath),
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
        ETag: etag,
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (e) {
    console.error("GET /api/media/products error", e);
    return new Response("Server error", { status: 500 });
  }
}
