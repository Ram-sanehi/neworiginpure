"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RevealImage, { waitForImagesReady } from "@/components/RevealImage";

gsap.registerPlugin(ScrollTrigger);

const folds = [
  "Pure by Origin.",
  "No additives. No artificial flavours.",
  "Plant-based tea bags. Clean ritual, naturally.",
];

const benefits = [
  { label: "Immunity", icon: ShieldIcon },
  { label: "Antioxidants", icon: SparkIcon },
  { label: "Digestion", icon: LeafIcon },
  { label: "Relaxation", icon: CalmIcon },
  { label: "Metabolism", icon: PulseIcon },
];

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <path d="M32 8L50 14V29C50 40 43 48 32 54C21 48 14 40 14 29V14L32 8Z" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M25 31L29 35L39 25" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SparkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <path d="M32 12L36 24L48 28L36 32L32 44L28 32L16 28L28 24L32 12Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M48 44L51 52L59 55L51 58L48 66L45 58L37 55L45 52L48 44Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LeafIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <path d="M18 42C20 29 29 18 44 14C43 30 35 42 19 48C17 46 17 44 18 42Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 42C28 40 35 34 42 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24 46C30 38 37 31 47 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function CalmIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <circle cx="32" cy="20" r="8" stroke="currentColor" strokeWidth="3" />
      <path d="M20 48C21.5 38.5 26.4 34 32 34C37.6 34 42.5 38.5 44 48" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M32 27V42" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function PulseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <path d="M14 32H22L28 20L35 44L41 32H50" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 32C8 19.8 17.8 10 30 10C42.2 10 52 19.8 52 32" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export default function BrandStory() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const phraseRefs = useRef<Array<HTMLParagraphElement | null>>([]);
  const bgRefs = useRef<Array<HTMLDivElement | null>>([]);

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

        phrases.forEach((phrase, index) => {
          const isLast = index === phrases.length - 1;

          const reveal = gsap.timeline({
            scrollTrigger: {
              trigger: phrase,
              start: "top 78%",
              end: "bottom 52%",
              scrub: 1,
            },
          });

          reveal
            .to(phrase, {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.9,
              ease: "none",
            })
            .to(
              phrase,
              {
                opacity: isLast ? 0.7 : 0,
                y: isLast ? 0 : -18,
                filter: "blur(6px)",
                duration: 0.9,
                ease: "none",
              },
              "+=0.2"
            );
        });

        gsap.utils.toArray<HTMLElement>(".story-bg-slide").forEach((slide, index) => {
          gsap.fromTo(
            slide,
            { opacity: 0, scale: 1 },
            {
              opacity: index === 0 ? 1 : 0,
              scale: 1.08,
              duration: 1.2,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top center",
                end: "bottom center",
                scrub: 1,
              },
            }
          );
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
      }, sectionRef);
    };

    const cleanup = waitForImagesReady(sectionRef.current, setup);

    return () => {
      cleanup();
      ctx?.revert();
    };
  }, []);

  const backgroundSlides = [
    { src: "/prdimg/ButterflyPea/1.png", alt: "Butterfly Pea blend product shot" },
    { src: "/prdimg/MoringaLemonGrass/1.png", alt: "Moringa Lemongrass product shot" },
    { src: "/prdimg/LemonGinger/1.png", alt: "Lemon Ginger product shot" },
  ];

  return (
    <section
      ref={sectionRef}
      data-page-section
      data-tone="story"
      className="relative overflow-hidden bg-transparent py-20 lg:py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(26,67,50,0.12),_transparent_36%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1fr_0.92fr] lg:px-12">
        <div className="relative min-h-[540px] overflow-hidden rounded-[2.25rem] border border-[#1B4332]/10 bg-[#E9F0E5] shadow-[0_30px_80px_rgba(27,67,50,0.08)]">
          <div className="absolute inset-0">
            {backgroundSlides.map((slide, index) => (
              <div
                key={slide.src}
                ref={(node) => {
                  bgRefs.current[index] = node;
                }}
                className="story-bg-slide absolute inset-0"
                style={{ opacity: index === 0 ? 1 : 0 }}
              >
                <RevealImage
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  wrapperClassName="absolute inset-0"
                  skeletonClassName=""
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>

          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,40,32,0.12),rgba(18,40,32,0.34))]" />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#1B4332]/60">green tea philosophy</p>

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
                className="font-serif text-4xl leading-[1.04] tracking-[-0.06em] text-[#1B4332] md:text-5xl lg:text-6xl"
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
            className="mt-7 max-w-lg text-base leading-8 text-[#1B4332]/72 md:text-lg"
          >
            Origin Pure was shaped around one belief: tea should feel as clean and alive as the plants it comes from. We source the whole leaf, skip the fluff, and keep the ritual simple, grounded, and plant-first.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 overflow-hidden rounded-[1.6rem] border border-[#1B4332]/10 bg-[#F7F3EA] p-3 shadow-[0_24px_60px_rgba(27,67,50,0.06)]"
          >
            <div className="relative overflow-hidden rounded-[1.2rem]">
              <RevealImage
                src="/prdimg/MoringaLemonGrass/2.png"
                alt="Moringa Lemongrass tea product image"
                width={720}
                height={820}
                sizes="(max-width: 1024px) 100vw, 40vw"
                wrapperClassName="relative block"
                skeletonClassName=""
                className="h-[220px] w-full object-cover md:h-[260px]"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="relative mx-auto mt-16 max-w-7xl px-6 lg:px-12">
        <div className="mb-8 max-w-xl">
          <p className="text-xs uppercase tracking-[0.24em] text-[#1B4332]/60">why it works</p>
          <h2 className="mt-3 font-serif text-4xl text-[#1B4332] md:text-5xl">Green tea, for the way you live.</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {benefits.map(({ label, icon: Icon }, index) => (
            <motion.article
              key={label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.22, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="story-benefit-card rounded-[1.5rem] border border-[#1B4332]/10 bg-[#FFFDF8] p-5 shadow-[0_20px_40px_rgba(27,67,50,0.04)]"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F0E5C8] text-[#1B4332]">
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="mt-5 font-serif text-2xl text-[#1B4332]">{label}</h3>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
