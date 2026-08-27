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
      className="home-experience-section py-12 sm:py-16 md:py-20 border-b border-(--color-border)"
      aria-label={isId ? "Pengalaman Profesional" : "Professional Experience"}
    >
      <div className="home-experience-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6 sm:gap-8">
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal
          animationClass="animate-editorial-fade"
          className="home-section-header flex flex-col gap-2 max-w-3xl"
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

        {/* Vertical Connected Timeline */}
        <ExperienceTimeline experiences={experiencesData} locale={locale} />
      </div>
    </section>
  );
}
