import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

import { siteIdentity } from "../src/content/site/identity.ts";
import { siteContact } from "../src/content/site/contact.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

test("Footer component renders approved identity, 3 full roles, and dynamic colophon", () => {
  const footerFile = readFileSync(
    join(root, "src", "components", "layout", "footer.tsx"),
    "utf8",
  );

  // Wordmark with localized aria-label
  assert.match(footerFile, /annastriwidagdo\.me/);
  assert.match(
    footerFile,
    /aria-label=\{isId \? "annastriwidagdo\.me - Beranda" : "annastriwidagdo\.me - Home"\}/,
  );

  // 3 Professional roles rendered in full
  assert.deepEqual(Array.from(siteIdentity.roles), [
    "Software Engineer",
    "Full-Stack Web Developer",
    "AI & Machine Learning Enthusiast",
  ]);
  assert.match(footerFile, /siteIdentity\.roles\.map/);

  // Footer location metadata removed per Unified Editorial System 08
  assert.doesNotMatch(footerFile, /siteIdentity\.locationMetadata/);
  assert.doesNotMatch(footerFile, /JAKARTA, INDONESIA · UTC\+7/);

  // Viewport entrance reveal
  assert.match(footerFile, /ScrollReveal/);

  // Dynamic universal colophon
  assert.match(footerFile, /new Date\(\)\.getFullYear\(\)/);
  assert.match(
    footerFile,
    /Annas Tri Widagdo\. Find the purpose\. Build the solution\./,
  );
});

test("Footer preserves runtime email link and verified communication channels", () => {
  const footerFile = readFileSync(
    join(root, "src", "components", "layout", "footer.tsx"),
    "utf8",
  );

  // Email destination is preserved (Gmail compose URL)
  assert.equal(siteContact.email, "annastriw6@gmail.com");
  assert.match(footerFile, /href=\{siteContact\.gmailComposeUrl\}/);
  assert.match(footerFile, /data-kind="email"/);
  assert.match(footerFile, /target="_blank"/);
  assert.match(footerFile, /rel="noopener noreferrer"/);

  // LinkedIn channel
  assert.match(footerFile, /href=\{siteContact\.linkedInUrl\}/);
  assert.match(footerFile, /\/in\/annastriwidagdo/);

  // GitHub channel
  assert.match(footerFile, /href=\{siteContact\.gitHubUrl\}/);
  assert.match(footerFile, /@annastriw/);

  // Contact internal link with bilingual copy
  assert.match(footerFile, /href=\{`\/\$\{locale\}\/contact`\}/);
  assert.match(footerFile, /isId \? "Buka Kontak" : "Open Contact"/);

  // Screen-reader new tab cues
  assert.match(
    footerFile,
    /newTabCue: isId \? "dibuka di tab baru" : "opens in a new tab"/,
  );
});

test("BackToTop component implements smooth/reduced scrolling, 44px touch target, and focus restoration", () => {
  const bttFile = readFileSync(
    join(root, "src", "components", "layout", "back-to-top.tsx"),
    "utf8",
  );
  const footerCss = readFileSync(
    join(root, "src", "components", "layout", "footer.module.css"),
    "utf8",
  );

  // Motion-aware scrolling
  assert.match(bttFile, /prefers-reduced-motion: reduce/);
  assert.match(bttFile, /behavior: reduceMotion \? "auto" : "smooth"/);

  // Main landmark focus restoration
  assert.match(bttFile, /document\.getElementById\("main-content"\)/);
  assert.match(bttFile, /main\.focus\(\{ preventScroll: true \}\)/);

  // Touch target in CSS
  assert.match(footerCss, /min-height: 2\.75rem/);
});

test("Skip link and main landmark are correctly integrated with sticky-header offset", () => {
  const layoutFile = readFileSync(
    join(root, "src", "app", "[locale]", "layout.tsx"),
    "utf8",
  );
  const globalsCss = readFileSync(
    join(root, "src", "app", "globals.css"),
    "utf8",
  );

  // Localized skip link labels
  assert.match(layoutFile, /en: "Skip to content"/);
  assert.match(layoutFile, /id: "Lewati ke konten"/);
  assert.match(layoutFile, /href="#main-content"/);

  // Single main landmark with tabIndex -1
  assert.match(layoutFile, /<main id="main-content" className="site-main" tabIndex=\{-1\}>/);

  // CSS positioning above sticky header and scroll-margin-top offset
  assert.match(globalsCss, /\.skip-link[\s\S]*?z-index: 100/);
  assert.match(globalsCss, /\.site-main[\s\S]*?scroll-margin-top: 5rem/);
});

test("Footer CSS implements 320px responsive wrapping and motion-safe hover states", () => {
  const footerCss = readFileSync(
    join(root, "src", "components", "layout", "footer.module.css"),
    "utf8",
  );

  // Anywhere overflow wrapping for 320px screens
  assert.match(footerCss, /overflow-wrap: anywhere/);

  // Reduced motion removes spatial translation on hover/focus
  assert.match(
    footerCss,
    /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.footerLink\[data-kind="external"\]:hover \.linkArrow[\s\S]*?transform: none !important;/,
  );
  assert.match(
    footerCss,
    /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.backToTop:hover \.backToTopArrow[\s\S]*?transform: none !important;/,
  );
});
