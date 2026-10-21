'use client';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { needsOpening, OPENING_DURATION } from '@/lib/opening';
import { mountMotionScenes } from '@/lib/scroll-reveal';

export function PageMotion() {
  const path = usePathname();
  const home = /^\/(en|id)\/?$/.test(path);
  const visit = useRef({ path: '', started: 0, opening: false });
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
      /* Native navigation still works without storage. */
    }
    if (home && location.search === '?intro=1') {
      replay = true;
      history.replaceState(history.state, '', path + location.hash);
    }
    if (visit.current.path !== path || replay) {
      const booted = root.dataset.openingBooted === 'true';
      const pending = Number(root.dataset.openingAt);
      const play =
        home &&
        !reduced &&
        (pending > 0 || replay || (!booted && needsOpening(home, opened, replay, reduced)));
      visit.current = { path, opening: play, started: pending > 0 ? pending : Date.now() };
    }
    const remaining = Math.max(0, OPENING_DURATION - (Date.now() - visit.current.started));
    if (visit.current.opening && remaining && !reduced) {
      // A running CSS clock must not jump forward a second time during hydration.
      if (!root.dataset.opening) root.style.setProperty('--opening-delay', '0ms');
      root.dataset.opening = 'playing';
      // CSS starts at first style resolution, which may follow the head script.
      // Align both layers to the original clock so the fail-safe cannot cut off the swipe.
      document
        .querySelectorAll('.opening-curtain, .opening-curtain > .opening-signature')
        .forEach((element) => {
          for (const animation of element.getAnimations()) {
            const delay = Number(animation.effect?.getTiming().delay ?? 0);
            animation.currentTime = Date.now() - visit.current.started + delay;
          }
        });
      try {
        sessionStorage.setItem('portfolio-opened', 'true');
        sessionStorage.removeItem('portfolio-replay-opening');
      } catch {
        /* The greeting also completes without storage. */
      }
    } else {
      visit.current.opening = false;
      delete root.dataset.opening;
    }
    const timer = window.setTimeout(() => {
      visit.current.opening = false;
      delete root.dataset.opening;
      delete root.dataset.openingAt;
      root.style.removeProperty('--opening-delay');
    }, remaining);
    return () => window.clearTimeout(timer);
  }, [path, home]);

  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    let release = () => {};
    let arrived = false;
    const sync = () => {
      release();
      if (media.matches || document.hidden) {
        visit.current.opening = false;
        delete document.documentElement.dataset.opening;
        return;
      }
      const animations: Animation[] = [];
      const elapsed = Date.now() - visit.current.started;
      const base = visit.current.opening ? 1450 - elapsed : 0;
      const small = matchMedia('(max-width: 700px), (max-height: 600px)').matches;
      const play = (element: Element | null, frames: Keyframe[], duration: number, delay = 0) => {
        if (element && typeof element.animate === 'function')
          animations.push(
            element.animate(frames, {
              duration,
              delay,
              easing: 'cubic-bezier(.22,1,.36,1)',
              fill: 'backwards',
            }),
          );
      };
      if (!arrived && window.scrollY < 80) {
        if (home) {
          if (visit.current.opening)
            play(
              document.querySelector('.site-header'),
              [{ transform: 'translateY(-12px)' }, { transform: 'translateY(0)' }],
              550,
              base,
            );
          play(
            document.querySelector('.hero-name'),
            [
              { opacity: 0.85, transform: `translateY(${small ? 8 : 14}px)` },
              { opacity: 1, transform: 'translateY(0)' },
            ],
            600,
            base,
          );
          play(
            document.querySelector('.hero-content'),
            [
              { opacity: 0.8, transform: `translateY(${small ? 4 : 8}px)` },
              { opacity: 1, transform: 'translateY(0)' },
            ],
            480,
            base + 100,
          );
        } else {
          document
            .querySelectorAll('.page-heading, .detail-heading, .missing-content')
            .forEach((el, i) =>
              play(
                el,
                [
                  { opacity: 0.85, transform: `translateY(${small ? 4 : 8}px)` },
                  { opacity: 1, transform: 'translateY(0)' },
                ],
                500,
                i * 80,
              ),
            );
          play(
            document.querySelector('.missing-actions'),
            [{ transform: 'translateY(6px)' }, { transform: 'translateY(0)' }],
            420,
            100,
          );
        }
      }
      arrived = true;
      const cancelArrival = () => animations.forEach((animation) => animation.cancel());
      const interrupt = () => {
        if (window.scrollY > 80) cancelArrival();
      };
      // A gesture or navigation always takes precedence over presentation.
      document.addEventListener('pointerdown', cancelArrival, { once: true });
      document.addEventListener('keydown', cancelArrival, { once: true });
      window.addEventListener('scroll', interrupt, { passive: true });
      Promise.allSettled(animations.map((animation) => animation.finished)).then(() => {
        window.removeEventListener('scroll', interrupt);
        document.removeEventListener('pointerdown', cancelArrival);
        document.removeEventListener('keydown', cancelArrival);
      });
      const releaseScenes = mountMotionScenes();
      release = () => {
        releaseScenes();
        cancelArrival();
        document.removeEventListener('pointerdown', cancelArrival);
        document.removeEventListener('keydown', cancelArrival);
        window.removeEventListener('scroll', interrupt);
      };
    };
    sync();
    media.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    return () => {
      release();
      media.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
    };
  }, [path, home]);
  return home ? (
    <div className="opening-curtain" aria-hidden="true" key={path}>
      <span className="opening-signature">Hola.</span>
    </div>
  ) : null;
}
