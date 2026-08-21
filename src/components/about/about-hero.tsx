import type { Locale } from "@/lib/i18n/config";

interface AboutHeroProps {
  locale: Locale;
}

export function AboutHero({ locale }: AboutHeroProps) {
  const isId = locale === "id";

  return (
    <header className="about-hero-header">
      <div className="about-hero-meta">
        <span className="about-meta-tag">[ARCHIVE // 02]</span>
        <span className="about-meta-tag">
          {isId ? "TENTANG & PROFIL REKAYASA" : "ABOUT & ENGINEERING PROFILE"}
        </span>
      </div>

      <h1 className="about-hero-title">
        {isId ? "Tentang & Profil Rekayasa" : "About & Engineering Profile"}
      </h1>

      <p className="about-hero-lead">
        {isId
          ? "Rekayasa perangkat lunak, sistem cerdas, dan arsitektur web yang dibangun di atas prinsip presisi teknik, verifikasi statis, dan bukti implementasi nyata."
          : "Software engineering, intelligent systems, and web architectures grounded in technical precision, static verification, and verified real-world implementations."}
      </p>
    </header>
  );
}
