import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, supportedLocales } from "@/lib/i18n/config";
import { blogArticles } from "@/content/blog";
import { BlogHero } from "@/components/blog/blog-hero";
import { BlogArchive } from "@/components/blog/blog-archive";
import { JsonLd } from "@/components/seo/json-ld";
import { generateCollectionPageJsonLd, createPageMetadata, SITE_URL } from "@/lib/seo";

interface BlogPageProps {
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
}: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const isId = locale === "id";
  const title = isId
    ? "Blog Teknis - Annas Tri Widagdo"
    : "Technical Blog - Annas Tri Widagdo";
  const description = isId
    ? "Artikel teknis ringkas tentang ERP multi-cabang, integrasi machine learning, printing Android, dan speech-to-text berdasarkan pengalaman proyek Annas Tri Widagdo."
    : "Concise technical articles on multi-branch ERP, machine-learning integration, Android printing, and speech-to-text based on Annas Tri Widagdo's project work.";

  return createPageMetadata({
    locale,
    path: "blog",
    title,
    description,
    type: "website",
    images: [
      {
        url: "/assets/projects/ukg-system/cover.webp",
        width: 1200,
        height: 900,
        alt: isId
          ? "Arsip blog teknis Annas Tri Widagdo"
          : "Technical blog archive of Annas Tri Widagdo",
      },
    ],
  });
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const isId = locale === "id";
  const listName = isId ? "Blog Teknis - Annas Tri Widagdo" : "Technical Blog - Annas Tri Widagdo";
  const listDescription = isId
    ? "Artikel teknis ringkas tentang ERP multi-cabang, integrasi machine learning, printing Android, dan speech-to-text berdasarkan pengalaman proyek Annas Tri Widagdo."
    : "Concise technical articles on multi-branch ERP, machine-learning integration, Android printing, and speech-to-text based on Annas Tri Widagdo's project work.";

  const collectionSchema = generateCollectionPageJsonLd(
    blogArticles.map((article) => ({
      title: article.title[locale],
      url: `${SITE_URL}/${locale}/blog/${article.slug}`,
    })),
    listName,
    `${SITE_URL}/${locale}/blog`,
    listDescription,
    locale,
  );

  return (
    <div className="blog-hub-page">
      <div className="blog-hub-container">
        <JsonLd schema={collectionSchema} />

        <BlogHero locale={locale} />
        <BlogArchive articles={blogArticles} locale={locale} />
      </div>
    </div>
  );
}
