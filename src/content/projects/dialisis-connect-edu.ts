import type { ProjectItem } from "./types";

export const dialisisConnectEduProject: ProjectItem = {
  slug: "dialisis-connect-edu",
  category: "web-app",
  order: 3,
  featured: true,
  title: {
    en: "Dialisis Connect Edu",
    id: "Dialisis Connect Edu",
  },
  subtitle: {
    en: "Clinical Dialysis Training & Professional Event Platform",
    id: "Platform Pelatihan Dialisis Klinis & Manajemen Acara Profesi",
  },
  projectType: {
    en: "Web Application / Healthcare Education & Event Portal",
    id: "Aplikasi Web / Portal Manajemen Seminar & Edukasi Medis",
  },
  role: {
    en: "Full-Stack Web Developer",
    id: "Full-Stack Web Developer",
  },
  stakeholder: {
    en: "IPDI (Ikatan Perawat Dialisis Indonesia) Jawa Tengah",
    id: "IPDI (Ikatan Perawat Dialisis Indonesia) Jawa Tengah",
  },
  period: {
    en: "2024",
    id: "2024",
  },
  status: {
    en: "Production Deployed",
    id: "Telah Diterapkan di Produksi",
  },
  summary: {
    en: "A comprehensive digital platform built for IPDI Central Java to manage dialysis training workshops, participant certifications, clinical material dissemination, and professional community engagement.",
    id: "Platform digital komprehensif untuk IPDI Jawa Tengah guna mengelola seminar pelatihan dialisis, sertifikasi peserta, distribusi materi klinis, dan integrasi komunitas perawat dialisis.",
  },
  problemStatement: {
    en: "Managing regional healthcare seminars, manual participant validation, certificate distribution, and material sharing required excessive administrative time and lacked a unified digital portal.",
    id: "Pengelolaan seminar kesehatan daerah, verifikasi manual peserta, penerbitan sertifikat, dan distribusi materi membutuhkan waktu administratif tinggi tanpa adanya portal digital terintegrasi.",
  },
  systemSolution: {
    en: "Engineered a production web application with multi-role access (participants, committee, administrators), automated registration workflows, digital certificate generation, and secure material distribution.",
    id: "Membangun aplikasi web produksi dengan hak akses multi-peran (peserta, panitia, admin), alur registrasi otomatis, penerbitan e-sertifikat, dan distribusi materi seminar yang aman.",
  },
  personalContributions: {
    en: [
      "Engineered end-to-end event registration and participant verification pipeline.",
      "Designed responsive UI/UX tailored for clinical practitioners and seminar attendees.",
      "Developed automated PDF certificate generation with authentic participant credential verification.",
      "Deployed and configured production environment on live domain ipdijateng.org.",
    ],
    id: [
      "Mengembangkan alur pendaftaran kegiatan dan verifikasi peserta secara menyeluruh.",
      "Merancang antarmuka UI/UX responsif yang intuitif bagi praktisi medis dan peserta seminar.",
      "Membangun modul penerbitan e-sertifikat PDF otomatis dengan verifikasi kredensial peserta.",
      "Melakukan deployment dan konfigurasi server produksi pada domain ipdijateng.org.",
    ],
  },
  verifiedEvidence: {
    en: [
      "Successfully deployed and actively operational on official domain ipdijateng.org.",
      "Supported real dialysis seminar events with digital participant registrations and downloads.",
      "Implemented strict healthcare education scope boundary notice.",
    ],
    id: [
      "Telah berhasil dideploy dan beroperasi secara aktif pada domain resmi ipdijateng.org.",
      "Mendukung kegiatan seminar dialisis nyata dengan registrasi digital dan unduh materi.",
      "Mencantumkan batasan informasi edukasi kesehatan secara jelas.",
    ],
  },
  claimLimitation: {
    en: "Dialisis Connect Edu serves as a medical training and administrative event portal. It is NOT a clinical diagnostic tool and does not provide direct patient therapy.",
    id: "Dialisis Connect Edu berfungsi sebagai portal pelatihan medis dan administrasi kegiatan. Sistem ini BUKAN alat diagnosis klinis dan tidak menyediakan terapi medis langsung kepada pasien.",
  },
  liveUrl: "https://ipdijateng.org",
  techStack: {
    core: ["Laravel", "PHP", "MySQL", "JavaScript", "Bootstrap 5", "CSS3"],
    architecture: ["MVC Pattern", "Role-Based Access Control (RBAC)", "REST API"],
    qaOrDeployment: ["Ubuntu VPS Deployment", "Automated PDF Engine", "SSL / Security Hardening"],
  },
  coverImage: "/assets/projects/dialisis-connect-edu/cover.webp",
  documentationImages: [
    "/assets/projects/dialisis-connect-edu/documentation/01.webp",
    "/assets/projects/dialisis-connect-edu/documentation/02.webp",
    "/assets/projects/dialisis-connect-edu/documentation/03.webp",
    "/assets/projects/dialisis-connect-edu/documentation/04.webp",
    "/assets/projects/dialisis-connect-edu/documentation/05.webp",
    "/assets/projects/dialisis-connect-edu/documentation/06.webp",
    "/assets/projects/dialisis-connect-edu/documentation/07.webp",
  ],
};
