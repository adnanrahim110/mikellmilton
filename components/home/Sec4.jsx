"use client";

import { BookOpenText } from "lucide-react";
import React from "react";
import P from "../ui/P";
import Subtitle from "../ui/Subtitle";
import Title from "../ui/Title";

const Sec4 = () => {
  return (
    <section className="relative z-[1] bg-secondary-950 pt-[70px] pb-[100px] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-16 -left-20 h-[380px] w-[380px] rounded-full bg-primary/20 blur-3xl opacity-70" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl opacity-60" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="container">
        <Subtitle tone="light" icon={BookOpenText} stroke={false}>
          DBT
        </Subtitle>

        <div className="space-y-5">
          <Title tone="light">Welcome to The DOPE Breakthrough</Title>

          <P className="text-secondary-300">
            This is not just a game; it’s a journey of unlocking your true
            potential and discovering the wisdom within you. Step into a new
            reality and prepare for the transformation you’ve been waiting for.
            Are you ready to face spiritual warfare and rise above the
            challenges? The path to your true self may be tough, but with the
            right mindset, you can overcome it. Like the great warriors before
            you, it’s time to break free from what holds you back. This journey
            is about more than survival. It’s about thriving and tapping into
            your divine power. Victory is already secured, but will you answer
            the call to claim it? The choice is yours, and the time to act is
            now.
          </P>
        </div>
      </div>
    </section>
  );
};

export default Sec4;
