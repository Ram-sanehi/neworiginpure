import React from 'react';
import { ArrowUpRight, Instagram } from 'lucide-react';
import { Container } from '../ui/Container';
import { PRODUCTS } from '../../data/products';

export const InstagramSection: React.FC = () => (
  <section className="border-t border-cream-300/80 bg-white py-14 sm:py-20">
    <Container>
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-clay-600">@originpure.in</span>
          <h2 className="text-3xl font-serif font-bold text-teagreen-950 sm:text-4xl">Follow Our Tea Journey</h2>
          <p className="max-w-xl text-sm leading-relaxed text-charcoal-800/70">Daily brewing tips, ingredient stories, wellness inspiration, behind-the-scenes moments, and new product launches.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href="https://www.instagram.com/originpure.in/" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-teagreen-950 px-5 py-3 text-sm font-bold text-cream-50 transition-colors hover:bg-teagreen-800"><Instagram className="h-4 w-4" /> Follow on Instagram</a>
          <a href="https://www.instagram.com/originpure.in/" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-teagreen-800 px-5 py-3 text-sm font-bold text-teagreen-950 transition-colors hover:bg-cream-200">View Latest Posts <ArrowUpRight className="h-4 w-4" /></a>
        </div>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {PRODUCTS.map((product) => <a key={product.id} href="https://instagram.com/originpure.in" target="_blank" rel="noreferrer" className="group aspect-square overflow-hidden rounded-2xl border border-cream-300 bg-sand-100"><img src={product.images[1] || product.images[0]} alt={`${product.name} tea story`} loading="lazy" className="h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-105" /></a>)}
      </div>
    </Container>
  </section>
);
