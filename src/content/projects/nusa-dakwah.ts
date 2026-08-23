import type { ProjectItem } from "./types";

export const nusaDakwahProject: ProjectItem = {
  slug: "nusa-dakwah",
  category: "web-app",
  order: 4,
  featured: false,
  title: {
    en: "Nusa Dakwah",
    id: "Nusa Dakwah",
  },
  subtitle: {
    en: "Islamic Da'wah Content Portal & Educational Media Hub",
    id: "Portal Konten Dakwah Islam & Pusat Media Edukasi",
  },
  projectType: {
    en: "Web Application / Content Management & Publishing Hub",
    id: "Aplikasi Web / Portal Manajemen Konten & Publikasi Dakwah",
  },
  role: {
    en: "Full-Stack Web Developer",
    id: "Full-Stack Web Developer",
  },
  stakeholder: {
    en: "Community Da'wah Initiative",
    id: "Inisiatif Komunitas Dakwah",
  },
  period: {
    en: "2024",
    id: "2024",
  },
  status: {
    en: "Completed",
    id: "Selesai",
  },
  summary: {
    en: "A responsive content publishing portal and multimedia repository designed for structured article distribution, lecture schedules, and multi-category educational resources.",
    id: "Portal publikasi konten responsif dan repositori multimedia untuk distribusi artikel terstruktur, jadwal kajian, dan sumber edukasi keagamaan lintas kategori.",
  },
  problemStatement: {
    en: "Community educational materials and lecture announcements were scattered across multiple social channels without an easily searchable, permanent digital archive.",
    id: "Materi edukasi dan pengumuman kajian komunitas tersebar di berbagai saluran media sosial tanpa adanya repositori terpadu yang mudah dicari dan diakses publik.",
  },
  systemSolution: {
    en: "Engineered a content platform with responsive typographic layout, categorised article taxonomies, media embeds, and an intuitive administrative publishing dashboard.",
    id: "Mengembangkan platform konten dengan tipografi responsif, taksonomi artikel terstruktur, sematan media audio/video, dan dasbor redaksi admin yang intuitif.",
  },
  personalContributions: {
    en: [
      "Architected relational database schema for categorized posts, authors, and multimedia assets.",
      "Implemented responsive frontend layout optimized for reading comfort and fast content delivery.",
      "Developed administrative CRUD interface for editorial workflow management.",
    ],
    id: [
      "Merancang skema basis data relasional untuk artikel terkategori, data penulis, dan aset multimedia.",
      "Membangun tata letak frontend responsif yang dioptimalkan untuk kenyamanan membaca di berbagai perangkat.",
      "Mengembangkan antarmuka CRUD administrator untuk pengelolaan alur kerja editorial.",
    ],
  },
  verifiedEvidence: {
    en: [
      "Delivered full-featured content management portal with rich-text publishing capabilities.",
      "Verified fast page rendering and clean editorial hierarchy across mobile and desktop viewports.",
    ],
    id: [
      "Menyelesaikan portal manajemen konten lengkap dengan fitur publikasi teks kaya dan multimedia.",
      "Memverifikasi kecepatan muat dan hierarki editorial yang bersih pada seluruh ukuran layar.",
    ],
  },
  techStack: {
    core: ["Laravel", "PHP", "MySQL", "JavaScript", "Tailwind CSS"],
    architecture: ["MVC Pattern", "RESTful Routing", "Responsive Grid Layout"],
    qaOrDeployment: ["Form Validation", "Asset Optimization", "Git Workflow"],
  },
  coverImage: "/assets/projects/nusa-dakwah/cover.webp",
  documentationImages: [
    "/assets/projects/nusa-dakwah/documentation/01.webp",
    "/assets/projects/nusa-dakwah/documentation/02.webp",
    "/assets/projects/nusa-dakwah/documentation/03.webp",
    "/assets/projects/nusa-dakwah/documentation/04.webp",
    "/assets/projects/nusa-dakwah/documentation/05.webp",
    "/assets/projects/nusa-dakwah/documentation/06.webp",
  ],
};
