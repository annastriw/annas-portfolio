import assert from "node:assert/strict";
import test from "node:test";
import { projectArchive } from "../src/content/projects/project-archive.ts";
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
  generateBreadcrumbJsonLd,
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
    title: "About Annas Tri Widagdo | Software Engineer",
    description:
      "Learn about Annas Tri Widagdo, a Computer Engineering graduate with experience in software engineering, full-stack web development, and machine learning.",
    type: "profile",
  });

  assert.equal(enMeta.title, "About Annas Tri Widagdo | Software Engineer");
  assert.equal(
    enMeta.description,
    "Learn about Annas Tri Widagdo, a Computer Engineering graduate with experience in software engineering, full-stack web development, and machine learning.",
  );
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
    title: "Tentang Annas Tri Widagdo | Software Engineer",
    description:
      "Kenali Annas Tri Widagdo, lulusan Teknik Komputer dengan pengalaman dalam software engineering, full-stack web development, dan machine learning.",
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
  assert.ok(person.sameAs.includes("https://www.linkedin.com/in/annastriwidagdo"));

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
  assert.equal(profileEn.name, "About Annas Tri Widagdo | Software Engineer");
  assert.equal(profileEn.url, "https://annastriwidagdo.me/en/about");
  assert.equal(profileEn.mainEntity["@type"], "Person");
  assert.equal(profileEn.mainEntity.jobTitle, "Software Engineer");
  assert.equal(profileEn.mainEntity.address?.addressLocality, "Jakarta");

  const profileId = generateProfilePageJsonLd("id");
  assert.equal(profileId["@type"], "ProfilePage");
  assert.equal(profileId.name, "Tentang Annas Tri Widagdo | Software Engineer");
  assert.equal(profileId.url, "https://annastriwidagdo.me/id/about");
  assert.equal(profileId.mainEntity["@type"], "Person");
  assert.equal(profileId.mainEntity.jobTitle, "Software Engineer");
  assert.equal(profileId.mainEntity.address?.addressLocality, "Jakarta");
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

test("generateCollectionPageJsonLd and generateItemListJsonLd produce valid structured data for Projects Hub", () => {
  const items = projectArchive.map((project) => ({
    title: project.title.en,
    url: `${SITE_URL}/en/projects/${project.slug}`,
  }));

  const listNameEn = "Projects Archive | Annas Tri Widagdo";
  const listDescEn =
    "Explore projects by Annas Tri Widagdo across web development, machine learning, mobile applications, and interactive media, with detailed case studies.";

  const itemList = generateItemListJsonLd(
    items,
    listNameEn,
    `${SITE_URL}/en/projects`,
  );
  assert.equal(itemList["@type"], "ItemList");
  assert.equal(itemList.numberOfItems, 10);
  assert.equal(itemList.itemListElement.length, 10);
  assert.equal(itemList.itemListElement[0].name, "UKG System");
  assert.equal(itemList.itemListElement[0].position, 1);
  assert.equal(itemList.itemListElement[0].url, `${SITE_URL}/en/projects/ukg-system`);
  assert.equal(itemList.itemListElement[9].name, "Panoramic Virtual Tour");
  assert.equal(itemList.itemListElement[9].position, 10);

  const collectionEn = generateCollectionPageJsonLd(
    items,
    listNameEn,
    `${SITE_URL}/en/projects`,
    listDescEn,
    "en",
  );

  assert.equal(collectionEn["@type"], "CollectionPage");
  assert.equal(collectionEn.name, listNameEn);
  assert.equal(collectionEn.description, listDescEn);
  assert.equal(collectionEn.inLanguage, "en");
  assert.equal(collectionEn.mainEntity["@type"], "ItemList");
  assert.equal(collectionEn.mainEntity.numberOfItems, 10);
  assert.doesNotMatch(collectionEn.description, /verified/i);
  assert.doesNotMatch(collectionEn.description, /100%/);

  const itemsId = projectArchive.map((project) => ({
    title: project.title.id,
    url: `${SITE_URL}/id/projects/${project.slug}`,
  }));

  const listNameId = "Arsip Proyek | Annas Tri Widagdo";
  const listDescId =
    "Jelajahi project Annas Tri Widagdo dalam web development, machine learning, aplikasi mobile, dan media interaktif, dilengkapi pembahasan setiap project.";

  const collectionId = generateCollectionPageJsonLd(
    itemsId,
    listNameId,
    `${SITE_URL}/id/projects`,
    listDescId,
    "id",
  );

  assert.equal(collectionId["@type"], "CollectionPage");
  assert.equal(collectionId.name, listNameId);
  assert.equal(collectionId.inLanguage, "id");
  assert.equal(collectionId.mainEntity.numberOfItems, 10);
});

test("Projects Hub metadata generates valid Section 10 metadata and OG cover", () => {
  const metaEn = createPageMetadata({
    locale: "en",
    path: "projects",
    title: "Projects Archive | Annas Tri Widagdo",
    description:
      "Explore projects by Annas Tri Widagdo across web development, machine learning, mobile applications, and interactive media, with detailed case studies.",
    type: "website",
    images: [
      {
        url: "/assets/projects/ukg-system/cover.webp",
        width: 1200,
        height: 900,
        alt: "Engineering projects archive of Annas Tri Widagdo",
      },
    ],
  });

  assert.equal(metaEn.title, "Projects Archive | Annas Tri Widagdo");
  assert.equal(
    metaEn.description,
    "Explore projects by Annas Tri Widagdo across web development, machine learning, mobile applications, and interactive media, with detailed case studies.",
  );
  assert.equal(metaEn.alternates?.canonical, "https://annastriwidagdo.me/en/projects");
  assert.deepEqual(metaEn.alternates?.languages, {
    en: "https://annastriwidagdo.me/en/projects",
    id: "https://annastriwidagdo.me/id/projects",
    "x-default": "https://annastriwidagdo.me/en/projects",
  });
  assert.ok(
    metaEn.openGraph?.images?.[0]?.url.includes(
      "/assets/projects/ukg-system/cover.webp",
    ),
  );

  const metaId = createPageMetadata({
    locale: "id",
    path: "projects",
    title: "Arsip Proyek | Annas Tri Widagdo",
    description:
      "Jelajahi project Annas Tri Widagdo dalam web development, machine learning, aplikasi mobile, dan media interaktif, dilengkapi pembahasan setiap project.",
    type: "website",
    images: [
      {
        url: "/assets/projects/ukg-system/cover.webp",
        width: 1200,
        height: 900,
        alt: "Arsip proyek rekayasa Annas Tri Widagdo",
      },
    ],
  });

  assert.equal(metaId.title, "Arsip Proyek | Annas Tri Widagdo");
  assert.equal(
    metaId.description,
    "Jelajahi project Annas Tri Widagdo dalam web development, machine learning, aplikasi mobile, dan media interaktif, dilengkapi pembahasan setiap project.",
  );
  assert.equal(metaId.alternates?.canonical, "https://annastriwidagdo.me/id/projects");
});

test("generateProjectJsonLd accurately represents project facts, keywords, and live URLs for UKG, iHealth, Dialisis, Nusa Dakwah, SIMASTOK, Heart ML, Speech-to-Text, Thermal Printer Service, Footy Standings, and Panoramic Virtual Tour", () => {
  const ukg = projectCaseStudies.find((p) => p.slug === "ukg-system");
  assert.ok(ukg);
  const ukgSchema = generateProjectJsonLd(ukg, "en");

  assert.equal(ukgSchema["@type"], "SoftwareSourceCode");
  assert.equal(ukgSchema.name, "UKG System");
  assert.equal(ukgSchema.url, "https://annastriwidagdo.me/en/projects/ukg-system");
  assert.equal(ukgSchema.relatedLink, "https://ukgsystem.site/");
  assert.ok(ukgSchema.image?.includes("/assets/projects/ukg-system/cover.webp"));
  assert.deepEqual(ukgSchema.keywords, [
    "web-app",
    "Full-Stack Web Developer",
    "Figma",
    "Next.js",
    "NestJS",
    "MySQL",
    "Playwright",
    "Linux Ubuntu",
  ]);

  const ihealth = projectCaseStudies.find((p) => p.slug === "ihealth-edu");
  assert.ok(ihealth);
  const ihealthSchema = generateProjectJsonLd(ihealth, "en");
  assert.equal(ihealthSchema["@type"], "SoftwareSourceCode");
  assert.equal(ihealthSchema.name, "iHealth Edu");
  assert.equal(ihealthSchema.url, "https://annastriwidagdo.me/en/projects/ihealth-edu");
  assert.equal(ihealthSchema.relatedLink, "https://www.ihealthedu.site/");
  assert.ok(ihealthSchema.image?.includes("/assets/projects/ihealth-edu/cover.webp"));
  assert.deepEqual(ihealthSchema.keywords, [
    "web-app",
    "Frontend Web Developer",
    "Figma",
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "REST API",
  ]);

  const dialisis = projectCaseStudies.find((p) => p.slug === "dialisis-connect-edu");
  assert.ok(dialisis);
  const dialisisSchema = generateProjectJsonLd(dialisis, "en");
  assert.equal(dialisisSchema["@type"], "SoftwareSourceCode");
  assert.equal(dialisisSchema.name, "Dialisis Connect Edu");
  assert.equal(dialisisSchema.url, "https://annastriwidagdo.me/en/projects/dialisis-connect-edu");
  assert.equal(dialisisSchema.relatedLink, "https://dialisisconnectedu.vercel.app/");
  assert.ok(dialisisSchema.image?.includes("/assets/projects/dialisis-connect-edu/cover.webp"));
  assert.deepEqual(dialisisSchema.keywords, [
    "web-app",
    "Frontend Web Developer",
    "Figma",
    "Next.js",
    "React",
    "REST API",
    "Katalon Studio",
    "Docker",
  ]);

  const nusa = projectCaseStudies.find((p) => p.slug === "nusa-dakwah");
  assert.ok(nusa);
  const nusaSchema = generateProjectJsonLd(nusa, "en");
  assert.equal(nusaSchema["@type"], "SoftwareSourceCode");
  assert.equal(nusaSchema.name, "Nusa Dakwah");
  assert.equal(nusaSchema.url, "https://annastriwidagdo.me/en/projects/nusa-dakwah");
  assert.equal(nusaSchema.relatedLink, "https://nusadakwah.vercel.app/");
  assert.ok(nusaSchema.image?.includes("/assets/projects/nusa-dakwah/cover.webp"));
  assert.deepEqual(nusaSchema.keywords, [
    "web-app",
    "Full-Stack Web Developer",
    "Figma",
    "Next.js",
    "Laravel",
    "MySQL",
    "Katalon Studio",
    "Docker",
  ]);

  const nusaJsonString = JSON.stringify(nusaSchema);
  assert.doesNotMatch(nusaJsonString, /search|pencarian/i);

  const simastok = projectCaseStudies.find((p) => p.slug === "simastok");
  assert.ok(simastok);
  const simastokSchema = generateProjectJsonLd(simastok, "en");
  assert.equal(simastokSchema["@type"], "SoftwareSourceCode");
  assert.equal(simastokSchema.name, "SIMASTOK SHR Jaya Motor");
  assert.equal(simastokSchema.url, "https://annastriwidagdo.me/en/projects/simastok");
  assert.equal(simastokSchema.relatedLink, "https://simastok.site/");
  assert.ok(simastokSchema.image?.includes("/assets/projects/simastok/cover.webp"));
  assert.deepEqual(simastokSchema.keywords, [
    "web-app",
    "Full-Stack Web Developer",
    "Figma",
    "Laravel",
    "PHP",
    "MySQL",
    "Katalon Studio",
    "Docker",
  ]);

  const heartMl = projectCaseStudies.find(
    (p) => p.slug === "ml-for-heart-attack-risk-prediction",
  );
  assert.ok(heartMl);
  const heartMlSchema = generateProjectJsonLd(heartMl, "en");
  assert.equal(heartMlSchema["@type"], "SoftwareSourceCode");
  assert.equal(
    heartMlSchema.name,
    "Machine Learning Model for Heart Attack Risk Prediction",
  );
  assert.equal(
    heartMlSchema.url,
    "https://annastriwidagdo.me/en/projects/ml-for-heart-attack-risk-prediction",
  );
  assert.equal(
    heartMlSchema.codeRepository,
    "https://github.com/annastriw/ml-for-heart-attack-risk-prediction.git",
  );
  assert.equal(heartMlSchema.relatedLink, undefined);
  assert.ok(
    heartMlSchema.image?.includes(
      "/assets/projects/ml-for-heart-attack-risk-prediction/cover.webp",
    ),
  );
  assert.deepEqual(heartMlSchema.keywords, [
    "Machine Learning",
    "Machine Learning Engineer",
    "Binary Classification",
    "Decision Support",
    "Python",
    "Scikit-learn",
    "Pandas",
    "SMOTE",
    "Flask",
    "Docker",
  ]);

  const heartMlJsonString = JSON.stringify(heartMlSchema);
  assert.doesNotMatch(
    heartMlJsonString,
    /medical diagnosis|diagnosis klinis|clinical accuracy|clinically validated|treatment|prevention/i,
  );

  const stt = projectCaseStudies.find(
    (p) => p.slug === "speech-to-text-system",
  );
  assert.ok(stt);
  const sttSchema = generateProjectJsonLd(stt, "en");
  assert.equal(sttSchema["@type"], "SoftwareSourceCode");
  assert.equal(sttSchema.name, "Speech-to-Text System");
  assert.equal(
    sttSchema.url,
    "https://annastriwidagdo.me/en/projects/speech-to-text-system",
  );
  assert.equal(
    sttSchema.codeRepository,
    "https://github.com/annastriw/speech-to-text-system.git",
  );
  assert.equal(sttSchema.relatedLink, undefined);
  assert.ok(
    sttSchema.image?.includes(
      "/assets/projects/speech-to-text-system/cover.webp",
    ),
  );
  assert.deepEqual(sttSchema.keywords, [
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

  const sttJsonString = JSON.stringify(sttSchema);
  assert.doesNotMatch(
    sttJsonString,
    /fine-tuned model|custom ASR|custom-trained|transcription accuracy|multilingual|production-grade|API|web application|deployment/i,
  );

  const tps = projectCaseStudies.find((p) => p.slug === "thermal-printer-service");
  assert.ok(tps);
  const tpsSchemaEn = generateProjectJsonLd(tps, "en");
  assert.equal(tpsSchemaEn["@type"], "SoftwareSourceCode");
  assert.equal(tpsSchemaEn.name, "Thermal Printer Service");
  assert.equal(
    tpsSchemaEn.url,
    "https://annastriwidagdo.me/en/projects/thermal-printer-service",
  );
  assert.equal(
    tpsSchemaEn.codeRepository,
    "https://github.com/annastriw/ThermalPrinterService.git",
  );
  assert.equal(tpsSchemaEn.relatedLink, undefined);
  assert.ok(
    tpsSchemaEn.image?.includes("/assets/projects/thermal-printer-service/cover.webp"),
  );
  assert.deepEqual(tpsSchemaEn.keywords, [
    "Android",
    "Kotlin",
    "Android Print Framework",
    "PrintService",
    "Bluetooth RFCOMM",
    "ESC/POS",
    "Thermal Printer",
    "Android Developer",
  ]);

  const tpsSchemaId = generateProjectJsonLd(tps, "id");
  assert.equal(tpsSchemaId["@type"], "SoftwareSourceCode");
  assert.equal(tpsSchemaId.name, "Thermal Printer Service");
  assert.equal(
    tpsSchemaId.url,
    "https://annastriwidagdo.me/id/projects/thermal-printer-service",
  );
  assert.equal(
    tpsSchemaId.codeRepository,
    "https://github.com/annastriw/ThermalPrinterService.git",
  );
  assert.equal(tpsSchemaId.relatedLink, undefined);
  assert.deepEqual(tpsSchemaId.keywords, [
    "Android",
    "Kotlin",
    "Android Print Framework",
    "PrintService",
    "Bluetooth RFCOMM",
    "ESC/POS",
    "Thermal Printer",
    "Android Developer",
  ]);

  const tpsJsonString = JSON.stringify(tpsSchemaEn);
  assert.doesNotMatch(
    tpsJsonString,
    /universal printer|universal compatibility|benchmark|speed improvement|success rate|queue persistence|Wi-Fi|USB/i,
  );

  const footy = projectCaseStudies.find((p) => p.slug === "footy-standings");
  assert.ok(footy);
  const footySchemaEn = generateProjectJsonLd(footy, "en");
  assert.equal(footySchemaEn["@type"], "SoftwareSourceCode");
  assert.equal(footySchemaEn.name, "Footy Standings");
  assert.equal(
    footySchemaEn.url,
    "https://annastriwidagdo.me/en/projects/footy-standings",
  );
  assert.equal(
    footySchemaEn.codeRepository,
    "https://github.com/annastriw/FootyStandings.git",
  );
  assert.equal(footySchemaEn.programmingLanguage, "Dart");
  assert.equal(footySchemaEn.relatedLink, undefined);
  assert.ok(
    footySchemaEn.image?.includes("/assets/projects/footy-standings/cover.webp"),
  );
  assert.deepEqual(footySchemaEn.keywords, [
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

  const footySchemaId = generateProjectJsonLd(footy, "id");
  assert.equal(footySchemaId["@type"], "SoftwareSourceCode");
  assert.equal(footySchemaId.name, "Footy Standings");
  assert.equal(
    footySchemaId.url,
    "https://annastriwidagdo.me/id/projects/footy-standings",
  );
  assert.equal(
    footySchemaId.codeRepository,
    "https://github.com/annastriw/FootyStandings.git",
  );
  assert.equal(footySchemaId.programmingLanguage, "Dart");
  assert.equal(footySchemaId.relatedLink, undefined);
  assert.deepEqual(footySchemaId.keywords, [
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

  const footyJsonString = JSON.stringify(footySchemaEn);
  assert.doesNotMatch(
    footyJsonString,
    /real[- ]?time scores|live score|instant sync|automatic refresh|polling|iOS|Play Store|Google Play/i,
  );

  const pvt = projectCaseStudies.find(
    (p) => p.slug === "panoramic-virtual-tour",
  );
  assert.ok(pvt);
  const pvtSchemaEn = generateProjectJsonLd(pvt, "en");
  assert.equal(pvtSchemaEn["@type"], "SoftwareSourceCode");
  assert.equal(pvtSchemaEn.name, "Panoramic Virtual Tour");
  assert.equal(
    pvtSchemaEn.url,
    "https://annastriwidagdo.me/en/projects/panoramic-virtual-tour",
  );
  assert.equal(pvtSchemaEn.codeRepository, undefined);
  assert.equal(pvtSchemaEn.programmingLanguage, "C#");
  assert.equal(pvtSchemaEn.relatedLink, undefined);
  assert.ok(
    pvtSchemaEn.image?.includes(
      "/assets/projects/panoramic-virtual-tour/cover.webp",
    ),
  );
  assert.deepEqual(pvtSchemaEn.keywords, [
    "Unity",
    "C#",
    "Lumion Pro",
    "Physics Raycast",
    "Scene Management",
    "Junior Game Developer Intern",
    "Virtual Tour",
    "Interactive Prototype",
  ]);

  const pvtSchemaId = generateProjectJsonLd(pvt, "id");
  assert.equal(pvtSchemaId["@type"], "SoftwareSourceCode");
  assert.equal(pvtSchemaId.name, "Panoramic Virtual Tour");
  assert.equal(
    pvtSchemaId.url,
    "https://annastriwidagdo.me/id/projects/panoramic-virtual-tour",
  );
  assert.equal(pvtSchemaId.codeRepository, undefined);
  assert.equal(pvtSchemaId.programmingLanguage, "C#");
  assert.equal(pvtSchemaId.relatedLink, undefined);
  assert.deepEqual(pvtSchemaId.keywords, [
    "Unity",
    "C#",
    "Lumion Pro",
    "Physics Raycast",
    "Scene Management",
    "Junior Game Developer Intern",
    "Virtual Tour",
    "Prototype Interaktif",
  ]);

  const pvtJsonString = JSON.stringify(pvtSchemaEn);
  assert.doesNotMatch(
    pvtJsonString,
    /\bAR\b|\bVR\b|WebGL|client delivery|live website|production deployment/i,
  );
});

test("Thermal Printer Service generates valid bilingual page metadata matching approved decision", () => {
  const tps = projectCaseStudies.find((p) => p.slug === "thermal-printer-service");
  assert.ok(tps);

  const enMeta = createPageMetadata({
    locale: "en",
    path: `projects/${tps.slug}`,
    title: tps.metaTitle.en,
    description: tps.metaDescription.en,
    type: "article",
    images: [{ url: tps.cover.src, alt: tps.cover.alt.en }],
  });

  assert.equal(
    enMeta.title,
    "Thermal Printer Service — Android Development Case Study | Annas Tri Widagdo",
  );
  assert.equal(
    enMeta.description,
    "A native Kotlin Android PrintService case study covering Android print-job processing, monochrome ESC/POS conversion, Bluetooth delivery, and configurable 58 mm and 80 mm thermal printers.",
  );
  assert.equal(
    enMeta.alternates?.canonical,
    "https://annastriwidagdo.me/en/projects/thermal-printer-service",
  );
  assert.deepEqual(enMeta.alternates?.languages, {
    en: "https://annastriwidagdo.me/en/projects/thermal-printer-service",
    id: "https://annastriwidagdo.me/id/projects/thermal-printer-service",
    "x-default": "https://annastriwidagdo.me/en/projects/thermal-printer-service",
  });

  const idMeta = createPageMetadata({
    locale: "id",
    path: `projects/${tps.slug}`,
    title: tps.metaTitle.id,
    description: tps.metaDescription.id,
    type: "article",
    images: [{ url: tps.cover.src, alt: tps.cover.alt.id }],
  });

  assert.equal(
    idMeta.title,
    "Thermal Printer Service — Studi Kasus Android Development | Annas Tri Widagdo",
  );
  assert.equal(
    idMeta.description,
    "Studi kasus Android PrintService native berbasis Kotlin yang mencakup pemrosesan print job, konversi ESC/POS monokrom, pengiriman Bluetooth, serta konfigurasi thermal printer 58 mm dan 80 mm.",
  );
  assert.equal(
    idMeta.alternates?.canonical,
    "https://annastriwidagdo.me/id/projects/thermal-printer-service",
  );
  assert.deepEqual(idMeta.alternates?.languages, {
    en: "https://annastriwidagdo.me/en/projects/thermal-printer-service",
    id: "https://annastriwidagdo.me/id/projects/thermal-printer-service",
    "x-default": "https://annastriwidagdo.me/en/projects/thermal-printer-service",
  });
});

test("Footy Standings generates valid bilingual page metadata matching approved decision", () => {
  const footy = projectCaseStudies.find((p) => p.slug === "footy-standings");
  assert.ok(footy);

  const enMeta = createPageMetadata({
    locale: "en",
    path: `projects/${footy.slug}`,
    title: footy.metaTitle.en,
    description: footy.metaDescription.en,
    type: "article",
    images: [{ url: footy.cover.src, alt: footy.cover.alt.en }],
  });

  assert.equal(
    enMeta.title,
    "Footy Standings — Android Development Case Study | Annas Tri Widagdo",
  );
  assert.equal(
    enMeta.description,
    "An Android application built with Flutter and Dart for football standings, fixtures, top scorers, and club details, featuring REST API integration and asynchronous UI states.",
  );
  assert.equal(
    enMeta.alternates?.canonical,
    "https://annastriwidagdo.me/en/projects/footy-standings",
  );
  assert.deepEqual(enMeta.alternates?.languages, {
    en: "https://annastriwidagdo.me/en/projects/footy-standings",
    id: "https://annastriwidagdo.me/id/projects/footy-standings",
    "x-default": "https://annastriwidagdo.me/en/projects/footy-standings",
  });

  const idMeta = createPageMetadata({
    locale: "id",
    path: `projects/${footy.slug}`,
    title: footy.metaTitle.id,
    description: footy.metaDescription.id,
    type: "article",
    images: [{ url: footy.cover.src, alt: footy.cover.alt.id }],
  });

  assert.equal(
    idMeta.title,
    "Footy Standings — Studi Kasus Android Development | Annas Tri Widagdo",
  );
  assert.equal(
    idMeta.description,
    "Aplikasi Android berbasis Flutter dan Dart untuk melihat klasemen sepak bola, jadwal pertandingan, top scorer, dan detail klub, dengan integrasi REST API dan penanganan status pemuatan data.",
  );
  assert.equal(
    idMeta.alternates?.canonical,
    "https://annastriwidagdo.me/id/projects/footy-standings",
  );
  assert.deepEqual(idMeta.alternates?.languages, {
    en: "https://annastriwidagdo.me/en/projects/footy-standings",
    id: "https://annastriwidagdo.me/id/projects/footy-standings",
    "x-default": "https://annastriwidagdo.me/en/projects/footy-standings",
  });
});

test("Panoramic Virtual Tour generates valid bilingual page metadata matching approved decision", () => {
  const pvt = projectCaseStudies.find((p) => p.slug === "panoramic-virtual-tour");
  assert.ok(pvt);

  const enMeta = createPageMetadata({
    locale: "en",
    path: `projects/${pvt.slug}`,
    title: pvt.metaTitle.en,
    description: pvt.metaDescription.en,
    type: "article",
    images: [{ url: pvt.cover.src, alt: pvt.cover.alt.en }],
  });

  assert.equal(
    enMeta.title,
    "Panoramic Virtual Tour — Unity Development Case Study | Annas Tri Widagdo",
  );
  assert.equal(
    enMeta.description,
    "A Unity virtual tour prototype built from team-supplied 3D models, combining Lumion Pro panoramas, 360° viewing, hotspot navigation, and scene management.",
  );
  assert.equal(
    enMeta.alternates?.canonical,
    "https://annastriwidagdo.me/en/projects/panoramic-virtual-tour",
  );
  assert.deepEqual(enMeta.alternates?.languages, {
    en: "https://annastriwidagdo.me/en/projects/panoramic-virtual-tour",
    id: "https://annastriwidagdo.me/id/projects/panoramic-virtual-tour",
    "x-default": "https://annastriwidagdo.me/en/projects/panoramic-virtual-tour",
  });

  const idMeta = createPageMetadata({
    locale: "id",
    path: `projects/${pvt.slug}`,
    title: pvt.metaTitle.id,
    description: pvt.metaDescription.id,
    type: "article",
    images: [{ url: pvt.cover.src, alt: pvt.cover.alt.id }],
  });

  assert.equal(
    idMeta.title,
    "Panoramic Virtual Tour — Studi Kasus Unity Development | Annas Tri Widagdo",
  );
  assert.equal(
    idMeta.description,
    "Prototype virtual tour Unity yang dikembangkan dari model 3D buatan tim, dengan panorama Lumion Pro, tampilan 360°, navigasi hotspot, dan pengelolaan scene.",
  );
  assert.equal(
    idMeta.alternates?.canonical,
    "https://annastriwidagdo.me/id/projects/panoramic-virtual-tour",
  );
  assert.deepEqual(idMeta.alternates?.languages, {
    en: "https://annastriwidagdo.me/en/projects/panoramic-virtual-tour",
    id: "https://annastriwidagdo.me/id/projects/panoramic-virtual-tour",
    "x-default": "https://annastriwidagdo.me/en/projects/panoramic-virtual-tour",
  });
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

test("generateBreadcrumbJsonLd produces valid BreadcrumbList schema", () => {
  const breadcrumbs = [
    { name: "Home", url: `${SITE_URL}/en` },
    { name: "Projects", url: `${SITE_URL}/en/projects` },
    { name: "UKG System", url: `${SITE_URL}/en/projects/ukg-system` },
  ];

  const schema = generateBreadcrumbJsonLd(breadcrumbs);
  assert.equal(schema["@context"], "https://schema.org");
  assert.equal(schema["@type"], "BreadcrumbList");
  assert.equal(schema.itemListElement.length, 3);
  assert.equal(schema.itemListElement[0].name, "Home");
  assert.equal(schema.itemListElement[0].position, 1);
  assert.equal(schema.itemListElement[0].item, "https://annastriwidagdo.me/en");
  assert.equal(schema.itemListElement[1].name, "Projects");
  assert.equal(schema.itemListElement[1].position, 2);
  assert.equal(schema.itemListElement[1].item, "https://annastriwidagdo.me/en/projects");
  assert.equal(schema.itemListElement[2].name, "UKG System");
  assert.equal(schema.itemListElement[2].position, 3);
  assert.equal(schema.itemListElement[2].item, "https://annastriwidagdo.me/en/projects/ukg-system");
});

test("Blog Hub and article placeholders generate valid bilingual page metadata matching approved temporary decision", () => {
  const hubEn = createPageMetadata({
    locale: "en",
    path: "blog",
    title: "Blog Archive | Annas Tri Widagdo",
    description:
      "This blog is being prepared. Articles will be available here once they’re ready.",
    type: "website",
  });

  assert.equal(hubEn.title, "Blog Archive | Annas Tri Widagdo");
  assert.equal(
    hubEn.description,
    "This blog is being prepared. Articles will be available here once they’re ready.",
  );
  assert.equal(hubEn.alternates?.canonical, "https://annastriwidagdo.me/en/blog");
  assert.deepEqual(hubEn.alternates?.languages, {
    en: "https://annastriwidagdo.me/en/blog",
    id: "https://annastriwidagdo.me/id/blog",
    "x-default": "https://annastriwidagdo.me/en/blog",
  });
  assert.equal(hubEn.openGraph?.type, "website");

  const hubId = createPageMetadata({
    locale: "id",
    path: "blog",
    title: "Arsip Blog | Annas Tri Widagdo",
    description:
      "Blog ini sedang disiapkan. Artikel akan tersedia di sini setelah siap dipublikasikan.",
    type: "website",
  });

  assert.equal(hubId.title, "Arsip Blog | Annas Tri Widagdo");
  assert.equal(
    hubId.description,
    "Blog ini sedang disiapkan. Artikel akan tersedia di sini setelah siap dipublikasikan.",
  );
  assert.equal(hubId.alternates?.canonical, "https://annastriwidagdo.me/id/blog");
  assert.deepEqual(hubId.alternates?.languages, {
    en: "https://annastriwidagdo.me/en/blog",
    id: "https://annastriwidagdo.me/id/blog",
    "x-default": "https://annastriwidagdo.me/en/blog",
  });

  for (const article of blogArticles) {
    const articleEn = createPageMetadata({
      locale: "en",
      path: `blog/${article.slug}`,
      title: "Blog Archive | Annas Tri Widagdo",
      description:
        "This blog is being prepared. Articles will be available here once they’re ready.",
      type: "website",
    });

    assert.equal(articleEn.title, "Blog Archive | Annas Tri Widagdo");
    assert.equal(
      articleEn.description,
      "This blog is being prepared. Articles will be available here once they’re ready.",
    );
    assert.equal(
      articleEn.alternates?.canonical,
      `https://annastriwidagdo.me/en/blog/${article.slug}`,
    );
    assert.deepEqual(articleEn.alternates?.languages, {
      en: `https://annastriwidagdo.me/en/blog/${article.slug}`,
      id: `https://annastriwidagdo.me/id/blog/${article.slug}`,
      "x-default": `https://annastriwidagdo.me/en/blog/${article.slug}`,
    });

    const articleId = createPageMetadata({
      locale: "id",
      path: `blog/${article.slug}`,
      title: "Arsip Blog | Annas Tri Widagdo",
      description:
        "Blog ini sedang disiapkan. Artikel akan tersedia di sini setelah siap dipublikasikan.",
      type: "website",
    });

    assert.equal(
      articleId.alternates?.canonical,
      `https://annastriwidagdo.me/id/blog/${article.slug}`,
    );
  }
});


