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
    roleIntro: isId ? "Saya seorang" : "I'm a",
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
      className="home-hero-section py-10 sm:py-14 md:py-16 lg:py-20 border-b border-(--color-border) overflow-hidden"
      aria-label={isId ? "Ringkasan Profesional" : "Professional Summary"}
    >
      <div className="home-hero-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="home-hero-layout grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-6 lg:gap-x-12 xl:gap-x-16 lg:gap-y-6 items-start">
            {/* 1. Header & Section Index */}
            <div className="hero-intro-header lg:col-start-1 lg:row-start-1 flex items-center gap-2.5 font-mono text-xs text-(--color-muted) border-b border-(--color-border)/70 pb-3">
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

            {/* 2. Identity Block: Greeting & Substantially Enlarged Instrument Serif Name */}
            <div className="hero-identity-block lg:col-start-1 lg:row-start-2 flex flex-col gap-1.5 pt-0.5">
              <span className="font-mono text-xs sm:text-sm text-(--color-muted) uppercase tracking-wider font-medium">
                {copy.greeting}
              </span>
              <h1 className="home-hero-name font-serif text-4xl sm:text-5xl md:text-[3.75rem] lg:text-[4.25rem] xl:text-[4.85rem] 2xl:text-[5.25rem] font-normal tracking-tight text-(--color-foreground) leading-[1.02] m-0">
                {copy.name}
              </h1>
            </div>

            {/* 3. Role Introduction ("I'm a" / "Saya seorang") & Animated Role Reel with 3 Dots */}
            <div className="hero-role-block lg:col-start-1 lg:row-start-3 flex flex-wrap items-center gap-2.5 sm:gap-3.5 pt-0.5">
              <span
                className="hero-role-intro font-mono text-xs sm:text-sm text-(--color-muted) font-medium tracking-normal select-none shrink-0"
                aria-hidden="true"
              >
                {copy.roleIntro}
              </span>
              <ContinuousRoles locale={locale} roleIntro={copy.roleIntro} />
            </div>

            {/* 4. Concise Approved Factual Bio */}
            <p className="home-hero-description lg:col-start-1 lg:row-start-4 font-sans text-sm sm:text-base text-(--color-muted) leading-relaxed max-w-[62ch] m-0">
              {copy.personalBrand}
            </p>

            {/* 5. Portrait Evidence Frame (Directly below Bio on Tablet/Mobile; Right Column on Desktop) */}
            <div className="hero-portrait-col lg:col-start-2 lg:row-start-1 lg:row-span-6 flex justify-center lg:justify-end self-start">
              <figure className="hero-portrait-figure m-0 flex flex-col gap-2 w-full max-w-[240px] sm:max-w-[270px] lg:max-w-[320px]">
                <div className="hero-portrait-frame border border-(--color-border) p-1.5 bg-(--color-background) aspect-[3/4] relative overflow-hidden rounded-none hover:border-(--color-accent) transition-colors duration-300">
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
                    className="hero-portrait-img object-cover object-top w-full h-full rounded-none transition-transform duration-500 hover:scale-[1.02] motion-reduce:transform-none"
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

            {/* 6. Metadata Rail: Location, Live Clock & Collaboration Beacon */}
            <div className="hero-meta-rail lg:col-start-1 lg:row-start-5 flex flex-wrap items-center gap-2.5 sm:gap-3.5 border-t border-(--color-border) pt-3.5 font-mono text-xs text-(--color-muted)">
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

            {/* 7. Redesigned Action CTAs (Slimmer Primary Bordered & Truly Borderless Secondary) */}
            <div className="home-hero-actions lg:col-start-1 lg:row-start-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1">
              <Link
                href={`/${locale}/projects`}
                className="btn-editorial-primary group"
              >
                <span>{copy.primaryCta}</span>
                <span className="btn-arrow" aria-hidden="true">
                  {"\u2192"}
                </span>
              </Link>

              <Link
                href={`/${locale}/contact`}
                className="btn-editorial-secondary group"
              >
                <span className="btn-label-wrap">{copy.secondaryCta}</span>
                <span className="btn-arrow" aria-hidden="true">
                  {"\u2192"}
                </span>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
