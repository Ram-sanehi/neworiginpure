"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { waitForImagesReady } from "@/components/RevealImage";

gsap.registerPlugin(ScrollTrigger);

const values = [
  { label: "Ethically sourced", value: "100%" },
  { label: "Plant-based ingredients", value: "18" },
  { label: "Brewed in small batches", value: "48h" },
];

export default function StorySection() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let ctx: gsap.Context | undefined;

    const setup = () => {
      ctx = gsap.context(() => {
        gsap.fromTo(
          ".story-card",
          { opacity: 0, y: 70 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.14,
            ease: "power3.out",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top 75%",
            },
          }
        );
      }, rootRef);
    };

    const cleanup = waitForImagesReady(rootRef.current, setup);

    return () => {
      cleanup();
      ctx?.revert();
    };
  }, []);

  return (
    <section id="story" ref={rootRef} className="py-20 lg:py-28" style={{ backgroundColor: "#F7F1E5" }}>
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="story-card max-w-xl"
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#1B4332]/60">OUR STORY</p>
          <h2 className="mt-4 font-serif text-5xl leading-[1.02] tracking-[-0.04em] text-[#1B4332] md:text-6xl">
            Rooted in ritual, shaped by nature.
          </h2>
          <p className="mt-7 max-w-lg text-[15px] leading-7 text-[#1B4332]/68 md:text-base">
            We began with a simple idea: the best teas are the ones that help you feel more like yourself. So we pair thoughtful sourcing with clean, expressive blends.
            <span className="mt-3 block">Every cup is made to feel grounded, generous, and easy to return to.</span>
          </p>
        </motion.div>

        <div className="grid gap-3 md:grid-cols-3">
          {values.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.22, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="story-card min-h-[150px] border-y border-[#1B4332]/15 px-5 py-7 first:md:border-l first:md:pl-0 last:md:pr-0 md:border-y-0 md:border-l"
            >
              <p className="font-serif text-5xl tracking-[-0.04em] text-[#1B4332] md:text-6xl">{item.value}</p>
              <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.2em] text-[#1B4332]/60">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
