import React from 'react';
import { CheckCircle2, CreditCard, Headphones, RotateCcw, ShieldCheck, Tag, Truck } from 'lucide-react';
import { Container } from '../ui/Container';

const TRUST_ITEMS = [
  [Tag, 'Official Amazon Listing', 'Shop through the verified brand storefront'],
  [CreditCard, 'Secure Payments', 'Protected checkout through Amazon'],
  [Truck, 'Fast Delivery', 'Reliable delivery tracking at every step'],
  [RotateCcw, 'Easy Returns', 'Amazon customer-first return support'],
  [Headphones, 'Customer Support', 'Help whenever you need it']
];

export const AmazonTrustSection: React.FC = () => (
  <section className="section-clay border-t border-cream-300/80 py-10 sm:py-14">
    <Container>
      <div className="mb-7 max-w-xl space-y-2">
        <span className="text-xs font-bold uppercase tracking-[0.22em] text-clay-700">A familiar way to order</span>
        <h2 className="text-3xl font-serif font-bold tracking-tight text-teagreen-950 sm:text-4xl">Confidence, built into checkout.</h2>
        <p className="text-sm leading-relaxed text-charcoal-800/75">Every Origin Pure order is supported by the trusted systems and customer care you already know.</p>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {TRUST_ITEMS.map(([Icon, label, description]) => (
          <div key={label as string} className="flex min-h-32 flex-col gap-3 rounded-2xl border border-cream-300/80 bg-cream-50 p-4 shadow-sm sm:p-5">
            {React.createElement(Icon as React.ElementType, { className: 'h-5 w-5 text-teagreen-800' })}
            <div className="space-y-1">
              <span className="block text-xs font-bold leading-snug text-teagreen-950">{label as string}</span>
              <span className="block text-[11px] leading-relaxed text-charcoal-800/65">{description as string}</span>
            </div>
          </div>
        ))}
      </div>
    </Container>
  </section>
);
