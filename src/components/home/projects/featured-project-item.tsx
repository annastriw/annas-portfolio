import Link from "next/link";
import Image from "next/image";
import type { ProjectItem } from "@/content/projects/projects-types";
import type { Locale } from "@/lib/i18n/config";
import { EditorialPlaceholder } from "@/components/ui/editorial-placeholder";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface FeaturedProjectItemProps {
  project: ProjectItem;
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
  const delayMs = parseInt(index, 10) * 100;

  const categoryLabel =
    project.category === "web-app"
      ? "WEB APPLICATION"
      : project.category === "ml"
      ? "MACHINE LEARNING"
      : project.category === "mobile"
      ? "MOBILE APP"
      : "3D & MULTIMEDIA";

  let displayStatus = project.status ? project.status[locale] : "COMPLETED";
  let displayRole = project.role[locale];
  let displayStack: string[] = project.techStack.core;
  let displaySubtitle = project.subtitle[locale];

  if (project.slug === "ukg-system") {
    displayStatus = "LIVE / PRODUCTION";
    displayStack = ["Next.js", "NestJS", "MySQL"];
  } else if (project.slug === "ihealth-edu") {
    displayStatus = "LIVE / PRODUCTION";
    displayRole = "Full-Stack Developer · ML Engineer";
    displayStack = ["Next.js", "Laravel", "MySQL", "Random Forest"];
  } else if (project.slug === "ml-for-heart-attack-risk-prediction") {
    displayStatus = "COMPLETED";
    displayStack = ["Python", "Scikit-learn", "Pandas", "NumPy"];
  } else if (project.slug === "panoramic-virtual-tour") {
    displayStatus = "COMPLETED";
    displayRole = "Junior Game Developer Intern";
    displaySubtitle = isId
      ? "Eksplorasi fasilitas pabrik interaktif 360°."
      : "Interactive 360° factory facilities exploration.";
    displayStack = ["Unity", "C#", "Lumion Pro", "360° Panorama", "Physics Raycast", "Scene Management"];
  }

  return (
    <ScrollReveal delayMs={delayMs} animationClass="animate-editorial-fade">
      <article
        className="featured-card group border border-(--color-border) bg-(--color-background) hover:border-(--color-accent) transition-all duration-300 rounded-[2px]"
        aria-label={project.title[locale]}
      >
        <Link href={href} className="featured-card-link flex flex-col h-full p-5 sm:p-6 text-inherit no-underline">
          {/* Card Top Meta Rail */}
          <div className="featured-card-meta-top flex items-center justify-between gap-2 mb-4 font-mono text-xs text-(--color-muted)">
            <div className="featured-meta-left flex items-center gap-2">
              <span className="featured-index text-(--color-accent) font-semibold">[{index}]</span>
              <span className="featured-kind px-2 py-0.5 border border-(--color-border) text-[11px] uppercase tracking-wider">
                {categoryLabel}
              </span>
            </div>
            <div className="featured-meta-right">
              <span className="featured-status font-mono font-semibold text-(--color-foreground) text-[11px] tracking-tight">
                {displayStatus}
              </span>
            </div>
          </div>

          {/* Cover Media (Strict 4:3 Aspect Ratio) with subtle hover scale */}
          <div className="featured-card-media aspect-[4/3] overflow-hidden bg-(--color-surface-subtle) relative mb-4 border border-(--color-border)">
            {project.coverImage ? (
              <Image
                src={project.coverImage}
                alt={`Cover preview for ${project.title[locale]}`}
                width={800}
                height={600}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px"
                className="featured-card-img object-cover object-top w-full h-full transition-transform duration-500 group-hover:scale-[1.025]"
                loading="lazy"
              />
            ) : (
              <EditorialPlaceholder
                figureNumber={index}
                category={project.category}
                locale={locale}
              />
            )}
          </div>

          {/* Title & Concise Summary */}
          <div className="featured-card-body flex-1 flex flex-col gap-1.5 mb-4">
            <h3 className="featured-card-title font-serif text-xl sm:text-2xl font-normal text-(--color-foreground) group-hover:text-(--color-accent) transition-colors duration-200 m-0 flex justify-between items-baseline gap-2">
              <span>{project.title[locale]}</span>
              <span className="featured-arrow font-sans text-(--color-muted) group-hover:text-(--color-accent) group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 text-sm" aria-hidden="true">
                ↗
              </span>
            </h3>
            <p className="featured-card-subtitle font-mono text-xs text-(--color-accent) m-0">
              {displaySubtitle}
            </p>
            <p className="featured-card-summary text-xs sm:text-sm text-(--color-muted) leading-relaxed line-clamp-2 m-0 mt-1">
              {project.summary[locale]}
            </p>
          </div>

          {/* Card Footer: Role & Selected Tech Stack */}
          <div className="featured-card-footer border-t border-(--color-border) pt-3.5 flex flex-col gap-1.5 font-mono text-xs">
            <div className="featured-footer-role flex items-baseline justify-between gap-2">
              <span className="text-(--color-muted)">{isId ? "PERAN:" : "ROLE:"}</span>
              <span className="text-(--color-foreground) font-medium text-right">{displayRole}</span>
            </div>

            <div className="featured-footer-stack flex items-baseline justify-between gap-2">
              <span className="text-(--color-muted)">{isId ? "STACK:" : "STACK:"}</span>
              <span className="text-(--color-muted) text-right text-[11px]">
                {displayStack.join(" ■ ")}
              </span>
            </div>
          </div>
        </Link>
      </article>
    </ScrollReveal>
  );
}
