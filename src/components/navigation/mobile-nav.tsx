"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";
import { navigationConfig } from "@/data/navigation";
import { NavLinks } from "./nav-links";
import { LocaleSwitcher } from "./locale-switcher";
import { ThemeControl } from "@/components/theme/theme-control";

interface MobileNavProps {
  locale: Locale;
}

export function MobileNav({ locale }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const config = navigationConfig[locale];

  // Adjust state during render when pathname changes
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
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
      <button
        ref={triggerRef}
        type="button"
        className="mobile-nav-toggle"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-dialog"
        aria-label={isOpen ? config.labels.closeMenu : config.labels.menu}
      >
        <span className="mobile-nav-toggle-icon" aria-hidden="true">
          {isOpen ? "✕" : "☰"}
        </span>
        <span className="mobile-nav-toggle-label">
          {isOpen ? config.labels.closeMenu : config.labels.menu}
        </span>
      </button>

      {isOpen && (
        <div
          id="mobile-nav-dialog"
          ref={menuRef}
          className="mobile-nav-dialog"
          role="dialog"
          aria-modal="true"
          aria-label={config.labels.navigation}
        >
          <div className="mobile-nav-content">
            <div className="mobile-nav-section">
              <span className="mobile-nav-section-label" aria-hidden="true">
                [01 // {config.labels.navigation.toUpperCase()}]
              </span>
              <NavLinks
                locale={locale}
                className="mobile-nav-links"
                itemClassName="mobile-nav-link"
                onNavigate={() => setIsOpen(false)}
              />
            </div>

            <div className="mobile-nav-section">
              <span className="mobile-nav-section-label" aria-hidden="true">
                [02 // {config.labels.connect.toUpperCase()}]
              </span>
              <ul className="mobile-social-links">
                {config.socialLinks.map((item) => (
                  <li key={item.key}>
                    <a
                      href={item.href}
                      target={item.isExternal ? "_blank" : undefined}
                      rel={item.isExternal ? "noopener noreferrer" : undefined}
                      className="mobile-social-link"
                    >
                      <span>{item.label}</span>
                      <span className="mobile-social-arrow" aria-hidden="true">
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mobile-nav-section">
              <span className="mobile-nav-section-label" aria-hidden="true">
                [03 // {config.labels.system.toUpperCase()}]
              </span>
              <div className="mobile-nav-system-controls">
                <div className="mobile-locale-wrapper">
                  <span className="mobile-control-title">
                    {config.labels.switchLanguage}
                  </span>
                  <LocaleSwitcher
                    locale={locale}
                    className="mobile-locale-switcher"
                    onSelect={() => setIsOpen(false)}
                  />
                </div>
                <div className="mobile-theme-wrapper">
                  <ThemeControl locale={locale} />
                </div>
              </div>
            </div>

            <div className="mobile-nav-footer">
              <p className="mobile-nav-location">
                {config.colophon.location} [{config.colophon.timezone}]
              </p>
              <p className="mobile-nav-copyright">
                {config.colophon.copyright}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
