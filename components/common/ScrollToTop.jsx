"use client";

import { useLenis } from "lenis/react";
import { ChevronUp } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

const ScrollToTop = () => {
  const lenis = useLenis();
  const [visible, setVisible] = useState(false);

  const fgRef = useRef(null);
  const btnRef = useRef(null);

  const size = 56;
  const stroke = 5;
  const r = (size - stroke) / 2;
  const circumference = useMemo(() => 2 * Math.PI * r, [r]);

  useEffect(() => {
    const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

    const setProgress = (p) => {
      const clamped = clamp01(p || 0);
      if (fgRef.current) {
        fgRef.current.style.strokeDashoffset = String(
          circumference * (1 - clamped)
        );
      }
      if (btnRef.current) {
        btnRef.current.setAttribute(
          "aria-valuenow",
          String(Math.round(clamped * 100))
        );
      }
      setVisible((prev) => {
        const next = clamped > 0.02;
        return prev === next ? prev : next;
      });
    };

    if (lenis) {
      const onScroll = (e) => {
        const limit =
          typeof e?.limit === "number"
            ? e.limit
            : (lenis.limit ??
                document.documentElement.scrollHeight - window.innerHeight) ||
              1;
        const scroll =
          typeof e?.scroll === "number"
            ? e.scroll
            : lenis.scroll ?? window.scrollY;
        const p =
          typeof e?.progress === "number" ? e.progress : scroll / (limit || 1);
        setProgress(p);
      };
      lenis.on("scroll", onScroll);
      onScroll({
        scroll: lenis.scroll,
        limit: lenis.limit,
        progress: lenis.progress,
      });
      return () => lenis.off("scroll", onScroll);
    } else {
      const onFallback = () => {
        const limit =
          document.documentElement.scrollHeight - window.innerHeight || 1;
        const p = window.scrollY / limit;
        setProgress(p);
      };
      window.addEventListener("scroll", onFallback, { passive: true });
      onFallback();
      return () => window.removeEventListener("scroll", onFallback);
    }
  }, [lenis, circumference]);

  const handleClick = () => {
    if (lenis) {
      lenis.scrollTo(0, {
        duration: 0.9,
        easing: (t) => 1 - Math.pow(1 - t, 3),
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div
      className={[
        "fixed bottom-4 right-3 z-50 pointer-events-none",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
        "transition-all duration-300 ease-out",
      ].join(" ")}
    >
      <button
        ref={btnRef}
        onClick={handleClick}
        aria-label="Back to top"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        className="pointer-events-auto relative grid place-items-center size-14 rounded-full bg-black/70 backdrop-blur-md shadow-xl border border-white/15 hover:bg-black/75 focus:outline-none focus:ring-4 focus:ring-primary/40 active:scale-95 transition-all"
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="absolute inset-0 -top-px -left-px"
          aria-hidden="true"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke="rgba(255,255,255,0.15)"
            strokeWidth={stroke}
            fill="none"
          />
          <circle
            ref={fgRef}
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke="currentColor"
            strokeWidth={stroke}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            strokeLinecap="round"
            className="text-primary"
            style={{
              transform: "rotate(-90deg)",
              transformOrigin: "50% 50%",
            }}
          />
        </svg>

        <ChevronUp className="w-5 h-5 text-white relative z-10" />
        <span className="sr-only">Scroll to top</span>
      </button>
    </div>
  );
};

export default ScrollToTop;
