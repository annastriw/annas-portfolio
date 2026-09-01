export type ProjectCaseStudyLocale = "en" | "id";
export type ProjectCaseStudyCategory = "web-app" | "ml" | "mobile" | "other";
export type ProjectEvidenceFormat = "wide" | "mobile";

export type LocalizedProjectText = Readonly<
  Record<ProjectCaseStudyLocale, string>
>;

export type LocalizedProjectList = Readonly<
  Record<ProjectCaseStudyLocale, readonly string[]>
>;

export interface ProjectEvidence {
  readonly id: string;
  readonly src: string;
  readonly format: ProjectEvidenceFormat;
  readonly alt: LocalizedProjectText;
  readonly caption: LocalizedProjectText;
}

export interface ProjectGallerySlide {
  readonly slide: string;
  readonly src: string;
  readonly format: ProjectEvidenceFormat | "cover";
  readonly alt: LocalizedProjectText;
  readonly caption: LocalizedProjectText;
}

export interface ProjectTechnologyGroup {
  readonly category: string;
  readonly technologies: readonly string[];
}

export interface ProjectExternalLink {
  readonly label: LocalizedProjectText;
  readonly url: string;
  readonly type?: "primary" | "secondary" | "solid" | "underline";
}

export interface SystemUserRole {
  readonly name: LocalizedProjectText;
  readonly description: LocalizedProjectText;
}

export interface SystemScreeningEducation {
  readonly screeningModules: readonly string[];
  readonly educationAreas: LocalizedProjectList;
  readonly learningSequence: LocalizedProjectText;
}

export interface SystemPatientDataGroup {
  readonly title: LocalizedProjectText;
  readonly items: LocalizedProjectList;
  readonly note?: LocalizedProjectText;
}

export interface SystemIntegrationFlow {
  readonly label?: LocalizedProjectText;
  readonly steps: readonly string[];
}

export interface IHealthSystemScopeData {
  readonly userRoles: readonly SystemUserRole[];
  readonly screeningEducation: SystemScreeningEducation;
  readonly patientData: readonly SystemPatientDataGroup[];
  readonly integrationFlows: readonly SystemIntegrationFlow[];
}

export interface ProjectCaseStudy {
  readonly index: string;
  readonly slug: string;
  readonly category: ProjectCaseStudyCategory;
  readonly categoryLabel: LocalizedProjectText;
  readonly title: LocalizedProjectText;
  readonly role: LocalizedProjectText;
  readonly period?: LocalizedProjectText;
  readonly status: LocalizedProjectText;
  readonly client?: LocalizedProjectText;
  readonly workingModel?: LocalizedProjectText;
  readonly lead?: LocalizedProjectText;
  readonly metaTitle?: LocalizedProjectText;
  readonly metaDescription?: LocalizedProjectText;
  readonly repositoryNotice?: LocalizedProjectText;
  readonly overview: LocalizedProjectList;
  readonly contributions: LocalizedProjectList;
  readonly contributionLearning?: LocalizedProjectText;
  readonly technicalNotes: LocalizedProjectList;
  readonly modules?: readonly string[];
  readonly workflow?: LocalizedProjectList;
  readonly technologyGroups?: readonly ProjectTechnologyGroup[];
  readonly systemScope?: IHealthSystemScopeData;
  readonly techStack: readonly string[];
  readonly cover: {
    readonly src: string;
    readonly alt: LocalizedProjectText;
    readonly position?: "center" | "top";
    readonly caption?: LocalizedProjectText;
  };
  readonly evidence: readonly ProjectEvidence[];
  readonly gallery?: readonly ProjectGallerySlide[];
  readonly claimBoundary?: LocalizedProjectText;
  readonly liveUrl?: string;
  readonly githubUrl?: string;
  readonly frontendRepoUrl?: string;
  readonly backendRepoUrl?: string;
  readonly projectLinks?: readonly ProjectExternalLink[];
  readonly videoSrc?: string;
}

const categoryLabels: Record<
  ProjectCaseStudyCategory,
  LocalizedProjectText
> = {
  "web-app": { en: "Web Application", id: "Aplikasi Web" },
  ml: { en: "Machine Learning", id: "Machine Learning" },
  mobile: { en: "Mobile Application", id: "Aplikasi Mobile" },
  other: { en: "Interactive Prototype", id: "Purwarupa Interaktif" },
};

export const projectCaseStudies: readonly ProjectCaseStudy[] = [
  {
    index: "01",
    slug: "ukg-system",
    category: "web-app",
    categoryLabel: { en: "01 / WEB APPLICATION", id: "01 / WEB APPLICATION" },
    title: { en: "UKG System", id: "UKG System" },
    role: { en: "Full-Stack Web Developer", id: "Full-Stack Web Developer" },
    period: { en: "January–April 2026", id: "Januari–April 2026" },
    status: { en: "Live Production", id: "Live Production" },
    client: {
      en: "CV Universal Kharisma Globalindo",
      id: "CV Universal Kharisma Globalindo",
    },
    lead: {
      en: "A multi-branch ERP that brings inventory, sales, and daily operations into one system.",
      id: "ERP multi-cabang yang menyatukan pengelolaan stok, penjualan, dan operasional harian dalam satu sistem.",
    },
    repositoryNotice: {
      en: "Private Repository",
      id: "Private Repository",
    },
    overview: {
      en: [
        "Before UKG System, inventory, sales, and branch operations were recorded in notebooks, with data shared through WhatsApp and Excel. This made it difficult for the owner to monitor activities across branches.",
        "UKG System brings these records together, allowing the owner to monitor inventory, sales, and operations remotely.",
      ],
      id: [
        "Sebelum UKG System, pencatatan stok, penjualan, dan operasional cabang dilakukan melalui buku, sementara data dibagikan melalui WhatsApp dan Excel. Kondisi ini menyulitkan owner untuk memantau aktivitas lintas cabang.",
        "UKG System menyatukan data tersebut dalam satu sistem, sehingga owner dapat memantau stok, penjualan, dan operasional tanpa harus berada di lokasi.",
      ],
    },
    contributions: {
      en: [
        "Gathered requirements through interviews with the owner and designed the UI/UX.",
        "Independently developed the frontend, backend, and workflows connecting the system’s modules.",
        "Tested and deployed the system for use in daily operations.",
      ],
      id: [
        "Menggali kebutuhan melalui wawancara dengan owner dan merancang UI/UX.",
        "Mengembangkan frontend, backend, dan integrasi workflow antar modul secara mandiri.",
        "Melakukan testing dan deployment hingga sistem digunakan di production.",
      ],
    },
    contributionLearning: {
      en: "This project strengthened my experience in taking a system from business requirements to everyday operational use.",
      id: "Project ini memperkuat pengalaman saya dalam mengembangkan sistem dari kebutuhan bisnis hingga digunakan dalam operasional sehari-hari.",
    },
    modules: [
      "User & Role Management",
      "Branch & Attendance",
      "Inventory & Stock",
      "Stock Order",
      "Store Operations",
      "Cashier & Sales",
      "Reports & Finance",
      "Dashboard & Analytics",
    ],
    technologyGroups: [
      {
        category: "Design",
        technologies: ["Figma"],
      },
      {
        category: "Frontend",
        technologies: ["Next.js", "React", "TypeScript"],
      },
      {
        category: "Backend & Data",
        technologies: ["NestJS", "REST API", "MySQL"],
      },
      {
        category: "Testing",
        technologies: ["Katalon Studio"],
      },
      {
        category: "Deployment",
        technologies: ["Linux Ubuntu", "VPS"],
      },
    ],
    technicalNotes: {
      en: [
        "Eight integrated operational modules: User & Role Management, Branch & Attendance, Inventory & Stock, Stock Order, Store Operations, Cashier & Sales, Reports & Finance, and Dashboard & Analytics.",
        "Modular backend and relational database architecture centralizes branch operations and supports remote owner monitoring.",
        "Role-based multi-branch architecture separates owner oversight and remote monitoring from branch employee workflows.",
      ],
      id: [
        "Delapan modul operasional terintegrasi: User & Role Management, Branch & Attendance, Inventory & Stock, Stock Order, Store Operations, Cashier & Sales, Reports & Finance, dan Dashboard & Analytics.",
        "Arsitektur backend modular dan database relasional menyatukan operasional cabang serta mendukung pemantauan jarak jauh oleh owner.",
        "Arsitektur multi-cabang berbasis peran memisahkan pengawasan dan pemantauan jarak jauh owner dari alur kerja karyawan cabang.",
      ],
    },
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "NestJS",
      "MySQL",
      "Katalon Studio",
      "Linux Ubuntu",
    ],
    cover: {
      src: "/assets/projects/ukg-system/cover.webp",
      alt: {
        en: "UKG System multi-branch ERP administration dashboard with operational charts",
        id: "Dashboard administrasi ERP multi-cabang UKG System dengan grafik operasional",
      },
      position: "top",
    },
    evidence: [
      {
        id: "FIG.01",
        src: "/assets/projects/ukg-system/documentation/02.webp",
        format: "wide",
        alt: {
          en: "UKG System inventory management and stock allocation view",
          id: "Tampilan manajemen inventaris dan alokasi stok UKG System",
        },
        caption: {
          en: "Inventory management and stock allocation view across branch locations.",
          id: "Tampilan manajemen inventaris dan alokasi stok di berbagai cabang.",
        },
      },
      {
        id: "FIG.02",
        src: "/assets/projects/ukg-system/documentation/03.webp",
        format: "wide",
        alt: {
          en: "UKG System point of sale transaction and operational interface",
          id: "Antarmuka transaksi kasir dan operasional UKG System",
        },
        caption: {
          en: "Point of sale transaction and operational interface for branch staff.",
          id: "Antarmuka transaksi kasir dan operasional untuk staf cabang.",
        },
      },
      {
        id: "FIG.03",
        src: "/assets/projects/ukg-system/documentation/04.webp",
        format: "wide",
        alt: {
          en: "UKG System store operations and cash management records",
          id: "Pencatatan operasional toko dan manajemen kas UKG System",
        },
        caption: {
          en: "Store operations and cash management recording interface.",
          id: "Pencatatan operasional toko dan antarmuka manajemen kas.",
        },
      },
      {
        id: "FIG.04",
        src: "/assets/projects/ukg-system/documentation/05.webp",
        format: "wide",
        alt: {
          en: "UKG System stock order request and branch transfer interface",
          id: "Antarmuka pengajuan order stok dan transfer cabang UKG System",
        },
        caption: {
          en: "Stock order request and inter-branch transfer workflow interface.",
          id: "Pengajuan order stok dan alur transfer antar-cabang.",
        },
      },
      {
        id: "FIG.05",
        src: "/assets/projects/ukg-system/documentation/06.webp",
        format: "wide",
        alt: {
          en: "UKG System employee attendance and shift schedule table",
          id: "Tabel presensi karyawan dan jadwal shift UKG System",
        },
        caption: {
          en: "Employee attendance records and shift scheduling overview.",
          id: "Catatan presensi karyawan dan jadwal kerja shift.",
        },
      },
      {
        id: "FIG.06",
        src: "/assets/projects/ukg-system/documentation/07.webp",
        format: "wide",
        alt: {
          en: "UKG System financial and sales transaction report table",
          id: "Tabel laporan keuangan dan transaksi penjualan UKG System",
        },
        caption: {
          en: "Financial report table and summarized branch sales ledger.",
          id: "Tabel laporan keuangan dan rekapitulasi buku besar penjualan cabang.",
        },
      },
      {
        id: "FIG.07",
        src: "/assets/projects/ukg-system/documentation/08.webp",
        format: "wide",
        alt: {
          en: "UKG System user permissions and role configuration interface",
          id: "Antarmuka hak akses pengguna dan konfigurasi peran UKG System",
        },
        caption: {
          en: "Role-based access control and system user permission settings.",
          id: "Kontrol akses berbasis peran dan konfigurasi hak pengguna sistem.",
        },
      },
      {
        id: "FIG.08",
        src: "/assets/projects/ukg-system/documentation/09.webp",
        format: "wide",
        alt: {
          en: "UKG System multi-branch sales analytics and summary overview",
          id: "Ringkasan analitik dan total penjualan multi-cabang UKG System",
        },
        caption: {
          en: "Multi-branch sales analytics charts and operational summary.",
          id: "Grafik analitik penjualan multi-cabang dan ringkasan operasional.",
        },
      },
    ],
    gallery: [
      {
        slide: "01",
        src: "/assets/projects/ukg-system/cover.webp",
        format: "cover",
        alt: {
          en: "UKG System multi-branch ERP administration dashboard with operational charts",
          id: "Dashboard administrasi ERP multi-cabang UKG System dengan grafik operasional",
        },
        caption: {
          en: "[UKG_CAPTION_01_EN] Add a short description of this screenshot.",
          id: "[UKG_CAPTION_01_ID] Tambahkan deskripsi singkat tentang tampilan ini.",
        },
      },
      {
        slide: "02",
        src: "/assets/projects/ukg-system/documentation/02.webp",
        format: "wide",
        alt: {
          en: "UKG System inventory management and stock allocation view",
          id: "Tampilan manajemen inventaris dan alokasi stok UKG System",
        },
        caption: {
          en: "[UKG_CAPTION_02_EN] Add a short description of this screenshot.",
          id: "[UKG_CAPTION_02_ID] Tambahkan deskripsi singkat tentang tampilan ini.",
        },
      },
      {
        slide: "03",
        src: "/assets/projects/ukg-system/documentation/03.webp",
        format: "wide",
        alt: {
          en: "UKG System point of sale transaction and operational interface",
          id: "Antarmuka transaksi kasir dan operasional UKG System",
        },
        caption: {
          en: "[UKG_CAPTION_03_EN] Add a short description of this screenshot.",
          id: "[UKG_CAPTION_03_ID] Tambahkan deskripsi singkat tentang tampilan ini.",
        },
      },
      {
        slide: "04",
        src: "/assets/projects/ukg-system/documentation/04.webp",
        format: "wide",
        alt: {
          en: "UKG System store operations and cash management records",
          id: "Pencatatan operasional toko dan manajemen kas UKG System",
        },
        caption: {
          en: "[UKG_CAPTION_04_EN] Add a short description of this screenshot.",
          id: "[UKG_CAPTION_04_ID] Tambahkan deskripsi singkat tentang tampilan ini.",
        },
      },
      {
        slide: "05",
        src: "/assets/projects/ukg-system/documentation/05.webp",
        format: "wide",
        alt: {
          en: "UKG System stock order request and branch transfer interface",
          id: "Antarmuka pengajuan order stok dan transfer cabang UKG System",
        },
        caption: {
          en: "[UKG_CAPTION_05_EN] Add a short description of this screenshot.",
          id: "[UKG_CAPTION_05_ID] Tambahkan deskripsi singkat tentang tampilan ini.",
        },
      },
      {
        slide: "06",
        src: "/assets/projects/ukg-system/documentation/06.webp",
        format: "wide",
        alt: {
          en: "UKG System employee attendance and shift schedule table",
          id: "Tabel presensi karyawan dan jadwal shift UKG System",
        },
        caption: {
          en: "[UKG_CAPTION_06_EN] Add a short description of this screenshot.",
          id: "[UKG_CAPTION_06_ID] Tambahkan deskripsi singkat tentang tampilan ini.",
        },
      },
      {
        slide: "07",
        src: "/assets/projects/ukg-system/documentation/07.webp",
        format: "wide",
        alt: {
          en: "UKG System financial and sales transaction report table",
          id: "Tabel laporan keuangan dan transaksi penjualan UKG System",
        },
        caption: {
          en: "[UKG_CAPTION_07_EN] Add a short description of this screenshot.",
          id: "[UKG_CAPTION_07_ID] Tambahkan deskripsi singkat tentang tampilan ini.",
        },
      },
      {
        slide: "08",
        src: "/assets/projects/ukg-system/documentation/08.webp",
        format: "wide",
        alt: {
          en: "UKG System user permissions and role configuration interface",
          id: "Antarmuka hak akses pengguna dan konfigurasi peran UKG System",
        },
        caption: {
          en: "[UKG_CAPTION_08_EN] Add a short description of this screenshot.",
          id: "[UKG_CAPTION_08_ID] Tambahkan deskripsi singkat tentang tampilan ini.",
        },
      },
      {
        slide: "09",
        src: "/assets/projects/ukg-system/documentation/09.webp",
        format: "wide",
        alt: {
          en: "UKG System multi-branch sales analytics and summary overview",
          id: "Ringkasan analitik dan total penjualan multi-cabang UKG System",
        },
        caption: {
          en: "[UKG_CAPTION_09_EN] Add a short description of this screenshot.",
          id: "[UKG_CAPTION_09_ID] Tambahkan deskripsi singkat tentang tampilan ini.",
        },
      },
    ],
    liveUrl: "https://ukgsystem.site/",
  },
  {
    index: "02",
    slug: "ihealth-edu",
    category: "web-app",
    categoryLabel: { en: "02 / WEB APPLICATION", id: "02 / WEB APPLICATION" },
    title: { en: "iHealth Edu", id: "iHealth Edu" },
    client: {
      en: "Puskesmas Padangsari",
      id: "Puskesmas Padangsari",
    },
    role: {
      en: "Frontend Web Developer",
      id: "Frontend Web Developer",
    },
    workingModel: {
      en: "Team project",
      id: "Proyek tim",
    },
    period: {
      en: "June–August 2025",
      id: "Juni–Agustus 2025",
    },
    status: {
      en: "Live Production",
      id: "Live Production",
    },
    lead: {
      en: "A digital health platform that brings structured screening, health education, patient records, IoT health data, and machine learning decision support into one system.",
      id: "Platform kesehatan digital yang menyatukan screening terstruktur, edukasi kesehatan, data pasien, data kesehatan dari IoT, dan machine learning decision support dalam satu sistem.",
    },
    metaTitle: {
      en: "iHealth Edu — Frontend Web Development Case Study | Annas Tri Widagdo",
      id: "iHealth Edu — Studi Kasus Frontend Web Development | Annas Tri Widagdo",
    },
    metaDescription: {
      en: "Frontend web development case study for iHealth Edu with Puskesmas Padangsari, covering UI/UX design in Figma, role-based Next.js interfaces, IoT health data, and ML decision support.",
      id: "Studi kasus frontend web development untuk iHealth Edu bersama Puskesmas Padangsari, mencakup desain UI/UX Figma, antarmuka Next.js berbasis role, data kesehatan IoT, dan decision support ML.",
    },
    liveUrl: "https://www.ihealthedu.site/",
    frontendRepoUrl: "https://github.com/annastriw/frontend-ihealth.git",
    backendRepoUrl: "https://github.com/annastriw/backend-ihealth.git",
    projectLinks: [
      {
        label: { en: "Visit Live Website", id: "Buka Website" },
        url: "https://www.ihealthedu.site/",
        type: "primary",
      },
      {
        label: { en: "View Frontend Repository", id: "Lihat Repositori Frontend" },
        url: "https://github.com/annastriw/frontend-ihealth.git",
        type: "secondary",
      },
      {
        label: { en: "View Backend Repository", id: "Lihat Repositori Backend" },
        url: "https://github.com/annastriw/backend-ihealth.git",
        type: "secondary",
      },
    ],
    overview: {
      en: [
        "iHealth Edu was developed with Puskesmas Padangsari to bring health records, structured screening, and educational content into a digital platform designed around primary-care workflows.",
        "The system centralizes patient information, makes health education easier to access, and helps health workers review patient histories. Machine learning results are presented only as decision support and do not provide a clinical diagnosis.",
      ],
      id: [
        "iHealth Edu dikembangkan bersama Puskesmas Padangsari untuk menyatukan data kesehatan, screening terstruktur, dan konten edukasi dalam platform digital yang dirancang berdasarkan workflow layanan kesehatan primer.",
        "Sistem ini memusatkan data pasien, memudahkan akses edukasi kesehatan, dan membantu tenaga kesehatan memantau riwayat pasien. Hasil machine learning hanya digunakan sebagai decision support dan bukan sebagai diagnosis klinis.",
      ],
    },
    contributions: {
      en: [
        "Gathered requirements through an interview with the head of Puskesmas Padangsari, regular discussions, and workflow observation, then translated them into the UI/UX design.",
        "Developed role-specific frontend experiences for patients, administrators, and health workers using Next.js.",
        "Integrated REST APIs and presented health measurements received from ESP32 devices in the frontend.",
        "Integrated machine learning decision-support results into the health-worker interface.",
      ],
      id: [
        "Menggali kebutuhan melalui wawancara dengan kepala Puskesmas Padangsari, diskusi rutin, dan observasi workflow, kemudian menerjemahkannya ke dalam desain UI/UX.",
        "Mengembangkan frontend berbasis role untuk pasien, admin, dan tenaga kesehatan menggunakan Next.js.",
        "Mengintegrasikan REST API dan menampilkan data pemeriksaan kesehatan dari perangkat ESP32 pada frontend.",
        "Mengintegrasikan hasil machine learning decision support ke dalam antarmuka tenaga kesehatan.",
      ],
    },
    techStack: [
      "Figma",
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "REST API",
    ],
    systemScope: {
      userRoles: [
        {
          name: { en: "Patient", id: "Pasien" },
          description: {
            en: "Completes screening, accesses educational content, and views health history.",
            id: "Mengikuti screening, mengakses konten edukasi, dan melihat riwayat kesehatan.",
          },
        },
        {
          name: { en: "Administrator", id: "Admin" },
          description: {
            en: "Manages accounts, content, and operational system data.",
            id: "Mengelola akun, konten, dan data operasional sistem.",
          },
        },
        {
          name: { en: "Health Worker", id: "Tenaga Kesehatan" },
          description: {
            en: "Monitors patient data and reviews decision-support results.",
            id: "Memantau data pasien dan meninjau hasil decision support.",
          },
        },
      ],
      screeningEducation: {
        screeningModules: ["DSMQ", "HSMBQ", "DASS-21"],
        educationAreas: {
          en: ["Diabetes", "Hypertension", "Mental Health"],
          id: ["Diabetes", "Hipertensi", "Kesehatan Mental"],
        },
        learningSequence: {
          en: "Pre-Test → Education Module → Post-Test",
          id: "Pre-Test → Modul Edukasi → Post-Test",
        },
      },
      patientData: [
        {
          title: { en: "IoT Measurements", id: "Pengukuran IoT" },
          items: {
            en: ["Blood pressure", "Blood glucose", "Cholesterol"],
            id: ["Tekanan darah", "Gula darah", "Kolesterol"],
          },
        },
        {
          title: { en: "Manually Entered Data", id: "Data Input Manual" },
          items: {
            en: [
              "Height",
              "Weight",
              "Lifestyle information",
              "Supporting patient information",
            ],
            id: [
              "Tinggi badan",
              "Berat badan",
              "Informasi gaya hidup",
              "Informasi pendukung pasien",
            ],
          },
          note: {
            en: "BMI is calculated from height and weight.",
            id: "BMI dihitung dari tinggi dan berat badan.",
          },
        },
        {
          title: { en: "Patient History", id: "Riwayat Pasien" },
          items: {
            en: [
              "Centralized records reviewed over time by appropriate user roles",
            ],
            id: [
              "Catatan terpusat yang dapat dipantau dari waktu ke waktu oleh role terkait",
            ],
          },
        },
      ],
      integrationFlows: [
        {
          label: {
            en: "IoT & User Input Integration",
            id: "Integrasi IoT & Input Pengguna",
          },
          steps: [
            "ESP32 / User Input",
            "Laravel API",
            "MySQL",
            "Next.js Interface",
          ],
        },
        {
          label: {
            en: "ML Decision-Support Integration",
            id: "Integrasi Decision Support ML",
          },
          steps: [
            "Flask ML Service / Random Forest",
            "Decision-Support Result",
            "Health-Worker Interface",
          ],
        },
      ],
    },
    technicalNotes: {
      en: [
        "User Roles: Patient (completes screening, accesses educational content, views health history), Administrator (manages accounts, content, operational system data), and Health Worker (monitors patient data, reviews decision-support results).",
        "Screening & Education: DSMQ, HSMBQ, and DASS-21 screening modules alongside diabetes, hypertension, and mental health education with a Pre-Test → Education Module → Post-Test sequence.",
        "Patient Data: IoT measurements (blood pressure, blood glucose, cholesterol), manually entered website data (height, weight, lifestyle, BMI calculation), and centralized patient history.",
        "System Integrations: ESP32 / User Input → Laravel API → MySQL → Next.js Interface and Flask ML Service / Random Forest → Decision-Support Result → Health-Worker Interface.",
      ],
      id: [
        "Role Pengguna: Pasien (mengikuti screening, mengakses modul edukasi, melihat riwayat kesehatan), Admin (mengelola akun, konten, data operasional sistem), dan Tenaga Kesehatan (memantau data pasien, meninjau hasil decision support).",
        "Screening & Edukasi: Modul screening DSMQ, HSMBQ, dan DASS-21 serta edukasi diabetes, hipertensi, dan kesehatan mental dengan alur Pre-Test → Modul Edukasi → Post-Test.",
        "Data Pasien: Pengukuran IoT (tekanan darah, gula darah, kolesterol), input manual website (tinggi, berat badan, gaya hidup, kalkulasi BMI), dan riwayat pasien terpusat.",
        "Integrasi Sistem: ESP32 / User Input → Laravel API → MySQL → Next.js Interface dan Flask ML Service / Random Forest → Decision-Support Result → Antarmuka Tenaga Kesehatan.",
      ],
    },
    cover: {
      src: "/assets/projects/ihealth-edu/cover.webp",
      alt: {
        en: "iHealth Edu health education and screening interface",
        id: "Antarmuka edukasi dan screening kesehatan iHealth Edu",
      },
      position: "top",
      caption: {
        en: "TODO_IHEALTH_CAPTION_01_EN",
        id: "TODO_IHEALTH_CAPTION_01_ID",
      },
    },
    evidence: [
      {
        id: "FIG.01",
        src: "/assets/projects/ihealth-edu/documentation/01.webp",
        format: "wide",
        alt: {
          en: "iHealth Edu platform documentation",
          id: "Dokumentasi platform iHealth Edu",
        },
        caption: {
          en: "Patient dashboard with health metrics, screening history, and educational modules.",
          id: "Dashboard pasien dengan metrik kesehatan, riwayat screening, dan modul edukasi.",
        },
      },
      {
        id: "FIG.02",
        src: "/assets/projects/ihealth-edu/documentation/02.webp",
        format: "wide",
        alt: {
          en: "iHealth Edu education workflow",
          id: "Alur edukasi iHealth Edu",
        },
        caption: {
          en: "Structured health screening and assessment workflow interface.",
          id: "Antarmuka alur screening dan asesmen kesehatan terstruktur.",
        },
      },
    ],
    gallery: [
      {
        slide: "01",
        src: "/assets/projects/ihealth-edu/cover.webp",
        format: "cover",
        alt: {
          en: "iHealth Edu health education and screening interface",
          id: "Antarmuka edukasi dan screening kesehatan iHealth Edu",
        },
        caption: {
          en: "TODO_IHEALTH_CAPTION_01_EN",
          id: "TODO_IHEALTH_CAPTION_01_ID",
        },
      },
      {
        slide: "02",
        src: "/assets/projects/ihealth-edu/documentation/02.webp",
        format: "wide",
        alt: {
          en: "iHealth Edu patient dashboard and screening records",
          id: "Dashboard pasien dan riwayat screening iHealth Edu",
        },
        caption: {
          en: "TODO_IHEALTH_CAPTION_02_EN",
          id: "TODO_IHEALTH_CAPTION_02_ID",
        },
      },
      {
        slide: "03",
        src: "/assets/projects/ihealth-edu/documentation/03.webp",
        format: "wide",
        alt: {
          en: "iHealth Edu structured questionnaire assessment interface",
          id: "Antarmuka asesmen kuesioner terstruktur iHealth Edu",
        },
        caption: {
          en: "TODO_IHEALTH_CAPTION_03_EN",
          id: "TODO_IHEALTH_CAPTION_03_ID",
        },
      },
      {
        slide: "04",
        src: "/assets/projects/ihealth-edu/documentation/04.webp",
        format: "wide",
        alt: {
          en: "iHealth Edu educational module and learning path interface",
          id: "Antarmuka modul edukasi dan alur pembelajaran iHealth Edu",
        },
        caption: {
          en: "TODO_IHEALTH_CAPTION_04_EN",
          id: "TODO_IHEALTH_CAPTION_04_ID",
        },
      },
      {
        slide: "05",
        src: "/assets/projects/ihealth-edu/documentation/05.webp",
        format: "wide",
        alt: {
          en: "iHealth Edu patient biometric records and health data interface",
          id: "Antarmuka data kesehatan dan rekam biometrik pasien iHealth Edu",
        },
        caption: {
          en: "TODO_IHEALTH_CAPTION_05_EN",
          id: "TODO_IHEALTH_CAPTION_05_ID",
        },
      },
      {
        slide: "06",
        src: "/assets/projects/ihealth-edu/documentation/06.webp",
        format: "wide",
        alt: {
          en: "iHealth Edu health worker monitoring and decision support interface",
          id: "Antarmuka pemantauan tenaga kesehatan dan decision support iHealth Edu",
        },
        caption: {
          en: "TODO_IHEALTH_CAPTION_06_EN",
          id: "TODO_IHEALTH_CAPTION_06_ID",
        },
      },
      {
        slide: "07",
        src: "/assets/projects/ihealth-edu/documentation/07.webp",
        format: "wide",
        alt: {
          en: "iHealth Edu administrator content and user management console",
          id: "Konsol pengelolaan pengguna dan konten administrator iHealth Edu",
        },
        caption: {
          en: "TODO_IHEALTH_CAPTION_07_EN",
          id: "TODO_IHEALTH_CAPTION_07_ID",
        },
      },
      {
        slide: "08",
        src: "/assets/projects/ihealth-edu/documentation/08.webp",
        format: "wide",
        alt: {
          en: "iHealth Edu geographic patient distribution and reporting map",
          id: "Peta persebaran geografis dan pelaporan pasien iHealth Edu",
        },
        caption: {
          en: "TODO_IHEALTH_CAPTION_08_EN",
          id: "TODO_IHEALTH_CAPTION_08_ID",
        },
      },
    ],
    claimBoundary: {
      en: "Machine learning results are presented only as decision support for health workers and do not provide a clinical diagnosis or medical advice.",
      id: "Hasil machine learning hanya digunakan sebagai decision support bagi tenaga kesehatan dan bukan sebagai diagnosis klinis atau saran medis.",
    },
  },
  {
    index: "03",
    slug: "dialisis-connect-edu",
    category: "web-app",
    categoryLabel: categoryLabels["web-app"],
    title: { en: "Dialisis Connect Edu", id: "Dialisis Connect Edu" },
    role: { en: "Fullstack Developer", id: "Fullstack Developer" },
    status: { en: "Production deployment", id: "Deploy ke production" },
    overview: {
      en: [
        "Dialisis Connect Edu is an education and community platform developed for IPDI Central Java.",
        "It gives patients, families, health workers, and the public role-appropriate access to articles, videos, PDF booklets, and discussion spaces.",
      ],
      id: [
        "Dialisis Connect Edu adalah platform edukasi dan komunitas yang dikembangkan untuk IPDI Jawa Tengah.",
        "Platform ini memberi pasien, keluarga, tenaga kesehatan, dan masyarakat akses berbasis peran ke artikel, video, booklet PDF, dan ruang diskusi.",
      ],
    },
    contributions: {
      en: [
        "Designed the content and community flows in Figma.",
        "Built the Next.js frontend and Laravel REST backend with MySQL persistence.",
        "Implemented role-based access for patients, health workers, and administrators.",
        "Validated core journeys with Katalon and deployed the Docker-based application on Ubuntu.",
      ],
      id: [
        "Merancang alur konten dan komunitas di Figma.",
        "Membangun frontend Next.js dan backend REST Laravel dengan penyimpanan MySQL.",
        "Mengimplementasikan akses berbasis peran untuk pasien, tenaga kesehatan, dan administrator.",
        "Memvalidasi perjalanan utama dengan Katalon dan melakukan deployment aplikasi berbasis Docker di Ubuntu.",
      ],
    },
    technicalNotes: {
      en: [
        "The content model supports articles, embedded YouTube video, and downloadable PDF booklets.",
        "Role-based presentation separates patient, health-worker, and administrator functions.",
        "The forum provides a dedicated space for moderated community discussion.",
        "The platform is informational and educational; no clinical outcome is claimed.",
      ],
      id: [
        "Model konten mendukung artikel, video YouTube tersemat, dan booklet PDF yang dapat diunduh.",
        "Penyajian berbasis peran memisahkan fungsi pasien, tenaga kesehatan, dan administrator.",
        "Forum menyediakan ruang khusus untuk diskusi komunitas yang termoderasi.",
        "Platform bersifat informatif dan edukatif; tidak ada klaim hasil klinis.",
      ],
    },
    techStack: ["Next.js", "Laravel", "MySQL", "REST API", "Katalon Studio", "Docker"],
    cover: {
      src: "/assets/projects/dialisis-connect-edu/cover.webp",
      alt: { en: "Dialisis Connect Edu education platform", id: "Platform edukasi Dialisis Connect Edu" },
      position: "top",
    },
    evidence: [
      {
        id: "FIG.01",
        src: "/assets/projects/dialisis-connect-edu/documentation/01.webp",
        format: "wide",
        alt: { en: "Dialisis Connect Edu interface documentation", id: "Dokumentasi antarmuka Dialisis Connect Edu" },
        caption: { en: "Educational content portal and resource directory view.", id: "Tampilan portal konten edukasi dan direktori materi." },
      },
      {
        id: "FIG.02",
        src: "/assets/projects/dialisis-connect-edu/documentation/02.webp",
        format: "wide",
        alt: { en: "Dialisis Connect Edu content interface", id: "Antarmuka konten Dialisis Connect Edu" },
        caption: { en: "Interactive community discussion and article reading interface.", id: "Antarmuka membaca artikel edukasi dan forum diskusi interaktif." },
      },
    ],
  },
  {
    index: "04",
    slug: "nusa-dakwah",
    category: "web-app",
    categoryLabel: categoryLabels["web-app"],
    title: { en: "Nusa Dakwah", id: "Nusa Dakwah" },
    role: { en: "Fullstack Developer", id: "Fullstack Developer" },
    status: { en: "Production deployment", id: "Deploy ke production" },
    overview: {
      en: [
        "Nusa Dakwah is a full-stack digital learning platform for structured educational content and community discussion.",
        "Users can explore modules, submodules, articles, YouTube material, search results, and moderated conversations, while administrators manage the system.",
      ],
      id: [
        "Nusa Dakwah adalah platform dakwah digital fullstack untuk konten pembelajaran terstruktur dan diskusi komunitas.",
        "Pengguna dapat menjelajahi modul, submodul, artikel, materi YouTube, hasil pencarian, dan percakapan termoderasi, sedangkan administrator mengelola sistem.",
      ],
    },
    contributions: {
      en: [
        "Designed the learning and discussion journeys in Figma.",
        "Built the Next.js frontend and Laravel REST backend backed by MySQL.",
        "Implemented nested replies, moderation controls, search, validation, and sanitization.",
        "Ran manual and automated Katalon checks and deployed the Dockerized application to Ubuntu.",
      ],
      id: [
        "Merancang perjalanan pembelajaran dan diskusi di Figma.",
        "Membangun frontend Next.js dan backend REST Laravel dengan MySQL.",
        "Mengimplementasikan nested reply, kontrol moderasi, pencarian, validasi, dan sanitasi.",
        "Menjalankan pemeriksaan manual dan otomatis dengan Katalon serta melakukan deployment aplikasi berbasis Docker ke Ubuntu.",
      ],
    },
    technicalNotes: {
      en: [
        "Learning content follows a module, submodule, and content hierarchy.",
        "The forum supports comments, nested replies, and administrator moderation.",
        "Search spans the published content available to users.",
        "Input validation and sanitization protect content-management and discussion flows.",
      ],
      id: [
        "Konten pembelajaran mengikuti hierarki modul, submodul, dan konten.",
        "Forum mendukung komentar, nested reply, dan moderasi administrator.",
        "Pencarian mencakup konten terpublikasi yang tersedia bagi pengguna.",
        "Validasi dan sanitasi input melindungi alur pengelolaan konten dan diskusi.",
      ],
    },
    techStack: ["Next.js", "Laravel", "MySQL", "REST API", "Katalon Studio", "Docker"],
    cover: {
      src: "/assets/projects/nusa-dakwah/cover.webp",
      alt: { en: "Nusa Dakwah digital content platform", id: "Platform konten digital Nusa Dakwah" },
      position: "top",
    },
    evidence: [
      {
        id: "FIG.01",
        src: "/assets/projects/nusa-dakwah/documentation/01.webp",
        format: "wide",
        alt: { en: "Nusa Dakwah interface documentation", id: "Dokumentasi antarmuka Nusa Dakwah" },
        caption: { en: "Learning catalog with structured module navigation.", id: "Katalog pembelajaran dengan navigasi modul terstruktur." },
      },
      {
        id: "FIG.02",
        src: "/assets/projects/nusa-dakwah/documentation/02.webp",
        format: "wide",
        alt: { en: "Nusa Dakwah content workflow", id: "Alur konten Nusa Dakwah" },
        caption: { en: "Modular content reader and integrated discussion forum.", id: "Pembaca materi modular dan forum diskusi terintegrasi." },
      },
    ],
  },
  {
    index: "05",
    slug: "simastok",
    category: "web-app",
    categoryLabel: categoryLabels["web-app"],
    title: { en: "SIMASTOK SHR Jaya Motor", id: "SIMASTOK SHR Jaya Motor" },
    role: { en: "Fullstack Developer", id: "Fullstack Developer" },
    status: { en: "Production deployment", id: "Deploy ke production" },
    overview: {
      en: [
        "SIMASTOK is an inventory-management web application built for SHR Jaya Motor.",
        "It centralizes master data, incoming and outgoing stock, transaction history, date-based reports, and PDF exports for administrator and user roles.",
      ],
      id: [
        "SIMASTOK adalah aplikasi web pengelolaan inventaris yang dibangun untuk SHR Jaya Motor.",
        "Aplikasi ini memusatkan data master, stok masuk dan keluar, riwayat transaksi, laporan berdasarkan tanggal, serta ekspor PDF untuk peran administrator dan pengguna.",
      ],
    },
    contributions: {
      en: [
        "Designed the inventory workflows and interface in Figma.",
        "Built the Laravel frontend and backend with MySQL data storage.",
        "Implemented role access, stock mutation rules, insufficient-stock validation, history, and PDF reporting.",
        "Ran functional and regression checks with Katalon and deployed the Dockerized application on Ubuntu.",
      ],
      id: [
        "Merancang alur inventaris dan antarmuka di Figma.",
        "Membangun frontend dan backend Laravel dengan penyimpanan data MySQL.",
        "Mengimplementasikan akses peran, aturan perubahan stok, validasi stok tidak mencukupi, riwayat, dan laporan PDF.",
        "Menjalankan pemeriksaan fungsional dan regresi dengan Katalon serta melakukan deployment aplikasi berbasis Docker di Ubuntu.",
      ],
    },
    technicalNotes: {
      en: [
        "Master data covers goods, categories, and suppliers.",
        "Incoming and outgoing transactions update stock records automatically.",
        "Outgoing transactions are blocked when the available quantity is insufficient.",
        "Reports can be filtered by date range and exported as PDF documents.",
      ],
      id: [
        "Data master mencakup barang, kategori, dan pemasok.",
        "Transaksi masuk dan keluar memperbarui catatan stok secara otomatis.",
        "Transaksi keluar diblokir ketika jumlah stok tersedia tidak mencukupi.",
        "Laporan dapat difilter berdasarkan rentang tanggal dan diekspor sebagai dokumen PDF.",
      ],
    },
    techStack: ["Laravel", "PHP", "MySQL", "Katalon Studio", "Docker", "Ubuntu"],
    cover: {
      src: "/assets/projects/simastok/cover.webp",
      alt: { en: "SIMASTOK inventory system sign-in interface", id: "Antarmuka masuk sistem inventaris SIMASTOK" },
      position: "center",
    },
    evidence: [
      {
        id: "FIG.01",
        src: "/assets/projects/simastok/documentation/01.webp",
        format: "wide",
        alt: { en: "SIMASTOK inventory interface documentation", id: "Dokumentasi antarmuka inventaris SIMASTOK" },
        caption: { en: "Inventory authentication and master dashboard view.", id: "Tampilan autentikasi dan dashboard master inventaris." },
      },
      {
        id: "FIG.02",
        src: "/assets/projects/simastok/documentation/02.webp",
        format: "wide",
        alt: { en: "SIMASTOK stock workflow interface", id: "Antarmuka alur stok SIMASTOK" },
        caption: { en: "Stock movement recording and date-range reporting view.", id: "Pencatatan pergerakan stok dan tampilan pelaporan berbasis tanggal." },
      },
    ],
  },
  {
    index: "06",
    slug: "ml-for-heart-attack-risk-prediction",
    category: "ml",
    categoryLabel: categoryLabels.ml,
    title: {
      en: "Machine Learning Model for Heart Attack Risk Prediction",
      id: "Machine Learning Model for Heart Attack Risk Prediction",
    },
    role: { en: "Machine Learning Developer", id: "Machine Learning Developer" },
    status: {
      en: "Prototype with deployed inference service",
      id: "Purwarupa dengan layanan inferensi yang telah di-deploy",
    },
    overview: {
      en: [
        "This risk-prediction prototype compares four binary-classification algorithms on 158,355 observations with 21 predictors.",
        "A selected Random Forest model is packaged as a Flask inference service that returns a class, probability, supporting factors, and global feature importance.",
      ],
      id: [
        "Purwarupa prediksi risiko ini membandingkan empat algoritma klasifikasi biner pada 158.355 observasi dengan 21 prediktor.",
        "Model Random Forest terpilih dikemas sebagai layanan inferensi Flask yang menghasilkan kelas, probabilitas, faktor pendukung, dan feature importance global.",
      ],
    },
    contributions: {
      en: [
        "Prepared the dataset by encoding five categorical fields and applying MinMaxScaler.",
        "Created a stratified 80:20 split and applied SMOTE to the training partition only.",
        "Compared Random Forest, linear SVM, KNN, and Logistic Regression with RandomizedSearchCV focused on F1.",
        "Serialized the selected artifacts with Joblib and deployed the Flask service through Docker on Ubuntu.",
      ],
      id: [
        "Menyiapkan dataset dengan encoding lima field kategorikal dan menerapkan MinMaxScaler.",
        "Membuat pembagian stratified 80:20 dan menerapkan SMOTE hanya pada partisi training.",
        "Membandingkan Random Forest, linear SVM, KNN, dan Logistic Regression dengan RandomizedSearchCV berfokus pada F1.",
        "Menyimpan artefak terpilih dengan Joblib dan melakukan deployment layanan Flask melalui Docker di Ubuntu.",
      ],
    },
    technicalNotes: {
      en: [
        "The original data contains 158,355 rows, 22 columns, and no missing values.",
        "The stratified split produced 126,684 training rows and 31,671 test rows before training-only SMOTE balancing.",
        "Random Forest reached 71.93% accuracy, 64.12% precision, 68.15% recall, 0.6607 F1, and 0.8015 ROC-AUC.",
        "Logistic Regression produced the highest compared F1 at 0.6618, while KNN produced the highest recall at 70.40%; Random Forest was selected for its leading accuracy and ROC-AUC.",
      ],
      id: [
        "Data awal berisi 158.355 baris, 22 kolom, dan tidak memiliki missing value.",
        "Pembagian stratified menghasilkan 126.684 baris training dan 31.671 baris test sebelum penyeimbangan SMOTE khusus training.",
        "Random Forest mencapai accuracy 71,93%, precision 64,12%, recall 68,15%, F1 0,6607, dan ROC-AUC 0,8015.",
        "Logistic Regression menghasilkan F1 tertinggi dalam perbandingan sebesar 0,6618, sedangkan KNN menghasilkan recall tertinggi sebesar 70,40%; Random Forest dipilih karena memimpin accuracy dan ROC-AUC.",
      ],
    },
    techStack: ["Python", "Scikit-learn", "Pandas", "SMOTE", "Joblib", "Flask", "Docker"],
    cover: {
      src: "/assets/projects/ml-for-heart-attack-risk-prediction/cover.webp",
      alt: { en: "Structured input for the risk-prediction prototype", id: "Input terstruktur untuk purwarupa prediksi risiko" },
      position: "top",
    },
    evidence: [
      {
        id: "FIG.01",
        src: "/assets/projects/ml-for-heart-attack-risk-prediction/documentation/01.webp",
        format: "wide",
        alt: { en: "Risk-prediction prototype input evidence", id: "Bukti input purwarupa prediksi risiko" },
        caption: { en: "Structured patient clinical input submitted to the inference workflow.", id: "Data input klinis pasien terstruktur yang dikirim ke alur inferensi." },
      },
      {
        id: "FIG.02",
        src: "/assets/projects/ml-for-heart-attack-risk-prediction/documentation/02.webp",
        format: "wide",
        alt: { en: "Risk-prediction prototype output evidence", id: "Bukti output purwarupa prediksi risiko" },
        caption: { en: "Inference response showing risk classification and probability output.", id: "Respons inferensi yang menampilkan klasifikasi risiko dan skor probabilitas." },
      },
    ],
    claimBoundary: {
      en: "This is a risk-prediction prototype and decision-support experiment, not a clinical diagnosis.",
      id: "Ini adalah purwarupa prediksi risiko dan eksperimen pendukung keputusan, bukan diagnosis klinis.",
    },
  },
  {
    index: "07",
    slug: "speech-to-text-system",
    category: "ml",
    categoryLabel: categoryLabels.ml,
    title: { en: "Speech-to-Text System", id: "Speech-to-Text System" },
    role: { en: "Machine Learning / AI Developer", id: "Machine Learning / AI Developer" },
    status: { en: "Completed workflow", id: "Workflow selesai" },
    overview: {
      en: [
        "This Google Colab workflow converts audio or video into reusable transcript and subtitle outputs.",
        "It normalizes source media, performs inference with the pretrained facebook/wav2vec2-base-960h model, and exports TXT, CSV, JSON, SRT, and burned-in subtitles.",
      ],
      id: [
        "Workflow Google Colab ini mengubah audio atau video menjadi output transkrip dan subtitle yang dapat digunakan kembali.",
        "Workflow menormalisasi media sumber, menjalankan inferensi dengan model pralatih facebook/wav2vec2-base-960h, serta mengekspor TXT, CSV, JSON, SRT, dan burned-in subtitle.",
      ],
    },
    contributions: {
      en: [
        "Built the media-ingestion flow for audio and video sources.",
        "Implemented mono 16 kHz conversion and chunk-based processing before inference.",
        "Structured transcript output for plain text, tabular, JSON, and subtitle formats.",
        "Added SRT generation and an FFmpeg step for burned-in subtitle output.",
      ],
      id: [
        "Membangun alur ingest media untuk sumber audio dan video.",
        "Mengimplementasikan konversi mono 16 kHz dan pemrosesan berbasis chunk sebelum inferensi.",
        "Menyusun output transkrip untuk format teks biasa, tabular, JSON, dan subtitle.",
        "Menambahkan pembuatan SRT dan tahap FFmpeg untuk output burned-in subtitle.",
      ],
    },
    technicalNotes: {
      en: [
        "Audio is converted to mono at a 16 kHz sample rate before model inference.",
        "Long inputs are divided into chunks so the workflow can process them sequentially.",
        "The implementation uses the pretrained Wav2Vec2 base 960-hour model as documented.",
        "The available project record does not include a benchmark evaluation.",
      ],
      id: [
        "Audio dikonversi menjadi mono dengan sample rate 16 kHz sebelum inferensi model.",
        "Input panjang dibagi menjadi beberapa chunk agar workflow dapat memprosesnya secara berurutan.",
        "Implementasi menggunakan model pralatih Wav2Vec2 base 960-hour sesuai dokumentasi.",
        "Catatan proyek yang tersedia tidak mencakup evaluasi benchmark.",
      ],
    },
    techStack: ["Python", "Wav2Vec2", "Hugging Face Transformers", "Librosa", "FFmpeg", "Pandas"],
    cover: {
      src: "/assets/projects/speech-to-text-system/cover.webp",
      alt: { en: "Before and after subtitle output from the speech-to-text workflow", id: "Perbandingan output subtitle dari workflow speech-to-text" },
      position: "center",
    },
    evidence: [
      {
        id: "FIG.01",
        src: "/assets/projects/speech-to-text-system/documentation/01.webp",
        format: "wide",
        alt: { en: "Speech-to-text subtitle workflow evidence", id: "Bukti alur subtitle speech-to-text" },
        caption: { en: "Automatic speech recognition output showing generated video subtitles.", id: "Output automatic speech recognition yang menampilkan subtitle video otomatis." },
      },
    ],
  },
  {
    index: "08",
    slug: "thermal-printer-service",
    category: "mobile",
    categoryLabel: categoryLabels.mobile,
    title: { en: "Thermal Printer Service", id: "Thermal Printer Service" },
    role: { en: "Android Developer", id: "Android Developer" },
    status: { en: "Completed Android service", id: "Layanan Android selesai" },
    overview: {
      en: [
        "Thermal Printer Service is a native Kotlin Android PrintService for selected 58 mm and 80 mm Bluetooth thermal-printer workflows.",
        "It converts Android PDF print jobs into monochrome ESC/POS raster data and sends them over an RFCOMM/SPP connection.",
      ],
      id: [
        "Thermal Printer Service adalah Android PrintService native berbasis Kotlin untuk alur printer termal Bluetooth 58 mm dan 80 mm yang dipilih.",
        "Layanan ini mengubah print job PDF Android menjadi data raster ESC/POS monokrom dan mengirimkannya melalui koneksi RFCOMM/SPP.",
      ],
    },
    contributions: {
      en: [
        "Implemented Android PrintService discovery and print-job handling in Kotlin.",
        "Built the PDF-to-bitmap and monochrome ESC/POS raster conversion pipeline.",
        "Added Bluetooth permissions, background execution, cancellation, chunked writes, and retry handling.",
        "Created reusable printer profiles, calibration controls, and error states for 58 mm and 80 mm configurations.",
      ],
      id: [
        "Mengimplementasikan discovery Android PrintService dan penanganan print job dengan Kotlin.",
        "Membangun pipeline konversi PDF ke bitmap dan raster ESC/POS monokrom.",
        "Menambahkan izin Bluetooth, eksekusi background, pembatalan, penulisan per chunk, dan penanganan retry.",
        "Membuat profil printer reusable, kontrol kalibrasi, dan status error untuk konfigurasi 58 mm dan 80 mm.",
      ],
    },
    technicalNotes: {
      en: [
        "PdfRenderer rasterizes pages before 24-dot double-density ESC/POS encoding.",
        "Configured widths are 432 dots for 58 mm and 576 dots for 80 mm at 203 dpi.",
        "Bluetooth writes use chunks up to 1,024 bytes with four attempts at 0, 200, 500, and 1,000 ms delays.",
        "Printer profiles persist eight configuration attributes as JSON in SharedPreferences.",
      ],
      id: [
        "PdfRenderer meraster halaman sebelum encoding ESC/POS double-density 24-dot.",
        "Lebar yang dikonfigurasi adalah 432 dot untuk 58 mm dan 576 dot untuk 80 mm pada 203 dpi.",
        "Penulisan Bluetooth menggunakan chunk hingga 1.024 byte dengan empat percobaan pada jeda 0, 200, 500, dan 1.000 ms.",
        "Profil printer menyimpan delapan atribut konfigurasi sebagai JSON di SharedPreferences.",
      ],
    },
    techStack: ["Kotlin", "Android SDK", "Print Framework", "PdfRenderer", "Bluetooth RFCOMM/SPP", "ESC/POS"],
    cover: {
      src: "/assets/projects/thermal-printer-service/cover.webp",
      alt: { en: "Thermal Printer Service Android application identity", id: "Identitas aplikasi Android Thermal Printer Service" },
      position: "center",
    },
    videoSrc: "/assets/projects/thermal-printer-service/demo.webm",
    evidence: [
      {
        id: "FIG.01",
        src: "/assets/projects/thermal-printer-service/documentation/01.webp",
        format: "mobile",
        alt: { en: "Thermal Printer Service mobile interface", id: "Antarmuka mobile Thermal Printer Service" },
        caption: { en: "Thermal Printer Service main configuration interface on Android.", id: "Antarmuka konfigurasi utama Thermal Printer Service di Android." },
      },
      {
        id: "FIG.02",
        src: "/assets/projects/thermal-printer-service/documentation/02.webp",
        format: "mobile",
        alt: { en: "Thermal printer profile configuration", id: "Konfigurasi profil printer termal" },
        caption: { en: "Documented printer-profile configuration and Bluetooth setup flow.", id: "Alur konfigurasi profil printer dan setup koneksi Bluetooth." },
      },
      {
        id: "FIG.03",
        src: "/assets/projects/thermal-printer-service/documentation/03.webp",
        format: "mobile",
        alt: { en: "Thermal Printer Service calibration interface", id: "Antarmuka kalibrasi Thermal Printer Service" },
        caption: { en: "Mobile print calibration testing and hardware service-state evidence.", id: "Uji kalibrasi pencetakan dan bukti status layanan hardware pada mobile." },
      },
    ],
  },
  {
    index: "09",
    slug: "footy-standings",
    category: "mobile",
    categoryLabel: categoryLabels.mobile,
    title: { en: "Footy Standings", id: "Footy Standings" },
    role: { en: "Flutter Developer", id: "Flutter Developer" },
    status: { en: "Implementation documented", id: "Implementasi terdokumentasi" },
    overview: {
      en: [
        "Footy Standings is a Flutter application that retrieves football competition data from the Football Data REST API.",
        "It presents standings, upcoming fixtures, top scorers, and club details across six supported competitions in a five-destination mobile interface.",
      ],
      id: [
        "Footy Standings adalah aplikasi Flutter yang mengambil data kompetisi sepak bola dari Football Data REST API.",
        "Aplikasi ini menyajikan klasemen, jadwal mendatang, pencetak gol terbanyak, dan detail klub untuk enam kompetisi melalui antarmuka mobile dengan lima tujuan navigasi.",
      ],
    },
    contributions: {
      en: [
        "Built the Flutter and Dart interface with Material components and bottom navigation.",
        "Integrated Football Data REST endpoints through HTTP and JSON parsing.",
        "Created four data models for competition, fixture, scorer, and club-detail responses.",
        "Implemented explicit loading, error, empty, and success states with Future and FutureBuilder.",
      ],
      id: [
        "Membangun antarmuka Flutter dan Dart dengan komponen Material serta bottom navigation.",
        "Mengintegrasikan endpoint Football Data REST melalui HTTP dan parsing JSON.",
        "Membuat empat model data untuk respons kompetisi, jadwal, pencetak gol, dan detail klub.",
        "Mengimplementasikan status loading, error, kosong, dan berhasil secara eksplisit dengan Future dan FutureBuilder.",
      ],
    },
    technicalNotes: {
      en: [
        "The app covers Premier League, La Liga, Bundesliga, Serie A, Ligue 1, and Primeira Liga.",
        "Four API-backed feature groups cover tables, fixtures, scorers, and club details.",
        "FutureBuilder maps asynchronous requests into clear interface states.",
        "External destinations are opened through url_launcher where used.",
      ],
      id: [
        "Aplikasi mencakup Premier League, La Liga, Bundesliga, Serie A, Ligue 1, dan Primeira Liga.",
        "Empat kelompok fitur berbasis API mencakup klasemen, jadwal, pencetak gol, dan detail klub.",
        "FutureBuilder memetakan request asynchronous menjadi status antarmuka yang jelas.",
        "Tujuan eksternal dibuka melalui url_launcher ketika digunakan.",
      ],
    },
    techStack: ["Flutter", "Dart", "Football Data REST API", "HTTP", "JSON", "FutureBuilder"],
    cover: {
      src: "/assets/projects/footy-standings/cover.webp",
      alt: { en: "Footy Standings mobile league table", id: "Klasemen liga pada aplikasi Footy Standings" },
      position: "top",
    },
    evidence: [
      {
        id: "FIG.01",
        src: "/assets/projects/footy-standings/documentation/01.webp",
        format: "mobile",
        alt: { en: "Footy Standings competition interface", id: "Antarmuka kompetisi Footy Standings" },
        caption: { en: "League standings view showing table rankings and club statistics.", id: "Tampilan klasemen liga yang menyajikan posisi tabel dan statistik klub." },
      },
      {
        id: "FIG.02",
        src: "/assets/projects/footy-standings/documentation/02.webp",
        format: "mobile",
        alt: { en: "Footy Standings fixture interface", id: "Antarmuka jadwal Footy Standings" },
        caption: { en: "Documented fixture and competition match calendar view.", id: "Tampilan jadwal pertandingan dan kalender kompetisi yang terdokumentasi." },
      },
      {
        id: "FIG.03",
        src: "/assets/projects/footy-standings/documentation/03.webp",
        format: "mobile",
        alt: { en: "Footy Standings club data interface", id: "Antarmuka data klub Footy Standings" },
        caption: { en: "Club details and top goalscorer ranking presentation.", id: "Penyajian detail profil klub dan peringkat top goalscorer." },
      },
    ],
  },
  {
    index: "10",
    slug: "panoramic-virtual-tour",
    category: "other",
    categoryLabel: categoryLabels.other,
    title: { en: "Panoramic Virtual Tour", id: "Panoramic Virtual Tour" },
    role: { en: "Junior Game Developer Intern", id: "Junior Game Developer Intern" },
    period: { en: "8 July - 8 August 2024", id: "8 Juli - 8 Agustus 2024" },
    status: { en: "Completed prototype", id: "Purwarupa selesai" },
    overview: {
      en: [
        "This Unity panoramic-tour prototype was built during a one-month internship in the IT division of PT Duta Basis Dataprima.",
        "It organizes 78 rendered panoramas into a navigable structure of up to 79 scenes using 360 View and hotspot-based movement.",
      ],
      id: [
        "Purwarupa tur panorama Unity ini dibangun selama kerja praktik satu bulan di divisi IT PT Duta Basis Dataprima.",
        "Purwarupa mengatur 78 panorama hasil render ke dalam struktur navigasi hingga 79 scene menggunakan 360 View dan perpindahan berbasis hotspot.",
      ],
    },
    contributions: {
      en: [
        "Prepared 78 panorama renders in Lumion for use inside Unity scenes.",
        "Built reusable 360 View and hotspot-navigation behavior in C#.",
        "Implemented mouse and touch selection through Physics Raycast and BoxCollider targets.",
        "Added asynchronous scene loading and a persistent PlayerRig, then presented the completed prototype to the director.",
      ],
      id: [
        "Menyiapkan 78 render panorama di Lumion untuk digunakan di dalam scene Unity.",
        "Membangun perilaku 360 View dan navigasi hotspot yang reusable dengan C#.",
        "Mengimplementasikan pemilihan melalui mouse dan touch menggunakan Physics Raycast serta target BoxCollider.",
        "Menambahkan pemuatan scene asynchronous dan PlayerRig persisten, lalu mempresentasikan purwarupa selesai kepada direktur.",
      ],
    },
    technicalNotes: {
      en: [
        "The documented scene structure includes initialization, lobby, and Scene1 through Scene77.",
        "Reusable hotspot objects connect panoramic locations through scene transitions.",
        "Physics Raycast and BoxCollider provide a shared selection mechanism for mouse and touch input.",
        "Asynchronous loading changes scenes while the PlayerRig persists between them.",
      ],
      id: [
        "Struktur scene terdokumentasi mencakup initialization, lobby, serta Scene1 hingga Scene77.",
        "Objek hotspot reusable menghubungkan lokasi panorama melalui perpindahan scene.",
        "Physics Raycast dan BoxCollider menyediakan mekanisme pemilihan bersama untuk input mouse dan touch.",
        "Pemuatan asynchronous mengganti scene sementara PlayerRig tetap persisten di antaranya.",
      ],
    },
    techStack: ["Unity", "C#", "Lumion", "Physics Raycast", "Scene Management"],
    cover: {
      src: "/assets/projects/panoramic-virtual-tour/cover.webp",
      alt: { en: "Opening scene of the Unity panoramic tour prototype", id: "Scene pembuka purwarupa tur panorama Unity" },
      position: "center",
    },
    evidence: [
      {
        id: "FIG.01",
        src: "/assets/projects/panoramic-virtual-tour/documentation/01.webp",
        format: "wide",
        alt: { en: "Panoramic tour scene documentation", id: "Dokumentasi scene tur panorama" },
        caption: { en: "Interactive 360-degree panoramic view rendered in Lumion Pro.", id: "Tampilan panorama 360 derajat interaktif yang dirender di Lumion Pro." },
      },
      {
        id: "FIG.02",
        src: "/assets/projects/panoramic-virtual-tour/documentation/02.webp",
        format: "wide",
        alt: { en: "Panoramic tour hotspot navigation", id: "Navigasi hotspot tur panorama" },
        caption: { en: "Hotspot navigation triggers connecting adjacent panoramic scenes in Unity.", id: "Trigger navigasi hotspot yang menghubungkan scene panorama berdekatan di Unity." },
      },
      {
        id: "FIG.03",
        src: "/assets/projects/panoramic-virtual-tour/documentation/03.webp",
        format: "wide",
        alt: { en: "Unity panoramic environment documentation", id: "Dokumentasi lingkungan panorama Unity" },
        caption: { en: "Architectural interior exploration scene with interactive camera rotation.", id: "Scene eksplorasi interior arsitektur dengan rotasi kamera interaktif." },
      },
    ],
  },
] as const;

export function getProjectCaseStudy(slug: string): ProjectCaseStudy | null {
  return projectCaseStudies.find((project) => project.slug === slug) ?? null;
}

export function getAdjacentProjectCaseStudies(slug: string): {
  previous: ProjectCaseStudy | null;
  next: ProjectCaseStudy | null;
} {
  const index = projectCaseStudies.findIndex((project) => project.slug === slug);

  if (index < 0) {
    return { previous: null, next: null };
  }

  return {
    previous: index > 0 ? projectCaseStudies[index - 1] : null,
    next:
      index < projectCaseStudies.length - 1
        ? projectCaseStudies[index + 1]
        : null,
  };
}
