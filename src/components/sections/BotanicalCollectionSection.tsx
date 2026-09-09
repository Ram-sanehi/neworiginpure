import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PRODUCTS } from '../../data/products';
import { Container } from '../ui/Container';
import { ChevronDown } from 'lucide-react';

const INGREDIENTS = [
  { name: 'Tea Leaves', description: 'Clean, lightly caffeinated leaves with a bright, refreshing body.', origin: 'Trusted tea-growing regions', flavour: 'Fresh, vegetal, lightly brisk', usedIn: 'Hibiscus Berry Green Tea, Evening Calm', image: PRODUCTS[0].images[1] },
  { name: 'Chamomile', description: 'Whole blossoms with a delicate floral aroma that create a soft and comforting cup.', origin: 'Carefully selected chamomile growers', flavour: 'Soft floral, honeyed, gentle', usedIn: 'Evening Calm, Chamomile Citrus', image: PRODUCTS[1].images[1] },
  { name: 'Butterfly Pea', description: 'A naturally vibrant blue flower with a quiet earthy depth.', origin: 'Small botanical farms', flavour: 'Earthy, mellow, distinctive', usedIn: 'Blue Pea Herbal Infusion', image: PRODUCTS[3].images[1] },
  { name: 'Hibiscus Petals', description: 'Tart petals that bring a vivid rose colour and berry-like brightness.', origin: 'Warm-climate flower farms', flavour: 'Tart, fruity, floral', usedIn: 'Hibiscus Berry Green Tea', image: PRODUCTS[0].images[2] },
  { name: 'Tulsi', description: 'An aromatic traditional herb with a warm, peppery freshness.', origin: 'Indian herb growers', flavour: 'Peppery, herbal, lifted', usedIn: 'Twin Tulsi Green Tea', image: PRODUCTS[8].images[1] },
  { name: 'Turmeric', description: 'A golden spice that gives the cup an earthy, warming backbone.', origin: 'South Indian spice farms', flavour: 'Earthy, warm, rounded', usedIn: 'Turmeric Gold Green Tea', image: PRODUCTS[5].images[1] },
  { name: 'Lemongrass', description: 'Long, fragrant leaves that bring a clean citrus lift.', origin: 'Tropical herb farms', flavour: 'Citrusy, grassy, cooling', usedIn: 'Blue Pea Herbal Infusion, Citrus Vitality', image: PRODUCTS[3].images[2] },
  { name: 'Fennel', description: 'Naturally sweet seeds with a clean anise aroma.', origin: 'Indian seed growers', flavour: 'Sweet, anise, refreshing', usedIn: 'Fennel Harmony Green Tea', image: PRODUCTS[2].images[2] },
  { name: 'Moringa Leaves', description: 'Tender leaves with a clean, quietly herbaceous character.', origin: 'Indian moringa farms', flavour: 'Green, herbaceous, clean', usedIn: 'Citrus Vitality Moringa', image: PRODUCTS[6].images[1] },
  { name: 'Dried Ginger', description: 'A warming botanical that gives the finish a gentle glow.', origin: 'Indian spice growers', flavour: 'Warm, bright, peppery', usedIn: 'Blue Pea Herbal Infusion, Lemon Ginger', image: PRODUCTS[3].images[3] },
  { name: 'Lemon Peel', description: 'Sun-dried citrus peel with concentrated aromatic oils.', origin: 'Citrus-growing regions', flavour: 'Zesty, aromatic, bright', usedIn: 'Hibiscus Berry, Chamomile Citrus', image: PRODUCTS[4].images[1] },
  { name: 'Lemon Slices', description: 'Vivid dried slices that add natural citrus character to the infusion.', origin: 'Selected citrus orchards', flavour: 'Fresh, citrusy, lightly sweet', usedIn: 'Fennel Harmony Green Tea', image: PRODUCTS[2].images[1] },
  { name: 'Star Anise', description: 'A warm aromatic spice that rounds out the blend.', origin: 'Aromatic spice growers', flavour: 'Anise, warm, smooth', usedIn: 'Fennel Harmony Green Tea', image: PRODUCTS[2].images[3] },
  { name: 'Spearmint', description: 'Cool, fragrant leaves that keep the finish feeling clear.', origin: 'Herb farms', flavour: 'Cool, sweet, fresh', usedIn: 'Blue Pea Herbal Infusion', image: PRODUCTS[3].images[2] },
  { name: 'Dandelion Root', description: 'A roasted-root note that gives herbal blends grounded depth.', origin: 'Specialty root growers', flavour: 'Earthy, toasted, deep', usedIn: 'Blue Pea Herbal Infusion', image: PRODUCTS[3].images[3] },
  { name: 'Clove', description: 'A small, fragrant spice with a gently warming finish.', origin: 'Tropical spice farms', flavour: 'Warm, aromatic, sweet', usedIn: 'Chamomile Citrus Herbal Infusion', image: PRODUCTS[4].images[2] },
  { name: 'Black Pepper', description: 'A subtle peppery lift that balances golden, earthy notes.', origin: 'South Indian pepper farms', flavour: 'Peppery, warm, bright', usedIn: 'Turmeric Gold Green Tea', image: PRODUCTS[5].images[2] }
];

export const BotanicalCollectionSection: React.FC = () => {
  const [openIngredient, setOpenIngredient] = useState<string | null>(null);

  return <section id="botanicals" className="section-beige border-t border-cream-300/80 py-14 sm:py-24">
    <Container>
      <div className="mx-auto max-w-2xl space-y-3 text-center">
        <span className="text-xs font-bold uppercase tracking-[0.22em] text-clay-600">The Origin Pure pantry</span>
        <h2 className="text-3xl font-serif font-bold tracking-tight text-teagreen-950 sm:text-5xl">Explore The Botanicals Behind Every Blend</h2>
        <p className="text-sm leading-relaxed text-charcoal-800/70 sm:text-base">The ingredients that give every Origin Pure tea its character, aroma, and flavour.</p>
      </div>
      <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
        {INGREDIENTS.map((ingredient, index) => {
          const isOpen = openIngredient === ingredient.name;
          return (
          <motion.article
            key={ingredient.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35, delay: (index % 4) * 0.04 }}
            className="group overflow-hidden rounded-2xl border border-cream-300/80 bg-cream-50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
          >
            <div className="aspect-[4/3] overflow-hidden bg-sand-100">
              <img src={ingredient.image} alt={ingredient.name} loading="lazy" className="h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-105" />
            </div>
            <button type="button" aria-expanded={isOpen} onClick={() => setOpenIngredient(isOpen ? null : ingredient.name)} className="flex w-full items-center justify-between gap-2 p-3.5 text-left sm:p-4">
              <span className="font-serif text-base font-bold text-teagreen-950">{ingredient.name}</span>
              <ChevronDown className={`h-4 w-4 shrink-0 text-clay-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className="px-3.5 pb-3.5 sm:px-4 sm:pb-4">
              <p className="text-xs leading-relaxed text-charcoal-800/70">{ingredient.description}</p>
              {isOpen && <div className="mt-3 space-y-2 border-t border-cream-300/80 pt-3 text-[11px] leading-relaxed text-charcoal-800/75">
                <p><strong className="text-teagreen-950">Origin:</strong> {ingredient.origin}</p>
                <p><strong className="text-teagreen-950">Flavour profile:</strong> {ingredient.flavour}</p>
                <p><strong className="text-teagreen-950">Used in:</strong> {ingredient.usedIn}</p>
              </div>}
            </div>
          </motion.article>
          );
        })}
      </div>
    </Container>
  </section>
};
