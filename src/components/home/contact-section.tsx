import type { Locale } from "@/lib/i18n/config";
import { siteConfig } from "@/content/site/site-config";

interface ContactSectionProps {
  locale: Locale;
}

export function ContactSection({ locale }: ContactSectionProps) {
  const isId = locale === "id";

  const copy = {
    tag: "[05 // INITIATE TRANSMISSION]",
    subtag: isId ? "JALUR KONTAK & KOLABORASI" : "DIRECT CONTACT PATHS",
    title: isId
      ? "Mari Bangun Perangkat Lunak & Sistem Cerdas Bersama"
      : "Let's Build Robust Software & Intelligent Systems Together",
    lead: isId
      ? "Terbuka untuk peluang karir rekayasa perangkat lunak (Fullstack / Frontend / Backend), integrasi machine learning, maupun konsultasi arsitektur web."
      : "Open for full-time software engineering roles (Fullstack / Frontend / Backend), applied machine learning integration, and technical system architecture consulting.",
    emailLabel: isId ? "Surel Resmi" : "Direct Email",
    emailVal: siteConfig.contact.email,
    emailAction: isId ? "Kirim Email Langsung →" : "Send Direct Email →",
    linkedinLabel: "LinkedIn Network",
    linkedinVal: siteConfig.contact.linkedIn,
    linkedinAction: isId ? "Buka Profil LinkedIn ↗" : "View LinkedIn Profile ↗",
    githubLabel: "GitHub Repository",
    githubVal: siteConfig.contact.gitHub,
    githubAction: isId ? "Buka Profil GitHub ↗" : "View GitHub Profile ↗",
    locationLabel: isId ? "LOKASI UTAMA" : "BASE LOCATION",
    locationVal: `${siteConfig.contact.location} [${siteConfig.contact.timezone}]`,
    statusLabel: isId ? "STATUS KETERSEDIAAN" : "AVAILABILITY STATUS",
    statusVal: isId ? "TERSEDIA UNTUK KOLABORASI" : "OPEN TO COLLABORATION",
    responseTime: isId
      ? "Kanal kontak langsung tanpa perantara form backend pihak ketiga."
      : "Direct contact channels without third-party form intermediaries.",
  };

  return (
    <section id="contact" className="home-contact-section" aria-label="Contact and Collaboration">
      <div className="home-contact-container">
        {/* Section Header */}
        <div className="home-section-header">
          <div className="section-header-meta">
            <span className="section-meta-tag">{copy.tag}</span>
            <span className="section-meta-tag">{copy.subtag}</span>
          </div>
          <h2 className="section-title">{copy.title}</h2>
          <p className="section-subtitle">{copy.lead}</p>
        </div>

        {/* Contact Paths 3-Column Grid */}
        <div className="contact-grid">
          {/* Email Channel */}
          <div className="contact-card">
            <div className="contact-card-header">
              <span className="contact-card-tag">[CHANNEL 01]</span>
              <h3 className="contact-card-type">{copy.emailLabel}</h3>
            </div>
            <p className="contact-card-value">{copy.emailVal}</p>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="contact-card-action"
            >
              <span>{copy.emailAction}</span>
            </a>
          </div>

          {/* LinkedIn Channel */}
          <div className="contact-card">
            <div className="contact-card-header">
              <span className="contact-card-tag">[CHANNEL 02]</span>
              <h3 className="contact-card-type">{copy.linkedinLabel}</h3>
            </div>
            <p className="contact-card-value">{copy.linkedinVal}</p>
            <a
              href={siteConfig.contact.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card-action"
            >
              <span>{copy.linkedinAction}</span>
            </a>
          </div>

          {/* GitHub Channel */}
          <div className="contact-card">
            <div className="contact-card-header">
              <span className="contact-card-tag">[CHANNEL 03]</span>
              <h3 className="contact-card-type">{copy.githubLabel}</h3>
            </div>
            <p className="contact-card-value">{copy.githubVal}</p>
            <a
              href={siteConfig.contact.gitHubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card-action"
            >
              <span>{copy.githubAction}</span>
            </a>
          </div>
        </div>

        {/* Location & Availability Rail */}
        <div className="contact-bottom-rail">
          <div className="contact-rail-item">
            <span className="rail-label">{copy.locationLabel}:</span>
            <span className="rail-value">{copy.locationVal}</span>
          </div>
          <div className="contact-rail-item">
            <span className="rail-label">{copy.statusLabel}:</span>
            <span className="rail-value font-mono text-(--color-accent)">{copy.statusVal}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
