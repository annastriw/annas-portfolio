import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, supportedLocales } from "@/lib/i18n/config";
import {
  getAllProjectMetadata,
  getProjectAssets,
} from "@/lib/projects/project-content";
import { ProjectFilter } from "@/components/projects/project-filter";

export const dynamicParams = false;

export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/projects">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const isId = locale === "id";
  const title = isId
    ? "Arsip Proyek & Rekayasa Sistem — Annas Tri Widagdo"
    : "Projects & Systems Archive — Annas Tri Widagdo";
  const description = isId
    ? "Arsip komprehensif proyek rekayasa perangkat lunak, purwarupa AI/ML, aplikasi fullstack, dan sistem digital nyata karya Annas Tri Widagdo."
    : "Comprehensive archive of software engineering projects, AI/ML prototypes, fullstack web applications, and real-world systems by Annas Tri Widagdo.";

  return {
    title,
    description,
    alternates: {
      canonical: `https://annastriwidagdo.me/${locale}/projects`,
      languages: {
        en: "https://annastriwidagdo.me/en/projects",
        id: "https://annastriwidagdo.me/id/projects",
      },
    },
    openGraph: {
      title,
      description,
      url: `https://annastriwidagdo.me/${locale}/projects`,
      siteName: "Annas Tri Widagdo Portfolio",
      locale: isId ? "id_ID" : "en_US",
      type: "website",
    },
  };
}

export default async function ProjectsPage({
  params,
}: PageProps<"/[locale]/projects">) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const projects = await getAllProjectMetadata();

  // Load first thumbnail for each project
  const thumbnails: Record<string, string | null> = {};
  await Promise.all(
    projects.map(async (p) => {
      const assets = await getProjectAssets(p.slug);
      thumbnails[p.slug] = assets.length > 0 ? assets[0] : null;
    })
  );

  const isId = locale === "id";

  return (
    <div className="projects-hub-page">
      <div className="projects-hub-container">
        {/* Page Header */}
        <header className="projects-hub-header">
          <div className="projects-hub-meta">
            <span className="hub-meta-tag">[ARCHIVE // 01]</span>
            <span className="hub-meta-tag">
              {isId ? "INDEKS KARYA & PROYEK" : "COMPLETE INDEX OF WORK"}
            </span>
          </div>

          <h1 className="projects-hub-title">
            {isId ? "Arsip Proyek & Sistem" : "Projects & Systems Archive"}
          </h1>

          <p className="projects-hub-lead">
            {isId
              ? "Dokumentasi rekayasa perangkat lunak, aplikasi fullstack, purwarupa kecerdasan buatan, dan sistem interaktif berdasarkan implementasi nyata."
              : "Comprehensive documentation of software engineering, fullstack web applications, artificial intelligence prototypes, and interactive systems grounded in real implementations."}
          </p>
        </header>

        {/* Interactive Filter & Project Grid */}
        <ProjectFilter
          projects={projects}
          thumbnails={thumbnails}
          locale={locale}
        />
      </div>
    </div>
  );
}
