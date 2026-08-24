import type { BlogArticle } from "../article-types.ts";

export const integratingMachineLearningArticle: BlogArticle = {
  index: "02",
  slug: "integrating-machine-learning-into-a-web-application",
  category: {
    en: "Applied Machine Learning",
    id: "Machine Learning Terapan",
  },
  title: {
    en: "Integrating Machine Learning into a Web Application",
    id: "Mengintegrasikan Machine Learning ke dalam Aplikasi Web",
  },
  abstract: {
    en: "A practical look at connecting iHealth Edu, patient health data, and a separately served Random Forest risk-prediction prototype without blurring the clinical boundary.",
    id: "Tinjauan praktis tentang menghubungkan iHealth Edu, data kesehatan pasien, dan purwarupa prediksi risiko Random Forest yang disajikan terpisah tanpa mengaburkan batas klinis.",
  },
  tags: ["Random Forest", "Flask", "Laravel", "Next.js", "Docker"],
  sourceProjectSlugs: [
    "ihealth-edu",
    "ml-for-heart-attack-risk-prediction",
  ],
  sections: [
    {
      id: "product-context",
      title: {
        en: "The model was one part of a larger product",
        id: "Model adalah satu bagian dari produk yang lebih besar",
      },
      blocks: [
        {
          type: "prose",
          paragraphs: {
            en: [
              "iHealth Edu was developed with Puskesmas Padangsari, Semarang as an integrated digital-health platform. The application supports three user groups: patients, administrators, and health workers. Its scope includes health screening, education, patient data, examination history, reporting, ESP32 measurements, and a heart-attack risk-prediction workflow.",
              "That context changes how machine learning should be integrated. The model cannot sit in the interface as an isolated prediction button. It needs an input contract, consistent preprocessing, a service boundary, stored results, role-aware access, and language that explains what the output can and cannot mean.",
            ],
            id: [
              "iHealth Edu dikembangkan bersama Puskesmas Padangsari, Semarang sebagai platform kesehatan digital terintegrasi. Aplikasi mendukung tiga kelompok pengguna: pasien, administrator, dan tenaga kesehatan. Lingkupnya mencakup screening kesehatan, edukasi, data pasien, riwayat pemeriksaan, reporting, pengukuran ESP32, dan workflow prediksi risiko serangan jantung.",
              "Konteks tersebut mengubah cara machine learning perlu diintegrasikan. Model tidak dapat ditempatkan di antarmuka sebagai tombol prediksi yang berdiri sendiri. Model memerlukan kontrak input, preprocessing yang konsisten, batas layanan, hasil yang tersimpan, akses berbasis peran, dan bahasa yang menjelaskan arti serta batas output.",
            ],
          },
        },
        {
          type: "figure",
          src: "/assets/projects/ihealth-edu/documentation/01.webp",
          format: "wide",
          alt: {
            en: "Documented patient-facing interface from iHealth Edu",
            id: "Antarmuka iHealth Edu untuk pasien yang terdokumentasi",
          },
          caption: {
            en: "The prediction workflow sits inside a broader patient, screening, education, and health-record system.",
            id: "Workflow prediksi berada di dalam sistem pasien, screening, edukasi, dan catatan kesehatan yang lebih luas.",
          },
        },
      ],
    },
    {
      id: "service-boundary",
      title: {
        en: "Keep the inference boundary explicit",
        id: "Buat batas inferensi tetap eksplisit",
      },
      blocks: [
        {
          type: "flow",
          items: {
            en: [
              "Patient health data in iHealth Edu",
              "Laravel application workflow",
              "Flask REST API",
              "Saved preprocessing artifacts",
              "Random Forest inference",
              "Structured prediction result",
            ],
            id: [
              "Data kesehatan pasien di iHealth Edu",
              "Workflow aplikasi Laravel",
              "Flask REST API",
              "Artefak preprocessing tersimpan",
              "Inferensi Random Forest",
              "Hasil prediksi terstruktur",
            ],
          },
        },
        {
          type: "prose",
          paragraphs: {
            en: [
              "The web application uses Next.js on the frontend, Laravel for the backend and IoT server, and MySQL for application data. The machine-learning model is exposed through a separate Flask REST API. This keeps training artifacts and inference logic outside the main application while still allowing Laravel to send the documented 21 input features and receive a structured result.",
              "Consistency depends on more than loading one model file. The inference service also loads categorical mappings, the MinMaxScaler, and the predictor structure used during training. Those artifacts were serialized with Joblib so inference can reuse the same transformation path without training the model again.",
            ],
            id: [
              "Aplikasi web menggunakan Next.js pada frontend, Laravel untuk backend dan server IoT, serta MySQL untuk data aplikasi. Model machine learning disediakan melalui Flask REST API terpisah. Pemisahan ini menjaga artefak training dan logika inferensi berada di luar aplikasi utama, sekaligus memungkinkan Laravel mengirim 21 fitur input yang terdokumentasi dan menerima hasil terstruktur.",
              "Konsistensi tidak cukup hanya dengan memuat satu file model. Layanan inferensi juga memuat categorical mapping, MinMaxScaler, dan struktur predictor yang digunakan saat training. Artefak tersebut diserialisasi dengan Joblib agar inferensi dapat memakai ulang jalur transformasi yang sama tanpa melatih model kembali.",
            ],
          },
        },
      ],
    },
    {
      id: "model-selection",
      title: {
        en: "Model selection needed more than one score",
        id: "Pemilihan model memerlukan lebih dari satu skor",
      },
      blocks: [
        {
          type: "metrics",
          items: [
            {
              label: { en: "Dataset", id: "Dataset" },
              value: "158,355 rows / 22 columns",
            },
            {
              label: { en: "Stratified split", id: "Pembagian stratified" },
              value: "80:20",
            },
            {
              label: { en: "Random Forest accuracy", id: "Accuracy Random Forest" },
              value: "71.93%",
            },
            {
              label: { en: "Random Forest ROC-AUC", id: "ROC-AUC Random Forest" },
              value: "0.8015",
            },
          ],
        },
        {
          type: "prose",
          paragraphs: {
            en: [
              "The experiment compared Random Forest, linear SVM, K-Nearest Neighbors, and Logistic Regression. Five categorical fields were encoded, all 21 predictors were scaled, and the stratified split produced 126,684 training rows and 31,671 test rows. SMOTE was applied only to the training partition, increasing it to 151,766 balanced observations.",
              "RandomizedSearchCV used F1 as its scoring focus. The final comparison still showed tradeoffs: Logistic Regression had the highest compared F1 at 0.6618, and KNN had the highest recall at 70.40%. Random Forest was selected for the prototype because it produced the highest documented accuracy, 71.93%, and the highest ROC-AUC, 0.8015. It did not lead every metric.",
            ],
            id: [
              "Eksperimen membandingkan Random Forest, linear SVM, K-Nearest Neighbors, dan Logistic Regression. Lima field kategorikal di-encode, seluruh 21 predictor di-scale, dan pembagian stratified menghasilkan 126.684 baris training serta 31.671 baris test. SMOTE diterapkan hanya pada partisi training sehingga jumlahnya menjadi 151.766 observasi seimbang.",
              "RandomizedSearchCV menggunakan F1 sebagai fokus scoring. Perbandingan akhir tetap menunjukkan tradeoff: Logistic Regression memiliki F1 tertinggi dalam perbandingan sebesar 0,6618, sedangkan KNN memiliki recall tertinggi sebesar 70,40%. Random Forest dipilih untuk purwarupa karena menghasilkan accuracy terdokumentasi tertinggi, 71,93%, dan ROC-AUC tertinggi, 0,8015. Model ini tidak memimpin setiap metrik.",
            ],
          },
        },
        {
          type: "figure",
          src: "/assets/projects/ml-for-heart-attack-risk-prediction/documentation/02.webp",
          format: "wide",
          alt: {
            en: "Documented output from the heart-attack risk-prediction prototype",
            id: "Output terdokumentasi dari purwarupa prediksi risiko serangan jantung",
          },
          caption: {
            en: "The Flask service returns a prediction result and supporting information to the application workflow.",
            id: "Layanan Flask mengembalikan hasil prediksi dan informasi pendukung ke workflow aplikasi.",
          },
        },
      ],
    },
    {
      id: "responsible-output",
      title: {
        en: "Treat the boundary as part of the interface",
        id: "Perlakukan batas klaim sebagai bagian dari antarmuka",
      },
      blocks: [
        {
          type: "note",
          label: {
            en: "Health limitation",
            id: "Batasan kesehatan",
          },
          text: {
            en: "This implementation is a risk-prediction and decision-support prototype. It is not a clinical diagnosis, does not replace a health professional, and has no documented clinical validation.",
            id: "Implementasi ini adalah purwarupa prediksi risiko dan pendukung keputusan. Implementasi ini bukan diagnosis klinis, tidak menggantikan tenaga kesehatan, dan tidak memiliki validasi klinis yang terdokumentasi.",
          },
        },
        {
          type: "list",
          style: "unordered",
          items: {
            en: [
              "Present the predicted class and risk probability as model output, not a diagnosis.",
              "Describe rule-based risk factors as supporting information.",
              "Describe the top-five Random Forest feature importances as global model information, not a causal explanation for one patient.",
              "Keep access to patient records aligned with patient, administrator, and health-worker roles.",
            ],
            id: [
              "Tampilkan predicted class dan risk probability sebagai output model, bukan diagnosis.",
              "Jelaskan rule-based risk factors sebagai informasi pendukung.",
              "Jelaskan lima feature importance Random Forest teratas sebagai informasi model global, bukan penjelasan kausal untuk satu pasien.",
              "Jaga akses catatan pasien tetap sesuai dengan peran pasien, administrator, dan tenaga kesehatan.",
            ],
          },
        },
        {
          type: "prose",
          paragraphs: {
            en: [
              "The practical integration work was therefore split across product flow, backend coordination, model serving, artifact consistency, deployment with Docker on Ubuntu, and careful presentation. The model is valuable only when the surrounding application handles those boundaries honestly.",
            ],
            id: [
              "Pekerjaan integrasi praktis terbagi ke dalam alur produk, koordinasi backend, penyajian model, konsistensi artefak, deployment dengan Docker di Ubuntu, dan presentasi yang hati-hati. Model hanya berguna ketika aplikasi di sekitarnya menangani batas tersebut secara jujur.",
            ],
          },
        },
      ],
    },
  ],
};
