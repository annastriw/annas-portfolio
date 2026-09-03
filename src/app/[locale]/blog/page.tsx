import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, supportedLocales, type Locale } from "@/lib/i18n/config";
import { createPageMetadata } from "@/lib/seo";
import { BlogPlaceholderView } from "@/components/blog/blog-placeholder-view";

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
    ? "Arsip Blog | Annas Tri Widagdo"
    : "Blog Archive | Annas Tri Widagdo";
  const description = isId
    ? "Blog ini sedang disiapkan. Artikel akan tersedia di sini setelah siap dipublikasikan."
    : "This blog is being prepared. Articles will be available here once they’re ready.";

  return createPageMetadata({
    locale,
    path: "blog",
    title,
    description,
    type: "website",
  });
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <BlogPlaceholderView locale={locale as Locale} isArticle={false} />;
}
