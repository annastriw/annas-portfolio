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
  readonly architectureNote?: LocalizedProjectText;
}

export interface DialisisEducationalContent {
  readonly formats: {
    readonly label: LocalizedProjectText;
    readonly items: LocalizedProjectList;
  };
  readonly topics: {
    readonly label: LocalizedProjectText;
    readonly items: LocalizedProjectList;
  };
}

export interface DialisisCommunityDiscussion {
  readonly label?: LocalizedProjectText;
  readonly features: LocalizedProjectList;
}

export interface DialisisSystemScopeData {
  readonly userRoles: readonly SystemUserRole[];
  readonly educationalContent: DialisisEducationalContent;
  readonly communityDiscussion: DialisisCommunityDiscussion;
}

export interface NusaSystemScopeGroup {
  readonly title: LocalizedProjectText;
  readonly items: LocalizedProjectList;
}

export interface NusaSystemScopeData {
  readonly groups: readonly NusaSystemScopeGroup[];
}

export interface SimastokSystemScopeGroup {
  readonly title: LocalizedProjectText;
  readonly description: LocalizedProjectText;
}

export interface SimastokSystemScopeData {
  readonly groups: readonly SimastokSystemScopeGroup[];
}

export interface ProjectMetadataRow {
  readonly label: LocalizedProjectText;
  readonly value: LocalizedProjectText;
}

export interface ProjectOptionalModule {
  readonly id?: string;
  readonly title: LocalizedProjectText;
  readonly subtag?: LocalizedProjectText;
  readonly paragraphs?: LocalizedProjectList;
  readonly items?: LocalizedProjectList;
  readonly notes?: LocalizedProjectList;
  readonly groups?: readonly ProjectTechnologyGroup[];
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
  readonly clientLabel?: LocalizedProjectText;
  readonly workingModel?: LocalizedProjectText;
  readonly lead?: LocalizedProjectText;
  readonly metadataRows?: readonly ProjectMetadataRow[];
  readonly metaTitle?: LocalizedProjectText;
  readonly metaDescription?: LocalizedProjectText;
  readonly repositoryNotice?: LocalizedProjectText;
  readonly overview: LocalizedProjectList;
  readonly contributions: LocalizedProjectList;
  readonly contributionLearning?: LocalizedProjectText;
  readonly technicalNotes?: LocalizedProjectList;
  readonly modules?: readonly string[];
  readonly workflow?: LocalizedProjectList;
  readonly technologyGroups?: readonly ProjectTechnologyGroup[];
  readonly systemScope?: IHealthSystemScopeData;
  readonly dialisisScope?: DialisisSystemScopeData;
  readonly nusaScope?: NusaSystemScopeData;
  readonly simastokScope?: SimastokSystemScopeData;
  readonly optionalModule?: ProjectOptionalModule;
  readonly techStack: readonly string[];
  readonly personalTechStack?: readonly string[];
  readonly personalStackTag?: LocalizedProjectText;
  readonly claimBoundaryTag?: LocalizedProjectText;
  readonly sectionTitles?: {
    readonly gallery?: LocalizedProjectText;
    readonly overview?: LocalizedProjectText;
    readonly contribution?: LocalizedProjectText;
    readonly scope?: LocalizedProjectText;
    readonly optional?: LocalizedProjectText;
  };
  readonly cover: {
    readonly src: string;
    readonly alt: LocalizedProjectText;
    readonly position?: "center" | "top";
    readonly caption?: LocalizedProjectText;
  };
  readonly evidence: readonly ProjectEvidence[];
  readonly gallery?: readonly ProjectGallerySlide[];
  readonly galleryThumbnails?: boolean;
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
    workingModel: {
      en: "Independently developed",
      id: "Dikembangkan mandiri",
    },
    lead: {
      en: "A multi-branch ERP that brings inventory, sales, and daily operations into one system.",
      id: "ERP multi-cabang yang menyatukan pengelolaan stok, penjualan, dan operasional harian dalam satu sistem.",
    },
    metaTitle: {
      en: "UKG System — Full-Stack Web Development Case Study | Annas Tri Widagdo",
      id: "UKG System — Studi Kasus Full-Stack Web Development | Annas Tri Widagdo",
    },
    metaDescription: {
      en: "A full-stack case study of a multi-branch ERP that centralizes inventory, sales, and daily operations for remote monitoring.",
      id: "Studi kasus full-stack ERP multi-cabang yang memusatkan stok, penjualan, dan operasional harian agar dapat dipantau dari mana saja.",
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
    personalTechStack: [
      "Figma",
      "Next.js",
      "NestJS",
      "MySQL",
      "Katalon Studio",
      "Linux Ubuntu",
    ],
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
    techStack: [
      "Figma",
      "Next.js",
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
      caption: {
        en: "TODO_UKG_CAPTION_01_EN",
        id: "TODO_UKG_CAPTION_01_ID",
      },
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
          en: "TODO_UKG_CAPTION_02_EN",
          id: "TODO_UKG_CAPTION_02_ID",
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
          en: "TODO_UKG_CAPTION_03_EN",
          id: "TODO_UKG_CAPTION_03_ID",
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
          en: "TODO_UKG_CAPTION_04_EN",
          id: "TODO_UKG_CAPTION_04_ID",
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
          en: "TODO_UKG_CAPTION_05_EN",
          id: "TODO_UKG_CAPTION_05_ID",
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
          en: "TODO_UKG_CAPTION_06_EN",
          id: "TODO_UKG_CAPTION_06_ID",
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
          en: "TODO_UKG_CAPTION_07_EN",
          id: "TODO_UKG_CAPTION_07_ID",
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
          en: "TODO_UKG_CAPTION_08_EN",
          id: "TODO_UKG_CAPTION_08_ID",
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
          en: "TODO_UKG_CAPTION_09_EN",
          id: "TODO_UKG_CAPTION_09_ID",
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
          en: "TODO_UKG_CAPTION_01_EN",
          id: "TODO_UKG_CAPTION_01_ID",
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
          en: "TODO_UKG_CAPTION_02_EN",
          id: "TODO_UKG_CAPTION_02_ID",
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
          en: "TODO_UKG_CAPTION_03_EN",
          id: "TODO_UKG_CAPTION_03_ID",
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
          en: "TODO_UKG_CAPTION_04_EN",
          id: "TODO_UKG_CAPTION_04_ID",
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
          en: "TODO_UKG_CAPTION_05_EN",
          id: "TODO_UKG_CAPTION_05_ID",
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
          en: "TODO_UKG_CAPTION_06_EN",
          id: "TODO_UKG_CAPTION_06_ID",
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
          en: "TODO_UKG_CAPTION_07_EN",
          id: "TODO_UKG_CAPTION_07_ID",
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
          en: "TODO_UKG_CAPTION_08_EN",
          id: "TODO_UKG_CAPTION_08_ID",
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
          en: "TODO_UKG_CAPTION_09_EN",
          id: "TODO_UKG_CAPTION_09_ID",
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
    clientLabel: {
      en: "Stakeholder",
      id: "Stakeholder",
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
      en: "A frontend case study covering UI/UX, IoT health data, and machine learning decision-support integration for iHealth Edu.",
      id: "Studi kasus frontend iHealth Edu yang mencakup UI/UX, data kesehatan IoT, dan integrasi machine learning decision support.",
    },
    liveUrl: "https://www.ihealthedu.site/",
    frontendRepoUrl: "https://github.com/annastriw/frontend-ihealth.git",
    backendRepoUrl: "https://github.com/annastriw/backend-ihealth.git",
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
    personalTechStack: [
      "Figma",
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "REST API",
    ],
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
              "Centralized patient history for appropriate role-based monitoring.",
            ],
            id: [
              "Catatan terpusat yang dapat dipantau oleh role terkait.",
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
        id: "FIG.02",
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
        id: "FIG.03",
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
        id: "FIG.04",
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
        id: "FIG.05",
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
        id: "FIG.06",
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
        id: "FIG.07",
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
    galleryThumbnails: true,
    claimBoundary: {
      en: "Machine learning results are presented only as decision support for health workers and do not provide a clinical diagnosis or medical advice.",
      id: "Hasil machine learning hanya digunakan sebagai decision support bagi tenaga kesehatan dan bukan sebagai diagnosis klinis atau saran medis.",
    },
  },
  {
    index: "03",
    slug: "dialisis-connect-edu",
    category: "web-app",
    categoryLabel: { en: "03 / WEB APPLICATION", id: "03 / WEB APPLICATION" },
    title: { en: "Dialisis Connect Edu", id: "Dialisis Connect Edu" },
    client: {
      en: "Ikatan Perawat Dialisis Indonesia (IPDI) Jawa Tengah",
      id: "Ikatan Perawat Dialisis Indonesia (IPDI) Jawa Tengah",
    },
    clientLabel: {
      en: "Stakeholder",
      id: "Stakeholder",
    },
    role: {
      en: "Frontend Web Developer",
      id: "Frontend Web Developer",
    },
    workingModel: {
      en: "Four-person team",
      id: "Tim beranggotakan empat orang",
    },
    period: {
      en: "February–May 2025",
      id: "Februari–Mei 2025",
    },
    status: {
      en: "Live Production",
      id: "Live Production",
    },
    lead: {
      en: "An education and community platform that helps patients undergoing hemodialysis and people living with kidney disease access structured learning materials and participate in digital discussions from wherever they are.",
      id: "Platform edukasi dan komunitas yang membantu pasien hemodialisis dan pengguna dengan penyakit ginjal mengakses materi terstruktur serta mengikuti diskusi digital dari mana saja.",
    },
    metaTitle: {
      en: "Dialisis Connect Edu — Frontend Web Development Case Study | Annas Tri Widagdo",
      id: "Dialisis Connect Edu — Studi Kasus Frontend Web Development | Annas Tri Widagdo",
    },
    metaDescription: {
      en: "A frontend and UI/UX case study for a kidney health education platform with digital learning and community discussion, developed with IPDI Central Java.",
      id: "Studi kasus frontend dan UI/UX platform edukasi kesehatan ginjal dengan pembelajaran digital dan forum diskusi, dikembangkan bersama IPDI Jawa Tengah.",
    },
    liveUrl: "https://dialisisconnectedu.vercel.app/",
    frontendRepoUrl: "https://github.com/annastriw/fe-dialisis.git",
    backendRepoUrl: "https://github.com/annastriw/be-dialisis.git",
    overview: {
      en: [
        "Dialisis Connect Edu was developed by a four-person team with IPDI Central Java to bring kidney health education and community interaction into an accessible digital platform.",
        "The platform provides articles, educational videos, digital booklets, and discussion forums for patients, healthcare professionals, administrators, families, and the wider public. Requirements were refined through interviews, discussions, and feedback from IPDI Central Java.",
      ],
      id: [
        "Dialisis Connect Edu dikembangkan oleh tim beranggotakan empat orang bersama IPDI Jawa Tengah untuk menghadirkan edukasi kesehatan ginjal dan interaksi komunitas melalui platform digital yang mudah diakses.",
        "Platform ini menyediakan artikel, video edukasi, booklet digital, dan forum diskusi bagi pasien, tenaga kesehatan, administrator, keluarga, serta masyarakat. Kebutuhan sistem dirumuskan melalui wawancara, diskusi, dan feedback dari IPDI Jawa Tengah.",
      ],
    },
    claimBoundary: {
      en: "The platform provides education and community discussion, not diagnosis or a substitute for consultation with a healthcare professional.",
      id: "Platform ini menyediakan edukasi dan ruang diskusi, bukan diagnosis atau pengganti konsultasi dengan tenaga kesehatan.",
    },
    claimBoundaryTag: {
      en: "[CLAIM BOUNDARY // MEDICAL USE]",
      id: "[BATAS KLAIM // PENGGUNAAN MEDIS]",
    },
    contributions: {
      en: [
        "Gathered requirements through interviews and discussions with IPDI Central Java, then incorporated stakeholder feedback throughout the revision process.",
        "Designed the user flow, information architecture, and UI/UX in Figma.",
        "Developed the complete role-based frontend in Next.js and integrated the REST API, including authentication flows, validation, loading states, and error states.",
        "Performed manual and automated testing with Katalon Studio and contributed to the Docker and production deployment process.",
      ],
      id: [
        "Menggali kebutuhan melalui wawancara dan diskusi dengan IPDI Jawa Tengah, kemudian mengolah feedback stakeholder selama proses revisi.",
        "Merancang user flow, information architecture, dan UI/UX menggunakan Figma.",
        "Mengembangkan seluruh frontend berbasis role menggunakan Next.js dan mengintegrasikan REST API, termasuk authentication flow, validation, loading state, dan error state.",
        "Melakukan manual dan automation testing dengan Katalon Studio serta ikut dalam proses Docker dan deployment ke production.",
      ],
    },
    personalTechStack: [
      "Figma",
      "Next.js",
      "React",
      "REST API",
      "Katalon Studio",
      "Docker",
    ],
    dialisisScope: {
      userRoles: [
        {
          name: { en: "Patient", id: "Pasien" },
          description: {
            en: "Accesses learning materials and participates in community discussions.",
            id: "Mengakses materi pembelajaran dan mengikuti diskusi komunitas.",
          },
        },
        {
          name: { en: "Healthcare Professional", id: "Tenaga Kesehatan" },
          description: {
            en: "Provides educational material and participates in discussions.",
            id: "Menyediakan materi edukasi dan berpartisipasi dalam diskusi.",
          },
        },
        {
          name: { en: "Administrator", id: "Administrator" },
          description: {
            en: "Manages users, content, and platform activity.",
            id: "Mengelola pengguna, konten, dan aktivitas platform.",
          },
        },
      ],
      educationalContent: {
        formats: {
          label: { en: "Content Formats", id: "Format Konten" },
          items: {
            en: ["Articles", "Embedded YouTube videos", "Digital PDF booklets"],
            id: ["Artikel", "Video YouTube tersemat", "Booklet digital PDF"],
          },
        },
        topics: {
          label: { en: "Education Topics", id: "Topik Edukasi" },
          items: {
            en: [
              "Kidney care",
              "Dialysis",
              "Transplantation",
              "Healthy lifestyle",
              "Support for chronic kidney disease",
            ],
            id: [
              "Perawatan ginjal",
              "Dialisis",
              "Transplantasi",
              "Pola hidup sehat",
              "Dukungan penyakit ginjal kronis",
            ],
          },
        },
      },
      communityDiscussion: {
        label: { en: "Frontend Discussion Features", id: "Fitur Diskusi Frontend" },
        features: {
          en: [
            "Creating discussion topics",
            "Reading discussions",
            "Comments and replies",
            "Role-appropriate moderation",
          ],
          id: [
            "Membuat topik diskusi",
            "Membaca diskusi",
            "Komentar dan balasan",
            "Moderasi sesuai peran",
          ],
        },
      },
    },
    techStack: [
      "Figma",
      "Next.js",
      "React",
      "REST API",
      "Katalon Studio",
      "Docker",
    ],
    cover: {
      src: "/assets/projects/dialisis-connect-edu/cover.webp",
      alt: {
        en: "Dialisis Connect Edu kidney health education and community platform homepage",
        id: "Beranda platform edukasi kesehatan ginjal dan komunitas Dialisis Connect Edu",
      },
      position: "top",
      caption: {
        en: "TODO_DIALISIS_CAPTION_01_EN",
        id: "TODO_DIALISIS_CAPTION_01_ID",
      },
    },
    evidence: [
      {
        id: "FIG.01",
        src: "/assets/projects/dialisis-connect-edu/documentation/01.webp",
        format: "wide",
        alt: {
          en: "Dialisis Connect Edu article reading and educational booklet library interface",
          id: "Antarmuka perpustakaan booklet edukasi dan pembaca artikel Dialisis Connect Edu",
        },
        caption: {
          en: "TODO_DIALISIS_CAPTION_02_EN",
          id: "TODO_DIALISIS_CAPTION_02_ID",
        },
      },
      {
        id: "FIG.02",
        src: "/assets/projects/dialisis-connect-edu/documentation/02.webp",
        format: "wide",
        alt: {
          en: "Dialisis Connect Edu interactive video learning and educational materials page",
          id: "Halaman materi edukasi dan pembelajaran video interaktif Dialisis Connect Edu",
        },
        caption: {
          en: "TODO_DIALISIS_CAPTION_03_EN",
          id: "TODO_DIALISIS_CAPTION_03_ID",
        },
      },
      {
        id: "FIG.03",
        src: "/assets/projects/dialisis-connect-edu/documentation/03.webp",
        format: "wide",
        alt: {
          en: "Dialisis Connect Edu community discussion forum with moderated thread topics",
          id: "Forum diskusi komunitas Dialisis Connect Edu dengan topik utas termoderasi",
        },
        caption: {
          en: "TODO_DIALISIS_CAPTION_04_EN",
          id: "TODO_DIALISIS_CAPTION_04_ID",
        },
      },
      {
        id: "FIG.04",
        src: "/assets/projects/dialisis-connect-edu/documentation/04.webp",
        format: "wide",
        alt: {
          en: "Dialisis Connect Edu detailed discussion thread and user comment replies",
          id: "Utas diskusi detail dan balasan komentar pengguna Dialisis Connect Edu",
        },
        caption: {
          en: "TODO_DIALISIS_CAPTION_05_EN",
          id: "TODO_DIALISIS_CAPTION_05_ID",
        },
      },
      {
        id: "FIG.05",
        src: "/assets/projects/dialisis-connect-edu/documentation/05.webp",
        format: "wide",
        alt: {
          en: "Dialisis Connect Edu user role management and profile configuration view",
          id: "Tampilan manajemen peran pengguna dan konfigurasi profil Dialisis Connect Edu",
        },
        caption: {
          en: "TODO_DIALISIS_CAPTION_06_EN",
          id: "TODO_DIALISIS_CAPTION_06_ID",
        },
      },
      {
        id: "FIG.06",
        src: "/assets/projects/dialisis-connect-edu/documentation/06.webp",
        format: "wide",
        alt: {
          en: "Dialisis Connect Edu educational content publication and administration console",
          id: "Konsol administrasi dan publikasi konten edukasi Dialisis Connect Edu",
        },
        caption: {
          en: "TODO_DIALISIS_CAPTION_07_EN",
          id: "TODO_DIALISIS_CAPTION_07_ID",
        },
      },
      {
        id: "FIG.07",
        src: "/assets/projects/dialisis-connect-edu/documentation/07.webp",
        format: "wide",
        alt: {
          en: "Dialisis Connect Edu digital booklet PDF reader and resource viewer",
          id: "Penampil dokumen dan pembaca PDF booklet digital Dialisis Connect Edu",
        },
        caption: {
          en: "TODO_DIALISIS_CAPTION_08_EN",
          id: "TODO_DIALISIS_CAPTION_08_ID",
        },
      },
    ],
    gallery: [
      {
        slide: "01",
        src: "/assets/projects/dialisis-connect-edu/cover.webp",
        format: "cover",
        alt: {
          en: "Dialisis Connect Edu kidney health education and community platform homepage",
          id: "Beranda platform edukasi kesehatan ginjal dan komunitas Dialisis Connect Edu",
        },
        caption: {
          en: "TODO_DIALISIS_CAPTION_01_EN",
          id: "TODO_DIALISIS_CAPTION_01_ID",
        },
      },
      {
        slide: "02",
        src: "/assets/projects/dialisis-connect-edu/documentation/01.webp",
        format: "wide",
        alt: {
          en: "Dialisis Connect Edu article reading and educational booklet library interface",
          id: "Antarmuka perpustakaan booklet edukasi dan pembaca artikel Dialisis Connect Edu",
        },
        caption: {
          en: "TODO_DIALISIS_CAPTION_02_EN",
          id: "TODO_DIALISIS_CAPTION_02_ID",
        },
      },
      {
        slide: "03",
        src: "/assets/projects/dialisis-connect-edu/documentation/02.webp",
        format: "wide",
        alt: {
          en: "Dialisis Connect Edu interactive video learning and educational materials page",
          id: "Halaman materi edukasi dan pembelajaran video interaktif Dialisis Connect Edu",
        },
        caption: {
          en: "TODO_DIALISIS_CAPTION_03_EN",
          id: "TODO_DIALISIS_CAPTION_03_ID",
        },
      },
      {
        slide: "04",
        src: "/assets/projects/dialisis-connect-edu/documentation/03.webp",
        format: "wide",
        alt: {
          en: "Dialisis Connect Edu community discussion forum with moderated thread topics",
          id: "Forum diskusi komunitas Dialisis Connect Edu dengan topik utas termoderasi",
        },
        caption: {
          en: "TODO_DIALISIS_CAPTION_04_EN",
          id: "TODO_DIALISIS_CAPTION_04_ID",
        },
      },
      {
        slide: "05",
        src: "/assets/projects/dialisis-connect-edu/documentation/04.webp",
        format: "wide",
        alt: {
          en: "Dialisis Connect Edu detailed discussion thread and user comment replies",
          id: "Utas diskusi detail dan balasan komentar pengguna Dialisis Connect Edu",
        },
        caption: {
          en: "TODO_DIALISIS_CAPTION_05_EN",
          id: "TODO_DIALISIS_CAPTION_05_ID",
        },
      },
      {
        slide: "06",
        src: "/assets/projects/dialisis-connect-edu/documentation/05.webp",
        format: "wide",
        alt: {
          en: "Dialisis Connect Edu user role management and profile configuration view",
          id: "Tampilan manajemen peran pengguna dan konfigurasi profil Dialisis Connect Edu",
        },
        caption: {
          en: "TODO_DIALISIS_CAPTION_06_EN",
          id: "TODO_DIALISIS_CAPTION_06_ID",
        },
      },
      {
        slide: "07",
        src: "/assets/projects/dialisis-connect-edu/documentation/06.webp",
        format: "wide",
        alt: {
          en: "Dialisis Connect Edu educational content publication and administration console",
          id: "Konsol administrasi dan publikasi konten edukasi Dialisis Connect Edu",
        },
        caption: {
          en: "TODO_DIALISIS_CAPTION_07_EN",
          id: "TODO_DIALISIS_CAPTION_07_ID",
        },
      },
      {
        slide: "08",
        src: "/assets/projects/dialisis-connect-edu/documentation/07.webp",
        format: "wide",
        alt: {
          en: "Dialisis Connect Edu digital booklet PDF reader and resource viewer",
          id: "Penampil dokumen dan pembaca PDF booklet digital Dialisis Connect Edu",
        },
        caption: {
          en: "TODO_DIALISIS_CAPTION_08_EN",
          id: "TODO_DIALISIS_CAPTION_08_ID",
        },
      },
    ],
    galleryThumbnails: true,
  },
  {
    index: "04",
    slug: "nusa-dakwah",
    category: "web-app",
    categoryLabel: { en: "04 / WEB APPLICATION", id: "04 / WEB APPLICATION" },
    title: { en: "Nusa Dakwah", id: "Nusa Dakwah" },
    role: { en: "Full-Stack Web Developer", id: "Full-Stack Web Developer" },
    period: { en: "January–February 2026", id: "Januari–Februari 2026" },
    status: { en: "Live Production", id: "Live Production" },
    workingModel: {
      en: "Independently developed without a client",
      id: "Dikembangkan mandiri tanpa klien",
    },
    lead: {
      en: "A digital learning platform that organizes Islamic educational content into structured modules and connects each lesson with community discussion.",
      id: "Platform pembelajaran digital yang menyusun materi dakwah dalam modul terstruktur dan menghubungkan setiap materi dengan ruang diskusi.",
    },
    metaTitle: {
      en: "Nusa Dakwah — Full-Stack Web Development Case Study | Annas Tri Widagdo",
      id: "Nusa Dakwah — Studi Kasus Full-Stack Web Development | Annas Tri Widagdo",
    },
    metaDescription: {
      en: "A full-stack case study of a digital Islamic learning platform with structured modules, multimedia content, and community discussion.",
      id: "Studi kasus full-stack platform pembelajaran dan dakwah digital dengan modul terstruktur, konten multimedia, dan diskusi komunitas.",
    },
    liveUrl: "https://nusadakwah.vercel.app/",
    repositoryNotice: {
      en: "Private Repository",
      id: "Private Repository",
    },
    overview: {
      en: [
        "Nusa Dakwah was independently developed to make Islamic learning materials easier for the public to access and follow online.",
        "Content is organized into modules, submodules, articles, and YouTube videos. Each lesson includes a discussion space, while administrators manage learning content, conversations, and user accounts.",
      ],
      id: [
        "Nusa Dakwah dikembangkan secara mandiri agar materi dakwah lebih mudah diakses dan dipelajari secara online oleh masyarakat umum.",
        "Materi disusun dalam modul, submodul, artikel, dan video YouTube. Setiap materi memiliki ruang diskusi, sementara admin mengelola konten pembelajaran, percakapan, dan akun pengguna.",
      ],
    },
    contributions: {
      en: [
        "Defined the product requirements and designed the user flow, information architecture, wireframes, and UI/UX in Figma.",
        "Developed the Next.js frontend, Laravel REST API, and MySQL database.",
        "Implemented role-based learning content, community discussions, and administration flows, including input validation and forum sanitization.",
        "Performed manual and automated testing with Katalon Studio, then deployed the frontend to Vercel and the Dockerized backend to Linux Ubuntu.",
      ],
      id: [
        "Merumuskan kebutuhan produk serta merancang user flow, information architecture, wireframe, dan UI/UX menggunakan Figma.",
        "Mengembangkan frontend Next.js, REST API Laravel, dan database MySQL.",
        "Mengimplementasikan konten pembelajaran, forum diskusi, dan alur administrasi berbasis role, termasuk validasi input dan sanitasi forum.",
        "Melakukan manual dan automation testing dengan Katalon Studio, kemudian melakukan deployment frontend ke Vercel dan backend berbasis Docker ke Linux Ubuntu.",
      ],
    },
    personalTechStack: [
      "Figma",
      "Next.js",
      "Laravel",
      "MySQL",
      "Katalon Studio",
      "Docker",
    ],
    nusaScope: {
      groups: [
        {
          title: {
            en: "Learning Structure",
            id: "Struktur Pembelajaran",
          },
          items: {
            en: [
              "Module → Submodule → Learning Content",
              "Articles",
              "YouTube Videos",
              "Structured content navigation",
            ],
            id: [
              "Modul → Submodul → Materi Pembelajaran",
              "Artikel",
              "Video YouTube",
              "Navigasi konten terstruktur",
            ],
          },
        },
        {
          title: {
            en: "Community Discussion",
            id: "Diskusi Komunitas",
          },
          items: {
            en: [
              "Discussion space attached to each lesson",
              "Comments and replies",
              "Nested replies",
              "Administrator moderation",
            ],
            id: [
              "Ruang diskusi pada setiap materi",
              "Komentar dan balasan",
              "Balasan bertingkat (nested replies)",
              "Moderasi administrator",
            ],
          },
        },
        {
          title: {
            en: "Administration",
            id: "Administrasi",
          },
          items: {
            en: [
              "Authentication and role-based access for User and Administrator",
              "Module, submodule, and learning-content management",
              "Discussion management",
              "User and account management",
            ],
            id: [
              "Autentikasi dan hak akses berbasis role untuk User dan Administrator",
              "Pengelolaan modul, submodul, dan konten pembelajaran",
              "Pengelolaan diskusi",
              "Pengelolaan pengguna dan akun",
            ],
          },
        },
      ],
    },
    techStack: [
      "Figma",
      "Next.js",
      "Laravel",
      "MySQL",
      "Katalon Studio",
      "Docker",
    ],
    cover: {
      src: "/assets/projects/nusa-dakwah/cover.webp",
      alt: {
        en: "Nusa Dakwah digital Islamic learning platform homepage and featured modules",
        id: "Beranda platform pembelajaran digital dan dakwah Islam Nusa Dakwah dengan modul pilihan",
      },
      position: "top",
      caption: {
        en: "TODO_NUSA_DAKWAH_CAPTION_01_EN",
        id: "TODO_NUSA_DAKWAH_CAPTION_01_ID",
      },
    },
    evidence: [
      {
        id: "FIG.01",
        src: "/assets/projects/nusa-dakwah/documentation/01.webp",
        format: "wide",
        alt: {
          en: "Nusa Dakwah learning catalog with structured module and submodule navigation",
          id: "Katalog pembelajaran Nusa Dakwah dengan navigasi modul dan submodul terstruktur",
        },
        caption: {
          en: "TODO_NUSA_DAKWAH_CAPTION_02_EN",
          id: "TODO_NUSA_DAKWAH_CAPTION_02_ID",
        },
      },
      {
        id: "FIG.02",
        src: "/assets/projects/nusa-dakwah/documentation/02.webp",
        format: "wide",
        alt: {
          en: "Nusa Dakwah lesson content reader with multimedia article and video view",
          id: "Tampilan pembaca materi pembelajaran Nusa Dakwah dengan artikel multimedia dan video",
        },
        caption: {
          en: "TODO_NUSA_DAKWAH_CAPTION_03_EN",
          id: "TODO_NUSA_DAKWAH_CAPTION_03_ID",
        },
      },
      {
        id: "FIG.03",
        src: "/assets/projects/nusa-dakwah/documentation/03.webp",
        format: "wide",
        alt: {
          en: "Nusa Dakwah interactive lesson-attached community discussion space",
          id: "Ruang diskusi komunitas terintegrasi pada materi pembelajaran Nusa Dakwah",
        },
        caption: {
          en: "TODO_NUSA_DAKWAH_CAPTION_04_EN",
          id: "TODO_NUSA_DAKWAH_CAPTION_04_ID",
        },
      },
      {
        id: "FIG.04",
        src: "/assets/projects/nusa-dakwah/documentation/04.webp",
        format: "wide",
        alt: {
          en: "Nusa Dakwah discussion thread with user comments and nested reply flow",
          id: "Utas diskusi Nusa Dakwah dengan komentar pengguna dan alur balasan bertingkat",
        },
        caption: {
          en: "TODO_NUSA_DAKWAH_CAPTION_05_EN",
          id: "TODO_NUSA_DAKWAH_CAPTION_05_ID",
        },
      },
      {
        id: "FIG.05",
        src: "/assets/projects/nusa-dakwah/documentation/05.webp",
        format: "wide",
        alt: {
          en: "Nusa Dakwah administrator console for module, submodule, and content management",
          id: "Konsol administrator Nusa Dakwah untuk pengelolaan modul, submodul, dan konten pembelajaran",
        },
        caption: {
          en: "TODO_NUSA_DAKWAH_CAPTION_06_EN",
          id: "TODO_NUSA_DAKWAH_CAPTION_06_ID",
        },
      },
      {
        id: "FIG.06",
        src: "/assets/projects/nusa-dakwah/documentation/06.webp",
        format: "wide",
        alt: {
          en: "Nusa Dakwah administrator dashboard for discussion moderation and user account management",
          id: "Dashboard administrator Nusa Dakwah untuk moderasi diskusi dan pengelolaan akun pengguna",
        },
        caption: {
          en: "TODO_NUSA_DAKWAH_CAPTION_07_EN",
          id: "TODO_NUSA_DAKWAH_CAPTION_07_ID",
        },
      },
    ],
    gallery: [
      {
        slide: "01",
        src: "/assets/projects/nusa-dakwah/cover.webp",
        format: "cover",
        alt: {
          en: "Nusa Dakwah digital Islamic learning platform homepage and featured modules",
          id: "Beranda platform pembelajaran digital dan dakwah Islam Nusa Dakwah dengan modul pilihan",
        },
        caption: {
          en: "TODO_NUSA_DAKWAH_CAPTION_01_EN",
          id: "TODO_NUSA_DAKWAH_CAPTION_01_ID",
        },
      },
      {
        slide: "02",
        src: "/assets/projects/nusa-dakwah/documentation/01.webp",
        format: "wide",
        alt: {
          en: "Nusa Dakwah learning catalog with structured module and submodule navigation",
          id: "Katalog pembelajaran Nusa Dakwah dengan navigasi modul dan submodul terstruktur",
        },
        caption: {
          en: "TODO_NUSA_DAKWAH_CAPTION_02_EN",
          id: "TODO_NUSA_DAKWAH_CAPTION_02_ID",
        },
      },
      {
        slide: "03",
        src: "/assets/projects/nusa-dakwah/documentation/02.webp",
        format: "wide",
        alt: {
          en: "Nusa Dakwah lesson content reader with multimedia article and video view",
          id: "Tampilan pembaca materi pembelajaran Nusa Dakwah dengan artikel multimedia dan video",
        },
        caption: {
          en: "TODO_NUSA_DAKWAH_CAPTION_03_EN",
          id: "TODO_NUSA_DAKWAH_CAPTION_03_ID",
        },
      },
      {
        slide: "04",
        src: "/assets/projects/nusa-dakwah/documentation/03.webp",
        format: "wide",
        alt: {
          en: "Nusa Dakwah interactive lesson-attached community discussion space",
          id: "Ruang diskusi komunitas terintegrasi pada materi pembelajaran Nusa Dakwah",
        },
        caption: {
          en: "TODO_NUSA_DAKWAH_CAPTION_04_EN",
          id: "TODO_NUSA_DAKWAH_CAPTION_04_ID",
        },
      },
      {
        slide: "05",
        src: "/assets/projects/nusa-dakwah/documentation/04.webp",
        format: "wide",
        alt: {
          en: "Nusa Dakwah discussion thread with user comments and nested reply flow",
          id: "Utas diskusi Nusa Dakwah dengan komentar pengguna dan alur balasan bertingkat",
        },
        caption: {
          en: "TODO_NUSA_DAKWAH_CAPTION_05_EN",
          id: "TODO_NUSA_DAKWAH_CAPTION_05_ID",
        },
      },
      {
        slide: "06",
        src: "/assets/projects/nusa-dakwah/documentation/05.webp",
        format: "wide",
        alt: {
          en: "Nusa Dakwah administrator console for module, submodule, and content management",
          id: "Konsol administrator Nusa Dakwah untuk pengelolaan modul, submodul, dan konten pembelajaran",
        },
        caption: {
          en: "TODO_NUSA_DAKWAH_CAPTION_06_EN",
          id: "TODO_NUSA_DAKWAH_CAPTION_06_ID",
        },
      },
      {
        slide: "07",
        src: "/assets/projects/nusa-dakwah/documentation/06.webp",
        format: "wide",
        alt: {
          en: "Nusa Dakwah administrator dashboard for discussion moderation and user account management",
          id: "Dashboard administrator Nusa Dakwah untuk moderasi diskusi dan pengelolaan akun pengguna",
        },
        caption: {
          en: "TODO_NUSA_DAKWAH_CAPTION_07_EN",
          id: "TODO_NUSA_DAKWAH_CAPTION_07_ID",
        },
      },
    ],
    galleryThumbnails: true,
  },
  {
    index: "05",
    slug: "simastok",
    category: "web-app",
    categoryLabel: { en: "05 // WEB APPLICATION", id: "05 // WEB APPLICATION" },
    title: { en: "SIMASTOK SHR Jaya Motor", id: "SIMASTOK SHR Jaya Motor" },
    client: { en: "SHR Jaya Motor", id: "SHR Jaya Motor" },
    clientLabel: { en: "Stakeholder", id: "Stakeholder" },
    role: {
      en: "Full-Stack Web Developer",
      id: "Full-Stack Web Developer",
    },
    period: {
      en: "December 2025–January 2026",
      id: "Desember 2025–Januari 2026",
    },
    status: { en: "Live Production", id: "Live Production" },
    lead: {
      en: "A web-based inventory system that replaces handwritten stock records with a centralized workflow for monitoring inventory, tracking incoming and outgoing parts, and preparing reports.",
      id: "Sistem inventory berbasis web yang menggantikan pencatatan stok di buku dengan workflow terpusat untuk memantau persediaan, menelusuri barang masuk dan keluar, serta membuat laporan.",
    },
    metadataRows: [
      {
        label: { en: "Role", id: "Peran" },
        value: {
          en: "Full-Stack Web Developer",
          id: "Full-Stack Web Developer",
        },
      },
      {
        label: { en: "Period", id: "Periode" },
        value: {
          en: "December 2025–January 2026",
          id: "Desember 2025–Januari 2026",
        },
      },
      {
        label: { en: "Status", id: "Status" },
        value: { en: "Live Production", id: "Live Production" },
      },
      {
        label: { en: "Stakeholder", id: "Stakeholder" },
        value: { en: "SHR Jaya Motor", id: "SHR Jaya Motor" },
      },
    ],
    metaTitle: {
      en: "SIMASTOK SHR Jaya Motor — Full-Stack Web Development Case Study | Annas Tri Widagdo",
      id: "SIMASTOK SHR Jaya Motor — Studi Kasus Full-Stack Web Development | Annas Tri Widagdo",
    },
    metaDescription: {
      en: "A full-stack case study of a production inventory system used by SHR Jaya Motor for centralized stock tracking, transaction history, and reporting.",
      id: "Studi kasus full-stack sistem inventory production yang digunakan SHR Jaya Motor untuk pemantauan stok, riwayat transaksi, dan laporan terpusat.",
    },
    liveUrl: "https://simastok.site/",
    repositoryNotice: {
      en: "Private Repository",
      id: "Private Repository",
    },
    overview: {
      en: [
        "SHR Jaya Motor previously recorded its inventory manually in books, making it difficult to monitor stock, trace transactions, and prepare reports. I gathered the system requirements through interviews and iterative feedback with the workshop.",
        "I independently designed and developed SIMASTOK for the owner and employees. The production system brings inventory records, stock transactions, automatic updates, validation, transaction history, and period-based PDF reports into one application.",
      ],
      id: [
        "Sebelum menggunakan SIMASTOK, SHR Jaya Motor mencatat persediaan secara manual di buku sehingga pemantauan stok, penelusuran transaksi, dan pembuatan laporan menjadi lebih sulit. Saya menggali kebutuhan sistem melalui wawancara dan feedback bertahap bersama pihak bengkel.",
        "Saya merancang dan mengembangkan SIMASTOK secara mandiri untuk owner dan pegawai. Sistem yang digunakan dalam operasional ini menyatukan pencatatan inventory, transaksi stok, pembaruan otomatis, validasi, riwayat transaksi, serta laporan PDF berdasarkan periode dalam satu aplikasi.",
      ],
    },
    contributions: {
      en: [
        "Gathered inventory requirements through interviews and iterative feedback with SHR Jaya Motor.",
        "Designed the inventory workflows and interfaces in Figma, then built the Laravel frontend and backend with MySQL.",
        "Implemented role-based access, master data, stock movements, insufficient-stock validation, transaction history, and reporting.",
        "Performed manual and automated testing with Katalon Studio, then containerized and deployed the application with Docker.",
      ],
      id: [
        "Menggali kebutuhan inventory melalui wawancara dan feedback bertahap bersama SHR Jaya Motor.",
        "Merancang workflow inventory dan antarmuka di Figma, kemudian membangun frontend dan backend menggunakan Laravel serta MySQL.",
        "Mengimplementasikan akses berbasis role, master data, pergerakan stok, validasi stok tidak mencukupi, riwayat transaksi, dan laporan.",
        "Melakukan manual dan automation testing menggunakan Katalon Studio, kemudian menjalankan containerization dan deployment aplikasi menggunakan Docker.",
      ],
    },
    contributionLearning: {
      en: "This project strengthened my ability to build an inventory system end-to-end until it was used in real operations.",
      id: "Project ini memperkuat kemampuan saya dalam membangun sistem inventory secara end-to-end hingga digunakan dalam operasional nyata.",
    },
    personalTechStack: [
      "Figma",
      "Laravel",
      "PHP",
      "MySQL",
      "Katalon Studio",
      "Docker",
    ],
    techStack: [
      "Figma",
      "Laravel",
      "PHP",
      "MySQL",
      "Katalon Studio",
      "Docker",
    ],
    simastokScope: {
      groups: [
        {
          title: {
            en: "Inventory Records",
            id: "Pencatatan Persediaan",
          },
          description: {
            en: "Centralized records for parts, categories, suppliers, and available stock.",
            id: "Pencatatan terpusat untuk suku cadang, kategori, supplier, dan stok yang tersedia.",
          },
        },
        {
          title: {
            en: "Stock Transactions",
            id: "Transaksi Stok",
          },
          description: {
            en: "Incoming and outgoing transactions update stock automatically, prevent invalid withdrawals, and preserve movement history.",
            id: "Transaksi barang masuk dan keluar memperbarui stok secara otomatis, mencegah pengeluaran melebihi stok, dan menyimpan riwayat pergerakan barang.",
          },
        },
        {
          title: {
            en: "Reporting & Access",
            id: "Laporan & Akses",
          },
          description: {
            en: "Role-based access for the owner and employees, supported by date-range reports and PDF exports.",
            id: "Akses berbasis role untuk owner dan pegawai, dilengkapi laporan berdasarkan rentang tanggal serta ekspor PDF.",
          },
        },
      ],
    },
    cover: {
      src: "/assets/projects/simastok/cover.webp",
      alt: {
        en: "SIMASTOK sign-in screen with email and password fields over a workshop tool background",
        id: "Halaman login SIMASTOK dengan formulir email dan kata sandi berlatar peralatan bengkel",
      },
      position: "center",
      caption: {
        en: "Authentication interface for SIMASTOK SHR Jaya Motor.",
        id: "Antarmuka autentikasi pengguna SIMASTOK SHR Jaya Motor.",
      },
    },
    evidence: [
      {
        id: "FIG.01",
        src: "/assets/projects/simastok/documentation/01.webp",
        format: "wide",
        alt: {
          en: "SIMASTOK login modal with email and password input fields",
          id: "Modal login SIMASTOK dengan kolom input email dan kata sandi",
        },
        caption: {
          en: "User login screen with authentication controls and registration link.",
          id: "Halaman login pengguna dengan kontrol autentikasi dan tautan pendaftaran.",
        },
      },
      {
        id: "FIG.02",
        src: "/assets/projects/simastok/documentation/02.webp",
        format: "wide",
        alt: {
          en: "SIMASTOK administrator dashboard with summary stat cards and stock movement bar chart",
          id: "Dashboard admin SIMASTOK dengan kartu statistik ringkasan dan grafik batang pergerakan stok",
        },
        caption: {
          en: "Administrator dashboard showing inventory summary metrics and stock movement charts.",
          id: "Dashboard administrator yang menampilkan metrik ringkasan inventaris dan grafik pergerakan stok.",
        },
      },
      {
        id: "FIG.03",
        src: "/assets/projects/simastok/documentation/03.webp",
        format: "wide",
        alt: {
          en: "SIMASTOK inventory table displaying spare parts list, categories, suppliers, stock counts, and action buttons",
          id: "Tabel inventaris SIMASTOK menampilkan daftar suku cadang, kategori, pemasok, jumlah stok, dan tombol aksi",
        },
        caption: {
          en: "Inventory records table with item details, category tags, supplier information, and stock levels.",
          id: "Tabel data persediaan barang dengan detail barang, kategori, supplier, dan jumlah stok.",
        },
      },
      {
        id: "FIG.04",
        src: "/assets/projects/simastok/documentation/04.webp",
        format: "wide",
        alt: {
          en: "SIMASTOK outgoing goods form with dropdown item selector, quantity input, and date picker",
          id: "Formulir barang keluar SIMASTOK dengan pilihan barang, input jumlah, dan pemilih tanggal",
        },
        caption: {
          en: "Outgoing stock transaction form for recording part withdrawals.",
          id: "Formulir pencatatan transaksi barang keluar untuk pengeluaran suku cadang.",
        },
      },
      {
        id: "FIG.05",
        src: "/assets/projects/simastok/documentation/05.webp",
        format: "wide",
        alt: {
          en: "SIMASTOK stock report page showing date-range filter, total incoming and outgoing cards, and detailed transaction records",
          id: "Halaman laporan stok SIMASTOK menampilkan filter tanggal, kartu ringkasan barang masuk dan keluar, serta catatan transaksi",
        },
        caption: {
          en: "Stock movement report view with date-range filtering, summary totals, and transaction history.",
          id: "Tampilan laporan pergerakan barang dengan filter rentang tanggal, total ringkasan, dan riwayat transaksi.",
        },
      },
      {
        id: "FIG.06",
        src: "/assets/projects/simastok/documentation/06.webp",
        format: "wide",
        alt: {
          en: "SIMASTOK user profile settings page with profile information and password update forms",
          id: "Halaman pengaturan profil pengguna SIMASTOK dengan formulir data profil dan pembaruan kata sandi",
        },
        caption: {
          en: "User profile settings view for updating account information and password.",
          id: "Tampilan pengaturan profil pengguna untuk memperbarui informasi akun dan kata sandi.",
        },
      },
    ],
    gallery: [
      {
        slide: "01",
        src: "/assets/projects/simastok/cover.webp",
        format: "cover",
        alt: {
          en: "SIMASTOK sign-in screen with email and password fields over a workshop tool background",
          id: "Halaman login SIMASTOK dengan formulir email dan kata sandi berlatar peralatan bengkel",
        },
        caption: {
          en: "Authentication interface for SIMASTOK SHR Jaya Motor.",
          id: "Antarmuka autentikasi pengguna SIMASTOK SHR Jaya Motor.",
        },
      },
      {
        slide: "02",
        src: "/assets/projects/simastok/documentation/01.webp",
        format: "wide",
        alt: {
          en: "SIMASTOK login modal with email and password input fields",
          id: "Modal login SIMASTOK dengan kolom input email dan kata sandi",
        },
        caption: {
          en: "User login screen with authentication controls and registration link.",
          id: "Halaman login pengguna dengan kontrol autentikasi dan tautan pendaftaran.",
        },
      },
      {
        slide: "03",
        src: "/assets/projects/simastok/documentation/02.webp",
        format: "wide",
        alt: {
          en: "SIMASTOK administrator dashboard with summary stat cards and stock movement bar chart",
          id: "Dashboard admin SIMASTOK dengan kartu statistik ringkasan dan grafik batang pergerakan stok",
        },
        caption: {
          en: "Administrator dashboard showing inventory summary metrics and stock movement charts.",
          id: "Dashboard administrator yang menampilkan metrik ringkasan inventaris dan grafik pergerakan stok.",
        },
      },
      {
        slide: "04",
        src: "/assets/projects/simastok/documentation/03.webp",
        format: "wide",
        alt: {
          en: "SIMASTOK inventory table displaying spare parts list, categories, suppliers, stock counts, and action buttons",
          id: "Tabel inventaris SIMASTOK menampilkan daftar suku cadang, kategori, pemasok, jumlah stok, dan tombol aksi",
        },
        caption: {
          en: "Inventory records table with item details, category tags, supplier information, and stock levels.",
          id: "Tabel data persediaan barang dengan detail barang, kategori, supplier, dan jumlah stok.",
        },
      },
      {
        slide: "05",
        src: "/assets/projects/simastok/documentation/04.webp",
        format: "wide",
        alt: {
          en: "SIMASTOK outgoing goods form with dropdown item selector, quantity input, and date picker",
          id: "Formulir barang keluar SIMASTOK dengan pilihan barang, input jumlah, dan pemilih tanggal",
        },
        caption: {
          en: "Outgoing stock transaction form for recording part withdrawals.",
          id: "Formulir pencatatan transaksi barang keluar untuk pengeluaran suku cadang.",
        },
      },
      {
        slide: "06",
        src: "/assets/projects/simastok/documentation/05.webp",
        format: "wide",
        alt: {
          en: "SIMASTOK stock report page showing date-range filter, total incoming and outgoing cards, and detailed transaction records",
          id: "Halaman laporan stok SIMASTOK menampilkan filter tanggal, kartu ringkasan barang masuk dan keluar, serta catatan transaksi",
        },
        caption: {
          en: "Stock movement report view with date-range filtering, summary totals, and transaction history.",
          id: "Tampilan laporan pergerakan barang dengan filter rentang tanggal, total ringkasan, dan riwayat transaksi.",
        },
      },
      {
        slide: "07",
        src: "/assets/projects/simastok/documentation/06.webp",
        format: "wide",
        alt: {
          en: "SIMASTOK user profile settings page with profile information and password update forms",
          id: "Halaman pengaturan profil pengguna SIMASTOK dengan formulir data profil dan pembaruan kata sandi",
        },
        caption: {
          en: "User profile settings view for updating account information and password.",
          id: "Tampilan pengaturan profil pengguna untuk memperbarui informasi akun dan kata sandi.",
        },
      },
    ],
    galleryThumbnails: true,
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

export function validatePersonalTechStack(project: ProjectCaseStudy): boolean {
  if (project.personalTechStack && project.personalTechStack.length > 6) {
    return false;
  }
  return true;
}


