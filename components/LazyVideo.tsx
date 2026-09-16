"use client";

import { useEffect, useRef, useState } from "react";

type LazyVideoProps = React.VideoHTMLAttributes<HTMLVideoElement> & {
  webmSrc?: string;
  mp4Src?: string;
  poster?: string;
};

export default function LazyVideo({
  webmSrc,
  mp4Src,
  poster,
  className,
  ...props
}: LazyVideoProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const element = videoRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad || !videoRef.current) return;
    const video = videoRef.current;
    const playPromise = video.play();
    if (playPromise && typeof playPromise.then === "function") {
      playPromise.catch(() => undefined);
    }
  }, [shouldLoad]);

  return (
    <video
      ref={videoRef}
      className={className}
      poster={poster}
      preload={shouldLoad ? "metadata" : "none"}
      autoPlay
      muted
      loop
      playsInline
      {...props}
    >
      {shouldLoad && webmSrc ? <source src={webmSrc} type="video/webm" /> : null}
      {shouldLoad && mp4Src ? <source src={mp4Src} type="video/mp4" /> : null}
    </video>
  );
}
