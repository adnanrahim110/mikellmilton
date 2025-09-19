"use client";

import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  DownloadCloud,
} from "lucide-react";
import { PrimaryButton } from "./Buttons";

function fmt(ms) {
  if (ms == null) return "No expiry";
  if (ms <= 0) return "Expired";
  const t = Math.floor(ms / 1000);
  const d = Math.floor(t / 86400);
  const h = Math.floor((t % 86400) / 3600);
  const m = Math.floor((t % 3600) / 60);
  const s = t % 60;
  const parts = [];
  if (d) parts.push(`${d}d`);
  if (h) parts.push(`${h}h`);
  if (m) parts.push(`${m}m`);
  parts.push(`${s}s`);
  return parts.join(" ");
}
function fileLabel(format = "") {
  const f = String(format).toLowerCase();
  if (f.includes("pdf")) return "PDF";
  if (f.includes("epub")) return "EPUB";
  if (f.includes("mobi") || f.includes("azw")) return "MOBI";
  if (f.includes("zip")) return "ZIP";
  if (f.includes("mp3") || f.includes("wav") || f.includes("flac"))
    return "AUDIO";
  if (f.includes("mp4") || f.includes("mov") || f.includes("mkv"))
    return "VIDEO";
  return "FILE";
}
function toneClass(t) {
  if (t === "panic" || t === "danger")
    return {
      text: "text-red-600",
      bar: "from-red-500 to-red-400",
      pill: "bg-red-50 border-red-400 text-red-700",
    };
  if (t === "warn")
    return {
      text: "text-amber-700",
      bar: "from-amber-500 to-amber-400",
      pill: "bg-amber-50 border-amber-400 text-amber-800",
    };
  if (t === "ok")
    return {
      text: "text-emerald-700",
      bar: "from-emerald-500 to-emerald-400",
      pill: "bg-emerald-50 border-emerald-400 text-emerald-800",
    };
  if (t === "expired")
    return {
      text: "text-zinc-600",
      bar: "from-zinc-400 to-zinc-300",
      pill: "bg-zinc-100 border-zinc-300 text-zinc-600",
    };
  return {
    text: "text-zinc-600",
    bar: "from-zinc-400 to-zinc-300",
    pill: "bg-white border-zinc-200 text-zinc-700",
  };
}

export default function DownloadCard({ d, now, tone }) {
  const remaining = d._expiresAtMs ? d._expiresAtMs - now : null;
  const t = tone(remaining);
  const c = toneClass(t);
  const expired = t === "expired";
  const max = d.max_downloads ?? Infinity;
  const used = d.download_count ?? 0;
  const noQuota = Number.isFinite(max) && used >= max;

  const startMs = d._expiresAtMs
    ? Math.max(1, d._expiresAtMs - (d._createdAtMs || 0))
    : null;
  const pctLeft =
    remaining != null && startMs
      ? Math.max(0, Math.min(1, remaining / startMs))
      : remaining == null
      ? 1
      : remaining <= 0
      ? 0
      : 1;

  return (
    <li className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition-all hover:shadow-md hover:-translate-y-[2px]">
      <div className="p-5 sm:p-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="shrink-0 w-full sm:w-auto">
              <div
                className={`rounded-2xl border ${c.pill} px-3 py-2 flex items-center justify-between gap-3`}
              >
                <div
                  className={`inline-flex items-center gap-2 ${c.text} text-sm`}
                >
                  <Clock className="h-4 w-4" />
                  {fmt(remaining)}
                </div>
                <div className="h-1.5 w-24 rounded-full bg-zinc-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${c.bar} transition-[width] duration-500`}
                    style={{ width: `${pctLeft * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-2 text-sm text-zinc-600">
            Downloaded <b>{used}</b> {used === 1 ? "time" : "times"}
            {Number.isFinite(max) ? (
              <span className="text-zinc-500"> · Max {max}</span>
            ) : null}
          </div>
          <div className="pt-1">
            <PrimaryButton
              href={
                expired || noQuota
                  ? undefined
                  : `/api/downloads/${d.download_token}`
              }
              aria-disabled={expired || noQuota}
              className={[
                "w-full sm:w-auto",
                expired || noQuota ? "opacity-50 pointer-events-none" : "",
              ].join(" ")}
            >
              <DownloadCloud className="w-4 h-4" />
              Download
            </PrimaryButton>
          </div>

          <div className="text-xs text-zinc-600 flex items-center gap-2">
            {expired ? (
              <>
                <AlertTriangle className="w-3.5 h-3.5" />
                Link expired
              </>
            ) : noQuota ? (
              <>
                <AlertTriangle className="w-3.5 h-3.5" />
                No downloads remaining
              </>
            ) : (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Ready to download
              </>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}
