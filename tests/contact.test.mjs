import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

import {
  buildContactEmailLinks,
  buildContactGmailCompose,
  buildContactMailto,
  contactCopy,
  contactTemplates,
  siteContact,
} from "../src/content/site/contact.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

test("uses only the verified public contact channels", () => {
  assert.equal(siteContact.email, "annastriw6@gmail.com");
  assert.equal(siteContact.emailUrl, "mailto:annastriw6@gmail.com");
  assert.equal(
    siteContact.gmailComposeUrl,
    "https://mail.google.com/mail/?view=cm&fs=1&to=annastriw6%40gmail.com",
  );
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
    assert.match(contactCopy[locale].pageLabel, /^\[05 \/\/ (CONTACT|KONTAK)\]$/);
    assert.doesNotMatch(
      JSON.stringify({ copy: contactCopy[locale], templates: contactTemplates[locale] }),
      /[â€”â€“]/,
    );
  }
});

test("round-trips special characters, multiline text, Indonesian Unicode, and emoji for both email destinations", () => {
  const subject = "R&D: peluang kerja? A&B = C #1";
  const message = "Halo Annas, \u{1F44B}\n\nSaya ingin berdiskusi tentang pengembangan perangkat lunak & integrasi data.\nTopik: kualitas, aksesibilitas, dan pengalaman pengguna di Indonesia.\n\nTerima kasih.";
  const links = buildContactEmailLinks({ subject, body: message });
  const parsedMailto = new URL(links.mailto);
  const parsedGmail = new URL(links.gmail);

  assert.equal(parsedMailto.protocol, "mailto:");
  assert.equal(parsedMailto.pathname, "annastriw6@gmail.com");
  assert.equal(parsedMailto.searchParams.get("subject"), subject);
  assert.equal(parsedMailto.searchParams.get("body"), message);
  assert.equal(parsedGmail.origin, "https://mail.google.com");
  assert.equal(parsedGmail.pathname, "/mail/");
  assert.equal(parsedGmail.searchParams.get("view"), "cm");
  assert.equal(parsedGmail.searchParams.get("fs"), "1");
  assert.equal(parsedGmail.searchParams.get("to"), siteContact.email);
  assert.equal(parsedGmail.searchParams.get("su"), subject);
  assert.equal(parsedGmail.searchParams.get("body"), message);

  for (const link of [links.mailto, links.gmail]) {
    assert.match(link, /%26/);
    assert.match(link, /%3D/);
    assert.match(link, /%23/);
    assert.match(link, /%0A/);
    assert.match(link, /%F0/);
    assert.doesNotMatch(link, /R&D|#1|Halo Annas,\n/);
  }
});

test("supports fully custom and empty drafts without fake send behavior", () => {
  const custom = buildContactEmailLinks({
    subject: "Custom subject",
    body: "Custom message",
  });
  const empty = buildContactEmailLinks({ subject: "", body: "" });

  assert.equal(new URL(custom.mailto).searchParams.get("subject"), "Custom subject");
  assert.equal(new URL(custom.mailto).searchParams.get("body"), "Custom message");
  assert.equal(new URL(custom.gmail).searchParams.get("su"), "Custom subject");
  assert.equal(new URL(custom.gmail).searchParams.get("body"), "Custom message");
  assert.equal(new URL(empty.mailto).searchParams.get("subject"), "");
  assert.equal(new URL(empty.mailto).searchParams.get("body"), "");
  assert.equal(new URL(empty.gmail).searchParams.get("su"), "");
  assert.equal(new URL(empty.gmail).searchParams.get("body"), "");

  assert.equal(buildContactMailto("Custom subject", "Custom message"), custom.mailto);
  assert.equal(buildContactGmailCompose("Custom subject", "Custom message"), custom.gmail);
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
    join(root, "src", "content", "site", "navigation.ts"),
    "utf8",
  );

  assert.match(page, /Contact \| Annas Tri Widagdo/);
  assert.match(page, /Kontak \| Annas Tri Widagdo/);
  assert.match(sitemap, /\/en\/contact/);
  assert.match(sitemap, /\/id\/contact/);
  assert.doesNotMatch(footer + navigation, /annastriw23@gmail\.com/);
  assert.doesNotMatch(footer, /Built with|All rights reserved|Hak cipta dilindungi/);
  assert.match(footer, /Drafted in grids, shipped in code\./);
  assert.match(footer, /BackToTop/);
});
