import React from 'react';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Header } from './components/layout/Header';
import { HeroSection } from './components/sections/HeroSection';
import { QuickBenefitsSection } from './components/sections/QuickBenefitsSection';
import { ProductDiscoverySection } from './components/sections/ProductDiscoverySection';
import { FeaturedProductSection } from './components/sections/FeaturedProductSection';
import { CustomerReviewsSection } from './components/sections/CustomerReviewsSection';
import { ImmersiveIngredientsSection } from './components/sections/ImmersiveIngredientsSection';
import { BotanicalCollectionSection } from './components/sections/BotanicalCollectionSection';
import { BrandStorySection } from './components/sections/BrandStorySection';
import { AmazonTrustSection } from './components/sections/AmazonTrustSection';
import { InstagramSection } from './components/sections/InstagramSection';
import { FAQSection } from './components/sections/FAQSection';
import { FinalCTASection } from './components/sections/FinalCTASection';
import { StickyMobileCTA } from './components/layout/StickyMobileCTA';
import { Footer } from './components/layout/Footer';
import { ProductDetailPage } from './components/pages/ProductDetailPage';
import { PRODUCTS } from './data/products';

export function App() {
  const productId = window.location.pathname.match(/^\/products\/([^/]+)\/?$/)?.[1];
  const detailProduct = productId ? PRODUCTS.find((product) => product.id === productId) : undefined;

  if (detailProduct) {
    return <ProductDetailPage product={detailProduct} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-charcoal-900 selection:bg-teagreen-800 selection:text-cream-50">
      {/* Top Meta Ads Announcement Banner */}
      <AnnouncementBar />

      {/* Minimal D2C Navigation Header */}
      <Header />

      {/* Complete Landing Page Funnel -> Direct Amazon Listing Redirect */}
      <main className="flex-grow">
        {/* Above-the-fold Hero */}
        <HeroSection />

        {/* Quick Benefits Strip */}
        <QuickBenefitsSection />

        {/* Product Discovery Showcase */}
        <ProductDiscoverySection />

        {/* Featured Flagship Product Deep Dive */}
        <FeaturedProductSection />

        {/* Realistic Customer Social Proof */}
        <CustomerReviewsSection />

        {/* Brand values and sourcing story */}
        <ImmersiveIngredientsSection />

        {/* Sole collection-wide ingredient library */}
        <BotanicalCollectionSection />

        {/* Human Founder Story */}
        <BrandStorySection />

        {/* Amazon confidence and community */}
        <AmazonTrustSection />
        <InstagramSection />

        {/* Frequently Asked Questions */}
        <FAQSection />

        {/* Final Conversion CTA */}
        <FinalCTASection />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Persistent Mobile Bottom Buy Bar -> Amazon Listing */}
      <StickyMobileCTA />
    </div>
  );
}

export default App;
