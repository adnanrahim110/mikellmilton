"use client";

export default function SkeletonList() {
  return (
    <ul className="grid gap-4 sm:gap-5 sm:grid-cols-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <li
          key={i}
          className="rounded-3xl border border-zinc-200 bg-gradient-to-br from-white to-primary/5 p-5"
        >
          <div className="h-5 w-28 bg-zinc-100 rounded-xl animate-pulse" />
          <div className="mt-3 h-2 w-full bg-zinc-100 rounded-xl animate-pulse" />
          <div className="mt-2 h-2 w-2/3 bg-zinc-100 rounded-xl animate-pulse" />
          <div className="mt-4 flex gap-2">
            <div className="h-9 w-28 bg-zinc-100 rounded-2xl animate-pulse" />
            <div className="h-9 w-16 bg-zinc-100 rounded-2xl animate-pulse" />
            <div className="h-9 w-16 bg-zinc-100 rounded-2xl animate-pulse" />
          </div>
        </li>
      ))}
    </ul>
  );
}
