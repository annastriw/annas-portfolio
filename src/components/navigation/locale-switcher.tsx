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
      className={`locale-switcher ${className}`}
      role="group"
      aria-label={config.labels.switchLanguage}
    >
      <span className="locale-switcher-prefix" aria-hidden="true">
        LOC:
      </span>
      {supportedLocales.map((loc, index) => {
        const isCurrent = loc === locale;
        const targetHref = getLocalizedPath(pathname, loc);

        return (
          <span key={loc} className="locale-switcher-item">
            {index > 0 && <span className="locale-divider" aria-hidden="true">/</span>}
            {isCurrent ? (
              <span
                className="locale-badge locale-badge-active"
                aria-current="true"
                lang={loc}
                title={localeNames[loc].full}
              >
                {localeNames[loc].short}
              </span>
            ) : (
              <Link
                href={targetHref}
                className="locale-badge locale-badge-link"
                lang={loc}
                title={`Switch to ${localeNames[loc].full}`}
                onClick={onSelect}
                aria-label={`Switch to ${localeNames[loc].full}`}
              >
                {localeNames[loc].short}
              </Link>
            )}
          </span>
        );
      })}
    </div>
  );
}
