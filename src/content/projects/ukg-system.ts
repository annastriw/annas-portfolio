import type { ProjectItem } from "./types";

export const ukgSystemProject: ProjectItem = {
  slug: "ukg-system",
  category: "web-app",
  order: 1,
  featured: true,
  title: {
    en: "UKG System",
    id: "UKG System",
  },
  subtitle: {
    en: "Teacher Competency Examination & Assessment Engine",
    id: "Sistem Uji Kompetensi Guru & Manajemen Evaluasi",
  },
  projectType: {
    en: "Web Application / Examination Engine",
    id: "Aplikasi Web / Sistem Uji Kompetensi",
  },
  role: {
    en: "Full-Stack Web Developer",
    id: "Full-Stack Web Developer",
  },
  stakeholder: {
    en: "Educational Assessment Stakeholder",
    id: "Mitra Evaluasi Pendidikan",
  },
  period: {
    en: "2024",
    id: "2024",
  },
  status: {
    en: "Completed",
    id: "Selesai",
  },
  summary: {
    en: "A specialized web-based examination and competency assessment platform designed to deliver timed tests, prevent test manipulation, and automatically generate verified grade certificates.",
    id: "Platform ujian dan penilaian kompetensi berbasis web yang dirancang untuk menyelenggarakan tes berbatas waktu, mencegah manipulasi ujian, dan menerbitkan transkrip nilai terverifikasi.",
  },
  problemStatement: {
    en: "Manual paper-based competency evaluations caused grading delays, error-prone score tabulations, and logistical overhead across regional test locations.",
    id: "Evaluasi kompetensi berbasis kertas menimbulkan keterlambatan rekapitulasi, kerentanan kesalahan skor manual, dan inefisiensi logistik pada pelaksanaan massal.",
  },
  systemSolution: {
    en: "Engineered a secure exam execution environment featuring client-side countdown synchronization, real-time autosave mechanisms, randomized question banks, and automated server-side score calculation.",
    id: "Membangun lingkungan ujian berbasis web dengan sinkronisasi waktu, penyimpanan otomatis progres jawaban, pengacakan soal, dan kalkulasi nilai otomatis di sisi server.",
  },
  personalContributions: {
    en: [
      "Architected the complete database schema with relational question banks, participant attempts, and grading metrics.",
      "Engineered the responsive examination interface with client-side state persistence and timeout listeners.",
      "Implemented role-based administrative dashboards for question authoring, participant monitoring, and PDF certificate export.",
    ],
    id: [
      "Merancang skema basis data relasional untuk bank soal, sesi ujian peserta, dan metrik penilaian.",
      "Mengembangkan antarmuka ujian responsif dengan autosave jawaban dan penanganan otomatis batas waktu.",
      "Membangun dasbor administrator untuk pembuatan soal, pemantauan status peserta, dan ekspor laporan PDF.",
    ],
  },
  verifiedEvidence: {
    en: [
      "Delivered complete examination engine supporting randomized multiple-choice questionnaires and instant score generation.",
      "Verified client-side countdown state integrity with persistent local checkpoints.",
      "Implemented dynamic PDF report generation with authentic institutional metadata formatting.",
    ],
    id: [
      "Mengirimkan sistem ujian lengkap dengan pengacakan soal pilihan ganda dan kalkulasi nilai otomatis instan.",
      "Memvalidasi integritas penghitung waktu dengan checkpoint penyimpanan progres lokal.",
      "Mengimplementasikan ekspor laporan nilai PDF dengan tata letak institusional.",
    ],
  },
  techStack: {
    core: ["Laravel", "PHP", "MySQL", "JavaScript", "Bootstrap / CSS3"],
    architecture: ["MVC Pattern", "Role-Based Access Control (RBAC)", "RESTful API"],
    qaOrDeployment: ["Automated PDF Engine", "Form Request Validation", "Git Workflow"],
  },
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
};
