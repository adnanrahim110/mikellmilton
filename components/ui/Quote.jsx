"use client";
import { cn } from "@/utils/cn";
import { MotionInView, variants } from "@/utils/motion";
import { motion } from "motion/react";
import React from "react";
import { LiaQuoteLeftSolid } from "react-icons/lia";

const Quote = ({
  children,
  author = "",
  tone = "light",
  className = "",
  variant = variants.fadeRise,
  amount = 0.5,
  delay = 0,
  once = true,
  duration = 1,
  iconClass = "",
}) => {
  const tones = {
    light: {
      text: "text-secondary",
      bg: "bg-primary-100",
      authorBg: "bg-primary-300",
      icon: "text-primary",
    },
    dark: {
      text: "text-neutral-200",
      bg: "bg-primary-950",
      authorBg: "bg-primary-700",
      icon: "text-primary",
    },
  };

  const t = tones[tone] || tones.dark;

  return (
    <MotionInView
      as={motion.blockquote}
      v={variant}
      viewport={{ once: once, amount: amount }}
      duration={duration}
      delay={delay}
      className={cn("p-3 pl-[82px] relative", t.bg, t.text, className)}
    >
      <span
        className={cn(
          "absolute -top-1.5 left-0 text-[78px]",
          t.icon,
          iconClass
        )}
      >
        <LiaQuoteLeftSolid />
      </span>
      <p className={cn("leading-[1.4] text-base italic font-medium", t.text)}>
        {children}
      </p>
      <span
        className={cn(
          "absolute -bottom-3 right-3 px-3 py-0.5 font-semibold text-sm",
          t.authorBg
        )}
      >
        - {author}
      </span>
    </MotionInView>
  );
};

export default Quote;
