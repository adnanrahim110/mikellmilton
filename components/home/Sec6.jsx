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
          <div className="w-full md:max-w-[66%]">
            <div className="grid md:grid-cols-2 gap-[30px] w-full">
              {BOOKS.map((book, idx) => (
                <CardContainer key={idx} className="inter-var">
                  <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-6 border">
                    <CardItem
                      translateZ="50"
                      className="text-xl font-bold text-neutral-600 dark:text-white"
                    >
                      {book.title}
                    </CardItem>
                    <CardItem translateZ="100" className="w-full mt-4">
                      <img
                        src={book.img}
                        height="1000"
                        width="1000"
                        className="w-full max-h-[420px] object-contain group-hover/card:shadow-xl"
                        alt="thumbnail"
                      />
                    </CardItem>
                    <div className="flex justify-between items-center mt-10">
                      <div className="flex flex-col">
                        <span>{book.type}</span>
                        <span>
                          Price: <strong>${book.price}</strong>
                        </span>
                      </div>
                      <Button tone="dark">Buy now</Button>
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
