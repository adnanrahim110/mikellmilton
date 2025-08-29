import React from "react";

const Sec1 = () => {
  return (
    <section className="py-[50px]">
      <div className="container">
        <div className="flex justify-center flex-wrap gap-[50px_30px]">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="text-center transform-3d perspective-[2000px] group"
            >
              <img
                src={`/imgs/cf-${i + 1}.svg`}
                decoding="async"
                alt=""
                className="group-hover:animate-swing origin-[center_top]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sec1;
