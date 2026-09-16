"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { AMAZON_URL } from "@/lib/amazon";
import RevealImage from "@/components/RevealImage";

export default function StickyBuyBar() {
  const [visible, setVisible] = useState(false);
  const [hideAtFinalCta, setHideAtFinalCta] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = sentinelRef.current;
    const finalCta = document.querySelector("[data-final-cta]");
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    observer.observe(node);

    if (finalCta) {
      const finalCtaObserver = new IntersectionObserver(
        ([entry]) => {
          setHideAtFinalCta(entry.isIntersecting);
        },
        {
          root: null,
          threshold: 0.2,
        }
      );

      finalCtaObserver.observe(finalCta);
      return () => {
        observer.disconnect();
        finalCtaObserver.disconnect();
      };
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinelRef} className="pointer-events-none h-px w-full" aria-hidden="true" />

      <AnimatePresence>
        {visible && !hideAtFinalCta && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="fixed bottom-3 left-3 right-3 z-50 flex items-center justify-center md:bottom-auto md:left-auto md:right-6 md:top-6 md:justify-end"
          >
            <div className="flex w-full max-w-[calc(100%-1.5rem)] items-center justify-between gap-3 rounded-full border border-[#1B4332]/10 bg-[#FFF8E7]/90 px-3 py-2 shadow-[0_18px_40px_rgba(27,67,50,0.18)] backdrop-blur-md md:max-w-[420px] md:gap-4 md:px-4">
              <div className="flex min-w-0 items-center gap-3">
                <RevealImage
                  src="/prdimg/ButterflyPea/1.png"
                  alt="Butterfly Pea Blue Tea"
                  width={44}
                  height={44}
                  wrapperClassName="relative block shrink-0 overflow-hidden rounded-full border border-[#1B4332]/10 bg-white"
                  skeletonClassName="rounded-full"
                  className="h-11 w-11 shrink-0 rounded-full border border-[#1B4332]/10 object-cover bg-white"
                  loading="lazy"
                />
                <p className="truncate text-sm font-medium text-[#1B4332] md:text-base">
                  Citrus Vitality Green Tea
                </p>
              </div>

              <a
                href={AMAZON_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="brand-cta shrink-0 px-4 py-2 text-xs md:px-5"
              >
                Buy on Amazon
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
