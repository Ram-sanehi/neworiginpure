"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Product, products } from "@/lib/products";
import ProductDetail from "@/components/ProductDetail";
import RevealImage from "@/components/RevealImage";

const defaultCardColors = [
  "#F5EBD4",
  "#E4F0E3",
  "#F7E5C8",
  "#E7F1D5",
  "#F3E4D4",
  "#F6E8B9",
  "#E7F1E1",
  "#F9DFC1",
  "#DDECCC",
];

export default function ProductStack() {
  const reducedMotion = useReducedMotion();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <section
      data-page-section
      data-tone="stack"
      className="relative bg-transparent py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.24em] text-[#1B4332]/60">The collection</p>
          <h2 className="mt-3 font-serif text-4xl text-[#1B4332] md:text-5xl">Nine mindful blends for every ritual.</h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {products.map((product, index) => {
            const tint = product.color ?? defaultCardColors[index % defaultCardColors.length];

            return (
              <motion.article
                key={product.id}
                layoutId={`product-card-${product.id}`}
                whileHover={reducedMotion ? undefined : { scale: 1.01, y: -2 }}
                transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                className="relative overflow-hidden rounded-[2rem] border border-[#1B4332]/10 shadow-[0_30px_80px_rgba(27,67,50,0.08)]"
                style={{ background: `linear-gradient(135deg, ${tint} 0%, rgba(255,255,255,0.98) 100%)` }}
              >
                <div className="grid h-full gap-6 p-5 md:p-6">
                  <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden rounded-[1.5rem] bg-white/20">
                    <motion.div
                      animate={reducedMotion ? undefined : { y: [0, -8, 0] }}
                      transition={{ duration: 6 + index, repeat: Infinity, ease: "easeInOut" }}
                      className="w-full max-w-[300px]"
                    >
                      <RevealImage
                        src={product.images.hero}
                        alt={product.name}
                        width={640}
                        height={800}
                        sizes="(max-width: 767px) 80vw, (max-width: 1280px) 40vw, 25vw"
                        wrapperClassName="relative block overflow-hidden"
                        skeletonClassName="rounded-[1rem]"
                        className="h-auto w-full object-contain drop-shadow-[0_20px_35px_rgba(27,67,50,0.15)]"
                        priority={index === 0}
                      />
                    </motion.div>
                  </div>

                  <div className="flex flex-col justify-between gap-5">
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-[#1B4332]/65">
                        Origin Pure Collection
                      </p>
                      <h3 className="mt-4 font-serif text-4xl leading-[0.95] tracking-[-0.04em] text-[#1B4332] md:text-5xl">
                        {product.name}
                      </h3>
                      <p className="mt-4 text-base leading-7 text-[#1B4332]/72 md:text-lg">
                        {product.tagline}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          setSelectedProduct(product);
                        }}
                        className="inline-flex items-center justify-center rounded-full border border-[#1B4332]/15 bg-[#1B4332] px-5 py-3 text-sm font-medium text-[#F8F3E8] transition hover:translate-y-[-1px] hover:bg-[#203d2f]"
                      >
                        Explore
                      </button>
                      <span className="text-sm uppercase tracking-[0.22em] text-[#1B4332]/45">{index + 1}/9</span>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            layoutId={`product-card-${selectedProduct.id}`}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
