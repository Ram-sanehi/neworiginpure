export type ProductReview = {
  name: string;
  productName: string;
  rating: number;
  reviewText: string;
  date: string;
};

export const productReviews: ProductReview[] = [
  { name: "Maya R.", productName: "Moringa Lemongrass", rating: 5, reviewText: "I look forward to this every evening. It feels light, clean, and calming without being overly sweet.", date: "May 2026" },
  { name: "Alex P.", productName: "Lemon Ginger", rating: 5, reviewText: "The citrus notes are bright and the ginger gives it a really grounding finish. It has become my daily go-to after lunch.", date: "Apr 2026" },
  { name: "Nina S.", productName: "Lemon Tulsi", rating: 4, reviewText: "Smooth, fresh, and surprisingly soothing. I enjoy it both hot and iced, and it tastes clean without any artificial aftertaste.", date: "Mar 2026" },
  { name: "Derek L.", productName: "Lemon Fennel", rating: 5, reviewText: "This is one of the few teas that feels energizing but still calming. The lemongrass flavor is crisp and inviting.", date: "Feb 2026" },
  { name: "Priya V.", productName: "Chamomile Lemon", rating: 4, reviewText: "Great flavor and easy to steep. I especially like the citrus brightness and the fact that it feels gentle on the stomach.", date: "Jan 2026" },
  { name: "Sam K.", productName: "Hibiscus Lemon Balm", rating: 5, reviewText: "Beautiful taste and a noticeable wellness feel. It sits well in my routine and tastes far more premium than expected.", date: "Dec 2025" },
  { name: "Lena T.", productName: "Butterfly Pea Blue Tea", rating: 5, reviewText: "This tea feels premium from the first sip. The floral brightness is clean and the butterfly pea finish makes it feel deeply restorative.", date: "Nov 2025" },
  { name: "Jordan M.", productName: "Clove Lemon", rating: 4, reviewText: "I like how gentle it is on the stomach and how fresh it tastes without any bitterness. The clove and lemon really stand out.", date: "Oct 2025" },
  { name: "Harper W.", productName: "Lemon Turmeric", rating: 5, reviewText: "The golden turmeric warmth is perfectly balanced with citrus. It feels grounding and bright at the same time.", date: "Sep 2025" },
  { name: "Elliot B.", productName: "Moringa Lemongrass", rating: 5, reviewText: "A crisp, fresh ritual I genuinely look forward to. The lemongrass keeps it light and the moringa makes it feel deeply clean.", date: "Aug 2025" },
];
