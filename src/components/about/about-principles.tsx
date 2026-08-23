import type { Locale } from "@/lib/i18n/config";
import { engineeringPrinciples } from "@/content/about/about-data";

interface AboutPrinciplesProps {
  locale: Locale;
}

export function AboutPrinciples({ locale }: AboutPrinciplesProps) {
  const isId = locale === "id";

  return (
    <section
      className="about-principles-section"
      aria-label="Core Engineering Principles"
    >
      <div className="about-section-header">
        <div className="section-header-meta">
          <span className="section-meta-tag">[03 // OPERATING MANIFESTO]</span>
          <span className="section-meta-tag">
            {isId ? "PRINSIP REKAYASA & FILOSOFI" : "ENGINEERING PRINCIPLES"}
          </span>
        </div>
        <h2 className="section-title">
          {isId
            ? "Prinsip Rekayasa & Filosofi Kerja"
            : "Core Engineering Principles"}
        </h2>
        <p className="section-subtitle">
          {isId
            ? "Standar teknis dan pedoman arsitektur yang mendasari setiap keputusan rekayasa, pemilihan dependensi, dan implementasi sistem."
            : "Technical standards and architectural tenets guiding every engineering decision, dependency choice, and system implementation."}
        </p>
      </div>

      <div className="principles-grid">
        {engineeringPrinciples.map((principle) => (
          <article key={principle.index} className="principle-card">
            <div className="principle-card-header">
              <span className="principle-index">[{principle.index}]</span>
              <span className="principle-code">{principle.code}</span>
            </div>

            <h3 className="principle-title">{principle.title[locale]}</h3>

            <p className="principle-desc">{principle.description[locale]}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
