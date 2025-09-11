"use client";

import P from "@/components/ui/P";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { MotionInView, variants } from "@/utils/motion";
import { motion } from "motion/react";

const AboutFeatureWipe = ({
  eyebrow = "Lorem ipsum",
  title = "Lorem ipsum dolor",
  lead = " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos expedita aliquid, ex, deleniti, necessitatibus architecto ut possimus libero est nemo reprehenderit? Corrupti dolorem unde nisi repudiandae esse, suscipit eius iusto architecto debitis, earum rerum quibusdam iure laudantium aut magni eveniet.",
  bullets = [
    "orem, ipsum dolor sit amet consectetur",
    "orem, ipsum dolor sit amet consectetur",
    "orem, ipsum dolor sit amet consectetur",
  ],
  images = [
    { src: "/imgs/home-sec10.jpeg", alt: "Field note" },
    { src: "/imgs/home-sec5.jpeg", alt: "Workshop" },
    { src: "/imgs/home-sec3.jpeg", alt: "Artifact" },
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
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-6">
            <Subtitle tone="dark">{eyebrow}</Subtitle>
            <Title className="text-[clamp(28px,5vw,44px)]">{title}</Title>
            <P>{lead}</P>

            <ul className="grid gap-3 pt-2">
              {bullets.map((t, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center size-8 rounded-lg bg-primary/15 text-primary">
                    <span className="size-2 rounded-full bg-primary" />
                  </span>
                  <span className="text-secondary">{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-5">
            <MotionInView
              as={motion.div}
              v={variants.fadeIn}
              viewport={{ once: true, amount: 0.5 }}
              className="overflow-hidden rounded-3xl border border-white/40 bg-white/70 backdrop-blur-md ring-1 ring-black/5 shadow-2xl"
            >
              <motion.div
                variants={variants.wipeLeft}
                style={{ willChange: "clip-path" }}
                className="w-full h-full"
              >
                <img
                  src={images[0]?.src}
                  alt={images[0]?.alt || ""}
                  className="block w-full h-[380px] object-cover"
                />
              </motion.div>
            </MotionInView>

            <div className="grid gap-5 md:grid-cols-2">
              <MotionInView
                as={motion.div}
                v={variants.fadeIn}
                viewport={{ once: true, amount: 0.5 }}
                className="overflow-hidden rounded-3xl border border-white/40 bg-white/70 backdrop-blur-md ring-1 ring-black/5 shadow-xl"
              >
                <motion.div
                  variants={variants.wipeRight}
                  style={{ willChange: "clip-path" }}
                  className="w-full h-full"
                >
                  <img
                    src={images[1]?.src}
                    alt={images[1]?.alt || ""}
                    className="block w-full h-[240px] object-cover"
                  />
                </motion.div>
              </MotionInView>

              <MotionInView
                as={motion.div}
                v={variants.fadeIn}
                viewport={{ once: true, amount: 0.5 }}
                className="overflow-hidden rounded-3xl border border-white/40 bg-white/70 backdrop-blur-md ring-1 ring-black/5 shadow-xl"
              >
                <motion.div
                  variants={variants.wipeLeft}
                  style={{ willChange: "clip-path" }}
                  className="w-full h-full"
                >
                  <img
                    src={images[2]?.src}
                    alt={images[2]?.alt || ""}
                    className="block w-full h-[240px] object-cover"
                  />
                </motion.div>
              </MotionInView>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutFeatureWipe;
