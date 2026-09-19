"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { waitForImagesReady } from "@/components/RevealImage";
import philosophyImage from "../images/2.png";

gsap.registerPlugin(ScrollTrigger);

const folds = [
  "Pure by Origin.",
  "No additives. No artificial flavours.",
  "Plant-based tea bags. Clean ritual, naturally.",
];

const ingredientCards = [
  {
    icon: "leaf",
    name: "Lemongrass",
    description: "Bright citrus lift for a clean finish.",
  },
  {
    icon: "sprout",
    name: "Moringa Leaves",
    description: "Nourishing greens for steady daily support.",
  },
  {
    icon: "sun",
    name: "Green Tea Leaves",
    description: "A smooth, grounded base for the ritual.",
  },
];

function IngredientIcon({ type }: { type: string }) {
  if (type === "sprout") {
    return <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true"><path d="M12 20V9M12 13C8 13 6 10.6 6 7c3.8 0 6 2 6 6ZM12 10c.3-3.4 2.5-5.4 6-5.4 0 3.8-2.1 5.8-6 5.8Z" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  }

  if (type === "sun") {
    return <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.35" /><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" /></svg>;
  }

  return <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true"><path d="M19 4.5C12.5 4.8 7.5 7.1 6.2 11.2c-1 3.1.7 6 3.8 6.1 4.1.1 7-4.4 9-12.8Z" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" /><path d="M4.5 20c2-4.3 5.5-7.1 10.7-9" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" /></svg>;
}

export default function BrandStory() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const phraseRefs = useRef<Array<HTMLParagraphElement | null>>([]);

  useEffect(() => {
    let ctx: gsap.Context | undefined;

    const setup = () => {
      ctx = gsap.context(() => {
        const phrases = phraseRefs.current.filter(Boolean) as HTMLParagraphElement[];

        gsap.set(phrases, {
          opacity: 0,
          y: 40,
          filter: "blur(8px)",
        });

        phrases.forEach((phrase) => {
          gsap.to(phrase, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: phrase,
              start: "top 88%",
              once: true,
              toggleActions: "play none none reverse",
            },
            onComplete: () => {
              gsap.set(phrase, { clearProps: "filter" });
            },
          });
        });

        gsap.utils.toArray<HTMLElement>(".story-benefit-card").forEach((card, index) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
              delay: index * 0.08,
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
              },
            }
          );

          const svg = card.querySelector("svg");
          if (!svg) return;

          const shapes = Array.from(svg.querySelectorAll("path, circle, line, polyline, polygon")) as SVGGeometryElement[];

          shapes.forEach((shape) => {
            const length = shape.getTotalLength();
            gsap.set(shape, {
              strokeDasharray: length,
              strokeDashoffset: length,
            });

            gsap.to(shape, {
              strokeDashoffset: 0,
              duration: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
              },
            });
          });
        });

        const storyImage = sectionRef.current?.querySelector<HTMLElement>(".story-philosophy-image");
        if (storyImage) {
          gsap.fromTo(
            storyImage,
            { scale: 0.96, y: 18 },
            {
              scale: 1,
              y: 0,
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: storyImage,
                start: "top 82%",
                once: true,
              },
            }
          );

          gsap.to(storyImage, {
            yPercent: -3,
            ease: "none",
            scrollTrigger: {
              trigger: storyImage,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          });
        }
      }, sectionRef);
    };

    const cleanup = waitForImagesReady(sectionRef.current, setup);

    return () => {
      cleanup();
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-page-section
      data-tone="story"
      className="relative overflow-hidden bg-transparent py-20 lg:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(26,67,50,0.12),_transparent_36%)]" />

      <div className="relative mx-auto grid max-w-7xl items-start gap-12 px-6 lg:grid-cols-[1fr_0.9fr] lg:gap-20 lg:px-12">
        <div className="story-philosophy-image relative min-h-[460px] overflow-hidden rounded-[2rem] border border-[#D4A017]/20 bg-[#EDE8DC] shadow-[0_24px_70px_rgba(27,67,50,0.14)] lg:min-h-[650px]">
          <Image
            src={philosophyImage}
            alt="Fresh green tea leaves gathered by hand"
            fill
            sizes="(max-width: 1024px) 100vw, 54vw"
            className="absolute inset-0 h-full w-full object-cover"
            priority
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(18,40,32,0.01)_55%,rgba(18,40,32,0.34)_100%)]" />
        </div>

        <div className="flex flex-col justify-center">
          <p className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-[#1B4332]/60"><span className="h-7 w-px bg-[#B88D27]" />GREEN TEA PHILOSOPHY</p>

          <div className="mt-6 space-y-4">
            {folds.map((phrase, index) => (
              <motion.p
                key={phrase}
                ref={(node) => {
                  phraseRefs.current[index] = node;
                }}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.22, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-4xl leading-[1.05] tracking-[-0.045em] text-[#1B4332] md:text-5xl lg:text-[3.65rem]"
              >
                {phrase}
              </motion.p>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-lg text-[15px] leading-7 text-[#1B4332]/65 md:text-base"
          >
            Origin Pure was shaped around one belief: tea should feel as clean and alive as the plants it comes from. We source the whole leaf, skip the fluff, and keep the ritual simple, grounded, and plant-first.
          </motion.p>


        </div>
      </div>

      <div className="relative mx-auto mt-16 max-w-7xl border-t border-[#1B4332]/12 px-6 pt-10 lg:px-12">
        <div className="mb-6 max-w-xl">
          <p className="text-[11px] uppercase tracking-[0.24em] text-[#1B4332]/55">what&apos;s inside</p>
          <h2 className="mt-2 font-serif text-3xl text-[#1B4332] md:text-4xl">Three quiet essentials.</h2>
        </div>

        <div className="grid gap-3 md:grid-cols-3 md:gap-4">
          {ingredientCards.map((ingredient, index) => (
            <motion.article
              key={ingredient.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.24, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="story-benefit-card group flex items-start gap-3 border-t border-[#1B4332]/15 py-4 md:block md:border-t-0 md:border-l md:pl-4"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#1B4332]/15 bg-[radial-gradient(circle,rgba(212,160,23,0.16),transparent_70%)] text-[#B88D27] shadow-[0_0_14px_rgba(212,160,23,0.08)] transition-shadow duration-300 group-hover:shadow-[0_0_24px_rgba(212,160,23,0.28)] md:mb-4">
                <IngredientIcon type={ingredient.icon} />
              </div>

              <div>
                <h3 className="font-serif text-xl text-[#1B4332]">{ingredient.name}</h3>
                <p className="mt-1 text-sm leading-6 text-[#1B4332]/62">{ingredient.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
