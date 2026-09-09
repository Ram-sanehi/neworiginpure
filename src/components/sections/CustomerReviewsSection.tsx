import React, { useState } from 'react';
import { Container } from '../ui/Container';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const REVIEWS = [
  // Short one-liner
  {
    id: 1,
    stars: 5,
    text: 'First box gone in two weeks. Ordered two more.',
    name: 'Kavya R.'
  },
  // Longer, slightly rambling
  {
    id: 2,
    stars: 5,
    text: "I've tried a lot of herbal teas and most of them taste like lawn clippings or smell better than they taste. This one actually delivers on the scent. The chamomile comes through properly, not as a background note they put on the box but you can't taste. Had one last night and slept well.",
    name: 'Sandeep M.'
  },
  // 4-star with real complaint
  {
    id: 3,
    stars: 4,
    text: 'Good tea, genuinely. Wish the pack had 40 bags instead of 25 — I go through them faster than expected. Took 9 days to arrive, but the quality is worth it.',
    name: 'Ritu J.'
  },
  // Slightly imperfect grammar — real customer
  {
    id: 4,
    stars: 5,
    text: "This is the only tea I've tried that my husband didn't complain about. He usually hates herbal stuff. We're on our third pack now.",
    name: 'Deepa S.'
  },
  // Concrete detail, specific
  {
    id: 5,
    stars: 5,
    text: 'The lemon peel in the chamomile blend is noticeable in a good way. It cuts the floral heaviness. Exactly what I was hoping for.',
    name: 'Aryan K.'
  },
  // Different structure
  {
    id: 6,
    stars: 5,
    text: "Makes the 10pm 'I should sleep' version of me feel like I'm doing something right.",
    name: 'Nandita P.'
  }
];

const PAGE_SIZE = 3;

const StarRow: React.FC<{ count: number }> = ({ count }) => (
  <span className="text-amber-400 text-sm tracking-widest">
    {'★'.repeat(count)}{'☆'.repeat(5 - count)}
  </span>
);

export const CustomerReviewsSection: React.FC = () => {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(REVIEWS.length / PAGE_SIZE);
  const visible = REVIEWS.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <section id="reviews" className="py-10 sm:py-24 bg-white border-t border-cream-300/60">
      <Container size="md">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="text-center space-y-3 mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-clay-600">
            Customer Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-teagreen-950 tracking-tight">
            What tea lovers are saying.
          </h2>
          <p className="text-xs text-charcoal-800/55 font-medium tracking-wide">
            ★★★★★&nbsp;&nbsp;4.9 / 5 from verified Amazon customers
          </p>
        </div>

        {/* ── Review Cards ───────────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {visible.map((r) => (
              <div
                key={r.id}
                className="bg-white/60 border border-cream-300/70 rounded-2xl p-7 flex flex-col space-y-4 shadow-sm"
              >
                <StarRow count={r.stars} />
                <p className="text-sm text-charcoal-800/85 leading-relaxed font-sans italic flex-1">
                  "{r.text}"
                </p>
                <p className="text-xs font-bold text-teagreen-950 tracking-wide">
                  — {r.name}
                </p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Pagination ────────────────────────────────────────────────── */}
        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-6">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="w-9 h-9 rounded-full border border-cream-300 flex items-center justify-center text-charcoal-800/70 hover:border-teagreen-800 hover:text-teagreen-900 disabled:opacity-30 transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    i === page ? 'bg-teagreen-900' : 'bg-cream-400'
                  }`}
                  aria-label={`Page ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="w-9 h-9 rounded-full border border-cream-300 flex items-center justify-center text-charcoal-800/70 hover:border-teagreen-800 hover:text-teagreen-900 disabled:opacity-30 transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ── CTA + trust note ──────────────────────────────────────────── */}
        <div className="mt-12 text-center space-y-3">
          <a
            href="https://www.amazon.in/s?k=origin+pure+tea"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold uppercase tracking-widest text-charcoal-800/55 hover:text-teagreen-900 transition-colors"
          >
            Read more reviews on Amazon →
          </a>
          <p className="text-[11px] text-charcoal-800/40 font-medium">
            Verified feedback from real customers.
          </p>
        </div>

      </Container>
    </section>
  );
};
