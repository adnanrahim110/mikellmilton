"use client";

import P from "@/components/ui/P";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { MotionInView, variants } from "@/utils/motion";
import { motion } from "motion/react";

const AboutFeatureWipe = ({
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
            <Subtitle tone="dark">
              Witness to prophecy. Servant of destiny.
            </Subtitle>
            <Title className="text-[clamp(28px,5vw,44px)]">
              THE VISION I CARRY
            </Title>
            <ul className="grid gap-3 pt-2">
              {[
                "I write to reveal prophecy that has been hidden for generations.",
                "I teach so that the scattered can rediscover their true identity.",
                "I build to prepare a people ready for sovereignty and eternity.",
                "I move with the conviction that every word written becomes a torch for others to run with.",
                "I serve not for myself, but for YAHAWAH’s plan through Christ-King Yashiah.",
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center size-8 rounded-lg bg-primary/15 text-primary">
                    <span className="size-2 rounded-full bg-primary" />
                  </span>
                  <span className="text-secondary">{t}</span>
                </li>
              ))}
            </ul>
            <P>
              This is my calling: to stand as a witness, to write as a servant,
              and to make the truth known in this generation.
            </P>
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
