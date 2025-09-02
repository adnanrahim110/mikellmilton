"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import Title from "../ui/Title";

const Sec8 = () => {
  const scrollerRef = useRef(null);
  const cardRightRef = useRef(null);
  const contentWrapRef = useRef(null);

  const [overflow, setOverflow] = useState(0);

  const TOP_FADE_PX = 64;
  const BOTTOM_FADE_PX = 64;
  const EPS = 1;

  const measure = () => {
    const vpH =
      typeof window !== "undefined" && window.visualViewport
        ? Math.round(window.visualViewport.height)
        : Math.round(window.innerHeight);

    const cardH = Math.round(
      cardRightRef.current?.getBoundingClientRect().height ??
        Math.round(vpH * 0.8)
    );
    const contentH = Math.round(contentWrapRef.current?.scrollHeight ?? 0);

    const visibleWindow = Math.max(0, cardH - TOP_FADE_PX);
    const extra = Math.max(0, contentH - visibleWindow);

    setOverflow(extra);
    if (scrollerRef.current) {
      scrollerRef.current.style.height = `${vpH + extra + EPS}px`;
    }
  };

  useLayoutEffect(() => {
    measure();
    const ro1 = new ResizeObserver(measure);
    const ro2 = new ResizeObserver(measure);
    if (cardRightRef.current) ro1.observe(cardRightRef.current);
    if (contentWrapRef.current) ro2.observe(contentWrapRef.current);
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);
    return () => {
      if (cardRightRef.current) ro1.unobserve(cardRightRef.current);
      if (contentWrapRef.current) ro2.unobserve(contentWrapRef.current);
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: scrollerRef,
    offset: ["start start", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -overflow]);

  return (
    <section className="relative pt-20">
      <div ref={scrollerRef} className="relative">
        <section className="sticky top-0 h-screen">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-20 -left-24 h-[420px] w-[420px] rounded-full bg-primary/20 blur-3xl opacity-70" />
            <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl opacity-60" />
            <div className="absolute inset-0 opacity-35 mix-blend-multiply bg-[url('/imgs/texture2.jpg')] bg-top bg-no-repeat bg-[length:70%_80%]" />
          </div>
          <div className="h-full w-full container">
            <div className="grid h-full md:grid-cols-5 gap-5 items-stretch">
              <div className="md:col-span-2">
                <div className="sticky top-0 h-screen flex items-center">
                  <div className="w-full h-[80vh] p-2 rounded-3xl border border-white/40 bg-white/70 backdrop-blur-md ring-1 ring-black/5 shadow-2xl">
                    <div className="relative w-full h-full overflow-hidden rounded-2xl">
                      <img
                        src="/imgs/home-sec8.jpg"
                        className="w-full h-full object-cover object-right"
                        alt="About section visual"
                        onLoad={measure}
                      />
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/10 to-transparent" />
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:col-span-3">
                <div className="sticky top-0 h-screen flex items-center">
                  <div
                    ref={cardRightRef}
                    className="relative w-full h-[80vh] p-2 rounded-3xl border border-white/40 bg-secondary-900/90 text-white backdrop-blur-md ring-1 ring-white/10 shadow-2xl overflow-hidden"
                  >
                    <motion.div style={{ y }} className="absolute inset-0">
                      <div
                        ref={contentWrapRef}
                        className="p-6 md:p-10 space-y-6"
                      >
                        <div className="space-y-4">
                          <Title tone="light">About Us</Title>
                          <strong className="block text-white/90">
                            After Nearly Two Millennia, the Iconic Assembly of
                            ‘Messianic Israelites and Christian Gentiles’ can
                            finally join forces.
                          </strong>
                        </div>

                        <div className="prose prose-invert max-w-none leading-relaxed *:text-white/80">
                          <p>
                            What makes a team great? Is it the franchise, the
                            coaching staff, the players? Truth be told, it’s all
                            of the above. But what made the 1st century
                            Messianic Israelites, led by the Apostles James and
                            Peter, and the Christian Gentiles, coached by the
                            Apostle Paul, an ICONIC DYNASTY? Their game-changing
                            partnership that breathed life into the family of
                            mankind and transformed Christ-King Yashiah’s G-LIFE
                            movement into a spiritual phenomenon and unmatched
                            global force for good!
                          </p>
                          <p>
                            We at The DBT Franchise Ministry believe the Holy
                            Bible when it says we have access to two lives on
                            Earth. Everything you’ve done has come to this.
                            Which life will you choose? G-LIFE consists of
                            covert spiritual operatives who’ve been trained to
                            know that, for us, our lives are not defined by one
                            action, but rather through the lens of Christ
                            Champion transformation.
                          </p>
                          <p>
                            It’s the 21st century and, by now, every nation has
                            had their chance to establish peace and equity in
                            the world. But they haven’t. Governments can send
                            flying ships into space, build hypersonic missiles
                            and invent the internet, but can’t live in harmony
                            with each other and the environment?
                          </p>
                          <p>
                            We call “Bull-Junk”. Listen, churches don’t even
                            tell their members the whole truth and nothing but
                            the truth. According to the Israelites’ sacred
                            texts, your being born was never a quirk of fate,
                            but rather one of divine providence.
                          </p>
                          <p>
                            Did you see the paradigm shift in 2020? The
                            invisible power behind the oligarchy has altered the
                            perception of reality for everyone outside of
                            G-LIFE. Inside the animal kingdom, the world is
                            changing, truth is vanishing and the wars have gone
                            into overdrive.
                          </p>
                          <p>
                            But you are here and so are we…the long-awaited,
                            best-of-the-best of our family tree. Oh yes, the
                            animal kings are counting on different ethnicities
                            and both genders to remain divided and distrustful
                            of each other.
                          </p>
                        </div>

                        <div className="h-10" />
                      </div>
                    </motion.div>
                    <div
                      style={{ height: TOP_FADE_PX }}
                      className="pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-secondary-900 via-secondary-900/70 to-transparent"
                    />
                    <div
                      style={{ height: BOTTOM_FADE_PX }}
                      className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-secondary-900 via-secondary-900/70 to-transparent"
                    />

                    <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Sec8;
