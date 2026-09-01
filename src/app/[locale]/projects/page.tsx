import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, supportedLocales } from "@/lib/i18n/config";
import {
  projectArchive,
  projectArchiveCopy,
  PROJECT_ARCHIVE_TOTAL_COUNT,
  PROJECT_ARCHIVE_CATEGORY_COUNT,
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
    <div className="py-6 sm:py-8 md:py-10 lg:py-12">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <JsonLd schema={collectionSchema} />

        {/* Technical Editorial Header / Masthead */}
        <header className="mb-6 sm:mb-8 md:mb-10 max-w-4xl">
          <ScrollReveal animationClass="animate-editorial-fade">
            <div className="mb-2.5 flex items-center gap-3 font-mono text-xs text-(--color-muted)">
              <span className="font-semibold text-(--color-accent)">
                {projectArchiveCopy.sectionIndex[locale]}
              </span>
            </div>

            <h1 className="m-0 font-serif text-[clamp(2.5rem,5.5vw,5rem)] font-normal leading-[0.96] tracking-[-0.04em] text-(--color-foreground)">
              {projectArchiveCopy.title[locale]}
            </h1>

            <p className="mb-0 mt-3 sm:mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-(--color-muted)">
              {projectArchiveCopy.lead[locale]}
            </p>

            {/* Two-Item Editorial Archive Metadata Row */}
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-(--color-border) pt-3 font-mono text-xs text-(--color-muted) tracking-wider">
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
                  {PROJECT_ARCHIVE_CATEGORY_COUNT}
                </span>
                <span>{projectArchiveCopy.categoryCountLabel[locale]}</span>
              </div>
            </div>
          </ScrollReveal>
        </header>

        <ScrollReveal animationClass="animate-editorial-fade" delayMs={60}>
          <ProjectArchive projects={projectArchive} locale={locale} />
        </ScrollReveal>
      </div>
    </div>
  );
}
