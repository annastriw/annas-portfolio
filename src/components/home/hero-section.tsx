import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";
import { SystemClock } from "./system-clock";
import { ContinuousRoles } from "./hero/continuous-roles";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { siteIdentity } from "@/content/site/identity";

interface HeroSectionProps {
  locale: Locale;
}

export function HeroSection({ locale }: HeroSectionProps) {
  const isId = locale === "id";

  const copy = {
    sectionTag: "[01 // PROFILE]",
    introTitle: isId ? "RINGKASAN PROFESIONAL" : "PROFESSIONAL SUMMARY",
    greeting: isId ? "Halo, saya" : "Hello, I’m",
    name: "Annas Tri Widagdo",
    roleIntro: isId ? "Saya seorang" : "I'm a",
    personalBrand: isId
      ? "Saya adalah Software Engineer dan fresh graduate Teknik Komputer Universitas Diponegoro yang berfokus pada full-stack web development dan machine learning. Saya mengubah permasalahan menjadi software product yang dirancang berdasarkan kebutuhan pengguna. Saya ingin setiap solusi yang saya kembangkan bekerja dengan andal, memberikan manfaat yang jelas, dan mudah digunakan."
      : "I am a Software Engineer and a fresh graduate in Computer Engineering from Diponegoro University, focused on full-stack web development and machine learning. I turn problems into software products designed around what users actually need. I want every solution I develop to work reliably, provide clear value, and be easy to use.",
    location: siteIdentity.location,
    statusText: isId ? "Terbuka untuk Kolaborasi" : "Open to Collaboration",
    primaryCta: isId ? "Jelajahi Arsip Proyek" : "Explore Project Archive",
    secondaryCta: isId ? "Mulai Percakapan" : "Start a Conversation",
    portraitTag: "[01 // PROFILE]",
    portraitCaption: "PORTRAIT // FIG.01",
  };

  return (
    <section
      className="home-hero-section py-8 sm:py-10 md:py-12 lg:py-16 border-b border-(--color-border) overflow-hidden"
      aria-label={isId ? "Ringkasan Profesional" : "Professional Summary"}
    >
      <div className="home-hero-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="home-hero-layout grid grid-cols-1 lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_320px] gap-6 lg:gap-x-12 xl:gap-x-16 items-start">
            {/* 1. Header & Section Index */}
            <div className="hero-intro-header lg:col-span-2 flex items-center gap-2.5 font-mono text-xs text-(--color-muted) border-b border-(--color-border)/70 pb-2.5">
              <span className="font-bold text-(--color-accent)">
                {copy.sectionTag}
              </span>
              <span className="text-(--color-border)" aria-hidden="true">
                /
              </span>
              <span className="uppercase tracking-wider font-semibold">
                {copy.introTitle}
              </span>
            </div>

            {/* 2. Primary Masthead Headline: Greeting & Dominant Name */}
            <div className="hero-identity-block lg:col-span-2 flex flex-col gap-1">
              <span className="font-mono text-xs sm:text-sm text-(--color-muted) uppercase tracking-wider font-medium">
                {copy.greeting}
              </span>
              <h1 className="home-hero-name font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5rem] font-normal tracking-tight text-(--color-foreground) leading-[1.0] m-0 break-words">
                {copy.name}
              </h1>
            </div>

            {/* 3. Slim Editorial Role Rail */}
            <div className="hero-role-block lg:col-span-2 w-full">
              <ContinuousRoles locale={locale} roleIntro={copy.roleIntro} />
            </div>

            {/* 4. Bio Narrative (Left Column on Desktop; Order 4 on Mobile) */}
            <div className="hero-bio-col lg:col-start-1 flex flex-col gap-6">
              <p className="home-hero-description font-sans text-sm sm:text-base text-(--color-muted) leading-relaxed max-w-[65ch] m-0">
                {copy.personalBrand}
              </p>

              {/* Desktop Actions & Metadata Rail (Rendered inline in left column for desktop) */}
              <div className="hidden lg:flex flex-col gap-5 pt-1">
                <div className="home-hero-actions flex flex-row items-center gap-4">
                  <Link
                    href={`/${locale}/projects`}
                    className="btn-editorial-primary"
                  >
                    <span>{copy.primaryCta}</span>
                    <span className="btn-arrow" aria-hidden="true">
                      {"\u2192"}
                    </span>
                  </Link>

                  <Link
                    href={`/${locale}/contact`}
                    className="btn-editorial-secondary"
                  >
                    <span className="btn-label-wrap">{copy.secondaryCta}</span>
                    <span className="btn-arrow" aria-hidden="true">
                      {"\u2192"}
                    </span>
                  </Link>
                </div>

                {/* Compact Metadata Rail */}
                <div className="hero-meta-rail flex flex-wrap items-center gap-2.5 sm:gap-3.5 border-t border-(--color-border) pt-3 font-mono text-xs text-(--color-muted)">
                  <div className="flex items-center gap-1.5">
                    <span className="text-(--color-accent) font-bold">■</span>
                    <span className="text-(--color-foreground) font-medium">
                      {copy.location}
                    </span>
                  </div>
                  <span className="text-(--color-border)" aria-hidden="true">
                    /
                  </span>
                  <SystemClock />
                  <span className="text-(--color-border)" aria-hidden="true">
                    /
                  </span>
                  <div className="inline-flex items-center gap-2">
                    <span className="hero-status-beacon" aria-hidden="true">
                      <span className="hero-status-ping" />
                      <span className="hero-status-dot" />
                    </span>
                    <span className="text-[11px] font-medium text-(--color-foreground)">
                      {copy.statusText}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 5. Portrait Evidence Frame (Right Column on Desktop; Order 5 on Mobile/Tablet) */}
            <div className="hero-portrait-col lg:col-start-2 flex justify-center lg:justify-end self-start my-2 lg:my-0">
              <figure className="hero-portrait-figure m-0 flex flex-col gap-2 w-full max-w-[240px] sm:max-w-[270px] lg:max-w-[320px]">
                <div className="hero-portrait-frame border border-(--color-border) p-1.5 bg-(--color-background) aspect-[3/4] relative overflow-hidden rounded-none">
                  <Image
                    src="/assets/profile/pas-foto.webp"
                    alt={
                      isId
                        ? "Foto potret Annas Tri Widagdo"
                        : "Portrait photo of Annas Tri Widagdo"
                    }
                    width={320}
                    height={427}
                    priority
                    sizes="(max-width: 640px) 240px, (max-width: 1024px) 270px, 320px"
                    className="hero-portrait-img object-cover object-top w-full h-full rounded-none"
                  />
                </div>
                <figcaption className="hero-portrait-caption flex justify-between items-center font-mono text-[11px] text-(--color-muted) px-1">
                  <span className="text-(--color-accent) font-semibold">
                    {copy.portraitTag}
                  </span>
                  <span>{copy.portraitCaption}</span>
                </figcaption>
              </figure>
            </div>

            {/* 6. Actions & 7. Metadata Rail for Tablet & Mobile (Visible below lg, after Portrait) */}
            <div className="flex lg:hidden flex-col gap-5 pt-1 w-full">
              <div className="home-hero-actions flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <Link
                  href={`/${locale}/projects`}
                  className="btn-editorial-primary"
                >
                  <span>{copy.primaryCta}</span>
                  <span className="btn-arrow" aria-hidden="true">
                    {"\u2192"}
                  </span>
                </Link>

                <Link
                  href={`/${locale}/contact`}
                  className="btn-editorial-secondary"
                >
                  <span className="btn-label-wrap">{copy.secondaryCta}</span>
                  <span className="btn-arrow" aria-hidden="true">
                    {"\u2192"}
                  </span>
                </Link>
              </div>

              {/* Compact Metadata Rail */}
              <div className="hero-meta-rail flex flex-wrap items-center gap-2.5 sm:gap-3.5 border-t border-(--color-border) pt-3 font-mono text-xs text-(--color-muted)">
                <div className="flex items-center gap-1.5">
                  <span className="text-(--color-accent) font-bold">■</span>
                  <span className="text-(--color-foreground) font-medium">
                    {copy.location}
                  </span>
                </div>
                <span className="text-(--color-border)" aria-hidden="true">
                  /
                </span>
                <SystemClock />
                <span className="text-(--color-border)" aria-hidden="true">
                  /
                </span>
                <div className="inline-flex items-center gap-2">
                  <span className="hero-status-beacon" aria-hidden="true">
                    <span className="hero-status-ping" />
                    <span className="hero-status-dot" />
                  </span>
                  <span className="text-[11px] font-medium text-(--color-foreground)">
                    {copy.statusText}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
