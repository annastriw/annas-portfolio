import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";

interface HeroSectionProps {
  locale: Locale;
}

const heroCopy = {
  en: {
    systemTag: "SYS.2026 // SIGNAL ARCHIVE",
    location: "LOC: SEMARANG, ID [UTC+7]",
    availability: "STATUS: OPEN FOR OPPORTUNITIES",
    name: "ANNAS TRI WIDAGDO",
    lead: "Software Engineer & AI Practitioner building robust web systems, intelligent classification models, and technical editorial digital products.",
    description:
      "Specialized in fullstack web development (Next.js, Laravel), machine learning prototypes (Python, Scikit-learn), and reliable software architectures grounded in real-world evidence.",
    exploreCta: "Explore Projects Index",
    contactCta: "Initiate Contact",
    portraitCaption: "PROFILE // EVIDENCE FIG.01",
  },
  id: {
    systemTag: "SYS.2026 // ARSIP SINYAL",
    location: "LOKASI: SEMARANG, ID [UTC+7]",
    availability: "STATUS: TERSEDIA UNTUK KOLABORASI",
    name: "ANNAS TRI WIDAGDO",
    lead: "Software Engineer & Praktisi AI yang membangun sistem web yang tangguh, model klasifikasi cerdas, dan produk digital bertaraf technical editorial.",
    description:
      "Berfokus pada pengembangan web fullstack (Next.js, Laravel), purwarupa machine learning (Python, Scikit-learn), dan arsitektur perangkat lunak andal berbasis implementasi nyata.",
    exploreCta: "Lihat Arsip Proyek",
    contactCta: "Hubungi Langsung",
    portraitCaption: "PROFIL // BUKTI FIG.01",
  },
};

export function HeroSection({ locale }: HeroSectionProps) {
  const copy = heroCopy[locale];

  return (
    <section className="home-hero-section" aria-label="Introduction and Overview">
      <div className="home-hero-container">
        {/* Top Technical Metadata Rail */}
        <div className="home-hero-top-rail">
          <div className="hero-rail-group">
            <span className="hero-rail-tag">{copy.systemTag}</span>
            <span className="hero-rail-tag">{copy.location}</span>
          </div>
          <div className="hero-rail-status">
            <span className="hero-status-dot" aria-hidden="true"></span>
            <span className="hero-status-text">{copy.availability}</span>
          </div>
        </div>

        {/* Main Grid: Headline & Text + Offset Portrait */}
        <div className="home-hero-grid">
          <div className="home-hero-content">
            <h1 className="home-hero-name">{copy.name}</h1>
            <p className="home-hero-lead">{copy.lead}</p>
            <p className="home-hero-description">{copy.description}</p>

            <div className="home-hero-actions">
              <Link
                href={`/${locale}/projects`}
                className="hero-btn-primary"
              >
                <span>{copy.exploreCta}</span>
                <span className="hero-btn-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
              <a href="#contact" className="hero-btn-secondary">
                <span>{copy.contactCta}</span>
                <span className="hero-btn-arrow" aria-hidden="true">
                  ↓
                </span>
              </a>
            </div>
          </div>

          {/* Portrait Visual Frame */}
          <div className="home-hero-portrait-col">
            <figure className="hero-portrait-figure">
              <div className="hero-portrait-frame">
                <Image
                  src="/assets/me/pas-foto.webp"
                  alt="Annas Tri Widagdo — Software Engineer"
                  width={380}
                  height={480}
                  priority
                  sizes="(max-width: 768px) 100vw, 380px"
                  className="hero-portrait-img"
                />
              </div>
              <figcaption className="hero-portrait-caption">
                <span className="portrait-caption-tag">[VERIFIED]</span>
                <span className="portrait-caption-text">{copy.portraitCaption}</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
