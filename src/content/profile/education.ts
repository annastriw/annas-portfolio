import type { Locale } from "@/lib/i18n/config";

export interface EducationRecord {
  institution: Record<Locale, string>;
  degree: Record<Locale, string>;
  fieldOfStudy: Record<Locale, string>;
  period: Record<Locale, string>;
  gpa: string;
  positioning: Record<Locale, string>;
  location: Record<Locale, string>;
  certificateAsset: string;
}

export const academicEducation: EducationRecord = {
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
