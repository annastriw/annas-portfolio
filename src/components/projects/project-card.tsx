import Link from "next/link";
import Image from "next/image";
import type { ProjectMetadata } from "@/lib/projects/project-types";
import type { Locale } from "@/lib/i18n/config";

interface ProjectCardProps {
  project: ProjectMetadata;
  locale: Locale;
  index: number;
  thumbnail?: string | null;
}

export function ProjectCard({
  project,
  locale,
  index,
  thumbnail,
}: ProjectCardProps) {
  const indexFormatted = String(index + 1).padStart(2, "0");
  const href = `/${locale}/projects/${project.slug}`;

  return (
    <article className="project-card group">
      <Link href={href} className="project-card-link" aria-label={`View project ${project.title}`}>
        {/* Header Rail: Index, Type, Status */}
        <div className="project-card-header">
          <span className="project-card-index" aria-hidden="true">
            [{indexFormatted}]
          </span>
          <span className="project-card-kind">{project.kind.toUpperCase()}</span>
          {project.status && (
            <span className="project-card-status">{project.status}</span>
          )}
        </div>

        {/* Optional Thumbnail */}
        {thumbnail && (
          <div className="project-card-media">
            <Image
              src={thumbnail}
              alt={`Screenshot for ${project.title}`}
              width={600}
              height={340}
              className="project-card-img"
              loading="lazy"
            />
          </div>
        )}

        {/* Title & Subtitle */}
        <div className="project-card-body">
          <h3 className="project-card-title">
            <span>{project.title}</span>
            <span className="project-card-arrow" aria-hidden="true">
              →
            </span>
          </h3>
          <p className="project-card-type">{project.projectType}</p>
        </div>

        {/* Meta Rail: Role & Stakeholder */}
        <div className="project-card-meta">
          <div className="project-card-meta-item">
            <span className="meta-label">{locale === "id" ? "PERAN" : "ROLE"}:</span>
            <span className="meta-value">{project.role}</span>
          </div>
          {project.stakeholder && (
            <div className="project-card-meta-item">
              <span className="meta-label">
                {locale === "id" ? "KLIEN / MITRA" : "STAKEHOLDER"}:
              </span>
              <span className="meta-value">{project.stakeholder}</span>
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
