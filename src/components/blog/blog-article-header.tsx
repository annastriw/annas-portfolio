import {
  calculateArticleReadingTime,
  type BlogArticle,
} from "@/content/blog";
import type { Locale } from "@/lib/i18n/config";

interface BlogArticleHeaderProps {
  article: BlogArticle;
  locale: Locale;
}

export function BlogArticleHeader({ article, locale }: BlogArticleHeaderProps) {
  const isId = locale === "id";

  return (
    <header className="blog-article-header">
      <div className="blog-article-meta">
        <span>{article.category[locale]}</span>
        <span>{calculateArticleReadingTime(article, locale)}</span>
        {article.projectPeriod && <span>{article.projectPeriod[locale]}</span>}
      </div>

      <h1 className="blog-article-title">{article.title[locale]}</h1>
      <p className="blog-article-lead">{article.abstract[locale]}</p>

      <div className="blog-article-byline-bar">
        <div className="blog-article-author">
          <span>{isId ? "Ditulis oleh" : "Written by"}</span>
          <strong>Annas Tri Widagdo</strong>
        </div>

        <ul
          className="blog-article-tags"
          aria-label={isId ? "Tag artikel" : "Article tags"}
        >
          {article.tags.map((tag) => (
            <li key={tag}>#{tag}</li>
          ))}
        </ul>
      </div>
    </header>
  );
}
