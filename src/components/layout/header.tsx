"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";
import { NavLinks } from "@/components/navigation/nav-links";
import { LocaleSwitcher } from "@/components/navigation/locale-switcher";
import { ThemeToggle } from "@/components/navigation/theme-toggle";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { syncContactRoute } from "@/components/contact/contact-draft-store";

interface HeaderProps {
  locale: Locale;
}

export function Header({ locale }: HeaderProps) {
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const [navKey, setNavKey] = useState(0);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setNavKey((k) => k + 1);
  }

  useEffect(() => {
    syncContactRoute(pathname);
  }, [pathname]);

  // Check if initial splash is active to coordinate header entrance
  const [isSplashActive, setIsSplashActive] = useState(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.classList.contains("splash-active");
    }
    return false;
  });

  useEffect(() => {
    if (typeof document === "undefined") return;
    const checkSplash = () => {
      setIsSplashActive(
        document.documentElement.classList.contains("splash-active"),
      );
    };
    checkSplash();
    const observer = new MutationObserver(checkSplash);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const shouldAnimate = !isSplashActive && navKey > 0;

  return (
    <header
      key={shouldAnimate ? `header-nav-${navKey}` : undefined}
      className={`site-header sticky top-0 z-40 bg-(--header-bg) border-b border-(--header-border) transition-colors duration-200 ${
        shouldAnimate ? "header-nav-entrance" : ""
      }`}
      role="banner"
    >
      <div className="site-header-inner max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-[3.625rem] flex items-center justify-between gap-4">
        {/* Brand / Typographic Masthead */}
        <div className="site-brand flex items-center shrink-0">
          <Link
            href={`/${locale}`}
            id="site-header-brand"
            className="brand-link group inline-flex items-center gap-2 min-h-[2.75rem] text-(--color-foreground) rounded-[2px] transition-all duration-150 focus-visible:outline-2 focus-visible:outline-(--color-accent) focus-visible:outline-offset-4 active:scale-[0.98] active:opacity-80"
            aria-label={locale === "id" ? "annastriwidagdo.me - Beranda" : "annastriwidagdo.me - Home"}
          >
            <span
              className="brand-marker text-(--color-foreground) group-hover:text-(--color-accent) group-focus-visible:text-(--color-accent) text-xs leading-none transition-colors duration-200"
              aria-hidden="true"
            >
              ■
            </span>
            <span className="brand-wordmark font-mono text-sm sm:text-base font-semibold tracking-tight text-(--color-foreground) whitespace-nowrap relative inline-flex items-center leading-none">
              annastriwidagdo.me
              <span
                className="brand-underline absolute -bottom-1 left-0 right-0 h-[1px] bg-(--color-accent) opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200"
                aria-hidden="true"
              />
            </span>
          </Link>
        </div>

        {/* Desktop Navigation Links (Visible on 1024px+) */}
        <nav
          className="desktop-nav hidden lg:flex items-center gap-1 xl:gap-2"
          role="navigation"
          aria-label={locale === "id" ? "Navigasi Utama" : "Main Navigation"}
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
