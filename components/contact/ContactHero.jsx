"use client";

import Button from "@/components/ui/Button";
import P from "@/components/ui/P";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";

const ContactHero = ({
  eyebrow = "Contact",
  title = "Let’s talk",
  lead = "If the goal is clear, we can map the first useful version fast. Reach out and we’ll get you moving.",
  email = "hello@yourdomain.com",
  phone = "+1 000 000 0000",
  location = "Global Community",
  hours = "Mon to Fri, 9–5",
  primaryHref = "#contact-form",
  primaryLabel = "Start a conversation",
}) => {
  return (
    <section className="relative pt-[120px] pb-[80px] overflow-hidden">
      {/* Theme backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-28 -left-28 h-[460px] w-[460px] rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[460px] w-[460px] rounded-full bg-amber-500/15 blur-3xl" />

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
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Copy */}
          <div className="space-y-6">
            <Subtitle tone="dark">{eyebrow}</Subtitle>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <Title className="text-[clamp(32px,6vw,56px)]">{title}</Title>
              <span
                aria-hidden
                className="absolute -bottom-2 left-0 h-[3px] w-36 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(255,190,0,0) 0%, rgba(255,190,0,.95) 50%, rgba(255,190,0,0) 100%)",
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.05,
              }}
            >
              <P>{lead}</P>
            </motion.div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Button href={primaryHref} tone="dark" className="rounded-xl">
                {primaryLabel}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 rounded-xl border border-white/50 bg-white/85 px-4 py-3 text-sm font-semibold text-secondary-900 shadow-inner hover:bg-white transition"
              >
                <Mail className="h-4 w-4 text-primary" />
                Email
              </a>
              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-2 rounded-xl border border-white/50 bg-white/85 px-4 py-3 text-sm font-semibold text-secondary-900 shadow-inner hover:bg-white transition"
              >
                <Phone className="h-4 w-4 text-primary" />
                Call
              </a>
            </div>
          </div>

          {/* Glass contact card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.05,
            }}
            className="relative mx-auto w-full max-w-[520px]"
          >
            <div className="relative overflow-hidden rounded-[26px] border border-white/45 bg-white/75 backdrop-blur-md ring-1 ring-black/5 shadow-2xl">
              <div className="p-6 md:p-7">
                <ul className="grid gap-4">
                  <li className="flex items-center gap-3">
                    <span className="inline-grid place-items-center size-10 rounded-xl bg-primary/15 text-primary">
                      <Mail className="h-5 w-5" />
                    </span>
                    <a
                      href={`mailto:${email}`}
                      className="text-sm font-semibold text-secondary-900 hover:text-primary transition"
                    >
                      {email}
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="inline-grid place-items-center size-10 rounded-xl bg-primary/15 text-primary">
                      <Phone className="h-5 w-5" />
                    </span>
                    <a
                      href={`tel:${phone.replace(/\s+/g, "")}`}
                      className="text-sm font-semibold text-secondary-900 hover:text-primary transition"
                    >
                      {phone}
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="inline-grid place-items-center size-10 rounded-xl bg-primary/15 text-primary">
                      <MapPin className="h-5 w-5" />
                    </span>
                    <span className="text-sm text-secondary-800">
                      {location}
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="inline-grid place-items-center size-10 rounded-xl bg-primary/15 text-primary">
                      <Clock className="h-5 w-5" />
                    </span>
                    <span className="text-sm text-secondary-800">{hours}</span>
                  </li>
                </ul>

                <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-black/10 to-transparent" />

                <div className="mt-6 flex items-center gap-4">
                  <div className="relative">
                    <div
                      className="size-14 rounded-full"
                      style={{
                        background:
                          "conic-gradient(hsl(45 100% 50%) 72%, rgba(0,0,0,0.12) 0)",
                      }}
                    />
                    <div className="absolute inset-[6px] rounded-full bg-white/95 ring-1 ring-black/5" />
                    <div className="absolute inset-0 grid place-items-center">
                      <span className="text-xs font-bold text-secondary-900">
                        72%
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-secondary-700">
                    Typical reply within a day. If urgent, call.
                  </p>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-[26px] ring-1 ring-black/5" />
            </div>

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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
