"use client";

import DownloadCard from "./DownloadCard";

export default function DownloadList({ items, now, tone }) {
  return (
    <ul className="grid gap-4 sm:gap-5 sm:grid-cols-2">
      {items.map((d, i) => (
        <DownloadCard key={d.download_token || i} d={d} now={now} tone={tone} />
      ))}
    </ul>
  );
}
