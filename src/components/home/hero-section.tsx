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
    greeting: isId ? "Halo, saya" : "Hello, I’m",
    name: "Annas Tri Widagdo",
    roleIntro: isId ? "Saya seorang" : "I'm a",
    personalBrand: isId
      ? "Saya adalah Software Engineer dan fresh graduate Teknik Komputer Universitas Diponegoro yang berfokus pada full-stack web development, dengan minat pada AI, machine learning, dan data science. Saya mengubah permasalahan menjadi produk software yang dirancang sesuai kebutuhan pengguna. Saya ingin setiap solusi yang saya kembangkan dapat bekerja dengan andal, memberikan manfaat yang jelas, dan mudah digunakan."
      : "I am a Software Engineer and a fresh graduate in Computer Engineering from Diponegoro University, with a focus on full-stack web development and an interest in AI, machine learning, and data science. I turn problems into software products designed around what users actually need. I want every solution I develop to work reliably, provide clear value, and be easy to use.",
    location: siteIdentity.location,
    statusText: isId ? "Terbuka untuk Kolaborasi" : "Open to Collaboration",
    primaryCta: isId ? "Jelajahi Arsip Proyek" : "Explore Project Archive",
    secondaryCta: isId ? "Mulai Percakapan" : "Start a Conversation",
    portraitTag: "[01 // PROFILE]",
    portraitCaption: "PORTRAIT // FIG.01",
  };

  const portraitFigure = (
    <figure className="hero-portrait-figure m-0 flex flex-col gap-2 w-full max-w-[240px] sm:max-w-[270px] lg:max-w-[320px]">
      <div className="hero-portrait-frame border border-(--color-border) p-1.5 bg-(--color-background) aspect-[3/4] relative overflow-hidden rounded-none shadow-2xs">
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
          className="hero-portrait-img object-cover object-top w-full h-full rounded-none select-none"
        />
      </div>
      <figcaption className="hero-portrait-caption flex justify-between items-center font-mono text-[11px] text-(--color-muted) px-1">
        <span className="text-(--color-accent) font-semibold">
          {copy.portraitTag}
        </span>
        <span>{copy.portraitCaption}</span>
      </figcaption>
    </figure>
  );

  return (
    <section
      className="home-hero-section py-8 sm:py-10 md:py-12 lg:py-16 border-b border-(--color-border) overflow-hidden"
      aria-label={isId ? "Profil" : "Profile"}
    >
      <div className="home-hero-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="home-hero-layout grid grid-cols-1 lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_320px] gap-6 lg:gap-x-12 xl:gap-x-16 items-start">
            {/* 1. Header & Section Index */}
            <div className="hero-intro-header lg:col-span-2 flex items-center gap-2.5 font-mono text-xs text-(--color-muted) border-b border-(--color-border)/70 pb-2.5">
              <span className="font-bold text-(--color-accent)">
                {copy.sectionTag}
              </span>
            </div>

            {/* Left Column on Desktop (lg:col-start-1) / Sequential Flow on Mobile */}
            <div className="hero-left-col lg:col-start-1 flex flex-col gap-6 w-full min-w-0">
              {/* 2. Primary Masthead Headline: Greeting & Dominant Name */}
              <div className="hero-identity-block flex flex-col gap-1">
                <span className="font-mono text-xs sm:text-sm text-(--color-muted) uppercase tracking-wider font-medium">
                  {copy.greeting}
                </span>
                <h1 className="home-hero-name font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5rem] font-normal tracking-tight text-(--color-foreground) leading-[1.0] m-0 break-words">
                  {copy.name}
                </h1>
              </div>

              {/* 3. Slim Editorial Role Rail */}
              <div className="hero-role-block w-full">
                <ContinuousRoles locale={locale} roleIntro={copy.roleIntro} />
              </div>

              {/* 4. Bio Narrative */}
              <p className="home-hero-description font-sans text-sm sm:text-base text-(--color-muted) leading-relaxed max-w-[65ch] m-0">
                {copy.personalBrand}
              </p>

              {/* 5. Mobile/Tablet Portrait (Order 5 on Mobile, hidden on desktop) */}
              <div className="hero-portrait-mobile lg:hidden flex justify-center my-2">
                {portraitFigure}
              </div>

              {/* 6. Actions */}
              <div className="home-hero-actions flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1">
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

              {/* 7. Compact Metadata Rail (Rule width follows left column, aligned with role rail above) */}
              <div className="hero-meta-rail flex flex-wrap items-center gap-2.5 sm:gap-3.5 border-t border-(--color-border) pt-3 font-mono text-xs text-(--color-muted) w-full">
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

            {/* Right Column on Desktop: Portrait Evidence Frame (Top aligns with greeting in left column) */}
            <div className="hero-portrait-col hidden lg:flex lg:col-start-2 justify-end self-start">
              {portraitFigure}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
