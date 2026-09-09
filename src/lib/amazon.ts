export const AMAZON_PRODUCT_URLS: Record<string, string> = {
  'hibiscus-berry-green-tea': 'https://www.amazon.in/dp/B0HG4LRXX1',
  'origin-pure-evening-calm': 'https://www.amazon.in/dp/B0HG4S9PD2',
  'origin-pure-fennel-harmony': 'https://www.amazon.in/dp/B0HG4NN2V7',
  'origin-pure-blue-pea': 'https://www.amazon.in/dp/B0HG9CJN2H',
  'origin-pure-chamomile-citrus': 'https://www.amazon.in/dp/B0HG9J3ZDX',
  'turmeric-gold-green-tea': 'https://www.amazon.in/dp/B0HG36XHC3',
  'citrus-vitality-moringa-lemongrass': 'https://www.amazon.in/dp/B0HG3CGBP5',
  'daily-green-classic-lemon-ginger': 'https://www.amazon.in/dp/B0HG1XQTMJ',
  'twin-tulsi-green-tea': 'https://www.amazon.in/dp/B0HG1Q7CT2'
};

export function getAmazonProductUrl(productId: string) {
  return AMAZON_PRODUCT_URLS[productId];
}

export function redirectToAmazon(amazonUrl?: string, ctaLocation?: string, productId?: string) {
  const targetUrl = (productId && getAmazonProductUrl(productId)) || amazonUrl || 'https://www.amazon.in/dp/B0HG9J3ZDX';
  
  if (typeof window !== 'undefined') {
    console.log(`[Analytics Track] Amazon CTA Clicked`, {
      ctaLocation: ctaLocation || 'unknown',
      productId: productId || 'origin-pure-chamomile-citrus',
      targetUrl
    });
  }

  window.open(targetUrl, '_blank', 'noopener,noreferrer');
}
