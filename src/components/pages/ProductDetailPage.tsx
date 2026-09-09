import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Clock3, ExternalLink, Leaf, Thermometer } from 'lucide-react';
import { Product } from '../../types';
import { Container } from '../ui/Container';
import { ProductImageGallery } from '../ui/ProductImageGallery';
import { AmazonCtaImage } from '../ui/AmazonCtaImage';
import { PRODUCTS } from '../../data/products';
import { fetchAmazonReviews, AmazonReviewSnapshot } from '../../lib/amazonReviews';

interface ProductDetailPageProps {
  product: Product;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product }) => {
  const productIndex = PRODUCTS.findIndex((item) => item.id === product.id);
  const previousProduct = PRODUCTS[(productIndex - 1 + PRODUCTS.length) % PRODUCTS.length];
  const nextProduct = PRODUCTS[(productIndex + 1) % PRODUCTS.length];
  const relatedProducts = PRODUCTS.filter((item) => item.id !== product.id).slice(0, 3);
  const [reviewSnapshot, setReviewSnapshot] = useState<AmazonReviewSnapshot | null>(null);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewsUnavailable, setReviewsUnavailable] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setReviewsLoading(true);
    setReviewsUnavailable(false);
    setReviewSnapshot(null);

    fetchAmazonReviews(product.id, controller.signal)
      .then(setReviewSnapshot)
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setReviewsUnavailable(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setReviewsLoading(false);
      });

    return () => controller.abort();
  }, [product.id]);

  return (
    <main className="min-h-screen bg-cream-50 py-10 sm:py-16">
      <Container>
        <a
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-teagreen-950 transition-colors hover:text-clay-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </a>

        <section className="grid grid-cols-1 gap-8 rounded-3xl border border-cream-300 bg-white p-5 shadow-card sm:p-8 lg:grid-cols-2 lg:gap-12">
          <ProductImageGallery images={product.images} productName={product.name} />

          <div className="flex flex-col justify-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-clay-600">
              {product.badge || 'Tea Collection'}
            </p>
            <h1 className="mt-3 font-serif text-3xl font-bold leading-tight text-teagreen-950 sm:text-5xl">
              {product.name}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-charcoal-800/75">
              {product.fullDescription}
            </p>

            <a
              href={product.amazonUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Buy on Amazon"
              className="relative mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#131A22] px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#FF9900] transition-colors hover:bg-[#232F3E]"
            >
              <AmazonCtaImage className="absolute inset-0 h-full w-full object-contain" />
            </a>
          </div>
        </section>

        <section className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <DetailSection title="Benefits">
            <ul className="grid gap-3 sm:grid-cols-2">
              {product.keyBenefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2 rounded-2xl bg-teagreen-50 px-4 py-3 text-sm text-charcoal-800/80">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-teagreen-800" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </DetailSection>

          <DetailSection title="Ingredients">
            <div className="flex flex-wrap gap-2">
              {product.ingredients.map((ingredient) => (
                <span key={ingredient} className="inline-flex items-center gap-2 rounded-full border border-cream-300 bg-cream-100 px-3 py-2 text-sm font-semibold text-teagreen-950">
                  <Leaf className="h-3.5 w-3.5 text-teagreen-800" />
                  {ingredient}
                </span>
              ))}
            </div>
          </DetailSection>

          <DetailSection title="Brewing Instructions">
            <p className="text-sm leading-relaxed text-charcoal-800/75">
              Heat water to <strong className="text-teagreen-950">{product.temperature}</strong>. Place one pyramid bag in the water and steep for <strong className="text-teagreen-950">{product.steepTime}</strong>. Remove before serving and sweeten to taste if desired.
            </p>
            <div className="mt-5 flex flex-wrap gap-3 text-xs font-bold text-teagreen-950">
              <span className="inline-flex items-center gap-2 rounded-full bg-sand-100 px-3 py-2"><Thermometer className="h-4 w-4 text-clay-600" /> {product.temperature}</span>
              <span className="inline-flex items-center gap-2 rounded-full bg-sand-100 px-3 py-2"><Clock3 className="h-4 w-4 text-clay-600" /> {product.steepTime}</span>
            </div>
          </DetailSection>

          <DetailSection title="Product Information">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
              <ProductFact label="Pack size" value={`${product.servingsPerContainer} servings`} />
              <ProductFact label="Caffeine" value={product.caffeineLevel} />
              <ProductFact label="Category" value={product.category} />
              <ProductFact label="Format" value="Pyramid tea bags" />
            </dl>
          </DetailSection>
        </section>

        <DetailSection title="Amazon Reviews" className="mt-8">
          {reviewsLoading && <ReviewLoadingState />}
          {!reviewsLoading && reviewSnapshot && (
            <>
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-serif text-3xl font-bold text-teagreen-950">{reviewSnapshot.rating.toFixed(1)} / 5</p>
                  <p className="mt-1 text-sm text-charcoal-800/65">{reviewSnapshot.reviewCount.toLocaleString()} reviews on Amazon</p>
                </div>
                <a href={product.amazonUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-teagreen-800 px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-teagreen-950 transition-colors hover:bg-cream-100">
                  Read on Amazon <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
              {reviewSnapshot.reviews.length > 0 ? (
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {reviewSnapshot.reviews.map((review) => (
                    <blockquote key={review.id} className="rounded-2xl border border-cream-300 bg-cream-100 p-4">
                      <p className="text-sm leading-relaxed text-charcoal-800/80">&ldquo;{review.comment}&rdquo;</p>
                      <cite className="mt-3 block text-xs font-bold not-italic text-teagreen-950">{review.author} · {review.verifiedBuyer ? 'Verified buyer' : 'Amazon customer'}</cite>
                    </blockquote>
                  ))}
                </div>
              ) : (
                <p className="mt-6 text-sm leading-relaxed text-charcoal-800/70">The rating is available, but customer review details are not available yet.</p>
              )}
            </>
          )}
          {!reviewsLoading && reviewsUnavailable && (
            <div className="rounded-2xl border border-cream-300 bg-cream-100 p-5">
              <div className="mb-4 grid grid-cols-2 gap-4 sm:max-w-sm">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-clay-600">Rating</p>
                  <p className="mt-1 font-serif text-2xl font-bold text-teagreen-950">Unavailable</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-clay-600">Review Count</p>
                  <p className="mt-1 font-serif text-2xl font-bold text-teagreen-950">Unavailable</p>
                </div>
              </div>
              <p className="font-semibold text-teagreen-950">Customer reviews are temporarily unavailable.</p>
              <p className="mt-1 text-sm leading-relaxed text-charcoal-800/70">Please visit the Amazon listing for the latest rating and review count.</p>
              <a href={product.amazonUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-teagreen-950 underline decoration-clay-600 underline-offset-4 hover:text-clay-600">
                View reviews on Amazon <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          )}
        </DetailSection>

        <section className="mt-8">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-clay-600">Keep exploring</p>
              <h2 className="mt-2 font-serif text-2xl font-bold text-teagreen-950 sm:text-3xl">Related Products</h2>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {relatedProducts.map((relatedProduct) => (
              <a key={relatedProduct.id} href={`/products/${relatedProduct.id}`} className="group rounded-3xl border border-cream-300 bg-white p-3 shadow-sm transition-all hover:-translate-y-1 hover:shadow-card">
                <div className="overflow-hidden rounded-2xl bg-cream-50">
                  <img src={relatedProduct.images[0]} alt={relatedProduct.name} className="h-48 w-full object-contain p-4" loading="lazy" />
                </div>
                <h3 className="mt-4 px-1 font-serif text-lg font-bold leading-tight text-teagreen-950 group-hover:text-clay-600">{relatedProduct.name}</h3>
              </a>
            ))}
          </div>
        </section>

        <nav className="mt-10 flex flex-col gap-3 border-t border-cream-300 pt-6 sm:flex-row sm:items-center sm:justify-between" aria-label="Product navigation">
          <a href={`/products/${previousProduct.id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-teagreen-950 hover:text-clay-600"><ArrowLeft className="h-4 w-4" /> Previous Product</a>
          <a href={`/products/${nextProduct.id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-teagreen-950 hover:text-clay-600">Next Product <ArrowRight className="h-4 w-4" /></a>
        </nav>
      </Container>
    </main>
  );
};

const DetailSection: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className = '' }) => (
  <section className={`rounded-3xl border border-cream-300 bg-white p-5 shadow-sm sm:p-7 ${className}`}>
    <h2 className="mb-5 font-serif text-2xl font-bold text-teagreen-950">{title}</h2>
    {children}
  </section>
);

const ProductFact: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="border-b border-cream-200 pb-3">
    <dt className="text-[10px] font-bold uppercase tracking-[0.18em] text-clay-600">{label}</dt>
    <dd className="mt-1 font-semibold capitalize text-teagreen-950">{value}</dd>
  </div>
);

const ReviewLoadingState: React.FC = () => (
  <div className="animate-pulse space-y-5" aria-label="Loading Amazon reviews" role="status">
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-2">
        <div className="h-9 w-28 rounded bg-cream-200" />
        <div className="h-4 w-40 rounded bg-cream-200" />
      </div>
      <div className="h-11 w-40 rounded-full bg-cream-200" />
    </div>
    <div className="grid gap-4 md:grid-cols-2">
      <div className="h-28 rounded-2xl bg-cream-100" />
      <div className="h-28 rounded-2xl bg-cream-100" />
    </div>
    <span className="sr-only">Loading customer reviews from Amazon</span>
  </div>
);