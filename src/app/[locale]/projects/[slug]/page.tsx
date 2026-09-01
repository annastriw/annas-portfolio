import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectCaseStudyView } from "@/components/projects/project-case-study";
import { JsonLd } from "@/components/seo/json-ld";
import {
  getAdjacentProjectCaseStudies,
  getProjectCaseStudy,
  projectCaseStudies,
} from "@/content/projects/project-case-studies";
import { isLocale, supportedLocales } from "@/lib/i18n/config";
import { generateProjectJsonLd, createPageMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return supportedLocales.flatMap((locale) =>
    projectCaseStudies.map((project) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};

  const project = getProjectCaseStudy(slug);
  if (!project) return {};

  const title =
    project.metaTitle?.[locale] ??
    `${project.title[locale]} - Annas Tri Widagdo`;
  const description =
    project.metaDescription?.[locale] ??
    project.overview[locale].join(" ");

  return createPageMetadata({
    locale,
    path: `projects/${slug}`,
    title,
    description,
    type: "article",
    images: [
      {
        url: project.cover.src,
        alt: project.cover.alt[locale],
      },
    ],
  });
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const project = getProjectCaseStudy(slug);
  if (!project) notFound();

  const { previous, next } = getAdjacentProjectCaseStudies(slug);

  return (
    <>
      <JsonLd schema={generateProjectJsonLd(project, locale)} />
      <ProjectCaseStudyView
        project={project}
        locale={locale}
        previous={previous}
        next={next}
      />
    </>
  );
}
