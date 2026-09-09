import React, { useRef } from 'react';
import { Container } from '../ui/Container';
import { Leaf, PackageCheck, Recycle, Sparkles, Truck, Waves } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PRODUCTS } from '../../data/products';

const PANELS = [
  { number: '01', name: 'Real Botanicals', benefit: 'No artificial flavours. No unnecessary fillers.', story: 'Only carefully selected herbs, botanicals, and spices make it into each blend.', detail: 'Every ingredient is named on the pack.', icon: Leaf, image: PRODUCTS[3].images[2] },
  { number: '02', name: 'Whole Ingredients, Better Taste', benefit: 'Whole leaves, flowers, roots, and spices retain more character.', story: 'Keeping ingredients whole lets their aroma and flavour arrive with more clarity in the cup.', detail: 'Clearer aroma from recognisable ingredients.', icon: Sparkles, image: PRODUCTS[1].images[2] },
  { number: '03', name: 'Pyramid Bag Technology', benefit: 'Space to open. Space to infuse.', story: 'Traditional tea bags restrict infusion. Spacious pyramid bags let the ingredients expand naturally.', detail: '25 bags, 2g each, designed for full circulation.', icon: Waves, image: PRODUCTS[4].images[3] },
  { number: '04', name: 'Plant-Based & Biodegradable', benefit: 'Brewing quality with less waste.', story: 'Our pyramid bags are designed to leave a lighter footprint after the ritual is over.', detail: 'Plant-based bags, not conventional plastic mesh.', icon: Recycle, image: PRODUCTS[3].images[3] },
  { number: '05', name: 'Thoughtfully Crafted Blends', benefit: 'Flavour, balance, and everyday enjoyment.', story: 'Every blend is composed to feel considered, recognisable, and easy to return to.', detail: 'Floral, citrus, herbal, and warming profiles.', icon: PackageCheck, image: PRODUCTS[0].images[3] },
  { number: '06', name: 'Delivered Through Amazon', benefit: 'Trusted checkout. Fast delivery. Easy returns.', story: 'A familiar, secure way to bring Origin Pure home, backed by Amazon customer support.', detail: 'Order tracking and support stay in one place.', icon: Truck, image: PRODUCTS[7].images[3] }
];

const ValuePanel: React.FC<{ panel: typeof PANELS[number]; index: number }> = ({ panel, index }) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);
  const Icon = panel.icon;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.55, delay: index % 2 * 0.04 }}
      className="sticky top-20 mb-4 grid min-h-[65vh] grid-cols-1 overflow-hidden rounded-3xl border border-cream-50/10 bg-teagreen-900/90 sm:grid-cols-2"
      style={{ zIndex: index + 1 }}
    >
      <div className="relative min-h-64 overflow-hidden bg-sand-100/10 sm:min-h-full">
        <motion.img src={panel.image} alt={`${panel.name} Origin Pure tea detail`} style={{ y: imageY }} className="absolute inset-[-5%] h-[110%] w-full object-contain p-6" loading="lazy" />
        <span className="absolute left-5 top-5 text-xs font-bold tracking-[0.22em] text-amber-300">{panel.number}</span>
      </div>
      <div className="flex flex-col justify-center p-7 sm:p-12">
        <Icon className="mb-6 h-8 w-8 text-amber-400" />
        <h3 className="text-3xl font-serif font-bold text-cream-50 sm:text-5xl">{panel.name}</h3>
        <p className="mt-5 text-lg leading-relaxed text-cream-100">{panel.benefit}</p>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-cream-200/70">{panel.story}</p>
        <p className="mt-6 border-t border-cream-50/15 pt-4 text-xs font-bold uppercase tracking-wider text-amber-300">{panel.detail}</p>
      </div>
    </motion.article>
  );
};

export const ImmersiveIngredientsSection: React.FC = () => {
  return (
    <section id="why-origin-pure" className="section-dark relative overflow-hidden">
      <Container>
        <div className="mx-auto max-w-2xl space-y-3 py-16 text-center sm:py-24">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">The Origin Pure difference</span>
          <h2 className="text-3xl font-serif font-bold tracking-tight text-cream-50 sm:text-5xl">Why Origin Pure Is Different</h2>
          <p className="text-sm leading-relaxed text-cream-200/80 sm:text-base">Every detail — from sourcing to packaging — is designed to create a better tea experience.</p>
        </div>
        <div className="pb-16 sm:pb-24">
          {PANELS.map((panel, index) => <ValuePanel key={panel.name} panel={panel} index={index} />)}
        </div>
      </Container>
    </section>
  );
};
