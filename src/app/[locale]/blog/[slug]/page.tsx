import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogArticles, getBlogArticle } from "@/content/blog";
import { isLocale, supportedLocales, type Locale } from "@/lib/i18n/config";
import { createPageMetadata } from "@/lib/seo";
import { BlogPlaceholderView } from "@/components/blog/blog-placeholder-view";

interface BlogPostPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return supportedLocales.flatMap((locale) =>
    blogArticles.map((article) => ({ locale, slug: article.slug })),
  );
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};

  const article = getBlogArticle(slug);
  if (!article) return {};

  const isId = locale === "id";
  const title = isId
    ? "Arsip Blog | Annas Tri Widagdo"
    : "Blog Archive | Annas Tri Widagdo";
  const description = isId
    ? "Blog ini sedang disiapkan. Artikel akan tersedia di sini setelah siap dipublikasikan."
    : "This blog is being prepared. Articles will be available here once they’re ready.";

  return createPageMetadata({
    locale,
    path: `blog/${slug}`,
    title,
    description,
    type: "website",
  });
}

export default async function BlogPostDetailPage({
  params,
}: BlogPostPageProps) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const article = getBlogArticle(slug);
  if (!article) {
    notFound();
  }

  return <BlogPlaceholderView locale={locale as Locale} isArticle={true} />;
}
