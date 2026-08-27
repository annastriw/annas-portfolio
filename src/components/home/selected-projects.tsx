import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import {
  homeSelectedProjects,
  type HomeSelectedProject,
} from "@/content/projects/featured-config";
import { FeaturedProjectItem } from "./projects/featured-project-item";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface SelectedProjectsProps {
  projects?: readonly unknown[];
  locale: Locale;
}

export function SelectedProjects({ locale }: SelectedProjectsProps) {
  const isId = locale === "id";

  const copy = {
    tag: "[04 // SELECTED PROJECTS]",
    title: isId ? "Proyek Pilihan" : "Selected Projects",
    archiveCta: isId ? "Jelajahi Arsip Proyek" : "Explore Project Archive",
  };

  return (
    <section
      className="home-selected-section py-12 sm:py-16 md:py-20 border-b border-(--color-border)"
      aria-label={copy.title}
    >
      <div className="home-selected-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6 sm:gap-8">
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal
          animationClass="animate-editorial-fade"
          className="home-section-header flex flex-col gap-2 max-w-2xl"
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

        {/* 4-Row Full-Width Editorial Project Index */}
        <div
          className="home-projects-index flex flex-col"
          role="list"
          aria-label={copy.title}
        >
          {homeSelectedProjects.map((project: HomeSelectedProject) => (
            <FeaturedProjectItem
              key={project.slug}
              project={project}
              index={project.index}
              locale={locale}
            />
          ))}
        </div>

        {/* Single Archive Action at End of Section (No Project Count) */}
        <ScrollReveal delayMs={200} animationClass="animate-editorial-fade">
          <div className="home-selected-bottom-bar flex items-center justify-end border border-(--color-border) bg-(--color-background) p-3.5 sm:p-4 rounded-[2px] hover:border-(--color-accent) transition-colors duration-300">
            <Link
              href={`/${locale}/projects`}
              className="bottom-bar-cta group inline-flex items-center gap-2 min-h-[44px] px-3 py-2 font-mono text-xs sm:text-sm font-semibold text-(--color-accent) hover:underline focus-visible:outline-2 focus-visible:outline-(--color-accent) focus-visible:outline-offset-2 rounded-[2px]"
            >
              <span>{copy.archiveCta}</span>
              <span
                className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none"
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
