'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  ListIcon,
  XIcon,
  SunIcon,
  MoonIcon,
  MonitorIcon,
  ArrowUpRightIcon,
} from '@phosphor-icons/react';
import { localizePath, type Locale } from '@/lib/i18n';

import { navigationCurrent } from '@/lib/navigation';
import { motionMilliseconds } from '@/lib/motion-timing';
import { clearArchiveNavigation, queueReturn, settleArchiveEntry } from '@/lib/archive-navigation';

type Theme = 'system' | 'light' | 'dark';
export function SiteHeader({ locale }: { locale: Locale }) {
  useLayoutEffect(() => {
    // Locale navigation replaces the root HTML attributes. Reapply the user's
    // saved preference before painting the new language.
    try {
      const saved = localStorage.getItem('portfolio-theme');
      if (saved === 'light' || saved === 'dark' || saved === 'system')
        document.documentElement.dataset.theme = saved;
    } catch {
      /* Device theme remains available when storage is blocked. */
    }
  }, [locale]);
  const path = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const restoreFocus = useRef(true);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const desktop = matchMedia('(min-width: 851px)');
    const panel = dialog.current;
    const reset = () => {
      if (document.hidden || reduced.matches || desktop.matches) {
        clearTimeout(closeTimer.current);
        panel?.close();
      }
    };
    reduced.addEventListener('change', reset);
    desktop.addEventListener('change', reset);
    document.addEventListener('visibilitychange', reset);
    return () => {
      clearTimeout(closeTimer.current);
      reduced.removeEventListener('change', reset);
      desktop.removeEventListener('change', reset);
      document.removeEventListener('visibilitychange', reset);
      panel?.close();
    };
  }, [path]);
  function openMenu() {
    const panel = dialog.current;
    if (!panel) return;
    clearTimeout(closeTimer.current);
    delete panel.dataset.closing;
    restoreFocus.current = true;
    if (!panel.open) panel.showModal();
    setMenuOpen(true);
  }
  function closeMenu(immediate = false) {
    const panel = dialog.current;
    if (!panel?.open) return;
    if (immediate || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      clearTimeout(closeTimer.current);
      panel.close();
      return;
    }
    if (panel.dataset.closing) return;
    panel.dataset.closing = 'true';
    const duration = motionMilliseconds(
      getComputedStyle(panel).getPropertyValue('--motion-menu'),
      320,
    );
    closeTimer.current = setTimeout(() => panel.close(), duration);
  }
  const labels =
    locale === 'id'
      ? ['Beranda', 'Tentang Saya', 'Proyek', 'Kontak']
      : ['Home', 'About', 'Projects', 'Contact'];
  const paths = ['', 'about/', 'projects/', 'contact/'];
  function navigateToTop() {
    clearArchiveNavigation();
    try {
      sessionStorage.setItem('portfolio-scroll-top', 'true');
    } catch {
      /* Scroll still resets in this document. */
    }
    restoreFocus.current = false;
    closeMenu(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  function cycleTheme() {
    const current = document.documentElement.dataset.theme as Theme;
    const next: Theme = current === 'system' ? 'light' : current === 'light' ? 'dark' : 'system';
    try {
      localStorage.setItem('portfolio-theme', next);
    } catch {
      /* The in-memory choice still works. */
    }
    document.documentElement.dataset.theme = next;
  }
  function changeLanguage(next: Locale) {
    const visit = /^\/(en|id)\/projects\/[^/]+\/?$/.test(path)
      ? settleArchiveEntry(`${path.replace(/\/$/, '')}/`)
      : null;
    navigateToTop();
    if (visit) queueReturn(localizePath(path, next), visit);
  }
  const controls = (
    <div className="header-controls">
      <div className="locale-switch" aria-label={locale === 'id' ? 'Bahasa' : 'Language'}>
        {(['en', 'id'] as const).map((l) => (
          <Link
            key={l}
            href={localizePath(path, l)}
            scroll={false}
            onNavigate={() => changeLanguage(l)}
            hrefLang={l}
            lang={l}
            aria-current={locale === l ? 'true' : undefined}
          >
            {l.toUpperCase()}
          </Link>
        ))}
      </div>
      <button
        className="icon-button theme-button"
        onClick={cycleTheme}
        aria-label={
          locale === 'id'
            ? 'Ganti tema: terang, gelap, atau ikuti perangkat'
            : 'Switch theme: light, dark, or device setting'
        }
        title={locale === 'id' ? 'Ganti tema' : 'Switch theme'}
      >
        <SunIcon className="theme-sun" size={21} />
        <MoonIcon className="theme-moon" size={21} />
        <MonitorIcon className="theme-system" size={21} />
      </button>
    </div>
  );
  return (
    <>
      <header className="site-header">
        <Link className="wordmark" href={`/${locale}/`} scroll={false} onNavigate={navigateToTop}>
          annastriwidagdo.me
          <span className="brand-dot" aria-hidden="true">
            .
          </span>
        </Link>
        <nav
          className="desktop-navigation"
          aria-label={locale === 'id' ? 'Navigasi utama' : 'Main navigation'}
        >
          {paths.map((p, i) => (
            <Link
              href={`/${locale}/${p}`}
              scroll={false}
              onNavigate={navigateToTop}
              key={p}
              className={p === 'contact/' ? 'navigation-contact' : undefined}
              aria-current={navigationCurrent(path, `/${locale}/${p}`)}
            >
              {labels[i]}
              {p === 'contact/' && <ArrowUpRightIcon size={16} aria-hidden="true" />}
            </Link>
          ))}
        </nav>
        <div className="desktop-controls">{controls}</div>
        <button
          ref={menuButton}
          className="icon-button menu-toggle"
          aria-label={locale === 'id' ? 'Buka menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={openMenu}
        >
          <ListIcon size={27} />
        </button>
      </header>
      <dialog
        id="mobile-navigation"
        ref={dialog}
        className="mobile-menu"
        onClick={(e) => {
          if (e.target === e.currentTarget) closeMenu();
        }}
        onCancel={(event) => {
          event.preventDefault();
          closeMenu();
        }}
        onAnimationEnd={(event) => {
          if (event.target === event.currentTarget && event.animationName === 'menu-exit')
            closeMenu(true);
        }}
        onClose={() => {
          clearTimeout(closeTimer.current);
          if (dialog.current) delete dialog.current.dataset.closing;
          setMenuOpen(false);
          if (restoreFocus.current) menuButton.current?.focus({ preventScroll: true });
        }}
        aria-labelledby="menu-heading"
      >
        <div className="menu-top">
          <span className="eyebrow" id="menu-heading">
            {locale === 'id' ? 'Navigasi' : 'Navigation'}
          </span>
          <button
            className="icon-button"
            onClick={() => closeMenu()}
            aria-label={locale === 'id' ? 'Tutup menu' : 'Close menu'}
          >
            <XIcon size={26} />
          </button>
        </div>
        <nav aria-label={locale === 'id' ? 'Navigasi mobile' : 'Mobile navigation'}>
          {paths.map((p, i) => (
            <Link
              href={`/${locale}/${p}`}
              scroll={false}
              onNavigate={navigateToTop}
              key={p}
              aria-current={navigationCurrent(path, `/${locale}/${p}`)}
            >
              <span className="eyebrow">0{i + 1}</span>
              {labels[i]}
            </Link>
          ))}
        </nav>
        <div className="menu-bottom">
          {controls}
          <p>Jakarta, Indonesia</p>
        </div>
      </dialog>
      <noscript>
        <style>{'.menu-toggle { display: none; }'}</style>
        <nav
          className="mobile-navigation-static"
          aria-label={locale === 'id' ? 'Navigasi utama' : 'Main navigation'}
        >
          {paths.map((p, i) => (
            <a
              key={p}
              href={`/${locale}/${p}`}
              aria-current={navigationCurrent(path, `/${locale}/${p}`)}
            >
              {labels[i]}
            </a>
          ))}
        </nav>
      </noscript>
    </>
  );
}
