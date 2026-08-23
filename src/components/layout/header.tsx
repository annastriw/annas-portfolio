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
    <header className="site-header" role="banner">
      <div className="site-header-inner">
        {/* Brand / Typographic Masthead */}
        <div className="site-brand">
          <Link
            href={`/${locale}`}
            id="site-header-brand"
            className="brand-link"
            aria-label="annastriwidagdo.me — Home"
          >
            <span className="brand-marker" aria-hidden="true">
              ■
            </span>
            <span className="brand-wordmark">annastriwidagdo.me</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav
          className="desktop-nav"
          role="navigation"
          aria-label="Main Navigation"
        >
          <NavLinks locale={locale} />
        </nav>

        {/* Utility Controls: Editorial Language & Theme */}
        <div className="desktop-utilities">
          <LocaleSwitcher locale={locale} />
          <ThemeToggle locale={locale} />
        </div>

        {/* Mobile Navigation Toggle & Drawer */}
        <div className="mobile-nav-wrapper">
          <MobileNav locale={locale} />
        </div>
      </div>
    </header>
  );
}

