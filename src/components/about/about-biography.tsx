import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { biographyData } from "@/content/about/about-data";

interface AboutBiographyProps {
  locale: Locale;
}

export function AboutBiography({ locale }: AboutBiographyProps) {
  const isId = locale === "id";

  return (
    <section className="about-bio-section" aria-label="Biographical Profile">
      <div className="about-bio-grid">
        {/* Left Column: Portrait & Quick Metadata Rail */}
        <div className="about-bio-media-col">
          <figure className="about-portrait-figure">
            <div className="about-portrait-frame">
              <Image
                src="/assets/profile/pas-foto.webp"
                alt="Annas Tri Widagdo — Software Engineer, Full-Stack Developer & Machine Learning Engineer"
                width={400}
                height={500}
                priority
                sizes="(max-width: 768px) 100vw, 400px"
                className="about-portrait-img object-cover w-full h-full"
              />
            </div>
            <figcaption className="about-portrait-caption">
              <span>ANNAS TRI WIDAGDO, S.T.</span>
              <span className="portrait-tag">KLATEN, ID</span>
            </figcaption>
          </figure>

          <div className="about-bio-spec-box">
            <div className="spec-box-header">
              <span className="spec-box-title">[PROFILE // DATA]</span>
            </div>
            <dl className="spec-box-list">
              <div className="spec-box-item">
                <dt className="spec-box-term">{isId ? "Peran" : "Role"}</dt>
                <dd className="spec-box-desc">
                  {isId
                    ? "Software Engineer · Full-Stack & ML"
                    : "Software Engineer · Full-Stack & ML"}
                </dd>
              </div>
              <div className="spec-box-item">
                <dt className="spec-box-term">{isId ? "Pendidikan" : "Education"}</dt>
                <dd className="spec-box-desc">
                  {biographyData.specifications.degrees}
                </dd>
              </div>
              <div className="spec-box-item">
                <dt className="spec-box-term">{isId ? "Institusi" : "Institution"}</dt>
                <dd className="spec-box-desc">
                  {biographyData.specifications.almaMater}
                </dd>
              </div>
              <div className="spec-box-item">
                <dt className="spec-box-term">{isId ? "Lokasi" : "Location"}</dt>
                <dd className="spec-box-desc">{biographyData.specifications.location}</dd>
              </div>
              <div className="spec-box-item">
                <dt className="spec-box-term">{isId ? "Zona Waktu" : "Timezone"}</dt>
                <dd className="spec-box-desc">{biographyData.specifications.timezone}</dd>
              </div>
              <div className="spec-box-item">
                <dt className="spec-box-term">{isId ? "Status" : "Status"}</dt>
                <dd className="spec-box-desc font-mono text-(--color-accent)">
                  {biographyData.specifications.status}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Right Column: Narrative Copy */}
        <div className="about-bio-content-col">
          <div className="about-bio-narrative">
            <h2 className="bio-subheading">
              {biographyData.headline[locale]}
            </h2>

            <div className="bio-paragraph-group">
              {biographyData.paragraphs[locale].map((p, idx) => (
                <p key={idx} className={idx === 0 ? "bio-lead-text" : undefined}>
                  {p}
                </p>
              ))}
            </div>

            <div className="about-bio-cta-row">
              <Link
                href={`/${locale}/projects`}
                className="about-bio-cta-primary"
              >
                <span>{isId ? "Jelajahi Arsip Proyek (10)" : "Explore Projects Archive (10)"}</span>
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href={`/${locale}#contact`}
                className="about-bio-cta-secondary"
              >
                <span>{isId ? "Hubungi Saya" : "Initiate Contact"}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
