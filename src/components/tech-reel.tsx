'use client';
import { Children, useEffect, useRef } from 'react';
import type { Locale } from '@/lib/i18n';

export function TechReel({ children, locale }: { children: React.ReactNode; locale: Locale }) {
  const root = useRef<HTMLDivElement>(null);
  const items = Children.toArray(children);
  const middle = Math.ceil(items.length / 2);
  const rows = [items.slice(0, middle), items.slice(middle)];
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    // Leave the original, horizontally scrollable lists available without this API.
    if (typeof IntersectionObserver === 'undefined') return;
    let active = true;
    let inView = false;
    const measure = () => {
      if (!active) return;
      element.querySelectorAll<HTMLElement>('.marquee-row').forEach((row, index) => {
        const width = row.querySelector('.marquee-group')?.getBoundingClientRect().width;
        if (width) row.style.setProperty('--reel-duration', `${width / (index ? 15 : 17)}s`);
      });
    };
    const resize = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure);
    resize?.observe(element);
    measure();
    document.fonts?.ready.then(measure);
    const sync = () => {
      element.dataset.inView = String(inView && document.visibilityState === 'visible');
    };
    const observer = new IntersectionObserver(
      (entries) => {
        inView = entries.some((entry) => entry.isIntersecting);
        sync();
      },
      { threshold: 0.05 },
    );
    observer.observe(element);
    document.addEventListener('visibilitychange', sync);
    return () => {
      active = false;
      resize?.disconnect();
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, []);
  return (
    <div className="tech-reel" ref={root}>
      <div className="tech-reel-label">
        <span className="eyebrow">
          {locale === 'id' ? 'Teknologi & alat' : 'Technologies & tools'}
        </span>
      </div>
      <div className="marquee-rows">
        {rows.map((row, index) => (
          <div
            className={`marquee-row${index === 1 ? ' marquee-reverse' : ''}`}
            key={index}
            tabIndex={0}
            role="group"
            aria-label={
              locale === 'id'
                ? `Teknologi utama, baris ${index + 1}`
                : `Core technologies, row ${index + 1}`
            }
          >
            <div className="marquee-track">
              <ul className="marquee-group">{row}</ul>
              <ul className="marquee-group" aria-hidden="true">
                {row}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
