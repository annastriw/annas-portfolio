import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, supportedLocales, type Locale } from "@/lib/i18n/config";
import {
  blogPostsData,
  getBlogPostDataBySlug,
  getAdjacentBlogPostsData,
} from "@/content/blog/blog-data";
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

export function generateStaticParams() {
  const params: { locale: Locale; slug: string }[] = [];

  for (const locale of supportedLocales) {
    for (const post of blogPostsData) {
      params.push({ locale, slug: post.slug });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};

  const post = getBlogPostDataBySlug(slug);
  if (!post) return {};

  const isId = locale === "id";
  const title = `${post.title[locale]} - Annas Tri Widagdo`;
  const description = post.description[locale];

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
      publishedTime: post.date,
      authors: ["Annas Tri Widagdo"],
      tags: post.tags,
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

  const post = getBlogPostDataBySlug(slug);
  if (!post) {
    notFound();
  }

  const { prev, next } = getAdjacentBlogPostsData(slug);
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
          post={post}
          locale={locale}
        />

        {/* Structured Article Body */}
        <section className="blog-article-content" aria-label="Article Body">
          <div className="blog-prose-wrapper editorial-prose">
            {post.sections.map((section, idx) => (
              <div key={idx} className="blog-section-block mb-10">
                <h2 className="text-xl font-mono font-semibold tracking-tight text-(--color-text-primary) mb-4 mt-8 pb-2 border-b border-(--color-border)">
                  {section.heading[locale]}
                </h2>

                {section.paragraphs && (
                  <div className="space-y-4 mb-4">
                    {section.paragraphs[locale].map((p, pIdx) => (
                      <p key={pIdx} className="text-(--color-text-secondary) leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                )}

                {section.list && (
                  <div className="my-4 pl-2">
                    {section.list.ordered ? (
                      <ol className="list-decimal list-inside space-y-2 text-(--color-text-secondary)">
                        {section.list.items[locale].map((item, lIdx) => (
                          <li key={lIdx} className="leading-relaxed">
                            {item}
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <ul className="list-disc list-inside space-y-2 text-(--color-text-secondary)">
                        {section.list.items[locale].map((item, lIdx) => (
                          <li key={lIdx} className="leading-relaxed">
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                {section.codeBlock && (
                  <div className="code-block-container my-6 rounded-none border border-(--color-border) bg-(--color-surface-subtle) overflow-hidden">
                    {section.codeBlock.caption && (
                      <div className="code-block-header px-4 py-2 bg-(--color-surface) border-b border-(--color-border) font-mono text-xs text-(--color-text-muted) flex justify-between items-center">
                        <span>{section.codeBlock.caption}</span>
                        <span className="uppercase">{section.codeBlock.language}</span>
                      </div>
                    )}
                    <pre className="p-4 overflow-x-auto font-mono text-xs text-(--color-text-primary) leading-relaxed">
                      <code>{section.codeBlock.code}</code>
                    </pre>
                  </div>
                )}
              </div>
            ))}
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
