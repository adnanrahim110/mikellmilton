"use client";

import {
  animate as animateMV,
  motion,
  useAnimate,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { UserRound } from "lucide-react";
import React, { useMemo, useRef } from "react";
import P from "../ui/P";
import Subtitle from "../ui/Subtitle";
import Title from "../ui/Title";

// Swiper (mobile only)
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Ensure in globals:
// @import "swiper/css";
// @import "swiper/css/pagination";

const Sec7 = () => {
  const targetRef = useRef(null);

  const wheelItems = useMemo(
    () => [
      {
        icon: "blueprint.png",
        author: "Jammy Carnod",
        quote:
          "The Dope Breakthrough hits you like a wake-up blast, shaking you to your core. It’s not just reading, it’s an awakening. Ancient truths wrapped in modern fire, burning through the layers of what we think we know.",
      },
      {
        icon: "reading-book.png",
        author: "Avery Len",
        quote:
          "CPOYI Mikell and Doyle blend prophecy with raw, street-smart wisdom, creating a unique firestorm of ideas. The words don’t just sit on the page: they ignite your mind, keeping you hooked long after you’ve put the book down.",
      },
      {
        icon: "property-insurance.png",
        author: "Sammy Sam",
        quote:
          "Raw, fearless, spiritual. It doesn’t just land on your heart... it drills in. Highly recommend to anyone seeking truth and purpose.!!",
      },
      {
        icon: "goodwill.png",
        author: "Taylor Ben",
        quote:
          "Authors write with an intensity that makes faith and prophecy feel alive. This isn’t just entertainment, it’s an invitation to see the world differently. I loved the cast of characters, warriors, and believers and the way the narrative connects generations and history in a way that feels urgent and real.",
      },
    ],
    []
  );

  // Desktop scroll logic
  const R = { hand: [0, 0.56] };
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });
  const panel1X = useTransform(scrollYProgress, [0, 1], ["0%", "-170%"]);
  const panel2X = useTransform(
    scrollYProgress,
    [0, R.hand[0], R.hand[1], 1],
    ["100%", "100%", "0%", "0%"]
  );

  const itemsProgressRaw = useTransform(
    scrollYProgress,
    [R.hand[1] + 0.03, 0.858],
    [0, 1]
  );
  const itemsProgress = useMotionValue(0);
  const animRef = useRef(null);
  const SPEED = 0.6;
  const MIN_DUR = 0.08;

  useMotionValueEvent(itemsProgressRaw, "change", (raw) => {
    const to = Math.max(0, Math.min(1, raw ?? 0));
    const from = itemsProgress.get();
    const delta = Math.abs(to - from);
    const duration = Math.max(MIN_DUR, delta / SPEED);
    if (animRef.current) animRef.current.stop();
    animRef.current = animateMV(itemsProgress, to, {
      duration,
      ease: "linear",
    });
  });

  const [scope, animate] = useAnimate();
  const lastLandedRef = useRef(-1);
  useMotionValueEvent(itemsProgress, "change", (p) => {
    const n = wheelItems.length;
    const landed = Math.min(n - 1, Math.floor(Math.max(0, Math.min(1, p)) * n));
    if (landed !== lastLandedRef.current) {
      if (landed >= 0) {
        animate(
          `[data-wheel="inner-${landed}"]`,
          { scale: [1, 1.04, 1] },
          { times: [0, 0.4, 1], duration: 0.5, ease: "easeOut" }
        );
      }
      lastLandedRef.current = landed;
    }
  });

  return (
    <section ref={targetRef} className="relative">
      {/* Mobile: two vertical panels. Panel B slider sits on the background image */}
      <div className="lg:hidden">
        {/* Panel A: Authors */}
        <section className="relative">
          <div className="absolute inset-0 bg-[#3C3D40] bg-cover bg-center bg-no-repeat bg-[url('/imgs/texture2.png')] bg-blend-multiply" />
          <div className="relative">
            <div className="container mx-auto px-4 py-10">
              <Subtitle tone="light" icon={UserRound} stroke={false}>
                ABOUT THE AUTHORS
              </Subtitle>

              <article className="mt-6">
                <Title as="h3" tone="light" className="text-2xl sm:text-3xl">
                  CPOYI Mikell
                </Title>
                <P className="mt-3 text-neutral-200/95 leading-relaxed text-base sm:text-lg">
                  Mikell writes with prophetic intensity, blending scripture
                  with lived experience. His voice carries urgency and clarity,
                  calling readers to rise above distraction and walk with
                  purpose.
                </P>
                <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-white/90 text-sm">
                  <a
                    className="text-blue-400 hover:text-blue-600 underline underline-offset-2"
                    href="http://www.officeofcpoyi.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    officeofcpoyi.com
                  </a>
                  <span>·</span>
                  <a
                    className="text-blue-400 hover:text-blue-600 underline underline-offset-2"
                    href="http://www.jeremiah31eight-31.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    jeremiah31eight-31.com
                  </a>
                  <span>·</span>
                  <a
                    className="text-blue-400 hover:text-blue-600 underline underline-offset-2"
                    href="http://www.theowwinc.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    theowwinc.com
                  </a>
                </div>
              </article>

              <article className="mt-8">
                <Title as="h3" tone="light" className="text-2xl sm:text-3xl">
                  L.A. Doyle
                </Title>
                <P className="mt-3 text-neutral-200/95 leading-relaxed text-base sm:text-lg">
                  L.A. writes with a focus on unity, prophecy, and purpose,
                  bringing a distinct voice to the DBT Franchise Ministry. As
                  co-author of The Dope Breakthrough, her perspective emphasizes
                  collaboration between men and women, Israelites and Gentiles,
                  showing that prophecy was always meant to be lived in
                  partnership.
                </P>
                <div className="mt-3 text-white/90 text-sm">
                  <a
                    className="text-blue-400 hover:text-blue-600 underline underline-offset-2"
                    href="http://www.eksblarneyyarns.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    eksblarneyyarns.com
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Panel B: Background image + overlaid Swiper slider */}
        <section className="relative">
          {/* Background */}
          <img
            src="/imgs/home-sec7.png"
            alt="Readers and community"
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading="lazy"
            decoding="async"
          />
          {/* Overlays for readability */}
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-transparent" />

          {/* Content over background */}
          <div className="relative">
            <div className="container mx-auto px-4 pt-10">
              <Subtitle tone="light" stroke={false}>
                Readers say
              </Subtitle>
            </div>

            <div className="container mx-auto px-4 pt-6 pb-14">
              <Swiper
                modules={[Pagination]}
                slidesPerView={1}
                spaceBetween={16}
                pagination={{ clickable: true }}
                aria-roledescription="carousel"
              >
                {wheelItems.map((item, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="rounded-3xl p-6 bg-white/10 backdrop-blur-md border border-white/20 ring-1 ring-white/10 shadow-2xl">
                      <div className="mx-auto mb-4 size-[70px] grid place-items-center rounded-full shadow-lg bg-gradient-to-br from-amber-400 to-amber-600">
                        <img
                          src={`/imgs/${item.icon}`}
                          alt=""
                          className="w-9 h-9 object-contain invert"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <h4 className="text-base font-semibold text-white text-center mb-2">
                        {item.author}
                      </h4>
                      <p className="text-sm text-white/90 leading-relaxed text-center">
                        {item.quote}
                      </p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Tweak Swiper bullets for dark bg */}
              <style jsx global>{`
                .swiper-pagination-bullet {
                  background: rgba(255, 255, 255, 0.5);
                  opacity: 1;
                }
                .swiper-pagination-bullet-active {
                  background: rgba(255, 255, 255, 0.95);
                }
              `}</style>
            </div>
          </div>
        </section>
      </div>

      {/* Desktop and up: unchanged motion panels */}
      <div className="hidden lg:block">
        <div className="relative mt-[100px] xl:mt-[120px] h-[600vh] xl:h-[760vh]">
          <div className="sticky top-0 h-screen overflow-hidden">
            {/* Panel 1 */}
            <motion.div
              className="absolute inset-0 z-10 bg-[#3C3D40] bg-cover bg-no-repeat bg-center bg-[url('/imgs/texture2.png')] bg-blend-multiply"
              style={{ x: panel1X }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-transparent" />
              <motion.div className="absolute inset-0">
                <div className="h-full flex items-center">
                  <div className="container mx-auto px-4">
                    <Subtitle tone="light" icon={UserRound} stroke={false}>
                      ABOUT THE AUTHORS
                    </Subtitle>

                    <div className="mt-8 max-w-3xl">
                      <Title as="h3" tone="light">
                        CPOYI Mikell
                      </Title>
                      <P className="mt-3 text-neutral-200/95 leading-relaxed">
                        Mikell writes with prophetic intensity, blending
                        scripture with lived experience. His voice carries
                        urgency and clarity, calling readers to rise above
                        distraction and walk with purpose.
                      </P>
                      <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-white">
                        <a
                          className="text-blue-400 hover:text-blue-600 underline underline-offset-2"
                          href="http://www.officeofcpoyi.com/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          officeofcpoyi.com
                        </a>
                        <span>,</span>
                        <a
                          className="text-blue-400 hover:text-blue-600 underline underline-offset-2"
                          href="http://www.jeremiah31eight-31.com/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          jeremiah31eight-31.com
                        </a>
                        <span>,</span>
                        <a
                          className="text-blue-400 hover:text-blue-600 underline underline-offset-2"
                          href="http://www.theowwinc.com/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          theowwinc.com
                        </a>
                      </div>
                    </div>

                    <div className="mt-8 max-w-3xl">
                      <Title as="h3" tone="light">
                        L.A. Doyle
                      </Title>
                      <P className="mt-3 text-neutral-200/95 leading-relaxed">
                        L.A. writes with a focus on unity, prophecy, and
                        purpose, bringing a distinct voice to the DBT Franchise
                        Ministry. As co-author of The Dope Breakthrough, her
                        perspective emphasizes collaboration between men and
                        women, Israelites and Gentiles, showing that prophecy
                        was always meant to be lived in partnership.
                      </P>
                      <a
                        className="text-blue-400 hover:text-blue-600 underline underline-offset-2"
                        href="http://www.eksblarneyyarns.com/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        eksblarneyyarns.com
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Panel 2 */}
            <motion.div
              className="absolute inset-0 z-20"
              style={{ x: panel2X }}
            >
              <div className="min-w-full h-full relative">
                <img
                  src="/imgs/home-sec7.png"
                  alt="Readers and community"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                <div
                  className="absolute bottom-0 left-0 right-0 pb-16"
                  ref={scope}
                >
                  <div className="container mx-auto px-4 xl:max-w-[1240px]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
                      {wheelItems.map((item, idx) => {
                        const n = wheelItems.length;
                        const segStart = idx / n;
                        const segEnd = (idx + 1) / n;

                        const t = useTransform(
                          itemsProgress,
                          [segStart, segEnd],
                          [0, 1]
                        );
                        const ty = useTransform(t, [0, 1], ["24px", "0px"]);
                        const op = useTransform(t, [0, 0.2, 1], [0, 1, 1]);
                        const scale = useTransform(t, [0, 1], [0.96, 1]);

                        return (
                          <motion.div
                            key={idx}
                            className="min-w-0"
                            style={{ y: ty, opacity: op, scale }}
                          >
                            <div
                              data-wheel={`inner-${idx}`}
                              className="h-full aspect-square lg:aspect-auto rounded-3xl p-6 bg-white/8 backdrop-blur-sm border border-white/15 hover:border-white/30 transition-colors"
                            >
                              <div className="mx-auto mb-4 size-[70px] grid place-items-center rounded-full shadow-lg bg-gradient-to-br from-amber-400 to-amber-600">
                                <img
                                  src={`/imgs/${item.icon}`}
                                  alt=""
                                  className="w-9 h-9 object-contain invert"
                                  loading="lazy"
                                  decoding="async"
                                />
                              </div>
                              <h4 className="text-base font-semibold text-white text-center mb-2">
                                {item.author}
                              </h4>
                              <p className="text-sm text-white/90 leading-relaxed text-center">
                                {item.quote}
                              </p>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>

                    <div className="mt-6 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        className="h-full bg-white/70"
                        style={{
                          width: useTransform(
                            itemsProgress,
                            [0, 1],
                            ["0%", "100%"]
                          ),
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sec7;
