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
  const logoPath = getExperienceLogoPathIfPresent(experience.logoFolder);
  const delayMs = index * 100;

  return (
    <ScrollReveal
      delayMs={delayMs}
      animationClass="animate-editorial-fade"
      className="experience-timeline-entry group relative flex items-stretch gap-3 sm:gap-6 lg:gap-8"
    >
      {/* Left Vertical Timeline Spine & Marker Node */}
      <div className="timeline-spine-col flex flex-col items-center shrink-0 w-7 sm:w-8">
        {/* Numbered Marker Node */}
        <div className="timeline-spine-node flex items-center justify-center w-7 h-7 rounded-full border border-(--color-border) bg-(--color-background) group-hover:border-(--color-accent) transition-all duration-300 z-10 shrink-0">
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

      {/* Main Experience Item: Follows exact hierarchy: 1. Role, 2. Org, 3. Period, 4. Location, 5. Contributions, 6. Stack */}
      <article
        className="experience-record-item flex-1 pb-8 sm:pb-10 flex flex-col gap-3"
        aria-label={experience.role[locale]}
      >
        {/* 1. Role (Prominent) */}
        <div className="flex flex-col gap-1">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 sm:gap-4">
              <ExperienceOrgLogo
                logoPath={logoPath}
                placeholder={experience.logoPlaceholder}
                orgName={experience.organization[locale]}
              />
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-(--color-foreground) m-0 group-hover:text-(--color-accent) transition-colors duration-200">
                {experience.role[locale]}
              </h3>
            </div>

            {/* Desktop Period */}
            <span className="font-mono text-xs text-(--color-muted) shrink-0 hidden sm:inline-block pt-1">
              {experience.period}
            </span>
          </div>

          {/* 2. Organization, 3. Period (mobile), 4. Location */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 font-mono text-xs text-(--color-muted) pl-0 sm:pl-16 md:pl-18">
            <span className="text-(--color-foreground) font-medium">
              {experience.organization[locale]}
            </span>
            <span className="text-(--color-border)" aria-hidden="true">
              ·
            </span>
            <span className="sm:hidden text-(--color-foreground)">
              {experience.period}
            </span>
            <span className="sm:hidden text-(--color-border)" aria-hidden="true">
              ·
            </span>
            <span>{experience.location[locale]}</span>
          </div>
        </div>

        {/* 5. Three Concise Contribution Points */}
        <ul
          className="experience-highlights flex flex-col gap-2 list-none m-0 p-0 pl-0 sm:pl-16 md:pl-18 pt-1"
          role="list"
        >
          {experience.highlights[locale].map((highlight, idx) => (
            <li
              key={idx}
              className="flex items-baseline gap-2 text-xs sm:text-sm text-(--color-muted) leading-relaxed"
            >
              <span
                className="text-(--color-accent) font-mono text-xs shrink-0 select-none"
                aria-hidden="true"
              >
                ▸
              </span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        {/* 6. Stack Metadata */}
        <div className="experience-stack font-mono text-xs text-(--color-muted) pl-0 sm:pl-16 md:pl-18 pt-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-(--color-muted)">
            {isId ? "STACK // " : "STACK // "}
          </span>
          <span className="text-(--color-foreground)">
            {experience.technologies.join(" · ")}
          </span>
        </div>
      </article>
    </ScrollReveal>
  );
}
