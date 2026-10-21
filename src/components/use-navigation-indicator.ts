'use client';

import { useLayoutEffect, type RefObject } from 'react';

/** Measure on navigation, fonts and resize only; no pointer/scroll render loop. */
export function useNavigationIndicator(ref: RefObject<HTMLElement | null>, visit: string) {
  useLayoutEffect(() => {
    const group = ref.current;
    if (!group) return;
    let active = true;
    const measure = () => {
      if (!active) return;
      const current = group.querySelector<HTMLElement>('a[aria-current]');
      const label = current?.querySelector<HTMLElement>('.navigation-label') ?? current;
      if (!label) return;
      const bounds = group.getBoundingClientRect();
      const target = label.getBoundingClientRect();
      if (!bounds.width || !target.width) return;
      group.style.setProperty('--indicator-x', `${target.left - bounds.left - group.clientLeft}px`);
      group.style.setProperty('--indicator-width', `${target.width}px`);
      group.dataset.indicatorReady = 'true';
    };
    measure();
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure);
    observer?.observe(group);
    if (!observer) window.addEventListener('resize', measure);
    document.fonts?.ready.then(measure);
    return () => {
      active = false;
      observer?.disconnect();
      if (!observer) window.removeEventListener('resize', measure);
    };
  }, [ref, visit]);
}
