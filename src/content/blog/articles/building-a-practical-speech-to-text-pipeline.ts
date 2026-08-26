import type { BlogArticle } from "../article-types";

export const speechToTextPipelineArticle: BlogArticle = {
  index: "04",
  slug: "building-a-practical-speech-to-text-pipeline",
  category: {
    en: "Audio and AI",
    id: "Audio dan AI",
  },
  title: {
    en: "Building a Practical Speech-to-Text Pipeline with Wav2Vec2 and FFmpeg",
    id: "Membangun Pipeline Speech-to-Text Praktis dengan Wav2Vec2 dan FFmpeg",
  },
  abstract: {
    en: "A Google Colab workflow that normalizes audio and video, processes long input in chunks, and turns pretrained Wav2Vec2 output into transcripts and burned-in subtitles.",
    id: "Workflow Google Colab yang menormalisasi audio dan video, memproses input panjang per chunk, lalu mengubah output Wav2Vec2 pralatih menjadi transkrip dan burned-in subtitle.",
  },
  tags: ["Python", "Wav2Vec2", "FFmpeg", "SRT", "Google Colab"],
  sourceProjectSlugs: ["speech-to-text-system"],
  sections: [
    {
      id: "input-handling",
      title: {
        en: "Building an Audio Pipeline in Google Colab",
        id: "Membangun Pipeline Audio di Google Colab",
      },
      blocks: [
        {
          type: "flow",
          items: {
            en: [
              "Audio or Video Upload",
              "FFmpeg Audio Extraction",
              "16 kHz Mono Conversion",
              "Sequential Audio Chunking",
              "Wav2Vec2 Inference",
              "TXT, CSV, JSON Exports",
              "SRT Subtitle Generation",
              "Burned-in Subtitle Video",
            ],
            id: [
              "Upload Audio atau Video",
              "Ekstraksi Audio FFmpeg",
              "Konversi Mono 16 kHz",
              "Chunking Audio Sekuensial",
              "Inferensi Wav2Vec2",
              "Ekspor TXT, CSV, JSON",
              "Pembuatan Subtitle SRT",
              "Video Burned-in Subtitle",
            ],
          },
        },
        {
          type: "prose",
          paragraphs: {
            en: [
              "Automatic speech recognition works best when the entire media workflow is planned end-to-end. Built as a Python workflow in Google Colab, the Speech-to-Text System accepts both audio and video files, generating structured transcripts and final videos with burned-in subtitles.",
              "The project focuses on the practical pipeline: extracting audio from video with FFmpeg, standardizing the signal, handling long audio through chunking, and routing the resulting text into multiple useful formats.",
            ],
            id: [
              "Pengenalan suara otomatis (Automatic Speech Recognition) bekerja paling optimal jika seluruh alur media dirancang terpadu dari awal hingga akhir. Dibangun sebagai workflow Python di Google Colab, Speech-to-Text System menerima file audio maupun video, menghasilkan transkrip terstruktur, dan membuat video akhir dengan burned-in subtitle.",
              "Proyek ini berfokus pada pipeline praktis: mengekstrak audio dari video menggunakan FFmpeg, menstandarkan sinyal suara, menangani audio panjang melalui chunking, dan menyalurkan teks hasil transkripsi ke berbagai format yang siap pakai.",
            ],
          },
        },
      ],
    },
    {
      id: "signal-preprocessing",
      title: {
        en: "Audio Preprocessing and Sequential Chunking",
        id: "Preprocessing Audio dan Chunking Sekuensial",
      },
      blocks: [
        {
          type: "list",
          style: "ordered",
          items: {
            en: [
              "Identify whether the uploaded source file is audio or video.",
              "Extract the uncompressed audio track from video files using FFmpeg.",
              "Resample and convert the audio to a single mono channel at 16 kHz using Librosa.",
              "Split long audio recordings into smaller sequential chunks to manage memory smoothly.",
            ],
            id: [
              "Identifikasi apakah file sumber yang diunggah berupa audio atau video.",
              "Ekstrak track audio tanpa kompresi dari file video menggunakan FFmpeg.",
              "Resample dan konversi audio menjadi satu channel mono pada 16 kHz menggunakan Librosa.",
              "Bagi rekaman audio berdurasi panjang menjadi beberapa chunk sekuensial agar pemakaian memori tetap stabil.",
            ],
          },
        },
        {
          type: "prose",
          paragraphs: {
            en: [
              "Acoustic neural networks require consistent audio input. Using Librosa and FFmpeg, audio streams are downmixed to single-channel mono and resampled to 16 kHz, matching the exact format expected by the Wav2Vec2 feature extractor.",
              "For long recordings, dividing the audio into sequential chunks prevents memory errors in Google Colab and allows each segment to be processed in order while preserving accurate timing.",
            ],
            id: [
              "Jaringan saraf akustik membutuhkan format audio input yang konsisten. Menggunakan Librosa dan FFmpeg, aliran audio disatukan menjadi channel mono tunggal dan di-resample ke 16 kHz, sesuai dengan format yang dibutuhkan ekstraktor fitur Wav2Vec2.",
              "Untuk rekaman berdurasi panjang, pembagian audio menjadi beberapa chunk sekuensial mencegah kehabisan memori di Google Colab serta memungkinkan setiap bagian diproses berurutan dengan penanda waktu yang tetap presisi.",
            ],
          },
        },
      ],
    },
    {
      id: "wav2vec2-inference",
      title: {
        en: "Speech Recognition with Pretrained Wav2Vec2",
        id: "Pengenalan Suara dengan Wav2Vec2 Pralatih",
      },
      blocks: [
        {
          type: "prose",
          paragraphs: {
            en: [
              "Transcription is handled by the pretrained facebook/wav2vec2-base-960h model loaded through Hugging Face Transformers. The model processes the audio chunks and decodes the spoken words into text.",
              "The pipeline compiles the transcriptions into three practical file formats: plain TXT for quick reading, tabular CSV structured with Pandas for chunk-level inspection, and structured JSON for easy integration with other software tools.",
            ],
            id: [
              "Proses transkripsi dijalankan oleh model pralatih facebook/wav2vec2-base-960h yang dimuat melalui Hugging Face Transformers. Model memproses setiap chunk audio dan mendekode ucapan suara menjadi teks tertulis.",
              "Pipeline menggabungkan hasil transkripsi ke dalam tiga format file praktis: teks biasa TXT untuk dibaca langsung, format tabel CSV menggunakan Pandas untuk pemeriksaan per segmen, dan format JSON terstruktur untuk kemudahan integrasi dengan perangkat lunak lain.",
            ],
          },
        },
        {
          type: "note",
          label: {
            en: "Factual boundary",
            id: "Batas faktual",
          },
          text: {
            en: "The project record documents an ASR pipeline using the pretrained facebook/wav2vec2-base-960h model and does not include model fine-tuning. It does not include a benchmark, Word Error Rate, Character Error Rate, or unverified transcription accuracy claims.",
            id: "Catatan proyek mendokumentasikan pipeline ASR menggunakan model pralatih facebook/wav2vec2-base-960h dan tidak mencakup fine-tuning model. Catatan ini tidak mencakup benchmark, Word Error Rate, Character Error Rate, atau klaim akurasi transkripsi yang tidak diverifikasi.",
          },
        },
      ],
    },
    {
      id: "subtitles-and-ffmpeg",
      title: {
        en: "Automating Subtitles and Video Generation",
        id: "Otomatisasi Subtitle dan Pembuatan Video",
      },
      blocks: [
        {
          type: "figure",
          src: "/assets/projects/speech-to-text-system/documentation/01.webp",
          format: "wide",
          alt: {
            en: "Documented video output with subtitles generated by the speech-to-text workflow",
            id: "Output video terdokumentasi dengan subtitle yang dihasilkan workflow speech-to-text",
          },
          caption: {
            en: "Final media stage combining generated SRT subtitle timecodes with original video via FFmpeg.",
            id: "Tahap media akhir yang menggabungkan timecode subtitle SRT dengan video asli melalui FFmpeg.",
          },
        },
        {
          type: "prose",
          paragraphs: {
            en: [
              "In addition to plain text, the pipeline converts chunk timestamps into standard SubRip (SRT) subtitle files with accurate start and end times.",
              "In the final step, FFmpeg burns the subtitle text directly onto the video frames. This creates a finished video with permanent open captions that can be played on any device or browser without needing external subtitle files.",
            ],
            id: [
              "Selain teks biasa, pipeline menyusun stempel waktu dari setiap chunk menjadi file subtitle standar SubRip (SRT) dengan penanda waktu awal dan akhir yang rapi.",
              "Pada tahap akhir, FFmpeg menempelkan subtitle teks secara langsung ke frame video (burned-in subtitle). Hal ini menghasilkan video siap tonton dengan takarir permanen yang dapat diputar di perangkat atau peramban apa pun tanpa memerlukan file subtitle terpisah.",
            ],
          },
        },
        {
          type: "list",
          style: "unordered",
          items: {
            en: [
              "Plain text transcript document (TXT).",
              "Tabular chunk dataset with timing metadata (CSV).",
              "Structured data payload (JSON).",
              "Standard time-coded subtitle track (SRT).",
              "Final video with burned-in subtitles.",
            ],
            id: [
              "Dokumen transkrip teks biasa (TXT).",
              "Dataset chunk tabular dengan metadata waktu (CSV).",
              "Payload data hierarkis terstruktur (JSON).",
              "File subtitle standar dengan timecode (SRT).",
              "Video final dengan burned-in subtitle.",
            ],
          },
        },
      ],
    },
  ],
};
