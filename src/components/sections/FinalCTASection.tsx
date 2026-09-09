import React from 'react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { MAIN_FEATURED_PRODUCT } from '../../data/products';
import { redirectToAmazon } from '../../lib/amazon';
import { ShieldCheck, Star, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';
import { AmazonCtaImage } from '../ui/AmazonCtaImage';

export const FinalCTASection: React.FC = () => {
  const handleAmazonBuy = () => {
    redirectToAmazon(MAIN_FEATURED_PRODUCT.amazonUrl, 'final-cta', MAIN_FEATURED_PRODUCT.id);
  };

  return (
    <section className="py-12 sm:py-28 section-dark relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teagreen-800/20 rounded-full blur-3xl pointer-events-none" />

      <Container size="md">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-teagreen-900/80 border border-teagreen-800/90 rounded-3xl p-5 sm:p-14 text-center space-y-6 sm:space-y-8 shadow-2xl overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none">
            <img src={MAIN_FEATURED_PRODUCT.images[0]} alt="" className="w-full h-full object-cover" />
          </div>

          <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-teagreen-950/80 text-amber-300 border border-teagreen-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <Leaf className="w-3.5 h-3.5" />
              <span>Available on Amazon India</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-cream-50 leading-tight tracking-tight">
              Pick your blend. Try a pack.
            </h2>

            <p className="text-base sm:text-lg text-cream-200/80 font-sans leading-relaxed">
              Four herbal infusions. 25 pyramid bags each. Delivered via Amazon.
            </p>
          </div>

          <div className="relative z-10 pt-2 max-w-md mx-auto space-y-4">
            <Button
              variant="primary"
              size="xl"
              fullWidth
              glow
              onClick={handleAmazonBuy}
              aria-label="Buy on Amazon"
              className="py-4 text-base font-bold tracking-wider text-[#FF9900] bg-[#131A22] hover:bg-[#232F3E] border border-[#FF9900] shadow-xl"
              data-track-cta="final-buy-amazon"
            >
              <AmazonCtaImage className="absolute inset-0 h-full w-full object-contain" />
            </Button>

            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-cream-300/75 font-medium pt-1">
              <span className="flex items-center gap-1 text-amber-300 font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-300" />
                4.9 / 5 — Amazon customers
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-teagreen-400" />
                Amazon return policy applies
              </span>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};
