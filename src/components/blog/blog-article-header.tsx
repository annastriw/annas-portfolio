import type { BlogMetadata } from "@/lib/blog/blog-types";
import type { Locale } from "@/lib/i18n/config";

interface BlogArticleHeaderProps {
  metadata: BlogMetadata;
  locale: Locale;
}

export function BlogArticleHeader({ metadata, locale }: BlogArticleHeaderProps) {
  const isId = locale === "id";

  return (
    <header className="blog-article-header">
      {/* Top Metadata Rail */}
      <div className="blog-article-meta-tags">
        <span className="blog-article-meta-pill blog-article-category">
          [{metadata.category.toUpperCase()}]
        </span>
        <span className="blog-article-meta-pill blog-article-reading-time">
          {metadata.readingTime.toUpperCase()}
        </span>
      </div>

      {/* Main Title & Excerpt */}
      <h1 className="blog-article-title">{metadata.title}</h1>
      <p className="blog-article-lead">{metadata.description}</p>

      {/* Author & Timestamp Bar */}
      <div className="blog-article-byline-bar">
        <div className="byline-author-info">
          <span className="byline-author-label">
            {isId ? "PENULIS" : "AUTHOR"}:
          </span>
          <span className="byline-author-name">{metadata.author}</span>
          <span className="byline-divider" aria-hidden="true">
            /
          </span>
          <time dateTime={metadata.date} className="byline-date">
            {metadata.formattedDate}
          </time>
        </div>

        {/* Tags List */}
        {metadata.tags.length > 0 && (
          <div className="byline-tags" aria-label="Article tags">
            {metadata.tags.map((tag) => (
              <span key={tag} className="byline-tag-item">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
