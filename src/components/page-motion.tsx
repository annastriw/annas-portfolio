'use client';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { needsOpening } from '@/lib/opening';
import { mountRevealFallback } from '@/lib/scroll-reveal';

export function PageMotion() {
  const path = usePathname();
  const home = /^\/(en|id)\/?$/.test(path);
  const opening = useRef(false);
  const openingPath = useRef('');
  useLayoutEffect(() => {
    const root = document.documentElement;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let opened = false,
      replay = false;
    try {
      opened = !!sessionStorage.getItem('portfolio-opened');
      replay = !!sessionStorage.getItem('portfolio-replay-opening');
      if (sessionStorage.getItem('portfolio-scroll-top')) {
        sessionStorage.removeItem('portfolio-scroll-top');
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    } catch {
      /* Native navigation remains available without storage. */
    }
    opening.current =
      needsOpening(home, opened, replay, reduced) ||
      (home && !reduced && opening.current && openingPath.current === path);
    openingPath.current = path;
    if (opening.current) {
      root.dataset.opening = 'playing';
      try {
        sessionStorage.setItem('portfolio-opened', 'true');
        sessionStorage.removeItem('portfolio-replay-opening');
      } catch {
        /* The greeting still completes without storage. */
      }
    } else delete root.dataset.opening;
    return () => {
      delete root.dataset.opening;
    };
  }, [path, home]);
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    let release = () => {};
    let arrived = false;
    const sync = () => {
      release();
      if (media.matches) {
        delete document.documentElement.dataset.opening;
        return;
      }
      const animations: Animation[] = [];
      const play = (element: Element | null, frames: Keyframe[], duration: number, delay = 0) => {
        if (element)
          animations.push(
            element.animate(frames, {
              duration,
              delay,
              easing: 'cubic-bezier(.22,1,.36,1)',
              fill: 'backwards',
            }),
          );
      };
      // Only the arrival is time-based. Page media and sections use reversible view timelines.
      if (!arrived && home && window.scrollY < 80) {
        const start = opening.current ? 1500 : 0;
        play(
          document.querySelector('.hero-photo img'),
          [{ transform: 'scale(1.06)' }, { transform: 'scale(1)' }],
          1000,
          start,
        );
        play(
          document.querySelector('.hero-name'),
          [{ transform: 'translateY(48px)' }, { transform: 'translateY(0)' }],
          900,
          start,
        );
        document
          .querySelectorAll('.hero-greeting,.hero-description,.hero-actions,.hero-location')
          .forEach((element, i) =>
            play(
              element,
              [{ transform: 'translateY(24px)' }, { transform: 'translateY(0)' }],
              750,
              start + 80 + i * 85,
            ),
          );
        document
          .querySelectorAll('.hero-statement .motion-word-inner')
          .forEach((word, i) =>
            play(
              word,
              [{ transform: 'translateY(115%)' }, { transform: 'translateY(0)' }],
              800,
              start + 60 + i * 35,
            ),
          );
      }
      if (!arrived && !home && window.scrollY < 80) {
        document
          .querySelectorAll('.page-heading > *, .detail-heading > *, .breadcrumb')
          .forEach((element, i) =>
            play(
              element,
              [
                { opacity: 0.8, transform: 'translateY(10px)' },
                { opacity: 1, transform: 'translateY(0)' },
              ],
              700,
              i * 55,
            ),
          );
      }
      arrived = true;
      const releaseFallback = mountRevealFallback();
      release = () => {
        releaseFallback();
        animations.forEach((a) => a.cancel());
      };
    };
    sync();
    media.addEventListener('change', sync);
    return () => {
      release();
      media.removeEventListener('change', sync);
    };
  }, [path, home]);
  return home ? (
    <div
      className="opening-curtain"
      aria-hidden="true"
      key={path}
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget) {
          opening.current = false;
          delete document.documentElement.dataset.opening;
        }
      }}
    >
      <span className="opening-signature">Hola.</span>
    </div>
  ) : null;
}
