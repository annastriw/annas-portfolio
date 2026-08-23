import type { ProjectItem } from "./types";

export const mlHeartAttackProject: ProjectItem = {
  slug: "ml-for-heart-attack-risk-prediction",
  category: "ml",
  order: 6,
  featured: true,
  title: {
    en: "Machine Learning Model for Heart Attack Risk Prediction",
    id: "Model Machine Learning Prediksi Risiko Serangan Jantung",
  },
  subtitle: {
    en: "Supervised Clinical Risk Classification & Inference Pipeline",
    id: "Klasifikasi Prediksi Risiko Kardiovaskular & Pipeline Inferensi",
  },
  projectType: {
    en: "Machine Learning / Predictive Classification Prototype",
    id: "Machine Learning / Purwarupa Klasifikasi Prediktif",
  },
  role: {
    en: "Machine Learning Engineer & Researcher",
    id: "Machine Learning Engineer & Peneliti",
  },
  stakeholder: {
    en: "Academic Research Thesis Project",
    id: "Proyek Riset Akademik Tugas Akhir",
  },
  period: {
    en: "2024",
    id: "2024",
  },
  status: {
    en: "Completed / Validated",
    id: "Selesai / Tervalidasi",
  },
  summary: {
    en: "An applied machine learning research system that trains, optimizes, and evaluates ensemble classification models to predict cardiovascular risk from structured physiological indicators.",
    id: "Sistem riset machine learning terapan untuk melatih, mengoptimasi, dan mengevaluasi model klasifikasi ensemble guna memprediksi risiko kardiovaskular dari indikator fisiologis terstruktur.",
  },
  problemStatement: {
    en: "Cardiovascular health risk evaluation involves complex non-linear feature interactions, requiring robust preprocessing, class imbalance handling, and validated model calibration to avoid false negatives.",
    id: "Evaluasi risiko kardiovaskular melibatkan interaksi fitur non-linear yang kompleks, menuntut pra-pemrosesan data yang ketat, penanganan ketidakseimbangan kelas, dan kalibrasi model yang teruji.",
  },
  systemSolution: {
    en: "Engineered an end-to-end Python machine learning pipeline implementing SMOTE oversampling, feature scaling, Random Forest & SVM model training, cross-validation, and serialized Flask inference serving.",
    id: "Membangun pipeline machine learning Python lengkap dengan teknik oversampling SMOTE, penskalaan fitur, pelatihan model Random Forest dan SVM, validasi silang, dan penyajian inferensi melalui API Flask.",
  },
  personalContributions: {
    en: [
      "Conducted exploratory data analysis (EDA), data cleaning, outlier detection, and feature correlation mapping.",
      "Implemented SMOTE algorithm to resolve target class distribution imbalance.",
      "Trained and compared multiple classifiers (Random Forest, SVM, Logistic Regression, KNN) with Hyperparameter tuning.",
      "Developed serialized model inference serving endpoint for real-time risk classification scoring.",
    ],
    id: [
      "Melakukan analisis data eksploratif (EDA), pembersihan data, deteksi pencilan, dan pemetaan korelasi fitur klinis.",
      "Menerapkan algoritma SMOTE untuk menangani ketidakseimbangan distribusi kelas target.",
      "Melatih dan membandingkan beberapa model klasifikasi dengan tuning hyperparameter berbasis cross-validation.",
      "Membangun endpoint API inferensi berbasis Flask untuk penilaian skor risiko secara real-time.",
    ],
  },
  verifiedEvidence: {
    en: [
      "Achieved verified model benchmark: 87.5% Accuracy and 91.2% Recall on cross-validated test partition.",
      "Documented complete confusion matrices, ROC-AUC curves, and classification report metrics.",
      "Maintained explicit claim notice stating experimental and educational research boundaries.",
    ],
    id: [
      "Mencapai tolok ukur model terverifikasi: Akurasi 87.5% dan Recall 91.2% pada partisi pengujian cross-validation.",
      "Mendokumentasikan confusion matrix lengkap, kurva ROC-AUC, dan metrik classification report.",
      "Mencantumkan batasan klaim bahwa purwarupa ini ditujukan untuk riset dan bukan diagnosis klinis langsung.",
    ],
  },
  metrics: [
    { label: { en: "Model Accuracy", id: "Akurasi Model" }, value: "87.5%" },
    { label: { en: "Sensitivity / Recall", id: "Recall / Sensitivitas" }, value: "91.2%" },
    { label: { en: "Input Features", id: "Fitur Masukan" }, value: "14 Parameters" },
    { label: { en: "Validation Method", id: "Metode Validasi" }, value: "5-Fold Stratified CV" },
  ],
  claimLimitation: {
    en: "This machine learning model was developed as an academic and engineering research prototype. It is NOT validated or certified for direct clinical diagnosis or medical decision-making in hospitals.",
    id: "Model machine learning ini dikembangkan sebagai purwarupa riset akademik dan rekayasa perangkat lunak. Sistem ini TIDAK tervalidasi atau bersertifikasi untuk diagnosis klinis langsung di fasilitas kesehatan.",
  },
  techStack: {
    core: ["Python", "Scikit-learn", "Pandas", "NumPy", "Flask"],
    architecture: ["Supervised ML Pipeline", "SMOTE Balancing", "RESTful Inference API"],
    qaOrDeployment: ["5-Fold Stratified CV", "ROC-AUC Analysis", "Joblib Model Serialization"],
  },
  coverImage: "/assets/projects/ml-for-heart-attack-risk-prediction/cover.webp",
  documentationImages: [
    "/assets/projects/ml-for-heart-attack-risk-prediction/documentation/01.webp",
    "/assets/projects/ml-for-heart-attack-risk-prediction/documentation/02.webp",
  ],
};
