import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, supportedLocales, type Locale } from "@/lib/i18n/config";
import { getAllProjectsData } from "@/content/projects/projects-data";
import { ProjectFilter } from "@/components/projects/project-filter";
import { JsonLd } from "@/components/seo/json-ld";
import { generateItemListJsonLd } from "@/lib/seo/schema-generators";
import { SITE_URL } from "@/lib/seo/seo-types";

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const isId = locale === "id";
  const title = isId
    ? "Arsip Proyek & Rekayasa Sistem — Annas Tri Widagdo"
    : "Projects & Systems Archive — Annas Tri Widagdo";
  const description = isId
    ? "Arsip komprehensif 10 proyek rekayasa perangkat lunak, aplikasi fullstack, purwarupa AI/ML, dan sistem digital karya Annas Tri Widagdo."
    : "Comprehensive archive of 10 curated software engineering projects, fullstack web applications, AI/ML prototypes, and digital systems by Annas Tri Widagdo.";

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

export default async function ProjectsPage({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const projects = getAllProjectsData();
  const isId = locale === "id";

  const projectListSchema = generateItemListJsonLd(
    projects.map((p) => ({
      title: p.title[locale as Locale],
      url: `${SITE_URL}/${locale}/projects/${p.slug}`,
    })),
    isId ? "Arsip Proyek & Rekayasa Sistem" : "Projects & Systems Archive",
    `${SITE_URL}/${locale}/projects`
  );

  return (
    <div className="projects-hub-page">
      <div className="projects-hub-container">
        <JsonLd schema={projectListSchema} />

        {/* Page Header */}
        <header className="projects-hub-header">
          <div className="projects-hub-meta">
            <span className="hub-meta-tag">[ARCHIVE // 01]</span>
            <span className="hub-meta-tag">
              {isId ? "INDEKS KARYA & PROYEK TERKURASI" : "CURATED INDEX OF 10 PROJECTS"}
            </span>
          </div>

          <h1 className="projects-hub-title">
            {isId ? "Arsip Proyek & Rekayasa Sistem" : "Projects & Systems Archive"}
          </h1>

          <p className="projects-hub-lead">
            {isId
              ? "Dokumentasi terstruktur dari 10 proyek rekayasa perangkat lunak, aplikasi web fullstack, purwarupa machine learning, dan utilitas perangkat keras berlandaskan bukti nyata."
              : "Structured documentation of 10 curated software engineering projects, fullstack web applications, machine learning prototypes, and hardware utilities grounded in authentic evidence."}
          </p>
        </header>

        {/* Interactive Filter & Project Grid */}
        <ProjectFilter projects={projects} locale={locale as Locale} />
      </div>
    </div>
  );
}
