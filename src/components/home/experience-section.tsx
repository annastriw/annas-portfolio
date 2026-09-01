import type { Locale } from "@/lib/i18n/config";
import { experiencesData } from "@/content/experience/experience-data";
import { ExperienceTimeline } from "./experience/experience-timeline";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface ExperienceSectionProps {
  locale: Locale;
}

export function ExperienceSection({ locale }: ExperienceSectionProps) {
  const isId = locale === "id";

  const copy = {
    tag: "[02 // EXPERIENCE]",
    title: isId ? "Pengalaman" : "Experience",
  };

  return (
    <section
      className="home-experience-section py-8 sm:py-10 md:py-12 lg:py-16 border-b border-(--color-border)"
      aria-label={isId ? "Pengalaman Profesional" : "Professional Experience"}
    >
      <div className="home-experience-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-5 sm:gap-6">
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal
          animationClass="animate-editorial-fade"
          className="home-section-header flex flex-col gap-1.5 max-w-3xl"
        >
          <div className="section-header-meta flex items-center gap-3 font-mono text-xs text-(--color-muted)">
            <span className="font-semibold text-(--color-accent)">
              {copy.tag}
            </span>
          </div>
          <h2 className="section-title font-serif text-3xl sm:text-4xl text-(--color-foreground) font-normal m-0 tracking-tight">
            {copy.title}
          </h2>
        </ScrollReveal>

        {/* Vertical Connected Timeline (Revealed as a single group) */}
        <ScrollReveal delayMs={60}>
          <ExperienceTimeline experiences={experiencesData} locale={locale} />
        </ScrollReveal>
      </div>
    </section>
  );
}
