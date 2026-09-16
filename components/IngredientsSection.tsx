"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RevealImage, { waitForImagesReady } from "@/components/RevealImage";

gsap.registerPlugin(ScrollTrigger);

const ingredients = [
  {
    image: "/prdimg/LemonGinger/1.png",
    name: "Lemongrass",
    description: "Gives a refreshing citrus flavour and supports digestion.",
    position: "34% 42%",
  },
  {
    image: "/prdimg/MoringaLemonGrass/1.png",
    name: "Moringa Leaves",
    description: "Rich in nutrients and antioxidants, supports energy and overall wellness.",
    position: "62% 35%",
  },
  {
    image: "/prdimg/ButterflyPea/1.png",
    name: "Green Tea Leaves",
    description: "Packed with antioxidants, supports metabolism and promotes well-being.",
    position: "50% 58%",
  },
];

export default function IngredientsSection() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let ctx: gsap.Context | undefined;

    const setup = () => {
      ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>(".ingredient-card").forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 82%",
              },
            }
          );
        });
      }, ref);
    };

    const cleanup = waitForImagesReady(ref.current, setup);

    return () => {
      cleanup();
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={ref} className="bg-[#FFF8E7] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-10 text-center lg:text-left">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#1B4332]/60">ingredients</p>
          <h2 className="mt-3 font-serif text-4xl text-[#1B4332] md:text-5xl">What&apos;s Inside</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {ingredients.map((ingredient, index) => (
            <motion.article
              key={ingredient.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.24, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="ingredient-card group rounded-[2rem] border border-[#1B4332]/10 bg-white/80 p-5 shadow-[0_18px_50px_rgba(27,67,50,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(27,67,50,0.12)]"
            >
              <div className="overflow-hidden rounded-[1.5rem] bg-[#F5EAC5] p-4">
                <RevealImage
                  src={ingredient.image}
                  alt={ingredient.name}
                  width={640}
                  height={800}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  wrapperClassName="relative block aspect-[4/5] overflow-hidden rounded-[1.15rem]"
                  skeletonClassName="rounded-[1.15rem]"
                  className="aspect-[4/5] h-auto w-full rounded-[1.15rem] object-cover transition duration-500 group-hover:scale-[1.03]"
                  style={{ objectPosition: ingredient.position }}
                  loading="lazy"
                />
              </div>

              <div className="mt-6">
                <h3 className="font-serif text-3xl text-[#1B4332]">{ingredient.name}</h3>
                <p className="mt-3 text-base leading-7 text-[#1B4332]/72">{ingredient.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
