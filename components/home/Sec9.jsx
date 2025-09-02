"use client";

import { cn } from "@/utils/cn";
import { MotionInView, variants } from "@/utils/motion";
import { motion } from "motion/react";
import React from "react";
import { FaBookOpen } from "react-icons/fa6";
import BookHover from "../ui/BookHover";
import P from "../ui/P";
import Title from "../ui/Title";

const sec9cards = [
  {
    title: "Psalm 133:1",
    icon: "/imgs/blueprint.png",
    text: "Behold, how good and how pleasant it is for brethren to dwell together in unity!",
  },
  {
    title: "Acts 2:1",
    icon: "/imgs/reading-book.png",
    text: "And when the day of Pentecost was fully come, the Messianic Israelites were all with one accord in one place.",
  },
  {
    title: "Revelation 7:9",
    icon: "/imgs/property-insurance.png",
    text: "After this I looked, and there before me was a great multitude that no one could count, from every nation, tribe, people and language, standing before the throne and before the Lamb. They were wearing white robes and were holding palm branches in their hands.",
  },
];

const Sec9 = () => {
  return (
    <section className="relative py-[120px]">
      {/* themed backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-20 -left-24 h-[420px] w-[420px] rounded-full bg-primary/20 blur-3xl opacity-70" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl opacity-60" />
        <div className="absolute inset-0 opacity-30 mix-blend-multiply bg-[url('/imgs/texture2.jpg')] bg-center bg-no-repeat bg-[length:70%_80%]" />
      </div>

      <div className="container relative">
        <div className="grid items-start gap-10 md:grid-cols-5">
          {/* left content */}
          <div className="md:col-span-3">
            <div className="space-y-8">
              <div className="space-y-3">
                <Title className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center size-12 rounded-full bg-primary/15 text-primary">
                    <FaBookOpen className="text-[28px]" />
                  </span>
                  The D.O.P.E. Breakthrough
                </Title>
                <h3 className="text-black text-xl tracking-tight pl-[60px]">
                  Mikell M. Milton and L.A. Doyle
                </h3>
              </div>

              <div className="space-y-4 text-secondary leading-relaxed">
                <P>
                  The D.O.P.E. Breakthrough is a supernatural action adventure
                  that takes place in the Kingdom of Amen-Amensa. But the fact
                  is, the divine axiom “As above, so below” suggests that there
                  is a mirroring connection between the heavenly Kingdom of
                  Amen-Amensa and planet Earth’s 21st century Global Community.
                </P>
                <P>
                  Was the 2020 global lockdown just a random moment in time? Or
                  was it a supernatural event, a souped up breakthrough from
                  “Above” that goes beyond politics, religion, and the world
                  wide web of entertainment?
                </P>
                <P>
                  With this debut novel, The DBT Franchise Ministry offers
                  hidden pieces of humanity’s origin story and together, with
                  YOU, the interactive reader, we will witness how sleepwalkers
                  implode the real world system as the New Earth reality BREAKS
                  THROUGH!
                </P>
                <P className="italic text-secondary-800">It Was Written.</P>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {sec9cards.map((c, i) => (
                  <MotionInView
                    key={i}
                    as={motion.div}
                    v={variants.fadeRise}
                    viewport={{ once: true, amount: 0.5 }}
                    delay={i * 0.1}
                    className={cn(
                      "group relative overflow-hidden rounded-2xl",
                      "border border-white/40 bg-white/70 backdrop-blur-md ring-1 ring-black/5 shadow-xl",
                      i === 2 && "md:col-span-2"
                    )}
                  >
                    <div className="absolute -right-10 -top-10 size-40 rounded-full bg-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="inline-flex items-center justify-center size-12 rounded-full bg-gradient-to-br from-primary-300 to-primary-500 shadow-md">
                          <img
                            src={c.icon}
                            alt={c.title}
                            className="w-6 h-6 object-contain invert"
                          />
                        </span>
                        <h4 className="text-base font-semibold text-secondary-900">
                          {c.title}
                        </h4>
                      </div>
                      <p className="text-sm text-secondary-700 leading-relaxed">
                        {c.text}
                      </p>
                    </div>
                    <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-black/5" />
                  </MotionInView>
                ))}
              </div>
            </div>
          </div>

          {/* right sticky book */}
          <div className="md:col-span-2 md:sticky md:top-12">
            <div className="relative mx-auto w-full max-w-xs">
              <div className="absolute -inset-3 rounded-3xl bg-white/40 blur-xl opacity-50 pointer-events-none" />
              <div className="relative rounded-3xl border border-white/40 bg-white/70 backdrop-blur-md ring-1 ring-black/5 shadow-2xl p-4">
                <BookHover img="/imgs/book_cover.png" />
                <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-black/5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sec9;
