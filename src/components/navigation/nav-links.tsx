"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";
import { getLocalizedHref } from "@/lib/i18n/paths";
import { navigationConfig } from "@/data/navigation";

interface NavLinksProps {
  locale: Locale;
  className?: string;
  itemClassName?: string;
  onNavigate?: () => void;
}

export function NavLinks({
  locale,
  className = "",
  itemClassName = "",
  onNavigate,
}: NavLinksProps) {
  const pathname = usePathname();
  const config = navigationConfig[locale];

  return (
    <ul className={`nav-link-list ${className}`}>
      {config.mainNav.map((item) => {
        const localizedHref = getLocalizedHref(item.href, locale);
        const isAnchor = item.href.startsWith("#") || item.href.startsWith("/#");
        const isActive =
          !isAnchor &&
          (pathname === localizedHref ||
            (item.href !== "/" && pathname?.startsWith(`${localizedHref}/`)));

        return (
          <li key={item.key} className="nav-link-item">
            <Link
              href={localizedHref}
              className={`nav-link ${isActive ? "nav-link-active" : ""} ${itemClassName}`}
              aria-current={isActive ? "page" : undefined}
              onClick={onNavigate}
            >
              <span className="nav-link-index" aria-hidden="true">
                {item.index}
              </span>
              <span className="nav-link-label">{item.label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
