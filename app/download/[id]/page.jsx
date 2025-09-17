import { getPool } from "@/lib/db";
export const dynamic = "force-dynamic";

async function load(publicId) {
  const pool = getPool();
  const [o] = await pool.query(
    "SELECT * FROM orders WHERE public_id=? LIMIT 1",
    [publicId]
  );
  const order = o[0];
  if (!order) return null;
  const [items] = await pool.query(
    "SELECT * FROM order_items WHERE order_id=?",
    [order.id]
  );
  const [dl] = await pool.query(
    "SELECT download_token, format, expires_at, download_count, max_downloads FROM downloads WHERE order_id=?",
    [order.id]
  );
  return { order, items, downloads: dl };
}

export default async function DownloadPage({ params }) {
  const data = await load(params.id);
  if (!data) {
    return (
      <section className="relative py-16">
        <div className="container">
          <h1 className="text-2xl font-semibold">Order not found</h1>
          <p className="mt-2 text-secondary-600">Please check your link.</p>
        </div>
      </section>
    );
  }

  const { order, items, downloads } = data;

  return (
    <section className="relative py-16">
      <div className="container space-y-6">
        <h1 className="text-3xl font-semibold">Thanks for your purchase!</h1>
        <p className="text-secondary-600">
          Order <b>#{order.public_id}</b>
        </p>

        <div className="rounded-2xl border p-6">
          <h2 className="text-xl font-semibold mb-3">Items</h2>
          <ul className="list-disc ml-6">
            {items.map((it) => (
              <li key={it.id || `${it.sku}-${it.format}`}>
                {it.title} — {it.format}
              </li>
            ))}
          </ul>
        </div>

        {downloads?.length ? (
          <div className="rounded-2xl border p-6">
            <h2 className="text-xl font-semibold mb-3">Downloads</h2>
            <ul className="space-y-2">
              {downloads.map((d) => (
                <li
                  key={d.download_token}
                  className="flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="font-medium">{d.format}</div>
                    <div className="text-sm text-secondary-600">
                      Expires: {new Date(d.expires_at).toLocaleString()} • Used{" "}
                      {d.download_count}/{d.max_downloads || "∞"}
                    </div>
                  </div>
                  <a
                    href={`/api/downloads/${d.download_token}`}
                    className="inline-flex items-center rounded-xl border px-4 py-2 text-sm hover:bg-primary/5"
                  >
                    Download
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-secondary-600">
            No downloadable items for this order.
          </p>
        )}
      </div>
    </section>
  );
}
