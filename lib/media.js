import crypto from "crypto";
import path from "path";

const SECRET = process.env.MEDIA_HMAC_SECRET || "";
const TTL_MIN = Number(process.env.MEDIA_URL_TTL_MIN || 1440);

export function normalizeRelPath(relPath) {
  return String(relPath || "")
    .replace(/\\/g, "/")
    .replace(/^\/+/, "")
    .split("/")
    .filter((seg) => seg && seg !== "." && seg !== "..")
    .join("/");
}

export function signMediaPath(relPath, base = "/api/media/products") {
  if (!SECRET) throw new Error("MEDIA_HMAC_SECRET missing");
  const clean = normalizeRelPath(relPath);
  const exp = Date.now() + TTL_MIN * 60 * 1000;
  const payload = `${clean}|${exp}`;
  const sig = crypto.createHmac("sha256", SECRET).update(payload).digest("base64url");
  const segments = clean.split("/").map(encodeURIComponent).join("/");
  return `${base}/${segments}?exp=${exp}&sig=${sig}`;
}

export function verifyMediaSignature(relPath, exp, sig) {
  if (!SECRET) throw new Error("MEDIA_HMAC_SECRET missing");
  const clean = normalizeRelPath(relPath);
  if (!clean || !exp || !sig) return false;
  if (Date.now() > Number(exp)) return false;
  const payload = `${clean}|${exp}`;
  const expect = crypto.createHmac("sha256", SECRET).update(payload).digest("base64url");
  try {
    return crypto.timingSafeEqual(Buffer.from(expect), Buffer.from(String(sig)));
  } catch {
    return false;
  }
}

export function mediaProductsRoot() {
  return path.resolve(process.cwd(), "media", "products");
}
