"use client";
import { cn } from "@/utils/cn";
import { motion } from "motion/react";
import React from "react";

export default function SectionCard({ children, className }) {
  return (
    <div
      className={cn(
        "bg-gradient-to-r from-primary/30 via-amber-500/20 to-primary/30 p-[1.5px] rounded-[22px] h-full lg:max-h-[138px]",
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-[20px] bg-white/75 backdrop-blur-md ring-1 ring-black/5 shadow-xl p-5 h-full flex flex-col justify-center w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
