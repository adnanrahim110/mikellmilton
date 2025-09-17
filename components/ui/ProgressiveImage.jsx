"use client";
import Image from "next/image";
import React from "react";

const Spinner = () => (
  <div className="absolute inset-0 grid place-items-center">
    <svg
      className="h-6 w-6 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-20"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        d="M22 12a10 10 0 0 1-10 10"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  </div>
);

export default function ProgressiveImage({
  src,
  alt,
  width = 400,
  height = 720,
  className = "",
  priority = false,
}) {
  const [loaded, setLoaded] = React.useState(false);

  return (
    <div className="relative w-full overflow-hidden">
      {!loaded && <Spinner />}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={`block w-full transform transition-[filter,transform,opacity] duration-500 ${
          loaded
            ? "opacity-100 blur-0 scale-100"
            : "opacity-80 blur-md scale-105"
        } ${className}`}
        onLoadingComplete={() => setLoaded(true)}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/[0.03] to-transparent" />
    </div>
  );
}
