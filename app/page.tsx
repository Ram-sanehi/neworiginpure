"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from "@/components/HeroSection";
import SignatureBlend from "@/components/SignatureBlend";
import RitualSection from "@/components/RitualSection";
import IngredientsSection from "@/components/IngredientsSection";
import BenefitsSection from "@/components/BenefitsSection";
import HowToBrewSection from "@/components/HowToBrewSection";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import WhyOriginPure from "@/components/WhyOriginPure";
import StorySection from "@/components/StorySection";
import ReviewSection from "@/components/ReviewSection";
import FinalCTAFooter from "@/components/FinalCTAFooter";
import StickyBuyBar from "@/components/StickyBuyBar";
import BrandStory from "@/components/BrandStory";
import ProductStack from "@/components/ProductStack";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Origin Pure – Citrus Vitality Moringa Lemongrass Green Tea",
  description:
    "Origin Pure Citrus Vitality blends moringa, lemongrass, and green tea for a bright, refreshing wellness ritual that supports energy, focus, and everyday calm.",
  image: ["https://originpuretea.com/prdimg/ButterflyPea/1.png"],
  brand: {
    "@type": "Brand",
    name: "Origin Pure",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.6",
    reviewCount: 2100,
  },
} as const;

export default function Home() {
  useEffect(() => {
    const layer = document.getElementById("page-background-layer");
    if (!layer) return;

    const sectionPairs = [
      {
        section: document.querySelector('[data-tone="hero"]'),
        from: "#0d1f17",
        to: "#F3EBD6",
      },
      {
        section: document.querySelector('[data-tone="story"]'),
        from: "#F3EBD6",
        to: "#F8F3E8",
      },
      {
        section: document.querySelector('[data-tone="stack"]'),
        from: "#F8F3E8",
        to: "#FFF8E7",
      },
      {
        section: document.querySelector('[data-tone="reviews"]'),
        from: "#FFF8E7",
        to: "#1B4332",
      },
      {
        section: document.querySelector('[data-tone="cta"]'),
        from: "#1B4332",
        to: "#1B4332",
      },
    ].filter((pair) => pair.section);

    if (!sectionPairs.length) return;

    gsap.set(layer, {
      background: sectionPairs[0].from,
      willChange: "background-color",
      force3D: true,
    });

    const triggers = sectionPairs.map(({ section, from, to }) => {
      if (!section) return null;

      return gsap.fromTo(
        layer,
        { background: from },
        {
          background: to,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        }
      );
    });

    return () => {
      triggers.forEach((trigger) => {
        if (trigger) trigger.scrollTrigger?.kill();
      });
    };
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#FFF8E7] text-[#1B4332] antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <div id="page-background-layer" className="pointer-events-none fixed inset-0 z-0" />

      <div className="relative z-10">
        <HeroSection />
        <BrandStory />
        <ProductStack />
        <SignatureBlend />
        <RitualSection />
        <IngredientsSection />
        <BenefitsSection />
        <HowToBrewSection />
        <ReviewsCarousel />
        <WhyOriginPure />
        <StorySection />
        <ReviewSection />
        <FinalCTAFooter />
      </div>

      <StickyBuyBar />
    </main>
  );
}
