"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
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

const popularFilters = ["All", ...products.slice(0, 5).map((product) => product.name)];

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1 text-[#D4A017]" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index} className={index < rating ? "opacity-100" : "opacity-35"}>
          ★
        </span>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: (typeof reviews)[number] }) {
  return (
    <article className="h-full w-[320px] shrink-0 rounded-[1.8rem] border border-[#1B4332]/10 bg-white/90 p-5 shadow-[0_18px_40px_rgba(27,67,50,0.05)] md:w-[360px]">
      <div className="flex items-center justify-between gap-3">
        <StarRow rating={review.rating} />
        {review.verifiedPurchase && (
          <span className="rounded-full border border-[#1B4332]/10 bg-[#F5EFE6] px-2 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[#1B4332]/70">
            Verified Purchase
          </span>
        )}
      </div>

      {review.productName && (
        <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[#1B4332]/55">
          {review.productName}
        </p>
      )}

      <p className="mt-4 text-base leading-7 text-[#1B4332]/80">“{review.reviewText}”</p>

      <div className="mt-5 flex items-center justify-between gap-3 text-sm text-[#1B4332]/60">
        <span className="font-medium text-[#1B4332]">{review.name}</span>
        <span>{review.date}</span>
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

  const duplicatedReviews = [...filteredReviews, ...filteredReviews];

  return (
    <section data-page-section data-tone="reviews" className="bg-transparent py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#1B4332]/60">reviews</p>
            <h2 className="mt-3 font-serif text-4xl text-[#1B4332] md:text-5xl">
              {overallRating.toFixed(1)} out of 5
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div
              className="flex text-2xl text-[#D4A017]"
              aria-label={`Overall rating ${overallRating.toFixed(1)} out of 5`}
            >
              {Array.from({ length: 5 }).map((_, index) => (
                <span key={index} className={index < Math.round(overallRating) ? "opacity-100" : "opacity-35"}>
                  ★
                </span>
              ))}
            </div>
            <p className="text-sm text-[#1B4332]/70">Based on {totalRatings.toLocaleString()} ratings</p>
          </div>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {popularFilters.map((filter) => {
            const isActive = activeFilter === filter;

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full border px-3 py-2 text-xs font-medium uppercase tracking-[0.18em] transition ${
                  isActive
                    ? "border-[#1B4332] bg-[#1B4332] text-[#FAF5EB]"
                    : "border-[#1B4332]/15 bg-white/70 text-[#1B4332]/70 hover:border-[#1B4332]/25 hover:text-[#1B4332]"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        <div className="overflow-hidden">
          <motion.div
            className="flex w-max gap-5 py-2"
            animate={{ x: [0, -((filteredReviews.length * 360) + 20)] }}
            transition={{
              duration: Math.max(18, filteredReviews.length * 2.8),
              ease: "linear",
              repeat: Infinity,
            }}
            whileHover={{ animationPlayState: "paused" }}
          >
            {duplicatedReviews.map((review, index) => (
              <ReviewCard key={`${review.productName}-${review.name}-${index}`} review={review} />
            ))}
          </motion.div>
        </div>

        <div className="mt-8">
          <a
            href={AMAZON_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="brand-cta inline-flex gap-2"
          >
            See all reviews on Amazon <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
