"use client";

import Button from "@/components/ui/Button";
import P from "@/components/ui/P";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { cn } from "@/utils/cn";
import { motion, useMotionValue, useSpring } from "motion/react";
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
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const prx = useSpring(rx, { stiffness: 120, damping: 20, mass: 0.5 });
  const pry = useSpring(ry, { stiffness: 120, damping: 20, mass: 0.5 });

  const handleMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = (e.clientX - cx) / (r.width / 2);
    const dy = (e.clientY - cy) / (r.height / 2);
    const clamp = (v) => Math.max(-1, Math.min(1, v));
    ry.set(clamp(dx) * 6);
    rx.set(clamp(-dy) * 6);
  };

  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <section className={cn("relative pt-28", className)}>
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

        <div className="relative h-full">
          <div className="container h-full">
            <div className="grid h-full gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center pt-32 pb-28">
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

              <div className="relative hidden lg:block">
                <motion.div
                  className="relative ml-auto w-full aspect-square max-w-[400px]"
                  style={{
                    rotateX: prx,
                    rotateY: pry,
                    transformStyle: "preserve-3d",
                    willChange: "transform",
                  }}
                  onMouseMove={handleMove}
                  onMouseLeave={handleLeave}
                >
                  <div
                    className="absolute inset-[8%] rounded-[28px] bg-white/70 backdrop-blur-md ring-1 ring-black/5 shadow-2xl"
                    style={{ transform: "translateZ(28px)" }}
                  >
                    <div className="absolute inset-0 rounded-[28px] overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10" />
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "radial-gradient(120% 100% at 50% 0%, rgba(255,190,0,.18) 0%, transparent 60%)",
                        }}
                      />
                    </div>
                    <div className="absolute inset-0 grid place-items-center">
                      <div
                        className="text-center"
                        style={{ transform: "translateZ(36px)" }}
                      >
                        <div className="inline-flex items-center justify-center size-14 rounded-full bg-primary/20 ring-1 ring-primary/30 shadow">
                          <span className="font-extrabold text-primary tracking-wider">
                            DBT
                          </span>
                        </div>
                        <div className="mt-2 text-sm text-secondary-700">
                          Purpose • Clarity • Action
                        </div>
                      </div>
                    </div>
                  </div>

                  <motion.div
                    aria-hidden
                    className="absolute inset-[2%] rounded-[34px] opacity-80"
                    style={{
                      background:
                        "conic-gradient(from 0deg, rgba(255,190,0,.65), rgba(255,190,0,.15) 30%, transparent 60%, rgba(255,190,0,.45) 85%, rgba(255,190,0,.65))",
                      filter: "blur(10px)",
                    }}
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 24,
                      ease: "linear",
                      repeat: Infinity,
                    }}
                  />

                  <div
                    className="absolute inset-[3%] rounded-[32px]"
                    style={{
                      background:
                        "conic-gradient(from 90deg, rgba(255,190,0,.9), rgba(255,190,0,.2) 35%, rgba(255,190,0,.9) 70%, rgba(255,190,0,.2))",
                      WebkitMask:
                        "radial-gradient(closest-side, transparent calc(100% - 2px), #000 0)",
                      mask: "radial-gradient(closest-side, transparent calc(100% - 2px), #000 0)",
                      opacity: 0.9,
                    }}
                  />

                  {/* scalable orbit dots using % radius */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 30,
                      ease: "linear",
                      repeat: Infinity,
                    }}
                  >
                    {Array.from({ length: 8 }).map((_, i) => (
                      <span
                        key={i}
                        className="absolute left-1/2 top-1/2 size-2 rounded-full bg-primary shadow-[0_0_12px_rgba(255,190,0,.9)]"
                        style={{
                          transform: `rotate(${i * 45}deg) translateY(-38%)`,
                        }}
                      />
                    ))}
                  </motion.div>

                  <motion.div
                    className="absolute inset-0"
                    animate={{ rotate: [360, 0] }}
                    transition={{
                      duration: 36,
                      ease: "linear",
                      repeat: Infinity,
                    }}
                  >
                    {Array.from({ length: 12 }).map((_, i) => (
                      <span
                        key={i}
                        className="absolute left-1/2 top-1/2 size-1.5 rounded-full bg-white/80"
                        style={{
                          transform: `rotate(${i * 30}deg) translateY(-48%)`,
                          boxShadow: "0 0 10px rgba(255,255,255,.6)",
                        }}
                      />
                    ))}
                  </motion.div>

                  <div className="pointer-events-none absolute inset-0 rounded-[36px] ring-1 ring-white/20" />
                </motion.div>
              </div>

              {/* smaller mobile crest */}
              <div className="lg:hidden -mt-4">
                <div className="mx-auto w-[72%] max-w-[380px] aspect-square relative">
                  <div className="absolute inset-[8%] rounded-[24px] bg-white/70 backdrop-blur-md ring-1 ring-black/5 shadow-2xl" />
                  <motion.div
                    aria-hidden
                    className="absolute inset-[2%] rounded-[30px] opacity-80"
                    style={{
                      background:
                        "conic-gradient(from 0deg, rgba(255,190,0,.65), rgba(255,190,0,.15) 30%, transparent 60%, rgba(255,190,0,.45) 85%, rgba(255,190,0,.65))",
                      filter: "blur(9px)",
                    }}
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 28,
                      ease: "linear",
                      repeat: Infinity,
                    }}
                  />
                  <div
                    className="absolute inset-[3%] rounded-[28px]"
                    style={{
                      background:
                        "conic-gradient(from 90deg, rgba(255,190,0,.9), rgba(255,190,0,.2) 35%, rgba(255,190,0,.9) 70%, rgba(255,190,0,.2))",
                      WebkitMask:
                        "radial-gradient(closest-side, transparent calc(100% - 2px), #000 0)",
                      mask: "radial-gradient(closest-side, transparent calc(100% - 2px), #000 0)",
                      opacity: 0.9,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SharedHero;
