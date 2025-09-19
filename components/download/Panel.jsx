"use client";

export default function Panel({ className = "", children }) {
  return (
    <div className={`group relative rounded-3xl ${className}`}>
      <div className="relative rounded-3xl border border-zinc-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-[2px]">
        {children}
      </div>
    </div>
  );
}
