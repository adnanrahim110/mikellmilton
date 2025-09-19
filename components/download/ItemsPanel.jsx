"use client";

import Panel from "./Panel";

export default function ItemsPanel({ items = [] }) {
  return (
    <Panel>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-semibold">Items</h2>
          <span className="text-xs text-zinc-600">
            {items?.length || 0} total
          </span>
        </div>
        {items?.length ? (
          <ul className="mt-4 divide-y">
            {items.map((it) => (
              <li key={it.id || `${it.sku}-${it.format}`} className="py-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-medium truncate">{it.title}</div>
                    <div className="mt-1 text-sm text-zinc-600">
                      {it.format} • Qty {it.quantity || 1}
                    </div>
                  </div>
                  <span className="shrink-0 inline-flex items-center rounded-xl border border-zinc-200 px-2.5 py-1 text-xs bg-primary/10 text-primary">
                    Digital
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-zinc-600">No items found</p>
        )}
      </div>
    </Panel>
  );
}
