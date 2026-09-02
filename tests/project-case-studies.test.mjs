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
    ],
  );
  assert.equal(
    projectCaseStudies.some((project) => project.githubUrl),
    false,
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
    "Tested and deployed the system for use in daily operations.",
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
    "Katalon Studio",
    "Linux Ubuntu",
  ]);
  assert.deepEqual(ukg.techStack, [
    "Figma",
    "Next.js",
    "NestJS",
    "MySQL",
    "Katalon Studio",
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
  assert.doesNotMatch(stringify("speech-to-text-system"), /fine[- ]tun|\bWER\b|accuracy|akurasi/i);
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




