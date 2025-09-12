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
import React, { useRef } from "react";
import P from "../ui/P";
import Quote from "../ui/Quote";
import Subtitle from "../ui/Subtitle";
import Title from "../ui/Title";

const Sec7 = () => {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 0.25, 0.3, 1],
    ["0%", "-100%", "-100%", "-100%"]
  );

  const secondPanelX = useTransform(
    scrollYProgress,
    [0, 0.25, 1],
    ["100%", "0%", "0%"]
  );

  const itemsProgressRaw = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  const itemsProgress = useMotionValue(0);
  const animRef = useRef(null);
  const SPEED = 0.5;
  const MIN_DUR = 0.05;

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

  const wheelItems = [
    {
      icon: "blueprint.png",
      author: "Psalm 64:1",
      quote:
        ".Hear my voice, Abba Yahawah, in my meditation; Preserve my life from fear of the enemy.",
    },
    {
      icon: "reading-book.png",
      author: "Joel 2:12",
      quote:
        '"Now therefore,"says Lord Yashiah, "Turn to me with all your heart, With fasting, with weeping, and with mourning."',
    },
    {
      icon: "property-insurance.png",
      author: "James 1:21",
      quote:
        "Therefore, lay aside all filthiness and overflow of wickedness, and receive with meekness the implanted word, which is able to save your souls.",
    },
    {
      icon: "goodwill.png",
      author: "Revelation 2:26",
      quote:
        'And Christ-King Yashiah said,"And he or she who overcomes, and keeps MY works until the end, to them I will give power over the nations."',
    },
  ];

  const [scope, animate] = useAnimate();
  const lastLandedRef = useRef(-1);

  useMotionValueEvent(itemsProgress, "change", (p) => {
    const n = wheelItems.length;
    const landed = Math.min(n - 1, Math.floor((p ?? 0) * n) - 1);
    if (landed !== lastLandedRef.current) {
      if (landed >= 0) {
        animate(
          `[data-wheel="inner-${landed}"]`,
          { scale: [1, 1.04, 1] },
          { times: [0, 0.35, 1], duration: 0.4, ease: "easeOut" }
        );
      }
      if (landed - 1 >= 0) {
        animate(
          `[data-wheel="inner-${landed - 1}"]`,
          { x: [0, -8, 0], scale: [1, 0.98, 1] },
          { times: [0, 0.4, 1], duration: 0.35, ease: [0.17, 0.67, 0.3, 1] }
        );
      }
      lastLandedRef.current = landed;
    }
  });

  return (
    <section ref={targetRef} className="mt-[120px] relative h-[500vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div className="absolute inset-0 z-10" style={{ x }}>
          <div className="min-w-full h-full relative bg-[#3C3D40] bg-cover bg-no-repeat bg-center bg-[url('/imgs/texture.jpg')] bg-blend-multiply flex flex-col justify-center">
            <div className="container mx-auto px-4">
              <div className="py-14">
                <Subtitle tone="light" icon={UserRound} stroke={false}>
                  about me
                </Subtitle>
                <div className="space-y-5">
                  <Title tone="light">
                    A Prophecy for the 21st Century Israelites in the Diaspora
                  </Title>
                  <Quote tone="dark" className="mb-8" author="ROMANS 8:18-21">
                    18] I consider that our present sufferings are not worth
                    comparing with the glory that will be revealed in us. 19]
                    For the creation waits in eager expectation for the children
                    of YAHAWAH to be revealed. 20] For the creation was
                    subjected to frustration, not by its own choice, but by the
                    will of the one who subjected it, in hope 21] that[a] the
                    creation itself will be liberated from its bondage to decay
                    and brought into the freedom and glory of the children of
                    YAHAWAH.
                  </Quote>
                  <P className="text-neutral-200">
                    Mikell M. Milton, with L.A. Doyle, brings together prophecy,
                    history, and modern revelation in{" "}
                    <em>
                      The Dope Breakthrough – Divining Our Perfect Eternity
                    </em>
                    . As a voice for the 21st-century Israelites in the
                    Diaspora, his writing bridges scripture with lived reality,
                    speaking to every generation Boomers, Gen X, Millennials,
                    Gen Z, and Gen Alpha. With a prophetic lens and a call to
                    destiny, his work challenges readers to see the greater
                    story already written: a breakthrough that was always
                    promised, and an eternity that is certain.
                  </P>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="absolute inset-0 z-20"
          style={{ x: secondPanelX }}
        >
          <div className="min-w-full h-full relative">
            <img
              src="/imgs/home-sec7.png"
              className="w-full h-full object-cover object-top"
              alt=""
            />

            <div className="absolute bottom-0 left-0 right-0 pb-20" ref={scope}>
              <div className="container xl:max-w-[1240px]! mx-auto">
                <div className="grid lg:grid-cols-4 gap-5">
                  {wheelItems.map((item, idx) => {
                    const n = wheelItems.length;
                    const segStart = idx / n;
                    const segEnd = (idx + 1) / n;

                    const t = useTransform(
                      itemsProgress,
                      [segStart, segEnd],
                      [0, 1]
                    );
                    const tx = useTransform(t, [0, 1], ["100vw", "0vw"]);
                    const rot = useTransform(t, [0, 1], [720, 0]);
                    const op = useTransform(t, [0, 0.2, 1], [0, 1, 1]);

                    return (
                      <motion.div
                        key={idx}
                        className="flex-shrink-0"
                        style={{ x: tx, rotate: rot, opacity: op }}
                      >
                        <div
                          data-wheel={`inner-${idx}`}
                          className="size-full aspect-square flex items-center justify-center flex-col rounded-full px-8 bg-black/60 backdrop-blur-md border border-white/20 hover:bg-black/60 hover:border-primary transition-colors duration-300"
                        >
                          <span className="size-[70px] flex items-center justify-center bg-gradient-to-br from-amber-400 to-amber-600 rounded-full mb-4 shadow-lg">
                            <img
                              src={`/imgs/${item.icon}`}
                              alt={item.author}
                              className="w-10 h-10 object-contain filter invert"
                            />
                          </span>
                          <h4 className="text-base font-bold text-white mb-3 text-center">
                            {item.author}
                          </h4>
                          <p className="text-sm text-white/90 text-center leading-relaxed">
                            {item.quote}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Sec7;
