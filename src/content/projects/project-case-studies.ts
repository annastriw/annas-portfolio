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
  readonly id: `FIG.0${1 | 2 | 3}`;
  readonly src: string;
  readonly format: ProjectEvidenceFormat;
  readonly alt: LocalizedProjectText;
  readonly caption: LocalizedProjectText;
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
  readonly overview: LocalizedProjectList;
  readonly contributions: LocalizedProjectList;
  readonly technicalNotes: LocalizedProjectList;
  readonly techStack: readonly string[];
  readonly cover: {
    readonly src: string;
    readonly alt: LocalizedProjectText;
    readonly position?: "center" | "top";
  };
  readonly evidence: readonly ProjectEvidence[];
  readonly claimBoundary?: LocalizedProjectText;
  readonly liveUrl?: string;
  readonly githubUrl?: string;
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
    categoryLabel: categoryLabels["web-app"],
    title: { en: "UKG System", id: "UKG System" },
    role: { en: "Fullstack Developer", id: "Fullstack Developer" },
    period: { en: "January - March 2026", id: "Januari - Maret 2026" },
    status: { en: "Live production", id: "Aktif di production" },
    overview: {
      en: [
        "UKG System is a multi-branch ERP web application built for CV Universal Kharisma Globalindo to centralize operational workflows.",
        "The delivered system covers access control, attendance, multi-branch inventory, stock ordering, point of sale, financial reporting, and management analytics.",
      ],
      id: [
        "UKG System adalah aplikasi ERP web multi-cabang yang dibangun untuk CV Universal Kharisma Globalindo guna memusatkan alur operasional bisnis.",
        "Sistem yang dikirim mencakup kontrol akses, presensi, inventaris multi-cabang, order stok, operasional kasir, pelaporan keuangan, dan analitik manajemen.",
      ],
    },
    contributions: {
      en: [
        "Mapped operational workflows and designed responsive interface systems in Figma.",
        "Built the Next.js and React frontend for owner and employee operational workflows.",
        "Implemented NestJS business logic and REST endpoints across all eight core operational modules.",
        "Validated critical journeys with manual and automated Katalon tests before deployment.",
        "Configured the Linux Ubuntu VPS production environment and deployed the live system.",
      ],
      id: [
        "Memetakan alur operasional dan merancang sistem antarmuka responsif di Figma.",
        "Membangun frontend Next.js dan React untuk alur kerja owner dan karyawan.",
        "Mengimplementasikan business logic NestJS dan endpoint REST pada delapan modul operasional utama.",
        "Memvalidasi alur kritis melalui pengujian manual dan otomatis dengan Katalon sebelum rilis.",
        "Mengonfigurasi environment VPS Linux Ubuntu dan melakukan deployment sistem ke production.",
      ],
    },
    technicalNotes: {
      en: [
        "Role-based access control separates owner oversight from store employee capabilities across multiple branches.",
        "Automated stock reconciliation deducts inventory upon sale and safely restores quantities on cancellation.",
        "Stock-order workflows require owner approval before incoming shipments are allocated to store-level records.",
        "Katalon Studio automated test suites validate multi-role permissions and critical checkout paths before release.",
      ],
      id: [
        "Kontrol akses berbasis peran memisahkan kapabilitas owner dan karyawan pada banyak cabang.",
        "Rekonsiliasi inventaris otomatis memotong stok saat penjualan dan mengembalikan catatan stok saat transaksi dibatalkan.",
        "Alur order stok mewajibkan persetujuan owner sebelum barang masuk dialokasikan ke catatan cabang.",
        "Automated test suite Katalon Studio memvalidasi batas peran dan alur kasir kritis sebelum rilis.",
      ],
    },
    techStack: ["Next.js", "React", "NestJS", "REST API", "Katalon Studio", "Ubuntu"],
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
        alt: { en: "UKG System interface documentation", id: "Dokumentasi antarmuka UKG System" },
        caption: { en: "Multi-branch administrative overview and analytics dashboard.", id: "Dashboard ringkasan administrasi dan analitik multi-cabang." },
      },
      {
        id: "FIG.02",
        src: "/assets/projects/ukg-system/documentation/02.webp",
        format: "wide",
        alt: { en: "UKG System workflow documentation", id: "Dokumentasi alur kerja UKG System" },
        caption: { en: "Inventory management and stock allocation view across store branches.", id: "Tampilan manajemen inventaris dan alokasi stok antar cabang toko." },
      },
      {
        id: "FIG.03",
        src: "/assets/projects/ukg-system/documentation/03.webp",
        format: "wide",
        alt: { en: "UKG System data management interface", id: "Antarmuka pengelolaan data UKG System" },
        caption: { en: "Point of sale transaction and operational record management interface.", id: "Antarmuka transaksi kasir dan pengelolaan pencatatan operasional." },
      },
    ],
    liveUrl: "https://ukgsystem.com",
  },
  {
    index: "02",
    slug: "ihealth-edu",
    category: "web-app",
    categoryLabel: categoryLabels["web-app"],
    title: { en: "iHealth Edu", id: "iHealth Edu" },
    role: { en: "Fullstack Developer", id: "Fullstack Developer" },
    status: { en: "Production deployment", id: "Deploy ke production" },
    overview: {
      en: [
        "iHealth Edu is an integrated health platform developed with Puskesmas Padangsari for patients, administrators, and health workers.",
        "It combines screening, structured education, patient records, ESP32 health data, and an ML risk-prediction workflow in one system.",
      ],
      id: [
        "iHealth Edu adalah platform kesehatan terintegrasi yang dikembangkan bersama Puskesmas Padangsari untuk pasien, administrator, dan tenaga kesehatan.",
        "Platform ini menggabungkan screening, edukasi terstruktur, rekam pasien, data kesehatan ESP32, dan alur prediksi risiko berbasis ML dalam satu sistem.",
      ],
    },
    contributions: {
      en: [
        "Designed role-specific product flows and interface concepts in Figma.",
        "Built the Next.js frontend and Laravel backend for screening, education, and patient-data workflows.",
        "Connected the Random Forest inference service through Flask and integrated ESP32 data through Laravel.",
        "Tested the application with Katalon Studio and deployed the containerized system on Ubuntu.",
      ],
      id: [
        "Merancang alur produk berbasis peran dan konsep antarmuka di Figma.",
        "Membangun frontend Next.js dan backend Laravel untuk alur screening, edukasi, dan data pasien.",
        "Menghubungkan layanan inferensi Random Forest melalui Flask serta mengintegrasikan data ESP32 melalui Laravel.",
        "Menguji aplikasi dengan Katalon Studio dan melakukan deployment sistem berbasis container di Ubuntu.",
      ],
    },
    technicalNotes: {
      en: [
        "Three roles separate patient, administrator, and health-worker responsibilities.",
        "Screening workflows cover validated DSMQ, HSMBQ, and DASS-21 instruments.",
        "Education paths for hypertension, diabetes, and mental health use pre-test, module, and post-test stages.",
        "ESP32 measurements pass through Laravel before being stored in MySQL.",
      ],
      id: [
        "Tiga peran memisahkan tanggung jawab pasien, administrator, dan tenaga kesehatan.",
        "Alur screening mencakup instrumen kuesioner terstandar DSMQ, HSMBQ, dan DASS-21.",
        "Jalur edukasi hipertensi, diabetes, dan kesehatan mental menggunakan tahap pre-test, modul, dan post-test.",
        "Pengukuran ESP32 melewati Laravel sebelum disimpan di MySQL.",
      ],
    },
    techStack: ["Next.js", "Laravel", "MySQL", "Random Forest", "Flask", "ESP32", "Docker"],
    cover: {
      src: "/assets/projects/ihealth-edu/cover.webp",
      alt: { en: "iHealth Edu health education interface", id: "Antarmuka edukasi kesehatan iHealth Edu" },
      position: "top",
    },
    evidence: [
      {
        id: "FIG.01",
        src: "/assets/projects/ihealth-edu/documentation/01.webp",
        format: "wide",
        alt: { en: "iHealth Edu platform documentation", id: "Dokumentasi platform iHealth Edu" },
        caption: { en: "Patient dashboard with health metrics, screening history, and educational modules.", id: "Dashboard pasien dengan metrik kesehatan, riwayat screening, dan modul edukasi." },
      },
      {
        id: "FIG.02",
        src: "/assets/projects/ihealth-edu/documentation/02.webp",
        format: "wide",
        alt: { en: "iHealth Edu education workflow", id: "Alur edukasi iHealth Edu" },
        caption: { en: "Structured health screening and assessment workflow interface.", id: "Antarmuka alur screening dan asesmen kesehatan terstruktur." },
      },
    ],
    claimBoundary: {
      en: "The ML feature is a risk-prediction and decision-support prototype, not a clinical diagnosis.",
      id: "Fitur ML merupakan purwarupa prediksi risiko dan pendukung keputusan, bukan diagnosis klinis.",
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
