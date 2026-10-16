'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function PageMotion() {
  const path = usePathname();
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) return;
    const animations: Animation[] = [];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          animations.push(
            entry.target.animate(
              [
                { opacity: 0, transform: 'translateY(18px)' },
                { opacity: 1, transform: 'translateY(0)' },
              ],
              { duration: 600, easing: 'cubic-bezier(.22,1,.36,1)' },
            ),
          );
        });
      },
      { threshold: 0.1 },
    );
    document
      .querySelectorAll(
        '.featured-project,.project-card,.section-intro,.experience-row,.capability,.certificate,.detail-story>div,.page-heading',
      )
      .forEach((element) => observer.observe(element));
    const stop = () => {
      if (media.matches) {
        observer.disconnect();
        animations.forEach((animation) => animation.cancel());
      }
    };
    media.addEventListener('change', stop);
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      media.removeEventListener('change', stop);
    };
  }, [path]);
  return null;
}
