import Link from "next/link";
import {
  calculateArticleReadingTime,
  type BlogArticle,
} from "@/content/blog";
import type { Locale } from "@/lib/i18n/config";

interface BlogArchiveProps {
  articles: readonly BlogArticle[];
  locale: Locale;
}

export function BlogArchive({ articles, locale }: BlogArchiveProps) {
  const isId = locale === "id";

  return (
    <section
      className="blog-archive"
      aria-labelledby="blog-archive-heading"
    >
      <div className="blog-archive-heading-row">
        <h2 id="blog-archive-heading">
          {isId ? "Indeks artikel" : "Article index"}
        </h2>
        <p>
          {isId
            ? "Ditulis dari catatan proyek yang terdokumentasi."
            : "Written from documented project records."}
        </p>
      </div>

      <ol className="blog-archive-list">
        {articles.map((article) => (
          <li key={article.slug}>
            <article className="blog-archive-row">
              <Link
                href={`/${locale}/blog/${article.slug}`}
                className="blog-archive-link"
                aria-label={`${isId ? "Baca artikel" : "Read article"}: ${article.title[locale]}`}
              >
                <span className="blog-archive-index" aria-hidden="true">
                  {article.index}
                </span>

                <span className="blog-archive-main">
                  <span className="blog-archive-category">
                    {article.category[locale]}
                  </span>
                  <span className="blog-archive-title">
                    {article.title[locale]}
                  </span>
                  <span className="blog-archive-abstract">
                    {article.abstract[locale]}
                  </span>
                  <span className="blog-archive-tags">
                    {article.tags.map((tag) => (
                      <span key={tag}>#{tag}</span>
                    ))}
                  </span>
                </span>

                <span className="blog-archive-meta">
                  {article.projectPeriod && (
                    <span>{article.projectPeriod[locale]}</span>
                  )}
                  <span>{calculateArticleReadingTime(article, locale)}</span>
                  <span className="blog-archive-open" aria-hidden="true">
                    {isId ? "Baca" : "Read"} <span>→</span>
                  </span>
                </span>
              </Link>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
