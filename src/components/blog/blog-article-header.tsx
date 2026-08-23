import type { BlogPostItem } from "@/content/blog/blog-types";
import type { Locale } from "@/lib/i18n/config";

interface BlogArticleHeaderProps {
  post: BlogPostItem;
  locale: Locale;
}

export function BlogArticleHeader({ post, locale }: BlogArticleHeaderProps) {
  const isId = locale === "id";

  return (
    <header className="blog-article-header">
      {/* Top Metadata Rail */}
      <div className="blog-article-meta-tags">
        <span className="blog-article-meta-pill blog-article-category">
          [{post.category[locale].toUpperCase()}]
        </span>
        <span className="blog-article-meta-pill blog-article-reading-time">
          {post.readingTime[locale].toUpperCase()}
        </span>
      </div>

      {/* Main Title & Excerpt */}
      <h1 className="blog-article-title">{post.title[locale]}</h1>
      <p className="blog-article-lead">{post.description[locale]}</p>

      {/* Author & Timestamp Bar */}
      <div className="blog-article-byline-bar">
        <div className="byline-author-info">
          <span className="byline-author-label">
            {isId ? "PENULIS" : "AUTHOR"}:
          </span>
          <span className="byline-author-name">Annas Tri Widagdo</span>
          <span className="byline-divider" aria-hidden="true">
            /
          </span>
          <time dateTime={post.date} className="byline-date">
            {post.date}
          </time>
        </div>

        {/* Tags List */}
        {post.tags.length > 0 && (
          <div className="byline-tags" aria-label="Article tags">
            {post.tags.map((tag) => (
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
