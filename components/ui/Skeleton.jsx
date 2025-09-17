"use client";

export default function Skeleton({ className = "" }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-neutral-200/70 dark:bg-neutral-800/50 ${className}`}
      aria-hidden="true"
    />
  );
}
