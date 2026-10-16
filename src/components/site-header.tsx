'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLayoutEffect, useRef } from 'react';
import { ListIcon, XIcon, SunIcon, MoonIcon, MonitorIcon } from '@phosphor-icons/react';
import { localizePath, type Locale } from '@/lib/i18n';

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
  const labels =
    locale === 'id'
      ? ['Beranda', 'Tentang Saya', 'Proyek', 'Kontak']
      : ['Home', 'About', 'Projects', 'Contact'];
  const paths = ['', 'about/', 'projects/', 'contact/'];
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
  const controls = (
    <div className="header-controls">
      <div className="locale-switch" aria-label={locale === 'id' ? 'Bahasa' : 'Language'}>
        {(['en', 'id'] as const).map((l) => (
          <Link
            key={l}
            href={localizePath(path, l)}
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
        <Link className="wordmark" href={`/${locale}/`}>
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
              key={p}
              aria-current={
                path === `/${locale}/${p}` || path === `/${locale}/${p}`.replace(/\/$/, '')
                  ? 'page'
                  : undefined
              }
            >
              {labels[i]}
            </Link>
          ))}
        </nav>
        <div className="desktop-controls">{controls}</div>
        <button
          ref={menuButton}
          className="icon-button menu-toggle"
          aria-label={locale === 'id' ? 'Buka menu' : 'Open menu'}
          onClick={() => dialog.current?.showModal()}
        >
          <ListIcon size={27} />
        </button>
      </header>
      <dialog
        ref={dialog}
        className="mobile-menu"
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
        onClose={() => menuButton.current?.focus()}
        aria-labelledby="menu-heading"
      >
        <div className="menu-top">
          <span className="eyebrow" id="menu-heading">
            {locale === 'id' ? 'Navigasi' : 'Navigation'}
          </span>
          <button
            className="icon-button"
            onClick={() => dialog.current?.close()}
            aria-label={locale === 'id' ? 'Tutup menu' : 'Close menu'}
          >
            <XIcon size={26} />
          </button>
        </div>
        <nav aria-label={locale === 'id' ? 'Navigasi mobile' : 'Mobile navigation'}>
          {paths.map((p, i) => (
            <Link href={`/${locale}/${p}`} key={p} onClick={() => dialog.current?.close()}>
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
    </>
  );
}
