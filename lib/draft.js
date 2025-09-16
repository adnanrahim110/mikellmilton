import crypto from "crypto";

function b64url(s) { return Buffer.from(s).toString("base64url"); }
function unb64url(s) { return Buffer.from(s, "base64url").toString("utf8"); }

export function signDraft(payload) {
  const body = b64url(JSON.stringify(payload));
  const sig = crypto.createHmac("sha256", process.env.DRAFT_HMAC_SECRET).update(body).digest("base64url");
  return `${body}.${sig}`;
}
export function verifyDraft(token) {
  const [body, sig] = String(token || "").split(".");
  if (!body || !sig) throw new Error("Bad draft");
  const exp = crypto.createHmac("sha256", process.env.DRAFT_HMAC_SECRET).update(body).digest("base64url");
  if (exp !== sig) throw new Error("Invalid draft signature");
  const payload = JSON.parse(unb64url(body));
  if (Date.now() - payload.ts > 1000 * 60 * 30) throw new Error("Draft expired");
  return payload;
}
