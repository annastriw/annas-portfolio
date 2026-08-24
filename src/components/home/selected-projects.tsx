import Link from "next/link";
import type { ProjectItem } from "@/content/projects/projects-types";
import type { Locale } from "@/lib/i18n/config";
import { homeFeaturedConfig } from "@/content/projects/featured-config";
import { FeaturedProjectItem } from "./projects/featured-project-item";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface SelectedProjectsProps {
  projects: ProjectItem[];
  locale: Locale;
}

export function SelectedProjects({ projects, locale }: SelectedProjectsProps) {
  const isId = locale === "id";

  const copy = {
    tag: isId ? "[04 // KARYA PILIHAN]" : "[04 // SELECTED WORK]",
    subtag: isId ? "PROYEK UNGGULAN" : "FEATURED PROJECTS",
    title: isId ? "Proyek Pilihan" : "Selected Projects",
    subtitle: isId
      ? "Empat proyek yang menunjukkan pengalaman saya dalam full-stack development, machine learning, dan pengembangan pengalaman digital interaktif."
      : "Four projects that show how I work across full-stack development, machine learning, and interactive digital experiences.",
    viewAllCta: isId ? "Lihat Semua 10 Proyek" : "View All 10 Projects",
    bottomNote: isId
      ? "Tersedia 10 studi kasus teknis lengkap dalam arsip portofolio."
      : "10 verified technical case studies available in the complete archive.",
    bottomCta: isId ? "Lihat Semua Proyek" : "View All Projects",
  };

  // Resolve the 4 confirmed featured projects in strict required order
  const slot1 = projects.find((p) => p.slug === homeFeaturedConfig.slot1Slug) || null;
  const slot2 = projects.find((p) => p.slug === homeFeaturedConfig.slot2Slug) || null;
  const slot3 = projects.find((p) => p.slug === homeFeaturedConfig.slot3Slug) || null;
  const slot4 = projects.find((p) => p.slug === homeFeaturedConfig.slot4Slug) || null;

  const slots: { index: string; project: ProjectItem | null }[] = [
    { index: "01", project: slot1 },
    { index: "02", project: slot2 },
    { index: "03", project: slot3 },
    { index: "04", project: slot4 },
  ];

  return (
    <section
      className="home-selected-section py-8 sm:py-12 md:py-14 border-b border-(--color-border)"
      aria-label={copy.title}
    >
      <div className="home-selected-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6 sm:gap-8">
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal animationClass="animate-editorial-fade" className="home-section-header flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-2 max-w-2xl">
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
          </div>

          <Link
            href={`/${locale}/projects`}
            className="section-header-link group inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-(--color-accent) hover:underline self-start md:self-end transition-colors"
          >
            <span>{copy.viewAllCta}</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
              →
            </span>
          </Link>
        </ScrollReveal>

        {/* 4-Slot Editorial Grid (2x2) */}
        <div className="home-featured-grid grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-7">
          {slots.map(({ index, project }) => {
            if (!project) return null;
            return (
              <FeaturedProjectItem
                key={project.slug}
                project={project}
                index={index}
                locale={locale}
              />
            );
          })}
        </div>

        {/* Section Bottom Bar with View All Projects CTA */}
        <ScrollReveal delayMs={200} animationClass="animate-editorial-fade">
          <div className="home-selected-bottom-bar flex flex-wrap items-center justify-between gap-3 border border-(--color-border) bg-(--color-background) p-3.5 sm:p-4 rounded-[2px] hover:border-(--color-accent) transition-colors duration-300">
            <span className="bottom-bar-label font-mono text-xs text-(--color-muted)">
              {copy.bottomNote}
            </span>
            <Link
              href={`/${locale}/projects`}
              className="bottom-bar-cta group inline-flex items-center gap-2 font-mono text-xs font-semibold text-(--color-accent) hover:underline"
            >
              <span>{copy.bottomCta}</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
