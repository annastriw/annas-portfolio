import Link from "next/link";
import type { BlogPostItem } from "@/content/blog/blog-types";
import type { Locale } from "@/lib/i18n/config";

interface BlogCardProps {
  post: BlogPostItem;
  locale: Locale;
  index: number;
}

export function BlogCard({ post, locale, index }: BlogCardProps) {
  const indexFormatted = String(index + 1).padStart(2, "0");
  const href = `/${locale}/blog/${post.slug}`;

  return (
    <article className="blog-card group">
      <Link
        href={href}
        className="blog-card-link"
        aria-label={`Read article: ${post.title[locale]}`}
      >
        {/* Header Rail: Index, Category, Reading Time */}
        <div className="blog-card-header">
          <div className="blog-card-header-left">
            <span className="blog-card-index" aria-hidden="true">
              [{indexFormatted}]
            </span>
            <span className="blog-card-category">
              {post.category[locale].toUpperCase()}
            </span>
          </div>
          <div className="blog-card-header-right">
            <time dateTime={post.date} className="blog-card-date">
              {post.date}
            </time>
            <span className="blog-card-divider" aria-hidden="true">
              •
            </span>
            <span className="blog-card-reading-time">{post.readingTime[locale]}</span>
          </div>
        </div>

        {/* Title & Arrow */}
        <div className="blog-card-body">
          <h2 className="blog-card-title">
            <span>{post.title[locale]}</span>
            <span className="blog-card-arrow" aria-hidden="true">
              →
            </span>
          </h2>
          <p className="blog-card-description">{post.description[locale]}</p>
        </div>

        {/* Tags Rail */}
        {post.tags.length > 0 && (
          <div className="blog-card-tags" aria-label="Article tags">
            {post.tags.map((tag) => (
              <span key={tag} className="blog-card-tag">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </Link>
    </article>
  );
}
