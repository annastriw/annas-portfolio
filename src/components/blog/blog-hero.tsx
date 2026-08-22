import type { Locale } from "@/lib/i18n/config";

interface BlogHeroProps {
  locale: Locale;
}

export function BlogHero({ locale }: BlogHeroProps) {
  const isId = locale === "id";

  return (
    <header className="blog-hero-header">
      <div className="blog-hero-meta">
        <span className="blog-meta-tag">[ARCHIVE // 03]</span>
        <span className="blog-meta-tag">
          {isId ? "TULISAN & CATATAN TEKNIS" : "DISPATCHES & TECHNICAL ESSAYS"}
        </span>
      </div>

      <h1 className="blog-hero-title">
        {isId ? "Catatan Rekayasa & Tulisan Teknis" : "Dispatches & Technical Notes"}
      </h1>

      <p className="blog-hero-lead">
        {isId
          ? "Esai, catatan teknis, dan bedah arsitektur seputar rekayasa perangkat lunak, sistem cerdas, dan desain web deterministik berbasis pengalaman nyata."
          : "Essays, technical notes, and architecture post-mortems on software engineering, intelligent systems, and deterministic web design grounded in real experience."}
      </p>
    </header>
  );
}
