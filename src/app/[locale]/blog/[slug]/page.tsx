import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogAdjacentNav } from "@/components/blog/blog-adjacent-nav";
import { BlogArticleBody } from "@/components/blog/blog-article-body";
import { BlogArticleHeader } from "@/components/blog/blog-article-header";
import { JsonLd } from "@/components/seo/json-ld";
import {
  blogArticles,
  getAdjacentBlogArticles,
  getBlogArticle,
} from "@/content/blog";
import { getProjectCaseStudy } from "@/content/projects/project-case-studies";
import { isLocale, supportedLocales, type Locale } from "@/lib/i18n/config";
import { generateBlogPostingJsonLd } from "@/lib/seo/schema-generators";

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
  const title = `${article.title[locale]} - Annas Tri Widagdo`;
  const description = article.abstract[locale];

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
      authors: ["Annas Tri Widagdo"],
      tags: article.tags,
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

  const article = getBlogArticle(slug);
  if (!article) {
    notFound();
  }

  const { previous, next } = getAdjacentBlogArticles(slug);
  const isId = locale === "id";

  return (
    <article className="blog-article-page">
      <div className="blog-article-container">
        <JsonLd schema={generateBlogPostingJsonLd(article, locale)} />

        <nav
          className="blog-detail-breadcrumb"
          aria-label={isId ? "Navigasi artikel" : "Article navigation"}
        >
          <Link href={`/${locale}/blog`} className="back-to-blog-link">
            <span aria-hidden="true">←</span>
            <span>{isId ? "Kembali ke indeks" : "Back to index"}</span>
          </Link>
          <span className="breadcrumb-path" aria-hidden="true">
            BLOG / {article.index}
          </span>
        </nav>

        <BlogArticleHeader article={article} locale={locale} />

        <section
          className="blog-article-content"
          aria-label={isId ? "Isi artikel" : "Article body"}
        >
          <BlogArticleBody article={article} locale={locale} />
        </section>

        <aside className="blog-source-records" aria-labelledby="blog-source-heading">
          <h2 id="blog-source-heading">
            {isId ? "Pengalaman proyek terkait" : "Related project experience"}
          </h2>
          <div>
            {article.sourceProjectSlugs.map((projectSlug) => {
              const project = getProjectCaseStudy(projectSlug);
              if (!project) return null;

              return (
                <Link
                  href={`/${locale}/projects/${project.slug}`}
                  key={project.slug}
                >
                  <span>{project.title[locale]}</span>
                  <span aria-hidden="true">↗</span>
                </Link>
              );
            })}
          </div>
        </aside>

        <BlogAdjacentNav
          previous={previous}
          next={next}
          locale={locale as Locale}
        />
      </div>
    </article>
  );
}
