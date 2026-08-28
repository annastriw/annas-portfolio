"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";
import { getLocalizedHref } from "@/lib/i18n/paths";
import { navigationConfig } from "@/content/site/navigation";
import { siteIdentity } from "@/content/site/identity";
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
  const config = navigationConfig[locale];
  const isId = locale === "id";

  // Close menu on route change
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  // Lock body scroll, manage focus trap, handle Escape key and window resize
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus the first link or dialog on open
    const sheetEl = sheetRef.current;
    const focusableElements = sheetEl?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    if (focusableElements && focusableElements.length > 0) {
      focusableElements[0].focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();
        return;
      }

      if (e.key === "Tab" && sheetEl) {
        const focusables = Array.from(
          sheetEl.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        );
        if (focusables.length === 0) return;

        const firstEl = focusables[0];
        const lastEl = focusables[focusables.length - 1];

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
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  return (
    <div className="mobile-nav-container">
      {/* Mobile Menu Toggle Button */}
      <button
        ref={triggerRef}
        type="button"
        className="mobile-nav-toggle inline-flex items-center gap-1.5 px-2.5 py-1.5 border border-(--header-border) bg-(--header-bg) text-(--color-foreground) font-mono text-xs font-semibold rounded-[2px] hover:border-(--color-accent) transition-colors"
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

      {/* Editorial Table of Contents Full-Screen / Full-Width Sheet */}
      {isOpen && (
        <div
          ref={sheetRef}
          id="mobile-nav-sheet"
          className="fixed inset-0 top-[49px] z-50 bg-(--color-background) border-t border-(--header-border) overflow-y-auto p-5 sm:p-8 flex flex-col justify-between gap-8 animate-in fade-in slide-in-from-top-2 duration-200"
          role="dialog"
          aria-modal="true"
          aria-label={isId ? "Daftar Isi Navigasi" : "Table of Contents Navigation"}
        >
          {/* Top Section: Table of Contents */}
          <div className="flex flex-col gap-6 max-w-md mx-auto w-full">
            <div className="flex items-center justify-between border-b border-(--color-border) pb-2 font-mono text-xs text-(--color-muted)">
              <span className="font-semibold text-(--color-accent) uppercase tracking-wider">
                [INDEX // 01]
              </span>
              <span className="uppercase tracking-wider">
                {isId ? "DAFTAR ISI" : "TABLE OF CONTENTS"}
              </span>
            </div>

            {/* Navigation List */}
            <nav
              className="flex flex-col gap-2"
              aria-label={isId ? "Navigasi Utama Mobile" : "Mobile Main Navigation"}
            >
              {config.mainNav.map((item) => {
                const localizedHref = getLocalizedHref(item.href, locale);
                const isActive =
                  pathname === localizedHref ||
                  (item.href !== "/" && pathname?.startsWith(`${localizedHref}/`));

                return (
                  <Link
                    key={item.key}
                    href={localizedHref}
                    onClick={() => setIsOpen(false)}
                    className={`group flex items-center justify-between p-2.5 border border-(--color-border) bg-(--color-surface-subtle,var(--color-background)) hover:border-(--color-accent) transition-all ${
                      isActive ? "border-(--color-accent) bg-(--color-background)" : ""
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-xs font-bold text-(--color-accent)">
                        [{item.index}]
                      </span>
                      <span className="font-serif text-lg sm:text-xl font-normal text-(--color-foreground) group-hover:text-(--color-accent) transition-colors">
                        {item.label}
                      </span>
                    </div>

                    {isActive ? (
                      <span className="text-(--color-accent) text-xs font-mono font-semibold">
                        ● ACTIVE
                      </span>
                    ) : (
                      <span className="text-(--color-muted) font-mono text-xs group-hover:text-(--color-accent) group-hover:translate-x-0.5 transition-all">
                        →
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bottom Controls: Language & Theme Switcher */}
          <div className="flex flex-col gap-4 max-w-md mx-auto w-full pt-4 border-t border-(--color-border)">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-(--color-muted) uppercase tracking-wider">
                {isId ? "SISTEM //" : "SYSTEM //"}
              </span>
              <div className="flex items-center gap-3">
                <LocaleSwitcher locale={locale} />
                <ThemeToggle locale={locale} />
              </div>
            </div>

            <div className="flex items-center justify-between font-mono text-[11px] text-(--color-muted) pt-2">
              <span>{siteIdentity.locationMetadata}</span>
              <span>{siteIdentity.brand}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
