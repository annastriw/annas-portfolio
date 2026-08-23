import type { ProjectItem } from "./types";

export const thermalPrinterServiceProject: ProjectItem = {
  slug: "thermal-printer-service",
  category: "mobile",
  order: 8,
  featured: true,
  title: {
    en: "Thermal Printer Service",
    id: "Thermal Printer Service",
  },
  subtitle: {
    en: "Android Background Daemon & ESC/POS Hardware Printing Service",
    id: "Layanan Latar Belakang Android & Integrasi Printer Termal ESC/POS",
  },
  projectType: {
    en: "Mobile Utility / Hardware Printing Daemon",
    id: "Utilitas Mobile / Layanan Komunikasi Perangkat Keras",
  },
  role: {
    en: "Android & Systems Developer",
    id: "Android & Systems Developer",
  },
  stakeholder: {
    en: "Commercial POS & Retail Systems",
    id: "Sistem Kasir & Transaksi Ritel",
  },
  period: {
    en: "2023 — 2024",
    id: "2023 — 2024",
  },
  status: {
    en: "Completed / Operational",
    id: "Selesai / Operasional",
  },
  summary: {
    en: "A native Android background microservice and ESC/POS command serialization engine enabling web applications and local POS clients to perform deterministic thermal receipt printing via Bluetooth and USB interfaces.",
    id: "Layanan latar belakang Android native dan mesin serialisasi perintah ESC/POS untuk memungkinkan aplikasi web dan kasir melakukan pencetakan struk termal via Bluetooth dan USB secara deterministik.",
  },
  problemStatement: {
    en: "Standard browser printing relies on OS dialogs that are unsuitable for continuous receipt printing, lack raw ESC/POS byte manipulation, and fail silently during Bluetooth disconnections.",
    id: "Pencetakan peramban standar mengandalkan dialog OS yang lambat untuk kasir, tidak mendukung manipulasi byte ESC/POS mentah, dan sering gagal saat koneksi Bluetooth terputus.",
  },
  systemSolution: {
    en: "Engineered an autonomous Android background service running a local WebSocket server that receives JSON job payloads, builds ESC/POS byte buffers, queues print jobs, and handles automatic hardware reconnects.",
    id: "Membangun background service Android dengan server WebSocket lokal yang menerima payload JSON, menyusun buffer byte biner ESC/POS, mengantrekan pencetakan, dan menangani rekoneksi otomatis.",
  },
  personalContributions: {
    en: [
      "Engineered ESC/POS byte serialization engine for text alignment, barcodes, QR codes, tables, and paper cut commands.",
      "Developed local WebSocket communication bridge connecting browser POS clients to Android hardware.",
      "Implemented Bluetooth RFCOMM socket connection management and background task lifecycles.",
    ],
    id: [
      "Mengembangkan mesin serialisasi byte ESC/POS untuk format teks, barcode, QR code, tabel, dan pemotong kertas.",
      "Membangun jembatan komunikasi WebSocket lokal antara peramban web dan perangkat keras Android.",
      "Mengelola koneksi soket Bluetooth RFCOMM dan siklus hidup background service Android.",
    ],
  },
  verifiedEvidence: {
    en: [
      "Tested and verified on physical 58mm and 80mm ESC/POS thermal receipt printers over Bluetooth and USB OTG.",
      "Demonstrated reliable background job execution without UI thread blocking or print dialog popups.",
    ],
    id: [
      "Diuji dan terverifikasi pada printer termal fisik 58mm dan 80mm melalui koneksi Bluetooth dan USB OTG.",
      "Menjalankan antrean cetak di latar belakang tanpa memblokir thread UI atau memunculkan dialog cetak.",
    ],
  },
  techStack: {
    core: ["Kotlin", "Android SDK", "Java", "ESC/POS Protocol", "WebSockets"],
    architecture: ["Background Service Daemon", "FIFO Print Queue", "Socket IPC Architecture"],
    qaOrDeployment: ["Bluetooth RFCOMM Lifecycle", "Physical Hardware Testing", "Git Workflow"],
  },
  coverImage: "/assets/projects/thermal-printer-service/cover.webp",
  documentationImages: [
    "/assets/projects/thermal-printer-service/documentation/01.webp",
    "/assets/projects/thermal-printer-service/documentation/02.webp",
    "/assets/projects/thermal-printer-service/documentation/03.webp",
    "/assets/projects/thermal-printer-service/documentation/04.webp",
    "/assets/projects/thermal-printer-service/documentation/05.webp",
    "/assets/projects/thermal-printer-service/documentation/06.webp",
  ],
};
