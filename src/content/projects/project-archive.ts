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
      en: "A multi-branch ERP web application built end to end for CV Universal Kharisma Globalindo, covering operational workflows, quality assurance, and production deployment.",
      id: "Aplikasi ERP web multi-cabang yang dikembangkan secara end to end untuk CV Universal Kharisma Globalindo, mencakup alur operasional, quality assurance, dan deployment ke production.",
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
    status: { en: "Live production", id: "Aktif di production" },
    liveUrl: "https://ukgsystem.com",
  },
  {
    index: "02",
    slug: "ihealth-edu",
    category: "web-app",
    title: { en: "iHealth Edu", id: "iHealth Edu" },
    role: { en: "Fullstack Developer", id: "Fullstack Developer" },
    summary: {
      en: "An integrated digital health platform for screening, education, patient records, ML risk prediction, and ESP32 health data, developed with Puskesmas Padangsari. Its prediction workflow is a decision-support prototype, not a clinical diagnosis.",
      id: "Platform kesehatan digital terintegrasi untuk screening, edukasi, rekam pasien, prediksi risiko berbasis ML, dan data kesehatan ESP32 yang dikembangkan bersama Puskesmas Padangsari. Alur prediksinya merupakan purwarupa pendukung keputusan, bukan diagnosis klinis.",
    },
    primaryTechnologies: ["Next.js", "Laravel", "MySQL", "Flask", "ESP32"],
    coverImage: "/assets/projects/ihealth-edu/cover.webp",
    coverAlt: {
      en: "iHealth Edu health education and screening interface",
      id: "Antarmuka edukasi dan screening kesehatan iHealth Edu",
    },
    coverPosition: "top",
    status: { en: "Production deployment", id: "Deploy ke production" },
  },
  {
    index: "03",
    slug: "dialisis-connect-edu",
    category: "web-app",
    title: { en: "Dialisis Connect Edu", id: "Dialisis Connect Edu" },
    role: { en: "Fullstack Developer", id: "Fullstack Developer" },
    summary: {
      en: "A dialysis education and community platform for IPDI Central Java with role-based content, YouTube video, PDF booklets, and a discussion forum. It is positioned for information and education without claims of clinical outcomes.",
      id: "Platform edukasi dan komunitas dialisis untuk IPDI Jawa Tengah dengan konten berbasis peran, video YouTube, booklet PDF, dan forum diskusi. Platform ini diposisikan untuk informasi dan edukasi tanpa klaim hasil klinis.",
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
    status: { en: "Production deployment", id: "Deploy ke production" },
  },
  {
    index: "04",
    slug: "nusa-dakwah",
    category: "web-app",
    title: { en: "Nusa Dakwah", id: "Nusa Dakwah" },
    role: { en: "Fullstack Developer", id: "Fullstack Developer" },
    summary: {
      en: "A full-stack digital dakwah platform with structured learning modules, content search, YouTube media, and a moderated discussion forum with nested replies.",
      id: "Platform dakwah digital fullstack dengan modul pembelajaran terstruktur, pencarian konten, media YouTube, serta forum diskusi termoderasi dengan nested reply.",
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
    status: { en: "Production deployment", id: "Deploy ke production" },
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
      en: "A centralized spare-parts inventory system with role-based access, automatic stock updates, transaction history, date-range reporting, and PDF export.",
      id: "Sistem inventaris suku cadang terpusat dengan akses berbasis peran, pembaruan stok otomatis, riwayat transaksi, laporan berdasarkan periode, dan ekspor PDF.",
    },
    primaryTechnologies: ["Laravel", "PHP", "MySQL", "Katalon Studio", "Docker"],
    coverImage: "/assets/projects/simastok/cover.webp",
    coverAlt: {
      en: "SIMASTOK SHR Jaya Motor inventory system sign-in screen",
      id: "Halaman masuk sistem inventaris SIMASTOK SHR Jaya Motor",
    },
    coverPosition: "center",
    status: { en: "Production deployment", id: "Deploy ke production" },
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
      en: "A binary classification prototype comparing four algorithms on 158,355 observations; the selected Random Forest reached 71.93% accuracy and 0.8015 ROC-AUC. It is served through Flask for risk prediction, not clinical diagnosis.",
      id: "Purwarupa klasifikasi biner yang membandingkan empat algoritma pada 158.355 observasi; Random Forest terpilih mencapai akurasi 71,93% dan ROC-AUC 0,8015. Model disajikan melalui Flask untuk prediksi risiko, bukan diagnosis klinis.",
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
      en: "Prototype with deployed inference service",
      id: "Purwarupa dengan layanan inferensi yang telah di-deploy",
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
      en: "An end-to-end ASR workflow that accepts audio or video, normalizes audio to mono 16 kHz, transcribes with pretrained Wav2Vec2, and generates TXT, CSV, JSON, SRT, and burned-in subtitles.",
      id: "Workflow ASR end to end yang menerima audio atau video, menormalisasi audio ke mono 16 kHz, melakukan transkripsi dengan pretrained Wav2Vec2, serta menghasilkan TXT, CSV, JSON, SRT, dan burned-in subtitle.",
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
    status: { en: "Completed", id: "Selesai" },
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
      en: "A native Kotlin Android PrintService that converts Android print jobs into ESC/POS raster data for 58 mm and 80 mm Bluetooth thermal printers. It includes printer profiles, calibration, retry handling, and cancellable background jobs.",
      id: "Android PrintService native berbasis Kotlin yang mengubah print job Android menjadi data raster ESC/POS untuk printer termal Bluetooth 58 mm dan 80 mm. Aplikasi mencakup profil printer, kalibrasi, penanganan retry, dan background job yang dapat dibatalkan.",
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
    status: { en: "Completed", id: "Selesai" },
  },
  {
    index: "09",
    slug: "footy-standings",
    category: "mobile",
    title: { en: "Footy Standings", id: "Footy Standings" },
    role: { en: "Flutter Developer", id: "Flutter Developer" },
    summary: {
      en: "A Flutter app that retrieves standings, upcoming fixtures, top scorers, and club details for six competitions through the Football Data REST API.",
      id: "Aplikasi Flutter yang mengambil data klasemen, jadwal mendatang, pencetak gol terbanyak, dan detail klub untuk enam kompetisi melalui Football Data REST API.",
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
      en: "Implementation documented",
      id: "Implementasi terdokumentasi",
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
      en: "A Unity prototype built during an internship at PT Duta Basis Dataprima, combining 78 rendered panoramas with 360 View and navigation hotspots across up to 79 scenes.",
      id: "Purwarupa Unity yang dikembangkan saat kerja praktik di PT Duta Basis Dataprima, menggabungkan 78 panorama hasil render dengan 360 View dan navigation hotspot pada struktur hingga 79 scene.",
    },
    primaryTechnologies: ["Unity", "C#", "Lumion Pro", "Physics Raycast"],
    coverImage: "/assets/projects/panoramic-virtual-tour/cover.webp",
    coverAlt: {
      en: "Panoramic Virtual Tour Unity prototype opening scene",
      id: "Scene pembuka purwarupa Unity Panoramic Virtual Tour",
    },
    coverPosition: "center",
    status: { en: "Completed prototype", id: "Purwarupa selesai" },
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
