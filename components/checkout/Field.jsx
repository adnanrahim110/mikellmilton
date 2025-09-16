"use client";
import React from "react";

export default function Field({ icon: Icon, className = "", ...props }) {
  return (
    <div className="relative">
      {Icon ? (
        <Icon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary-500" />
      ) : null}
      <input
        {...props}
        className={`w-full rounded-xl border border-white/60 bg-white/85 ${
          Icon ? "pl-9 pr-3" : "px-3"
        } py-3 text-sm text-secondary-900 placeholder:text-secondary-400 shadow-inner focus:outline-none focus:ring-4 focus:ring-primary/25 ${className}`}
      />
    </div>
  );
}
