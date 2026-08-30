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

export interface ThesisData {
  label: Record<Locale, string>;
  title: Record<Locale, string>;
}

export interface BachelorCertificateData {
  title: string;
  assetPath: string;
  year: string;
  badge: Record<Locale, string>;
  figureLabel: string;
  caption: Record<Locale, string>;
  alt: Record<Locale, string>;
  inspectLabel: Record<Locale, string>;
  closeLabel: Record<Locale, string>;
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
  status: Record<Locale, string>;
  summary: Record<Locale, string>;
  thesis: ThesisData;
  bachelorCertificate: BachelorCertificateData;
  // Compatibility fields for existing pre-redesign components
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

export interface CredentialFilter {
  key: "all" | "cisco-systems" | "ai-databases";
  label: Record<Locale, string>;
  count: number;
}

export interface CredentialSectionCopy {
  tag: string;
  subtag: Record<Locale, string>;
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
  accessibility: {
    filterLabel: Record<Locale, string>;
    inspectLabel: Record<Locale, string>;
    closeLabel: Record<Locale, string>;
    closeBachelorLabel: Record<Locale, string>;
  };
}

export const profileData: ProfileData = {
  tag: "[01 // ABOUT]",
  subtag: {
    en: "TECHNICAL EDITORIAL ARCHIVE",
    id: "ARSIP TEKNIS & REKAYASA",
  },
  name: "Annas Tri Widagdo",
  headline: {
    en: "Software Engineer · Full-Stack Web Developer · Machine Learning Engineer",
    id: "Software Engineer · Full-Stack Web Developer · Machine Learning Engineer",
  },
  lead: {
    en: "A Computer Engineering graduate with hands-on experience in software engineering, full-stack web development, and machine learning, focused on turning real problems into reliable and useful products.",
    id: "Lulusan Teknik Komputer dengan pengalaman langsung dalam software engineering, full-stack web development, dan machine learning, dengan fokus mengubah permasalahan nyata menjadi produk yang andal dan bermanfaat.",
  },
  paragraphs: {
    en: [
      "My background in Computer Engineering shaped the way I see software as a complete system rather than a collection of separate features. Through academic work, internships, and project experience, I developed practical experience across software engineering, full-stack web development, and machine learning.",
      "I start by understanding the problem, then connect interfaces, backend systems, data flows, and machine learning models into a structured product. I care about the result as much as the implementation: software should work reliably, provide clear value, and remain easy to use.",
    ],
    id: [
      "Latar belakang Teknik Komputer membentuk cara saya melihat software sebagai satu sistem yang utuh, bukan sekadar kumpulan fitur yang berdiri sendiri. Melalui perkuliahan, pengalaman magang, dan berbagai project, saya membangun pengalaman praktis dalam software engineering, full-stack web development, dan machine learning.",
      "Saya memulai dengan memahami masalah, kemudian menghubungkan antarmuka, backend, alur data, dan model machine learning menjadi produk yang terstruktur. Bagi saya, hasil sama pentingnya dengan proses implementasi: software harus bekerja dengan andal, memberikan manfaat yang jelas, dan mudah digunakan.",
    ],
  },
  portrait: {
    assetPath: "/assets/profile/pas-foto.webp",
    alt: {
      en: "Portrait of Annas Tri Widagdo",
      id: "Foto profil Annas Tri Widagdo",
    },
    figureLabel: "FIG.01 // PORTRAIT RECORD",
    caption: {
      en: "FIG.01 // PORTRAIT RECORD · JAKARTA, INDONESIA",
      id: "FIG.01 // PORTRAIT RECORD · JAKARTA, INDONESIA",
    },
  },
  metadata: {
    role: {
      en: "Software Engineer · Full-Stack Web Developer · Machine Learning Engineer",
      id: "Software Engineer · Full-Stack Web Developer · Machine Learning Engineer",
    },
    education: {
      en: "Bachelor of Engineering in Computer Engineering · Diponegoro University",
      id: "Sarjana Teknik (S.T.), Teknik Komputer · Universitas Diponegoro",
    },
    gpa: "3.79 / 4.00",
    status: {
      en: "Fresh Graduate",
      id: "Lulusan Baru",
    },
    location: {
      en: "Jakarta, Indonesia",
      id: "Jakarta, Indonesia",
    },
  },
};

export const educationData: EducationData = {
  tag: "[02 // EDUCATION]",
  subtag: {
    en: "ACADEMIC RECORD",
    id: "DOKUMEN AKADEMIK",
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
    en: "Bachelor of Engineering in Computer Engineering",
    id: "Sarjana Teknik (S.T.), Teknik Komputer",
  },
  fieldOfStudy: {
    en: "Computer Engineering",
    id: "Teknik Komputer",
  },
  period: {
    en: "August 2022–June 2026",
    id: "Agustus 2022–Juni 2026",
  },
  gpa: "3.79 / 4.00",
  positioning: {
    en: "Fresh Graduate",
    id: "Lulusan Baru",
  },
  status: {
    en: "Fresh Graduate",
    id: "Lulusan Baru",
  },
  summary: {
    en: "Completed a Bachelor of Engineering in Computer Engineering with an academic focus on software engineering, full-stack web development, artificial intelligence, and machine learning.",
    id: "Menyelesaikan pendidikan Sarjana Teknik pada program studi Teknik Komputer dengan fokus akademik pada software engineering, full-stack web development, artificial intelligence, dan machine learning.",
  },
  thesis: {
    label: {
      en: "UNDERGRADUATE THESIS",
      id: "SKRIPSI",
    },
    title: {
      en: "Comparative Analysis of Client-Side Rendering (CSR), Server-Side Rendering (SSR), and Static Site Generation (SSG) for Frontend Performance on the Next.js-Based iHealth Edu Website",
      id: "Analisis Perbandingan Metode Client-Side Rendering (CSR), Server-Side Rendering (SSR), dan Static Site Generation (SSG) terhadap Performa Frontend pada Website iHealth Edu Berbasis Next.js",
    },
  },
  bachelorCertificate: {
    title: "BACHELOR CERTIFICATE",
    assetPath: "/assets/certificates/bachelor_certificate.webp",
    year: "2026",
    badge: {
      en: "ACADEMIC RECORD",
      id: "DOKUMEN AKADEMIK",
    },
    figureLabel: "FIG.01 // BACHELOR CERTIFICATE",
    caption: {
      en: "Diponegoro University · Faculty of Engineering · Computer Engineering · 2026",
      id: "Universitas Diponegoro · Fakultas Teknik · Teknik Komputer · 2026",
    },
    alt: {
      en: "Bachelor Certificate · Diponegoro University",
      id: "Bachelor Certificate · Universitas Diponegoro",
    },
    inspectLabel: {
      en: "Inspect Bachelor Certificate",
      id: "Lihat Bachelor Certificate",
    },
    closeLabel: {
      en: "Close Bachelor Certificate preview",
      id: "Tutup pratinjau Bachelor Certificate",
    },
  },
  // Compatibility fields
  certificateAsset: "/assets/certificates/bachelor_certificate.webp",
  figureLabel: {
    en: "FIG.01 // BACHELOR CERTIFICATE",
    id: "FIG.01 // BACHELOR CERTIFICATE",
  },
  documentCaption: {
    en: "Diponegoro University · Faculty of Engineering · Computer Engineering · 2026",
    id: "Universitas Diponegoro · Fakultas Teknik · Teknik Komputer · 2026",
  },
  inspectLabel: {
    en: "Inspect Bachelor Certificate",
    id: "Lihat Bachelor Certificate",
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
    badge: "Cisco Networking Academy",
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
    badge: "Cisco Networking Academy",
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
    badge: "Cisco Networking Academy",
  },
  {
    id: "hcia-ai",
    title: {
      en: "HCIA-AI V3.5",
      id: "HCIA-AI V3.5",
    },
    issuer: "Huawei Technologies",
    category: "ai-databases",
    assetPath: "/assets/certificates/hcia-ai-v3-5.webp",
    badge: "Huawei Technologies",
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
    badge: "Oracle Academy",
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
    badge: "Oracle Academy",
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
    badge: "Cisco Networking Academy",
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
    badge: "Cisco Networking Academy",
  },
];

export const credentialFilters: CredentialFilter[] = [
  {
    key: "all",
    label: { en: "All Credentials", id: "Semua Sertifikasi" },
    count: 8,
  },
  {
    key: "cisco-systems",
    label: { en: "Cisco & Systems", id: "Cisco & Sistem" },
    count: 5,
  },
  {
    key: "ai-databases",
    label: { en: "AI & Databases", id: "AI & Basis Data" },
    count: 3,
  },
];

export const credentialSectionCopy: CredentialSectionCopy = {
  tag: "[03 // CREDENTIALS]",
  subtag: {
    en: "TECHNICAL CERTIFICATIONS",
    id: "SERTIFIKASI TEKNIS",
  },
  title: {
    en: "Technical Certifications",
    id: "Sertifikasi Teknis",
  },
  summary: {
    en: "Eight verified technical certifications covering computer networking, systems, artificial intelligence, databases, hardware, and IoT.",
    id: "Delapan sertifikasi teknis terverifikasi di bidang jaringan komputer, sistem, kecerdasan buatan, basis data, hardware, dan IoT.",
  },
  accessibility: {
    filterLabel: {
      en: "Filter credentials",
      id: "Filter sertifikasi",
    },
    inspectLabel: {
      en: "Inspect certificate",
      id: "Lihat sertifikat",
    },
    closeLabel: {
      en: "Close certificate preview",
      id: "Tutup pratinjau sertifikat",
    },
    closeBachelorLabel: {
      en: "Close Bachelor Certificate preview",
      id: "Tutup pratinjau Bachelor Certificate",
    },
  },
};
