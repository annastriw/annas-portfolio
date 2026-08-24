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
    <ul className={`nav-link-list flex items-center gap-1 sm:gap-2 list-none m-0 p-0 ${className}`}>
      {config.mainNav.map((item) => {
        const localizedHref = getLocalizedHref(item.href, locale);
        const isActive =
          pathname === localizedHref ||
          (item.href !== "/" && pathname?.startsWith(`${localizedHref}/`));

        return (
          <li key={item.key} className="nav-link-item inline-flex">
            <Link
              href={localizedHref}
              className={`header-nav-link group relative inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs font-medium uppercase tracking-tight transition-all duration-200 ${
                isActive
                  ? "text-(--color-foreground) font-semibold"
                  : "text-(--color-muted) hover:text-(--color-foreground)"
              } ${itemClassName}`}
              aria-current={isActive ? "page" : undefined}
              onClick={onNavigate}
            >
              <span className="nav-link-index text-[11px] text-(--header-accent)">
                {item.index}
              </span>
              <span className="nav-link-label">{item.label}</span>
              {isActive && (
                <span className="nav-active-dot text-(--color-accent) text-[9px] leading-none" aria-hidden="true">
                  ●
                </span>
              )}
              {/* Bottom hover rule */}
              <span
                className={`absolute bottom-0 left-3 right-3 h-[2px] transition-all duration-200 ${
                  isActive
                    ? "bg-(--color-accent)"
                    : "bg-transparent group-hover:bg-(--color-border)"
                }`}
                aria-hidden="true"
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
