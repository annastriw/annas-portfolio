import type { Locale } from "@/lib/i18n/config";

interface BlogHeroProps {
  locale: Locale;
}

export function BlogHero({ locale }: BlogHeroProps) {
  const isId = locale === "id";

  return (
    <header className="blog-hero-header animate-editorial-fade motion-reduce:animate-none">
      <div className="blog-hero-meta">
        <span className="font-semibold text-(--color-accent)">
          {isId ? "[04 // BLOG]" : "[04 // BLOG]"}
        </span>
        <span className="text-(--color-border)" aria-hidden="true">
          /
        </span>
        <span className="uppercase tracking-wider">
          {isId ? "ARSIP EDITORIAL TEKNIS" : "TECHNICAL EDITORIAL ARCHIVE"}
        </span>
        <span className="text-(--color-muted)">
          {isId ? "· 4 ARTIKEL" : "· 4 ARTICLES"}
        </span>
      </div>

      <h1 className="blog-hero-title">
        {isId ? "Catatan Teknis & Rekayasa Sistem" : "Technical Notes & System Engineering"}
      </h1>

      <p className="blog-hero-lead">
        {isId
          ? "Empat catatan teknis ringkas yang membahas arsitektur ERP multi-cabang, penyajian machine learning terpisah, service pencetakan Android native, dan pipeline pengenalan suara otomatis."
          : "Four concise technical essays exploring multi-branch ERP systems, decoupled machine-learning serving, native Android print services, and automated speech-recognition pipelines."}
      </p>
    </header>
  );
}
