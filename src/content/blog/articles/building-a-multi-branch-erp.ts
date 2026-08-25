import type { BlogArticle } from "../article-types";

export const multiBranchErpArticle: BlogArticle = {
  index: "01",
  slug: "building-a-multi-branch-erp-from-workflow-to-production",
  category: {
    en: "Full-Stack Systems",
    id: "Sistem Full-Stack",
  },
  title: {
    en: "Building a Multi-Branch ERP from Workflow to Production",
    id: "Membangun ERP Multi-Cabang dari Workflow hingga Production",
  },
  abstract: {
    en: "How UKG System moved from operational analysis to an integrated Next.js and NestJS application for two roles, eight module groups, and multiple branches.",
    id: "Bagaimana UKG System bergerak dari analisis operasional menuju aplikasi Next.js dan NestJS terintegrasi untuk dua peran, delapan kelompok modul, dan banyak cabang.",
  },
  tags: ["Next.js", "NestJS", "ERP", "Katalon Studio", "Ubuntu"],
  sourceProjectSlugs: ["ukg-system"],
  projectPeriod: {
    en: "Project period: January - March 2026",
    id: "Periode proyek: Januari - Maret 2026",
  },
  sections: [
    {
      id: "workflow-first",
      title: {
        en: "Start with the operating workflow",
        id: "Mulai dari workflow operasional",
      },
      blocks: [
        {
          type: "prose",
          paragraphs: {
            en: [
              "UKG System was built for CV Universal Kharisma Globalindo as a multi-branch ERP web application. My scope as Fullstack Developer started before the interface and continued through production deployment. It included requirements analysis, UI and UX work in Figma, a Next.js frontend, a NestJS backend, REST endpoints, business logic, quality assurance, and deployment to an Ubuntu VPS.",
              "The useful starting point was not a page list. It was the movement of work through the business. Stock can be requested, approved, received, sold, and returned. Attendance belongs to a branch. Operational costs and sales records need the same branch and period context. Mapping those relationships first gave the application a clearer structure than treating each screen as an isolated CRUD task.",
            ],
            id: [
              "UKG System dibangun untuk CV Universal Kharisma Globalindo sebagai aplikasi ERP web multi-cabang. Lingkup pekerjaan saya sebagai Fullstack Developer dimulai sebelum pembuatan antarmuka dan berlanjut sampai deployment production. Pekerjaan tersebut mencakup analisis kebutuhan, UI dan UX di Figma, frontend Next.js, backend NestJS, endpoint REST, business logic, quality assurance, serta deployment ke VPS Ubuntu.",
              "Titik awal yang berguna bukanlah daftar halaman, melainkan pergerakan pekerjaan di dalam bisnis. Stok dapat diajukan, disetujui, diterima, dijual, lalu dikembalikan. Presensi terikat pada cabang. Biaya operasional dan catatan penjualan memerlukan konteks cabang serta periode yang sama. Memetakan hubungan tersebut lebih dahulu memberi struktur aplikasi yang lebih jelas daripada memperlakukan setiap layar sebagai pekerjaan CRUD terpisah.",
            ],
          },
        },
        {
          type: "list",
          style: "unordered",
          items: {
            en: [
              "Two primary roles: Owner and Employee.",
              "Eight module groups covering access, branches and attendance, inventory, stock orders, store operations, cashier and sales, finance and reports, plus dashboards.",
              "Branch-aware records and permissions across the operational workflow.",
            ],
            id: [
              "Dua peran utama: Owner dan Karyawan.",
              "Delapan kelompok modul yang mencakup akses, cabang dan presensi, inventaris, order stok, operasional toko, kasir dan penjualan, keuangan dan laporan, serta dashboard.",
              "Catatan dan izin akses yang memahami konteks cabang di sepanjang workflow operasional.",
            ],
          },
        },
      ],
    },
    {
      id: "boundaries",
      title: {
        en: "Turn responsibilities into system boundaries",
        id: "Ubah tanggung jawab menjadi batas sistem",
      },
      blocks: [
        {
          type: "flow",
          items: {
            en: [
              "Operational requirement",
              "Role and branch scope",
              "Interface flow",
              "REST and business rules",
              "Shared records and reports",
            ],
            id: [
              "Kebutuhan operasional",
              "Cakupan peran dan cabang",
              "Alur antarmuka",
              "REST dan aturan bisnis",
              "Catatan bersama dan laporan",
            ],
          },
        },
        {
          type: "prose",
          paragraphs: {
            en: [
              "The Owner needs broader cross-branch visibility, while Employee access follows the operational work assigned to that role. That distinction affects more than navigation. It shapes which records are available, which actions require approval, and how reports are filtered.",
              "The frontend therefore had to express state and permission clearly, while the backend enforced the same workflow through NestJS business logic and REST APIs. Keeping those two views aligned mattered because hiding an action in the interface is not a replacement for enforcing its rule in the system.",
            ],
            id: [
              "Owner memerlukan visibilitas lintas cabang yang lebih luas, sedangkan akses Karyawan mengikuti pekerjaan operasional yang ditetapkan untuk peran tersebut. Perbedaan ini tidak hanya memengaruhi navigasi. Perbedaan tersebut menentukan catatan yang tersedia, tindakan yang memerlukan persetujuan, dan cara laporan difilter.",
              "Frontend perlu menyampaikan status dan izin akses dengan jelas, sementara backend menegakkan workflow yang sama melalui business logic NestJS dan REST API. Menjaga kedua pandangan tersebut tetap selaras penting karena menyembunyikan tindakan di antarmuka bukanlah pengganti penerapan aturan pada sistem.",
            ],
          },
        },
        {
          type: "figure",
          src: "/assets/projects/ukg-system/documentation/01.webp",
          format: "wide",
          alt: {
            en: "UKG System production interface showing operational information",
            id: "Antarmuka production UKG System yang menampilkan informasi operasional",
          },
          caption: {
            en: "A documented operational view from the delivered UKG System application.",
            id: "Tampilan operasional terdokumentasi dari aplikasi UKG System yang telah dikirim.",
          },
        },
      ],
    },
    {
      id: "coupled-records",
      title: {
        en: "Design for changes that cross modules",
        id: "Rancang perubahan yang melintasi modul",
      },
      blocks: [
        {
          type: "prose",
          paragraphs: {
            en: [
              "An ERP becomes meaningful where modules affect one another. In UKG System, a sales transaction changes inventory. Cancelling that transaction restores the affected stock according to the implemented workflow. Stock requests connect employees, owner approval, incoming items, and branch inventory. Operational and sales records then become inputs for reports and dashboard summaries.",
              "These connections are where implementation discipline matters. A locally correct screen can still produce a globally incorrect record if the related stock, approval, or reporting path is ignored. I treated the cross-module workflow as part of the feature itself, not as integration work to be added later.",
            ],
            id: [
              "ERP menjadi bermakna ketika satu modul memengaruhi modul lain. Di UKG System, transaksi penjualan mengubah inventaris. Pembatalan transaksi mengembalikan stok yang terkait sesuai workflow yang diterapkan. Pengajuan stok menghubungkan karyawan, persetujuan owner, barang masuk, dan inventaris cabang. Catatan operasional serta penjualan kemudian menjadi input untuk laporan dan ringkasan dashboard.",
              "Hubungan ini membutuhkan disiplin implementasi. Sebuah layar dapat bekerja benar secara lokal, tetapi tetap menghasilkan catatan yang salah secara keseluruhan apabila jalur stok, persetujuan, atau laporan yang terkait diabaikan. Saya memperlakukan workflow lintas modul sebagai bagian dari fitur, bukan sebagai pekerjaan integrasi yang ditambahkan belakangan.",
            ],
          },
        },
        {
          type: "note",
          label: {
            en: "Technical note",
            id: "Catatan teknis",
          },
          text: {
            en: "The source record documents the workflow and production status, but it does not provide measured efficiency gains, test coverage, pass rates, or business-impact percentages.",
            id: "Catatan sumber mendokumentasikan workflow dan status production, tetapi tidak menyediakan angka peningkatan efisiensi, test coverage, pass rate, atau persentase dampak bisnis.",
          },
        },
      ],
    },
    {
      id: "production",
      title: {
        en: "Carry the workflow through production",
        id: "Bawa workflow sampai production",
      },
      blocks: [
        {
          type: "list",
          style: "ordered",
          items: {
            en: [
              "Design the role and branch flows in Figma.",
              "Implement the Next.js interface and NestJS application logic.",
              "Validate primary flows, permissions, and module integration with manual and automated testing in Katalon Studio.",
              "Prepare the Ubuntu VPS environment, configure the production domain, and take the system live.",
            ],
            id: [
              "Rancang alur peran dan cabang di Figma.",
              "Implementasikan antarmuka Next.js dan logika aplikasi NestJS.",
              "Validasi alur utama, izin akses, dan integrasi modul melalui pengujian manual serta otomatis di Katalon Studio.",
              "Siapkan environment VPS Ubuntu, konfigurasi domain production, lalu lakukan go-live sistem.",
            ],
          },
        },
        {
          type: "prose",
          paragraphs: {
            en: [
              "The project period ran from January through March 2026. After go-live, the system remained in use for business operations. The main engineering lesson is simple: for an integrated operational product, delivery is one continuous chain from workflow analysis to production verification.",
            ],
            id: [
              "Periode proyek berlangsung dari Januari hingga Maret 2026. Setelah go-live, sistem tetap digunakan untuk operasional bisnis. Pelajaran rekayasa utamanya sederhana: untuk produk operasional yang terintegrasi, delivery merupakan satu rangkaian berkelanjutan dari analisis workflow sampai verifikasi production.",
            ],
          },
        },
      ],
    },
  ],
};
