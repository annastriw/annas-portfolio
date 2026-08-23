"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { supportedLocales, type Locale } from "@/lib/i18n/config";
import { getLocalizedPath } from "@/lib/i18n/paths";
import { navigationConfig } from "@/data/navigation";

interface LocaleSwitcherProps {
  locale: Locale;
  className?: string;
  onSelect?: () => void;
}

const localeNames: Record<Locale, { short: string; full: string }> = {
  en: { short: "EN", full: "English" },
  id: { short: "ID", full: "Bahasa Indonesia" },
};

export function LocaleSwitcher({
  locale,
  className = "",
  onSelect,
}: LocaleSwitcherProps) {
  const pathname = usePathname() || `/${locale}`;
  const config = navigationConfig[locale];

  return (
    <div
      className={`editorial-lang-control ${className}`}
      role="group"
      aria-label={config.labels.switchLanguage}
    >
      <span className="lang-control-tag" aria-hidden="true">
        <svg
          className="lang-control-icon"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          aria-hidden="true"
        >
          <circle cx="8" cy="8" r="6.25" />
          <path d="M1.75 8h12.5M8 1.75c1.8 2 2.5 4.3 2.5 6.25s-.7 4.25-2.5 6.25c-1.8-2-2.5-4.3-2.5-6.25s.7-4.25 2.5-6.25z" />
        </svg>
        <span className="lang-tag-text">LANG</span>
      </span>

      <span className="lang-options-group">
        {supportedLocales.map((loc, index) => {
          const isCurrent = loc === locale;
          const targetHref = getLocalizedPath(pathname, loc);

          return (
            <span key={loc} className="lang-option-item">
              {index > 0 && (
                <span className="lang-separator" aria-hidden="true">
                  /
                </span>
              )}
              {isCurrent ? (
                <span
                  className="lang-btn lang-btn-active"
                  aria-current="true"
                  lang={loc}
                  title={localeNames[loc].full}
                >
                  {localeNames[loc].short}
                </span>
              ) : (
                <Link
                  href={targetHref}
                  className="lang-btn lang-btn-link"
                  lang={loc}
                  title={`Switch to ${localeNames[loc].full}`}
                  onClick={onSelect}
                  aria-label={`Switch language to ${localeNames[loc].full}`}
                >
                  {localeNames[loc].short}
                </Link>
              )}
            </span>
          );
        })}
      </span>
    </div>
  );
}
