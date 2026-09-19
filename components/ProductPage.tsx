"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Product, products } from "@/lib/products";
import { getProductCategory, getProductDetails } from "@/lib/catalog";
import { productReviews } from "@/lib/reviews";

function Stars({ rating }: { rating: number | string }) {
  const value = Number(rating);
  return (
    <span className="tracking-[0.12em] text-[#B88D27]" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => <span key={index} className={index < Math.round(value) ? "" : "text-[#B88D27]/30"}>★</span>)}
    </span>
  );
}

function AmazonImageLink({ product, large = false }: { product: Product; large?: boolean }) {
  return (
    <a href={product.amazonUrl} target="_blank" rel="noopener noreferrer" aria-label={`Shop ${product.name} on Amazon`} className={`block shrink-0 transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#1B4332]/40 ${large ? "w-[220px] sm:w-[250px]" : "w-[112px]"}`}>
      <Image src="/prdimg/img.png" alt="Shop on Amazon" width={2163} height={727} sizes={large ? "250px" : "112px"} className="h-auto w-full drop-shadow-[0_14px_24px_rgba(0,0,0,0.22)]" />
    </a>
  );
}

export default function ProductPage({ product }: { product: Product }) {
  const details = getProductDetails(product.name);
  const category = getProductCategory(product.name);
  const [activeImage, setActiveImage] = useState(product.images.hero);
  const reviews = productReviews.filter((review) => review.productName === product.name);
  const benefits = ["No Additives", "Plant-Based Bags", details.badges?.[0] ?? "Botanical Blend", "Daily Ritual"];

  return (
    <main className="min-h-screen bg-[#F7F7F2] text-[#1B4332]">
      <header className="border-b border-[#1B4332]/10 bg-[#0B241B] px-6 py-8 text-[#FFF8E7] md:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5">
          <Link href="/" className="font-serif text-3xl tracking-tight">Origin Pure</Link>
          <Link href="/shop" className="text-[10px] uppercase tracking-[0.2em] text-[#F9E7B2]">Shop all blends</Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-12 lg:py-20">
        <section className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
          <div className="rounded-[2rem] border border-[#1B4332]/10 bg-white/55 p-5 shadow-[0_24px_70px_rgba(27,67,50,0.08)] md:p-8">
            <div className="relative aspect-square overflow-hidden rounded-[1.4rem] bg-[#EEF5F2]">
              <Image src={activeImage} alt={product.name} fill priority sizes="(max-width: 1024px) 100vw, 55vw" className="object-contain p-8 transition-transform duration-500 hover:scale-[1.04] md:p-14" />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {product.images.gallery.map((image) => (
                <button key={image} type="button" onClick={() => setActiveImage(image)} aria-label={`View ${product.name} image`} className={`relative aspect-square overflow-hidden rounded-xl border bg-white transition ${activeImage === image ? "border-[#B88D27] ring-1 ring-[#B88D27]/40" : "border-[#1B4332]/10 hover:border-[#1B4332]/40"}`}>
                  <Image src={image} alt="" fill sizes="120px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 lg:pt-8">
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#6E7772]">{category}</p>
            <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-[#073B32] md:text-7xl">{product.name}</h1>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-[#1B4332]/70">
              <Stars rating={details.rating} />
              <a href="#reviews" className="underline decoration-[#B88D27]/50 underline-offset-4">{details.rating} · {details.reviews} reviews</a>
            </div>
            <p className="mt-7 max-w-xl text-lg leading-8 text-[#1B4332]/70">{product.tagline} A clean, plant-first blend designed to make the everyday ritual feel considered.</p>
            <div className="mt-7 flex flex-wrap items-end gap-4">
              <span className="font-serif text-4xl text-[#1B4332]">{details.price}</span>
              <span className="text-sm text-[#1B4332]/60">· {product.facts.find((fact) => fact.label === "Tea bags")?.value ?? "20 bags"}</span>
              {details.badges?.map((badge) => <span key={badge} className="rounded-full bg-[#F4E7C5] px-3 py-1 text-[10px] uppercase tracking-[0.16em]">{badge}</span>)}
            </div>
            <div className="mt-8"><AmazonImageLink product={product} large /></div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {product.facts.slice(0, 4).map((fact) => <div key={fact.label} className="rounded-2xl border border-[#1B4332]/10 bg-white/65 p-4"><p className="text-[10px] uppercase tracking-[0.18em] text-[#1B4332]/50">{fact.label}</p><p className="mt-2 font-medium">{fact.value}</p></div>)}
            </div>
          </div>
        </section>

        <section className="mt-20 border-t border-[#1B4332]/10 pt-16">
          <p className="text-[10px] uppercase tracking-[0.28em] text-[#6E7772]">What is inside</p>
          <h2 className="mt-3 font-serif text-4xl text-[#073B32] md:text-5xl">Quiet essentials, thoughtfully blended.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {product.ingredients.map((ingredient, index) => <article key={ingredient.name} className="rounded-[1.3rem] border border-[#1B4332]/10 bg-white/70 p-5"><div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E9F0E5] font-serif text-xl text-[#1B4332]">{String(index + 1).padStart(2, "0")}</div><h3 className="mt-5 font-serif text-2xl">{ingredient.name}</h3><p className="mt-2 text-sm leading-6 text-[#1B4332]/65">{ingredient.note}</p></article>)}
          </div>
        </section>

        <section className="mt-20 rounded-[2rem] bg-[#1B4332] p-7 text-[#FFF8E7] md:p-12">
          <p className="text-[10px] uppercase tracking-[0.28em] text-[#F9E7B2]/75">The ritual</p>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl">Brew it simply.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {["Boil fresh water to 90–95°C.", `Steep one bag for ${product.facts.find((fact) => fact.label === "Steep")?.value ?? "3–5 min"}.`, "Sip warm, or pour over ice and make it your own."].map((step, index) => <div key={step} className="rounded-[1.3rem] border border-white/15 bg-white/10 p-5"><span className="font-serif text-4xl text-[#F9E7B2]">{String(index + 1).padStart(2, "0")}</span><p className="mt-5 leading-7 text-[#FFF8E7]/80">{step}</p></div>)}
          </div>
        </section>

        <section className="mt-20">
          <p className="text-[10px] uppercase tracking-[0.28em] text-[#6E7772]">Why you&apos;ll love it</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{benefits.map((benefit) => <div key={benefit} className="rounded-full border border-[#1B4332]/12 bg-white/65 px-5 py-4 text-center text-sm">✦ {benefit}</div>)}</div>
        </section>

        <section id="reviews" className="mt-20 border-t border-[#1B4332]/10 pt-16">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-[10px] uppercase tracking-[0.28em] text-[#6E7772]">Customer reviews</p><h2 className="mt-3 font-serif text-4xl md:text-5xl">A ritual worth returning to.</h2></div><div className="text-left md:text-right"><div className="flex items-center gap-2"><Stars rating={details.rating} /><strong>{details.rating} / 5</strong></div><p className="mt-1 text-sm text-[#1B4332]/60">{details.reviews} verified reviews</p></div></div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">{(reviews.length ? reviews : [{ name: "Origin Pure community", reviewText: "A thoughtful botanical blend with a clean finish and an easy daily rhythm.", rating: 5, productName: product.name, date: "2026" }]).map((review) => <article key={`${review.name}-${review.date}`} className="rounded-[1.4rem] border border-[#1B4332]/10 bg-white/70 p-6 shadow-[0_14px_35px_rgba(27,67,50,0.05)]"><Stars rating={review.rating} /><p className="mt-5 font-serif text-xl italic leading-8 text-[#1B4332]/80">“{review.reviewText}”</p><div className="mt-6 border-t border-[#1B4332]/10 pt-4 text-[10px] uppercase tracking-[0.18em] text-[#1B4332]/60">{review.name} · {review.date}</div></article>)}</div>
        </section>

        <section className="mt-20 border-t border-[#1B4332]/10 pt-16">
          <div className="flex items-end justify-between gap-5"><div><p className="text-[10px] uppercase tracking-[0.28em] text-[#6E7772]">You might also like</p><h2 className="mt-3 font-serif text-4xl">Explore another ritual.</h2></div><Link href="/shop" className="text-[10px] uppercase tracking-[0.18em] text-[#B88D27]">View all</Link></div>
          <div className="mt-8 flex snap-x gap-4 overflow-x-auto pb-4">{products.filter((candidate) => candidate.id !== product.id).slice(0, 4).map((candidate) => <Link key={candidate.id} href={`/products/${candidate.slug}`} className="w-[190px] shrink-0 snap-start rounded-[1.2rem] border border-[#1B4332]/10 bg-white/70 p-4 transition hover:-translate-y-1"><div className="relative h-44"><Image src={candidate.images.hero} alt={candidate.name} fill sizes="190px" className="object-contain" /></div><p className="mt-3 font-serif text-xl">{candidate.name}</p><p className="mt-1 text-xs text-[#1B4332]/60">{getProductCategory(candidate.name)}</p></Link>)}</div>
        </section>
      </div>
    </main>
  );
}
