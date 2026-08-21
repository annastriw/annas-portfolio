import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, supportedLocales, type Locale } from "@/lib/i18n/config";
import {
  getProjectBySlug,
  getProjectSlugs,
  getProjectAssets,
  getAdjacentProjects,
} from "@/lib/projects/project-content";
import { MarkdownRenderer } from "@/components/markdown/markdown-renderer";
import { ProjectMetaRail } from "@/components/projects/project-meta-rail";
import { ProjectGallery } from "@/components/projects/project-gallery";
import { ProjectClaimNotice } from "@/components/projects/project-claim-notice";

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  const params: { locale: Locale; slug: string }[] = [];

  for (const locale of supportedLocales) {
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/projects/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};

  const project = await getProjectBySlug(slug);
  if (!project) return {};

  const isId = locale === "id";
  const title = `${project.metadata.title} — Annas Tri Widagdo`;
  const description = `${project.metadata.projectType} by Annas Tri Widagdo. ${
    project.metadata.stakeholder ? `Developed for ${project.metadata.stakeholder}.` : ""
  }`;

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

export default async function ProjectDetailPage({
  params,
}: PageProps<"/[locale]/projects/[slug]">) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const project = await getProjectBySlug(slug);
  if (!project) {
    notFound();
  }

  const assets = await getProjectAssets(slug);
  const { prev, next } = await getAdjacentProjects(slug);
  const isId = locale === "id";

  return (
    <article className="project-detail-page">
      <div className="project-detail-container">
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
              [{project.metadata.kind.toUpperCase()}]
            </span>
            {project.metadata.status && (
              <span className="detail-meta-pill detail-meta-status">
                STATUS: {project.metadata.status}
              </span>
            )}
          </div>

          <h1 className="project-detail-title">{project.metadata.title}</h1>
          <p className="project-detail-subtitle">{project.metadata.projectType}</p>
        </header>

        {/* Claim Limitations Callout (if applicable) */}
        <ProjectClaimNotice slug={project.slug} locale={locale} />

        {/* Main Content Layout: Case Study + Technical Meta Rail */}
        <div className="project-detail-layout">
          {/* Main Case Study & Markdown Body */}
          <section className="project-detail-main" aria-label="Case Study and Documentation">
            {/* Visual Media Gallery */}
            <ProjectGallery
              assets={assets}
              title={project.metadata.title}
              locale={locale}
            />

            {/* Markdown Case Study Body */}
            <div className="project-case-study-body">
              <MarkdownRenderer content={project.content} />
            </div>
          </section>

          {/* Technical Specifications Rail */}
          <ProjectMetaRail
            metadata={project.metadata}
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
                <span className="adjacent-nav-title">{prev.title}</span>
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
              {isId ? "Lihat Semua Proyek" : "View All Projects"}
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
                <span className="adjacent-nav-title">{next.title}</span>
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
