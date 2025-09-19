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

const Sec7 = () => {
  const targetRef = useRef(null);

  // ====== Shared data ======
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
          "Milton and Doyle blends prophecy with raw, street-smart wisdom, creating a unique firestorm of ideas. The words don’t just sit on the page they ignite your mind, keeping you hooked long after you’ve put the book down.",
      },
      {
        icon: "property-insurance.png",
        author: "Sammy Sam",
        quote:
          "Raw, fearless, spiritual. It doesn’t just land on your heart it drills in. Highly recommend to anyone seeking truth and purpose.!!",
      },
      {
        icon: "goodwill.png",
        author: "Taylor Ben",
        quote:
          "Authors write with an intensity that makes faith and prophecy feel alive. This isn’t just entertainment, it’s an invitation to see the world differently. I loved the cast of characters warriors, and believers and the way the narrative connects generations and history in a way that feels urgent and real.",
      },
    ],
    []
  );

  // ====== DESKTOP (LG+) — original experience preserved ======
  const R = {
    s1Out: [0.06, 0.13],
    s2In: [0.08, 0.16],
    s2Out: [0.2, 0.3],
    s3In: [0.3, 0.4],
    hold: [0.4, 0.48],
    hand: [0.46, 0.56],
  };

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const panel1X = useTransform(
    scrollYProgress,
    [0, R.hand[0], R.hand[1], 1],
    ["0%", "0%", "-100%", "-100%"]
  );
  const panel2X = useTransform(
    scrollYProgress,
    [0, R.hand[0], R.hand[1], 1],
    ["100%", "100%", "0%", "0%"]
  );

  const s1Y = useTransform(
    scrollYProgress,
    [0, R.s1Out[0], R.s1Out[1]],
    ["0vh", "0vh", "-100vh"]
  );
  const s1Op = useTransform(scrollYProgress, R.s1Out, [1, 0]);

  const s2Y = useTransform(
    scrollYProgress,
    [0, R.s2In[0], R.s2In[1], R.s2Out[0], R.s2Out[1]],
    ["100vh", "100vh", "0vh", "0vh", "-100vh"]
  );
  const s2Op = useTransform(
    scrollYProgress,
    [R.s2In[0], R.s2In[1], R.s2Out[0], R.s2Out[1]],
    [0, 1, 1, 0]
  );

  const s3Y = useTransform(
    scrollYProgress,
    [0, R.s3In[0], R.s3In[1], R.hold[0], R.hold[1]],
    ["100vh", "100vh", "0vh", "0vh", "0vh"]
  );
  const s3Op = useTransform(scrollYProgress, R.s3In, [0, 1]);

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
      {/* ====== MOBILE/TABLET (below LG) — simplified, polished layout ====== */}
      <div className="lg:hidden">
        {/* Top image with same vibe */}
        <div className="relative w-full h-[48vh] min-h-[320px]">
          <img
            src="/imgs/home-sec7.png"
            alt="Readers and community"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#3C3D40] mix-blend-multiply opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-transparent" />
          <div className="absolute bottom-3 left-0 right-0">
            <div className="container mx-auto px-4">
              <Subtitle tone="light" icon={UserRound} stroke={false}>
                ABOUT THE AUTHORS
              </Subtitle>
            </div>
          </div>
        </div>

        {/* Author blocks (stacked) */}
        <div className="container mx-auto px-4 py-8 space-y-10">
          <div>
            <Title as="h3" tone="light">
              Mikell M. Milton
            </Title>
            <P className="mt-3 text-neutral-200/95 leading-relaxed">
              Mikell writes with prophetic intensity, blending scripture with
              lived experience. His voice carries urgency and clarity, calling
              readers to rise above distraction and walk with purpose.
            </P>
          </div>

          <div>
            <Title as="h3" tone="light">
              L.A. Doyle
            </Title>
            <P className="mt-3 text-neutral-200/95 leading-relaxed">
              L.A. writes with a focus on unity, prophecy, and purpose, bringing
              a distinct voice to the DBT Franchise Ministry. As co-author of
              The Dope Breakthrough, her perspective emphasizes collaboration
              between men and women, Israelites and Gentiles, showing that
              prophecy was always meant to be lived in partnership.
            </P>
          </div>

          <div>
            <Title tone="light">Why two Authors</Title>
            <P className="mt-3 text-neutral-200/95 leading-relaxed">
              We write as a team. Mikell M. Milton and L.A. Doyle bring together
              prophecy, history, and lived experience to serve one purpose,
              helping readers see the destiny already written for them. Our work
              speaks across generations—Boomers, Gen X, Millennials, Gen Z, and
              Gen Alpha—with a simple through line: clarity first, then action.
              We write, teach, and build so people can move with purpose.
            </P>
          </div>
        </div>

        {/* Quotes — snap carousel on mobile for easy thumb swipe */}
        <div className="container mx-auto px-4 pb-10">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none]">
            <style jsx>{`
              .scrollbar-none::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {wheelItems.map((item, idx) => (
              <div key={idx} className="snap-center shrink-0 w-[82%]">
                <div className="h-full rounded-3xl p-5 bg-white/8 backdrop-blur-sm border border-white/15">
                  <div className="mx-auto mb-4 size-[64px] grid place-items-center rounded-full shadow-lg bg-gradient-to-br from-amber-400 to-amber-600">
                    <img
                      src={`/imgs/${item.icon}`}
                      alt={item.author}
                      className="w-8 h-8 object-contain invert"
                    />
                  </div>
                  <h4 className="text-base font-semibold text-white text-center mb-2">
                    {item.author}
                  </h4>
                  <p className="text-sm text-white/90 leading-relaxed text-center">
                    {item.quote}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Progress bar mimic (simple) */}
          <div className="mt-6 h-1 w-full rounded-full bg-white/10 overflow-hidden">
            <div className="h-full w-1/3 bg-white/70" />
          </div>
        </div>
      </div>

      {/* ====== DESKTOP (LG+) — unchanged original UI/animation ====== */}
      <div className="hidden lg:block">
        <div className="relative mt-[120px] h-[760vh]">
          <div className="sticky top-0 h-screen overflow-hidden">
            {/* Panel 1 */}
            <motion.div
              className="absolute inset-0 z-10 bg-[#3C3D40] bg-cover bg-no-repeat bg-center bg-[url('/imgs/texture.jpg')] bg-blend-multiply"
              style={{ x: panel1X }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-transparent" />
              {/* Slide 1 */}
              <motion.div
                style={{ y: s1Y, opacity: s1Op }}
                className="absolute inset-x-0 top-[18vh] h-[40vh]"
              >
                <div className="h-full flex items-center">
                  <div className="container mx-auto px-4">
                    <Subtitle tone="light" icon={UserRound} stroke={false}>
                      ABOUT THE AUTHORS
                    </Subtitle>
                    <div className="mt-8 max-w-3xl">
                      <Title as="h3" tone="light">
                        Mikell M. Milton
                      </Title>
                      <P className="mt-3 text-neutral-200/95 leading-relaxed">
                        Mikell writes with prophetic intensity, blending
                        scripture with lived experience. His voice carries
                        urgency and clarity, calling readers to rise above
                        distraction and walk with purpose.
                      </P>
                    </div>
                  </div>
                </div>
              </motion.div>
              {/* Slide 2 */}
              <motion.div
                style={{ y: s2Y, opacity: s2Op }}
                className="absolute inset-x-0 top-[20vh] h-[42vh]"
              >
                <div className="h-full flex items-center">
                  <div className="container mx-auto px-4">
                    <Subtitle tone="light" icon={UserRound} stroke={false}>
                      ABOUT THE AUTHORS
                    </Subtitle>
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
                    </div>
                  </div>
                </div>
              </motion.div>
              {/* Slide 3 */}
              <motion.div
                style={{ y: s3Y, opacity: s3Op }}
                className="absolute inset-x-0 top-[20vh] h-[56vh]"
              >
                <div className="h-full flex items-center">
                  <div className="container mx-auto px-4">
                    <Subtitle tone="light" icon={UserRound} stroke={false}>
                      ABOUT THE AUTHORS
                    </Subtitle>
                    <div className="mt-8 max-w-3xl">
                      <Title tone="light">Why two Authors</Title>
                      <P className="mt-3 text-neutral-200/95 leading-relaxed">
                        We write as a team. Mikell M. Milton and L.A. Doyle
                        bring together prophecy, history, and lived experience
                        to serve one purpose, helping readers see the destiny
                        already written for them. Our work speaks across
                        generations Boomers, Gen X, Millennials, Gen Z, and Gen
                        Alpha with a simple through line, clarity first, then
                        action. We write, teach, and build so people can move
                        with purpose.
                      </P>
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
                                  alt={item.author}
                                  className="w-9 h-9 object-contain invert"
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
