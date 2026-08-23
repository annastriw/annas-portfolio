import type { Locale } from "@/lib/i18n/config";

export interface ExperienceRecord {
  id: string;
  role: Record<Locale, string>;
  organization: Record<Locale, string>;
  location: string;
  period: string;
  type: string;
  description: Record<Locale, string>;
  highlights: Record<Locale, string[]>;
  technologies: string[];
}

export const professionalExperiences: ExperienceRecord[] = [
  {
    id: "intern-ft-undip",
    role: {
      en: "Developer IT Intern",
      id: "Developer IT Intern",
    },
    organization: {
      en: "Faculty of Engineering, Diponegoro University",
      id: "Fakultas Teknik, Universitas Diponegoro",
    },
    location: "Semarang, Indonesia",
    period: "Jan 2024 — Feb 2024",
    type: "Institutional Internship",
    description: {
      en: "Engineered web interfaces and interactive software modules for Faculty of Engineering digital systems, working closely with academic stakeholders.",
      id: "Mengembangkan antarmuka web dan modul perangkat lunak interaktif untuk sistem digital Fakultas Teknik, berkolaborasi langsung dengan pemangku kepentingan akademik.",
    },
    highlights: {
      en: [
        "Designed and prototyped responsive user interface layouts in Figma for faculty administrative workflows.",
        "Built interactive 360° virtual tour modules using Three.js / Panolens.js for campus facilities exploration.",
        "Contributed to frontend implementation and user testing for internal faculty applications.",
      ],
      id: [
        "Merancang purwarupa antarmuka responsif di Figma untuk alur kerja administratif fakultas.",
        "Membangun modul virtual tour 360° interaktif menggunakan Three.js / Panolens.js untuk fasilitas kampus.",
        "Berkontribusi pada implementasi frontend dan pengujian pengguna untuk aplikasi internal fakultas.",
      ],
    },
    technologies: [
      "JavaScript",
      "Three.js",
      "Panolens.js",
      "Figma",
      "HTML5",
      "CSS3",
      "Git",
    ],
  },
  {
    id: "independent-client-engineering",
    role: {
      en: "Independent Software Engineer & Technical Consultant",
      id: "Independent Software Engineer & Konsultan Teknis",
    },
    organization: {
      en: "Client & Stakeholder Engagements",
      id: "Klien & Pemangku Kepentingan",
    },
    location: "Indonesia (Remote / Hybrid)",
    period: "2023 — Present",
    type: "Engineering Engagements",
    description: {
      en: "Architecting, developing, and deploying bespoke web applications, enterprise dashboards, predictive ML services, and hardware-interfacing systems for organizations and businesses.",
      id: "Merancang, mengembangkan, dan menerapkan aplikasi web kustom, dasbor enterprise, layanan inferensi ML, serta integrasi perangkat keras untuk organisasi dan unit usaha.",
    },
    highlights: {
      en: [
        "Delivered Dialisis Connect Edu for Indonesian Dialysis Nurses Association (IPDI) Central Java with role-based access and event management.",
        "Built UKG System for comprehensive teacher competence evaluation, grading algorithms, and PDF score generation.",
        "Engineered thermal printer hardware service for Android POS and web-to-print integrations using ESC/POS protocol.",
        "Engineered and validated machine learning risk classification prototypes with reproducible data balancing and evaluation pipelines.",
      ],
      id: [
        "Mengembangkan Dialisis Connect Edu untuk IPDI Jawa Tengah dengan manajemen acara dan sertifikasi digital.",
        "Membangun UKG System untuk evaluasi kompetensi guru dengan kalkulasi nilai otomatis dan cetak transkrip PDF.",
        "Merancang layanan pencetakan termal Android POS menggunakan protokol byte ESC/POS.",
        "Membangun dan memvalidasi purwarupa klasifikasi machine learning dengan penanganan imbalance data dan evaluasi terukur.",
      ],
    },
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Laravel",
      "NestJS",
      "Python",
      "Scikit-learn",
      "Kotlin",
      "MySQL",
      "Tailwind CSS",
    ],
  },
];
