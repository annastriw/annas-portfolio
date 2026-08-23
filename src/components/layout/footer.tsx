import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { navigationConfig } from "@/data/navigation";
import { getLocalizedHref } from "@/lib/i18n/paths";

interface FooterProps {
  locale: Locale;
}

const positioningRoles = [
  "Software Engineer",
  "Full-Stack Developer",
  "Machine Learning Engineer",
];

export function Footer({ locale }: FooterProps) {
  const config = navigationConfig[locale];
  const isId = locale === "id";

  return (
    <footer className="editorial-footer" role="contentinfo">
      <div className="editorial-footer-inner">
        {/* Main Editorial Bar: Identity + Roles + Contacts */}
        <div className="footer-main-row">
          {/* Identity & Status */}
          <div className="footer-brand-col">
            <div className="footer-brand-heading">
              <span className="footer-brand-dot" aria-hidden="true">
                ■
              </span>
              <span className="footer-brand-title">annastriwidagdo.me</span>
            </div>
            <p className="footer-positioning-line">
              {positioningRoles.join(" · ")}
            </p>
            <div className="footer-status-pill">
              <span className="status-indicator-dot" aria-hidden="true" />
              <span className="status-indicator-text">
                {isId ? "TERSEDIA UNTUK KOLABORASI" : "OPEN TO COLLABORATION"}
              </span>
            </div>
          </div>

          {/* Connect & Location Rail */}
          <div className="footer-connect-col">
            <div className="footer-connect-links">
              {config.socialLinks.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  target={item.isExternal ? "_blank" : undefined}
                  rel={item.isExternal ? "noopener noreferrer" : undefined}
                  className="footer-connect-link"
                >
                  <span>{item.label}</span>
                  {item.isExternal && (
                    <span className="external-arrow" aria-hidden="true">
                      ↗
                    </span>
                  )}
                </a>
              ))}
            </div>
            <div className="footer-meta-coordinates">
              <span>{isId ? "Klaten, Jawa Tengah" : "Klaten, Indonesia"}</span>
              <span className="coord-divider" aria-hidden="true">
                /
              </span>
              <span className="coord-tz">UTC+7</span>
            </div>
          </div>
        </div>

        {/* Bottom Technical Rail: Secondary Nav + Colophon + Back to Top */}
        <div className="footer-sub-row">
          <nav className="footer-secondary-nav" aria-label="Footer Navigation">
            {config.mainNav.map((item) => {
              const localizedHref = getLocalizedHref(item.href, locale);
              return (
                <Link
                  key={item.key}
                  href={localizedHref}
                  className="footer-sub-link"
                >
                  <span className="footer-sub-index" aria-hidden="true">
                    {item.index}
                  </span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="footer-colophon-actions">
            <span className="footer-copyright-note">
              {config.colophon.copyright}
            </span>
            <a
              href="#main-content"
              className="footer-top-btn"
              aria-label={isId ? "Kembali ke atas" : "Back to top"}
            >
              <span>TOP</span>
              <span className="arrow-top" aria-hidden="true">
                ↑
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
