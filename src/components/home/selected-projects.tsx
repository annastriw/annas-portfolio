import Link from "next/link";
import Image from "next/image";
import type { ProjectItem } from "@/content/projects/projects-types";
import type { Locale } from "@/lib/i18n/config";
import { EditorialPlaceholder } from "@/components/ui/editorial-placeholder";

interface SelectedProjectsProps {
  projects: ProjectItem[];
  locale: Locale;
}

export function SelectedProjects({ projects, locale }: SelectedProjectsProps) {
  const isId = locale === "id";
  const featured = projects.filter((p) => p.featured);

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
              <span>{isId ? "Lihat Semua 10 Proyek" : "View All 10 Projects"}</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
          <p className="section-subtitle">
            {isId
              ? "Sorotan proyek dengan kompleksitas arsitektur tinggi, mulai dari aplikasi web enterprise skala produksi hingga purwarupa machine learning terverifikasi."
              : "Highlights of high-impact engineering implementations, spanning production-deployed ERP web applications to verified machine learning inference services."}
          </p>
        </div>

        {/* Editorial Grid */}
        <div className="home-featured-grid">
          {featured.map((project, idx) => {
            const indexFormatted = String(idx + 1).padStart(2, "0");
            const href = `/${locale}/projects/${project.slug}`;

            return (
              <article key={project.slug} className="featured-card group">
                <Link href={href} className="featured-card-link">
                  {/* Card Top Meta */}
                  <div className="featured-card-meta-top">
                    <span className="featured-index">[{indexFormatted}]</span>
                    <span className="featured-kind">
                      {project.category === "web-app"
                        ? "WEB APP"
                        : project.category === "ml"
                        ? "MACHINE LEARNING"
                        : project.category === "mobile"
                        ? "MOBILE"
                        : "OTHER"}
                    </span>
                    {project.status && (
                      <span className="featured-status">{project.status[locale]}</span>
                    )}
                  </div>

                  {/* Cover Media (3:2 Aspect Ratio) */}
                  <div className="featured-card-media aspect-[3/2] overflow-hidden bg-(--color-surface-subtle) relative">
                    {project.coverImage ? (
                      <Image
                        src={project.coverImage}
                        alt={`Preview of ${project.title[locale]}`}
                        width={700}
                        height={466}
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px"
                        className="featured-card-img object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
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

                  {/* Title & Description */}
                  <div className="featured-card-body">
                    <h3 className="featured-card-title">
                      <span>{project.title[locale]}</span>
                      <span className="featured-arrow" aria-hidden="true">
                        ↗
                      </span>
                    </h3>
                    <p className="featured-card-type">{project.subtitle[locale]}</p>
                  </div>

                  {/* Key Tech Rail */}
                  <div className="featured-card-footer">
                    <div className="featured-footer-item">
                      <span className="footer-label">
                        {isId ? "PERAN" : "ROLE"}:
                      </span>
                      <span className="footer-val">{project.role[locale]}</span>
                    </div>
                    {project.stakeholder && (
                      <div className="featured-footer-item">
                        <span className="footer-label">
                          {isId ? "MITRA / KLIEN" : "CLIENT"}:
                        </span>
                        <span className="footer-val">{project.stakeholder[locale]}</span>
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
              ? `Tersedia 10 studi kasus teknis lengkap dalam arsip portofolio.`
              : `10 verified technical case studies available in the complete archive.`}
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
