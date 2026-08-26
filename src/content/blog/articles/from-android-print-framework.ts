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
        en: "Connecting Android to Bluetooth Thermal Printers",
        id: "Menghubungkan Android ke Printer Termal Bluetooth",
      },
      blocks: [
        {
          type: "prose",
          paragraphs: {
            en: [
              "Mobile point-of-sale and logistics apps often need to print receipts on compact thermal printers. Instead of requiring third-party Android apps to write custom Bluetooth code for every printer brand, Thermal Printer Service was built in Kotlin as a native Android PrintService with a PrinterDiscoverySession.",
              "This design hooks directly into the standard Android print dialog. Whenever a user taps Print in any Android application, the document is sent to the service as a temporary PDF file, allowing our background engine to handle scaling, formatting, and Bluetooth transmission automatically.",
            ],
            id: [
              "Aplikasi kasir (point-of-sale) dan logistik sering kali perlu mencetak struk pada printer termal yang ringkas. Alih-alih mewajibkan setiap aplikasi Android menulis kode Bluetooth khusus untuk berbagai merek printer, Thermal Printer Service dibangun menggunakan Kotlin sebagai PrintService native Android dengan PrinterDiscoverySession.",
              "Desain ini terhubung langsung ke dialog cetak standar Android. Kapan pun pengguna memilih Cetak pada aplikasi Android apa pun, dokumen diteruskan ke layanan sebagai file PDF sementara, sehingga proses penyesuaian skala, pemformatan, dan transmisi Bluetooth dapat ditangani secara otomatis di latar belakang.",
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
        en: "Converting PDF Pages into Thermal Dot Rasters",
        id: "Mengubah Halaman PDF Menjadi Raster Titik Termal",
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
              "When a print job arrives, Android's PdfRenderer converts each PDF page into a high-density bitmap. Because standard document sizes do not match narrow thermal receipt paper, the service automatically trims unused whitespace, centers the text, applies custom top/bottom padding, and resizes the bitmap to the printer head width (432 dots for 58 mm rolls or 576 dots for 80 mm rolls at standard 203 DPI).",
              "The adjusted bitmap is then transformed into a clean binary monochrome image, where every black pixel represents a heated dot on the receipt paper.",
            ],
            id: [
              "Saat print job diterima, PdfRenderer bawaan Android mengubah setiap halaman PDF menjadi bitmap berkualitas tinggi. Karena ukuran dokumen standar tidak sesuai dengan kertas struk termal yang sempit, layanan ini otomatis memotong whitespace yang tidak terpakai, memusatkan teks, menerapkan padding atas dan bawah, serta menyesuaikan ukuran gambar dengan lebar head printer (432 dots untuk kertas 58 mm atau 576 dots untuk 80 mm pada 203 DPI).",
              "Bitmap yang telah disesuaikan kemudian diubah menjadi gambar monokrom biner, di mana setiap piksel hitam mewakili titik panas pada kertas struk.",
            ],
          },
        },
      ],
    },
    {
      id: "esc-pos-encoding",
      title: {
        en: "Generating ESC/POS Commands and Managing Profiles",
        id: "Membuat Perintah ESC/POS dan Mengelola Profil",
      },
      blocks: [
        {
          type: "flow",
          items: {
            en: [
              "Android Document",
              "Temporary PDF File",
              "PdfRenderer Bitmap",
              "Whitespace Trim and Scale",
              "Monochrome Conversion",
              "24-Dot ESC/POS Raster",
              "Bluetooth Chunked Write",
            ],
            id: [
              "Dokumen Android",
              "File PDF Sementara",
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
              "Thermal receipt printers do not understand complex font files; they only print black-and-white dots driven by low-level ESC/POS byte commands. The app converts the monochrome bitmap into 24-dot ESC/POS raster byte arrays in memory, organizing the lines into manageable chunks for transmission.",
              "To support different printer models in the field, configurations are saved locally using SharedPreferences and JSON. A clean RecyclerView list allows operators to easily save and switch between printer profiles, setting Bluetooth address, paper width, density scale, auto-cut, and margin offsets.",
            ],
            id: [
              "Printer struk termal tidak membaca file font yang rumit; printer hanya mencetak titik hitam-putih berdasarkan instruksi byte ESC/POS tingkat rendah. Aplikasi ini mengubah bitmap monokrom menjadi array byte raster ESC/POS 24-dot di memori, menyusun baris-baris data menjadi potongan yang siap dikirim.",
              "Untuk mendukung berbagai model printer di lapangan, konfigurasi disimpan secara lokal menggunakan SharedPreferences dan JSON. Tampilan daftar RecyclerView yang praktis memungkinkan operator menyimpan dan beralih antar profil printer dengan mudah (mengatur alamat Bluetooth, lebar kertas, skala densitas, pemotong otomatis, dan offset margin).",
            ],
          },
        },
      ],
    },
    {
      id: "bluetooth-edge-cases",
      title: {
        en: "Handling Bluetooth Connections and Background Jobs",
        id: "Menangani Koneksi Bluetooth dan Background Job",
      },
      blocks: [
        {
          type: "list",
          style: "ordered",
          items: {
            en: [
              "Check Bluetooth hardware availability, power state, and Android 12 or newer runtime permissions.",
              "Load the selected printer profile and temporary PDF payload.",
              "Open an RFCOMM SPP socket with a 4-step retry strategy using 0 ms, 200 ms, 500 ms, and 1,000 ms backoff delays.",
              "Process printing in a background single-thread executor with CancellationToken support to keep the Android UI smooth.",
              "Stream ESC/POS data in chunks up to 1,024 bytes and close sockets cleanly when done or canceled.",
            ],
            id: [
              "Periksa ketersediaan hardware Bluetooth, status aktif, dan izin runtime Android 12 atau yang lebih baru.",
              "Muat profil printer yang dipilih dan dokumen PDF sementara.",
              "Buka socket RFCOMM SPP dengan strategi 4 kali percobaan ulang menggunakan jeda backoff 0 ms, 200 ms, 500 ms, dan 1.000 ms.",
              "Jalankan proses pencetakan pada background single-thread executor dengan dukungan CancellationToken agar antarmuka Android tetap responsif.",
              "Kirim data ESC/POS dalam ukuran chunk hingga 1.024 bytes dan tutup socket dengan aman saat selesai atau dibatalkan.",
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
              "By separating document rendering, ESC/POS byte encoding, and Bluetooth connection management into distinct components, Thermal Printer Service provides a smooth and dependable receipt printing experience for everyday Android workflows.",
            ],
            id: [
              "Dengan memisahkan rendering dokumen, encoding byte ESC/POS, dan pengelolaan koneksi Bluetooth ke dalam komponen-komponen terpisah, Thermal Printer Service menghadirkan pengalaman cetak struk yang lancar dan andal untuk penggunaan Android sehari-hari.",
            ],
          },
        },
      ],
    },
  ],
};
