import type { Locale } from "@/lib/i18n/config";
import { TechDirectory } from "./tech-directory/tech-directory";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface TechStackSectionProps {
  locale: Locale;
}

export function TechStackSection({ locale }: TechStackSectionProps) {
  const isId = locale === "id";

  const copy = {
    tag: "[05 // TECH STACK]",
    subtag: isId ? "INDEKS TEKNOLOGI" : "TECHNICAL INDEX",
    title: isId ? "Tools & Teknologi" : "Tools & Technologies",
    subtitle: isId
      ? "Teknologi yang biasa saya gunakan untuk merancang, membangun, menguji, dan menerapkan software."
      : "Technologies I regularly use to design, build, test, and deploy software.",
  };

  return (
    <section
      className="home-tech-section py-12 sm:py-16 md:py-20"
      aria-label={copy.title}
    >
      <div className="home-tech-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6 sm:gap-8">
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

        {/* Editorial Technical Directory */}
        <TechDirectory locale={locale} />
      </div>
    </section>
  );
}
