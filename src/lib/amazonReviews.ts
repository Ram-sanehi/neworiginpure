import { Review } from '../types';

export interface AmazonReviewSnapshot {
  rating: number;
  reviewCount: number;
  reviews: Review[];
}

interface AmazonReviewsResponse {
  rating?: unknown;
  reviewCount?: unknown;
  reviews?: unknown;
}

const REVIEWS_API_URL = import.meta.env.VITE_AMAZON_REVIEWS_API_URL as string | undefined;

function isReview(value: unknown): value is Review {
  if (!value || typeof value !== 'object') return false;

  const review = value as Partial<Review>;
  return (
    typeof review.id === 'string' &&
    typeof review.author === 'string' &&
    typeof review.rating === 'number' &&
    typeof review.date === 'string' &&
    typeof review.title === 'string' &&
    typeof review.comment === 'string' &&
    typeof review.verifiedBuyer === 'boolean'
  );
}

function getProductReviewsUrl(productId: string) {
  if (!REVIEWS_API_URL) return undefined;

  const url = new URL(REVIEWS_API_URL, window.location.origin);
  url.searchParams.set('productId', productId);
  return url.toString();
}

export async function fetchAmazonReviews(productId: string, signal?: AbortSignal): Promise<AmazonReviewSnapshot> {
  const url = getProductReviewsUrl(productId);
  if (!url) throw new Error('Amazon reviews API is not configured.');

  const response = await fetch(url, { signal, headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error(`Amazon reviews request failed with status ${response.status}.`);

  const data = (await response.json()) as AmazonReviewsResponse;
  const reviews = Array.isArray(data.reviews) ? data.reviews.filter(isReview) : [];

  if (typeof data.rating !== 'number' || typeof data.reviewCount !== 'number') {
    throw new Error('Amazon reviews response is missing rating or review count.');
  }

  return {
    rating: data.rating,
    reviewCount: data.reviewCount,
    reviews
  };
}