import Link from "next/link";
import Image from "next/image";
import type { ProjectMetadata } from "@/lib/projects/project-types";
import type { Locale } from "@/lib/i18n/config";

interface SelectedProjectsProps {
  projects: ProjectMetadata[];
  thumbnails: Record<string, string | null>;
  locale: Locale;
}

const FEATURED_SLUGS = [
  "dialisis-connect-edu",
  "ml-for-heart-attack-risk-prediction",
  "simastok",
  "speech-to-text-system",
];

export function SelectedProjects({
  projects,
  thumbnails,
  locale,
}: SelectedProjectsProps) {
  const isId = locale === "id";
  const featured = projects.filter((p) => FEATURED_SLUGS.includes(p.slug));

  return (
    <section className="home-selected-section" aria-label="Selected Projects">
      <div className="home-selected-container">
        {/* Section Header */}
        <div className="home-section-header">
          <div className="section-header-meta">
            <span className="section-meta-tag">[01 // SELECTED WORK]</span>
            <span className="section-meta-tag">
              {isId ? "PROYEK UNGGULAN" : "FEATURED CASE STUDIES"}
            </span>
          </div>
          <div className="section-title-row">
            <h2 className="section-title">
              {isId ? "Karya & Purwarupa Pilihan" : "Selected Engineering Work"}
            </h2>
            <Link
              href={`/${locale}/projects`}
              className="section-header-link"
            >
              <span>{isId ? "Lihat Semua 11 Proyek" : "View All 11 Projects"}</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
          <p className="section-subtitle">
            {isId
              ? "Sorotan proyek dengan kompleksitas arsitektur tinggi, mulai dari aplikasi web skala produksi hingga purwarupa machine learning tervalidasi."
              : "Highlights of high-complexity engineering implementations, spanning production-deployed web applications to validated machine learning inference services."}
          </p>
        </div>

        {/* 2x2 Editorial Grid */}
        <div className="home-featured-grid">
          {featured.map((project, idx) => {
            const indexFormatted = String(idx + 1).padStart(2, "0");
            const thumbnail = thumbnails[project.slug];
            const href = `/${locale}/projects/${project.slug}`;

            return (
              <article key={project.slug} className="featured-card group">
                <Link href={href} className="featured-card-link">
                  {/* Card Top Meta */}
                  <div className="featured-card-meta-top">
                    <span className="featured-index">[{indexFormatted}]</span>
                    <span className="featured-kind">{project.kind.toUpperCase()}</span>
                    {project.status && (
                      <span className="featured-status">{project.status}</span>
                    )}
                  </div>

                  {/* Thumbnail Visual */}
                  {thumbnail && (
                    <div className="featured-card-media">
                      <Image
                        src={thumbnail}
                        alt={`Screenshot of ${project.title}`}
                        width={700}
                        height={390}
                        className="featured-card-img"
                        loading="lazy"
                      />
                    </div>
                  )}

                  {/* Title & Description */}
                  <div className="featured-card-body">
                    <h3 className="featured-card-title">
                      <span>{project.title}</span>
                      <span className="featured-arrow" aria-hidden="true">
                        ↗
                      </span>
                    </h3>
                    <p className="featured-card-type">{project.projectType}</p>
                  </div>

                  {/* Key Tech Rail */}
                  <div className="featured-card-footer">
                    <div className="featured-footer-item">
                      <span className="footer-label">
                        {isId ? "PERAN" : "ROLE"}:
                      </span>
                      <span className="footer-val">{project.role}</span>
                    </div>
                    {project.stakeholder && (
                      <div className="featured-footer-item">
                        <span className="footer-label">
                          {isId ? "MITRA" : "CLIENT"}:
                        </span>
                        <span className="footer-val">{project.stakeholder}</span>
                      </div>
                    )}
                  </div>
                </Link>
              </article>
            );
          })}
        </div>

        {/* Section Bottom CTA */}
        <div className="home-selected-bottom-bar">
          <span className="bottom-bar-label">
            {isId
              ? `Tersedia 11 studi kasus teknis lengkap dalam arsip portofolio.`
              : `11 verified technical case studies available in the complete archive.`}
          </span>
          <Link
            href={`/${locale}/projects`}
            className="bottom-bar-cta"
          >
            <span>{isId ? "Buka Seluruh Indeks Proyek" : "Browse Full Projects Archive"}</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
