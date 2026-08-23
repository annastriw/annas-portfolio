import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, supportedLocales, type Locale } from "@/lib/i18n/config";
import {
  projectsData,
  getProjectDataBySlug,
  getAdjacentProjectsData,
} from "@/content/projects/projects-data";
import { ProjectGallery } from "@/components/projects/project-gallery";
import { ProjectMetaRail } from "@/components/projects/project-meta-rail";
import { ProjectClaimNotice } from "@/components/projects/project-claim-notice";
import { JsonLd } from "@/components/seo/json-ld";
import { generateProjectJsonLd } from "@/lib/seo/schema-generators";

interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  const params: { locale: Locale; slug: string }[] = [];

  for (const locale of supportedLocales) {
    for (const project of projectsData) {
      params.push({ locale, slug: project.slug });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};

  const project = getProjectDataBySlug(slug);
  if (!project) return {};

  const isId = locale === "id";
  const title = `${project.title[locale]} — Annas Tri Widagdo`;
  const description = project.summary[locale];

  return {
    title,
    description,
    alternates: {
      canonical: `https://annastriwidagdo.me/${locale}/projects/${slug}`,
      languages: {
        en: `https://annastriwidagdo.me/en/projects/${slug}`,
        id: `https://annastriwidagdo.me/id/projects/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `https://annastriwidagdo.me/${locale}/projects/${slug}`,
      siteName: "Annas Tri Widagdo Portfolio",
      locale: isId ? "id_ID" : "en_US",
      type: "article",
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const project = getProjectDataBySlug(slug);
  if (!project) {
    notFound();
  }

  const { prev, next } = getAdjacentProjectsData(slug);
  const isId = locale === "id";

  // Combine cover image (if distinct) and documentation images for gallery
  const allGalleryAssets = [
    ...(project.coverImage ? [project.coverImage] : []),
    ...project.documentationImages.filter((img) => img !== project.coverImage),
  ];

  return (
    <article className="project-detail-page">
      <div className="project-detail-container">
        <JsonLd schema={generateProjectJsonLd(project, locale)} />

        {/* Navigation Breadcrumb Bar */}
        <nav
          className="project-detail-breadcrumb"
          aria-label={isId ? "Navigasi halaman proyek" : "Project page navigation"}
        >
          <Link
            href={`/${locale}/projects`}
            className="back-to-projects-link"
          >
            <span aria-hidden="true">←</span>
            <span>{isId ? "Kembali ke Indeks Proyek" : "Back to Projects Index"}</span>
          </Link>
          <span className="breadcrumb-path" aria-hidden="true">
            / {locale.toUpperCase()} / PROJECTS / {project.slug}
          </span>
        </nav>

        {/* Project Header Hero */}
        <header className="project-detail-header">
          <div className="project-detail-meta-tags">
            <span className="detail-meta-pill">
              [
              {project.category === "web-app"
                ? "WEB APPLICATION"
                : project.category === "ml"
                ? "MACHINE LEARNING"
                : project.category === "mobile"
                ? "MOBILE APPLICATION"
                : "INTERACTIVE / OTHER"}
              ]
            </span>
            {project.status && (
              <span className="detail-meta-pill detail-meta-status">
                STATUS: {project.status[locale]}
              </span>
            )}
          </div>

          <h1 className="project-detail-title">{project.title[locale]}</h1>
          <p className="project-detail-subtitle">{project.subtitle[locale]}</p>
        </header>

        {/* Claim Limitations Notice (if applicable) */}
        {project.claimLimitation && (
          <ProjectClaimNotice notice={project.claimLimitation} locale={locale} />
        )}

        {/* Main Content Layout: Case Study + Technical Meta Rail */}
        <div className="project-detail-layout">
          {/* Main Case Study Body */}
          <section
            className="project-detail-main"
            aria-label="Case Study and Documentation"
          >
            {/* Visual Media Gallery */}
            <ProjectGallery
              assets={allGalleryAssets}
              title={project.title[locale]}
              locale={locale}
            />

            {/* Structured Editorial Case Study */}
            <div className="project-case-study-body editorial-prose">
              {/* 01. Summary & Problem */}
              <div className="case-study-section">
                <h2 className="case-study-heading">
                  {isId ? "01. Konteks & Masalah Rekayasa" : "01. Context & Engineering Problem"}
                </h2>
                <p className="case-study-lead">{project.summary[locale]}</p>
                <p className="case-study-text">{project.problemStatement[locale]}</p>
              </div>

              {/* 02. System Solution & Architecture */}
              <div className="case-study-section">
                <h2 className="case-study-heading">
                  {isId ? "02. Arsitektur & Solusi Sistem" : "02. Architecture & System Solution"}
                </h2>
                <p className="case-study-text">{project.systemSolution[locale]}</p>
              </div>

              {/* 03. Key Modules & Functional Capabilities */}
              {project.keyModules && project.keyModules.length > 0 && (
                <div className="case-study-section">
                  <h2 className="case-study-heading">
                    {isId ? "03. Modul & Kapabilitas Utama" : "03. Core Modules & Capabilities"}
                  </h2>
                  <div className="case-study-modules-grid">
                    {project.keyModules.map((module, i) => (
                      <div key={i} className="module-item-card">
                        <div className="module-item-header">
                          <span className="module-item-tag">MOD.0{i + 1}</span>
                          <h3 className="module-item-title">{module.title[locale]}</h3>
                        </div>
                        <p className="module-item-desc">{module.description[locale]}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 04. Personal Contributions */}
              <div className="case-study-section">
                <h2 className="case-study-heading">
                  {isId ? "04. Tanggung Jawab & Kontribusi Pribadi" : "04. Personal Responsibilities & Contributions"}
                </h2>
                <ul className="case-study-bullets">
                  {project.personalContributions[locale].map((contrib, i) => (
                    <li key={i} className="case-study-bullet-item">
                      <span className="bullet-marker" aria-hidden="true">
                        ▸
                      </span>
                      <span>{contrib}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 05. Verified Results & Evidence */}
              <div className="case-study-section">
                <h2 className="case-study-heading">
                  {isId ? "05. Hasil Terverifikasi & Bukti Otentik" : "05. Verified Results & Authentic Evidence"}
                </h2>
                <ul className="case-study-bullets">
                  {project.verifiedEvidence[locale].map((evidence, i) => (
                    <li key={i} className="case-study-bullet-item">
                      <span className="bullet-marker text-(--color-accent)" aria-hidden="true">
                        ✓
                      </span>
                      <span>{evidence}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Technical Specifications Rail */}
          <ProjectMetaRail
            project={project}
            locale={locale}
          />
        </div>

        {/* Exploration Rail / Prev & Next Projects */}
        <nav
          className="project-adjacent-nav"
          aria-label={isId ? "Proyek sebelumnya dan selanjutnya" : "Previous and next projects"}
        >
          <div className="adjacent-nav-item adjacent-nav-prev">
            {prev ? (
              <Link
                href={`/${locale}/projects/${prev.slug}`}
                className="adjacent-nav-link"
              >
                <span className="adjacent-nav-direction">
                  ← {isId ? "PROYEK SEBELUMNYA" : "PREVIOUS PROJECT"}
                </span>
                <span className="adjacent-nav-title">{prev.title[locale]}</span>
              </Link>
            ) : (
              <span className="adjacent-nav-disabled">
                {isId ? "Awal Arsip Proyek" : "Start of Archive"}
              </span>
            )}
          </div>

          <div className="adjacent-nav-center">
            <Link
              href={`/${locale}/projects`}
              className="adjacent-all-link"
            >
              {isId ? "Lihat Semua Proyek (10)" : "View All Projects (10)"}
            </Link>
          </div>

          <div className="adjacent-nav-item adjacent-nav-next">
            {next ? (
              <Link
                href={`/${locale}/projects/${next.slug}`}
                className="adjacent-nav-link"
              >
                <span className="adjacent-nav-direction">
                  {isId ? "PROYEK BERIKUTNYA" : "NEXT PROJECT"} →
                </span>
                <span className="adjacent-nav-title">{next.title[locale]}</span>
              </Link>
            ) : (
              <span className="adjacent-nav-disabled">
                {isId ? "Akhir Arsip Proyek" : "End of Archive"}
              </span>
            )}
          </div>
        </nav>
      </div>
    </article>
  );
}
