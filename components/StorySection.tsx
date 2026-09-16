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
    <section id="story" ref={rootRef} className="bg-[#F6EFE1] py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="story-card rounded-[2rem] border border-[#1B4332]/10 bg-[#FFF8E7] p-8 shadow-[0_20px_60px_rgba(27,67,50,0.08)]"
        >
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#1B4332]/60">our story</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-[#1B4332] md:text-5xl">
            Rooted in ritual, shaped by nature.
          </h2>
          <p className="mt-5 text-base leading-8 text-[#1B4332]/72">
            We began with a simple idea: the best teas are the ones that help you feel more like yourself. That means gentle sourcing, thoughtful blending, and a taste that lingers with ease.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {values.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.22, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="story-card rounded-[1.5rem] border border-[#1B4332]/10 bg-white/80 p-6"
            >
              <p className="font-serif text-4xl text-[#1B4332]">{item.value}</p>
              <p className="mt-4 text-sm uppercase tracking-[0.18em] text-[#1B4332]/60">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
