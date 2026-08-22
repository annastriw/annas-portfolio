import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, supportedLocales, type Locale } from "@/lib/i18n/config";
import {
  getBlogPostBySlug,
  getBlogSlugs,
  getAdjacentBlogPosts,
} from "@/lib/blog/blog-content";
import { MarkdownRenderer } from "@/components/markdown/markdown-renderer";
import { BlogArticleHeader } from "@/components/blog/blog-article-header";
import { BlogAdjacentNav } from "@/components/blog/blog-adjacent-nav";
import { JsonLd } from "@/components/seo/json-ld";
import { generateBlogPostingJsonLd } from "@/lib/seo/schema-generators";

interface BlogPostPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const params: { locale: Locale; slug: string }[] = [];

  for (const locale of supportedLocales) {
    const slugs = await getBlogSlugs(locale);
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};

  const post = await getBlogPostBySlug(slug, locale);
  if (!post) return {};

  const isId = locale === "id";
  const title = `${post.metadata.title} — Annas Tri Widagdo`;
  const description = post.metadata.description;

  return {
    title,
    description,
    alternates: {
      canonical: `https://annastriwidagdo.me/${locale}/blog/${slug}`,
      languages: {
        en: `https://annastriwidagdo.me/en/blog/${slug}`,
        id: `https://annastriwidagdo.me/id/blog/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `https://annastriwidagdo.me/${locale}/blog/${slug}`,
      siteName: "Annas Tri Widagdo Portfolio",
      locale: isId ? "id_ID" : "en_US",
      type: "article",
      publishedTime: post.metadata.date,
      authors: [post.metadata.author],
      tags: post.metadata.tags,
    },
  };
}

export default async function BlogPostDetailPage({
  params,
}: BlogPostPageProps) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const post = await getBlogPostBySlug(slug, locale);
  if (!post) {
    notFound();
  }

  const { prev, next } = await getAdjacentBlogPosts(slug, locale);
  const isId = locale === "id";

  return (
    <article className="blog-article-page">
      <div className="blog-article-container">
        <JsonLd schema={generateBlogPostingJsonLd(post, locale)} />

        {/* Navigation Breadcrumb Bar */}
        <nav
          className="blog-detail-breadcrumb"
          aria-label={isId ? "Navigasi artikel blog" : "Article breadcrumb navigation"}
        >
          <Link
            href={`/${locale}/blog`}
            className="back-to-blog-link"
          >
            <span aria-hidden="true">←</span>
            <span>{isId ? "Kembali ke Indeks Tulisan" : "Back to Dispatches Index"}</span>
          </Link>
          <span className="breadcrumb-path" aria-hidden="true">
            / {locale.toUpperCase()} / BLOG / {post.slug}
          </span>
        </nav>

        {/* Article Header */}
        <BlogArticleHeader
          metadata={post.metadata}
          locale={locale}
        />

        {/* Article Body Section */}
        <section className="blog-article-content" aria-label="Article Body">
          <div className="blog-prose-wrapper">
            <MarkdownRenderer content={post.content} />
          </div>
        </section>

        {/* Adjacent Exploration Nav */}
        <BlogAdjacentNav
          prev={prev}
          next={next}
          locale={locale}
        />
      </div>
    </article>
  );
}
