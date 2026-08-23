import type { ProjectItem } from "./types";

export const footyStandingsProject: ProjectItem = {
  slug: "footy-standings",
  category: "mobile",
  order: 9,
  featured: false,
  title: {
    en: "Footy Standings",
    id: "Footy Standings",
  },
  subtitle: {
    en: "Football League Standings & Match Statistics Mobile App",
    id: "Aplikasi Mobile Klasemen & Statistik Pertandingan Sepak Bola",
  },
  projectType: {
    en: "Mobile Application / Sports Statistics & Live Data",
    id: "Aplikasi Mobile / Statistik Sepak Bola & Data Pertandingan",
  },
  role: {
    en: "Mobile Application Developer",
    id: "Mobile Application Developer",
  },
  stakeholder: {
    en: "Independent Mobile Development",
    id: "Proyek Aplikasi Mobile Mandiri",
  },
  period: {
    en: "2023 — 2024",
    id: "2023 — 2024",
  },
  status: {
    en: "Completed",
    id: "Selesai",
  },
  summary: {
    en: "A cross-platform mobile application built with Flutter that fetches and displays football league standings, top scorers, team forms, and match schedules from external sports APIs.",
    id: "Aplikasi mobile lintas platform dengan Flutter untuk menampilkan klasemen liga sepak bola, daftar pencetak gol terbanyak, statistik tim, dan jadwal pertandingan dari API olahraga publik.",
  },
  problemStatement: {
    en: "Sports fans require quick, lightweight, and offline-resilient access to current league tables without sluggish web views or intrusive pop-up advertisements.",
    id: "Penggemar sepak bola membutuhkan akses cepat, ringan, dan responsif terhadap data klasemen liga tanpa gangguan antarmuka yang berat atau iklan berlebihan.",
  },
  systemSolution: {
    en: "Engineered a clean Flutter mobile architecture featuring reactive state management, asynchronous REST API caching, and smooth tabular navigation across multiple international leagues.",
    id: "Membangun aplikasi mobile Flutter dengan manajemen state reaktif, caching data API asinkron, dan navigasi tabel klasemen yang mulus untuk berbagai liga internasional.",
  },
  personalContributions: {
    en: [
      "Architected clean Flutter state management and HTTP client communication layer.",
      "Designed clean sports dashboard UI with team crests, goal differentials, and form badges.",
      "Implemented local storage caching to maintain instant display when connectivity is limited.",
    ],
    id: [
      "Merancang arsitektur manajemen state Flutter dan komunikasi klien HTTP REST API.",
      "Membangun antarmuka dasbor olahraga dengan lambang klub, selisih gol, dan status performa tim.",
      "Mengembangkan caching penyimpanan lokal untuk menjaga responsivitas aplikasi saat koneksi lambat.",
    ],
  },
  verifiedEvidence: {
    en: [
      "Delivered cross-platform Flutter application supporting major European football leagues.",
      "Verified API response deserialization and UI rendering performance on Android physical devices.",
    ],
    id: [
      "Menyelesaikan aplikasi Flutter lintas platform yang mendukung liga-liga utama sepak bola Eropa.",
      "Memvalidasi deserialisasi data API dan performa antarmuka pada perangkat fisik Android.",
    ],
  },
  techStack: {
    core: ["Flutter", "Dart", "REST API", "HTTP Client", "JSON Serialization"],
    architecture: ["Provider / State Management", "Clean Architecture", "Local Cache"],
    qaOrDeployment: ["Android Device Emulation", "Static Analysis", "Git Workflow"],
  },
  coverImage: "/assets/projects/footy-standings/cover.webp",
  documentationImages: [
    "/assets/projects/footy-standings/documentation/01.webp",
    "/assets/projects/footy-standings/documentation/02.webp",
    "/assets/projects/footy-standings/documentation/03.webp",
    "/assets/projects/footy-standings/documentation/04.webp",
  ],
};
