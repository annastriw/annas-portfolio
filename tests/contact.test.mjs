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

test("uses only the verified public contact channels with corrected LinkedIn URL", () => {
  assert.equal(siteContact.email, "annastriw6@gmail.com");
  assert.equal(siteContact.emailUrl, "mailto:annastriw6@gmail.com");
  assert.equal(
    siteContact.gmailComposeUrl,
    "https://mail.google.com/mail/?view=cm&fs=1&to=annastriw6%40gmail.com",
  );
  assert.equal(siteContact.linkedIn, "linkedin.com/in/annastriwidagdo");
  assert.equal(
    siteContact.linkedInUrl,
    "https://www.linkedin.com/in/annastriwidagdo",
  );
  assert.equal(siteContact.gitHub, "github.com/annastriw");
  assert.equal(siteContact.gitHubUrl, "https://github.com/annastriw");
});

test("matches approved Contact opening, section, and helper copy in both locales", () => {
  // English exact copy
  assert.equal(contactCopy.en.pageLabel, "[05 // CONTACT]");
  assert.equal(contactCopy.en.title, "Open to Collaboration");
  assert.equal(
    contactCopy.en.intro,
    "Have a job opportunity, a project in mind, or something technical to discuss? Let’s start a conversation.",
  );
  assert.equal(contactCopy.en.channelsTitle, "Get in Touch");
  assert.equal(
    contactCopy.en.channelsIntro,
    "Reach me by email or connect with me on LinkedIn and GitHub.",
  );
  assert.equal(contactCopy.en.composerTitle, "Prepare an Email");
  assert.equal(
    contactCopy.en.composerIntro,
    "Choose a template or write your own email.",
  );
  assert.equal(
    contactCopy.en.templateHint,
    "Choose a template to get started, or write your own message.",
  );
  assert.equal(
    contactCopy.en.helper,
    "Your message opens in Gmail or your email app. You’ll review and send it there.",
  );
  assert.equal(contactCopy.en.openGmail, "Open in Gmail");
  assert.equal(contactCopy.en.openEmailApp, "Open in Email App");
  assert.equal(contactCopy.en.clearDraft, "Clear draft");

  // Indonesian exact copy
  assert.equal(contactCopy.id.pageLabel, "[05 // KONTAK]");
  assert.equal(contactCopy.id.title, "Terbuka untuk Kolaborasi");
  assert.equal(
    contactCopy.id.intro,
    "Punya peluang kerja, rencana project, atau topik teknologi yang ingin dibahas? Mari berdiskusi.",
  );
  assert.equal(contactCopy.id.channelsTitle, "Hubungi Saya");
  assert.equal(
    contactCopy.id.channelsIntro,
    "Hubungi saya melalui email atau terhubung dengan saya di LinkedIn dan GitHub.",
  );
  assert.equal(contactCopy.id.composerTitle, "Siapkan Email");
  assert.equal(
    contactCopy.id.composerIntro,
    "Pilih template atau tulis email Anda sendiri.",
  );
  assert.equal(
    contactCopy.id.templateHint,
    "Pilih template sebagai awal, atau tulis pesan Anda sendiri.",
  );
  assert.equal(
    contactCopy.id.helper,
    "Pesan akan dibuka di Gmail atau aplikasi email Anda. Periksa dan kirim dari sana.",
  );
  assert.equal(contactCopy.id.openGmail, "Buka di Gmail");
  assert.equal(contactCopy.id.openEmailApp, "Buka di Aplikasi Email");
  assert.equal(contactCopy.id.clearDraft, "Kosongkan draf");
});

test("provides four exact editable draft templates matching decision section 8 in both locales", () => {
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
    }
  }

  // Template 01: Project Collaboration
  const t1En = contactTemplates.en.find((t) => t.id === "project-collaboration");
  assert.equal(t1En?.label, "Project Collaboration");
  assert.equal(t1En?.subject, "Project Collaboration — [Project / Company]");
  assert.equal(
    t1En?.message,
    "Hi Annas,\n\nI’d like to discuss a collaboration on [project]. The project involves [brief description]. Would you be available to discuss it?\n\nBest regards,\n[Name]",
  );

  const t1Id = contactTemplates.id.find((t) => t.id === "project-collaboration");
  assert.equal(t1Id?.label, "Kolaborasi Project");
  assert.equal(t1Id?.subject, "Kolaborasi Project — [Project / Perusahaan]");
  assert.equal(
    t1Id?.message,
    "Halo Annas,\n\nSaya ingin membahas kolaborasi untuk [project]. Project ini berkaitan dengan [deskripsi singkat]. Apakah Anda bersedia berdiskusi lebih lanjut?\n\nSalam,\n[Nama]",
  );

  // Template 02: Job Opportunity
  const t2En = contactTemplates.en.find((t) => t.id === "job-opportunity");
  assert.equal(t2En?.label, "Job Opportunity");
  assert.equal(t2En?.subject, "Job Opportunity — [Position / Company]");
  assert.equal(
    t2En?.message,
    "Hi Annas,\n\nWe have an opening for [position] at [company]. Your experience caught our attention, and we’d like to discuss the opportunity with you.\n\nBest regards,\n[Name]",
  );

  const t2Id = contactTemplates.id.find((t) => t.id === "job-opportunity");
  assert.equal(t2Id?.label, "Peluang Kerja");
  assert.equal(t2Id?.subject, "Peluang Kerja — [Posisi / Perusahaan]");
  assert.equal(
    t2Id?.message,
    "Halo Annas,\n\nKami sedang membuka posisi [posisi] di [perusahaan]. Kami tertarik dengan pengalaman Anda dan ingin membahas peluang ini lebih lanjut.\n\nSalam,\n[Nama]",
  );

  // Template 03: Freelance Inquiry
  const t3En = contactTemplates.en.find((t) => t.id === "freelance-inquiry");
  assert.equal(t3En?.label, "Freelance Inquiry");
  assert.equal(t3En?.subject, "Freelance Inquiry — [Project / Company]");
  assert.equal(
    t3En?.message,
    "Hi Annas,\n\nI’m looking for help with [project or task]. The scope includes [brief description], with a target timeline of [timeline]. Are you available for freelance work?\n\nBest regards,\n[Name]",
  );

  const t3Id = contactTemplates.id.find((t) => t.id === "freelance-inquiry");
  assert.equal(t3Id?.label, "Tawaran Freelance");
  assert.equal(t3Id?.subject, "Tawaran Freelance — [Project / Perusahaan]");
  assert.equal(
    t3Id?.message,
    "Halo Annas,\n\nSaya membutuhkan bantuan untuk [project atau pekerjaan]. Lingkupnya mencakup [deskripsi singkat], dengan target pengerjaan [waktu]. Apakah Anda tersedia untuk pekerjaan freelance?\n\nSalam,\n[Nama]",
  );

  // Template 04: General Conversation
  const t4En = contactTemplates.en.find((t) => t.id === "general-conversation");
  assert.equal(t4En?.label, "General Conversation");
  assert.equal(t4En?.subject, "General Conversation — [Topic]");
  assert.equal(
    t4En?.message,
    "Hi Annas,\n\nI came across your portfolio and would like to discuss [topic] with you.\n\nBest regards,\n[Name]",
  );

  const t4Id = contactTemplates.id.find((t) => t.id === "general-conversation");
  assert.equal(t4Id?.label, "Diskusi Umum");
  assert.equal(t4Id?.subject, "Diskusi Umum — [Topik]");
  assert.equal(
    t4Id?.message,
    "Halo Annas,\n\nSaya menemukan portfolio Anda dan ingin berdiskusi tentang [topik].\n\nSalam,\n[Nama]",
  );
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

test("Contact confirmation dialog copy matches approved Section 3 labels and concise consequence copy in both locales", () => {
  // English Dialogs
  assert.equal(contactCopy.en.dialogs.replaceTitle, "Replace draft?");
  assert.equal(
    contactCopy.en.dialogs.replaceDescription,
    "Your current edits will be replaced with the selected template.",
  );
  assert.equal(contactCopy.en.dialogs.replaceConfirm, "Replace");
  assert.equal(contactCopy.en.dialogs.clearTitle, "Clear draft?");
  assert.equal(
    contactCopy.en.dialogs.clearDescription,
    "Your current edits will be cleared from the composer.",
  );
  assert.equal(contactCopy.en.dialogs.clearConfirm, "Clear");
  assert.equal(contactCopy.en.dialogs.cancel, "Cancel");
  assert.equal(contactCopy.en.dialogs.tag, "[CONFIRMATION // 01]");

  // Indonesian Dialogs
  assert.equal(contactCopy.id.dialogs.replaceTitle, "Ganti draf?");
  assert.equal(
    contactCopy.id.dialogs.replaceDescription,
    "Perubahan yang sudah Anda buat akan diganti dengan template yang dipilih.",
  );
  assert.equal(contactCopy.id.dialogs.replaceConfirm, "Ganti");
  assert.equal(contactCopy.id.dialogs.clearTitle, "Kosongkan draf?");
  assert.equal(
    contactCopy.id.dialogs.clearDescription,
    "Perubahan yang sudah Anda buat akan dikosongkan dari penyusun pesan.",
  );
  assert.equal(contactCopy.id.dialogs.clearConfirm, "Kosongkan");
  assert.equal(contactCopy.id.dialogs.cancel, "Batal");
  assert.equal(contactCopy.id.dialogs.tag, "[KONFIRMASI // 01]");
});

test("ContactDraftStore: verifies draft state transitions, protection, and baseline resets", async () => {
  const {
    getDraftState,
    updateDraftFields,
    applyTemplateToDraft,
    clearDraftState,
    resetContactSession,
    isDraftEdited,
    syncContactRoute,
  } = await import("../src/components/contact/contact-draft-store.ts");

  // 1. Initial fresh state
  resetContactSession();
  let state = getDraftState();
  assert.equal(state.subject, "");
  assert.equal(state.message, "");
  assert.equal(state.selectedTemplate, null);
  assert.equal(state.baselineSubject, "");
  assert.equal(state.baselineMessage, "");
  assert.equal(isDraftEdited(state), false);

  // 2. Select template on empty state establishes baseline without being dirty
  const tJobEn = contactTemplates.en.find((t) => t.id === "job-opportunity");
  assert.ok(tJobEn);
  applyTemplateToDraft(tJobEn);
  state = getDraftState();
  assert.equal(state.subject, tJobEn.subject);
  assert.equal(state.message, tJobEn.message);
  assert.equal(state.selectedTemplate, "job-opportunity");
  assert.equal(state.baselineSubject, tJobEn.subject);
  assert.equal(state.baselineMessage, tJobEn.message);
  assert.equal(isDraftEdited(state), false);

  // 3. Switch to another template while untouched establishes new baseline directly
  const tFreeEn = contactTemplates.en.find((t) => t.id === "freelance-inquiry");
  assert.ok(tFreeEn);
  applyTemplateToDraft(tFreeEn);
  state = getDraftState();
  assert.equal(state.subject, tFreeEn.subject);
  assert.equal(state.message, tFreeEn.message);
  assert.equal(state.selectedTemplate, "freelance-inquiry");
  assert.equal(state.baselineSubject, tFreeEn.subject);
  assert.equal(state.baselineMessage, tFreeEn.message);
  assert.equal(isDraftEdited(state), false);

  // 4. Subject-only edit triggers dirty protection
  updateDraftFields("Freelance Inquiry — Custom Co", state.message);
  state = getDraftState();
  assert.equal(isDraftEdited(state), true);

  // Reverting subject back to baseline clears dirty state
  updateDraftFields(state.baselineSubject, state.message);
  state = getDraftState();
  assert.equal(isDraftEdited(state), false);

  // 5. Body-only edit triggers dirty protection
  updateDraftFields(state.subject, "Hi Annas,\n\nCustom edited body text.");
  state = getDraftState();
  assert.equal(isDraftEdited(state), true);

  // 6. Direct typing without a template triggers dirty protection
  resetContactSession();
  updateDraftFields("Custom un-templated subject", "Custom message");
  state = getDraftState();
  assert.equal(state.selectedTemplate, null);
  assert.equal(state.baselineSubject, "");
  assert.equal(state.baselineMessage, "");
  assert.equal(isDraftEdited(state), true);

  // 7. Confirmed replacement applies new template and resets baseline
  const tProjId = contactTemplates.id.find((t) => t.id === "project-collaboration");
  assert.ok(tProjId);
  applyTemplateToDraft(tProjId);
  state = getDraftState();
  assert.equal(state.subject, tProjId.subject);
  assert.equal(state.message, tProjId.message);
  assert.equal(state.selectedTemplate, "project-collaboration");
  assert.equal(state.baselineSubject, tProjId.subject);
  assert.equal(state.baselineMessage, tProjId.message);
  assert.equal(isDraftEdited(state), false);

  // 8. Confirmed clear empties fields, resets selection, and resets baseline
  clearDraftState();
  state = getDraftState();
  assert.equal(state.subject, "");
  assert.equal(state.message, "");
  assert.equal(state.selectedTemplate, null);
  assert.equal(state.baselineSubject, "");
  assert.equal(state.baselineMessage, "");
  assert.equal(isDraftEdited(state), false);

  // 9. Preserves draft across locale transitions without persistent storage
  const customDraft = {
    subject: "Collaboration query in English",
    message: "Hello Annas,\n\nI want to discuss a software project.",
  };
  updateDraftFields(customDraft.subject, customDraft.message);

  // Simulate EN -> ID transition: pathname is /id/contact
  syncContactRoute("/id/contact");
  state = getDraftState();
  assert.equal(state.subject, customDraft.subject);
  assert.equal(state.message, customDraft.message);
  assert.equal(isDraftEdited(state), true);

  // Simulate ID -> EN transition: pathname is /en/contact
  syncContactRoute("/en/contact");
  state = getDraftState();
  assert.equal(state.subject, customDraft.subject);
  assert.equal(state.message, customDraft.message);

  // 10. Navigating away from Contact cleans up draft memory for future visits
  syncContactRoute("/en/projects");
  state = getDraftState();
  assert.equal(state.subject, "");
  assert.equal(state.message, "");
  assert.equal(state.selectedTemplate, null);
  assert.equal(isDraftEdited(state), false);

  resetContactSession();
});

test("ContactConfirmationDialog component satisfies accessible modal, keyboard trap, and portal requirements", () => {
  const dialogFile = readFileSync(
    join(root, "src", "components", "contact", "contact-confirmation-dialog.tsx"),
    "utf8",
  );
  const composerFile = readFileSync(
    join(root, "src", "components", "contact", "email-composer.tsx"),
    "utf8",
  );
  const cssFile = readFileSync(
    join(root, "src", "components", "contact", "contact.module.css"),
    "utf8",
  );

  // Dialog uses React portal to document.body for viewport-level centering
  assert.match(dialogFile, /createPortal/);
  assert.match(dialogFile, /document\.body/);
  assert.match(dialogFile, /role="dialog"/);
  assert.match(dialogFile, /aria-modal="true"/);
  assert.match(dialogFile, /aria-labelledby="contact-dialog-title"/);
  assert.match(dialogFile, /aria-describedby="contact-dialog-desc"/);

  // Focus management: initial focus on Cancel, Escape key dismisses, focus trap
  assert.match(dialogFile, /cancelBtnRef\.current\?\.focus\(\)/);
  assert.match(dialogFile, /event\.key === "Escape"/);
  assert.match(dialogFile, /event\.key === "Tab"/);
  assert.match(dialogFile, /document\.body\.style\.overflow = "hidden"/);

  // Composer wires confirmation for replace and clear when edited
  assert.match(composerFile, /useContactDraftStore/);
  assert.match(composerFile, /ContactConfirmationDialog/);
  assert.match(composerFile, /setDialogState\("replace"\)/);
  assert.match(composerFile, /setDialogState\("clear"\)/);

  // CSS module provides viewport modal styling and reduced motion
  assert.match(cssFile, /\.dialogOverlay/);
  assert.match(cssFile, /\.dialogContent/);
  assert.match(cssFile, /\.dialogCancelBtn/);
  assert.match(cssFile, /\.dialogConfirmBtn/);
  assert.match(cssFile, /prefers-reduced-motion: reduce/);
});

test("ContactChannels renders direct links with fixed Gmail compose destination and no copy button UI", () => {
  const channelsFile = readFileSync(
    join(root, "src", "components", "contact", "contact-channels.tsx"),
    "utf8",
  );

  // Email link targets Gmail compose in new tab; no clipboard or copy button
  assert.doesNotMatch(channelsFile, /handleCopyEmail/);
  assert.doesNotMatch(channelsFile, /navigator\.clipboard/);
  assert.doesNotMatch(channelsFile, /copyButton/);
  assert.doesNotMatch(channelsFile, /Copy email|Salin email/);
  assert.match(channelsFile, /channelsTitle/);
  assert.match(channelsFile, /channelsIntro/);
  assert.match(channelsFile, /siteContact\.gmailComposeUrl/);
  assert.match(channelsFile, /target="_blank"/);
  assert.match(channelsFile, /rel="noopener noreferrer"/);
});

test("EmailComposer implements template hint, initial empty state, template selection, and dual opening actions", () => {
  const composerFile = readFileSync(
    join(root, "src", "components", "contact", "email-composer.tsx"),
    "utf8",
  );

  // Template hint is non-interactive, associated with fieldset via aria-describedby
  assert.match(composerFile, /templateHint/);
  assert.match(composerFile, /aria-describedby=\{`contact-template-hint-\$\{locale\}`\}/);
  assert.match(composerFile, /id=\{`contact-template-hint-\$\{locale\}`\}/);
  assert.match(composerFile, /<svg[^>]*aria-hidden="true"/);

  // Composer state and draft action integration
  assert.match(composerFile, /useContactDraftStore/);
  assert.match(composerFile, /clearDraft/);
  assert.match(composerFile, /copy\.helper/);
  assert.match(composerFile, /href=\{emailLinks\.gmail\}/);
  assert.match(composerFile, /href=\{emailLinks\.mailto\}/);
});

test("Contact styles implement matching section dividers and wide-layout header alignment", () => {
  const cssFile = readFileSync(
    join(root, "src", "components", "contact", "contact.module.css"),
    "utf8",
  );

  // Both columns have matching border-top dividers, with templateSection providing dedicated full-width rule
  assert.match(cssFile, /\.channelList\s*\{[^}]*border-top:\s*1px solid var\(--border\)/);
  assert.match(cssFile, /\.templateSection\s*\{[^}]*border-top:\s*1px solid var\(--border\)/);
  assert.match(cssFile, /\.fieldGroup\s*\{[^}]*border-top:\s*1px solid var\(--border\)/);
  assert.doesNotMatch(cssFile, /\.templateFieldset\s*\{[^}]*border-top/);

  // Wide layout min-height alignment for headers at min-width: 64rem
  assert.match(cssFile, /@media\s*\(min-width:\s*64rem\)\s*\{[\s\S]*?\.channelsHeader,\s*\n?\.composerHeader\s*\{[\s\S]*?min-height:/);
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
