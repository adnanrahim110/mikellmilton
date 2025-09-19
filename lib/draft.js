import crypto from "crypto";

const SECRET = process.env.DRAFT_SECRET || "";

const b64url = {
  enc: (buf) => Buffer.from(buf).toString("base64url"),
  dec: (str) => Buffer.from(str, "base64url"),
};

export function signDraft(payloadObj) {
  if (!SECRET) throw new Error("DRAFT_SECRET missing");
  const payload = Buffer.from(JSON.stringify(payloadObj));
  const sig = crypto.createHmac("sha256", SECRET).update(payload).digest();
  return `${b64url.enc(payload)}.${b64url.enc(sig)}`;
}

export function verifyDraft(token) {
  if (!SECRET) throw new Error("DRAFT_SECRET missing");
  const [payloadB64, sigB64] = String(token || "").split(".");
  if (!payloadB64 || !sigB64) throw new Error("Bad draft token");

  const payloadBuf = b64url.dec(payloadB64);
  const givenSig = b64url.dec(sigB64);
  const expectSig = crypto.createHmac("sha256", SECRET).update(payloadBuf).digest();

  if (!crypto.timingSafeEqual(expectSig, givenSig)) {
    throw new Error("Invalid draft signature");
  }
  const json = JSON.parse(payloadBuf.toString("utf8"));

  if (json.exp && Date.now() > Number(json.exp)) {
    throw new Error("Draft expired");
  }
  return json; // { items, coupon, iat, exp }
}
