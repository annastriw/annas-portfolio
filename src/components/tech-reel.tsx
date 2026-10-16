'use client';
import { useEffect, useRef } from 'react';
import type { Locale } from '@/lib/i18n';

export function TechReel({ children, locale }: { children: React.ReactNode; locale: Locale }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = root.current;
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    if (!element || media.matches) return;
    const animations: Animation[] = [];
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        element.dataset.motion = 'played';
        element.querySelectorAll('li').forEach((item, index) => {
          animations.push(
            item.animate(
              [
                { opacity: 0, transform: 'translateX(30px) translateY(8px)' },
                { opacity: 1, transform: 'translateX(0) translateY(0)' },
              ],
              {
                duration: 550,
                delay: index * 25,
                easing: 'cubic-bezier(.22,1,.36,1)',
                fill: 'backwards',
              },
            ),
          );
        });
      },
      { threshold: 0.15 },
    );
    observer.observe(element);
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
  }, []);
  return (
    <div className="tech-reel" ref={root}>
      <div className="tech-reel-label">
        <span className="eyebrow">
          {locale === 'id' ? 'Teknologi & alat' : 'Technologies & tools'}
        </span>
        <span className="eyebrow">32</span>
      </div>
      <ul className="tech-grid">{children}</ul>
    </div>
  );
}
