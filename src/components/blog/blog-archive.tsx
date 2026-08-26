import Link from "next/link";
import {
  calculateArticleReadingTime,
  type BlogArticle,
} from "@/content/blog";
import type { Locale } from "@/lib/i18n/config";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

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
      <div className="blog-archive-heading-row animate-editorial-fade motion-reduce:animate-none">
        <h2 id="blog-archive-heading">
          {isId ? "Indeks Artikel Terpilih" : "Curated Article Index"}
        </h2>
        <p>
          {isId
            ? "Ditulis dari catatan proyek dan implementasi sistem yang terdokumentasi."
            : "Written directly from verified project records and system implementations."}
        </p>
      </div>

      <ol className="blog-archive-list">
        {articles.map((article, index) => (
          <li key={article.slug}>
            <ScrollReveal delayMs={index * 60}>
              <article className="blog-archive-row">
                <Link
                  href={`/${locale}/blog/${article.slug}`}
                  className="blog-archive-link group"
                  aria-label={`${isId ? "Baca artikel" : "Read article"}: ${article.title[locale]}`}
                >
                  <span className="blog-archive-index" aria-hidden="true">
                    {article.index}
                  </span>

                  <span className="blog-archive-main">
                    <span className="blog-archive-category">
                      {article.category[locale]}
                    </span>
                    <span className="blog-archive-title group-hover:text-(--color-accent) transition-colors duration-200">
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
                      <span className="blog-archive-period">{article.projectPeriod[locale]}</span>
                    )}
                    <span className="blog-archive-readtime">{calculateArticleReadingTime(article, locale)}</span>
                    <span className="blog-archive-open" aria-hidden="true">
                      {isId ? "Baca Catatan" : "Read Essay"} <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                    </span>
                  </span>
                </Link>
              </article>
            </ScrollReveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
