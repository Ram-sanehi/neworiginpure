"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RevealImage, { waitForImagesReady } from "@/components/RevealImage";

gsap.registerPlugin(ScrollTrigger);

const trustBadges = [
  { title: "Pure by Origin", icon: OriginIcon },
  { title: "No Additives", icon: AdditiveIcon },
  { title: "No Artificial Flavours", icon: FlavourIcon },
  { title: "No Preservative", icon: PreservativeIcon },
];

function OriginIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <path d="M32 10C41 18 47 25 47 35C47 45 40 52 32 55C24 52 17 45 17 35C17 25 23 18 32 10Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M32 22V37" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M24 29H40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function AdditiveIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <path d="M20 20H44V44H20V20Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24 24L40 40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M40 24L24 40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function FlavourIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <path d="M32 12C28 18 24 22 24 28C24 34 27 38 32 38C37 38 40 34 40 28C40 22 36 18 32 12Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M32 38V52" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M24 47H40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function PreservativeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <path d="M24 22H40C43 22 46 25 46 28V41C46 44 43 47 40 47H24C21 47 18 44 18 41V28C18 25 21 22 24 22Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24 16V22M40 16V22M22 30H42" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export default function WhyOriginPure() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let ctx: gsap.Context | undefined;

    const setup = () => {
      ctx = gsap.context(() => {
        gsap.fromTo(
          ".trust-badge-row",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
          }
        );
      }, sectionRef);
    };

    const cleanup = waitForImagesReady(sectionRef.current, setup);

    return () => {
      cleanup();
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#0E211A]">
      <div className="absolute inset-0">
        <RevealImage
          src="/prdimg/ButterflyPea/1.png"
          alt="Butterfly Pea Blue Tea product background"
          fill
          sizes="100vw"
          wrapperClassName="absolute inset-0"
          skeletonClassName=""
          className="object-cover opacity-90"
          priority={false}
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,24,19,0.82)_0%,rgba(11,24,19,0.7)_45%,rgba(11,24,19,0.74)_100%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-14 lg:px-12 lg:py-20">
        <div className="trust-badge-row rounded-[1.75rem] border border-white/10 bg-[linear-gradient(135deg,rgba(18,40,32,0.52),rgba(18,40,32,0.28))] p-4 shadow-[0_20px_55px_rgba(6,18,14,0.18)] backdrop-blur-[2px] md:p-5">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {trustBadges.map(({ title, icon: Icon }) => (
              <div
                key={title}
                className="flex items-center gap-4 rounded-full border border-white/10 bg-white/8 px-4 py-3 backdrop-blur-sm shadow-[0_15px_40px_rgba(0,0,0,0.15)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF8E7]/12 text-[#F8E7B2]">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-sm font-medium tracking-[0.02em] text-white/90 sm:text-base">
                  {title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
