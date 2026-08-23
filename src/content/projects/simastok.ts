import type { ProjectItem } from "./types";

export const simastokProject: ProjectItem = {
  slug: "simastok",
  category: "web-app",
  order: 5,
  featured: false,
  title: {
    en: "SIMASTOK SHR Jaya Motor",
    id: "SIMASTOK SHR Jaya Motor",
  },
  subtitle: {
    en: "Automotive Spare Parts Inventory & POS Management System",
    id: "Sistem Manajemen Inventaris Suku Cadang & Kasir Bengkel",
  },
  projectType: {
    en: "Web Application / Inventory & Point of Sale System",
    id: "Aplikasi Web / Sistem Inventaris & Kasir Bengkel",
  },
  role: {
    en: "Full-Stack Web Developer",
    id: "Full-Stack Web Developer",
  },
  stakeholder: {
    en: "Bengkel SHR Jaya Motor",
    id: "Bengkel SHR Jaya Motor",
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
    en: "An enterprise inventory control and point-of-sale system developed for SHR Jaya Motor to manage thousand-SKU automotive parts, supplier restocks, and multi-tier transaction ledgers.",
    id: "Sistem kontrol inventaris dan kasir (POS) untuk Bengkel SHR Jaya Motor guna mengelola ribuan SKU suku cadang, pencatatan pasokan distributor, dan pembukuan transaksi bengkel.",
  },
  problemStatement: {
    en: "Manual paper ledger recording caused inventory discrepancies, untracked spare part depletion, unorganized supplier debts, and slow customer checkout workflows.",
    id: "Pencatatan nota manual menimbulkan selisih stok fisik, keterlambatan restok barang laris, utang-piutang pemasok yang tidak tercatat rapi, dan lambatnya proses transaksi pelanggan.",
  },
  systemSolution: {
    en: "Engineered a centralized web application featuring real-time stock deduction, low-stock alerts, fast barcode/SKU lookup, automated profit-and-loss calculation, and POS receipt printing integration.",
    id: "Membangun sistem web terpusat dengan pengurangan stok otomatis saat transaksi, notifikasi stok menipis, pencarian cepat kode barang/SKU, kalkulasi laba-rugi, dan pencetakan struk kasir.",
  },
  personalContributions: {
    en: [
      "Architected transactional relational database schema handling product catalog, inventory batches, and sales history.",
      "Developed high-throughput POS checkout screen with keyboard shortcuts and instant subtotal calculation.",
      "Built financial summary reporting modules with exportable PDF ledgers and date-range filters.",
    ],
    id: [
      "Merancang skema basis data relasional transaksional untuk katalog suku cadang, mutasi stok, dan riwayat penjualan.",
      "Membangun antarmuka kasir cepat dengan navigasi pintasan keyboard dan kalkulasi subtotal instan.",
      "Mengembangkan modul laporan keuangan dan rekapitulasi penjualan dengan ekspor PDF.",
    ],
  },
  verifiedEvidence: {
    en: [
      "Delivered complete inventory and POS system supporting multi-category spare parts catalog and transaction tracking.",
      "Verified calculation accuracy for sales discounts, tax calculations, and profit margin analysis.",
    ],
    id: [
      "Menyelesaikan sistem inventaris dan kasir lengkap dengan katalog suku cadang multi-kategori dan pencatatan transaksi.",
      "Memvalidasi akurasi perhitungan diskon, total transaksi, dan analisis margin keuntungan.",
    ],
  },
  techStack: {
    core: ["Laravel", "PHP", "MySQL", "JavaScript", "Bootstrap 5"],
    architecture: ["MVC Pattern", "Relational Transactions", "Role-Based Access"],
    qaOrDeployment: ["Transaction Rollback Safety", "PDF Ledger Engine", "Git Workflow"],
  },
  coverImage: "/assets/projects/simastok/cover.webp",
  documentationImages: [
    "/assets/projects/simastok/documentation/01.webp",
    "/assets/projects/simastok/documentation/02.webp",
    "/assets/projects/simastok/documentation/03.webp",
    "/assets/projects/simastok/documentation/04.webp",
    "/assets/projects/simastok/documentation/05.webp",
    "/assets/projects/simastok/documentation/06.webp",
  ],
};
