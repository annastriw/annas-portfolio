import type { BlogArticle } from "../article-types";

export const multiBranchErpArticle: BlogArticle = {
  index: "01",
  slug: "building-a-multi-branch-erp-from-workflow-to-production",
  category: {
    en: "Full-Stack Systems",
    id: "Sistem Full-Stack",
  },
  title: {
    en: "Building a Multi-Branch ERP from Workflow to Production",
    id: "Membangun ERP Multi-Cabang dari Workflow hingga Production",
  },
  abstract: {
    en: "How UKG System moved from operational requirements analysis to an integrated Next.js and NestJS application for two roles, eight module groups, and multiple branches.",
    id: "Bagaimana UKG System bergerak dari analisis kebutuhan operasional menuju aplikasi Next.js dan NestJS terintegrasi untuk dua peran, delapan kelompok modul, dan banyak cabang.",
  },
  tags: ["Next.js", "NestJS", "ERP", "Katalon Studio", "Ubuntu"],
  sourceProjectSlugs: ["ukg-system"],
  projectPeriod: {
    en: "Project period: January - March 2026",
    id: "Periode proyek: Januari - Maret 2026",
  },
  sections: [
    {
      id: "workflow-foundation",
      title: {
        en: "Understanding the Multi-Branch Business Workflow",
        id: "Memahami Workflow Bisnis Multi-Cabang",
      },
      blocks: [
        {
          type: "flow",
          items: {
            en: [
              "Operational Analysis",
              "Role and Branch Scoping",
              "Figma UI and UX",
              "Next.js Frontend",
              "NestJS REST API",
              "Katalon Studio QA",
              "Ubuntu VPS Deployment",
            ],
            id: [
              "Analisis Operasional",
              "Cakupan Peran dan Cabang",
              "UI dan UX Figma",
              "Frontend Next.js",
              "REST API NestJS",
              "QA Katalon Studio",
              "Deployment VPS Ubuntu",
            ],
          },
        },
        {
          type: "prose",
          paragraphs: {
            en: [
              "When building an Enterprise Resource Planning (ERP) platform for CV Universal Kharisma Globalindo, the first priority was understanding daily retail operations. The business runs multiple store branches, each needing its own inventory tracking, cashier shifts, operational expense records, and employee attendance.",
              "As the Fullstack Developer on this project, I handled the complete delivery lifecycle from January to March 2026. This included analyzing business workflows, designing the user interface in Figma, developing the frontend in Next.js, building the backend with NestJS REST APIs, automating tests with Katalon Studio, and deploying the platform to an Ubuntu Linux VPS.",
            ],
            id: [
              "Saat membangun platform Enterprise Resource Planning (ERP) untuk CV Universal Kharisma Globalindo, prioritas utama adalah memahami alur operasional retail harian. Bisnis ini mengelola beberapa cabang toko, di mana setiap cabang membutuhkan pelacakan stok mandiri, shift kasir, pencatatan biaya operasional, dan absensi karyawan.",
              "Sebagai Fullstack Developer pada proyek ini, saya menangani seluruh siklus delivery dari Januari hingga Maret 2026. Tanggung jawab ini mencakup analisis alur bisnis, perancangan antarmuka di Figma, pengembangan frontend dengan Next.js, pembuatan backend dengan REST API NestJS, otomatisasi pengujian menggunakan Katalon Studio, hingga deployment ke VPS Linux Ubuntu.",
            ],
          },
        },
        {
          type: "list",
          style: "unordered",
          items: {
            en: [
              "Two primary user roles: Owner and Employee (Karyawan), each with clear permission boundaries.",
              "Eight connected module groups: User Management, Attendance, Inventory, Stock Orders, Store Operations, Cashier POS, Reports, and Analytics.",
              "Branch-level data partitioning across inventory logs, shift expenses, and financial summaries.",
            ],
            id: [
              "Dua peran pengguna utama: Owner dan Karyawan, masing-masing dengan batasan hak akses yang jelas.",
              "Delapan kelompok modul terintegrasi: Manajemen Pengguna, Presensi, Inventaris, Order Stok, Operasional Toko, Kasir POS, Laporan, dan Analitik.",
              "Pemisahan data berbasis cabang pada catatan stok, biaya shift, dan ringkasan keuangan.",
            ],
          },
        },
      ],
    },
    {
      id: "system-architecture",
      title: {
        en: "Role-Based Architecture with Next.js and NestJS",
        id: "Arsitektur Berbasis Peran dengan Next.js dan NestJS",
      },
      blocks: [
        {
          type: "prose",
          paragraphs: {
            en: [
              "The system separates responsibilities cleanly between roles. Store employees handle day-to-day branch activities: checking in for shifts, ringing up customer sales at the cash register, logging daily store expenses, and requesting extra stock when shelves run low.",
              "The Owner role has broader oversight: reviewing live sales across all locations, approving inter-branch stock transfers, and inspecting monthly profit reports. The Next.js frontend communicates with a modular NestJS REST API, keeping business rules consistent. For example, completing a sale immediately deducts inventory from that branch, while canceling a transaction triggers an automatic rollback that returns items to available stock.",
            ],
            id: [
              "Sistem memisahkan tanggung jawab secara jelas antara peran pengguna. Karyawan toko menangani aktivitas harian cabang: presensi shift, melayani transaksi di kasir, mencatat pengeluaran operasional toko, dan mengajukan permintaan stok saat persediaan menipis.",
              "Peran Owner memiliki pengawasan yang lebih luas: memantau penjualan langsung di semua lokasi cabang, menyetujui transfer stok antar cabang, dan memeriksa laporan keuangan bulanan. Frontend Next.js berkomunikasi dengan REST API NestJS yang modular untuk menjaga konsistensi aturan bisnis. Sebagai contoh, transaksi penjualan langsung memotong stok di cabang tersebut, sementara pembatalan transaksi secara otomatis mengembalikan barang ke stok aktif.",
            ],
          },
        },
        {
          type: "figure",
          src: "/assets/projects/ukg-system/documentation/01.webp",
          format: "wide",
          alt: {
            en: "UKG System production dashboard showing operational inventory and sales metrics",
            id: "Dashboard production UKG System yang menampilkan metrik inventaris dan penjualan operasional",
          },
          caption: {
            en: "Documented production dashboard interface displaying branch operational status and inventory levels.",
            id: "Tampilan dashboard production terdokumentasi yang menyajikan status operasional cabang dan level stok inventaris.",
          },
        },
      ],
    },
    {
      id: "quality-assurance",
      title: {
        en: "Testing Business Rules with Katalon Studio",
        id: "Pengujian Aturan Bisnis dengan Katalon Studio",
      },
      blocks: [
        {
          type: "prose",
          paragraphs: {
            en: [
              "In an ERP application, calculation errors or access mistakes directly impact physical goods and revenue records. To ensure reliability, quality assurance combined manual testing with automated test suites built in Katalon Studio.",
              "Automated test cases verified key user workflows: authentication state, role-based navigation guards, multi-branch data isolation, stock order approval chains, and point-of-sale receipt totals. Running these checks prevented regressions whenever backend endpoints or frontend components were updated.",
            ],
            id: [
              "Pada aplikasi ERP, kesalahan perhitungan atau kekeliruan akses berdampak langsung pada stok barang fisik dan catatan pendapatan. Untuk memastikan keandalan sistem, quality assurance menggabungkan pengujian manual dengan skrip otomatisasi di Katalon Studio.",
              "Skenario pengujian otomatis memvalidasi alur kerja utama: status login, proteksi halaman berbasis peran, pemisahan data antar cabang, alur persetujuan order stok, dan total perhitungan nota kasir. Pemeriksaan ini mencegah terjadinya regresi saat endpoint backend atau komponen frontend diperbarui.",
            ],
          },
        },
        {
          type: "note",
          label: {
            en: "Factual boundary",
            id: "Batas faktual",
          },
          text: {
            en: "The project record documents comprehensive manual and automated testing in Katalon Studio for core workflows. It does not cite unmeasured efficiency gains, pass rate percentages, test coverage numbers, or unverified financial impact metrics.",
            id: "Catatan proyek mendokumentasikan pengujian manual dan otomatis di Katalon Studio untuk alur utama. Catatan ini tidak mencantumkan persentase peningkatan efisiensi, pass rate, angka test coverage, atau metrik dampak finansial yang tidak terukur.",
          },
        },
      ],
    },
    {
      id: "production-delivery",
      title: {
        en: "Production Deployment on Linux Ubuntu VPS",
        id: "Deployment Production pada VPS Linux Ubuntu",
      },
      blocks: [
        {
          type: "list",
          style: "ordered",
          items: {
            en: [
              "Set up the production runtime environment and reverse proxy on an Ubuntu Linux VPS.",
              "Configure domain routing and SSL security certificates for https://ukgsystem.com.",
              "Run database migrations and seed default branch locations and user privileges.",
              "Perform smoke testing on live endpoints before launching the system for daily store operations.",
            ],
            id: [
              "Menyiapkan runtime environment production dan reverse proxy pada VPS Linux Ubuntu.",
              "Mengonfigurasi domain dan sertifikat keamanan SSL untuk https://ukgsystem.com.",
              "Menjalankan migrasi database serta data awal lokasi cabang dan hak akses pengguna.",
              "Melakukan smoke testing pada endpoint live sebelum sistem resmi digunakan untuk operasional toko harian.",
            ],
          },
        },
        {
          type: "prose",
          paragraphs: {
            en: [
              "Following go-live in March 2026, UKG System moved directly into active production use for CV Universal Kharisma Globalindo. The platform continues to support daily sales, stock management, and multi-branch business operations reliably.",
            ],
            id: [
              "Setelah go-live pada Maret 2026, UKG System langsung digunakan secara aktif untuk operasional CV Universal Kharisma Globalindo. Platform ini terus mendukung transaksi harian, pengelolaan stok, dan operasional bisnis multi-cabang secara andal.",
            ],
          },
        },
      ],
    },
  ],
};
