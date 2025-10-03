"use client";

import { cn } from "@/utils/cn";
import { MotionInView, variants } from "@/utils/motion";
import { PenTool } from "lucide-react";
import { motion } from "motion/react";
import React from "react";

/**
 * @typedef {"light" | "dark"} Tone
 *
 * @typedef {Object} SubtitleProps
 * @property {React.ReactNode} children
 * @property {Tone} [tone="dark"]
 * @property {string} [className]
 * @property {React.ElementType} [icon=PenTool]
 * @property {string} [svgClass]
 * @property {boolean} [stroke=true]
 * @property {number} [iconSize=30]
 * @property {number} [strokeWidth=1]
 */

/** @type {React.FC<SubtitleProps>} */

const Subtitle = ({
  children,
  tone = "dark",
  className,
  icon = PenTool,
  svgClass,
  stroke = true,
  iconSize = 30,
  strokeWidth = 1,
}) => {
  const tones = {
    dark: {
      text: "text-[#060606]",
      fill: "fill-black stroke-white",
    },
    light: {
      text: "text-white",
      fill: "fill-white stroke-black",
    },
  };

  const t = tones[tone] || tones.light;
  const Tag = icon;
  return (
    <MotionInView
      as={motion.h5}
      v={variants.openRight}
      viewport={{ once: true, amount: 0.5 }}
      duration={2.5}
      className={cn(
        "uppercase text-sm lg:text-base font-semibold leading-5 border-b border-b-[#d9d9d9] pb-3 mb-[60px] relative flex overflow-hidden",
        t.text,
        className
      )}
    >
      <span className="grow-0 shrink-0 basis-auto">{children}</span>
      <span className="absolute bottom-0 right-0">
        <Tag
          className={cn(stroke && t.fill, svgClass)}
          strokeWidth={strokeWidth}
          size={iconSize}
        />
      </span>
    </MotionInView>
  );
};

export default Subtitle;
