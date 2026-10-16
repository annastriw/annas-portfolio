'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function PageMotion() {
  const path = usePathname();
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) return;
    const animations: Animation[] = [];
    const easing = 'cubic-bezier(.22,1,.36,1)';
    function play(element: Element | null, keyframes: Keyframe[], duration = 650, delay = 0) {
      if (element)
        animations.push(element.animate(keyframes, { duration, delay, easing, fill: 'backwards' }));
    }
    function rise(element: Element | null, delay = 0, distance = 18) {
      play(
        element,
        [
          { opacity: 0, transform: `translateY(${distance}px)` },
          { opacity: 1, transform: 'translateY(0)' },
        ],
        650,
        delay,
      );
    }
    // The opening belongs to the page itself, so the visitor can explore immediately.
    play(
      document.querySelector('.hero-photo img'),
      [
        { transform: 'scale(1.035)', opacity: 0.7 },
        { transform: 'scale(1)', opacity: 1 },
      ],
      1400,
    );
    play(
      document.querySelector('.hero-name'),
      [
        { clipPath: 'inset(-18% 100% -18% -2%)', opacity: 0.3 },
        { clipPath: 'inset(-18% -2% -18% -2%)', opacity: 1 },
      ],
      1050,
      100,
    );
    document
      .querySelectorAll(
        '.hero-greeting,.hero-statement,.hero-description,.hero-actions,.hero-location',
      )
      .forEach((element, index) => rise(element, 120 + index * 85, 20));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          const element = entry.target;
          if (element.classList.contains('timeline-item')) {
            (element as HTMLElement).dataset.seen = 'true';
            rise(element.querySelector('.timeline-meta'), 0, 10);
            rise(element.querySelector('.timeline-entry'), 90, 20);
          } else if (element.classList.contains('featured-project')) {
            play(
              element.querySelector('.featured-image'),
              [
                { clipPath: 'inset(0 0 0 12%)', opacity: 0.4 },
                { clipPath: 'inset(0)', opacity: 1 },
              ],
              850,
            );
            play(
              element.querySelector('.featured-image img'),
              [{ transform: 'scale(1.045)' }, { transform: 'scale(1)' }],
              1100,
            );
            element
              .querySelectorAll('.featured-copy > *')
              .forEach((child, index) => rise(child, index * 70, 22));
          } else if (
            element.classList.contains('section-intro') ||
            element.classList.contains('page-heading')
          ) {
            Array.from(element.children).forEach((child, index) => rise(child, index * 90, 24));
          } else {
            rise(element, 0, 16);
          }
        });
      },
      { threshold: 0.1 },
    );
    document
      .querySelectorAll(
        '.featured-project,.project-card,.section-intro,.timeline-item,.capability,.certificate,.detail-story>div,.page-heading',
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
