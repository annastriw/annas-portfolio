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

export const projectArchiveCopy = {
  sectionIndex: { en: "[03 // PROJECTS]", id: "[03 // PROYEK]" },
  title: { en: "Projects Archive", id: "Arsip Proyek" },
  lead: {
    en: "Explore my work across web applications, machine learning, mobile development, and interactive media.",
    id: "Jelajahi project yang saya kerjakan dalam pengembangan aplikasi web, machine learning, mobile, dan media interaktif.",
  },
  projectCountLabel: { en: "Projects", id: "Proyek" },
  categoryCountLabel: { en: "Categories", id: "Kategori" },
  disciplineCountLabel: { en: "Categories", id: "Kategori" },
  filterHeading: { en: "Project Categories", id: "Kategori Proyek" },
  cta: { en: "Explore Project", id: "Jelajahi Proyek" },
} as const;

export const projectArchive: readonly ProjectArchiveItem[] = [
  {
    index: "01",
    slug: "ukg-system",
    category: "web-app",
    title: { en: "UKG System", id: "UKG System" },
    role: {
      en: "Full-Stack Web Developer",
      id: "Full-Stack Web Developer",
    },
    summary: {
      en: "A multi-branch ERP that centralizes inventory, sales, and daily operations in one production system.",
      id: "ERP multi-cabang yang memusatkan stok, penjualan, dan operasional harian dalam satu sistem production.",
    },
    primaryTechnologies: [
      "Figma",
      "Next.js",
      "NestJS",
      "MySQL",
      "Katalon Studio",
      "Linux Ubuntu",
    ],
    coverImage: "/assets/projects/ukg-system/cover.webp",
    coverAlt: {
      en: "UKG System multi-branch ERP administration dashboard",
      id: "Dashboard administrasi ERP multi-cabang UKG System",
    },
    coverPosition: "top",
    status: { en: "Live Production", id: "Live Production" },
  },
  {
    index: "02",
    slug: "ihealth-edu",
    category: "web-app",
    title: { en: "iHealth Edu", id: "iHealth Edu" },
    role: {
      en: "Frontend Web Developer",
      id: "Frontend Web Developer",
    },
    summary: {
      en: "A digital health platform for structured screening, patient records, health education, IoT data, and machine learning decision support.",
      id: "Platform kesehatan digital untuk screening terstruktur, data pasien, edukasi kesehatan, data IoT, dan machine learning decision support.",
    },
    primaryTechnologies: [
      "Figma",
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "REST API",
    ],
    coverImage: "/assets/projects/ihealth-edu/cover.webp",
    coverAlt: {
      en: "iHealth Edu health education and screening interface",
      id: "Antarmuka edukasi dan screening kesehatan iHealth Edu",
    },
    coverPosition: "top",
    status: { en: "Live Production", id: "Live Production" },
  },
  {
    index: "03",
    slug: "dialisis-connect-edu",
    category: "web-app",
    title: { en: "Dialisis Connect Edu", id: "Dialisis Connect Edu" },
    role: {
      en: "Frontend Web Developer",
      id: "Frontend Web Developer",
    },
    summary: {
      en: "A kidney health education and community platform developed with IPDI Central Java, providing learning resources, video guides, digital booklets, and discussion forums.",
      id: "Platform edukasi dan komunitas kesehatan ginjal yang dikembangkan bersama IPDI Jawa Tengah, menyediakan materi pembelajaran, panduan video, booklet digital, dan forum diskusi.",
    },
    primaryTechnologies: [
      "Figma",
      "Next.js",
      "React",
      "REST API",
      "Katalon Studio",
      "Docker",
    ],
    coverImage: "/assets/projects/dialisis-connect-edu/cover.webp",
    coverAlt: {
      en: "Dialisis Connect Edu education platform landing page",
      id: "Halaman awal platform edukasi Dialisis Connect Edu",
    },
    coverPosition: "top",
    status: { en: "Live Production", id: "Live Production" },
  },
  {
    index: "04",
    slug: "nusa-dakwah",
    category: "web-app",
    title: { en: "Nusa Dakwah", id: "Nusa Dakwah" },
    role: {
      en: "Full-Stack Web Developer",
      id: "Full-Stack Web Developer",
    },
    summary: {
      en: "A digital Islamic learning platform with structured modules, articles, YouTube videos, and moderated community discussions.",
      id: "Platform pembelajaran dan dakwah digital dengan modul terstruktur, artikel, video YouTube, dan diskusi komunitas yang dimoderasi.",
    },
    primaryTechnologies: [
      "Figma",
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
    status: { en: "Live Production", id: "Live Production" },
  },
  {
    index: "05",
    slug: "simastok",
    category: "web-app",
    title: {
      en: "SIMASTOK SHR Jaya Motor",
      id: "SIMASTOK SHR Jaya Motor",
    },
    role: {
      en: "Full-Stack Web Developer",
      id: "Full-Stack Web Developer",
    },
    summary: {
      en: "An inventory system used by SHR Jaya Motor to replace handwritten stock records with centralized stock tracking, transaction history, and reporting.",
      id: "Sistem inventory yang digunakan SHR Jaya Motor untuk menggantikan pencatatan manual dengan pemantauan stok, riwayat transaksi, dan laporan yang terpusat.",
    },
    primaryTechnologies: ["Laravel", "PHP", "MySQL", "Katalon Studio", "Docker"],
    coverImage: "/assets/projects/simastok/cover.webp",
    coverAlt: {
      en: "SIMASTOK SHR Jaya Motor inventory system sign-in screen",
      id: "Halaman masuk sistem inventaris SIMASTOK SHR Jaya Motor",
    },
    coverPosition: "center",
    status: { en: "Live Production", id: "Live Production" },
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
      en: "Machine Learning Engineer",
      id: "Machine Learning Engineer",
    },
    summary: {
      en: "A machine learning prototype for exploring heart attack risk prediction, with model inference served through a Flask API. Built for experimentation, not medical diagnosis.",
      id: "Prototype machine learning untuk mengeksplorasi prediksi risiko serangan jantung, dengan inference model melalui Flask API. Dikembangkan untuk eksperimen, bukan diagnosis medis.",
    },
    primaryTechnologies: [
      "Python",
      "Scikit-learn",
      "Pandas",
      "SMOTE",
      "Flask",
      "Docker",
    ],
    coverImage:
      "/assets/projects/ml-for-heart-attack-risk-prediction/cover.webp",
    coverAlt: {
      en: "Structured patient input used by the heart attack risk prediction prototype",
      id: "Input pasien terstruktur untuk prototype prediksi risiko serangan jantung",
    },
    coverPosition: "top",
    status: {
      en: "Completed Prototype",
      id: "Completed Prototype",
    },
  },
  {
    index: "07",
    slug: "speech-to-text-system",
    category: "ml",
    title: { en: "Speech-to-Text System", id: "Speech-to-Text System" },
    role: {
      en: "Machine Learning Engineer",
      id: "Machine Learning Engineer",
    },
    summary: {
      en: "An English speech-to-text prototype that processes audio and video with pretrained Wav2Vec2, then exports transcripts, SRT subtitles, and video with burned-in captions.",
      id: "Prototype speech-to-text bahasa Inggris yang memproses audio dan video menggunakan pretrained Wav2Vec2, lalu menghasilkan transkrip, subtitle SRT, dan video dengan subtitle tertanam.",
    },
    primaryTechnologies: [
      "Python",
      "Wav2Vec2",
      "Hugging Face Transformers",
      "Librosa",
      "FFmpeg",
      "Google Colab",
    ],
    coverImage: "/assets/projects/speech-to-text-system/cover.webp",
    coverAlt: {
      en: "Side-by-side comparison showing the video sample before subtitles and the final video with burned-in English subtitles",
      id: "Perbandingan berdampingan menampilkan sampel video sebelum subtitle dan video akhir dengan subtitle bahasa Inggris tertanam",
    },
    coverPosition: "center",
    status: {
      en: "Completed Prototype",
      id: "Completed Prototype",
    },
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
      en: "A native Kotlin Android PrintService that converts Android print jobs into monochrome ESC/POS output and sends them to configured Bluetooth thermal printers.",
      id: "Android PrintService native berbasis Kotlin yang mengubah print job Android menjadi output ESC/POS monokrom dan mengirimkannya ke thermal printer Bluetooth yang telah dikonfigurasi.",
    },
    primaryTechnologies: [
      "Kotlin",
      "Android SDK",
      "Android Print Framework",
      "Bluetooth",
      "ESC/POS",
      "Gradle",
    ],
    coverImage: "/assets/projects/thermal-printer-service/cover.webp",
    coverAlt: {
      en: "Thermal Printer Service Android application icon",
      id: "Ikon aplikasi Android Thermal Printer Service",
    },
    coverPosition: "center",
    status: { en: "Completed Application", id: "Completed Application" },
  },
  {
    index: "09",
    slug: "footy-standings",
    category: "mobile",
    title: { en: "Footy Standings", id: "Footy Standings" },
    role: { en: "Flutter Developer", id: "Flutter Developer" },
    summary: {
      en: "A Flutter application for following football league standings, match schedules, top scorers, and club profiles through a football data API.",
      id: "Aplikasi Flutter untuk mengikuti klasemen liga sepak bola, jadwal pertandingan, top scorer, dan profil klub melalui API data sepak bola.",
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
      en: "Completed Application",
      id: "Completed Application",
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
      en: "A Unity-based virtual tour developed during an internship at PT Duta Basis Dataprima, combining architectural panoramas with hotspot navigation.",
      id: "Virtual tour berbasis Unity yang dikembangkan saat magang di PT Duta Basis Dataprima, menggabungkan panorama arsitektur dengan navigasi hotspot.",
    },
    primaryTechnologies: [
      "Unity",
      "C#",
      "Lumion Pro",
      "360° Panorama",
      "Physics Raycast",
      "Scene Management",
    ],
    coverImage: "/assets/projects/panoramic-virtual-tour/cover.webp",
    coverAlt: {
      en: "Panoramic Virtual Tour Unity prototype opening scene",
      id: "Scene pembuka purwarupa Unity Panoramic Virtual Tour",
    },
    coverPosition: "center",
    status: { en: "Completed Prototype", id: "Completed Prototype" },
  },
] as const;

export const PROJECT_ARCHIVE_TOTAL_COUNT = projectArchive.length;
export const PROJECT_ARCHIVE_CATEGORY_COUNT = projectArchiveCategories.filter(
  (category) => category.key !== "all",
).length;
export const PROJECT_ARCHIVE_DISCIPLINE_COUNT = PROJECT_ARCHIVE_CATEGORY_COUNT;

export function getProjectArchiveCategoryCounts(
  projects: readonly ProjectArchiveItem[] = projectArchive,
): Record<ProjectArchiveFilter, number> {
  return {
    all: projects.length,
    "web-app": projects.filter((p) => p.category === "web-app").length,
    ml: projects.filter((p) => p.category === "ml").length,
    mobile: projects.filter((p) => p.category === "mobile").length,
    other: projects.filter((p) => p.category === "other").length,
  };
}

export function filterProjectArchive(
  projects: readonly ProjectArchiveItem[],
  category: ProjectArchiveFilter,
): ProjectArchiveItem[] {
  if (category === "all") {
    return [...projects];
  }

  return projects.filter((project) => project.category === category);
}
