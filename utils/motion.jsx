"use client";
import { motion } from "motion/react";
import React from "react";

const soft = { duration: 1, ease: [0.22, 1, 0.36, 1] };

export const variants = {
  fadeRise: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: soft },
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: soft },
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: soft },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: soft },
  },
  slideUp: {
    hidden: { y: 50 },
    visible: { y: 0, transition: soft },
  },
  zoomIn: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1, transition: soft },
  },
  openRight: {
    hidden: { width: 0 },
    visible: { width: "100%", transition: soft },
  },
  stagger: (gap = 0.12, delay = 0.1) => ({
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: gap, delayChildren: delay },
    },
  }),
};

export const viewportOnce20 = { once: true, amount: 0.2 };

export const MotionInView = ({
  as: Tag = motion.div,
  children,
  v = variants.fadeRise,
  viewport = viewportOnce20,
  className,
  duration,
  delay,
  ease,
  staggerGap,
  staggerDelay,
  ...rest
}) => {
  const resolved = React.useMemo(() => {
    const base = typeof v === "function" ? v() : v;
    const out = {
      hidden: { ...(base?.hidden || {}) },
      visible: { ...(base?.visible || {}) },
    };
    const t = { ...(out.visible?.transition || {}) };

    if (typeof t.staggerChildren === "number") {
      if (typeof staggerGap === "number") t.staggerChildren = staggerGap;
      if (typeof staggerDelay === "number") t.delayChildren = staggerDelay;
    }
    if (typeof duration === "number") t.duration = duration;
    if (typeof delay === "number") t.delay = delay;
    if (Array.isArray(ease) || typeof ease === "string") t.ease = ease;

    if (Object.keys(t).length) out.visible.transition = t;
    return out;
  }, [v, duration, delay, ease, staggerGap, staggerDelay]);

  return (
    <Tag
      variants={resolved}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
};
