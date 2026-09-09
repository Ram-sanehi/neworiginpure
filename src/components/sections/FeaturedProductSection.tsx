import React from 'react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { Rating } from '../ui/Rating';
import { MAIN_FEATURED_PRODUCT } from '../../data/products';
import { redirectToAmazon } from '../../lib/amazon';
import { CheckCircle2, Thermometer, Clock, Sparkles } from 'lucide-react';
import { formatCurrency } from '../../lib/utils';
import { motion } from 'framer-motion';

import { ProductImageGallery } from '../ui/ProductImageGallery';
import { AmazonCtaImage } from '../ui/AmazonCtaImage';

export const FeaturedProductSection: React.FC = () => {
  const product = MAIN_FEATURED_PRODUCT;

  const handleAmazonBuy = () => {
    redirectToAmazon(product.amazonUrl, 'featured-product-cta', product.id);
  };

  return (
    <section id="details" className="py-8 sm:py-16 section-cream relative border-t border-cream-300/80">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center bg-cream-50 p-4 sm:p-8 rounded-3xl border border-cream-300/80 shadow-card">
          
          {/* Left Column: Product Visual Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 relative"
          >
            <ProductImageGallery images={product.images} productName={product.name} />

            {/* Brewing Instructions Box */}
            <div className="mt-4 p-4 rounded-2xl bg-sand-100 border border-cream-300 space-y-2">
              <div className="flex items-center gap-2 font-serif font-bold text-sm sm:text-base text-teagreen-950">
                <Sparkles className="w-4 h-4 text-clay-600" />
                <span>HOW TO BREW PERFECTLY</span>
              </div>
              <p className="text-xs sm:text-sm text-charcoal-800/85 leading-relaxed font-sans">
                Heat water to <strong className="text-teagreen-950 font-semibold">80–85°C</strong>. Place one infusion bag in the water and steep for <strong className="text-teagreen-950 font-semibold">3–5 minutes</strong>. Dip the bag gently 4–5 times, remove the bag, and enjoy. Honey or sugar can be added if preferred.
              </p>
              
              <div className="flex items-center gap-4 text-xs font-bold text-teagreen-900 pt-0.5">
                <span className="flex items-center gap-1">
                  <Thermometer className="w-3.5 h-3.5 text-clay-600" />
                  80–85°C Water
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-teagreen-700" />
                  Steep 3–5 Mins
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Full Product Details & Amazon CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 space-y-4"
          >
            {/* Header info & Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Rating rating={product.rating} reviewCount={product.reviewCount} size="sm" />
                <span className="text-xs text-teagreen-800 font-bold bg-teagreen-100 px-2 py-0.5 rounded">
                  25 Servings Pack
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-teagreen-950 leading-tight">
                {product.name}
              </h2>

              <div className="flex items-baseline gap-3 pt-1">
                <span className="font-serif font-bold text-2xl sm:text-3xl text-teagreen-950">
                  {formatCurrency(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-charcoal-800/50 line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
                <span className="text-xs font-bold text-clay-600 bg-clay-100 px-2.5 py-1 rounded-full">
                  Save 20%
                </span>
              </div>
            </div>

            {/* Product Description */}
            <p className="text-sm sm:text-base text-charcoal-800/85 leading-relaxed font-sans">
              {product.fullDescription}
            </p>

            {/* Product Details Pills */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-bold uppercase tracking-wider text-charcoal-800 block">
                PRODUCT SPECIFICATIONS
              </span>
              <div className="flex flex-wrap gap-2 text-xs font-semibold text-teagreen-900">
                <span className="bg-cream-200/80 border border-cream-300 px-3 py-1 rounded-full">
                  • 25 Pyramid Bags (2g each)
                </span>
                <span className="bg-cream-200/80 border border-cream-300 px-3 py-1 rounded-full">
                  • Biodegradable Plant Bags
                </span>
                <span className="bg-cream-200/80 border border-cream-300 px-3 py-1 rounded-full">
                  • No Artificial Colours/Flavours
                </span>
                <span className="bg-cream-200/80 border border-cream-300 px-3 py-1 rounded-full">
                  • Preservative-Free
                </span>
              </div>
            </div>

            {/* Amazon Purchase CTA Button */}
            <div className="space-y-3 pt-3 border-t border-cream-200/80">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                glow
                onClick={handleAmazonBuy}
                aria-label="Buy on Amazon"
                className="py-4 text-sm sm:text-base font-bold tracking-wider"
                data-track-cta="featured-buy-amazon"
              >
                <AmazonCtaImage className="absolute inset-0 h-full w-full object-contain" />
              </Button>

              <p className="text-center text-xs text-charcoal-800/70 font-medium">
                Official Amazon Listing • Fast Delivery • Easy Returns
              </p>
            </div>

          </motion.div>
        </div>
      </Container>
    </section>
  );
};
