'use client';
import { useEffect, useState } from 'react';

export function Splash() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    try {
      if (sessionStorage.getItem('portfolio-intro-v2')) return;
    } catch {
      return;
    }
    let hide: ReturnType<typeof setTimeout>;
    const show = requestAnimationFrame(() => {
      try {
        sessionStorage.setItem('portfolio-intro-v2', 'seen');
      } catch {
        return;
      }
      setVisible(true);
      hide = setTimeout(() => setVisible(false), 980);
    });
    return () => {
      cancelAnimationFrame(show);
      clearTimeout(hide);
    };
  }, []);
  return visible ? (
    <div className="splash" aria-hidden="true">
      <div className="splash-signature">
        <span>A</span>
        <span>T</span>
        <span>W</span>
      </div>
      <div className="splash-rule" />
      <small>
        Annas Tri Widagdo <span>Software Engineer</span>
      </small>
    </div>
  ) : null;
}
