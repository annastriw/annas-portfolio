import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";
import { SystemClock } from "./system-clock";
import { ContinuousRoles } from "./hero/continuous-roles";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

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
    roleLead: isId ? "Saya seorang" : "I’m a",
    personalBrand: isId
      ? "Saya adalah Software Engineer yang berfokus pada full-stack web development dan machine learning. Saya mengubah permasalahan nyata menjadi sistem dan produk software dengan menghubungkan antarmuka, backend, data, dan model machine learning. Saya ingin setiap solusi yang saya kembangkan dapat bekerja dengan andal, memberikan manfaat yang jelas, dan mudah digunakan."
      : "I am a Software Engineer focused on full-stack web development and machine learning. I turn real problems into software systems and products by connecting interfaces, backend systems, data, and machine learning models. I want every solution I build to work reliably, provide clear value, and be easy to use.",
    location: "Jakarta, Indonesia",
    statusText: isId ? "Terbuka untuk Kolaborasi" : "Open to Collaboration",
    primaryCta: isId ? "Jelajahi Arsip Proyek" : "Explore Project Archive",
    secondaryCta: isId ? "Mulai Percakapan" : "Start a Conversation",
    portraitTag: "[01 // PROFILE]",
    portraitCaption: "PORTRAIT // FIG.01",
  };

  return (
    <section
      className="home-hero-section py-12 sm:py-16 md:py-20 border-b border-(--color-border) overflow-hidden"
      aria-label={isId ? "Ringkasan Profesional" : "Professional Summary"}
    >
      <div className="home-hero-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Golden-Ratio Layout: Left Lead (~60%) / Right Portrait (~40%) */}
        <div className="home-hero-grid grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-12 items-start">
          {/* Left Column: Sequential Lead Typography */}
          <div className="home-hero-content flex flex-col gap-5 sm:gap-6">
            {/* Section Tag & Subtag */}
            <ScrollReveal animationClass="animate-editorial-fade">
              <div className="hero-intro-header flex items-center gap-3 font-mono text-xs text-(--color-muted)">
                <span className="font-semibold text-(--color-accent)">
                  {copy.sectionTag}
                </span>
                <span className="text-(--color-border)" aria-hidden="true">
                  /
                </span>
                <span className="uppercase tracking-wider">
                  {copy.introTitle}
                </span>
              </div>
            </ScrollReveal>

            {/* Greeting & Prominent Name */}
            <ScrollReveal delayMs={100} animationClass="animate-editorial-fade">
              <div className="hero-identity-block flex flex-col gap-1">
                <span className="font-mono text-xs sm:text-sm text-(--color-muted)">
                  {copy.greeting}
                </span>
                <h1 className="home-hero-name font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-(--color-foreground) leading-[1.05] m-0">
                  {copy.name}
                </h1>
              </div>
            </ScrollReveal>

            {/* Role Lead & Continuous Role Ticker */}
            <ScrollReveal delayMs={150} animationClass="animate-editorial-fade">
              <div className="hero-role-row flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs sm:text-sm text-(--color-muted)">
                  {copy.roleLead}
                </span>
                <ContinuousRoles />
              </div>
            </ScrollReveal>

            {/* Concise Approved Factual Bio */}
            <ScrollReveal delayMs={200} animationClass="animate-editorial-fade">
              <p className="home-hero-description text-sm sm:text-base text-(--color-muted) leading-relaxed max-w-[60ch] m-0">
                {copy.personalBrand}
              </p>
            </ScrollReveal>

            {/* Location, Live Clock & Status Indicator */}
            <ScrollReveal delayMs={250} animationClass="animate-editorial-fade">
              <div className="hero-meta-rail flex flex-wrap items-center gap-2.5 border-y border-(--color-border) py-2.5 font-mono text-xs text-(--color-muted)">
                <div className="flex items-center gap-2">
                  <span className="text-(--color-accent) font-bold">■</span>
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
            </ScrollReveal>

            {/* Primary & Secondary CTAs */}
            <ScrollReveal delayMs={300} animationClass="animate-editorial-fade">
              <div className="home-hero-actions flex flex-wrap items-center gap-4 sm:gap-6 pt-1">
                <Link
                  href={`/${locale}/projects`}
                  className="hero-btn-primary group inline-flex items-center gap-2 px-4 py-2.5 border border-(--color-foreground) bg-(--color-foreground) text-(--color-background) font-mono text-xs sm:text-sm font-semibold rounded-[2px] hover:bg-(--color-accent) hover:border-(--color-accent) hover:text-white transition-all duration-200"
                >
                  <span>{copy.primaryCta}</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                    →
                  </span>
                </Link>

                <Link
                  href={`/${locale}/contact`}
                  className="hero-contact-secondary group inline-flex items-center gap-1.5 py-2 px-3 border border-(--color-border) text-(--color-foreground) hover:border-(--color-accent) hover:text-(--color-accent) font-mono text-xs sm:text-sm rounded-[2px] transition-colors duration-200"
                >
                  <span>{copy.secondaryCta}</span>
                  <span className="text-(--color-accent) font-semibold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-200">
                    →
                  </span>
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Clean Editorial Portrait Frame */}
          <div className="home-hero-portrait-col flex justify-center lg:justify-end">
            <ScrollReveal delayMs={250} animationClass="animate-editorial-fade">
              <figure className="hero-portrait-figure m-0 flex flex-col gap-2 w-full max-w-[260px] sm:max-w-[280px] lg:max-w-[300px]">
                <div className="hero-portrait-frame border border-(--color-border) p-1.5 bg-(--color-background) aspect-[4/5] relative overflow-hidden rounded-[2px] hover:border-(--color-accent) transition-colors duration-300">
                  <Image
                    src="/assets/profile/pas-foto.webp"
                    alt="Annas Tri Widagdo · Software Engineer"
                    width={300}
                    height={375}
                    priority
                    sizes="(max-width: 640px) 260px, (max-width: 1024px) 280px, 300px"
                    className="hero-portrait-img object-cover object-top w-full h-full transition-transform duration-500 hover:scale-[1.02]"
                  />
                </div>
                <figcaption className="hero-portrait-caption flex justify-between items-center font-mono text-[11px] text-(--color-muted) px-1">
                  <span className="text-(--color-accent) font-semibold">{copy.portraitTag}</span>
                  <span>{copy.portraitCaption}</span>
                </figcaption>
              </figure>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
