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
    [["ukg-system", "https://ukgsystem.site/"]],
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

  // System scope: 8 ordered modules
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

  // System scope: workflow diagram text
  assert.deepEqual(ukg.workflow?.en, [
    "Sale recorded → Stock decreases.",
    "Sale cancelled → Stock restored.",
  ]);
  assert.deepEqual(ukg.workflow?.id, [
    "Transaksi penjualan → Stok berkurang.",
    "Transaksi dibatalkan → Stok dikembalikan.",
  ]);

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

test("keeps the project-specific factual boundaries explicit", () => {
  const stringify = (slug) => JSON.stringify(getProjectCaseStudy(slug));

  assert.match(stringify("ihealth-edu"), /not a clinical diagnosis|bukan diagnosis klinis/i);
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

test("UkgCaseStudyView implements approved compact editorial layout and 9-slide carousel", () => {
  const ukgComponent = readFileSync(
    join(root, "src", "components", "projects", "ukg-case-study.tsx"),
    "utf8",
  );

  // 1. Opening: Breadcrumb, H1, Lead, Metadata, Actions
  assert.match(ukgComponent, /copy\.breadcrumbProjects/);
  assert.match(ukgComponent, /project\.categoryLabel\[locale\]/);
  assert.match(ukgComponent, /<h1 className=\{styles\.title\}>\{project\.title\[locale\]\}<\/h1>/);
  assert.match(ukgComponent, /styles\.lead/);
  assert.match(ukgComponent, /styles\.metaGrid/);
  assert.match(ukgComponent, /project\.client/);
  assert.match(ukgComponent, /project\.role/);
  assert.match(ukgComponent, /project\.period/);
  assert.match(ukgComponent, /project\.status/);
  assert.match(ukgComponent, /styles\.liveCta/);
  assert.match(ukgComponent, /styles\.repoNotice/);

  // 2. Section 01: Top-of-page 9-Slide Gallery Carousel
  assert.match(ukgComponent, /\[01\]/);
  assert.match(ukgComponent, /ukg-section-01-title/);
  assert.match(ukgComponent, /copy\.galleryTitle/);
  assert.match(ukgComponent, /role="region"/);
  assert.match(ukgComponent, /aria-roledescription="carousel"/);
  assert.match(ukgComponent, /styles\.galleryFrame/);
  assert.match(ukgComponent, /handlePrevSlide/);
  assert.match(ukgComponent, /handleNextSlide/);
  assert.match(ukgComponent, /handleTouchStart/);
  assert.match(ukgComponent, /handleTouchMove/);
  assert.match(ukgComponent, /handleTouchEnd/);
  assert.match(ukgComponent, /handleCarouselKeyDown/);
  assert.match(ukgComponent, /styles\.galleryBottomBar/);
  assert.match(ukgComponent, /styles\.galleryCaption/);
  assert.match(ukgComponent, /styles\.galleryControls/);
  assert.match(ukgComponent, /styles\.galleryCounter/);
  assert.match(ukgComponent, /styles\.galleryNavBtn/);

  // Synchronized Lightbox Inspection Dialog
  assert.match(ukgComponent, /styles\.lightboxOverlay/);
  assert.match(ukgComponent, /styles\.lightboxNavBtn/);
  assert.match(ukgComponent, /styles\.lightboxCounter/);
  assert.match(ukgComponent, /handleCloseLightbox/);

  // 3. Section 02: Project Overview / Ringkasan Project
  assert.match(ukgComponent, /\[02\]/);
  assert.match(ukgComponent, /ukg-section-02-title/);
  assert.match(ukgComponent, /copy\.overviewTitle/);
  assert.match(ukgComponent, /styles\.overviewGrid/);

  // 4. Section 03: My Contribution / Kontribusi Saya
  assert.match(ukgComponent, /\[03\]/);
  assert.match(ukgComponent, /ukg-section-03-title/);
  assert.match(ukgComponent, /copy\.contributionTitle/);
  assert.match(ukgComponent, /styles\.contributionList/);
  assert.match(ukgComponent, /styles\.contributionLearning/);

  // 5. Section 04: System Scope / Cakupan Sistem
  assert.match(ukgComponent, /\[04\]/);
  assert.match(ukgComponent, /ukg-section-04-title/);
  assert.match(ukgComponent, /copy\.scopeTitle/);
  assert.match(ukgComponent, /styles\.modulesGrid/);
  assert.match(ukgComponent, /styles\.workflowContainer/);
  assert.match(ukgComponent, /styles\.techGroupsList/);

  // Exclusions for UKG: No bottom adjacent nav, no standalone hero cover, no extra long-form sections
  assert.doesNotMatch(ukgComponent, /adjacentNav/);
  assert.doesNotMatch(ukgComponent, /coverFigure/);
  assert.doesNotMatch(ukgComponent, /claimBoundary/);
  assert.doesNotMatch(ukgComponent, /videoEvidenceCard/);
});

test("ukg-case-study.module.css defines responsive grid, carousel, metadata, workflow, and reduced motion", () => {
  const css = readFileSync(
    join(root, "src", "components", "projects", "ukg-case-study.module.css"),
    "utf8",
  );

  // Check key responsive, carousel, and layout rules
  assert.match(css, /\.galleryFrame\s*\{[^}]*touch-action:\s*pan-y/);
  assert.match(css, /\.galleryImage\s*\{[^}]*object-fit:\s*contain/);
  assert.match(css, /\.galleryBottomBar/);
  assert.match(css, /\.galleryCaption/);
  assert.match(css, /\.galleryControls/);
  assert.match(css, /\.galleryCounter/);
  assert.match(css, /\.galleryNavBtn/);
  assert.match(css, /\.lightboxNavBtn/);
  assert.match(css, /\.lightboxCounter/);
  assert.match(css, /\.metaGrid\s*\{[^}]*grid-template-columns:\s*repeat\(4,\s*minmax\(0,\s*1fr\)\)/);
  assert.match(css, /\.overviewGrid\s*\{[^}]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/);
  assert.match(css, /\.modulesGrid\s*\{[^}]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/);
  assert.match(css, /\.workflowContainer/);
  assert.match(css, /\.workflowArrow/);
  assert.match(css, /\.techGroupsList/);
  assert.match(css, /@media\s*\(max-width:\s*1023px\)/);
  assert.match(css, /@media\s*\(max-width:\s*639px\)/);
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
});

