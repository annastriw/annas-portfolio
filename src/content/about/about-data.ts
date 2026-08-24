import type { Locale } from "@/lib/i18n/config";

export interface EducationData {
  institution: Record<Locale, string>;
  degree: Record<Locale, string>;
  fieldOfStudy: Record<Locale, string>;
  period: Record<Locale, string>;
  gpa: string;
  positioning: Record<Locale, string>;
  location: Record<Locale, string>;
  certificateAsset: string;
}

export interface CertificateData {
  id: string;
  title: Record<Locale, string>;
  issuer: string;
  category: "cisco-systems" | "ai-databases";
  assetPath: string;
  badge: string;
}

export const biographyData = {
  intro: {
    en: "Software Engineer, Full-Stack Developer, and ML Engineer with a Computer Engineering background from Diponegoro University, focused on building practical end-to-end digital products.",
    id: "Software Engineer, Full-Stack Developer, dan ML Engineer dengan latar belakang Teknik Komputer Universitas Diponegoro yang berfokus pada pengembangan produk digital secara end-to-end.",
  },
  headline: {
    en: "Software Engineer · Full-Stack Developer · ML Engineer",
    id: "Software Engineer · Full-Stack Developer · ML Engineer",
  },
  paragraphs: {
    en: [
      "I build digital products from interface and backend services to machine learning integration, with a focus on solving real user and operational needs.",
      "My approach is simple: keep the experience clear, choose technology for a practical reason, and test the system before delivery.",
    ],
    id: [
      "Saya membangun produk digital mulai dari antarmuka, backend, hingga integrasi machine learning dengan fokus pada kebutuhan pengguna dan proses kerja nyata.",
      "Pendekatan saya sederhana: membuat alur yang jelas, memilih teknologi sesuai kebutuhan, dan memastikan sistem telah diuji sebelum digunakan.",
    ],
  },
  specifications: {
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
    en: "August 2022 – July 2026",
    id: "Agustus 2022 – Juli 2026",
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
  certificateAsset: "/assets/certificates/bachelor_certificate.webp",
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
    assetPath: "/assets/certificates/ccna_enterprise_networking_security_and_automation.webp",
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
    assetPath: "/assets/certificates/ccnav7_switching_routing_and_wireless_essentials.webp",
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
    assetPath: "/assets/certificates/ccnav7_introduction_to_networks.webp",
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
    assetPath: "/assets/certificates/hcia_ai_v3_5.webp",
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
    assetPath: "/assets/certificates/database_design.webp",
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
    assetPath: "/assets/certificates/database_foundations.webp",
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
    assetPath: "/assets/certificates/it_essentials_pc_hardware_and_software.webp",
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
    assetPath: "/assets/certificates/introduction_to_iot_and_digital_transformation.webp",
    badge: "CISCO VERIFIED",
  },
];
