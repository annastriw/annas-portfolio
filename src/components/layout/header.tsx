import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { NavLinks } from "@/components/navigation/nav-links";
import { LocaleSwitcher } from "@/components/navigation/locale-switcher";
import { ThemeToggle } from "@/components/navigation/theme-toggle";
import { MobileNav } from "@/components/navigation/mobile-nav";

interface HeaderProps {
  locale: Locale;
}

export function Header({ locale }: HeaderProps) {
  return (
    <header
      className="site-header sticky top-0 z-40 bg-(--header-bg) border-b border-(--header-border) transition-colors duration-200"
      role="banner"
    >
      <div className="site-header-inner max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand / Typographic Masthead */}
        <div className="site-brand flex items-center shrink-0">
          <Link
            href={`/${locale}`}
            id="site-header-brand"
            className="brand-link group inline-flex items-baseline gap-2 text-(--color-foreground) hover:opacity-90 transition-opacity"
            aria-label="annastriwidagdo.me — Home"
          >
            <span
              className="brand-marker text-(--color-accent) text-xs leading-none transition-transform duration-200 group-hover:scale-110"
              aria-hidden="true"
            >
              ■
            </span>
            <span className="brand-wordmark font-mono text-sm sm:text-base font-semibold tracking-tight text-(--color-foreground)">
              annastriwidagdo.me
            </span>
          </Link>
        </div>

        {/* Desktop Navigation Links (Visible on 1024px+) */}
        <nav
          className="desktop-nav hidden lg:flex items-center gap-1 xl:gap-2"
          role="navigation"
          aria-label="Main Navigation"
        >
          <NavLinks locale={locale} />
        </nav>

        {/* Utility Controls: Editorial Language & Theme (Visible on 1024px+) */}
        <div className="desktop-utilities hidden lg:flex items-center gap-3 shrink-0">
          <LocaleSwitcher locale={locale} />
          <ThemeToggle locale={locale} />
        </div>

        {/* Mobile / Tablet Navigation Toggle & Drawer (Visible below 1024px) */}
        <div className="mobile-nav-wrapper flex lg:hidden items-center">
          <MobileNav locale={locale} />
        </div>
      </div>
    </header>
  );
}
