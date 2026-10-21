'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { SunIcon, MoonIcon, MonitorIcon } from '@phosphor-icons/react';
import { localizePath, type Locale } from '@/lib/i18n';
import { useNavigationIndicator } from './use-navigation-indicator';

export function HeaderControls({
  locale,
  path,
  onLanguage,
  onTheme,
}: {
  locale: Locale;
  path: string;
  onLanguage: (next: Locale) => void;
  onTheme: () => void;
}) {
  const language = useRef<HTMLDivElement>(null);
  useNavigationIndicator(language, `${locale}:${path}`);
  return (
    <div className="header-controls">
      <div
        ref={language}
        className="locale-switch"
        aria-label={locale === 'id' ? 'Bahasa' : 'Language'}
      >
        {(['en', 'id'] as const).map((next) => (
          <Link
            key={next}
            href={localizePath(path, next)}
            scroll={false}
            onNavigate={() => onLanguage(next)}
            hrefLang={next}
            lang={next}
            aria-current={locale === next ? 'true' : undefined}
          >
            {next.toUpperCase()}
          </Link>
        ))}
        <span className="navigation-indicator" aria-hidden="true" />
      </div>
      <button
        className="icon-button theme-button"
        onClick={onTheme}
        aria-label={
          locale === 'id'
            ? 'Ganti tema: terang, gelap, atau ikuti perangkat'
            : 'Switch theme: light, dark, or device setting'
        }
        title={locale === 'id' ? 'Ganti tema' : 'Switch theme'}
      >
        <SunIcon className="theme-sun" size={21} aria-hidden="true" />
        <MoonIcon className="theme-moon" size={21} aria-hidden="true" />
        <MonitorIcon className="theme-system" size={21} aria-hidden="true" />
      </button>
    </div>
  );
}
