"use client";
import { cn } from "@/utils/cn";
import { motion, useInView, useReducedMotion } from "motion/react";
import React from "react";

const sizeByTag = {
  h1: "text-6xl",
  h2: "text-[52px]",
  h3: "text-5xl",
  h4: "text-2xl",
  h5: "text-xl",
  h6: "text-lg",
  p: "text-base",
  div: "",
  span: "",
};

const easeMap = {
  smooth: [0.22, 1, 0.36, 1],
  gentle: [0.25, 1, 0.5, 1],
  linear: "linear",
};

/**
 * @param {{
 *  children: React.ReactNode,
 *  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>,
 *  className?: string,
 *  tone?: 'dark'|'light',
 *  delay?: number,
 *  distance?: number,
 *  duration?: number,
 *  charStagger?: number,
 *  ease?: 'smooth'|'gentle'|'linear'|number[]
 * }} props
 */
export default function Title({
  children,
  as = "h2",
  className = "",
  tone = "dark",
  delay = 0,
  distance = 50,
  duration = 1.0,
  charStagger = 0.02,
  ease = "smooth",
}) {
  const Tag = as || "h2";
  const tagName = typeof Tag === "string" ? Tag : "div";
  const sizeClass = sizeByTag[tagName] ?? "";
  const tones = { dark: "text-black", light: "text-white" };

  const ref = React.useRef(null);
  const inView = useInView(ref, {
    once: false,
    amount: 0.1,
    margin: "0px 0px -10% 0px",
  });
  const reduce = useReducedMotion();

  const resolvedEase =
    Array.isArray(ease) || ease === "linear"
      ? ease
      : easeMap[ease] || easeMap.smooth;

  const visible = { opacity: 1, x: 0 };
  const hidden = { opacity: 0, x: distance };

  const initialPose = reduce ? visible : hidden;
  const animatePose = reduce ? visible : inView ? visible : undefined;
  const transitionAt = (d) =>
    reduce ? { duration: 0 } : { delay: d, duration, ease: resolvedEase };

  const globalCharRef = React.useRef(0);
  const wordIndexRef = React.useRef(0);
  globalCharRef.current = 0;
  wordIndexRef.current = 0;

  const splitText = React.useCallback(
    function splitTextTree(node) {
      return React.Children.map(node, (child, tIdx) => {
        if (typeof child === "string") {
          return child.split(/(\s+)/).map((token, i) => {
            if (/^\s+$/.test(token)) return token;

            wordIndexRef.current += 1;

            const chars = Array.from(token).map((ch, cIdx) => {
              const d = delay + globalCharRef.current * charStagger;
              const key = `c-${tIdx}-${i}-${cIdx}`;
              globalCharRef.current += 1;
              return (
                <motion.span
                  key={key}
                  initial={initialPose}
                  animate={animatePose}
                  transition={inView ? transitionAt(d) : undefined}
                  className="inline-block will-change-transform transform-gpu"
                >
                  {ch}
                </motion.span>
              );
            });

            return (
              <span
                key={`wf-${tIdx}-${i}`}
                className="inline-block whitespace-nowrap"
              >
                {chars}
              </span>
            );
          });
        }

        if (React.isValidElement(child)) {
          return React.cloneElement(
            child,
            child.props,
            splitTextTree(child.props.children)
          );
        }

        return child;
      });
    },
    [animatePose, charStagger, delay, inView, initialPose, transitionAt]
  );

  return (
    <Tag
      ref={ref}
      className={cn(
        sizeClass,
        "font-semibold leading-[1.076] tracking-[-0.03em] perspective-[400px]",
        tones[tone],
        className
      )}
    >
      {splitText(children)}
    </Tag>
  );
}
