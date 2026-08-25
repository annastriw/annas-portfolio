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
      id: "system-printing",
      title: {
        en: "Begin inside Android's printing workflow",
        id: "Mulai dari workflow printing Android",
      },
      blocks: [
        {
          type: "prose",
          paragraphs: {
            en: [
              "Thermal Printer Service is a native Kotlin application built around Android Print Framework. A custom PrintService receives print jobs, while PrinterDiscoverySession makes the managed printer available through Android's system printing flow. The application does not ask every source app to understand ESC/POS or Bluetooth.",
              "That choice defines a useful boundary. Android supplies a document through its normal print path. The service then owns the conversion from a temporary PDF to bytes that a selected Bluetooth thermal printer can consume. The integration is specific to the documented 58 mm and 80 mm configurations and does not establish compatibility with every printer.",
            ],
            id: [
              "Thermal Printer Service adalah aplikasi native Kotlin yang dibangun di atas Android Print Framework. Custom PrintService menerima print job, sedangkan PrinterDiscoverySession membuat printer yang dikelola tersedia melalui alur printing sistem Android. Aplikasi sumber tidak perlu memahami ESC/POS atau Bluetooth satu per satu.",
              "Pilihan tersebut membentuk batas yang berguna. Android menyediakan dokumen melalui jalur print normal. Layanan kemudian menangani konversi dari PDF sementara menjadi byte yang dapat diterima printer termal Bluetooth terpilih. Integrasi ini khusus untuk konfigurasi 58 mm dan 80 mm yang terdokumentasi dan tidak menetapkan kompatibilitas dengan setiap printer.",
            ],
          },
        },
        {
          type: "figure",
          src: "/assets/projects/thermal-printer-service/documentation/01.webp",
          format: "mobile",
          alt: {
            en: "Thermal Printer Service Android interface for printer setup",
            id: "Antarmuka Android Thermal Printer Service untuk pengaturan printer",
          },
          caption: {
            en: "The native Android interface manages the printer setup used by the system PrintService.",
            id: "Antarmuka native Android mengelola pengaturan printer yang digunakan oleh PrintService sistem.",
          },
        },
      ],
    },
    {
      id: "raster-pipeline",
      title: {
        en: "The document becomes an image pipeline",
        id: "Dokumen berubah menjadi pipeline gambar",
      },
      blocks: [
        {
          type: "flow",
          items: {
            en: [
              "Android document",
              "Temporary PDF",
              "PdfRenderer bitmap",
              "Crop, scale, and align",
              "Monochrome conversion",
              "24-dot ESC/POS raster",
              "Chunked Bluetooth transmission",
            ],
            id: [
              "Dokumen Android",
              "PDF sementara",
              "Bitmap dari PdfRenderer",
              "Crop, scale, dan alignment",
              "Konversi monokrom",
              "Raster ESC/POS 24-dot",
              "Transmisi Bluetooth per chunk",
            ],
          },
        },
        {
          type: "prose",
          paragraphs: {
            en: [
              "PdfRenderer turns each PDF page into a bitmap. Before encoding, the service removes unnecessary whitespace, scales the image to the configured printable width, centers it, applies horizontal offset compensation, adds bottom padding, and converts the result to monochrome. Those transformations are not decorative image processing. They determine how the original page fits a narrow physical medium.",
              "The processed bitmap is encoded as 24-dot double-density ESC/POS raster data. The service then writes that data through Bluetooth RFCOMM and Serial Port Profile in chunks no larger than 1,024 bytes. Keeping rendering, raster encoding, and transport as separate responsibilities makes the pipeline easier to reason about and calibrate.",
            ],
            id: [
              "PdfRenderer mengubah setiap halaman PDF menjadi bitmap. Sebelum encoding, layanan membuang whitespace yang tidak diperlukan, menyesuaikan skala gambar dengan printable width, memusatkan gambar, menerapkan kompensasi horizontal offset, menambahkan bottom padding, dan mengubah hasilnya menjadi monokrom. Transformasi tersebut bukan pemrosesan gambar dekoratif. Semua tahap menentukan cara halaman asli masuk ke media fisik yang sempit.",
              "Bitmap yang telah diproses di-encode sebagai data raster ESC/POS double-density 24-dot. Layanan kemudian menulis data tersebut melalui Bluetooth RFCOMM dan Serial Port Profile dalam chunk tidak lebih dari 1.024 bytes. Pemisahan rendering, raster encoding, dan transport membuat pipeline lebih mudah dipahami serta dikalibrasi.",
            ],
          },
        },
      ],
    },
    {
      id: "physical-configuration",
      title: {
        en: "Physical dimensions belong in configuration",
        id: "Dimensi fisik perlu masuk ke konfigurasi",
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
              "The service stores printer-specific settings in reusable profiles. Eight documented attributes cover identity, name, Bluetooth address, paper width, scale, automatic cutting, horizontal offset, and bottom padding. Profiles are serialized as JSON in SharedPreferences and managed through a RecyclerView interface.",
              "This is also where calibration becomes a product feature. The active profile decides which Bluetooth device and physical layout settings are used for a job. A different paper width or offset should not require changes to the document source or the core pipeline.",
            ],
            id: [
              "Layanan menyimpan pengaturan khusus printer dalam profil reusable. Delapan atribut terdokumentasi mencakup identitas, nama, alamat Bluetooth, lebar kertas, scale, pemotongan otomatis, horizontal offset, dan bottom padding. Profil diserialisasi sebagai JSON di SharedPreferences dan dikelola melalui antarmuka RecyclerView.",
              "Di sinilah kalibrasi menjadi fitur produk. Profil aktif menentukan perangkat Bluetooth dan pengaturan layout fisik yang digunakan oleh sebuah job. Perbedaan lebar kertas atau offset tidak perlu mengubah sumber dokumen maupun pipeline inti.",
            ],
          },
        },
      ],
    },
    {
      id: "connection-lifecycle",
      title: {
        en: "Treat printing as a cancellable lifecycle",
        id: "Perlakukan printing sebagai lifecycle yang dapat dibatalkan",
      },
      blocks: [
        {
          type: "list",
          style: "ordered",
          items: {
            en: [
              "Check Bluetooth support, state, and Android 12 or newer runtime permissions.",
              "Require an active printer profile and an available source document.",
              "Open the Bluetooth socket with four documented attempts using 0, 200, 500, and 1,000 ms backoff delays.",
              "Run the print job on a dedicated single-thread executor and observe its cancellation token.",
              "Clean up the socket when the job completes, fails, or is cancelled.",
            ],
            id: [
              "Periksa dukungan Bluetooth, status Bluetooth, dan runtime permission Android 12 atau lebih baru.",
              "Pastikan profil printer aktif dan dokumen sumber tersedia.",
              "Buka socket Bluetooth dengan empat percobaan terdokumentasi menggunakan jeda backoff 0, 200, 500, dan 1.000 ms.",
              "Jalankan print job pada dedicated single-thread executor dan amati cancellation token.",
              "Bersihkan socket ketika job selesai, gagal, atau dibatalkan.",
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
              "The resulting service is less about sending a few printer commands and more about preserving a dependable boundary between Android documents and constrained hardware. Every stage, from raster dimensions to cancellation and cleanup, belongs to that boundary.",
            ],
            id: [
              "Layanan yang dihasilkan bukan sekadar mengirim beberapa perintah printer, melainkan menjaga batas yang dapat diandalkan antara dokumen Android dan hardware dengan keterbatasan fisik. Setiap tahap, dari dimensi raster sampai pembatalan dan cleanup, menjadi bagian dari batas tersebut.",
            ],
          },
        },
      ],
    },
  ],
};
