export type ProductIngredient = {
  name: string;
  note: string;
};

export type ProductFact = {
  label: string;
  value: string;
};

export type ProductImageSet = {
  hero: string;
  ingredients: string;
  brewSteps: string;
  specs: string;
  gallery: string[];
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  amazonUrl: string;
  color?: string;
  ingredients: ProductIngredient[];
  facts: ProductFact[];
  images: ProductImageSet;
};

const PRODUCT_FOLDER_MAP: Record<string, string> = {
  "Butterfly Pea Blue Tea": "ButterflyPea",
  "Chamomile Lemon": "ChamomileLemon",
  "Clove Lemon": "CloveLemon",
  "Hibiscus Lemon Balm": "HibiscusLemonBalm",
  "Lemon Fennel": "LemonFennel",
  "Lemon Ginger": "LemonGinger",
  "Lemon Tulsi": "LemonTulsi",
  "Lemon Turmeric": "LemonTurmeric",
  "Moringa Lemongrass": "MoringaLemonGrass",
};

export function buildProductImageSet(folderName: string): ProductImageSet {
  const gallery = [1, 2, 3, 4].map((index) => `/prdimg/${folderName}/${index}.png`);

  return {
    hero: gallery[0],
    ingredients: gallery[1],
    brewSteps: gallery[2],
    specs: gallery[3],
    gallery,
  };
}

export function getProductImageSet(productName: string): ProductImageSet {
  const resolvedFolder = PRODUCT_FOLDER_MAP[productName] ?? "ButterflyPea";
  return buildProductImageSet(resolvedFolder);
}

export const products: Product[] = [
  {
    id: "butterfly-pea-blue-tea",
    name: "Butterfly Pea Blue Tea",
    slug: "butterfly-pea-blue-tea",
    tagline: "Vibrant blue petals with a calming floral finish.",
    amazonUrl: "https://www.amazon.in/dp/B0HG4S9PD2",
    color: "#EAF3EA",
    ingredients: [
      { name: "Butterfly Pea", note: "A vibrant floral tea for a naturally vivid blue hue." },
      { name: "Lemon Balm", note: "Adds a soft citrus lift and calming balance." },
      { name: "Moringa", note: "Packed with plant-based support and gentle nourishment." },
      { name: "Hibiscus", note: "Brightens the cup with a subtly fruity character." },
    ],
    facts: [
      { label: "Tea bags", value: "20 bags" },
      { label: "Net weight", value: "40 g" },
      { label: "Steep", value: "3–5 min" },
      { label: "Format", value: "Plant-based" },
    ],
    images: getProductImageSet("Butterfly Pea Blue Tea"),
  },
  {
    id: "lemon-tulsi",
    name: "Lemon Tulsi",
    slug: "lemon-tulsi",
    tagline: "Clean lemon energy with tulsi’s grounding herbal finish.",
    amazonUrl: "https://www.amazon.in/dp/B0HG4LRXX1",
    color: "#EDF5E7",
    ingredients: [
      { name: "Tulsi", note: "Grounding herbal warmth with a soft finish." },
      { name: "Lemon", note: "Brings freshness and everyday clarity." },
      { name: "Spearmint", note: "Adds a cool, clean note." },
      { name: "Green Tea", note: "Offers balance and a smooth, light base." },
    ],
    facts: [
      { label: "Tea bags", value: "20 bags" },
      { label: "Net weight", value: "40 g" },
      { label: "Steep", value: "3–4 min" },
      { label: "Format", value: "Daily ritual" },
    ],
    images: getProductImageSet("Lemon Tulsi"),
  },
  {
    id: "chamomile-lemon",
    name: "Chamomile Lemon",
    slug: "chamomile-lemon",
    tagline: "Soft chamomile and bright citrus for evening ease.",
    amazonUrl: "https://www.amazon.in/dp/B0HG3CGBP5",
    color: "#F5E7B9",
    ingredients: [
      { name: "Chamomile", note: "Soft floral notes designed for evening ease." },
      { name: "Lemon", note: "Adds a fresh, uplifting citrus finish." },
      { name: "Tulsi", note: "Gives the blend a grounded herbal sense." },
      { name: "Green Tea", note: "Provides the smooth tea base and daily energy." },
    ],
    facts: [
      { label: "Tea bags", value: "20 bags" },
      { label: "Net weight", value: "40 g" },
      { label: "Steep", value: "4 min" },
      { label: "Format", value: "Loose leaf & tea bags" },
    ],
    images: getProductImageSet("Chamomile Lemon"),
  },
  {
    id: "clove-lemon",
    name: "Clove Lemon",
    slug: "clove-lemon",
    tagline: "Warm clove spice balanced by a sparkling citrus lift.",
    amazonUrl: "https://www.amazon.in/dp/B0HG36XHC3",
    color: "#F7E9D3",
    ingredients: [
      { name: "Clove", note: "Warm spice with a comforting aromatic lift." },
      { name: "Lemon Peel", note: "Brings brightness and a citrus sparkle." },
      { name: "Cinnamon", note: "Adds gentle depth and a cozy finish." },
      { name: "Green Tea", note: "Keeps the blend grounded and fresh." },
    ],
    facts: [
      { label: "Tea bags", value: "20 bags" },
      { label: "Net weight", value: "40 g" },
      { label: "Steep", value: "3–4 min" },
      { label: "Format", value: "Caffeine light" },
    ],
    images: getProductImageSet("Clove Lemon"),
  },
  {
    id: "hibiscus-lemon-balm",
    name: "Hibiscus Lemon Balm",
    slug: "hibiscus-lemon-balm",
    tagline: "A juicy hibiscus sip with a bright, herbal finish.",
    amazonUrl: "https://www.amazon.in/dp/B0HG1Q7CT2",
    color: "#F5E6D9",
    ingredients: [
      { name: "Hibiscus", note: "Juicy, berry-like brightness for a vivid finish." },
      { name: "Lemon Balm", note: "Adds gentle citrus freshness and calm." },
      { name: "Rosehip", note: "Contributes a soft, fruity depth." },
      { name: "Green Tea", note: "Smooths the cup with a balanced tea body." },
    ],
    facts: [
      { label: "Tea bags", value: "20 bags" },
      { label: "Net weight", value: "40 g" },
      { label: "Steep", value: "4–5 min" },
      { label: "Format", value: "Naturally vibrant" },
    ],
    images: getProductImageSet("Hibiscus Lemon Balm"),
  },
  {
    id: "lemon-turmeric",
    name: "Lemon Turmeric",
    slug: "lemon-turmeric",
    tagline: "Citrus brightness layered with golden turmeric warmth.",
    amazonUrl: "https://www.amazon.in/dp/B0HG1XQTMJ",
    color: "#F3E3B8",
    ingredients: [
      { name: "Turmeric", note: "Golden warmth with a naturally earthy character." },
      { name: "Lemon", note: "Sharpens the blend with a clean citrus glow." },
      { name: "Ginger", note: "Adds gentle spice and body." },
      { name: "Green Tea", note: "Keeps the finish smooth and polished." },
    ],
    facts: [
      { label: "Tea bags", value: "20 bags" },
      { label: "Net weight", value: "40 g" },
      { label: "Steep", value: "4 min" },
      { label: "Format", value: "Golden warmth" },
    ],
    images: getProductImageSet("Lemon Turmeric"),
  },
  {
    id: "lemon-fennel",
    name: "Lemon Fennel",
    slug: "lemon-fennel",
    tagline: "Crisp lemon layered with anise-like fennel brightness.",
    amazonUrl: "https://www.amazon.in/dp/B0HG9J3ZDX",
    color: "#F5E7B0",
    ingredients: [
      { name: "Lemon Peel", note: "Brings clean citrus brightness and lift." },
      { name: "Fennel", note: "Adds a subtle anise-like herbal note." },
      { name: "Mint", note: "Keeps the finish crisp and fresh." },
      { name: "Green Tea", note: "Creates a smooth, light tea profile." },
    ],
    facts: [
      { label: "Tea bags", value: "20 bags" },
      { label: "Net weight", value: "40 g" },
      { label: "Steep", value: "3–4 min" },
      { label: "Format", value: "Fresh & bright" },
    ],
    images: getProductImageSet("Lemon Fennel"),
  },
  {
    id: "lemon-ginger",
    name: "Lemon Ginger",
    slug: "lemon-ginger",
    tagline: "A zingy citrus tea with warming ginger depth.",
    amazonUrl: "https://www.amazon.in/dp/B0HG9CJN2H",
    color: "#F4E4B0",
    ingredients: [
      { name: "Ginger", note: "Adds a clean, warming lift with brightness." },
      { name: "Lemon", note: "Creates a vivid, citrus-forward finish." },
      { name: "Turmeric", note: "Adds gentle earthiness and warmth." },
      { name: "Green Tea", note: "Keeps the blend smooth and balanced." },
    ],
    facts: [
      { label: "Tea bags", value: "20 bags" },
      { label: "Net weight", value: "40 g" },
      { label: "Steep", value: "3–5 min" },
      { label: "Format", value: "Warming spice" },
    ],
    images: getProductImageSet("Lemon Ginger"),
  },
  {
    id: "moringa-lemongrass",
    name: "Moringa Lemongrass",
    slug: "moringa-lemongrass",
    tagline: "Fresh lemongrass and moringa for a clean, uplifted ritual.",
    amazonUrl: "https://www.amazon.in/dp/B0HG4NN2V7",
    color: "#EAF4E6",
    ingredients: [
      { name: "Moringa", note: "A nutrient-dense green leaf with a clean finish." },
      { name: "Lemongrass", note: "Gives the cup a light, uplifting citrus lift." },
      { name: "Green Tea", note: "Adds smoothness and classic tea depth." },
      { name: "Lemon Peel", note: "Enhances brightness without overpowering the blend." },
    ],
    facts: [
      { label: "Tea bags", value: "20 bags" },
      { label: "Net weight", value: "40 g" },
      { label: "Steep", value: "3–5 min" },
      { label: "Format", value: "Daily green tea" },
    ],
    images: getProductImageSet("Moringa Lemongrass"),
  },
];
