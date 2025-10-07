"use client";

import { RefreshCw } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { PrimaryButton } from "./Buttons";
import DownloadList from "./DownloadList";
import EmailBanner from "./EmailBanner";
import EmptyState from "./EmptyState";
import Panel from "./Panel";
import SkeletonList from "./SkeletonList";

function msTone(ms) {
  if (ms == null) return "neutral";
  if (ms <= 0) return "expired";
  if (ms <= 5 * 60_000) return "panic";
  if (ms <= 60 * 60_000) return "danger";
  if (ms <= 24 * 60 * 60_000) return "warn";
  return "ok";
}

export default function DownloadHub({
  orderPublicId,
  initialDownloads = [],
  emailStatus,
}) {
  const [downloads, setDownloads] = useState(() =>
    (initialDownloads || []).map((d) => ({
      ...d,
      _expiresAtMs: d.expires_at ? new Date(d.expires_at).getTime() : null,
    }))
  );
  const [now, setNow] = useState(Date.now());
  const [loading, setLoading] = useState(false);
  const [emailDismissed, setEmailDismissed] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  async function refresh() {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/orders/${encodeURIComponent(orderPublicId)}/downloads`,
        { headers: { "Cache-Control": "no-cache" } }
      );
      if (!res.ok) throw new Error("x");
      const data = await res.json();
      if (Array.isArray(data.downloads)) {
        setDownloads(
          data.downloads.map((d) => ({
            ...d,
            _expiresAtMs: d.expires_at
              ? new Date(d.expires_at).getTime()
              : null,
          }))
        );
      }
    } catch {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
    const iv = setInterval(refresh, 12000);
    return () => clearInterval(iv);
  }, [orderPublicId]);

  const items = useMemo(() => downloads, [downloads]);

  const hasEmailIssue = useMemo(() => {
    if (!emailStatus) return false;
    if (emailStatus.error) return true;
    const msg =
      typeof emailStatus.message === "string" ? emailStatus.message.trim() : "";
    if (msg) return true;
    return false;
  }, [emailStatus]);

  return (
    <div className="space-y-5">
      {hasEmailIssue && !emailDismissed && (
        <EmailBanner
          message={emailStatus?.message}
          onDismiss={() => setEmailDismissed(true)}
        />
      )}
      <Panel>
        <div className="p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-lg sm:text-xl font-semibold">Downloads</h2>
            <PrimaryButton onClick={refresh}>
              <RefreshCw
                className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              />
              <span className="hidden sm:inline">Refresh</span>
            </PrimaryButton>
          </div>
          {loading && items.length === 0 ? (
            <SkeletonList />
          ) : items.length ? (
            <DownloadList items={items} now={now} tone={msTone} />
          ) : (
            <EmptyState />
          )}
        </div>
      </Panel>
    </div>
  );
}
