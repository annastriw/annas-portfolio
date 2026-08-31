import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, supportedLocales } from "@/lib/i18n/config";
import {
  projectArchive,
  projectArchiveCopy,
  PROJECT_ARCHIVE_TOTAL_COUNT,
  PROJECT_ARCHIVE_DISCIPLINE_COUNT,
} from "@/content/projects/project-archive";
import { ProjectArchive } from "@/components/projects/project-archive";
import { JsonLd } from "@/components/seo/json-ld";
import { generateCollectionPageJsonLd, createPageMetadata, SITE_URL } from "@/lib/seo";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

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
    ? "Arsip Proyek | Annas Tri Widagdo"
    : "Projects Archive | Annas Tri Widagdo";
  const description = isId
    ? "Jelajahi project Annas Tri Widagdo dalam web development, machine learning, aplikasi mobile, dan media interaktif, dilengkapi pembahasan setiap project."
    : "Explore projects by Annas Tri Widagdo across web development, machine learning, mobile applications, and interactive media, with detailed case studies.";

  return createPageMetadata({
    locale,
    path: "projects",
    title,
    description,
    type: "website",
    images: [
      {
        url: "/assets/projects/ukg-system/cover.webp",
        width: 1200,
        height: 900,
        alt: isId
          ? "Arsip proyek rekayasa Annas Tri Widagdo"
          : "Engineering projects archive of Annas Tri Widagdo",
      },
    ],
  });
}

export default async function ProjectsPage({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const isId = locale === "id";
  const listName = isId
    ? "Arsip Proyek | Annas Tri Widagdo"
    : "Projects Archive | Annas Tri Widagdo";
  const listDescription = isId
    ? "Jelajahi project Annas Tri Widagdo dalam web development, machine learning, aplikasi mobile, dan media interaktif, dilengkapi pembahasan setiap project."
    : "Explore projects by Annas Tri Widagdo across web development, machine learning, mobile applications, and interactive media, with detailed case studies.";

  const collectionSchema = generateCollectionPageJsonLd(
    projectArchive.map((project) => ({
      title: project.title[locale],
      url: `${SITE_URL}/${locale}/projects/${project.slug}`,
    })),
    listName,
    `${SITE_URL}/${locale}/projects`,
    listDescription,
    locale,
  );

  return (
    <div className="py-8 sm:py-12 md:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <JsonLd schema={collectionSchema} />

        {/* Technical Editorial Header / Masthead */}
        <header className="mb-10 max-w-4xl sm:mb-12 md:mb-14">
          <ScrollReveal animationClass="animate-editorial-fade">
            <div className="mb-3 flex items-center gap-3 font-mono text-xs text-(--color-muted)">
              <span className="font-semibold text-(--color-accent)">
                {projectArchiveCopy.sectionIndex[locale]}
              </span>
            </div>

            <h1 className="m-0 font-serif text-[clamp(2.75rem,6vw,5.5rem)] font-normal leading-[0.96] tracking-[-0.04em] text-(--color-foreground)">
              {projectArchiveCopy.title[locale]}
            </h1>

            <p className="mb-0 mt-5 max-w-3xl text-base leading-relaxed text-(--color-muted) sm:text-lg">
              {projectArchiveCopy.lead[locale]}
            </p>

            {/* Two-Item Editorial Archive Metadata Row */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-(--color-border) pt-4 font-mono text-xs text-(--color-muted) tracking-wider">
              <div className="flex items-center gap-2">
                <span className="text-(--color-accent)">●</span>
                <span className="font-medium text-(--color-foreground)">
                  {PROJECT_ARCHIVE_TOTAL_COUNT}
                </span>
                <span>{projectArchiveCopy.projectCountLabel[locale]}</span>
              </div>
              <div
                className="hidden text-(--color-border) sm:inline"
                aria-hidden="true"
              >
                |
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-(--color-foreground)">
                  {PROJECT_ARCHIVE_DISCIPLINE_COUNT}
                </span>
                <span>{projectArchiveCopy.disciplineCountLabel[locale]}</span>
              </div>
            </div>
          </ScrollReveal>
        </header>

        <ProjectArchive projects={projectArchive} locale={locale} />
      </div>
    </div>
  );
}
