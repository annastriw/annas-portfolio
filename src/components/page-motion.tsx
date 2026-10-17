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
      const start = firstVisit ? 1600 : 0;
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
            play(
              element.querySelector('.timeline-marker'),
              [
                { transform: 'scale(.75)' },
                { transform: 'scale(1.14)', offset: 0.65 },
                { transform: 'scale(1)' },
              ],
              780,
            );
            play(
              element.querySelector('.timeline-meta'),
              [{ transform: 'translateX(-16px)' }, { transform: 'translateX(0)' }],
              850,
              100,
            );
            play(
              element.querySelector('.timeline-entry h3'),
              [{ transform: 'translateX(30px)' }, { transform: 'translateX(0)' }],
              950,
              90,
            );
            play(
              element.querySelector('.organization'),
              [{ transform: 'translateY(12px)' }, { transform: 'translateY(0)' }],
              750,
              190,
            );
            play(
              element.querySelector('.timeline-description'),
              [{ transform: 'translateY(22px)' }, { transform: 'translateY(0)' }],
              1000,
              270,
            );
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
          } else if (element.matches('.project-card,.certificate')) {
            play(
              element.querySelector('.project-image,.certificate-image'),
              [
                { transform: 'translateY(24px) scale(.98)' },
                { transform: 'translateY(0) scale(1)' },
              ],
              1000,
            );
            element
              .querySelectorAll('.project-card-meta,h2,.certificate-copy')
              .forEach((child, index) =>
                play(
                  child,
                  [{ transform: 'translateY(16px)' }, { transform: 'translateY(0)' }],
                  850,
                  130 + index * 85,
                ),
              );
          } else if (
            element.matches('.section-intro,.page-heading,.detail-heading,.footer-invite')
          ) {
            Array.from(element.children).forEach((child, index) =>
              play(
                child,
                [
                  { transform: `translateY(${index === 0 ? 26 : 18}px)` },
                  { transform: 'translateY(0)' },
                ],
                index === 0 ? 1000 : 850,
                index * 130,
              ),
            );
          } else if (element.matches('.project-facts,.contact-socials')) {
            Array.from(element.children).forEach((child, index) =>
              play(
                child,
                [{ transform: 'translateX(20px)' }, { transform: 'translateX(0)' }],
                800,
                index * 85,
              ),
            );
          } else if (element.matches('.capability-explorer')) {
            element
              .querySelectorAll('.capability-index button')
              .forEach((child, index) =>
                play(
                  child,
                  [{ transform: 'translateX(-18px)' }, { transform: 'translateX(0)' }],
                  800,
                  index * 80,
                ),
              );
            play(
              element.querySelector('.capability-stage'),
              [{ transform: 'translateY(26px)' }, { transform: 'translateY(0)' }],
              1050,
              160,
            );
          } else {
            // Content stays opaque; small spatial cues preserve readability and prevent flicker.
            play(element, [{ transform: 'translateY(18px)' }, { transform: 'translateY(0)' }], 900);
          }
        });
      },
      { threshold: 0, rootMargin: '0px 0px 40px 0px' },
    );
    document
      .querySelectorAll(
        '.page-heading,.detail-heading,.section-label,.section-intro,.featured-copy,.featured-image,.project-card,.about-photo,.about-biography,.education-heading,.thesis,.certificate,.detail-story>div,.project-facts,.detail-gallery,.contact-socials,.contact-email,.footer-invite,.timeline-item,.capability-explorer',
      )
      .forEach((element) => observer.observe(element));
    // Filters replace archive cards without changing the route.
    const grid = document.querySelector('.project-grid');
    const updates = new MutationObserver(() => {
      grid
        ?.querySelectorAll('.project-card:not([data-motion-seen])')
        .forEach((element) => observer.observe(element));
    });
    if (grid) updates.observe(grid, { childList: true });
    const stop = () => {
      if (media.matches) {
        observer.disconnect();
        updates.disconnect();
        animations.forEach((animation) => animation.cancel());
        if (curtain) curtain.style.display = 'none';
      }
    };
    media.addEventListener('change', stop);
    return () => {
      observer.disconnect();
      updates.disconnect();
      animations.forEach((animation) => animation.cancel());
      media.removeEventListener('change', stop);
    };
  }, [path, home]);
  return home ? (
    <div className="opening-curtain" aria-hidden="true" key={path}>
      <span className="opening-signature">Hola.</span>
    </div>
  ) : null;
}
