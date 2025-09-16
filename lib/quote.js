import { getPool } from "./db";
import { cents } from "./money";

export async function getServerQuote({ items, coupon }) {
  const pool = getPool();

  const itemsHaveSku = items.every(i => i?.sku);
  let rows = [];

  if (itemsHaveSku) {
    const skus = [...new Set(items.map(i => i.sku))];
    if (skus.length === 0) throw new Error("No items");
    const [r] = await pool.query(
      `SELECT pf.product_id, pf.format, pf.sku, pf.price_cents, pf.is_digital, p.title
       FROM product_formats pf
       JOIN products p ON p.id = pf.product_id
       WHERE p.active=1 AND pf.sku IN (?)`,
      [skus]
    );
    rows = r;
  } else {
    const ids = [...new Set(items.map(i => i.productId))];
    if (ids.length === 0) throw new Error("No items");
    const [r] = await pool.query(
      `SELECT pf.product_id, pf.format, pf.sku, pf.price_cents, pf.is_digital, p.title
       FROM product_formats pf
       JOIN products p ON p.id = pf.product_id
       WHERE p.active=1 AND pf.product_id IN (?)`,
      [ids]
    );
    rows = r;
  }

  const lines = [];
  let subtotal = 0;

  for (const it of items) {
    const match = itemsHaveSku
      ? rows.find(r => r.sku === it.sku)
      : rows.find(r => r.product_id === it.productId && r.format === it.format);

    if (!match) throw new Error("Product/format not found");

    const qty = Math.max(1, Number(it.qty || 1));
    const unit = cents(match.price_cents);
    const total = unit * qty;
    subtotal += total;

    lines.push({
      productId: match.product_id,
      format: match.format,
      sku: match.sku,
      title: match.title,
      quantity: qty,
      unit_price_cents: unit,
      line_total_cents: total,
      is_digital: !!match.is_digital,
    });
  }

  const discount = await resolveCoupon(coupon, subtotal);
  const shipping = 0; // digital-only for now
  const tax = 0;      // plug tax here if needed
  const total = Math.max(0, subtotal - discount) + shipping + tax;

  return {
    currency: process.env.DEFAULT_CURRENCY || "USD",
    lines,
    subtotal_cents: subtotal,
    discount_cents: discount,
    shipping_cents: shipping,
    tax_cents: tax,
    total_cents: total,
    shipping_option: "digital",
  };
}

async function resolveCoupon(code, subtotal) {
  if (!code) return 0;
  const [rows] = await getPool().query(`SELECT * FROM coupons WHERE code=?`, [code]);
  const c = rows[0]; const now = new Date();
  if (!c || !c.active ||
    (c.valid_from && now < c.valid_from) ||
    (c.valid_to && now > c.valid_to) ||
    (c.max_uses && c.used_count >= c.max_uses)) return 0;
  return c.type === "percent" ? Math.min(subtotal, Math.floor(subtotal * c.value / 100))
    : Math.min(subtotal, c.value);
}
