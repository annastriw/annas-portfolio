import assert from "node:assert/strict";
import test from "node:test";
import { projectCaseStudies } from "../src/content/projects/project-case-studies.ts";
import { blogArticles } from "../src/content/blog/index.ts";
import {
  SITE_URL,
  DEFAULT_AUTHOR,
  createPageMetadata,
  generatePersonJsonLd,
  generateWebSiteJsonLd,
  generateProfilePageJsonLd,
  generateContactPageJsonLd,
  generateCollectionPageJsonLd,
  generateItemListJsonLd,
  generateProjectJsonLd,
  generateBlogPostingJsonLd,
} from "../src/lib/seo/index.ts";
import sitemap from "../src/app/sitemap.ts";
import robots from "../src/app/robots.ts";
import manifest from "../src/app/manifest.ts";

test("SITE_URL and DEFAULT_AUTHOR constants are properly defined", () => {
  assert.equal(SITE_URL, "https://annastriwidagdo.me");
  assert.equal(DEFAULT_AUTHOR, "Annas Tri Widagdo");
});

test("createPageMetadata generates valid bilingual canonical, hreflang, OpenGraph, and Twitter tags", () => {
  const enMeta = createPageMetadata({
    locale: "en",
    path: "about",
    title: "About & Engineering Profile - Annas Tri Widagdo",
    description: "Software engineering profile of Annas Tri Widagdo.",
    type: "profile",
  });

  assert.equal(enMeta.title, "About & Engineering Profile - Annas Tri Widagdo");
  assert.equal(enMeta.description, "Software engineering profile of Annas Tri Widagdo.");
  assert.equal(enMeta.alternates?.canonical, "https://annastriwidagdo.me/en/about");
  assert.deepEqual(enMeta.alternates?.languages, {
    en: "https://annastriwidagdo.me/en/about",
    id: "https://annastriwidagdo.me/id/about",
    "x-default": "https://annastriwidagdo.me/en/about",
  });
  assert.equal(enMeta.openGraph?.locale, "en_US");
  assert.deepEqual(enMeta.openGraph?.alternateLocale, ["id_ID"]);
  assert.equal(enMeta.openGraph?.type, "profile");
  assert.equal(enMeta.openGraph?.siteName, "Annas Tri Widagdo Portfolio");
  assert.equal(enMeta.twitter?.card, "summary_large_image");
  assert.ok(Array.isArray(enMeta.openGraph?.images));
  assert.ok(Array.isArray(enMeta.twitter?.images));

  const idMeta = createPageMetadata({
    locale: "id",
    path: "about",
    title: "Tentang & Profil Rekayasa - Annas Tri Widagdo",
    description: "Profil rekayasa perangkat lunak Annas Tri Widagdo.",
    type: "profile",
  });

  assert.equal(idMeta.alternates?.canonical, "https://annastriwidagdo.me/id/about");
  assert.deepEqual(idMeta.alternates?.languages, {
    en: "https://annastriwidagdo.me/en/about",
    id: "https://annastriwidagdo.me/id/about",
    "x-default": "https://annastriwidagdo.me/en/about",
  });
  assert.equal(idMeta.openGraph?.locale, "id_ID");
  assert.deepEqual(idMeta.openGraph?.alternateLocale, ["en_US"]);
});

test("sitemap includes all 38 public localized URLs with x-default alternates and lastModified", () => {
  const entries = sitemap();

  // 2 home + 2 about + 2 contact + 2 projects + 20 project details + 2 blog hub + 8 blog details = 38
  assert.equal(entries.length, 38);

  const urls = entries.map((e) => e.url);

  // Home
  assert.ok(urls.includes("https://annastriwidagdo.me/en"));
  assert.ok(urls.includes("https://annastriwidagdo.me/id"));

  // About
  assert.ok(urls.includes("https://annastriwidagdo.me/en/about"));
  assert.ok(urls.includes("https://annastriwidagdo.me/id/about"));

  // Contact
  assert.ok(urls.includes("https://annastriwidagdo.me/en/contact"));
  assert.ok(urls.includes("https://annastriwidagdo.me/id/contact"));

  // Projects Hub
  assert.ok(urls.includes("https://annastriwidagdo.me/en/projects"));
  assert.ok(urls.includes("https://annastriwidagdo.me/id/projects"));

  // All 10 project details in both locales
  for (const project of projectCaseStudies) {
    assert.ok(urls.includes(`https://annastriwidagdo.me/en/projects/${project.slug}`));
    assert.ok(urls.includes(`https://annastriwidagdo.me/id/projects/${project.slug}`));
  }

  // Blog Hub
  assert.ok(urls.includes("https://annastriwidagdo.me/en/blog"));
  assert.ok(urls.includes("https://annastriwidagdo.me/id/blog"));

  // All 4 blog articles in both locales
  for (const article of blogArticles) {
    assert.ok(urls.includes(`https://annastriwidagdo.me/en/blog/${article.slug}`));
    assert.ok(urls.includes(`https://annastriwidagdo.me/id/blog/${article.slug}`));
  }

  // Validate that every single entry has lastModified, changeFrequency, priority, and x-default
  for (const entry of entries) {
    assert.ok(entry.lastModified instanceof Date, `Missing lastModified on ${entry.url}`);
    assert.ok(entry.changeFrequency, `Missing changeFrequency on ${entry.url}`);
    assert.ok(typeof entry.priority === "number", `Missing priority on ${entry.url}`);
    assert.ok(entry.alternates?.languages?.["x-default"], `Missing x-default on ${entry.url}`);
  }
});

test("robots.txt declares valid allow/disallow rules, sitemap and host", () => {
  const robotsConfig = robots();
  assert.equal(robotsConfig.host, "https://annastriwidagdo.me");
  assert.equal(robotsConfig.sitemap, "https://annastriwidagdo.me/sitemap.xml");

  const rules = Array.isArray(robotsConfig.rules) ? robotsConfig.rules[0] : robotsConfig.rules;
  assert.equal(rules.allow, "/");
  assert.deepEqual(rules.disallow, ["/api/"]);
});

test("manifest.webmanifest declares valid PWA properties and start URL", () => {
  const manifestConfig = manifest();
  assert.equal(manifestConfig.name, "Annas Tri Widagdo - Software Engineer");
  assert.equal(manifestConfig.short_name, "Annas Tri Widagdo");
  assert.equal(manifestConfig.start_url, "/en");
  assert.equal(manifestConfig.display, "standalone");
  assert.ok(manifestConfig.icons && manifestConfig.icons.length >= 2);
});

test("generatePersonJsonLd outputs factual credentials without forbidden claims", () => {
  const person = generatePersonJsonLd();
  assert.equal(person["@context"], "https://schema.org");
  assert.equal(person["@type"], "Person");
  assert.equal(person.name, "Annas Tri Widagdo");
  assert.equal(person.url, "https://annastriwidagdo.me");
  assert.equal(person.image, "https://annastriwidagdo.me/assets/profile/pas-foto.webp");
  assert.equal(person.alumniOf?.name, "Diponegoro University");
  assert.match(person.address?.addressLocality ?? "", /Jakarta/);
  assert.equal(person.address?.addressCountry, "Indonesia");
  assert.ok(person.sameAs.includes("https://github.com/annastriw"));
  assert.ok(person.sameAs.includes("https://www.linkedin.com/in/annastriw"));

  const jsonString = JSON.stringify(person);
  assert.doesNotMatch(jsonString, /Best Graduate/i);
  assert.doesNotMatch(jsonString, /Wisudawan Terbaik/i);
  assert.doesNotMatch(jsonString, /AI Practitioner/i);
  assert.doesNotMatch(jsonString, /aggregateRating/i);
  assert.doesNotMatch(jsonString, /review/i);
});

test("generateWebSiteJsonLd and generateProfilePageJsonLd produce valid structured data", () => {
  const website = generateWebSiteJsonLd();
  assert.equal(website["@type"], "WebSite");
  assert.equal(website.url, "https://annastriwidagdo.me");
  assert.deepEqual(website.inLanguage, ["en", "id"]);

  const profileEn = generateProfilePageJsonLd("en");
  assert.equal(profileEn["@type"], "ProfilePage");
  assert.equal(profileEn.url, "https://annastriwidagdo.me/en/about");
  assert.equal(profileEn.mainEntity["@type"], "Person");

  const profileId = generateProfilePageJsonLd("id");
  assert.equal(profileId["@type"], "ProfilePage");
  assert.equal(profileId.url, "https://annastriwidagdo.me/id/about");
});

test("generateContactPageJsonLd produces valid ContactPage schema", () => {
  const contactEn = generateContactPageJsonLd("en");
  assert.equal(contactEn["@type"], "ContactPage");
  assert.equal(contactEn.url, "https://annastriwidagdo.me/en/contact");
  assert.equal(contactEn.mainEntity["@type"], "Person");

  const contactId = generateContactPageJsonLd("id");
  assert.equal(contactId["@type"], "ContactPage");
  assert.equal(contactId.url, "https://annastriwidagdo.me/id/contact");
});

test("generateCollectionPageJsonLd and generateItemListJsonLd produce valid structured data", () => {
  const items = [
    { title: "UKG System", url: "https://annastriwidagdo.me/en/projects/ukg-system" },
  ];
  const itemList = generateItemListJsonLd(
    items,
    "Projects Archive",
    "https://annastriwidagdo.me/en/projects",
  );
  assert.equal(itemList["@type"], "ItemList");
  assert.equal(itemList.numberOfItems, 1);
  assert.equal(itemList.itemListElement[0].name, "UKG System");

  const collection = generateCollectionPageJsonLd(
    items,
    "Projects Archive",
    "https://annastriwidagdo.me/en/projects",
    "Archive of verified projects",
    "en",
  );

  assert.equal(collection["@type"], "CollectionPage");
  assert.equal(collection.mainEntity["@type"], "ItemList");
  assert.equal(collection.mainEntity.numberOfItems, 1);
  assert.equal(collection.mainEntity.itemListElement[0].name, "UKG System");
});

test("generateProjectJsonLd accurately represents project facts and live URLs", () => {
  const ukg = projectCaseStudies.find((p) => p.slug === "ukg-system");
  assert.ok(ukg);
  const ukgSchema = generateProjectJsonLd(ukg, "en");

  assert.equal(ukgSchema["@type"], "SoftwareSourceCode");
  assert.equal(ukgSchema.name, "UKG System");
  assert.equal(ukgSchema.url, "https://annastriwidagdo.me/en/projects/ukg-system");
  assert.equal(ukgSchema.relatedLink, "https://ukgsystem.com");
  assert.ok(ukgSchema.image?.includes("/assets/projects/ukg-system/cover.webp"));

  const ihealth = projectCaseStudies.find((p) => p.slug === "ihealth-edu");
  assert.ok(ihealth);
  const ihealthSchema = generateProjectJsonLd(ihealth, "en");
  assert.equal(ihealthSchema.relatedLink, undefined, "iHealth Edu must not have fabricated liveUrl");
});

test("generateBlogPostingJsonLd produces valid BlogPosting schema with related project references", () => {
  for (const article of blogArticles) {
    const schemaEn = generateBlogPostingJsonLd(article, "en");
    assert.equal(schemaEn["@type"], "BlogPosting");
    assert.equal(schemaEn.headline, article.title.en);
    assert.equal(schemaEn.inLanguage, "en");
    assert.equal(schemaEn.author.name, "Annas Tri Widagdo");
    assert.ok(schemaEn.about && schemaEn.about.length >= 1);
    assert.ok(schemaEn.image);

    const schemaId = generateBlogPostingJsonLd(article, "id");
    assert.equal(schemaId.inLanguage, "id");
    assert.equal(schemaId.headline, article.title.id);
  }
});
