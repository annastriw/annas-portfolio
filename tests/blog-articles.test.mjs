import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const moduleUrl = new URL("../src/content/blog/index.ts", import.meta.url);

const {
  blogArticles,
  calculateArticleReadingTime,
  getAdjacentBlogArticles,
  getBlogArticle,
  getLocalizedArticleText,
} = await import(moduleUrl.href);

const expectedSlugs = [
  "building-a-multi-branch-erp-from-workflow-to-production",
  "integrating-machine-learning-into-a-web-application",
  "from-android-print-framework-to-esc-pos",
  "building-a-practical-speech-to-text-pipeline",
];

test("publishes exactly four source-grounded bilingual articles in editorial order in data layer", () => {
  assert.equal(blogArticles.length, 4);
  assert.deepEqual(
    blogArticles.map((article) => article.slug),
    expectedSlugs,
  );
  assert.deepEqual(
    blogArticles.map((article) => article.index),
    ["01", "02", "03", "04"],
  );

  for (const article of blogArticles) {
    assert.equal("date" in article, false);
    assert.equal("publishedDate" in article, false);
    assert.ok(article.tags.length >= 3);
    assert.ok(article.sections.length >= 3);
    assert.ok(article.sourceProjectSlugs.length >= 1);

    for (const sourceSlug of article.sourceProjectSlugs) {
      assert.ok(
        existsSync(join(root, "content", "projects", `${sourceSlug}.md`)),
        `Missing source record for ${sourceSlug}`,
      );
    }

    for (const locale of ["en", "id"]) {
      assert.ok(article.title[locale].trim());
      assert.ok(article.abstract[locale].trim());
      assert.ok(getLocalizedArticleText(article, locale).split(/\s+/).length >= 250);
      assert.match(calculateArticleReadingTime(article, locale), /^\d+ /);
    }
  }
});

test("keeps critical project facts and claim boundaries explicit in preserved source files", () => {
  const stringify = (slug) => JSON.stringify(getBlogArticle(slug));

  const ukg = stringify(expectedSlugs[0]);
  assert.match(ukg, /CV Universal Kharisma Globalindo/);
  assert.match(ukg, /January[^\"]*March 2026|Januari[^\"]*Maret 2026/);
  assert.match(ukg, /multi-branch|multi-cabang/i);
  assert.match(ukg, /Katalon Studio/);

  const health = stringify(expectedSlugs[1]);
  assert.match(health, /158[.,]355/);
  assert.match(health, /0[.,]8015/);
  assert.match(health, /not a clinical diagnosis|bukan diagnosis klinis/i);

  const printer = stringify(expectedSlugs[2]);
  assert.match(printer, /432 dots/);
  assert.match(printer, /576 dots/);
  assert.match(printer, /1[.,]024 bytes/);
  assert.doesNotMatch(printer, /WebSocket|SQLite|daemon|universal/i);

  const speech = stringify(expectedSlugs[3]);
  assert.match(speech, /facebook\/wav2vec2-base-960h/);
  assert.match(speech, /16 kHz/);
  assert.match(speech, /TXT/);
  assert.match(speech, /SRT/);
  assert.match(
    speech,
    /does not include model fine-tuning|tidak mencakup fine-tuning model/i,
  );
  assert.match(speech, /does not include a benchmark|tidak mencakup benchmark/i);
  assert.doesNotMatch(
    speech,
    /(?:achieved|reached|mencapai)[^\"]{0,60}(?:\bWER\b|accuracy|akurasi)/i,
  );
});

test("uses real localized figures and varied article structures in preserved source files", () => {
  const structureSignatures = new Set();

  for (const article of blogArticles) {
    const figures = article.sections.flatMap((section) =>
      section.blocks.filter((block) => block.type === "figure"),
    );

    assert.ok(figures.length >= 1);
    for (const figure of figures) {
      assert.ok(existsSync(join(root, "public", figure.src)));
      assert.ok(figure.alt.en && figure.alt.id);
      assert.ok(figure.caption.en && figure.caption.id);
    }

    structureSignatures.add(
      article.sections
        .flatMap((section) => section.blocks.map((block) => block.type))
        .join(","),
    );
  }

  assert.equal(structureSignatures.size, blogArticles.length);
});

test("resolves every slug and unknown-slug handling in article lookup", () => {
  for (const slug of expectedSlugs) {
    assert.equal(getBlogArticle(slug)?.slug, slug);
  }
  assert.equal(getBlogArticle("missing"), null);
  assert.equal(getBlogArticle("arbitrary-unknown-slug"), null);

  const first = getAdjacentBlogArticles(expectedSlugs[0]);
  assert.equal(first.previous, null);
  assert.equal(first.next?.slug, expectedSlugs[1]);

  const last = getAdjacentBlogArticles(expectedSlugs.at(-1));
  assert.equal(last.previous?.slug, expectedSlugs.at(-2));
  assert.equal(last.next, null);
});

test("contains no visible em dash or en dash copy in preserved articles", () => {
  for (const article of blogArticles) {
    assert.doesNotMatch(JSON.stringify(article), /[—–]/);
  }
});

test("BlogPlaceholderView implements approved bilingual copy, Projects Hub alignment, and absence of article entries", () => {
  const placeholderCode = readFileSync(
    join(root, "src", "components", "blog", "blog-placeholder-view.tsx"),
    "utf8",
  );

  // Exact section index
  assert.ok(placeholderCode.includes("[04 // BLOG]"));

  // Exact H1 bilingual titles
  assert.ok(placeholderCode.includes("Blog Archive"));
  assert.ok(placeholderCode.includes("Arsip Blog"));

  // Exact Under Construction notice headings
  assert.ok(placeholderCode.includes("Under Construction"));
  assert.ok(placeholderCode.includes("Sedang Disiapkan"));

  // Exact Under Construction notice paragraphs
  assert.ok(
    placeholderCode.includes(
      "This blog is being prepared. Articles will be available here once they’re ready.",
    ),
  );
  assert.ok(
    placeholderCode.includes(
      "Blog ini sedang disiapkan. Artikel akan tersedia di sini setelah siap dipublikasikan.",
    ),
  );

  // Exact localized Back to Blog link
  assert.ok(placeholderCode.includes("← Back to Blog") || placeholderCode.includes("Back to Blog"));
  assert.ok(placeholderCode.includes("← Kembali ke Blog") || placeholderCode.includes("Kembali ke Blog"));
  assert.ok(placeholderCode.includes("/${locale}/blog"));

  // Projects Hub container & typography alignment
  assert.ok(placeholderCode.includes("max-w-7xl"));
  assert.ok(placeholderCode.includes("font-serif"));
  assert.ok(placeholderCode.includes("clamp(2.5rem,5.5vw,5rem)"));
  assert.ok(placeholderCode.includes("animate-editorial-fade"));

  // Absence of old article rows, filters, counters, thumbnails, or reading times in placeholder
  assert.doesNotMatch(placeholderCode, /4 ARTICLES|4 ARTIKEL|Curated Article Index|Indeks Artikel Terpilih/i);
  assert.doesNotMatch(placeholderCode, /calculateArticleReadingTime|blogArticles|sourceProjectSlugs/i);
});

test("Blog Hub and Article detail routes route to placeholder view without emitting old article bodies or ItemList/Article schema", () => {
  const hubRoute = readFileSync(
    join(root, "src", "app", "[locale]", "blog", "page.tsx"),
    "utf8",
  );
  const detailRoute = readFileSync(
    join(root, "src", "app", "[locale]", "blog", "[slug]", "page.tsx"),
    "utf8",
  );

  // Both routes use BlogPlaceholderView
  assert.ok(hubRoute.includes("BlogPlaceholderView"));
  assert.ok(detailRoute.includes("BlogPlaceholderView"));

  // Hub does not render back link
  assert.ok(hubRoute.includes("isArticle={false}"));

  // Detail route renders back link
  assert.ok(detailRoute.includes("isArticle={true}"));

  // Detail route validates known slugs
  assert.ok(detailRoute.includes("getBlogArticle(slug)"));
  assert.ok(detailRoute.includes("notFound()"));

  // Old renderer and schema generators are NOT imported or emitted in routes
  assert.doesNotMatch(hubRoute, /generateCollectionPageJsonLd|generateItemListJsonLd|BlogHero|BlogArchive/);
  assert.doesNotMatch(detailRoute, /generateBlogPostingJsonLd|BlogArticleHeader|BlogArticleBody|BlogAdjacentNav/);
});

test("removes the Blog Markdown runtime after all public consumers migrate", () => {
  const hubRoute = readFileSync(
    join(root, "src", "app", "[locale]", "blog", "page.tsx"),
    "utf8",
  );
  const detailRoute = readFileSync(
    join(root, "src", "app", "[locale]", "blog", "[slug]", "page.tsx"),
    "utf8",
  );
  const packageJson = readFileSync(join(root, "package.json"), "utf8");

  assert.doesNotMatch(hubRoute + detailRoute, /react-markdown|gray-matter|@\/lib\/blog/);
  assert.doesNotMatch(packageJson, /react-markdown/);
  assert.equal(existsSync(join(root, "content", "blog")), false);
  assert.equal(existsSync(join(root, "src", "lib", "blog")), false);
  assert.equal(
    existsSync(join(root, "src", "components", "markdown", "markdown-renderer.tsx")),
    false,
  );
});
