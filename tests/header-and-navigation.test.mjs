import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

import { isRouteActive, getLocalizedPath, getLocalizedHref } from "../src/lib/i18n/paths.ts";
import { navigationConfig } from "../src/content/site/navigation.ts";
import { siteIdentity } from "../src/content/site/identity.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

test("isRouteActive and getLocalizedHref accurately resolve active routes without false positives", () => {
  // getLocalizedHref helper
  assert.equal(getLocalizedHref("/", "en"), "/en");
  assert.equal(getLocalizedHref("/projects", "en"), "/en/projects");
  assert.equal(getLocalizedHref("/about", "id"), "/id/about");
  assert.equal(getLocalizedHref("https://github.com", "en"), "https://github.com");

  // Home route
  assert.equal(isRouteActive("/", "/en", "en"), true, "Home active on /en");
  assert.equal(isRouteActive("/", "/en/", "en"), true, "Home active on /en/");
  assert.equal(isRouteActive("/", "/id", "id"), true, "Home active on /id");
  assert.equal(isRouteActive("/", "/en/about", "en"), false, "Home not active on /en/about");
  assert.equal(isRouteActive("/", "/en/projects", "en"), false, "Home not active on /en/projects");
  assert.equal(isRouteActive("/", "/id/blog", "id"), false, "Home not active on /id/blog");
  assert.equal(isRouteActive("/", "/id/contact", "id"), false, "Home not active on /id/contact");

  // About route
  assert.equal(isRouteActive("/about", "/en/about", "en"), true, "About active on /en/about");
  assert.equal(isRouteActive("/about", "/id/about", "id"), true, "About active on /id/about");
  assert.equal(isRouteActive("/about", "/en", "en"), false, "About not active on /en");
  assert.equal(isRouteActive("/about", "/en/projects", "en"), false, "About not active on /en/projects");

  // Projects route (parent activation on archive + case studies)
  assert.equal(isRouteActive("/projects", "/en/projects", "en"), true, "Projects active on /en/projects");
  assert.equal(isRouteActive("/projects", "/id/projects", "id"), true, "Projects active on /id/projects");
  assert.equal(isRouteActive("/projects", "/en/projects/ukg-system", "en"), true, "Projects active on /en/projects/ukg-system");
  assert.equal(isRouteActive("/projects", "/en/projects/ihealth-edu", "en"), true, "Projects active on /en/projects/ihealth-edu");
  assert.equal(isRouteActive("/projects", "/id/projects/dialisis-connect-edu", "id"), true, "Projects active on /id/projects/dialisis-connect-edu");
  assert.equal(isRouteActive("/projects", "/en/projects/thermal-printer-service", "en"), true, "Projects active on /en/projects/thermal-printer-service");
  assert.equal(isRouteActive("/projects", "/en/blog", "en"), false, "Projects not active on /en/blog");
  assert.equal(isRouteActive("/projects", "/en", "en"), false, "Projects not active on /en");

  // Blog route (parent activation on archive + articles)
  assert.equal(isRouteActive("/blog", "/en/blog", "en"), true, "Blog active on /en/blog");
  assert.equal(isRouteActive("/blog", "/id/blog", "id"), true, "Blog active on /id/blog");
  assert.equal(isRouteActive("/blog", "/en/blog/ukg-system", "en"), true, "Blog active on /en/blog/ukg-system");
  assert.equal(isRouteActive("/blog", "/en/blog/ihealth-edu", "en"), true, "Blog active on /en/blog/ihealth-edu");
  assert.equal(isRouteActive("/blog", "/id/blog/thermal-printer-service", "id"), true, "Blog active on /id/blog/thermal-printer-service");
  assert.equal(isRouteActive("/blog", "/en/blog/speech-to-text-system", "en"), true, "Blog active on /en/blog/speech-to-text-system");
  assert.equal(isRouteActive("/blog", "/en/projects", "en"), false, "Blog not active on /en/projects");
  assert.equal(isRouteActive("/blog", "/en", "en"), false, "Blog not active on /en");

  // Contact route
  assert.equal(isRouteActive("/contact", "/en/contact", "en"), true, "Contact active on /en/contact");
  assert.equal(isRouteActive("/contact", "/id/contact", "id"), true, "Contact active on /id/contact");
  assert.equal(isRouteActive("/contact", "/en", "en"), false, "Contact not active on /en");
  assert.equal(isRouteActive("/contact", "/en/about", "en"), false, "Contact not active on /en/about");
});

test("getLocalizedPath preserves exact current routes including nested slugs", () => {
  // Root home
  assert.equal(getLocalizedPath("/en", "id"), "/id");
  assert.equal(getLocalizedPath("/id", "en"), "/en");

  // Standard routes
  assert.equal(getLocalizedPath("/en/about", "id"), "/id/about");
  assert.equal(getLocalizedPath("/id/about", "en"), "/en/about");
  assert.equal(getLocalizedPath("/en/projects", "id"), "/id/projects");
  assert.equal(getLocalizedPath("/id/blog", "en"), "/en/blog");
  assert.equal(getLocalizedPath("/en/contact", "id"), "/id/contact");

  // Nested project slugs
  assert.equal(
    getLocalizedPath("/en/projects/ukg-system", "id"),
    "/id/projects/ukg-system",
  );
  assert.equal(
    getLocalizedPath("/id/projects/ihealth-edu", "en"),
    "/en/projects/ihealth-edu",
  );

  // Nested blog slugs
  assert.equal(
    getLocalizedPath("/en/blog/thermal-printer-service", "id"),
    "/id/blog/thermal-printer-service",
  );
  assert.equal(
    getLocalizedPath("/id/blog/speech-to-text-system", "en"),
    "/en/blog/speech-to-text-system",
  );
});

test("Header component maintains approved wordmark, sticky behavior, and accessibility", () => {
  const headerFile = readFileSync(
    join(root, "src", "components", "layout", "header.tsx"),
    "utf8",
  );

  // Sticky & banner role
  assert.match(headerFile, /role="banner"/);
  assert.match(headerFile, /sticky/);
  assert.match(headerFile, /top-0/);
  assert.match(headerFile, /z-40/);

  // Wordmark brand mark & link
  assert.match(headerFile, /annastriwidagdo\.me/);
  assert.match(headerFile, /brand-marker/);
  assert.match(headerFile, /brand-underline/);
  assert.match(headerFile, /aria-label={locale === "id" \? "annastriwidagdo\.me - Beranda" : "annastriwidagdo\.me - Home"}/);

  // Desktop navigation accessibility labels
  assert.match(headerFile, /aria-label={locale === "id" \? "Navigasi Utama" : "Main Navigation"}/);

  // Route navigation entrance and initial splash coordination
  assert.match(headerFile, /usePathname/);
  assert.match(headerFile, /header-nav-entrance/);
  assert.match(headerFile, /splash-active/);
  assert.match(headerFile, /min-h-\[2\.75rem\]/);
});

test("Desktop NavLinks component renders 5 numbered items with text-tracking active/hover underlines", () => {
  const navLinksFile = readFileSync(
    join(root, "src", "components", "navigation", "nav-links.tsx"),
    "utf8",
  );

  assert.match(navLinksFile, /isRouteActive/);
  assert.match(navLinksFile, /aria-current={isActive \? "page" : undefined}/);
  assert.match(navLinksFile, /nav-link-underline/);
  assert.match(navLinksFile, /nav-link-label/);
  assert.match(navLinksFile, /nav-active-dot/);
  assert.match(navLinksFile, /●/);

  // Check 5 items configured in both locales
  assert.equal(navigationConfig.en.mainNav.length, 5);
  assert.equal(navigationConfig.id.mainNav.length, 5);
  assert.deepEqual(
    navigationConfig.en.mainNav.map((n) => n.index),
    ["01", "02", "03", "04", "05"],
  );
  assert.deepEqual(
    navigationConfig.id.mainNav.map((n) => n.index),
    ["01", "02", "03", "04", "05"],
  );
});

test("MobileNav component implements Table of Contents, dialog semantics, scrollable content region, sticky top bar, bottom identity block, colophon, and Menu/Close parity", () => {
  const mobileNavFile = readFileSync(
    join(root, "src", "components", "navigation", "mobile-nav.tsx"),
    "utf8",
  );

  // Toggle button tokens & parity
  assert.match(mobileNavFile, /isOpen \? "CLOSE" : "MENU"/);
  assert.match(mobileNavFile, /isOpen \? "✕" : "■"/);
  assert.match(mobileNavFile, /aria-expanded={isOpen}/);
  assert.match(mobileNavFile, /aria-controls="mobile-nav-sheet"/);

  // Dialog semantics & container alignment
  assert.match(mobileNavFile, /role="dialog"/);
  assert.match(mobileNavFile, /aria-modal="true"/);
  assert.match(mobileNavFile, /max-w-7xl/);
  assert.match(mobileNavFile, /aria-label={isId \? "Daftar Isi Navigasi" : "Table of Contents Navigation"}/);

  // Scrollable container and sticky top bar structure
  assert.match(mobileNavFile, /sticky top-0 z-10/);
  assert.match(mobileNavFile, /overflow-y-auto/);
  assert.match(mobileNavFile, /overscroll-y-contain/);
  assert.match(mobileNavFile, /min-h-0/);
  assert.match(mobileNavFile, /safe-area-inset-bottom/);

  // Visible copy tokens, restrained rule & primary numbered nav
  assert.match(mobileNavFile, /\[INDEX \/\/ 01\]/);
  assert.match(mobileNavFile, /isId \? "DAFTAR ISI" : "TABLE OF CONTENTS"/);
  assert.match(mobileNavFile, /<hr\s+className="border-t/);
  assert.match(mobileNavFile, /isId \? "SISTEM \/\/" : "SYSTEM \/\/"/);

  // Active and inactive navigation markers and text-width underline
  assert.match(mobileNavFile, /border-\(--color-accent\)/);
  assert.match(mobileNavFile, /isActive\s*\?[\s\S]*■[\s\S]*:[\s\S]*→/);
  assert.match(mobileNavFile, /bg-\(--color-accent\)/);

  // Bottom identity block with wordmark link and static colophon
  assert.match(mobileNavFile, /brand-wordmark[^>]*>\s*annastriwidagdo\.me/);
  assert.match(mobileNavFile, /Find the purpose\. Build the solution\./);

  // Professional roles removed from mobile nav only
  assert.doesNotMatch(mobileNavFile, /siteIdentity\.roles/);
  assert.deepEqual(Array.from(siteIdentity.roles), [
    "Software Engineer",
    "Full-Stack Web Developer",
    "AI & Machine Learning Enthusiast",
  ]);

  // Excluded contact and location metadata per Prompt 10/12
  assert.doesNotMatch(mobileNavFile, /siteIdentity\.locationMetadata/);
  assert.doesNotMatch(mobileNavFile, /siteContact/);
  assert.doesNotMatch(mobileNavFile, /BackToTop/);

  // Active route non-redundant click handling
  assert.match(mobileNavFile, /handleNavClick/);
  assert.match(mobileNavFile, /e\.preventDefault\(\)/);

  // Escape key & resize dismissal & scroll lock
  assert.match(mobileNavFile, /e\.key === "Escape"/);
  assert.match(mobileNavFile, /document\.body\.style\.overflow = "hidden"/);
  assert.match(mobileNavFile, /document\.body\.style\.overflow = originalOverflow/);
});

test("LocaleSwitcher maintains LANG presentation and non-clickable active state", () => {
  const switcherFile = readFileSync(
    join(root, "src", "components", "navigation", "locale-switcher.tsx"),
    "utf8",
  );

  assert.match(switcherFile, /LANG/);
  assert.match(switcherFile, /lang-btn-active/);
  assert.match(switcherFile, /aria-current="true"/);
  assert.match(switcherFile, /getLocalizedPath/);
});

test("ThemeToggle maintains THM presentation and 3-mode cycling", () => {
  const themeFile = readFileSync(
    join(root, "src", "components", "navigation", "theme-toggle.tsx"),
    "utf8",
  );

  assert.match(themeFile, /THM/);
  assert.match(themeFile, /useSyncExternalStore/);
  assert.match(themeFile, /themePreferences/);
});
