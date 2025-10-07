"use client";

import { ArrowRight, CircleDollarSign, ShieldCheck } from "lucide-react";
import { motion, useAnimationControls, useInView } from "motion/react";
import React, { useEffect, useRef } from "react";
import Title from "../ui/Title";

/* animated 80% donut that replays on every re-enter */
const DonutAllocation = ({
  allocation = 80,
  size = 128,
  thickness = 12,
  color = "hsl(45, 100%, 50%)",
  track = "rgba(0,0,0,0.08)",
}) => {
  const ref = useRef(null);
  const controls = useAnimationControls();
  const inView = useInView(ref, { amount: 0.6, margin: "0px 0px -10% 0px" });

  useEffect(() => {
    if (inView) {
      controls.start({
        ["--p"]: allocation,
        transition: { duration: 2.2, ease: [0.22, 1, 0.36, 1] },
      });
    } else {
      controls.set({ ["--p"]: 0 });
    }
  }, [inView, allocation, controls]);

  const inner = size - thickness * 2;

  return (
    <div ref={ref} className="relative" style={{ width: size, height: size }}>
      <motion.div
        className="rounded-full"
        style={{
          width: size,
          height: size,
          "--p": 0,
          "--donut-color": color,
          "--donut-track": track,
          backgroundImage:
            "conic-gradient(var(--donut-color) calc(var(--p) * 1%), var(--donut-track) 0)",
          willChange: "transform",
        }}
        animate={controls}
      />
      <div
        className="absolute rounded-full bg-white/90 ring-1 ring-black/5"
        style={{
          width: inner,
          height: inner,
          top: (size - inner) / 2,
          left: (size - inner) / 2,
        }}
      />
      <div className="absolute inset-0 grid place-items-center pointer-events-none">
        <div className="text-center">
          <div className="text-3xl font-bold text-neutral-900">
            {allocation}%
          </div>
          <div className="text-[11px] text-neutral-500 leading-tight">
            Allocation
          </div>
        </div>
      </div>
    </div>
  );
};

const SecFundraiser = ({
  covered = 0,
  currency = "$",
  planUrl = "https://www.Jeremiah31eight-31.com",
}) => {
  return (
    <section className="relative max-lg:pt-24 py-[120px]">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-28 -left-24 h-[420px] w-[420px] rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-amber-500/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.06) 1px, transparent 1px)",
            backgroundSize: "22px 22px, 22px 22px",
          }}
        />
      </div>

      <div className="container">
        <div className="grid gap-7 md:grid-cols-5 items-stretch">
          <motion.div
            className="md:col-span-3"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="space-y-6">
              <Title className="flex items-center gap-2 max-lg:flex-wrap">
                <span className="inline-flex items-center justify-center mr-1 size-12 rounded-full bg-primary/15 text-primary">
                  <ShieldCheck className="text-3xl" />
                </span>
                The DBT Fundraiser
              </Title>

              <p className="text-xl md:text-2xl leading-relaxed text-neutral-900">
                <strong className="font-semibold">80%</strong> of all revenue
                from The DBT fundraiser will be deposited into{" "}
                <span className="font-semibold">
                  The CPOYI Sovereign Wealth Fund
                </span>
                . Visit the J-31 Project plan for full details.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={planUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-primary text-white px-5 py-3 text-sm font-semibold shadow-lg hover:opacity-90 transition"
                >
                  Read the J-31 plan
                  <ArrowRight className="w-4 h-4" />
                </a>
                <span className="text-sm text-neutral-600">
                  Visit {planUrl.replace(/^https?:\/\//, "")}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="md:col-span-2 md:sticky md:top-24"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <div className="relative mx-auto w-full max-w-md">
              <div className="relative rounded-3xl border border-white/40 bg-white/70 backdrop-blur-md shadow-2xl ring-1 ring-black/5 p-5">
                <div className="flex items-center gap-5">
                  <DonutAllocation allocation={80} />
                  <div className="min-w-0">
                    <h4 className="text-base font-semibold text-neutral-900">
                      Sovereign Wealth Fund
                    </h4>
                    <p className="text-sm text-neutral-600">
                      Portion of fundraiser revenue routed to CPOYI
                    </p>
                  </div>
                </div>

                <div className="my-5 h-px w-full bg-gradient-to-r from-transparent via-black/10 to-transparent" />

                <div className="flex items-center gap-4">
                  <span className="inline-flex items-center justify-center size-10 rounded-full bg-black/70 text-white shadow">
                    <CircleDollarSign className="w-5 h-5" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-sm text-neutral-600">
                      Investment Covered
                    </div>
                    <div className="text-3xl font-extrabold tracking-tight text-neutral-900">
                      {covered.toLocaleString()}{" "}
                      <span className="text-lg align-top">{currency}</span>
                    </div>
                  </div>
                </div>

                <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-black/5" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SecFundraiser;
