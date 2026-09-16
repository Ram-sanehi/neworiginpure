"use client";

import { products } from "@/lib/products";
import RevealImage from "@/components/RevealImage";

export default function FinalCTAFooter() {
  return (
    <>
      <section
        data-final-cta
        data-page-section
        data-tone="cta"
        className="relative overflow-hidden bg-transparent py-20 text-[#FFF8E7] lg:py-28"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,160,23,0.18),_transparent_38%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.08),_transparent_25%)]" />

        <div className="relative mx-auto max-w-6xl px-6 text-center lg:px-12">
          <div className="mx-auto mb-8 flex w-full max-w-[220px] items-center justify-center overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/5 p-2 shadow-[0_22px_50px_rgba(11,24,19,0.18)] backdrop-blur-sm">
            <RevealImage
              src="/prdimg/LemonGinger/2.png"
              alt="Lemon Ginger tea product shot"
              width={440}
              height={520}
              sizes="220px"
              wrapperClassName="relative block w-full"
              skeletonClassName=""
              className="h-[180px] w-full rounded-[1.1rem] object-contain"
              loading="lazy"
            />
          </div>

          <p className="text-xs uppercase tracking-[0.28em] text-[#F9E7B2]/80">origin pure</p>
          <h2 className="mt-5 font-serif text-4xl leading-tight text-white md:text-5xl lg:text-6xl">
            Ready to Experience Citrus Vitality?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#FFF8E7]/75 md:text-lg">
            Bring a brighter, cleaner daily ritual to your routine with a fresh herbal blend made for energy, calm, and everyday wellness.
          </p>

          <div className="mt-10 text-left">
            <p className="mb-4 text-xs uppercase tracking-[0.22em] text-[#F9E7B2]/75">Shop the full range</p>

            <div className="flex gap-3 overflow-x-auto pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {products.map((product) => {
                const thumbImage = product.images.hero || product.images.gallery[0] || "/prdimg/logo.jpeg";

                return (
                  <a
                    key={product.id}
                    href={product.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group min-w-[180px] shrink-0 rounded-[1.4rem] border border-white/10 bg-white/5 p-3 text-left backdrop-blur-sm transition hover:-translate-y-1 hover:border-[#D4A017]/50 hover:bg-white/10"
                  >
                    <div className="relative mb-3 overflow-hidden rounded-[1rem] bg-[#FFF8E7]/5 ring-1 ring-white/10">
                      <div className="relative h-28 w-full">
                        <RevealImage
                          src={thumbImage}
                          alt={product.name}
                          fill
                          sizes="180px"
                          wrapperClassName="absolute inset-0"
                          skeletonClassName=""
                          className="h-full w-full object-contain p-2"
                        />
                      </div>
                    </div>
                    <span className="block text-sm font-medium text-[#FFF8E7] transition group-hover:text-[#F9E7B2]">
                      {product.name}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#1B4332]/10 bg-[#FFF8E7] py-8 text-[#1B4332]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row lg:px-12">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1B4332] text-sm font-semibold text-[#FFF8E7]">
              O
            </div>
            <div>
              <p className="font-serif text-2xl tracking-tight">Origin Pure</p>
              <p className="text-xs uppercase tracking-[0.2em] text-[#1B4332]/60">Wellness & Natural</p>
            </div>
          </div>

          <div className="flex items-center gap-5 text-[#1B4332]/75">
            <span className="text-sm">© 2026 Origin Pure</span>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#1B4332]/15 transition hover:border-[#D4A017] hover:text-[#D4A017]"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5Zm5-3.2a1.1 1.1 0 1 1-1.1-1.1 1.1 1.1 0 0 1 1.1 1.1Z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
