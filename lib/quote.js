import { getPool } from "./db";

export async function getServerQuote({ items, coupon }) {
  if (!Array.isArray(items) || items.length === 0) throw new Error("No items");

  const pool = getPool();
  const skus = [...new Set(items.map(i => i.sku))];

  const [rows] = await pool.query(
    `SELECT pf.product_id, pf.format, pf.sku, pf.price_cents, pf.is_digital, p.title
     FROM product_formats pf
     JOIN products p ON p.id = pf.product_id
     WHERE p.active=1 AND pf.sku IN (?)`,
    [skus]
  );

  const bySku = new Map(rows.map(r => [r.sku, r]));
  let subtotal = 0;
  let requiresShipping = false;

  const lines = items.map(it => {
    const row = bySku.get(it.sku);
    if (!row) throw new Error(`Unknown SKU: ${it.sku}`);
    const qty = Math.max(1, Number(it.quantity || 1));
    subtotal += row.price_cents * qty;
    requiresShipping ||= !row.is_digital;
    return {
      product_id: row.product_id,
      title: row.title,
      format: row.format,
      sku: row.sku,
      is_digital: !!row.is_digital,
      unit_price_cents: row.price_cents,
      quantity: qty,
      line_total_cents: row.price_cents * qty,
    };
  });

  // coupons (optional)
  let discount_cents = 0;
  if (coupon) {
    const [crows] = await pool.query("SELECT * FROM coupons WHERE code=? AND active=1 LIMIT 1", [coupon]);
    const c = crows[0];
    if (c) {
      if (c.percent_off) discount_cents = Math.round(subtotal * (c.percent_off / 100));
      if (c.amount_off_cents) discount_cents = Math.max(discount_cents, c.amount_off_cents);
    }
  }

  const shipping_cents = 0;
  const tax_cents = 0; // per your rule: tax remains 0
  const currency = process.env.DEFAULT_CURRENCY || "USD";
  const total_cents = Math.max(0, subtotal - discount_cents) + shipping_cents + tax_cents;

  return {
    currency,
    items: lines,
    requires_shipping: requiresShipping,
    subtotal_cents: subtotal,
    discount_cents,
    shipping_cents,
    tax_cents,
    total_cents,
  };
}
