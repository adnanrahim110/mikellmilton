"use client";

import { Headphones, ShieldCheck, Zap } from "lucide-react";

export default function PageHeader({ orderId }) {
  return (
    <div className="rounded-3xl overflow-hidden border border-zinc-200 bg-white shadow-sm">
      <div className="bg-gradient-to-r from-primary/12 to-transparent">
        <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/80 opacity-60" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
              </span>
              Ready
            </div>
            <h1 className="mt-2 text-[28px] sm:text-[32px] md:text-[36px] font-semibold tracking-tight">
              Download your files
            </h1>
            <div className="mt-1 inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-1 text-sm">
              <span className="text-zinc-500">Order</span>
              <span className="text-primary font-medium">#{orderId}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 md:justify-end">
            <span className="inline-flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-3 py-2 text-xs md:text-sm text-zinc-800 transition-colors hover:bg-primary/5">
              <ShieldCheck className="w-4 h-4 text-primary" />
              Secure
            </span>
            <span className="inline-flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-3 py-2 text-xs md:text-sm text-zinc-800 transition-colors hover:bg-primary/5">
              <Zap className="w-4 h-4 text-primary" />
              Instant
            </span>
            <span className="inline-flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-3 py-2 text-xs md:text-sm text-zinc-800 transition-colors hover:bg-primary/5">
              <Headphones className="w-4 h-4 text-primary" />
              Support
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
