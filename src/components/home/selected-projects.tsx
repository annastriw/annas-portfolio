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
    subtag: isId ? "PROYEK PILIHAN" : "FEATURED PROJECTS",
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
            <span className="font-semibold text-(--color-accent)">{copy.tag}</span>
            <span className="text-(--color-border)" aria-hidden="true">
              /
            </span>
            <span>{copy.subtag}</span>
          </div>
          <h2 className="section-title font-serif text-3xl sm:text-4xl text-(--color-foreground) font-normal m-0 tracking-tight">
            {copy.title}
          </h2>
        </ScrollReveal>

        {/* 4-Slot Editorial Grid (2x2) */}
        <div className="home-featured-grid grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-7">
          {homeSelectedProjects.map((project: HomeSelectedProject) => (
            <FeaturedProjectItem
              key={project.slug}
              project={project}
              index={project.index}
              locale={locale}
            />
          ))}
        </div>

        {/* Single Archive Action at End of Section */}
        <ScrollReveal delayMs={200} animationClass="animate-editorial-fade">
          <div className="home-selected-bottom-bar flex items-center justify-end border border-(--color-border) bg-(--color-background) p-3.5 sm:p-4 rounded-[2px] hover:border-(--color-accent) transition-colors duration-300">
            <Link
              href={`/${locale}/projects`}
              className="bottom-bar-cta group inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-semibold text-(--color-accent) hover:underline"
            >
              <span>{copy.archiveCta}</span>
              <span
                className="transition-transform duration-200 group-hover:translate-x-1"
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
