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

// Convert cart items -> server SKU payload
export function toSkuItems(items = []) {
  return items.map((it) => ({
    sku: it.sku || it.id || it.slug, // prefer real SKU if present
    quantity: Number(it.quantity || 1),
  }));
}

// Fetch canonical server quote
export async function fetchQuote({ items, coupon }) {
  const res = await fetch("/api/checkout/quote", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items, coupon }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch quote");
  return await res.json();
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
