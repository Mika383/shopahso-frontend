"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Hero = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const graphicRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      textRef.current?.children || [],
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, stagger: 0.2 },
      "+=0.2",
    );

    tl.fromTo(
      graphicRef.current,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2 },
      "-=0.8",
    );
  }, []);

  return (
    <section className="industrial-grid relative w-full overflow-hidden bg-white py-20 lg:py-32">
      <div className="container mx-auto flex flex-col items-center gap-16 px-4 lg:flex-row">
        <div ref={textRef} className="z-10 flex-1">
          <div className="mb-6 inline-block bg-secondary px-3 py-1 text-[10px] font-semibold tracking-[0.12em] text-secondary-foreground">
            Industrial Supply Chain Solutions
          </div>
          <h1 className="mb-8 text-5xl font-black italic leading-none tracking-tight lg:text-8xl">
            Chính xác <br />
            <span className="text-primary not-italic">hiệu suất</span> <br />
            <span className="text-accent">tin cậy</span>
          </h1>
          <p className="mb-10 max-w-lg border-l-4 border-border py-2 pl-6 text-lg text-muted-foreground">
            Hệ thống phân phối linh kiện và vật tư công nghiệp hàng đầu Việt Nam.
            Cung cấp hơn 1.000.000 SKU từ những thương hiệu uy tín nhất thế giới.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="border-b-4 border-black/20 bg-primary px-10 py-4 font-semibold text-white transition-all hover:brightness-110 active:translate-y-1">
              Khám phá catalog
            </button>
            <button className="border-2 border-border bg-white px-10 py-4 font-semibold text-foreground transition-all hover:bg-muted">
              Tra cứu SKU
            </button>
          </div>
        </div>

        <div ref={graphicRef} className="relative flex-1 aspect-square w-full max-w-lg">
          <div className="absolute inset-0 translate-x-4 translate-y-4 rotate-3 border-2 border-primary/20" />
          <div className="absolute inset-0 -translate-x-4 -translate-y-4 -rotate-3 border-2 border-secondary/20" />

          <div className="relative flex h-full w-full items-center justify-center overflow-hidden border border-border bg-muted">
            <div className="industrial-grid absolute inset-0 rotate-12 scale-150 opacity-10" />

            <svg
              width="300"
              height="300"
              viewBox="0 0 100 100"
              className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 text-primary/10"
            >
              <rect x="10" y="10" width="80" height="80" stroke="currentColor" strokeWidth="0.5" fill="none" />
              <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" fill="none" />
              <line x1="10" y1="10" x2="90" y2="90" stroke="currentColor" strokeWidth="0.5" />
              <line x1="90" y1="10" x2="10" y2="90" stroke="currentColor" strokeWidth="0.5" />
            </svg>

            <div className="z-10 flex flex-col items-center p-12">
              <div className="select-none text-[120px] leading-none text-border">AHSO</div>
              <div className="mt-[-40px] font-mono text-xl font-bold tracking-[0.5em] text-primary">
                INDUSTRIAL
              </div>
            </div>
          </div>

          <div className="absolute top-10 -right-4 bg-primary p-4 text-sm font-semibold text-white">
            100% Quality
          </div>
          <div className="absolute bottom-10 -left-4 bg-accent p-4 text-sm font-semibold text-white">
            Global Shipping
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
