import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";

interface ExperienceSectionProps {
  locale: Locale;
}

interface ExperienceItem {
  period: string;
  role: { en: string; id: string };
  organization: { en: string; id: string };
  location: string;
  type: string;
  description: { en: string; id: string };
  highlights: { en: string[]; id: string[] };
  relatedProjectSlug?: string;
}

const experiences: ExperienceItem[] = [
  {
    period: "12/2023 — 02/2024",
    role: {
      en: "Developer IT Intern",
      id: "Developer IT Intern",
    },
    organization: {
      en: "IT Developer Team, Faculty of Engineering, Diponegoro University",
      id: "Tim Developer IT Fakultas Teknik Universitas Diponegoro",
    },
    location: "Semarang, Indonesia",
    type: "INTERNSHIP // ONSITE",
    description: {
      en: "Developed internal enterprise software systems for faculty operations, teacher competency assessments, inventory management, and immersive campus showcases.",
      id: "Mengembangkan sistem perangkat lunak operasional fakultas, ujian kompetensi guru, manajemen inventaris, dan platform visual interaktif kampus.",
    },
    highlights: {
      en: [
        "Built UKG System exam assessment platform using Laravel & MySQL",
        "Developed SIMASTOK SHR Jaya Motor inventory control system",
        "Engineered 360° Panoramic Virtual Tour using Three.js & Panolens.js",
      ],
      id: [
        "Mengembangkan platform ujian UKG System berbasis Laravel & MySQL",
        "Membangun sistem inventaris SIMASTOK SHR Jaya Motor",
        "Merekayasa Panoramic Virtual Tour 360° menggunakan Three.js & Panolens.js",
      ],
    },
    relatedProjectSlug: "intern-ft-undip",
  },
  {
    period: "2022 — PRESENT",
    role: {
      en: "Software & Machine Learning Engineer",
      id: "Software & Machine Learning Engineer",
    },
    organization: {
      en: "Independent Engineering & Client Stakeholder Engagements",
      id: "Pengembangan Mandiri & Kolaborasi Stakeholder",
    },
    location: "Semarang, Indonesia",
    type: "SYSTEMS & APPLIED AI",
    description: {
      en: "Architected fullstack web platforms, machine learning predictive models, and Android utilities for community and healthcare stakeholders.",
      id: "Merancang platform web fullstack, model prediktif machine learning, dan utilitas Android untuk mitra komunitas dan kesehatan.",
    },
    highlights: {
      en: [
        "Dialisis Connect Edu: End-to-end Next.js & Laravel platform for IPDI Jawa Tengah",
        "Heart Attack Risk Prediction: Binary classification prototype & Flask REST inference API",
        "Speech-to-Text System: Audio feature extraction and deep learning transcription prototype",
      ],
      id: [
        "Dialisis Connect Edu: Platform fullstack Next.js & Laravel untuk IPDI Jawa Tengah",
        "Heart Attack Risk Prediction: Purwarupa klasifikasi biner & REST API inferensi Flask",
        "Speech-to-Text System: Ekstraksi fitur audio dan purwarupa transkripsi suara",
      ],
    },
  },
  {
    period: "ACADEMIC DISTINCTION",
    role: {
      en: "Best Graduate (Wisudawan Terbaik)",
      id: "Wisudawan Terbaik",
    },
    organization: {
      en: "Department of Computer Engineering, Diponegoro University",
      id: "Departemen Teknik Komputer, Universitas Diponegoro",
    },
    location: "Semarang, Indonesia",
    type: "ACADEMIC MERIT",
    description: {
      en: "Awarded Best Graduate recognition for academic excellence, software architecture research, and practical engineering contributions during degree completion.",
      id: "Meraih predikat Wisudawan Terbaik atas pencapaian akademik unggul, riset arsitektur perangkat lunak, dan kontribusi rekayasa teknis selama masa studi.",
    },
    highlights: {
      en: [
        "Specialized in Computer Engineering, Software Systems, and Artificial Intelligence",
        "Certified in Cisco CCNA (Enterprise Networking, Switching & Routing) and Huawei HCIA-AI",
      ],
      id: [
        "Peminatan pada Teknik Komputer, Rekayasa Perangkat Lunak, dan Kecerdasan Buatan",
        "Tersertifikasi Cisco CCNA (Enterprise Networking, Switching & Routing) dan Huawei HCIA-AI",
      ],
    },
  },
];

export function ExperienceSection({ locale }: ExperienceSectionProps) {
  const isId = locale === "id";

  return (
    <section className="home-experience-section" aria-label="Professional Experience">
      <div className="home-experience-container">
        {/* Section Header */}
        <div className="home-section-header">
          <div className="section-header-meta">
            <span className="section-meta-tag">[02 // TRACK RECORD]</span>
            <span className="section-meta-tag">
              {isId ? "PENGALAMAN & REKAM JEJAK" : "EXPERIENCE & REPUTATION"}
            </span>
          </div>
          <h2 className="section-title">
            {isId ? "Pengalaman & Riwayat Rekayasa" : "Engineering & Professional Experience"}
          </h2>
          <p className="section-subtitle">
            {isId
              ? "Riwayat keterlibatan dalam rekayasa perangkat lunak, peran magang institusi, dan pencapaian akademik berlandaskan bukti otentik."
              : "Documented history in software engineering, institutional developer internship, and verified academic distinction grounded in authentic evidence."}
          </p>
        </div>

        {/* Timeline List */}
        <div className="experience-timeline">
          {experiences.map((exp, idx) => {
            const indexFormatted = String(idx + 1).padStart(2, "0");

            return (
              <article key={exp.period} className="timeline-item">
                <div className="timeline-meta-col">
                  <span className="timeline-index">[{indexFormatted}]</span>
                  <span className="timeline-period">{exp.period}</span>
                  <span className="timeline-type">{exp.type}</span>
                </div>

                <div className="timeline-content-col">
                  <div className="timeline-header">
                    <h3 className="timeline-role">{exp.role[locale]}</h3>
                    <p className="timeline-org">{exp.organization[locale]}</p>
                    <span className="timeline-loc">{exp.location}</span>
                  </div>

                  <p className="timeline-desc">{exp.description[locale]}</p>

                  <ul className="timeline-highlights">
                    {exp.highlights[locale].map((h, i) => (
                      <li key={i} className="timeline-highlight-item">
                        <span className="highlight-bullet" aria-hidden="true">
                          ▸
                        </span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {exp.relatedProjectSlug && (
                    <div className="timeline-action">
                      <Link
                        href={`/${locale}/projects/${exp.relatedProjectSlug}`}
                        className="timeline-case-link"
                      >
                        <span>
                          {isId
                            ? "Lihat Studi Kasus Magang Undip"
                            : "Read Undip Internship Case Study"}
                        </span>
                        <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
