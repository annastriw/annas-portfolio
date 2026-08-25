import type { Locale } from "@/lib/i18n/config";

export interface ExperienceItem {
  id: string;
  period: string;
  role: Record<Locale, string>;
  organization: Record<Locale, string>;
  location: string;
  type: string;
  logoFolder: string;
  logoPlaceholder: string;
  description: Record<Locale, string>;
  highlights: Record<Locale, string[]>;
  technologies: string[];
}

export const experiencesData: ExperienceItem[] = [
  {
    id: "cv-universal-kharisma-globalindo",
    period: "01/2026 — 04/2026",
    role: {
      en: "Full-Stack Developer — Freelance Project",
      id: "Full-Stack Developer — Proyek Freelance",
    },
    organization: {
      en: "CV Universal Kharisma Globalindo",
      id: "CV Universal Kharisma Globalindo",
    },
    location: "Klaten, Central Java, Indonesia",
    type: "FREELANCE // PRODUCTION ERP",
    logoFolder: "universal-kharisma-globalindo",
    logoPlaceholder: "UKG",
    description: {
      en: "Engineered and deployed UKG System, a multi-branch Enterprise Resource Planning (ERP) web application used in daily business operations.",
      id: "Merancang dan melakukan deployment UKG System, aplikasi ERP multi-cabang berbasis web untuk operasional bisnis harian.",
    },
    highlights: {
      en: [
        "Developed UKG System, a multi-branch ERP web application using Next.js frontend, NestJS modular REST API backend, and MySQL database.",
        "Architected end-to-end Figma UI/UX, role-based access control, operational workflows (inventory, sales, approvals, reporting), and automated cashier stock deductions.",
        "Executed manual and automation testing using Katalon Studio, and deployed to production on a Linux Ubuntu VPS.",
      ],
      id: [
        "Mengembangkan UKG System, aplikasi ERP multi-cabang menggunakan frontend Next.js, backend REST API modular NestJS, dan basis data MySQL.",
        "Merancang alur end-to-end dari UI/UX Figma, kontrol akses berbasis peran, alur operasional (inventaris, kasir, approval, laporan), dan rekonsiliasi stok otomatis.",
        "Menjalankan manual testing dan automation testing dengan Katalon Studio serta melakukan deployment production pada VPS Linux Ubuntu.",
      ],
    },
    technologies: [
      "Next.js",
      "NestJS",
      "TypeScript",
      "REST API",
      "MySQL",
      "Katalon Studio",
      "Linux Ubuntu VPS",
      "Figma",
    ],
  },
  {
    id: "intern-ft-undip",
    period: "08/2025 — 09/2025",
    role: {
      en: "UI/UX Designer Intern",
      id: "UI/UX Designer Intern",
    },
    organization: {
      en: "Faculty of Engineering, Diponegoro University",
      id: "Fakultas Teknik, Universitas Diponegoro",
    },
    location: "Semarang, Central Java, Indonesia",
    type: "INTERNSHIP // UI/UX DESIGN",
    logoFolder: "ft-undip",
    logoPlaceholder: "FT",
    description: {
      en: "Designed user experiences, interface wireframes, interactive prototypes, and technical system documentation for institutional engineering faculty platforms.",
      id: "Merancang pengalaman pengguna, wireframe antarmuka, purwarupa interaktif, dan dokumentasi sistem teknis untuk platform digital Fakultas Teknik.",
    },
    highlights: {
      en: [
        "Designed wireframes and user interaction flows for SITEDI (Faculty Research and Community Service Information System).",
        "Authored the official SITEDI User Guide documenting core system workflows, key features, and user instructions.",
        "Designed wireframes and user experience flows for the SIPERPUS FT UNDIP faculty library system.",
      ],
      id: [
        "Merancang wireframe dan alur interaksi pengguna untuk SITEDI (Sistem Informasi Penelitian dan Pengabdian Fakultas Teknik).",
        "Menyusun Buku Panduan Penggunaan resmi SITEDI yang mendokumentasikan alur sistem, fitur utama, dan instruksi pengguna.",
        "Merancang wireframe dan alur pengalaman pengguna untuk sistem perpustakaan fakultas SIPERPUS FT UNDIP.",
      ],
    },
    technologies: [
      "Figma",
      "UI/UX Design",
      "Wireframing",
      "User Flow",
      "Interactive Prototyping",
      "Technical Documentation",
    ],
  },
  {
    id: "intern-duta-basis-dataprima",
    period: "07/2024 — 08/2024",
    role: {
      en: "Junior Game Developer Intern",
      id: "Junior Game Developer Intern",
    },
    organization: {
      en: "PT Duta Basis Dataprima",
      id: "PT Duta Basis Dataprima",
    },
    location: "Bandung, West Java, Indonesia",
    type: "INTERNSHIP // 3D & MULTIMEDIA",
    logoFolder: "duta-basis-dataprima",
    logoPlaceholder: "DBD",
    description: {
      en: "Engineered an interactive 360° Panoramic Virtual Tour prototype for architectural building visualization.",
      id: "Mengembangkan purwarupa Panoramic Virtual Tour 360° interaktif untuk visualisasi proyek bangunan arsitektur.",
    },
    highlights: {
      en: [
        "Developed Panoramic Virtual Tour prototype in Unity (C#) using Lumion Pro 3D architectural renders.",
        "Processed 78 rendered 360° panoramas and structured scene management across 79 distinct Unity scenes.",
        "Implemented Physics Raycasts, Box Colliders, reusable navigation hotspot prefabs, and mouse/touch camera controls with persistent PlayerRig.",
      ],
      id: [
        "Membangun purwarupa Panoramic Virtual Tour di Unity (C#) memanfaatkan hasil render 3D Lumion Pro.",
        "Mengolah 78 hasil render panorama 360° dan menyusun hierarki scene management pada 79 scene Unity.",
        "Mengimplementasikan Physics Raycast, Box Collider, prefab hotspot navigasi reusable, dan kontrol kamera mouse/touch dengan PlayerRig persisten.",
      ],
    },
    technologies: [
      "Unity",
      "C#",
      "Lumion Pro",
      "360° Panorama",
      "Physics Raycast",
      "Scene Management",
    ],
  },
];
