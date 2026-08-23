import Link from "next/link";
import Image from "next/image";
import type { ProjectItem } from "@/content/projects/projects-types";
import type { Locale } from "@/lib/i18n/config";
import { EditorialPlaceholder } from "@/components/ui/editorial-placeholder";

interface ProjectCardProps {
  project: ProjectItem;
  locale: Locale;
  index: number;
}

export function ProjectCard({ project, locale, index }: ProjectCardProps) {
  const indexFormatted = String(index + 1).padStart(2, "0");
  const href = `/${locale}/projects/${project.slug}`;
  const isId = locale === "id";

  return (
    <article className="project-card group">
      <Link
        href={href}
        className="project-card-link"
        aria-label={`View project ${project.title[locale]}`}
      >
        {/* Header Rail: Index, Category, Status */}
        <div className="project-card-header">
          <span className="project-card-index" aria-hidden="true">
            [{indexFormatted}]
          </span>
          <span className="project-card-kind">
            {project.category === "web-app"
              ? "WEB APP"
              : project.category === "ml"
              ? "MACHINE LEARNING"
              : project.category === "mobile"
              ? "MOBILE"
              : "OTHER"}
          </span>
          {project.status && (
            <span className="project-card-status">{project.status[locale]}</span>
          )}
        </div>

        {/* Cover Image (3:2 ratio) */}
        <div className="project-card-media aspect-[3/2] overflow-hidden bg-(--color-surface-subtle) relative">
          {project.coverImage ? (
            <Image
              src={project.coverImage}
              alt={`Cover preview for ${project.title[locale]}`}
              width={600}
              height={400}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
              className="project-card-img object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <EditorialPlaceholder
              figureNumber={indexFormatted}
              category={project.category}
              locale={locale}
            />
          )}
        </div>

        {/* Title & Type */}
        <div className="project-card-body">
          <h3 className="project-card-title">
            <span>{project.title[locale]}</span>
            <span className="project-card-arrow" aria-hidden="true">
              →
            </span>
          </h3>
          <p className="project-card-type">{project.subtitle[locale]}</p>
        </div>

        {/* Meta Rail: Role & Stakeholder */}
        <div className="project-card-meta">
          <div className="project-card-meta-item">
            <span className="meta-label">{isId ? "PERAN" : "ROLE"}:</span>
            <span className="meta-value">{project.role[locale]}</span>
          </div>
          {project.stakeholder && (
            <div className="project-card-meta-item">
              <span className="meta-label">
                {isId ? "KLIEN / MITRA" : "STAKEHOLDER"}:
              </span>
              <span className="meta-value">{project.stakeholder[locale]}</span>
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
