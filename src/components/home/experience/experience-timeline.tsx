import type { ExperienceItem as ExperienceItemType } from "@/content/experience/experience-data";
import type { Locale } from "@/lib/i18n/config";
import { ExperienceItem } from "./experience-item";

interface ExperienceTimelineProps {
  experiences: ExperienceItemType[];
  locale: Locale;
}

export function ExperienceTimeline({
  experiences,
  locale,
}: ExperienceTimelineProps) {
  return (
    <div
      className="experience-3card-timeline flex flex-col pt-2"
      role="list"
      aria-label="3-Entry Connected Professional Timeline"
    >
      {experiences.map((exp, idx) => (
        <ExperienceItem
          key={exp.id}
          experience={exp}
          index={idx}
          locale={locale}
          isLast={idx === experiences.length - 1}
        />
      ))}
    </div>
  );
}
