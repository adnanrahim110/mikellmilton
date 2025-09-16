"use client";

import Button from "@/components/ui/Button";
import P from "@/components/ui/P";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { cn } from "@/utils/cn";
import { motion } from "motion/react";
import Link from "next/link";

const SharedHero = ({
  eyebrow = "About me",
  Icon,
  title = "The story behind the mission",
  description = "I build, write, and point people toward purpose. This page is the snapshot of where that comes from, what I believe, and how I move.",
  bgImage = "/imgs/about-hero.jpg",
  primaryCta = {},
  secondaryCta = { label: "Contact", href: "/contact" },
  className = "",
}) => {
  return (
    <section className={cn("relative", className)}>
      <div className="relative w-full overflow-hidden">
        <motion.img
          src={bgImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.08, y: 12 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ willChange: "transform" }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
        <div className="pointer-events-none absolute inset-0 opacity-35 mix-blend-multiply bg-[url('/imgs/texture2.jpg')] bg-center bg-no-repeat bg-[length:70%_80%]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.08) 1px, transparent 1px)",
            backgroundSize: "22px 22px, 22px 22px",
          }}
        />
        <div className="pointer-events-none absolute -top-24 -left-24 size-[520px] rounded-full bg-primary/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 size-[520px] rounded-full bg-amber-500/15 blur-3xl" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/90 via-black/50 to-black/20" />

        <div className="relative h-full">
          <div className="container h-full">
            <div className="grid h-full gap-10 lg:grid-cols-[1.4fr_auto] items-center pt-44 pb-28">
              <div className="max-w-2xl">
                <Subtitle tone="light" icon={Icon} stroke={false}>
                  {eyebrow}
                </Subtitle>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.05,
                  }}
                  className="space-y-4"
                >
                  <Title tone="light" className="text-[clamp(28px,6vw,56px)]">
                    {title}
                  </Title>
                  <P className="text-secondary-50 max-w-[56ch]">
                    {description}
                  </P>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.2,
                  }}
                  className="mt-6 flex flex-wrap items-center gap-3"
                >
                  {primaryCta?.href && (
                    <Button
                      href={primaryCta.href}
                      tone="white"
                      className="shadow-lg"
                    >
                      {primaryCta.label}
                    </Button>
                  )}
                  {secondaryCta?.href && (
                    <Link
                      href={secondaryCta.href}
                      className="inline-flex items-center rounded-md border border-white/60 bg-white/80 px-5 py-2.5 font-semibold text-secondary-900 shadow-inner transition hover:bg-white/90"
                    >
                      {secondaryCta.label}
                    </Link>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SharedHero;
