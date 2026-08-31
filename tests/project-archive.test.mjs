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
  "Full-Stack Web Developer",
  "Full-Stack Web Developer",
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
  "Completed Workflow",
  "Completed Application",
  "Completed Application",
  "Completed Prototype",
];

const expectedSummaries = {
  "ukg-system": {
    en: "A multi-branch ERP developed end-to-end for CV Universal Kharisma Globalindo, covering operational workflows, automated testing, and production deployment.",
    id: "ERP multi-cabang yang dikembangkan secara end-to-end untuk CV Universal Kharisma Globalindo, mencakup workflow operasional, automated testing, dan deployment ke production.",
  },
  "ihealth-edu": {
    en: "A health education and screening platform developed with Puskesmas Padangsari, integrating patient data management, IoT telemetry, and machine learning decision support.",
    id: "Platform edukasi dan screening kesehatan yang dikembangkan bersama Puskesmas Padangsari, dengan pengelolaan data pasien, telemetri IoT, dan dukungan pengambilan keputusan berbasis machine learning.",
  },
  "dialisis-connect-edu": {
    en: "A kidney health education and community platform developed with IPDI Central Java, providing learning resources, video guides, digital booklets, and discussion forums.",
    id: "Platform edukasi dan komunitas kesehatan ginjal yang dikembangkan bersama IPDI Jawa Tengah, menyediakan materi pembelajaran, panduan video, booklet digital, dan forum diskusi.",
  },
  "nusa-dakwah": {
    en: "A digital learning and dakwah platform with structured learning modules, multimedia content, search, and moderated discussions.",
    id: "Platform pembelajaran dan dakwah digital dengan modul pembelajaran terstruktur, konten multimedia, pencarian, dan diskusi yang dimoderasi.",
  },
  simastok: {
    en: "A spare-parts inventory system that brings stock management, transaction records, and reporting into one application with role-based access.",
    id: "Sistem inventory suku cadang yang menyatukan pengelolaan stok, pencatatan transaksi, dan laporan dalam satu aplikasi dengan akses berbasis role.",
  },
  "ml-for-heart-attack-risk-prediction": {
    en: "A machine learning prototype for exploring heart attack risk prediction, with model inference served through a Flask API. Built for experimentation, not medical diagnosis.",
    id: "Prototype machine learning untuk mengeksplorasi prediksi risiko serangan jantung, dengan inferensi model melalui Flask API. Dikembangkan untuk eksperimen, bukan diagnosis medis.",
  },
  "speech-to-text-system": {
    en: "An audio and video transcription workflow using Wav2Vec2, covering audio preparation, speech recognition, and export to text files and video subtitles.",
    id: "Workflow transkripsi audio dan video menggunakan Wav2Vec2, mencakup pengolahan audio, pengenalan ucapan, serta ekspor ke file teks dan subtitle video.",
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

test("enforces max 6 displayed technologies and exact 5 items for iHealth excluding ESP32", () => {
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

  const ihealth = projectArchive.find((p) => p.slug === "ihealth-edu");
  assert.ok(ihealth);
  assert.deepEqual(ihealth.primaryTechnologies, [
    "Next.js",
    "Laravel",
    "MySQL",
    "Flask",
    "Docker",
  ]);
  assert.ok(
    !ihealth.primaryTechnologies.includes("ESP32"),
    "iHealth displayed stack must exclude ESP32",
  );
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
  assert.match(ihealth.summary.id, /dukungan pengambilan keputusan/i);
});

test("exposes only the verified UKG production link with approved destination", () => {
  const linkedProjects = projectArchive.filter((project) => project.liveUrl);
  assert.deepEqual(
    linkedProjects.map(({ slug, liveUrl }) => ({ slug, liveUrl })),
    [{ slug: "ukg-system", liveUrl: "https://ukgsystem.site/" }],
  );
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

  // Confirms use of approved CTA copy
  assert.match(rowSource, /projectArchiveCopy\.cta/);
  assert.match(rowSource, /detailHref/);

  // Confirms 5-part row content structure: title, role & status, summary, stack, cta
  assert.match(rowSource, /project\.title\[locale\]/);
  assert.match(rowSource, /project\.role\[locale\]/);
  assert.match(rowSource, /project\.status\[locale\]/);
  assert.match(rowSource, /project\.summary\[locale\]/);
  assert.match(rowSource, /project\.primaryTechnologies/);
  assert.match(rowSource, /slice\(0,\s*6\)/);
});

test("project-archive.module.css defines responsive editorial grid and touch target requirements", () => {
  const cssSource = fs.readFileSync(
    path.join(
      process.cwd(),
      "src/components/projects/project-archive.module.css",
    ),
    "utf8",
  );

  // Desktop 3-column grid structure
  assert.match(cssSource, /\.row\s*\{[^}]*grid-template-columns:/);

  // Tablet side-by-side adaptation (640px to 1023px)
  assert.match(cssSource, /@media\s*\(\s*min-width:\s*640px\s*\)\s*and\s*\(\s*max-width:\s*1023px\s*\)/);
  assert.match(cssSource, /\.tabletIndex/);

  // Mobile stacked adaptation (< 640px)
  assert.match(cssSource, /@media\s*\(\s*max-width:\s*639px\s*\)/);
  assert.match(cssSource, /\.mobileIndex/);

  // 44px minimum touch target on actions and buttons
  assert.match(cssSource, /min-block-size:\s*2\.75rem/);

  // Neutral background and image containment
  assert.match(cssSource, /object-fit:\s*contain/);

  // Reduced motion support
  assert.match(cssSource, /@media\s*\(\s*prefers-reduced-motion:\s*reduce\s*\)/);
});

test("ProjectArchive and ProjectArchiveRow apply ScrollReveal to group headers and project rows", () => {
  const archiveSource = fs.readFileSync(
    path.join(process.cwd(), "src/components/projects/project-archive.tsx"),
    "utf8",
  );
  const rowSource = fs.readFileSync(
    path.join(process.cwd(), "src/components/projects/project-archive-row.tsx"),
    "utf8",
  );

  // Group headers wrapped in ScrollReveal
  assert.match(archiveSource, /<ScrollReveal[^>]*>\s*<header className={styles\.groupHeader}>/);

  // Individual rows wrapped in ScrollReveal
  assert.match(rowSource, /<ScrollReveal[^>]*>\s*<article className={styles\.row}/);
});
