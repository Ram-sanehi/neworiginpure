"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type RevealImageProps = Omit<ImageProps, "onLoad" | "onError"> & {
  wrapperClassName?: string;
  skeletonClassName?: string;
  onReady?: () => void;
  onLoad?: ImageProps["onLoad"];
  onError?: ImageProps["onError"];
};

export function waitForImagesReady(
  container: ParentNode | null | undefined,
  callback: () => void
): () => void {
  if (!container) {
    callback();
    return () => undefined;
  }

  const images = Array.from(container.querySelectorAll("img"));

  if (!images.length) {
    callback();
    return () => undefined;
  }

  let pending = images.length;
  let settled = false;

  const finish = () => {
    if (settled) return;
    settled = true;
    callback();
  };

  const onStateChange = () => {
    pending -= 1;
    if (pending <= 0) finish();
  };

  images.forEach((img) => {
    if (img.complete) {
      onStateChange();
      return;
    }

    img.addEventListener("load", onStateChange, { once: true });
    img.addEventListener("error", onStateChange, { once: true });
  });

  return () => {
    settled = true;
  };
}

export default function RevealImage({
  wrapperClassName = "",
  skeletonClassName = "",
  className = "",
  onReady,
  onLoad,
  onError,
  style,
  alt = "",
  ...props
}: RevealImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad: ImageProps["onLoad"] = (event) => {
    setIsLoaded(true);
    setHasError(false);
    onLoad?.(event);
    onReady?.();
  };

  const handleError: ImageProps["onError"] = (event) => {
    setHasError(true);
    setIsLoaded(true);
    onError?.(event);
    onReady?.();
  };

  return (
    <div
      className={`relative overflow-hidden ${wrapperClassName}`.trim() || undefined}
      data-loaded={isLoaded}
      aria-busy={!isLoaded && !hasError}
    >
      {!isLoaded && !hasError && (
        <div
          aria-hidden="true"
          className={`absolute inset-0 animate-pulse bg-gradient-to-r from-[#E9E1D0] via-[#F5ECD6] to-[#E9E1D0] ${skeletonClassName}`.trim()}
        />
      )}

      <Image
        {...props}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={[
          "transition-all duration-500 ease-out",
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-[1.02]",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        style={style}
      />
    </div>
  );
}
