import type { Locale } from "@/lib/i18n/config";

export interface HomeSelectedProject {
  readonly index: string;
  readonly slug: string;
  readonly title: Record<Locale, string>;
  readonly role: Record<Locale, string>;
  readonly status: Record<Locale, string>;
  readonly summary: Record<Locale, string>;
  readonly technologies: readonly string[];
  readonly coverImage: string;
  readonly coverAlt: Record<Locale, string>;
}

export const homeSelectedProjects: readonly HomeSelectedProject[] = [
  {
    index: "01",
    slug: "ukg-system",
    title: {
      en: "UKG System",
      id: "UKG System",
    },
    role: {
      en: "Full-Stack Web Developer",
      id: "Full-Stack Web Developer",
    },
    status: {
      en: "Live Production",
      id: "Live Production",
    },
    summary: {
      en: "A multi-branch ERP developed end to end to centralize inventory, sales, and daily operations for remote monitoring.",
      id: "ERP multi-cabang yang dikembangkan secara end-to-end untuk memusatkan data stok, penjualan, dan operasional agar dapat dipantau dari mana saja.",
    },
    technologies: [
      "Figma",
      "Next.js",
      "NestJS",
      "MySQL",
      "Katalon Studio",
      "Linux Ubuntu",
    ],
    coverImage: "/assets/projects/ukg-system/cover.webp",
    coverAlt: {
      en: "UKG System multi-branch ERP administration dashboard",
      id: "Dashboard administrasi ERP multi-cabang UKG System",
    },
  },
  {
    index: "02",
    slug: "ihealth-edu",
    title: {
      en: "iHealth Edu",
      id: "iHealth Edu",
    },
    role: {
      en: "Frontend Web Developer",
      id: "Frontend Web Developer",
    },
    status: {
      en: "Live Production",
      id: "Live Production",
    },
    summary: {
      en: "A health education and screening platform developed with Puskesmas Padangsari, bringing patient records, IoT health data, and machine learning decision support into one system.",
      id: "Platform edukasi dan screening kesehatan yang dikembangkan bersama Puskesmas Padangsari, dengan data pasien, data kesehatan dari IoT, dan machine learning decision support dalam satu sistem.",
    },
    technologies: [
      "Figma",
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "REST API",
    ],
    coverImage: "/assets/projects/ihealth-edu/cover.webp",
    coverAlt: {
      en: "iHealth Edu health education and screening interface",
      id: "Antarmuka edukasi dan screening kesehatan iHealth Edu",
    },
  },
  {
    index: "03",
    slug: "ml-for-heart-attack-risk-prediction",
    title: {
      en: "Heart Attack Risk Prediction",
      id: "Heart Attack Risk Prediction",
    },
    role: {
      en: "Machine Learning Engineer",
      id: "Machine Learning Engineer",
    },
    status: {
      en: "Completed Prototype",
      id: "Completed Prototype",
    },
    summary: {
      en: "A machine learning decision-support prototype integrated into iHealth Edu. The selected Random Forest model was evaluated on 158,355 records, achieved 71.93% accuracy and 0.8015 ROC-AUC, and was served through a Flask REST API.",
      id: "Prototype machine learning decision support yang terintegrasi dengan iHealth Edu. Model Random Forest terpilih dievaluasi menggunakan 158.355 data, menghasilkan accuracy 71,93% dan ROC-AUC 0,8015, lalu disajikan melalui Flask REST API.",
    },
    technologies: [
      "Python",
      "Scikit-learn",
      "Pandas",
      "SMOTE",
      "Flask",
      "Docker",
    ],
    coverImage: "/assets/projects/ml-for-heart-attack-risk-prediction/cover.webp",
    coverAlt: {
      en: "Structured patient input used by the heart attack risk prediction prototype",
      id: "Input pasien terstruktur untuk prototype prediksi risiko serangan jantung",
    },
  },
  {
    index: "04",
    slug: "panoramic-virtual-tour",
    title: {
      en: "Panoramic Virtual Tour",
      id: "Panoramic Virtual Tour",
    },
    role: {
      en: "Junior Game Developer Intern",
      id: "Junior Game Developer Intern",
    },
    status: {
      en: "Completed Prototype",
      id: "Completed Prototype",
    },
    summary: {
      en: "A Unity-based prototype that turns architectural panoramas into an interactive virtual tour with 360° viewing and hotspot navigation.",
      id: "Prototype berbasis Unity yang mengolah panorama arsitektur menjadi virtual tour interaktif dengan tampilan 360° dan navigasi hotspot.",
    },
    technologies: [
      "Unity",
      "C#",
      "Lumion Pro",
      "Physics Raycast",
      "Scene Management",
    ],
    coverImage: "/assets/projects/panoramic-virtual-tour/cover.webp",
    coverAlt: {
      en: "Panoramic Virtual Tour title screen and main menu over the 3D building facility landscape",
      id: "Layar judul dan menu utama Panoramic Virtual Tour dengan pemandangan lanskap fasilitas bangunan 3D",
    },
  },
] as const;

export interface HomeFeaturedConfig {
  slot1Slug: string;
  slot2Slug: string;
  slot3Slug: string;
  slot4Slug: string;
}

export const homeFeaturedConfig: HomeFeaturedConfig = {
  slot1Slug: "ukg-system",
  slot2Slug: "ihealth-edu",
  slot3Slug: "ml-for-heart-attack-risk-prediction",
  slot4Slug: "panoramic-virtual-tour",
};
