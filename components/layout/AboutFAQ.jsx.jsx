"use client";

import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const defaultItems = [
  {
    q: "What’s your approach in one line?",
    a: "Clarity first, then action. Strip the noise, name the target, move in tight loops.",
  },
  {
    q: "How do projects usually start?",
    a: "With a short brief and a single outcome. We align on constraints, draft a simple system, then ship the first useful version fast.",
  },
  {
    q: "What do you write or build most?",
    a: "Operating notes, teaching artifacts, and small tools that make decisions easier and outcomes more consistent.",
  },
  {
    q: "How do you measure progress?",
    a: "By shipped artifacts and decisions unlocked. Less ceremony, more proof.",
  },
];

const Item = ({ i, open, onToggle, q, a }) => {
  const isOpen = open === i;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/40 bg-white/75 backdrop-blur-md ring-1 ring-black/5 shadow-xl">
      <button
        onClick={() => onToggle(isOpen ? -1 : i)}
        className="w-full flex items-center justify-between gap-4 px-5 md:px-6 py-4 text-left"
      >
        <div className="flex items-center gap-3">
          <span className="relative">
            <span
              className="block size-7 rounded-full"
              style={{
                background:
                  "conic-gradient(hsl(45 100% 50%) 70%, rgba(0,0,0,0.08) 0)",
              }}
            />
            <span className="absolute inset-1 rounded-full bg-white ring-1 ring-black/5" />
          </span>
          <span className="font-semibold text-secondary-950">{q}</span>
        </div>

        <motion.span
          initial={false}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="shrink-0 grid place-items-center size-9 rounded-lg bg-primary/15 text-primary"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-5 md:px-6 pb-5 md:pb-6 text-sm text-secondary-700">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-black/5" />
    </div>
  );
};

const AboutFAQ = ({
  eyebrow = "Answers",
  title = "Quick Q&A",
  items = defaultItems,
}) => {
  const [open, setOpen] = useState(-1);

  return (
    <section className="relative py-[120px]">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-28 -left-24 h-[420px] w-[420px] rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute inset-0 opacity-30 mix-blend-multiply bg-[url('/imgs/texture2.jpg')] bg-center bg-no-repeat bg-[length:70%_80%]" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.08) 1px, transparent 1px)",
            backgroundSize: "22px 22px, 22px 22px",
          }}
        />
      </div>

      <div className="container">
        <div className="mb-10 space-y-4">
          <Subtitle tone="dark">{eyebrow}</Subtitle>
          <Title className="text-[clamp(28px,5vw,44px)]">{title}</Title>
        </div>

        <div className="grid gap-4 md:gap-5">
          {items.map((item, i) => (
            <Item
              key={i}
              i={i}
              open={open}
              onToggle={setOpen}
              q={item.q}
              a={item.a}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutFAQ;
