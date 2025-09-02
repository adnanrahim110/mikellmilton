"use client";

import { BookOpenText } from "lucide-react";
import React from "react";
import P from "../ui/P";
import Subtitle from "../ui/Subtitle";
import Title from "../ui/Title";

const Sec4 = () => {
  return (
    <section className="bg-black relative z-[1] py-[70px_100px]">
      <div className="container">
        <Subtitle tone="light" icon={BookOpenText} stroke={false}>
          DBT
        </Subtitle>
        <div className="space-y-5">
          <Title tone="light">The DOPE Break through</Title>
          <P className="text-secondary-300">
            The Enemies of Mankind have controlled the West, from the school
            yard to the political and military halls of power, ever since
            Alexander was “Great.” When the Industrial Age of Bullies ended,
            where physical prowess carried the BIG STICK, the lightning-fast wit
            of computer wizards ushered in the Age of Sorcery where BIG TECH
            harnesses power through knowledge and manipulation of unseen forces.
            The world of technology and magic are closer than you think.
            Alien-angels, gods, and goddesses influence the course of 21st
            century world events. If you can’t see this, you’re completely under
            enemy control.{" "}
            <strong>Operation 2nd Coming will commence 10/16/2025.</strong>
            Do you have what it takes to{" "}
            <strong>BREAKTHROUGH and BREAK FREE?</strong>
          </P>
        </div>
      </div>
    </section>
  );
};

export default Sec4;
