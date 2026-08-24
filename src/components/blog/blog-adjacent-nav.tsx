import Link from "next/link";
import type { BlogArticle } from "@/content/blog";
import type { Locale } from "@/lib/i18n/config";

interface BlogAdjacentNavProps {
  previous: BlogArticle | null;
  next: BlogArticle | null;
  locale: Locale;
}

export function BlogAdjacentNav({
  previous,
  next,
  locale,
}: BlogAdjacentNavProps) {
  const isId = locale === "id";

  return (
    <nav
      className="blog-adjacent-nav"
      aria-label={isId ? "Artikel sebelum dan berikutnya" : "Previous and next articles"}
    >
      <div className="adjacent-nav-item adjacent-nav-prev">
        {previous ? (
          <Link
            href={`/${locale}/blog/${previous.slug}`}
            className="adjacent-nav-link"
          >
            <span className="adjacent-nav-direction">
              ← {isId ? "ARTIKEL SEBELUMNYA" : "PREVIOUS ARTICLE"}
            </span>
            <span className="adjacent-nav-title">{previous.title[locale]}</span>
          </Link>
        ) : (
          <span className="adjacent-nav-disabled">
            {isId ? "Awal indeks" : "Start of index"}
          </span>
        )}
      </div>

      <div className="adjacent-nav-center">
        <Link href={`/${locale}/blog`} className="adjacent-all-link">
          {isId ? "Semua Artikel" : "All Articles"}
        </Link>
      </div>

      <div className="adjacent-nav-item adjacent-nav-next">
        {next ? (
          <Link
            href={`/${locale}/blog/${next.slug}`}
            className="adjacent-nav-link"
          >
            <span className="adjacent-nav-direction">
              {isId ? "ARTIKEL BERIKUTNYA" : "NEXT ARTICLE"} →
            </span>
            <span className="adjacent-nav-title">{next.title[locale]}</span>
          </Link>
        ) : (
          <span className="adjacent-nav-disabled">
            {isId ? "Akhir indeks" : "End of index"}
          </span>
        )}
      </div>
    </nav>
  );
}
