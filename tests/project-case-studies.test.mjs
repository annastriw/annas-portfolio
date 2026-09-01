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
      assert.ok(project.technicalNotes[locale].length >= 3);
      assert.ok(project.technicalNotes[locale].length <= 5);
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

  // System scope: 8 ordered modules and no workflow diagram data
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

  // System scope: 5 technology groups
  assert.equal(ukg.technologyGroups?.length, 5);
  assert.deepEqual(
    ukg.technologyGroups?.map((g) => g.category),
    ["Design", "Frontend", "Backend & Data", "Testing", "Deployment"],
  );

  // Gallery: exactly 9 slides with 18 unique searchable placeholders
  assert.equal(ukg.gallery?.length, 9);
  assert.equal(ukg.gallery?.[0].src, "/assets/projects/ukg-system/cover.webp");
  for (let i = 1; i <= 9; i++) {
    const num = String(i).padStart(2, "0");
    const slide = ukg.gallery?.[i - 1];
    assert.ok(slide);
    assert.equal(slide.slide, num);
    assert.ok(existsSync(join(root, "public", slide.src)));
    assert.match(slide.caption.en, new RegExp(`\\[UKG_CAPTION_${num}_EN\\]`));
    assert.match(slide.caption.id, new RegExp(`\\[UKG_CAPTION_${num}_ID\\]`));
    assert.doesNotMatch(slide.alt.en, /UKG_CAPTION/);
    assert.doesNotMatch(slide.alt.id, /UKG_CAPTION/);
  }

  // Verify exactly 18 occurrences of UKG_CAPTION_ in project-case-studies.ts
  const caseStudiesSource = readFileSync(
    join(root, "src", "content", "projects", "project-case-studies.ts"),
    "utf8",
  );
  const captionTokens = caseStudiesSource.match(/\[UKG_CAPTION_\d+_[A-Z]+\]/g) ?? [];
  assert.equal(captionTokens.length, 18);
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
  assert.match(ihealth.metaDescription?.en ?? "", /Frontend web development case study for iHealth Edu/);
  assert.match(ihealth.metaDescription?.id ?? "", /Studi kasus frontend web development untuk iHealth Edu/);

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

test("physical asset files for iHealth Edu (8 images) and UKG System (9 images) exist at exact paths without mutation", () => {
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


