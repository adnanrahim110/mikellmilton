"use client";

import { DownloadCloud } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="rounded-3xl border border-dashed border-zinc-200 p-10 text-center bg-gradient-to-br from-white to-primary/5">
      <div className="mx-auto mb-4 w-11 h-11 rounded-2xl border border-zinc-200 grid place-items-center text-primary">
        <DownloadCloud className="w-5 h-5" />
      </div>
      <p className="text-zinc-700 font-medium">No downloadable items</p>
      <p className="text-zinc-500 text-sm mt-1">
        Try refresh or contact support with your order id.
      </p>
    </div>
  );
}
