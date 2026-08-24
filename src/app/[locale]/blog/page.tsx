import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, supportedLocales } from "@/lib/i18n/config";
import { blogArticles } from "@/content/blog";
import { BlogHero } from "@/components/blog/blog-hero";
import { BlogArchive } from "@/components/blog/blog-archive";
import { JsonLd } from "@/components/seo/json-ld";
import { generateItemListJsonLd } from "@/lib/seo/schema-generators";
import { SITE_URL } from "@/lib/seo/seo-types";

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
  const title = "Blog - Annas Tri Widagdo";
  const description = isId
    ? "Artikel teknis ringkas tentang ERP multi-cabang, integrasi machine learning, printing Android, dan speech-to-text berdasarkan pengalaman proyek Annas Tri Widagdo."
    : "Concise technical articles on multi-branch ERP, machine-learning integration, Android printing, and speech-to-text based on Annas Tri Widagdo's project work.";

  return {
    title,
    description,
    alternates: {
      canonical: `https://annastriwidagdo.me/${locale}/blog`,
      languages: {
        en: "https://annastriwidagdo.me/en/blog",
        id: "https://annastriwidagdo.me/id/blog",
      },
    },
    openGraph: {
      title,
      description,
      url: `https://annastriwidagdo.me/${locale}/blog`,
      siteName: "Annas Tri Widagdo Portfolio",
      locale: isId ? "id_ID" : "en_US",
      type: "website",
    },
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const isId = locale === "id";

  const blogListSchema = generateItemListJsonLd(
    blogArticles.map((article) => ({
      title: article.title[locale],
      url: `${SITE_URL}/${locale}/blog/${article.slug}`,
    })),
    isId ? "Artikel Teknis" : "Technical Articles",
    `${SITE_URL}/${locale}/blog`
  );

  return (
    <div className="blog-hub-page">
      <div className="blog-hub-container">
        <JsonLd schema={blogListSchema} />

        <BlogHero locale={locale} />
        <BlogArchive articles={blogArticles} locale={locale} />
      </div>
    </div>
  );
}
