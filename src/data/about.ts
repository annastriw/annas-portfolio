import type {
  CertificateItem,
  EducationItem,
  EngineeringPrinciple,
  TechnicalTaxonomyGroup,
} from "@/types/about";

export const educationData: EducationItem = {
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
  period: "August 2022 – July 2026",
  location: "Semarang, Central Java, Indonesia",
  highlights: {
    en: [
      "Graduated with GPA 3.79 / 4.00 from Diponegoro University.",
      "Conducted research and implementation in applied machine learning models.",
      "Delivered end-to-end projects across web architectures, backend APIs, and hardware integrations.",
    ],
    id: [
      "Lulus dengan IPK 3.79 / 4.00 dari Universitas Diponegoro.",
      "Melakukan riset dan implementasi dalam model machine learning terapan.",
      "Menyelesaikan proyek end-to-end meliputi arsitektur web, API backend, dan integrasi perangkat keras.",
    ],
  },
};

export const certificatesData: CertificateItem[] = [
  {
    id: "ccna-enterprise",
    title: {
      en: "CCNA: Enterprise Networking, Security, and Automation",
      id: "CCNA: Enterprise Networking, Security, and Automation",
    },
    issuer: "Cisco Networking Academy",
    category: "networking",
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
    category: "networking",
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
    category: "networking",
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
    category: "ai-data",
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
    category: "ai-data",
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
    category: "ai-data",
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
    category: "networking",
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
    category: "networking",
    assetPath:
      "/assets/certificates/introduction_to_iot_and_digital_transformation.webp",
    badge: "CISCO VERIFIED",
    credentialNote: {
      en: "Internet of Things ecosystem, sensor networks, cloud connectivity, and digital transformation.",
      id: "Ekosistem Internet of Things, jaringan sensor, konektivitas cloud, dan transformasi digital.",
    },
  },
];

export const engineeringPrinciples: EngineeringPrinciple[] = [
  {
    index: "01",
    code: "PRINCIPLE // 01",
    title: {
      en: "Build End-to-End",
      id: "Bangun Secara End-to-End",
    },
    description: {
      en: "Understand the need first, then connect interface, backend, data, testing, and deployment into one usable system.",
      id: "Pahami kebutuhan terlebih dahulu, lalu hubungkan antarmuka, backend, data, pengujian, dan deployment menjadi satu sistem yang siap digunakan.",
    },
  },
  {
    index: "02",
    code: "PRINCIPLE // 02",
    title: {
      en: "Design for Real Users",
      id: "Rancang untuk Pengguna Nyata",
    },
    description: {
      en: "Build around how people actually use the system, with clear flows and understandable feedback.",
      id: "Bangun sistem berdasarkan cara pengguna berinteraksi di dunia nyata, dengan alur yang jelas dan respons yang mudah dipahami.",
    },
  },
  {
    index: "03",
    code: "PRINCIPLE // 03",
    title: {
      en: "Use Technology with Purpose",
      id: "Gunakan Teknologi Sesuai Kebutuhan",
    },
    description: {
      en: "Choose tools and machine learning only when they genuinely help solve the problem.",
      id: "Pilih alat bantu dan machine learning hanya ketika benar-benar memberikan solusi nyata bagi masalah yang dihadapi.",
    },
  },
  {
    index: "04",
    code: "PRINCIPLE // 04",
    title: {
      en: "Test Before Delivery",
      id: "Uji Sebelum Rilis",
    },
    description: {
      en: "Check important workflows and edge cases before considering the system ready.",
      id: "Periksa alur penting dan skenario batas (edge case) secara teliti sebelum sistem dianggap siap digunakan.",
    },
  },
];

export const technicalTaxonomyData: TechnicalTaxonomyGroup[] = [
  {
    category: {
      en: "Software Development",
      id: "Pengembangan Software",
    },
    items: [
      { name: "Next.js & React", context: "App Router, Server Components, TypeScript" },
      { name: "NestJS & Node.js", context: "Modular backend services, REST APIs" },
      { name: "Laravel & PHP", context: "MVC architecture, REST APIs, Eloquent ORM" },
      { name: "TypeScript & JavaScript", context: "Type safety, modern ES standards" },
    ],
  },
  {
    category: {
      en: "Machine Learning",
      id: "Machine Learning",
    },
    items: [
      { name: "Supervised Learning", context: "Classification models, Scikit-learn pipelines" },
      { name: "Model Evaluation", context: "Cross-validation, precision/recall metrics" },
      { name: "Python & Data Stack", context: "Pandas, NumPy, model training workflows" },
      { name: "Inference Endpoints", context: "REST API serving for trained ML models" },
    ],
  },
  {
    category: {
      en: "Testing & Delivery",
      id: "Pengujian & Pengiriman",
    },
    items: [
      { name: "QA & Verification", context: "Functional testing, edge case validation" },
      { name: "Git & Version Control", context: "Branching workflows, collaborative development" },
      { name: "Linux & VPS", context: "Server configuration, application deployment" },
      { name: "Performance & Optimization", context: "Asset optimization, responsive validation" },
    ],
  },
  {
    category: {
      en: "Tools & Systems",
      id: "Perangkat & Sistem",
    },
    items: [
      { name: "Relational Databases", context: "MySQL, PostgreSQL schema design" },
      { name: "Tailwind CSS", context: "Design tokens, responsive layouts, utility classes" },
      { name: "Hardware Integration", context: "Android thermal printing protocol integration" },
      { name: "RESTful APIs", context: "Structured request/response contracts" },
    ],
  },
];
