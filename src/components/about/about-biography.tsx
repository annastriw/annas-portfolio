import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";

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
                src="/assets/me/pas-foto.webp"
                alt="Annas Tri Widagdo — Software Engineer & AI Practitioner"
                width={400}
                height={500}
                priority
                sizes="(max-width: 768px) 100vw, 400px"
                className="about-portrait-img"
              />
            </div>
            <figcaption className="about-portrait-caption">
              <span>ANNAS TRI WIDAGDO, S.T.</span>
              <span className="portrait-tag">SEMARANG, ID</span>
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
                    ? "Software Engineer & Praktisi AI"
                    : "Software Engineer & AI Practitioner"}
                </dd>
              </div>
              <div className="spec-box-item">
                <dt className="spec-box-term">{isId ? "Pendidikan" : "Education"}</dt>
                <dd className="spec-box-desc">
                  Teknik Komputer, Universitas Diponegoro
                </dd>
              </div>
              <div className="spec-box-item">
                <dt className="spec-box-term">{isId ? "Predikat" : "Distinction"}</dt>
                <dd className="spec-box-desc spec-highlight">
                  {isId ? "Wisudawan Terbaik" : "Best Graduate (Wisudawan Terbaik)"}
                </dd>
              </div>
              <div className="spec-box-item">
                <dt className="spec-box-term">{isId ? "Lokasi" : "Location"}</dt>
                <dd className="spec-box-desc">Semarang, Jawa Tengah, Indonesia</dd>
              </div>
              <div className="spec-box-item">
                <dt className="spec-box-term">{isId ? "Zona Waktu" : "Timezone"}</dt>
                <dd className="spec-box-desc">WIB / UTC+7</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Right Column: Narrative Copy */}
        <div className="about-bio-content-col">
          <div className="about-bio-narrative">
            <h2 className="bio-subheading">
              {isId
                ? "Menjembatani Arsitektur Rekayasa Perangkat Lunak dengan Sistem Cerdas"
                : "Bridging Software Architecture with Applied Intelligent Systems"}
            </h2>

            <p className="bio-lead-text">
              {isId ? (
                <>
                  Saya adalah seorang <strong>Software Engineer & Praktisi AI</strong> lulusan <strong>Teknik Komputer Universitas Diponegoro</strong> dengan predikat <strong>Wisudawan Terbaik</strong>. Fokus saya terletak pada perancangan sistem web performan tinggi, arsitektur backend tangguh, dan integrasi model kecerdasan buatan terapan ke dalam produk digital yang bermanfaat nyata.
                </>
              ) : (
                <>
                  I am a <strong>Software Engineer & AI Practitioner</strong> and a <strong>Computer Engineering graduate from Diponegoro University</strong>, awarded the <strong>Best Graduate (Wisudawan Terbaik)</strong> distinction. My core focus centers on engineering high-performance web systems, resilient backend architectures, and deploying applied machine learning models into reliable, user-facing digital products.
                </>
              )}
            </p>

            <div className="bio-paragraph-group">
              <p>
                {isId ? (
                  <>
                    Perjalanan rekayasa saya berakar dari pemahaman mendalam tentang fondasi sistem komputasi—dari protokol jaringan CCNA, pemodelan basis data relasional Oracle, hingga arsitektur server web modern. Selama masa studi dan pengalaman industri, saya terbiasa menangani siklus hidup pengembangan perangkat lunak secara menyeluruh: mulai dari analisis kebutuhan, perancangan pengalaman pengguna (UI/UX di Figma), penulisan kode berorientasi tipe yang ketat, hingga konfigurasi deployment.
                  </>
                ) : (
                  <>
                    My engineering foundation is built on deep computing fundamentals—ranging from Cisco CCNA networking protocols and Oracle relational database modeling to modern web system architectures. Throughout my academic tenure and practical engagements, I have managed end-to-end software development lifecycles: from requirement decomposition and UI/UX prototyping to strict type-safe implementation and production deployment.
                  </>
                )}
              </p>

              <p>
                {isId ? (
                  <>
                    Dalam ranah praktis, saya telah merancang dan mengimplementasikan berbagai sistem nyata untuk organisasi dan mitra stakeholder. Beberapa di antaranya meliputi platform manajemen edukasi medis dialisis (<strong>Dialisis Connect Edu</strong> untuk IPDI Jawa Tengah), sistem evaluasi kompetensi guru (<strong>UKG System</strong>), purwarupa inferensi risiko serangan jantung (<strong>Machine Learning Risk Prediction</strong>), dan sistem dokumentasi serta operasional internal di lingkungan Fakultas Teknik Undip.
                  </>
                ) : (
                  <>
                    In production and applied research, I have engineered diverse systems for real-world stakeholders. Key work includes specialized healthcare education platforms (<strong>Dialisis Connect Edu</strong> for IPDI Central Java), teacher competency assessment engines (<strong>UKG System</strong>), predictive clinical risk inference prototypes (<strong>Machine Learning Heart Attack Risk Prediction</strong>), and internal faculty operations systems at Diponegoro University.
                  </>
                )}
              </p>

              <p>
                {isId ? (
                  <>
                    Saya meyakini bahwa kualitas perangkat lunak tidak diukur dari kerumitan yang dibuat-buat atau visual dekoratif yang berlebihan, melainkan dari <em>kebenaran logika, kemudahan pemeliharaan, kepatuhan aksesibilitas (WCAG AA), dan kecepatan eksekusi</em> yang konsisten.
                  </>
                ) : (
                  <>
                    I believe that software excellence is never measured by arbitrary complexity or superficial visual trends, but by <em>logical correctness, maintainability, strict accessibility (WCAG AA), and deterministic execution performance</em>.
                  </>
                )}
              </p>
            </div>

            <div className="about-bio-cta-row">
              <Link
                href={`/${locale}/projects`}
                className="about-bio-cta-primary"
              >
                <span>{isId ? "Jelajahi Arsip Proyek" : "Explore Projects Archive"}</span>
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
