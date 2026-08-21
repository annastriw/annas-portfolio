import type { Locale } from "@/lib/i18n/config";

interface ProjectClaimNoticeProps {
  slug: string;
  locale: Locale;
}

const claimNotices: Record<
  string,
  {
    en: { title: string; text: string };
    id: { title: string; text: string };
  }
> = {
  "dialisis-connect-edu": {
    en: {
      title: "CLAIM LIMITATIONS & HEALTH INFORMATION BOUNDARY",
      text: "This platform is designed strictly for digital health education and community interaction. It is NOT a clinical diagnostic tool and does NOT replace direct medical consultations, prescriptions, or treatments by licensed healthcare professionals.",
    },
    id: {
      title: "BATASAN KLAIM & KETENTUAN INFORMASI KESEHATAN",
      text: "Platform ini dikembangkan khusus sebagai sarana edukasi kesehatan digital dan interaksi komunitas. Sistem ini BUKAN merupakan alat diagnosis klinis dan TIDAK menggantikan konsultasi, diagnosis, atau tindakan medis langsung dari tenaga kesehatan berlisensi.",
    },
  },
  "ihealth-edu": {
    en: {
      title: "CLAIM LIMITATIONS & EDUCATIONAL PLATFORM BOUNDARY",
      text: "The health recommendations and lifestyle tips provided in iHealth Edu are intended purely for educational and preventative lifestyle awareness. They do not constitute certified clinical diagnoses or personalized clinical therapies.",
    },
    id: {
      title: "BATASAN KLAIM & BATASAN EDUKASI KESEHATAN",
      text: "Rekomendasi kesehatan dan informasi gaya hidup pada iHealth Edu ditujukan murni sebagai edukasi preventif. Konten tidak dapat dijadikan dasar diagnosis klinis atau terapi medis personal tanpa pengawasan dokter.",
    },
  },
  "ml-for-heart-attack-risk-prediction": {
    en: {
      title: "MACHINE LEARNING PROTOTYPE LIMITATIONS",
      text: "This predictive model was trained on historical observational research data as an engineering and machine learning prototype. It is NOT validated for clinical decision-making or real-time patient diagnosis in healthcare facilities.",
    },
    id: {
      title: "BATASAN KLAIM PURWARUPA MACHINE LEARNING",
      text: "Model prediksi ini dilatih menggunakan data observasi historis sebagai purwarupa rekayasa perangkat lunak dan machine learning. Model ini TIDAK tervalidasi untuk pengambilan keputusan klinis atau diagnosis pasien secara langsung di fasilitas kesehatan.",
    },
  },
  "speech-to-text-system": {
    en: {
      title: "TECHNICAL PROTOTYPE BOUNDARY",
      text: "Speech recognition accuracy metrics are bound to the specific evaluation dataset conditions and acoustic environments tested during development.",
    },
    id: {
      title: "BATASAN KLAIM PURWARUPA TEKNIS",
      text: "Akurasi pengenalan suara terikat pada kondisi dataset evaluasi dan lingkungan akustik spesifik yang diuji selama proses pengembangan.",
    },
  },
};

export function ProjectClaimNotice({ slug, locale }: ProjectClaimNoticeProps) {
  const notice = claimNotices[slug];
  if (!notice) return null;

  const content = notice[locale];

  return (
    <aside className="project-claim-notice" role="note" aria-label="Technical and Clinical Boundaries">
      <div className="claim-notice-header">
        <span className="claim-notice-marker" aria-hidden="true">
          ⚠
        </span>
        <span className="claim-notice-title">{content.title}</span>
      </div>
      <p className="claim-notice-text">{content.text}</p>
    </aside>
  );
}
