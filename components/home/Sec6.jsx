"use client";

import { BOOKS } from "@/constants";
import { MotionInView, variants } from "@/utils/motion";
import { motion } from "motion/react";
import React from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import Button from "../ui/Button";
import Title from "../ui/Title";

const Sec6 = () => {
  return (
    <section className="relative pt-[4em]">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-16 -left-20 h-[380px] w-[380px] rounded-full bg-primary/20 blur-3xl opacity-70" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl opacity-60" />
        <div className="absolute inset-0 opacity-30 mix-blend-multiply bg-[url('/imgs/texture2.jpg')] bg-center bg-no-repeat bg-[length:70%_80%]" />
      </div>

      <div className="container">
        <div className="flex w-full p-2.5 justify-center flex-wrap content-start relative">
          <div className="w-full text-center pb-[4em]">
            <Title>
              <span className="text-primary">Available in the following </span>
              Formats
            </Title>
          </div>

          <div className="w-full">
            <div className="grid md:grid-cols-2 gap-[30px] w-full mb-20">
              {BOOKS.map((book, idx) => (
                <MotionInView
                  key={idx}
                  as={motion.div}
                  v={variants.fadeRise}
                  viewport={{ once: true, amount: 0.5 }}
                  delay={idx * 0.2}
                >
                  <CardContainer className="inter-var">
                    <CardBody
                      className={[
                        "relative w-full h-auto p-6",
                        "rounded-3xl border border-white/40 bg-white/70 backdrop-blur-md",
                        "ring-1 ring-black/5 shadow-2xl",
                        "flex flex-wrap items-center gap-10",
                      ].join(" ")}
                    >
                      <CardItem
                        translateZ="100"
                        className="w-full md:w-2/5 grow-0 shrink basis-auto pointer-events-none"
                      >
                        <img
                          src={book.img}
                          height="1000"
                          width="1000"
                          className="w-full object-contain group-hover/card:shadow-xl"
                          alt="thumbnail"
                        />
                      </CardItem>

                      <div className="flex flex-col w-full md:w-[calc(60%_-_40px)] grow-0 shrink basis-auto">
                        <CardItem
                          translateZ="50"
                          className="text-3xl font-semibold text-secondary-900"
                        >
                          {book.title}
                        </CardItem>

                        <CardItem
                          as="p"
                          translateZ="60"
                          className="text-secondary-500 text-[15px] max-w-sm mt-2"
                        >
                          Lorem ipsum dolor sit amet conse ctetur adipisicing
                          elit. Quisquam placeat iusto id necessitatibus est
                          distinctio!
                        </CardItem>

                        <div className="flex flex-col mt-5 gap-3">
                          <CardItem
                            as="div"
                            translateZ="70"
                            className="flex flex-wrap w-full text-base"
                          >
                            <CardItem
                              as="span"
                              translateZ="70"
                              className="inline-block w-full md:w-auto py-1 px-3 rounded-lg bg-primary-100 text-secondary-900"
                            >
                              {book.type}
                            </CardItem>
                            <CardItem
                              as="span"
                              translateZ="70"
                              className="inline-block w-full md:w-auto grow py-1 px-3 rounded-lg bg-primary-200 text-primary-900"
                            >
                              Price: <strong>${book.price.toFixed(2)}</strong>
                            </CardItem>
                          </CardItem>

                          <CardItem
                            translateZ="40"
                            className="relative z-10 w-full"
                          >
                            <Button
                              className="w-full rounded-xl"
                              tone="dark"
                              href="/"
                            >
                              Add to Cart
                            </Button>
                          </CardItem>
                        </div>
                      </div>

                      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-black/5" />
                    </CardBody>
                  </CardContainer>
                </MotionInView>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sec6;
