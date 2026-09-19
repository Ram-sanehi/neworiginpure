"use client";

import Image from "next/image";
import Link from "next/link";
import { AMAZON_URL } from "@/lib/amazon";
import { products } from "@/lib/products";
import { useState } from "react";

const productCategories: Record<string, string> = {
  "Butterfly Pea Blue Tea": "CALMING",
  "Chamomile Lemon": "CALMING",
  "Clove Lemon": "GROUNDING",
  "Hibiscus Lemon Balm": "REFRESHING",
  "Lemon Fennel": "DIGESTIVE",
  "Lemon Ginger": "DIGESTIVE",
  "Lemon Tulsi": "GROUNDING",
  "Lemon Turmeric": "GROUNDING",
  "Moringa Lemongrass": "ENERGIZING",
};

const collectionNames = [
  "Butterfly Pea Blue Tea",
  "Lemon Tulsi",
  "Chamomile Lemon",
  "Clove Lemon",
  "Hibiscus Lemon Balm",
  "Lemon Turmeric",
  "Lemon Fennel",
  "Lemon Ginger",
  "Moringa Lemongrass",
];

const collectionProducts = collectionNames
  .map((name) => products.find((product) => product.name === name))
  .filter((product): product is (typeof products)[number] => Boolean(product));

const categories = ["ALL", "CALMING", "CITRUS", "GROUNDING", "DIGESTIVE", "REFRESHING", "ENERGIZING"];

const categoryStyles: Record<string, string> = {
  CALMING: "#EEF5F2",
  CITRUS: "#F8F1D8",
  GROUNDING: "#F3E8DB",
  DIGESTIVE: "#EEF1DE",
  REFRESHING: "#F6E6E5",
  ENERGIZING: "#E8F0DD",
};

const catalogDetails: Record<string, { rating: string; reviews: number; price: string; badges?: string[] }> = {
  "Butterfly Pea Blue Tea": { rating: "4.6", reviews: 238, price: "₹399", badges: ["Caffeine-Free"] },
  "Chamomile Lemon": { rating: "4.6", reviews: 162, price: "₹399", badges: ["Caffeine-Free"] },
  "Clove Lemon": { rating: "4.5", reviews: 119, price: "₹399" },
  "Hibiscus Lemon Balm": { rating: "4.7", reviews: 207, price: "₹399", badges: ["Bestseller"] },
  "Lemon Fennel": { rating: "4.5", reviews: 131, price: "₹399" },
  "Lemon Ginger": { rating: "4.8", reviews: 286, price: "₹399", badges: ["Bestseller"] },
  "Lemon Tulsi": { rating: "4.6", reviews: 176, price: "₹399", badges: ["Caffeine-Free"] },
  "Lemon Turmeric": { rating: "4.7", reviews: 154, price: "₹399", badges: ["New"] },
  "Moringa Lemongrass": { rating: "4.8", reviews: 312, price: "₹399", badges: ["Bestseller"] },
};

function StarRating({ rating, reviews }: { rating: string; reviews: number }) {
  return (
    <div className="mt-3 flex items-center gap-2 text-xs" aria-label={`${rating} out of 5 stars from ${reviews} reviews`}>
      <span className="tracking-[0.12em] text-[#B88D27]" aria-hidden="true">★★★★<span className="text-[#B88D27]/35">★</span></span>
      <span className="text-[#52615A]">{rating} ({reviews})</span>
    </div>
  );
}

export default function ProductStack() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const visibleProducts = activeCategory === "ALL"
    ? collectionProducts
    : collectionProducts.filter((product) => productCategories[product.name] === activeCategory);

  return (
    <section
      id="collection"
      data-page-section
      data-tone="stack"
      className="relative bg-transparent py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#6E7772]">The collection</p>
            <h2 className="mt-3 font-serif text-4xl text-[#073B32] md:text-5xl">Nine mindful blends for every ritual.</h2>
          </div>
        </div>

        <div className="mb-5 flex items-end justify-between gap-4">
          <p className="text-sm text-[#1B4332]/55">{visibleProducts.length} {visibleProducts.length === 1 ? "blend" : "blends"}</p>
          <p className="hidden text-[10px] uppercase tracking-[0.2em] text-[#1B4332]/45 sm:block">Whole leaf · plant-based bags</p>
        </div>

        <div className="mb-10 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] md:flex-wrap md:overflow-visible">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={activeCategory === category}
              onClick={() => setActiveCategory(category)}
              className={`relative shrink-0 rounded-full border px-4 py-2 text-[10px] font-medium uppercase tracking-[0.18em] transition-all duration-300 after:absolute after:bottom-[-6px] after:left-1/2 after:h-px after:-translate-x-1/2 after:bg-[#D4A017] after:transition-all after:duration-300 ${
                activeCategory === category
                  ? "border-[#1B4332] bg-[#1B4332] text-white after:w-8"
                  : "border-[#1B4332]/20 bg-transparent text-[#1B4332]/68 after:w-0 hover:border-[#1B4332]/55 hover:text-[#1B4332] hover:after:w-4"
              }`}
            >
              {category === "ALL" ? "All blends" : category}
              <span className="ml-1.5 opacity-55">{category === "ALL" ? collectionProducts.length : collectionProducts.filter((product) => productCategories[product.name] === category).length}</span>
            </button>
          ))}
        </div>

        <div className="mb-10 grid gap-4 border-y border-[#1B4332]/10 py-5 text-sm text-[#1B4332]/65 sm:grid-cols-3">
          <p><strong className="font-semibold text-[#1B4332]">4.7★</strong> average rating</p>
          <p><strong className="font-semibold text-[#1B4332]">1,200+</strong> verified reviews</p>
          <p><strong className="font-semibold text-[#1B4332]">50,000+</strong> cups brewed</p>
        </div>

        <div key={activeCategory} className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {visibleProducts.map((product, index) => (
            (() => {
              const category = productCategories[product.name] ?? "BOTANICAL";
              const details = catalogDetails[product.name] ?? { rating: "4.6", reviews: 100, price: "₹399" };
              const packSize = product.facts.find((fact) => fact.label === "Tea bags")?.value ?? "20 bags";

              return (
            <article
              key={product.id}
              className="group flex min-h-[625px] animate-[catalog-card-in_500ms_ease_both] flex-col overflow-hidden rounded-[1.25rem] border border-[#1B4332]/[0.08] shadow-[0_18px_48px_rgba(27,67,50,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_62px_rgba(27,67,50,0.14)]"
              style={{ backgroundColor: categoryStyles[category] ?? "#FFFFFF", animationDelay: `${index * 55}ms` }}
            >
              <div className="relative flex h-[300px] items-center justify-center px-8 py-10 md:h-[330px]">
                <Link href={`/products/${product.slug}`} aria-label={`View ${product.name}`} className="relative h-full w-full max-w-[220px] transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                  <Image
                    src={product.images.hero}
                    alt={product.name}
                    fill
                    sizes="(max-width: 767px) 80vw, (max-width: 1280px) 28vw, 22vw"
                    className="absolute inset-0 h-full w-full object-contain transition-opacity duration-500 ease-out group-hover:opacity-0"
                    priority={index < 3}
                  />
                  <Image
                    src={product.images.ingredients}
                    alt={`${product.name} ingredients`}
                    fill
                    sizes="(max-width: 767px) 80vw, (max-width: 1280px) 28vw, 22vw"
                    className="absolute inset-0 h-full w-full object-contain opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
                    loading="lazy"
                  />
                </Link>
                <button type="button" aria-label={`Quick view ${product.name}`} className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-[#1B4332]/15 bg-white/70 text-sm text-[#1B4332]/65 opacity-0 shadow-sm transition-all duration-300 hover:bg-white group-hover:opacity-100">i</button>
              </div>

              <div className="flex flex-1 flex-col px-7 pb-7 pt-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#6E7772]">{category}</p>
                  <div className="flex gap-1">{details.badges?.map((badge) => <span key={badge} className="rounded-full bg-white/60 px-2 py-1 text-[8px] uppercase tracking-[0.12em] text-[#1B4332]/65">{badge}</span>)}</div>
                </div>
                <Link href={`/products/${product.slug}`} className="mt-2 font-serif text-2xl font-medium leading-tight text-[#26342D] transition-colors hover:text-[#B88D27]">{product.name}</Link>
                <StarRating rating={details.rating} reviews={details.reviews} />
                <p className="mt-3 line-clamp-2 text-sm leading-5 text-[#1B4332]/62">{product.tagline}</p>
                <div className="mt-auto flex items-end justify-between gap-3 pt-6">
                  <div>
                    <p className="text-lg font-semibold text-[#1B4332]">{details.price}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-[#1B4332]/50">{packSize}</p>
                  </div>
                  <a
                    href={product.amazonUrl || AMAZON_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Shop ${product.name} on Amazon`}
                    className="group block w-[112px] shrink-0 transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#1B4332]/40"
                  >
                    <Image
                      src="/prdimg/img.png"
                      alt="Shop on Amazon"
                      width={2163}
                      height={727}
                      sizes="112px"
                      className="h-auto w-full drop-shadow-[0_10px_16px_rgba(0,0,0,0.18)]"
                    />
                  </a>
                </div>
              </div>
            </article>
              );
            })()
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-[#1B4332]/10 pt-10 text-center">
          <p className="text-sm text-[#1B4332]/60">Plant-based tea bags, packed for a clean daily ritual.</p>
          <a
            href="/shop"
            className="brand-cta gap-3 px-7 py-3.5 text-[10px]"
          >
            Shop the Full Collection <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

    </section>
  );
}
