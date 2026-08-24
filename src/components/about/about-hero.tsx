import type { Locale } from "@/lib/i18n/config";
import { biographyData } from "@/content/about/about-data";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface AboutHeroProps {
  locale: Locale;
}

export function AboutHero({ locale }: AboutHeroProps) {
  const isId = locale === "id";

  const copy = {
    tag: "[02 // ABOUT]",
    subtag: isId ? "PROFIL ENGINEERING" : "ENGINEERING PROFILE",
    title: isId ? "Tentang Saya" : "About",
    lead: biographyData.intro[locale],
  };

  return (
    <header
      className="about-hero-section py-8 sm:py-10 md:py-12 border-b border-(--color-border)"
      aria-label={isId ? "Pengantar Profil Tentang" : "About Profile Introduction"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal
          animationClass="animate-editorial-fade"
          className="flex flex-col gap-3 max-w-4xl"
        >
          {/* Section Tag & Subtag */}
          <div className="section-header-meta flex items-center gap-3 font-mono text-xs text-(--color-muted)">
            <span className="font-semibold text-(--color-accent)">{copy.tag}</span>
            <span className="text-(--color-border)" aria-hidden="true">
              /
            </span>
            <span>{copy.subtag}</span>
          </div>

          {/* Page Title */}
          <h1 className="about-hero-title font-serif text-3xl sm:text-4xl md:text-5xl text-(--color-foreground) font-normal m-0 tracking-tight">
            {copy.title}
          </h1>

          {/* Concise Personal Brand Statement */}
          <p className="about-hero-lead text-sm sm:text-base md:text-lg text-(--color-muted) leading-relaxed m-0 max-w-3xl">
            {copy.lead}
          </p>
        </ScrollReveal>
      </div>
    </header>
  );
}
