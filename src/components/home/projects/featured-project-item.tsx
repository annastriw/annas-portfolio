import Image from "next/image";
import Link from "next/link";

import type { ProjectArchiveItem } from "@/content/projects/project-archive";
import type { Locale } from "@/lib/i18n/config";
import { EditorialPlaceholder } from "@/components/ui/editorial-placeholder";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface FeaturedProjectItemProps {
  project: ProjectArchiveItem;
  index: string;
  locale: Locale;
}

const categoryLabels: Record<ProjectArchiveItem["category"], string> = {
  "web-app": "WEB APPLICATION",
  ml: "MACHINE LEARNING",
  mobile: "MOBILE APP",
  other: "INTERACTIVE PROTOTYPE",
};

export function FeaturedProjectItem({ project, index, locale }: FeaturedProjectItemProps) {
  const isId = locale === "id";
  const href = `/${locale}/projects/${project.slug}`;
  const delayMs = Number.parseInt(index, 10) * 100;

  return (
    <ScrollReveal delayMs={delayMs} animationClass="animate-editorial-fade">
      <article className="featured-card group border border-(--color-border) bg-(--color-background) hover:border-(--color-accent) transition-all duration-300 rounded-[2px]" aria-label={project.title[locale]}>
        <Link href={href} className="featured-card-link flex flex-col h-full p-5 sm:p-6 text-inherit no-underline">
          <div className="featured-card-meta-top flex items-center justify-between gap-2 mb-4 font-mono text-xs text-(--color-muted)">
            <div className="featured-meta-left flex items-center gap-2">
              <span className="featured-index text-(--color-accent) font-semibold">[{index}]</span>
              <span className="featured-kind px-2 py-0.5 border border-(--color-border) text-[11px] uppercase tracking-wider">{categoryLabels[project.category]}</span>
            </div>
            <span className="featured-status font-mono font-semibold text-(--color-foreground) text-[11px] tracking-tight">{project.status[locale]}</span>
          </div>

          <div className="featured-card-media aspect-[4/3] overflow-hidden bg-(--color-surface-subtle) relative mb-4 border border-(--color-border)">
            {project.coverImage ? (
              <Image src={project.coverImage} alt={project.coverAlt[locale]} fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px" className="featured-card-img object-cover object-top transition-transform duration-500 group-hover:scale-[1.025]" loading="lazy" />
            ) : (
              <EditorialPlaceholder figureNumber={index} category={project.category} locale={locale} />
            )}
          </div>

          <div className="featured-card-body flex-1 flex flex-col gap-1.5 mb-4">
            <h3 className="featured-card-title font-serif text-xl sm:text-2xl font-normal text-(--color-foreground) group-hover:text-(--color-accent) transition-colors duration-200 m-0 flex justify-between items-baseline gap-2">
              <span>{project.title[locale]}</span><span className="featured-arrow font-sans text-(--color-muted) group-hover:text-(--color-accent) transition-transform duration-200 text-sm" aria-hidden="true">↗</span>
            </h3>
            <p className="featured-card-summary text-xs sm:text-sm text-(--color-muted) leading-relaxed line-clamp-2 m-0 mt-1">{project.summary[locale]}</p>
          </div>

          <div className="featured-card-footer border-t border-(--color-border) pt-3.5 flex flex-col gap-1.5 font-mono text-xs">
            <div className="featured-footer-role flex items-baseline justify-between gap-2">
              <span className="text-(--color-muted)">{isId ? "PERAN:" : "ROLE:"}</span><span className="text-(--color-foreground) font-medium text-right">{project.role[locale]}</span>
            </div>
            <div className="featured-footer-stack flex items-baseline justify-between gap-2">
              <span className="text-(--color-muted)">STACK:</span><span className="text-(--color-muted) text-right text-[11px]">{project.primaryTechnologies.join(" / ")}</span>
            </div>
          </div>
        </Link>
      </article>
    </ScrollReveal>
  );
}
