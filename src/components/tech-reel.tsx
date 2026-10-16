'use client';
import { Children, useEffect, useRef, useState } from 'react';
import { PauseIcon, PlayIcon } from '@phosphor-icons/react';
import type { Locale } from '@/lib/i18n';

export function TechReel({ children, locale }: { children: React.ReactNode; locale: Locale }) {
  const root = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const items = Children.toArray(children);
  const middle = Math.ceil(items.length / 2);
  const rows = [items.slice(0, middle), items.slice(middle)];
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    let inView = false;
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
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, []);
  return (
    <div className="tech-reel" ref={root} data-paused={paused}>
      <div className="tech-reel-label">
        <span className="eyebrow">
          {locale === 'id' ? 'Teknologi & alat' : 'Technologies & tools'}
        </span>
        <button
          type="button"
          className="marquee-control"
          aria-pressed={paused}
          onClick={() => setPaused((value) => !value)}
        >
          {paused ? <PlayIcon size={16} /> : <PauseIcon size={16} />}
          <span>
            {locale === 'id'
              ? paused
                ? 'Putar gerak'
                : 'Jeda gerak'
              : paused
                ? 'Resume motion'
                : 'Pause motion'}
          </span>
        </button>
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
