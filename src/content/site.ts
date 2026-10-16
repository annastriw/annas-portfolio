import { text } from '../lib/i18n.ts';

export const identity = {
  name: 'Annas Tri Widagdo',
  role: 'Software Engineer',
  location: 'Jakarta, Indonesia',
  email: 'annastriw6@gmail.com',
  github: 'https://github.com/annastriw',
  linkedin: 'https://www.linkedin.com/in/annastriwidagdo',
  headline: text(
    'I build software that makes complex things simpler.',
    'Saya membangun software yang membuat hal rumit jadi lebih mudah.',
  ),
  supporting: text(
    'Focused on full-stack application development and AI/ML integration to address user needs.',
    'Berfokus pada pengembangan aplikasi full-stack dan integrasi AI/ML untuk menjawab kebutuhan pengguna.',
  ),
};

export const experience = [
  {
    role: 'Fullstack Developer',
    organization: text('CV Universal Kharisma Globalindo', 'CV Universal Kharisma Globalindo'),
    period: text('January–April 2026', 'Januari–April 2026'),
    location: text('Klaten, Central Java', 'Klaten, Jawa Tengah'),
    description: text(
      'Developed UKG System, from understanding business needs and designing the UI/UX to building the frontend, backend, and database. The system covers point of sale, inventory and stock, ordering, attendance, sales, operating expenses, reports, and multi-branch dashboards.',
      'Mengembangkan UKG System, dari menggali kebutuhan bisnis dan merancang UI/UX hingga membangun frontend, backend, dan database. Sistem mencakup kasir/POS, inventory dan stok, pemesanan, absensi, penjualan, biaya operasional, laporan, serta dashboard multi-cabang.',
    ),
    extra: text(
      'Handled manual and automated testing with Playwright, deployment to an Ubuntu VPS, and system maintenance.',
      'Menangani pengujian manual dan otomatis dengan Playwright, deployment ke Ubuntu VPS, serta pemeliharaan sistem.',
    ),
  },
  {
    role: 'UI/UX Designer Intern',
    organization: text(
      'Faculty of Engineering, Diponegoro University',
      'Fakultas Teknik, Universitas Diponegoro',
    ),
    period: text('August–September 2025', 'Agustus–September 2025'),
    location: text('Semarang, Central Java', 'Semarang, Jawa Tengah'),
    description: text(
      'Designed wireframes, user flows, and interfaces for SITEDI and SIPERPUS FT Undip to guide the development team. Created the SITEDI user guide to make its workflows and features easier to understand.',
      'Merancang wireframe, user flow, dan antarmuka untuk SITEDI serta SIPERPUS FT Undip sebagai acuan tim programmer. Menyusun panduan penggunaan SITEDI agar alur dan fitur sistem lebih mudah dipahami.',
    ),
  },
  {
    role: 'Junior Game Developer Intern',
    organization: text('PT Duta Basis Dataprima', 'PT Duta Basis Dataprima'),
    period: text('July–August 2024', 'Juli–Agustus 2024'),
    location: text('Bandung, West Java', 'Bandung, Jawa Barat'),
    description: text(
      'Contributed to a Panoramic Virtual Tour prototype within a team. Processed 78 panoramas using Lumion and organized them across 79 Unity scenes, implementing hotspot navigation and mouse and touch controls in C#.',
      'Berkontribusi dalam pengembangan prototipe Panoramic Virtual Tour bersama tim. Mengolah 78 panorama menggunakan Lumion dan menyusunnya dalam 79 scene Unity, dengan navigasi hotspot serta kontrol mouse dan sentuhan menggunakan C#.',
    ),
  },
];

export const capabilities = [
  {
    title: 'Full-Stack Development',
    description: text(
      'Developing interfaces, backends, APIs, and databases into connected, easy-to-use applications.',
      'Mengembangkan antarmuka, backend, API, dan database menjadi aplikasi yang terhubung dan mudah digunakan.',
    ),
    tools: 'React · Next.js · TypeScript · Node.js · NestJS · Laravel · MySQL · Prisma',
  },
  {
    title: 'Architecture & Integration',
    description: text(
      'Designing microservices, service-to-service communication, authentication, and storage integrations around system requirements.',
      'Merancang microservices, komunikasi antar-service, autentikasi, dan integrasi penyimpanan sesuai kebutuhan sistem.',
    ),
    tools: 'Microservices · API Gateway · REST API · JWT · RBAC · MinIO',
  },
  {
    title: 'AI/ML Integration',
    description: text(
      'Processing data, developing and evaluating models, and connecting them to applications through inference services.',
      'Mengolah data, mengembangkan dan mengevaluasi model, lalu menghubungkannya dengan aplikasi melalui layanan inference.',
    ),
    tools: 'Python · Pandas · NumPy · Scikit-learn · Flask · Hugging Face',
  },
  {
    title: 'Testing & Delivery',
    description: text(
      'Supporting software quality through manual and automated testing, CI/CD workflows, containers, deployment, and maintenance.',
      'Menjaga kualitas melalui pengujian manual dan otomatis, serta menyiapkan alur CI/CD, container, deployment, dan pemeliharaan.',
    ),
    tools:
      'Playwright · Jest · Vitest · Postman · GitHub Actions · Docker · Ubuntu · Nginx · Vercel',
  },
  {
    title: 'UI/UX Design',
    description: text(
      'Translating user needs into clear flows and interfaces, from wireframes to implementation.',
      'Menerjemahkan kebutuhan pengguna menjadi alur dan antarmuka yang jelas, dari wireframe hingga implementasi.',
    ),
    tools: 'Figma · User Flow · Wireframing · UI Design',
  },
];

export const biography = [
  text(
    'I’m Annas, a Jakarta-based Software Engineer and Computer Engineering graduate from Diponegoro University. I’m interested in how software can help people work, manage information, and solve everyday problems.',
    'Saya Annas, Software Engineer dan lulusan Teknik Komputer Universitas Diponegoro yang berbasis di Jakarta. Saya tertarik pada bagaimana software dapat membantu orang bekerja, mengelola informasi, dan menyelesaikan persoalan sehari-hari.',
  ),
  text(
    'For me, development starts with understanding a problem and the people facing it. I translate those needs into connected workflows, interfaces, and systems, then test and refine them into usable software.',
    'Bagi saya, pengembangan dimulai dari memahami masalah dan orang yang menghadapinya. Dari sana, saya menerjemahkan kebutuhan menjadi alur, antarmuka, dan sistem yang saling terhubung, lalu mengujinya hingga dapat digunakan.',
  ),
  text(
    'My experience spans full-stack applications, UI/UX design, and AI/ML integration. I enjoy bringing these pieces together to build products that are reliable, useful, and easy to use.',
    'Pengalaman saya mencakup aplikasi full-stack, desain UI/UX, serta integrasi AI/ML. Saya menikmati proses menyatukan bagian-bagian tersebut menjadi produk yang andal, bermanfaat, dan mudah digunakan.',
  ),
];
export const thesis = {
  title: text(
    'Comparative Analysis of Client-Side Rendering, Server-Side Rendering, and Static Site Generation for Frontend Performance on the Next.js-Based iHealth Edu Website',
    'Analisis Perbandingan Metode Client-Side Rendering (CSR), Server-Side Rendering (SSR), dan Static Site Generation (SSG) terhadap Performa Frontend pada Website iHealth Edu Berbasis Next.js.',
  ),
  description: text(
    'Compared three rendering strategies across five iHealth Edu pages using Google Lighthouse to evaluate performance, accessibility, best practices, and SEO.',
    'Membandingkan tiga metode rendering pada lima halaman iHealth Edu menggunakan Google Lighthouse untuk mengevaluasi performa, aksesibilitas, best practices, dan SEO.',
  ),
  url: 'https://eprints2.undip.ac.id/id/eprint/59746/',
};
export const certificates = [
  [
    'CCNA: Enterprise Networking, Security, and Automation',
    'Cisco Networking Academy',
    '2026',
    'ccna-enterprise-networking-security-and-automation',
  ],
  [
    'CCNAv7: Switching, Routing, and Wireless Essentials',
    'Cisco Networking Academy',
    '2024',
    'ccnav7-switching-routing-and-wireless-essentials',
  ],
  [
    'CCNAv7: Introduction to Networks',
    'Cisco Networking Academy',
    '2024',
    'ccnav7-introduction-to-networks',
  ],
  [
    'Introduction to IoT and Digital Transformation',
    'Cisco Networking Academy',
    '2023',
    'introduction-to-iot-and-digital-transformation',
  ],
  [
    'IT Essentials: PC Hardware and Software',
    'Cisco Networking Academy',
    '2022–2023',
    'it-essentials-pc-hardware-and-software',
  ],
  ['HCIA-AI V3.5 Course', 'Huawei Talent Online', '2024', 'hcia-ai-v3-5'],
  ['Database Design', 'Oracle Academy', '2024', 'database-design'],
  ['Database Foundations', 'Oracle Academy', '2024', 'database-foundations'],
];
