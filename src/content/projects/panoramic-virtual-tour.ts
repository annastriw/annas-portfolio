import type { ProjectItem } from "./types";

export const panoramicVirtualTourProject: ProjectItem = {
  slug: "panoramic-virtual-tour",
  category: "other",
  order: 10,
  featured: false,
  title: {
    en: "Panoramic Virtual Tour",
    id: "Panoramic Virtual Tour",
  },
  subtitle: {
    en: "Interactive 360° WebGL Campus Facilities Exploration",
    id: "Eksplorasi Fasilitas Kampus Interaktif 360° Berbasis WebGL",
  },
  projectType: {
    en: "Interactive 3D / 360° WebGL Panoramic Viewer",
    id: "Aplikasi 3D Interaktif / Penampil Panorama 360° WebGL",
  },
  role: {
    en: "Frontend & 3D Interactive Developer",
    id: "Frontend & 3D Interactive Developer",
  },
  stakeholder: {
    en: "Faculty of Engineering, Diponegoro University",
    id: "Fakultas Teknik, Universitas Diponegoro",
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
    en: "An interactive browser-based 360° virtual tour application that renders immersive equirectangular panoramas of campus facilities using Three.js and Panolens.js with navigational hotspots and spatial information modals.",
    id: "Aplikasi virtual tour 360° berbasis peramban web yang merender panorama ekuirektangular fasilitas kampus menggunakan Three.js dan Panolens.js dengan hotspot navigasi interaktif dan informasi spasial.",
  },
  problemStatement: {
    en: "Prospective students and external visitors lacked an intuitive, immersive way to explore engineering faculty laboratories and building facilities remotely.",
    id: "Calon mahasiswa dan pengunjung eksternal membutuhkan media interaktif yang imersif untuk menjelajahi laboratorium dan fasilitas gedung Fakultas Teknik secara daring.",
  },
  systemSolution: {
    en: "Developed a lightweight WebGL viewer that streams high-resolution 360° photographic spheres, manages scene transitions through interactive floor plan hotspots, and renders contextual facility details.",
    id: "Membangun penampil WebGL ringan untuk memuat foto panorama 360° resolusi tinggi, mengelola transisi antarlokasi melalui hotspot titik navigasi, dan menampilkan detail informasi ruangan.",
  },
  personalContributions: {
    en: [
      "Engineered WebGL panorama rendering pipeline using Three.js and Panolens.js library.",
      "Developed interactive navigational hotspots allowing users to transition seamlessly between rooms.",
      "Optimized panoramic image assets to ensure fast initial load and smooth 60fps rotation performance on mobile browsers.",
    ],
    id: [
      "Mengembangkan pipeline rendering panorama WebGL menggunakan Three.js dan pustaka Panolens.js.",
      "Membangun titik hotspot interaktif untuk transisi navigasi antarruangan secara mulus.",
      "Mengoptimalkan aset foto panorama 360° agar waktu muat awal cepat dan rotasi berjalan 60fps di peramban seluler.",
    ],
  },
  verifiedEvidence: {
    en: [
      "Demonstrated smooth 360-degree pan, tilt, and zoom controls across modern desktop and touch viewports.",
      "Verified scene transition routing across multiple interconnected faculty laboratory areas.",
    ],
    id: [
      "Menguji kontrol interaksi putar 360 derajat, tilt, dan zoom pada peramban desktop maupun layar sentuh.",
      "Memvalidasi transisi navigasi antarlokasi pada beberapa area laboratorium fakultas yang terhubung.",
    ],
  },
  techStack: {
    core: ["JavaScript", "Three.js", "Panolens.js", "WebGL", "HTML5 Canvas", "CSS3"],
    architecture: ["Spherical Geometry Mapping", "Event-Driven Hotspot Routing", "Responsive Canvas"],
    qaOrDeployment: ["WebGL Context Fallbacks", "Image Compression Pipeline", "Git Workflow"],
  },
  coverImage: "/assets/projects/panoramic-virtual-tour/cover.webp",
  documentationImages: [
    "/assets/projects/panoramic-virtual-tour/documentation/01.webp",
    "/assets/projects/panoramic-virtual-tour/documentation/02.webp",
    "/assets/projects/panoramic-virtual-tour/documentation/03.webp",
    "/assets/projects/panoramic-virtual-tour/documentation/04.webp",
    "/assets/projects/panoramic-virtual-tour/documentation/05.webp",
    "/assets/projects/panoramic-virtual-tour/documentation/06.webp",
    "/assets/projects/panoramic-virtual-tour/documentation/07.webp",
  ],
};
