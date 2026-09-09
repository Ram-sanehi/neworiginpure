import React from 'react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { MAIN_FEATURED_PRODUCT } from '../../data/products';
import { redirectToAmazon } from '../../lib/amazon';
import { Tag, Sparkles, ShieldCheck, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import { AmazonCtaImage } from '../ui/AmazonCtaImage';

export const LaunchOfferSection: React.FC = () => {
  const handleAmazonBuy = () => {
    redirectToAmazon(MAIN_FEATURED_PRODUCT.amazonUrl, 'launch-offer-cta', MAIN_FEATURED_PRODUCT.id);
  };

  return (
    <section className="py-10 sm:py-20 section-clay border-t border-cream-300/80 relative overflow-hidden">
      <Container size="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-cream-50 p-5 sm:p-12 rounded-3xl border border-clay-300/60 shadow-card text-center space-y-5 sm:space-y-6 relative"
        >
          {/* Pill Tag */}
          <div className="inline-flex items-center gap-2 bg-amber-100/90 text-amber-900 border border-amber-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>AMAZON INDIA LAUNCH EXCLUSIVE</span>
          </div>

          {/* Headline */}
          <div className="space-y-2 max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-teagreen-950 tracking-tight">
              Get yours direct on Amazon.
            </h2>
            <p className="text-sm sm:text-base text-charcoal-800/80 font-sans leading-relaxed">
              Order Origin Pure Chamomile Citrus (25 Pyramid Infusion Bags) today on Amazon with fast delivery and guaranteed fresh natural ingredients.
            </p>
          </div>

          {/* Features Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg mx-auto py-2 text-xs font-semibold text-charcoal-800">
            <div className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-cream-100">
              <Tag className="w-3.5 h-3.5 text-clay-600" />
              <span>Official Amazon Listing</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-cream-100">
              <Truck className="w-3.5 h-3.5 text-teagreen-700" />
              <span>Fast Amazon Delivery</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-cream-100">
              <ShieldCheck className="w-3.5 h-3.5 text-teagreen-700" />
              <span>Easy Amazon Returns</span>
            </div>
          </div>

          {/* CTA Action */}
          <div className="pt-2 max-w-sm mx-auto">
            <Button
              variant="clay"
              size="xl"
              fullWidth
              glow
              onClick={handleAmazonBuy}
              aria-label="Buy on Amazon"
              className="py-4 text-sm font-bold tracking-wider"
              data-track-cta="launch-offer-buy-amazon"
            >
              <AmazonCtaImage className="absolute inset-0 h-full w-full object-contain" />
            </Button>
          </div>

          <p className="text-[11px] text-charcoal-800/60 font-medium pt-1">
            Redirects directly to official Amazon product listing page.
          </p>
        </motion.div>
      </Container>
    </section>
  );
};
