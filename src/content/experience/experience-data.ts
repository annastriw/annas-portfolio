import type { Locale } from "@/lib/i18n/config";

export interface ExperienceItem {
  id: string;
  period: string;
  role: Record<Locale, string>;
  organization: Record<Locale, string>;
  location: Record<Locale, string>;
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
    period: "JAN 2026 – APR 2026",
    role: {
      en: "Full-Stack Web Developer",
      id: "Full-Stack Web Developer",
    },
    organization: {
      en: "CV Universal Kharisma Globalindo",
      id: "CV Universal Kharisma Globalindo",
    },
    location: {
      en: "Klaten, Central Java, Indonesia",
      id: "Klaten, Jawa Tengah, Indonesia",
    },
    type: "FREELANCE // FULL-STACK DEVELOPMENT",
    logoFolder: "cv-universal-kharisma-globalindo",
    logoPlaceholder: "UKG",
    description: {
      en: "Developed a multi-branch ERP end-to-end using Next.js frontend, NestJS REST API, and MySQL database.",
      id: "Mengembangkan ERP multi-cabang secara end-to-end menggunakan frontend Next.js, REST API NestJS, dan database MySQL.",
    },
    highlights: {
      en: [
        "Developed a multi-branch ERP end-to-end using a Next.js frontend, NestJS REST API, and MySQL database.",
        "Designed role-based workflows for inventory, sales, approvals, reporting, and automated stock updates.",
        "Performed manual testing and automated end-to-end testing with Playwright, then deployed the system to an Ubuntu VPS where it remains in active use.",
      ],
      id: [
        "Mengembangkan ERP multi-cabang secara end-to-end menggunakan frontend Next.js, REST API NestJS, dan database MySQL.",
        "Merancang workflow berbasis role untuk inventory, penjualan, approval, laporan, dan pembaruan stok otomatis.",
        "Melakukan testing manual dan automated end-to-end testing menggunakan Playwright, lalu melakukan deployment ke VPS Ubuntu yang masih digunakan hingga saat ini.",
      ],
    },
    technologies: [
      "Next.js",
      "NestJS",
      "TypeScript",
      "MySQL",
      "Playwright",
      "Linux Ubuntu",
    ],
  },
  {
    id: "intern-ft-undip",
    period: "AUG 2025 – SEP 2025",
    role: {
      en: "UI/UX Designer Intern",
      id: "UI/UX Designer Intern",
    },
    organization: {
      en: "Faculty of Engineering, Diponegoro University",
      id: "Fakultas Teknik, Universitas Diponegoro",
    },
    location: {
      en: "Semarang, Central Java, Indonesia",
      id: "Semarang, Jawa Tengah, Indonesia",
    },
    type: "INTERNSHIP // UI/UX DESIGN",
    logoFolder: "faculty-engineering-undip",
    logoPlaceholder: "FT",
    description: {
      en: "Designed wireframes, user flows, and interactive prototypes for faculty platforms.",
      id: "Merancang wireframe, user flow, dan interactive prototype untuk platform Fakultas Teknik.",
    },
    highlights: {
      en: [
        "Designed wireframes and user flows for the SITEDI research and community service information system.",
        "Created interface flows and an interactive prototype for the SIPERPUS FT Undip library system.",
        "Authored the SITEDI User Guide to document core workflows, features, and usage instructions.",
      ],
      id: [
        "Merancang wireframe dan user flow untuk sistem informasi penelitian dan pengabdian SITEDI.",
        "Membuat alur antarmuka dan interactive prototype untuk sistem perpustakaan SIPERPUS FT Undip.",
        "Menyusun Buku Panduan Penggunaan SITEDI yang mendokumentasikan workflow, fitur utama, dan petunjuk penggunaan.",
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
    period: "JUL 2024 – AUG 2024",
    role: {
      en: "Junior Game Developer Intern",
      id: "Junior Game Developer Intern",
    },
    organization: {
      en: "PT Duta Basis Dataprima",
      id: "PT Duta Basis Dataprima",
    },
    location: {
      en: "Bandung, West Java, Indonesia",
      id: "Bandung, Jawa Barat, Indonesia",
    },
    type: "INTERNSHIP // UNITY DEVELOPMENT",
    logoFolder: "pt-duta-basis-dataprima",
    logoPlaceholder: "DBD",
    description: {
      en: "Developed a Panoramic Virtual Tour prototype in Unity and C# using architectural renders produced with Lumion Pro.",
      id: "Mengembangkan prototype Panoramic Virtual Tour menggunakan Unity dan C# dengan visual arsitektur yang dirender melalui Lumion Pro.",
    },
    highlights: {
      en: [
        "Developed a Panoramic Virtual Tour prototype in Unity and C# using architectural renders produced with Lumion Pro.",
        "Processed 78 rendered panoramas and organized the application across 79 Unity scenes.",
        "Implemented scene navigation using physics raycasts, box colliders, reusable hotspots, and mouse and touch controls.",
      ],
      id: [
        "Mengembangkan prototype Panoramic Virtual Tour menggunakan Unity dan C# dengan visual arsitektur yang dirender melalui Lumion Pro.",
        "Mengolah 78 hasil render panorama dan menyusun aplikasi dalam 79 Unity scenes.",
        "Mengimplementasikan navigasi antar-scene menggunakan physics raycast, box collider, reusable hotspot, serta kontrol mouse dan touch.",
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
