"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { waitForImagesReady } from "@/components/RevealImage";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Boil",
    description: "Heat fresh water to 80-85°C",
    icon: TeapotIcon,
  },
  {
    number: "02",
    title: "Steep",
    description: "Place tea bag in a cup, pour hot water, steep 3-5 minutes",
    icon: CupTagIcon,
  },
  {
    number: "03",
    title: "Enjoy",
    description: "Remove the tea bag, relax and enjoy your refreshing cup",
    icon: SteamingCupIcon,
  },
  {
    number: "04",
    title: "Best Enjoyed",
    description: "Hot or iced, enjoy it your way, any time of day",
    icon: LeafCupIcon,
  },
];

function TeapotIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <path d="M18 28H46C46 22 42 18 36 18H28C22 18 18 22 18 28Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 28H46L43 45C42 49 38 52 34 52H30C26 52 22 49 21 45L18 28Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M46 28H51C53 28 54 30 54 32C54 34 53 36 51 36H46" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M24 18V14M32 18V12M40 18V14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M24 40H40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function CupTagIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <path d="M18 24H46C46 18 42 14 36 14H28C22 14 18 18 18 24Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 24H46V42C46 47 42 52 36 52H28C22 52 18 47 18 42V24Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M46 28H52C54 28 56 30 56 32C56 34 54 36 52 36H46" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M24 23L31 30L38 23" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M26 35H38" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function SteamingCupIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <path d="M18 24H46V42C46 47 42 52 36 52H28C22 52 18 47 18 42V24Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M46 30H52C54 30 56 32 56 34C56 36 54 38 52 38H46" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M23 18C23 12 28 10 31 12C33 14 32 18 29 19C27 20 23 20 23 18Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M32 18C32 12 37 10 40 12C42 14 41 18 38 19C36 20 32 20 32 18Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M18 30H46" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function LeafCupIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <path d="M18 24H46V42C46 47 42 52 36 52H28C22 52 18 47 18 42V24Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M46 30H52C54 30 56 32 56 34C56 36 54 38 52 38H46" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M24 24C24 18 27 14 32 14C36 14 41 18 41 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M24 33C28 31 31 31 32 31C35 31 39 32 41 34" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M25 39C29 33 34 30 41 30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export default function HowToBrewSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [compactLayout, setCompactLayout] = useState(false);

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compactHeightQuery = window.matchMedia("(max-height: 700px)");

    const updateLayout = () => {
      setCompactLayout(reducedMotionQuery.matches || compactHeightQuery.matches || window.innerWidth < 768);
    };

    updateLayout();
    reducedMotionQuery.addEventListener("change", updateLayout);
    compactHeightQuery.addEventListener("change", updateLayout);
    window.addEventListener("resize", updateLayout);

    if (compactLayout || reducedMotionQuery.matches) {
      return () => {
        reducedMotionQuery.removeEventListener("change", updateLayout);
        compactHeightQuery.removeEventListener("change", updateLayout);
        window.removeEventListener("resize", updateLayout);
      };
    }

    let ctx: gsap.Context | undefined;
    const setup = () => {
      ctx = gsap.context(() => {
        const rows = gsap.utils.toArray<HTMLElement>(".brew-step");
        const progressLine = document.querySelector(".brew-progress-line");

        rows.forEach((step, index) => {
          gsap.fromTo(
            step,
            { opacity: 0, scale: 0.85, y: 36 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: step,
                start: "top 78%",
              },
            }
          );

          const icon = step.querySelector("svg");
          if (icon) {
            const paths = Array.from(icon.querySelectorAll("path, circle, line, polyline, polygon")) as SVGGeometryElement[];
            paths.forEach((shape) => {
              const length = shape.getTotalLength();
              gsap.set(shape, {
                strokeDasharray: length,
                strokeDashoffset: length,
              });

              gsap.to(shape, {
                strokeDashoffset: 0,
                duration: 0.9,
                ease: "power2.out",
                delay: index * 0.12,
                scrollTrigger: {
                  trigger: step,
                  start: "top 78%",
                },
              });
            });
          }
        });

        if (progressLine) {
          gsap.to(progressLine, {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top center",
              end: "bottom center",
              scrub: true,
            },
          });
        }
      }, sectionRef);
    };

    const cleanup = waitForImagesReady(sectionRef.current, setup);

    return () => {
      reducedMotionQuery.removeEventListener("change", updateLayout);
      compactHeightQuery.removeEventListener("change", updateLayout);
      window.removeEventListener("resize", updateLayout);
      cleanup();
      ctx?.revert();
    };
  }, [compactLayout]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#F6EFE2] py-20 lg:py-28"
      style={{
        backgroundImage: "linear-gradient(180deg, rgba(246,239,226,0.9), rgba(246,239,226,0.9)), url('/prdimg/LemonGinger/1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-10 text-center lg:text-left">
          <p className="text-xs uppercase tracking-[0.24em] text-[#1B4332]/60">brew guide</p>
          <h2 className="mt-3 font-serif text-4xl text-[#1B4332] md:text-5xl">How to Brew</h2>
        </div>

        {!compactLayout && (
          <div className="hidden lg:block">
            <div className="relative mx-auto max-w-5xl pl-6">
              <div className="brew-progress-line absolute left-[53px] top-8 h-[calc(100%-64px)] w-[2px] origin-top scale-y-0 bg-[#D4A017]/60" />

              <div className="space-y-8">
                {steps.map(({ number, title, description, icon: Icon }) => (
                  <div key={number} className="brew-step relative flex items-start gap-6 rounded-[1.5rem] bg-[#FFF8E7]/80 p-5 shadow-[0_18px_40px_rgba(27,67,50,0.05)]">
                    <div className="relative z-10 flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#1B4332] text-[#FFF8E7] shadow-[0_18px_30px_rgba(27,67,50,0.2)]">
                      <Icon className="h-9 w-9" />
                    </div>

                    <div className="pt-2">
                      <div className="text-xs uppercase tracking-[0.24em] text-[#1B4332]/55">{number}</div>
                      <h3 className="mt-2 font-serif text-3xl text-[#1B4332]">{title}</h3>
                      <p className="mt-2 max-w-xl text-base leading-7 text-[#1B4332]/72">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {compactLayout && (
          <div className="lg:hidden">
            <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {steps.map(({ number, title, description, icon: Icon }) => (
                <article
                  key={number}
                  className="brew-step snap-center shrink-0 w-[86%] rounded-[1.8rem] border border-[#1B4332]/10 bg-[#FFF8E7] p-5 shadow-[0_18px_38px_rgba(27,67,50,0.06)]"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1B4332] text-[#FFF8E7]">
                    <Icon className="h-8 w-8" />
                  </div>
                  <div className="mt-5 text-xs uppercase tracking-[0.22em] text-[#1B4332]/55">{number}</div>
                  <h3 className="mt-2 font-serif text-3xl text-[#1B4332]">{title}</h3>
                  <p className="mt-3 text-base leading-7 text-[#1B4332]/72">{description}</p>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
