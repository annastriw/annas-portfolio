'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, type RefObject } from 'react';
import { motionMilliseconds } from '@/lib/motion-timing';

/** Only explicit filtering animates. Returning to a saved visit never prepares a transition. */
export function useArchiveMotion(grid: RefObject<HTMLDivElement | null>, filter: string) {
  const before = useRef<Map<string, { left: number; top: number; visible: boolean }> | null>(null);
  const running = useRef<Animation[]>([]);
  const cancel = useCallback(() => {
    running.current.forEach((animation) => animation.cancel());
    running.current = [];
  }, []);
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const stop = () => {
      if (media.matches || document.hidden) cancel();
    };
    media.addEventListener('change', stop);
    document.addEventListener('visibilitychange', stop);
    window.addEventListener('resize', cancel);
    return () => {
      cancel();
      media.removeEventListener('change', stop);
      document.removeEventListener('visibilitychange', stop);
      window.removeEventListener('resize', cancel);
    };
  }, [cancel]);
  useLayoutEffect(() => {
    const previous = before.current;
    before.current = null;
    if (!previous || document.hidden || matchMedia('(prefers-reduced-motion: reduce)').matches)
      return;
    const cards = [
      ...(grid.current?.querySelectorAll<HTMLElement>('.project-card:not([hidden])') ?? []),
    ];
    // Batch final geometry before starting animations, leaving the image's scroll transform alone.
    const positions = cards.map((card) => ({ card, rect: card.getBoundingClientRect() }));
    const styles = getComputedStyle(document.documentElement);
    const duration = motionMilliseconds(styles.getPropertyValue('--motion-panel'), 320);
    const easing = styles.getPropertyValue('--motion-ease').trim() || 'ease-out';
    running.current = positions.flatMap(({ card, rect }) => {
      if (typeof card.animate !== 'function' || rect.bottom <= 0 || rect.top >= window.innerHeight)
        return [];
      const old = previous.get(card.id);
      const x = old ? old.left - rect.left : 0;
      const y = old ? old.top - rect.top - window.scrollY : 6;
      // Long reorders settle locally instead of flying through several rows of content.
      const nearby = old?.visible && Math.hypot(x, y) <= Math.min(480, window.innerHeight * 0.6);
      if (nearby && Math.abs(x) < 0.5 && Math.abs(y) < 0.5) return [];
      return [
        card.animate(
          [
            {
              transform: nearby ? `translate(${x}px, ${y}px)` : 'translate(0, 6px)',
              opacity: nearby ? 1 : 0.65,
            },
            { transform: 'translate(0, 0)', opacity: 1 },
          ],
          { duration, easing },
        ),
      ];
    });
    return cancel;
  }, [grid, filter, cancel]);

  return () => {
    // Capture the current presentation before cancelling an interrupted transition.
    before.current = new Map(
      [...(grid.current?.querySelectorAll<HTMLElement>('.project-card:not([hidden])') ?? [])].map(
        (card) => {
          const rect = card.getBoundingClientRect();
          return [
            card.id,
            {
              left: rect.left,
              top: rect.top + window.scrollY,
              visible: rect.bottom > 0 && rect.top < window.innerHeight,
            },
          ];
        },
      ),
    );
    cancel();
  };
}
