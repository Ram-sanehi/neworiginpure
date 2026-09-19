"use client";

    import Image from "next/image";
    import curtainBackground from "../images/1.png";
    import { useLayoutEffect, useRef } from "react";
    import { gsap } from "gsap";
    import { ScrollTrigger } from "gsap/ScrollTrigger";
    import { products } from "@/lib/products";

    gsap.registerPlugin(ScrollTrigger);

    const petalData = products.slice(0, 8).map((product, index) => ({
      product,
      angle: -90 + index * 45,
      finalRotation: [-18, 8, 19, -9, 14, -16, 11, -7][index],
      scale: [0.94, 0.88, 0.98, 0.9, 1, 0.92, 0.96, 0.9][index],
      zIndex: 12 + index,
    }));

    function getRadialPosition(angle: number, radius: number) {
      const radians = (angle * Math.PI) / 180;
      return { x: Math.cos(radians) * radius, y: Math.sin(radians) * radius };
    }

    export default function HeroSection() {
      const sectionRef = useRef<HTMLElement | null>(null);
      const stageRef = useRef<HTMLDivElement | null>(null);
      const petalRefs = useRef<(HTMLDivElement | null)[]>([]);
      const curtainLeftRef = useRef<HTMLDivElement | null>(null);
      const curtainRightRef = useRef<HTMLDivElement | null>(null);
      const logoRef = useRef<HTMLDivElement | null>(null);
      const logoLeftRef = useRef<HTMLDivElement | null>(null);
      const logoRightRef = useRef<HTMLDivElement | null>(null);
      const revealBackgroundRef = useRef<HTMLDivElement | null>(null);

      useLayoutEffect(() => {
        const section = sectionRef.current;
        const stage = stageRef.current;
        const petals = petalRefs.current.filter(Boolean) as HTMLDivElement[];
        if (!section || !stage || !petals.length) return;

        const setPetalStates = (expanded = false) => {
            const { width, height } = stage.getBoundingClientRect();
            const vmin = Math.min(width, height);
            const radius = vmin * 0.32;
            const cardWidth = Math.min(Math.max(vmin * 0.145, 86), 184);

            petals.forEach((element, index) => {
              const petal = petalData[index];
              const finalPosition = getRadialPosition(petal.angle, radius);
              gsap.set(element, {
                width: cardWidth,
                xPercent: -50,
                yPercent: -50,
                x: expanded ? finalPosition.x : 0,
                y: expanded ? finalPosition.y : 0,
                rotation: expanded ? petal.finalRotation : 0,
                scale: expanded ? petal.scale : 0.72,
                zIndex: petal.zIndex,
                transformOrigin: "50% 50%",
              });
              element.dataset.finalX = String(finalPosition.x);
              element.dataset.finalY = String(finalPosition.y);
            });
        };

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        setPetalStates(prefersReducedMotion);

        if (prefersReducedMotion) {
          gsap.set(curtainLeftRef.current, { xPercent: -100 });
          gsap.set(curtainRightRef.current, { xPercent: 100 });
          gsap.set(logoRef.current, { opacity: 0 });
          gsap.set(revealBackgroundRef.current, { opacity: 1 });
          setPetalStates(true);
          return;
        }

        const ctx = gsap.context(() => {
          const bloom = gsap.timeline({
            defaults: { ease: "power2.out" },
            scrollTrigger: { trigger: section, start: "top top", end: "+=175%", pin: true, scrub: 1.05, invalidateOnRefresh: true },
          });

          bloom.to(revealBackgroundRef.current, { opacity: 1, duration: 1 }, 0)
            .to(curtainLeftRef.current, { xPercent: -100, rotateY: -18, duration: 0.3 }, 0.02)
            .to(curtainRightRef.current, { xPercent: 100, rotateY: 18, duration: 0.3 }, 0.02)
            .to(logoLeftRef.current, { rotateY: -92, xPercent: -16, opacity: 0, duration: 0.38 }, 0.04)
            .to(logoRightRef.current, { rotateY: 92, xPercent: 16, opacity: 0, duration: 0.38 }, 0.04);

          petals.forEach((petal, index) => {
            bloom.to(petal, {
              x: () => Number(petal.dataset.finalX),
              y: () => Number(petal.dataset.finalY),
              rotation: petalData[index].finalRotation,
              scale: petalData[index].scale,
              boxShadow: "0 24px 30px rgba(0,0,0,0.34)",
              duration: 0.48,
              ease: "back.out(1.12)",
            }, 0.22 + index * 0.045);
          });

        }, section);

        const refresh = () => {
          setPetalStates();
          ScrollTrigger.refresh();
        };
        window.addEventListener("resize", refresh);

        return () => {
          window.removeEventListener("resize", refresh);
          ctx.revert();
        };
      }, []);

      return (
        <section ref={sectionRef} data-page-section data-tone="hero" className="relative h-screen overflow-hidden bg-[#071E17] text-white [perspective:1200px]">
          <div className="absolute inset-0 bg-[#071E17]">
            <Image src={curtainBackground} alt="" fill priority sizes="100vw" className="object-cover object-center" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,30,23,0.58),rgba(7,30,23,0.68)_50%,rgba(4,20,14,0.82)),radial-gradient(ellipse_at_center,rgba(49,93,67,0.22),transparent_58%),radial-gradient(ellipse_at_center,transparent_35%,rgba(2,15,10,0.68)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgba(238,208,126,0.22),transparent_20%),radial-gradient(circle_at_50%_50%,rgba(55,103,73,0.34),transparent_58%)]" />
          </div>
          <div ref={revealBackgroundRef} className="absolute inset-0 bg-[#071E17] opacity-0">
            <Image src={curtainBackground} alt="" fill sizes="100vw" loading="lazy" className="object-cover object-center opacity-20" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,41,31,0.72),rgba(10,33,25,0.78)_50%,rgba(3,17,11,0.9)),radial-gradient(circle_at_50%_50%,rgba(91,145,101,0.52),transparent_35%),radial-gradient(ellipse_at_center,transparent_28%,rgba(2,15,10,0.72)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(137,177,112,0.18),transparent_28%),radial-gradient(circle_at_50%_50%,rgba(27,67,50,0.84),transparent_72%)]" />
          </div>
          <div className="pointer-events-none absolute inset-[-20%] opacity-[0.055] [background-image:radial-gradient(circle,rgba(255,244,201,0.8)_0.7px,transparent_0.7px),linear-gradient(118deg,transparent_45%,rgba(225,190,91,0.7)_46%,transparent_47%)] [background-size:28px_28px,180px_180px]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.06] hero-film-grain" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(ellipse_at_center,transparent_0%,transparent_44%,rgba(0,0,0,0.75)_100%)]" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-[1] aspect-square h-[47vh] w-[47vh] -translate-x-1/2 -translate-y-1/2 overflow-hidden opacity-[0.18] mix-blend-soft-light hero-watermark" aria-hidden="true">
            <Image src="/images/bg.png" alt="" fill sizes="47vh" className="object-contain object-center" />
          </div>
          <div ref={stageRef} className="relative z-10 flex h-full w-full items-center justify-center">
            <div className="pointer-events-none absolute inset-0">
              {petalData.map(({ product, zIndex }, index) => (
                <div key={product.id} ref={(element) => { petalRefs.current[index] = element; }} className="group absolute left-1/2 top-1/2 will-change-transform" style={{ zIndex }}>
                  <div className={`hero-product-float hero-product-float-${index} transition-[filter] duration-500 group-hover:drop-shadow-[0_30px_32px_rgba(0,0,0,0.42)]`} style={{ "--petal-rotation": `${petalData[index].finalRotation}deg` } as React.CSSProperties}>
                    <Image src={product.images.hero} alt={`${product.name} tea box`} width={640} height={800} sizes="(max-width: 640px) 29vw, 202px" className="h-auto w-full object-contain" priority={index < 3} />
                  </div>
                </div>
              ))}
            </div>
            <div ref={logoRef} className="hero-logo-breathe absolute left-1/2 top-1/2 z-[60] h-[118px] w-[118px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#E1BE5B]/45 bg-[#FFFDF4] shadow-[0_18px_60px_rgba(0,0,0,0.28)] [transform-style:preserve-3d] md:h-[154px] md:w-[154px]">
              <Image src="/prdimg/logo.jpeg" alt="Origin Pure" width={520} height={520} className="absolute inset-0 h-full w-full rounded-full object-contain p-5 md:p-7" priority />
              <div ref={logoLeftRef} className="absolute inset-0 overflow-hidden rounded-full bg-[#FFFDF4] p-5 [backface-visibility:hidden] [clip-path:inset(0_50%_0_0)] [transform-style:preserve-3d] md:p-7"><Image src="/prdimg/logo.jpeg" alt="Origin Pure" width={520} height={520} className="h-full w-full max-w-none rounded-full object-contain" priority /></div>
              <div ref={logoRightRef} className="absolute inset-0 overflow-hidden rounded-full bg-[#FFFDF4] p-5 [backface-visibility:hidden] [clip-path:inset(0_0_0_50%)] [transform-style:preserve-3d] md:p-7"><Image src="/prdimg/logo.jpeg" alt="" width={520} height={520} className="h-full w-full max-w-none rounded-full object-contain" priority /></div>
            </div>
            <div ref={curtainLeftRef} className="absolute inset-y-0 left-0 z-50 w-1/2 origin-left border-r border-[#E1BE5B]/25 bg-[#0B241B]/60 shadow-[18px_0_50px_rgba(0,0,0,0.15)] [backface-visibility:hidden] [transform-style:preserve-3d] will-change-transform">
              <div className="absolute left-6 top-8 max-w-[220px] md:left-10 md:top-10 md:max-w-xs">
                <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-[#E8CB78]">Origin Pure</p>
                <div className="my-3 h-px w-12 bg-[#E1BE5B]/75" />
                <p className="font-serif text-2xl leading-none text-[#FFF8E7] [text-shadow:0_0_18px_rgba(225,190,91,0.12)] md:text-3xl">A collection in bloom.</p>
              </div>
              <div className="absolute right-5 top-1/2 h-32 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-[#E1BE5B]/70 to-transparent md:right-10 md:h-52" />
            </div>
            <div ref={curtainRightRef} className="absolute inset-y-0 right-0 z-50 w-1/2 origin-right border-l border-[#E1BE5B]/25 bg-[#0B241B]/60 shadow-[-18px_0_50px_rgba(0,0,0,0.15)] [backface-visibility:hidden] [transform-style:preserve-3d] will-change-transform">
              <div className="absolute bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] uppercase tracking-[0.3em] text-[#F4E8C4]/60 md:bottom-9 md:text-[10px]">Scroll to reveal the collection</div>
              <div className="absolute left-5 top-1/2 h-32 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-[#E1BE5B]/70 to-transparent md:left-10 md:h-52" />
            </div>
          </div>
        </section>
      );
    }
