"use client";

import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { MotionInView, variants } from "@/utils/motion";
import {
  BookOpenText,
  Heart,
  Layers,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import { motion } from "motion/react";

const defaultItems = [
  {
    Icon: Target,
    title: "Aim is everything",
    text: "Name the result. Cut the noise. Make the next move obvious.",
  },
  {
    Icon: ShieldCheck,
    title: "Keep it solid",
    text: "Tell the truth. Document decisions. Own the tradeoffs.",
  },
  {
    Icon: Layers,
    title: "Stack small wins",
    text: "Short loops that compound into momentum you can feel.",
  },
  {
    Icon: Sparkles,
    title: "Make it teachable",
    text: "Artifacts that others can pick up and run without you.",
  },
  {
    Icon: BookOpenText,
    title: "Write to think",
    text: "Clear writing forces clear thinking. No fluff. No filler.",
  },
  {
    Icon: Heart,
    title: "Respect the audience",
    text: "Useful beats clever. Helpful beats loud. People first.",
  },
];

const AboutValuesDark = ({
  eyebrow = "Principles",
  title = "How I work when it matters",
  items = defaultItems,
}) => {
  return (
    <section className="relative bg-black py-[100px] md:py-[120px]">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-28 -left-28 h-[420px] w-[420px] rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-28 -right-28 h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute inset-0 opacity-20 mix-blend-multiply bg-[url('/imgs/texture2.jpg')] bg-center bg-no-repeat bg-[length:70%_80%]" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
            backgroundSize: "22px 22px, 22px 22px",
          }}
        />
      </div>

      <div className="container">
        <div className="mb-10 md:mb-14 space-y-4">
          <Subtitle tone="light">{eyebrow}</Subtitle>
          <Title tone="light" className="text-[clamp(28px,5vw,44px)]">
            {title}
          </Title>
        </div>

        <div className="grid gap-5 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map(({ Icon, title, text }, i) => (
            <MotionInView
              key={title + i}
              as={motion.div}
              v={variants.fadeRise}
              viewport={{ once: true, amount: 0.5 }}
              delay={i * 0.06}
              className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md ring-1 ring-white/10 shadow-2xl"
            >
              <div className="p-6 md:p-7">
                <div className="mb-4 flex items-center gap-3">
                  <span className="inline-grid place-items-center size-11 rounded-xl bg-primary/15 text-primary">
                    <Icon className="w-5 h-5" />
                  </span>
                  <h3 className="text-white text-lg font-semibold">{title}</h3>
                </div>
                <p className="text-secondary-200 text-sm leading-relaxed">
                  {text}
                </p>
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" />
              <motion.span
                aria-hidden
                className="absolute -top-10 -right-10 size-28 rounded-full opacity-0"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(255,190,0,.35), rgba(255,190,0,0))",
                }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </MotionInView>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutValuesDark;
