import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";
import { SystemClock } from "./system-clock";
import { ContinuousRoles } from "./hero/continuous-roles";

interface HeroSectionProps {
  locale: Locale;
}

export function HeroSection({ locale }: HeroSectionProps) {
  const isId = locale === "id";

  const copy = {
    sectionTag: "[01 // INTRO]",
    introTitle: isId ? "KENALAN DULU" : "LEMME INTRODUCE MYSELF",
    greeting: isId ? "Halo, saya" : "Hello, I'm",
    name: "Annas Tri Widagdo",
    roleLead: isId ? "Saya seorang" : "I'm a",
    personalBrand: isId
      ? "Lulusan baru Teknik Komputer Universitas Diponegoro yang senang mengubah kebutuhan nyata menjadi produk digital yang benar-benar dapat digunakan. Saya membangun solusi end-to-end melalui full-stack web development dan machine learning engineering dengan fokus pada kemudahan penggunaan, keandalan, dan implementasi yang praktis."
      : "Fresh Computer Engineering graduate from Diponegoro University who enjoys turning real-world needs into digital products that actually work. I build end-to-end solutions across full-stack web development and machine learning engineering, with a focus on usability, reliability, and practical implementation.",
    location: "KLATEN, CENTRAL JAVA, ID",
    statusText: isId ? "TERSEDIA UNTUK KOLABORASI" : "OPEN TO COLLABORATION",
    exploreCta: isId ? "Lihat Semua Proyek (10)" : "Explore Projects (10)",
    contactTeaser: isId ? "Terbuka Untuk Kolaborasi" : "Available for Collaboration",
    contactAction: isId ? "Kontak" : "Contact",
    portraitTag: isId ? "[REKAM PROFIL]" : "[PROFILE RECORD]",
    portraitCaption: "PORTRAIT // FIG.01",
  };

  return (
    <section
      className="home-hero-section py-8 sm:py-12 md:py-14 border-b border-(--color-border) overflow-hidden"
      aria-label={isId ? "Pengantar dan Profil Utama" : "Introduction and Professional Profile"}
    >
      <div className="home-hero-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Golden-Ratio Grid: Left Content (~60%) / Right Portrait (~40%) */}
        <div className="home-hero-grid grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6 lg:gap-10 items-start">
          {/* Left Column: Orchestrated Post-Splash Sequential Reveal */}
          <div className="home-hero-content flex flex-col gap-4 sm:gap-5">
            {/* 1. Section Tag & Intro Title (0–150ms / 100–350ms) */}
            <div className="hero-intro-header flex flex-col gap-0.5 animate-editorial-fade">
              <span className="font-mono text-xs font-semibold text-(--color-accent)">
                {copy.sectionTag}
              </span>
              <h2 className="font-mono text-xs sm:text-sm font-bold tracking-wider text-(--color-foreground) uppercase m-0 animate-editorial-mask delay-100">
                {copy.introTitle}
              </h2>
            </div>

            {/* 2. Greeting & Prominent Name Reveal (180–500ms) */}
            <div className="hero-identity-block flex flex-col gap-0.5 animate-editorial-mask delay-150">
              <span className="font-mono text-xs sm:text-sm text-(--color-muted)">
                {copy.greeting}
              </span>
              <h1 className="home-hero-name font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-(--color-foreground) leading-[1.05] m-0">
                {copy.name}
              </h1>
            </div>

            {/* 3. Role Lead & Continuous Role Ticker (300–650ms) */}
            <div className="hero-role-row flex flex-wrap items-center gap-2 animate-editorial-fade delay-300">
              <span className="font-mono text-xs sm:text-sm text-(--color-muted)">
                {copy.roleLead}
              </span>
              <ContinuousRoles />
            </div>

            {/* 4. Natural Personal Branding Copy (400–750ms) */}
            <p className="home-hero-description text-xs sm:text-sm md:text-base text-(--color-muted) leading-relaxed max-w-[62ch] m-0 animate-editorial-fade delay-400">
              {copy.personalBrand}
            </p>

            {/* 5. Location, Live Time & Soft Ambient Status Beacon (500–850ms) */}
            <div className="hero-meta-rail flex flex-wrap items-center gap-2.5 border-y border-(--color-border) py-2 font-mono text-xs text-(--color-muted) animate-editorial-fade delay-500">
              <div className="flex items-center gap-2">
                <span className="text-(--color-accent)">■</span>
                <span className="text-(--color-foreground) font-medium">{copy.location}</span>
              </div>
              <span className="text-(--color-border)" aria-hidden="true">
                /
              </span>
              <SystemClock />
              <span className="text-(--color-border)" aria-hidden="true">
                /
              </span>
              <div className="inline-flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full bg-emerald-500 animate-subtle-beacon"
                  aria-hidden="true"
                />
                <span className="text-[11px] font-medium text-(--color-foreground)">
                  {copy.statusText}
                </span>
              </div>
            </div>

            {/* 6. Action Block: Primary CTA & Interactive Teaser (650–1000ms) */}
            <div className="home-hero-actions flex flex-wrap items-center gap-3 sm:gap-5 pt-0.5 animate-editorial-fade delay-600">
              <Link
                href={`/${locale}/projects`}
                className="hero-btn-primary group inline-flex items-center gap-2 px-4 py-2 border border-(--color-foreground) bg-(--color-foreground) text-(--color-background) font-mono text-xs sm:text-sm font-semibold rounded-[2px] hover:bg-(--color-accent) hover:border-(--color-accent) transition-all duration-200"
              >
                <span>{copy.exploreCta}</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </Link>

              <Link
                href={`/${locale}/contact`}
                className="hero-contact-teaser group inline-flex items-center gap-1.5 py-1 border-b border-transparent hover:border-(--color-accent) transition-colors duration-200"
              >
                <span className="font-mono text-xs text-(--color-muted)">
                  {copy.contactTeaser}
                </span>
                <span className="font-mono text-xs font-semibold text-(--color-foreground) group-hover:text-(--color-accent) inline-flex items-center gap-1 transition-colors duration-200">
                  <span>{copy.contactAction}</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                    →
                  </span>
                </span>
              </Link>
            </div>
          </div>

          {/* Right Column: Portrait Visual Evidence Frame (500–950ms) */}
          <div className="home-hero-portrait-col flex justify-center lg:justify-end animate-editorial-fade delay-500">
            <figure className="hero-portrait-figure m-0 flex flex-col gap-2 w-full max-w-[260px] sm:max-w-[280px] lg:max-w-[300px]">
              <div className="hero-portrait-frame border border-(--color-border) p-1.5 bg-(--color-background) aspect-[4/5] relative overflow-hidden shadow-xs hover:border-(--color-accent) transition-colors duration-300">
                <Image
                  src="/assets/profile/pas-foto.webp"
                  alt="Annas Tri Widagdo — Software Engineer"
                  width={300}
                  height={375}
                  priority
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="hero-portrait-img object-cover object-top w-full h-full transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>
              <figcaption className="hero-portrait-caption flex justify-between items-center font-mono text-[11px] text-(--color-muted) px-1">
                <span className="text-(--color-accent) font-semibold">{copy.portraitTag}</span>
                <span>{copy.portraitCaption}</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
