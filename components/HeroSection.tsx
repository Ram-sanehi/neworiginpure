"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { products } from "@/lib/products";

const headlineWords = ["Pure.", "Natural.", "Alive."];

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll();
  const heroBackgroundY = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const featuredPoster = products[0]?.images.hero ?? "/prdimg/ButterflyPea/1.png";

  useEffect(() => {
    const handleScroll = () => {
      const top = window.scrollY;
      const heroHeight = sectionRef.current?.offsetHeight ?? 0;
      setIsScrolledPastHero(top > heroHeight * 0.4);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      data-page-section
      data-tone="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-transparent text-white"
    >
      <motion.div
        className="absolute inset-0"
        animate={prefersReducedMotion ? { scale: 1 } : { scale: [1, 1.08, 1.08, 1] }}
        transition={{
          duration: 15,
          ease: "easeInOut",
          times: [0, 0.5, 0.75, 1],
          repeat: Infinity,
          repeatType: "loop",
        }}
        style={{
          y: heroBackgroundY,
          filter: isScrolledPastHero ? "blur(6px) brightness(0.74)" : "blur(0px) brightness(1)",
        }}
      >
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={featuredPoster}
          style={{ filter: "saturate(0.95) contrast(1.05)" }}
          onCanPlay={(event) => {
            const video = event.currentTarget;
            video.playbackRate = 0.55;
          }}
        >
          <source src="/videos/teagarden.mp4" type="video/mp4" />
        </video>
      </motion.div>

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,20,16,0.78)_0%,rgba(9,27,22,0.62)_28%,rgba(9,27,22,0.45)_58%,rgba(9,27,22,0.20)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(248,221,145,0.22),_transparent_32%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl items-end px-6 pb-16 pt-24 md:px-10 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(7,20,16,0.32),rgba(9,27,22,0.12))] px-4 py-5 shadow-[0_18px_45px_rgba(7,20,16,0.18)] backdrop-blur-[2px] md:px-6 md:py-6"
        >
          <div className="mb-6 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.42em] text-[#F8E7B5] md:text-xs">
            <span className="h-px w-10 bg-[#D4A017]" />
            Origin Pure
          </div>

          <h1 className="font-serif text-5xl leading-[0.9] tracking-[-0.06em] text-white md:text-6xl lg:text-8xl">
            {headlineWords.map((word, index) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
                className="mr-4 inline-block"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}
            className="mt-6 max-w-2xl text-base leading-7 text-white/85 md:text-xl md:leading-8"
          >
            Origin Pure brings together a full range of botanical teas — bright citrus, soothing floral, and grounded herbal blends — crafted to nourish the everyday ritual.
          </motion.p>
        </motion.div>
      </div>

      <div className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2" aria-label="Scroll to explore the collection">
        <div className="flex flex-col items-center gap-2 text-[10px] font-medium uppercase tracking-[0.34em] text-white/80">
          <span>Scroll</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-4 w-4 text-[#F4D06F]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>
    </section>
  );
}
