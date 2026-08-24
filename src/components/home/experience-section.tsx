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
    tag: isId ? "[02 // PENGALAMAN]" : "[02 // EXPERIENCE]",
    subtag: isId ? "RIWAYAT PROFESIONAL" : "PROFESSIONAL TIMELINE",
    title: isId ? "Pengalaman" : "Experience",
    subtitle: isId
      ? "Pengalaman proyek dan magang dalam pengembangan software, desain UI/UX, dan pengalaman digital interaktif."
      : "Professional projects and internships across software development, UI/UX design, and interactive digital experiences.",
  };

  return (
    <section
      className="home-experience-section py-8 sm:py-12 md:py-14 border-b border-(--color-border)"
      aria-label={isId ? "Pengalaman Profesional" : "Professional Experience"}
    >
      <div className="home-experience-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6 sm:gap-8">
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal animationClass="animate-editorial-fade" className="home-section-header flex flex-col gap-2 max-w-3xl">
          <div className="section-header-meta flex items-center gap-3 font-mono text-xs text-(--color-muted)">
            <span className="font-semibold text-(--color-accent)">{copy.tag}</span>
            <span className="text-(--color-border)" aria-hidden="true">
              /
            </span>
            <span>{copy.subtag}</span>
          </div>
          <h2 className="section-title font-serif text-3xl sm:text-4xl text-(--color-foreground) font-normal m-0 tracking-tight">
            {copy.title}
          </h2>
          <p className="section-subtitle text-sm sm:text-base text-(--color-muted) leading-relaxed m-0">
            {copy.subtitle}
          </p>
        </ScrollReveal>

        {/* 3-Box Connected Timeline */}
        <ExperienceTimeline experiences={experiencesData} locale={locale} />
      </div>
    </section>
  );
}
