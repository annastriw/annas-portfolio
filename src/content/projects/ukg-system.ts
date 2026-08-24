import type { ProjectItem } from "./types";

export const ukgSystemProject: ProjectItem = {
  slug: "ukg-system",
  category: "web-app",
  order: 1,
  featured: true,
  title: {
    en: "UKG System",
    id: "UKG System",
  },
  subtitle: {
    en: "Multi-Branch Enterprise Resource Planning (ERP) Web Platform",
    id: "Aplikasi Web Enterprise Resource Planning (ERP) Multi-Cabang",
  },
  projectType: {
    en: "Enterprise Resource Planning (ERP) Web Application",
    id: "Aplikasi Web Enterprise Resource Planning (ERP)",
  },
  role: {
    en: "Fullstack Developer",
    id: "Fullstack Developer",
  },
  stakeholder: {
    en: "CV Universal Kharisma Globalindo",
    id: "CV Universal Kharisma Globalindo",
  },
  period: {
    en: "Jan 2026 – Apr 2026",
    id: "Jan 2026 – Apr 2026",
  },
  status: {
    en: "Live Production",
    id: "Live Production",
  },
  liveUrl: "https://ukgsystem.com",
  summary: {
    en: "An end-to-end multi-branch Enterprise Resource Planning (ERP) web application engineered to centralize commercial operations across retail store branches, inventory tracking, stock orders, cashier sales, and administrative reporting for CV Universal Kharisma Globalindo.",
    id: "Aplikasi web Enterprise Resource Planning (ERP) multi-cabang end-to-end yang dikembangkan untuk mengintegrasikan operasional bisnis gerai retail, pelacakan inventaris, pengajuan stok, transaksi kasir, dan laporan administrasi CV Universal Kharisma Globalindo.",
  },
  problemStatement: {
    en: "Decentralized store branches struggled with fragmented operational records, manual attendance logs, uncoordinated stock requests, and lack of real-time multi-branch inventory tracking.",
    id: "Pengelolaan cabang gerai yang terpisah mengalami kendala rekonsiliasi data operasional manual, presensi terfragmentasi, alur mutasi stok tidak terpusat, dan ketiadaan pemantauan inventaris real-time.",
  },
  systemSolution: {
    en: "Engineered an end-to-end full-stack web application featuring Next.js frontend, NestJS modular REST API backend, role-based access control (Owner & Employees), real-time stock deductions on cashier sales, stock requisition workflows, and automated QA testing with Katalon Studio.",
    id: "Membangun aplikasi web fullstack dengan frontend Next.js, backend REST API NestJS modular, kontrol akses berbasis peran (Owner & Karyawan), sinkronisasi stok otomatis saat transaksi, alur approval stok, dan pengujian QA terotomatisasi menggunakan Katalon Studio.",
  },
  personalContributions: {
    en: [
      "Conducted requirements analysis and designed the entire UI/UX design system in Figma.",
      "Engineered frontend interfaces with Next.js and backend modular REST API services using NestJS.",
      "Implemented multi-role access control, 8 core operational modules, and automated cashier stock inventory reconciliation.",
      "Performed manual and automated QA testing using Katalon Studio and deployed to production on a Linux Ubuntu VPS.",
    ],
    id: [
      "Melakukan analisis kebutuhan sistem dan merancang sistem antarmuka UI/UX lengkap menggunakan Figma.",
      "Mengembangkan antarmuka frontend dengan Next.js dan layanan backend REST API modular dengan NestJS.",
      "Mengimplementasikan kontrol akses multi-role, 8 modul operasional utama, dan rekonsiliasi stok otomatis pada transaksi kasir.",
      "Menjalankan manual testing dan test automation menggunakan Katalon Studio serta melakukan deployment production pada VPS Linux Ubuntu.",
    ],
  },
  verifiedEvidence: {
    en: [
      "Live production deployment on Linux Ubuntu VPS at https://ukgsystem.com used in daily business operations.",
      "Implemented 8 distinct functional modules across multi-branch store operations.",
      "Validated end-to-end workflows and role permissions with Katalon Studio automated testing suites.",
    ],
    id: [
      "Sistem live production pada VPS Linux Ubuntu di https://ukgsystem.com yang aktif digunakan untuk operasional harian.",
      "Mengimplementasikan 8 kelompok modul fungsional terintegrasi lintas cabang operasional.",
      "Memvalidasi alur bisnis utama dan hak akses peran menggunakan automated testing Katalon Studio.",
    ],
  },
  techStack: {
    core: ["Next.js", "NestJS", "TypeScript", "REST API", "MySQL", "Figma"],
    architecture: ["Modular Monolith REST API", "Role-Based Access Control (RBAC)", "Multi-Branch Architecture"],
    qaOrDeployment: ["Katalon Studio Automation Testing", "Linux Ubuntu VPS", "Manual QA"],
  },
  coverImage: "/assets/projects/ukg-system/cover.webp",
  documentationImages: [
    "/assets/projects/ukg-system/documentation/01.webp",
    "/assets/projects/ukg-system/documentation/02.webp",
    "/assets/projects/ukg-system/documentation/03.webp",
    "/assets/projects/ukg-system/documentation/04.webp",
    "/assets/projects/ukg-system/documentation/05.webp",
    "/assets/projects/ukg-system/documentation/06.webp",
    "/assets/projects/ukg-system/documentation/07.webp",
    "/assets/projects/ukg-system/documentation/08.webp",
    "/assets/projects/ukg-system/documentation/09.webp",
  ],
};
