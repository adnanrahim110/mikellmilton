// components/checkout/helpers.js

/* ========= Existing helpers (unchanged) ========= */
export const money = (n, cur = "USD") =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: cur }).format(Number(n || 0));

const norm = (s) => String(s || "").toLowerCase();
export const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

// Backward-compatible mode resolver for seeded items (kept for other parts that may rely on it)
export function buildModeLookup() {
  return (item) => {
    const m = norm(item?.mode);
    if (m === "digital" || m === "physical") return m;
    return "digital";
  };
}

export function toSkuItems(cartItems) {
  return (cartItems || [])
    .map((i) => ({
      sku: String(i.sku || i.id || "").trim(),
      quantity: Math.max(1, parseInt(i.quantity ?? i.qty ?? 1, 10) || 1),
    }))
    .filter((x) => x.sku);
}

export async function fetchQuote({ items, coupon }) {
  const list = Array.isArray(items) ? items.filter((x) => x && x.sku) : [];
  if (list.length === 0) {
    return {
      currency: "USD",
      subtotal_cents: 0,
      discount_cents: 0,
      shipping_cents: 0,
      tax_cents: 0,
      total_cents: 0,
      requiresShipping: false,
      description: "Empty",
      draftId: null,
    };
  }

  const res = await fetch("/api/checkout/quote", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: list, coupon: coupon || null }),
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json.error || "Quote failed");
  }
  return json;
}

/* ========= New shared product fetcher (DB only) ========= */
function slugify(s) {
  return String(s || "").toLowerCase().replace(/[^a-z0-9]/g, "");
}
function canonType(raw) {
  const x = slugify(raw);
  if (x === "ebook" || x === "ebooks" || x === "digital" || x === "kindle") return "eBook";
  if (x === "audiobook" || x === "audiobooks" || x === "audio") return "Audiobook";
  if (x === "paperback" || x === "softcover" || x === "softback") return "Paperback";
  if (x === "hardcover" || x === "hardback" || x === "casewrap" || x === "casebound") return "Hardcover";
  return String(raw || "").trim();
}

/**
 * Fetches products from /api/products and maps them to the UI shape.
 * Assumes the API returns a **public** image column (image_url), NOT the private file download path.
 *
 * Returns: [{ id, sku, title, price, img, type, mode, badge? }]
 */
export async function fetchDopeBooksFromDB() {
  const res = await fetch("/api/products", { cache: "no-store" });
  if (!res.ok) throw new Error("products fetch failed");
  const rows = await res.json();

  return rows.map((r) => ({
    id: r.sku || `${r.product_id}-${r.format}`,
    sku: r.sku,
    title: r.title,
    price: Number(r.price_cents || 0) / 100,
    img: r.image_url || "/imgs/book_cover.png", // use the DB image_url; fallback keeps UI intact
    type: canonType(r.format),
    mode: r.is_digital ? "digital" : "physical",
  }));
}
