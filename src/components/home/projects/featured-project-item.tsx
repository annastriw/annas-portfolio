import Image from "next/image";
import Link from "next/link";
import type { HomeSelectedProject } from "@/content/projects/featured-config";
import type { Locale } from "@/lib/i18n/config";

interface FeaturedProjectItemProps {
  project: HomeSelectedProject;
  index: string;
  locale: Locale;
}

export function FeaturedProjectItem({
  project,
  index,
  locale,
}: FeaturedProjectItemProps) {
  const href = `/${locale}/projects/${project.slug}`;
  const isId = locale === "id";
  const ctaText = isId ? "Jelajahi Proyek" : "Explore Project";

  return (
    <article
      className="project-index-row border-b border-(--color-border) first:border-t py-4 sm:py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 lg:gap-8"
      aria-label={project.title[locale]}
    >
      {/* Left Column: Index & Landscape Thumbnail */}
      <div className="flex items-start md:items-center gap-3.5 sm:gap-4 shrink-0">
        <span className="font-mono text-xs sm:text-sm font-semibold text-(--color-accent) shrink-0 w-7 pt-1 md:pt-0">
          [{index}]
        </span>
        <div className="project-row-thumbnail aspect-[16/10] w-full max-w-[280px] sm:w-44 lg:w-48 overflow-hidden bg-(--color-surface-subtle) relative shrink-0 border border-(--color-border) rounded-[2px]">
          <Image
            src={project.coverImage}
            alt={project.coverAlt[locale]}
            fill
            sizes="(max-width: 640px) 280px, (max-width: 1024px) 176px, 192px"
            className="object-cover object-top"
            loading="lazy"
          />
        </div>
      </div>

      {/* Middle Column: Title + Beside Metadata, Summary, Inline Tech Stack */}
      <div className="flex-1 flex flex-col gap-1.5 min-w-0">
        {/* Title & Beside Metadata */}
        <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
          <h3 className="font-serif text-xl sm:text-2xl font-normal text-(--color-foreground) m-0">
            {project.title[locale]}
          </h3>
          <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs">
            <span className="text-(--color-accent) font-semibold">
              {project.status[locale]}
            </span>
            <span className="text-(--color-border)" aria-hidden="true">
              /
            </span>
            <span className="text-(--color-muted)">
              {project.role[locale]}
            </span>
          </div>
        </div>

        {/* Short Summary (Readable measure ~68ch) */}
        <p className="text-xs sm:text-sm text-(--color-muted) leading-relaxed max-w-[68ch] m-0">
          {project.summary[locale]}
        </p>

        {/* Plain Inline Tech Stack */}
        <div className="font-mono text-xs text-(--color-muted) pt-0.5 flex flex-wrap items-baseline gap-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-(--color-muted)">
            STACK //
          </span>
          <span className="text-(--color-foreground)">
            {project.technologies.slice(0, 6).join(" · ")}
          </span>
        </div>
      </div>

      {/* Right Column: Explicit Interactive Detail Link Only */}
      <div className="shrink-0 self-start md:self-center pt-1 md:pt-0">
        <Link
          href={href}
          className="project-row-link editorial-action-link"
          aria-label={`${ctaText}: ${project.title[locale]}`}
        >
          <span className="action-link-label">{ctaText}</span>
          <span className="action-link-arrow" aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
