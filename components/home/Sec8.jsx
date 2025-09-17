"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import Quote from "../ui/Quote";
import Subtitle from "../ui/Subtitle";
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
    <section className="relative pt-28">
      <div className="container">
        <Subtitle className="mb-5">
          One family. One prophecy. One Breakthrough.
        </Subtitle>
      </div>
      <div ref={scrollerRef} className="relative">
        <section className="sticky top-0 h-screen">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-20 -left-24 h-[420px] w-[420px] rounded-full bg-primary/20 blur-3xl opacity-70" />
            <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl opacity-60" />
            <div className="absolute inset-0 opacity-35 mix-blend-multiply bg-[url('/imgs/texture2.png')] bg-top bg-no-repeat bg-[length:70%_80%]" />
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
                          <Title tone="light">
                            <span className="text-primary">About Us</span>
                          </Title>
                        </div>

                        <div className="prose prose-invert max-w-none leading-relaxed *:text-white/80">
                          <Quote
                            tone="dark"
                            author="Ephesians 2:14–15"
                            className="mb-7"
                          >
                            For He Himself is our peace, who has made the two
                            groups one and has destroyed the barrier… His
                            purpose was to create in Himself one new humanity
                            out of the two, thus making peace.
                          </Quote>
                          <p>
                            After nearly two millennia, the scattered Messianic
                            Israelites and Christian Gentiles are called to
                            unite once more. The same partnership that began in
                            the 1st century with James, Peter, and Paul, an
                            Iconic Dynasty of faith is the same foundation we
                            stand on today. Their witness became a global
                            movement, transforming Christ-King Yashiah’s message
                            into a force no empire could silence.
                          </p>
                          <Quote
                            iconClass="text-6xl"
                            tone="dark"
                            author="Romans 11:5"
                            className="mb-7 mt-3.5"
                          >
                            So too, at the present time there is a remnant
                            chosen by grace
                          </Quote>
                          <p>
                            We at The DBT Franchise Ministry believe this
                            remnant is alive today. We live in the tension of
                            two lives on Earth: the life shaped by the kingdoms
                            of men corrupt, divided, violent and the life
                            defined by the Kingdom of YAHAWAH, hidden in G-LIFE,
                            where spiritual operatives train as Christ
                            Champions.
                          </p>
                          <Quote
                            tone="dark"
                            author="Joel 2:16"
                            className="mb-7 mt-3.5"
                          >
                            Gather the people, sanctify the congregation,
                            assemble the elders, gather the children…
                          </Quote>
                          <p>
                            2020 marked the paradigm shift. The nations revealed
                            their weakness, governments built weapons but not
                            peace, churches preached comfort but not prophecy.
                            Yet your very birth was not accident but divine
                            providence. You were chosen for this moment, for
                            this Breakthrough, for this gathering of the
                            long-awaited family tree.
                          </p>
                          <Quote
                            tone="dark"
                            author="Revelation 7:9"
                            className="mb-7 mt-3.5"
                          >
                            After this I looked, and there before me was a great
                            multitude that no one could count, from every
                            nation, tribe, people and language, standing before
                            the throne…
                          </Quote>
                          <p>
                            We are that multitude Messianic Israelites and
                            Christian Gentiles joined in purpose, walking in
                            prophecy, and preparing for sovereignty under
                            Christ-King Yashiah. Together, we rise as the family
                            of YAHAWAH, chosen not to divide, but to fulfill the
                            promise of eternity.
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
