'use client';

import { useLayoutEffect, useRef } from 'react';
import type { Category } from '@/content/projects';
import type { Locale } from '@/lib/i18n';

export function ProjectFilters({
  locale,
  categories,
  selected,
  onSelect,
}: {
  locale: Locale;
  categories: { value: Category | 'all'; label: string; count: number }[];
  selected: Category | 'all';
  onSelect: (value: Category | 'all') => void;
}) {
  const root = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const group = root.current;
    if (!group) return;
    let mounted = true;
    const measure = () => {
      if (!mounted) return;
      const button = group.querySelector<HTMLElement>('[aria-pressed="true"]');
      if (!button || !group.offsetWidth) return;
      const { offsetLeft: x, offsetTop: y, offsetWidth: width, offsetHeight: height } = button;
      group.style.setProperty('--filter-x', `${x}px`);
      group.style.setProperty('--filter-y', `${y}px`);
      group.style.setProperty('--filter-width', `${width}px`);
      group.style.setProperty('--filter-height', `${height}px`);
      group.dataset.indicatorReady = 'true';
    };
    measure();
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure);
    observer?.observe(group);
    if (!observer) window.addEventListener('resize', measure);
    document.fonts?.ready.then(measure);
    return () => {
      mounted = false;
      observer?.disconnect();
      if (!observer) window.removeEventListener('resize', measure);
    };
  }, [selected, locale]);
  return (
    <div
      className="filter-list"
      ref={root}
      role="group"
      aria-label={locale === 'id' ? 'Filter proyek' : 'Filter projects'}
    >
      <span className="filter-indicator" aria-hidden="true" />
      {categories.map(({ value, label, count }) => (
        <button
          key={value}
          type="button"
          onClick={() => onSelect(value)}
          aria-pressed={selected === value}
        >
          {label}
          <span>{count}</span>
        </button>
      ))}
    </div>
  );
}
