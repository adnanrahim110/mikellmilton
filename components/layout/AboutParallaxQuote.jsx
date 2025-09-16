"use client";

import Title from "@/components/ui/Title";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const AboutParallaxQuote = ({ imageSrc = "/imgs/home-sec3.jpeg" }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

  return (
    <section ref={ref} className="relative w-full overflow-hidden py-40">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full bg-primary/20 blur-3xl opacity-70" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-amber-500/10 blur-3xl opacity-60" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.08) 1px, transparent 1px)",
            backgroundSize: "22px 22px, 22px 22px",
          }}
        />
      </div>

      <motion.img
        src={imageSrc}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ y, scale, willChange: "transform" }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/60" />

      <div className="relative h-full">
        <div className="container h-full">
          <div className="h-full grid place-items-center">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-3xl w-full rounded-3xl border border-white/15 bg-white/5 backdrop-blur-md ring-1 ring-white/10 shadow-2xl p-8 md:p-10 text-center"
            >
              <Title
                tone="light"
                className="text-[clamp(20px,3.6vw,36px)] leading-tight"
              >
                Write the vision and make it plain on tablets, that he may run
                who reads it.
              </Title>
              <p className="mt-3 text-secondary-200 text-sm md:text-base">
                ~ Habakkuk 2:2
              </p>

              <span
                aria-hidden
                className="absolute left-1/2 -translate-x-1/2 -bottom-3 h-[3px] w-36 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(255,190,0,0) 0%, rgba(255,190,0,.95) 50%, rgba(255,190,0,0) 100%)",
                }}
              />

              <motion.div
                aria-hidden
                className="pointer-events-none absolute -inset-4 rounded-[28px] opacity-60"
                style={{
                  background:
                    "conic-gradient(from 0deg, rgba(255,190,0,.42), rgba(255,190,0,.12) 30%, transparent 60%, rgba(255,190,0,.28) 85%, rgba(255,190,0,.42))",
                  filter: "blur(12px)",
                }}
                initial={{ rotate: 0 }}
                whileInView={{ rotate: 360 }}
                transition={{ duration: 28, ease: "linear", repeat: Infinity }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutParallaxQuote;
