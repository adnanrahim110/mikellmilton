"use client";

import { Gift } from "lucide-react";
import React from "react";

export default function PromoField({ onApply, code, setCode, applied }) {
  return (
    <div className="flex items-stretch gap-2">
      <div className="relative flex-1">
        <Gift className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary-500" />
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={applied ? `Applied: ${applied}` : "Promo code"}
          disabled={!!applied}
          className="w-full rounded-xl border border-white/60 bg-white/85 pl-9 pr-3 py-3 text-sm text-secondary-900 placeholder:text-secondary-400 shadow-inner focus:outline-none focus:ring-4 focus:ring-primary/25 disabled:opacity-70"
        />
      </div>
      <button
        onClick={onApply}
        disabled={!code.trim() || !!applied}
        className="inline-flex items-center gap-2 rounded-xl bg-primary text-secondary-950 px-4 py-3 text-sm font-semibold shadow disabled:opacity-50"
      >
        Apply
      </button>
    </div>
  );
}
