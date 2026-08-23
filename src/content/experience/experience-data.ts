import type { Locale } from "@/lib/i18n/config";

export interface ExperienceItem {
  id: string;
  period: string;
  role: Record<Locale, string>;
  organization: Record<Locale, string>;
  location: string;
  type: string;
  description: Record<Locale, string>;
  highlights: Record<Locale, string[]>;
  technologies: string[];
}

export const experiencesData: ExperienceItem[] = [
  {
    id: "intern-ft-undip",
    period: "08/2025 — 09/2025",
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
      en: "Engineered user experience designs, interactive Figma prototypes, and formal system documentation for institutional faculty platforms (SITEDI research platform and SIPERPUS library system).",
      id: "Merancang pengalaman pengguna, purwarupa interaktif Figma, dan dokumentasi sistem operasional untuk platform institusi Fakultas Teknik (sistem riset SITEDI dan perpustakaan SIPERPUS).",
    },
    highlights: {
      en: [
        "Designed UI/UX and interactive prototypes in Figma for SITEDI (Research & Community Service System) and SIPERPUS FT UNDIP.",
        "Formulated information architecture, user flows, navigation hierarchies, and design consistency across multi-role workflows.",
        "Authored the official SITEDI User Manual Guide (Buku Panduan Penggunaan) to standardize operational adoption across faculty departments.",
      ],
      id: [
        "Merancang UI/UX dan purwarupa interaktif Figma untuk SITEDI (Sistem Informasi Penelitian & Pengabdian) dan SIPERPUS FT UNDIP.",
        "Menyusun arsitektur informasi, alur pengguna, hierarki navigasi, dan konsistensi antarmuka lintas peran pengguna.",
        "Menulis Buku Panduan Penggunaan resmi SITEDI sebagai dokumentasi operasional standar bagi sivitas akademika fakultas.",
      ],
    },
    technologies: ["Figma", "UI/UX Design", "Interactive Prototyping", "Information Architecture", "Technical Documentation"],
  },
  {
    id: "independent-engineering",
    period: "2022 — PRESENT",
    role: {
      en: "Software Engineer · Full-Stack & Machine Learning",
      id: "Software Engineer · Full-Stack & Machine Learning",
    },
    organization: {
      en: "Independent Engineering & Client Stakeholder Engagements",
      id: "Pengembangan Mandiri & Kemitraan Klien",
    },
    location: "Klaten / Remote, Indonesia",
    type: "SYSTEMS & APPLIED AI",
    description: {
      en: "Architected and delivered end-to-end fullstack web platforms, machine learning predictive inference services, and hardware-integrated mobile utilities across commercial and community domains.",
      id: "Merancang dan mengimplementasikan platform web fullstack end-to-end, layanan inferensi prediktif machine learning, dan aplikasi mobile integrasi perangkat keras.",
    },
    highlights: {
      en: [
        "UKG System: Built production multi-branch ERP with NestJS REST API, Next.js frontend, automated stock workflows, and Katalon Studio QA for CV Universal Kharisma Globalindo.",
        "iHealth Edu & Dialisis Connect Edu: Delivered digital health platforms featuring multi-role access, standardized screening, and Flask-served risk prediction prototypes.",
        "Applied ML & Systems: Engineered heart attack risk classification prototype (Scikit-learn, Random Forest), automated speech recognition pipeline (Wav2Vec2), and Android ESC/POS thermal printing service.",
      ],
      id: [
        "UKG System: Membangun sistem ERP multi-cabang dengan REST API NestJS, Next.js, sinkronisasi stok otomatis, dan QA Katalon Studio untuk CV Universal Kharisma Globalindo.",
        "iHealth Edu & Dialisis Connect Edu: Mengembangkan platform kesehatan digital dengan modul asesmen terstandar, jalur edukasi terstruktur, dan purwarupa prediksi risiko.",
        "Terapan ML & Sistem: Merekayasa purwarupa klasifikasi risiko penyakit jantung (Scikit-learn), pipeline speech recognition (Wav2Vec2), dan utilitas Android printer termal ESC/POS.",
      ],
    },
    technologies: ["Next.js", "React", "TypeScript", "NestJS", "Laravel", "Python", "Scikit-learn", "Kotlin", "Docker", "Linux"],
  },
];
