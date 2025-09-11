"use client";

import P from "@/components/ui/P";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { motion } from "motion/react";

const AboutTimeline = ({
  eyebrow = "Milestones",
  title = "Chapters that shaped the work",
  items = [
    {
      year: "2016",
      heading: "First principles",
      text: "Cut noise. Chase signal. Started writing and teaching around that frame.",
    },
    {
      year: "2019",
      heading: "Built in public",
      text: "Shipped small, daily. Tight feedback loops. Momentum over perfection.",
    },
    {
      year: "2022",
      heading: "Teaching at scale",
      text: "Turned notes into systems people could actually run with.",
    },
    {
      year: "2025",
      heading: "Clarity + Action",
      text: "The through-line. Write. Build. Point people toward purpose.",
    },
  ],
}) => {
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

        <div className="relative">
          <div className="pointer-events-none absolute left-6 top-0 bottom-0">
            <div className="h-full w-[2px] bg-gradient-to-b from-primary via-primary/50 to-transparent" />
          </div>

          <ol className="space-y-10">
            {items.map((item, i) => (
              <motion.li
                key={`${item.year}-${i}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-16"
              >
                <div className="absolute left-3 top-0">
                  <div className="relative">
                    <div
                      className="size-8 rounded-full"
                      style={{
                        background:
                          "conic-gradient(hsl(45 100% 50%) 60%, rgba(0,0,0,0.1) 0)",
                      }}
                    />
                    <div className="absolute inset-1 rounded-full bg-white ring-1 ring-black/5" />
                    <span className="absolute -left-1 top-9 text-[11px] font-semibold text-secondary-500">
                      {item.year}
                    </span>
                  </div>
                </div>

                <div className="relative rounded-2xl border border-white/40 bg-white/75 backdrop-blur-md ring-1 ring-black/5 shadow-xl">
                  <div className="p-5 md:p-6">
                    <h3 className="text-lg md:text-xl font-semibold text-secondary-950">
                      {item.heading}
                    </h3>
                    <P className="mt-2 text-secondary">{item.text}</P>
                  </div>
                  <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-black/5" />
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default AboutTimeline;
