import React from "react";

const Sec1 = () => {
  return (
    <section className="relative py-[50px]">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-10 -left-10 size-[360px] rounded-full bg-primary/20 blur-3xl opacity-60" />
        <div className="absolute bottom-0 right-0 size-[360px] rounded-full bg-primary/10 blur-3xl opacity-60" />
        <div className="absolute inset-0 opacity-30 mix-blend-multiply bg-[url('/imgs/texture2.jpg')] bg-center bg-no-repeat bg-[length:70%_80%]" />
      </div>

      <div className="container">
        <div className="flex justify-center flex-wrap gap-[50px_30px]">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="text-center transform-3d perspective-[2000px] group"
            >
              <div className="relative p-6 rounded-2xl border border-white/40 bg-white/70 backdrop-blur-md ring-1 ring-black/5 shadow-xl transition-all duration-300 group-hover:shadow-2xl">
                <div className="absolute -top-6 -right-6 size-20 rounded-full bg-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <img
                  src={`/imgs/cf-${i + 1}.svg`}
                  decoding="async"
                  alt=""
                  className="group-hover:animate-swing origin-[center_top] mx-auto"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sec1;
