import { products } from "@/lib/products";

export const productCategories: Record<string, string> = {
  "Butterfly Pea Blue Tea": "CALMING",
  "Chamomile Lemon": "CALMING",
  "Clove Lemon": "GROUNDING",
  "Hibiscus Lemon Balm": "REFRESHING",
  "Lemon Fennel": "DIGESTIVE",
  "Lemon Ginger": "DIGESTIVE",
  "Lemon Tulsi": "GROUNDING",
  "Lemon Turmeric": "GROUNDING",
  "Moringa Lemongrass": "ENERGIZING",
};

export const categories = ["ALL", "CALMING", "CITRUS", "GROUNDING", "DIGESTIVE", "REFRESHING", "ENERGIZING"] as const;

export const categoryStyles: Record<string, string> = {
  CALMING: "#EEF5F2",
  CITRUS: "#F8F1D8",
  GROUNDING: "#F3E8DB",
  DIGESTIVE: "#EEF1DE",
  REFRESHING: "#F6E6E5",
  ENERGIZING: "#E8F0DD",
};

export const catalogDetails: Record<string, { rating: string; reviews: number; price: string; badges?: string[] }> = {
  "Butterfly Pea Blue Tea": { rating: "4.6", reviews: 238, price: "₹399", badges: ["Caffeine-Free"] },
  "Chamomile Lemon": { rating: "4.6", reviews: 162, price: "₹399", badges: ["Caffeine-Free"] },
  "Clove Lemon": { rating: "4.5", reviews: 119, price: "₹399" },
  "Hibiscus Lemon Balm": { rating: "4.7", reviews: 207, price: "₹399", badges: ["Bestseller"] },
  "Lemon Fennel": { rating: "4.5", reviews: 131, price: "₹399" },
  "Lemon Ginger": { rating: "4.8", reviews: 286, price: "₹399", badges: ["Bestseller"] },
  "Lemon Tulsi": { rating: "4.6", reviews: 176, price: "₹399", badges: ["Caffeine-Free"] },
  "Lemon Turmeric": { rating: "4.7", reviews: 154, price: "₹399", badges: ["New"] },
  "Moringa Lemongrass": { rating: "4.8", reviews: 312, price: "₹399", badges: ["Bestseller"] },
};

export function getProductsByCategory(category: string) {
  if (category === "ALL") return products;
  return products.filter((product) => productCategories[product.name] === category);
}

export function getProductDetails(productName: string) {
  return catalogDetails[productName] ?? { rating: "4.6", reviews: 100, price: "₹399", badges: [] };
}

export function getProductCategory(productName: string) {
  return productCategories[productName] ?? "BOTANICAL";
}
