import type { Locale } from "@/lib/i18n/config";

export type CertificateCategoryKey =
  | "all"
  | "cisco-systems"
  | "ai-databases";

export interface CertificateRecord {
  id: string;
  title: Record<Locale, string>;
  issuer: string;
  category: CertificateCategoryKey;
  assetPath: string;
  badge: string;
  credentialNote: Record<Locale, string>;
}

export const verifiedCertificates: CertificateRecord[] = [
  {
    id: "ccna-enterprise",
    title: {
      en: "CCNA: Enterprise Networking, Security, and Automation",
      id: "CCNA: Enterprise Networking, Security, and Automation",
    },
    issuer: "Cisco Networking Academy",
    category: "cisco-systems",
    assetPath:
      "/assets/certificates/ccna_enterprise_networking_security_and_automation.webp",
    badge: "CISCO VERIFIED",
    credentialNote: {
      en: "Enterprise routing architectures, network security, virtualization, and network automation APIs.",
      id: "Arsitektur routing tingkat lanjut, keamanan jaringan, virtualisasi, dan otomatisasi jaringan.",
    },
  },
  {
    id: "ccnav7-switching-routing",
    title: {
      en: "CCNAv7: Switching, Routing, and Wireless Essentials",
      id: "CCNAv7: Switching, Routing, and Wireless Essentials",
    },
    issuer: "Cisco Networking Academy",
    category: "cisco-systems",
    assetPath:
      "/assets/certificates/ccnav7_switching_routing_and_wireless_essentials.webp",
    badge: "CISCO VERIFIED",
    credentialNote: {
      en: "VLANs, inter-VLAN routing, STP, EtherChannel, DHCPv4/v6, and WLAN configuration.",
      id: "Konfigurasi VLAN, inter-VLAN routing, STP, EtherChannel, DHCPv4/v6, dan jaringan nirkabel.",
    },
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
    credentialNote: {
      en: "Network architecture, IP addressing schemes, subnetting, Ethernet protocols, and OSI model fundamentals.",
      id: "Arsitektur jaringan, skema pengalamatan IP, subnetting, protokol Ethernet, dan dasar model OSI.",
    },
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
    credentialNote: {
      en: "Deep learning fundamentals, computer vision, natural language processing, and AI development workflows.",
      id: "Fondasi deep learning, computer vision, natural language processing, dan workflow pengembangan AI.",
    },
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
    credentialNote: {
      en: "Relational modeling, entity-relationship diagrams (ERD), normalization, and database schema design.",
      id: "Pemodelan relasional, Entity-Relationship Diagram (ERD), normalisasi, dan perancangan skema basis data.",
    },
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
    credentialNote: {
      en: "SQL queries, relational database management principles, and structured data manipulation.",
      id: "Kueri SQL, prinsip manajemen basis data relasional, dan manipulasi data terstruktur.",
    },
  },
  {
    id: "it-essentials",
    title: {
      en: "IT Essentials: PC Hardware and Software",
      id: "IT Essentials: PC Hardware and Software",
    },
    issuer: "Cisco Networking Academy",
    category: "cisco-systems",
    assetPath:
      "/assets/certificates/it_essentials_pc_hardware_and_software.webp",
    badge: "CISCO VERIFIED",
    credentialNote: {
      en: "Computer hardware architectures, operating system fundamentals, and operational security.",
      id: "Arsitektur perangkat keras, dasar sistem operasi, dan keamanan operasional sistem.",
    },
  },
  {
    id: "iot-digital-transformation",
    title: {
      en: "Introduction to IoT and Digital Transformation",
      id: "Introduction to IoT and Digital Transformation",
    },
    issuer: "Cisco Networking Academy",
    category: "cisco-systems",
    assetPath:
      "/assets/certificates/introduction_to_iot_and_digital_transformation.webp",
    badge: "CISCO VERIFIED",
    credentialNote: {
      en: "Internet of Things ecosystem, sensor networks, cloud connectivity, and digital transformation.",
      id: "Ekosistem Internet of Things, jaringan sensor, konektivitas cloud, dan transformasi digital.",
    },
  },
];
