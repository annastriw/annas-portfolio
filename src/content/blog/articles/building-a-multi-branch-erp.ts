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
        en: "Mapping the Operational Workflow First",
        id: "Memetakan Workflow Operasional Terlebih Dahulu",
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
              "Ubuntu VPS Live",
            ],
            id: [
              "Analisis Operasional",
              "Cakupan Peran dan Cabang",
              "UI dan UX Figma",
              "Frontend Next.js",
              "REST API NestJS",
              "QA Katalon Studio",
              "Live di VPS Ubuntu",
            ],
          },
        },
        {
          type: "prose",
          paragraphs: {
            en: [
              "UKG System was developed for CV Universal Kharisma Globalindo as a unified multi-branch ERP web platform. As the Fullstack Developer, my scope spanned the entire delivery lifecycle: business requirements analysis, UI and UX prototyping in Figma, frontend engineering with Next.js, backend architecture with NestJS, business logic implementation, quality assurance with Katalon Studio, and production deployment on an Ubuntu Linux VPS.",
              "Rather than treating the platform as a disconnected collection of CRUD tables, development started from the physical movement of goods and money through the enterprise. Stock is requested by store staff, reviewed and approved by management, received into branch inventory, sold through cashier terminals, and occasionally restored through returns. Branch context governs every stage, ensuring attendance, expenses, and transaction logs remain partitioned and verifiable.",
            ],
            id: [
              "UKG System dikembangkan untuk CV Universal Kharisma Globalindo sebagai platform ERP web multi-cabang terpadu. Sebagai Fullstack Developer, lingkup pekerjaan saya mencakup seluruh siklus delivery: analisis kebutuhan bisnis, perancangan UI dan UX di Figma, frontend dengan Next.js, backend dengan NestJS, implementasi business logic, quality assurance dengan Katalon Studio, serta deployment production pada VPS Linux Ubuntu.",
              "Alih-alih memperlakukan platform sebagai kumpulan tabel CRUD yang terpisah, pengembangan dimulai dari pergerakan fisik barang dan transaksi di dalam bisnis. Stok diajukan oleh staf toko, diperiksa dan disetujui oleh manajemen, diterima ke dalam inventaris cabang, dijual melalui kasir, dan dipulihkan ketika terjadi pembatalan transaksi. Konteks cabang mengatur setiap tahapan sehingga data presensi, biaya operasional, dan log transaksi tetap terisolasi serta dapat diverifikasi.",
            ],
          },
        },
        {
          type: "list",
          style: "unordered",
          items: {
            en: [
              "Two primary system roles: Owner and Employee, each with strict access boundaries.",
              "Eight integrated module groups: User Management, Attendance, Inventory, Stock Orders, Store Operations, Cashier POS, Reports, and Analytics.",
              "Branch-scoped data isolation across all operational records and summaries.",
            ],
            id: [
              "Dua peran sistem utama: Owner dan Karyawan, masing-masing dengan batasan hak akses yang ketat.",
              "Delapan kelompok modul terintegrasi: Manajemen Pengguna, Presensi, Inventaris, Order Stok, Operasional Toko, Kasir POS, Laporan, dan Analitik.",
              "Isolasi data berbasis cabang di seluruh catatan operasional dan ringkasan.",
            ],
          },
        },
      ],
    },
    {
      id: "system-architecture",
      title: {
        en: "Architecture Built Around Roles and Cross-Module Rules",
        id: "Arsitektur yang Dibangun di Sekitar Peran dan Aturan Lintas Modul",
      },
      blocks: [
        {
          type: "prose",
          paragraphs: {
            en: [
              "The Owner role requires aggregated visibility across all operational branches, permission to approve inter-branch stock allocations, and direct access to financial statements. Conversely, the Employee role is restricted to daily branch duties such as shift check-ins, cashier transactions, operational expense logging, and inventory requests.",
              "The most critical architectural requirement was managing inter-module dependencies. When a cashier completes a sale, the NestJS backend decrements stock quantities in real time. If a cashier cancels an order, a dedicated rollback workflow restores item counts to branch inventory. Stock orders link employee demand, owner authorization, vendor receipt, and stock availability into a single auditable chain.",
            ],
            id: [
              "Peran Owner memerlukan visibilitas agregat lintas seluruh cabang operasional, wewenang untuk menyetujui alokasi stok antar cabang, dan akses langsung ke laporan keuangan. Sebaliknya, peran Karyawan dibatasi pada tugas harian cabang seperti presensi shift, transaksi kasir, pencatatan biaya operasional, dan pengajuan kebutuhan stok.",
              "Kebutuhan arsitektur yang paling penting adalah pengelolaan dependensi antar modul. Saat kasir menyelesaikan transaksi penjualan, backend NestJS langsung memperbarui jumlah stok secara real-time. Jika kasir membatalkan pesanan, workflow rollback mengembalikan jumlah barang ke inventaris cabang. Order stok menghubungkan pengajuan karyawan, persetujuan owner, penerimaan barang, dan ketersediaan stok dalam satu alur terstruktur.",
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
        en: "Validating Business Logic with Katalon Studio",
        id: "Memvalidasi Logika Bisnis dengan Katalon Studio",
      },
      blocks: [
        {
          type: "prose",
          paragraphs: {
            en: [
              "Because ERP errors directly impact physical inventory and financial records, quality assurance was executed systematically using Katalon Studio. The test plan combined manual test cases for edge-case user interactions with automated test suites for repetitive regression workflows.",
              "Automated test scripts verified authentication states, role-based route guards, branch data isolation, stock order approval paths, and receipt printing calculations. Running automated checks prior to release ensured that backend business rule changes did not regress frontend state or inventory ledger accuracy.",
            ],
            id: [
              "Karena kesalahan sistem ERP berdampak langsung pada inventaris fisik dan catatan keuangan, quality assurance dijalankan secara sistematis menggunakan Katalon Studio. Rencana pengujian menggabungkan skenario manual untuk interaksi pengguna khusus dengan suite pengujian otomatis untuk alur regresi berulang.",
              "Skrip pengujian otomatis memvalidasi status autentikasi, route guard berbasis peran, isolasi data cabang, alur persetujuan order stok, dan perhitungan cetak nota. Menjalankan pemeriksaan otomatis sebelum rilis memastikan bahwa perubahan aturan bisnis backend tidak merusak status antarmuka atau akurasi pencatatan stok.",
            ],
          },
        },
        {
          type: "note",
          label: {
            en: "Technical note",
            id: "Catatan teknis",
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
        en: "Deploying to Ubuntu Linux VPS and Active Operations",
        id: "Deployment ke VPS Linux Ubuntu dan Operasional Aktif",
      },
      blocks: [
        {
          type: "list",
          style: "ordered",
          items: {
            en: [
              "Configure production runtime environment and reverse proxy on an Ubuntu Linux VPS.",
              "Bind production domain at https://ukgsystem.com with secure certificate provisioning.",
              "Execute database migrations and seed baseline branch structure and role privileges.",
              "Conduct final smoke testing on production endpoints before opening the system to business operations.",
            ],
            id: [
              "Konfigurasi runtime environment production dan reverse proxy pada VPS Linux Ubuntu.",
              "Hubungkan domain production pada https://ukgsystem.com dengan penyediaan sertifikat aman.",
              "Jalankan migrasi database serta data awal struktur cabang dan hak akses peran.",
              "Lakukan smoke testing akhir pada endpoint production sebelum membuka sistem untuk operasional bisnis.",
            ],
          },
        },
        {
          type: "prose",
          paragraphs: {
            en: [
              "The primary development cycle took place from January through March 2026. Following go-live, UKG System remained in active production use for CV Universal Kharisma Globalindo, managing multi-branch inventory, daily retail cashier shifts, and executive reporting without third-party middleware dependencies.",
            ],
            id: [
              "Siklus pengembangan utama berlangsung dari Januari hingga Maret 2026. Setelah go-live, UKG System terus digunakan secara aktif dalam operasional CV Universal Kharisma Globalindo, mengelola inventaris multi-cabang, shift kasir harian, dan laporan eksekutif tanpa ketergantungan middleware pihak ketiga.",
            ],
          },
        },
      ],
    },
  ],
};
