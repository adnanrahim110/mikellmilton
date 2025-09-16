export const cents = (n) => Math.round(Number(n || 0));
export const fmt = (c, cur = process.env.DEFAULT_CURRENCY || "USD") =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: cur }).format((c || 0) / 100);
