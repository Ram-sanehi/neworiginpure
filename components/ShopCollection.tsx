"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { products } from "@/lib/products";
import { categories, categoryStyles, getProductCategory, getProductDetails, productCategories } from "@/lib/catalog";

function StarRating({ rating, reviews }: { rating: string; reviews: number }) {
  return (
    <div className="mt-3 flex items-center gap-2 text-xs" aria-label={`${rating} out of 5 stars from ${reviews} reviews`}>
      <span className="tracking-[0.12em] text-[#B88D27]" aria-hidden="true">★★★★<span className="text-[#B88D27]/35">★</span></span>
      <span className="text-[#52615A]">{rating} ({reviews})</span>
    </div>
  );
}

export default function ShopCollection() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("ALL");
  const [sort, setSort] = useState("featured");

  const visibleProducts = useMemo(() => {
    const filtered = activeCategory === "ALL" ? [...products] : products.filter((product) => productCategories[product.name] === activeCategory);
    return filtered.sort((a, b) => {
      if (sort === "rated") return Number(getProductDetails(b.name).rating) - Number(getProductDetails(a.name).rating);
      if (sort === "price") return Number(getProductDetails(a.name).price.replace(/[^0-9]/g, "")) - Number(getProductDetails(b.name).price.replace(/[^0-9]/g, ""));
      if (sort === "bestsellers") return Number(getProductDetails(b.name).reviews) - Number(getProductDetails(a.name).reviews);
      return products.indexOf(a) - products.indexOf(b);
    });
  }, [activeCategory, sort]);

  return (
    <main className="min-h-screen bg-[#F7F7F2] text-[#1B4332]">
      <header className="border-b border-[#1B4332]/10 bg-[#0B241B] px-6 py-8 text-[#FFF8E7] md:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5">
          <Link href="/" className="font-serif text-3xl tracking-tight">Origin Pure</Link>
          <Link href="/#collection" className="text-[10px] uppercase tracking-[0.2em] text-[#F9E7B2]">Back to home</Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-24">
        <div className="max-w-3xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#6E7772]">The complete collection</p>
          <h1 className="mt-4 font-serif text-5xl leading-tight text-[#073B32] md:text-7xl">Nine mindful blends for every ritual.</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[#1B4332]/65 md:text-lg">Whole-leaf botanical blends made for brighter mornings, quieter evenings, and everything in between.</p>
        </div>

        <div className="my-12 grid gap-4 border-y border-[#1B4332]/10 py-5 text-sm text-[#1B4332]/65 sm:grid-cols-3">
          <p><strong className="font-semibold text-[#1B4332]">4.7★</strong> average rating</p>
          <p><strong className="font-semibold text-[#1B4332]">1,200+</strong> verified reviews</p>
          <p><strong className="font-semibold text-[#1B4332]">50,000+</strong> cups brewed</p>
        </div>

        <div className="flex flex-col gap-5 border-b border-[#1B4332]/10 pb-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                aria-pressed={activeCategory === category}
                onClick={() => setActiveCategory(category)}
                className={`shrink-0 rounded-full border px-4 py-2 text-[10px] font-medium uppercase tracking-[0.18em] transition-all ${activeCategory === category ? "border-[#1B4332] bg-[#1B4332] text-white" : "border-[#1B4332]/20 text-[#1B4332]/65 hover:border-[#1B4332]/50"}`}
              >
                {category === "ALL" ? "All blends" : category}
                <span className="ml-1.5 opacity-55">{category === "ALL" ? products.length : products.filter((product) => productCategories[product.name] === category).length}</span>
              </button>
            ))}
          </div>
          <label className="flex items-center gap-3 text-[10px] uppercase tracking-[0.16em] text-[#1B4332]/60">
            Sort
            <select value={sort} onChange={(event) => setSort(event.target.value)} className="rounded-full border border-[#1B4332]/20 bg-transparent px-3 py-2 text-[10px] tracking-[0.12em] text-[#1B4332] outline-none">
              <option value="featured">Featured</option>
              <option value="price">Price: Low to High</option>
              <option value="rated">Highest Rated</option>
              <option value="bestsellers">Bestsellers First</option>
            </select>
          </label>
        </div>

        <p className="mt-8 text-sm text-[#1B4332]/55">{visibleProducts.length} {visibleProducts.length === 1 ? "blend" : "blends"}</p>
        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visibleProducts.map((product) => {
            const category = getProductCategory(product.name);
            const details = getProductDetails(product.name);
            const packSize = product.facts.find((fact) => fact.label === "Tea bags")?.value ?? "20 bags";

            return (
              <article key={product.id} className="group flex min-h-[625px] flex-col overflow-hidden rounded-[1.25rem] border border-[#1B4332]/[0.08] shadow-[0_18px_48px_rgba(27,67,50,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_62px_rgba(27,67,50,0.14)]" style={{ backgroundColor: categoryStyles[category] ?? "#FFFFFF" }}>
                <Link href={`/products/${product.slug}`} aria-label={`View ${product.name}`} className="relative flex h-[330px] items-center justify-center px-8 py-10">
                  <div className="relative h-full w-full max-w-[220px] transition-transform duration-500 group-hover:scale-[1.03]">
                    <Image src={product.images.hero} alt={product.name} fill sizes="(max-width: 767px) 80vw, (max-width: 1280px) 40vw, 22vw" className="object-contain" />
                  </div>
                </Link>
                <div className="flex flex-1 flex-col px-7 pb-7 pt-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#6E7772]">{category}</p>
                    <div className="flex gap-1">{details.badges?.map((badge) => <span key={badge} className="rounded-full bg-white/60 px-2 py-1 text-[8px] uppercase tracking-[0.12em] text-[#1B4332]/65">{badge}</span>)}</div>
                  </div>
                  <Link href={`/products/${product.slug}`} className="mt-2 font-serif text-2xl font-medium leading-tight text-[#26342D] hover:text-[#B88D27]">{product.name}</Link>
                  <StarRating rating={details.rating} reviews={details.reviews} />
                  <p className="mt-3 line-clamp-2 text-sm leading-5 text-[#1B4332]/62">{product.tagline}</p>
                  <div className="mt-auto flex items-end justify-between gap-3 pt-6">
                    <div><p className="text-lg font-semibold text-[#1B4332]">{details.price}</p><p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-[#1B4332]/50">{packSize}</p></div>
                    <a href={product.amazonUrl} target="_blank" rel="noopener noreferrer" aria-label={`Shop ${product.name} on Amazon`} className="block w-[112px] shrink-0 transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#1B4332]/40">
                      <Image src="/prdimg/img.png" alt="Shop on Amazon" width={2163} height={727} sizes="112px" className="h-auto w-full drop-shadow-[0_10px_16px_rgba(0,0,0,0.18)]" />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
