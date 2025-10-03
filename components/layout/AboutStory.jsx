"use client";

import P from "@/components/ui/P";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { BookOpenText, Sparkles, Target } from "lucide-react";
import { motion } from "motion/react";

const AboutStory = ({ portrait = "/imgs/home-sec8.jpg" }) => {
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
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <Subtitle tone="dark">Clarity first. Action always.</Subtitle>
            <Title className="text-[clamp(28px,5vw,44px)]">
              Why It Matters
            </Title>
            <P>
              The through-line has always been simple: clarity first, then
              action. we write, teach, and build so people can move with
              purpose. In a world full of noise, we believe in choosing the
              signal, the truth that cuts through distraction and points us
              toward lasting direction.
            </P>
            <P>
              Clarity leads to courage, and courage leads to impact. That’s why
              we aim true, make decisions that age well, and leave words behind
              that others can run with. Writing is not just expression, it’s a
              map, a guide, and a mission.
            </P>
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
                className="block w-full object-contain"
              />

              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-black/5" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutStory;
