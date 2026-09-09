import React, { useEffect, useState } from 'react';
import { Container } from '../ui/Container';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const HERO_SLIDES = [
  {
    id: 'pure-ingredients',
    label: 'Pure Ingredients',
    title: 'Nothing artificial. Just real botanicals in every cup.',
    bgClass: 'from-[#F4EFE4] via-[#F7F7F1] to-[#E6F0E4]',
    accentClass: 'bg-[#1C2E21]',
    shapeClass: 'bg-[#E7D7C3]'
  },
  {
    id: 'tea-estates',
    label: 'Tea Estates',
    title: 'Thoughtfully sourced leaves with a clean, rooted character.',
    bgClass: 'from-[#EAF0EA] via-[#F5F3EC] to-[#DDE7D4]',
    accentClass: 'bg-[#3A5541]',
    shapeClass: 'bg-[#D9C7A6]'
  },
  {
    id: 'wellness-lifestyle',
    label: 'Wellness Lifestyle',
    title: 'A calmer ritual for reset moments, slow mornings, and better evenings.',
    bgClass: 'from-[#F1EDE5] via-[#F9F6F0] to-[#E9E8DF]',
    accentClass: 'bg-[#B86B35]',
    shapeClass: 'bg-[#E6D6BE]'
  },
  {
    id: 'daily-tea-ritual',
    label: 'Daily Tea Ritual',
    title: 'A simple daily habit that feels grounding, refreshing, and real.',
    bgClass: 'from-[#EDF2EE] via-[#F5F2EA] to-[#EDE8D9]',
    accentClass: 'bg-[#132117]',
    shapeClass: 'bg-[#CFC5AF]'
  },
  {
    id: 'natural-botanical-blends',
    label: 'Natural Botanical Blends',
    title: 'Balanced, aromatic infusions shaped by nature rather than artificial flavour.',
    bgClass: 'from-[#F3EEE6] via-[#FBF9F5] to-[#EAF0EA]',
    accentClass: 'bg-[#243B2E]',
    shapeClass: 'bg-[#D5C5A3]'
  }
];

export const HeroSection: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((current) => (current + 1) % HERO_SLIDES.length);
    }, 4200);

    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setActiveSlide((current) => (current === 0 ? HERO_SLIDES.length - 1 : current - 1));
  };

  const goToNext = () => {
    setActiveSlide((current) => (current + 1) % HERO_SLIDES.length);
  };

  return (
    <>
      {/* ─── Main Hero ─────────────────────────────────────────────────────── */}
      <section className="relative py-8 sm:py-16 lg:py-20 section-cream overflow-hidden">
        <div className="absolute top-0 right-0 w-[480px] h-[480px] bg-amber-100/25 rounded-full blur-3xl pointer-events-none -mr-32 -mt-16" />

        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">

            {/* ── Left: Brand Message ──────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col space-y-5 lg:pr-6"
            >
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-clay-600">
                The Herbal Collection
              </span>

              {/* Headline */}
              <h1 className="text-[2rem] sm:text-5xl lg:text-6xl font-serif font-bold text-teagreen-950 leading-[1.1] tracking-tight">
                Tea that tastes like{' '}
                <span className="italic font-normal text-clay-600">what&apos;s in it.</span>
              </h1>

              {/* Short description */}
              <p className="text-base sm:text-lg text-charcoal-800/70 font-sans leading-relaxed max-w-sm">
                Whole botanicals, thoughtfully blended across a collection of floral, citrus, herbal, and warming infusions.
              </p>

              <div className="flex items-center gap-3 text-sm font-semibold text-teagreen-950">
                <span className="h-2.5 w-2.5 rounded-full bg-clay-600" />
                <span>Real botanicals. Better everyday rituals.</span>
              </div>

              {/* Action & Trust Block */}
              <div className="space-y-3 pt-1">
                <div className="flex items-center gap-3">
                  <a
                    href="#shop"
                    className="min-h-11 inline-flex items-center justify-center text-xs sm:text-sm font-semibold text-charcoal-800/70 hover:text-teagreen-950 underline underline-offset-4 decoration-cream-400 transition-colors tracking-wide"
                  >
                    See the collection ↓
                  </a>
                </div>

                <p className="text-xs text-charcoal-800/60 font-medium tracking-wide pt-0.5">
                  ★★★★★ &nbsp;<span className="font-bold text-teagreen-950">4.9 / 5</span> — verified Amazon India customers
                </p>
              </div>
            </motion.div>

            {/* ── Right: Full-width banner carousel ───────────────────────────── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
              className="relative h-[30rem] overflow-hidden rounded-3xl border border-cream-300/80 bg-cream-50 sm:h-[36rem]"
            >
              <div className="relative h-full w-full overflow-hidden">
                {HERO_SLIDES.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 h-full w-full transition-all duration-700 ease-out ${
                      index === activeSlide ? 'translate-x-0 opacity-100' : index < activeSlide ? '-translate-x-4 opacity-0' : 'translate-x-4 opacity-0'
                    }`}
                  >
                    <div className={`relative h-full w-full overflow-hidden bg-gradient-to-br ${slide.bgClass}`}>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.85),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(16,17,18,0.08),transparent_30%)]" />

                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative h-[68%] w-[72%] rounded-[2rem] border border-white/40 bg-white/15 shadow-inner backdrop-blur-[1px]">
                          <div className={`absolute -top-5 left-8 h-28 w-20 rounded-[1.5rem] border border-white/40 ${slide.shapeClass} shadow-lg shadow-black/5`} />
                          <div className={`absolute right-8 top-10 h-36 w-24 rounded-[2rem] border border-white/40 ${slide.shapeClass} shadow-lg shadow-black/5`} />
                          <div className={`absolute bottom-10 left-1/2 h-24 w-28 -translate-x-1/2 rounded-[1.75rem] border border-white/40 ${slide.shapeClass} shadow-lg shadow-black/5`} />
                          <div className="absolute inset-x-10 bottom-12 h-2 rounded-full bg-white/40" />
                        </div>
                      </div>

                      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                        <div className="mb-3 inline-flex items-center rounded-full border border-white/60 bg-white/55 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-teagreen-950 shadow-sm backdrop-blur-sm">
                          {slide.label}
                        </div>
                        <h3 className="max-w-md text-2xl font-serif font-bold leading-tight text-teagreen-950 sm:text-3xl">
                          {slide.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-white/80 text-teagreen-950 shadow-md backdrop-blur-sm transition hover:bg-white"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={goToNext}
                className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-white/80 text-teagreen-950 shadow-md backdrop-blur-sm transition hover:bg-white"
                aria-label="Next slide"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              <div className="absolute inset-x-0 bottom-4 z-20 flex items-center justify-center gap-2">
                {HERO_SLIDES.map((slide, index) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setActiveSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      index === activeSlide ? 'w-8 bg-teagreen-900' : 'w-2.5 bg-white/80'
                    }`}
                  />
                ))}
              </div>
            </motion.div>

          </div>
        </Container>
      </section>

      {/* ─── Benefit Strip ─────────────────────────────────────────────────── */}
      <div className="border-t border-cream-300 bg-white py-3.5">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs font-semibold text-charcoal-800/60 tracking-wider uppercase">
            <span>100% Natural Botanicals</span>
            <span className="hidden sm:block text-cream-400">·</span>
            <span>25 Pyramid Bags per Pack</span>
            <span className="hidden sm:block text-cream-400">·</span>
            <span>Plant-Based Biodegradable</span>
          </div>
        </Container>
      </div>
    </>
  );
};
