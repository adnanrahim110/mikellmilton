"use client";

import P from "@/components/ui/P";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { BookOpenText, Sparkles, Target } from "lucide-react";
import { motion } from "motion/react";

const AboutStory = ({
  eyebrow = "Origin",
  title = "Why I do this",
  lead = "The through-line is simple. Clarity first. Then action. I write, teach, and build around that idea so people move with purpose.",
  bullets = [
    { icon: Sparkles, text: "Clarity over noise. Build for signal." },
    { icon: Target, text: "Aim true. Make decisions that age well." },
    { icon: BookOpenText, text: "Write it down. Teach it so others can run." },
  ],
  portrait = "/imgs/about-portrait.jpg",
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
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <Subtitle tone="dark">{eyebrow}</Subtitle>
            <Title className="text-[clamp(28px,5vw,44px)]">{title}</Title>
            <P>{lead}</P>

            <ul className="mt-2 grid gap-3">
              {bullets.map(({ icon: Icon, text }, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center size-9 rounded-lg bg-primary/15 text-primary">
                    <Icon className="w-4 h-4" />
                  </span>
                  <span className="text-secondary">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-[520px]"
          >
            <div className="relative rounded-3xl border border-white/40 bg-white/70 backdrop-blur-md ring-1 ring-black/5 shadow-2xl overflow-hidden">
              <img
                src={portrait}
                alt=""
                className="block w-full h-[560px] object-cover"
              />

              <div className="absolute left-4 bottom-4 right-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-black/60 px-3 py-2 text-white text-xs">
                    <span className="size-2 rounded-full bg-primary" />
                    Writer
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-black/60 px-3 py-2 text-white text-xs">
                    <span className="size-2 rounded-full bg-primary" />
                    Teacher
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-black/60 px-3 py-2 text-white text-xs">
                    <span className="size-2 rounded-full bg-primary" />
                    Builder
                  </span>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-black/5" />
            </div>

            <motion.div
              aria-hidden
              className="absolute -inset-3 rounded-[28px] opacity-70"
              style={{
                background:
                  "conic-gradient(from 0deg, rgba(255,190,0,.6), rgba(255,190,0,.15) 30%, transparent 60%, rgba(255,190,0,.4) 85%, rgba(255,190,0,.6))",
                filter: "blur(12px)",
              }}
              initial={{ rotate: 0 }}
              whileInView={{ rotate: 360 }}
              transition={{ duration: 20, ease: "linear", repeat: Infinity }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutStory;
