import React, { useState } from 'react';
import { Container } from '../ui/Container';
import { PRODUCTS } from '../../data/products';
import { Product } from '../../types';
import { ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../../lib/animations';
import { AmazonCtaImage } from '../ui/AmazonCtaImage';

const ProductQuickViewModal: React.FC<{ product: Product; onClose: () => void }> = ({ product, onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-950/60 p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-cream-300 bg-cream-50 shadow-2xl"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-teagreen-950 shadow-sm transition-colors hover:bg-cream-100"
            aria-label="Close quick view"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="p-5 sm:p-6">
            <div className="overflow-hidden rounded-2xl border border-cream-200 bg-white">
              <img src={product.images[0]} alt={product.name} className="h-72 w-full object-contain p-4" loading="lazy" />
            </div>

            <div className="mt-5 space-y-3">
              <h3 className="font-serif text-2xl font-bold text-teagreen-950 sm:text-[2rem]">
                {product.name}
              </h3>

              <p className="text-sm leading-relaxed text-charcoal-800/75">
                {product.shortDescription}
              </p>

              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-clay-600">
                  Key Benefits
                </p>
                <ul className="space-y-2">
                  {product.keyBenefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2 text-sm text-charcoal-800/80">
                      <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-teagreen-800" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={product.amazonUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Buy on Amazon"
                className="relative inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[#131A22] px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#FF9900] transition-colors hover:bg-[#232F3E]"
              >
                <AmazonCtaImage className="absolute inset-0 h-full w-full object-contain" />
              </a>

              <a
                href={`/products/${product.id}`}
                className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full border border-teagreen-800 px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-teagreen-950 transition-colors hover:bg-cream-100"
              >
                <span>View More Details</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const ProductCard: React.FC<{ product: Product; onQuickView: (product: Product) => void }> = ({ product, onQuickView }) => {
  return (
    <motion.article
      variants={fadeInUp}
      onClick={() => onQuickView(product)}
      className="group flex h-full cursor-pointer flex-col justify-between rounded-3xl border border-cream-300/80 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-card sm:p-4"
    >
      <div className="overflow-hidden rounded-2xl border border-cream-200 bg-cream-50">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-56 w-full object-contain p-4 sm:h-64"
          loading="lazy"
        />
      </div>

      <div className="mt-4 space-y-3">
        <h3 className="font-serif text-xl font-bold leading-tight text-teagreen-950 sm:text-2xl">
          {product.name}
        </h3>

        <p className="text-sm leading-relaxed text-charcoal-800/75">
          {product.shortDescription}
        </p>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <a
          href={product.amazonUrl}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          aria-label="Buy on Amazon"
          className="relative inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[#131A22] px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#FF9900] transition-colors hover:bg-[#232F3E]"
        >
          <AmazonCtaImage className="absolute inset-0 h-full w-full object-contain" />
        </a>

        <a
          href={`/products/${product.id}`}
          onClick={(e) => e.stopPropagation()}
          className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full border border-teagreen-800 px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-teagreen-950 transition-colors hover:bg-cream-100"
        >
          <span>View Details</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </motion.article>
  );
};

export const ProductDiscoverySection: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <>
      <section id="shop" className="py-14 sm:py-20 section-cream">
        <Container>
          <div className="mx-auto mb-10 max-w-2xl space-y-2.5 text-center sm:mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-clay-600">
              The Collection
            </span>
            <h2 className="text-3xl font-serif font-bold tracking-tight text-teagreen-950 sm:text-5xl">
              Find your cup.
            </h2>
            <p className="text-sm text-charcoal-800/65 sm:text-base">
              Nine blends. Natural botanicals. Plant-based pyramid bags.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
          >
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} onQuickView={setSelectedProduct} />
            ))}
          </motion.div>
        </Container>
      </section>

      {selectedProduct && (
        <ProductQuickViewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </>
  );
};

