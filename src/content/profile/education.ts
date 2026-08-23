import type { Locale } from "@/lib/i18n/config";

export interface EducationRecord {
  institution: Record<Locale, string>;
  degree: Record<Locale, string>;
  fieldOfStudy: Record<Locale, string>;
  period: string;
  location: string;
  highlights: Record<Locale, string[]>;
}

export const academicEducation: EducationRecord = {
  institution: {
    en: "Diponegoro University (Universitas Diponegoro)",
    id: "Universitas Diponegoro",
  },
  degree: {
    en: "Bachelor of Engineering (S.T.)",
    id: "Sarjana Teknik (S.T.)",
  },
  fieldOfStudy: {
    en: "Computer Engineering (Teknik Komputer)",
    id: "Teknik Komputer",
  },
  period: "2020 — 2024",
  location: "Semarang, Central Java, Indonesia",
  highlights: {
    en: [
      "Graduated with Bachelor of Engineering in Computer Engineering.",
      "Specialized in Software Systems Engineering, Applied Machine Learning, and Computer Networks.",
      "Conducted thesis research in applied machine learning risk prediction systems.",
      "Active contributor in institutional developer initiatives at Faculty of Engineering.",
    ],
    id: [
      "Lulus Sarjana Teknik pada Departemen Teknik Komputer Universitas Diponegoro.",
      "Peminatan pada Rekayasa Perangkat Lunak, Terapan Machine Learning, dan Jaringan Komputer.",
      "Melakukan riset tugas akhir dalam sistem klasifikasi inferensi machine learning.",
      "Berkontribusi aktif pada inisiatif pengembangan sistem Tim Developer IT Fakultas Teknik.",
    ],
  },
};
