import { getPool } from "@/lib/db";

export const dynamic = "force-dynamic"; // ensure fresh reads

async function load(publicId) {
  const pool = getPool();
  const [o] = await pool.query(
    `SELECT * FROM orders WHERE public_id=? LIMIT 1`,
    [publicId]
  );
  const order = o[0];
  if (!order) return null;
  const [items] = await pool.query(
    `SELECT * FROM order_items WHERE order_id=?`,
    [order.id]
  );
  const [dl] = await pool.query(
    `SELECT download_token, format, file_url, expires_at, download_count FROM downloads WHERE order_id=?`,
    [order.id]
  );
  return { order, items, downloads: dl };
}

export default async function DownloadPage({ params, searchParams }) {
  const data = await load(params.id);
  if (!data) {
    return (
      <section className="container py-16">
        <h1 className="text-2xl font-semibold">Order not found</h1>
        <p className="text-sm text-gray-600">
          Please check your link or contact support.
        </p>
      </section>
    );
  }
  const warn = searchParams?.email === "failed";

  return (
    <section className="container py-16">
      {warn && (
        <div className="mb-6 rounded-xl bg-yellow-100 text-yellow-900 p-4 ring-1 ring-yellow-300">
          We couldn’t send the confirmation email, but your payment is complete.
          You can download your files below.
        </div>
      )}
      <h1 className="text-2xl font-semibold">
        Thank you!{" "}
        <span className="text-gray-500">Order #{data.order.public_id}</span>
      </h1>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border p-5 bg-white">
          <h2 className="font-semibold mb-2">Items</h2>
          <ul className="space-y-1 text-sm">
            {data.items.map((it) => (
              <li key={it.id} className="flex justify-between">
                <span>
                  {it.title_snapshot} ({it.format}) × {it.quantity}
                </span>
                <span>${(it.line_total_cents / 100).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t pt-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${(data.order.subtotal_cents / 100).toFixed(2)}</span>
            </div>
            {data.order.discount_cents ? (
              <div className="flex justify-between">
                <span>Discount</span>
                <span>- ${(data.order.discount_cents / 100).toFixed(2)}</span>
              </div>
            ) : null}
            <div className="flex justify-between">
              <span>Total</span>
              <span className="font-semibold">
                ${(data.order.total_cents / 100).toFixed(2)}{" "}
                {data.order.currency}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border p-5 bg-white">
          <h2 className="font-semibold mb-2">Downloads</h2>
          {data.downloads.length === 0 ? (
            <p className="text-sm text-gray-600">No downloadable items yet.</p>
          ) : (
            <ul className="space-y-3">
              {data.downloads.map((d) => {
                const href = `/api/downloads/${d.download_token}`;
                const name = d.file_url?.split("/").pop();
                return (
                  <li
                    key={d.download_token}
                    className="flex items-center justify-between"
                  >
                    <div className="text-sm">
                      <div className="font-medium">{name}</div>
                      <div className="text-gray-500">
                        Format: {d.format} • Expires:{" "}
                        {d.expires_at
                          ? new Date(d.expires_at).toLocaleDateString()
                          : "never"}
                      </div>
                    </div>
                    <a
                      href={href}
                      className="rounded-lg bg-black text-white px-4 py-2 text-sm"
                    >
                      Download
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
