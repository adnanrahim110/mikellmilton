// lib/quote.js
import { getPool } from "./db";

/**
 * items: [{ sku: string, quantity?: number }]
 * coupon: string|null
 * returns cents + currency & description
 */
export async function computeQuote(items, coupon) {
  if (!Array.isArray(items) || !items.length) {
    throw new Error("No items");
  }
  const normalized = items.map((it) => ({
    sku: String(it.sku || "").trim(),
    quantity: Math.max(1, parseInt(it.quantity ?? it.qty ?? 1, 10) || 1),
  }));
  const skus = normalized.map((i) => i.sku);
  if (skus.some((s) => !s)) throw new Error("Missing SKU");

  const pool = getPool();
  // Pull price and digital flag for each SKU
  const [rows] = await pool.query(
    `SELECT sku, price_cents, is_digital
       FROM product_formats
      WHERE sku IN (${skus.map(() => "?").join(",")})`,
    skus
  );

  // Map SKU -> {price_cents, is_digital}
  const bySku = new Map(rows.map((r) => [r.sku, r]));
  let subtotal_cents = 0;
  let requiresShipping = false;

  for (const it of normalized) {
    const r = bySku.get(it.sku);
    if (!r) throw new Error(`Unknown SKU: ${it.sku}`);
    const price = Number(r.price_cents || 0);
    subtotal_cents += price * it.quantity;
    if (!r.is_digital) requiresShipping = true;
  }

  // Simple coupon example: DOPE10 = 10% off subtotal
  const code = String(coupon || "").trim().toUpperCase();
  const discount_cents = code === "DOPE10" ? Math.floor(subtotal_cents * 0.1) : 0;

  const shipping_cents = requiresShipping ? 0 : 0; // free shipping in your UI
  const tax_cents = 0; // tax not applied in your UI
  const total_cents = Math.max(0, subtotal_cents - discount_cents + shipping_cents + tax_cents);

  return {
    currency: "USD",
    subtotal_cents,
    discount_cents,
    shipping_cents,
    tax_cents,
    total_cents,
    requiresShipping,
    description: `Order of ${normalized.reduce((n, i) => n + i.quantity, 0)} item(s)`,
  };
}
export { computeQuote as getServerQuote };
