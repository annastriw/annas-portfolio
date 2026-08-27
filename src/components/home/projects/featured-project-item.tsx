import Image from "next/image";
import Link from "next/link";
import type { HomeSelectedProject } from "@/content/projects/featured-config";
import type { Locale } from "@/lib/i18n/config";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

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
  const isId = locale === "id";
  const href = `/${locale}/projects/${project.slug}`;
  const delayMs = Number.parseInt(index, 10) * 80;
  const actionLabel = isId ? "Lihat Studi Kasus" : "View Case Study";

  return (
    <ScrollReveal delayMs={delayMs} animationClass="animate-editorial-fade">
      <article
        className="project-index-row group border-b border-(--color-border) first:border-t hover:bg-(--color-surface-subtle,rgba(0,0,0,0.02)) transition-colors duration-200"
        aria-label={project.title[locale]}
      >
        <Link
          href={href}
          className="project-row-link flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 lg:gap-8 py-5 sm:py-6 text-inherit no-underline"
        >
          {/* Left Column: Index & Small Landscape Thumbnail */}
          <div className="flex items-start md:items-center gap-3.5 sm:gap-4 shrink-0">
            <span className="font-mono text-xs sm:text-sm font-semibold text-(--color-accent) shrink-0 w-7">
              [{index}]
            </span>
            <div className="project-row-thumbnail aspect-[16/10] w-36 sm:w-44 lg:w-48 overflow-hidden bg-(--color-surface-subtle) relative shrink-0 border border-(--color-border) rounded-[2px]">
              <Image
                src={project.coverImage}
                alt={project.coverAlt[locale]}
                fill
                sizes="(max-width: 640px) 144px, (max-width: 1024px) 176px, 192px"
                className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
          </div>

          {/* Middle Column: Title + Beside Metadata, Summary, and Inline Tech Stack */}
          <div className="flex-1 flex flex-col gap-1.5 min-w-0">
            {/* Title & Beside Metadata (Status & Role on Desktop) */}
            <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-(--color-foreground) group-hover:text-(--color-accent) transition-colors duration-200 m-0">
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

            {/* Short Summary */}
            <p className="text-xs sm:text-sm text-(--color-muted) leading-relaxed m-0 line-clamp-2">
              {project.summary[locale]}
            </p>

            {/* Plain Inline Tech Stack (no pills) */}
            <div className="font-mono text-xs text-(--color-muted) pt-1 flex flex-wrap items-baseline gap-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-(--color-muted)">
                STACK //
              </span>
              <span className="text-(--color-foreground)">
                {project.technologies.slice(0, 6).join(" · ")}
              </span>
            </div>
          </div>

          {/* Right Column: Case-study Action */}
          <div className="shrink-0 flex items-center md:self-center pt-2 md:pt-0">
            <span className="font-mono text-xs font-semibold text-(--color-accent) group-hover:underline inline-flex items-center gap-1.5 whitespace-nowrap">
              <span>{actionLabel}</span>
              <span
                className="transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </span>
          </div>
        </Link>
      </article>
    </ScrollReveal>
  );
}
