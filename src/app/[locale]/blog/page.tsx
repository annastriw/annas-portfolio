import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, supportedLocales } from "@/lib/i18n/config";
import {
  getAllBlogMetadata,
  getAllBlogCategories,
} from "@/lib/blog/blog-content";
import { BlogHero } from "@/components/blog/blog-hero";
import { BlogFilter } from "@/components/blog/blog-filter";
import { BlogEmptyState } from "@/components/blog/blog-empty-state";
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
  const title = isId
    ? "Catatan Rekayasa & Tulisan Teknis — Annas Tri Widagdo"
    : "Dispatches & Technical Notes — Annas Tri Widagdo";
  const description = isId
    ? "Kumpulan esai rekayasa sistem, catatan implementasi kecerdasan buatan, arsitektur web modern, dan pengalaman teknis Annas Tri Widagdo."
    : "Engineering essays, applied AI implementation notes, modern web architectures, and technical post-mortems by Annas Tri Widagdo.";

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

  const posts = await getAllBlogMetadata(locale);
  const categories = await getAllBlogCategories(locale);
  const isId = locale === "id";

  const blogListSchema = generateItemListJsonLd(
    posts.map((p) => ({
      title: p.title,
      url: `${SITE_URL}/${locale}/blog/${p.slug}`,
    })),
    isId ? "Catatan Rekayasa & Tulisan Teknis" : "Dispatches & Technical Notes",
    `${SITE_URL}/${locale}/blog`
  );

  return (
    <div className="blog-hub-page">
      <div className="blog-hub-container">
        <JsonLd schema={blogListSchema} />

        {/* Page Header Hero */}
        <BlogHero locale={locale} />

        {/* Content Stream or Empty State */}
        {posts.length > 0 ? (
          <BlogFilter
            posts={posts}
            categories={categories}
            locale={locale}
          />
        ) : (
          <BlogEmptyState locale={locale} mode="empty-archive" />
        )}
      </div>
    </div>
  );
}
