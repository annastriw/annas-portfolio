import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

import {
  buildContactMailto,
  contactCopy,
  contactTemplates,
  siteContact,
} from "../src/content/site/contact.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

test("uses only the verified public contact channels", () => {
  assert.equal(siteContact.email, "annastriw6@gmail.com");
  assert.equal(siteContact.emailUrl, "mailto:annastriw6@gmail.com");
  assert.equal(siteContact.linkedIn, "linkedin.com/in/annastriw");
  assert.equal(
    siteContact.linkedInUrl,
    "https://www.linkedin.com/in/annastriw",
  );
  assert.equal(siteContact.gitHub, "github.com/annastriw");
  assert.equal(siteContact.gitHubUrl, "https://github.com/annastriw");
});

test("provides four concise editable draft templates in both locales", () => {
  const expectedIds = [
    "project-collaboration",
    "job-opportunity",
    "freelance-inquiry",
    "general-conversation",
  ];

  for (const locale of ["en", "id"]) {
    assert.deepEqual(
      contactTemplates[locale].map((template) => template.id),
      expectedIds,
    );

    for (const template of contactTemplates[locale]) {
      assert.ok(template.label.trim());
      assert.ok(template.subject.trim());
      assert.ok(template.message.trim());
      assert.ok(template.message.split("\n").length >= 4);
      assert.ok(template.message.length < 260);
    }

    assert.ok(contactCopy[locale].title.trim());
    assert.ok(contactCopy[locale].intro.trim());
    assert.doesNotMatch(
      JSON.stringify({ copy: contactCopy[locale], templates: contactTemplates[locale] }),
      /[â€”â€“]/,
    );
  }
});

test("round-trips special characters, multiline text, and Indonesian Unicode", () => {
  const subject = "R&D: peluang kerja? A&B = C #1";
  const message = "Halo Annas, \u{1F44B}\n\nSaya ingin berdiskusi tentang pengembangan perangkat lunak & integrasi data.\nTopik: kualitas, aksesibilitas, dan pengalaman pengguna di Indonesia.\n\nTerima kasih.";
  const mailto = buildContactMailto(subject, message);
  const parsed = new URL(mailto);

  assert.equal(parsed.protocol, "mailto:");
  assert.equal(parsed.pathname, "annastriw6@gmail.com");
  assert.equal(parsed.searchParams.get("subject"), subject);
  assert.equal(parsed.searchParams.get("body"), message);
  assert.match(mailto, /%26/);
  assert.match(mailto, /%3D/);
  assert.match(mailto, /%23/);
  assert.match(mailto, /%0A/);
  assert.match(mailto, /%F0/);
  assert.doesNotMatch(mailto, /R&D|#1|Halo Annas,\n/);
});

test("supports fully custom and empty drafts without fake send behavior", () => {
  const custom = buildContactMailto("Custom subject", "Custom message");
  const empty = buildContactMailto("", "");

  assert.equal(new URL(custom).searchParams.get("subject"), "Custom subject");
  assert.equal(new URL(custom).searchParams.get("body"), "Custom message");
  assert.equal(new URL(empty).searchParams.get("subject"), "");
  assert.equal(new URL(empty).searchParams.get("body"), "");
});

test("publishes localized Contact routes, metadata, sitemap entries, and current shared email", () => {
  const page = readFileSync(
    join(root, "src", "app", "[locale]", "contact", "page.tsx"),
    "utf8",
  );
  const sitemap = readFileSync(join(root, "src", "app", "sitemap.ts"), "utf8");
  const footer = readFileSync(
    join(root, "src", "components", "layout", "footer.tsx"),
    "utf8",
  );
  const navigation = readFileSync(
    join(root, "src", "data", "navigation.ts"),
    "utf8",
  );

  assert.match(page, /Contact \| Annas Tri Widagdo/);
  assert.match(page, /Kontak \| Annas Tri Widagdo/);
  assert.match(sitemap, /\/en\/contact/);
  assert.match(sitemap, /\/id\/contact/);
  assert.doesNotMatch(footer + navigation, /annastriw23@gmail\.com/);
});
