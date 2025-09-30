"use client";

import { fetchDopeBooksFromDB } from "@/components/checkout/helpers";
import { addToCart } from "@/lib/cartSlice";
import { cn } from "@/utils/cn";
import { MotionInView, variants } from "@/utils/motion";
import { motion } from "motion/react";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import Button from "../ui/Button";
import ProgressiveImage from "../ui/ProgressiveImage";
import Skeleton from "../ui/Skeleton";
import Title from "../ui/Title";

const Sec6 = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await fetchDopeBooksFromDB();
        if (mounted) setBooks(data);
      } catch {
        if (mounted) setBooks([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const cartIds = useMemo(
    () => new Set((cartItems || []).map((i) => i.id)),
    [cartItems]
  );

  const RowCardSkeleton = () => (
    <div
      className={[
        "relative w-full h-auto p-6",
        "rounded-3xl border border-white/40 bg-white/70 backdrop-blur-md",
        "ring-1 ring-black/5 shadow-2xl",
        "flex flex-wrap items-center gap-10",
      ].join(" ")}
    >
      <div className="w-full md:w-2/5 grow-0 shrink basis-auto">
        <Skeleton className="w-full aspect-[229/338] rounded-xl" />
      </div>

      <div className="flex flex-col w-full md:w-[calc(60%_-_40px)] grow-0 shrink basis-auto">
        <Skeleton className="h-7 w-3/5 mb-2" />
        <Skeleton className="h-4 w-11/12 mb-1" />
        <Skeleton className="h-4 w-4/5 mb-1" />
        <Skeleton className="h-4 w-3/5 mb-4" />

        <div className="flex flex-wrap w-full gap-3 text-base">
          <Skeleton className="h-7 w-24 rounded-lg" />
          <Skeleton className="h-7 w-36 rounded-lg" />
        </div>

        <Skeleton className="h-10 w-full rounded-xl mt-4" />
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-black/5" />
    </div>
  );

  return (
    <section className="relative pt-[4em]">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-16 -left-20 h-[380px] w-[380px] rounded-full bg-primary/20 blur-3xl opacity-70" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl opacity-60" />
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
            <div className="grid md:grid-cols-2 gap-[30px] w-full lg:mb-20">
              {loading
                ? Array.from({ length: 2 }).map((_, i) => (
                    <RowCardSkeleton key={`row-s-${i}`} />
                  ))
                : books.map((book, idx) => {
                    const isInCart = cartIds.has(book.id);
                    const price = Number(book.price || 0);
                    const handleAdd = () => {
                      if (isInCart) return;
                      dispatch(
                        addToCart({
                          id: book.id,
                          sku: book.sku,
                          title: book.title,
                          price,
                          image: book.img,
                          quantity: 1,
                          mode: book.mode,
                        })
                      );
                      if (
                        typeof window !== "undefined" &&
                        window?.toast?.success
                      ) {
                        window.toast.success(`Added "${book.title}" to cart`);
                      }
                    };

                    return (
                      <MotionInView
                        key={book.id ?? idx}
                        as={motion.div}
                        v={variants.fadeRise}
                        viewport={{ once: true, amount: 0.5 }}
                        delay={idx * 0.2}
                      >
                        <CardContainer className="inter-var">
                          <CardBody
                            className={cn(
                              "relative w-full h-auto p-6",
                              "rounded-3xl border border-white/40 bg-white/70 backdrop-blur-md",
                              "ring-1 ring-black/5 shadow-2xl",
                              "flex flex-wrap items-center gap-10"
                            )}
                          >
                            <CardItem
                              translateZ="100"
                              className="w-full md:w-2/5 grow-0 shrink basis-auto pointer-events-none"
                            >
                              <ProgressiveImage
                                src={book.img}
                                height={946}
                                width={640}
                                alt={book.title}
                                className="w-full object-contain group-hover/card:shadow-xl"
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
                                Lorem ipsum dolor sit amet conse ctetur
                                adipisicing elit. Quisquam placeat iusto id
                                necessitatibus est distinctio!
                              </CardItem>

                              <div className="flex flex-col mt-5 gap-3">
                                <CardItem
                                  as="div"
                                  translateZ="70"
                                  className="flex flex-wrap w-full gap-3 text-base"
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
                                    Price: <strong>${price.toFixed(2)}</strong>
                                  </CardItem>
                                </CardItem>

                                <CardItem
                                  translateZ="40"
                                  className="relative z-10 w-full"
                                >
                                  <Button
                                    disabled={isInCart}
                                    className="w-full rounded-xl"
                                    tone={isInCart ? "cart" : "dark"}
                                    onClick={handleAdd}
                                    aria-label={
                                      isInCart ? "Added to cart" : "Add to cart"
                                    }
                                    data-id={book.id}
                                  >
                                    {isInCart ? "Added" : "Add to Cart"}
                                  </Button>
                                </CardItem>
                              </div>
                            </div>

                            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-black/5" />
                          </CardBody>
                        </CardContainer>
                      </MotionInView>
                    );
                  })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sec6;
