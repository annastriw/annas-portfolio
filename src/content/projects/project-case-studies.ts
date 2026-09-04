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

export interface ProjectDatasetSource {
  readonly label: LocalizedProjectText;
  readonly textPrefix: string;
  readonly datasetTitle: string;
  readonly textSuffix: string;
  readonly url: string;
}

export interface HeartMlModelMetric {
  readonly model: string;
  readonly accuracy?: LocalizedProjectText;
  readonly precision?: LocalizedProjectText;
  readonly recall?: LocalizedProjectText;
  readonly f1?: LocalizedProjectText;
  readonly rocAuc?: LocalizedProjectText;
  readonly isSelected?: boolean;
  readonly summaryNote?: LocalizedProjectText;
}

export interface HeartMlSystemScopeData {
  readonly dataPreparation: {
    readonly title: LocalizedProjectText;
    readonly items: LocalizedProjectList;
  };
  readonly modelEvaluation: {
    readonly title: LocalizedProjectText;
    readonly models: readonly HeartMlModelMetric[];
    readonly selectionRationale: LocalizedProjectText;
  };
  readonly medicalNote: LocalizedProjectText;
  readonly inferenceIntegration: {
    readonly title: LocalizedProjectText;
    readonly items: LocalizedProjectList;
  };
}

export interface SpeechToTextSystemScopeData {
  readonly mediaPreparation: {
    readonly title: LocalizedProjectText;
    readonly items: LocalizedProjectList;
  };
  readonly asrInference: {
    readonly title: LocalizedProjectText;
    readonly items: LocalizedProjectList;
  };
  readonly modelNote?: LocalizedProjectText;
  readonly transcriptOutputs: {
    readonly title: LocalizedProjectText;
    readonly items: LocalizedProjectList;
  };
}

export interface ThermalPrinterScopeGroup {
  readonly title: LocalizedProjectText;
  readonly items: LocalizedProjectList;
}

export interface ThermalPrinterSystemScopeData {
  readonly groups: readonly ThermalPrinterScopeGroup[];
}

export interface FootyScopeGroup {
  readonly title: LocalizedProjectText;
  readonly items: LocalizedProjectList;
  readonly compactList?: string;
}

export interface FootySystemScopeData {
  readonly groups: readonly FootyScopeGroup[];
}

export interface PanoramicScopeGroup {
  readonly title: LocalizedProjectText;
  readonly items: LocalizedProjectList;
}

export interface PanoramicSystemScopeData {
  readonly groups: readonly PanoramicScopeGroup[];
}

export interface ProjectTechnicalMetadataItem {
  readonly value: string;
  readonly label: LocalizedProjectText;
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
  readonly programmingLanguage?: string;
  readonly client?: LocalizedProjectText;
  readonly clientLabel?: LocalizedProjectText;
  readonly workingModel?: LocalizedProjectText;
  readonly lead?: LocalizedProjectText;
  readonly metadataRows?: readonly ProjectMetadataRow[];
  readonly metaTitle?: LocalizedProjectText;
  readonly metaDescription?: LocalizedProjectText;
  readonly keywords?: LocalizedProjectList | readonly string[];
  readonly repositoryNotice?: LocalizedProjectText;
  readonly overview: LocalizedProjectList;
  readonly datasetSource?: ProjectDatasetSource;
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
  readonly heartMlScope?: HeartMlSystemScopeData;
  readonly speechToTextScope?: SpeechToTextSystemScopeData;
  readonly thermalPrinterScope?: ThermalPrinterSystemScopeData;
  readonly footyScope?: FootySystemScopeData;
  readonly panoramicScope?: PanoramicSystemScopeData;
  readonly technicalMetadata?: readonly ProjectTechnicalMetadataItem[];
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
  other: { en: "Interactive Prototype", id: "Prototype Interaktif" },
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
        "Performed manual testing and automated end-to-end testing with Playwright, then deployed the system to an Ubuntu VPS where it remains in active use.",
      ],
      id: [
        "Menggali kebutuhan melalui wawancara dengan owner dan merancang UI/UX.",
        "Mengembangkan frontend, backend, dan integrasi workflow antar modul secara mandiri.",
        "Melakukan testing manual dan automated end-to-end testing menggunakan Playwright, lalu melakukan deployment ke VPS Ubuntu yang masih digunakan hingga saat ini.",
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
      "Playwright",
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
      "Playwright",
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
        "Performed manual and automated testing with Playwright, then containerized and deployed the application with Docker.",
      ],
      id: [
        "Menggali kebutuhan inventory melalui wawancara dan feedback bertahap bersama SHR Jaya Motor.",
        "Merancang workflow inventory dan antarmuka di Figma, kemudian membangun frontend dan backend menggunakan Laravel serta MySQL.",
        "Mengimplementasikan akses berbasis role, master data, pergerakan stok, validasi stok tidak mencukupi, riwayat transaksi, dan laporan.",
        "Melakukan manual dan automation testing menggunakan Playwright, kemudian menjalankan containerization dan deployment aplikasi menggunakan Docker.",
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
      "Playwright",
      "Docker",
    ],
    techStack: [
      "Figma",
      "Laravel",
      "PHP",
      "MySQL",
      "Playwright",
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
    categoryLabel: { en: "06 // MACHINE LEARNING", id: "06 // MACHINE LEARNING" },
    title: {
      en: "Machine Learning Model for Heart Attack Risk Prediction",
      id: "Machine Learning Model for Heart Attack Risk Prediction",
    },
    role: { en: "Machine Learning Engineer", id: "Machine Learning Engineer" },
    period: { en: "June–August 2025", id: "Juni–Agustus 2025" },
    status: { en: "Completed Prototype", id: "Completed Prototype" },
    lead: {
      en: "A machine learning decision-support prototype developed for iHealth Edu that estimates heart attack risk from patient data and delivers the result through a Flask API.",
      id: "Prototype machine learning untuk decision support pada iHealth Edu yang memperkirakan risiko serangan jantung dari data pasien dan menyajikan hasilnya melalui Flask API.",
    },
    metadataRows: [
      {
        label: { en: "Role", id: "Peran" },
        value: { en: "Machine Learning Engineer", id: "Machine Learning Engineer" },
      },
      {
        label: { en: "Period", id: "Periode" },
        value: { en: "June–August 2025", id: "Juni–Agustus 2025" },
      },
      {
        label: { en: "Status", id: "Status" },
        value: { en: "Completed Prototype", id: "Completed Prototype" },
      },
      {
        label: { en: "Product Integration", id: "Integrasi Produk" },
        value: { en: "iHealth Edu", id: "iHealth Edu" },
      },
    ],
    metaTitle: {
      en: "Heart Attack Risk Prediction — Machine Learning Case Study | Annas Tri Widagdo",
      id: "Heart Attack Risk Prediction — Studi Kasus Machine Learning | Annas Tri Widagdo",
    },
    metaDescription: {
      en: "A machine learning case study for heart attack risk decision support integrated into iHealth Edu, covering model comparison, Flask inference, and Docker deployment.",
      id: "Studi kasus machine learning untuk decision support risiko serangan jantung yang terintegrasi dengan iHealth Edu, mencakup perbandingan model, inference Flask, dan deployment Docker.",
    },
    keywords: {
      en: [
        "Machine Learning",
        "Machine Learning Engineer",
        "Binary Classification",
        "Decision Support",
        "Python",
        "Scikit-learn",
        "Pandas",
        "SMOTE",
        "Flask",
        "Docker",
      ],
      id: [
        "Machine Learning",
        "Machine Learning Engineer",
        "Binary Classification",
        "Decision Support",
        "Python",
        "Scikit-learn",
        "Pandas",
        "SMOTE",
        "Flask",
        "Docker",
      ],
    },
    githubUrl: "https://github.com/annastriw/ml-for-heart-attack-risk-prediction.git",
    overview: {
      en: [
        "I developed this project as the machine learning decision-support component integrated into the live iHealth Edu website for healthcare workers. Model development used A. Panday's 2025 Heart Attack Prediction in Indonesia dataset from Kaggle, containing 158,355 observations and 21 predictors.",
        "The workflow covers data preparation, class balancing, model comparison, evaluation, and inference deployment. Random Forest was selected for its leading accuracy and ROC-AUC, then serialized and served through a Flask REST API deployed with Docker on Ubuntu.",
      ],
      id: [
        "Saya mengembangkan project ini sebagai komponen machine learning decision support yang terintegrasi dengan website iHealth Edu dan digunakan oleh tenaga kesehatan. Pengembangan model menggunakan dataset Heart Attack Prediction in Indonesia oleh A. Panday dari Kaggle tahun 2025, yang terdiri dari 158.355 observasi dan 21 predictor.",
        "Workflow mencakup data preparation, penyeimbangan kelas, perbandingan model, evaluasi, dan deployment inference. Random Forest dipilih karena menghasilkan accuracy dan ROC-AUC tertinggi, kemudian disimpan dan disajikan melalui Flask REST API yang di-deploy menggunakan Docker pada Ubuntu.",
      ],
    },
    datasetSource: {
      label: {
        en: "Dataset Source",
        id: "Sumber Dataset",
      },
      textPrefix: "A. Panday, ",
      datasetTitle: "Heart Attack Prediction in Indonesia",
      textSuffix: ", Kaggle, 2025",
      url: "https://www.kaggle.com/datasets/ankushpanday2/heart-attack-prediction-in-indonesia",
    },
    contributions: {
      en: [
        "Prepared the dataset by encoding five categorical features, scaling the predictors, creating a stratified 80:20 split, and applying SMOTE only to the training data.",
        "Trained and compared Random Forest, Linear SVM, K-Nearest Neighbors, and Logistic Regression, with hyperparameter tuning focused on F1-score.",
        "Selected Random Forest based on its accuracy and ROC-AUC, serialized the model and preprocessing artifacts with Joblib, and built a Flask REST API for inference.",
        "Deployed the inference service with Docker on Ubuntu and integrated its prediction output into iHealth Edu for healthcare workers.",
      ],
      id: [
        "Menyiapkan dataset dengan melakukan encoding pada lima fitur kategorikal, scaling predictor, membagi data secara stratified 80:20, dan menerapkan SMOTE hanya pada data training.",
        "Melatih dan membandingkan Random Forest, Linear SVM, K-Nearest Neighbors, dan Logistic Regression dengan hyperparameter tuning yang berfokus pada F1-score.",
        "Memilih Random Forest berdasarkan accuracy dan ROC-AUC, menyimpan model serta preprocessing artifacts menggunakan Joblib, dan membangun Flask REST API untuk inference.",
        "Melakukan deployment inference service menggunakan Docker pada Ubuntu dan mengintegrasikan hasil prediksi ke iHealth Edu untuk tenaga kesehatan.",
      ],
    },
    contributionLearning: {
      en: "This project gave me experience in building a machine learning workflow from data preparation to real product integration.",
      id: "Project ini memberi saya pengalaman membangun workflow machine learning mulai dari data preparation hingga terintegrasi dengan produk yang digunakan.",
    },
    personalTechStack: [
      "Python",
      "Scikit-learn",
      "Pandas",
      "SMOTE",
      "Flask",
      "Docker",
    ],
    techStack: [
      "Python",
      "Scikit-learn",
      "Pandas",
      "SMOTE",
      "Flask",
      "Docker",
    ],
    heartMlScope: {
      dataPreparation: {
        title: {
          en: "Data Preparation",
          id: "Data Preparation",
        },
        items: {
          en: [
            "158,355 observations",
            "22 columns",
            "21 predictors",
            "5 categorical features",
            "No missing values",
            "Stratified 80:20 split",
            "SMOTE on training data only",
          ],
          id: [
            "158.355 observasi",
            "22 kolom",
            "21 prediktor",
            "5 fitur kategorikal",
            "Tidak ada missing value",
            "Stratified 80:20 split",
            "SMOTE hanya pada data training",
          ],
        },
      },
      modelEvaluation: {
        title: {
          en: "Model Evaluation",
          id: "Model Evaluation",
        },
        selectionRationale: {
          en: "Random Forest was selected because it produced the highest accuracy and ROC-AUC in the documented comparison.",
          id: "Random Forest dipilih karena menghasilkan accuracy dan ROC-AUC tertinggi dalam perbandingan yang didokumentasikan.",
        },
        models: [
          {
            model: "Random Forest",
            isSelected: true,
            accuracy: { en: "71.93%", id: "71,93%" },
            precision: { en: "64.12%", id: "64,12%" },
            recall: { en: "68.15%", id: "68,15%" },
            f1: { en: "0.6607", id: "0,6607" },
            rocAuc: { en: "0.8015", id: "0,8015" },
            summaryNote: {
              en: "Selected model: highest accuracy (71.93%) and ROC-AUC (0.8015)",
              id: "Model terpilih: accuracy (71,93%) dan ROC-AUC (0,8015) tertinggi",
            },
          },
          {
            model: "Logistic Regression",
            f1: { en: "0.6618", id: "0,6618" },
            summaryNote: {
              en: "Highest compared F1: 0.6618",
              id: "F1 tertinggi dalam perbandingan: 0,6618",
            },
          },
          {
            model: "K-Nearest Neighbors",
            recall: { en: "70.40%", id: "70,40%" },
            summaryNote: {
              en: "Highest compared Recall: 70.40%",
              id: "Recall tertinggi dalam perbandingan: 70,40%",
            },
          },
          {
            model: "Linear SVM",
            summaryNote: {
              en: "Compared model with no metric added",
              id: "Model perbandingan tanpa metrik tambahan",
            },
          },
        ],
      },
      medicalNote: {
        en: "This prototype supports risk assessment and does not provide a clinical diagnosis or replace medical judgment.",
        id: "Prototype ini mendukung penilaian risiko dan tidak memberikan diagnosis klinis maupun menggantikan pertimbangan tenaga kesehatan.",
      },
      inferenceIntegration: {
        title: {
          en: "Inference Integration",
          id: "Inference Integration",
        },
        items: {
          en: [
            "Joblib model and preprocessing artifacts",
            "Flask REST API",
            "Risk class and probability",
            "Supporting factors",
            "Global feature importance",
            "Docker deployment on Ubuntu",
            "iHealth Edu integration for healthcare workers",
          ],
          id: [
            "Joblib model dan preprocessing artifacts",
            "Flask REST API",
            "Risk class dan probabilitas",
            "Faktor pendukung",
            "Global feature importance",
            "Deployment Docker pada Ubuntu",
            "Integrasi iHealth Edu untuk tenaga kesehatan",
          ],
        },
      },
    },
    cover: {
      src: "/assets/projects/ml-for-heart-attack-risk-prediction/cover.webp",
      alt: {
        en: "Terminal screen showing structured patient input fields for age, blood pressure, cholesterol, BMI, and lifestyle predictors",
        id: "Tampilan layar terminal yang menunjukkan kolom input pasien terstruktur untuk usia, tekanan darah, kolesterol, BMI, dan pola hidup",
      },
      position: "top",
      caption: {
        en: "Command-line interface displaying patient input prompts for 21 cardiovascular risk predictors.",
        id: "Antarmuka command-line yang menampilkan prompt input data pasien untuk 21 predictor risiko kardiovaskular.",
      },
    },
    evidence: [
      {
        id: "FIG.01",
        src: "/assets/projects/ml-for-heart-attack-risk-prediction/documentation/01.webp",
        format: "wide",
        alt: {
          en: "Terminal view of entered clinical and lifestyle parameters prior to model inference",
          id: "Tampilan terminal berisi parameter klinis dan gaya hidup yang dimasukkan sebelum inferensi model",
        },
        caption: {
          en: "Structured patient feature inputs submitted to the machine learning preprocessing pipeline.",
          id: "Input fitur data pasien terstruktur yang dikirimkan ke pipeline preprocessing machine learning.",
        },
      },
      {
        id: "FIG.02",
        src: "/assets/projects/ml-for-heart-attack-risk-prediction/documentation/02.webp",
        format: "wide",
        alt: {
          en: "Terminal output displaying low-risk classification result, 3% risk probability, factor breakdown, and top five feature weights",
          id: "Output terminal yang menampilkan hasil klasifikasi risiko rendah, probabilitas risiko 3%, rincian faktor, dan lima bobot fitur teratas",
        },
        caption: {
          en: "Inference response showing risk classification, class probabilities, supporting factors, and top 5 global feature importances.",
          id: "Respons inferensi yang menampilkan klasifikasi risiko, probabilitas kelas, faktor pendukung, dan 5 feature importance global teratas.",
        },
      },
    ],
    gallery: [
      {
        slide: "01",
        src: "/assets/projects/ml-for-heart-attack-risk-prediction/cover.webp",
        format: "cover",
        alt: {
          en: "Terminal screen showing structured patient input fields for age, blood pressure, cholesterol, BMI, and lifestyle predictors",
          id: "Tampilan layar terminal yang menunjukkan kolom input pasien terstruktur untuk usia, tekanan darah, kolesterol, BMI, dan pola hidup",
        },
        caption: {
          en: "Command-line interface displaying patient input prompts for 21 cardiovascular risk predictors.",
          id: "Antarmuka command-line yang menampilkan prompt input data pasien untuk 21 predictor risiko kardiovaskular.",
        },
      },
      {
        slide: "02",
        src: "/assets/projects/ml-for-heart-attack-risk-prediction/documentation/01.webp",
        format: "wide",
        alt: {
          en: "Terminal view of entered clinical and lifestyle parameters prior to model inference",
          id: "Tampilan terminal berisi parameter klinis dan gaya hidup yang dimasukkan sebelum inferensi model",
        },
        caption: {
          en: "Structured patient feature inputs submitted to the machine learning preprocessing pipeline.",
          id: "Input fitur data pasien terstruktur yang dikirimkan ke pipeline preprocessing machine learning.",
        },
      },
      {
        slide: "03",
        src: "/assets/projects/ml-for-heart-attack-risk-prediction/documentation/02.webp",
        format: "wide",
        alt: {
          en: "Terminal output displaying low-risk classification result, 3% risk probability, factor breakdown, and top five feature weights",
          id: "Output terminal yang menampilkan hasil klasifikasi risiko rendah, probabilitas risiko 3%, rincian faktor, dan lima bobot fitur teratas",
        },
        caption: {
          en: "Inference response showing risk classification, class probabilities, supporting factors, and top 5 global feature importances.",
          id: "Respons inferensi yang menampilkan klasifikasi risiko, probabilitas kelas, faktor pendukung, dan 5 feature importance global teratas.",
        },
      },
    ],
    galleryThumbnails: true,
  },
  {
    index: "07",
    slug: "speech-to-text-system",
    category: "ml",
    categoryLabel: { en: "07 // MACHINE LEARNING", id: "07 // MACHINE LEARNING" },
    title: { en: "Speech-to-Text System", id: "Speech-to-Text System" },
    role: { en: "Machine Learning Engineer", id: "Machine Learning Engineer" },
    period: { en: "March–April 2025", id: "Maret–April 2025" },
    status: { en: "Completed Prototype", id: "Completed Prototype" },
    lead: {
      en: "An end-to-end English speech-to-text prototype that converts audio and video into reusable transcripts, SRT subtitles, and video with burned-in captions.",
      id: "Prototype speech-to-text end-to-end untuk bahasa Inggris yang mengubah audio dan video menjadi transkrip, subtitle SRT, serta video dengan subtitle tertanam.",
    },
    metadataRows: [
      {
        label: { en: "Role", id: "Peran" },
        value: { en: "Machine Learning Engineer", id: "Machine Learning Engineer" },
      },
      {
        label: { en: "Period", id: "Periode" },
        value: { en: "March–April 2025", id: "Maret–April 2025" },
      },
      {
        label: { en: "Status", id: "Status" },
        value: { en: "Completed Prototype", id: "Completed Prototype" },
      },
      {
        label: { en: "Platform", id: "Platform" },
        value: { en: "Google Colab", id: "Google Colab" },
      },
    ],
    metaTitle: {
      en: "Speech-to-Text System — Machine Learning Case Study | Annas Tri Widagdo",
      id: "Speech-to-Text System — Studi Kasus Machine Learning | Annas Tri Widagdo",
    },
    metaDescription: {
      en: "An English speech-to-text prototype that processes audio and video with pretrained Wav2Vec2 and produces transcripts, SRT subtitles, and burned-in video captions.",
      id: "Prototype speech-to-text bahasa Inggris yang memproses audio dan video menggunakan pretrained Wav2Vec2 serta menghasilkan transkrip, subtitle SRT, dan subtitle yang tertanam pada video.",
    },
    keywords: {
      en: [
        "Machine Learning",
        "Machine Learning Engineer",
        "Automatic Speech Recognition",
        "English Speech-to-Text",
        "Python",
        "Wav2Vec2",
        "Hugging Face Transformers",
        "Librosa",
        "FFmpeg",
        "Google Colab",
      ],
      id: [
        "Machine Learning",
        "Machine Learning Engineer",
        "Automatic Speech Recognition",
        "English Speech-to-Text",
        "Python",
        "Wav2Vec2",
        "Hugging Face Transformers",
        "Librosa",
        "FFmpeg",
        "Google Colab",
      ],
    },
    githubUrl: "https://github.com/annastriw/speech-to-text-system.git",
    overview: {
      en: [
        "Built in Google Colab, the workflow accepts WAV and MP3 audio or MP4 video. Video audio is extracted with FFmpeg, converted to mono at 16 kHz, and divided into chunks before transcription.",
        "Each audio chunk is processed with the pretrained facebook/wav2vec2-base-960h model through Hugging Face Transformers. The results can be exported as TXT, CSV, JSON, and SRT files or embedded directly into the final video.",
      ],
      id: [
        "Workflow ini dikembangkan di Google Colab dan menerima input audio WAV dan MP3 atau video MP4. Audio dari video diekstrak menggunakan FFmpeg, dikonversi menjadi mono 16 kHz, lalu dibagi menjadi beberapa chunk sebelum proses transkripsi.",
        "Setiap audio chunk diproses menggunakan pretrained model facebook/wav2vec2-base-960h melalui Hugging Face Transformers. Hasilnya dapat diekspor sebagai file TXT, CSV, JSON, dan SRT atau ditanamkan langsung ke video akhir.",
      ],
    },
    contributions: {
      en: [
        "Built the ingestion workflow for WAV and MP3 audio and MP4 video, including audio extraction from video with FFmpeg.",
        "Implemented mono 16 kHz conversion and chunk-based processing to prepare longer audio for sequential inference.",
        "Integrated the pretrained Wav2Vec2 model through Hugging Face Transformers and structured the transcription results as TXT, CSV, and JSON files.",
        "Generated timestamp-based SRT subtitles and used FFmpeg to embed them into the final video.",
      ],
      id: [
        "Membangun workflow input untuk audio WAV dan MP3 serta video MP4, termasuk proses ekstraksi audio dari video menggunakan FFmpeg.",
        "Mengimplementasikan konversi audio menjadi mono 16 kHz dan pemrosesan berbasis chunk untuk menyiapkan audio berdurasi panjang sebelum inference bertahap.",
        "Mengintegrasikan pretrained model Wav2Vec2 melalui Hugging Face Transformers dan menyusun hasil transkripsi dalam format TXT, CSV, dan JSON.",
        "Menghasilkan subtitle SRT berdasarkan timestamp dan menggunakan FFmpeg untuk menanamkannya ke video akhir.",
      ],
    },
    contributionLearning: {
      en: "This project gave me experience combining a pretrained machine learning model with an end-to-end audio and video processing workflow.",
      id: "Project ini memberi saya pengalaman menggabungkan pretrained machine learning model dengan workflow pemrosesan audio dan video secara end-to-end.",
    },
    personalTechStack: [
      "Python",
      "Wav2Vec2",
      "Hugging Face Transformers",
      "Librosa",
      "FFmpeg",
      "Google Colab",
    ],
    techStack: [
      "Python",
      "Wav2Vec2",
      "Hugging Face Transformers",
      "Librosa",
      "FFmpeg",
      "Google Colab",
    ],
    speechToTextScope: {
      mediaPreparation: {
        title: {
          en: "Media Preparation",
          id: "Persiapan Media",
        },
        items: {
          en: [
            "WAV and MP3 audio input",
            "MP4 video input",
            "FFmpeg audio extraction from video",
            "Mono 16 kHz conversion",
            "Chunk-based processing for longer audio",
          ],
          id: [
            "Input audio WAV dan MP3",
            "Input video MP4",
            "Ekstraksi audio dari video dengan FFmpeg",
            "Konversi mono 16 kHz",
            "Pemrosesan berbasis chunk untuk audio panjang",
          ],
        },
      },
      asrInference: {
        title: {
          en: "ASR Inference",
          id: "Inferensi ASR",
        },
        items: {
          en: [
            "English transcription only",
            "Pretrained facebook/wav2vec2-base-960h",
            "Hugging Face Transformers model execution",
            "Sequential inference for audio chunks",
            "No custom fine-tuning",
            "No WER or CER benchmark",
          ],
          id: [
            "Transkripsi bahasa Inggris saja",
            "Pretrained model facebook/wav2vec2-base-960h",
            "Eksekusi model melalui Hugging Face Transformers",
            "Inference bertahap untuk chunk audio",
            "Tanpa custom fine-tuning",
            "Tanpa benchmark WER atau CER",
          ],
        },
      },
      transcriptOutputs: {
        title: {
          en: "Transcript & Subtitle Outputs",
          id: "Output Transkrip & Subtitle",
        },
        items: {
          en: [
            "TXT transcript",
            "CSV transcript",
            "JSON transcript",
            "Timestamp-based SRT subtitle",
            "Video with burned-in subtitles",
            "Before-and-after visual evidence",
          ],
          id: [
            "Transkrip TXT",
            "Transkrip CSV",
            "Transkrip JSON",
            "Subtitle SRT berbasis timestamp",
            "Video dengan subtitle tertanam",
            "Bukti visual perbandingan sebelum dan sesudah",
          ],
        },
      },
    },
    cover: {
      src: "/assets/projects/speech-to-text-system/cover.webp",
      alt: {
        en: "Side-by-side comparison showing the video sample before subtitles and the final video with burned-in English subtitles",
        id: "Perbandingan berdampingan menampilkan sampel video sebelum subtitle dan video akhir dengan subtitle bahasa Inggris tertanam",
      },
      position: "center",
      caption: {
        en: "Side-by-side comparison showing source video playback and the generated video with burned-in English subtitles.",
        id: "Perbandingan berdampingan yang menunjukkan pemutaran video sumber dan video hasil pemrosesan dengan subtitle bahasa Inggris tertanam.",
      },
    },
    evidence: [
      {
        id: "FIG.01",
        src: "/assets/projects/speech-to-text-system/documentation/01.webp",
        format: "wide",
        alt: {
          en: "Detailed view of the speech-to-text pipeline output with burned-in uppercase subtitles on the sample video frame",
          id: "Tampilan detail output pipeline speech-to-text dengan subtitle huruf kapital tertanam pada frame sampel video",
        },
        caption: {
          en: "Pipeline output demonstrating automatic transcription and subtitle embedding on a sample video.",
          id: "Hasil output pipeline yang mendemonstrasikan transkripsi otomatis dan penanaman subtitle pada sampel video.",
        },
      },
    ],
    gallery: [
      {
        slide: "01",
        src: "/assets/projects/speech-to-text-system/cover.webp",
        format: "cover",
        alt: {
          en: "Side-by-side comparison showing the video sample before subtitles and the final video with burned-in English subtitles",
          id: "Perbandingan berdampingan menampilkan sampel video sebelum subtitle dan video akhir dengan subtitle bahasa Inggris tertanam",
        },
        caption: {
          en: "Side-by-side comparison showing source video playback and the generated video with burned-in English subtitles.",
          id: "Perbandingan berdampingan yang menunjukkan pemutaran video sumber dan video hasil pemrosesan dengan subtitle bahasa Inggris tertanam.",
        },
      },
      {
        slide: "02",
        src: "/assets/projects/speech-to-text-system/documentation/01.webp",
        format: "wide",
        alt: {
          en: "Detailed view of the speech-to-text pipeline output with burned-in uppercase subtitles on the sample video frame",
          id: "Tampilan detail output pipeline speech-to-text dengan subtitle huruf kapital tertanam pada frame sampel video",
        },
        caption: {
          en: "Pipeline output demonstrating automatic transcription and subtitle embedding on a sample video.",
          id: "Hasil output pipeline yang mendemonstrasikan transkripsi otomatis dan penanaman subtitle pada sampel video.",
        },
      },
    ],
    galleryThumbnails: true,
  },
  {
    index: "08",
    slug: "thermal-printer-service",
    category: "mobile",
    categoryLabel: { en: "08 // MOBILE APPLICATION", id: "08 // MOBILE APPLICATION" },
    title: { en: "Thermal Printer Service", id: "Thermal Printer Service" },
    role: { en: "Android Developer", id: "Android Developer" },
    period: { en: "January–February 2026", id: "Januari–Februari 2026" },
    status: { en: "Completed Application", id: "Completed Application" },
    lead: {
      en: "A native Android print service that connects browser-based workflows to Bluetooth thermal printers and converts Android print jobs into monochrome output for configured ESC/POS devices.",
      id: "Aplikasi print service native Android yang menghubungkan workflow berbasis browser dengan thermal printer Bluetooth serta memproses print job Android menjadi output monokrom untuk perangkat ESC/POS yang telah dikonfigurasi.",
    },
    metadataRows: [
      {
        label: { en: "Role", id: "Peran" },
        value: { en: "Android Developer", id: "Android Developer" },
      },
      {
        label: { en: "Period", id: "Periode" },
        value: { en: "January–February 2026", id: "Januari–Februari 2026" },
      },
      {
        label: { en: "Status", id: "Status" },
        value: { en: "Completed Application", id: "Completed Application" },
      },
      {
        label: { en: "Platform", id: "Platform" },
        value: { en: "Android", id: "Android" },
      },
    ],
    metaTitle: {
      en: "Thermal Printer Service — Android Development Case Study | Annas Tri Widagdo",
      id: "Thermal Printer Service — Studi Kasus Android Development | Annas Tri Widagdo",
    },
    metaDescription: {
      en: "A native Kotlin Android PrintService case study covering Android print-job processing, monochrome ESC/POS conversion, Bluetooth delivery, and configurable 58 mm and 80 mm thermal printers.",
      id: "Studi kasus Android PrintService native berbasis Kotlin yang mencakup pemrosesan print job, konversi ESC/POS monokrom, pengiriman Bluetooth, serta konfigurasi thermal printer 58 mm dan 80 mm.",
    },
    keywords: {
      en: [
        "Android",
        "Kotlin",
        "Android Print Framework",
        "PrintService",
        "Bluetooth RFCOMM",
        "ESC/POS",
        "Thermal Printer",
        "Android Developer",
      ],
      id: [
        "Android",
        "Kotlin",
        "Android Print Framework",
        "PrintService",
        "Bluetooth RFCOMM",
        "ESC/POS",
        "Thermal Printer",
        "Android Developer",
      ],
    },
    githubUrl: "https://github.com/annastriw/ThermalPrinterService.git",
    overview: {
      en: [
        "I developed Thermal Printer Service as a companion application for UKG System, enabling users to print from Chrome through Android’s standard printing workflow to a configured Bluetooth thermal printer.",
        "The application converts print documents into monochrome ESC/POS output, manages background print jobs, and supports persistent profiles, calibration, retry, and error handling for 58 mm and 80 mm printers.",
      ],
      id: [
        "Saya mengembangkan Thermal Printer Service sebagai aplikasi pendamping UKG System agar pengguna dapat mencetak dari Chrome melalui workflow pencetakan standar Android ke thermal printer Bluetooth yang telah dikonfigurasi.",
        "Aplikasi memproses dokumen menjadi output ESC/POS monokrom, menangani print job di background, serta menyediakan printer profile, calibration, retry, dan error handling untuk printer 58 mm dan 80 mm.",
      ],
    },
    contributions: {
      en: [
        "Built a custom Android PrintService that receives print jobs through Android’s standard printing workflow.",
        "Implemented the PDF-to-bitmap and monochrome ESC/POS processing pipeline for 58 mm and 80 mm printers.",
        "Managed background job processing, chunked Bluetooth transfer, retry, cancellation, and error states.",
        "Developed persistent printer profiles and calibration controls for different printer configurations.",
      ],
      id: [
        "Membangun custom Android PrintService yang menerima print job melalui workflow pencetakan standar Android.",
        "Mengimplementasikan pipeline PDF-to-bitmap dan pemrosesan ESC/POS monokrom untuk printer 58 mm dan 80 mm.",
        "Menangani print job di background, pengiriman data Bluetooth secara bertahap, retry, cancellation, dan error state.",
        "Mengembangkan printer profile yang tersimpan serta pengaturan calibration untuk berbagai konfigurasi printer.",
      ],
    },
    contributionLearning: {
      en: "This project strengthened my experience in connecting web workflows with native Android services and printing hardware.",
      id: "Project ini memperkuat pengalaman saya dalam menghubungkan workflow web dengan native Android service dan perangkat printer.",
    },
    personalTechStack: [
      "Kotlin",
      "Android SDK",
      "Android Print Framework",
      "Bluetooth",
      "ESC/POS",
      "Gradle",
    ],
    techStack: [
      "Kotlin",
      "Android SDK",
      "Android Print Framework",
      "Bluetooth",
      "ESC/POS",
      "Gradle",
    ],
    thermalPrinterScope: {
      groups: [
        {
          title: {
            en: "System Print Integration",
            id: "Integrasi Sistem Pencetakan",
          },
          items: {
            en: [
              "Printing initiated from the website in Chrome",
              "Android Print Framework",
              "Custom PrintService",
              "Sequential background print-job processing",
            ],
            id: [
              "Pencetakan dimulai dari website di Chrome",
              "Android Print Framework",
              "Custom PrintService",
              "Pemrosesan print job di background secara sekuensial",
            ],
          },
        },
        {
          title: {
            en: "Document Processing",
            id: "Pemrosesan Dokumen",
          },
          items: {
            en: [
              "Temporary PDF and PdfRenderer",
              "Bitmap scaling and alignment",
              "Monochrome ESC/POS conversion",
              "58 mm and 80 mm output configurations",
            ],
            id: [
              "File PDF sementara dan PdfRenderer",
              "Penyesuaian skala dan perataan bitmap",
              "Konversi ESC/POS monokrom",
              "Konfigurasi output 58 mm dan 80 mm",
            ],
          },
        },
        {
          title: {
            en: "Bluetooth Printing & Printer Setup",
            id: "Pencetakan Bluetooth & Setup Printer",
          },
          items: {
            en: [
              "Bluetooth RFCOMM/SPP connection",
              "Chunked data transfer with retry",
              "Persistent profiles using SharedPreferences and JSON",
              "Calibration and error handling",
            ],
            id: [
              "Koneksi Bluetooth RFCOMM/SPP",
              "Pengiriman data bertahap dengan mekanisme retry",
              "Profil tersimpan menggunakan SharedPreferences dan JSON",
              "Kalibrasi dan penanganan error",
            ],
          },
        },
      ],
    },
    cover: {
      src: "/assets/projects/thermal-printer-service/cover.webp",
      alt: {
        en: "Thermal Printer Service Android application icon featuring a thermal receipt printer and Bluetooth badge",
        id: "Ikon aplikasi Android Thermal Printer Service dengan ilustrasi printer struk termal dan lencana Bluetooth",
      },
      position: "center",
      caption: {
        en: "Application launcher icon showing the thermal printer and Bluetooth connectivity identity.",
        id: "Ikon peluncur aplikasi yang menampilkan identitas printer termal dan konektivitas Bluetooth.",
      },
    },
    evidence: [
      {
        id: "FIG.01",
        src: "/assets/projects/thermal-printer-service/documentation/01.webp",
        format: "mobile",
        alt: {
          en: "High-resolution Thermal Printer Service application icon on a clean background",
          id: "Ikon aplikasi Thermal Printer Service resolusi tinggi dengan latar belakang bersih",
        },
        caption: {
          en: "High-resolution application icon asset used across system settings and launcher views.",
          id: "Aset ikon aplikasi resolusi tinggi yang digunakan pada menu pengaturan sistem dan launcher.",
        },
      },
      {
        id: "FIG.02",
        src: "/assets/projects/thermal-printer-service/documentation/02.webp",
        format: "mobile",
        alt: {
          en: "Thermal Printer Service main screen with buttons to open printing settings, manage profiles, and perform test print",
          id: "Layar utama Thermal Printer Service dengan tombol untuk membuka pengaturan pencetakan, kelola profil, dan uji cetak",
        },
        caption: {
          en: "Main service interface displaying printing settings access, selected printer profile status, and test print action.",
          id: "Antarmuka utama layanan yang menampilkan akses pengaturan cetak, status profil printer terpilih, dan aksi uji cetak.",
        },
      },
      {
        id: "FIG.03",
        src: "/assets/projects/thermal-printer-service/documentation/03.webp",
        format: "mobile",
        alt: {
          en: "Configured 58 mm thermal printer profile card with MAC address, scaling, offset, auto-cut settings, and action buttons",
          id: "Kartu profil printer termal 58 mm terkonfigurasi dengan alamat MAC, skala, offset, pengaturan auto-cut, dan tombol aksi",
        },
        caption: {
          en: "Saved printer profile interface with configuration details including Bluetooth MAC address, paper width, offsets, and active toggle.",
          id: "Antarmuka profil printer tersimpan dengan detail konfigurasi mencakup alamat MAC Bluetooth, lebar kertas, offset, dan status aktif.",
        },
      },
    ],
    gallery: [
      {
        slide: "01",
        src: "/assets/projects/thermal-printer-service/cover.webp",
        format: "cover",
        alt: {
          en: "Thermal Printer Service Android application icon featuring a thermal receipt printer and Bluetooth badge",
          id: "Ikon aplikasi Android Thermal Printer Service dengan ilustrasi printer struk termal dan lencana Bluetooth",
        },
        caption: {
          en: "Application launcher icon showing the thermal printer and Bluetooth connectivity identity.",
          id: "Ikon peluncur aplikasi yang menampilkan identitas printer termal dan konektivitas Bluetooth.",
        },
      },
      {
        slide: "02",
        src: "/assets/projects/thermal-printer-service/documentation/01.webp",
        format: "mobile",
        alt: {
          en: "High-resolution Thermal Printer Service application icon on a clean background",
          id: "Ikon aplikasi Thermal Printer Service resolusi tinggi dengan latar belakang bersih",
        },
        caption: {
          en: "High-resolution application icon asset used across system settings and launcher views.",
          id: "Aset ikon aplikasi resolusi tinggi yang digunakan pada menu pengaturan sistem dan launcher.",
        },
      },
      {
        slide: "03",
        src: "/assets/projects/thermal-printer-service/documentation/02.webp",
        format: "mobile",
        alt: {
          en: "Thermal Printer Service main screen with buttons to open printing settings, manage profiles, and perform test print",
          id: "Layar utama Thermal Printer Service dengan tombol untuk membuka pengaturan pencetakan, kelola profil, dan uji cetak",
        },
        caption: {
          en: "Main service interface displaying printing settings access, selected printer profile status, and test print action.",
          id: "Antarmuka utama layanan yang menampilkan akses pengaturan cetak, status profil printer terpilih, dan aksi uji cetak.",
        },
      },
      {
        slide: "04",
        src: "/assets/projects/thermal-printer-service/documentation/03.webp",
        format: "mobile",
        alt: {
          en: "Configured 58 mm thermal printer profile card with MAC address, scaling, offset, auto-cut settings, and action buttons",
          id: "Kartu profil printer termal 58 mm terkonfigurasi dengan alamat MAC, skala, offset, pengaturan auto-cut, dan tombol aksi",
        },
        caption: {
          en: "Saved printer profile interface with configuration details including Bluetooth MAC address, paper width, offsets, and active toggle.",
          id: "Antarmuka profil printer tersimpan dengan detail konfigurasi mencakup alamat MAC Bluetooth, lebar kertas, offset, dan status aktif.",
        },
      },
    ],
    galleryThumbnails: true,
    videoSrc: "/assets/projects/thermal-printer-service/demo.webm",
  },
  {
    index: "09",
    slug: "footy-standings",
    category: "mobile",
    categoryLabel: { en: "09 // MOBILE APPLICATION", id: "09 // MOBILE APPLICATION" },
    title: { en: "Footy Standings", id: "Footy Standings" },
    role: { en: "Android Developer", id: "Android Developer" },
    period: { en: "October–November 2024", id: "Oktober–November 2024" },
    status: { en: "Completed Application", id: "Completed Application" },
    programmingLanguage: "Dart",
    lead: {
      en: "An Android application built with Flutter for exploring football standings, fixtures, top scorers, and club information.",
      id: "Aplikasi Android berbasis Flutter untuk melihat klasemen sepak bola, jadwal pertandingan, top scorer, dan informasi klub.",
    },
    metadataRows: [
      {
        label: { en: "Role", id: "Peran" },
        value: { en: "Android Developer", id: "Android Developer" },
      },
      {
        label: { en: "Period", id: "Periode" },
        value: { en: "October–November 2024", id: "Oktober–November 2024" },
      },
      {
        label: { en: "Status", id: "Status" },
        value: { en: "Completed Application", id: "Completed Application" },
      },
      {
        label: { en: "Platform", id: "Platform" },
        value: { en: "Android", id: "Android" },
      },
    ],
    metaTitle: {
      en: "Footy Standings — Android Development Case Study | Annas Tri Widagdo",
      id: "Footy Standings — Studi Kasus Android Development | Annas Tri Widagdo",
    },
    metaDescription: {
      en: "An Android application built with Flutter and Dart for football standings, fixtures, top scorers, and club details, featuring REST API integration and asynchronous UI states.",
      id: "Aplikasi Android berbasis Flutter dan Dart untuk melihat klasemen sepak bola, jadwal pertandingan, top scorer, dan detail klub, dengan integrasi REST API dan penanganan status pemuatan data.",
    },
    keywords: {
      en: [
        "Android",
        "Flutter",
        "Dart",
        "Football Data REST API",
        "REST API",
        "HTTP",
        "JSON",
        "FutureBuilder",
        "Android Developer",
      ],
      id: [
        "Android",
        "Flutter",
        "Dart",
        "Football Data REST API",
        "REST API",
        "HTTP",
        "JSON",
        "FutureBuilder",
        "Android Developer",
      ],
    },
    githubUrl: "https://github.com/annastriw/FootyStandings.git",
    overview: {
      en: [
        "I built Footy Standings for personal use to follow football league standings in one mobile application. I developed the interface, navigation, and REST API integration using Flutter and Dart.",
        "The application maps API responses into structured data models and handles loading, errors, empty results, and successful requests to keep the interface clear.",
      ],
      id: [
        "Saya mengembangkan Footy Standings untuk kebutuhan pribadi dalam mengikuti klasemen liga sepak bola melalui satu aplikasi mobile. Saya membangun antarmuka, navigasi, dan integrasi REST API menggunakan Flutter dan Dart.",
        "Aplikasi memetakan respons API ke model data terstruktur serta menangani kondisi loading, error, data kosong, dan data berhasil dimuat agar informasi tetap mudah dipahami.",
      ],
    },
    contributions: {
      en: [
        "Built the Android interface and navigation using Flutter and Dart.",
        "Integrated the Football Data REST API through HTTP requests and JSON parsing.",
        "Created structured data models for standings, fixtures, top scorers, and club details.",
        "Handled loading, error, empty, and success states using Future and FutureBuilder.",
      ],
      id: [
        "Membangun antarmuka dan navigasi aplikasi Android menggunakan Flutter dan Dart.",
        "Mengintegrasikan Football Data REST API melalui HTTP request dan parsing JSON.",
        "Membuat model data terstruktur untuk klasemen, jadwal pertandingan, top scorer, dan detail klub.",
        "Menangani kondisi loading, error, data kosong, dan data berhasil dimuat menggunakan Future dan FutureBuilder.",
      ],
    },
    contributionLearning: {
      en: "This project strengthened my experience in turning API data into clear, accessible information within an Android application.",
      id: "Project ini memperkuat pengalaman saya dalam mengolah data API menjadi informasi yang mudah diakses dan dipahami melalui aplikasi Android.",
    },
    personalTechStack: [
      "Flutter",
      "Dart",
      "REST API",
      "HTTP",
      "JSON",
      "FutureBuilder",
    ],
    techStack: [
      "Flutter",
      "Dart",
      "REST API",
      "HTTP",
      "JSON",
      "FutureBuilder",
    ],
    footyScope: {
      groups: [
        {
          title: {
            en: "Football Information",
            id: "Informasi Sepak Bola",
          },
          items: {
            en: [
              "League standings",
              "Upcoming fixtures",
              "Top scorers",
              "Club details",
            ],
            id: [
              "Klasemen liga",
              "Jadwal pertandingan mendatang",
              "Top scorer",
              "Detail klub",
            ],
          },
        },
        {
          title: {
            en: "API Integration",
            id: "Integrasi API",
          },
          items: {
            en: [
              "Football Data REST API",
              "HTTP requests",
              "JSON parsing",
              "Structured Dart data models",
            ],
            id: [
              "Football Data REST API",
              "HTTP request",
              "Parsing JSON",
              "Model data Dart terstruktur",
            ],
          },
        },
        {
          title: {
            en: "Navigation & UI States",
            id: "Navigasi & Status Antarmuka",
          },
          items: {
            en: [
              "Application navigation",
              "Loading state",
              "Error and empty states",
              "Success state",
            ],
            id: [
              "Navigasi aplikasi",
              "Status loading",
              "Status error dan data kosong",
              "Status sukses",
            ],
          },
        },
      ],
    },
    cover: {
      src: "/assets/projects/footy-standings/cover.webp",
      alt: {
        en: "Footy Standings mobile league standings table",
        id: "Tabel klasemen liga sepak bola pada aplikasi Footy Standings",
      },
      position: "top",
    },
    evidence: [
      {
        id: "FIG.01",
        src: "/assets/projects/footy-standings/cover.webp",
        format: "mobile",
        alt: {
          en: "Footy Standings mobile league standings table",
          id: "Tabel klasemen liga sepak bola pada aplikasi Footy Standings",
        },
        caption: {
          en: "League standings view displaying table rankings and match statistics.",
          id: "Tampilan klasemen liga yang menyajikan peringkat tabel dan statistik pertandingan.",
        },
      },
      {
        id: "FIG.02",
        src: "/assets/projects/footy-standings/documentation/02.webp",
        format: "mobile",
        alt: {
          en: "Footy Standings upcoming fixtures schedule view",
          id: "Tampilan jadwal pertandingan mendatang pada aplikasi Footy Standings",
        },
        caption: {
          en: "Upcoming fixtures schedule with match dates, kickoff times, and club pairings.",
          id: "Jadwal pertandingan mendatang yang memuat tanggal, waktu kick-off, dan pasangan klub.",
        },
      },
      {
        id: "FIG.03",
        src: "/assets/projects/footy-standings/documentation/03.webp",
        format: "mobile",
        alt: {
          en: "Footy Standings top goalscorers ranking view",
          id: "Tampilan peringkat top scorer pada aplikasi Footy Standings",
        },
        caption: {
          en: "Top scorers ranking listing leading goalscorers, club affiliations, and goal totals.",
          id: "Peringkat top scorer yang menampilkan daftar pencetak gol terbanyak, klub, dan jumlah gol.",
        },
      },
      {
        id: "FIG.04",
        src: "/assets/projects/footy-standings/documentation/04.webp",
        format: "mobile",
        alt: {
          en: "Footy Standings club details profile view",
          id: "Tampilan detail informasi klub pada aplikasi Footy Standings",
        },
        caption: {
          en: "Club details screen presenting club crest, founding year, colors, venue, and website link.",
          id: "Layar detail klub yang menyajikan logo klub, tahun pendirian, warna klub, stadion, dan tautan website.",
        },
      },
    ],
    gallery: [
      {
        slide: "01",
        src: "/assets/projects/footy-standings/cover.webp",
        format: "mobile",
        alt: {
          en: "Footy Standings mobile league standings table",
          id: "Tabel klasemen liga sepak bola pada aplikasi Footy Standings",
        },
        caption: {
          en: "League standings view displaying table rankings and match statistics.",
          id: "Tampilan klasemen liga yang menyajikan peringkat tabel dan statistik pertandingan.",
        },
      },
      {
        slide: "02",
        src: "/assets/projects/footy-standings/documentation/02.webp",
        format: "mobile",
        alt: {
          en: "Footy Standings upcoming fixtures schedule view",
          id: "Tampilan jadwal pertandingan mendatang pada aplikasi Footy Standings",
        },
        caption: {
          en: "Upcoming fixtures schedule with match dates, kickoff times, and club pairings.",
          id: "Jadwal pertandingan mendatang yang memuat tanggal, waktu kick-off, dan pasangan klub.",
        },
      },
      {
        slide: "03",
        src: "/assets/projects/footy-standings/documentation/03.webp",
        format: "mobile",
        alt: {
          en: "Footy Standings top goalscorers ranking view",
          id: "Tampilan peringkat top scorer pada aplikasi Footy Standings",
        },
        caption: {
          en: "Top scorers ranking listing leading goalscorers, club affiliations, and goal totals.",
          id: "Peringkat top scorer yang menampilkan daftar pencetak gol terbanyak, klub, dan jumlah gol.",
        },
      },
      {
        slide: "04",
        src: "/assets/projects/footy-standings/documentation/04.webp",
        format: "mobile",
        alt: {
          en: "Footy Standings club details profile view",
          id: "Tampilan detail informasi klub pada aplikasi Footy Standings",
        },
        caption: {
          en: "Club details screen presenting club crest, founding year, colors, venue, and website link.",
          id: "Layar detail klub yang menyajikan logo klub, tahun pendirian, warna klub, stadion, dan tautan website.",
        },
      },
    ],
    galleryThumbnails: true,
  },
  {
    index: "10",
    slug: "panoramic-virtual-tour",
    category: "other",
    categoryLabel: categoryLabels.other,
    title: { en: "Panoramic Virtual Tour", id: "Panoramic Virtual Tour" },
    role: {
      en: "Junior Game Developer Intern",
      id: "Junior Game Developer Intern",
    },
    period: { en: "July–August 2024", id: "Juli–Agustus 2024" },
    status: { en: "Completed Prototype", id: "Completed Prototype" },
    programmingLanguage: "C#",
    lead: {
      en: "A Unity-based virtual tour prototype for exploring architectural spaces through 360° panoramas and hotspot navigation.",
      id: "Prototype virtual tour berbasis Unity untuk menjelajahi ruang bangunan melalui panorama 360° dan navigasi hotspot.",
    },
    metadataRows: [
      {
        label: { en: "Role", id: "Peran" },
        value: {
          en: "Junior Game Developer Intern",
          id: "Junior Game Developer Intern",
        },
      },
      {
        label: { en: "Period", id: "Periode" },
        value: { en: "July–August 2024", id: "Juli–Agustus 2024" },
      },
      {
        label: { en: "Status", id: "Status" },
        value: {
          en: "Completed Prototype",
          id: "Completed Prototype",
        },
      },
    ],
    metaTitle: {
      en: "Panoramic Virtual Tour — Unity Development Case Study | Annas Tri Widagdo",
      id: "Panoramic Virtual Tour — Studi Kasus Unity Development | Annas Tri Widagdo",
    },
    metaDescription: {
      en: "A Unity virtual tour prototype built from team-supplied 3D models, combining Lumion Pro panoramas, 360° viewing, hotspot navigation, and scene management.",
      id: "Prototype virtual tour Unity yang dikembangkan dari model 3D buatan tim, dengan panorama Lumion Pro, tampilan 360°, navigasi hotspot, dan pengelolaan scene.",
    },
    keywords: {
      en: [
        "Unity",
        "C#",
        "Lumion Pro",
        "Physics Raycast",
        "Scene Management",
        "Junior Game Developer Intern",
        "Virtual Tour",
        "Interactive Prototype",
      ],
      id: [
        "Unity",
        "C#",
        "Lumion Pro",
        "Physics Raycast",
        "Scene Management",
        "Junior Game Developer Intern",
        "Virtual Tour",
        "Prototype Interaktif",
      ],
    },
    projectLinks: [
      {
        label: {
          en: "View Project Files",
          id: "Lihat File Project",
        },
        url: "https://drive.google.com/drive/folders/1hi1Njtmg8O8_soigVc-wROw2rlwtnjpp?usp=sharing",
      },
    ],
    overview: {
      en: [
        "I developed this prototype with a team during my internship in the IT Division of PT Duta Basis Dataprima. It was intended to support project presentations to clients, with the completed prototype demonstrated internally to the director.",
        "Using 3D models created by other team members, I prepared and rendered panoramas in Lumion Pro, then built the viewing controls, hotspot navigation, and scene transitions in Unity.",
      ],
      id: [
        "Saya mengembangkan prototype ini bersama tim selama magang di Divisi IT PT Duta Basis Dataprima. Project ini ditujukan untuk mendukung presentasi kepada klien, dan hasilnya telah dipresentasikan secara internal kepada direktur.",
        "Menggunakan model 3D yang dibuat anggota tim lain, saya menyiapkan dan merender panorama di Lumion Pro, lalu membangun kontrol pandangan, navigasi hotspot, dan perpindahan scene di Unity.",
      ],
    },
    contributions: {
      en: [
        "Prepared panorama viewpoints, materials, and lighting in Lumion Pro using 3D models supplied by the team.",
        "Rendered panoramas and integrated them into Unity for 360° viewing.",
        "Built mouse and touch controls with reusable hotspot navigation in C#.",
        "Implemented asynchronous scene transitions and a persistent PlayerRig.",
      ],
      id: [
        "Menyiapkan titik panorama, material, dan pencahayaan di Lumion Pro menggunakan model 3D dari tim.",
        "Merender panorama dan mengintegrasikannya ke Unity untuk tampilan 360°.",
        "Membangun kontrol mouse dan touch serta navigasi hotspot yang reusable menggunakan C#.",
        "Mengimplementasikan perpindahan scene secara asynchronous dan PlayerRig yang tetap aktif antar-scene.",
      ],
    },
    contributionLearning: {
      en: "This project strengthened my experience in turning a team’s architectural visuals into an interactive experience in Unity.",
      id: "Project ini memperkuat pengalaman saya dalam mengolah visual arsitektur dari tim menjadi pengalaman interaktif di Unity.",
    },
    personalTechStack: [
      "Unity",
      "C#",
      "Lumion Pro",
      "Physics Raycast",
      "Scene Management",
    ],
    techStack: [
      "Unity",
      "C#",
      "Lumion Pro",
      "Physics Raycast",
      "Scene Management",
    ],
    panoramicScope: {
      groups: [
        {
          title: {
            en: "Panorama Preparation",
            id: "Persiapan Panorama",
          },
          items: {
            en: [
              "Team-supplied 3D architectural models.",
              "Panorama viewpoints, materials, lighting, and reflections in Lumion Pro.",
              "78 rendered panoramas.",
            ],
            id: [
              "Model arsitektur 3D dari tim.",
              "Titik panorama, material, pencahayaan, dan refleksi di Lumion Pro.",
              "78 panorama hasil rendering.",
            ],
          },
        },
        {
          title: {
            en: "360° Exploration",
            id: "Eksplorasi 360°",
          },
          items: {
            en: [
              "Panorama integration in Unity.",
              "360° viewing controls.",
              "Mouse and touch interaction.",
            ],
            id: [
              "Integrasi panorama di Unity.",
              "Kontrol pandangan 360°.",
              "Interaksi menggunakan mouse dan touch.",
            ],
          },
        },
        {
          title: {
            en: "Hotspot Navigation & Scene Management",
            id: "Navigasi Hotspot & Pengelolaan Scene",
          },
          items: {
            en: [
              "Reusable hotspots using C#, Physics Raycast, and BoxCollider.",
              "Asynchronous transitions across a structure of up to 79 scenes.",
              "Persistent PlayerRig between scenes.",
            ],
            id: [
              "Hotspot reusable menggunakan C#, Physics Raycast, dan BoxCollider.",
              "Perpindahan asynchronous dalam struktur hingga 79 scene.",
              "PlayerRig yang tetap aktif antar-scene.",
            ],
          },
        },
      ],
    },
    cover: {
      src: "/assets/projects/panoramic-virtual-tour/cover.webp",
      alt: {
        en: "Panoramic Virtual Tour title screen and main menu over the 3D building facility landscape",
        id: "Layar judul dan menu utama Panoramic Virtual Tour dengan pemandangan lanskap fasilitas bangunan 3D",
      },
      position: "center",
      caption: {
        en: "Main menu interface displaying title and navigation controls against the 3D facility landscape.",
        id: "Antarmuka menu utama yang menampilkan judul dan tombol navigasi dengan latar lanskap fasilitas 3D.",
      },
    },
    evidence: [
      {
        id: "FIG.01",
        src: "/assets/projects/panoramic-virtual-tour/cover.webp",
        format: "wide",
        alt: {
          en: "Panoramic Virtual Tour title screen and main menu over the 3D building facility landscape",
          id: "Layar judul dan menu utama Panoramic Virtual Tour dengan pemandangan lanskap fasilitas bangunan 3D",
        },
        caption: {
          en: "Main menu interface displaying title and navigation controls against the 3D facility landscape.",
          id: "Antarmuka menu utama yang menampilkan judul dan tombol navigasi dengan latar lanskap fasilitas 3D.",
        },
      },
      {
        id: "FIG.02",
        src: "/assets/projects/panoramic-virtual-tour/documentation/02.webp",
        format: "wide",
        alt: {
          en: "Aerial top-down perspective view of the facility complex grounds and garden",
          id: "Tampilan perspektif aerial dari atas kawasan kompleks fasilitas dan area taman",
        },
        caption: {
          en: "High-angle overview showing building rooftops, courtyard circulation, and surrounding grounds.",
          id: "Tampilan menyeluruh sudut tinggi yang memperlihatkan atap bangunan, sirkulasi halaman, dan area sekitar.",
        },
      },
      {
        id: "FIG.03",
        src: "/assets/projects/panoramic-virtual-tour/documentation/03.webp",
        format: "wide",
        alt: {
          en: "Facility entrance gate street view with interactive red navigation hotspot pins",
          id: "Tampilan jalan di gerbang masuk fasilitas dengan pin hotspot navigasi interaktif berwarna merah",
        },
        caption: {
          en: "Outdoor street entrance perspective with interactive hotspot pins connecting to adjacent viewpoints.",
          id: "Perspektif gerbang masuk luar ruangan dengan pin hotspot interaktif menuju titik pandang berikutnya.",
        },
      },
      {
        id: "FIG.04",
        src: "/assets/projects/panoramic-virtual-tour/documentation/04.webp",
        format: "wide",
        alt: {
          en: "Facility garden courtyard view with palm trees, lawn, building exterior, and hotspot pin",
          id: "Tampilan halaman taman fasilitas dengan pohon palem, rumput, eksterior bangunan, dan pin hotspot",
        },
        caption: {
          en: "Courtyard garden panorama featuring landscaped greenery, building facade, and navigation hotspot.",
          id: "Panorama taman halaman yang menampilkan area hijau tertata, fasad bangunan, dan hotspot navigasi.",
        },
      },
      {
        id: "FIG.05",
        src: "/assets/projects/panoramic-virtual-tour/documentation/05.webp",
        format: "wide",
        alt: {
          en: "Industrial factory warehouse interior with blue machinery units, avatars, and navigation hotspot",
          id: "Interior gudang pabrik industri dengan unit mesin biru, avatar pekerja, dan hotspot navigasi",
        },
        caption: {
          en: "Ground-level factory floor view showing industrial machinery layout, worker avatars, and movement trigger.",
          id: "Tampilan lantai pabrik yang memperlihatkan tata letak mesin industri, avatar pekerja, dan trigger perpindahan.",
        },
      },
      {
        id: "FIG.06",
        src: "/assets/projects/panoramic-virtual-tour/documentation/06.webp",
        format: "wide",
        alt: {
          en: "Mezzanine perspective overlooking rows of manufacturing machinery on the factory floor",
          id: "Perspektif mezzanine yang menghadap ke deretan mesin produksi di lantai pabrik",
        },
        caption: {
          en: "Elevated vantage point overlooking production lines and overhead structural framework.",
          id: "Sudut pandang dari atas yang memperlihatkan jalur produksi dan struktur rangka atap bangunan.",
        },
      },
      {
        id: "FIG.07",
        src: "/assets/projects/panoramic-virtual-tour/documentation/07.webp",
        format: "wide",
        alt: {
          en: "Conference meeting room interior with conference table, chairs, laptop, and worker avatars",
          id: "Interior ruang rapat dengan meja konferensi, kursi, laptop, dan avatar pekerja",
        },
        caption: {
          en: "Office meeting room interior showing conference setup, interior materials, and exterior window views.",
          id: "Interior ruang rapat kantor yang menampilkan tata ruang konferensi, material interior, dan jendela luar.",
        },
      },
    ],
    gallery: [
      {
        slide: "01",
        src: "/assets/projects/panoramic-virtual-tour/cover.webp",
        format: "cover",
        alt: {
          en: "Panoramic Virtual Tour title screen and main menu over the 3D building facility landscape",
          id: "Layar judul dan menu utama Panoramic Virtual Tour dengan pemandangan lanskap fasilitas bangunan 3D",
        },
        caption: {
          en: "Main menu interface displaying title and navigation controls against the 3D facility landscape.",
          id: "Antarmuka menu utama yang menampilkan judul dan tombol navigasi dengan latar lanskap fasilitas 3D.",
        },
      },
      {
        slide: "02",
        src: "/assets/projects/panoramic-virtual-tour/documentation/02.webp",
        format: "wide",
        alt: {
          en: "Aerial top-down perspective view of the facility complex grounds and garden",
          id: "Tampilan perspektif aerial dari atas kawasan kompleks fasilitas dan area taman",
        },
        caption: {
          en: "High-angle overview showing building rooftops, courtyard circulation, and surrounding grounds.",
          id: "Tampilan menyeluruh sudut tinggi yang memperlihatkan atap bangunan, sirkulasi halaman, dan area sekitar.",
        },
      },
      {
        slide: "03",
        src: "/assets/projects/panoramic-virtual-tour/documentation/03.webp",
        format: "wide",
        alt: {
          en: "Facility entrance gate street view with interactive red navigation hotspot pins",
          id: "Tampilan jalan di gerbang masuk fasilitas dengan pin hotspot navigasi interaktif berwarna merah",
        },
        caption: {
          en: "Outdoor street entrance perspective with interactive hotspot pins connecting to adjacent viewpoints.",
          id: "Perspektif gerbang masuk luar ruangan dengan pin hotspot interaktif menuju titik pandang berikutnya.",
        },
      },
      {
        slide: "04",
        src: "/assets/projects/panoramic-virtual-tour/documentation/04.webp",
        format: "wide",
        alt: {
          en: "Facility garden courtyard view with palm trees, lawn, building exterior, and hotspot pin",
          id: "Tampilan halaman taman fasilitas dengan pohon palem, rumput, eksterior bangunan, dan pin hotspot",
        },
        caption: {
          en: "Courtyard garden panorama featuring landscaped greenery, building facade, and navigation hotspot.",
          id: "Panorama taman halaman yang menampilkan area hijau tertata, fasad bangunan, dan hotspot navigasi.",
        },
      },
      {
        slide: "05",
        src: "/assets/projects/panoramic-virtual-tour/documentation/05.webp",
        format: "wide",
        alt: {
          en: "Industrial factory warehouse interior with blue machinery units, avatars, and navigation hotspot",
          id: "Interior gudang pabrik industri dengan unit mesin biru, avatar pekerja, dan hotspot navigasi",
        },
        caption: {
          en: "Ground-level factory floor view showing industrial machinery layout, worker avatars, and movement trigger.",
          id: "Tampilan lantai pabrik yang memperlihatkan tata letak mesin industri, avatar pekerja, dan trigger perpindahan.",
        },
      },
      {
        slide: "06",
        src: "/assets/projects/panoramic-virtual-tour/documentation/06.webp",
        format: "wide",
        alt: {
          en: "Mezzanine perspective overlooking rows of manufacturing machinery on the factory floor",
          id: "Perspektif mezzanine yang menghadap ke deretan mesin produksi di lantai pabrik",
        },
        caption: {
          en: "Elevated vantage point overlooking production lines and overhead structural framework.",
          id: "Sudut pandang dari atas yang memperlihatkan jalur produksi dan struktur rangka atap bangunan.",
        },
      },
      {
        slide: "07",
        src: "/assets/projects/panoramic-virtual-tour/documentation/07.webp",
        format: "wide",
        alt: {
          en: "Conference meeting room interior with conference table, chairs, laptop, and worker avatars",
          id: "Interior ruang rapat dengan meja konferensi, kursi, laptop, dan avatar pekerja",
        },
        caption: {
          en: "Office meeting room interior showing conference setup, interior materials, and exterior window views.",
          id: "Interior ruang rapat kantor yang menampilkan tata ruang konferensi, material interior, dan jendela luar.",
        },
      },
    ],
    galleryThumbnails: true,
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


