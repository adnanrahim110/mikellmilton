// lib/paypal.js
const ENV = (process.env.PAYPAL_ENV || "sandbox").toLowerCase();
const BASE =
  ENV === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

function requireCreds() {
  const id = process.env.PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_SECRET; // ← you use PAYPAL_SECRET (not CLIENT_SECRET)
  if (!id || !secret) {
    throw new Error(
      `Missing PayPal creds: PAYPAL_CLIENT_ID=${!!id}, PAYPAL_SECRET=${!!secret}`
    );
  }
  return { id, secret };
}

export async function getAccessToken() {
  const { id, secret } = requireCreds();
  const auth = Buffer.from(`${id}:${secret}`).toString("base64");

  const res = await fetch(`${BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error(`PayPal OAuth failed: ${res.status} ${text}`);
  }
  try {
    return JSON.parse(text).access_token;
  } catch {
    throw new Error(`PayPal OAuth parse error: ${text}`);
  }
}

export async function paypalCreateOrder({ amount, currency = "USD", description }) {
  const access = await getAccessToken();
  const body = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: currency,
          value: Number(amount).toFixed(2),
        },
        description,
      },
    ],
  };

  const res = await fetch(`${BASE}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error(`PayPal create order failed: ${res.status} ${text}`);
  }
  const json = JSON.parse(text);
  return json.id; // paypalOrderId
}

export async function paypalCaptureOrder(orderId) {
  const access = await getAccessToken();
  const res = await fetch(`${BASE}/v2/checkout/orders/${orderId}/capture`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      Prefer: "return=representation",
    },
    body: "{}",
    cache: "no-store",
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error(`PayPal capture failed: ${res.status} ${text}`);
  }
  return JSON.parse(text);
}

/**
 * Verify a PayPal webhook signature using PayPal's API.
 * Returns true when verification_status === "SUCCESS".
 */
export async function paypalVerifyWebhook({
  webhookId = process.env.PAYPAL_WEBHOOK_ID,
  transmissionId,
  timestamp,
  signature,
  certUrl,
  authAlgo,
  body, // raw string OR parsed object
}) {
  if (!webhookId) throw new Error("Missing PAYPAL_WEBHOOK_ID");

  const access = await getAccessToken();
  const event = typeof body === "string" ? JSON.parse(body) : body;

  const res = await fetch(`${BASE}/v1/notifications/verify-webhook-signature`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      auth_algo: authAlgo,
      cert_url: certUrl,
      transmission_id: transmissionId,
      transmission_sig: signature,
      transmission_time: timestamp,
      webhook_id: webhookId,
      webhook_event: event,
    }),
    cache: "no-store",
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error(`PayPal verify failed: ${res.status} ${text}`);
  }
  const json = JSON.parse(text);
  return json.verification_status === "SUCCESS";
}
