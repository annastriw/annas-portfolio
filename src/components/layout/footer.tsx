import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { navigationConfig } from "@/data/navigation";
import { getLocalizedHref } from "@/lib/i18n/paths";
import { ThemeControl } from "@/components/theme/theme-control";

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  const config = navigationConfig[locale];

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="site-footer-inner">
        {/* Top Grid */}
        <div className="footer-grid">
          {/* Column 1: Identity & Colophon */}
          <div className="footer-col footer-col-brand">
            <div className="footer-brand-header">
              <span className="footer-brand-marker" aria-hidden="true">
                ■
              </span>
              <span className="footer-brand-title">{config.colophon.title}</span>
            </div>
            <p className="footer-colophon-desc">
              {config.colophon.description}
            </p>
            <div className="footer-status-pill">
              <span className="status-indicator" aria-hidden="true"></span>
              <span className="status-text">
                SIGNAL / ARCHIVE — PORTFOLIO
              </span>
            </div>
          </div>

          {/* Column 2: Sitemap Navigation */}
          <div className="footer-col">
            <h2 className="footer-section-title">
              [01 // {config.labels.navigation.toUpperCase()}]
            </h2>
            <ul className="footer-link-list">
              {config.mainNav.map((item) => {
                const localizedHref = getLocalizedHref(item.href, locale);
                return (
                  <li key={item.key}>
                    <Link href={localizedHref} className="footer-nav-link">
                      <span className="footer-link-index" aria-hidden="true">
                        {item.index}
                      </span>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 3: Connect / Social */}
          <div className="footer-col">
            <h2 className="footer-section-title">
              [02 // {config.labels.connect.toUpperCase()}]
            </h2>
            <ul className="footer-link-list">
              {config.socialLinks.map((item) => (
                <li key={item.key}>
                  <a
                    href={item.href}
                    target={item.isExternal ? "_blank" : undefined}
                    rel={item.isExternal ? "noopener noreferrer" : undefined}
                    className="footer-nav-link"
                  >
                    <span>{item.label}</span>
                    {item.isExternal && (
                      <span className="footer-external-arrow" aria-hidden="true">
                        ↗
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: System & Location */}
          <div className="footer-col">
            <h2 className="footer-section-title">
              [03 // {config.labels.system.toUpperCase()}]
            </h2>
            <div className="footer-system-theme">
              <ThemeControl locale={locale} />
            </div>
            <div className="footer-location-block">
              <span className="footer-location-label">LOC / TIME:</span>
              <p className="footer-location-value">
                {config.colophon.location} [{config.colophon.timezone}]
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">{config.colophon.copyright}</p>
          <a href="#main-content" className="footer-back-to-top">
            ↑ {locale === "id" ? "Kembali ke atas" : "Back to top"}
          </a>
        </div>
      </div>
    </footer>
  );
}
