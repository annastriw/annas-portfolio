import type { Locale } from "@/lib/i18n/config";
import { siteConfig } from "@/content/site/site-config";

interface AboutConnectProps {
  locale: Locale;
}

export function AboutConnect({ locale }: AboutConnectProps) {
  const isId = locale === "id";
  const { socialLinks } = siteConfig;

  return (
    <section
      className="about-connect-section"
      aria-label="Collaboration & Communication Channels"
    >
      <div className="about-connect-container">
        <div className="about-connect-header">
          <div className="section-header-meta">
            <span className="section-meta-tag">[05 // INITIATE TRANSMISSION]</span>
            <span className="section-meta-tag">
              {isId ? "KOLABORASI & KONTAK" : "COLLABORATION & CONTACT"}
            </span>
          </div>

          <h2 className="section-title">
            {isId
              ? "Mari Berdiskusi & Berkolaborasi"
              : "Initiate Dialogue & Collaboration"}
          </h2>

          <p className="section-subtitle">
            {isId
              ? "Terbuka untuk peluang rekayasa perangkat lunak (Fullstack / Frontend / Backend), perancangan sistem cerdas, dan kolaborasi teknis yang mengutamakan kualitas eksekusi."
              : "Open to software engineering opportunities (Fullstack / Frontend / Backend), intelligent system architecture, and technical collaborations prioritizing high execution standards."}
          </p>
        </div>

        <div className="about-connect-grid">
          {socialLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              target={link.isExternal ? "_blank" : undefined}
              rel={link.isExternal ? "noopener noreferrer" : undefined}
              className="about-connect-card"
            >
              <div className="connect-card-top">
                <span className="connect-card-label">[{link.label.toUpperCase()}]</span>
                <span className="connect-card-arrow" aria-hidden="true">
                  {link.isExternal ? "↗" : "→"}
                </span>
              </div>
              <p className="connect-card-val">{link.username}</p>
            </a>
          ))}
        </div>

        <div className="about-connect-footer-bar">
          <div className="connect-footer-meta">
            <span className="connect-dot" aria-hidden="true" />
            <span className="connect-status font-mono text-(--color-accent)">
              {isId ? "STATUS: TERSEDIA UNTUK KOLABORASI" : "STATUS: OPEN TO COLLABORATION"}
            </span>
          </div>
          <div className="connect-footer-loc">
            <span>KLATEN, CENTRAL JAVA, INDONESIA // UTC+7 (WIB)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
