import React, { useState, useEffect } from 'react';
import { Leaf, Menu, X, ArrowRight } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';
import { redirectToAmazon } from '../../lib/amazon';
import { MAIN_FEATURED_PRODUCT } from '../../data/products';
import { motion, AnimatePresence } from 'framer-motion';
import { AmazonCtaImage } from '../ui/AmazonCtaImage';

import brandLogo from '../../images/logo.jpeg';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAmazonBuy = () => {
    redirectToAmazon(MAIN_FEATURED_PRODUCT.amazonUrl, 'header-primary-cta', MAIN_FEATURED_PRODUCT.id);
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-all duration-300 backdrop-blur-md border-b',
        isScrolled
          ? 'bg-cream-100/90 shadow-soft py-3 border-cream-300/80'
          : 'bg-cream-100/60 py-3 sm:py-4 border-cream-200/50'
      )}
    >
      <Container>
        <div className="flex items-center justify-between">
          {/* Left: Origin Pure Brand Logo & Name */}
          <a href="#" className="flex items-center gap-3 group">
            <img
              src={brandLogo}
              alt="Origin Pure Logo"
              className="h-9 sm:h-10 w-auto rounded-lg object-contain transition-transform duration-300 group-hover:scale-105 shadow-xs"
            />
            <div className="flex flex-col">
              <span className="font-serif font-bold text-lg sm:text-xl tracking-tight text-teagreen-950 leading-none">
                Origin Pure
              </span>
              <span className="hidden sm:block text-[9px] tracking-widest uppercase text-clay-600 font-bold mt-0.5">
                Natural Botanicals
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 font-sans font-medium text-sm text-charcoal-800 tracking-wide">
            <a
              href="#shop"
              className="hover:text-teagreen-800 transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-teagreen-800 after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              Shop
            </a>
            <a
              href="#story"
              className="hover:text-teagreen-800 transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-teagreen-800 after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              Our Story
            </a>
            <a
              href="#why-us"
              className="hover:text-teagreen-800 transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-teagreen-800 after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              Why Us
            </a>
            <a
              href="#reviews"
              className="hover:text-teagreen-800 transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-teagreen-800 after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              Reviews
            </a>
          </nav>

          {/* Desktop Right Actions: Buy on Amazon CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="primary"
              size="sm"
              onClick={handleAmazonBuy}
              aria-label="Buy on Amazon"
              data-track-cta="header-buy-amazon"
            >
              <AmazonCtaImage className="absolute inset-0 h-full w-full object-contain" />
            </Button>
          </div>

          {/* Mobile Right Actions: Buy Button & Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={handleAmazonBuy}
              aria-label="Buy on Amazon"
              className="min-h-11 px-3 text-[11px] font-bold"
              data-track-cta="mobile-header-buy-amazon"
            >
              <AmazonCtaImage className="absolute inset-0 h-full w-full object-contain" />
            </Button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-h-11 min-w-11 p-2 text-teagreen-950 hover:text-teagreen-800 focus:outline-none flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden md:hidden pt-4 pb-4 border-t border-cream-300/60 mt-3 space-y-3 font-sans font-medium text-base text-charcoal-900"
            >
              <a
                href="#shop"
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-11 items-center px-3 py-2 rounded-xl hover:bg-cream-200 text-teagreen-950 font-semibold"
              >
                Shop Collection
              </a>
              <a
                href="#story"
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-11 items-center px-3 py-2 rounded-xl hover:bg-cream-200"
              >
                Our Story
              </a>
              <a
                href="#why-us"
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-11 items-center px-3 py-2 rounded-xl hover:bg-cream-200"
              >
                Why Us
              </a>
              <a
                href="#reviews"
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-11 items-center px-3 py-2 rounded-xl hover:bg-cream-200"
              >
                Customer Reviews
              </a>

              <div className="pt-2">
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleAmazonBuy();
                  }}
                  aria-label="Buy on Amazon"
                >
                  <AmazonCtaImage className="absolute inset-0 h-full w-full object-contain" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </header>
  );
};
