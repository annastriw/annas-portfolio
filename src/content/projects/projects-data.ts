import type { ProjectCategoryConfig, ProjectItem } from "./projects-types";

export const projectCategories: ProjectCategoryConfig[] = [
  {
    id: "web-app",
    name: {
      en: "Web Application",
      id: "Aplikasi Web",
    },
    tag: "CAT // 01",
    description: {
      en: "End-to-end fullstack platforms, enterprise ERP systems, and multi-tier web architectures.",
      id: "Platform fullstack end-to-end, sistem ERP perusahaan, dan arsitektur web multi-tier.",
    },
  },
  {
    id: "ml",
    name: {
      en: "Machine Learning",
      id: "Machine Learning",
    },
    tag: "CAT // 02",
    description: {
      en: "Predictive classification prototypes, ASR speech pipelines, and model serving APIs.",
      id: "Purwarupa klasifikasi prediktif, pipeline transkripsi suara, dan API inferensi model.",
    },
  },
  {
    id: "mobile",
    name: {
      en: "Mobile",
      id: "Aplikasi Mobile",
    },
    tag: "CAT // 03",
    description: {
      en: "Native Android hardware printing services and cross-platform Flutter applications.",
      id: "Layanan pencetakan native Android dan aplikasi multiplatform berbasis Flutter.",
    },
  },
  {
    id: "other",
    name: {
      en: "Other",
      id: "Lainnya",
    },
    tag: "CAT // 04",
    description: {
      en: "Interactive 3D multimedia, 360° virtual tours, and custom graphics workflows.",
      id: "Multimedia 3D interaktif, virtual tour 360°, dan alur kerja visual spasial.",
    },
  },
];

export const projectsData: ProjectItem[] = [
  // --------------------------------------------------------------------------
  // 01. UKG System (Web Application)
  // --------------------------------------------------------------------------
  {
    slug: "ukg-system",
    category: "web-app",
    order: 1,
    featured: true,
    title: {
      en: "UKG System",
      id: "UKG System",
    },
    subtitle: {
      en: "Multi-Branch Enterprise Resource Planning & POS Platform",
      id: "Platform ERP & Kasir Terintegrasi Multi-Cabang",
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
      en: "Jan 2026 — Mar 2026",
      id: "Januari 2026 — Maret 2026",
    },
    status: {
      en: "Live Production",
      id: "Produksi Aktif (Live)",
    },
    liveUrl: "https://ukgsystem.com",
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
    techStack: {
      core: ["Next.js", "React", "NestJS", "TypeScript"],
      architecture: ["REST API", "Role-Based Access Control", "Multi-Branch Architecture", "PostgreSQL / MySQL"],
      qaOrDeployment: ["Katalon Studio", "Manual & Automated QA", "Linux Ubuntu VPS", "Nginx"],
    },
    metrics: [
      { label: { en: "Core Modules", id: "Modul Utama" }, value: "8 Modules" },
      { label: { en: "User Roles", id: "Peran Pengguna" }, value: "2 (Owner & Employee)" },
      { label: { en: "System Scope", id: "Cakupan Sistem" }, value: "Multi-Branch Architecture" },
      { label: { en: "QA Tooling", id: "Pengujian QA" }, value: "Katalon Studio" },
    ],
    summary: {
      en: "UKG System is an enterprise-grade ERP and POS web platform engineered for CV Universal Kharisma Globalindo to unify multi-branch operations, real-time inventory tracking, cashier sales, and financial reporting under a single system.",
      id: "UKG System adalah platform web ERP dan POS yang dikembangkan untuk CV Universal Kharisma Globalindo guna menyatukan operasional multi-cabang, pelacakan inventaris, kasir penjualan, dan laporan keuangan dalam satu sistem terintegrasi.",
    },
    problemStatement: {
      en: "The enterprise operated multiple branch locations with fragmented inventory logging, disconnected point-of-sale terminals, and delayed operational reporting between store staff and business owners.",
      id: "Perusahaan mengoperasikan beberapa cabang dengan pencatatan inventaris terpisah, kasir yang belum terintegrasi, dan laporan operasional yang lambat sampai ke pemilik usaha.",
    },
    systemSolution: {
      en: "Engineered an end-to-end fullstack platform combining a responsive Next.js frontend, a modular NestJS REST API, multi-branch data isolation, automated stock decrement/restoration on sales, and role-based permissions for Owners and Employees.",
      id: "Membangun platform fullstack end-to-end yang menggabungkan frontend Next.js responsif, REST API modular NestJS, isolasi data antar cabang, sinkronisasi stok otomatis saat transaksi atau pembatalan, serta kontrol hak akses multi-role.",
    },
    personalContributions: {
      en: [
        "Analyzed operational workflows and designed comprehensive UI/UX wireframes and interactive prototypes in Figma.",
        "Built responsive client interface using Next.js with structured state management and role-based views.",
        "Engineered backend REST API using NestJS with strict business logic linking sales, stock approvals, and financial logs.",
        "Implemented multi-branch operational control allowing Owners full visibility while restricting employees to assigned branches.",
        "Configured automated stock updates during cashier transactions with instant inventory rollback upon transaction cancellation.",
        "Conducted manual and automated regression test suites using Katalon Studio across primary user journeys.",
        "Configured production environment and deployed application on Ubuntu Linux VPS with custom domain routing.",
      ],
      id: [
        "Menganalisis kebutuhan alur bisnis dan merancang UI/UX wireframe serta purwarupa interaktif menggunakan Figma.",
        "Mengembangkan frontend antarmuka responsif menggunakan Next.js dengan state management terstruktur dan tampilan berbasis role.",
        "Membangun backend REST API menggunakan NestJS dengan business logic ketat yang menghubungkan penjualan, persetujuan stok, dan log keuangan.",
        "Mengimplementasikan kontrol multi-cabang yang memberikan visibilitas penuh bagi Owner dan membatasi staf pada cabang terkait.",
        "Menerapkan pembaruan stok otomatis saat transaksi kasir dengan rollback inventaris saat transaksi dibatalkan.",
        "Menjalankan pengujian manual dan otomatis menggunakan Katalon Studio pada seluruh alur utama sistem.",
        "Menyiapkan environment produksi dan melakukan deployment sistem pada VPS Linux Ubuntu dengan konfigurasi domain kustom.",
      ],
    },
    keyModules: [
      {
        title: { en: "User & Role Management", id: "Manajemen Pengguna & Peran" },
        description: {
          en: "Role-based access control segregating permissions between high-level Owner oversight and store-level Employee actions.",
          id: "Kontrol akses berbasis peran yang memisahkan hak kelola tingkat Owner dan operasional staf toko.",
        },
      },
      {
        title: { en: "Multi-Branch & Attendance", id: "Multi-Cabang & Presensi" },
        description: {
          en: "Branch-specific employee check-ins, attendance tracking, and cross-branch administrative monitoring.",
          id: "Pencatatan presensi karyawan per cabang dan monitoring aktivitas lintas cabang untuk manajemen.",
        },
      },
      {
        title: { en: "Inventory & Stock Movement", id: "Inventaris & Pergerakan Stok" },
        description: {
          en: "Master item database, branch inventory tracking, incoming/outgoing approvals, and movement audit logs.",
          id: "Master data barang, pelacakan stok per cabang, alur approval barang masuk/keluar, dan log mutasi.",
        },
      },
      {
        title: { en: "Cashier & Automated Stock Sync", id: "Kasir & Sinkronisasi Stok" },
        description: {
          en: "Point-of-sale checkout, receipt printing, automatic stock deduction, and cancellation inventory rollback.",
          id: "Transaksi kasir, cetak nota, pengurangan stok otomatis, dan pengembalian stok saat pembatalan transaksi.",
        },
      },
      {
        title: { en: "Financial Reports & Analytics", id: "Laporan Keuangan & Analitik" },
        description: {
          en: "Period-filtered revenue summaries, operational cost logging, best-seller tracking, and low-stock alerts.",
          id: "Rekapitulasi omzet berkala, pencatatan biaya operasional, statistik produk terlaris, dan peringatan stok menipis.",
        },
      },
    ],
    verifiedEvidence: {
      en: [
        "Delivered production system running continuously at https://ukgsystem.com.",
        "Developed 8 core functional module groups across 2 distinct user permission levels.",
        "Validated system workflows with Katalon Studio manual and automated QA test scripts.",
      ],
      id: [
        "Menghasilkan sistem produksi aktif yang beroperasi pada https://ukgsystem.com.",
        "Mengembangkan 8 kelompok modul fungsional utama dengan 2 tingkat kewenangan pengguna.",
        "Memvalidasi alur kerja sistem menggunakan pengujian manual dan otomatis Katalon Studio.",
      ],
    },
    claimLimitation: {
      en: "Claims regarding efficiency percentages, performance speedups, or business revenue impacts are omitted as formal post-launch metrics were not quantitatively logged.",
      id: "Klaim mengenai persentase efisiensi, peningkatan performa, atau dampak finansial tidak dicantumkan karena tidak tercatat secara kuantitatif dalam dokumen sumber.",
    },
  },

  // --------------------------------------------------------------------------
  // 02. iHealth Edu (Web Application)
  // --------------------------------------------------------------------------
  {
    slug: "ihealth-edu",
    category: "web-app",
    order: 2,
    featured: true,
    title: {
      en: "iHealth Edu",
      id: "iHealth Edu",
    },
    subtitle: {
      en: "Integrated Digital Health Platform & Decision-Support System",
      id: "Platform Kesehatan Digital & Sistem Pendukung Keputusan Terintegrasi",
    },
    projectType: {
      en: "Fullstack Web Application / Digital Health Education Platform",
      id: "Aplikasi Web Fullstack / Platform Edukasi Kesehatan Digital",
    },
    role: {
      en: "Fullstack Developer",
      id: "Fullstack Developer",
    },
    stakeholder: {
      en: "Puskesmas Padangsari, Semarang",
      id: "Puskesmas Padangsari, Semarang",
    },
    period: {
      en: "2024",
      id: "2024",
    },
    status: {
      en: "Production Deployment",
      id: "Deployment Produksi",
    },
    coverImage: "/assets/projects/ihealth-edu/cover.webp",
    documentationImages: [
      "/assets/projects/ihealth-edu/documentation/01.webp",
      "/assets/projects/ihealth-edu/documentation/02.webp",
      "/assets/projects/ihealth-edu/documentation/03.webp",
      "/assets/projects/ihealth-edu/documentation/04.webp",
      "/assets/projects/ihealth-edu/documentation/05.webp",
      "/assets/projects/ihealth-edu/documentation/06.webp",
      "/assets/projects/ihealth-edu/documentation/07.webp",
      "/assets/projects/ihealth-edu/documentation/08.webp",
    ],
    techStack: {
      core: ["Next.js", "React", "Laravel", "PHP", "MySQL"],
      architecture: ["Random Forest Classifier", "Flask REST API", "ESP32 IoT Ingestion", "Role-Based Access"],
      qaOrDeployment: ["Katalon Studio", "Docker", "Linux Ubuntu"],
    },
    metrics: [
      { label: { en: "User Roles", id: "Peran Pengguna" }, value: "3 (Patient, Admin, Healthcare Worker)" },
      { label: { en: "Screening Modules", id: "Modul Skrining" }, value: "3 (DSMQ, HSMBQ, DASS-21)" },
      { label: { en: "Education Tracks", id: "Jalur Edukasi" }, value: "3 Tracks (Pre/Post Test Flow)" },
      { label: { en: "ML Model", id: "Model ML" }, value: "Random Forest via Flask API" },
    ],
    summary: {
      en: "iHealth Edu is an integrated digital healthcare platform developed with Puskesmas Padangsari to support public health screening, structured patient education, ESP32 IoT vital signs ingestion, and decision-support risk prediction.",
      id: "iHealth Edu adalah platform kesehatan digital terintegrasi yang dikembangkan bersama Puskesmas Padangsari untuk mendukung skrining kesehatan masyarakat, edukasi bertahap, penerimaan data IoT ESP32, dan purwarupa prediksi risiko.",
    },
    problemStatement: {
      en: "Community health centers faced disconnected paper assessments, unstandardized health education workflows, and manual vital measurements that were difficult to track over longitudinal patient visits.",
      id: "Pusat kesehatan masyarakat menghadapi pencatatan skrining manual, alur edukasi yang belum terstandar, dan pengukuran tanda vital yang sulit dipantau secara berkala.",
    },
    systemSolution: {
      en: "Delivered a centralized platform with 3 distinct user roles, standardized screening modules (DSMQ, HSMBQ, DASS-21), a 3-step education flow (Pre-Test -> Content -> Post-Test), ESP32 IoT vitals ingestion, and Flask-served Random Forest risk prediction.",
      id: "Membangun platform terpadu dengan 3 role pengguna, modul skrining terstandar (DSMQ, HSMBQ, DASS-21), alur pembelajaran 3 tahap (Pre-Test -> Materi -> Post-Test), integrasi data IoT ESP32, dan layanan prediksi risiko berbasis Flask API.",
    },
    personalContributions: {
      en: [
        "Designed complete multi-role UI/UX user flows, dashboards, and assessment interfaces in Figma.",
        "Built responsive Next.js frontend consuming Laravel backend REST APIs with role-based routing.",
        "Engineered Laravel backend for authentication, patient records, question banks, and aggregate reporting.",
        "Implemented standardized health screening modules (DSMQ, HSMBQ, DASS-21) with historical tracking.",
        "Integrated Random Forest risk prediction prototype via dedicated Flask REST API microservice.",
        "Connected ESP32 IoT hardware ingestion layer to capture blood pressure, glucose, and cholesterol readings.",
        "Executed manual and automated functional testing using Katalon Studio.",
        "Containerized full application stack with Docker and deployed onto Linux Ubuntu server.",
      ],
      id: [
        "Merancang alur pengguna multi-role, dashboard, dan antarmuka asesmen menggunakan Figma.",
        "Mengembangkan frontend Next.js responsif yang terhubung dengan REST API Laravel dan proteksi rute.",
        "Membangun backend Laravel untuk autentikasi, data rekam medis pasien, bank soal, dan pelaporan terpusat.",
        "Mengimplementasikan modul skrining kesehatan terstandar (DSMQ, HSMBQ, DASS-21) dengan pencatatan riwayat.",
        "Mengintegrasikan purwarupa prediksi risiko Random Forest melalui microservice Flask REST API terpisah.",
        "Menghubungkan lapisan data IoT ESP32 untuk menerima pengukuran tekanan darah, gula darah, dan kolesterol.",
        "Melakukan pengujian fungsional manual dan otomatis menggunakan Katalon Studio.",
        "Mengontainerisasi seluruh arsitektur menggunakan Docker dan menerapkan deployment pada server Linux Ubuntu.",
      ],
    },
    keyModules: [
      {
        title: { en: "Tri-Role Access System", id: "Sistem Akses Tiga Peran" },
        description: {
          en: "Dedicated dashboards for Patients (personal records & tests), Healthcare Workers (patient vitals & screening), and Admins (content & user management).",
          id: "Dashboard khusus untuk Pasien (riwayat & tes), Tenaga Kesehatan (data vital & asesmen), dan Admin (manajemen konten & pengguna).",
        },
      },
      {
        title: { en: "Standardized Health Screening", id: "Skrining Kesehatan Terstandar" },
        description: {
          en: "Digital implementations of DSMQ, HSMBQ, and DASS-21 questionnaires with automatic scoring and history logging.",
          id: "Implementasi digital kuesioner DSMQ, HSMBQ, dan DASS-21 dengan kalkulasi skor dan penyimpanan riwayat otomatis.",
        },
      },
      {
        title: { en: "3-Stage Education Flow", id: "Alur Pembelajaran 3 Tahap" },
        description: {
          en: "Hypertension, Diabetes, and Mental Health tracks structured through Pre-Test -> Educational Media (Videos, Articles, PDF) -> Post-Test verification.",
          id: "Jalur edukasi Hipertensi, Diabetes, dan Kesehatan Mental dengan struktur Pre-Test -> Materi (Video, Artikel, PDF) -> Post-Test.",
        },
      },
      {
        title: { en: "Decision-Support ML & IoT Ingestion", id: "Integrasi IoT & Purwarupa ML" },
        description: {
          en: "ESP32 captures vital measurements directly to database; Flask API feeds data to Random Forest classifier for risk probability calculation.",
          id: "ESP32 mengirim data pemeriksaan vital ke basis data; Flask API memproses data menuju Random Forest untuk estimasi risiko.",
        },
      },
    ],
    verifiedEvidence: {
      en: [
        "Implemented 27 documented functional features across 3 user roles in collaboration with Puskesmas Padangsari.",
        "Integrated 3 standardized screening questionnaires and 3 structured learning tracks.",
        "Connected ESP32 hardware telemetry and Flask ML inference service in a unified Docker architecture.",
      ],
      id: [
        "Mengimplementasikan 27 fitur fungsional terdokumentasi lintas 3 role pengguna bersama Puskesmas Padangsari.",
        "Mengintegrasikan 3 kuesioner skrining terstandar dan 3 jalur pembelajaran terstruktur.",
        "Menghubungkan telemetri perangkat keras ESP32 dan layanan inferensi Flask ML dalam arsitektur Docker terpadu.",
      ],
    },
    claimLimitation: {
      en: "Machine Learning is strictly positioned as an exploratory risk-prediction and decision-support prototype. It is NOT a clinical diagnostic tool and does not claim validated medical accuracy or direct health outcome improvements.",
      id: "Machine Learning diposisikan secara tegas sebagai purwarupa prediksi risiko dan pendukung keputusan. Sistem ini BUKAN alat diagnosis medis dan tidak mengklaim akurasi klinis tervalidasi maupun perbaikan outcome kesehatan kuantitatif.",
    },
  },

  // --------------------------------------------------------------------------
  // 03. Dialisis Connect Edu (Web Application)
  // --------------------------------------------------------------------------
  {
    slug: "dialisis-connect-edu",
    category: "web-app",
    order: 3,
    featured: true,
    title: {
      en: "Dialisis Connect Edu",
      id: "Dialisis Connect Edu",
    },
    subtitle: {
      en: "Hemodialysis Patient Education & Interactive Community Platform",
      id: "Platform Edukasi Pasien Hemodialisis & Komunitas Interaktif",
    },
    projectType: {
      en: "Fullstack Web Application / Health Education & Community Platform",
      id: "Aplikasi Web Fullstack / Platform Edukasi Kesehatan & Komunitas",
    },
    role: {
      en: "Fullstack Developer",
      id: "Fullstack Developer",
    },
    stakeholder: {
      en: "Ikatan Perawat Dialisis Indonesia (IPDI) Jawa Tengah",
      id: "Ikatan Perawat Dialisis Indonesia (IPDI) Jawa Tengah",
    },
    period: {
      en: "2024",
      id: "2024",
    },
    status: {
      en: "Production Deployment",
      id: "Deployment Produksi",
    },
    coverImage: "/assets/projects/dialisis-connect-edu/cover.webp",
    documentationImages: [
      "/assets/projects/dialisis-connect-edu/documentation/01.webp",
      "/assets/projects/dialisis-connect-edu/documentation/02.webp",
      "/assets/projects/dialisis-connect-edu/documentation/03.webp",
      "/assets/projects/dialisis-connect-edu/documentation/04.webp",
      "/assets/projects/dialisis-connect-edu/documentation/05.webp",
      "/assets/projects/dialisis-connect-edu/documentation/06.webp",
      "/assets/projects/dialisis-connect-edu/documentation/07.webp",
    ],
    techStack: {
      core: ["Next.js", "React", "Laravel", "PHP", "MySQL"],
      architecture: ["Role-Based Access Control", "REST API", "Community Discussion Forum", "PDF & Video Embedding"],
      qaOrDeployment: ["Katalon Studio", "Docker", "Linux Ubuntu"],
    },
    metrics: [
      { label: { en: "User Roles", id: "Peran Pengguna" }, value: "3 (Patient, Healthcare Worker, Admin)" },
      { label: { en: "Media Formats", id: "Format Konten" }, value: "3 (YouTube, PDF Booklet, Forum)" },
      { label: { en: "Testing Method", id: "Metode Pengujian" }, value: "Manual & Automated (Katalon)" },
      { label: { en: "Stakeholder", id: "Mitra Kolaborasi" }, value: "IPDI Jawa Tengah" },
    ],
    summary: {
      en: "Dialisis Connect Edu is a fullstack health education and community platform created with IPDI Central Java to provide verified dialysis care information, downloadable guides, and an interactive discussion forum for patients and nurses.",
      id: "Dialisis Connect Edu adalah platform fullstack edukasi dan komunitas kesehatan yang dikembangkan bersama IPDI Jawa Tengah untuk menyediakan informasi terapi dialisis terverifikasi, panduan PDF, dan forum diskusi interaktif bagi pasien serta perawat.",
    },
    problemStatement: {
      en: "Patients undergoing renal replacement therapy and their families lacked a reliable, localized digital channel for validated dialysis care guidance and structured interaction with certified dialysis nurses.",
      id: "Pasien gagal ginjal kronis dan keluarga membutuhkan media digital yang terpercaya untuk mengakses panduan perawatan dialisis terverifikasi dan ruang interaksi terstruktur dengan perawat dialisis.",
    },
    systemSolution: {
      en: "Architected a responsive Next.js frontend backed by a Laravel REST API, featuring multi-role access, embedded YouTube video lectures, in-browser PDF booklet previews, and an interactive community discussion forum.",
      id: "Membangun frontend Next.js responsif dengan backend REST API Laravel, menyediakan akses multi-role, materi video YouTube terintegrasi, preview booklet PDF langsung di browser, dan forum diskusi komunitas interaktif.",
    },
    personalContributions: {
      en: [
        "Designed UI/UX wireframes, information architecture, and interactive prototypes in Figma.",
        "Developed responsive user interface in Next.js with modular component architecture.",
        "Engineered Laravel backend handling user authentication, role-based authorization, and content management.",
        "Implemented interactive community discussion forum enabling threads and replies between patients and nurses.",
        "Integrated YouTube video player and interactive in-browser PDF booklet previewer.",
        "Conducted manual and automated testing with Katalon Studio.",
        "Packaged and deployed application stack with Docker on Ubuntu Linux.",
      ],
      id: [
        "Merancang UI/UX wireframe, arsitektur informasi, dan purwarupa interaktif menggunakan Figma.",
        "Mengembangkan antarmuka responsif Next.js dengan arsitektur komponen modular.",
        "Membangun backend Laravel untuk autentikasi, otorisasi berbasis peran, dan manajemen konten edukasi.",
        "Mengimplementasikan forum diskusi interaktif untuk memfasilitasi komunikasi antara pasien dan tenaga kesehatan.",
        "Mengintegrasikan pemutar video YouTube dan preview booklet PDF interaktif langsung pada antarmuka.",
        "Melakukan pengujian manual dan otomatis menggunakan Katalon Studio.",
        "Mengemas dan menerapkan deployment aplikasi menggunakan Docker pada server Linux Ubuntu.",
      ],
    },
    keyModules: [
      {
        title: { en: "Role-Based Health Access", id: "Akses Berbasis Peran" },
        description: {
          en: "Tailored environments for Patients (learning & forum), Healthcare Workers (community moderation & guidance), and Admins (content CRUD).",
          id: "Antarmuka terarah untuk Pasien (edukasi & forum), Tenaga Kesehatan (bimbingan komunitas), dan Admin (manajemen konten).",
        },
      },
      {
        title: { en: "Multi-Format Education Delivery", id: "Penyajian Edukasi Multi-Format" },
        description: {
          en: "Curated learning paths on kidney care and transplantation delivered through articles, video streams, and PDF booklets.",
          id: "Materi terstruktur seputar perawatan ginjal dan dialisis yang disajikan dalam bentuk artikel, video, dan booklet PDF.",
        },
      },
      {
        title: { en: "Interactive Community Forum", id: "Forum Diskusi Komunitas" },
        description: {
          en: "Structured discussion boards fostering communication and mutual support between patients, caregivers, and medical practitioners.",
          id: "Wadah diskusi terstruktur untuk mendukung pertukaran informasi dan dukungan moral antara pasien, keluarga, dan praktisi medis.",
        },
      },
    ],
    verifiedEvidence: {
      en: [
        "Developed fullstack architecture deployed on Docker/Ubuntu in partnership with IPDI Central Java.",
        "Provided 3 distinct content delivery formats (video, PDF, interactive discussion).",
        "Validated with Katalon Studio automated and manual regression suites.",
      ],
      id: [
        "Mengembangkan arsitektur fullstack berbasis Docker/Ubuntu bekerja sama dengan IPDI Jawa Tengah.",
        "Menyediakan 3 format penyajian konten edukasi (video, PDF, dan forum interaktif).",
        "Tervalidasi dengan pengujian regresi manual dan otomatis menggunakan Katalon Studio.",
      ],
    },
    claimLimitation: {
      en: "Dialisis Connect Edu is an educational and community information platform. It does not provide automated clinical diagnosis or direct medical intervention.",
      id: "Dialisis Connect Edu adalah platform edukasi dan informasi komunitas. Sistem ini tidak menyediakan diagnosis klinis otomatis maupun intervensi medis langsung.",
    },
  },

  // --------------------------------------------------------------------------
  // 04. Nusa Dakwah (Web Application)
  // --------------------------------------------------------------------------
  {
    slug: "nusa-dakwah",
    category: "web-app",
    order: 4,
    featured: false,
    title: {
      en: "Nusa Dakwah",
      id: "Nusa Dakwah",
    },
    subtitle: {
      en: "Hierarchical Digital Islamic Content & Community Discussion Platform",
      id: "Platform Konten Dakwah Digital Bertingkat & Forum Diskusi",
    },
    projectType: {
      en: "Fullstack Web Application / Digital Content Platform",
      id: "Aplikasi Web Fullstack / Platform Konten Digital",
    },
    role: {
      en: "Fullstack Developer",
      id: "Fullstack Developer",
    },
    period: {
      en: "2024",
      id: "2024",
    },
    status: {
      en: "Production Deployment",
      id: "Deployment Produksi",
    },
    coverImage: "/assets/projects/nusa-dakwah/cover.webp",
    documentationImages: [
      "/assets/projects/nusa-dakwah/documentation/01.webp",
      "/assets/projects/nusa-dakwah/documentation/02.webp",
      "/assets/projects/nusa-dakwah/documentation/03.webp",
      "/assets/projects/nusa-dakwah/documentation/04.webp",
      "/assets/projects/nusa-dakwah/documentation/05.webp",
      "/assets/projects/nusa-dakwah/documentation/06.webp",
    ],
    techStack: {
      core: ["Next.js", "React", "Laravel", "PHP", "MySQL"],
      architecture: ["RESTful API", "Hierarchical Content Hierarchy", "Nested Discussion Forum", "Input Sanitization"],
      qaOrDeployment: ["Katalon Studio", "Docker", "Linux Ubuntu"],
    },
    metrics: [
      { label: { en: "Content Hierarchy", id: "Hierarki Konten" }, value: "3 Levels (Module, Sub-Module, Content)" },
      { label: { en: "User Roles", id: "Peran Pengguna" }, value: "2 (Admin & User)" },
      { label: { en: "Discussion Depth", id: "Kedalaman Diskusi" }, value: "Nested Replies Supported" },
      { label: { en: "QA Verification", id: "Verifikasi QA" }, value: "Katalon Studio" },
    ],
    summary: {
      en: "Nusa Dakwah is a fullstack digital content platform featuring a 3-tier educational taxonomy (Modules -> Sub-Modules -> Content), integrated YouTube lecture streams, and an interactive discussion forum with nested replies.",
      id: "Nusa Dakwah adalah platform konten dakwah digital fullstack dengan hierarki 3 tingkat (Modul -> Sub Modul -> Konten), video kajian YouTube terintegrasi, dan forum diskusi dengan balasan bersarang (nested reply).",
    },
    problemStatement: {
      en: "Digital religious educational materials are frequently scattered across unstructured blogs without structured learning paths, centralized content search, or contextual discussions per topic.",
      id: "Materi kajian digital kerap tersebar secara tidak terstruktur tanpa alur pembelajaran bertahap, pencarian terpusat, maupun ruang diskusi kontekstual per materi.",
    },
    systemSolution: {
      en: "Built a structured platform linking Next.js and a Laravel RESTful API with a 3-tier content hierarchy, global search, nested comment discussions with moderation, and comprehensive admin management.",
      id: "Membangun platform terstruktur yang menghubungkan Next.js dan RESTful API Laravel dengan hierarki konten 3 tingkat, pencarian global, forum diskusi bersarang dengan moderasi, dan dashboard admin komprehensif.",
    },
    personalContributions: {
      en: [
        "Designed UI/UX wireframes, landing pages, content hierarchies, and admin management layouts in Figma.",
        "Built Next.js frontend with live search, responsive content readers, and interactive forum interfaces.",
        "Engineered Laravel RESTful API backend handling authentication, content management, and forum interactions.",
        "Implemented 3-tier content architecture (Modules -> Sub-Modules -> Content Materials) with MySQL schema optimization.",
        "Developed discussion forum system supporting top-level comments and nested reply hierarchies.",
        "Implemented backend input validation and HTML sanitization on discussion submissions.",
        "Executed manual and automated testing with Katalon Studio and deployed via Docker on Ubuntu Linux.",
      ],
      id: [
        "Merancang UI/UX wireframe, landing page, hierarki konten, dan dashboard admin menggunakan Figma.",
        "Mengembangkan frontend Next.js dengan pencarian langsung, pembaca konten responsif, dan antarmuka forum interaktif.",
        "Membangun backend RESTful API Laravel untuk autentikasi, manajemen konten, dan interaksi diskusi.",
        "Mengimplementasikan arsitektur konten 3 tingkat (Modul -> Sub Modul -> Konten Materi) dengan optimasi skema MySQL.",
        "Mengembangkan forum diskusi yang mendukung komentar utama dan balasan bersarang (nested replies).",
        "Menerapkan validasi input dan sanitasi data pada backend untuk mencegah injeksi pada forum.",
        "Menjalankan pengujian manual dan otomatis menggunakan Katalon Studio serta deployment via Docker pada Linux Ubuntu.",
      ],
    },
    keyModules: [
      {
        title: { en: "3-Tier Content Hierarchy", id: "Hierarki Konten 3 Tingkat" },
        description: {
          en: "Organized learning paths structured as Modules (broad topics) -> Sub-Modules (chapters) -> Content (specific lessons).",
          id: "Struktur materi terorganisir dari Modul (topik besar) -> Sub Modul (bab) -> Konten Materi (pelajaran spesifik).",
        },
      },
      {
        title: { en: "Integrated Lesson Page", id: "Halaman Materi Terpadu" },
        description: {
          en: "Combines text articles, illustrative graphics, embedded YouTube video lectures, and topic-specific comments in one view.",
          id: "Menggabungkan artikel teks, gambar pendukung, pemutar video YouTube, dan diskusi per materi dalam satu tampilan.",
        },
      },
      {
        title: { en: "Nested Discussion Forum", id: "Forum Diskusi Bersarang" },
        description: {
          en: "Enables multi-level threaded conversations between community members with admin moderation controls.",
          id: "Memfasilitasi diskusi bertingkat antar pengguna dengan kontrol moderasi dari admin.",
        },
      },
    ],
    verifiedEvidence: {
      en: [
        "Structured 3-tier content model and responsive frontend connected to Laravel RESTful API.",
        "Automated and manual test suites validated using Katalon Studio.",
        "Dockerized deployment on Linux Ubuntu.",
      ],
      id: [
        "Menerapkan model data bertingkat 3 level dan frontend responsif terhubung ke RESTful API Laravel.",
        "Rangkaian pengujian manual dan otomatis tervalidasi menggunakan Katalon Studio.",
        "Deployment terisolasi menggunakan Docker pada Linux Ubuntu.",
      ],
    },
  },

  // --------------------------------------------------------------------------
  // 05. SIMASTOK SHR Jaya Motor (Web Application)
  // --------------------------------------------------------------------------
  {
    slug: "simastok",
    category: "web-app",
    order: 5,
    featured: false,
    title: {
      en: "SIMASTOK SHR Jaya Motor",
      id: "SIMASTOK SHR Jaya Motor",
    },
    subtitle: {
      en: "Spare-Parts Inventory Management & Stock Reporting System",
      id: "Sistem Informasi Manajemen Stok & Pelaporan Suku Cadang",
    },
    projectType: {
      en: "Fullstack Web Application / Inventory Management System",
      id: "Aplikasi Web Fullstack / Sistem Manajemen Inventaris",
    },
    role: {
      en: "Fullstack Developer",
      id: "Fullstack Developer",
    },
    period: {
      en: "2024",
      id: "2024",
    },
    status: {
      en: "Production Deployment",
      id: "Deployment Produksi",
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
    techStack: {
      core: ["Laravel", "PHP", "MySQL", "MVC"],
      architecture: ["Automatic Stock Update", "Insufficient Stock Validation", "Date-Range PDF Export", "Route Protection"],
      qaOrDeployment: ["Katalon Studio", "Docker", "Linux Ubuntu"],
    },
    metrics: [
      { label: { en: "Master Modules", id: "Modul Master Data" }, value: "3 (Items, Categories, Suppliers)" },
      { label: { en: "Transaction Flows", id: "Alur Transaksi" }, value: "2 (Stock In & Stock Out)" },
      { label: { en: "Reporting", id: "Pelaporan" }, value: "Date Range & PDF Export" },
      { label: { en: "QA Tooling", id: "Alat Pengujian" }, value: "Katalon Studio" },
    ],
    summary: {
      en: "SIMASTOK SHR Jaya Motor is an inventory management web system built using Laravel and MySQL to streamline spare parts tracking, automated stock level calculations, and period-based PDF report generation.",
      id: "SIMASTOK SHR Jaya Motor adalah sistem informasi manajemen stok berbasis Laravel dan MySQL untuk mencatat persediaan suku cadang, otomatisasi pembaruan stok, dan pembuatan laporan mutasi berformat PDF.",
    },
    problemStatement: {
      en: "Manual paper stock ledgers resulted in inventory discrepancies, unrecorded outgoing parts, and time-consuming manual report compilation during monthly supplier audits.",
      id: "Pencatatan stok fisik secara manual menyebabkan selisih jumlah barang, pengeluaran suku cadang tidak tercatat, dan proses rekap laporan bulanan yang memakan waktu.",
    },
    systemSolution: {
      en: "Developed an MVC web application featuring master data CRUD (Items, Categories, Suppliers), automated stock updates on incoming/outgoing transactions, insufficient stock validation, and filtered PDF report export.",
      id: "Mengembangkan aplikasi web MVC dengan master data (Barang, Kategori, Supplier), pembaruan stok otomatis saat transaksi barang masuk/keluar, validasi stok tidak mencukupi, dan ekspor laporan PDF berbasis periode.",
    },
    personalContributions: {
      en: [
        "Designed UI/UX wireframes, inventory management pages, and reporting dashboards in Figma.",
        "Built fullstack application using Laravel MVC architecture and MySQL database.",
        "Implemented authentication, role-based access control, route protection, and secure password hashing.",
        "Engineered automatic stock update workflows with strict validation preventing negative inventory.",
        "Developed date-range filtered reporting with tabular summaries and automated PDF export.",
        "Conducted functional and regression testing with Katalon Studio.",
        "Containerized application with Docker and deployed to Ubuntu Linux server.",
      ],
      id: [
        "Merancang UI/UX wireframe, halaman inventaris, dan dashboard pelaporan menggunakan Figma.",
        "Mengembangkan aplikasi fullstack menggunakan pola arsitektur MVC Laravel dan basis data MySQL.",
        "Menerapkan autentikasi, kontrol akses berbasis peran, proteksi rute, dan hashing password yang aman.",
        "Merekayasa alur pembaruan stok otomatis dengan validasi ketat untuk mencegah stok bernilai negatif.",
        "Membangun modul laporan berfilter rentang tanggal dengan ringkasan mutasi dan ekspor file PDF otomatis.",
        "Menjalankan pengujian fungsional dan regresi menggunakan Katalon Studio.",
        "Mengontainerisasi aplikasi menggunakan Docker dan melakukan deployment pada server Linux Ubuntu.",
      ],
    },
    keyModules: [
      {
        title: { en: "Master Data Management", id: "Manajemen Master Data" },
        description: {
          en: "CRUD operations with duplicate prevention across Spare Parts, Categories, and Supplier databases.",
          id: "Operasi CRUD dengan pencegahan duplikasi data pada entitas Barang, Kategori, dan Supplier.",
        },
      },
      {
        title: { en: "Stock In & Stock Out Workflows", id: "Alur Barang Masuk & Keluar" },
        description: {
          en: "Transaction logging with automatic inventory recalculation and insufficient stock rejection.",
          id: "Pencatatan mutasi barang dengan kalkulasi stok otomatis dan validasi penolakan jika stok tidak mencukupi.",
        },
      },
      {
        title: { en: "Auditable Reporting & PDF Export", id: "Pelaporan & Ekspor PDF" },
        description: {
          en: "Date-range filtered inventory movement summaries ready for export to PDF documents for business audits.",
          id: "Ringkasan pergerakan stok berdasarkan rentang tanggal yang dapat diekspor langsung ke format PDF untuk audit.",
        },
      },
    ],
    verifiedEvidence: {
      en: [
        "Delivered fullstack inventory system managing 3 master data entities and 2 transaction flows.",
        "Validated with Katalon Studio manual and automated test suites.",
        "Deployed via Docker on Linux Ubuntu.",
      ],
      id: [
        "Mengembangkan sistem inventaris fullstack yang mengelola 3 entitas master data dan 2 alur transaksi mutasi.",
        "Tervalidasi dengan rangkaian pengujian manual dan otomatis Katalon Studio.",
        "Menerapkan deployment menggunakan Docker pada Linux Ubuntu.",
      ],
    },
  },

  // --------------------------------------------------------------------------
  // 06. Machine Learning Model for Heart Attack Risk Prediction (Machine Learning)
  // --------------------------------------------------------------------------
  {
    slug: "ml-for-heart-attack-risk-prediction",
    category: "ml",
    order: 6,
    featured: true,
    title: {
      en: "Machine Learning Model for Heart Attack Risk Prediction",
      id: "Model Machine Learning untuk Prediksi Risiko Serangan Jantung",
    },
    subtitle: {
      en: "Binary Classification Pipeline & Containerized REST Inference Service",
      id: "Pipeline Klasifikasi Biner & Layanan Inferensi REST Terkontainerisasi",
    },
    projectType: {
      en: "Machine Learning / Binary Classification / Predictive Modeling",
      id: "Machine Learning / Klasifikasi Biner / Pemodelan Prediktif",
    },
    role: {
      en: "Machine Learning Developer",
      id: "Machine Learning Developer",
    },
    period: {
      en: "2024",
      id: "2024",
    },
    status: {
      en: "ML Prototype & Deployed Inference Service",
      id: "Purwarupa ML & Layanan Inferensi Aktif",
    },
    coverImage: "/assets/projects/ml-for-heart-attack-risk-prediction/cover.webp",
    documentationImages: [
      "/assets/projects/ml-for-heart-attack-risk-prediction/documentation/01.webp",
      "/assets/projects/ml-for-heart-attack-risk-prediction/documentation/02.webp",
    ],
    techStack: {
      core: ["Python", "Scikit-learn", "Pandas", "NumPy"],
      architecture: ["Random Forest Classifier", "SMOTE Balancing", "RandomizedSearchCV", "Flask REST API"],
      qaOrDeployment: ["Joblib Model Serialization", "Docker", "Linux Ubuntu"],
    },
    metrics: [
      { label: { en: "Dataset Size", id: "Ukuran Dataset" }, value: "158,355 Observations (22 Columns)" },
      { label: { en: "Predictor Features", id: "Fitur Prediktor" }, value: "21 Features (Demographic/Clinical)" },
      { label: { en: "Model Performance", id: "Performa Model" }, value: "71.93% Accuracy · 0.8015 ROC-AUC" },
      { label: { en: "Inference Stack", id: "Stack Inferensi" }, value: "Flask REST API + Docker" },
    ],
    summary: {
      en: "An end-to-end machine learning classification prototype predicting heart attack risk probability across 21 demographic, clinical, and lifestyle features, evaluated across 4 algorithms and served via a containerized Flask REST API.",
      id: "Purwarupa klasifikasi machine learning end-to-end untuk memprediksi probabilitas risiko serangan jantung berdasarkan 21 fitur demografis, klinis, dan gaya hidup, dievaluasi dari 4 algoritma dan disediakan melalui Flask REST API.",
    },
    problemStatement: {
      en: "Identifying early cardiovascular risk indicators across high-dimensional patient data requires rigorous preprocessing, class imbalance correction, and model serving without retraining on every query.",
      id: "Identifikasi indikator awal risiko kardiovaskular pada data berdimensi tinggi membutuhkan preprocessing ketat, penanganan ketidakseimbangan kelas, dan penyediaan model siap inferensi tanpa perlu pelatihan ulang.",
    },
    systemSolution: {
      en: "Built a complete ML pipeline on 158,355 records: EDA, MinMaxScaler, stratified 80:20 split, SMOTE balancing, RandomizedSearchCV hyperparameter tuning, model comparison, Joblib serialization, and Flask REST API inference endpoints.",
      id: "Membangun pipeline ML lengkap pada 158.355 data: EDA, MinMaxScaler, stratified split 80:20, penyeimbangan SMOTE, tuning RandomizedSearchCV, komparasi model, serialisasi Joblib, dan endpoint inferensi Flask REST API.",
    },
    personalContributions: {
      en: [
        "Conducted Exploratory Data Analysis (EDA) examining feature distributions, correlations, and target relationships.",
        "Implemented preprocessing pipeline: categorical encoding (5 features) and MinMaxScaler (21 features).",
        "Applied stratified train-test split (126,684 training vs. 31,671 test) and SMOTE balancing on training set (151,766 balanced samples).",
        "Tuned hyperparameters with RandomizedSearchCV (F1-score optimized) and compared 4 algorithms (Random Forest, Linear SVM, KNN, Logistic Regression).",
        "Selected Random Forest for achieving highest Accuracy (71.93%) and highest ROC-AUC (0.8015).",
        "Serialized model and preprocessing artifacts into `.pkl` format using Joblib.",
        "Built Flask REST API with POST (data ingestion & inference) and GET (predictions & risk factors) endpoints.",
        "Containerized inference service with Docker and deployed to Linux Ubuntu environment.",
      ],
      id: [
        "Melakukan Exploratory Data Analysis (EDA) untuk memeriksa distribusi data, matriks korelasi, dan karakteristik prediktor.",
        "Menerapkan pipeline preprocessing: encoding data kategorikal (5 fitur) dan MinMaxScaler (21 fitur).",
        "Menerapkan stratified train-test split (126.684 data latih vs. 31.671 data uji) dan penyeimbangan SMOTE pada data latih (151.766 data seimbang).",
        "Melakukan hyperparameter tuning dengan RandomizedSearchCV dan membandingkan 4 algoritma (Random Forest, Linear SVM, KNN, Logistic Regression).",
        "Memilih Random Forest karena menghasilkan Accuracy tertinggi (71,93%) dan ROC-AUC tertinggi (0,8015).",
        "Menyimpan model dan artefak preprocessing ke format `.pkl` menggunakan Joblib untuk inferensi efisien.",
        "Membangun Flask REST API dengan endpoint POST (penerimaan data & inferensi) dan GET (hasil & faktor risiko).",
        "Mengontainerisasi service inferensi menggunakan Docker dan melakukan deployment pada Linux Ubuntu.",
      ],
    },
    keyModules: [
      {
        title: { en: "Algorithmic Benchmark", id: "Komparasi Algoritma" },
        description: {
          en: "Compared Random Forest (71.93% Acc, 0.8015 ROC-AUC), Logistic Regression (0.6618 F1), KNN (70.40% Recall), and Linear SVM.",
          id: "Membandingkan Random Forest (71,93% Akurasi, 0,8015 ROC-AUC), Logistic Regression (0,6618 F1), KNN (70,40% Recall), dan Linear SVM.",
        },
      },
      {
        title: { en: "Preprocessing & SMOTE Pipeline", id: "Pipeline Preprocessing & SMOTE" },
        description: {
          en: "MinMaxScaler normalization and synthetic minority oversampling (SMOTE) balanced the training set to 50:50 distribution.",
          id: "Normalisasi MinMaxScaler dan oversampling SMOTE pada data latih menghasilkan distribusi kelas seimbang 50:50.",
        },
      },
      {
        title: { en: "Containerized Flask REST Service", id: "Layanan REST Flask Terkontainerisasi" },
        description: {
          en: "Loads serialized Joblib `.pkl` artifacts to execute fast inference on 21 patient input features without model retraining.",
          id: "Memuat artefak serialisasi Joblib `.pkl` untuk menjalankan inferensi cepat terhadap 21 fitur input tanpa perlu training ulang.",
        },
      },
    ],
    verifiedEvidence: {
      en: [
        "Trained on 158,355 records with documented 71.93% Accuracy and 0.8015 ROC-AUC test performance.",
        "Delivered serialized `.pkl` artifact served via Flask REST API with POST/GET routes.",
        "Containerized with Docker on Linux Ubuntu.",
      ],
      id: [
        "Dilatih pada 158.355 data observasi dengan catatan performa uji 71,93% Akurasi dan 0,8015 ROC-AUC.",
        "Menghasilkan artefak serialisasi `.pkl` yang disediakan melalui Flask REST API dengan rute POST/GET.",
        "Terkontainerisasi menggunakan Docker pada Linux Ubuntu.",
      ],
    },
    claimLimitation: {
      en: "This project is strictly an engineering prototype for predictive risk classification. It does NOT constitute a clinical diagnosis or medical instrument, and feature importances represent global mathematical weights rather than individual causal explanations.",
      id: "Proyek ini murni merupakan purwarupa rekayasa untuk klasifikasi risiko prediktif. Sistem ini BUKAN alat diagnosis medis, dan feature importance mencerminkan bobot matematis global bukan penjelasan kausal per pasien.",
    },
  },

  // --------------------------------------------------------------------------
  // 07. Speech-to-Text System (Machine Learning)
  // --------------------------------------------------------------------------
  {
    slug: "speech-to-text-system",
    category: "ml",
    order: 7,
    featured: false,
    title: {
      en: "Speech-to-Text System",
      id: "Sistem Speech-to-Text",
    },
    subtitle: {
      en: "Automatic Speech Recognition & Automated Video Subtitling Pipeline",
      id: "Pipeline Automatic Speech Recognition & Pembuatan Subtitle Video Otomatis",
    },
    projectType: {
      en: "AI/ML Application / Automatic Speech Recognition & Audio Processing",
      id: "Aplikasi AI/ML / Automatic Speech Recognition & Pemrosesan Audio",
    },
    role: {
      en: "Machine Learning / AI Developer",
      id: "Machine Learning / AI Developer",
    },
    period: {
      en: "2024",
      id: "2024",
    },
    status: {
      en: "Completed Workflow",
      id: "Selesai (Completed)",
    },
    coverImage: "/assets/projects/speech-to-text-system/cover.webp",
    documentationImages: [
      "/assets/projects/speech-to-text-system/documentation/01.webp",
    ],
    techStack: {
      core: ["Python", "Hugging Face Transformers", "Wav2Vec2", "FFmpeg"],
      architecture: ["facebook/wav2vec2-base-960h", "Audio Chunking Pipeline", "SRT Generation", "Burned-in Video Subtitles"],
      qaOrDeployment: ["Google Colab", "Librosa", "Pandas"],
    },
    metrics: [
      { label: { en: "ASR Pretrained Model", id: "Model ASR Pretrained" }, value: "facebook/wav2vec2-base-960h" },
      { label: { en: "Audio Standard", id: "Standar Audio" }, value: "16 kHz Mono Sampling" },
      { label: { en: "Export Formats", id: "Format Ekspor" }, value: "3 Formats (TXT, CSV, JSON)" },
      { label: { en: "Subtitle Output", id: "Output Subtitle" }, value: "SRT & Burned-in MP4" },
    ],
    summary: {
      en: "An end-to-end Automatic Speech Recognition (ASR) workflow utilizing pretrained Wav2Vec2 to extract, preprocess, transcribe audio from audio/video files, generate timestamped SRT subtitles, and burn subtitles into output videos.",
      id: "Workflow Automatic Speech Recognition (ASR) end-to-end yang menggunakan model pretrained Wav2Vec2 untuk mengekstrak, memproses, dan mentranskripsi audio dari file audio/video, menghasilkan subtitle SRT, serta menanam subtitle pada video.",
    },
    problemStatement: {
      en: "Transcribing long-duration multimedia recordings and syncing accurate subtitles manually is labor-intensive and prone to timing inaccuracies across long video files.",
      id: "Transkripsi rekaman multimedia berdurasi panjang dan penyelarasan waktu subtitle secara manual membutuhkan waktu lama dan rentan terhadap ketidaktepatan sinkronisasi.",
    },
    systemSolution: {
      en: "Engineered an end-to-end Python pipeline with FFmpeg audio extraction, 16 kHz mono conversion, audio chunking, Wav2Vec2 inference, multi-format transcript generation (TXT, CSV, JSON), and automated burned-in subtitle rendering.",
      id: "Mengembangkan pipeline Python end-to-end dengan ekstraksi audio FFmpeg, konversi mono 16 kHz, pemotongan audio (chunking), inferensi Wav2Vec2, ekspor transkripsi (TXT, CSV, JSON), dan penanaman subtitle pada video.",
    },
    personalContributions: {
      en: [
        "Developed end-to-end Speech-to-Text workflow in Python utilizing Google Colab environment.",
        "Integrated pretrained `facebook/wav2vec2-base-960h` via Hugging Face Transformers.",
        "Constructed FFmpeg extraction pipeline to strip audio streams from video files.",
        "Implemented audio preprocessing standardizing signals into 16 kHz mono waveforms.",
        "Designed audio chunking logic to process long-form recordings sequentially without memory overflow.",
        "Generated multi-format transcript files in TXT, CSV, and JSON structured data formats.",
        "Automated timestamped SRT subtitle generation and FFmpeg burned-in video subtitle composition.",
      ],
      id: [
        "Mengembangkan workflow Speech-to-Text end-to-end menggunakan Python pada environment Google Colab.",
        "Mengintegrasikan model pretrained `facebook/wav2vec2-base-960h` melalui Hugging Face Transformers.",
        "Membangun pipeline FFmpeg untuk mengekstrak audio dari berbagai format video.",
        "Mengimplementasikan preprocessing audio menjadi format mono dengan sampling rate 16 kHz.",
        "Merancang mekanisme audio chunking untuk menangani file berdurasi panjang tanpa kendala memori.",
        "Menghasilkan output file transkripsi dalam format terstruktur TXT, CSV, dan JSON.",
        "Mengotomatisasi pembuatan file subtitle SRT berbasis timestamp dan penanaman subtitle pada video via FFmpeg.",
      ],
    },
    keyModules: [
      {
        title: { en: "Audio Extraction & Preprocessing", id: "Ekstraksi & Preprocessing Audio" },
        description: {
          en: "FFmpeg pipeline converts raw audio or video files into standardized 16 kHz mono waveform chunks.",
          id: "Pipeline FFmpeg mengubah input audio/video menjadi potongan gelombang suara mono 16 kHz terstandar.",
        },
      },
      {
        title: { en: "Wav2Vec2 ASR Inference", id: "Inferensi ASR Wav2Vec2" },
        description: {
          en: "Pretrained Hugging Face Wav2Vec2 model processes chunked acoustic representations into raw text transcriptions.",
          id: "Model Wav2Vec2 memproses representasi akustik audio menjadi teks transkripsi.",
        },
      },
      {
        title: { en: "Multi-Format Export & Burned Subtitles", id: "Ekspor Multi-Format & Burned Subtitle" },
        description: {
          en: "Exports transcription to TXT, CSV, JSON, generates SRT files, and produces videos with burned-in subtitles.",
          id: "Mengekspor hasil ke format TXT, CSV, JSON, membuat file SRT, dan menghasilkan video akhir dengan subtitle tertanam.",
        },
      },
    ],
    verifiedEvidence: {
      en: [
        "Engineered end-to-end ASR pipeline using pretrained `facebook/wav2vec2-base-960h`.",
        "Produced 3 transcript export formats (TXT, CSV, JSON) and timestamped SRT subtitle files.",
        "Generated burned-in subtitled video evidence with FFmpeg.",
      ],
      id: [
        "Merekayasa pipeline ASR end-to-end menggunakan model pretrained `facebook/wav2vec2-base-960h`.",
        "Menghasilkan 3 format ekspor transkripsi (TXT, CSV, JSON) dan file subtitle SRT berbasis waktu.",
        "Membuat bukti video akhir dengan subtitle tertanam menggunakan FFmpeg.",
      ],
    },
    claimLimitation: {
      en: "This project uses the pretrained `facebook/wav2vec2-base-960h` model and does not claim custom fine-tuning or proprietary Word Error Rate (WER) benchmarks.",
      id: "Proyek ini menggunakan model pretrained `facebook/wav2vec2-base-960h` dan tidak mengklaim pelatihan ulang (fine-tuning) khusus maupun tolok ukur Word Error Rate (WER) komparatif.",
    },
  },

  // --------------------------------------------------------------------------
  // 08. Thermal Printer Service (Mobile)
  // --------------------------------------------------------------------------
  {
    slug: "thermal-printer-service",
    category: "mobile",
    order: 8,
    featured: true,
    title: {
      en: "Thermal Printer Service",
      id: "Thermal Printer Service",
    },
    subtitle: {
      en: "Native Android ESC/POS Bluetooth Printing & PDF Rasterization Driver",
      id: "Driver Pencetakan Bluetooth ESC/POS & Rasterisasi PDF Native Android",
    },
    projectType: {
      en: "Android Native Application / Printing Utility / Hardware Integration",
      id: "Aplikasi Native Android / Utilitas Pencetakan / Integrasi Perangkat Keras",
    },
    role: {
      en: "Android Developer",
      id: "Android Developer",
    },
    period: {
      en: "2024",
      id: "2024",
    },
    status: {
      en: "Completed Utility",
      id: "Selesai (Completed)",
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
    techStack: {
      core: ["Kotlin", "Android SDK", "Android Print Framework", "Bluetooth RFCOMM/SPP"],
      architecture: ["ESC/POS Protocol", "PdfRenderer Rasterization", "Single-Thread Executor", "SharedPreferences JSON"],
      qaOrDeployment: ["Android 12+ Permissions", "Cancellable Print Jobs", "RecyclerView"],
    },
    metrics: [
      { label: { en: "Paper Formats", id: "Format Kertas" }, value: "58 mm (432 dots) & 80 mm (576 dots)" },
      { label: { en: "DPI Config", id: "Konfigurasi DPI" }, value: "203 DPI (24-dot Double Density)" },
      { label: { en: "Bluetooth Retry", id: "Koneksi Ulang BT" }, value: "4-Step Backoff (0/200/500/1000ms)" },
      { label: { en: "Chunk Transmission", id: "Transmisi Chunk" }, value: "1,024-Byte Safe Packet Writes" },
    ],
    summary: {
      en: "A native Kotlin Android printing service that hooks into the Android Print Framework to rasterize documents via PdfRenderer, convert bitmaps into 203 DPI ESC/POS monochrome commands, and transmit them via Bluetooth RFCOMM to 58 mm and 80 mm thermal printers.",
      id: "Aplikasi utilitas pencetakan native Kotlin Android yang terintegrasi dengan Android Print Framework untuk merasterisasi dokumen via PdfRenderer, mengonversi bitmap ke format monokrom ESC/POS 203 DPI, dan mengirimkannya via Bluetooth RFCOMM ke printer 58 mm dan 80 mm.",
    },
    problemStatement: {
      en: "Standard Android applications lack native support for printing standard system documents to low-cost ESC/POS thermal receipt printers over Bluetooth without proprietary SDKs.",
      id: "Aplikasi Android standar tidak memiliki dukungan native untuk mencetak dokumen sistem langsung ke printer struk termal ESC/POS via Bluetooth tanpa SDK berbayar dari vendor tertentu.",
    },
    systemSolution: {
      en: "Developed a custom Android PrintService pipeline: document interception -> PdfRenderer bitmap rendering -> whitespace cropping & calibration -> 24-dot double density ESC/POS conversion -> chunked 1,024-byte Bluetooth RFCOMM transfer on a background thread.",
      id: "Membangun pipeline Android PrintService kustom: penerimaan dokumen -> rendering bitmap PdfRenderer -> pemotongan whitespace & kalibrasi -> konversi ESC/POS 24-dot double density -> transfer chunk 1.024 byte Bluetooth RFCOMM pada background thread.",
    },
    personalContributions: {
      en: [
        "Engineered native Kotlin Android application with custom PrintService and PrinterDiscoverySession.",
        "Constructed PDF-to-raster image processing pipeline using PdfRenderer with whitespace cropping, scaling, and horizontal offset calibration.",
        "Implemented ESC/POS protocol encoder generating 24-dot double-density monochrome raster data.",
        "Built Bluetooth RFCOMM/SPP manager with Android 12+ runtime permissions, 4-step backoff retry, and socket cleanup.",
        "Implemented chunked transmission writing maximum 1,024 bytes per packet to prevent buffer overflows.",
        "Isolated print operations onto a dedicated single-thread ExecutorService with cancellable CancellationToken jobs.",
        "Developed multiple printer profile management UI using RecyclerView and SharedPreferences persistence.",
      ],
      id: [
        "Mengembangkan aplikasi native Kotlin dengan PrintService dan PrinterDiscoverySession kustom.",
        "Membangun pipeline pemrosesan PDF-to-raster menggunakan PdfRenderer dengan pemotongan whitespace, penskalaan, dan offset horizontal.",
        "Mengimplementasikan encoder protokol ESC/POS yang menghasilkan data raster monokrom 24-dot double density.",
        "Membangun manajer Bluetooth RFCOMM/SPP dengan penanganan izin Android 12+, retry 4 tahap, dan pembersihan socket.",
        "Menerapkan transmisi chunk maksimal 1.024 byte per penulisan paket untuk mencegah buffer overflow pada printer.",
        "Memisahkan proses pencetakan ke background thread menggunakan dedicated single-thread ExecutorService dengan pembatalan job.",
        "Mengembangkan antarmuka manajemen profil printer menggunakan RecyclerView dan penyimpanan lokal SharedPreferences.",
      ],
    },
    keyModules: [
      {
        title: { en: "Android PrintService Integration", id: "Integrasi Android PrintService" },
        description: {
          en: "Enables thermal printers to appear natively in the system-wide Android print dialog across any app.",
          id: "Membuat printer termal Bluetooth muncul langsung pada dialog pencetakan sistem Android di seluruh aplikasi.",
        },
      },
      {
        title: { en: "PDF-to-ESC/POS Raster Pipeline", id: "Pipeline Raster PDF-ke-ESC/POS" },
        description: {
          en: "Renders PDF to bitmap, removes white borders, adjusts scale/alignment, and encodes into 203 DPI monochrome raster bytes.",
          id: "Merender PDF ke bitmap, memotong margin kosong, menyesuaikan skala, dan mengonversi ke byte raster monokrom 203 DPI.",
        },
      },
      {
        title: { en: "Resilient Bluetooth RFCOMM Manager", id: "Manajer Bluetooth RFCOMM Andal" },
        description: {
          en: "Features 4-step exponential backoff retry (0, 200, 500, 1000 ms), 1,024-byte chunked writes, and graceful cancellation.",
          id: "Dilengkapi retry 4 tahap (0, 200, 500, 1000 ms), penulisan paket chunk 1.024 byte, dan pembatalan tugas yang aman.",
        },
      },
    ],
    verifiedEvidence: {
      en: [
        "Engineered full pipeline supporting 58 mm (432 dots) and 80 mm (576 dots) thermal printers at 203 DPI.",
        "Implemented 4-stage connection retry logic and chunked 1,024-byte Bluetooth packet delivery.",
        "Verified background execution via dedicated single-thread executor with Android 12+ runtime permissions.",
      ],
      id: [
        "Merekayasa pipeline pencetakan yang mendukung printer 58 mm (432 dots) dan 80 mm (576 dots) pada 203 DPI.",
        "Menerapkan logika retry koneksi 4 tahap dan pengiriman paket Bluetooth chunk 1.024 byte.",
        "Terverifikasi berjalan pada background thread via ExecutorService mandiri dengan kepatuhan izin Android 12+.",
      ],
    },
    claimLimitation: {
      en: "This service is built for standard ESC/POS-compliant thermal printers. It does not claim universal compatibility with non-standard proprietary protocols or unverified speed benchmarks.",
      id: "Aplikasi ini dibangun untuk printer termal berstandar perintah ESC/POS. Sistem tidak mengklaim kompatibilitas universal dengan protokol non-standar atau benchmark kecepatan yang belum diuji.",
    },
  },

  // --------------------------------------------------------------------------
  // 09. Footy Standings (Mobile)
  // --------------------------------------------------------------------------
  {
    slug: "footy-standings",
    category: "mobile",
    order: 9,
    featured: false,
    title: {
      en: "Footy Standings",
      id: "Footy Standings",
    },
    subtitle: {
      en: "Multi-League Football Statistics & Live Data REST API Mobile App",
      id: "Aplikasi Mobile Statistik Sepak Bola Multi-Liga Berbasis REST API",
    },
    projectType: {
      en: "Mobile Application / REST API Integration",
      id: "Aplikasi Mobile / Integrasi REST API",
    },
    role: {
      en: "Flutter Developer",
      id: "Flutter Developer",
    },
    period: {
      en: "2024",
      id: "2024",
    },
    status: {
      en: "Completed Application",
      id: "Selesai (Completed)",
    },
    coverImage: "/assets/projects/footy-standings/cover.webp",
    documentationImages: [
      "/assets/projects/footy-standings/documentation/01.webp",
      "/assets/projects/footy-standings/documentation/02.webp",
      "/assets/projects/footy-standings/documentation/03.webp",
      "/assets/projects/footy-standings/documentation/04.webp",
    ],
    techStack: {
      core: ["Flutter", "Dart", "Football Data REST API"],
      architecture: ["Asynchronous FutureBuilder", "Structured Data Models", "Material Design UI", "url_launcher"],
      qaOrDeployment: ["HTTP JSON Parsing", "Multi-State Handling", "Image Fallbacks"],
    },
    metrics: [
      { label: { en: "Supported Leagues", id: "Kompetisi Liga" }, value: "6 European Competitions" },
      { label: { en: "Core Features", id: "Fitur Utama" }, value: "4 Screens (Standings, Fixtures, Scorers, Details)" },
      { label: { en: "Data Models", id: "Model Data" }, value: "4 Structured Dart Classes" },
      { label: { en: "Navigation", id: "Navigasi" }, value: "5-Tab BottomNavigationBar" },
    ],
    summary: {
      en: "A cross-platform Flutter mobile application consuming the Football Data REST API to deliver standings, upcoming fixtures, top scorers, and club details across six premier European football leagues.",
      id: "Aplikasi mobile multiplatform Flutter yang mengintegrasikan Football Data REST API untuk menyajikan klasemen liga, jadwal pertandingan, daftar top scorer, dan detail klub dari enam liga teratas Eropa.",
    },
    problemStatement: {
      en: "Football enthusiasts require a clean, responsive mobile interface to track standings, upcoming match schedules, and scoring statistics across multiple European competitions without clutter or lag.",
      id: "Penggemar sepak bola membutuhkan aplikasi mobile yang cepat dan bersih untuk memantau klasemen, jadwal tanding mendatang, dan daftar pencetak gol lintas kompetisi Eropa.",
    },
    systemSolution: {
      en: "Built a Material Design Flutter application parsing JSON from Football Data REST API into structured Dart models with asynchronous state management (loading, error, empty, success) and external browser club links.",
      id: "Membangun aplikasi Flutter berdesain Material Design yang memproses JSON dari Football Data REST API ke model Dart terstruktur dengan manajemen status asinkron (loading, error, empty, success) dan integrasi browser via url_launcher.",
    },
    personalContributions: {
      en: [
        "Developed cross-platform mobile application using Flutter and Dart.",
        "Integrated Football Data REST API across 6 leagues (Premier League, La Liga, Bundesliga, Serie A, Ligue 1, Primeira Liga).",
        "Built 4 structured Dart data models: TeamStanding, Match, TopScorer, and ClubDetail.",
        "Implemented asynchronous data fetching using `Future` and `FutureBuilder` with resilient state handling.",
        "Designed UI using Flutter Material Design components (BottomNavigationBar, GridView, ListView, Card, ListTile).",
        "Implemented team ID linking from standings to detailed club view with `url_launcher` external website access.",
        "Created image fallback handling for failed club crest assets.",
      ],
      id: [
        "Mengembangkan aplikasi mobile multiplatform menggunakan Flutter dan Dart.",
        "Mengintegrasikan Football Data REST API pada 6 kompetisi (Premier League, La Liga, Bundesliga, Serie A, Ligue 1, Primeira Liga).",
        "Membangun 4 model data Dart terstruktur: TeamStanding, Match, TopScorer, dan ClubDetail.",
        "Mengimplementasikan pengambilan data asinkron menggunakan `Future` dan `FutureBuilder` dengan penanganan status lengkap.",
        "Merancang antarmuka berbasis Material Design (BottomNavigationBar, GridView, ListView, Card, ListTile).",
        "Menghubungkan data `teamId` dari klasemen ke layar detail klub dengan pembukaan website resmi via `url_launcher`.",
        "Menyediakan fallback icon penanganan error ketika crest logo klub gagal dimuat.",
      ],
    },
    keyModules: [
      {
        title: { en: "Multi-League Standings", id: "Klasemen Multi-Liga" },
        description: {
          en: "Displays ranks, played matches, wins, draws, losses, goals for/against, and total points across 6 European leagues.",
          id: "Menampilkan posisi, jumlah main, menang, seri, kalah, selisih gol, dan poin di 6 kompetisi Eropa.",
        },
      },
      {
        title: { en: "Next Fixtures & Top Scorers", id: "Jadwal Tanding & Top Scorer" },
        description: {
          en: "Presents upcoming scheduled matches with timestamps and league-wide top goal scorers with player/club data.",
          id: "Menyajikan jadwal laga berstatus SCHEDULED beserta jam tanding dan daftar pencetak gol terbanyak.",
        },
      },
      {
        title: { en: "Club Profile & Web Launch", id: "Profil Klub & Tautan Web" },
        description: {
          en: "Detailed screen with venue, founding year, colors, and direct link to official club websites via url_launcher.",
          id: "Halaman detail yang menampilkan stadion, tahun berdiri, warna klub, dan tautan website resmi via url_launcher.",
        },
      },
    ],
    verifiedEvidence: {
      en: [
        "Configured and verified API data parsing for 6 major European football competitions.",
        "Constructed 4 structured Dart models with full loading/error/empty/success lifecycle states.",
        "Implemented Material Design UI with 5-tab BottomNavigationBar.",
      ],
      id: [
        "Dikonfigurasi dan terverifikasi memproses data API untuk 6 kompetisi sepak bola Eropa.",
        "Membangun 4 model data Dart dengan penanganan siklus status loading, error, empty, dan success.",
        "Mengimplementasikan antarmuka Material Design dengan 5 menu BottomNavigationBar.",
      ],
    },
    claimLimitation: {
      en: "Data is retrieved asynchronously from the Football Data REST API based on standard API request cycles. It does not claim real-time live score streaming or websocket push updates.",
      id: "Data diambil secara asinkron dari Football Data REST API berdasarkan siklus request standar. Sistem tidak mengklaim live streaming skor waktu nyata (real-time websocket).",
    },
  },

  // --------------------------------------------------------------------------
  // 10. Panoramic Virtual Tour (Other)
  // --------------------------------------------------------------------------
  {
    slug: "panoramic-virtual-tour",
    category: "other",
    order: 10,
    featured: false,
    title: {
      en: "Panoramic Virtual Tour",
      id: "Panoramic Virtual Tour",
    },
    subtitle: {
      en: "Interactive 360° Architectural Visualization & Hotspot Navigation System",
      id: "Visualisasi Arsitektur Interaktif 360° & Sistem Navigasi Hotspot",
    },
    projectType: {
      en: "Interactive Multimedia / 360° Virtual Tour / 3D Visualization",
      id: "Multimedia Interaktif / Virtual Tour 360° / Visualisasi 3D",
    },
    role: {
      en: "Junior Game Developer",
      id: "Junior Game Developer",
    },
    stakeholder: {
      en: "PT Duta Basis Dataprima (IT Division)",
      id: "PT Duta Basis Dataprima (Divisi IT)",
    },
    period: {
      en: "8 Jul 2024 — 8 Aug 2024",
      id: "8 Juli 2024 — 8 Agustus 2024",
    },
    status: {
      en: "Completed Prototype",
      id: "Purwarupa Selesai (Completed)",
    },
    coverImage: "/assets/projects/panoramic-virtual-tour/cover.webp",
    documentationImages: [
      "/assets/projects/panoramic-virtual-tour/documentation/01.webp",
      "/assets/projects/panoramic-virtual-tour/documentation/02.webp",
      "/assets/projects/panoramic-virtual-tour/documentation/03.webp",
      "/assets/projects/panoramic-virtual-tour/documentation/04.webp",
      "/assets/projects/panoramic-virtual-tour/documentation/05.webp",
      "/assets/projects/panoramic-virtual-tour/documentation/06.webp",
      "/assets/projects/panoramic-virtual-tour/documentation/07.webp",
    ],
    techStack: {
      core: ["Unity", "C#", "Lumion Pro", "Visual Studio Code"],
      architecture: ["360° Panoramic Rendering", "Physics Raycast Navigation", "Reusable Hotspot Prefabs", "Async Scene Loading"],
      qaOrDeployment: ["Persistent PlayerRig", "Box Collider Interaction", "Unity Build Settings"],
    },
    metrics: [
      { label: { en: "360° Panoramas", id: "Panorama 360°" }, value: "78 Vantage Points Rendered" },
      { label: { en: "Scene Hierarchy", id: "Struktur Scene" }, value: "79 Scenes (Init, Lobby, Scene1–77)" },
      { label: { en: "Core Controls", id: "Kontrol Utama" }, value: "Mouse & Touch Camera Rotation" },
      { label: { en: "Core Scripts", id: "Skrip Inti" }, value: "4 C# Modular Scripts" },
    ],
    summary: {
      en: "An interactive 3D virtual tour application developed for PT Duta Basis Dataprima, rendering 78 panoramic 360° building vantage points in Lumion Pro and assembling a 79-scene asynchronous hotspot navigation system in Unity.",
      id: "Aplikasi virtual tour interaktif yang dikembangkan untuk PT Duta Basis Dataprima, merender 78 titik panorama 360° bangunan di Lumion Pro dan membangun sistem navigasi hotspot asinkron 79 scene di Unity.",
    },
    problemStatement: {
      en: "Stakeholders and clients needed an immersive, navigable 360-degree walkthrough of large architectural building designs without requiring high-end 3D hardware for live geometry rendering.",
      id: "Klien dan pemangku kepentingan membutuhkan visualisasi penjelajahan 360° bangunan arsitektur yang interaktif tanpa membutuhkan perangkat keras berat untuk rendering geometri real-time.",
    },
    systemSolution: {
      en: "Rendered 78 high-fidelity 360° panoramas in Lumion Pro and mapped them onto Unity 3D spheres, constructing an asynchronous scene management pipeline with physics raycast hotspot triggers and persistent camera rigs.",
      id: "Merender 78 panorama 360° berkualitas tinggi di Lumion Pro dan memetakkannya ke 3D sphere di Unity, membangun pipeline manajemen scene asinkron dengan hotspot physics raycast dan kontrol kamera persisten.",
    },
    personalContributions: {
      en: [
        "Rendered 78 vantage point 360° equirectangular panoramas in Lumion Pro with custom sun, shadow, and reflection settings.",
        "Imported assets into Unity and mapped them onto 3D spheres with emission and albedo material shaders.",
        "Built 79-scene application structure (init, lobby, Scene1 to Scene77) connected through Unity Build Settings.",
        "Engineered navigation hotspot system using Physics Raycast and Box Colliders for interactive scene transitions.",
        "Constructed reusable hotspot prefabs allowing scalable deployment across multiple virtual rooms.",
        "Programmed dual mouse and touch camera look interaction handlers (`Touchpad.cs`, `PlayerRig.cs`).",
        "Delivered completed prototype and presented functional outcomes to the Director of PT Duta Basis Dataprima.",
      ],
      id: [
        "Merender 78 titik sudut pandang panorama 360° di Lumion Pro dengan konfigurasi pencahayaan, bayangan, dan refleksi.",
        "Mengimpor hasil render ke Unity dan memetakkannya pada 3D sphere menggunakan shader material albedo dan emisi.",
        "Membangun struktur aplikasi 79 scene (init, lobby, Scene1 hingga Scene77) yang terhubung melalui Unity Build Settings.",
        "Merekayasa sistem navigasi hotspot interaktif menggunakan Physics Raycast dan Box Collider untuk perpindahan scene.",
        "Membuat prefab hotspot yang dapat digunakan berulang kali pada berbagai ruangan virtual.",
        "Memprogram kontrol rotasi kamera untuk interaksi mouse dan sentuhan layar (`Touchpad.cs`, `PlayerRig.cs`).",
        "Menyelesaikan purwarupa dan mempresentasikan hasil kerja praktik kepada Direktur PT Duta Basis Dataprima.",
      ],
    },
    keyModules: [
      {
        title: { en: "360° Panoramic Projection", id: "Proyeksi Panorama 360°" },
        description: {
          en: "Spherical projection mapping of 78 Lumion Pro renders creates a seamless 360-degree environment in each scene.",
          id: "Pemetaan proyeksi bola dari 78 render Lumion Pro menghasilkan lingkungan visual 360° yang mulus.",
        },
      },
      {
        title: { en: "Physics Raycast Hotspots", id: "Navigasi Hotspot Physics Raycast" },
        description: {
          en: "Interactive collision markers detect user clicks/touches and trigger `SceneManager.LoadSceneAsync()` transitions.",
          id: "Marker interaktif mendeteksi klik atau sentuhan pengguna untuk memicu transisi `SceneManager.LoadSceneAsync()`.",
        },
      },
      {
        title: { en: "Persistent Camera Rig", id: "Rig Kamera Persisten" },
        description: {
          en: "Employs `DontDestroyOnLoad()` to maintain smooth camera orientation and touch handlers during scene transitions.",
          id: "Menerapkan `DontDestroyOnLoad()` untuk menjaga orientasi kamera dan handler sentuhan tetap aktif saat berganti scene.",
        },
      },
    ],
    verifiedEvidence: {
      en: [
        "Rendered 78 panoramic 360° vantage points and built 79 connected scenes in Unity Build Settings.",
        "Engineered 4 modular C# scripts handling touch, raycasting, persistent player rigs, and scene loading.",
        "Delivered and presented prototype to company leadership at PT Duta Basis Dataprima.",
      ],
      id: [
        "Merender 78 titik panorama 360° dan menyusun 79 scene terhubung pada Unity Build Settings.",
        "Mengembangkan 4 skrip C# modular untuk kontrol sentuhan, raycasting, rig kamera persisten, dan pergantian scene.",
        "Menyerahkan dan mempresentasikan purwarupa kepada pimpinan perusahaan PT Duta Basis Dataprima.",
      ],
    },
    claimLimitation: {
      en: "The project was delivered as a 360° desktop/mobile touch prototype. Extended AR, VR, and WebGL implementations were exploratory research pathways rather than delivered production features.",
      id: "Proyek ini diserahkan sebagai purwarupa interaktif 360° desktop/mobile. Implementasi AR, VR, dan WebGL merupakan arah eksplorasi lanjutan bukan fitur produksi yang telah diserahkan.",
    },
  },
];

/**
 * Helper to fetch all project items deterministically.
 */
export function getAllProjectsData(): ProjectItem[] {
  return [...projectsData].sort((a, b) => a.order - b.order);
}

/**
 * Helper to fetch a single project item by slug.
 */
export function getProjectDataBySlug(slug: string): ProjectItem | null {
  return projectsData.find((p) => p.slug === slug) || null;
}

/**
 * Helper to fetch adjacent project items (prev & next) deterministically.
 */
export function getAdjacentProjectsData(slug: string): {
  prev: ProjectItem | null;
  next: ProjectItem | null;
} {
  const sorted = getAllProjectsData();
  const index = sorted.findIndex((p) => p.slug === slug);
  if (index === -1) {
    return { prev: null, next: null };
  }
  return {
    prev: index > 0 ? sorted[index - 1] : null,
    next: index < sorted.length - 1 ? sorted[index + 1] : null,
  };
}
