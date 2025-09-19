"use client";

export function FileBadge({ label }) {
  return (
    <span className="h-8 min-w-12 px-2.5 rounded-xl border border-zinc-200 bg-primary/10 text-primary text-[11px] font-semibold grid place-items-center">
      {label}
    </span>
  );
}

export function TimePill({ tone, children }) {
  const map = {
    panic: "border-red-500/50 text-red-700 bg-red-50",
    danger: "border-red-400/60 text-red-700 bg-red-50",
    warn: "border-amber-400/60 text-amber-800 bg-amber-50",
    ok: "border-emerald-400/60 text-emerald-700 bg-emerald-50",
    neutral: "border-zinc-200 text-zinc-700 bg-white",
    expired: "border-zinc-300 text-zinc-600 bg-zinc-100",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] border ${map[tone]}`}
    >
      {children}
    </span>
  );
}
