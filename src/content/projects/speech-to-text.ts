import type { ProjectItem } from "./types";

export const speechToTextProject: ProjectItem = {
  slug: "speech-to-text-system",
  category: "ml",
  order: 7,
  featured: false,
  title: {
    en: "Speech-to-Text System",
    id: "Speech-to-Text System",
  },
  subtitle: {
    en: "Automatic Speech Recognition & Audio Pipeline Prototype",
    id: "Sistem Pengenalan Suara Otomatis & Pemrosesan Audio",
  },
  projectType: {
    en: "Applied AI / Speech Recognition Inference System",
    id: "AI Terapan / Sistem Inferensi Transkripsi Suara",
  },
  role: {
    en: "AI & Audio Systems Developer",
    id: "AI & Audio Systems Developer",
  },
  stakeholder: {
    en: "Applied Speech AI Research",
    id: "Riset Terapan Speech AI",
  },
  period: {
    en: "2023 — 2024",
    id: "2023 — 2024",
  },
  status: {
    en: "Completed",
    id: "Selesai",
  },
  summary: {
    en: "An applied automatic speech recognition (ASR) system that converts raw spoken audio waveforms into structured text transcripts using pretrained Wav2Vec2 transformer architectures and FFmpeg preprocessing pipelines.",
    id: "Sistem pengenalan suara otomatis (ASR) yang mengubah gelombang audio suara menjadi transkrip teks terstruktur menggunakan arsitektur transformer Wav2Vec2 dan pipeline pra-pemrosesan FFmpeg.",
  },
  problemStatement: {
    en: "Audio files submitted by users frequently vary in sampling rates, audio channels, background noise, and codec formats, requiring standardized preprocessing for reliable acoustic model inference.",
    id: "Berkas audio masukan memiliki variasi frekuensi sampling, kanal audio, derau latar, dan format kompresi yang beragam, sehingga memerlukan standardisasi sebelum diproses oleh model akustik.",
  },
  systemSolution: {
    en: "Engineered an audio ingestion pipeline with FFmpeg normalization (16 kHz mono PCM), Hugging Face Wav2Vec2 acoustic modeling, language model beam search decoding, and API response formatting.",
    id: "Membangun pipeline pemrosesan audio dengan normalisasi FFmpeg (16 kHz mono), pemodelan akustik Hugging Face Wav2Vec2, dan format respons JSON terstruktur.",
  },
  personalContributions: {
    en: [
      "Engineered automated audio format conversion pipeline normalizing arbitrary media inputs to 16 kHz mono WAV.",
      "Integrated Hugging Face Wav2Vec2 pretrained model (facebook/wav2vec2-base-960h) for acoustic token prediction.",
      "Developed web interface for uploading audio samples and viewing timestamped transcription output.",
    ],
    id: [
      "Mengembangkan modul konversi format audio otomatis untuk menormalisasi berkas media menjadi WAV 16 kHz mono.",
      "Mengintegrasikan model akustik Hugging Face Wav2Vec2 untuk inferensi transkripsi ucapan.",
      "Membangun antarmuka web untuk pengunggahan sampel audio dan penampilan teks hasil transkripsi.",
    ],
  },
  verifiedEvidence: {
    en: [
      "Verified acoustic speech-to-text transcription capability on structured English audio evaluation samples.",
      "Implemented robust audio format ingestion handling multiple media container extensions.",
      "Explicitly noted reliance on pretrained Wav2Vec2 base model.",
    ],
    id: [
      "Memvalidasi kemampuan transkripsi ucapan ke teks pada sampel audio evaluasi terstruktur.",
      "Mengimplementasikan penanganan format audio yang tangguh untuk berbagai jenis kontainer media.",
      "Mencantumkan informasi penggunaan model pretrained Wav2Vec2 dasar secara transparan.",
    ],
  },
  claimLimitation: {
    en: "This prototype utilizes the pretrained facebook/wav2vec2-base-960h model. Transcription accuracy is bound to standard acoustic conditions and evaluation dataset clarity.",
    id: "Purwarupa ini menggunakan model pretrained facebook/wav2vec2-base-960h. Akurasi transkripsi bergantung pada kondisi akustik standar dan kejelasan audio evaluasi.",
  },
  techStack: {
    core: ["Python", "PyTorch", "Hugging Face Transformers", "Wav2Vec2", "Flask", "FFmpeg"],
    architecture: ["Acoustic Feature Extraction", "Pretrained Transformer Inference", "REST API"],
    qaOrDeployment: ["16 kHz Mono Preprocessing", "Audio Spectrogram Evaluation", "Git Workflow"],
  },
  coverImage: "/assets/projects/speech-to-text-system/cover.webp",
  documentationImages: [
    "/assets/projects/speech-to-text-system/documentation/01.webp",
  ],
};
