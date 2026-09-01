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
      en: "A multi-branch ERP developed end-to-end for CV Universal Kharisma Globalindo, covering operational workflows, automated testing, and production deployment.",
      id: "ERP multi-cabang yang dikembangkan secara end-to-end untuk CV Universal Kharisma Globalindo, mencakup workflow operasional, automated testing, dan deployment ke production.",
    },
    technologies: [
      "Next.js",
      "NestJS",
      "TypeScript",
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
      en: "A machine learning prototype for exploring heart attack risk prediction, with model inference served through a Flask API. Built for experimentation, not medical diagnosis.",
      id: "Prototype machine learning untuk mengeksplorasi prediksi risiko serangan jantung, dengan inferensi model melalui Flask API. Dikembangkan untuk eksperimen, bukan diagnosis medis.",
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
      en: "Junior Game Developer",
      id: "Junior Game Developer",
    },
    status: {
      en: "Completed Prototype",
      id: "Completed Prototype",
    },
    summary: {
      en: "A Unity-based virtual tour developed during an internship at PT Duta Basis Dataprima, combining architectural panoramas with hotspot navigation.",
      id: "Virtual tour berbasis Unity yang dikembangkan saat magang di PT Duta Basis Dataprima, menggabungkan panorama arsitektur dengan navigasi hotspot.",
    },
    technologies: [
      "Unity",
      "C#",
      "Lumion Pro",
      "360° Panorama",
      "Physics Raycast",
      "Scene Management",
    ],
    coverImage: "/assets/projects/panoramic-virtual-tour/cover.webp",
    coverAlt: {
      en: "Panoramic Virtual Tour Unity prototype opening scene",
      id: "Scene pembuka prototype Panoramic Virtual Tour Unity",
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
