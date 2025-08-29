import { BOOKS } from "@/constants";
import React from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import Button from "../ui/Button";
import Title from "../ui/Title";

const Sec6 = () => {
  return (
    <section className="pt-[4em] relative w-full">
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
                <CardContainer key={idx} className="inter-var">
                  <CardBody className="bg-gray-50 relative group/card border-black/[0.1] w-full h-auto p-6 border flex flex-wrap items-center gap-10">
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
                        className="text-3xl font-bold text-black dark:text-white"
                      >
                        {book.title}
                      </CardItem>
                      <CardItem
                        as="p"
                        translateZ="60"
                        className="text-neutral-500 text-[15px] max-w-sm mt-2 dark:text-neutral-300"
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
                            className="inline-block w-full md:w-auto py-1 px-3 bg-primary-100"
                          >
                            {book.type}
                          </CardItem>
                          <CardItem
                            as="span"
                            translateZ="70"
                            className="inline-block w-full md:w-auto grow py-1 px-3 bg-primary-200 text-primary-800"
                          >
                            Price: <strong>${book.price.toFixed(2)}</strong>
                          </CardItem>
                        </CardItem>
                        <CardItem
                          translateZ="40"
                          className="pointer-events-auto relative z-10 w-full"
                        >
                          <Button
                            className="w-full rounded-none"
                            tone="dark"
                            href="/"
                          >
                            Add to Cart
                          </Button>
                        </CardItem>
                      </div>
                    </div>
                  </CardBody>
                </CardContainer>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sec6;
