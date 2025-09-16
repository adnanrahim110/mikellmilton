"use client";
import React from "react";

export default function RadioCard({
  name,
  value,
  checked,
  onChange,
  title,
  hint,
  price,
}) {
  return (
    <label className="block cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="peer hidden"
      />
      <div className="rounded-xl border border-white/60 bg-white/80 shadow-inner px-4 py-3 flex items-center justify-between peer-checked:border-primary peer-checked:shadow">
        <div className="flex items-center gap-3">
          <span className="inline-flex size-5 rounded-full border border-secondary-400 peer-checked:border-primary peer-checked:bg-primary/20" />
          <div>
            <div className="text-sm font-semibold text-secondary-900">
              {title}
            </div>
            {hint ? (
              <div className="text-xs text-secondary-600">{hint}</div>
            ) : null}
          </div>
        </div>
        {typeof price === "string" ? (
          <div className="text-sm font-bold text-secondary-900">{price}</div>
        ) : null}
      </div>
    </label>
  );
}
