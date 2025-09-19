"use client";

import { AlertTriangle } from "lucide-react";

export default function EmailBanner({ message, onDismiss }) {
  return (
    <div className="rounded-3xl border border-amber-300 bg-gradient-to-br from-amber-50 to-white p-4 flex items-start gap-3">
      <AlertTriangle className="w-5 h-5 text-amber-700 mt-0.5" />
      <div className="flex-1">
        <div className="font-semibold text-amber-900">Email issue detected</div>
        <div className="text-amber-800 text-sm">
          We could not confirm your confirmation email was sent
          {message ? `: ${message}` : "."} You can access files below.
        </div>
      </div>
      <button
        className="text-sm underline hover:opacity-80"
        onClick={onDismiss}
      >
        Dismiss
      </button>
    </div>
  );
}
