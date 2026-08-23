import type { Locale } from "@/lib/i18n/config";
import { educationData } from "@/content/about/about-data";

interface AboutEducationProps {
  locale: Locale;
}

export function AboutEducation({ locale }: AboutEducationProps) {
  const isId = locale === "id";

  return (
    <section
      className="about-education-section"
      aria-label="Education & Academic Foundation"
    >
      <div className="about-section-header">
        <div className="section-header-meta">
          <span className="section-meta-tag">[01 // ACADEMIC FOUNDATION]</span>
          <span className="section-meta-tag">
            {isId ? "PENDIDIKAN & LATAR BELAKANG" : "EDUCATION & FOUNDATION"}
          </span>
        </div>
        <h2 className="section-title">
          {isId ? "Pendidikan & Rekam Akademik" : "Education & Academic Foundation"}
        </h2>
        <p className="section-subtitle">
          {isId
            ? "Latar belakang pendidikan formal sarjana teknik komputer dengan peminatan rekayasa perangkat lunak, sistem terdistribusi, dan kecerdasan buatan terapan."
            : "Formal computer engineering degree education specializing in software systems engineering, distributed architectures, and applied machine learning."}
        </p>
      </div>

      <div className="education-card-container">
        <article className="education-card">
          <div className="education-card-main w-full">
            <div className="education-badge-row">
              <span className="education-distinction-badge">
                {isId ? "SARJANA TEKNIK (S.T.)" : "BACHELOR OF ENGINEERING"}
              </span>
              <span className="education-period-tag">{educationData.period}</span>
            </div>

            <h3 className="education-degree-title">
              {educationData.degree[locale]} — {educationData.fieldOfStudy[locale]}
            </h3>

            <p className="education-institution-name">
              {educationData.institution[locale]}
            </p>

            <div className="education-location-meta">
              <span className="loc-icon" aria-hidden="true">📍</span>
              <span>{educationData.location}</span>
            </div>

            <div className="education-divider" />

            <div className="education-highlights-wrapper">
              <h4 className="highlights-heading">
                {isId ? "[FOKUS STUDI & RISET REKAYASA]" : "[ENGINEERING SPECIALIZATION & RESEARCH]"}
              </h4>
              <ul className="education-highlights-list">
                {educationData.highlights[locale].map((highlight, idx) => (
                  <li key={idx} className="education-highlight-item">
                    <span className="highlight-marker" aria-hidden="true">▸</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
