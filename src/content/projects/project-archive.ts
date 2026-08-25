export type ProjectArchiveLocale = "en" | "id";

export type ProjectArchiveCategory = "web-app" | "ml" | "mobile" | "other";

export type ProjectArchiveFilter = "all" | ProjectArchiveCategory;

type LocalizedText = Readonly<Record<ProjectArchiveLocale, string>>;

export interface ProjectArchiveItem {
  readonly index: string;
  readonly slug: string;
  readonly category: ProjectArchiveCategory;
  readonly title: LocalizedText;
  readonly role: LocalizedText;
  readonly summary: LocalizedText;
  readonly primaryTechnologies: readonly string[];
  readonly coverImage: string;
  readonly coverAlt: LocalizedText;
  readonly coverPosition?: "center" | "top";
  readonly status: LocalizedText;
  readonly liveUrl?: string;
}

export const projectArchiveCategories: readonly {
  key: ProjectArchiveFilter;
  label: LocalizedText;
}[] = [
  { key: "all", label: { en: "All", id: "Semua" } },
  {
    key: "web-app",
    label: { en: "Web Application", id: "Aplikasi Web" },
  },
  {
    key: "ml",
    label: { en: "Machine Learning", id: "Machine Learning" },
  },
  { key: "mobile", label: { en: "Mobile", id: "Mobile" } },
  { key: "other", label: { en: "Other", id: "Lainnya" } },
];

export const projectArchive: readonly ProjectArchiveItem[] = [
  {
    index: "01",
    slug: "ukg-system",
    category: "web-app",
    title: { en: "UKG System", id: "UKG System" },
    role: { en: "Fullstack Developer", id: "Fullstack Developer" },
    summary: {
      en: "Multi-branch ERP web application developed end-to-end for CV Universal Kharisma Globalindo, covering operational workflows, automated testing, and Linux VPS production deployment.",
      id: "Aplikasi ERP web multi-cabang yang dikembangkan end-to-end untuk CV Universal Kharisma Globalindo, mencakup workflow operasional, automated testing, dan deployment production pada VPS Linux.",
    },
    primaryTechnologies: [
      "Next.js",
      "NestJS",
      "REST API",
      "Katalon Studio",
      "Linux Ubuntu",
    ],
    coverImage: "/assets/projects/ukg-system/cover.webp",
    coverAlt: {
      en: "UKG System multi-branch ERP administration dashboard",
      id: "Dashboard administrasi ERP multi-cabang UKG System",
    },
    coverPosition: "top",
    status: { en: "Live Production", id: "Aktif di Production" },
    liveUrl: "https://ukgsystem.com",
  },
  {
    index: "02",
    slug: "ihealth-edu",
    category: "web-app",
    title: { en: "iHealth Edu", id: "iHealth Edu" },
    role: { en: "Fullstack Developer", id: "Fullstack Developer" },
    summary: {
      en: "Integrated digital health platform developed with Puskesmas Padangsari for health screening, education, ESP32 IoT telemetry, and ML risk-prediction decision support.",
      id: "Platform kesehatan digital terintegrasi yang dikembangkan bersama Puskesmas Padangsari untuk screening, edukasi, telemetri IoT ESP32, dan pendukung keputusan prediksi risiko berbasis ML.",
    },
    primaryTechnologies: ["Next.js", "Laravel", "MySQL", "Flask", "ESP32"],
    coverImage: "/assets/projects/ihealth-edu/cover.webp",
    coverAlt: {
      en: "iHealth Edu health education and screening interface",
      id: "Antarmuka edukasi dan screening kesehatan iHealth Edu",
    },
    coverPosition: "top",
    status: { en: "Production Deployment", id: "Deploy ke Production" },
  },
  {
    index: "03",
    slug: "dialisis-connect-edu",
    category: "web-app",
    title: { en: "Dialisis Connect Edu", id: "Dialisis Connect Edu" },
    role: { en: "Fullstack Developer", id: "Fullstack Developer" },
    summary: {
      en: "Kidney health education and community platform developed with IPDI Central Java, featuring role-based resources, video guides, PDF booklets, and interactive discussion forums.",
      id: "Platform edukasi dan komunitas kesehatan ginjal yang dikembangkan bersama IPDI Jawa Tengah, menyajikan materi edukasi berbasis peran, panduan video, booklet PDF, dan forum diskusi interaktif.",
    },
    primaryTechnologies: [
      "Next.js",
      "Laravel",
      "MySQL",
      "Katalon Studio",
      "Docker",
    ],
    coverImage: "/assets/projects/dialisis-connect-edu/cover.webp",
    coverAlt: {
      en: "Dialisis Connect Edu education platform landing page",
      id: "Halaman awal platform edukasi Dialisis Connect Edu",
    },
    coverPosition: "top",
    status: { en: "Production Deployment", id: "Deploy ke Production" },
  },
  {
    index: "04",
    slug: "nusa-dakwah",
    category: "web-app",
    title: { en: "Nusa Dakwah", id: "Nusa Dakwah" },
    role: { en: "Fullstack Developer", id: "Fullstack Developer" },
    summary: {
      en: "Digital learning and dakwah platform with structured modular topics, indexed search, multimedia integration, and a moderated discussion forum with nested replies.",
      id: "Platform pembelajaran dan dakwah digital dengan modul terstruktur, pencarian terindeks, integrasi multimedia, serta forum diskusi termoderasi dengan nested reply.",
    },
    primaryTechnologies: [
      "Next.js",
      "Laravel",
      "MySQL",
      "Katalon Studio",
      "Docker",
    ],
    coverImage: "/assets/projects/nusa-dakwah/cover.webp",
    coverAlt: {
      en: "Nusa Dakwah digital content platform landing page",
      id: "Halaman awal platform konten digital Nusa Dakwah",
    },
    coverPosition: "top",
    status: { en: "Production Deployment", id: "Deploy ke Production" },
  },
  {
    index: "05",
    slug: "simastok",
    category: "web-app",
    title: {
      en: "SIMASTOK SHR Jaya Motor",
      id: "SIMASTOK SHR Jaya Motor",
    },
    role: { en: "Fullstack Developer", id: "Fullstack Developer" },
    summary: {
      en: "Centralized spare-parts inventory management system featuring role-based access, automatic stock reconciliation, transaction logging, date-range analytics, and PDF exports.",
      id: "Sistem manajemen inventaris suku cadang terpusat dengan akses berbasis peran, rekonsiliasi stok otomatis, pencatatan transaksi, analitik berbasis tanggal, dan ekspor PDF.",
    },
    primaryTechnologies: ["Laravel", "PHP", "MySQL", "Katalon Studio", "Docker"],
    coverImage: "/assets/projects/simastok/cover.webp",
    coverAlt: {
      en: "SIMASTOK SHR Jaya Motor inventory system sign-in screen",
      id: "Halaman masuk sistem inventaris SIMASTOK SHR Jaya Motor",
    },
    coverPosition: "center",
    status: { en: "Production Deployment", id: "Deploy ke Production" },
  },
  {
    index: "06",
    slug: "ml-for-heart-attack-risk-prediction",
    category: "ml",
    title: {
      en: "Machine Learning Model for Heart Attack Risk Prediction",
      id: "Machine Learning Model for Heart Attack Risk Prediction",
    },
    role: {
      en: "Machine Learning Developer",
      id: "Machine Learning Developer",
    },
    summary: {
      en: "Binary classification prototype evaluated across 158,355 clinical records; the selected Random Forest model achieved 71.93% accuracy and 0.8015 ROC-AUC, served via Flask REST API for decision-support risk prediction.",
      id: "Purwarupa klasifikasi biner yang dievaluasi pada 158.355 data klinis; model Random Forest terpilih mencapai akurasi 71,93% dan ROC-AUC 0,8015, disajikan melalui REST API Flask sebagai pendukung keputusan prediksi risiko.",
    },
    primaryTechnologies: ["Python", "Scikit-learn", "SMOTE", "Flask", "Docker"],
    coverImage:
      "/assets/projects/ml-for-heart-attack-risk-prediction/cover.webp",
    coverAlt: {
      en: "Structured patient input used by the heart attack risk prediction prototype",
      id: "Input pasien terstruktur untuk purwarupa prediksi risiko serangan jantung",
    },
    coverPosition: "top",
    status: {
      en: "Prototype / Deployed API",
      id: "Purwarupa / Deployed API",
    },
  },
  {
    index: "07",
    slug: "speech-to-text-system",
    category: "ml",
    title: { en: "Speech-to-Text System", id: "Speech-to-Text System" },
    role: {
      en: "Machine Learning / AI Developer",
      id: "Machine Learning / AI Developer",
    },
    summary: {
      en: "End-to-end ASR pipeline that ingests audio/video, normalizes audio to 16 kHz mono chunks, performs Wav2Vec2 transcription, and exports structured TXT, CSV, JSON, and burned-in SRT video subtitles.",
      id: "Pipeline ASR end-to-end yang memproses audio/video, menormalisasi audio ke chunk mono 16 kHz, melakukan transkripsi Wav2Vec2, serta mengekspor data terstruktur TXT, CSV, JSON, dan subtitle video SRT.",
    },
    primaryTechnologies: [
      "Python",
      "Wav2Vec2",
      "Hugging Face Transformers",
      "FFmpeg",
      "Librosa",
    ],
    coverImage: "/assets/projects/speech-to-text-system/cover.webp",
    coverAlt: {
      en: "Before and after comparison of automatic subtitles generated by the speech-to-text workflow",
      id: "Perbandingan sebelum dan sesudah subtitle otomatis dari workflow speech-to-text",
    },
    coverPosition: "center",
    status: { en: "Completed Workflow", id: "Workflow Selesai" },
  },
  {
    index: "08",
    slug: "thermal-printer-service",
    category: "mobile",
    title: {
      en: "Thermal Printer Service",
      id: "Thermal Printer Service",
    },
    role: { en: "Android Developer", id: "Android Developer" },
    summary: {
      en: "Native Kotlin Android PrintService plugin that converts system print documents into ESC/POS monochrome raster streams for 58 mm and 80 mm Bluetooth thermal printers with calibration and retry handling.",
      id: "Plugin Android PrintService native berbasis Kotlin yang mengonversi dokumen cetak sistem menjadi raster monochrome ESC/POS untuk printer termal Bluetooth 58 mm dan 80 mm dengan kalibrasi dan retry handling.",
    },
    primaryTechnologies: [
      "Kotlin",
      "Android SDK",
      "Android Print Framework",
      "Bluetooth RFCOMM/SPP",
      "ESC/POS",
    ],
    coverImage: "/assets/projects/thermal-printer-service/cover.webp",
    coverAlt: {
      en: "Thermal Printer Service Android application icon",
      id: "Ikon aplikasi Android Thermal Printer Service",
    },
    coverPosition: "center",
    status: { en: "Completed Application", id: "Aplikasi Selesai" },
  },
  {
    index: "09",
    slug: "footy-standings",
    category: "mobile",
    title: { en: "Footy Standings", id: "Footy Standings" },
    role: { en: "Flutter Developer", id: "Flutter Developer" },
    summary: {
      en: "Cross-platform Flutter mobile application providing real-time standings, match fixtures, top scorers, and club profiles across 6 major football leagues via the Football Data REST API.",
      id: "Aplikasi mobile Flutter cross-platform yang menyajikan data klasemen langsung, jadwal pertandingan, top scorer, dan profil klub untuk 6 liga sepak bola utama melalui Football Data REST API.",
    },
    primaryTechnologies: [
      "Flutter",
      "Dart",
      "Football Data REST API",
      "HTTP",
      "JSON",
    ],
    coverImage: "/assets/projects/footy-standings/cover.webp",
    coverAlt: {
      en: "Footy Standings mobile league table interface",
      id: "Antarmuka klasemen liga pada aplikasi Footy Standings",
    },
    coverPosition: "top",
    status: {
      en: "Documented Build",
      id: "Implementasi Terdokumentasi",
    },
  },
  {
    index: "10",
    slug: "panoramic-virtual-tour",
    category: "other",
    title: {
      en: "Panoramic Virtual Tour",
      id: "Panoramic Virtual Tour",
    },
    role: { en: "Junior Game Developer", id: "Junior Game Developer" },
    summary: {
      en: "Interactive Unity 360-degree architectural exploration prototype built during internship at PT Duta Basis Dataprima, integrating 78 Lumion rendered panoramas with physics raycast hotspot navigation.",
      id: "Purwarupa eksplorasi arsitektur interaktif 360 derajat berbasis Unity saat kerja praktik di PT Duta Basis Dataprima, mengintegrasikan 78 panorama render Lumion dengan navigasi hotspot physics raycast.",
    },
    primaryTechnologies: ["Unity", "C#", "Lumion Pro", "Physics Raycast"],
    coverImage: "/assets/projects/panoramic-virtual-tour/cover.webp",
    coverAlt: {
      en: "Panoramic Virtual Tour Unity prototype opening scene",
      id: "Scene pembuka purwarupa Unity Panoramic Virtual Tour",
    },
    coverPosition: "center",
    status: { en: "Completed Prototype", id: "Purwarupa Selesai" },
  },
] as const;

export function filterProjectArchive(
  projects: readonly ProjectArchiveItem[],
  category: ProjectArchiveFilter,
): ProjectArchiveItem[] {
  if (category === "all") {
    return [...projects];
  }

  return projects.filter((project) => project.category === category);
}
