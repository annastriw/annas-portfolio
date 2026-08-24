"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

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
  animationClass = "animate-editorial-fade",
  delayMs = 0,
  threshold = 0.1,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );

    const currentElem = domRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return (
    <div
      ref={domRef}
      style={{
        animationDelay: isVisible && delayMs > 0 ? `${delayMs}ms` : undefined,
      }}
      className={`${className} ${
        isVisible ? animationClass : "opacity-0"
      } motion-reduce:!opacity-100 motion-reduce:!animate-none`}
    >
      {children}
    </div>
  );
}
