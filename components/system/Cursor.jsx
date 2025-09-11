"use client";
import { motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

function lineHeightPxFor(el) {
  const cs = window.getComputedStyle(el);
  const lh = cs.lineHeight;
  const fs = parseFloat(cs.fontSize) || 16;
  if (lh.endsWith("px")) return parseFloat(lh);
  const numeric = parseFloat(lh);
  if (!Number.isNaN(numeric)) return numeric * fs;
  return 1.2 * fs;
}

const Cursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState(12);
  const [blend, setBlend] = useState("difference");
  const [linkRect, setLinkRect] = useState(null);
  const [radius, setRadius] = useState("9999px");
  const [opcty, setOpcty] = useState(1);

  const rafThrottleRef = useRef(null);
  const rafLerpRef = useRef(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const lastHeadingRef = useRef(null);
  const lastLinkRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ALPHA = prefersReduced ? 1 : 0.18;

    const tick = () => {
      setPos((p) => {
        const nx = p.x + (targetRef.current.x - p.x) * ALPHA;
        const ny = p.y + (targetRef.current.y - p.y) * ALPHA;
        return { x: nx, y: ny };
      });
      rafLerpRef.current = requestAnimationFrame(tick);
    };
    rafLerpRef.current = requestAnimationFrame(tick);

    const onMove = (e) => {
      if (rafThrottleRef.current) cancelAnimationFrame(rafThrottleRef.current);
      rafThrottleRef.current = requestAnimationFrame(() => {
        const x = e.clientX;
        const y = e.clientY;
        const el = document.elementFromPoint(x, y);
        const link =
          el?.closest?.(
            "a[href]:not(.btn), [role='link'], [role='button'], button:not(.btn)"
          ) || null;
        const btn = el?.closest?.(".btn") || null;
        const heading = el?.closest?.("h1, h2") || null;

        targetRef.current = { x, y };

        if (link) {
          if (lastLinkRef.current !== link) {
            lastLinkRef.current = link;
            const r = link.getBoundingClientRect();
            const w = Math.max(10, Math.round(r.width) + 16);
            const h = Math.max(10, Math.round(r.height) + 12);
            setLinkRect({ w, h });
            setRadius("0.3rem");
            setOpcty(0.2);
          }
          if (blend !== "difference") setBlend("difference");
          return;
        } else {
          if (lastLinkRef.current) {
            lastLinkRef.current = null;
            setLinkRect(null);
            setOpcty(1);
            setRadius("9999px");
          }
        }
        if (btn) {
          if (blend !== "difference") setBlend("difference");
        } else {
          if (heading) {
            if (lastHeadingRef.current !== heading) {
              lastHeadingRef.current = heading;
              const lh = clamp(Math.round(lineHeightPxFor(heading)), 16, 300);
              setSize(lh + 15);
            }
            if (blend !== "difference") setBlend("difference");
          } else {
            if (lastHeadingRef.current) lastHeadingRef.current = null;
            if (size !== 12) setSize(12);
            if (blend !== "difference") setBlend("difference");
          }
        }
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafThrottleRef.current) cancelAnimationFrame(rafThrottleRef.current);
      if (rafLerpRef.current) cancelAnimationFrame(rafLerpRef.current);
    };
  }, [blend, size]);

  if (!mounted) return null;

  const halfX = (linkRect?.w ?? size) / 2;
  const halfY = (linkRect?.h ?? size) / 2;

  const dot = (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 z-[9999] pointer-events-none will-change-transform"
      style={{
        width: linkRect ? linkRect.w : size,
        height: linkRect ? linkRect.h : size,
        background: blend === "difference" ? "white" : "#ffbe00",
        mixBlendMode: blend,
        opacity: opcty,
        borderRadius: radius,
        transition:
          "width .2s cubic-bezier(.22,.61,.36,1), height .2s cubic-bezier(.22,.61,.36,1), border-radius .2s ease, background-color .2s ease",
      }}
      animate={{ x: pos.x - halfX, y: pos.y - halfY }}
      transition={{ type: "spring", stiffness: 900, damping: 40, mass: 0.2 }}
    />
  );

  return createPortal(dot, document.body);
};

export default Cursor;
