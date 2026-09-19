"use client";

import { useMemo, useState } from "react";
import { AMAZON_URL } from "@/lib/amazon";
import { products } from "@/lib/products";

const overallRating = 4.6;
const totalRatings = 2100;

const reviews = [
  {
    name: "Maya R.",
    productName: "Moringa Lemongrass",
    rating: 5,
    verifiedPurchase: true,
    reviewText:
      "I look forward to this every evening. It feels light, clean, and calming without being overly sweet. A genuinely refreshing wellness tea.",
    date: "May 2026",
  },
  {
    name: "Alex P.",
    productName: "Lemon Ginger",
    rating: 5,
    verifiedPurchase: true,
    reviewText:
      "The citrus notes are bright and the ginger gives it a really grounding finish. It has become my daily go-to after lunch.",
    date: "Apr 2026",
  },
  {
    name: "Nina S.",
    productName: "Lemon Tulsi",
    rating: 4,
    verifiedPurchase: true,
    reviewText:
      "Smooth, fresh, and surprisingly soothing. I enjoy it both hot and iced, and it tastes clean without any artificial aftertaste.",
    date: "Mar 2026",
  },
  {
    name: "Derek L.",
    productName: "Lemon Fennel",
    rating: 5,
    verifiedPurchase: true,
    reviewText:
      "This is one of the few teas that feels energizing but still calming. The lemongrass flavor is crisp and inviting.",
    date: "Feb 2026",
  },
  {
    name: "Priya V.",
    productName: "Chamomile Lemon",
    rating: 4,
    verifiedPurchase: false,
    reviewText:
      "Great flavor and easy to steep. I especially like the citrus brightness and the fact that it feels gentle on the stomach.",
    date: "Jan 2026",
  },
  {
    name: "Sam K.",
    productName: "Hibiscus Lemon Balm",
    rating: 5,
    verifiedPurchase: true,
    reviewText:
      "Beautiful taste and a noticeable wellness feel. It sits well in my routine and tastes far more premium than expected.",
    date: "Dec 2025",
  },
  {
    name: "Lena T.",
    productName: "Butterfly Pea Blue Tea",
    rating: 5,
    verifiedPurchase: true,
    reviewText:
      "This tea feels premium from the first sip. The floral brightness is clean and the butterfly pea finish makes it feel deeply restorative.",
    date: "Nov 2025",
  },
  {
    name: "Jordan M.",
    productName: "Clove Lemon",
    rating: 4,
    verifiedPurchase: true,
    reviewText:
      "I like how gentle it is on the stomach and how fresh it tastes without any bitterness. The clove and lemon really stand out.",
    date: "Oct 2025",
  },
  {
    name: "Harper W.",
    productName: "Lemon Turmeric",
    rating: 5,
    verifiedPurchase: true,
    reviewText:
      "The golden turmeric warmth is perfectly balanced with citrus. It feels grounding and bright at the same time.",
    date: "Sep 2025",
  },
  {
    name: "Elliot B.",
    productName: "Moringa Lemongrass",
    rating: 5,
    verifiedPurchase: true,
    reviewText:
      "A crisp, fresh ritual I genuinely look forward to. The lemongrass keeps it light and the moringa makes it feel deeply clean.",
    date: "Aug 2025",
  },
] as const;

const popularFilters = ["All", ...products.map((product) => product.name)];

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1 text-[#C7A35D]" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index} className={index < rating ? "opacity-100" : "opacity-30"}>
          ★
        </span>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: (typeof reviews)[number] }) {
  return (
    <article className="group relative flex h-full min-h-[270px] snap-start flex-col justify-between overflow-hidden rounded-[1.65rem] border border-[#1B4332]/10 bg-[#FFFDF8] p-6 shadow-[0_18px_42px_rgba(80,61,35,0.06)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_22px_56px_rgba(80,61,35,0.10)] md:p-7">
      <span aria-hidden="true" className="pointer-events-none absolute -left-2 top-4 font-serif text-[90px] leading-none text-[#C7A35D]/15">“</span>

      <div className="relative z-10 flex h-full flex-col">
        <StarRow rating={review.rating} />
        <p
          className="mt-5 font-serif text-lg italic leading-[1.7] text-[#3D433D]/85 md:text-xl"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 5,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {review.reviewText}
        </p>

        <div className="mt-auto border-t border-[#1B4332]/10 pt-4">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C7A35D]" aria-hidden="true" />
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#1B4332]/75">{review.name}</p>
          </div>
          <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-[#1B4332]/48">{review.productName}</p>
        </div>
      </div>
    </article>
  );
}

export default function ReviewsCarousel() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredReviews = useMemo(() => {
    if (activeFilter === "All") return reviews;
    return reviews.filter((review) => review.productName === activeFilter);
  }, [activeFilter]);

  return (
    <section
      data-page-section
      data-tone="reviews"
      className="relative overflow-hidden bg-[#F5EEE2] pt-28 md:pt-32 lg:pt-36"
      style={{
        backgroundImage: "radial-gradient(circle at top, rgba(199,163,93,0.10), transparent 38%), linear-gradient(rgba(255,255,255,0.08), rgba(255,255,255,0.08))",
      }}
    >
      <div className="absolute inset-0 opacity-[0.08]" aria-hidden="true" style={{ backgroundImage: "radial-gradient(rgba(27,67,50,0.3) 0.6px, transparent 0.6px)", backgroundSize: "12px 12px" }} />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-[#1B4332]/60">The Origin Pure experience</p>
          <h2 className="mt-4 font-serif text-5xl tracking-[-0.04em] text-[#1B4332] md:text-6xl">4.6 out of 5</h2>
          <div className="mt-3 flex items-center justify-center gap-2 text-[#1B4332]/70" aria-label={`Overall rating ${overallRating.toFixed(1)} out of 5`}>
            <StarRow rating={5} />
            <span className="text-sm">Based on {totalRatings.toLocaleString()}+ verified reviews</span>
          </div>
          <div className="mx-auto mt-6 h-px w-24 bg-[#C7A35D]/80" />
        </div>

        <div className="mb-12 overflow-x-auto pb-2 [scrollbar-width:none]">
          <div className="flex min-w-max justify-center gap-2">
            {popularFilters.map((filter) => {
              const isActive = activeFilter === filter;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`relative rounded-full px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.2em] transition-all duration-300 ease-out md:px-5 ${
                    isActive
                      ? "border border-[#1B4332]/10 bg-[#1B4332] text-[#F7F2E8] shadow-[0_12px_24px_rgba(27,67,50,0.12)]"
                      : "border border-[#1B4332]/12 bg-transparent text-[#1B4332]/60 hover:border-[#1B4332]/30 hover:text-[#1B4332]"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-5 grid gap-4 md:grid-cols-2">
          {filteredReviews.slice(0, 2).map((review) => (
            <ReviewCard key={`${review.productName}-${review.name}`} review={review} />
          ))}
        </div>

        <blockquote className="relative mx-auto my-12 max-w-5xl rounded-[2rem] border border-[#1B4332]/8 bg-[#F7F2E8]/70 px-6 py-12 text-center shadow-[0_18px_45px_rgba(80,61,35,0.06)] md:px-10 md:py-16">
          <span aria-hidden="true" className="pointer-events-none absolute left-4 top-2 font-serif text-[130px] leading-none text-[#C7A35D]/12 md:left-10 md:text-[180px]">“</span>
          <span aria-hidden="true" className="pointer-events-none absolute bottom-2 right-4 font-serif text-[130px] leading-none text-[#C7A35D]/12 md:right-10 md:text-[180px]">”</span>
          <p className="relative z-10 font-serif text-3xl italic leading-[1.2] tracking-[-0.025em] text-[#1B4332] md:text-5xl">
            “The kind of tea that makes your whole evening slow down in the best possible way.”
          </p>
          <cite className="relative z-10 mt-5 block text-[10px] font-medium not-italic uppercase tracking-[0.22em] text-[#1B4332]/55">Maya R. · Moringa Lemongrass</cite>
        </blockquote>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredReviews.slice(2, 5).map((review) => (
            <ReviewCard key={`${review.productName}-${review.name}`} review={review} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href={AMAZON_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full border border-[#1B4332]/35 px-6 py-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[#1B4332] transition-colors hover:border-[#1B4332] hover:bg-[#1B4332] hover:text-[#FFF8E7]"
          >
            See Why They Love It <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
