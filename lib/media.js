// lib/media.js
import crypto from "crypto";
import path from "path";

const SECRET = process.env.MEDIA_HMAC_SECRET || "";
const TTL_MIN = Number(process.env.MEDIA_URL_TTL_MIN || 1440); // 24h

const b64url = (b) => Buffer.from(b).toString("base64url");

export function signMediaPath(relPath, base = "/api/media/products") {
  if (!SECRET) throw new Error("MEDIA_HMAC_SECRET missing");
  const clean = String(relPath || "").replace(/^\/+/, "").replace(/\.\./g, "");
  const exp = Date.now() + TTL_MIN * 60 * 1000;
  const payload = `${clean}|${exp}`;
  const sig = crypto.createHmac("sha256", SECRET).update(payload).digest("base64url");
  // Build a catch-all path preserving folder structure
  const segments = clean.split("/").map(encodeURIComponent).join("/");
  return `${base}/${segments}?exp=${exp}&sig=${sig}`;
}

export function verifyMediaSignature(relPath, exp, sig) {
  if (!SECRET) throw new Error("MEDIA_HMAC_SECRET missing");
  if (!relPath || !exp || !sig) return false;
  if (Date.now() > Number(exp)) return false;
  const payload = `${relPath}|${exp}`;
  const expect = crypto.createHmac("sha256", SECRET).update(payload).digest("base64url");
  return crypto.timingSafeEqual(Buffer.from(expect), Buffer.from(String(sig)));
}

export function mediaProductsRoot() {
  // Absolute path: <project>/media/products
  return path.resolve(process.cwd(), "media", "products");
}
