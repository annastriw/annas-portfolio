import Link from "next/link";
import type { BlogMetadata } from "@/lib/blog/blog-types";
import type { Locale } from "@/lib/i18n/config";

interface BlogAdjacentNavProps {
  prev: BlogMetadata | null;
  next: BlogMetadata | null;
  locale: Locale;
}

export function BlogAdjacentNav({ prev, next, locale }: BlogAdjacentNavProps) {
  const isId = locale === "id";

  return (
    <nav
      className="blog-adjacent-nav"
      aria-label={isId ? "Tulisan sebelumnya dan selanjutnya" : "Previous and next dispatches"}
    >
      {/* Newer / Previous Post */}
      <div className="adjacent-nav-item adjacent-nav-prev">
        {prev ? (
          <Link
            href={`/${locale}/blog/${prev.slug}`}
            className="adjacent-nav-link"
          >
            <span className="adjacent-nav-direction">
              ← {isId ? "TULISAN LEBIH BARU" : "NEWER DISPATCH"}
            </span>
            <span className="adjacent-nav-title">{prev.title}</span>
          </Link>
        ) : (
          <span className="adjacent-nav-disabled">
            {isId ? "Tulisan Terbaru" : "Latest Dispatch"}
          </span>
        )}
      </div>

      {/* Center Link to All Posts */}
      <div className="adjacent-nav-center">
        <Link
          href={`/${locale}/blog`}
          className="adjacent-all-link"
        >
          {isId ? "Lihat Semua Tulisan" : "View All Dispatches"}
        </Link>
      </div>

      {/* Older / Next Post */}
      <div className="adjacent-nav-item adjacent-nav-next">
        {next ? (
          <Link
            href={`/${locale}/blog/${next.slug}`}
            className="adjacent-nav-link"
          >
            <span className="adjacent-nav-direction">
              {isId ? "TULISAN SEBELUMNYA" : "OLDER DISPATCH"} →
            </span>
            <span className="adjacent-nav-title">{next.title}</span>
          </Link>
        ) : (
          <span className="adjacent-nav-disabled">
            {isId ? "Akhir Arsip Tulisan" : "End of Archive"}
          </span>
        )}
      </div>
    </nav>
  );
}
