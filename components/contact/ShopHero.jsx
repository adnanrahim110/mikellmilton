"use client";

import Button from "@/components/ui/Button";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import {
  BookOpenText,
  FileText,
  Headphones,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { motion } from "motion/react";

const ShopHero = ({
  eyebrow = "Shop",
  title = "Books & Formats",
  lead = "Pick your format and go. Print for the shelf, ebook for speed, audio for the road.",
  primaryHref = "#products",
  primaryLabel = "Browse all",
  secondaryHref = "/cart",
  secondaryLabel = "View cart",
}) => {
  return (
    <section className="relative pt-[120px] pb-[80px] overflow-hidden">
      {/* Theme backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-28 -left-28 h-[460px] w-[460px] rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[460px] w-[460px] rounded-full bg-amber-500/15 blur-3xl" />
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
                className="absolute -bottom-2 left-0 h-[3px] w-40 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(255,190,0,0) 0%, rgba(255,190,0,.95) 50%, rgba(255,190,0,0) 100%)",
                }}
              />
            </motion.div>

            <motion.p
              className="text-lg text-secondary max-w-[680px]"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.05,
              }}
            >
              {lead}
            </motion.p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Button href={primaryHref} tone="dark" className="rounded-xl">
                {primaryLabel}
                <ShoppingBag className="ml-2 h-4 w-4" />
              </Button>
              <a
                href={secondaryHref}
                className="inline-flex items-center gap-2 rounded-xl border border-white/50 bg-white/85 px-5 py-3 text-sm font-semibold text-secondary-900 shadow-inner hover:bg-white transition"
              >
                {secondaryLabel}
              </a>
            </div>

            {/* Trust row */}
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                { Icon: Truck, label: "Fast shipping" },
                { Icon: ShieldCheck, label: "Secure checkout" },
                { Icon: BookOpenText, label: "Signed copies (limited)" },
              ].map(({ Icon, label }) => (
                <div
                  key={label}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/60 bg-white/80 px-3 py-2 text-sm text-secondary-900 ring-1 ring-black/5 shadow-inner"
                >
                  <span className="inline-grid place-items-center size-7 rounded-lg bg-primary/20 text-primary">
                    <Icon className="w-4 h-4" />
                  </span>
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Compact format card on the right (small, on-theme) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.05,
            }}
            className="relative mx-auto w-full max-w-[460px]"
          >
            <div className="relative overflow-hidden rounded-[26px] border border-white/45 bg-white/75 backdrop-blur-md ring-1 ring-black/5 shadow-2xl p-6">
              <div className="grid gap-4">
                <div className="flex items-center gap-3">
                  <span className="inline-grid place-items-center size-10 rounded-xl bg-primary/15 text-primary">
                    <FileText className="w-5 h-5" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-secondary-900">
                      Formats
                    </div>
                    <div className="text-xs text-secondary-600">
                      Pick what fits your flow
                    </div>
                  </div>
                </div>

                <div className="grid gap-2">
                  {[
                    {
                      Icon: FileText,
                      title: "eBook",
                      hint: "Instant download",
                    },
                    {
                      Icon: BookOpenText,
                      title: "Paperback",
                      hint: "Ships in 2–4 days",
                    },
                    {
                      Icon: Headphones,
                      title: "Audiobook",
                      hint: "MP3 + streaming",
                    },
                  ].map(({ Icon, title, hint }) => (
                    <div
                      key={title}
                      className="flex items-center justify-between rounded-xl border border-white/50 bg-white/85 px-3.5 py-3 text-sm text-secondary-900 shadow-inner"
                    >
                      <div className="flex items-center gap-2">
                        <span className="inline-grid place-items-center size-7 rounded-lg bg-primary/20 text-primary">
                          <Icon className="w-4 h-4" />
                        </span>
                        <span className="font-semibold">{title}</span>
                      </div>
                      <span className="text-xs text-secondary-500">{hint}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-2">
                  <Button
                    href={primaryHref}
                    tone="dark"
                    className="w-full rounded-xl"
                  >
                    Start browsing
                  </Button>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-[26px] ring-1 ring-black/5" />
            </div>

            {/* Subtle rotating glow */}
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

export default ShopHero;
