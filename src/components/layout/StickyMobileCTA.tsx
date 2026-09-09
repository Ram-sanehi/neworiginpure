import React, { useState, useEffect } from 'react';
import { MAIN_FEATURED_PRODUCT } from '../../data/products';
import { redirectToAmazon } from '../../lib/amazon';
import { Button } from '../ui/Button';
import { AmazonCtaImage } from '../ui/AmazonCtaImage';
import { formatCurrency } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export const StickyMobileCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const product = MAIN_FEATURED_PRODUCT;

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAmazonBuy = () => {
    redirectToAmazon(product.amazonUrl, 'sticky-mobile-cta', product.id);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-30 md:hidden bg-cream-100/95 backdrop-blur-md border-t border-cream-300 shadow-2xl p-3 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))]"
        >
          <div className="flex flex-col gap-2.5 max-w-md mx-auto">
            {/* Left: Product Thumbnail & Name + Price */}
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-10 h-10 rounded-xl object-contain border border-cream-300 shrink-0 bg-sand-100 p-1"
              />
              <div className="min-w-0">
                <span className="font-serif font-bold text-xs text-teagreen-950 truncate block">
                  Origin Pure Chamomile Citrus
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-bold text-xs text-teagreen-900">
                    {formatCurrency(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-[10px] text-charcoal-800/50 line-through">
                      {formatCurrency(product.originalPrice)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Quick Buy on Amazon Button */}
            <Button
              variant="primary"
              size="sm"
              glow
              onClick={handleAmazonBuy}
              aria-label="Buy on Amazon"
              className="w-full py-2.5 px-4 text-xs font-bold shrink-0"
              data-track-cta="sticky-mobile-buy-amazon"
            >
              <AmazonCtaImage className="absolute inset-0 h-full w-full object-contain" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
