"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RevealImage, { waitForImagesReady } from "@/components/RevealImage";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    title: "Immunity Booster",
    description: "Helps strengthen your natural defenses and support everyday wellness.",
    icon: ShieldIcon,
  },
  {
    title: "Relaxing & Calming",
    description: "Promotes a sense of calm and helps you unwind at the end of the day.",
    icon: MeditationIcon,
  },
  {
    title: "Rich in Antioxidants",
    description: "Packed with antioxidants to help protect cells and support overall vitality.",
    icon: RefreshIcon,
  },
  {
    title: "Aids Digestion",
    description: "Supports a smoother digestive process with fresh, soothing botanical notes.",
    icon: StomachIcon,
  },
  {
    title: "Refreshing & Revitalizing",
    description: "Delivers a bright, clean lift that helps you feel refreshed and energized.",
    icon: LeafIcon,
  },
];

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <path d="M32 8L50 14V29C50 40 43 48 32 54C21 48 14 40 14 29V14L32 8Z" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M25 31L29 35L39 25" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MeditationIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <circle cx="32" cy="20" r="8" stroke="currentColor" strokeWidth="3.2" />
      <path d="M20 48C22 38 26 34 32 34C38 34 42 38 44 48" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M32 27V42" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M22 31L16 42" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M42 31L48 42" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  );
}

function RefreshIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <path d="M18 24C20 17 26 12 34 12C42 12 48 16 52 23" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M46 40C44 47 38 52 30 52C22 52 16 48 12 41" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M52 23L44 19L46 11" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 41L20 45L18 53" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StomachIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <path d="M18 35C18 25 25 18 35 18C43 18 49 23 49 30C49 38 44 42 38 45L32 48L27 52C23 48 20 45 18 35Z" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M25 22C22 27 22 32 25 36" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M39 22C42 27 42 32 39 36" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  );
}

function LeafIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <path d="M16 43C23 25 34 16 50 12C47 30 40 42 23 48C19 49 17 47 16 43Z" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 45C27 39 35 31 41 21" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M24 47C31 37 39 29 48 24" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  );
}

export default function BenefitsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let ctx: gsap.Context | undefined;

    const setup = () => {
      ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>(".benefit-row").forEach((row, index) => {
          const icon = row.querySelector("svg");

          gsap.fromTo(
            row,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              delay: index * 0.15,
              scrollTrigger: {
                trigger: row,
                start: "top 85%",
              },
            }
          );

          if (icon) {
            const shapes = Array.from(icon.querySelectorAll("path, circle, line, polyline, polygon")) as SVGGeometryElement[];

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
                delay: 0.15 + index * 0.15,
                scrollTrigger: {
                  trigger: row,
                  start: "top 85%",
                },
              });
            });
          }
        });
      }, sectionRef);
    };

    const cleanup = waitForImagesReady(sectionRef.current, setup);

    return () => {
      cleanup();
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#F5EFE6] py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-12">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[#1B4332]/60">benefits</p>
          <h2 className="mt-3 font-serif text-4xl text-[#1B4332] md:text-5xl">Why people keep coming back.</h2>

          <div className="mt-8 space-y-4">
            {benefits.map(({ title, description, icon: Icon }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.24, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="benefit-row flex items-start gap-4 rounded-[1.5rem] border border-[#1B4332]/10 bg-white/80 p-4 shadow-[0_16px_36px_rgba(27,67,50,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_46px_rgba(27,67,50,0.08)]"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#FFF8E7] text-[#1B4332] shadow-inner ring-1 ring-[#1B4332]/10">
                  <Icon className="h-7 w-7" />
                </div>

                <div>
                  <h3 className="font-serif text-2xl text-[#1B4332]">{title}</h3>
                  <p className="mt-1 text-base leading-7 text-[#1B4332]/68">{description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[520px]">
          <div className="absolute -left-4 top-10 h-36 w-36 rounded-full bg-[#D4A017]/20 blur-3xl" />
          <div className="absolute -right-8 bottom-8 h-40 w-40 rounded-full bg-[#1B4332]/15 blur-3xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-[#1B4332]/10 bg-[#F8EBCF] p-4 shadow-[0_30px_80px_rgba(27,67,50,0.1)]">
            <div className="relative overflow-hidden rounded-[1.5rem] border border-[#1B4332]/10 bg-[linear-gradient(180deg,#F4E7C5_0%,#FFF8E7_100%)]">
              <RevealImage
                src="/prdimg/LemonTulsi/1.png"
                alt="Lemon Tulsi tea product shot"
                width={640}
                height={800}
                sizes="(max-width: 1024px) 100vw, 50vw"
                wrapperClassName="relative block aspect-[4/5] overflow-hidden"
                skeletonClassName=""
                className="aspect-[4/5] h-auto w-full object-cover"
                loading="lazy"
              />

              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="steam-visual steam-1" />
                <div className="steam-visual steam-2" />
                <div className="steam-visual steam-3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
