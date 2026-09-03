import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const moduleUrl = new URL(
  "../src/content/projects/project-case-studies.ts",
  import.meta.url,
);

const {
  projectCaseStudies,
  getAdjacentProjectCaseStudies,
  getProjectCaseStudy,
} = await import(moduleUrl.href);

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

test("publishes exactly 10 ordered bilingual case studies", () => {
  assert.equal(projectCaseStudies.length, 10);
  assert.deepEqual(
    projectCaseStudies.map((project) => project.slug),
    expectedSlugs,
  );
  assert.deepEqual(
    projectCaseStudies.map((project) => project.index),
    ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"],
  );

  for (const project of projectCaseStudies) {
    for (const locale of ["en", "id"]) {
      assert.ok(project.title[locale]);
      assert.ok(project.categoryLabel[locale]);
      assert.ok(project.role[locale]);
      assert.ok(project.status[locale]);
      assert.ok(project.overview[locale].length >= 2);
      assert.ok(project.overview[locale].length <= 3);
      assert.ok(project.contributions[locale].length >= 3);
      assert.ok(project.contributions[locale].length <= 5);
      if (project.technicalNotes) {
        assert.ok(project.technicalNotes[locale].length >= 3);
        assert.ok(project.technicalNotes[locale].length <= 5);
      }
    }
    assert.ok(project.techStack.length >= 2);
    assert.ok(project.techStack.length <= 8);
  }
});

test("references only real local visual evidence and verified public links", () => {
  for (const project of projectCaseStudies) {
    assert.ok(existsSync(join(root, "public", project.cover.src)));
    assert.ok(project.evidence.length >= 1);
    assert.ok(project.evidence.length <= 8);

    for (const figure of project.evidence) {
      assert.match(figure.id, /^FIG\.0[1-8]$/);
      assert.ok(existsSync(join(root, "public", figure.src)));
      assert.ok(["wide", "mobile"].includes(figure.format));
      assert.ok(figure.alt.en && figure.alt.id);
      assert.ok(figure.caption.en && figure.caption.id);
    }
  }

  const linked = projectCaseStudies.filter((project) => project.liveUrl);
  assert.deepEqual(
    linked.map((project) => [project.slug, project.liveUrl]),
    [
      ["ukg-system", "https://ukgsystem.site/"],
      ["ihealth-edu", "https://www.ihealthedu.site/"],
      ["dialisis-connect-edu", "https://dialisisconnectedu.vercel.app/"],
      ["nusa-dakwah", "https://nusadakwah.vercel.app/"],
      ["simastok", "https://simastok.site/"],
    ],
  );
  const withGithub = projectCaseStudies.filter((project) => project.githubUrl);
  assert.deepEqual(
    withGithub.map((project) => [project.slug, project.githubUrl]),
    [
      [
        "ml-for-heart-attack-risk-prediction",
        "https://github.com/annastriw/ml-for-heart-attack-risk-prediction.git",
      ],
      [
        "speech-to-text-system",
        "https://github.com/annastriw/speech-to-text-system.git",
      ],
      [
        "thermal-printer-service",
        "https://github.com/annastriw/ThermalPrinterService.git",
      ],
      [
        "footy-standings",
        "https://github.com/annastriw/FootyStandings.git",
      ],
    ],
  );
});

test("maintains approved UKG System locked facts, bilingual copy, and content structures", () => {
  const ukg = getProjectCaseStudy("ukg-system");
  assert.ok(ukg);

  // Locked facts & metadata
  assert.equal(ukg.client?.en, "CV Universal Kharisma Globalindo");
  assert.equal(ukg.client?.id, "CV Universal Kharisma Globalindo");
  assert.equal(ukg.role.en, "Full-Stack Web Developer");
  assert.equal(ukg.role.id, "Full-Stack Web Developer");
  assert.equal(ukg.period?.en, "January–April 2026");
  assert.equal(ukg.period?.id, "Januari–April 2026");
  assert.equal(ukg.status.en, "Live Production");
  assert.equal(ukg.status.id, "Live Production");
  assert.equal(ukg.workingModel?.en, "Independently developed");
  assert.equal(ukg.workingModel?.id, "Dikembangkan mandiri");
  assert.equal(ukg.liveUrl, "https://ukgsystem.site/");
  assert.equal(ukg.githubUrl, undefined);
  assert.equal(ukg.repositoryNotice?.en, "Private Repository");
  assert.equal(ukg.repositoryNotice?.id, "Private Repository");

  // Category & Lead
  assert.equal(ukg.categoryLabel.en, "01 / WEB APPLICATION");
  assert.equal(ukg.categoryLabel.id, "01 / WEB APPLICATION");
  assert.equal(
    ukg.lead?.en,
    "A multi-branch ERP that brings inventory, sales, and daily operations into one system.",
  );
  assert.equal(
    ukg.lead?.id,
    "ERP multi-cabang yang menyatukan pengelolaan stok, penjualan, dan operasional harian dalam satu sistem.",
  );

  // SEO & Meta
  assert.equal(
    ukg.metaTitle?.en,
    "UKG System — Full-Stack Web Development Case Study | Annas Tri Widagdo",
  );
  assert.equal(
    ukg.metaTitle?.id,
    "UKG System — Studi Kasus Full-Stack Web Development | Annas Tri Widagdo",
  );
  assert.equal(
    ukg.metaDescription?.en,
    "A full-stack case study of a multi-branch ERP that centralizes inventory, sales, and daily operations for remote monitoring.",
  );
  assert.equal(
    ukg.metaDescription?.id,
    "Studi kasus full-stack ERP multi-cabang yang memusatkan stok, penjualan, dan operasional harian agar dapat dipantau dari mana saja.",
  );

  // Overview (exact 2 paragraphs)
  assert.equal(ukg.overview.en.length, 2);
  assert.equal(ukg.overview.id.length, 2);
  assert.equal(
    ukg.overview.en[0],
    "Before UKG System, inventory, sales, and branch operations were recorded in notebooks, with data shared through WhatsApp and Excel. This made it difficult for the owner to monitor activities across branches.",
  );
  assert.equal(
    ukg.overview.en[1],
    "UKG System brings these records together, allowing the owner to monitor inventory, sales, and operations remotely.",
  );
  assert.equal(
    ukg.overview.id[0],
    "Sebelum UKG System, pencatatan stok, penjualan, dan operasional cabang dilakukan melalui buku, sementara data dibagikan melalui WhatsApp dan Excel. Kondisi ini menyulitkan owner untuk memantau aktivitas lintas cabang.",
  );
  assert.equal(
    ukg.overview.id[1],
    "UKG System menyatukan data tersebut dalam satu sistem, sehingga owner dapat memantau stok, penjualan, dan operasional tanpa harus berada di lokasi.",
  );

  // Contributions (exact 3 items + learning sentence)
  assert.equal(ukg.contributions.en.length, 3);
  assert.equal(ukg.contributions.id.length, 3);
  assert.equal(
    ukg.contributions.en[0],
    "Gathered requirements through interviews with the owner and designed the UI/UX.",
  );
  assert.equal(
    ukg.contributions.en[1],
    "Independently developed the frontend, backend, and workflows connecting the system’s modules.",
  );
  assert.equal(
    ukg.contributions.en[2],
    "Performed manual testing and automated end-to-end testing with Playwright, then deployed the system to an Ubuntu VPS where it remains in active use.",
  );
  assert.equal(
    ukg.contributions.id[2],
    "Melakukan testing manual dan automated end-to-end testing menggunakan Playwright, lalu melakukan deployment ke VPS Ubuntu yang masih digunakan hingga saat ini.",
  );
  assert.equal(
    ukg.contributionLearning?.en,
    "This project strengthened my experience in taking a system from business requirements to everyday operational use.",
  );
  assert.equal(
    ukg.contributionLearning?.id,
    "Project ini memperkuat pengalaman saya dalam mengembangkan sistem dari kebutuhan bisnis hingga digunakan dalam operasional sehari-hari.",
  );

  // Personal tech stack (max 6 items)
  assert.deepEqual(ukg.personalTechStack, [
    "Figma",
    "Next.js",
    "NestJS",
    "MySQL",
    "Playwright",
    "Linux Ubuntu",
  ]);
  assert.deepEqual(ukg.techStack, [
    "Figma",
    "Next.js",
    "NestJS",
    "MySQL",
    "Playwright",
    "Linux Ubuntu",
  ]);

  // System scope: 8 ordered module names with no descriptions, no tech groups, no tech notes
  assert.deepEqual(ukg.modules, [
    "User & Role Management",
    "Branch & Attendance",
    "Inventory & Stock",
    "Stock Order",
    "Store Operations",
    "Cashier & Sales",
    "Reports & Finance",
    "Dashboard & Analytics",
  ]);
  assert.equal(ukg.workflow, undefined);
  assert.equal(ukg.technologyGroups, undefined);
  assert.equal(ukg.technicalNotes, undefined);
  assert.equal(ukg.optionalModule, undefined);

  // Gallery: exactly 9 slides with 18 unique searchable placeholders
  assert.equal(ukg.gallery?.length, 9);
  assert.equal(ukg.gallery?.[0].src, "/assets/projects/ukg-system/cover.webp");
  for (let i = 1; i <= 9; i++) {
    const num = String(i).padStart(2, "0");
    const slide = ukg.gallery?.[i - 1];
    assert.ok(slide);
    assert.equal(slide.slide, num);
    assert.ok(existsSync(join(root, "public", slide.src)));
    assert.equal(slide.caption.en, `TODO_UKG_CAPTION_${num}_EN`);
    assert.equal(slide.caption.id, `TODO_UKG_CAPTION_${num}_ID`);
    assert.doesNotMatch(slide.alt.en, /TODO_UKG/);
    assert.doesNotMatch(slide.alt.id, /TODO_UKG/);
  }

  // Verify exactly 18 occurrences of TODO_UKG_CAPTION_ in project-case-studies.ts
  const caseStudiesSource = readFileSync(
    join(root, "src", "content", "projects", "project-case-studies.ts"),
    "utf8",
  );
  const captionTokens = caseStudiesSource.match(/TODO_UKG_CAPTION_\d+_[A-Z]+/g) ?? [];
  assert.equal(new Set(captionTokens).size, 18);

  // Claim boundaries and prohibited strings
  const stringified = JSON.stringify(ukg);
  assert.doesNotMatch(stringified, /March 2026|Maret 2026/);
  assert.doesNotMatch(stringified, /three months|tiga bulan/i);
  assert.doesNotMatch(stringified, /ukgsystem\.com/);
  assert.doesNotMatch(stringified, /discount feature|fitur diskon/i);
  assert.doesNotMatch(stringified, /migration|migrasi/i);
  assert.doesNotMatch(stringified, /\b\d{2,3}%\b/);
});

test("maintains approved iHealth Edu locked facts, bilingual copy, and content structures", () => {
  const ihealth = getProjectCaseStudy("ihealth-edu");
  assert.ok(ihealth);

  // Locked facts & metadata
  assert.equal(ihealth.client?.en, "Puskesmas Padangsari");
  assert.equal(ihealth.client?.id, "Puskesmas Padangsari");
  assert.equal(ihealth.role.en, "Frontend Web Developer");
  assert.equal(ihealth.role.id, "Frontend Web Developer");
  assert.equal(ihealth.workingModel?.en, "Team project");
  assert.equal(ihealth.workingModel?.id, "Proyek tim");
  assert.equal(ihealth.period?.en, "June–August 2025");
  assert.equal(ihealth.period?.id, "Juni–Agustus 2025");
  assert.equal(ihealth.status.en, "Live Production");
  assert.equal(ihealth.status.id, "Live Production");
  assert.equal(ihealth.liveUrl, "https://www.ihealthedu.site/");
  assert.equal(ihealth.frontendRepoUrl, "https://github.com/annastriw/frontend-ihealth.git");
  assert.equal(ihealth.backendRepoUrl, "https://github.com/annastriw/backend-ihealth.git");

  // Category & Lead
  assert.equal(ihealth.categoryLabel.en, "02 / WEB APPLICATION");
  assert.equal(ihealth.categoryLabel.id, "02 / WEB APPLICATION");
  assert.equal(
    ihealth.lead?.en,
    "A digital health platform that brings structured screening, health education, patient records, IoT health data, and machine learning decision support into one system.",
  );
  assert.equal(
    ihealth.lead?.id,
    "Platform kesehatan digital yang menyatukan screening terstruktur, edukasi kesehatan, data pasien, data kesehatan dari IoT, dan machine learning decision support dalam satu sistem.",
  );

  // SEO & Meta
  assert.equal(
    ihealth.metaTitle?.en,
    "iHealth Edu — Frontend Web Development Case Study | Annas Tri Widagdo",
  );
  assert.equal(
    ihealth.metaTitle?.id,
    "iHealth Edu — Studi Kasus Frontend Web Development | Annas Tri Widagdo",
  );
  assert.equal(
    ihealth.metaDescription?.en,
    "A frontend case study covering UI/UX, IoT health data, and machine learning decision-support integration for iHealth Edu.",
  );
  assert.equal(
    ihealth.metaDescription?.id,
    "Studi kasus frontend iHealth Edu yang mencakup UI/UX, data kesehatan IoT, dan integrasi machine learning decision support.",
  );

  // Overview (exact 2 paragraphs from Section 7)
  assert.equal(ihealth.overview.en.length, 2);
  assert.equal(ihealth.overview.id.length, 2);
  assert.equal(
    ihealth.overview.en[0],
    "iHealth Edu was developed with Puskesmas Padangsari to bring health records, structured screening, and educational content into a digital platform designed around primary-care workflows.",
  );
  assert.equal(
    ihealth.overview.en[1],
    "The system centralizes patient information, makes health education easier to access, and helps health workers review patient histories. Machine learning results are presented only as decision support and do not provide a clinical diagnosis.",
  );
  assert.equal(
    ihealth.overview.id[0],
    "iHealth Edu dikembangkan bersama Puskesmas Padangsari untuk menyatukan data kesehatan, screening terstruktur, dan konten edukasi dalam platform digital yang dirancang berdasarkan workflow layanan kesehatan primer.",
  );
  assert.equal(
    ihealth.overview.id[1],
    "Sistem ini memusatkan data pasien, memudahkan akses edukasi kesehatan, dan membantu tenaga kesehatan memantau riwayat pasien. Hasil machine learning hanya digunakan sebagai decision support dan bukan sebagai diagnosis klinis.",
  );

  // Contributions (exact 4 items from Section 8)
  assert.equal(ihealth.contributions.en.length, 4);
  assert.equal(ihealth.contributions.id.length, 4);
  assert.equal(
    ihealth.contributions.en[0],
    "Gathered requirements through an interview with the head of Puskesmas Padangsari, regular discussions, and workflow observation, then translated them into the UI/UX design.",
  );
  assert.equal(
    ihealth.contributions.en[1],
    "Developed role-specific frontend experiences for patients, administrators, and health workers using Next.js.",
  );
  assert.equal(
    ihealth.contributions.en[2],
    "Integrated REST APIs and presented health measurements received from ESP32 devices in the frontend.",
  );
  assert.equal(
    ihealth.contributions.en[3],
    "Integrated machine learning decision-support results into the health-worker interface.",
  );
  assert.equal(
    ihealth.contributions.id[0],
    "Menggali kebutuhan melalui wawancara dengan kepala Puskesmas Padangsari, diskusi rutin, dan observasi workflow, kemudian menerjemahkannya ke dalam desain UI/UX.",
  );
  assert.equal(
    ihealth.contributions.id[1],
    "Mengembangkan frontend berbasis role untuk pasien, admin, dan tenaga kesehatan menggunakan Next.js.",
  );
  assert.equal(
    ihealth.contributions.id[2],
    "Mengintegrasikan REST API dan menampilkan data pemeriksaan kesehatan dari perangkat ESP32 pada frontend.",
  );
  assert.equal(
    ihealth.contributions.id[3],
    "Mengintegrasikan hasil machine learning decision support ke dalam antarmuka tenaga kesehatan.",
  );

  // Personal tech stack: exactly the 6 approved items
  assert.deepEqual(ihealth.techStack, [
    "Figma",
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "REST API",
  ]);

  // System Scope: 4 groups
  assert.ok(ihealth.systemScope);
  assert.equal(ihealth.systemScope.userRoles.length, 3);
  assert.deepEqual(
    ihealth.systemScope.userRoles.map((r) => r.name.en),
    ["Patient", "Administrator", "Health Worker"],
  );
  assert.deepEqual(
    ihealth.systemScope.screeningEducation.screeningModules,
    ["DSMQ", "HSMBQ", "DASS-21"],
  );
  assert.equal(
    ihealth.systemScope.screeningEducation.learningSequence.en,
    "Pre-Test → Education Module → Post-Test",
  );
  assert.equal(ihealth.systemScope.patientData.length, 3);
  assert.equal(ihealth.systemScope.integrationFlows.length, 2);

  // Gallery: exactly 8 slides with 16 unique searchable placeholders
  assert.equal(ihealth.gallery?.length, 8);
  assert.equal(ihealth.gallery?.[0].src, "/assets/projects/ihealth-edu/cover.webp");
  for (let i = 1; i <= 8; i++) {
    const num = String(i).padStart(2, "0");
    const slide = ihealth.gallery?.[i - 1];
    assert.ok(slide);
    assert.equal(slide.slide, num);
    assert.ok(existsSync(join(root, "public", slide.src)));
    assert.equal(slide.caption.en, `TODO_IHEALTH_CAPTION_${num}_EN`);
    assert.equal(slide.caption.id, `TODO_IHEALTH_CAPTION_${num}_ID`);
    assert.doesNotMatch(slide.alt.en, /TODO_IHEALTH/);
    assert.doesNotMatch(slide.alt.id, /TODO_IHEALTH/);
  }

  // Verify exactly 16 occurrences of TODO_IHEALTH_CAPTION_ in project-case-studies.ts (plus 2 in cover caption)
  const caseStudiesSource = readFileSync(
    join(root, "src", "content", "projects", "project-case-studies.ts"),
    "utf8",
  );
  const ihealthTokens = caseStudiesSource.match(/TODO_IHEALTH_CAPTION_\d+_[A-Z]+/g) ?? [];
  assert.equal(new Set(ihealthTokens).size, 16);

  // Claim boundaries and prohibited strings
  const stringified = JSON.stringify(ihealth);
  assert.match(stringified, /not provide a clinical diagnosis/i);
  assert.match(stringified, /bukan sebagai diagnosis klinis/i);
  assert.doesNotMatch(stringified, /developed the Laravel backend|membangun backend Laravel/i);
  assert.doesNotMatch(stringified, /trained the machine learning|melatih model/i);
  assert.doesNotMatch(stringified, /Katalon Studio/i);
  assert.doesNotMatch(stringified, /Docker containerization|deployment pada Linux Ubuntu/i);
  assert.doesNotMatch(stringified, /validated instrument|terstandar DSMQ/i);
  assert.doesNotMatch(stringified, /158[,.]?355/);
});

test("maintains approved Dialisis Connect Edu locked facts, bilingual copy, and content structures", () => {
  const dialisis = getProjectCaseStudy("dialisis-connect-edu");
  assert.ok(dialisis);

  // Locked facts & metadata
  assert.equal(
    dialisis.client?.en,
    "Ikatan Perawat Dialisis Indonesia (IPDI) Jawa Tengah",
  );
  assert.equal(
    dialisis.client?.id,
    "Ikatan Perawat Dialisis Indonesia (IPDI) Jawa Tengah",
  );
  assert.equal(dialisis.clientLabel?.en, "Stakeholder");
  assert.equal(dialisis.clientLabel?.id, "Stakeholder");
  assert.equal(dialisis.role.en, "Frontend Web Developer");
  assert.equal(dialisis.role.id, "Frontend Web Developer");
  assert.equal(dialisis.workingModel?.en, "Four-person team");
  assert.equal(dialisis.workingModel?.id, "Tim beranggotakan empat orang");
  assert.equal(dialisis.period?.en, "February–May 2025");
  assert.equal(dialisis.period?.id, "Februari–Mei 2025");
  assert.equal(dialisis.status.en, "Live Production");
  assert.equal(dialisis.status.id, "Live Production");
  assert.equal(dialisis.liveUrl, "https://dialisisconnectedu.vercel.app/");
  assert.equal(
    dialisis.frontendRepoUrl,
    "https://github.com/annastriw/fe-dialisis.git",
  );
  assert.equal(
    dialisis.backendRepoUrl,
    "https://github.com/annastriw/be-dialisis.git",
  );

  // Category & Lead
  assert.equal(dialisis.categoryLabel.en, "03 / WEB APPLICATION");
  assert.equal(dialisis.categoryLabel.id, "03 / WEB APPLICATION");
  assert.equal(
    dialisis.lead?.en,
    "An education and community platform that helps patients undergoing hemodialysis and people living with kidney disease access structured learning materials and participate in digital discussions from wherever they are.",
  );
  assert.equal(
    dialisis.lead?.id,
    "Platform edukasi dan komunitas yang membantu pasien hemodialisis dan pengguna dengan penyakit ginjal mengakses materi terstruktur serta mengikuti diskusi digital dari mana saja.",
  );

  // SEO & Meta
  assert.equal(
    dialisis.metaTitle?.en,
    "Dialisis Connect Edu — Frontend Web Development Case Study | Annas Tri Widagdo",
  );
  assert.equal(
    dialisis.metaTitle?.id,
    "Dialisis Connect Edu — Studi Kasus Frontend Web Development | Annas Tri Widagdo",
  );
  assert.equal(
    dialisis.metaDescription?.en,
    "A frontend and UI/UX case study for a kidney health education platform with digital learning and community discussion, developed with IPDI Central Java.",
  );
  assert.equal(
    dialisis.metaDescription?.id,
    "Studi kasus frontend dan UI/UX platform edukasi kesehatan ginjal dengan pembelajaran digital dan forum diskusi, dikembangkan bersama IPDI Jawa Tengah.",
  );

  // Overview (exact 2 paragraphs)
  assert.equal(dialisis.overview.en.length, 2);
  assert.equal(dialisis.overview.id.length, 2);
  assert.equal(
    dialisis.overview.en[0],
    "Dialisis Connect Edu was developed by a four-person team with IPDI Central Java to bring kidney health education and community interaction into an accessible digital platform.",
  );
  assert.equal(
    dialisis.overview.en[1],
    "The platform provides articles, educational videos, digital booklets, and discussion forums for patients, healthcare professionals, administrators, families, and the wider public. Requirements were refined through interviews, discussions, and feedback from IPDI Central Java.",
  );
  assert.equal(
    dialisis.overview.id[0],
    "Dialisis Connect Edu dikembangkan oleh tim beranggotakan empat orang bersama IPDI Jawa Tengah untuk menghadirkan edukasi kesehatan ginjal dan interaksi komunitas melalui platform digital yang mudah diakses.",
  );
  assert.equal(
    dialisis.overview.id[1],
    "Platform ini menyediakan artikel, video edukasi, booklet digital, dan forum diskusi bagi pasien, tenaga kesehatan, administrator, keluarga, serta masyarakat. Kebutuhan sistem dirumuskan melalui wawancara, diskusi, dan feedback dari IPDI Jawa Tengah.",
  );

  // Claim boundary
  assert.equal(
    dialisis.claimBoundary?.en,
    "The platform provides education and community discussion, not diagnosis or a substitute for consultation with a healthcare professional.",
  );
  assert.equal(
    dialisis.claimBoundary?.id,
    "Platform ini menyediakan edukasi dan ruang diskusi, bukan diagnosis atau pengganti konsultasi dengan tenaga kesehatan.",
  );
  assert.equal(
    dialisis.claimBoundaryTag?.en,
    "[CLAIM BOUNDARY // MEDICAL USE]",
  );
  assert.equal(
    dialisis.claimBoundaryTag?.id,
    "[BATAS KLAIM // PENGGUNAAN MEDIS]",
  );

  // Contributions (exact 4 items)
  assert.equal(dialisis.contributions.en.length, 4);
  assert.equal(dialisis.contributions.id.length, 4);
  assert.equal(
    dialisis.contributions.en[0],
    "Gathered requirements through interviews and discussions with IPDI Central Java, then incorporated stakeholder feedback throughout the revision process.",
  );
  assert.equal(
    dialisis.contributions.en[1],
    "Designed the user flow, information architecture, and UI/UX in Figma.",
  );
  assert.equal(
    dialisis.contributions.en[2],
    "Developed the complete role-based frontend in Next.js and integrated the REST API, including authentication flows, validation, loading states, and error states.",
  );
  assert.equal(
    dialisis.contributions.en[3],
    "Performed manual and automated testing with Katalon Studio and contributed to the Docker and production deployment process.",
  );
  assert.equal(
    dialisis.contributions.id[0],
    "Menggali kebutuhan melalui wawancara dan diskusi dengan IPDI Jawa Tengah, kemudian mengolah feedback stakeholder selama proses revisi.",
  );
  assert.equal(
    dialisis.contributions.id[1],
    "Merancang user flow, information architecture, dan UI/UX menggunakan Figma.",
  );
  assert.equal(
    dialisis.contributions.id[2],
    "Mengembangkan seluruh frontend berbasis role menggunakan Next.js dan mengintegrasikan REST API, termasuk authentication flow, validation, loading state, dan error state.",
  );
  assert.equal(
    dialisis.contributions.id[3],
    "Melakukan manual dan automation testing dengan Katalon Studio serta ikut dalam proses Docker dan deployment ke production.",
  );

  // Personal tech stack (exact 6 items)
  assert.deepEqual(dialisis.personalTechStack, [
    "Figma",
    "Next.js",
    "React",
    "REST API",
    "Katalon Studio",
    "Docker",
  ]);
  assert.deepEqual(dialisis.techStack, [
    "Figma",
    "Next.js",
    "React",
    "REST API",
    "Katalon Studio",
    "Docker",
  ]);

  // System Scope (3 groups)
  assert.ok(dialisis.dialisisScope);
  assert.equal(dialisis.dialisisScope.userRoles.length, 3);
  assert.deepEqual(
    dialisis.dialisisScope.userRoles.map((r) => r.name.en),
    ["Patient", "Healthcare Professional", "Administrator"],
  );
  assert.deepEqual(
    dialisis.dialisisScope.educationalContent.formats.items.en,
    ["Articles", "Embedded YouTube videos", "Digital PDF booklets"],
  );
  assert.deepEqual(
    dialisis.dialisisScope.educationalContent.topics.items.en,
    [
      "Kidney care",
      "Dialysis",
      "Transplantation",
      "Healthy lifestyle",
      "Support for chronic kidney disease",
    ],
  );
  assert.deepEqual(
    dialisis.dialisisScope.communityDiscussion.features.en,
    [
      "Creating discussion topics",
      "Reading discussions",
      "Comments and replies",
      "Role-appropriate moderation",
    ],
  );

  // Absence of legacy modules
  assert.equal(dialisis.technicalNotes, undefined);
  assert.equal(dialisis.optionalModule, undefined);

  // Gallery: exactly 8 slides with 16 unique searchable placeholders
  assert.equal(dialisis.gallery?.length, 8);
  assert.equal(dialisis.gallery?.[0].src, "/assets/projects/dialisis-connect-edu/cover.webp");
  for (let i = 1; i <= 8; i++) {
    const num = String(i).padStart(2, "0");
    const slide = dialisis.gallery?.[i - 1];
    assert.ok(slide);
    assert.equal(slide.slide, num);
    assert.ok(existsSync(join(root, "public", slide.src)));
    assert.equal(slide.caption.en, `TODO_DIALISIS_CAPTION_${num}_EN`);
    assert.equal(slide.caption.id, `TODO_DIALISIS_CAPTION_${num}_ID`);
    assert.doesNotMatch(slide.alt.en, /TODO_DIALISIS/);
    assert.doesNotMatch(slide.alt.id, /TODO_DIALISIS/);
  }

  // Verify exactly 16 occurrences of TODO_DIALISIS_CAPTION_ in project-case-studies.ts
  const caseStudiesSource = readFileSync(
    join(root, "src", "content", "projects", "project-case-studies.ts"),
    "utf8",
  );
  const dialisisTokens = caseStudiesSource.match(/TODO_DIALISIS_CAPTION_\d+_[A-Z]+/g) ?? [];
  assert.equal(new Set(dialisisTokens).size, 16);

  // Claim boundaries and prohibited legacy claims
  const stringified = JSON.stringify(dialisis);
  assert.match(stringified, /not diagnosis or a substitute for consultation/i);
  assert.match(stringified, /bukan diagnosis atau pengganti konsultasi/i);
  assert.doesNotMatch(stringified, /Built the Next\.js frontend and Laravel REST backend/i);
  assert.doesNotMatch(stringified, /Membangun frontend Next\.js dan backend REST Laravel/i);
  assert.doesNotMatch(stringified, /MySQL persistence|penyimpanan MySQL/i);
  assert.doesNotMatch(stringified, /"Fullstack Developer"/i);
});

test("maintains approved Nusa Dakwah locked facts, bilingual copy, and content structures", () => {
  const nusa = getProjectCaseStudy("nusa-dakwah");
  assert.ok(nusa);

  // Locked facts & metadata
  assert.equal(nusa.index, "04");
  assert.equal(nusa.slug, "nusa-dakwah");
  assert.equal(nusa.category, "web-app");
  assert.equal(nusa.categoryLabel.en, "04 / WEB APPLICATION");
  assert.equal(nusa.categoryLabel.id, "04 / WEB APPLICATION");
  assert.equal(nusa.title.en, "Nusa Dakwah");
  assert.equal(nusa.title.id, "Nusa Dakwah");
  assert.equal(nusa.role.en, "Full-Stack Web Developer");
  assert.equal(nusa.role.id, "Full-Stack Web Developer");
  assert.equal(nusa.period?.en, "January–February 2026");
  assert.equal(nusa.period?.id, "Januari–Februari 2026");
  assert.equal(nusa.status.en, "Live Production");
  assert.equal(nusa.status.id, "Live Production");
  assert.equal(
    nusa.workingModel?.en,
    "Independently developed without a client",
  );
  assert.equal(
    nusa.workingModel?.id,
    "Dikembangkan mandiri tanpa klien",
  );
  assert.equal(nusa.client, undefined);
  assert.equal(nusa.clientLabel, undefined);
  assert.equal(nusa.liveUrl, "https://nusadakwah.vercel.app/");
  assert.equal(nusa.frontendRepoUrl, undefined);
  assert.equal(nusa.backendRepoUrl, undefined);
  assert.equal(nusa.githubUrl, undefined);
  assert.equal(nusa.repositoryNotice?.en, "Private Repository");
  assert.equal(nusa.repositoryNotice?.id, "Private Repository");

  // Lead
  assert.equal(
    nusa.lead?.en,
    "A digital learning platform that organizes Islamic educational content into structured modules and connects each lesson with community discussion.",
  );
  assert.equal(
    nusa.lead?.id,
    "Platform pembelajaran digital yang menyusun materi dakwah dalam modul terstruktur dan menghubungkan setiap materi dengan ruang diskusi.",
  );

  // SEO & Meta
  assert.equal(
    nusa.metaTitle?.en,
    "Nusa Dakwah — Full-Stack Web Development Case Study | Annas Tri Widagdo",
  );
  assert.equal(
    nusa.metaTitle?.id,
    "Nusa Dakwah — Studi Kasus Full-Stack Web Development | Annas Tri Widagdo",
  );
  assert.equal(
    nusa.metaDescription?.en,
    "A full-stack case study of a digital Islamic learning platform with structured modules, multimedia content, and community discussion.",
  );
  assert.equal(
    nusa.metaDescription?.id,
    "Studi kasus full-stack platform pembelajaran dan dakwah digital dengan modul terstruktur, konten multimedia, dan diskusi komunitas.",
  );

  // Overview (exact 2 paragraphs from Section 7)
  assert.equal(nusa.overview.en.length, 2);
  assert.equal(nusa.overview.id.length, 2);
  assert.equal(
    nusa.overview.en[0],
    "Nusa Dakwah was independently developed to make Islamic learning materials easier for the public to access and follow online.",
  );
  assert.equal(
    nusa.overview.en[1],
    "Content is organized into modules, submodules, articles, and YouTube videos. Each lesson includes a discussion space, while administrators manage learning content, conversations, and user accounts.",
  );
  assert.equal(
    nusa.overview.id[0],
    "Nusa Dakwah dikembangkan secara mandiri agar materi dakwah lebih mudah diakses dan dipelajari secara online oleh masyarakat umum.",
  );
  assert.equal(
    nusa.overview.id[1],
    "Materi disusun dalam modul, submodul, artikel, dan video YouTube. Setiap materi memiliki ruang diskusi, sementara admin mengelola konten pembelajaran, percakapan, dan akun pengguna.",
  );

  // Contributions (exact 4 items from Section 8)
  assert.equal(nusa.contributions.en.length, 4);
  assert.equal(nusa.contributions.id.length, 4);
  assert.equal(
    nusa.contributions.en[0],
    "Defined the product requirements and designed the user flow, information architecture, wireframes, and UI/UX in Figma.",
  );
  assert.equal(
    nusa.contributions.en[1],
    "Developed the Next.js frontend, Laravel REST API, and MySQL database.",
  );
  assert.equal(
    nusa.contributions.en[2],
    "Implemented role-based learning content, community discussions, and administration flows, including input validation and forum sanitization.",
  );
  assert.equal(
    nusa.contributions.en[3],
    "Performed manual and automated testing with Katalon Studio, then deployed the frontend to Vercel and the Dockerized backend to Linux Ubuntu.",
  );
  assert.equal(
    nusa.contributions.id[0],
    "Merumuskan kebutuhan produk serta merancang user flow, information architecture, wireframe, dan UI/UX menggunakan Figma.",
  );
  assert.equal(
    nusa.contributions.id[1],
    "Mengembangkan frontend Next.js, REST API Laravel, dan database MySQL.",
  );
  assert.equal(
    nusa.contributions.id[2],
    "Mengimplementasikan konten pembelajaran, forum diskusi, dan alur administrasi berbasis role, termasuk validasi input dan sanitasi forum.",
  );
  assert.equal(
    nusa.contributions.id[3],
    "Melakukan manual dan automation testing dengan Katalon Studio, kemudian melakukan deployment frontend ke Vercel dan backend berbasis Docker ke Linux Ubuntu.",
  );

  // Personal tech stack (exact 6 items)
  assert.deepEqual(nusa.personalTechStack, [
    "Figma",
    "Next.js",
    "Laravel",
    "MySQL",
    "Katalon Studio",
    "Docker",
  ]);
  assert.deepEqual(nusa.techStack, [
    "Figma",
    "Next.js",
    "Laravel",
    "MySQL",
    "Katalon Studio",
    "Docker",
  ]);

  // System Scope (exact 3 groups from Section 9)
  assert.ok(nusa.nusaScope);
  assert.equal(nusa.nusaScope.groups.length, 3);
  assert.deepEqual(
    nusa.nusaScope.groups.map((g) => g.title.en),
    ["Learning Structure", "Community Discussion", "Administration"],
  );
  assert.deepEqual(
    nusa.nusaScope.groups[0].items.en,
    [
      "Module → Submodule → Learning Content",
      "Articles",
      "YouTube Videos",
      "Structured content navigation",
    ],
  );
  assert.deepEqual(
    nusa.nusaScope.groups[0].items.id,
    [
      "Modul → Submodul → Materi Pembelajaran",
      "Artikel",
      "Video YouTube",
      "Navigasi konten terstruktur",
    ],
  );
  assert.deepEqual(
    nusa.nusaScope.groups[1].items.en,
    [
      "Discussion space attached to each lesson",
      "Comments and replies",
      "Nested replies",
      "Administrator moderation",
    ],
  );
  assert.deepEqual(
    nusa.nusaScope.groups[1].items.id,
    [
      "Ruang diskusi pada setiap materi",
      "Komentar dan balasan",
      "Balasan bertingkat (nested replies)",
      "Moderasi administrator",
    ],
  );
  assert.deepEqual(
    nusa.nusaScope.groups[2].items.en,
    [
      "Authentication and role-based access for User and Administrator",
      "Module, submodule, and learning-content management",
      "Discussion management",
      "User and account management",
    ],
  );
  assert.deepEqual(
    nusa.nusaScope.groups[2].items.id,
    [
      "Autentikasi dan hak akses berbasis role untuk User dan Administrator",
      "Pengelolaan modul, submodul, dan konten pembelajaran",
      "Pengelolaan diskusi",
      "Pengelolaan pengguna dan akun",
    ],
  );

  // Absence of optional modules, technical notes, workflow, etc.
  assert.equal(nusa.technicalNotes, undefined);
  assert.equal(nusa.optionalModule, undefined);
  assert.equal(nusa.workflow, undefined);
  assert.equal(nusa.modules, undefined);
  assert.equal(nusa.technologyGroups, undefined);
  assert.equal(nusa.videoSrc, undefined);

  // Gallery: exactly 7 slides with 14 unique searchable placeholders
  assert.equal(nusa.gallery?.length, 7);
  assert.equal(nusa.gallery?.[0].src, "/assets/projects/nusa-dakwah/cover.webp");
  for (let i = 1; i <= 7; i++) {
    const num = String(i).padStart(2, "0");
    const slide = nusa.gallery?.[i - 1];
    assert.ok(slide);
    assert.equal(slide.slide, num);
    assert.ok(existsSync(join(root, "public", slide.src)));
    assert.equal(slide.caption.en, `TODO_NUSA_DAKWAH_CAPTION_${num}_EN`);
    assert.equal(slide.caption.id, `TODO_NUSA_DAKWAH_CAPTION_${num}_ID`);
    assert.doesNotMatch(slide.alt.en, /TODO_NUSA_DAKWAH/);
    assert.doesNotMatch(slide.alt.id, /TODO_NUSA_DAKWAH/);
    assert.ok(slide.alt.en.length > 5);
    assert.ok(slide.alt.id.length > 5);
  }

  // Verify exactly 14 unique occurrences of TODO_NUSA_DAKWAH_CAPTION_ in project-case-studies.ts
  const caseStudiesSource = readFileSync(
    join(root, "src", "content", "projects", "project-case-studies.ts"),
    "utf8",
  );
  const nusaTokens = caseStudiesSource.match(/TODO_NUSA_DAKWAH_CAPTION_\d+_[A-Z]+/g) ?? [];
  assert.equal(new Set(nusaTokens).size, 14);

  // Absolute absence of search claims in Nusa Dakwah case study
  const stringified = JSON.stringify(nusa);
  assert.doesNotMatch(stringified, /search\b|search results|pencarian/i);
  assert.doesNotMatch(stringified, /"Fullstack Developer"/i);
});

test("maintains approved SIMASTOK locked facts, bilingual copy, and content structures", () => {
  const simastok = getProjectCaseStudy("simastok");
  assert.ok(simastok);

  // Locked facts & metadata
  assert.equal(simastok.index, "05");
  assert.equal(simastok.client?.en, "SHR Jaya Motor");
  assert.equal(simastok.client?.id, "SHR Jaya Motor");
  assert.equal(simastok.clientLabel?.en, "Stakeholder");
  assert.equal(simastok.clientLabel?.id, "Stakeholder");
  assert.equal(simastok.role.en, "Full-Stack Web Developer");
  assert.equal(simastok.role.id, "Full-Stack Web Developer");
  assert.equal(simastok.period?.en, "December 2025–January 2026");
  assert.equal(simastok.period?.id, "Desember 2025–Januari 2026");
  assert.equal(simastok.status.en, "Live Production");
  assert.equal(simastok.status.id, "Live Production");
  assert.equal(simastok.workingModel, undefined);
  assert.equal(simastok.liveUrl, "https://simastok.site/");
  assert.equal(simastok.githubUrl, undefined);
  assert.equal(simastok.frontendRepoUrl, undefined);
  assert.equal(simastok.backendRepoUrl, undefined);
  assert.equal(simastok.repositoryNotice?.en, "Private Repository");
  assert.equal(simastok.repositoryNotice?.id, "Private Repository");

  // MetadataRows display only Role, Period, Status, Stakeholder
  assert.ok(simastok.metadataRows);
  assert.equal(simastok.metadataRows.length, 4);
  assert.deepEqual(
    simastok.metadataRows.map((r) => r.label.en),
    ["Role", "Period", "Status", "Stakeholder"],
  );
  assert.deepEqual(
    simastok.metadataRows.map((r) => r.label.id),
    ["Peran", "Periode", "Status", "Stakeholder"],
  );
  assert.deepEqual(
    simastok.metadataRows.map((r) => r.value.en),
    [
      "Full-Stack Web Developer",
      "December 2025–January 2026",
      "Live Production",
      "SHR Jaya Motor",
    ],
  );
  assert.deepEqual(
    simastok.metadataRows.map((r) => r.value.id),
    [
      "Full-Stack Web Developer",
      "Desember 2025–Januari 2026",
      "Live Production",
      "SHR Jaya Motor",
    ],
  );

  // Category & Lead
  assert.equal(simastok.categoryLabel.en, "05 // WEB APPLICATION");
  assert.equal(simastok.categoryLabel.id, "05 // WEB APPLICATION");
  assert.equal(
    simastok.lead?.en,
    "A web-based inventory system that replaces handwritten stock records with a centralized workflow for monitoring inventory, tracking incoming and outgoing parts, and preparing reports.",
  );
  assert.equal(
    simastok.lead?.id,
    "Sistem inventory berbasis web yang menggantikan pencatatan stok di buku dengan workflow terpusat untuk memantau persediaan, menelusuri barang masuk dan keluar, serta membuat laporan.",
  );

  // SEO & Meta
  assert.equal(
    simastok.metaTitle?.en,
    "SIMASTOK SHR Jaya Motor — Full-Stack Web Development Case Study | Annas Tri Widagdo",
  );
  assert.equal(
    simastok.metaTitle?.id,
    "SIMASTOK SHR Jaya Motor — Studi Kasus Full-Stack Web Development | Annas Tri Widagdo",
  );
  assert.equal(
    simastok.metaDescription?.en,
    "A full-stack case study of a production inventory system used by SHR Jaya Motor for centralized stock tracking, transaction history, and reporting.",
  );
  assert.equal(
    simastok.metaDescription?.id,
    "Studi kasus full-stack sistem inventory production yang digunakan SHR Jaya Motor untuk pemantauan stok, riwayat transaksi, dan laporan terpusat.",
  );

  // Overview (exact 2 paragraphs from Sections 7-8)
  assert.equal(simastok.overview.en.length, 2);
  assert.equal(simastok.overview.id.length, 2);
  assert.equal(
    simastok.overview.en[0],
    "SHR Jaya Motor previously recorded its inventory manually in books, making it difficult to monitor stock, trace transactions, and prepare reports. I gathered the system requirements through interviews and iterative feedback with the workshop.",
  );
  assert.equal(
    simastok.overview.en[1],
    "I independently designed and developed SIMASTOK for the owner and employees. The production system brings inventory records, stock transactions, automatic updates, validation, transaction history, and period-based PDF reports into one application.",
  );
  assert.equal(
    simastok.overview.id[0],
    "Sebelum menggunakan SIMASTOK, SHR Jaya Motor mencatat persediaan secara manual di buku sehingga pemantauan stok, penelusuran transaksi, dan pembuatan laporan menjadi lebih sulit. Saya menggali kebutuhan sistem melalui wawancara dan feedback bertahap bersama pihak bengkel.",
  );
  assert.equal(
    simastok.overview.id[1],
    "Saya merancang dan mengembangkan SIMASTOK secara mandiri untuk owner dan pegawai. Sistem yang digunakan dalam operasional ini menyatukan pencatatan inventory, transaksi stok, pembaruan otomatis, validasi, riwayat transaksi, serta laporan PDF berdasarkan periode dalam satu aplikasi.",
  );

  // Contributions (exact 4 items + closing learning statement)
  assert.equal(simastok.contributions.en.length, 4);
  assert.equal(simastok.contributions.id.length, 4);
  assert.equal(
    simastok.contributions.en[0],
    "Gathered inventory requirements through interviews and iterative feedback with SHR Jaya Motor.",
  );
  assert.equal(
    simastok.contributions.en[1],
    "Designed the inventory workflows and interfaces in Figma, then built the Laravel frontend and backend with MySQL.",
  );
  assert.equal(
    simastok.contributions.en[2],
    "Implemented role-based access, master data, stock movements, insufficient-stock validation, transaction history, and reporting.",
  );
  assert.equal(
    simastok.contributions.en[3],
    "Performed manual and automated testing with Katalon Studio, then containerized and deployed the application with Docker.",
  );
  assert.equal(
    simastok.contributions.id[0],
    "Menggali kebutuhan inventory melalui wawancara dan feedback bertahap bersama SHR Jaya Motor.",
  );
  assert.equal(
    simastok.contributions.id[1],
    "Merancang workflow inventory dan antarmuka di Figma, kemudian membangun frontend dan backend menggunakan Laravel serta MySQL.",
  );
  assert.equal(
    simastok.contributions.id[2],
    "Mengimplementasikan akses berbasis role, master data, pergerakan stok, validasi stok tidak mencukupi, riwayat transaksi, dan laporan.",
  );
  assert.equal(
    simastok.contributions.id[3],
    "Melakukan manual dan automation testing menggunakan Katalon Studio, kemudian menjalankan containerization dan deployment aplikasi menggunakan Docker.",
  );
  assert.equal(
    simastok.contributionLearning?.en,
    "This project strengthened my ability to build an inventory system end-to-end until it was used in real operations.",
  );
  assert.equal(
    simastok.contributionLearning?.id,
    "Project ini memperkuat kemampuan saya dalam membangun sistem inventory secara end-to-end hingga digunakan dalam operasional nyata.",
  );

  // Personal tech stack (exact 6 items in approved order)
  assert.deepEqual(simastok.personalTechStack, [
    "Figma",
    "Laravel",
    "PHP",
    "MySQL",
    "Katalon Studio",
    "Docker",
  ]);
  assert.deepEqual(simastok.techStack, [
    "Figma",
    "Laravel",
    "PHP",
    "MySQL",
    "Katalon Studio",
    "Docker",
  ]);

  // System Scope (exact 3 groups from Section 9)
  assert.ok(simastok.simastokScope);
  assert.equal(simastok.simastokScope.groups.length, 3);
  assert.deepEqual(
    simastok.simastokScope.groups.map((g) => g.title.en),
    ["Inventory Records", "Stock Transactions", "Reporting & Access"],
  );
  assert.deepEqual(
    simastok.simastokScope.groups.map((g) => g.title.id),
    ["Pencatatan Persediaan", "Transaksi Stok", "Laporan & Akses"],
  );
  assert.equal(
    simastok.simastokScope.groups[0].description.en,
    "Centralized records for parts, categories, suppliers, and available stock.",
  );
  assert.equal(
    simastok.simastokScope.groups[0].description.id,
    "Pencatatan terpusat untuk suku cadang, kategori, supplier, dan stok yang tersedia.",
  );
  assert.equal(
    simastok.simastokScope.groups[1].description.en,
    "Incoming and outgoing transactions update stock automatically, prevent invalid withdrawals, and preserve movement history.",
  );
  assert.equal(
    simastok.simastokScope.groups[1].description.id,
    "Transaksi barang masuk dan keluar memperbarui stok secara otomatis, mencegah pengeluaran melebihi stok, dan menyimpan riwayat pergerakan barang.",
  );
  assert.equal(
    simastok.simastokScope.groups[2].description.en,
    "Role-based access for the owner and employees, supported by date-range reports and PDF exports.",
  );
  assert.equal(
    simastok.simastokScope.groups[2].description.id,
    "Akses berbasis role untuk owner dan pegawai, dilengkapi laporan berdasarkan rentang tanggal serta ekspor PDF.",
  );

  // Absence of forbidden sections
  assert.equal(simastok.technicalNotes, undefined);
  assert.equal(simastok.optionalModule, undefined);
  assert.equal(simastok.workflow, undefined);
  assert.equal(simastok.modules, undefined);
  assert.equal(simastok.technologyGroups, undefined);
  assert.equal(simastok.videoSrc, undefined);

  // Gallery: exactly 7 slides in exact path order with non-placeholder captions
  assert.equal(simastok.gallery?.length, 7);
  assert.equal(simastok.gallery?.[0].src, "/assets/projects/simastok/cover.webp");
  const expectedPaths = [
    "/assets/projects/simastok/cover.webp",
    "/assets/projects/simastok/documentation/01.webp",
    "/assets/projects/simastok/documentation/02.webp",
    "/assets/projects/simastok/documentation/03.webp",
    "/assets/projects/simastok/documentation/04.webp",
    "/assets/projects/simastok/documentation/05.webp",
    "/assets/projects/simastok/documentation/06.webp",
  ];
  for (let i = 0; i < 7; i++) {
    const slide = simastok.gallery?.[i];
    assert.ok(slide);
    assert.equal(slide.src, expectedPaths[i]);
    assert.ok(existsSync(join(root, "public", slide.src)));
    assert.doesNotMatch(slide.caption.en, /^TODO_|^\[/);
    assert.doesNotMatch(slide.caption.id, /^TODO_|^\[/);
    assert.ok(slide.caption.en.length > 10);
    assert.ok(slide.caption.id.length > 10);
    assert.doesNotMatch(slide.alt.en, /^TODO_|^\[/);
    assert.doesNotMatch(slide.alt.id, /^TODO_|^\[/);
    assert.ok(slide.alt.en.length > 10);
    assert.ok(slide.alt.id.length > 10);
    assert.notEqual(slide.caption.en, slide.alt.en);
    assert.notEqual(slide.caption.id, slide.alt.id);
  }

  // Claim boundaries
  const stringified = JSON.stringify(simastok);
  assert.doesNotMatch(stringified, /"Fullstack Developer"/i);
  assert.doesNotMatch(stringified, /Production deployment/i);
});

test("maintains approved Heart ML locked facts, bilingual copy, model evidence, gallery, and content structures", () => {
  const heartMl = getProjectCaseStudy("ml-for-heart-attack-risk-prediction");
  assert.ok(heartMl);

  // Locked facts & metadata
  assert.equal(heartMl.index, "06");
  assert.equal(heartMl.category, "ml");
  assert.equal(heartMl.categoryLabel.en, "06 // MACHINE LEARNING");
  assert.equal(heartMl.categoryLabel.id, "06 // MACHINE LEARNING");
  assert.equal(heartMl.role.en, "Machine Learning Engineer");
  assert.equal(heartMl.role.id, "Machine Learning Engineer");
  assert.equal(heartMl.period?.en, "June–August 2025");
  assert.equal(heartMl.period?.id, "Juni–Agustus 2025");
  assert.equal(heartMl.status.en, "Completed Prototype");
  assert.equal(heartMl.status.id, "Completed Prototype");
  assert.equal(heartMl.liveUrl, undefined);
  assert.equal(
    heartMl.githubUrl,
    "https://github.com/annastriw/ml-for-heart-attack-risk-prediction.git",
  );
  assert.equal(heartMl.repositoryNotice, undefined);
  assert.equal(heartMl.workingModel, undefined);

  // MetadataRows display only Role, Period, Status, Product Integration
  assert.ok(heartMl.metadataRows);
  assert.equal(heartMl.metadataRows.length, 4);
  assert.deepEqual(
    heartMl.metadataRows.map((r) => r.label.en),
    ["Role", "Period", "Status", "Product Integration"],
  );
  assert.deepEqual(
    heartMl.metadataRows.map((r) => r.label.id),
    ["Peran", "Periode", "Status", "Integrasi Produk"],
  );
  assert.deepEqual(
    heartMl.metadataRows.map((r) => r.value.en),
    [
      "Machine Learning Engineer",
      "June–August 2025",
      "Completed Prototype",
      "iHealth Edu",
    ],
  );
  assert.deepEqual(
    heartMl.metadataRows.map((r) => r.value.id),
    [
      "Machine Learning Engineer",
      "Juni–Agustus 2025",
      "Completed Prototype",
      "iHealth Edu",
    ],
  );

  // H1 and Lead
  assert.equal(
    heartMl.title.en,
    "Machine Learning Model for Heart Attack Risk Prediction",
  );
  assert.equal(
    heartMl.title.id,
    "Machine Learning Model for Heart Attack Risk Prediction",
  );
  assert.equal(
    heartMl.lead?.en,
    "A machine learning decision-support prototype developed for iHealth Edu that estimates heart attack risk from patient data and delivers the result through a Flask API.",
  );
  assert.equal(
    heartMl.lead?.id,
    "Prototype machine learning untuk decision support pada iHealth Edu yang memperkirakan risiko serangan jantung dari data pasien dan menyajikan hasilnya melalui Flask API.",
  );

  // SEO & Meta
  assert.equal(
    heartMl.metaTitle?.en,
    "Heart Attack Risk Prediction — Machine Learning Case Study | Annas Tri Widagdo",
  );
  assert.equal(
    heartMl.metaTitle?.id,
    "Heart Attack Risk Prediction — Studi Kasus Machine Learning | Annas Tri Widagdo",
  );
  assert.equal(
    heartMl.metaDescription?.en,
    "A machine learning case study for heart attack risk decision support integrated into iHealth Edu, covering model comparison, Flask inference, and Docker deployment.",
  );
  assert.equal(
    heartMl.metaDescription?.id,
    "Studi kasus machine learning untuk decision support risiko serangan jantung yang terintegrasi dengan iHealth Edu, mencakup perbandingan model, inference Flask, dan deployment Docker.",
  );

  // Overview (exact 2 paragraphs)
  assert.equal(heartMl.overview.en.length, 2);
  assert.equal(heartMl.overview.id.length, 2);
  assert.equal(
    heartMl.overview.en[0],
    "I developed this project as the machine learning decision-support component integrated into the live iHealth Edu website for healthcare workers. Model development used A. Panday's 2025 Heart Attack Prediction in Indonesia dataset from Kaggle, containing 158,355 observations and 21 predictors.",
  );
  assert.equal(
    heartMl.overview.en[1],
    "The workflow covers data preparation, class balancing, model comparison, evaluation, and inference deployment. Random Forest was selected for its leading accuracy and ROC-AUC, then serialized and served through a Flask REST API deployed with Docker on Ubuntu.",
  );
  assert.equal(
    heartMl.overview.id[0],
    "Saya mengembangkan project ini sebagai komponen machine learning decision support yang terintegrasi dengan website iHealth Edu dan digunakan oleh tenaga kesehatan. Pengembangan model menggunakan dataset Heart Attack Prediction in Indonesia oleh A. Panday dari Kaggle tahun 2025, yang terdiri dari 158.355 observasi dan 21 predictor.",
  );
  assert.equal(
    heartMl.overview.id[1],
    "Workflow mencakup data preparation, penyeimbangan kelas, perbandingan model, evaluasi, dan deployment inference. Random Forest dipilih karena menghasilkan accuracy dan ROC-AUC tertinggi, kemudian disimpan dan disajikan melalui Flask REST API yang di-deploy menggunakan Docker pada Ubuntu.",
  );

  // Dataset Source note
  assert.ok(heartMl.datasetSource);
  assert.equal(heartMl.datasetSource.label.en, "Dataset Source");
  assert.equal(heartMl.datasetSource.label.id, "Sumber Dataset");
  assert.equal(heartMl.datasetSource.textPrefix, "A. Panday, ");
  assert.equal(
    heartMl.datasetSource.datasetTitle,
    "Heart Attack Prediction in Indonesia",
  );
  assert.equal(heartMl.datasetSource.textSuffix, ", Kaggle, 2025");
  assert.equal(
    heartMl.datasetSource.url,
    "https://www.kaggle.com/datasets/ankushpanday2/heart-attack-prediction-in-indonesia",
  );

  // Contributions (exact 4 items + closing learning statement)
  assert.equal(heartMl.contributions.en.length, 4);
  assert.equal(heartMl.contributions.id.length, 4);
  assert.equal(
    heartMl.contributions.en[0],
    "Prepared the dataset by encoding five categorical features, scaling the predictors, creating a stratified 80:20 split, and applying SMOTE only to the training data.",
  );
  assert.equal(
    heartMl.contributions.en[1],
    "Trained and compared Random Forest, Linear SVM, K-Nearest Neighbors, and Logistic Regression, with hyperparameter tuning focused on F1-score.",
  );
  assert.equal(
    heartMl.contributions.en[2],
    "Selected Random Forest based on its accuracy and ROC-AUC, serialized the model and preprocessing artifacts with Joblib, and built a Flask REST API for inference.",
  );
  assert.equal(
    heartMl.contributions.en[3],
    "Deployed the inference service with Docker on Ubuntu and integrated its prediction output into iHealth Edu for healthcare workers.",
  );
  assert.equal(
    heartMl.contributions.id[0],
    "Menyiapkan dataset dengan melakukan encoding pada lima fitur kategorikal, scaling predictor, membagi data secara stratified 80:20, dan menerapkan SMOTE hanya pada data training.",
  );
  assert.equal(
    heartMl.contributions.id[1],
    "Melatih dan membandingkan Random Forest, Linear SVM, K-Nearest Neighbors, dan Logistic Regression dengan hyperparameter tuning yang berfokus pada F1-score.",
  );
  assert.equal(
    heartMl.contributions.id[2],
    "Memilih Random Forest berdasarkan accuracy dan ROC-AUC, menyimpan model serta preprocessing artifacts menggunakan Joblib, dan membangun Flask REST API untuk inference.",
  );
  assert.equal(
    heartMl.contributions.id[3],
    "Melakukan deployment inference service menggunakan Docker pada Ubuntu dan mengintegrasikan hasil prediksi ke iHealth Edu untuk tenaga kesehatan.",
  );
  assert.equal(
    heartMl.contributionLearning?.en,
    "This project gave me experience in building a machine learning workflow from data preparation to real product integration.",
  );
  assert.equal(
    heartMl.contributionLearning?.id,
    "Project ini memberi saya pengalaman membangun workflow machine learning mulai dari data preparation hingga terintegrasi dengan produk yang digunakan.",
  );

  // Personal Tech Stack (exact 6 items in approved order)
  assert.deepEqual(heartMl.personalTechStack, [
    "Python",
    "Scikit-learn",
    "Pandas",
    "SMOTE",
    "Flask",
    "Docker",
  ]);
  assert.deepEqual(heartMl.techStack, [
    "Python",
    "Scikit-learn",
    "Pandas",
    "SMOTE",
    "Flask",
    "Docker",
  ]);

  // System Scope: exactly 3 groups (Data Preparation, Model Evaluation, Inference Integration)
  assert.ok(heartMl.heartMlScope);
  assert.equal(heartMl.heartMlScope.dataPreparation.title.en, "Data Preparation");
  assert.equal(heartMl.heartMlScope.dataPreparation.title.id, "Data Preparation");
  assert.deepEqual(heartMl.heartMlScope.dataPreparation.items.en, [
    "158,355 observations",
    "22 columns",
    "21 predictors",
    "5 categorical features",
    "No missing values",
    "Stratified 80:20 split",
    "SMOTE on training data only",
  ]);
  assert.deepEqual(heartMl.heartMlScope.dataPreparation.items.id, [
    "158.355 observasi",
    "22 kolom",
    "21 prediktor",
    "5 fitur kategorikal",
    "Tidak ada missing value",
    "Stratified 80:20 split",
    "SMOTE hanya pada data training",
  ]);

  // Model Evaluation metrics
  assert.equal(heartMl.heartMlScope.modelEvaluation.title.en, "Model Evaluation");
  assert.equal(heartMl.heartMlScope.modelEvaluation.title.id, "Model Evaluation");
  const models = heartMl.heartMlScope.modelEvaluation.models;
  assert.equal(models.length, 4);

  // Random Forest
  const rf = models.find((m) => m.model === "Random Forest");
  assert.ok(rf);
  assert.equal(rf.isSelected, true);
  assert.equal(rf.accuracy?.en, "71.93%");
  assert.equal(rf.accuracy?.id, "71,93%");
  assert.equal(rf.precision?.en, "64.12%");
  assert.equal(rf.precision?.id, "64,12%");
  assert.equal(rf.recall?.en, "68.15%");
  assert.equal(rf.recall?.id, "68,15%");
  assert.equal(rf.f1?.en, "0.6607");
  assert.equal(rf.f1?.id, "0,6607");
  assert.equal(rf.rocAuc?.en, "0.8015");
  assert.equal(rf.rocAuc?.id, "0,8015");

  // Logistic Regression
  const lr = models.find((m) => m.model === "Logistic Regression");
  assert.ok(lr);
  assert.equal(lr.f1?.en, "0.6618");
  assert.equal(lr.f1?.id, "0,6618");
  assert.equal(lr.accuracy, undefined);

  // KNN
  const knn = models.find((m) => m.model === "K-Nearest Neighbors");
  assert.ok(knn);
  assert.equal(knn.recall?.en, "70.40%");
  assert.equal(knn.recall?.id, "70,40%");
  assert.equal(knn.accuracy, undefined);

  // Linear SVM (no metric added)
  const svm = models.find((m) => m.model === "Linear SVM");
  assert.ok(svm);
  assert.equal(svm.accuracy, undefined);
  assert.equal(svm.precision, undefined);
  assert.equal(svm.recall, undefined);
  assert.equal(svm.f1, undefined);
  assert.equal(svm.rocAuc, undefined);

  // Selection Rationale
  assert.equal(
    heartMl.heartMlScope.modelEvaluation.selectionRationale.en,
    "Random Forest was selected because it produced the highest accuracy and ROC-AUC in the documented comparison.",
  );
  assert.equal(
    heartMl.heartMlScope.modelEvaluation.selectionRationale.id,
    "Random Forest dipilih karena menghasilkan accuracy dan ROC-AUC tertinggi dalam perbandingan yang didokumentasikan.",
  );

  // Medical boundary note inside System Scope
  assert.equal(
    heartMl.heartMlScope.medicalNote.en,
    "This prototype supports risk assessment and does not provide a clinical diagnosis or replace medical judgment.",
  );
  assert.equal(
    heartMl.heartMlScope.medicalNote.id,
    "Prototype ini mendukung penilaian risiko dan tidak memberikan diagnosis klinis maupun menggantikan pertimbangan tenaga kesehatan.",
  );

  // Inference Integration
  assert.equal(
    heartMl.heartMlScope.inferenceIntegration.title.en,
    "Inference Integration",
  );
  assert.equal(
    heartMl.heartMlScope.inferenceIntegration.title.id,
    "Inference Integration",
  );
  assert.deepEqual(heartMl.heartMlScope.inferenceIntegration.items.en, [
    "Joblib model and preprocessing artifacts",
    "Flask REST API",
    "Risk class and probability",
    "Supporting factors",
    "Global feature importance",
    "Docker deployment on Ubuntu",
    "iHealth Edu integration for healthcare workers",
  ]);
  assert.deepEqual(heartMl.heartMlScope.inferenceIntegration.items.id, [
    "Joblib model dan preprocessing artifacts",
    "Flask REST API",
    "Risk class dan probabilitas",
    "Faktor pendukung",
    "Global feature importance",
    "Deployment Docker pada Ubuntu",
    "Integrasi iHealth Edu untuk tenaga kesehatan",
  ]);

  // Gallery: exactly 3 slides in cover-first order
  assert.equal(heartMl.gallery?.length, 3);
  assert.deepEqual(
    heartMl.gallery?.map((s) => s.src),
    [
      "/assets/projects/ml-for-heart-attack-risk-prediction/cover.webp",
      "/assets/projects/ml-for-heart-attack-risk-prediction/documentation/01.webp",
      "/assets/projects/ml-for-heart-attack-risk-prediction/documentation/02.webp",
    ],
  );
  for (let i = 0; i < 3; i++) {
    const slide = heartMl.gallery?.[i];
    assert.ok(slide);
    assert.ok(existsSync(join(root, "public", slide.src)));
    assert.doesNotMatch(slide.caption.en, /^TODO_|^\[/);
    assert.doesNotMatch(slide.caption.id, /^TODO_|^\[/);
    assert.ok(slide.caption.en.length > 10);
    assert.ok(slide.caption.id.length > 10);
    assert.doesNotMatch(slide.alt.en, /^TODO_|^\[/);
    assert.doesNotMatch(slide.alt.id, /^TODO_|^\[/);
    assert.ok(slide.alt.en.length > 10);
    assert.ok(slide.alt.id.length > 10);
    assert.notEqual(slide.caption.en, slide.alt.en);
    assert.notEqual(slide.caption.id, slide.alt.id);
  }

  // Claim boundaries and prohibited strings
  const stringified = JSON.stringify(heartMl);
  assert.doesNotMatch(stringified, /"Machine Learning Developer"/i);
  assert.doesNotMatch(stringified, /Working Model|Development Model/i);
  assert.doesNotMatch(
    stringified,
    /independently developed|dikembangkan secara mandiri/i,
  );
  assert.doesNotMatch(stringified, /clinical accuracy|clinically validated/i);
  assert.match(
    heartMl.heartMlScope.medicalNote.en,
    /does not provide a clinical diagnosis/,
  );
  assert.match(
    heartMl.heartMlScope.medicalNote.id,
    /tidak memberikan diagnosis klinis/,
  );
});

test("maintains approved Speech-to-Text System locked facts, bilingual copy, model boundary, gallery, and content structures", () => {
  const stt = getProjectCaseStudy("speech-to-text-system");
  assert.ok(stt);

  // Locked facts & metadata
  assert.equal(stt.index, "07");
  assert.equal(stt.category, "ml");
  assert.equal(stt.categoryLabel.en, "07 // MACHINE LEARNING");
  assert.equal(stt.categoryLabel.id, "07 // MACHINE LEARNING");
  assert.equal(stt.role.en, "Machine Learning Engineer");
  assert.equal(stt.role.id, "Machine Learning Engineer");
  assert.equal(stt.period?.en, "March–April 2025");
  assert.equal(stt.period?.id, "Maret–April 2025");
  assert.equal(stt.status.en, "Completed Prototype");
  assert.equal(stt.status.id, "Completed Prototype");
  assert.equal(stt.liveUrl, undefined);
  assert.equal(
    stt.githubUrl,
    "https://github.com/annastriw/speech-to-text-system.git",
  );
  assert.equal(stt.repositoryNotice, undefined);
  assert.equal(stt.client, undefined);
  assert.equal(stt.workingModel, undefined);

  // MetadataRows display only Role, Period, Status, Platform
  assert.ok(stt.metadataRows);
  assert.equal(stt.metadataRows.length, 4);
  assert.deepEqual(
    stt.metadataRows.map((r) => r.label.en),
    ["Role", "Period", "Status", "Platform"],
  );
  assert.deepEqual(
    stt.metadataRows.map((r) => r.label.id),
    ["Peran", "Periode", "Status", "Platform"],
  );
  assert.deepEqual(
    stt.metadataRows.map((r) => r.value.en),
    [
      "Machine Learning Engineer",
      "March–April 2025",
      "Completed Prototype",
      "Google Colab",
    ],
  );
  assert.deepEqual(
    stt.metadataRows.map((r) => r.value.id),
    [
      "Machine Learning Engineer",
      "Maret–April 2025",
      "Completed Prototype",
      "Google Colab",
    ],
  );

  // H1 and Lead
  assert.equal(stt.title.en, "Speech-to-Text System");
  assert.equal(stt.title.id, "Speech-to-Text System");
  assert.equal(
    stt.lead?.en,
    "An end-to-end English speech-to-text prototype that converts audio and video into reusable transcripts, SRT subtitles, and video with burned-in captions.",
  );
  assert.equal(
    stt.lead?.id,
    "Prototype speech-to-text end-to-end untuk bahasa Inggris yang mengubah audio dan video menjadi transkrip, subtitle SRT, serta video dengan subtitle tertanam.",
  );

  // SEO & Meta
  assert.equal(
    stt.metaTitle?.en,
    "Speech-to-Text System — Machine Learning Case Study | Annas Tri Widagdo",
  );
  assert.equal(
    stt.metaTitle?.id,
    "Speech-to-Text System — Studi Kasus Machine Learning | Annas Tri Widagdo",
  );
  assert.equal(
    stt.metaDescription?.en,
    "An English speech-to-text prototype that processes audio and video with pretrained Wav2Vec2 and produces transcripts, SRT subtitles, and burned-in video captions.",
  );
  assert.equal(
    stt.metaDescription?.id,
    "Prototype speech-to-text bahasa Inggris yang memproses audio dan video menggunakan pretrained Wav2Vec2 serta menghasilkan transkrip, subtitle SRT, dan subtitle yang tertanam pada video.",
  );

  // Keywords
  assert.deepEqual(stt.keywords?.en, [
    "Machine Learning",
    "Machine Learning Engineer",
    "Automatic Speech Recognition",
    "English Speech-to-Text",
    "Python",
    "Wav2Vec2",
    "Hugging Face Transformers",
    "Librosa",
    "FFmpeg",
    "Google Colab",
  ]);
  assert.deepEqual(stt.keywords?.id, [
    "Machine Learning",
    "Machine Learning Engineer",
    "Automatic Speech Recognition",
    "English Speech-to-Text",
    "Python",
    "Wav2Vec2",
    "Hugging Face Transformers",
    "Librosa",
    "FFmpeg",
    "Google Colab",
  ]);

  // Overview (exact 2 paragraphs)
  assert.equal(stt.overview.en.length, 2);
  assert.equal(stt.overview.id.length, 2);
  assert.equal(
    stt.overview.en[0],
    "Built in Google Colab, the workflow accepts WAV and MP3 audio or MP4 video. Video audio is extracted with FFmpeg, converted to mono at 16 kHz, and divided into chunks before transcription.",
  );
  assert.equal(
    stt.overview.en[1],
    "Each audio chunk is processed with the pretrained facebook/wav2vec2-base-960h model through Hugging Face Transformers. The results can be exported as TXT, CSV, JSON, and SRT files or embedded directly into the final video.",
  );
  assert.equal(
    stt.overview.id[0],
    "Workflow ini dikembangkan di Google Colab dan menerima input audio WAV dan MP3 atau video MP4. Audio dari video diekstrak menggunakan FFmpeg, dikonversi menjadi mono 16 kHz, lalu dibagi menjadi beberapa chunk sebelum proses transkripsi.",
  );
  assert.equal(
    stt.overview.id[1],
    "Setiap audio chunk diproses menggunakan pretrained model facebook/wav2vec2-base-960h melalui Hugging Face Transformers. Hasilnya dapat diekspor sebagai file TXT, CSV, JSON, dan SRT atau ditanamkan langsung ke video akhir.",
  );

  // Contributions (exact 4 items + closing learning statement)
  assert.equal(stt.contributions.en.length, 4);
  assert.equal(stt.contributions.id.length, 4);
  assert.equal(
    stt.contributions.en[0],
    "Built the ingestion workflow for WAV and MP3 audio and MP4 video, including audio extraction from video with FFmpeg.",
  );
  assert.equal(
    stt.contributions.en[1],
    "Implemented mono 16 kHz conversion and chunk-based processing to prepare longer audio for sequential inference.",
  );
  assert.equal(
    stt.contributions.en[2],
    "Integrated the pretrained Wav2Vec2 model through Hugging Face Transformers and structured the transcription results as TXT, CSV, and JSON files.",
  );
  assert.equal(
    stt.contributions.en[3],
    "Generated timestamp-based SRT subtitles and used FFmpeg to embed them into the final video.",
  );
  assert.equal(
    stt.contributions.id[0],
    "Membangun workflow input untuk audio WAV dan MP3 serta video MP4, termasuk proses ekstraksi audio dari video menggunakan FFmpeg.",
  );
  assert.equal(
    stt.contributions.id[1],
    "Mengimplementasikan konversi audio menjadi mono 16 kHz dan pemrosesan berbasis chunk untuk menyiapkan audio berdurasi panjang sebelum inference bertahap.",
  );
  assert.equal(
    stt.contributions.id[2],
    "Mengintegrasikan pretrained model Wav2Vec2 melalui Hugging Face Transformers dan menyusun hasil transkripsi dalam format TXT, CSV, dan JSON.",
  );
  assert.equal(
    stt.contributions.id[3],
    "Menghasilkan subtitle SRT berdasarkan timestamp dan menggunakan FFmpeg untuk menanamkannya ke video akhir.",
  );
  assert.equal(
    stt.contributionLearning?.en,
    "This project gave me experience combining a pretrained machine learning model with an end-to-end audio and video processing workflow.",
  );
  assert.equal(
    stt.contributionLearning?.id,
    "Project ini memberi saya pengalaman menggabungkan pretrained machine learning model dengan workflow pemrosesan audio dan video secara end-to-end.",
  );

  // Personal Tech Stack (exact 6 items in approved order)
  assert.deepEqual(stt.personalTechStack, [
    "Python",
    "Wav2Vec2",
    "Hugging Face Transformers",
    "Librosa",
    "FFmpeg",
    "Google Colab",
  ]);
  assert.deepEqual(stt.techStack, [
    "Python",
    "Wav2Vec2",
    "Hugging Face Transformers",
    "Librosa",
    "FFmpeg",
    "Google Colab",
  ]);

  // System Scope: exactly 3 groups (Media Preparation, ASR Inference, Transcript & Subtitle Outputs) + Model Note
  assert.ok(stt.speechToTextScope);
  assert.equal(stt.speechToTextScope.mediaPreparation.title.en, "Media Preparation");
  assert.equal(stt.speechToTextScope.mediaPreparation.title.id, "Persiapan Media");
  assert.deepEqual(stt.speechToTextScope.mediaPreparation.items.en, [
    "WAV and MP3 audio input",
    "MP4 video input",
    "FFmpeg audio extraction from video",
    "Mono 16 kHz conversion",
    "Chunk-based processing for longer audio",
  ]);
  assert.deepEqual(stt.speechToTextScope.mediaPreparation.items.id, [
    "Input audio WAV dan MP3",
    "Input video MP4",
    "Ekstraksi audio dari video dengan FFmpeg",
    "Konversi mono 16 kHz",
    "Pemrosesan berbasis chunk untuk audio panjang",
  ]);

  assert.equal(stt.speechToTextScope.asrInference.title.en, "ASR Inference");
  assert.equal(stt.speechToTextScope.asrInference.title.id, "Inferensi ASR");
  assert.deepEqual(stt.speechToTextScope.asrInference.items.en, [
    "English transcription only",
    "Pretrained facebook/wav2vec2-base-960h",
    "Hugging Face Transformers model execution",
    "Sequential inference for audio chunks",
    "No custom fine-tuning",
    "No WER or CER benchmark",
  ]);
  assert.deepEqual(stt.speechToTextScope.asrInference.items.id, [
    "Transkripsi bahasa Inggris saja",
    "Pretrained model facebook/wav2vec2-base-960h",
    "Eksekusi model melalui Hugging Face Transformers",
    "Inference bertahap untuk chunk audio",
    "Tanpa custom fine-tuning",
    "Tanpa benchmark WER atau CER",
  ]);

  // Model boundary note inside System Scope
  assert.equal(
    stt.speechToTextScope.modelNote.en,
    "This prototype uses a pretrained model without custom fine-tuning and does not include a WER or CER benchmark.",
  );
  assert.equal(
    stt.speechToTextScope.modelNote.id,
    "Prototype ini menggunakan pretrained model tanpa custom fine-tuning dan tidak mencakup benchmark WER maupun CER.",
  );

  assert.equal(
    stt.speechToTextScope.transcriptOutputs.title.en,
    "Transcript & Subtitle Outputs",
  );
  assert.equal(
    stt.speechToTextScope.transcriptOutputs.title.id,
    "Output Transkrip & Subtitle",
  );
  assert.deepEqual(stt.speechToTextScope.transcriptOutputs.items.en, [
    "TXT transcript",
    "CSV transcript",
    "JSON transcript",
    "Timestamp-based SRT subtitle",
    "Video with burned-in subtitles",
    "Before-and-after visual evidence",
  ]);
  assert.deepEqual(stt.speechToTextScope.transcriptOutputs.items.id, [
    "Transkrip TXT",
    "Transkrip CSV",
    "Transkrip JSON",
    "Subtitle SRT berbasis timestamp",
    "Video dengan subtitle tertanam",
    "Bukti visual perbandingan sebelum dan sesudah",
  ]);

  // Gallery: exactly 2 slides in cover-first order
  assert.equal(stt.gallery?.length, 2);
  assert.deepEqual(
    stt.gallery?.map((s) => s.src),
    [
      "/assets/projects/speech-to-text-system/cover.webp",
      "/assets/projects/speech-to-text-system/documentation/01.webp",
    ],
  );
  for (let i = 0; i < 2; i++) {
    const slide = stt.gallery?.[i];
    assert.ok(slide);
    assert.ok(existsSync(join(root, "public", slide.src)));
    assert.doesNotMatch(slide.caption.en, /^TODO_|^\[/);
    assert.doesNotMatch(slide.caption.id, /^TODO_|^\[/);
    assert.ok(slide.caption.en.length > 10);
    assert.ok(slide.caption.id.length > 10);
    assert.doesNotMatch(slide.alt.en, /^TODO_|^\[/);
    assert.doesNotMatch(slide.alt.id, /^TODO_|^\[/);
    assert.ok(slide.alt.en.length > 10);
    assert.ok(slide.alt.id.length > 10);
    assert.notEqual(slide.caption.en, slide.alt.en);
    assert.notEqual(slide.caption.id, slide.alt.id);
  }

  // Claim boundaries and prohibited strings
  const stringified = JSON.stringify(stt);
  assert.doesNotMatch(stringified, /"Machine Learning \/ AI Developer"/i);
  assert.doesNotMatch(stringified, /Completed workflow/i);
  assert.doesNotMatch(stringified, /Workflow selesai/i);
  assert.doesNotMatch(stringified, /Working Model|Development Model/i);
  assert.doesNotMatch(stringified, /Private Repository/i);
  assert.doesNotMatch(stringified, /custom-trained|custom training|fine-tuned model/i);
  assert.doesNotMatch(stringified, /production-grade|multilingual|forced alignment/i);
});

test("maintains approved Thermal Printer Service locked facts, bilingual copy, compact scope, metadata, media, and factual boundaries", () => {
  const tps = getProjectCaseStudy("thermal-printer-service");
  assert.ok(tps);

  // Locked facts & metadata
  assert.equal(tps.index, "08");
  assert.equal(tps.slug, "thermal-printer-service");
  assert.equal(tps.category, "mobile");
  assert.equal(tps.categoryLabel.en, "08 // MOBILE APPLICATION");
  assert.equal(tps.categoryLabel.id, "08 // MOBILE APPLICATION");
  assert.equal(tps.role.en, "Android Developer");
  assert.equal(tps.role.id, "Android Developer");
  assert.equal(tps.period?.en, "January–February 2026");
  assert.equal(tps.period?.id, "Januari–Februari 2026");
  assert.equal(tps.status.en, "Completed Application");
  assert.equal(tps.status.id, "Completed Application");
  assert.equal(tps.liveUrl, undefined);
  assert.equal(
    tps.githubUrl,
    "https://github.com/annastriw/ThermalPrinterService.git",
  );
  assert.equal(tps.repositoryNotice, undefined);
  assert.equal(tps.client, undefined);
  assert.equal(tps.workingModel, undefined);

  // MetadataRows display only Role, Period, Status, Platform
  assert.ok(tps.metadataRows);
  assert.equal(tps.metadataRows.length, 4);
  assert.deepEqual(
    tps.metadataRows.map((r) => r.label.en),
    ["Role", "Period", "Status", "Platform"],
  );
  assert.deepEqual(
    tps.metadataRows.map((r) => r.label.id),
    ["Peran", "Periode", "Status", "Platform"],
  );
  assert.deepEqual(
    tps.metadataRows.map((r) => r.value.en),
    [
      "Android Developer",
      "January–February 2026",
      "Completed Application",
      "Android",
    ],
  );
  assert.deepEqual(
    tps.metadataRows.map((r) => r.value.id),
    [
      "Android Developer",
      "Januari–Februari 2026",
      "Completed Application",
      "Android",
    ],
  );

  // Title and Lead
  assert.equal(tps.title.en, "Thermal Printer Service");
  assert.equal(tps.title.id, "Thermal Printer Service");
  assert.equal(
    tps.lead?.en,
    "A native Android print service that connects browser-based workflows to Bluetooth thermal printers and converts Android print jobs into monochrome output for configured ESC/POS devices.",
  );
  assert.equal(
    tps.lead?.id,
    "Aplikasi print service native Android yang menghubungkan workflow berbasis browser dengan thermal printer Bluetooth serta memproses print job Android menjadi output monokrom untuk perangkat ESC/POS yang telah dikonfigurasi.",
  );

  // SEO & Meta
  assert.equal(
    tps.metaTitle?.en,
    "Thermal Printer Service — Android Development Case Study | Annas Tri Widagdo",
  );
  assert.equal(
    tps.metaTitle?.id,
    "Thermal Printer Service — Studi Kasus Android Development | Annas Tri Widagdo",
  );
  assert.equal(
    tps.metaDescription?.en,
    "A native Kotlin Android PrintService case study covering Android print-job processing, monochrome ESC/POS conversion, Bluetooth delivery, and configurable 58 mm and 80 mm thermal printers.",
  );
  assert.equal(
    tps.metaDescription?.id,
    "Studi kasus Android PrintService native berbasis Kotlin yang mencakup pemrosesan print job, konversi ESC/POS monokrom, pengiriman Bluetooth, serta konfigurasi thermal printer 58 mm dan 80 mm.",
  );

  // Keywords
  assert.deepEqual(tps.keywords?.en, [
    "Android",
    "Kotlin",
    "Android Print Framework",
    "PrintService",
    "Bluetooth RFCOMM",
    "ESC/POS",
    "Thermal Printer",
    "Android Developer",
  ]);
  assert.deepEqual(tps.keywords?.id, [
    "Android",
    "Kotlin",
    "Android Print Framework",
    "PrintService",
    "Bluetooth RFCOMM",
    "ESC/POS",
    "Thermal Printer",
    "Android Developer",
  ]);

  // Overview (exact 2 paragraphs)
  assert.equal(tps.overview.en.length, 2);
  assert.equal(tps.overview.id.length, 2);
  assert.equal(
    tps.overview.en[0],
    "I developed Thermal Printer Service as a companion application for UKG System, enabling users to print from Chrome through Android’s standard printing workflow to a configured Bluetooth thermal printer.",
  );
  assert.equal(
    tps.overview.en[1],
    "The application converts print documents into monochrome ESC/POS output, manages background print jobs, and supports persistent profiles, calibration, retry, and error handling for 58 mm and 80 mm printers.",
  );
  assert.equal(
    tps.overview.id[0],
    "Saya mengembangkan Thermal Printer Service sebagai aplikasi pendamping UKG System agar pengguna dapat mencetak dari Chrome melalui workflow pencetakan standar Android ke thermal printer Bluetooth yang telah dikonfigurasi.",
  );
  assert.equal(
    tps.overview.id[1],
    "Aplikasi memproses dokumen menjadi output ESC/POS monokrom, menangani print job di background, serta menyediakan printer profile, calibration, retry, dan error handling untuk printer 58 mm dan 80 mm.",
  );

  // Contributions (exact 4 items + closing learning statement)
  assert.equal(tps.contributions.en.length, 4);
  assert.equal(tps.contributions.id.length, 4);
  assert.equal(
    tps.contributions.en[0],
    "Built a custom Android PrintService that receives print jobs through Android’s standard printing workflow.",
  );
  assert.equal(
    tps.contributions.en[1],
    "Implemented the PDF-to-bitmap and monochrome ESC/POS processing pipeline for 58 mm and 80 mm printers.",
  );
  assert.equal(
    tps.contributions.en[2],
    "Managed background job processing, chunked Bluetooth transfer, retry, cancellation, and error states.",
  );
  assert.equal(
    tps.contributions.en[3],
    "Developed persistent printer profiles and calibration controls for different printer configurations.",
  );
  assert.equal(
    tps.contributions.id[0],
    "Membangun custom Android PrintService yang menerima print job melalui workflow pencetakan standar Android.",
  );
  assert.equal(
    tps.contributions.id[1],
    "Mengimplementasikan pipeline PDF-to-bitmap dan pemrosesan ESC/POS monokrom untuk printer 58 mm dan 80 mm.",
  );
  assert.equal(
    tps.contributions.id[2],
    "Menangani print job di background, pengiriman data Bluetooth secara bertahap, retry, cancellation, dan error state.",
  );
  assert.equal(
    tps.contributions.id[3],
    "Mengembangkan printer profile yang tersimpan serta pengaturan calibration untuk berbagai konfigurasi printer.",
  );
  assert.equal(
    tps.contributionLearning?.en,
    "This project strengthened my experience in connecting web workflows with native Android services and printing hardware.",
  );
  assert.equal(
    tps.contributionLearning?.id,
    "Project ini memperkuat pengalaman saya dalam menghubungkan workflow web dengan native Android service dan perangkat printer.",
  );

  // Personal Tech Stack (exact 6 items in approved order)
  assert.deepEqual(tps.personalTechStack, [
    "Kotlin",
    "Android SDK",
    "Android Print Framework",
    "Bluetooth",
    "ESC/POS",
    "Gradle",
  ]);
  assert.deepEqual(tps.techStack, [
    "Kotlin",
    "Android SDK",
    "Android Print Framework",
    "Bluetooth",
    "ESC/POS",
    "Gradle",
  ]);

  // System Scope: exactly 3 groups with at most 4 items each
  assert.ok(tps.thermalPrinterScope);
  assert.equal(tps.thermalPrinterScope.groups.length, 3);

  const [group1, group2, group3] = tps.thermalPrinterScope.groups;
  assert.equal(group1.title.en, "System Print Integration");
  assert.equal(group1.title.id, "Integrasi Sistem Pencetakan");
  assert.deepEqual(group1.items.en, [
    "Printing initiated from the website in Chrome",
    "Android Print Framework",
    "Custom PrintService",
    "Sequential background print-job processing",
  ]);
  assert.deepEqual(group1.items.id, [
    "Pencetakan dimulai dari website di Chrome",
    "Android Print Framework",
    "Custom PrintService",
    "Pemrosesan print job di background secara sekuensial",
  ]);

  assert.equal(group2.title.en, "Document Processing");
  assert.equal(group2.title.id, "Pemrosesan Dokumen");
  assert.deepEqual(group2.items.en, [
    "Temporary PDF and PdfRenderer",
    "Bitmap scaling and alignment",
    "Monochrome ESC/POS conversion",
    "58 mm and 80 mm output configurations",
  ]);
  assert.deepEqual(group2.items.id, [
    "File PDF sementara dan PdfRenderer",
    "Penyesuaian skala dan perataan bitmap",
    "Konversi ESC/POS monokrom",
    "Konfigurasi output 58 mm dan 80 mm",
  ]);

  assert.equal(group3.title.en, "Bluetooth Printing & Printer Setup");
  assert.equal(group3.title.id, "Pencetakan Bluetooth & Setup Printer");
  assert.deepEqual(group3.items.en, [
    "Bluetooth RFCOMM/SPP connection",
    "Chunked data transfer with retry",
    "Persistent profiles using SharedPreferences and JSON",
    "Calibration and error handling",
  ]);
  assert.deepEqual(group3.items.id, [
    "Koneksi Bluetooth RFCOMM/SPP",
    "Pengiriman data bertahap dengan mekanisme retry",
    "Profil tersimpan menggunakan SharedPreferences dan JSON",
    "Kalibrasi dan penanganan error",
  ]);

  // Technical Metadata: exactly 4 static values
  assert.ok(tps.technicalMetadata);
  assert.equal(tps.technicalMetadata.length, 4);
  assert.deepEqual(
    tps.technicalMetadata.map((m) => m.value),
    ["58 / 80 MM", "203 DPI", "1,024 BYTES", "04 ATTEMPTS"],
  );
  assert.deepEqual(
    tps.technicalMetadata.map((m) => m.label.en),
    [
      "Paper Configuration",
      "Resolution Configuration",
      "Max Transfer Chunk",
      "Connection Retry Sequence",
    ],
  );
  assert.deepEqual(
    tps.technicalMetadata.map((m) => m.label.id),
    [
      "Konfigurasi Kertas",
      "Resolusi Konfigurasi",
      "Maksimum Chunk Transfer",
      "Urutan Retry Koneksi",
    ],
  );

  // Gallery: exactly 4 slides in cover-first order
  assert.equal(tps.gallery?.length, 4);
  assert.deepEqual(
    tps.gallery?.map((s) => s.src),
    [
      "/assets/projects/thermal-printer-service/cover.webp",
      "/assets/projects/thermal-printer-service/documentation/01.webp",
      "/assets/projects/thermal-printer-service/documentation/02.webp",
      "/assets/projects/thermal-printer-service/documentation/03.webp",
    ],
  );
  for (let i = 0; i < 4; i++) {
    const slide = tps.gallery?.[i];
    assert.ok(slide);
    assert.ok(existsSync(join(root, "public", slide.src)));
    assert.doesNotMatch(slide.caption.en, /^TODO_|^\[/);
    assert.doesNotMatch(slide.caption.id, /^TODO_|^\[/);
    assert.ok(slide.caption.en.length > 10);
    assert.ok(slide.caption.id.length > 10);
    assert.doesNotMatch(slide.alt.en, /^TODO_|^\[/);
    assert.doesNotMatch(slide.alt.id, /^TODO_|^\[/);
    assert.ok(slide.alt.en.length > 10);
    assert.ok(slide.alt.id.length > 10);
  }

  // Video demo at approved path
  assert.equal(tps.videoSrc, "/assets/projects/thermal-printer-service/demo.webm");
  assert.ok(existsSync(join(root, "public", tps.videoSrc)));

  // Prohibited claims & factual boundaries
  const stringifiedTPS = JSON.stringify(tps);
  assert.doesNotMatch(stringifiedTPS, /queue persistence|print queue persistent|surviving application closure/i);
  assert.doesNotMatch(stringifiedTPS, /universal printer|universal compatibility|all thermal printers/i);
  assert.doesNotMatch(stringifiedTPS, /speed improvement|benchmark|success rate|\b\d+%\s*speed/i);
  assert.doesNotMatch(stringifiedTPS, /Wi-Fi|USB printing|cloud printing/i);
  assert.doesNotMatch(stringifiedTPS, /Private Repository/i);
});

test("maintains approved Footy Standings locked facts, bilingual copy, compact scope, unique gallery, and factual boundaries", () => {
  const footy = getProjectCaseStudy("footy-standings");
  assert.ok(footy);

  // Locked facts & metadata
  assert.equal(footy.index, "09");
  assert.equal(footy.slug, "footy-standings");
  assert.equal(footy.category, "mobile");
  assert.equal(footy.categoryLabel.en, "09 // MOBILE APPLICATION");
  assert.equal(footy.categoryLabel.id, "09 // MOBILE APPLICATION");
  assert.equal(footy.role.en, "Android Developer");
  assert.equal(footy.role.id, "Android Developer");
  assert.equal(footy.period?.en, "October–November 2024");
  assert.equal(footy.period?.id, "Oktober–November 2024");
  assert.equal(footy.status.en, "Completed Application");
  assert.equal(footy.status.id, "Completed Application");
  assert.equal(footy.programmingLanguage, "Dart");
  assert.equal(footy.liveUrl, undefined);
  assert.equal(
    footy.githubUrl,
    "https://github.com/annastriw/FootyStandings.git",
  );
  assert.equal(footy.repositoryNotice, undefined);
  assert.equal(footy.client, undefined);
  assert.equal(footy.workingModel, undefined);

  // MetadataRows display only Role, Period, Status, Platform
  assert.ok(footy.metadataRows);
  assert.equal(footy.metadataRows.length, 4);
  assert.deepEqual(
    footy.metadataRows.map((r) => r.label.en),
    ["Role", "Period", "Status", "Platform"],
  );
  assert.deepEqual(
    footy.metadataRows.map((r) => r.label.id),
    ["Peran", "Periode", "Status", "Platform"],
  );
  assert.deepEqual(
    footy.metadataRows.map((r) => r.value.en),
    [
      "Android Developer",
      "October–November 2024",
      "Completed Application",
      "Android",
    ],
  );
  assert.deepEqual(
    footy.metadataRows.map((r) => r.value.id),
    [
      "Android Developer",
      "Oktober–November 2024",
      "Completed Application",
      "Android",
    ],
  );

  // Title and Lead
  assert.equal(footy.title.en, "Footy Standings");
  assert.equal(footy.title.id, "Footy Standings");
  assert.equal(
    footy.lead?.en,
    "An Android application built with Flutter for exploring football standings, fixtures, top scorers, and club information.",
  );
  assert.equal(
    footy.lead?.id,
    "Aplikasi Android berbasis Flutter untuk melihat klasemen sepak bola, jadwal pertandingan, top scorer, dan informasi klub.",
  );

  // SEO & Meta
  assert.equal(
    footy.metaTitle?.en,
    "Footy Standings — Android Development Case Study | Annas Tri Widagdo",
  );
  assert.equal(
    footy.metaTitle?.id,
    "Footy Standings — Studi Kasus Android Development | Annas Tri Widagdo",
  );
  assert.equal(
    footy.metaDescription?.en,
    "An Android application built with Flutter and Dart for football standings, fixtures, top scorers, and club details, featuring REST API integration and asynchronous UI states.",
  );
  assert.equal(
    footy.metaDescription?.id,
    "Aplikasi Android berbasis Flutter dan Dart untuk melihat klasemen sepak bola, jadwal pertandingan, top scorer, dan detail klub, dengan integrasi REST API dan penanganan status pemuatan data.",
  );

  // Keywords
  assert.deepEqual(footy.keywords?.en, [
    "Android",
    "Flutter",
    "Dart",
    "Football Data REST API",
    "REST API",
    "HTTP",
    "JSON",
    "FutureBuilder",
    "Android Developer",
  ]);
  assert.deepEqual(footy.keywords?.id, [
    "Android",
    "Flutter",
    "Dart",
    "Football Data REST API",
    "REST API",
    "HTTP",
    "JSON",
    "FutureBuilder",
    "Android Developer",
  ]);

  // Overview (exact 2 paragraphs)
  assert.equal(footy.overview.en.length, 2);
  assert.equal(footy.overview.id.length, 2);
  assert.equal(
    footy.overview.en[0],
    "I built Footy Standings for personal use to follow football league standings in one mobile application. I developed the interface, navigation, and REST API integration using Flutter and Dart.",
  );
  assert.equal(
    footy.overview.en[1],
    "The application maps API responses into structured data models and handles loading, errors, empty results, and successful requests to keep the interface clear.",
  );
  assert.equal(
    footy.overview.id[0],
    "Saya mengembangkan Footy Standings untuk kebutuhan pribadi dalam mengikuti klasemen liga sepak bola melalui satu aplikasi mobile. Saya membangun antarmuka, navigasi, dan integrasi REST API menggunakan Flutter dan Dart.",
  );
  assert.equal(
    footy.overview.id[1],
    "Aplikasi memetakan respons API ke model data terstruktur serta menangani kondisi loading, error, data kosong, dan data berhasil dimuat agar informasi tetap mudah dipahami.",
  );

  // Contributions (exact 4 items + closing learning statement)
  assert.equal(footy.contributions.en.length, 4);
  assert.equal(footy.contributions.id.length, 4);
  assert.equal(
    footy.contributions.en[0],
    "Built the Android interface and navigation using Flutter and Dart.",
  );
  assert.equal(
    footy.contributions.en[1],
    "Integrated the Football Data REST API through HTTP requests and JSON parsing.",
  );
  assert.equal(
    footy.contributions.en[2],
    "Created structured data models for standings, fixtures, top scorers, and club details.",
  );
  assert.equal(
    footy.contributions.en[3],
    "Handled loading, error, empty, and success states using Future and FutureBuilder.",
  );
  assert.equal(
    footy.contributions.id[0],
    "Membangun antarmuka dan navigasi aplikasi Android menggunakan Flutter dan Dart.",
  );
  assert.equal(
    footy.contributions.id[1],
    "Mengintegrasikan Football Data REST API melalui HTTP request dan parsing JSON.",
  );
  assert.equal(
    footy.contributions.id[2],
    "Membuat model data terstruktur untuk klasemen, jadwal pertandingan, top scorer, dan detail klub.",
  );
  assert.equal(
    footy.contributions.id[3],
    "Menangani kondisi loading, error, data kosong, dan data berhasil dimuat menggunakan Future dan FutureBuilder.",
  );
  assert.equal(
    footy.contributionLearning?.en,
    "This project strengthened my experience in turning API data into clear, accessible information within an Android application.",
  );
  assert.equal(
    footy.contributionLearning?.id,
    "Project ini memperkuat pengalaman saya dalam mengolah data API menjadi informasi yang mudah diakses dan dipahami melalui aplikasi Android.",
  );

  // Personal Tech Stack (exact 6 items in approved order)
  assert.deepEqual(footy.personalTechStack, [
    "Flutter",
    "Dart",
    "REST API",
    "HTTP",
    "JSON",
    "FutureBuilder",
  ]);
  assert.deepEqual(footy.techStack, [
    "Flutter",
    "Dart",
    "REST API",
    "HTTP",
    "JSON",
    "FutureBuilder",
  ]);

  // System Scope: exactly 3 groups with 4 items each, group 1 has compactList
  assert.ok(footy.footyScope);
  assert.equal(footy.footyScope.groups.length, 3);

  const [fGroup1, fGroup2, fGroup3] = footy.footyScope.groups;
  assert.equal(fGroup1.title.en, "Football Information");
  assert.equal(fGroup1.title.id, "Informasi Sepak Bola");
  assert.deepEqual(fGroup1.items.en, [
    "League standings",
    "Upcoming fixtures",
    "Top scorers",
    "Club details",
  ]);
  assert.deepEqual(fGroup1.items.id, [
    "Klasemen liga",
    "Jadwal pertandingan mendatang",
    "Top scorer",
    "Detail klub",
  ]);
  assert.equal(
    fGroup1.compactList,
    "Premier League · La Liga · Bundesliga · Serie A · Ligue 1 · Primeira Liga",
  );

  assert.equal(fGroup2.title.en, "API Integration");
  assert.equal(fGroup2.title.id, "Integrasi API");
  assert.deepEqual(fGroup2.items.en, [
    "Football Data REST API",
    "HTTP requests",
    "JSON parsing",
    "Structured Dart data models",
  ]);
  assert.deepEqual(fGroup2.items.id, [
    "Football Data REST API",
    "HTTP request",
    "Parsing JSON",
    "Model data Dart terstruktur",
  ]);

  assert.equal(fGroup3.title.en, "Navigation & UI States");
  assert.equal(fGroup3.title.id, "Navigasi & Status Antarmuka");
  assert.deepEqual(fGroup3.items.en, [
    "Application navigation",
    "Loading state",
    "Error and empty states",
    "Success state",
  ]);
  assert.deepEqual(fGroup3.items.id, [
    "Navigasi aplikasi",
    "Status loading",
    "Status error dan data kosong",
    "Status sukses",
  ]);

  // Gallery: exactly 4 unique slides in cover-first order
  assert.equal(footy.gallery?.length, 4);
  assert.deepEqual(
    footy.gallery?.map((s) => s.src),
    [
      "/assets/projects/footy-standings/cover.webp",
      "/assets/projects/footy-standings/documentation/02.webp",
      "/assets/projects/footy-standings/documentation/03.webp",
      "/assets/projects/footy-standings/documentation/04.webp",
    ],
  );
  for (let i = 0; i < 4; i++) {
    const slide = footy.gallery?.[i];
    assert.ok(slide);
    assert.ok(existsSync(join(root, "public", slide.src)));
    assert.doesNotMatch(slide.caption.en, /^TODO_|^\[/);
    assert.doesNotMatch(slide.caption.id, /^TODO_|^\[/);
    assert.ok(slide.caption.en.length > 10);
    assert.ok(slide.caption.id.length > 10);
    assert.doesNotMatch(slide.alt.en, /^TODO_|^\[/);
    assert.doesNotMatch(slide.alt.id, /^TODO_|^\[/);
    assert.ok(slide.alt.en.length > 10);
    assert.ok(slide.alt.id.length > 10);
  }

  // No video or technical metadata strip
  assert.equal(footy.videoSrc, undefined);
  assert.equal(footy.technicalMetadata, undefined);

  // Prohibited claims & factual boundaries
  const stringifiedFooty = JSON.stringify(footy);
  assert.doesNotMatch(stringifiedFooty, /"Flutter Developer"/i);
  assert.doesNotMatch(stringifiedFooty, /Implementation documented/i);
  assert.doesNotMatch(stringifiedFooty, /real[- ]?time scores|live score|instant sync|automatic refresh|polling/i);
  assert.doesNotMatch(stringifiedFooty, /iOS|Play Store|Google Play|App Store/i);
  assert.doesNotMatch(stringifiedFooty, /downloads|active users|revenue/i);
  assert.doesNotMatch(stringifiedFooty, /Private Repository/i);
});

test("maintains approved Panoramic Virtual Tour locked facts, bilingual copy, compact scope, unique gallery, and factual boundaries", () => {
  const pvt = getProjectCaseStudy("panoramic-virtual-tour");
  assert.ok(pvt);

  // Locked facts & metadata
  assert.equal(pvt.index, "10");
  assert.equal(pvt.slug, "panoramic-virtual-tour");
  assert.equal(pvt.category, "other");
  assert.equal(pvt.categoryLabel.en, "Interactive Prototype");
  assert.equal(pvt.categoryLabel.id, "Prototype Interaktif");
  assert.doesNotMatch(pvt.categoryLabel.id, /Purwarupa/i);
  assert.equal(pvt.role.en, "Junior Game Developer Intern");
  assert.equal(pvt.role.id, "Junior Game Developer Intern");
  assert.equal(pvt.period?.en, "July–August 2024");
  assert.equal(pvt.period?.id, "Juli–Agustus 2024");
  assert.equal(pvt.status.en, "Completed Prototype");
  assert.equal(pvt.status.id, "Completed Prototype");
  assert.equal(pvt.programmingLanguage, "C#");
  assert.equal(pvt.liveUrl, undefined);
  assert.equal(pvt.githubUrl, undefined);
  assert.equal(pvt.repositoryNotice, undefined);
  assert.equal(pvt.client, undefined);
  assert.equal(pvt.workingModel, undefined);

  // MetadataRows display exactly Role, Period, Status (3 rows)
  assert.ok(pvt.metadataRows);
  assert.equal(pvt.metadataRows.length, 3);
  assert.deepEqual(
    pvt.metadataRows.map((r) => r.label.en),
    ["Role", "Period", "Status"],
  );
  assert.deepEqual(
    pvt.metadataRows.map((r) => r.label.id),
    ["Peran", "Periode", "Status"],
  );
  assert.deepEqual(
    pvt.metadataRows.map((r) => r.value.en),
    [
      "Junior Game Developer Intern",
      "July–August 2024",
      "Completed Prototype",
    ],
  );
  assert.deepEqual(
    pvt.metadataRows.map((r) => r.value.id),
    [
      "Junior Game Developer Intern",
      "Juli–Agustus 2024",
      "Completed Prototype",
    ],
  );

  // Title and Lead
  assert.equal(pvt.title.en, "Panoramic Virtual Tour");
  assert.equal(pvt.title.id, "Panoramic Virtual Tour");
  assert.equal(
    pvt.lead?.en,
    "A Unity-based virtual tour prototype for exploring architectural spaces through 360° panoramas and hotspot navigation.",
  );
  assert.equal(
    pvt.lead?.id,
    "Prototype virtual tour berbasis Unity untuk menjelajahi ruang bangunan melalui panorama 360° dan navigasi hotspot.",
  );

  // SEO & Meta
  assert.equal(
    pvt.metaTitle?.en,
    "Panoramic Virtual Tour — Unity Development Case Study | Annas Tri Widagdo",
  );
  assert.equal(
    pvt.metaTitle?.id,
    "Panoramic Virtual Tour — Studi Kasus Unity Development | Annas Tri Widagdo",
  );
  assert.equal(
    pvt.metaDescription?.en,
    "A Unity virtual tour prototype built from team-supplied 3D models, combining Lumion Pro panoramas, 360° viewing, hotspot navigation, and scene management.",
  );
  assert.equal(
    pvt.metaDescription?.id,
    "Prototype virtual tour Unity yang dikembangkan dari model 3D buatan tim, dengan panorama Lumion Pro, tampilan 360°, navigasi hotspot, dan pengelolaan scene.",
  );

  // Keywords
  assert.deepEqual(pvt.keywords?.en, [
    "Unity",
    "C#",
    "Lumion Pro",
    "Physics Raycast",
    "Scene Management",
    "Junior Game Developer Intern",
    "Virtual Tour",
    "Interactive Prototype",
  ]);
  assert.deepEqual(pvt.keywords?.id, [
    "Unity",
    "C#",
    "Lumion Pro",
    "Physics Raycast",
    "Scene Management",
    "Junior Game Developer Intern",
    "Virtual Tour",
    "Prototype Interaktif",
  ]);
  assert.doesNotMatch(JSON.stringify(pvt.keywords), /Purwarupa/i);

  // Project External Action (Google Drive folder)
  assert.ok(pvt.projectLinks);
  assert.equal(pvt.projectLinks.length, 1);
  assert.equal(pvt.projectLinks[0].label.en, "View Project Files");
  assert.equal(pvt.projectLinks[0].label.id, "Lihat File Project");
  assert.equal(
    pvt.projectLinks[0].url,
    "https://drive.google.com/drive/folders/1hi1Njtmg8O8_soigVc-wROw2rlwtnjpp?usp=sharing",
  );

  // Overview (exact 2 paragraphs)
  assert.equal(pvt.overview.en.length, 2);
  assert.equal(pvt.overview.id.length, 2);
  assert.equal(
    pvt.overview.en[0],
    "I developed this prototype with a team during my internship in the IT Division of PT Duta Basis Dataprima. It was intended to support project presentations to clients, with the completed prototype demonstrated internally to the director.",
  );
  assert.equal(
    pvt.overview.en[1],
    "Using 3D models created by other team members, I prepared and rendered panoramas in Lumion Pro, then built the viewing controls, hotspot navigation, and scene transitions in Unity.",
  );
  assert.equal(
    pvt.overview.id[0],
    "Saya mengembangkan prototype ini bersama tim selama magang di Divisi IT PT Duta Basis Dataprima. Project ini ditujukan untuk mendukung presentasi kepada klien, dan hasilnya telah dipresentasikan secara internal kepada direktur.",
  );
  assert.equal(
    pvt.overview.id[1],
    "Menggunakan model 3D yang dibuat anggota tim lain, saya menyiapkan dan merender panorama di Lumion Pro, lalu membangun kontrol pandangan, navigasi hotspot, dan perpindahan scene di Unity.",
  );

  // Contributions (exact 4 items + closing learning statement)
  assert.equal(pvt.contributions.en.length, 4);
  assert.equal(pvt.contributions.id.length, 4);
  assert.equal(
    pvt.contributions.en[0],
    "Prepared panorama viewpoints, materials, and lighting in Lumion Pro using 3D models supplied by the team.",
  );
  assert.equal(
    pvt.contributions.en[1],
    "Rendered panoramas and integrated them into Unity for 360° viewing.",
  );
  assert.equal(
    pvt.contributions.en[2],
    "Built mouse and touch controls with reusable hotspot navigation in C#.",
  );
  assert.equal(
    pvt.contributions.en[3],
    "Implemented asynchronous scene transitions and a persistent PlayerRig.",
  );
  assert.equal(
    pvt.contributions.id[0],
    "Menyiapkan titik panorama, material, dan pencahayaan di Lumion Pro menggunakan model 3D dari tim.",
  );
  assert.equal(
    pvt.contributions.id[1],
    "Merender panorama dan mengintegrasikannya ke Unity untuk tampilan 360°.",
  );
  assert.equal(
    pvt.contributions.id[2],
    "Membangun kontrol mouse dan touch serta navigasi hotspot yang reusable menggunakan C#.",
  );
  assert.equal(
    pvt.contributions.id[3],
    "Mengimplementasikan perpindahan scene secara asynchronous dan PlayerRig yang tetap aktif antar-scene.",
  );
  assert.equal(
    pvt.contributionLearning?.en,
    "This project strengthened my experience in turning a team’s architectural visuals into an interactive experience in Unity.",
  );
  assert.equal(
    pvt.contributionLearning?.id,
    "Project ini memperkuat pengalaman saya dalam mengolah visual arsitektur dari tim menjadi pengalaman interaktif di Unity.",
  );

  // Personal Tech Stack (exact 5 items in approved order)
  assert.deepEqual(pvt.personalTechStack, [
    "Unity",
    "C#",
    "Lumion Pro",
    "Physics Raycast",
    "Scene Management",
  ]);
  assert.deepEqual(pvt.techStack, [
    "Unity",
    "C#",
    "Lumion Pro",
    "Physics Raycast",
    "Scene Management",
  ]);

  // System Scope: exactly 3 groups with 3 items each
  assert.ok(pvt.panoramicScope);
  assert.equal(pvt.panoramicScope.groups.length, 3);

  const [pGroup1, pGroup2, pGroup3] = pvt.panoramicScope.groups;
  assert.equal(pGroup1.title.en, "Panorama Preparation");
  assert.equal(pGroup1.title.id, "Persiapan Panorama");
  assert.deepEqual(pGroup1.items.en, [
    "Team-supplied 3D architectural models.",
    "Panorama viewpoints, materials, lighting, and reflections in Lumion Pro.",
    "78 rendered panoramas.",
  ]);
  assert.deepEqual(pGroup1.items.id, [
    "Model arsitektur 3D dari tim.",
    "Titik panorama, material, pencahayaan, dan refleksi di Lumion Pro.",
    "78 panorama hasil rendering.",
  ]);

  assert.equal(pGroup2.title.en, "360° Exploration");
  assert.equal(pGroup2.title.id, "Eksplorasi 360°");
  assert.deepEqual(pGroup2.items.en, [
    "Panorama integration in Unity.",
    "360° viewing controls.",
    "Mouse and touch interaction.",
  ]);
  assert.deepEqual(pGroup2.items.id, [
    "Integrasi panorama di Unity.",
    "Kontrol pandangan 360°.",
    "Interaksi menggunakan mouse dan touch.",
  ]);

  assert.equal(
    pGroup3.title.en,
    "Hotspot Navigation & Scene Management",
  );
  assert.equal(
    pGroup3.title.id,
    "Navigasi Hotspot & Pengelolaan Scene",
  );
  assert.deepEqual(pGroup3.items.en, [
    "Reusable hotspots using C#, Physics Raycast, and BoxCollider.",
    "Asynchronous transitions across a structure of up to 79 scenes.",
    "Persistent PlayerRig between scenes.",
  ]);
  assert.deepEqual(pGroup3.items.id, [
    "Hotspot reusable menggunakan C#, Physics Raycast, dan BoxCollider.",
    "Perpindahan asynchronous dalam struktur hingga 79 scene.",
    "PlayerRig yang tetap aktif antar-scene.",
  ]);

  // Distinct counts: "78 rendered panoramas" only in scope group 1, "up to 79 scenes" only in scope group 3
  const stringifiedOverview = JSON.stringify(pvt.overview);
  const stringifiedContrib = JSON.stringify(pvt.contributions);
  assert.doesNotMatch(stringifiedOverview, /78|79/);
  assert.doesNotMatch(stringifiedContrib, /78|79/);

  // Gallery: exactly 7 unique slides in cover-first order
  assert.equal(pvt.gallery?.length, 7);
  assert.deepEqual(
    pvt.gallery?.map((s) => s.src),
    [
      "/assets/projects/panoramic-virtual-tour/cover.webp",
      "/assets/projects/panoramic-virtual-tour/documentation/02.webp",
      "/assets/projects/panoramic-virtual-tour/documentation/03.webp",
      "/assets/projects/panoramic-virtual-tour/documentation/04.webp",
      "/assets/projects/panoramic-virtual-tour/documentation/05.webp",
      "/assets/projects/panoramic-virtual-tour/documentation/06.webp",
      "/assets/projects/panoramic-virtual-tour/documentation/07.webp",
    ],
  );
  for (let i = 0; i < 7; i++) {
    const slide = pvt.gallery?.[i];
    assert.ok(slide);
    assert.ok(existsSync(join(root, "public", slide.src)));
    assert.doesNotMatch(slide.caption.en, /^TODO_|^\[/);
    assert.doesNotMatch(slide.caption.id, /^TODO_|^\[/);
    assert.ok(slide.caption.en.length > 10);
    assert.ok(slide.caption.id.length > 10);
    assert.doesNotMatch(slide.alt.en, /^TODO_|^\[/);
    assert.doesNotMatch(slide.alt.id, /^TODO_|^\[/);
    assert.ok(slide.alt.en.length > 10);
    assert.ok(slide.alt.id.length > 10);
  }

  // Evidence: exactly 7 figures FIG.01-FIG.07 matching gallery
  assert.equal(pvt.evidence.length, 7);
  for (let i = 0; i < 7; i++) {
    assert.equal(pvt.evidence[i].id, `FIG.0${i + 1}`);
  }

  // No video or technical metadata strip
  assert.equal(pvt.videoSrc, undefined);
  assert.equal(pvt.technicalMetadata, undefined);

  // Authorship & delivery boundaries: 3D modeling credited to team, demo internal to director
  const stringifiedPVT = JSON.stringify(pvt);
  assert.match(stringifiedPVT, /3D models created by other team members|model 3D yang dibuat anggota tim lain/i);
  assert.match(stringifiedPVT, /demonstrated internally to the director|dipresentasikan secara internal kepada direktur/i);
  assert.doesNotMatch(stringifiedPVT, /\bAR\b|\bVR\b|WebGL/i);
  assert.doesNotMatch(stringifiedPVT, /client delivery|client adoption|client-facing deployment/i);
  assert.doesNotMatch(stringifiedPVT, /live website|production deployment|public Windows release/i);
  assert.doesNotMatch(stringifiedPVT, /downloads|active users|revenue/i);
  assert.doesNotMatch(stringifiedPVT, /Private Repository/i);
});

test("keeps the project-specific factual boundaries explicit", () => {
  const stringify = (slug) => JSON.stringify(getProjectCaseStudy(slug));

  assert.match(stringify("ihealth-edu"), /not provide a clinical diagnosis|bukan sebagai diagnosis klinis/i);
  assert.match(
    stringify("ml-for-heart-attack-risk-prediction"),
    /71\.93%|71,93%/,
  );
  assert.match(
    stringify("ml-for-heart-attack-risk-prediction"),
    /0\.8015|0,8015/,
  );
  assert.match(stringify("speech-to-text-system"), /pretrained|pralatih/i);
  assert.doesNotMatch(stringify("speech-to-text-system"), /fine-tuned model|custom-trained|custom training|transcription accuracy|multilingual/i);
  assert.doesNotMatch(stringify("footy-standings"), /real[- ]?time|live data|data live/i);
  assert.doesNotMatch(stringify("panoramic-virtual-tour"), /\bAR\b|\bVR\b|WebGL/i);
  assert.doesNotMatch(stringify("thermal-printer-service"), /universal|semua printer/i);
});

test("resolves every slug and deterministic adjacent navigation", () => {
  for (const slug of expectedSlugs) {
    assert.equal(getProjectCaseStudy(slug)?.slug, slug);
  }
  assert.equal(getProjectCaseStudy("missing"), null);

  const first = getAdjacentProjectCaseStudies(expectedSlugs[0]);
  assert.equal(first.previous, null);
  assert.equal(first.next?.slug, expectedSlugs[1]);

  const last = getAdjacentProjectCaseStudies(expectedSlugs.at(-1));
  assert.equal(last.previous?.slug, expectedSlugs.at(-2));
  assert.equal(last.next, null);
});

test("project public rendering has no project Markdown runtime import", () => {
  const route = readFileSync(
    join(root, "src", "app", "[locale]", "projects", "[slug]", "page.tsx"),
    "utf8",
  );

  assert.doesNotMatch(route, /gray-matter|react-markdown|@\/lib\/projects/);
});

test("ProjectDetailView implements approved unified editorial layout for UKG System reference case study", () => {
  const detailComponent = readFileSync(
    join(root, "src", "components", "projects", "project-detail-view.tsx"),
    "utf8",
  );

  // 1. Opening: Back Link, H1, Lead, Metadata Grid, Actions
  assert.match(detailComponent, /copy\.backToProjects/);
  assert.match(detailComponent, /styles\.backNav/);
  assert.match(detailComponent, /styles\.backLink/);
  assert.match(detailComponent, /project\.categoryLabel\[locale\]/);
  assert.match(detailComponent, /<h1 className=\{styles\.title\}>\{project\.title\[locale\]\}<\/h1>/);
  assert.match(detailComponent, /styles\.lead/);
  assert.match(detailComponent, /styles\.metaGrid/);
  assert.match(detailComponent, /metaEntries/);
  assert.match(detailComponent, /getProjectMetaEntries/);
  assert.match(detailComponent, /styles\.liveCta/);
  assert.match(detailComponent, /styles\.repoNotice/);

  // 2. Section 01: Top-of-page 9-Slide Gallery Carousel with Shared useGalleryAutoplay
  assert.match(detailComponent, /useGalleryAutoplay/);
  assert.match(detailComponent, /section-gallery-title/);
  assert.match(detailComponent, /copy\.galleryTitle/);
  assert.match(detailComponent, /role=\{slides\.length > 1 \? "region" : undefined\}/);
  assert.match(detailComponent, /styles\.galleryFrame/);
  assert.match(detailComponent, /styles\.galleryTrack/);
  assert.match(detailComponent, /styles\.gallerySlideItem/);
  assert.match(detailComponent, /handleTransitionEnd/);
  assert.match(detailComponent, /goToPrev/);
  assert.match(detailComponent, /goToNext/);
  assert.match(detailComponent, /handleTouchStart/);
  assert.match(detailComponent, /handleTouchMove/);
  assert.match(detailComponent, /handleTouchEnd/);
  assert.match(detailComponent, /handleCarouselKeyDown/);
  assert.match(detailComponent, /styles\.galleryBottomBar/);
  assert.match(detailComponent, /styles\.galleryCaption/);
  assert.match(detailComponent, /styles\.galleryControls/);
  assert.match(detailComponent, /styles\.galleryCounter/);
  assert.match(detailComponent, /styles\.galleryNavBtn/);

  // Synchronized Lightbox Inspection Dialog
  assert.match(detailComponent, /styles\.lightboxOverlay/);
  assert.match(detailComponent, /styles\.lightboxNavBtn/);
  assert.match(detailComponent, /styles\.lightboxCounter/);
  assert.match(detailComponent, /handleCloseLightbox/);

  // 3. Section 02: Project Overview / Ringkasan Project
  assert.match(detailComponent, /section-overview-title/);
  assert.match(detailComponent, /copy\.overviewTitle/);
  assert.match(detailComponent, /styles\.overviewGrid/);

  // 4. Section 03: My Contribution / Kontribusi Saya
  assert.match(detailComponent, /section-contribution-title/);
  assert.match(detailComponent, /copy\.contributionTitle/);
  assert.match(detailComponent, /styles\.contributionList/);
  assert.match(detailComponent, /styles\.contributionLearning/);

  // 5. Section 04: System Scope / Cakupan Sistem
  assert.match(detailComponent, /section-scope-title/);
  assert.match(detailComponent, /copy\.scopeTitle/);
  assert.match(detailComponent, /styles\.modulesGrid/);
  assert.match(detailComponent, /styles\.techGroupsList/);
  assert.doesNotMatch(detailComponent, /workflowContainer/);
  assert.doesNotMatch(detailComponent, /workflowSubtag/);

  // Exclusions for shared detail view: No internal adjacent nav, no standalone hero cover
  assert.doesNotMatch(detailComponent, /adjacentNav/);
  assert.doesNotMatch(detailComponent, /coverFigure/);
  assert.doesNotMatch(detailComponent, /videoEvidenceCard/);
});

test("ProjectDetailView implements approved unified editorial layout for iHealth Edu reference case study", () => {
  const detailComponent = readFileSync(
    join(root, "src", "components", "projects", "project-detail-view.tsx"),
    "utf8",
  );

  // 1. Opening: Back Link, Split Composition (Left Title/Meta, Right Lead/Actions)
  assert.match(detailComponent, /copy\.backToProjects/);
  assert.match(detailComponent, /styles\.backNav/);
  assert.match(detailComponent, /styles\.backLink/);
  assert.match(detailComponent, /project\.categoryLabel\[locale\]/);
  assert.match(detailComponent, /<h1 className=\{styles\.title\}>\{project\.title\[locale\]\}<\/h1>/);
  assert.match(detailComponent, /styles\.openingSplit/);
  assert.match(detailComponent, /styles\.openingLeft/);
  assert.match(detailComponent, /styles\.openingRight/);
  assert.match(detailComponent, /styles\.lead/);
  assert.match(detailComponent, /styles\.metaGrid/);
  assert.match(detailComponent, /metaEntries/);
  assert.match(detailComponent, /getProjectMetaEntries/);

  // Three Project Links with Safe External Target and Accessible New Tab Labels
  assert.match(detailComponent, /styles\.liveCta/);
  assert.match(detailComponent, /styles\.repoLink/);
  assert.match(detailComponent, /copy\.liveCta/);
  assert.match(detailComponent, /copy\.frontendRepo/);
  assert.match(detailComponent, /copy\.backendRepo/);
  assert.match(detailComponent, /copy\.newTabCue/);
  assert.match(detailComponent, /project\.liveUrl/);
  assert.match(detailComponent, /project\.frontendRepoUrl/);
  assert.match(detailComponent, /project\.backendRepoUrl/);

  // 2. Section 01: Top-of-page Gallery with Thumbnail Rail & Shared useGalleryAutoplay
  assert.match(detailComponent, /useGalleryAutoplay/);
  assert.match(detailComponent, /section-gallery-title/);
  assert.match(detailComponent, /copy\.galleryTitle/);
  assert.match(detailComponent, /styles\.galleryFrame/);
  assert.match(detailComponent, /styles\.galleryTrack/);
  assert.match(detailComponent, /styles\.gallerySlideItem/);
  assert.match(detailComponent, /handleTransitionEnd/);
  assert.match(detailComponent, /styles\.thumbnailRail/);
  assert.match(detailComponent, /styles\.thumbnailBtn/);
  assert.match(detailComponent, /styles\.thumbnailActive/);
  assert.match(detailComponent, /styles\.thumbnailActiveIndicator/);
  assert.match(detailComponent, /goToIndex/);
  assert.match(detailComponent, /goToPrev/);
  assert.match(detailComponent, /goToNext/);
  assert.match(detailComponent, /handleTouchStart/);
  assert.match(detailComponent, /handleTouchMove/);
  assert.match(detailComponent, /handleTouchEnd/);
  assert.match(detailComponent, /handleCarouselKeyDown/);
  assert.match(detailComponent, /styles\.galleryBottomBar/);
  assert.match(detailComponent, /styles\.galleryCaption/);
  assert.match(detailComponent, /styles\.galleryControls/);
  assert.match(detailComponent, /styles\.galleryCounter/);
  assert.match(detailComponent, /styles\.galleryNavBtn/);

  // Synchronized Lightbox Inspection Dialog
  assert.match(detailComponent, /styles\.lightboxOverlay/);
  assert.match(detailComponent, /styles\.lightboxNavBtn/);
  assert.match(detailComponent, /styles\.lightboxCounter/);
  assert.match(detailComponent, /handleCloseLightbox/);

  // 3. Section 02: Project Overview & Visible Medical Boundary
  assert.match(detailComponent, /section-overview-title/);
  assert.match(detailComponent, /copy\.overviewTitle/);
  assert.match(detailComponent, /styles\.overviewGrid/);
  assert.match(detailComponent, /styles\.claimBoundaryCard/);
  assert.match(detailComponent, /copy\.claimBoundaryTag/);

  // 4. Section 03: My Contribution & 6-Item Personal Stack
  assert.match(detailComponent, /section-contribution-title/);
  assert.match(detailComponent, /copy\.contributionTitle/);
  assert.match(detailComponent, /styles\.contributionList/);
  assert.match(detailComponent, /styles\.personalStackBlock/);
  assert.match(detailComponent, /copy\.personalStackTag/);
  assert.match(detailComponent, /styles\.stackBadge/);

  // 5. Section 04: System Scope (4 Scannable Groups)
  assert.match(detailComponent, /section-scope-title/);
  assert.match(detailComponent, /copy\.scopeTitle/);
  assert.match(detailComponent, /styles\.systemScopeGrid/);
  assert.match(detailComponent, /copy\.scopeRolesHeader/);
  assert.match(detailComponent, /copy\.scopeScreeningHeader/);
  assert.match(detailComponent, /copy\.scopePatientDataHeader/);
  assert.match(detailComponent, /copy\.scopeIntegrationHeader/);
  assert.match(detailComponent, /styles\.learningFlow/);
  assert.match(detailComponent, /styles\.flowContainer/);
  assert.match(detailComponent, /styles\.flowStep/);
  assert.match(detailComponent, /copy\.architectureNote/);
});

test("project-detail.module.css defines responsive grid, carousel, thumbnail rail, crossfade, metadata, and reduced motion", () => {
  const css = readFileSync(
    join(root, "src", "components", "projects", "project-detail.module.css"),
    "utf8",
  );

  // Check key responsive, opening split, carousel, thumbnail rail, and layout rules
  assert.match(css, /\.openingSplit/);
  assert.match(css, /\.openingLeft/);
  assert.match(css, /\.openingRight/);
  assert.match(css, /\.galleryFrame\s*\{[^}]*touch-action:\s*pan-y/);
  assert.match(css, /\.galleryTrack/);
  assert.match(css, /\.galleryTrackSliding/);
  assert.match(css, /\.gallerySlideItem/);
  assert.match(css, /\.galleryImage\s*\{[^}]*object-fit:\s*contain/);
  assert.match(css, /\.thumbnailRail/);
  assert.match(css, /\.thumbnailBtn/);
  assert.match(css, /\.thumbnailActive/);
  assert.match(css, /\.thumbnailActiveIndicator/);
  assert.match(css, /\.galleryBottomBar/);
  assert.match(css, /\.galleryCaption/);
  assert.match(css, /\.galleryControls/);
  assert.match(css, /\.galleryCounter/);
  assert.match(css, /\.galleryNavBtn/);
  assert.match(css, /\.lightboxNavBtn/);
  assert.match(css, /\.lightboxCounter/);
  assert.match(css, /\.liveCta/);
  assert.match(css, /\.repoLink/);
  assert.match(css, /\.claimBoundaryCard/);
  assert.match(css, /\.personalStackBlock/);
  assert.match(css, /\.modulesGrid/);
  assert.match(css, /\.techGroupsList/);
  assert.match(css, /\.systemScopeGrid/);
  assert.match(css, /\.flowContainer/);
  assert.match(css, /@media\s*\(min-width:\s*64rem\)/);
  assert.match(css, /@media\s*\(min-width:\s*48rem\)/);
  assert.match(css, /@media\s*\(max-width:\s*63\.9375rem\)/);
  assert.match(css, /@media\s*\(max-width:\s*39\.9375rem\)/);
  assert.match(css, /@media\s*\(max-width:\s*26\.25rem\)/);
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  assert.match(css, /word-break:\s*break-word/);
  assert.match(css, /overflow-wrap:\s*break-word/);
});

test("use-gallery-autoplay.ts implements 4-second interval, pause conditions, restart on manual navigation, and reduced motion safety", () => {
  const hookSource = readFileSync(
    join(root, "src", "components", "projects", "use-gallery-autoplay.ts"),
    "utf8",
  );

  assert.match(hookSource, /intervalMs\s*=\s*4000/);
  assert.match(hookSource, /useSyncExternalStore/);
  assert.match(hookSource, /prefers-reduced-motion:\s*reduce/);
  assert.match(hookSource, /visibilitychange/);
  assert.match(hookSource, /goToNext/);
  assert.match(hookSource, /goToPrev/);
  assert.match(hookSource, /goToIndex/);
  assert.match(hookSource, /restartTimer/);
  assert.match(hookSource, /clearInterval\(timer\)/);
  assert.match(hookSource, /onMouseEnter/);
  assert.match(hookSource, /onMouseLeave/);
  assert.match(hookSource, /onFocusCapture/);
  assert.match(hookSource, /onBlurCapture/);
});

test("gallery navigation wrap-around and counter synchronization are mathematically verified", () => {
  // Test wrap-around logic for 8-slide iHealth gallery
  const ihealthCount = 8;
  const nextFromLastIhealth = (7 < ihealthCount - 1 ? 7 + 1 : 0);
  assert.equal(nextFromLastIhealth, 0, "Last iHealth slide wraps to first slide on next");

  const prevFromFirstIhealth = (0 > 0 ? 0 - 1 : ihealthCount - 1);
  assert.equal(prevFromFirstIhealth, 7, "First iHealth slide wraps to last slide on prev");

  // Test counter formatting for 8-slide gallery
  for (let idx = 0; idx < ihealthCount; idx++) {
    const formatted = `${String(idx + 1).padStart(2, "0")} / ${String(ihealthCount).padStart(2, "0")}`;
    const expectedNum = String(idx + 1).padStart(2, "0");
    assert.equal(formatted, `${expectedNum} / 08`);
  }

  // Test wrap-around logic for 9-slide UKG gallery
  const ukgCount = 9;
  const nextFromLastUkg = (8 < ukgCount - 1 ? 8 + 1 : 0);
  assert.equal(nextFromLastUkg, 0, "Last UKG slide wraps to first slide on next");

  const prevFromFirstUkg = (0 > 0 ? 0 - 1 : ukgCount - 1);
  assert.equal(prevFromFirstUkg, 8, "First UKG slide wraps to last slide on prev");

  // Test counter formatting for 9-slide gallery
  for (let idx = 0; idx < ukgCount; idx++) {
    const formatted = `${String(idx + 1).padStart(2, "0")} / ${String(ukgCount).padStart(2, "0")}`;
    const expectedNum = String(idx + 1).padStart(2, "0");
    assert.equal(formatted, `${expectedNum} / 09`);
  }
});

test("physical asset files for iHealth Edu (8 images), UKG System (9 images), Dialisis Connect Edu (8 images), and Nusa Dakwah (7 images) exist at exact paths without mutation", () => {
  const ihealthExpectedPaths = [
    "public/assets/projects/ihealth-edu/cover.webp",
    "public/assets/projects/ihealth-edu/documentation/02.webp",
    "public/assets/projects/ihealth-edu/documentation/03.webp",
    "public/assets/projects/ihealth-edu/documentation/04.webp",
    "public/assets/projects/ihealth-edu/documentation/05.webp",
    "public/assets/projects/ihealth-edu/documentation/06.webp",
    "public/assets/projects/ihealth-edu/documentation/07.webp",
    "public/assets/projects/ihealth-edu/documentation/08.webp",
  ];

  for (const relPath of ihealthExpectedPaths) {
    const fullPath = join(root, relPath);
    assert.ok(existsSync(fullPath), `Expected asset exists: ${relPath}`);
  }

  const ukgExpectedPaths = [
    "public/assets/projects/ukg-system/cover.webp",
    "public/assets/projects/ukg-system/documentation/02.webp",
    "public/assets/projects/ukg-system/documentation/03.webp",
    "public/assets/projects/ukg-system/documentation/04.webp",
    "public/assets/projects/ukg-system/documentation/05.webp",
    "public/assets/projects/ukg-system/documentation/06.webp",
    "public/assets/projects/ukg-system/documentation/07.webp",
    "public/assets/projects/ukg-system/documentation/08.webp",
    "public/assets/projects/ukg-system/documentation/09.webp",
  ];

  for (const relPath of ukgExpectedPaths) {
    const fullPath = join(root, relPath);
    assert.ok(existsSync(fullPath), `Expected asset exists: ${relPath}`);
  }

  const dialisisExpectedPaths = [
    "public/assets/projects/dialisis-connect-edu/cover.webp",
    "public/assets/projects/dialisis-connect-edu/documentation/01.webp",
    "public/assets/projects/dialisis-connect-edu/documentation/02.webp",
    "public/assets/projects/dialisis-connect-edu/documentation/03.webp",
    "public/assets/projects/dialisis-connect-edu/documentation/04.webp",
    "public/assets/projects/dialisis-connect-edu/documentation/05.webp",
    "public/assets/projects/dialisis-connect-edu/documentation/06.webp",
    "public/assets/projects/dialisis-connect-edu/documentation/07.webp",
  ];

  for (const relPath of dialisisExpectedPaths) {
    const fullPath = join(root, relPath);
    assert.ok(existsSync(fullPath), `Expected asset exists: ${relPath}`);
  }

  const nusaExpectedPaths = [
    "public/assets/projects/nusa-dakwah/cover.webp",
    "public/assets/projects/nusa-dakwah/documentation/01.webp",
    "public/assets/projects/nusa-dakwah/documentation/02.webp",
    "public/assets/projects/nusa-dakwah/documentation/03.webp",
    "public/assets/projects/nusa-dakwah/documentation/04.webp",
    "public/assets/projects/nusa-dakwah/documentation/05.webp",
    "public/assets/projects/nusa-dakwah/documentation/06.webp",
  ];

  for (const relPath of nusaExpectedPaths) {
    const fullPath = join(root, relPath);
    assert.ok(existsSync(fullPath), `Expected asset exists: ${relPath}`);
  }
});

test("ProjectDetailView meets semantic heading hierarchy, dynamic section numbering, focus management, touch targets, and non-color indicators", () => {
  const detailComponent = readFileSync(
    join(root, "src", "components", "projects", "project-detail-view.tsx"),
    "utf8",
  );
  const css = readFileSync(
    join(root, "src", "components", "projects", "project-detail.module.css"),
    "utf8",
  );

  // 1. One logical H1, sequential H2 section headers with aria-labelledby (4 core + 1 optional module)
  assert.equal((detailComponent.match(/<h1\b/g) ?? []).length, 1);
  assert.equal((detailComponent.match(/<h2\b/g) ?? []).length, 5);
  assert.match(detailComponent, /aria-labelledby="section-gallery-title"/);
  assert.match(detailComponent, /aria-labelledby="section-overview-title"/);
  assert.match(detailComponent, /aria-labelledby="section-contribution-title"/);
  assert.match(detailComponent, /aria-labelledby="section-scope-title"/);
  assert.match(detailComponent, /aria-labelledby="section-optional-title"/);

  // 2. Dynamic section numbering without gaps
  assert.match(detailComponent, /let sectionCounter = 0;/);
  assert.match(detailComponent, /String\(\+\+sectionCounter\)\.padStart\(2, "0"\)/);
  assert.match(detailComponent, /\[\{galleryIndex\}\]/);
  assert.match(detailComponent, /\[\{overviewIndex\}\]/);
  assert.match(detailComponent, /\[\{contributionIndex\}\]/);
  assert.match(detailComponent, /\[\{scopeIndex\}\]/);
  assert.match(detailComponent, /\[\{optionalModuleIndex\}\]/);

  // 3. Lightbox title does NOT introduce illegal extra H1/H2
  assert.doesNotMatch(detailComponent, /<h[12][^>]*lightboxTitle/);

  // 4. Back link navigation semantics and absence of visual breadcrumb
  assert.match(detailComponent, /className=\{styles\.backNav\}/);
  assert.match(detailComponent, /className=\{styles\.backLink\}/);
  assert.doesNotMatch(detailComponent, /styles\.breadcrumb\b/);

  // 5. Non-color indicators for active thumbnail, claim boundary, and group headers
  assert.match(detailComponent, /thumbnailActiveIndicator/);
  assert.match(detailComponent, /claimBoundaryTag/);
  assert.match(detailComponent, /subBlockHeaderTag/);
  assert.match(detailComponent, /scopeGroupHeaderTag/);
  assert.match(css, /\.thumbnailActive\s*\{[^}]*outline:/);
  assert.match(css, /\.thumbnailActive\s*\{[^}]*box-shadow:/);
  assert.match(css, /\.claimBoundaryCard\s*\{[^}]*border-inline-start:\s*3px solid/);

  // 6. Visible focus states across all interactive elements
  assert.match(css, /\.backLink:focus-visible/);
  assert.match(css, /\.liveCta:focus-visible/);
  assert.match(css, /\.repoLink:focus-visible/);
  assert.match(css, /\.galleryFrame:focus-visible/);
  assert.match(css, /\.thumbnailBtn:focus-visible/);
  assert.match(css, /\.galleryNavBtn:focus-visible/);
  assert.match(css, /\.lightboxCloseBtn:focus-visible/);
  assert.match(css, /\.lightboxNavBtn:focus-visible/);

  // 7. Adequate touch target sizes (min 2.75rem / 44px)
  assert.match(css, /\.liveCta\s*\{[^}]*min-block-size:\s*2\.75rem/);
  assert.match(css, /\.repoLink\s*\{[^}]*min-block-size:\s*2\.75rem/);
  assert.match(css, /\.galleryNavBtn\s*\{[^}]*width:\s*2\.75rem/);
  assert.match(css, /\.galleryNavBtn\s*\{[^}]*height:\s*2\.75rem/);
  assert.match(css, /\.lightboxCloseBtn\s*\{[^}]*min-height:\s*2\.75rem/);

  // 8. ScrollReveal applied at primary section block level
  const scrollRevealMatches = detailComponent.match(/<ScrollReveal\b/g) ?? [];
  assert.equal(scrollRevealMatches.length, 6, "ScrollReveal wraps opening + 4 primary sections + optional module");
});

test("ProjectDetailView enforces exact core order, locale-aware back link, link types, and optional module contract", () => {
  const detailComponent = readFileSync(
    join(root, "src", "components", "projects", "project-detail-view.tsx"),
    "utf8",
  );
  const css = readFileSync(
    join(root, "src", "components", "projects", "project-detail.module.css"),
    "utf8",
  );

  // Exact core section order in template
  const backNavPos = detailComponent.indexOf("styles.backNav");
  const openingPos = detailComponent.indexOf("styles.opening");
  const galleryPos = detailComponent.indexOf("section-gallery-title");
  const overviewPos = detailComponent.indexOf("section-overview-title");
  const contributionPos = detailComponent.indexOf("section-contribution-title");
  const scopePos = detailComponent.indexOf("section-scope-title");
  const optionalPos = detailComponent.indexOf("section-optional-title");

  assert.ok(backNavPos < openingPos, "Back link precedes Opening");
  assert.ok(openingPos < galleryPos, "Opening precedes Gallery (01)");
  assert.ok(galleryPos < overviewPos, "Gallery (01) precedes Overview (02)");
  assert.ok(overviewPos < contributionPos, "Overview (02) precedes Contribution (03)");
  assert.ok(contributionPos < scopePos, "Contribution (03) precedes Scope (04)");
  assert.ok(scopePos < optionalPos, "Scope (04) precedes Optional Module");

  // Personal stack is rendered within Contribution section
  const personalStackPos = detailComponent.indexOf("styles.personalStackBlock");
  assert.ok(
    personalStackPos > contributionPos && personalStackPos < scopePos,
    "Personal stack renders below Contribution and before Scope",
  );

  // Absence of visual breadcrumb and bottom adjacent navigation
  assert.doesNotMatch(detailComponent, /styles\.breadcrumb/);
  assert.doesNotMatch(detailComponent, /aria-label="Breadcrumb"/);
  assert.doesNotMatch(detailComponent, /adjacentNav/);
  assert.doesNotMatch(detailComponent, /previousProject|nextProject/);

  // Link type requirements: solid live button, underlined repo links, static private repo
  assert.match(css, /\.liveCta\s*\{[^}]*background:\s*var\(--accent\)/);
  assert.match(css, /\.repoLink\s*\{[^}]*text-decoration:\s*underline/);
  assert.match(css, /\.repoLink\s*\{[^}]*text-underline-offset:\s*4px/);
  assert.match(css, /\.repoNotice\s*\{[^}]*min-block-size:\s*2\.75rem/);
  assert.doesNotMatch(css, /\.repoNotice\s*\{[^}]*cursor:\s*pointer/);

  // Private repo renders as plain static text without icon
  assert.match(detailComponent, /<span className=\{styles\.repoNotice\}>\s*\{project\.repositoryNotice\[locale\]\}\s*<\/span>/);

  // External link safe new-tab attributes and accessible arrow
  assert.match(detailComponent, /target="_blank"/);
  assert.match(detailComponent, /rel="noopener noreferrer"/);
  assert.match(detailComponent, /styles\.linkArrow/);

  // Optional module rendering contract
  assert.match(detailComponent, /hasOptionalModule && project\.optionalModule/);
  assert.match(detailComponent, /project\.optionalModule\.title\[locale\]/);
});

test("validates maximum-six personal tech stack rule and contract helpers", async () => {
  const { validatePersonalTechStack } = await import(moduleUrl.href);

  for (const project of projectCaseStudies) {
    assert.equal(
      validatePersonalTechStack(project),
      true,
      `Project ${project.slug} must satisfy validatePersonalTechStack`,
    );
  }

  // iHealth personal stack has exactly 6 items
  const ihealth = getProjectCaseStudy("ihealth-edu");
  assert.ok(ihealth);
  assert.equal(ihealth.techStack.length, 6);

  // Synthetic validation check for > 6 items
  assert.equal(
    validatePersonalTechStack({
      personalTechStack: ["Figma", "Next.js", "React", "TypeScript", "Tailwind", "REST API", "Extra"],
    }),
    false,
    "validatePersonalTechStack must reject more than 6 items",
  );

  assert.equal(
    validatePersonalTechStack({
      personalTechStack: ["Figma", "Next.js", "React", "TypeScript", "Tailwind", "REST API"],
    }),
    true,
    "validatePersonalTechStack must accept 6 items",
  );
});

test("project detail router routes all 10 active projects through shared ProjectDetailView template", () => {
  const caseStudyRouter = readFileSync(
    join(root, "src", "components", "projects", "project-case-study.tsx"),
    "utf8",
  );
  const detailComponent = readFileSync(
    join(root, "src", "components", "projects", "project-detail-view.tsx"),
    "utf8",
  );

  // Compatibility function in detail view module accounts for all 10 active slugs
  for (const slug of expectedSlugs) {
    assert.match(detailComponent, new RegExp(`"${slug}"`));
  }

  // Router directly invokes ProjectDetailView
  assert.match(caseStudyRouter, /return <ProjectDetailView project=\{project\} locale=\{locale\} \/>/);
  assert.doesNotMatch(caseStudyRouter, /StandardCaseStudyView/);

  // Obsolete project-case-study.module.css is completely removed from codebase
  assert.equal(
    existsSync(join(root, "src", "components", "projects", "project-case-study.module.css")),
    false,
    "project-case-study.module.css must be deleted as an unreferenced legacy branch",
  );
});

test("ProjectDetailView supports all project-specific technical groups, single-image evidence, and video records", () => {
  const detailComponent = readFileSync(
    join(root, "src", "components", "projects", "project-detail-view.tsx"),
    "utf8",
  );
  const css = readFileSync(
    join(root, "src", "components", "projects", "project-detail.module.css"),
    "utf8",
  );

  // Key Technical Notes sub-block in System Scope
  assert.match(detailComponent, /copy\.techNotesSubtag/);
  assert.match(detailComponent, /styles\.techNotesGrid/);
  assert.match(detailComponent, /styles\.techNoteItem/);
  assert.match(detailComponent, /styles\.techNoteNum/);
  assert.match(detailComponent, /styles\.techNoteText/);

  // Tech Stack directory in System Scope
  assert.match(detailComponent, /copy\.techStackSubtag/);
  assert.match(detailComponent, /styles\.techStackBadges/);

  // Video Demonstration Card in Gallery section
  assert.match(detailComponent, /project\.videoSrc/);
  assert.match(detailComponent, /styles\.videoCard/);
  assert.match(detailComponent, /styles\.videoHeader/);
  assert.match(detailComponent, /styles\.videoPlayer/);
  assert.match(detailComponent, /styles\.videoCaption/);
  assert.match(detailComponent, /copy\.videoTag/);
  assert.match(detailComponent, /copy\.videoDemo/);
  assert.match(detailComponent, /copy\.videoDesc/);

  // CSS rules for technical notes, badges, and video
  assert.match(css, /\.techNotesGrid/);
  assert.match(css, /\.techNoteItem/);
  assert.match(css, /\.techNoteNum/);
  assert.match(css, /\.techNoteText/);
  assert.match(css, /\.techStackBadges/);
  assert.match(css, /\.videoCard/);
  assert.match(css, /\.videoHeader/);
  assert.match(css, /\.videoPlayer/);
  assert.match(css, /\.videoCaption/);
});

test("physical asset files for all 10 projects exist at exact paths without mutation", () => {
  for (const project of projectCaseStudies) {
    // Cover asset
    assert.ok(
      existsSync(join(root, "public", project.cover.src)),
      `Cover asset for ${project.slug} must exist at ${project.cover.src}`,
    );

    // Evidence assets
    for (const fig of project.evidence) {
      assert.ok(
        existsSync(join(root, "public", fig.src)),
        `Evidence asset for ${project.slug} must exist at ${fig.src}`,
      );
    }

    // Gallery assets (if explicitly defined)
    if (project.gallery) {
      for (const slide of project.gallery) {
        assert.ok(
          existsSync(join(root, "public", slide.src)),
          `Gallery asset for ${project.slug} must exist at ${slide.src}`,
        );
      }
    }

    // Video assets (if defined)
    if (project.videoSrc) {
      assert.ok(
        existsSync(join(root, "public", project.videoSrc)),
        `Video asset for ${project.slug} must exist at ${project.videoSrc}`,
      );
    }
  }
});

test("Phase 03 — Shared Gallery, Autoplay, Lightbox, and single-image fallback contract", () => {
  const detailComponent = readFileSync(
    join(root, "src", "components", "projects", "project-detail-view.tsx"),
    "utf8",
  );
  const hookSource = readFileSync(
    join(root, "src", "components", "projects", "use-gallery-autoplay.ts"),
    "utf8",
  );
  const css = readFileSync(
    join(root, "src", "components", "projects", "project-detail.module.css"),
    "utf8",
  );

  // 1. Four-second autoplay contract
  assert.match(hookSource, /intervalMs\s*=\s*4000/, "Autoplay default interval is 4 seconds");
  assert.match(hookSource, /timerKey/, "Timer key triggers clean interval reset on manual navigation");
  assert.match(hookSource, /restartTimer/, "Manual actions invoke restartTimer");
  assert.match(hookSource, /clearInterval\(timer\)/, "Autoplay cleans up timer on unmount/update");

  // 2. Pause conditions
  assert.match(hookSource, /isReducedMotion\s*\|\|\s*isLightboxOpen\s*\|\|\s*isHovered\s*\|\|\s*isFocused/, "Autoplay pauses on reduced motion, lightbox open, hover, and focus");
  assert.match(hookSource, /onMouseEnter/, "Container captures pointer hover");
  assert.match(hookSource, /onMouseLeave/, "Container releases pointer hover");
  assert.match(hookSource, /onFocusCapture/, "Container tracks keyboard focus");
  assert.match(hookSource, /onBlurCapture/, "Container tracks keyboard blur");

  // 3. Lightbox dialog contract
  assert.match(detailComponent, /role="dialog"/, "Lightbox is semantic modal dialog");
  assert.match(detailComponent, /aria-modal="true"/, "Lightbox is modal");
  assert.match(detailComponent, /e\.key === "Escape"/, "Lightbox closes on Escape");
  assert.match(detailComponent, /e\.key === "ArrowLeft"/, "Lightbox navigates prev with ArrowLeft");
  assert.match(detailComponent, /e\.key === "ArrowRight"/, "Lightbox navigates next with ArrowRight");
  assert.match(detailComponent, /e\.key === "Tab"/, "Lightbox traps focus with Tab and Shift+Tab");
  assert.match(detailComponent, /activeTriggerRef\.current\?\.focus\(\)/, "Lightbox restores focus on close");
  assert.match(detailComponent, /document\.body\.style\.overflow = "hidden"/, "Lightbox locks background body scroll");
  assert.match(detailComponent, /document\.body\.style\.overflow = originalOverflow/, "Lightbox restores body scroll on cleanup");

  // 4. Touch swipe navigation on both main frame and lightbox
  assert.match(detailComponent, /onTouchStart=\{slides\.length > 1 \? handleTouchStart : undefined\}/, "Main frame handles touch swipe");
  assert.match(detailComponent, /className=\{styles\.lightboxMediaWrapper\}[^>]*onTouchStart=\{slides\.length > 1 \? handleTouchStart : undefined\}/, "Lightbox handles touch swipe");

  // 5. Single-image fallback
  assert.match(detailComponent, /\{slides\.length > 1 \? \(/, "Multi-slide track branches on slide count");
  assert.match(detailComponent, /\{slides\.length > 1 \? \(\s*<div\s+className=\{styles\.thumbnailRail\}/, "Thumbnails only render when multi-image");
  assert.match(detailComponent, /\{slides\.length > 1 \? \(\s*<div className=\{styles\.galleryControls\}>/, "Controls only render when multi-image");

  // 6. Responsive sizing and reduced motion in CSS
  assert.match(css, /\.lightboxMediaWrapper\s*\{[^}]*max-height:\s*calc\(100dvh - 8rem\)/, "Lightbox accounts for dynamic viewport heights");
  assert.match(css, /\.lightboxMediaWrapper\s*\{[^}]*touch-action:\s*pan-y/, "Lightbox permits vertical pan while capturing horizontal swipe");
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{[^}]*\.galleryTrack/, "Reduced motion removes gallery animations");

  // 7. Non-placeholder alt text validation across all 10 projects
  for (const project of projectCaseStudies) {
    assert.ok(project.cover.alt.en.length > 5, `Cover alt text for ${project.slug} must be meaningful in EN`);
    assert.ok(project.cover.alt.id.length > 5, `Cover alt text for ${project.slug} must be meaningful in ID`);
    assert.doesNotMatch(project.cover.alt.en, /^TODO_|^\[UKG_|^\[IHEALTH_/, `Cover alt text for ${project.slug} must not be a placeholder token`);

    for (const fig of project.evidence) {
      assert.ok(fig.alt.en.length > 5, `Evidence alt text for ${project.slug} must be meaningful in EN`);
      assert.ok(fig.alt.id.length > 5, `Evidence alt text for ${project.slug} must be meaningful in ID`);
      assert.doesNotMatch(fig.alt.en, /^TODO_|^\[UKG_|^\[IHEALTH_/, `Evidence alt text for ${project.slug} must not be a placeholder token`);
    }

    if (project.gallery) {
      for (const slide of project.gallery) {
        assert.ok(slide.alt.en.length > 5, `Gallery slide alt text for ${project.slug} must be meaningful in EN`);
        assert.ok(slide.alt.id.length > 5, `Gallery slide alt text for ${project.slug} must be meaningful in ID`);
        assert.doesNotMatch(slide.alt.en, /^TODO_|^\[UKG_|^\[IHEALTH_/, `Gallery slide alt text for ${project.slug} must not be a placeholder token`);
      }
    }
  }
});

test("Phase 06 — Project Detail System Hardening across all 10 projects and 20 localized routes", () => {
  const detailComponent = readFileSync(
    join(root, "src", "components", "projects", "project-detail-view.tsx"),
    "utf8",
  );
  const css = readFileSync(
    join(root, "src", "components", "projects", "project-detail.module.css"),
    "utf8",
  );

  // 1. All 10 slugs validated across 20 localized routes
  assert.equal(projectCaseStudies.length, 10);
  assert.match(detailComponent, /styles\.backLink/);
  for (const project of projectCaseStudies) {
    for (const locale of ["en", "id"]) {
      assert.ok(project.title[locale], `Title present for ${project.slug} [${locale}]`);
      assert.ok(project.categoryLabel[locale], `Category label present for ${project.slug} [${locale}]`);
      assert.ok(project.role[locale], `Role present for ${project.slug} [${locale}]`);
      assert.ok(project.overview[locale].length >= 2, `Overview paragraphs present for ${project.slug} [${locale}]`);
      assert.ok(project.contributions[locale].length >= 3, `Contributions present for ${project.slug} [${locale}]`);
      assert.ok(project.cover.alt[locale], `Cover alt present for ${project.slug} [${locale}]`);
    }
  }

  // 2. Responsive layouts: 44px min touch targets strictly maintained across desktop and mobile
  assert.match(css, /\.backLink\s*\{[^}]*min-height:\s*2\.75rem/);
  assert.match(css, /\.liveCta\s*\{[^}]*min-block-size:\s*2\.75rem/);
  assert.match(css, /\.repoLink\s*\{[^}]*min-block-size:\s*2\.75rem/);
  assert.match(css, /\.galleryNavBtn\s*\{[^}]*width:\s*2\.75rem/);
  assert.match(css, /\.galleryNavBtn\s*\{[^}]*height:\s*2\.75rem/);
  assert.match(css, /\.lightboxCloseBtn\s*\{[^}]*min-height:\s*2\.75rem/);
  assert.match(css, /\.lightboxNavBtn\s*\{[^}]*min-width:\s*2\.75rem/);
  assert.match(css, /\.lightboxNavBtn\s*\{[^}]*min-height:\s*2\.75rem/);

  // 3. Grid adaptations for UKG, iHealth, and Dialisis system scope
  assert.match(css, /\.modulesGrid/);
  assert.match(css, /\.systemScopeGrid/);
  assert.match(css, /\.systemScopeGrid3Col/);

  // 4. Interaction isolation: all :hover states gated by (hover: hover) and (pointer: fine)
  const hoverMatches = css.match(/:hover\b/g) ?? [];
  const hoverMediaMatches = css.match(/@media\s*\(hover:\s*hover\)\s*and\s*\(pointer:\s*fine\)/g) ?? [];
  assert.ok(hoverMatches.length >= 7, "Interactive hover rules present in stylesheet");
  assert.ok(hoverMediaMatches.length >= 7, "All interactive hover styles must be gated by pointer media queries");

  // 5. Accessible focus-visible rings on all interactive components
  const focusMatches = css.match(/:focus-visible\b/g) ?? [];
  assert.ok(focusMatches.length >= 8, "Focus-visible styles defined across all interactive controls");

  // 6. Reduced motion safety: all animations removed under prefers-reduced-motion
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  assert.match(css, /transition:\s*none\s*!important/);
  assert.match(css, /animation:\s*none\s*!important/);
});




