import type { Locale } from "@/lib/i18n/config";

interface BlogHeroProps {
  locale: Locale;
}

export function BlogHero({ locale }: BlogHeroProps) {
  const isId = locale === "id";

  return (
    <header className="blog-hero-header">
      <div className="blog-hero-meta">
        <span>{isId ? "ARSIP EDITORIAL" : "EDITORIAL ARCHIVE"}</span>
        <span>{isId ? "4 ARTIKEL" : "4 ARTICLES"}</span>
      </div>

      <h1 className="blog-hero-title">
        {isId ? "Catatan teknis dari pekerjaan nyata" : "Technical notes from real work"}
      </h1>

      <p className="blog-hero-lead">
        {isId
          ? "Empat artikel ringkas tentang ERP multi-cabang, integrasi machine learning, printing Android, dan pipeline speech-to-text."
          : "Four concise articles on multi-branch ERP, machine-learning integration, Android printing, and a speech-to-text pipeline."}
      </p>
    </header>
  );
}
