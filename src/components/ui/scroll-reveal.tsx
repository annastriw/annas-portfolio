"use client";

import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  animationClass?: string;
  delayMs?: number;
  threshold?: number;
}

export function ScrollReveal({
  children,
  className = "",
  delayMs = 0,
  threshold = 0.05,
}: ScrollRevealProps) {
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = domRef.current;
    if (
      !element ||
      typeof window === "undefined" ||
      typeof IntersectionObserver === "undefined"
    ) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.setAttribute("data-reveal-state", "visible");
      return;
    }

    const rect = element.getBoundingClientRect();
    const isAlreadyReached = rect.top < window.innerHeight;

    if (isAlreadyReached) {
      element.setAttribute("data-reveal-state", "visible");
      return;
    }

    element.setAttribute("data-reveal-state", "hidden");

    let observer: IntersectionObserver | null = null;

    const cleanup = () => {
      if (observer) {
        observer.disconnect();
        observer = null;
      }
      window.removeEventListener("scroll", checkVisibility);
    };

    const checkVisibility = () => {
      const r = element.getBoundingClientRect();
      if (r.top < window.innerHeight) {
        element.setAttribute("data-reveal-state", "visible");
        cleanup();
      }
    };

    observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting ||
          entry.boundingClientRect.top < window.innerHeight
        ) {
          element.setAttribute("data-reveal-state", "visible");
          cleanup();
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(element);
    window.addEventListener("scroll", checkVisibility, { passive: true });

    return () => {
      cleanup();
    };
  }, [threshold]);

  const style: CSSProperties = {
    transitionDelay: delayMs > 0 ? `${delayMs}ms` : undefined,
  };

  return (
    <div
      ref={domRef}
      data-reveal-state="visible"
      style={style}
      className={`scroll-reveal-container ${className}`}
    >
      {children}
    </div>
  );
}
