'use client';
import { useEffect, useState } from 'react';

export function Splash() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    try {
      if (sessionStorage.getItem('portfolio-intro')) return;
      sessionStorage.setItem('portfolio-intro', 'seen');
    } catch {
      return;
    }
    const show = requestAnimationFrame(() => setVisible(true));
    const hide = setTimeout(() => setVisible(false), 780);
    return () => {
      cancelAnimationFrame(show);
      clearTimeout(hide);
    };
  }, []);
  return visible ? (
    <div className="splash" aria-hidden="true">
      <span>Annas Tri Widagdo</span>
      <small>Software Engineer</small>
    </div>
  ) : null;
}
