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
        {/* Asymmetric 2-Column Editorial Grid (Desktop: Content Left ~60%, Portrait Right ~40%) */}
        <div className="home-hero-grid grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-6 sm:gap-8 lg:gap-12 items-start">
          {/* 1. Header & Tag (Desktop Row 1 Col 1) */}
          <div className="lg:col-start-1 lg:row-start-1">
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
          </div>

          {/* 2. Greeting & Prominent Name (Desktop Row 2 Col 1) */}
          <div className="lg:col-start-1 lg:row-start-2">
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
          </div>

          {/* 3. Three Full Role-Name Controls (Desktop Row 3 Col 1) */}
          <div className="lg:col-start-1 lg:row-start-3">
            <ScrollReveal delayMs={150} animationClass="animate-editorial-fade">
              <div className="hero-role-row flex flex-col gap-2">
                <ContinuousRoles />
              </div>
            </ScrollReveal>
          </div>

          {/* 4. Concise Approved Factual Bio (Desktop Row 4 Col 1) */}
          <div className="lg:col-start-1 lg:row-start-4">
            <ScrollReveal delayMs={200} animationClass="animate-editorial-fade">
              <p className="home-hero-description text-sm sm:text-base text-(--color-muted) leading-relaxed max-w-[62ch] m-0">
                {copy.personalBrand}
              </p>
            </ScrollReveal>
          </div>

          {/* 5. Portrait Evidence Frame (Desktop Row 1-4 Col 2; Mobile: Sits right after Bio) */}
          <div className="lg:col-start-2 lg:row-start-1 lg:row-span-4 lg:self-start lg:justify-self-end flex justify-center lg:justify-end my-2 lg:my-0">
            <ScrollReveal delayMs={200} animationClass="animate-editorial-fade">
              <figure className="hero-portrait-figure m-0 flex flex-col gap-2 w-full max-w-[260px] sm:max-w-[280px] lg:max-w-[300px]">
                <div className="hero-portrait-frame border border-(--color-border) p-1.5 bg-(--color-background) aspect-[3/4] relative overflow-hidden rounded-[2px] hover:border-(--color-accent) transition-colors duration-300">
                  <Image
                    src="/assets/profile/pas-foto.webp"
                    alt={
                      isId
                        ? "Foto potret Annas Tri Widagdo"
                        : "Portrait photo of Annas Tri Widagdo"
                    }
                    width={300}
                    height={400}
                    priority
                    sizes="(max-width: 640px) 260px, (max-width: 1024px) 280px, 300px"
                    className="hero-portrait-img object-cover object-top w-full h-full transition-transform duration-500 hover:scale-[1.02] motion-reduce:transform-none"
                  />
                </div>
                <figcaption className="hero-portrait-caption flex justify-between items-center font-mono text-[11px] text-(--color-muted) px-1">
                  <span className="text-(--color-accent) font-semibold">
                    {copy.portraitTag}
                  </span>
                  <span>{copy.portraitCaption}</span>
                </figcaption>
              </figure>
            </ScrollReveal>
          </div>

          {/* 6. Location, Live Clock & Static Collaboration Indicator (Desktop Row 5 Col 1) */}
          <div className="lg:col-start-1 lg:row-start-5">
            <ScrollReveal delayMs={250} animationClass="animate-editorial-fade">
              <div className="hero-meta-rail flex flex-wrap items-center gap-2.5 border-y border-(--color-border) py-2.5 font-mono text-xs text-(--color-muted)">
                <div className="flex items-center gap-2">
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
                <div className="inline-flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-[11px] font-medium text-(--color-foreground)">
                    {copy.statusText}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* 7. Primary & Subordinate Secondary CTAs (Desktop Row 6 Col 1) */}
          <div className="lg:col-start-1 lg:row-start-6">
            <ScrollReveal delayMs={300} animationClass="animate-editorial-fade">
              <div className="home-hero-actions flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1">
                <Link
                  href={`/${locale}/projects`}
                  className="hero-btn-primary group inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-[44px] border border-(--color-foreground) bg-(--color-foreground) text-(--color-background) font-mono text-xs sm:text-sm font-semibold rounded-[2px] hover:bg-(--color-accent) hover:border-(--color-accent) hover:text-white transition-all duration-200 focus-visible:outline-2 focus-visible:outline-(--color-accent) focus-visible:outline-offset-2"
                >
                  <span>{copy.primaryCta}</span>
                  <span
                    className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>

                <Link
                  href={`/${locale}/contact`}
                  className="hero-contact-secondary group inline-flex items-center justify-center gap-1.5 py-2.5 px-4 min-h-[44px] border border-(--color-border) text-(--color-foreground) hover:border-(--color-accent) hover:text-(--color-accent) font-mono text-xs sm:text-sm font-medium rounded-[2px] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-(--color-accent) focus-visible:outline-offset-2"
                >
                  <span>{copy.secondaryCta}</span>
                  <span
                    className="text-(--color-accent) font-semibold inline-flex items-center gap-1 group-hover:translate-x-1 motion-reduce:transform-none transition-transform duration-200"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
