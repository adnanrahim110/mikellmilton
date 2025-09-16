// components/checkout/helpers.js
export const money = (n) => `$${Number(n || 0).toFixed(2)}`;

const norm = (s) => String(s || "").toLowerCase();
export const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

// Keep signature the same so existing imports don't break.
// We default to digital for your two known SKUs/ids; fallback physical for unknowns.
export function buildModeLookup() {
  return (item) => {
    const m = norm(item?.mode);
    if (m === "digital" || m === "physical") return m;

    // Your two products (stable ids you already use in cart)
    if (item?.id === 1 || item?.id === 2) return "digital";

    // Fallback: assume physical if we don't know
    return "physical";
  };
}

// Keep for cart page math if used there; tax fixed 0 as requested.
export function computeTotals({ subtotal, discountRate, items, shipMethod, requiresShipping }) {
  const discount = subtotal * (discountRate || 0);
  const shippingCost = requiresShipping
    ? shipMethod === "overnight"
      ? 29.99
      : shipMethod === "express"
        ? 14.99
        : subtotal - discount >= 75 || items.length === 0
          ? 0
          : 6.99
    : 0;
  const tax = 0;
  const total = Math.max(0, subtotal - discount) + shippingCost + tax;
  return { discount, shippingCost, tax, total };
}

/* === NEW: server-powered checkout helpers === */

// Map your cart items (id 1/2) to SKUs that exist in DB seed
export function toSkuItems(cartItems) {
  return (cartItems || []).map((it) => {
    let sku;
    if (it.id === 1) sku = "DOPE-AB"; // Audiobook ZIP
    else if (it.id === 2) sku = "DOPE-EB"; // eBook PDF
    else throw new Error("Unknown cart item id: " + it.id);
    return { sku, qty: Math.max(1, Number(it.quantity || 1)) };
  });
}

export async function fetchQuote({ items, coupon }) {
  const res = await fetch("/api/checkout/quote", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items, coupon }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Quote failed");
  return data; // {draftId, lines, subtotal_cents, discount_cents, shipping_cents, tax_cents, total_cents, currency}
}

// Load the two formats from DB and map to your card shape (no UI changes)
export async function fetchDopeBooksFromDB() {
  const res = await fetch("/api/products?limit=20", { cache: "no-store" });
  const { items = [] } = await res.json();
  const rows = items.filter((r) => r.slug === "the-dope-breakthrough");

  const out = [];

  const ab = rows.find((r) => r.format === "audiobook" && r.sku === "DOPE-AB");
  if (ab) {
    out.push({
      id: 1,
      img: "/imgs/eb-album.png",
      title: ab.title,
      price: Number(ab.price_cents || 0) / 100,
      type: "EB - Album",
      mode: "digital",
    });
  }

  const eb = rows.find((r) => r.format === "ebook" && r.sku === "DOPE-EB");
  if (eb) {
    out.push({
      id: 2,
      img: "/imgs/book_cover.png",
      title: eb.title,
      price: Number(eb.price_cents || 0) / 100,
      type: "E - Book",
      mode: "digital",
    });
  }

  return out;
}
