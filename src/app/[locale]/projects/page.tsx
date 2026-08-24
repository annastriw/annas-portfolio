import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, supportedLocales } from "@/lib/i18n/config";
import { projectArchive } from "@/content/projects/project-archive";
import { ProjectArchive } from "@/components/projects/project-archive";
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
    ? "Arsip Proyek - Annas Tri Widagdo"
    : "Projects Archive - Annas Tri Widagdo";
  const description = isId
    ? "Arsip 10 proyek terverifikasi Annas Tri Widagdo di bidang aplikasi web, machine learning, mobile, dan media interaktif."
    : "An archive of 10 verified projects by Annas Tri Widagdo across web applications, machine learning, mobile, and interactive media.";

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

  const isId = locale === "id";

  const projectListSchema = generateItemListJsonLd(
    projectArchive.map((project) => ({
      title: project.title[locale],
      url: `${SITE_URL}/${locale}/projects/${project.slug}`,
    })),
    isId ? "Arsip Proyek" : "Projects Archive",
    `${SITE_URL}/${locale}/projects`
  );

  return (
    <div className="py-10 sm:py-12 md:py-14">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <JsonLd schema={projectListSchema} />

        <header className="mb-10 max-w-4xl animate-editorial-fade motion-reduce:animate-none sm:mb-12 md:mb-14">
          <p className="mb-4 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-(--color-muted)">
            {isId ? "INDEKS PROYEK / 10 ENTRI" : "PROJECT INDEX / 10 ENTRIES"}
          </p>
          <h1 className="m-0 max-w-4xl font-serif text-[clamp(3rem,7vw,6.5rem)] font-normal leading-[0.92] tracking-[-0.055em] text-(--color-foreground)">
            {isId ? "Arsip Proyek" : "Projects Archive"}
          </h1>
          <p className="mb-0 mt-6 max-w-2xl text-base leading-relaxed text-(--color-muted) sm:text-lg">
            {isId
              ? "Sepuluh proyek terverifikasi yang mencakup sistem web, machine learning, utilitas mobile, dan media interaktif."
              : "Ten verified builds across web systems, machine learning, mobile utilities, and interactive media."}
          </p>
        </header>

        <ProjectArchive projects={projectArchive} locale={locale} />
      </div>
    </div>
  );
}
