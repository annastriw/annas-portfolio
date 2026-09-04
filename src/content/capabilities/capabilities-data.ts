import type { Locale } from "@/lib/i18n/config";

export interface CapabilityItem {
  slug?: string;
  name: string;
  monogram?: string;
  index: string;
  description?: Record<Locale, string>;
  isFundamental?: boolean;
}

export interface CapabilityCategory {
  id: string;
  code: string;
  index: string;
  title: string;
  isFundamental?: boolean;
  items: CapabilityItem[];
}

export const capabilitiesCategories: CapabilityCategory[] = [
  {
    id: "frontend-engineering",
    code: "01 // FRONTEND",
    index: "01",
    title: "Frontend Engineering",
    isFundamental: false,
    items: [
      {
        slug: "nextjs",
        name: "Next.js",
        monogram: "NX",
        index: "01.01",
        description: {
          en: "A React framework for building web applications with routing, flexible rendering strategies, and integrated frontend tooling.",
          id: "Framework React untuk membangun aplikasi web dengan routing, berbagai strategi rendering, dan tooling frontend yang terintegrasi.",
        },
      },
      {
        slug: "react",
        name: "React",
        monogram: "RE",
        index: "01.02",
        description: {
          en: "A JavaScript library for building component-based user interfaces that can be composed and maintained efficiently.",
          id: "Library JavaScript untuk membangun antarmuka berbasis komponen yang dapat disusun dan dikelola secara efisien.",
        },
      },
      {
        slug: "laravel",
        name: "Laravel",
        monogram: "LV",
        index: "01.03",
        description: {
          en: "A PHP framework for developing web applications, including server-rendered interfaces, routing, data handling, and backend integration.",
          id: "Framework PHP untuk mengembangkan aplikasi web, termasuk antarmuka server-rendered, routing, pengelolaan data, dan integrasi backend.",
        },
      },
      {
        slug: "typescript",
        name: "TypeScript",
        monogram: "TS",
        index: "01.04",
        description: {
          en: "A typed extension of JavaScript that improves code clarity, validation, and maintainability in larger applications.",
          id: "Pengembangan dari JavaScript dengan dukungan tipe data untuk meningkatkan kejelasan, validasi, dan maintainability pada aplikasi berskala lebih besar.",
        },
      },
      {
        slug: "javascript",
        name: "JavaScript",
        monogram: "JS",
        index: "01.05",
        description: {
          en: "The core programming language of the web, used to create application logic and interactive browser experiences.",
          id: "Bahasa pemrograman utama pada web yang digunakan untuk membangun logika aplikasi dan interaksi di browser.",
        },
      },
      {
        slug: "tailwind-css",
        name: "Tailwind CSS",
        monogram: "TW",
        index: "01.06",
        description: {
          en: "A utility-first CSS framework for building consistent responsive interfaces directly from reusable style classes.",
          id: "Framework CSS utility-first untuk membangun antarmuka responsive yang konsisten melalui kumpulan class yang dapat digunakan kembali.",
        },
      },
      {
        slug: "html",
        name: "HTML",
        monogram: "HTML",
        index: "01.07",
        description: {
          en: "The standard markup language for defining the semantic structure and content of web pages.",
          id: "Bahasa markup standar untuk menyusun struktur semantik dan konten halaman web.",
        },
      },
      {
        slug: "css",
        name: "CSS",
        monogram: "CSS",
        index: "01.08",
        description: {
          en: "A styling language for controlling the visual presentation, layout, and responsive behavior of web interfaces.",
          id: "Bahasa styling untuk mengatur tampilan visual, layout, dan perilaku responsive pada antarmuka web.",
        },
      },
    ],
  },
  {
    id: "backend-api-engineering",
    code: "02 // BACKEND",
    index: "02",
    title: "Backend & API Engineering",
    isFundamental: false,
    items: [
      {
        slug: "nestjs",
        name: "NestJS",
        monogram: "NS",
        index: "02.01",
        description: {
          en: "A Node.js framework for building structured and scalable server-side applications with a modular architecture.",
          id: "Framework Node.js untuk membangun aplikasi server-side yang terstruktur dan scalable dengan arsitektur modular.",
        },
      },
      {
        slug: "laravel",
        name: "Laravel",
        monogram: "LV",
        index: "02.02",
        description: {
          en: "A PHP framework for building backend services, application logic, database operations, and web APIs.",
          id: "Framework PHP untuk membangun backend service, logika aplikasi, operasi database, dan API web.",
        },
      },
      {
        slug: "php",
        name: "PHP",
        monogram: "PHP",
        index: "02.03",
        description: {
          en: "A server-side programming language for building dynamic web applications, backend logic, and API services.",
          id: "Bahasa pemrograman server-side untuk membangun aplikasi web dinamis, logika backend, dan layanan API.",
        },
      },
      {
        slug: "flask",
        name: "Flask",
        monogram: "FK",
        index: "02.04",
        description: {
          en: "A lightweight Python framework for building web services, APIs, and integrations with data or machine learning applications.",
          id: "Framework Python yang ringan untuk membangun web service, API, serta integrasi dengan aplikasi data atau machine learning.",
        },
      },
      {
        slug: "node-js",
        name: "Node.js",
        monogram: "NODE",
        index: "02.05",
        description: {
          en: "A JavaScript runtime for executing server-side application logic and building network-based services.",
          id: "Runtime JavaScript untuk menjalankan logika aplikasi di sisi server dan membangun layanan berbasis jaringan.",
        },
      },
      {
        slug: "express-js",
        name: "Express.js",
        monogram: "EX",
        index: "02.06",
        description: {
          en: "A minimal Node.js framework for building web servers, middleware, and HTTP APIs.",
          id: "Framework Node.js yang minimal untuk membangun web server, middleware, dan API berbasis HTTP.",
        },
      },
      {
        slug: "rest-api",
        name: "REST API",
        monogram: "API",
        index: "02.07",
        description: {
          en: "An API design approach for connecting applications through resource-based endpoints and standard HTTP operations.",
          id: "Pendekatan desain API untuk menghubungkan aplikasi melalui endpoint berbasis resource dan operasi HTTP standar.",
        },
      },
      {
        slug: "graphql",
        name: "GraphQL",
        monogram: "GQL",
        index: "02.08",
        description: {
          en: "A query language and API runtime that allows clients to request the specific data required by an application.",
          id: "Query language dan runtime API yang memungkinkan client meminta data spesifik sesuai kebutuhan aplikasi.",
        },
      },
      {
        slug: "websockets",
        name: "WebSockets",
        monogram: "WS",
        index: "02.09",
        description: {
          en: "A communication protocol for maintaining two-way, real-time connections between clients and servers.",
          id: "Protokol komunikasi untuk mempertahankan koneksi real-time dua arah antara client dan server.",
        },
      },
      {
        slug: "swagger",
        name: "Swagger",
        monogram: "SWG",
        index: "02.10",
        description: {
          en: "A set of tools based on the OpenAPI specification for documenting, exploring, and testing web APIs.",
          id: "Kumpulan tools berbasis spesifikasi OpenAPI untuk mendokumentasikan, mengeksplorasi, dan menguji API web.",
        },
      },
    ],
  },
  {
    id: "authentication-security",
    code: "03 // SECURITY",
    index: "03",
    title: "Authentication & Application Security",
    isFundamental: false,
    items: [
      {
        slug: "jwt",
        name: "JWT",
        monogram: "JWT",
        index: "03.01",
        description: {
          en: "A compact token format for securely carrying authentication and authorization information between applications.",
          id: "Format token ringkas untuk membawa informasi authentication dan authorization antar aplikasi secara aman.",
        },
      },
      {
        slug: "oauth-2",
        name: "OAuth 2.0",
        monogram: "OA2",
        index: "03.02",
        description: {
          en: "An authorization framework that allows applications to access protected resources without sharing a user’s password.",
          id: "Framework authorization yang memungkinkan aplikasi mengakses resource terlindungi tanpa membagikan password pengguna.",
        },
      },
      {
        slug: "role-based-access-control",
        name: "Role-Based Access Control",
        monogram: "RBAC",
        index: "03.03",
        description: {
          en: "An access-control approach that assigns permissions according to a user’s role and responsibilities within a system.",
          id: "Pendekatan kontrol akses yang memberikan permission berdasarkan role dan tanggung jawab pengguna dalam sistem.",
        },
      },
    ],
  },
  {
    id: "database-cloud-services",
    code: "04 // DATABASE",
    index: "04",
    title: "Database, Cache & Cloud Services",
    isFundamental: false,
    items: [
      {
        slug: "mysql",
        name: "MySQL",
        monogram: "SQL",
        index: "04.01",
        description: {
          en: "A relational database management system for storing and managing structured application data using SQL.",
          id: "Sistem manajemen database relasional untuk menyimpan dan mengelola data aplikasi yang terstruktur menggunakan SQL.",
        },
      },
      {
        slug: "prisma",
        name: "Prisma",
        monogram: "PR",
        index: "04.02",
        description: {
          en: "An ORM toolkit for working with databases through type-safe queries, schema definitions, and controlled data migrations.",
          id: "ORM toolkit untuk mengelola database melalui query yang type-safe, definisi schema, dan data migration yang terkontrol.",
        },
      },
      {
        slug: "postgresql",
        name: "PostgreSQL",
        monogram: "PG",
        index: "04.03",
        description: {
          en: "A relational database system designed for structured data, complex queries, data integrity, and extensible application requirements.",
          id: "Sistem database relasional untuk menangani data terstruktur, query kompleks, integritas data, dan kebutuhan aplikasi yang dapat dikembangkan.",
        },
      },
      {
        slug: "mongodb",
        name: "MongoDB",
        monogram: "MDB",
        index: "04.04",
        description: {
          en: "A document-oriented database for storing flexible JSON-like data without requiring a fixed relational structure.",
          id: "Database berorientasi dokumen untuk menyimpan data fleksibel berbentuk menyerupai JSON tanpa memerlukan struktur relasional yang tetap.",
        },
      },
      {
        slug: "redis",
        name: "Redis",
        monogram: "RDS",
        index: "04.05",
        description: {
          en: "An in-memory data store used for caching, session management, and fast access to frequently requested data.",
          id: "Penyimpanan data berbasis in-memory untuk caching, pengelolaan session, dan akses cepat ke data yang sering digunakan.",
        },
      },
      {
        slug: "firebase",
        name: "Firebase",
        monogram: "FB",
        index: "04.06",
        description: {
          en: "A cloud application platform providing managed services such as databases, authentication, hosting, and real-time data synchronization.",
          id: "Platform aplikasi berbasis cloud yang menyediakan layanan terkelola seperti database, authentication, hosting, dan sinkronisasi data secara real-time.",
        },
      },
      {
        slug: "aws",
        name: "AWS",
        monogram: "AWS",
        index: "04.07",
        description: {
          en: "A cloud platform offering infrastructure and managed services for hosting, storing, deploying, and operating applications.",
          id: "Platform cloud yang menyediakan infrastruktur dan layanan terkelola untuk hosting, penyimpanan, deployment, dan pengoperasian aplikasi.",
        },
      },
    ],
  },
  {
    id: "mobile-development",
    code: "05 // MOBILE",
    index: "05",
    title: "Mobile Development",
    isFundamental: false,
    items: [
      {
        slug: "kotlin",
        name: "Kotlin",
        monogram: "KT",
        index: "05.01",
        description: {
          en: "A modern programming language commonly used to build native Android applications with concise and type-safe code.",
          id: "Bahasa pemrograman modern yang umum digunakan untuk membangun aplikasi Android native dengan kode yang ringkas dan type-safe.",
        },
      },
      {
        slug: "flutter",
        name: "Flutter",
        monogram: "FL",
        index: "05.02",
        description: {
          en: "A cross-platform UI framework for building mobile applications from a shared Dart codebase.",
          id: "Framework UI cross-platform untuk membangun aplikasi mobile dari satu codebase Dart.",
        },
      },
      {
        slug: "react-native",
        name: "React Native",
        monogram: "RN",
        index: "05.03",
        description: {
          en: "A React-based framework for building mobile applications for Android and iOS using JavaScript or TypeScript.",
          id: "Framework berbasis React untuk membangun aplikasi mobile Android dan iOS menggunakan JavaScript atau TypeScript.",
        },
      },
    ],
  },
  {
    id: "machine-learning-data-science",
    code: "06 // ML & DATA",
    index: "06",
    title: "Machine Learning & Data Science",
    isFundamental: false,
    items: [
      {
        slug: "python",
        name: "Python",
        monogram: "PY",
        index: "06.01",
        description: {
          en: "A general-purpose programming language widely used for data processing, machine learning, automation, and backend development.",
          id: "Bahasa pemrograman general-purpose yang banyak digunakan untuk pemrosesan data, machine learning, automation, dan backend development.",
        },
      },
      {
        slug: "numpy",
        name: "NumPy",
        monogram: "NUM",
        index: "06.02",
        description: {
          en: "A Python library for efficient numerical computation using multidimensional arrays and mathematical operations.",
          id: "Library Python untuk komputasi numerik yang efisien menggunakan array multidimensi dan operasi matematika.",
        },
      },
      {
        slug: "pandas",
        name: "Pandas",
        monogram: "PD",
        index: "06.03",
        description: {
          en: "A Python library for cleaning, transforming, analyzing, and organizing structured data.",
          id: "Library Python untuk membersihkan, mentransformasi, menganalisis, dan mengelola data terstruktur.",
        },
      },
      {
        slug: "scikit-learn",
        name: "Scikit-learn",
        monogram: "SK",
        index: "06.04",
        description: {
          en: "A Python machine learning library providing tools for preprocessing, model training, evaluation, and predictive analysis.",
          id: "Library machine learning Python yang menyediakan tools untuk preprocessing, training model, evaluasi, dan analisis prediktif.",
        },
      },
      {
        slug: "pytorch",
        name: "PyTorch",
        monogram: "TORCH",
        index: "06.05",
        description: {
          en: "A machine learning framework for developing, training, and experimenting with deep learning models.",
          id: "Framework machine learning untuk mengembangkan, melakukan training, dan bereksperimen dengan model deep learning.",
        },
      },
      {
        slug: "tensorflow",
        name: "TensorFlow",
        monogram: "TF",
        index: "06.06",
        description: {
          en: "A machine learning framework for building, training, and deploying models across different computing environments.",
          id: "Framework machine learning untuk membangun, melakukan training, dan men-deploy model pada berbagai environment komputasi.",
        },
      },
      {
        name: "Data Preprocessing & Feature Engineering",
        monogram: "DP",
        index: "06.07",
        description: {
          en: "The process of cleaning and transforming raw data, then preparing or creating features that make it suitable for machine learning.",
          id: "Proses membersihkan dan mentransformasi data mentah, kemudian menyiapkan atau membentuk feature agar dapat digunakan dalam machine learning.",
        },
      },
      {
        name: "Supervised & Unsupervised Learning",
        monogram: "ML",
        index: "06.08",
        description: {
          en: "Machine learning approaches that learn from labeled data or identify patterns and structures within unlabeled data.",
          id: "Pendekatan machine learning yang mempelajari data berlabel atau menemukan pola dan struktur pada data tanpa label.",
        },
      },
      {
        name: "Statistical Analysis & Model Evaluation",
        monogram: "STAT",
        index: "06.09",
        description: {
          en: "The use of statistical reasoning and evaluation metrics to examine data and assess a model’s performance, reliability, and limitations.",
          id: "Penggunaan analisis statistik dan evaluation metrics untuk memahami data serta menilai performa, reliability, dan keterbatasan model.",
        },
      },
      {
        name: "Natural Language & Speech Processing",
        monogram: "NLP",
        index: "06.10",
        description: {
          en: "Methods for processing human language and speech, including text analysis, audio transcription, and language-based machine learning tasks.",
          id: "Metode untuk memproses bahasa dan ucapan manusia, termasuk analisis teks, transkripsi audio, dan berbagai task machine learning berbasis bahasa.",
        },
      },
    ],
  },
  {
    id: "quality-assurance-testing",
    code: "07 // QA & TESTING",
    index: "07",
    title: "Quality Assurance & Testing",
    isFundamental: false,
    items: [
      {
        slug: "katalon-studio",
        name: "Katalon Studio",
        monogram: "KS",
        index: "07.01",
        description: {
          en: "A testing platform for creating and running automated tests across web applications, APIs, and other application workflows.",
          id: "Platform testing untuk membuat dan menjalankan automated test pada aplikasi web, API, dan berbagai workflow aplikasi.",
        },
      },
      {
        slug: "playwright",
        name: "Playwright",
        monogram: "PW",
        index: "07.02",
        description: {
          en: "A browser automation framework for testing web applications across modern browsers and responsive environments.",
          id: "Framework browser automation untuk menguji aplikasi web pada berbagai browser modern dan environment responsive.",
        },
      },
      {
        slug: "postman",
        name: "Postman",
        monogram: "PM",
        index: "07.03",
        description: {
          en: "An API platform for sending requests, inspecting responses, organizing collections, and validating endpoints during development.",
          id: "Platform API untuk mengirim request, memeriksa response, mengelola collection, dan memvalidasi endpoint selama pengembangan.",
        },
      },
      {
        slug: "jmeter",
        name: "JMeter",
        monogram: "JM",
        index: "07.04",
        description: {
          en: "A performance testing tool for measuring how APIs and web applications behave under different levels of load.",
          id: "Tool performance testing untuk mengukur respons API dan aplikasi web pada berbagai tingkat beban.",
        },
      },
      {
        slug: "lighthouse",
        name: "Lighthouse",
        monogram: "LH",
        index: "07.05",
        description: {
          en: "An automated auditing tool for evaluating web performance, accessibility, best practices, and SEO.",
          id: "Tool audit otomatis untuk mengevaluasi performance, accessibility, best practices, dan SEO pada website.",
        },
      },
    ],
  },
  {
    id: "deployment-infrastructure",
    code: "08 // DEPLOYMENT",
    index: "08",
    title: "Deployment & Infrastructure",
    isFundamental: false,
    items: [
      {
        slug: "docker",
        name: "Docker",
        monogram: "DK",
        index: "08.01",
        description: {
          en: "A containerization platform for packaging applications and their dependencies into consistent, portable environments.",
          id: "Platform containerization untuk mengemas aplikasi beserta dependency-nya ke dalam environment yang konsisten dan portabel.",
        },
      },
      {
        slug: "linux-ubuntu",
        name: "Linux (Ubuntu)",
        monogram: "LX",
        index: "08.02",
        description: {
          en: "A Linux-based operating system commonly used for application servers, development environments, and production deployment.",
          id: "Sistem operasi berbasis Linux yang umum digunakan untuk application server, development environment, dan deployment ke production.",
        },
      },
      {
        slug: "nginx",
        name: "Nginx",
        monogram: "NGX",
        index: "08.03",
        description: {
          en: "A web server and reverse proxy for serving applications, routing traffic, and managing connections between clients and backend services.",
          id: "Web server dan reverse proxy untuk menyajikan aplikasi, mengatur traffic, dan mengelola koneksi antara client dan backend service.",
        },
      },
      {
        slug: "kubernetes",
        name: "Kubernetes",
        monogram: "K8S",
        index: "08.04",
        description: {
          en: "A container orchestration platform for deploying, scaling, and managing containerized applications across computing environments.",
          id: "Platform container orchestration untuk men-deploy, melakukan scaling, dan mengelola aplikasi berbasis container pada berbagai environment komputasi.",
        },
      },
      {
        slug: "cloudflare",
        name: "Cloudflare",
        monogram: "CF",
        index: "08.05",
        description: {
          en: "A cloud connectivity platform providing DNS, content delivery, traffic protection, and application performance services.",
          id: "Platform cloud connectivity yang menyediakan layanan DNS, content delivery, perlindungan traffic, dan peningkatan performa aplikasi.",
        },
      },
      {
        slug: "vercel",
        name: "Vercel",
        monogram: "VC",
        index: "08.06",
        description: {
          en: "A cloud platform for deploying, previewing, and hosting web applications through an integrated development workflow.",
          id: "Platform cloud untuk men-deploy, melakukan preview, dan meng-host aplikasi web melalui workflow development yang terintegrasi.",
        },
      },
      {
        slug: "github",
        name: "GitHub",
        monogram: "GH",
        index: "08.07",
        description: {
          en: "A development platform for hosting Git repositories, managing source code, reviewing changes, and supporting team collaboration.",
          id: "Platform development untuk menyimpan Git repository, mengelola source code, meninjau perubahan, dan mendukung kolaborasi tim.",
        },
      },
    ],
  },
  {
    id: "design-interactive-development",
    code: "09 // DESIGN & INTERACTION",
    index: "09",
    title: "Design & Interactive Development",
    isFundamental: false,
    items: [
      {
        slug: "figma",
        name: "Figma",
        monogram: "FG",
        index: "09.01",
        description: {
          en: "A collaborative interface design tool for creating wireframes, visual systems, interactive prototypes, and developer handoff specifications.",
          id: "Tool kolaboratif untuk merancang antarmuka, wireframe, visual system, interactive prototype, dan spesifikasi handoff kepada developer.",
        },
      },
      {
        slug: "unity",
        name: "Unity",
        monogram: "UN",
        index: "09.02",
        description: {
          en: "A real-time development platform for building interactive applications, games, simulations, and immersive experiences.",
          id: "Platform real-time development untuk membangun aplikasi interaktif, game, simulasi, dan immersive experience.",
        },
      },
      {
        slug: "lumion-pro",
        name: "Lumion Pro",
        monogram: "LM",
        index: "09.03",
        description: {
          en: "A visualization tool for producing architectural scenes and panoramic media used in interactive presentations.",
          id: "Tool visualisasi untuk menghasilkan scene arsitektur dan media panorama yang digunakan dalam presentasi interaktif.",
        },
      },
    ],
  },
];