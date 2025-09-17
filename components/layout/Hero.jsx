"use client";

import { cn } from "@/utils/cn";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { SplitText } from "gsap/SplitText";
import React, { useCallback, useEffect, useRef, useState } from "react";

gsap.registerPlugin(Observer, SplitText);

const defaultSections = [
  { text: "Divine Game of Life", img: "/imgs/banners/hero-1.jpeg" },
  { text: "Rise Above Darkness", img: "/imgs/banners/hero-2.jpeg" },
  { text: "Breakthrough the Darkness", img: "/imgs/banners/hero-3.jpeg" },
];

const Hero = ({ sections = defaultSections, className = "" }) => {
  const containerRef = useRef(null);
  const observerRef = useRef(null);
  const timelineRef = useRef(null);
  const splitHeadingsRef = useRef([]);
  const currentIndexRef = useRef(-1);
  const animatingRef = useRef(false);

  const sectionsRefs = useRef([]);
  const imagesRefs = useRef([]);
  const outerRefs = useRef([]);
  const innerRefs = useRef([]);
  const headingRefs = useRef([]);

  const counterCurrentRef = useRef(null);
  const counterNextRef = useRef(null);
  const counterCurrentSplitRef = useRef(null);
  const counterNextSplitRef = useRef(null);

  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let loaded = 0;
    sections.forEach((s) => {
      const img = new Image();
      img.src = s.img;
      const done = () => {
        loaded += 1;
        if (loaded === sections.length) setImagesLoaded(true);
      };
      img.onload = done;
      img.onerror = done;
    });
  }, [sections]);

  const gotoSection = useCallback((index, direction) => {
    if (!containerRef.current || animatingRef.current) return;

    const wrap = gsap.utils.wrap(0, sectionsRefs.current.length);
    index = wrap(index);
    animatingRef.current = true;

    const fromTop = direction === -1;
    const dFactor = fromTop ? -1 : 1;

    const tl = gsap.timeline({
      defaults: { duration: 1.25, ease: "power1.inOut" },
      onComplete: () => {
        animatingRef.current = false;
      },
    });
    timelineRef.current = tl;

    if (currentIndexRef.current >= 0) {
      gsap.set(sectionsRefs.current[currentIndexRef.current], { zIndex: 0 });
      tl.to(imagesRefs.current[currentIndexRef.current], {
        xPercent: -15 * dFactor,
      }).set(sectionsRefs.current[currentIndexRef.current], { autoAlpha: 0 });
    }

    gsap.set(sectionsRefs.current[index], { autoAlpha: 1, zIndex: 1 });

    tl.fromTo(
      [outerRefs.current[index], innerRefs.current[index]],
      { xPercent: (i) => (i ? -100 * dFactor : 100 * dFactor) },
      { xPercent: 0 },
      0
    ).fromTo(
      imagesRefs.current[index],
      { xPercent: 15 * dFactor },
      { xPercent: 0 },
      0
    );

    if (splitHeadingsRef.current[index]?.lines) {
      const lines = splitHeadingsRef.current[index].lines;
      gsap.set(lines, { opacity: 0, yPercent: 100 });
      tl.to(
        lines,
        {
          opacity: 1,
          yPercent: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: { each: 0.1, from: "start" },
        },
        0.4
      );
    }

    if (counterCurrentRef.current && counterNextRef.current) {
      if (!counterCurrentSplitRef.current) {
        counterCurrentSplitRef.current = new SplitText(
          counterCurrentRef.current,
          {
            type: "lines",
            linesClass: "line",
            mask: "lines",
          }
        );
      }

      counterNextRef.current.textContent = String(index + 1);
      gsap.set(counterNextRef.current, { opacity: 1 });

      if (counterNextSplitRef.current) {
        counterNextSplitRef.current.revert();
        counterNextSplitRef.current = null;
      }
      counterNextSplitRef.current = new SplitText(counterNextRef.current, {
        type: "lines",
        linesClass: "line",
        mask: "lines",
      });

      const currentLines = counterCurrentSplitRef.current?.lines || [];
      const nextLines = counterNextSplitRef.current?.lines || [];

      gsap.set(currentLines, { opacity: 1, yPercent: 0 });
      gsap.set(nextLines, { opacity: 1, yPercent: 100 * dFactor });

      tl.to(
        currentLines,
        {
          yPercent: -100 * dFactor,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: { each: 0.1, from: "start" },
        },
        0.4
      );
      tl.to(
        nextLines,
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: { each: 0.1, from: "start" },
        },
        0.4
      ).add(() => {
        counterCurrentSplitRef.current?.revert?.();
        counterCurrentSplitRef.current = null;
        counterNextSplitRef.current?.revert?.();
        counterNextSplitRef.current = null;

        if (counterCurrentRef.current && counterNextRef.current) {
          counterCurrentRef.current.textContent =
            counterNextRef.current.textContent;
        }
        gsap.set(counterNextRef.current, { opacity: 0, clearProps: "all" });
      });
    }

    currentIndexRef.current = index;
    setCurrentIndex(index);
  }, []);

  useGSAP(
    () => {
      if (!containerRef.current || !imagesLoaded) return;

      const headings = headingRefs.current;
      splitHeadingsRef.current = headings.map(
        (h) =>
          new SplitText(h, {
            type: "lines",
            linesClass: "line",
            mask: "lines",
          })
      );

      gsap.set(outerRefs.current, { xPercent: 100 });
      gsap.set(innerRefs.current, { xPercent: -100 });

      observerRef.current = Observer.create({
        type: "touch,pointer",
        onDown: () =>
          !animatingRef.current && gotoSection(currentIndexRef.current - 1, -1),
        onUp: () =>
          !animatingRef.current && gotoSection(currentIndexRef.current + 1, 1),
        tolerance: 10,
        preventDefault: true,
      });

      gotoSection(0, 1);

      return () => {
        observerRef.current?.kill?.();
        observerRef.current = null;
        timelineRef.current?.kill?.();
        timelineRef.current = null;
        splitHeadingsRef.current.forEach((s) => s?.revert?.());
        splitHeadingsRef.current = [];
        counterCurrentSplitRef.current?.revert?.();
        counterCurrentSplitRef.current = null;
        counterNextSplitRef.current?.revert?.();
        counterNextSplitRef.current = null;
      };
    },
    { scope: containerRef, dependencies: [sections.length, imagesLoaded] }
  );

  return (
    <section className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl opacity-60" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/[.06] to-transparent" />
      </div>

      <div
        ref={containerRef}
        className={cn(
          "relative w-full h-dvh max-h-[680px] overflow-hidden",
          "text-white select-none"
        )}
      >
        <div className="absolute bottom-4 right-6 z-[2] flex items-center gap-3">
          <div className="flex gap-2 rounded-xl bg-black/40 backdrop-blur-md p-1.5 ring-1 ring-white/20 shadow-md">
            {sections.map((section, i) => (
              <button
                key={`thumb-${i}`}
                className={cn(
                  "h-10 rounded-lg overflow-hidden relative transition-all duration-300",
                  currentIndex === i
                    ? "w-20 scale-y-[135%] -translate-y-2 shadow-[0_0_10px] shadow-white/5"
                    : "w-14"
                )}
                onClick={() => {
                  if (currentIndex !== i && !animatingRef.current) {
                    const direction = i > currentIndex ? 1 : -1;
                    gotoSection(i, direction);
                  }
                }}
                aria-label={`Go to slide ${i + 1}`}
              >
                <img
                  src={section.img}
                  alt={`Slide ${i + 1}`}
                  className="w-full h-full object-cover"
                />
                <div
                  className={cn(
                    "absolute inset-0 bg-black transition-opacity duration-700 ease-in-out",
                    currentIndex !== i ? "opacity-40" : "opacity-0"
                  )}
                />
              </button>
            ))}
          </div>

          <div className="rounded-md bg-black/40 backdrop-blur-md px-2.5 py-1.5 text-xs md:text-sm tracking-wider ring-1 ring-white/20 shadow-md">
            <div className="relative overflow-hidden h-[1em] leading-[1em] inline-block align-middle min-w-[0.9em] mr-1">
              <span ref={counterCurrentRef} className="block">
                1
              </span>
              <span
                ref={counterNextRef}
                className="block absolute left-0 top-0 opacity-0"
              >
                2
              </span>
            </div>
            <span className="opacity-80">/ {sections.length}</span>
          </div>
        </div>

        {sections.map((section, i) => (
          <section
            key={`section-${i}`}
            className="absolute top-0 left-0 h-full w-full invisible"
            ref={(el) => el && (sectionsRefs.current[i] = el)}
          >
            <div
              className="outer w-full h-full overflow-hidden"
              ref={(el) => el && (outerRefs.current[i] = el)}
            >
              <div
                className="inner w-full h-full overflow-hidden"
                ref={(el) => el && (innerRefs.current[i] = el)}
              >
                <div
                  className="bg absolute top-0 left-0 h-full w-full bg-cover bg-center"
                  ref={(el) => el && (imagesRefs.current[i] = el)}
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.82) 100%), url("${section.img}")`,
                  }}
                >
                  <div className="size-full flex items-center justify-center px-3">
                    <h2
                      ref={(el) => el && (headingRefs.current[i] = el)}
                      className="section-heading text-center text-white font-semibold normal-case leading-none z-10"
                      style={{
                        fontFamily: "var(--font-albert-sans)",
                        fontSize: "clamp(28px, 6vw, 88px)",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {section.text}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </section>
  );
};

export default Hero;
