import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

import {
  filterProjectArchive,
  getProjectArchiveCategoryCounts,
  projectArchive,
  projectArchiveCategories,
  projectArchiveCopy,
  PROJECT_ARCHIVE_CATEGORY_COUNT,
  PROJECT_ARCHIVE_DISCIPLINE_COUNT,
  PROJECT_ARCHIVE_TOTAL_COUNT,
} from "../src/content/projects/project-archive.ts";
import {
  homeFeaturedConfig,
  homeSelectedProjects,
} from "../src/content/projects/featured-config.ts";

const expectedSlugs = [
  "ukg-system",
  "ihealth-edu",
  "dialisis-connect-edu",
  "nusa-dakwah",
  "simastok",
  "ml-for-heart-attack-risk-prediction",
  "speech-to-text-system",
  "thermal-printer-service",
  "footy-standings",
  "panoramic-virtual-tour",
];

const expectedTitles = [
  "UKG System",
  "iHealth Edu",
  "Dialisis Connect Edu",
  "Nusa Dakwah",
  "SIMASTOK SHR Jaya Motor",
  "Machine Learning Model for Heart Attack Risk Prediction",
  "Speech-to-Text System",
  "Thermal Printer Service",
  "Footy Standings",
  "Panoramic Virtual Tour",
];

const expectedRoles = [
  "Full-Stack Web Developer",
  "Frontend Web Developer",
  "Frontend Web Developer",
  "Full-Stack Web Developer",
  "Full-Stack Web Developer",
  "Machine Learning Engineer",
  "Machine Learning Engineer",
  "Android Developer",
  "Flutter Developer",
  "Junior Game Developer",
];

const expectedStatuses = [
  "Live Production",
  "Live Production",
  "Live Production",
  "Live Production",
  "Live Production",
  "Completed Prototype",
  "Completed Prototype",
  "Completed Application",
  "Completed Application",
  "Completed Prototype",
];

const expectedSummaries = {
  "ukg-system": {
    en: "A multi-branch ERP that centralizes inventory, sales, and daily operations in one production system.",
    id: "ERP multi-cabang yang memusatkan stok, penjualan, dan operasional harian dalam satu sistem production.",
  },
  "ihealth-edu": {
    en: "A digital health platform for structured screening, patient records, health education, IoT data, and machine learning decision support.",
    id: "Platform kesehatan digital untuk screening terstruktur, data pasien, edukasi kesehatan, data IoT, dan machine learning decision support.",
  },
  "dialisis-connect-edu": {
    en: "A kidney health education and community platform developed with IPDI Central Java, providing learning resources, video guides, digital booklets, and discussion forums.",
    id: "Platform edukasi dan komunitas kesehatan ginjal yang dikembangkan bersama IPDI Jawa Tengah, menyediakan materi pembelajaran, panduan video, booklet digital, dan forum diskusi.",
  },
  "nusa-dakwah": {
    en: "A digital Islamic learning platform with structured modules, articles, YouTube videos, and moderated community discussions.",
    id: "Platform pembelajaran dan dakwah digital dengan modul terstruktur, artikel, video YouTube, dan diskusi komunitas yang dimoderasi.",
  },
  simastok: {
    en: "An inventory system used by SHR Jaya Motor to replace handwritten stock records with centralized stock tracking, transaction history, and reporting.",
    id: "Sistem inventory yang digunakan SHR Jaya Motor untuk menggantikan pencatatan manual dengan pemantauan stok, riwayat transaksi, dan laporan yang terpusat.",
  },
  "ml-for-heart-attack-risk-prediction": {
    en: "A machine learning prototype for exploring heart attack risk prediction, with model inference served through a Flask API. Built for experimentation, not medical diagnosis.",
    id: "Prototype machine learning untuk mengeksplorasi prediksi risiko serangan jantung, dengan inference model melalui Flask API. Dikembangkan untuk eksperimen, bukan diagnosis medis.",
  },
  "speech-to-text-system": {
    en: "An English speech-to-text prototype that processes audio and video with pretrained Wav2Vec2, then exports transcripts, SRT subtitles, and video with burned-in captions.",
    id: "Prototype speech-to-text bahasa Inggris yang memproses audio dan video menggunakan pretrained Wav2Vec2, lalu menghasilkan transkrip, subtitle SRT, dan video dengan subtitle tertanam.",
  },
  "thermal-printer-service": {
    en: "A native Android printing service that connects the system print framework to Bluetooth thermal printers, with print calibration and retry handling.",
    id: "Layanan printing Android native yang menghubungkan fitur cetak sistem dengan printer thermal Bluetooth, dilengkapi kalibrasi cetak dan penanganan percobaan ulang.",
  },
  "footy-standings": {
    en: "A Flutter application for following football league standings, match schedules, top scorers, and club profiles through a football data API.",
    id: "Aplikasi Flutter untuk mengikuti klasemen liga sepak bola, jadwal pertandingan, top scorer, dan profil klub melalui API data sepak bola.",
  },
  "panoramic-virtual-tour": {
    en: "A Unity-based virtual tour developed during an internship at PT Duta Basis Dataprima, combining architectural panoramas with hotspot navigation.",
    id: "Virtual tour berbasis Unity yang dikembangkan saat magang di PT Duta Basis Dataprima, menggabungkan panorama arsitektur dengan navigasi hotspot.",
  },
};

test("publishes exactly the ten approved projects in their required order", () => {
  assert.equal(projectArchive.length, 10);
  assert.equal(PROJECT_ARCHIVE_TOTAL_COUNT, 10);
  assert.equal(PROJECT_ARCHIVE_CATEGORY_COUNT, 4);
  assert.equal(PROJECT_ARCHIVE_DISCIPLINE_COUNT, 4);
  assert.deepEqual(
    projectArchive.map((project) => project.slug),
    expectedSlugs,
  );
  assert.deepEqual(
    projectArchive.map((project) => project.index),
    ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"],
  );
  assert.deepEqual(
    projectArchive.map((project) => project.title.en),
    expectedTitles,
  );
  assert.deepEqual(
    projectArchive.map((project) => project.title.id),
    expectedTitles,
  );
});

test("maintains approved roles and statuses in English across both locales", () => {
  for (let i = 0; i < projectArchive.length; i++) {
    const project = projectArchive[i];
    assert.equal(project.role.en, expectedRoles[i]);
    assert.equal(project.role.id, expectedRoles[i]);
    assert.equal(project.status.en, expectedStatuses[i]);
    assert.equal(project.status.id, expectedStatuses[i]);
  }
});

test("keeps the approved category counts and filter order", () => {
  assert.deepEqual(
    projectArchiveCategories.map((category) => category.key),
    ["all", "web-app", "ml", "mobile", "other"],
  );
  assert.equal(filterProjectArchive(projectArchive, "all").length, 10);
  assert.equal(filterProjectArchive(projectArchive, "web-app").length, 5);
  assert.equal(filterProjectArchive(projectArchive, "ml").length, 2);
  assert.equal(filterProjectArchive(projectArchive, "mobile").length, 2);
  assert.equal(filterProjectArchive(projectArchive, "other").length, 1);

  const counts = getProjectArchiveCategoryCounts(projectArchive);
  assert.deepEqual(counts, {
    all: 10,
    "web-app": 5,
    ml: 2,
    mobile: 2,
    other: 1,
  });
});

test("preserves original project indexes when categories are filtered", () => {
  assert.deepEqual(
    filterProjectArchive(projectArchive, "web-app").map((p) => p.index),
    ["01", "02", "03", "04", "05"],
  );
  assert.deepEqual(
    filterProjectArchive(projectArchive, "ml").map((p) => p.index),
    ["06", "07"],
  );
  assert.deepEqual(
    filterProjectArchive(projectArchive, "mobile").map((p) => p.index),
    ["08", "09"],
  );
  assert.deepEqual(
    filterProjectArchive(projectArchive, "other").map((p) => p.index),
    ["10"],
  );
});

test("enforces max 6 displayed technologies and exact approved stacks for UKG, iHealth, Dialisis, Nusa Dakwah, SIMASTOK, Heart ML, and Speech-to-Text", () => {
  for (const project of projectArchive) {
    assert.ok(
      project.primaryTechnologies.length <= 6,
      `${project.slug} has more than 6 technologies`,
    );
    assert.ok(
      project.primaryTechnologies.length >= 3,
      `${project.slug} has fewer than 3 technologies`,
    );
  }

  const ukg = projectArchive.find((p) => p.slug === "ukg-system");
  assert.ok(ukg);
  assert.deepEqual(ukg.primaryTechnologies, [
    "Figma",
    "Next.js",
    "NestJS",
    "MySQL",
    "Katalon Studio",
    "Linux Ubuntu",
  ]);

  const ihealth = projectArchive.find((p) => p.slug === "ihealth-edu");
  assert.ok(ihealth);
  assert.deepEqual(ihealth.primaryTechnologies, [
    "Figma",
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "REST API",
  ]);

  const dialisis = projectArchive.find((p) => p.slug === "dialisis-connect-edu");
  assert.ok(dialisis);
  assert.deepEqual(dialisis.primaryTechnologies, [
    "Figma",
    "Next.js",
    "React",
    "REST API",
    "Katalon Studio",
    "Docker",
  ]);

  const nusa = projectArchive.find((p) => p.slug === "nusa-dakwah");
  assert.ok(nusa);
  assert.deepEqual(nusa.primaryTechnologies, [
    "Figma",
    "Next.js",
    "Laravel",
    "MySQL",
    "Katalon Studio",
    "Docker",
  ]);

  const simastok = projectArchive.find((p) => p.slug === "simastok");
  assert.ok(simastok);
  assert.deepEqual(simastok.primaryTechnologies, [
    "Laravel",
    "PHP",
    "MySQL",
    "Katalon Studio",
    "Docker",
  ]);

  const heart = projectArchive.find(
    (p) => p.slug === "ml-for-heart-attack-risk-prediction",
  );
  assert.ok(heart);
  assert.deepEqual(heart.primaryTechnologies, [
    "Python",
    "Scikit-learn",
    "Pandas",
    "SMOTE",
    "Flask",
    "Docker",
  ]);

  const stt = projectArchive.find((p) => p.slug === "speech-to-text-system");
  assert.ok(stt);
  assert.deepEqual(stt.primaryTechnologies, [
    "Python",
    "Wav2Vec2",
    "Hugging Face Transformers",
    "Librosa",
    "FFmpeg",
    "Google Colab",
  ]);
});

test("matches exact approved bilingual summaries and preserves medical boundaries", () => {
  for (const project of projectArchive) {
    const expected = expectedSummaries[project.slug];
    assert.ok(expected, `Missing expected summary for ${project.slug}`);
    assert.equal(project.summary.en, expected.en);
    assert.equal(project.summary.id, expected.id);

    // Ensure no technical metrics leaked into Hub summaries
    assert.doesNotMatch(project.summary.en, /158[,.]?355/);
    assert.doesNotMatch(project.summary.en, /71\.93%/);
    assert.doesNotMatch(project.summary.en, /0\.8015/);
    assert.doesNotMatch(project.summary.en, /100%/);
    assert.doesNotMatch(project.summary.en, /verified builds/i);
  }

  const heart = projectArchive.find(
    (p) => p.slug === "ml-for-heart-attack-risk-prediction",
  );
  assert.ok(heart);
  assert.match(heart.summary.en, /experimentation, not medical diagnosis/i);
  assert.match(heart.summary.id, /eksperimen, bukan diagnosis medis/i);

  const ihealth = projectArchive.find((p) => p.slug === "ihealth-edu");
  assert.ok(ihealth);
  assert.match(ihealth.summary.en, /decision support/i);
  assert.match(ihealth.summary.id, /decision support/i);
});

test("does not expose external links in Projects Hub entries", () => {
  const linkedProjects = projectArchive.filter((project) => "liveUrl" in project && project.liveUrl);
  assert.equal(linkedProjects.length, 0, "No project archive item should contain external liveUrl");
});

test("verifies that all project cover images exist in the public directory", () => {
  for (const project of projectArchive) {
    const imagePath = path.join(
      process.cwd(),
      "public",
      project.coverImage.replace(/^\//, ""),
    );
    assert.ok(
      fs.existsSync(imagePath),
      `Cover image missing: ${project.coverImage} at ${imagePath}`,
    );
  }
});

test("provides approved copy foundation for masthead and CTA", () => {
  assert.equal(projectArchiveCopy.sectionIndex.en, "[03 // PROJECTS]");
  assert.equal(projectArchiveCopy.sectionIndex.id, "[03 // PROYEK]");
  assert.equal(projectArchiveCopy.title.en, "Projects Archive");
  assert.equal(projectArchiveCopy.title.id, "Arsip Proyek");
  assert.equal(
    projectArchiveCopy.lead.en,
    "Explore my work across web applications, machine learning, mobile development, and interactive media.",
  );
  assert.equal(
    projectArchiveCopy.lead.id,
    "Jelajahi project yang saya kerjakan dalam pengembangan aplikasi web, machine learning, mobile, dan media interaktif.",
  );
  assert.equal(projectArchiveCopy.filterHeading.en, "Project Categories");
  assert.equal(projectArchiveCopy.filterHeading.id, "Kategori Proyek");
  assert.equal(projectArchiveCopy.cta.en, "Explore Project");
  assert.equal(projectArchiveCopy.cta.id, "Jelajahi Proyek");
  assert.equal(projectArchiveCopy.projectCountLabel.en, "Projects");
  assert.equal(projectArchiveCopy.projectCountLabel.id, "Proyek");
  assert.equal(projectArchiveCopy.categoryCountLabel.en, "Categories");
  assert.equal(projectArchiveCopy.categoryCountLabel.id, "Kategori");
  assert.equal(projectArchiveCopy.disciplineCountLabel.en, "Categories");
  assert.equal(projectArchiveCopy.disciplineCountLabel.id, "Kategori");
});

test("supports repeated category filter transitions without index degradation", () => {
  const sequence = [
    "all",
    "web-app",
    "all",
    "ml",
    "mobile",
    "other",
    "all",
  ];

  for (const filterKey of sequence) {
    const results = filterProjectArchive(projectArchive, filterKey);
    if (filterKey === "all") {
      assert.equal(results.length, 10);
      assert.deepEqual(
        results.map((p) => p.index),
        ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"],
      );
    } else if (filterKey === "web-app") {
      assert.equal(results.length, 5);
      assert.deepEqual(
        results.map((p) => p.index),
        ["01", "02", "03", "04", "05"],
      );
    } else if (filterKey === "ml") {
      assert.equal(results.length, 2);
      assert.deepEqual(
        results.map((p) => p.index),
        ["06", "07"],
      );
    } else if (filterKey === "mobile") {
      assert.equal(results.length, 2);
      assert.deepEqual(
        results.map((p) => p.index),
        ["08", "09"],
      );
    } else if (filterKey === "other") {
      assert.equal(results.length, 1);
      assert.deepEqual(
        results.map((p) => p.index),
        ["10"],
      );
    }
  }
});

test("ProjectArchiveRow implements approved editorial hierarchy and internal navigation only", () => {
  const rowSource = fs.readFileSync(
    path.join(process.cwd(), "src/components/projects/project-archive-row.tsx"),
    "utf8",
  );

  // Confirms no obsolete action labels or external link targets in Hub entries
  assert.doesNotMatch(rowSource, /View Case Study/i);
  assert.doesNotMatch(rowSource, /Lihat Studi Kasus/i);
  assert.doesNotMatch(rowSource, /Live System/i);
  assert.doesNotMatch(rowSource, /Sistem Live/i);
  assert.doesNotMatch(rowSource, /project\.liveUrl/);
  assert.doesNotMatch(rowSource, /target="_blank"/);

  // Confirms title and thumbnail are not wrapped in Link tags (static information container)
  assert.doesNotMatch(rowSource, /<Link[^>]*>\s*<div className=\{styles\.thumbnailFrame\}/);
  assert.doesNotMatch(rowSource, /<Link[^>]*>\s*\{project\.title/);

  // Confirms use of approved CTA copy and editorial action link
  assert.match(rowSource, /projectArchiveCopy\.cta/);
  assert.match(rowSource, /detailHref/);
  assert.match(rowSource, /editorial-action-link/);

  // Confirms 5-part row content structure: title, role & status, summary, stack, cta
  assert.match(rowSource, /project\.title\[locale\]/);
  assert.match(rowSource, /project\.role\[locale\]/);
  assert.match(rowSource, /project\.status\[locale\]/);
  assert.match(rowSource, /project\.summary\[locale\]/);
  assert.match(rowSource, /project\.primaryTechnologies/);
  assert.match(rowSource, /slice\(0,\s*6\)/);
});

test("project-archive.module.css defines responsive editorial grid, text tabs, and touch target requirements", () => {
  const cssSource = fs.readFileSync(
    path.join(
      process.cwd(),
      "src/components/projects/project-archive.module.css",
    ),
    "utf8",
  );

  // Desktop grid structure with aligned columns
  assert.match(cssSource, /\.row\s*\{[^}]*grid-template-columns:/);

  // Tablet side-by-side adaptation (640px to 1023px)
  assert.match(cssSource, /@media\s*\(\s*min-width:\s*640px\s*\)\s*and\s*\(\s*max-width:\s*1023px\s*\)/);
  assert.match(cssSource, /\.mobileMeta/);

  // Mobile stacked adaptation (< 640px)
  assert.match(cssSource, /@media\s*\(\s*max-width:\s*639px\s*\)/);

  // Text-based tabs with active underline
  assert.match(cssSource, /\.activeUnderline/);

  // 44px minimum touch target on filter buttons
  assert.match(cssSource, /min-block-size:\s*2\.75rem/);

  // Reduced motion support
  assert.match(cssSource, /@media\s*\(\s*prefers-reduced-motion:\s*reduce\s*\)/);
});

test("Projects Hub applies once-only ScrollReveal to header and archive group without per-row animation", () => {
  const pageSource = fs.readFileSync(
    path.join(process.cwd(), "src/app/[locale]/projects/page.tsx"),
    "utf8",
  );
  const archiveSource = fs.readFileSync(
    path.join(process.cwd(), "src/components/projects/project-archive.tsx"),
    "utf8",
  );
  const rowSource = fs.readFileSync(
    path.join(process.cwd(), "src/components/projects/project-archive-row.tsx"),
    "utf8",
  );

  // Page wraps header and ProjectArchive in once-only ScrollReveal
  assert.match(pageSource, /<ScrollReveal[^>]*>\s*<div className="mb-2\.5/);
  assert.match(pageSource, /<ScrollReveal[^>]*>\s*<ProjectArchive/);

  // Aggregate summary row removed from Projects Hub page per Prompt 12
  assert.doesNotMatch(pageSource, /PROJECT_ARCHIVE_TOTAL_COUNT/);
  assert.doesNotMatch(pageSource, /projectCountLabel/);
  assert.doesNotMatch(pageSource, /categoryCountLabel/);

  // No per-group or per-row ScrollReveal
  assert.doesNotMatch(archiveSource, /<ScrollReveal/);
  assert.doesNotMatch(rowSource, /<ScrollReveal/);

  // Filter tabs have semantic role="tablist", role="tab", and aria-selected
  assert.match(archiveSource, /role="tablist"/);
  assert.match(archiveSource, /role="tab"/);
  assert.match(archiveSource, /aria-selected=\{isActive\}/);
});

test("synchronizes Nusa Dakwah Hub entry with exact facts, 6-item stack, no search claims, and absence from Home", () => {
  const nusa = projectArchive.find((p) => p.slug === "nusa-dakwah");
  assert.ok(nusa, "Nusa Dakwah must exist in projectArchive");

  // Exact fields
  assert.equal(nusa.index, "04");
  assert.equal(nusa.category, "web-app");
  assert.equal(nusa.title.en, "Nusa Dakwah");
  assert.equal(nusa.title.id, "Nusa Dakwah");
  assert.equal(nusa.role.en, "Full-Stack Web Developer");
  assert.equal(nusa.role.id, "Full-Stack Web Developer");
  assert.equal(nusa.status.en, "Live Production");
  assert.equal(nusa.status.id, "Live Production");
  assert.equal(nusa.coverImage, "/assets/projects/nusa-dakwah/cover.webp");
  assert.equal(nusa.coverPosition, "top");
  assert.equal(
    nusa.coverAlt.en,
    "Nusa Dakwah digital content platform landing page",
  );
  assert.equal(
    nusa.coverAlt.id,
    "Halaman awal platform konten digital Nusa Dakwah",
  );
  assert.equal(
    nusa.summary.en,
    "A digital Islamic learning platform with structured modules, articles, YouTube videos, and moderated community discussions.",
  );
  assert.equal(
    nusa.summary.id,
    "Platform pembelajaran dan dakwah digital dengan modul terstruktur, artikel, video YouTube, dan diskusi komunitas yang dimoderasi.",
  );
  assert.deepEqual(nusa.primaryTechnologies, [
    "Figma",
    "Next.js",
    "Laravel",
    "MySQL",
    "Katalon Studio",
    "Docker",
  ]);

  // Prohibited search claims in Hub surface
  assert.doesNotMatch(nusa.summary.en, /search/i);
  assert.doesNotMatch(nusa.summary.id, /pencarian/i);
  assert.doesNotMatch(nusa.coverAlt.en, /search/i);
  assert.doesNotMatch(nusa.coverAlt.id, /pencarian/i);
  assert.doesNotMatch(JSON.stringify(nusa), /search|pencarian/i);

  // No external links in Hub record
  assert.equal("liveUrl" in nusa, false);
  assert.equal("githubUrl" in nusa, false);

  // Absence from Home Selected Projects
  assert.ok(
    !homeSelectedProjects.some((p) => p.slug === "nusa-dakwah"),
    "Nusa Dakwah must remain absent from Home selected projects",
  );
  assert.ok(
    !Object.values(homeFeaturedConfig).includes("nusa-dakwah"),
    "Nusa Dakwah must not be in homeFeaturedConfig",
  );
  assert.equal(homeSelectedProjects.length, 4);
  assert.deepEqual(
    homeSelectedProjects.map((p) => p.slug),
    [
      "ukg-system",
      "ihealth-edu",
      "ml-for-heart-attack-risk-prediction",
      "panoramic-virtual-tour",
    ],
  );
});

test("synchronizes SIMASTOK Hub entry with exact facts, 5-item stack, and absence from Home", () => {
  const simastok = projectArchive.find((p) => p.slug === "simastok");
  assert.ok(simastok, "SIMASTOK must exist in projectArchive");

  // Exact fields
  assert.equal(simastok.index, "05");
  assert.equal(simastok.category, "web-app");
  assert.equal(simastok.title.en, "SIMASTOK SHR Jaya Motor");
  assert.equal(simastok.title.id, "SIMASTOK SHR Jaya Motor");
  assert.equal(simastok.role.en, "Full-Stack Web Developer");
  assert.equal(simastok.role.id, "Full-Stack Web Developer");
  assert.equal(simastok.status.en, "Live Production");
  assert.equal(simastok.status.id, "Live Production");
  assert.equal(simastok.coverImage, "/assets/projects/simastok/cover.webp");
  assert.equal(simastok.coverPosition, "center");
  assert.equal(
    simastok.coverAlt.en,
    "SIMASTOK SHR Jaya Motor inventory system sign-in screen",
  );
  assert.equal(
    simastok.coverAlt.id,
    "Halaman masuk sistem inventaris SIMASTOK SHR Jaya Motor",
  );
  assert.equal(
    simastok.summary.en,
    "An inventory system used by SHR Jaya Motor to replace handwritten stock records with centralized stock tracking, transaction history, and reporting.",
  );
  assert.equal(
    simastok.summary.id,
    "Sistem inventory yang digunakan SHR Jaya Motor untuk menggantikan pencatatan manual dengan pemantauan stok, riwayat transaksi, dan laporan yang terpusat.",
  );
  assert.deepEqual(simastok.primaryTechnologies, [
    "Laravel",
    "PHP",
    "MySQL",
    "Katalon Studio",
    "Docker",
  ]);

  // No external links in Hub record
  assert.equal("liveUrl" in simastok, false);
  assert.equal("githubUrl" in simastok, false);

  // Absence from Home Selected Projects
  assert.ok(
    !homeSelectedProjects.some((p) => p.slug === "simastok"),
    "SIMASTOK must remain absent from Home selected projects",
  );
  assert.ok(
    !Object.values(homeFeaturedConfig).includes("simastok"),
    "SIMASTOK must not be in homeFeaturedConfig",
  );
  assert.equal(homeSelectedProjects.length, 4);
  assert.deepEqual(
    homeSelectedProjects.map((p) => p.slug),
    [
      "ukg-system",
      "ihealth-edu",
      "ml-for-heart-attack-risk-prediction",
      "panoramic-virtual-tour",
    ],
  );

  // All 10 Hub records and order preserved
  assert.equal(projectArchive.length, 10);
  assert.deepEqual(
    projectArchive.map((p) => p.slug),
    expectedSlugs,
  );

  // All category filters preserved
  const counts = getProjectArchiveCategoryCounts(projectArchive);
  assert.deepEqual(counts, {
    all: 10,
    "web-app": 5,
    ml: 2,
    mobile: 2,
    other: 1,
  });

  // Confirm other 9 records remain intact and unchanged
  const otherNineSlugs = expectedSlugs.filter((s) => s !== "simastok");
  assert.equal(otherNineSlugs.length, 9);
  for (const slug of otherNineSlugs) {
    const p = projectArchive.find((proj) => proj.slug === slug);
    assert.ok(p, `Project ${slug} must exist in archive`);
    assert.equal(p.summary.en, expectedSummaries[slug].en);
    assert.equal(p.summary.id, expectedSummaries[slug].id);
  }
});

test("synchronizes Heart ML Hub entry with exact facts, 6-item stack, medical boundary, and absence of metrics or external links", () => {
  const heart = projectArchive.find(
    (p) => p.slug === "ml-for-heart-attack-risk-prediction",
  );
  assert.ok(heart, "Heart ML must exist in projectArchive");

  // Exact fields
  assert.equal(heart.index, "06");
  assert.equal(heart.category, "ml");
  assert.equal(
    heart.title.en,
    "Machine Learning Model for Heart Attack Risk Prediction",
  );
  assert.equal(
    heart.title.id,
    "Machine Learning Model for Heart Attack Risk Prediction",
  );
  assert.equal(heart.role.en, "Machine Learning Engineer");
  assert.equal(heart.role.id, "Machine Learning Engineer");
  assert.equal(heart.status.en, "Completed Prototype");
  assert.equal(heart.status.id, "Completed Prototype");
  assert.equal(
    heart.coverImage,
    "/assets/projects/ml-for-heart-attack-risk-prediction/cover.webp",
  );
  assert.equal(heart.coverPosition, "top");
  assert.equal(
    heart.coverAlt.en,
    "Structured patient input used by the heart attack risk prediction prototype",
  );
  assert.equal(
    heart.coverAlt.id,
    "Input pasien terstruktur untuk prototype prediksi risiko serangan jantung",
  );
  assert.equal(
    heart.summary.en,
    "A machine learning prototype for exploring heart attack risk prediction, with model inference served through a Flask API. Built for experimentation, not medical diagnosis.",
  );
  assert.equal(
    heart.summary.id,
    "Prototype machine learning untuk mengeksplorasi prediksi risiko serangan jantung, dengan inference model melalui Flask API. Dikembangkan untuk eksperimen, bukan diagnosis medis.",
  );
  assert.deepEqual(heart.primaryTechnologies, [
    "Python",
    "Scikit-learn",
    "Pandas",
    "SMOTE",
    "Flask",
    "Docker",
  ]);

  // Absence of metrics and external links in Hub record
  assert.equal("liveUrl" in heart, false);
  assert.equal("githubUrl" in heart, false);
  assert.doesNotMatch(heart.summary.en, /158[,.]?355/);
  assert.doesNotMatch(heart.summary.en, /71\.93%/);
  assert.doesNotMatch(heart.summary.en, /0\.8015/);
  assert.doesNotMatch(heart.summary.id, /158[,.]?355/);
  assert.doesNotMatch(heart.summary.id, /71,93%/);
  assert.doesNotMatch(heart.summary.id, /0,8015/);
  assert.doesNotMatch(JSON.stringify(heart), /kaggle|github\.com/i);

  // No unsupported clinical claims
  assert.doesNotMatch(
    heart.summary.en,
    /clinical diagnosis|diagnostic accuracy|clinical validation|treatment|replaces doctor|replaces healthcare/i,
  );
  assert.doesNotMatch(
    heart.summary.id,
    /diagnosis klinis|akurasi diagnostik|validasi klinis|pengobatan|menggantikan dokter|menggantikan tenaga kesehatan/i,
  );

  // All 10 Hub records and order preserved
  assert.equal(projectArchive.length, 10);
  assert.deepEqual(
    projectArchive.map((p) => p.slug),
    expectedSlugs,
  );

  // All category filters preserved
  const counts = getProjectArchiveCategoryCounts(projectArchive);
  assert.deepEqual(counts, {
    all: 10,
    "web-app": 5,
    ml: 2,
    mobile: 2,
    other: 1,
  });

  // Home Selected Projects synchronization and order
  assert.equal(homeSelectedProjects.length, 4);
  assert.deepEqual(
    homeSelectedProjects.map((p) => p.slug),
    [
      "ukg-system",
      "ihealth-edu",
      "ml-for-heart-attack-risk-prediction",
      "panoramic-virtual-tour",
    ],
  );
  assert.equal(
    homeFeaturedConfig.slot3Slug,
    "ml-for-heart-attack-risk-prediction",
  );

  const homeHeart = homeSelectedProjects[2];
  assert.equal(homeHeart.index, "03");
  assert.equal(homeHeart.title.en, "Heart Attack Risk Prediction");
  assert.equal(homeHeart.title.id, "Heart Attack Risk Prediction");
  assert.equal(homeHeart.role.en, "Machine Learning Engineer");
  assert.equal(homeHeart.role.id, "Machine Learning Engineer");
  assert.equal(homeHeart.status.en, "Completed Prototype");
  assert.equal(homeHeart.status.id, "Completed Prototype");
  assert.equal(
    homeHeart.coverImage,
    "/assets/projects/ml-for-heart-attack-risk-prediction/cover.webp",
  );
  assert.deepEqual(homeHeart.technologies, [
    "Python",
    "Scikit-learn",
    "Pandas",
    "SMOTE",
    "Flask",
    "Docker",
  ]);
  assert.equal(
    homeHeart.summary.en,
    "A machine learning decision-support prototype integrated into iHealth Edu. The selected Random Forest model was evaluated on 158,355 records, achieved 71.93% accuracy and 0.8015 ROC-AUC, and was served through a Flask REST API.",
  );
  assert.equal(
    homeHeart.summary.id,
    "Prototype machine learning decision support yang terintegrasi dengan iHealth Edu. Model Random Forest terpilih dievaluasi menggunakan 158.355 data, menghasilkan accuracy 71,93% dan ROC-AUC 0,8015, lalu disajikan melalui Flask REST API.",
  );

  // Exact locale-specific dataset and metric formatting in Home
  assert.match(homeHeart.summary.en, /158,355 records/);
  assert.match(homeHeart.summary.en, /71\.93% accuracy/);
  assert.match(homeHeart.summary.en, /0\.8015 ROC-AUC/);
  assert.match(homeHeart.summary.id, /158\.355 data/);
  assert.match(homeHeart.summary.id, /accuracy 71,93%/);
  assert.match(homeHeart.summary.id, /ROC-AUC 0,8015/);

  // No unsupported clinical claims in Home
  assert.doesNotMatch(
    homeHeart.summary.en,
    /clinical diagnosis|diagnostic accuracy|clinical validation|treatment|replaces doctor|replaces healthcare/i,
  );
  assert.doesNotMatch(
    homeHeart.summary.id,
    /diagnosis klinis|akurasi diagnostik|validasi klinis|pengobatan|menggantikan dokter|menggantikan tenaga kesehatan/i,
  );

  // Confirm other 9 Hub records remain intact and unchanged
  const otherNineSlugs = expectedSlugs.filter(
    (s) => s !== "ml-for-heart-attack-risk-prediction",
  );
  assert.equal(otherNineSlugs.length, 9);
  for (const slug of otherNineSlugs) {
    const p = projectArchive.find((proj) => proj.slug === slug);
    assert.ok(p, `Project ${slug} must exist in archive`);
    assert.equal(p.summary.en, expectedSummaries[slug].en);
    assert.equal(p.summary.id, expectedSummaries[slug].id);
  }

  // Confirm other 3 Home entries remain intact and unchanged
  assert.equal(homeSelectedProjects[0].slug, "ukg-system");
  assert.equal(homeSelectedProjects[1].slug, "ihealth-edu");
  assert.equal(homeSelectedProjects[3].slug, "panoramic-virtual-tour");
});

test("synchronizes Speech-to-Text System Hub entry with exact facts, 6-item stack, and absence from Home", () => {
  const stt = projectArchive.find((p) => p.slug === "speech-to-text-system");
  assert.ok(stt);

  assert.equal(stt.index, "07");
  assert.equal(stt.category, "ml");
  assert.equal(stt.title.en, "Speech-to-Text System");
  assert.equal(stt.title.id, "Speech-to-Text System");
  assert.equal(stt.role.en, "Machine Learning Engineer");
  assert.equal(stt.role.id, "Machine Learning Engineer");
  assert.equal(stt.status.en, "Completed Prototype");
  assert.equal(stt.status.id, "Completed Prototype");
  assert.equal(
    stt.coverImage,
    "/assets/projects/speech-to-text-system/cover.webp",
  );
  assert.equal(
    stt.coverAlt.en,
    "Side-by-side comparison showing the video sample before subtitles and the final video with burned-in English subtitles",
  );
  assert.equal(
    stt.coverAlt.id,
    "Perbandingan berdampingan menampilkan sampel video sebelum subtitle dan video akhir dengan subtitle bahasa Inggris tertanam",
  );
  assert.equal(stt.coverPosition, "center");

  assert.deepEqual(stt.primaryTechnologies, [
    "Python",
    "Wav2Vec2",
    "Hugging Face Transformers",
    "Librosa",
    "FFmpeg",
    "Google Colab",
  ]);

  assert.equal(
    stt.summary.en,
    "An English speech-to-text prototype that processes audio and video with pretrained Wav2Vec2, then exports transcripts, SRT subtitles, and video with burned-in captions.",
  );
  assert.equal(
    stt.summary.id,
    "Prototype speech-to-text bahasa Inggris yang memproses audio dan video menggunakan pretrained Wav2Vec2, lalu menghasilkan transkrip, subtitle SRT, dan video dengan subtitle tertanam.",
  );

  // Factual boundaries and absence of metrics or external links
  assert.doesNotMatch(
    stt.summary.en,
    /fine-tuned|custom-trained|WER|CER|accuracy|benchmark|multilingual/i,
  );
  assert.doesNotMatch(
    stt.summary.id,
    /fine-tuning|custom-trained|WER|CER|akurasi|benchmark|multilingual/i,
  );
  assert.doesNotMatch(JSON.stringify(stt), /github\.com/i);

  // All 10 Hub records and order preserved
  assert.equal(projectArchive.length, 10);
  assert.deepEqual(
    projectArchive.map((p) => p.slug),
    expectedSlugs,
  );

  // All category filters preserved
  const counts = getProjectArchiveCategoryCounts(projectArchive);
  assert.deepEqual(counts, {
    all: 10,
    "web-app": 5,
    ml: 2,
    mobile: 2,
    other: 1,
  });

  // Home Selected Projects synchronization and order: Speech-to-Text must NOT be in Home Selected Projects
  assert.equal(homeSelectedProjects.length, 4);
  assert.deepEqual(
    homeSelectedProjects.map((p) => p.slug),
    [
      "ukg-system",
      "ihealth-edu",
      "ml-for-heart-attack-risk-prediction",
      "panoramic-virtual-tour",
    ],
  );
  assert.equal(
    homeSelectedProjects.some((p) => p.slug === "speech-to-text-system"),
    false,
  );

  // Confirm other 9 Hub records remain intact and unchanged
  const otherNineSlugs = expectedSlugs.filter(
    (s) => s !== "speech-to-text-system",
  );
  assert.equal(otherNineSlugs.length, 9);
  for (const slug of otherNineSlugs) {
    const p = projectArchive.find((proj) => proj.slug === slug);
    assert.ok(p, `Project ${slug} must exist in archive`);
    assert.equal(p.summary.en, expectedSummaries[slug].en);
    assert.equal(p.summary.id, expectedSummaries[slug].id);
  }
});


