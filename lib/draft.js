import crypto from "crypto";

const b64url = (s) => Buffer.from(s).toString("base64url");
const unb64url = (s) => Buffer.from(s, "base64url").toString("utf8");

export function signDraft(payload) {
  const key = process.env.DRAFT_HMAC_SECRET;
  if (!key) throw new Error("DRAFT_HMAC_SECRET missing");
  const body = b64url(JSON.stringify(payload));
  const sig = crypto.createHmac("sha256", key).update(body).digest("base64url");
  return `${body}.${sig}`;
}

export function verifyDraft(token) {
  const key = process.env.DRAFT_HMAC_SECRET;
  if (!key) throw new Error("DRAFT_HMAC_SECRET missing");
  const [body, sig] = String(token || "").split(".");
  if (!body || !sig) throw new Error("Invalid draft token");
  const expect = crypto.createHmac("sha256", key).update(body).digest("base64url");
  if (expect !== sig) throw new Error("Invalid draft signature");
  const payload = JSON.parse(unb64url(body));
  if (payload?.exp && Date.now() > Number(payload.exp)) throw new Error("Draft expired");
  return payload;
}
