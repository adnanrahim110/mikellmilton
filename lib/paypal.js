// lib/paypal.js
const ENV = (process.env.PAYPAL_ENV || "sandbox").toLowerCase();
const BASE =
  ENV === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

function requireCreds() {
  const id = process.env.PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_SECRET;
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
    // avoid edge caching
    cache: "no-store",
  });

  const text = await res.text();
  if (!res.ok) {
    // Surface PayPal's real error (usually {"error":"invalid_client", ...})
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
