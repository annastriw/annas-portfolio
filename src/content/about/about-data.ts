import type { Locale } from "@/lib/i18n/config";

export interface ProfileMetadata {
  role: Record<Locale, string>;
  education: Record<Locale, string>;
  gpa: string;
  status: Record<Locale, string>;
  location: Record<Locale, string>;
}

export interface ProfileData {
  tag: string;
  subtag: Record<Locale, string>;
  name: string;
  headline: Record<Locale, string>;
  lead: Record<Locale, string>;
  paragraphs: Record<Locale, string[]>;
  portrait: {
    assetPath: string;
    alt: Record<Locale, string>;
    figureLabel: string;
    caption: Record<Locale, string>;
  };
  metadata: ProfileMetadata;
}

export interface EducationData {
  tag: string;
  subtag: Record<Locale, string>;
  title: Record<Locale, string>;
  institution: Record<Locale, string>;
  degree: Record<Locale, string>;
  fieldOfStudy: Record<Locale, string>;
  period: Record<Locale, string>;
  gpa: string;
  positioning: Record<Locale, string>;
  location: Record<Locale, string>;
  summary: Record<Locale, string>;
  certificateAsset: string;
  figureLabel: Record<Locale, string>;
  documentCaption: Record<Locale, string>;
  inspectLabel: Record<Locale, string>;
}

export interface CertificateData {
  id: string;
  title: Record<Locale, string>;
  issuer: string;
  category: "cisco-systems" | "ai-databases";
  assetPath: string;
  badge: string;
}

export const profileData: ProfileData = {
  tag: "[02 // ABOUT]",
  subtag: {
    en: "TECHNICAL EDITORIAL ARCHIVE",
    id: "ARSIP TEKNIS & REKAYASA",
  },
  name: "Annas Tri Widagdo",
  headline: {
    en: "Software Engineer · Full-Stack Developer · ML Engineer",
    id: "Software Engineer · Full-Stack Developer · ML Engineer",
  },
  lead: {
    en: "Computer Engineering graduate from Diponegoro University building robust full-stack web applications and applied machine learning systems.",
    id: "Lulusan Teknik Komputer Universitas Diponegoro yang mengembangkan aplikasi web full-stack yang andal dan sistem machine learning terapan.",
  },
  paragraphs: {
    en: [
      "I am a Computer Engineering graduate from Diponegoro University (GPA 3.79 / 4.00) specializing in full-stack software development and applied machine learning. My engineering background focuses on building scalable web architectures, production-grade backend services, and practical ML pipelines that solve operational problems.",
      "My approach emphasizes clean code structure, predictable system workflows, and thorough testing. From responsive user interfaces to backend API design and hardware printing integrations, I deliver dependable digital solutions engineered for long-term maintainability.",
    ],
    id: [
      "Saya lulusan Teknik Komputer dari Universitas Diponegoro (IPK 3.79 / 4.00) yang berfokus pada software engineering, full-stack web development, dan machine learning terapan. Latar belakang rekayasa saya berfokus pada pembangunan arsitektur web yang scalable, layanan backend yang tangguh, serta pipeline ML praktis untuk kebutuhan operasional nyata.",
      "Pendekatan rekayasa saya mengutamakan struktur kode yang bersih, alur workflow yang jelas, serta pengujian sistem yang menyeluruh. Mulai dari antarmuka pengguna responsif, perancangan API backend, hingga integrasi hardware thermal printer, saya menghasilkan solusi digital yang andal dan mudah dirawat.",
    ],
  },
  portrait: {
    assetPath: "/assets/profile/pas-foto.webp",
    alt: {
      en: "Annas Tri Widagdo · Software Engineer, Full-Stack Developer & ML Engineer",
      id: "Annas Tri Widagdo · Software Engineer, Full-Stack Developer & ML Engineer",
    },
    figureLabel: "FIG.01 // PORTRAIT RECORD",
    caption: {
      en: "ANNAS TRI WIDAGDO, S.T. · KLATEN, ID",
      id: "ANNAS TRI WIDAGDO, S.T. · KLATEN, ID",
    },
  },
  metadata: {
    role: {
      en: "Software Engineer · Full-Stack Developer · ML Engineer",
      id: "Software Engineer · Full-Stack Developer · ML Engineer",
    },
    education: {
      en: "Computer Engineering · Diponegoro University",
      id: "Teknik Komputer · Universitas Diponegoro",
    },
    gpa: "3.79 / 4.00",
    status: {
      en: "Fresh Graduate",
      id: "Lulusan Baru",
    },
    location: {
      en: "Klaten, Central Java, Indonesia",
      id: "Klaten, Jawa Tengah, Indonesia",
    },
  },
};

export const educationData: EducationData = {
  tag: "[01 // EDUCATION]",
  subtag: {
    en: "ACADEMIC FOUNDATION",
    id: "LATAR BELAKANG AKADEMIK",
  },
  title: {
    en: "Education",
    id: "Pendidikan",
  },
  institution: {
    en: "Diponegoro University",
    id: "Universitas Diponegoro",
  },
  degree: {
    en: "Bachelor of Engineering (S.T.)",
    id: "Sarjana Teknik (S.T.)",
  },
  fieldOfStudy: {
    en: "Computer Engineering",
    id: "Teknik Komputer",
  },
  period: {
    en: "August 2022 - July 2026",
    id: "Agustus 2022 - Juli 2026",
  },
  gpa: "3.79 / 4.00",
  positioning: {
    en: "Fresh Graduate",
    id: "Lulusan Baru",
  },
  location: {
    en: "Semarang, Central Java, Indonesia",
    id: "Semarang, Jawa Tengah, Indonesia",
  },
  summary: {
    en: "Completed undergraduate degree in Computer Engineering with academic focus on software engineering, computer networks, distributed systems, and applied machine learning.",
    id: "Menyelesaikan pendidikan Sarjana Teknik Komputer dengan fokus akademik pada rekayasa perangkat lunak, jaringan komputer, sistem terdistribusi, dan machine learning terapan.",
  },
  certificateAsset: "/assets/certificates/bachelor-certificate.webp",
  figureLabel: {
    en: "FIG.01 // BACHELOR CERTIFICATE",
    id: "FIG.01 // IJAZAH SARJANA TEKNIK",
  },
  documentCaption: {
    en: "Diponegoro University · Faculty of Engineering · Computer Engineering · 2026",
    id: "Universitas Diponegoro · Fakultas Teknik · Teknik Komputer · 2026",
  },
  inspectLabel: {
    en: "Inspect Document",
    id: "Lihat Dokumen",
  },
};

export const certificatesData: CertificateData[] = [
  {
    id: "ccna-enterprise",
    title: {
      en: "CCNA: Enterprise Networking, Security, and Automation",
      id: "CCNA: Enterprise Networking, Security, and Automation",
    },
    issuer: "Cisco Networking Academy",
    category: "cisco-systems",
    assetPath: "/assets/certificates/ccna-enterprise-networking-security-and-automation.webp",
    badge: "CISCO VERIFIED",
  },
  {
    id: "ccnav7-switching-routing",
    title: {
      en: "CCNAv7: Switching, Routing, and Wireless Essentials",
      id: "CCNAv7: Switching, Routing, and Wireless Essentials",
    },
    issuer: "Cisco Networking Academy",
    category: "cisco-systems",
    assetPath: "/assets/certificates/ccnav7-switching-routing-and-wireless-essentials.webp",
    badge: "CISCO VERIFIED",
  },
  {
    id: "ccnav7-intro-networks",
    title: {
      en: "CCNAv7: Introduction to Networks",
      id: "CCNAv7: Introduction to Networks",
    },
    issuer: "Cisco Networking Academy",
    category: "cisco-systems",
    assetPath: "/assets/certificates/ccnav7-introduction-to-networks.webp",
    badge: "CISCO VERIFIED",
  },
  {
    id: "hcia-ai",
    title: {
      en: "HCIA-AI V3.5 (Huawei Certified ICT Associate - Artificial Intelligence)",
      id: "HCIA-AI V3.5 (Huawei Certified ICT Associate - Artificial Intelligence)",
    },
    issuer: "Huawei Technologies Co., Ltd.",
    category: "ai-databases",
    assetPath: "/assets/certificates/hcia-ai-v3-5.webp",
    badge: "HUAWEI CERTIFIED",
  },
  {
    id: "database-design",
    title: {
      en: "Database Design",
      id: "Database Design",
    },
    issuer: "Oracle Academy",
    category: "ai-databases",
    assetPath: "/assets/certificates/database-design.webp",
    badge: "ORACLE ACADEMY",
  },
  {
    id: "database-foundations",
    title: {
      en: "Database Foundations",
      id: "Database Foundations",
    },
    issuer: "Oracle Academy",
    category: "ai-databases",
    assetPath: "/assets/certificates/database-foundations.webp",
    badge: "ORACLE ACADEMY",
  },
  {
    id: "it-essentials",
    title: {
      en: "IT Essentials: PC Hardware and Software",
      id: "IT Essentials: PC Hardware and Software",
    },
    issuer: "Cisco Networking Academy",
    category: "cisco-systems",
    assetPath: "/assets/certificates/it-essentials-pc-hardware-and-software.webp",
    badge: "CISCO VERIFIED",
  },
  {
    id: "iot-digital-transformation",
    title: {
      en: "Introduction to IoT and Digital Transformation",
      id: "Introduction to IoT and Digital Transformation",
    },
    issuer: "Cisco Networking Academy",
    category: "cisco-systems",
    assetPath: "/assets/certificates/introduction-to-iot-and-digital-transformation.webp",
    badge: "CISCO VERIFIED",
  },
];
