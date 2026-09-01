"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";
import { getLocalizedHref, isRouteActive } from "@/lib/i18n/paths";
import { navigationConfig } from "@/content/site/navigation";
import { LocaleSwitcher } from "./locale-switcher";
import { ThemeToggle } from "./theme-toggle";

interface MobileNavProps {
  locale: Locale;
}

export function MobileNav({ locale }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const config = navigationConfig[locale];
  const isId = locale === "id";

  // Close menu on route change
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  // Lock body scroll, manage focus trap, handle Escape key, window resize, and background focus prevention
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Set aria-hidden on background elements to prevent screen reader/focus leaks
    const mainContent = document.getElementById("main-content");
    const siteFooter = document.querySelector("footer");
    if (mainContent) mainContent.setAttribute("aria-hidden", "true");
    if (siteFooter) siteFooter.setAttribute("aria-hidden", "true");

    const sheetEl = sheetRef.current;

    // Helper to get all focusable elements within the modal dialog
    const getFocusables = (): HTMLElement[] => {
      if (!sheetEl) return [];
      return Array.from(
        sheetEl.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
    };

    // Initially focus the close button or first navigation link inside the sheet
    const focusables = getFocusables();
    if (closeBtnRef.current) {
      closeBtnRef.current.focus();
    } else if (focusables.length > 0) {
      focusables[0].focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();
        return;
      }

      if (e.key === "Tab") {
        const currentFocusables = getFocusables();
        if (currentFocusables.length === 0) return;

        const firstEl = currentFocusables[0];
        const lastEl = currentFocusables[currentFocusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      document.body.style.overflow = originalOverflow;
      if (mainContent) mainContent.removeAttribute("aria-hidden");
      if (siteFooter) siteFooter.removeAttribute("aria-hidden");
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  const handleNavClick = (e: React.MouseEvent, isActive: boolean) => {
    if (isActive) {
      e.preventDefault();
      setIsOpen(false);
      setTimeout(() => {
        triggerRef.current?.focus();
      }, 0);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <div className="mobile-nav-container">
      {/* Mobile Menu Toggle Button in Header */}
      <button
        ref={triggerRef}
        type="button"
        className="mobile-nav-toggle inline-flex items-center gap-1.5 px-2.5 py-1.5 min-h-[44px] min-w-[44px] justify-center border border-(--header-border) bg-(--header-bg) text-(--color-foreground) font-mono text-xs font-semibold rounded-[2px] hover:border-(--color-accent) focus-visible:outline-2 focus-visible:outline-(--color-accent) focus-visible:outline-offset-2 transition-colors cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-sheet"
        aria-label={isOpen ? config.labels.closeMenu : config.labels.menu}
      >
        <span className="text-(--color-accent) text-xs" aria-hidden="true">
          {isOpen ? "✕" : "■"}
        </span>
        <span className="uppercase tracking-tight">
          {isOpen ? "CLOSE" : "MENU"}
        </span>
      </button>

      {/* Editorial Fullscreen Dynamic Viewport Table of Contents Overlay */}
      {isOpen && (
        <div
          ref={sheetRef}
          id="mobile-nav-sheet"
          className="mobile-nav-sheet fixed inset-0 z-50 bg-(--background) text-(--foreground) flex flex-col overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label={isId ? "Daftar Isi Navigasi" : "Table of Contents Navigation"}
        >
          {/* 1. Slim Top Bar: Sticky/Fixed within overlay, matching closed Header geometry & gutter alignment */}
          <div className="sticky top-0 z-10 bg-(--header-bg) border-b border-(--header-border) shrink-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-[3.625rem] flex items-center justify-between gap-4">
              <Link
                href={`/${locale}`}
                onClick={(e) => handleNavClick(e, pathname === `/${locale}` || pathname === `/${locale}/`)}
                className="brand-link inline-flex items-center gap-2 min-h-[2.75rem] text-(--color-foreground) rounded-[2px] transition-all duration-150 focus-visible:outline-2 focus-visible:outline-(--color-accent) focus-visible:outline-offset-4 active:scale-[0.98] active:opacity-80"
                aria-label={isId ? "annastriwidagdo.me - Beranda" : "annastriwidagdo.me - Home"}
              >
                <span className="brand-marker text-(--color-accent) text-xs leading-none" aria-hidden="true">
                  ■
                </span>
                <span className="brand-wordmark font-mono text-sm sm:text-base font-semibold tracking-tight text-(--color-foreground) whitespace-nowrap">
                  annastriwidagdo.me
                </span>
              </Link>

              <button
                ref={closeBtnRef}
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  triggerRef.current?.focus();
                }}
                className="mobile-nav-toggle inline-flex items-center gap-1.5 px-2.5 py-1.5 min-h-[44px] min-w-[44px] justify-center border border-(--header-border) bg-(--header-bg) text-(--color-foreground) font-mono text-xs font-semibold rounded-[2px] hover:border-(--color-accent) focus-visible:outline-2 focus-visible:outline-(--color-accent) transition-colors cursor-pointer"
                aria-label={config.labels.closeMenu}
              >
                <span className="text-(--color-accent) text-xs" aria-hidden="true">
                  ✕
                </span>
                <span className="uppercase tracking-tight">CLOSE</span>
              </button>
            </div>
          </div>

          {/* Scrollable Content Region */}
          <div className="flex-1 overflow-y-auto overscroll-y-contain min-h-0 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full min-h-full flex flex-col justify-between py-4 sm:py-6 pb-[max(2rem,calc(env(safe-area-inset-bottom)+1.5rem))] gap-6">
              {/* 2. Primary Numbered Navigation */}
              <div className="flex flex-col gap-3 w-full max-w-lg mx-auto">
                <div className="flex items-center justify-between border-b border-(--color-border)/70 pb-2 font-mono text-xs text-(--color-muted)">
                  <span className="font-semibold text-(--color-accent) uppercase tracking-wider">
                    [INDEX // 01]
                  </span>
                  <span className="uppercase tracking-wider">
                    {isId ? "DAFTAR ISI" : "TABLE OF CONTENTS"}
                  </span>
                </div>

                {/* Navigation List */}
                <nav
                  className="flex flex-col gap-1.5 sm:gap-2"
                  aria-label={isId ? "Navigasi Utama Mobile" : "Mobile Main Navigation"}
                >
                  {config.mainNav.map((item) => {
                    const localizedHref = getLocalizedHref(item.href, locale);
                    const isActive = isRouteActive(item.href, pathname, locale);

                    return (
                      <Link
                        key={item.key}
                        href={localizedHref}
                        onClick={(e) => handleNavClick(e, isActive)}
                        className={`group flex items-center justify-between px-3.5 py-2 min-h-[44px] border rounded-[2px] transition-all duration-150 focus-visible:outline-2 focus-visible:outline-(--color-accent) focus-visible:outline-offset-2 active:scale-[0.98] active:opacity-80 relative ${
                          isActive
                            ? "border-(--color-accent) bg-(--color-surface-subtle,var(--background)) font-semibold text-(--color-foreground)"
                            : "border-(--color-border) bg-(--color-surface-subtle,var(--background)) text-(--color-muted) hover:text-(--color-foreground) hover:border-(--color-accent)"
                        }`}
                        aria-current={isActive ? "page" : undefined}
                      >
                        <div className="flex items-baseline gap-2.5 sm:gap-3">
                          <span className="font-mono text-xs font-bold text-(--color-accent)">
                            [{item.index}]
                          </span>
                          <span className="font-serif text-base sm:text-lg font-normal text-(--color-foreground) group-hover:text-(--color-accent) transition-colors">
                            {item.label}
                          </span>
                        </div>

                        {isActive ? (
                          <span className="flex items-center gap-1.5 text-(--color-accent) text-xs font-mono font-semibold">
                            <span aria-hidden="true">■</span>
                            <span>ACTIVE</span>
                          </span>
                        ) : (
                          <span className="text-(--color-muted) font-mono text-xs group-hover:text-(--color-accent) group-hover:translate-x-0.5 transition-all">
                            →
                          </span>
                        )}

                        {/* Active Underline Indicator */}
                        {isActive && (
                          <span
                            className="absolute bottom-0 left-3 right-3 h-[2px] bg-(--color-accent)"
                            aria-hidden="true"
                          />
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Bottom Group: 3. Language & Theme, 4. Bottom Identity Block, 5. Colophon */}
              <div className="flex flex-col gap-3.5 w-full max-w-lg mx-auto border-t border-(--color-border) pt-3 sm:pt-4 shrink-0">
                {/* 3. Language & Theme Controls */}
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-(--color-muted) uppercase tracking-wider">
                    {isId ? "SISTEM //" : "SYSTEM //"}
                  </span>
                  <div className="flex items-center gap-3">
                    <LocaleSwitcher locale={locale} onSelect={() => setIsOpen(false)} />
                    <ThemeToggle locale={locale} />
                  </div>
                </div>

                {/* 4. Bottom Identity Block & 5. Colophon */}
                <div className="flex flex-col items-center gap-1.5 pt-2 border-t border-(--color-border)/60 text-center">
                  <Link
                    href={`/${locale}`}
                    onClick={(e) => handleNavClick(e, pathname === `/${locale}` || pathname === `/${locale}/`)}
                    className="brand-link inline-flex items-center gap-2 min-h-[44px] text-(--color-foreground) rounded-[2px] transition-all duration-150 focus-visible:outline-2 focus-visible:outline-(--color-accent) focus-visible:outline-offset-2 active:scale-[0.98] active:opacity-80"
                    aria-label={isId ? "annastriwidagdo.me - Beranda" : "annastriwidagdo.me - Home"}
                  >
                    <span className="brand-marker text-(--color-accent) text-xs leading-none" aria-hidden="true">
                      ■
                    </span>
                    <span className="brand-wordmark font-mono text-xs sm:text-sm font-semibold tracking-tight text-(--color-foreground)">
                      annastriwidagdo.me
                    </span>
                  </Link>

                  <div className="font-mono text-[11px] text-(--color-muted) select-none">
                    Drafted in grids, shipped in code.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
