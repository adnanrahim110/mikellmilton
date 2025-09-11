"use client";

import Button from "@/components/ui/Button";
import P from "@/components/ui/P";
import Title from "@/components/ui/Title";
import { ArrowRight, CalendarDays, Mail, Phone } from "lucide-react";
import { motion } from "motion/react";

const AboutCTA = ({
  title = "Let’s work with clarity",
  lead = "If the goal is sharp and the loop is tight, I’m in. Tell me what you’re aiming at and we’ll map the first useful version.",
  email = "hello@yourdomain.com",
  phone = "+1 000 000 0000",
  primaryHref = "/contact",
  primaryLabel = "Start a conversation",
  secondaryHref = "mailto:hello@yourdomain.com",
  secondaryLabel = "Email me",
}) => {
  return (
    <section className="relative py-[110px]">
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
        <div className="bg-gradient-to-r from-primary/30 via-amber-500/25 to-primary/30 p-[1.5px] rounded-[28px] shadow-2xl">
          <div className="relative overflow-hidden rounded-[26px] bg-white/75 backdrop-blur-md ring-1 ring-black/5">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-10 p-7 md:p-10 lg:grid-cols-[1.2fr_0.8fr]"
            >
              <div className="space-y-5">
                <Title className="text-[clamp(28px,5vw,44px)]">{title}</Title>
                <P>{lead}</P>

                <div className="flex flex-wrap gap-3 pt-2">
                  <Button href={primaryHref} tone="dark" className="rounded-xl">
                    {primaryLabel}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <a
                    href={secondaryHref}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/50 bg-white/80 px-4 py-3 text-sm font-semibold text-secondary-900 shadow-inner hover:bg-white/90 transition"
                  >
                    <Mail className="h-4 w-4 text-primary" />
                    {secondaryLabel}
                  </a>
                </div>
              </div>

              <div className="grid gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="relative rounded-2xl border border-white/50 bg-white/80 ring-1 ring-black/5 shadow-inner p-5"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-grid place-items-center size-10 rounded-xl bg-primary/15 text-primary">
                      <CalendarDays className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-secondary-900">
                        Availability
                      </div>
                      <div className="text-xs text-secondary-700">
                        Booking limited slots this quarter
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-4">
                    <div className="relative">
                      <div
                        className="size-14 rounded-full"
                        style={{
                          background:
                            "conic-gradient(hsl(45 100% 50%) 68%, rgba(0,0,0,0.12) 0)",
                        }}
                      />
                      <div className="absolute inset-[6px] rounded-full bg-white/95 ring-1 ring-black/5" />
                      <div className="absolute inset-0 grid place-items-center">
                        <span className="text-xs font-bold text-secondary-900">
                          68%
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-secondary-700">
                      Current capacity. If your target is clear, we can make it
                      fit.
                    </div>
                  </div>

                  <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-black/5" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.05,
                  }}
                  className="relative rounded-2xl border border-white/50 bg-white/80 ring-1 ring-black/5 shadow-inner p-5"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-grid place-items-center size-10 rounded-xl bg-primary/15 text-primary">
                      <Mail className="h-5 w-5" />
                    </span>
                    <a
                      href={`mailto:${email}`}
                      className="text-sm font-semibold text-secondary-900 hover:text-primary transition"
                    >
                      {email}
                    </a>
                  </div>

                  <div className="mt-3 flex items-center gap-3">
                    <span className="inline-grid place-items-center size-10 rounded-xl bg-primary/15 text-primary">
                      <Phone className="h-5 w-5" />
                    </span>
                    <a
                      href={`tel:${phone.replace(/\s+/g, "")}`}
                      className="text-sm font-semibold text-secondary-900 hover:text-primary transition"
                    >
                      {phone}
                    </a>
                  </div>

                  <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-black/5" />
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              aria-hidden
              className="pointer-events-none absolute -inset-4 rounded-[30px] opacity-60"
              style={{
                background:
                  "conic-gradient(from 0deg, rgba(255,190,0,.42), rgba(255,190,0,.12) 30%, transparent 60%, rgba(255,190,0,.28) 85%, rgba(255,190,0,.42))",
                filter: "blur(14px)",
              }}
              initial={{ rotate: 0 }}
              whileInView={{ rotate: 360 }}
              transition={{ duration: 26, ease: "linear", repeat: Infinity }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCTA;
