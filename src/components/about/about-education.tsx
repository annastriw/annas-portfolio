import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";
import { educationData } from "@/data/about";

interface AboutEducationProps {
  locale: Locale;
}

export function AboutEducation({ locale }: AboutEducationProps) {
  const isId = locale === "id";

  return (
    <section
      className="about-education-section"
      aria-label="Education & Academic Merit"
    >
      <div className="about-section-header">
        <div className="section-header-meta">
          <span className="section-meta-tag">[01 // ACADEMIC FOUNDATION]</span>
          <span className="section-meta-tag">
            {isId ? "PENDIDIKAN & PRESTASI AKADEMIK" : "EDUCATION & DISTINCTION"}
          </span>
        </div>
        <h2 className="section-title">
          {isId ? "Pendidikan & Rekam Akademik" : "Education & Academic Distinction"}
        </h2>
        <p className="section-subtitle">
          {isId
            ? "Pendidikan formal sarjana teknik komputer dan pencapaian akademik berlandaskan penghargaan resmi institusi."
            : "Formal computer engineering degree education and verified institutional merit distinction."}
        </p>
      </div>

      <div className="education-card-container">
        <article className="education-card">
          <div className="education-card-main">
            <div className="education-badge-row">
              <span className="education-distinction-badge">
                ★ {isId ? "PREDIKAT WISUDAWAN TERBAIK" : "BEST GRADUATE DISTINCTION"}
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
                {isId ? "[SOROTAN AKADEMIK & RISET]" : "[ACADEMIC HIGHLIGHTS & RESEARCH]"}
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

          {/* Certificate Evidence Preview */}
          {educationData.certificateAsset && (
            <div className="education-certificate-col">
              <div className="education-cert-frame">
                <div className="cert-img-wrapper">
                  <Image
                    src={educationData.certificateAsset}
                    alt="Sertifikat Wisudawan Terbaik — Departemen Teknik Komputer Undip"
                    width={600}
                    height={420}
                    className="education-cert-img"
                    loading="lazy"
                  />
                </div>
                <div className="education-cert-caption">
                  <span className="cert-caption-tag">[VERIFIED // MERIT]</span>
                  <span className="cert-caption-title">
                    {isId ? "Penghargaan Wisudawan Terbaik" : "Best Graduate Certificate"}
                  </span>
                </div>
              </div>
            </div>
          )}
        </article>
      </div>
    </section>
  );
}
