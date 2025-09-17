"use client";

import P from "@/components/ui/P";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { Compass, HandHeart, Shield, Target } from "lucide-react";
import { motion } from "motion/react";

const cards = [
  {
    Icon: Compass,
    title: "Clarity",
    text: "Cut noise. Name the goal. Make the next move obvious.",
  },
  {
    Icon: Target,
    title: "Discipline",
    text: "Tight loops. Ship small. Improve what matters.",
  },
  {
    Icon: HandHeart,
    title: "Service",
    text: "Make useful things. Teach what works. Leave people better.",
  },
  {
    Icon: Shield,
    title: "Courage",
    text: "Tell the truth. Protect the mission. Own the results.",
  },
];

const Stat = ({ label, value }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className="relative rounded-2xl border border-white/40 bg-white/75 backdrop-blur-md ring-1 ring-black/5 shadow-xl px-6 py-5"
  >
    <div className="flex items-end gap-2">
      <div className="relative">
        <div
          className="size-10 rounded-full"
          style={{
            background:
              "conic-gradient(hsl(45 100% 50%) 60%, rgba(0,0,0,0.08) 0)",
          }}
        />
        <div className="absolute inset-1 rounded-full bg-white ring-1 ring-black/5" />
      </div>
      <div className="text-3xl font-extrabold text-secondary-950 leading-none">
        {value}
      </div>
    </div>
    <div className="mt-2 text-sm text-secondary-600">{label}</div>
    <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-black/5" />
  </motion.div>
);

const AboutValues = () => {
  return (
    <section className="relative py-[120px]">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-28 -left-24 h-[420px] w-[420px] rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-amber-500/10 blur-3xl" />

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
          <Subtitle tone="dark">Values</Subtitle>
          <Title className="text-[clamp(28px,5vw,44px)]">How I work</Title>
          <P>
            The lens stays the same across projects. Clear aims, steady cadence,
            and a bias toward useful outcomes.
          </P>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ Icon, title, text }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.05,
              }}
              className="group relative overflow-hidden rounded-2xl border border-white/40 bg-white/75 backdrop-blur-md ring-1 ring-black/5 shadow-xl"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute -right-10 -top-10 size-40 rounded-full bg-primary/10 blur-2xl" />
              </div>
              <div className="p-6">
                <span className="inline-flex items-center justify-center size-11 rounded-xl bg-primary/15 text-primary">
                  <Icon className="w-5 h-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-secondary-950">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-secondary-700">{text}</p>
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-black/5" />
            </motion.div>
          ))}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <Stat label="Years writing" value="9+" />
          <Stat label="Projects shipped" value="40+" />
          <Stat label="Readers reached" value="100K+" />
        </div>
      </div>
    </section>
  );
};

export default AboutValues;
