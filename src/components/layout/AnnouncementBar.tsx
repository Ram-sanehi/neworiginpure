import React from 'react';
import { redirectToAmazon } from '../../lib/amazon';
import { MAIN_FEATURED_PRODUCT } from '../../data/products';
import { AmazonCtaImage } from '../ui/AmazonCtaImage';

export const AnnouncementBar: React.FC = () => {
  const handleAmazonBuy = () => {
    redirectToAmazon(MAIN_FEATURED_PRODUCT.amazonUrl, 'announcement-bar-cta', MAIN_FEATURED_PRODUCT.id);
  };

  return (
    <div className="bg-teagreen-950 text-cream-100 py-2 px-4 text-xs font-medium text-center relative z-50 border-b border-teagreen-900">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
        <span>
          Now available on Amazon India — natural herbal infusions shipped across the country.
        </span>
        <button
          onClick={handleAmazonBuy}
          aria-label="Buy on Amazon"
          className="ml-1 inline-flex items-center focus:outline-none"
        >
          <AmazonCtaImage className="h-7 w-auto object-contain" />
        </button>
      </div>
    </div>
  );
};
