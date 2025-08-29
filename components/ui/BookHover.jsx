"use client";

import Link from "next/link";

const BookHover = ({ price, discountedPrice, img }) => {
  return (
    <div className="inline-block relative w-full after:table after:clear-both">
      <div className="perspective-distant group">
        <div className="relative w-full inline-block transition-all cursor-pointer duration-500 origin-[35%_50%] transform-3d after:w-[66px] after:z-[0] after:absolute after:-top-0.5 after:left-[98.5%] after:-bottom-0.5 after:bg-[repeating-linear-gradient(to_right,_#f5f5f5,_#f5f5f5_5px,_#aaa_5px,_#aaa_6px)] after:origin-[0%_50%] transform after:rotate-y-90 group-hover:-rotate-y-[35deg]">
          <Link
            href="/"
            className={`bg-primary hover:bg-primary-700 lg:w-[65%] absolute top-[50%] -right-[15px] uppercase py-2.5 px-5 text-white text-[13px] w-1/2 text-left tracking-[1px] group-hover:rotate-y-[35deg] group-hover:translate-3d transition-all duration-500 z-[2] origin-[100%_0] after:absolute after:top-full after:right-0 after:border-t-[15px] after:border-r-[15px] after:border-transparent after:border-t-primary-600 hover:after:border-t-primary-800`}
          >
            <span className="ml-2.5">Buy the Book</span>
          </Link>
          <img
            src={img}
            alt=""
            className="group-hover:rounded-r-md relative z-[1]"
          />
        </div>
      </div>
    </div>
  );
};

export default BookHover;
