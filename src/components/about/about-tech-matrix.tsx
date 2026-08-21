import type { Locale } from "@/lib/i18n/config";
import { technicalTaxonomyData } from "@/data/about";

interface AboutTechMatrixProps {
  locale: Locale;
}

export function AboutTechMatrix({ locale }: AboutTechMatrixProps) {
  const isId = locale === "id";

  return (
    <section
      className="about-tech-section"
      aria-label="Technical Capabilities & Taxonomy"
    >
      <div className="about-section-header">
        <div className="section-header-meta">
          <span className="section-meta-tag">[04 // TECHNICAL CAPABILITIES]</span>
          <span className="section-meta-tag">
            {isId ? "TAKSONOMI KEMAMPUAN TEKNIS" : "STACK DEPTH & TOOLING"}
          </span>
        </div>
        <h2 className="section-title">
          {isId
            ? "Taksonomi Teknologi & Spesialisasi"
            : "Technical Taxonomy & Stack Depth"}
        </h2>
        <p className="section-subtitle">
          {isId
            ? "Pemetaan bahasa pemrograman, kerangka kerja, pustaka kecerdasan buatan, dan alat infrastruktur yang digunakan dalam implementasi produksi dan riset."
            : "Comprehensive taxonomy of programming languages, web frameworks, applied AI tools, and infrastructure technologies utilized across production systems and research."}
        </p>
      </div>

      <div className="tech-matrix-grid">
        {technicalTaxonomyData.map((group, idx) => {
          const groupIndex = String(idx + 1).padStart(2, "0");

          return (
            <article key={idx} className="tech-matrix-card">
              <div className="tech-matrix-header">
                <span className="tech-matrix-index">[{groupIndex}]</span>
                <h3 className="tech-matrix-group-title">
                  {group.category[locale]}
                </h3>
              </div>

              <ul className="tech-matrix-items">
                {group.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="tech-matrix-item">
                    <div className="tech-item-name-row">
                      <span className="tech-item-bullet" aria-hidden="true">
                        ▸
                      </span>
                      <span className="tech-item-name">{item.name}</span>
                    </div>
                    <span className="tech-item-context">{item.context}</span>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}
