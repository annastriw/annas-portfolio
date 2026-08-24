import type { ExperienceItem as ExperienceItemType } from "@/content/experience/experience-data";
import type { Locale } from "@/lib/i18n/config";
import { getExperienceLogoPathIfPresent } from "@/lib/assets/logo-detector";
import { ExperienceOrgLogo } from "./experience-org-logo";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface ExperienceItemProps {
  experience: ExperienceItemType;
  index: number;
  locale: Locale;
  isLast?: boolean;
}

export function ExperienceItem({
  experience,
  index,
  locale,
  isLast = false,
}: ExperienceItemProps) {
  const isId = locale === "id";
  const indexFormatted = String(index + 1).padStart(2, "0");
  const year = experience.period.slice(-4);
  const logoPath = getExperienceLogoPathIfPresent(experience.logoFolder);
  const delayMs = index * 150;

  return (
    <ScrollReveal
      delayMs={delayMs}
      animationClass="animate-editorial-fade"
      className="experience-timeline-entry group relative flex items-stretch gap-3 sm:gap-6 lg:gap-8"
    >
      {/* Left Vertical Timeline Spine & Branch Node */}
      <div className="timeline-spine-col flex flex-col items-center shrink-0 w-8 sm:w-10">
        {/* Numbered Marker Node */}
        <div className="timeline-spine-node flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-(--color-border) bg-(--color-background) group-hover:border-(--color-accent) group-hover:scale-105 transition-all duration-300 z-10">
          <span className="font-mono text-[10px] sm:text-[11px] font-bold text-(--color-accent)">
            {indexFormatted}
          </span>
        </div>

        {/* Continuous Connecting Line to Next Entry */}
        {!isLast && (
          <div
            className="timeline-spine-line w-[1px] flex-1 bg-(--color-border) my-1 transition-colors duration-300 group-hover:bg-(--color-accent)/60"
            aria-hidden="true"
          />
        )}
      </div>

      {/* Horizontal Branch Connector (Desktop & Tablet) */}
      <div
        className="timeline-branch-connector hidden sm:block w-4 sm:w-6 lg:w-8 h-[1px] bg-(--color-border) self-start mt-3.5 sm:mt-4 shrink-0 transition-all duration-300 group-hover:bg-(--color-accent) group-hover:w-7 lg:group-hover:w-9"
        aria-hidden="true"
      />

      {/* Structured Rectangular Experience Box */}
      <article
        className="experience-record-box flex-1 border border-(--color-border) bg-(--color-background) p-5 sm:p-6 flex flex-col gap-3.5 mb-6 sm:mb-8 transition-all duration-300 group-hover:border-(--color-accent) rounded-[2px]"
        aria-label={experience.role[locale]}
      >
        {/* Box Top Bar: Index/Year + Type + Logo + Period */}
        <div className="record-box-header flex items-start justify-between gap-3 pb-3 border-b border-(--color-border)">
          <div className="flex items-start gap-3.5">
            <ExperienceOrgLogo
              logoPath={logoPath}
              placeholder={experience.logoPlaceholder}
              orgName={experience.organization[locale]}
            />
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2 font-mono text-[11px]">
                <span className="text-(--color-accent) font-semibold uppercase tracking-wider">
                  {experience.type}
                </span>
                <span className="text-(--color-border)" aria-hidden="true">
                  /
                </span>
                <span className="text-(--color-foreground) font-semibold">
                  {year}
                </span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-(--color-foreground) m-0 leading-tight group-hover:text-(--color-accent) transition-colors duration-200">
                {experience.role[locale]}
              </h3>
              <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-(--color-muted) pt-0.5">
                <span className="text-(--color-foreground) font-medium">
                  {experience.organization[locale]}
                </span>
                <span aria-hidden="true">·</span>
                <span>{experience.location}</span>
              </div>
            </div>
          </div>

          <div className="font-mono text-[11px] text-(--color-muted) shrink-0 bg-(--color-surface-subtle,var(--color-background)) px-2.5 py-1 border border-(--color-border) hidden md:block">
            {experience.period}
          </div>
        </div>

        {/* Mobile Period Indicator */}
        <div className="md:hidden font-mono text-[11px] text-(--color-muted) -mt-1">
          <span>{experience.period}</span>
        </div>

        {/* Key Highlights */}
        <ul className="record-box-highlights flex flex-col gap-2 list-none m-0 p-0" role="list">
          {experience.highlights[locale].map((highlight, idx) => (
            <li
              key={idx}
              className="flex items-baseline gap-2 text-xs sm:text-sm text-(--color-muted) leading-relaxed"
            >
              <span className="text-(--color-accent) font-mono text-xs shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">
                ▸
              </span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        {/* Compact Typographic Stack Line */}
        <div className="record-box-stack pt-2.5 border-t border-(--color-border) flex flex-col sm:flex-row sm:items-baseline gap-2 font-mono text-xs">
          <span className="text-(--color-muted) text-[11px] font-semibold tracking-wider uppercase shrink-0">
            {isId ? "STACK //" : "STACK //"}
          </span>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-(--color-foreground) text-xs">
            {experience.technologies.map((tech, techIdx) => (
              <span key={tech} className="inline-flex items-center gap-1.5">
                {techIdx > 0 && <span className="text-(--color-border)">·</span>}
                <span className="hover:text-(--color-accent) transition-colors duration-150">{tech}</span>
              </span>
            ))}
          </div>
        </div>
      </article>
    </ScrollReveal>
  );
}
