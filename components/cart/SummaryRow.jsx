import React from "react";

export default function SummaryRow({ label, value, strong = false }) {
  return (
    <div className="flex items-center justify-between py-1">
      <div className="text-sm text-secondary-700">{label}</div>
      <div
        className={`text-sm ${
          strong ? "font-extrabold text-secondary-900" : "text-secondary-900"
        }`}
      >
        {value}
      </div>
    </div>
  );
}
