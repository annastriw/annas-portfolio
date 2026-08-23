import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";

interface HeroSectionProps {
  locale: Locale;
}

const heroCopy = {
  en: {
    systemTag: "SYS.2026 // SIGNAL ARCHIVE",
    location: "LOC: KLATEN, ID [UTC+7]",
    availability: "STATUS: OPEN TO COLLABORATION",
    name: "ANNAS TRI WIDAGDO",
    lead: "Software Engineer · Full-Stack Developer · Machine Learning Engineer",
    description:
      "Specialized in fullstack web architecture (Next.js, React, NestJS, Laravel), machine learning integration (Python, Scikit-learn, Hugging Face), and resilient software architectures grounded in verified implementation evidence.",
    exploreCta: "Explore Projects Archive (10)",
    contactCta: "Initiate Contact",
    portraitCaption: "PROFILE // VERIFIED FIG.01",
  },
  id: {
    systemTag: "SYS.2026 // ARSIP SINYAL",
    location: "LOKASI: KLATEN, ID [UTC+7]",
    availability: "STATUS: TERSEDIA UNTUK KOLABORASI",
    name: "ANNAS TRI WIDAGDO",
    lead: "Software Engineer · Full-Stack Developer · Machine Learning Engineer",
    description:
      "Berfokus pada arsitektur web fullstack (Next.js, React, NestJS, Laravel), integrasi machine learning (Python, Scikit-learn, Hugging Face), dan rekayasa perangkat lunak andal berbasis bukti implementasi nyata.",
    exploreCta: "Jelajahi Arsip Proyek (10)",
    contactCta: "Hubungi Langsung",
    portraitCaption: "PROFIL // BUKTI TERVERIFIKASI FIG.01",
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
            <p className="home-hero-lead font-mono text-sm tracking-wide text-(--color-accent)">
              {copy.lead}
            </p>
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
                  src="/assets/profile/pas-foto.webp"
                  alt="Annas Tri Widagdo — Software Engineer"
                  width={380}
                  height={480}
                  priority
                  sizes="(max-width: 768px) 100vw, 380px"
                  className="hero-portrait-img object-cover w-full h-full"
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
