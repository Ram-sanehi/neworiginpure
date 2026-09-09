import React, { useEffect, useState } from 'react';
import { Container } from '../ui/Container';
import { ArrowRight, CheckCircle, X } from 'lucide-react';

import brandLogo from '../../images/logo.jpeg';

type LegalDocument = 'privacy' | 'terms' | 'shipping';

const legalContent: Record<LegalDocument, { title: string; sections: { heading: string; text: string }[] }> = {
  privacy: {
    title: 'Privacy Policy',
    sections: [
      {
        heading: 'Information we collect',
        text: 'When you subscribe or contact us, we may collect your name, email address, and the details you choose to share. Payment and order information is handled by Amazon when you complete a purchase through its marketplace.'
      },
      {
        heading: 'How we use information',
        text: 'We use submitted information to respond to enquiries, send requested updates, improve our products, and maintain the website. We do not sell your personal information.'
      },
      {
        heading: 'Your choices',
        text: 'You can unsubscribe from marketing emails at any time or contact us to request access, correction, or deletion of personal information we hold.'
      }
    ]
  },
  terms: {
    title: 'Terms of Service',
    sections: [
      {
        heading: 'Using this website',
        text: 'You may use this website for personal, lawful purposes. Product descriptions, prices, availability, and promotions may change without notice.'
      },
      {
        heading: 'Orders and payment',
        text: 'Product purchases are completed through the linked Amazon listing and are subject to Amazon\'s checkout, payment, delivery, and customer-service terms.'
      },
      {
        heading: 'Content and responsibility',
        text: 'Website content is provided for general product information and is not medical advice. Please review ingredients and consult a qualified professional if you have allergies or dietary concerns.'
      }
    ]
  },
  shipping: {
    title: 'Shipping & Returns',
    sections: [
      {
        heading: 'Shipping',
        text: 'Shipping options, delivery estimates, fees, and tracking are shown by Amazon at checkout. Delivery times can vary by location, inventory, and carrier conditions.'
      },
      {
        heading: 'Returns and refunds',
        text: 'Orders placed through Amazon are covered by Amazon\'s applicable return and refund policies. Start a return from your Amazon order history or contact Amazon Customer Service for help.'
      },
      {
        heading: 'Damaged or incorrect items',
        text: 'If your order arrives damaged or you receive the wrong item, please report it through Amazon as soon as possible so the order can be reviewed and resolved.'
      }
    ]
  }
};

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [activeLegalDocument, setActiveLegalDocument] = useState<LegalDocument | null>(null);

  useEffect(() => {
    if (!activeLegalDocument) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveLegalDocument(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLegalDocument]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-teagreen-950 text-cream-100 border-t border-teagreen-900 pt-16 pb-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-teagreen-900">
          
          {/* Brand Info Column */}
          <div className="md:col-span-5 space-y-4">
            <a href="#" className="flex items-center gap-3">
              <img
                src={brandLogo}
                alt="Origin Pure Logo"
                className="h-10 w-auto rounded-lg object-contain bg-cream-50 p-0.5 shadow-xs"
              />
              <div className="flex flex-col">
                <span className="font-serif font-bold text-xl tracking-tight text-cream-50 leading-none">
                  Origin Pure
                </span>
                <span className="text-[9px] tracking-widest uppercase text-amber-400 font-bold mt-0.5">
                  Natural Botanicals
                </span>
              </div>
            </a>

            <p className="text-xs sm:text-sm text-cream-200/75 leading-relaxed font-sans max-w-sm">
              Authentic Indian botanical tea blends crafted with whole natural ingredients and plant-based biodegradable pyramid bags.
            </p>

            <p className="text-xs text-teagreen-400 font-medium">
              © {new Date().getFullYear()} Origin Pure by Foxgle · Coimbatore, Tamil Nadu, India. All rights reserved.
            </p>
            <p className="text-xs text-cream-200/75 font-medium">
              FSSAI License No.: <span className="text-amber-300">Pending verified license number</span>
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
              <h4 className="font-serif font-bold text-sm text-cream-50 uppercase tracking-wider">
                Learn
              </h4>
              <ul className="space-y-2 text-xs text-cream-200/80 font-sans">
                <li><a href="#story" className="hover:text-amber-300 transition-colors">Our Story</a></li>
                <li><a href="#botanicals" className="hover:text-amber-300 transition-colors">Ingredients</a></li>
                <li><a href="#faq" className="hover:text-amber-300 transition-colors">FAQs</a></li>
                <li><a href="#reviews" className="hover:text-amber-300 transition-colors">Reviews</a></li>
              </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-serif font-bold text-sm text-cream-50 uppercase tracking-wider">Trust</h4>
                <ul className="space-y-2 text-xs text-cream-200/80 font-sans">
                  <li>Secure Payments</li>
                  <li>Amazon Fulfilled</li>
                  <li>Biodegradable Packaging</li>
                  <li><a href="https://www.instagram.com/originpure.in/" target="_blank" rel="noreferrer" className="hover:text-amber-300 transition-colors">Follow Us</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Natural Email Newsletter Signup */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-serif font-bold text-sm text-cream-50 uppercase tracking-wider">
              Occasional good things in your inbox.
            </h4>
            <p className="text-xs text-cream-200/75 leading-relaxed font-sans">
              No daily spam. Just fresh harvest announcements, tea brewing notes, and subscriber discounts.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2 pt-1">
              <div className="flex flex-col sm:flex-row items-stretch gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="bg-teagreen-900 border border-teagreen-800 text-cream-100 placeholder:text-teagreen-400 text-sm min-h-11 px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-amber-400 flex-1"
                />
                <button
                  type="submit"
                  className="bg-amber-400 hover:bg-amber-300 text-teagreen-950 min-h-11 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1 shrink-0"
                >
                  <span>JOIN</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {subscribed && (
                <p className="text-xs text-amber-300 font-semibold flex items-center gap-1 animate-fadeIn">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Welcome! You’re on the VIP list.</span>
                </p>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Legal Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-cream-300/60 font-sans">
          <div className="flex items-center gap-4">
            <button type="button" onClick={() => setActiveLegalDocument('privacy')} className="hover:text-cream-200 transition-colors">Privacy Policy</button>
            <span>•</span>
            <button type="button" onClick={() => setActiveLegalDocument('terms')} className="hover:text-cream-200 transition-colors">Terms of Service</button>
            <span>•</span>
            <button type="button" onClick={() => setActiveLegalDocument('shipping')} className="hover:text-cream-200 transition-colors">Shipping & Returns</button>
          </div>
        </div>
      </Container>

      {activeLegalDocument && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-950/70 p-4 backdrop-blur-sm"
          role="presentation"
          onClick={() => setActiveLegalDocument(null)}
        >
          <div
            className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-cream-50 p-6 text-charcoal-900 shadow-2xl sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="legal-dialog-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close policy"
              onClick={() => setActiveLegalDocument(null)}
              className="absolute right-4 top-4 rounded-full p-2 text-charcoal-800/60 transition-colors hover:bg-cream-200 hover:text-charcoal-900"
            >
              <X className="h-5 w-5" />
            </button>
            <h2 id="legal-dialog-title" className="pr-10 font-serif text-2xl font-bold text-teagreen-950">
              {legalContent[activeLegalDocument].title}
            </h2>
            <div className="mt-6 space-y-5 text-sm leading-relaxed text-charcoal-800/80">
              {legalContent[activeLegalDocument].sections.map((section) => (
                <section key={section.heading}>
                  <h3 className="font-serif text-base font-bold text-charcoal-900">{section.heading}</h3>
                  <p className="mt-1.5">{section.text}</p>
                </section>
              ))}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
