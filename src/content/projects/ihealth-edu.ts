import type { ProjectItem } from "./types";

export const ihealthEduProject: ProjectItem = {
  slug: "ihealth-edu",
  category: "web-app",
  order: 2,
  featured: true,
  title: {
    en: "iHealth Edu",
    id: "iHealth Edu",
  },
  subtitle: {
    en: "Preventative Healthcare Education & Risk Inference Prototype",
    id: "Platform Edukasi Kesehatan Preventif & Purwarupa Inferensi Risiko",
  },
  projectType: {
    en: "Web Application / Health Education",
    id: "Aplikasi Web / Edukasi Kesehatan",
  },
  role: {
    en: "Full-Stack Developer & ML Integrator",
    id: "Full-Stack Developer & Integrator ML",
  },
  stakeholder: {
    en: "Community Health Education Initiative",
    id: "Inisiatif Edukasi Kesehatan Masyarakat",
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
    en: "An interactive health education platform combining responsive health literacy modules with machine learning risk inference prototypes for preventative lifestyle assessment.",
    id: "Platform edukasi kesehatan interaktif yang menggabungkan modul literasi kesehatan responsif dengan purwarupa inferensi risiko berbasis machine learning untuk evaluasi gaya hidup preventif.",
  },
  problemStatement: {
    en: "Public health awareness often suffers from dry, fragmented information without actionable, interactive self-assessment guidance for everyday health risks.",
    id: "Literasi kesehatan masyarakat sering terhambat oleh informasi statis yang kurang interaktif tanpa panduan penilaian mandiri risiko kesehatan sehari-hari.",
  },
  systemSolution: {
    en: "Developed a modern, accessible web portal featuring interactive questionnaires, visual risk category indicators, structured preventative articles, and educational health tips.",
    id: "Membangun portal web modern dan aksesibel dengan kuesioner interaktif, indikator visual kategori risiko, artikel edukasi terstruktur, dan rekomendasi preventif.",
  },
  personalContributions: {
    en: [
      "Engineered frontend user experience and interactive risk questionnaire forms with instant validation.",
      "Integrated machine learning inference logic for cardiovascular health risk scoring.",
      "Implemented bilingual health literacy content and responsive layout structure.",
    ],
    id: [
      "Mengembangkan antarmuka pengguna interaktif dan formulir penilaian risiko kesehatan dengan validasi instan.",
      "Mengintegrasikan logika inferensi machine learning untuk skoring estimasi risiko kardiovaskular.",
      "Menyusun struktur konten edukasi kesehatan dwibahasa dengan tata letak responsif.",
    ],
  },
  verifiedEvidence: {
    en: [
      "Delivered complete educational portal with working health assessment questionnaires.",
      "Verified client-side accessibility and responsive layout rendering across mobile and desktop viewports.",
      "Implemented strict claim notice stating educational and preventative scope.",
    ],
    id: [
      "Menyelesaikan portal edukasi lengkap dengan kuesioner penilaian kesehatan interaktif.",
      "Memverifikasi aksesibilitas dan performa responsif pada tampilan mobile maupun desktop.",
      "Mencantumkan batasan klaim edukatif dan preventif secara eksplisit pada sistem.",
    ],
  },
  claimLimitation: {
    en: "The risk assessment and health guidelines in iHealth Edu are intended purely for educational and lifestyle awareness. They do NOT constitute certified medical diagnosis or clinical prescriptions.",
    id: "Penilaian risiko dan panduan kesehatan pada iHealth Edu ditujukan murni sebagai edukasi gaya hidup preventif. Sistem ini BUKAN alat diagnosis medis bersertifikasi atau resep klinis.",
  },
  techStack: {
    core: ["Laravel", "PHP", "JavaScript", "Tailwind CSS", "MySQL"],
    architecture: ["Responsive SPA/MPA hybrid", "REST API", "MVC Architecture"],
    qaOrDeployment: ["Component Isolation", "Form Sanitization", "Git Workflow"],
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
};
