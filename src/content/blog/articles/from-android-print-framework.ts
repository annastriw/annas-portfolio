import type { BlogArticle } from "../article-types";

export const androidPrintFrameworkArticle: BlogArticle = {
  index: "03",
  slug: "from-android-print-framework-to-esc-pos",
  category: {
    en: "Android and Hardware",
    id: "Android dan Hardware",
  },
  title: {
    en: "From Android Print Framework to ESC/POS",
    id: "Dari Android Print Framework ke ESC/POS",
  },
  abstract: {
    en: "Inside a Kotlin PrintService that converts Android PDF jobs into calibrated monochrome raster data for selected 58 mm and 80 mm Bluetooth thermal printers.",
    id: "Di dalam PrintService Kotlin yang mengubah print job PDF Android menjadi data raster monokrom terkalibrasi untuk printer termal Bluetooth 58 mm dan 80 mm yang dipilih.",
  },
  tags: ["Kotlin", "Android", "PrintService", "Bluetooth", "ESC/POS"],
  sourceProjectSlugs: ["thermal-printer-service"],
  sections: [
    {
      id: "android-print-flow",
      title: {
        en: "Integrating with the Native Android Print Framework",
        id: "Integrasi dengan Android Print Framework Native",
      },
      blocks: [
        {
          type: "prose",
          paragraphs: {
            en: [
              "Thermal Printer Service is a native Android application built in Kotlin to bridge standard operating system printing with Bluetooth ESC/POS thermal receipt printers. Rather than forcing third-party mobile apps to implement proprietary Bluetooth drivers, the application creates a custom Android PrintService and registers a PrinterDiscoverySession.",
              "This architectural choice integrates thermal printing directly into the native Android print dialog. Any document dispatched through the standard Android print workflow is intercepted as a temporary PDF, allowing the service to manage page scaling, raster encoding, and Bluetooth transmission without requiring modification to the originating application.",
            ],
            id: [
              "Thermal Printer Service adalah aplikasi Android native yang dibangun dengan Kotlin untuk menjembatani alur pencetakan standar sistem operasi dengan printer struk termal Bluetooth berbasis ESC/POS. Alih-alih mewajibkan aplikasi pihak ketiga mengimplementasikan driver Bluetooth proprietary, aplikasi ini membangun custom PrintService Android dan mendaftarkan PrinterDiscoverySession.",
              "Pilihan arsitektur ini mengintegrasikan pencetakan termal langsung ke dalam dialog print native Android. Dokumen apa pun yang dikirim melalui workflow print standar Android diterima sebagai file PDF sementara, memungkinkan layanan menangani penyesuaian skala, encoding raster, dan transmisi Bluetooth tanpa perlu mengubah aplikasi sumber.",
            ],
          },
        },
        {
          type: "figure",
          src: "/assets/projects/thermal-printer-service/documentation/01.webp",
          format: "mobile",
          alt: {
            en: "Thermal Printer Service Android interface for printer setup and profile configuration",
            id: "Antarmuka Android Thermal Printer Service untuk pengaturan printer dan konfigurasi profil",
          },
          caption: {
            en: "Native Android configuration screen managing active printer profiles, offsets, and Bluetooth pairings.",
            id: "Layar konfigurasi Android native yang mengelola profil printer aktif, offset, dan pairing Bluetooth.",
          },
        },
      ],
    },
    {
      id: "pdf-rasterization",
      title: {
        en: "PDF Rendering and Geometric Bitmap Calibration",
        id: "Rendering PDF dan Kalibrasi Geometris Bitmap",
      },
      blocks: [
        {
          type: "metrics",
          items: [
            {
              label: { en: "58 mm printable width", id: "Printable width 58 mm" },
              value: "432 dots",
            },
            {
              label: { en: "80 mm printable width", id: "Printable width 80 mm" },
              value: "576 dots",
            },
            {
              label: { en: "Resolution", id: "Resolusi" },
              value: "203 DPI",
            },
            {
              label: { en: "Maximum write chunk", id: "Chunk write maksimum" },
              value: "1,024 bytes",
            },
          ],
        },
        {
          type: "prose",
          paragraphs: {
            en: [
              "When a print job is dispatched, Android passes a temporary PDF file to the PrintService. Using Android's native PdfRenderer, the application renders each PDF page into a high-density bitmap. Because standard document geometries rarely match thermal paper rolls, the rendering engine performs geometric transformations before raster encoding.",
              "The pipeline analyzes the rendered bitmap to crop unnecessary margin whitespace, centers the content, applies horizontal offset compensation, appends vertical bottom padding, and scales the image to match the printer head resolution (432 dots for 58 mm rolls or 576 dots for 80 mm rolls at 203 DPI). The adjusted bitmap is then converted into a binary monochrome format.",
            ],
            id: [
              "Saat print job dikirimkan, Android meneruskan file PDF sementara ke PrintService. Menggunakan PdfRenderer native Android, aplikasi merender setiap halaman PDF menjadi bitmap berdensitas tinggi. Karena geometri dokumen standar jarang sesuai dengan ukuran gulungan kertas termal, engine rendering menjalankan transformasi geometris sebelum encoding raster.",
              "Pipeline menganalisis bitmap hasil render untuk memotong margin whitespace yang tidak perlu, memusatkan konten, menerapkan kompensasi horizontal offset, menambahkan bottom padding vertikal, dan menyesuaikan skala gambar dengan resolusi head printer (432 dots untuk 58 mm atau 576 dots untuk 80 mm pada 203 DPI). Bitmap yang telah disesuaikan kemudian dikonversi menjadi format biner monokrom.",
            ],
          },
        },
      ],
    },
    {
      id: "esc-pos-encoding",
      title: {
        en: "Translating Monochrome Bitmaps to ESC/POS Raster",
        id: "Menerjemahkan Bitmap Monokrom ke Raster ESC/POS",
      },
      blocks: [
        {
          type: "flow",
          items: {
            en: [
              "Android Document",
              "Temporary PDF",
              "PdfRenderer Bitmap",
              "Whitespace Crop and Scale",
              "Monochrome Conversion",
              "24-Dot ESC/POS Raster",
              "Chunked Bluetooth Write",
            ],
            id: [
              "Dokumen Android",
              "PDF Sementara",
              "Bitmap PdfRenderer",
              "Crop Whitespace dan Skala",
              "Konversi Monokrom",
              "Raster ESC/POS 24-Dot",
              "Penulisan Bluetooth per Chunk",
            ],
          },
        },
        {
          type: "prose",
          paragraphs: {
            en: [
              "Thermal receipt printers do not interpret high-level typography; they require raw bit sequences sent via ESC/POS command protocol. The service encodes the monochrome bitmap into 24-dot double-density ESC/POS raster command structures, calculating line widths and byte alignments in memory.",
              "To accommodate multiple hardware units, the application persists printer configurations locally using SharedPreferences and JSON. Eight documented profile attributes (id, name, btAddress, paperMm, scale, autoCut, horizontalOffsetMm, and bottomPaddingMm) allow operators to switch configurations seamlessly using an editable RecyclerView list.",
            ],
            id: [
              "Printer struk termal tidak membaca tipografi tingkat tinggi; printer membutuhkan rangkaian bit mentah yang dikirim melalui protokol perintah ESC/POS. Layanan ini meng-encode bitmap monokrom menjadi struktur perintah raster ESC/POS double-density 24-dot, menghitung lebar baris dan perataan byte di memori.",
              "Untuk mengakomodasi berbagai perangkat hardware, aplikasi menyimpan konfigurasi printer secara lokal menggunakan SharedPreferences dan JSON. Delapan atribut profil terdokumentasi (id, name, btAddress, paperMm, scale, autoCut, horizontalOffsetMm, dan bottomPaddingMm) memungkinkan operator berganti konfigurasi secara fleksibel melalui daftar RecyclerView.",
            ],
          },
        },
      ],
    },
    {
      id: "bluetooth-edge-cases",
      title: {
        en: "Managing Bluetooth RFCOMM and Background Execution",
        id: "Mengelola Bluetooth RFCOMM dan Eksekusi Background",
      },
      blocks: [
        {
          type: "list",
          style: "ordered",
          items: {
            en: [
              "Verify Bluetooth hardware support, power state, and Android 12 or newer runtime permissions.",
              "Confirm availability of the active printer profile and source PDF payload.",
              "Open an RFCOMM SPP socket using a 4-step connection retry strategy with 0 ms, 200 ms, 500 ms, and 1,000 ms backoff intervals.",
              "Execute the print job inside a dedicated single-thread executor with CancellationToken awareness to keep the Android main thread responsive.",
              "Stream ESC/POS raster data in chunks up to 1,024 bytes, performing explicit socket cleanup upon job completion or cancellation.",
            ],
            id: [
              "Periksa dukungan hardware Bluetooth, status daya, dan runtime permission Android 12 atau lebih baru.",
              "Pastikan ketersediaan profil printer aktif dan payload dokumen PDF sumber.",
              "Buka socket RFCOMM SPP menggunakan strategi 4 kali connection attempt dengan jeda backoff 0 ms, 200 ms, 500 ms, dan 1.000 ms.",
              "Jalankan print job di dalam dedicated single-thread executor dengan pemantauan CancellationToken agar Android main thread tetap responsif.",
              "Kirim data raster ESC/POS dalam ukuran chunk hingga 1.024 bytes, dan lakukan socket cleanup eksplisit saat print job selesai atau dibatalkan.",
            ],
          },
        },
        {
          type: "note",
          label: {
            en: "Compatibility boundary",
            id: "Batas kompatibilitas",
          },
          text: {
            en: "The project documents selected Bluetooth ESC/POS workflows. It does not document a compatibility rate, support for every vendor, or a print-success benchmark.",
            id: "Proyek mendokumentasikan workflow Bluetooth ESC/POS terpilih. Proyek tidak mendokumentasikan tingkat kompatibilitas, dukungan untuk setiap vendor, atau benchmark keberhasilan print.",
          },
        },
        {
          type: "prose",
          paragraphs: {
            en: [
              "By isolating Android rendering, ESC/POS raster generation, and resilient Bluetooth socket lifecycle management into discrete modules, Thermal Printer Service delivers a dependable printing pipeline tailored to physical hardware realities.",
            ],
            id: [
              "Dengan memisahkan rendering Android, pembuatan raster ESC/POS, dan pengelolaan siklus hidup socket Bluetooth yang tangguh ke dalam modul-modul terpisah, Thermal Printer Service menghadirkan pipeline pencetakan yang andal sesuai realitas hardware fisik.",
            ],
          },
        },
      ],
    },
  ],
};
