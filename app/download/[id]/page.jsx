import { getPool } from "@/lib/db";
export const dynamic = "force-dynamic";

async function loadFromOrders(publicId) {
  const pool = getPool();
  const [o] = await pool.query(
    "SELECT * FROM orders WHERE public_id=? LIMIT 1",
    [publicId]
  );
  const order = o?.[0];
  if (!order) return null;
  const [items] = await pool.query(
    "SELECT * FROM order_items WHERE order_id=?",
    [order.id]
  );
  const emailStatus = {
    sent: !!order.email_sent,
    error: !!order.email_error,
    message: order.email_error_message || null,
  };
  const [dl] = await pool.query(
    "SELECT download_token, format, expires_at, download_count, max_downloads FROM downloads WHERE order_id=?",
    [order.id]
  );
  return { order, items, downloads: dl, emailStatus };
}

async function loadFromCheckoutOrders(paypalOrderId) {
  const pool = getPool();
  const [rows] = await pool.query(
    "SELECT * FROM checkout_orders WHERE paypal_order_id=? LIMIT 1",
    [paypalOrderId]
  );
  const co = rows?.[0];
  if (!co) return null;
  const order = {
    id: co.id ?? 0,
    public_id: co.paypal_order_id,
    email_sent: co.email_sent ?? null,
    email_error: co.email_error ?? null,
    email_error_message: co.email_error_message ?? null,
  };
  let rawItems = [];
  try {
    rawItems = JSON.parse(co.items_json || "[]");
    if (!Array.isArray(rawItems)) rawItems = [];
  } catch {
    rawItems = [];
  }
  let items = [];
  if (rawItems.length) {
    const skus = rawItems
      .map((i) => String(i.sku || "").trim())
      .filter(Boolean);
    if (skus.length) {
      const placeholders = skus.map(() => "?").join(",");
      const [pf] = await pool.query(
        `SELECT sku, format, title FROM product_formats WHERE sku IN (${placeholders})`,
        skus
      );
      const bySku = new Map(pf.map((r) => [r.sku, r]));
      items = rawItems.map((i, idx) => {
        const meta = bySku.get(String(i.sku || "").trim());
        return {
          id: idx + 1,
          sku: i.sku,
          title: meta?.title || i.title || i.sku || `Item ${idx + 1}`,
          format: meta?.format || i.format || "Digital",
          quantity: i.quantity ?? i.qty ?? 1,
        };
      });
    }
  }
  const emailStatus = {
    sent: !!order.email_sent,
    error: !!order.email_error,
    message: order.email_error_message || null,
  };
  const downloads = [];
  return { order, items, downloads, emailStatus };
}

async function load(publicIdOrPaypalId) {
  return (
    (await loadFromOrders(publicIdOrPaypalId)) ||
    (await loadFromCheckoutOrders(publicIdOrPaypalId))
  );
}

import DownloadHub from "@/components/download/DownloadHub";
import ItemsPanel from "@/components/download/ItemsPanel";
import PageHeader from "@/components/download/PageHeader";
import Button from "@/components/ui/Button";

export default async function DownloadPage(ctx) {
  const { id } = await ctx.params;
  const data = await load(id);

  if (!data) {
    return (
      <section className="relative min-h-[70vh] flex items-center">
        <div className="container px-4">
          <div className="mx-auto max-w-xl rounded-3xl border border-zinc-200 bg-gradient-to-br from-white to-primary/5 p-8 md:p-10 shadow-sm">
            <h1 className="text-2xl md:text-3xl font-semibold text-primary">
              Order not found
            </h1>
            <p className="mt-2 text-zinc-600">
              Check your link or contact support.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const { order, items, downloads, emailStatus } = data;

  return (
    <section className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -inset-24 blur-3xl opacity-20 bg-[radial-gradient(600px_300px_at_20%_10%,theme(colors.primary/60),transparent_60%)]" />
      </div>
      <div className="container px-4 py-8 md:py-12">
        <PageHeader orderId={order.public_id} />
        <div className="mt-6 grid gap-6 xl:grid-cols-5">
          <div className="xl:col-span-2">
            <ItemsPanel items={items} />
            <div className="my-4">
              <Button tone="dark" href="/" className="rounded-3xl">
                Back to Home
              </Button>
            </div>
          </div>
          <div className="xl:col-span-3">
            <DownloadHub
              orderPublicId={order.public_id}
              initialDownloads={downloads}
              emailStatus={emailStatus}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
