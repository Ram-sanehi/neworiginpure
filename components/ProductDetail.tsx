"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import RevealImage from "@/components/RevealImage";
import { Product } from "@/lib/products";
import HowToBrewSection from "@/components/HowToBrewSection";

function ProductDetail({
  product,
  onClose,
  layoutId,
}: {
  product: Product;
  onClose: () => void;
  layoutId: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const galleryImages = useMemo(
    () =>
      product.images.gallery.length
        ? product.images.gallery
        : [product.images.hero, product.images.ingredients, product.images.brewSteps, product.images.specs],
    [product.images]
  );
  const [activeImage, setActiveImage] = useState(galleryImages[0]);

  useEffect(() => {
    setActiveImage(galleryImages[0]);
  }, [galleryImages, product.id]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousPosition = document.body.style.position;
    const previousTop = document.body.style.top;
    const previousLeft = document.body.style.left;
    const previousRight = document.body.style.right;
    const previousWidth = document.body.style.width;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyHeight = document.body.style.height;
    const previousBodyOverscroll = document.body.style.overscrollBehavior;
    const scrollY = window.scrollY;

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.height = "100%";
    document.body.style.overscrollBehavior = "contain";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.position = previousPosition;
      document.body.style.top = previousTop;
      document.body.style.left = previousLeft;
      document.body.style.right = previousRight;
      document.body.style.width = previousWidth;
      document.body.style.height = previousBodyHeight;
      document.body.style.overscrollBehavior = previousBodyOverscroll;
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.scrollTo({ top: scrollY, behavior: "auto" });
    };
  }, []);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] overflow-y-auto bg-[#0f1c18]/75 backdrop-blur-sm overscroll-contain"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      <motion.div
        layoutId={layoutId}
        initial={prefersReducedMotion ? { opacity: 0 } : { scale: 0.96, opacity: 0, y: 36 }}
        animate={prefersReducedMotion ? { opacity: 1 } : { scale: 1, opacity: 1, y: 0 }}
        exit={prefersReducedMotion ? { opacity: 0 } : { scale: 0.96, opacity: 0, y: 32 }}
        transition={{ duration: prefersReducedMotion ? 0.18 : 0.42, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex min-h-screen w-full max-w-6xl items-start justify-center px-4 py-6 md:px-8"
        style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
      >
        <div
          className="relative max-h-[calc(100vh-3rem)] w-full overflow-hidden rounded-[2rem] border border-[#1B4332]/10 shadow-[0_40px_120px_rgba(9,17,15,0.3)]"
          style={{ background: `linear-gradient(135deg, ${product.color ?? "#F5EBD4"} 0%, rgba(255,255,255,0.98) 100%)` }}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close product detail"
            className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-[#1B4332]/10 bg-white/80 text-lg font-medium text-[#1B4332] transition hover:scale-105"
          >
            ×
          </button>

          <div className="relative z-10 max-h-[calc(100vh-3rem)] overflow-y-auto p-5 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#1B4332]/60">Origin Pure</p>
                <h2 className="mt-2 font-serif text-3xl text-[#1B4332] md:text-5xl">{product.name}</h2>
              </div>

              <a
                href={product.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Shop ${product.name} on Amazon`}
                className="group block w-[180px] shrink-0 transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#1B4332]/40"
              >
                <Image
                  src="/prdimg/img.png"
                  alt="Shop on Amazon"
                  width={2163}
                  height={727}
                  sizes="180px"
                  className="h-auto w-full drop-shadow-[0_12px_20px_rgba(0,0,0,0.22)]"
                />
              </a>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="overflow-hidden rounded-[1.6rem] border border-[#1B4332]/10 bg-white/25 p-4 md:p-5">
                <RevealImage
                  src={activeImage}
                  alt={product.name}
                  width={900}
                  height={1000}
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  wrapperClassName="relative block overflow-hidden rounded-[1.2rem]"
                  skeletonClassName="rounded-[1.2rem]"
                  className="h-auto w-full rounded-[1.2rem] object-contain"
                />

                <div className="mt-4 grid grid-cols-4 gap-2">
                  {galleryImages.map((image) => (
                    <button
                      key={image}
                      type="button"
                      onClick={() => setActiveImage(image)}
                      className={`overflow-hidden rounded-xl border transition ${activeImage === image ? "border-[#1B4332]/70" : "border-[#1B4332]/10"}`}
                      aria-label={`View ${product.name} gallery image`}
                    >
                      <RevealImage
                        src={image}
                        alt={`${product.name} gallery`} 
                        width={220}
                        height={260}
                        sizes="(max-width: 768px) 25vw, 100px"
                        wrapperClassName="relative block overflow-hidden"
                        skeletonClassName=""
                        className="h-16 w-full object-cover md:h-20"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.6rem] border border-[#1B4332]/10 bg-[#FFFDF9]/80 p-5">
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#1B4332]/60">Signature blend</p>
                <p className="mt-4 font-serif text-3xl text-[#1B4332] md:text-4xl">{product.tagline}</p>
                <div className="mt-6 space-y-3">
                  {product.facts.map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between gap-4 rounded-2xl border border-[#1B4332]/10 bg-white/70 px-4 py-3 text-sm text-[#1B4332]">
                      <span className="uppercase tracking-[0.18em] text-[#1B4332]/60">{label}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <section className="mt-8 rounded-[1.6rem] border border-[#1B4332]/10 bg-[#FFFDF9]/80 p-5 md:p-6">
              <div className="mb-5 flex items-center justify-between gap-3">
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#1B4332]/60">Ingredients</p>
                <span className="rounded-full border border-[#1B4332]/10 bg-[#F4E7C5] px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-[#1B4332]/70">
                  Plant-powered
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {product.ingredients.map((ingredient) => (
                  <div key={ingredient.name} className="rounded-[1.3rem] border border-[#1B4332]/10 bg-white/75 p-4">
                    <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#E9F0E5] text-lg font-semibold text-[#1B4332]">
                      {ingredient.name.slice(0, 1)}
                    </div>
                    <h3 className="font-serif text-2xl text-[#1B4332]">{ingredient.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#1B4332]/70">{ingredient.note}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-8 rounded-[1.6rem] border border-[#1B4332]/10 bg-[#FFFDF9]/80 p-5 md:p-6">
              <div className="mb-6">
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#1B4332]/60">How to Brew</p>
              </div>
              <HowToBrewSection />
            </section>

            <section className="mt-8 overflow-hidden rounded-[1.6rem] border border-[#1B4332]/10 bg-[#FFFDF9]/80 p-5 md:p-6">
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#1B4332]/60">Specs</p>
                <span className="text-sm text-[#1B4332]/65">Crafted for daily ritual</span>
              </div>

              <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="overflow-hidden rounded-[1.4rem] border border-[#1B4332]/10 bg-white/25">
                  <RevealImage
                    src={product.images.specs}
                    alt={`${product.name} specification sheet`}
                    width={900}
                    height={700}
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    wrapperClassName="relative block overflow-hidden"
                    skeletonClassName=""
                    className="h-auto w-full object-cover"
                  />
                </div>

                <div className="space-y-3">
                  {product.facts.map(({ label, value }) => (
                    <div key={label} className="rounded-[1.1rem] border border-[#1B4332]/10 bg-white/80 p-4">
                      <div className="text-[10px] uppercase tracking-[0.22em] text-[#1B4332]/60">{label}</div>
                      <div className="mt-2 font-serif text-2xl text-[#1B4332]">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <div className="mt-8 flex justify-end">
              <a
                href={product.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Shop ${product.name} on Amazon`}
                className="group block w-[180px] shrink-0 transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#1B4332]/40"
              >
                <Image
                  src="/prdimg/img.png"
                  alt="Shop on Amazon"
                  width={2163}
                  height={727}
                  sizes="180px"
                  className="h-auto w-full drop-shadow-[0_12px_20px_rgba(0,0,0,0.22)]"
                />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ProductDetail;
