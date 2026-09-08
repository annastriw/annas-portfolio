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
  readonly format: ProjectEvidenceFormat;
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
  };
  readonly evidence: readonly ProjectEvidence[];
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
      "Warehouse & Inventory",
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
    },
    evidence: [
      {
        id: "FIG.01",
        src: "/assets/projects/ukg-system/documentation/01.webp",
        format: "wide",
        alt: {
          en: "UKG System administrator dashboard displaying monthly revenue and expense graphs alongside operational summary metrics.",
          id: "Dashboard admin UKG System menampilkan grafik omzet dan biaya bulanan serta ringkasan metrik operasional.",
        },
        caption: {
          en: "Admin dashboard presenting monthly financial charts and key store operational metrics.",
          id: "Dashboard admin menyajikan grafik keuangan bulanan dan ringkasan metrik operasional toko.",
        },
      },
      {
        id: "FIG.02",
        src: "/assets/projects/ukg-system/documentation/02.webp",
        format: "wide",
        alt: {
          en: "Point-of-sale cashier interface with item search, pricing breakdown, discount controls, and payment methods.",
          id: "Antarmuka kasir penjualan dengan pencarian barang, rincian harga, potongan diskon, dan pilihan metode pembayaran.",
        },
        caption: {
          en: "Point-of-sale interface facilitating sales transaction entry, discount calculation, and payment method selection.",
          id: "Antarmuka kasir memudahkan pencatatan transaksi penjualan, perhitungan diskon, dan pemilihan metode pembayaran.",
        },
      },
      {
        id: "FIG.03",
        src: "/assets/projects/ukg-system/documentation/03.webp",
        format: "wide",
        alt: {
          en: "Digital receipt preview modal detailing purchased items, subtotal calculation, branch origin, and print action.",
          id: "Modal pratinjau nota digital yang merinci daftar barang belanja, subtotal, cabang toko, dan opsi cetak nota.",
        },
        caption: {
          en: "Digital receipt preview displaying itemized order lines, store branch information, and receipt printing action.",
          id: "Pratinjau nota digital menampilkan rincian barang belanjaan, cabang toko, dan opsi cetak struk transaksi.",
        },
      },
      {
        id: "FIG.04",
        src: "/assets/projects/ukg-system/documentation/04.webp",
        format: "wide",
        alt: {
          en: "Sales transaction report table with store branch filters, date-range selector, and Excel export button.",
          id: "Tabel laporan transaksi penjualan dengan filter cabang toko, rentang tanggal, dan tombol ekspor data Excel.",
        },
        caption: {
          en: "Sales report module providing branch and date-range filters to export transaction records to Excel.",
          id: "Modul laporan penjualan menyediakan filter cabang dan periode untuk pengunduhan data transaksi format Excel.",
        },
      },
      {
        id: "FIG.05",
        src: "/assets/projects/ukg-system/documentation/05.webp",
        format: "wide",
        alt: {
          en: "Financial analytics dashboard visualizing gross profit trends, total turnover, and operational cost breakdowns.",
          id: "Dashboard analitik keuangan yang memvisualisasikan tren laba kotor, total omzet, dan rincian biaya operasional.",
        },
        caption: {
          en: "Financial statistics visualizes comparisons between sales revenue, operational expenses, and daily gross profit.",
          id: "Statistik keuangan memvisualisasikan perbandingan omzet penjualan, biaya operasional, dan laba kotor harian.",
        },
      },
      {
        id: "FIG.06",
        src: "/assets/projects/ukg-system/documentation/06.webp",
        format: "wide",
        alt: {
          en: "Employee attendance management table with map-based location verification and radius check coordinates.",
          id: "Tabel presensi pegawai dengan verifikasi radius lokasi berbasis peta digital dan koordinat absensi.",
        },
        caption: {
          en: "Employee attendance feature integrating map-based geolocation verification and attendance validation workflows.",
          id: "Fitur presensi karyawan mengintegrasikan verifikasi lokasi berbasis peta digital dan alur validasi absensi.",
        },
      },
      {
        id: "FIG.07",
        src: "/assets/projects/ukg-system/documentation/07.webp",
        format: "wide",
        alt: {
          en: "Interactive geographical map displaying retail store branch pins and active operational statuses across regions.",
          id: "Peta digital interaktif yang menampilkan sebaran titik cabang toko dan status keaktifan operasional wilayah.",
        },
        caption: {
          en: "Branch distribution map displaying operational store locations and their active status across regions.",
          id: "Peta persebaran cabang menampilkan lokasi gerai operasional beserta status keaktifan masing-masing toko.",
        },
      },
      {
        id: "FIG.08",
        src: "/assets/projects/ukg-system/documentation/08.webp",
        format: "wide",
        alt: {
          en: "Inter-branch stock order request form with destination warehouse dropdown and quantity input fields.",
          id: "Formulir permohonan order stok barang antar-cabang dengan pilihan gudang tujuan dan kolom input jumlah.",
        },
        caption: {
          en: "Stock order form facilitating inter-branch item requests sent directly to the central warehouse.",
          id: "Formulir order stok memfasilitasi pengajuan kebutuhan barang antar-cabang menuju gudang pusat.",
        },
      },
      {
        id: "FIG.09",
        src: "/assets/projects/ukg-system/documentation/09.webp",
        format: "wide",
        alt: {
          en: "Warehouse master stock table showing multi-branch inventory levels, unit quantities, and low stock warning badges.",
          id: "Tabel master inventaris gudang yang menunjukkan jumlah stok multi-cabang dan label peringatan persediaan.",
        },
        caption: {
          en: "Master warehouse inventory table presenting stock levels per branch alongside availability status badges.",
          id: "Tabel master stok gudang menampilkan kuantitas persediaan per cabang lengkap dengan indikator status ketersediaan barang.",
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
    },
    evidence: [
      {
        id: "FIG.01",
        src: "/assets/projects/ihealth-edu/documentation/01.webp",
        format: "wide",
        alt: {
          en: "iHealth Edu public landing page featuring primary healthcare services and educational program overview for Puskesmas Padangsari.",
          id: "Halaman beranda publik iHealth Edu yang memuat layanan kesehatan primer dan informasi program edukasi Puskesmas Padangsari.",
        },
        caption: {
          en: "The iHealth Edu homepage introducing the integrated primary healthcare education platform for Puskesmas Padangsari.",
          id: "Halaman beranda iHealth Edu menyajikan pengenalan platform edukasi kesehatan terintegrasi Puskesmas Padangsari.",
        },
      },
      {
        id: "FIG.02",
        src: "/assets/projects/ihealth-edu/documentation/02.webp",
        format: "wide",
        alt: {
          en: "User authentication screen showing one-time password OTP input verification modal.",
          id: "Layar autentikasi pengguna yang menampilkan modal verifikasi kode one-time password OTP melalui email.",
        },
        caption: {
          en: "User authentication flow equipped with email-based OTP verification for secure account access.",
          id: "Alur autentikasi pengguna dilengkapi verifikasi kode OTP berbasis email untuk keamanan akses akun.",
        },
      },
      {
        id: "FIG.03",
        src: "/assets/projects/ihealth-edu/documentation/03.webp",
        format: "wide",
        alt: {
          en: "Interactive healthcare educational module reader displaying embedded video and downloadable digital booklets.",
          id: "Tampilan modul edukasi kesehatan interaktif dengan pemutar video terintegrasi dan booklet digital.",
        },
        caption: {
          en: "Educational module presenting interactive health lessons through embedded video and a digital booklet viewer.",
          id: "Modul edukasi menyajikan materi kesehatan interaktif melalui video terintegrasi dan penampil booklet digital.",
        },
      },
      {
        id: "FIG.04",
        src: "/assets/projects/ihealth-edu/documentation/04.webp",
        format: "wide",
        alt: {
          en: "Health assessment questionnaire evaluation results screen displaying self-management scores and response breakdown.",
          id: "Tampilan hasil evaluasi kuesioner asesmen kesehatan yang memuat skor manajemen mandiri dan rincian jawaban.",
        },
        caption: {
          en: "Questionnaire assessment results presenting patient self-management evaluation scores and detailed response items.",
          id: "Hasil asesmen kuesioner menyajikan skor evaluasi manajemen mandiri pasien dan rincian tanggapan instrumen.",
        },
      },
      {
        id: "FIG.05",
        src: "/assets/projects/ihealth-edu/documentation/05.webp",
        format: "wide",
        alt: {
          en: "Patient and health worker community forum thread showing health-related questions and verified replies.",
          id: "Forum komunitas diskusi antara pasien dan tenaga kesehatan yang memuat pertanyaan kesehatan dan tanggapan terverifikasi.",
        },
        caption: {
          en: "Community forum facilitating healthcare Q&A threads between patients and verified healthcare workers.",
          id: "Forum komunitas memfasilitasi tanya jawab seputar kesehatan antara pengguna dan tenaga kesehatan terverifikasi.",
        },
      },
      {
        id: "FIG.06",
        src: "/assets/projects/ihealth-edu/documentation/06.webp",
        format: "wide",
        alt: {
          en: "Clinical measurement input form for recording patient biometrics from connected IoT hardware or manual entry.",
          id: "Formulir pencatatan hasil pemeriksaan klinis untuk merekam biometrik pasien dari perangkat IoT maupun input manual.",
        },
        caption: {
          en: "Health examination form capturing patient clinical measurements from IoT devices or manual entry.",
          id: "Formulir input pemeriksaan mencatat data klinis pasien yang terhubung dengan perangkat IoT maupun masukan manual.",
        },
      },
      {
        id: "FIG.07",
        src: "/assets/projects/ihealth-edu/documentation/07.webp",
        format: "wide",
        alt: {
          en: "Patient biometric examination history chart plotting blood pressure, blood glucose, and cholesterol over time.",
          id: "Grafik riwayat pemeriksaan biometrik pasien yang memetakan tekanan darah, gula darah, dan kolesterol dari waktu ke waktu.",
        },
        caption: {
          en: "Examination history charts displaying patient blood pressure and blood glucose trends over time.",
          id: "Grafik riwayat pemeriksaan menampilkan tren tekanan darah dan kadar gula darah pasien secara berkala.",
        },
      },
      {
        id: "FIG.08",
        src: "/assets/projects/ihealth-edu/documentation/08.webp",
        format: "wide",
        alt: {
          en: "Geographic patient distribution map supporting community health monitoring across Puskesmas Padangsari coverage areas.",
          id: "Peta persebaran geografis pasien untuk mendukung monitoring kesehatan masyarakat di wilayah kerja Puskesmas Padangsari.",
        },
        caption: {
          en: "Geographic distribution map charting patient locations to support Puskesmas Padangsari regional monitoring.",
          id: "Peta persebaran geografis memetakan distribusi lokasi pasien untuk mendukung monitoring wilayah Puskesmas Padangsari.",
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
    },
    evidence: [
      {
        id: "FIG.01",
        src: "/assets/projects/dialisis-connect-edu/documentation/01.webp",
        format: "wide",
        alt: {
          en: "Dialisis Connect Edu platform landing page introducing kidney therapy educational resources and hemodialysis community support.",
          id: "Halaman beranda Dialisis Connect Edu yang memperkenalkan materi edukasi terapi ginjal dan komunitas hemodialisis.",
        },
        caption: {
          en: "Dialisis Connect Edu landing page introducing the renal therapy education and hemodialysis community platform.",
          id: "Halaman awal Dialisis Connect Edu memperkenalkan platform edukasi terapi ginjal dan komunitas hemodialisis.",
        },
      },
      {
        id: "FIG.02",
        src: "/assets/projects/dialisis-connect-edu/documentation/02.webp",
        format: "wide",
        alt: {
          en: "User account registration page with structured profile input fields for kidney patients and caregivers.",
          id: "Halaman pendaftaran akun pengguna dengan formulir data diri terstruktur untuk pasien ginjal dan pendamping.",
        },
        caption: {
          en: "Account registration page providing a structured sign-up form for educational platform users.",
          id: "Halaman registrasi akun menyediakan formulir pendaftaran terstruktur bagi pengguna platform edukasi.",
        },
      },
      {
        id: "FIG.03",
        src: "/assets/projects/dialisis-connect-edu/documentation/03.webp",
        format: "wide",
        alt: {
          en: "Chronic kidney disease self-care assessment screening catalog displaying available educational questionnaires.",
          id: "Katalog asesmen perawatan mandiri penyakit ginjal kronis yang menampilkan modul kuesioner evaluasi.",
        },
        caption: {
          en: "Screening catalog presenting self-care assessment modules for patients living with chronic kidney disease.",
          id: "Katalog screening menyajikan daftar modul asesmen perawatan mandiri pasien penyakit ginjal kronis.",
        },
      },
      {
        id: "FIG.04",
        src: "/assets/projects/dialisis-connect-edu/documentation/04.webp",
        format: "wide",
        alt: {
          en: "Educational lesson viewer displaying dietary guidance and interactive dialysis care video materials.",
          id: "Halaman materi pembelajaran yang menampilkan panduan diet ginjal dan video edukasi dialisis interaktif.",
        },
        caption: {
          en: "Educational lesson page presenting nutrition and dialysis care guidelines through interactive video materials.",
          id: "Halaman materi edukasi menyajikan panduan nutrisi dan perawatan dialisis melalui video pembelajaran interaktif.",
        },
      },
      {
        id: "FIG.05",
        src: "/assets/projects/dialisis-connect-edu/documentation/05.webp",
        format: "wide",
        alt: {
          en: "Healthcare consultation appointment scheduling calendar and time slot selection interface.",
          id: "Antarmuka kalender jadwal konsultasi kesehatan dan pemilihan sesi pendampingan edukasi.",
        },
        caption: {
          en: "Consultation booking feature managing appointment schedules and educational guidance for users.",
          id: "Fitur booking konsultasi mengelola jadwal pertemuan dan pendampingan edukasi kesehatan bagi pengguna.",
        },
      },
      {
        id: "FIG.06",
        src: "/assets/projects/dialisis-connect-edu/documentation/06.webp",
        format: "wide",
        alt: {
          en: "Patient educational history view presenting completed screening records and self-care assessment outcomes.",
          id: "Tampilan riwayat pembelajaran pasien yang menyajikan rekaman pengerjaan screening dan evaluasi mandiri.",
        },
        caption: {
          en: "History page recording patient screening results and structured learning progress over time.",
          id: "Halaman riwayat mencatat hasil pengerjaan screening dan evaluasi pembelajaran pasien secara terstruktur.",
        },
      },
      {
        id: "FIG.07",
        src: "/assets/projects/dialisis-connect-edu/documentation/07.webp",
        format: "wide",
        alt: {
          en: "Administrator content management console for publishing lessons, YouTube video links, and PDF booklets.",
          id: "Konsol manajemen konten admin untuk menerbitkan materi pembelajaran, video YouTube, dan booklet PDF.",
        },
        caption: {
          en: "Admin console facilitating publication of new educational lessons with video links and PDF booklet attachments.",
          id: "Konsol admin memfasilitasi publikasi materi edukasi baru lengkap dengan tautan video dan dokumen booklet PDF.",
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
      en: "A web application that combines Islamic learning modules, lesson-attached discussions, and an administrator console for managing content.",
      id: "Aplikasi web yang memadukan modul pembelajaran dakwah, ruang diskusi interaktif pada setiap materi, dan konsol admin untuk mengelola konten.",
    },
    metaTitle: {
      en: "Nusa Dakwah — Full-Stack Web Development Case Study | Annas Tri Widagdo",
      id: "Nusa Dakwah — Studi Kasus Full-Stack Web Development | Annas Tri Widagdo",
    },
    metaDescription: {
      en: "A full-stack case study covering Next.js, Laravel REST API, modular learning structure, lesson-attached discussions, and content administration for Nusa Dakwah.",
      id: "Studi kasus full-stack Nusa Dakwah yang mencakup Next.js, Laravel REST API, struktur pembelajaran modular, diskusi pada materi, dan administrasi konten.",
    },
    liveUrl: "https://nusadakwah.vercel.app/",
    frontendRepoUrl: "https://github.com/annastriw/frontend-nusa-dakwah.git",
    backendRepoUrl: "https://github.com/annastriw/backend-nusa-dakwah.git",
    overview: {
      en: [
        "I independently designed and developed Nusa Dakwah as a complete digital learning platform. It organizes lessons into modules and submodules, supported by articles and embedded YouTube videos.",
        "Each lesson includes an attached discussion area with nested replies. The administrator console manages modules, lessons, and discussions, with the full application containerized using Docker.",
      ],
      id: [
        "Saya merancang dan mengembangkan Nusa Dakwah secara mandiri sebagai platform pembelajaran dakwah terstruktur. Materi disusun ke dalam modul dan submodul yang dilengkapi artikel dan video YouTube tersemat.",
        "Setiap materi memiliki ruang diskusi interaktif dengan balasan bertingkat. Konsol administrator mengelola modul, materi, dan diskusi, serta seluruh sistem telah di-deploy menggunakan Docker.",
      ],
    },
    contributions: {
      en: [
        "Defined product requirements and designed the user flows, typography, components, and responsive pages in Figma.",
        "Built the Next.js frontend with Tailwind CSS, creating experiences for public visitors, authenticated users, and administrators.",
        "Developed the Laravel REST API backend with MySQL, including JWT authentication, validation, and content endpoints.",
        "Tested the platform manually and with Katalon Studio, containerized the frontend and backend with Docker, and deployed the production release.",
      ],
      id: [
        "Merumuskan kebutuhan produk dan merancang user flow, tipografi, komponen, serta halaman responsif di Figma.",
        "Membangun frontend Next.js dengan Tailwind CSS untuk pengunjung publik, pengguna terautentikasi, dan administrator.",
        "Mengembangkan backend REST API berbasis Laravel dan MySQL, termasuk JWT authentication, validasi, dan endpoint konten.",
        "Menguji platform secara manual dan otomatis menggunakan Katalon Studio, membuat konfigurasi Docker untuk frontend dan backend, serta melakukan deployment ke production.",
      ],
    },
    contributionLearning: {
      en: "This project gave me experience delivering an end-to-end learning platform independently from product design to containerized deployment.",
      id: "Project ini memberi saya pengalaman mengembangkan platform pembelajaran dari perancangan produk hingga deployment berbasis container secara mandiri.",
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
    },
    evidence: [
      {
        id: "FIG.01",
        src: "/assets/projects/nusa-dakwah/documentation/01.webp",
        format: "mobile",
        alt: {
          en: "Nusa Dakwah mobile home interface displaying search bar, hero banner, and featured Islamic learning modules.",
          id: "Tampilan mobile beranda Nusa Dakwah dengan bilah pencarian, banner utama, dan daftar modul dakwah unggulan.",
        },
        caption: {
          en: "Nusa Dakwah landing page featuring module search and an introduction to the digital Islamic learning platform.",
          id: "Tampilan beranda Nusa Dakwah menyajikan pencarian modul dan pengenalan platform pembelajaran dakwah digital.",
        },
      },
      {
        id: "FIG.02",
        src: "/assets/projects/nusa-dakwah/documentation/02.webp",
        format: "mobile",
        alt: {
          en: "Mobile login interface with email and password input fields for student and administrator authentication.",
          id: "Antarmuka masuk mobile dengan kolom input email dan kata sandi untuk autentikasi santri dan administrator.",
        },
        caption: {
          en: "User authentication interface providing a secure sign-in form to access learning materials.",
          id: "Antarmuka autentikasi pengguna menyediakan formulir masuk yang aman untuk mengakses materi pembelajaran.",
        },
      },
      {
        id: "FIG.03",
        src: "/assets/projects/nusa-dakwah/documentation/03.webp",
        format: "mobile",
        alt: {
          en: "Learning lesson view on mobile integrating embedded YouTube lecture video with accompanying article text.",
          id: "Tampilan materi pembelajaran mobile yang mengintegrasikan pemutar video YouTube dengan naskah artikel kajian.",
        },
        caption: {
          en: "Module detail page integrating embedded YouTube lecture videos with accompanying lesson articles.",
          id: "Halaman detail modul mengintegrasikan video kajian berbasis YouTube dan naskah artikel pembelajaran.",
        },
      },
      {
        id: "FIG.04",
        src: "/assets/projects/nusa-dakwah/documentation/04.webp",
        format: "mobile",
        alt: {
          en: "Lesson discussion thread on mobile displaying user comments and nested reply interactions.",
          id: "Utas forum diskusi materi pada tampilan mobile yang menampilkan komentar pengguna dan balasan berjenjang.",
        },
        caption: {
          en: "Lesson-attached discussion forum facilitating Q&A interactions and multi-level nested replies.",
          id: "Forum diskusi pada setiap modul memfasilitasi interaksi tanya jawab dan balasan komentar bertingkat.",
        },
      },
      {
        id: "FIG.05",
        src: "/assets/projects/nusa-dakwah/documentation/05.webp",
        format: "mobile",
        alt: {
          en: "Admin console on mobile displaying structured module, submodule, and lesson material catalog.",
          id: "Konsol admin pada tampilan mobile yang menampilkan katalog hierarki modul, submodul, dan materi dakwah.",
        },
        caption: {
          en: "Admin dashboard presenting the content catalog organized by module and submodule hierarchies.",
          id: "Dashboard admin menyajikan daftar inventaris konten materi berdasarkan struktur modul dan submodul.",
        },
      },
      {
        id: "FIG.06",
        src: "/assets/projects/nusa-dakwah/documentation/06.webp",
        format: "mobile",
        alt: {
          en: "Content editing form on mobile for managing module hierarchy, lesson text, and video toggle settings.",
          id: "Formulir edit materi pada tampilan mobile untuk mengatur hierarki modul, isi naskah, dan opsi video tersemat.",
        },
        caption: {
          en: "Content editing form enabling administrators to manage lesson titles, submodule links, and multimedia toggles.",
          id: "Formulir edit materi memungkinkan admin mengelola judul, relasi submodul, serta integrasi video dan artikel.",
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
    },
    evidence: [
      {
        id: "FIG.01",
        src: "/assets/projects/simastok/documentation/01.webp",
        format: "wide",
        alt: {
          en: "SIMASTOK login modal with automotive workshop branding and secure authentication inputs.",
          id: "Modal login SIMASTOK bertema bengkel otomotif dengan input autentikasi email dan kata sandi.",
        },
        caption: {
          en: "SIMASTOK sign-in page providing a secure user authentication portal styled with an automotive workshop theme.",
          id: "Halaman masuk SIMASTOK menyediakan portal autentikasi pengguna dengan antarmuka bertema bengkel otomotif.",
        },
      },
      {
        id: "FIG.02",
        src: "/assets/projects/simastok/documentation/02.webp",
        format: "wide",
        alt: {
          en: "SIMASTOK administrator dashboard with inventory count summary cards and monthly stock movement chart.",
          id: "Dashboard admin SIMASTOK dengan kartu ringkasan total barang dan grafik batang pergerakan stok bulanan.",
        },
        caption: {
          en: "Inventory dashboard presenting item counts, total stock in hand, and 6-month parts movement bar charts.",
          id: "Dashboard inventaris menampilkan ringkasan jumlah barang, total persediaan, dan grafik pergerakan stok suku cadang.",
        },
      },
      {
        id: "FIG.03",
        src: "/assets/projects/simastok/documentation/03.webp",
        format: "wide",
        alt: {
          en: "SIMASTOK inventory table displaying spare parts list, categories, suppliers, stock counts, and action buttons.",
          id: "Tabel inventaris SIMASTOK menampilkan daftar suku cadang, kategori, pemasok, jumlah stok, dan tombol aksi.",
        },
        caption: {
          en: "Parts catalog table managing spare part inventory, category classifications, suppliers, and unit prices.",
          id: "Tabel data barang mengelola master persediaan suku cadang, klasifikasi kategori, supplier, dan harga satuan.",
        },
      },
      {
        id: "FIG.04",
        src: "/assets/projects/simastok/documentation/04.webp",
        format: "wide",
        alt: {
          en: "SIMASTOK outgoing parts form with dropdown selector, quantity validation, and transaction date input.",
          id: "Formulir barang keluar SIMASTOK dengan pilihan suku cadang, validasi jumlah stok, dan tanggal pengeluaran.",
        },
        caption: {
          en: "Outgoing parts form facilitating structured stock reduction transactions for workshop operations.",
          id: "Formulir pencatatan barang keluar memfasilitasi transaksi pengurangan stok suku cadang secara terstruktur.",
        },
      },
      {
        id: "FIG.05",
        src: "/assets/projects/simastok/documentation/05.webp",
        format: "wide",
        alt: {
          en: "SIMASTOK stock movement report page showing date-range filter, total incoming and outgoing cards, and PDF export.",
          id: "Halaman laporan pergerakan stok SIMASTOK dengan filter tanggal, total keluar masuk barang, dan ekspor PDF.",
        },
        caption: {
          en: "Stock movement report providing date-range filters, turnover summaries, and PDF export functionality.",
          id: "Laporan pergerakan barang menyajikan filter rentang tanggal, ringkasan perputaran stok, dan opsi ekspor ke format PDF.",
        },
      },
      {
        id: "FIG.06",
        src: "/assets/projects/simastok/documentation/06.webp",
        format: "wide",
        alt: {
          en: "SIMASTOK user profile settings page with personal information and password update forms.",
          id: "Halaman pengaturan profil pengguna SIMASTOK dengan formulir data pribadi dan pembaruan kata sandi.",
        },
        caption: {
          en: "User profile page managing account identity details and self-service password updates.",
          id: "Halaman profil akun mengelola data identitas pengguna dan pembaruan kata sandi secara mandiri.",
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
    },
    evidence: [
      {
        id: "FIG.01",
        src: "/assets/projects/ml-for-heart-attack-risk-prediction/documentation/01.webp",
        format: "wide",
        alt: {
          en: "Terminal view displaying 21 clinical, demographic, and lifestyle feature inputs prior to model inference.",
          id: "Tampilan terminal yang menampilkan 21 input fitur klinis, demografis, dan pola hidup sebelum inferensi model.",
        },
        caption: {
          en: "Structured patient input parameters comprising 21 demographic, clinical, and lifestyle variables prior to model inference.",
          id: "Struktur input data pasien memuat 21 parameter demografis, klinis, dan gaya hidup sebelum proses inferensi model.",
        },
      },
      {
        id: "FIG.02",
        src: "/assets/projects/ml-for-heart-attack-risk-prediction/documentation/02.webp",
        format: "wide",
        alt: {
          en: "Terminal inference response showing low-risk prediction, estimated probability, supporting factors, and top 5 feature weights.",
          id: "Respons inferensi terminal yang menampilkan hasil prediksi risiko rendah, estimasi probabilitas, faktor pendukung, dan 5 bobot fitur teratas.",
        },
        caption: {
          en: "Inference output presenting estimated risk probability, supporting factor evaluations, and key influential feature information.",
          id: "Output inferensi menyajikan estimasi probabilitas risiko, evaluasi faktor pendukung, dan informasi fitur paling berpengaruh.",
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
    },
    evidence: [
      {
        id: "FIG.01",
        src: "/assets/projects/speech-to-text-system/documentation/01.webp",
        format: "wide",
        alt: {
          en: "Side-by-side visual comparison between original source video and final processed video with burned-in uppercase subtitles.",
          id: "Perbandingan visual berdampingan antara video sumber asli dan video hasil pemrosesan dengan subtitle huruf kapital tertanam.",
        },
        caption: {
          en: "Side-by-side comparison displaying the original video and the final output with permanently burned-in automated subtitles.",
          id: "Perbandingan berdampingan menampilkan video asli dan video akhir dengan subtitle otomatis yang tertanam secara permanen.",
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
    },
    evidence: [
      {
        id: "FIG.01",
        src: "/assets/projects/thermal-printer-service/documentation/01.webp",
        format: "mobile",
        alt: {
          en: "High-resolution Android application launcher icon for Thermal Printer Service with receipt printer illustration.",
          id: "Ikon aplikasi Android resolusi tinggi untuk Thermal Printer Service dengan ilustrasi printer struk.",
        },
        caption: {
          en: "Thermal Printer Service Android application icon for Bluetooth hardware printing integration.",
          id: "Ikon aplikasi Android Thermal Printer Service untuk integrasi pencetakan perangkat Bluetooth.",
        },
      },
      {
        id: "FIG.02",
        src: "/assets/projects/thermal-printer-service/documentation/02.webp",
        format: "mobile",
        alt: {
          en: "Thermal Printer Service main screen displaying print service toggle, active profile info, and test print button.",
          id: "Layar utama Thermal Printer Service yang menampilkan status print service, profil aktif, dan tombol uji cetak.",
        },
        caption: {
          en: "Main application interface providing access to Android system print settings and active printer test printing.",
          id: "Antarmuka utama aplikasi menyediakan akses ke pengaturan layanan cetak sistem Android dan pengujian printer aktif.",
        },
      },
      {
        id: "FIG.03",
        src: "/assets/projects/thermal-printer-service/documentation/03.webp",
        format: "mobile",
        alt: {
          en: "Configured thermal printer profile manager displaying Bluetooth MAC address, paper width, and offset settings.",
          id: "Pengelola profil printer termal yang menampilkan alamat MAC Bluetooth, lebar kertas, dan pengaturan offset.",
        },
        caption: {
          en: "Printer profile manager configuring paper widths, margin calibration, and active printer selection.",
          id: "Daftar profil printer mengelola konfigurasi ukuran kertas, kalibrasi margin, dan status printer aktif.",
        },
      },
      {
        id: "FIG.04",
        src: "/assets/projects/thermal-printer-service/documentation/04.webp",
        format: "mobile",
        alt: {
          en: "Bluetooth device discovery and paired printer selection interface in Thermal Printer Service.",
          id: "Antarmuka pemindaian perangkat Bluetooth dan pemilihan printer termal yang telah dipasangkan pada Thermal Printer Service.",
        },
        caption: {
          en: "Bluetooth device selection step scanning and connecting paired thermal printer hardware.",
          id: "Langkah pemilihan perangkat Bluetooth memindai dan menghubungkan printer thermal yang telah dipasangkan.",
        },
      },
      {
        id: "FIG.05",
        src: "/assets/projects/thermal-printer-service/documentation/05.webp",
        format: "mobile",
        alt: {
          en: "Printer parameter configuration screen for choosing 58mm or 80mm paper width and print margin calibration.",
          id: "Layar pengaturan parameter printer untuk memilih lebar kertas 58 mm atau 80 mm serta kalibrasi margin cetak.",
        },
        caption: {
          en: "Print parameter settings allowing adjustment of 58mm or 80mm paper widths and margin calibration.",
          id: "Pengaturan parameter cetak memungkinkan penyesuaian lebar kertas 58 mm atau 80 mm serta kalibrasi margin.",
        },
      },
      {
        id: "FIG.06",
        src: "/assets/projects/thermal-printer-service/documentation/06.webp",
        format: "mobile",
        alt: {
          en: "Android system print preview forwarding document rendering to configured Bluetooth thermal printer.",
          id: "Pratinjau cetak sistem Android yang meneruskan dokumen cetak menuju printer termal Bluetooth terkonfigurasi.",
        },
        caption: {
          en: "Android system print preview forwarding rendered documents to the configured Bluetooth thermal printer.",
          id: "Pratinjau cetak sistem Android meneruskan dokumen menuju printer thermal Bluetooth yang telah dikonfigurasi.",
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
        src: "/assets/projects/footy-standings/documentation/01.webp",
        format: "mobile",
        alt: {
          en: "Footy Standings mobile league table displaying club rankings, played matches, goal differences, and points.",
          id: "Tabel klasemen liga mobile Footy Standings yang menampilkan posisi klub, jumlah laga, selisih gol, dan poin.",
        },
        caption: {
          en: "League standings table presenting team rankings alongside club crests, match records, and point totals.",
          id: "Klasemen liga menyajikan urutan peringkat tim lengkap dengan logo klub, statistik pertandingan, dan perolehan poin.",
        },
      },
      {
        id: "FIG.02",
        src: "/assets/projects/footy-standings/documentation/02.webp",
        format: "mobile",
        alt: {
          en: "Upcoming league match fixtures schedule on mobile with club pairings, dates, and local kickoff times.",
          id: "Jadwal pertandingan mendatang pada tampilan mobile dengan informasi pasangan klub, tanggal, dan waktu tanding.",
        },
        caption: {
          en: "Upcoming fixtures screen displaying scheduled match information with dates and kickoff times.",
          id: "Jadwal pertandingan mendatang menampilkan informasi laga yang akan berlangsung lengkap dengan tanggal dan waktu kick-off."
        },
      },
      {
        id: "FIG.03",
        src: "/assets/projects/footy-standings/documentation/03.webp",
        format: "mobile",
        alt: {
          en: "Top goalscorers ranking list on mobile displaying player names, clubs, and total league goals scored.",
          id: "Daftar peringkat top scorer pada tampilan mobile yang menampilkan nama pemain, klub, dan perolehan gol liga.",
        },
        caption: {
          en: "Top scorers list presenting player rankings and total goal tallies across league competitions.",
          id: "Daftar pencetak gol terbanyak menyajikan peringkat pemain dan jumlah gol yang diperoleh dalam kompetisi liga.",
        },
      },
      {
        id: "FIG.04",
        src: "/assets/projects/footy-standings/documentation/04.webp",
        format: "mobile",
        alt: {
          en: "Football club profile details screen on mobile with club crest, founding year, stadium name, and website link.",
          id: "Layar detail profil klub sepak bola pada tampilan mobile dengan logo, tahun pendirian, stadion, dan website resmi.",
        },
        caption: {
          en: "Club details screen presenting team profiles, founding year, home stadium, and official website links.",
          id: "Halaman detail klub menyajikan informasi profil tim, tahun berdiri, stadion kandang, dan tautan website resmi.",
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
    },
    evidence: [
      {
        id: "FIG.01",
        src: "/assets/projects/panoramic-virtual-tour/documentation/01.webp",
        format: "wide",
        alt: {
          en: "Panoramic Virtual Tour title screen and main menu over the 3D building facility landscape.",
          id: "Layar judul dan menu utama Panoramic Virtual Tour dengan latar pemandangan lanskap fasilitas 3D.",
        },
        caption: {
          en: "Main menu title screen providing initial access to start interactive virtual exploration of the building facility.",
          id: "Layar menu utama menyajikan akses awal untuk memulai eksplorasi virtual tour interaktif fasilitas bangunan.",
        },
      },
      {
        id: "FIG.02",
        src: "/assets/projects/panoramic-virtual-tour/documentation/02.webp",
        format: "wide",
        alt: {
          en: "Aerial bird-eye panorama showing the industrial building complex layout, roof structures, and open courtyard.",
          id: "Panorama aerial sudut tinggi yang memperlihatkan tata letak kawasan industri, struktur atap, dan halaman terbuka.",
        },
        caption: {
          en: "Aerial vantage point showing the industrial complex layout, building roof structures, and open landscaped grounds.",
          id: "Sudut pandang udara memperlihatkan tata letak kawasan industri, struktur atap bangunan, dan area lanskap terbuka.",
        },
      },
      {
        id: "FIG.03",
        src: "/assets/projects/panoramic-virtual-tour/documentation/03.webp",
        format: "wide",
        alt: {
          en: "Facility entrance gate perimeter panorama equipped with interactive navigation hotspot pins.",
          id: "Panorama area luar gerbang fasilitas yang dilengkapi pin hotspot navigasi interaktif untuk perpindahan sudut pandang.",
        },
        caption: {
          en: "Exterior perimeter panorama equipped with interactive navigation hotspot pins for scene transitions.",
          id: "Panorama area luar gerbang fasilitas dilengkapi titik hotspot navigasi interaktif untuk perpindahan scene.",
        },
      },
      {
        id: "FIG.04",
        src: "/assets/projects/panoramic-virtual-tour/documentation/04.webp",
        format: "wide",
        alt: {
          en: "Courtyard garden panorama featuring landscaped greenery, building facade, and virtual navigation pins.",
          id: "Panorama halaman taman fasilitas yang menampilkan area hijau tertata, fasad gedung, dan penanda navigasi virtual.",
        },
        caption: {
          en: "Courtyard garden viewpoint displaying landscape vegetation, operational building facades, and virtual navigation pins.",
          id: "Sudut pandang halaman taman menampilkan vegetasi lanskap, fasad gedung operasional, dan penanda navigasi virtual.",
        },
      },
      {
        id: "FIG.05",
        src: "/assets/projects/panoramic-virtual-tour/documentation/05.webp",
        format: "wide",
        alt: {
          en: "Factory production floor interior displaying machinery lines and navigation hotspot markers.",
          id: "Interior lantai produksi pabrik yang menampilkan jajaran mesin industri dan penanda hotspot navigasi.",
        },
        caption: {
          en: "Factory production floor area presenting rows of industrial machinery and hotspot markers for workspace navigation.",
          id: "Area lantai produksi pabrik menyajikan jajaran mesin industri dan penanda hotspot untuk navigasi antar area kerja.",
        },
      },
      {
        id: "FIG.06",
        src: "/assets/projects/panoramic-virtual-tour/documentation/06.webp",
        format: "wide",
        alt: {
          en: "Mezzanine platform view overlooking the manufacturing machinery and overhead building structure.",
          id: "Sudut pandang anjungan mezzanine yang menghadap ke area mesin manufaktur dan struktur bangunan pabrik.",
        },
        caption: {
          en: "Elevated mezzanine perspective overlooking the entire layout of manufacturing machine lines inside the factory.",
          id: "Perspektif dari anjungan atas memperlihatkan keseluruhan tata letak jalur mesin manufaktur di dalam pabrik.",
        },
      },
      {
        id: "FIG.07",
        src: "/assets/projects/panoramic-virtual-tour/documentation/07.webp",
        format: "wide",
        alt: {
          en: "Office meeting room interior showing conference table layout, interior finishes, and window exterior views.",
          id: "Interior ruang rapat kantor yang memperlihatkan tata letak meja pertemuan, material ruangan, dan jendela pandang.",
        },
        caption: {
          en: "Office meeting room interior displaying meeting table layout, interior materials, and outdoor viewing windows.",
          id: "Interior ruang rapat kantor memperlihatkan tata letak meja konferensi, material ruangan, dan jendela pandang luar.",
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
