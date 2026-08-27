import type { Locale } from "@/lib/i18n/config";

export interface CapabilityItem {
  slug: string;
  name: string;
  monogram: string;
  index: string;
  description: Record<Locale, string>;
}

export interface CapabilityCategory {
  id: string;
  code: string;
  index: string;
  title: string;
  items: CapabilityItem[];
}

export const capabilitiesCategories: CapabilityCategory[] = [
  {
    id: "frontend-engineering",
    code: "01 // FRONTEND",
    index: "01",
    title: "Frontend Engineering",
    items: [
      {
        slug: "nextjs",
        name: "Next.js",
        monogram: "NX",
        index: "01.01",
        description: {
          en: "Used to build responsive web interfaces and full-stack applications with React-based routing and rendering.",
          id: "Digunakan untuk membangun antarmuka web responsif dan aplikasi full-stack dengan routing dan rendering berbasis React.",
        },
      },
      {
        slug: "react",
        name: "React",
        monogram: "RE",
        index: "01.02",
        description: {
          en: "Used to create reusable interface components and manage interactive user experiences.",
          id: "Digunakan untuk membuat komponen antarmuka reusable dan mengelola interaksi pengguna.",
        },
      },
      {
        slug: "laravel",
        name: "Laravel",
        monogram: "LV",
        index: "01.03",
        description: {
          en: "Used to develop server-rendered interfaces and structured workflows for PHP web applications.",
          id: "Digunakan untuk mengembangkan antarmuka server-rendered dan workflow terstruktur pada aplikasi web berbasis PHP.",
        },
      },
      {
        slug: "tailwind-css",
        name: "Tailwind CSS",
        monogram: "TW",
        index: "01.04",
        description: {
          en: "Used to create responsive and consistent interfaces through utility-based styling.",
          id: "Digunakan untuk membangun antarmuka yang responsif dan konsisten dengan utility-based styling.",
        },
      },
    ],
  },
  {
    id: "backend-data",
    code: "02 // BACKEND",
    index: "02",
    title: "Backend & Data",
    items: [
      {
        slug: "nestjs",
        name: "NestJS",
        monogram: "NS",
        index: "02.01",
        description: {
          en: "Used to structure modular backend services and REST APIs with TypeScript.",
          id: "Digunakan untuk membangun backend service modular dan REST API menggunakan TypeScript.",
        },
      },
      {
        slug: "laravel-backend",
        name: "Laravel",
        monogram: "LV",
        index: "02.02",
        description: {
          en: "Used to develop backend workflows, business logic, and data-driven PHP applications.",
          id: "Digunakan untuk mengembangkan workflow backend, business logic, dan aplikasi berbasis data dengan PHP.",
        },
      },
      {
        slug: "flask",
        name: "Flask",
        monogram: "FK",
        index: "02.03",
        description: {
          en: "Used to build lightweight Python services, including APIs for machine learning inference.",
          id: "Digunakan untuk membangun service Python yang ringan, termasuk API untuk machine learning inference.",
        },
      },
      {
        slug: "rest-api",
        name: "REST API",
        monogram: "API",
        index: "02.04",
        description: {
          en: "Used to connect web, mobile, backend, IoT, and machine learning services through structured endpoints.",
          id: "Digunakan untuk menghubungkan web, mobile, backend, IoT, dan machine learning service melalui endpoint yang terstruktur.",
        },
      },
      {
        slug: "mysql",
        name: "MySQL",
        monogram: "SQL",
        index: "02.05",
        description: {
          en: "Used to store, organize, and manage relational application data.",
          id: "Digunakan untuk menyimpan, menyusun, dan mengelola data relasional pada aplikasi.",
        },
      },
      {
        slug: "prisma",
        name: "Prisma",
        monogram: "PR",
        index: "02.06",
        description: {
          en: "Used to define database schemas and create type-safe queries in TypeScript backends.",
          id: "Digunakan untuk mendefinisikan skema database dan membuat query yang type-safe pada backend TypeScript.",
        },
      },
    ],
  },
  {
    id: "mobile-native",
    code: "03 // MOBILE",
    index: "03",
    title: "Mobile & Native Development",
    items: [
      {
        slug: "kotlin",
        name: "Kotlin",
        monogram: "KT",
        index: "03.01",
        description: {
          en: "Used to develop native Android applications and system-level mobile utilities.",
          id: "Digunakan untuk mengembangkan aplikasi Android native dan utilitas mobile yang terintegrasi dengan sistem.",
        },
      },
      {
        slug: "flutter",
        name: "Flutter",
        monogram: "FL",
        index: "03.02",
        description: {
          en: "Used to build cross-platform mobile interfaces and applications connected to REST APIs.",
          id: "Digunakan untuk membangun antarmuka mobile cross-platform dan aplikasi yang terhubung dengan REST API.",
        },
      },
    ],
  },
  {
    id: "machine-learning",
    code: "04 // ML & DATA",
    index: "04",
    title: "Machine Learning & Data Science",
    items: [
      {
        slug: "python",
        name: "Python",
        monogram: "PY",
        index: "04.01",
        description: {
          en: "Used for data processing, machine learning experiments, and model-serving workflows.",
          id: "Digunakan untuk pemrosesan data, eksperimen machine learning, dan workflow penyajian model.",
        },
      },
      {
        slug: "scikit-learn",
        name: "Scikit-learn",
        monogram: "SK",
        index: "04.02",
        description: {
          en: "Used to preprocess data, train classification models, and evaluate model performance.",
          id: "Digunakan untuk preprocessing data, training model klasifikasi, dan evaluasi performa model.",
        },
      },
      {
        slug: "pandas",
        name: "Pandas",
        monogram: "PD",
        index: "04.03",
        description: {
          en: "Used to clean, transform, analyze, and organize structured data.",
          id: "Digunakan untuk membersihkan, mengubah, menganalisis, dan menyusun data terstruktur.",
        },
      },
      {
        slug: "transformers",
        name: "Hugging Face Transformers",
        monogram: "HF",
        index: "04.04",
        description: {
          en: "Used to load and run pretrained transformer models in AI workflows.",
          id: "Digunakan untuk memuat dan menjalankan pretrained transformer model dalam workflow AI.",
        },
      },
      {
        slug: "wav2vec2",
        name: "Wav2Vec2",
        monogram: "W2V",
        index: "04.05",
        description: {
          en: "Used as a pretrained speech recognition model for audio transcription workflows.",
          id: "Digunakan sebagai pretrained speech recognition model dalam workflow transkripsi audio.",
        },
      },
      {
        slug: "smote",
        name: "SMOTE",
        monogram: "SM",
        index: "04.06",
        description: {
          en: "Used to address class imbalance during classification model training.",
          id: "Digunakan untuk menangani class imbalance dalam proses training model klasifikasi.",
        },
      },
    ],
  },
  {
    id: "testing-deployment",
    code: "05 // DEPLOYMENT",
    index: "05",
    title: "Testing & Deployment",
    items: [
      {
        slug: "katalon-studio",
        name: "Katalon Studio",
        monogram: "KS",
        index: "05.01",
        description: {
          en: "Used to automate functional testing for important web application workflows.",
          id: "Digunakan untuk mengotomatisasi functional testing pada workflow utama aplikasi web.",
        },
      },
      {
        slug: "playwright",
        name: "Playwright",
        monogram: "PW",
        index: "05.02",
        description: {
          en: "Used for end-to-end browser testing and verification of user interface flows.",
          id: "Digunakan untuk end-to-end browser testing dan verifikasi alur antarmuka pengguna.",
        },
      },
      {
        slug: "docker",
        name: "Docker",
        monogram: "DK",
        index: "05.03",
        description: {
          en: "Used to package applications and services into consistent deployment environments.",
          id: "Digunakan untuk mengemas aplikasi dan service ke dalam environment deployment yang konsisten.",
        },
      },
      {
        slug: "linux-ubuntu",
        name: "Linux Ubuntu",
        monogram: "LX",
        index: "05.04",
        description: {
          en: "Used as a deployment environment for web applications and machine learning services.",
          id: "Digunakan sebagai environment deployment untuk aplikasi web dan machine learning service.",
        },
      },
      {
        slug: "nginx",
        name: "Nginx",
        monogram: "NG",
        index: "05.05",
        description: {
          en: "Used to route web traffic and serve applications in production environments.",
          id: "Digunakan untuk mengatur traffic web dan menjalankan aplikasi pada environment production.",
        },
      },
      {
        slug: "github",
        name: "GitHub",
        monogram: "GH",
        index: "05.06",
        description: {
          en: "Used to manage repositories, track code changes, and maintain project history.",
          id: "Digunakan untuk mengelola repository, melacak perubahan kode, dan menyimpan riwayat project.",
        },
      },
    ],
  },
  {
    id: "design-other",
    code: "06 // DESIGN",
    index: "06",
    title: "Design & Other",
    items: [
      {
        slug: "figma",
        name: "Figma",
        monogram: "FG",
        index: "06.01",
        description: {
          en: "Used to design interfaces, wireframes, user flows, and interactive prototypes.",
          id: "Digunakan untuk merancang antarmuka, wireframe, user flow, dan interactive prototype.",
        },
      },
      {
        slug: "unity",
        name: "Unity",
        monogram: "UN",
        index: "06.02",
        description: {
          en: "Used to develop C# applications with interaction, navigation, and scene management.",
          id: "Digunakan untuk mengembangkan aplikasi berbasis C# dengan sistem interaksi, navigasi, dan scene management.",
        },
      },
      {
        slug: "lumion-pro",
        name: "Lumion Pro",
        monogram: "LM",
        index: "06.03",
        description: {
          en: "Used to prepare and render architectural visuals and 360-degree panoramas.",
          id: "Digunakan untuk menyiapkan dan merender visual arsitektur serta panorama 360 derajat.",
        },
      },
      {
        slug: "google-colab",
        name: "Google Colab",
        monogram: "GC",
        index: "06.04",
        description: {
          en: "Used as a notebook environment for Python-based machine learning workflows.",
          id: "Digunakan sebagai notebook environment untuk workflow machine learning berbasis Python.",
        },
      },
      {
        slug: "visual-studio-code",
        name: "Visual Studio Code",
        monogram: "VS",
        index: "06.05",
        description: {
          en: "Used as a development editor across web, mobile, Python, and Unity projects.",
          id: "Digunakan sebagai development editor untuk project web, mobile, Python, dan Unity.",
        },
      },
    ],
  },
];