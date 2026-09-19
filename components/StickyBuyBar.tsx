"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AMAZON_URL } from "@/lib/amazon";

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
            className="fixed right-3 top-3 z-50 md:right-6 md:top-6"
          >
            <a
              href={AMAZON_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Shop on Amazon"
              className="block w-[min(42vw,180px)] transition-transform duration-300 ease-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#E1BE5B]/70 focus:ring-offset-2 focus:ring-offset-transparent md:w-[210px]"
            >
              <Image
                src="/prdimg/img.png"
                alt="Shop on Amazon"
                width={2163}
                height={727}
                sizes="(max-width: 768px) 42vw, 210px"
                className="h-auto w-full drop-shadow-[0_12px_20px_rgba(0,0,0,0.3)]"
                loading="lazy"
              />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
