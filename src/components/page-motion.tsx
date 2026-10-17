'use client';
import { useEffect, useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';

export function PageMotion() {
  const path = usePathname();
  const home = /^\/(en|id)\/?$/.test(path);
  useLayoutEffect(() => {
    try {
      if (sessionStorage.getItem('portfolio-scroll-top')) {
        sessionStorage.removeItem('portfolio-scroll-top');
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    } catch {
      /* Browsers with blocked storage keep native navigation. */
    }
  }, [path]);
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const curtain = document.querySelector<HTMLElement>('.opening-curtain');
    let firstVisit = home;
    try {
      firstVisit = home && !sessionStorage.getItem('portfolio-opened');
      if (home) sessionStorage.setItem('portfolio-opened', 'true');
    } catch {
      /* The opening also works when browser storage is unavailable. */
    }
    if (curtain && (!firstVisit || media.matches)) curtain.style.display = 'none';
    if (media.matches) return;
    const animations: Animation[] = [];
    const easing = 'cubic-bezier(.22,1,.36,1)';
    function play(element: Element | null, keyframes: Keyframe[], duration: number, delay = 0) {
      if (element)
        animations.push(element.animate(keyframes, { duration, delay, easing, fill: 'backwards' }));
    }
    // One opening sequence: curtain clears, photograph settles, name leads, copy follows.
    // Never reset the opacity of content that is already visible during scrolling.
    if (home && window.scrollY < 80) {
      const start = firstVisit ? 950 : 0;
      play(
        document.querySelector('.hero-photo img'),
        [{ transform: 'scale(1.025)' }, { transform: 'scale(1)' }],
        1250,
        start,
      );
      play(
        document.querySelector('.hero-name'),
        [{ transform: 'translateY(18px)' }, { transform: 'translateY(0)' }],
        850,
        start + 100,
      );
      document
        .querySelectorAll(
          '.hero-greeting,.hero-statement,.hero-description,.hero-actions,.hero-location',
        )
        .forEach((element, index) =>
          play(
            element,
            [{ transform: 'translateY(12px)' }, { transform: 'translateY(0)' }],
            650,
            start + 180 + index * 65,
          ),
        );
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          const element = entry.target as HTMLElement;
          element.dataset.motionSeen = 'true';
          if (element.classList.contains('timeline-item')) {
            element.dataset.seen = 'true';
          } else if (element.matches('.featured-image,.about-photo')) {
            play(
              element,
              [
                { clipPath: 'inset(0 0 0 100%)', transform: 'translateX(28px)' },
                { clipPath: 'inset(0)', transform: 'translateX(0)' },
              ],
              950,
            );
            play(
              element.querySelector('img'),
              [{ transform: 'scale(1.035)' }, { transform: 'scale(1)' }],
              1150,
            );
          } else {
            // Content stays opaque; small spatial cues preserve readability and prevent flicker.
            play(element, [{ transform: 'translateY(18px)' }, { transform: 'translateY(0)' }], 700);
          }
        });
      },
      { threshold: 0, rootMargin: '0px 0px 40px 0px' },
    );
    document
      .querySelectorAll(
        '.page-heading,.detail-heading,.section-label,.section-intro,.featured-copy,.featured-image,.project-card,.about-photo,.about-biography,.education-heading,.thesis,.certificate,.detail-story>div,.project-facts,.detail-gallery,.contact-socials,.contact-email,.footer-invite,.timeline-item',
      )
      .forEach((element) => observer.observe(element));
    const stop = () => {
      if (media.matches) {
        observer.disconnect();
        animations.forEach((animation) => animation.cancel());
        if (curtain) curtain.style.display = 'none';
      }
    };
    media.addEventListener('change', stop);
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      media.removeEventListener('change', stop);
    };
  }, [path, home]);
  return home ? (
    <div className="opening-curtain" aria-hidden="true" key={path}>
      <span className="opening-signature">Annas.</span>
      <span className="opening-rule" />
      <span className="opening-caption">Software Engineer</span>
    </div>
  ) : null;
}
