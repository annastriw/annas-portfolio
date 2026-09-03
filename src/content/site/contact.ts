import type { Locale } from "@/lib/i18n/config";
import { siteIdentity } from "./identity.ts";

export interface ContactInfo {
  email: string;
  emailUrl: string;
  gmailComposeUrl: string;
  linkedIn: string;
  linkedInUrl: string;
  gitHub: string;
  gitHubUrl: string;
  location: string;
  timezone: string;
  status: Record<Locale, string>;
}

export interface ContactEmailDraft {
  subject: string;
  body: string;
}

export type ContactTemplateId =
  | "project-collaboration"
  | "job-opportunity"
  | "freelance-inquiry"
  | "general-conversation";

export interface ContactTemplate {
  id: ContactTemplateId;
  label: string;
  subject: string;
  message: string;
}

const contactEmail = "annastriw6@gmail.com";
const gmailComposeBaseUrl = "https://mail.google.com/mail/";

function encodeEmailParams(entries: Record<string, string>): string {
  return new URLSearchParams(entries).toString().replace(/\+/g, "%20");
}

function buildEmailUrl(baseUrl: string, params: Record<string, string>): string {
  const url = new URL(baseUrl);
  url.search = encodeEmailParams(params);
  return url.href;
}

export function buildContactMailto(subject: string, message: string): string {
  return buildEmailUrl(`mailto:${contactEmail}`, {
    subject,
    body: message,
  });
}

export function buildContactGmailCompose(
  subject: string,
  message: string,
): string {
  return buildEmailUrl(gmailComposeBaseUrl, {
    view: "cm",
    fs: "1",
    to: contactEmail,
    su: subject,
    body: message,
  });
}

export function buildContactEmailLinks({
  subject,
  body,
}: ContactEmailDraft): { gmail: string; mailto: string } {
  return {
    gmail: buildContactGmailCompose(subject, body),
    mailto: buildContactMailto(subject, body),
  };
}

export const siteContact: ContactInfo = {
  email: contactEmail,
  emailUrl: `mailto:${contactEmail}`,
  gmailComposeUrl: buildEmailUrl(gmailComposeBaseUrl, {
    view: "cm",
    fs: "1",
    to: contactEmail,
  }),
  linkedIn: "linkedin.com/in/annastriwidagdo",
  linkedInUrl: "https://www.linkedin.com/in/annastriwidagdo",
  gitHub: "github.com/annastriw",
  gitHubUrl: "https://github.com/annastriw",
  location: siteIdentity.location,
  timezone: siteIdentity.timezone,
  status: {
    en: "Open to Collaboration",
    id: "Terbuka untuk Kolaborasi",
  },
};

export interface ContactDialogCopy {
  replaceTitle: string;
  replaceDescription: string;
  replaceConfirm: string;
  clearTitle: string;
  clearDescription: string;
  clearConfirm: string;
  cancel: string;
  tag: string;
}

export interface ContactCopy {
  pageLabel: string;
  archiveTag: string;
  title: string;
  intro: string;
  channelsTitle: string;
  channelsIntro: string;
  composerLabel: string;
  composerTitle: string;
  composerIntro: string;
  templateLegend: string;
  templateHint: string;
  selectedTemplate: string;
  subjectLabel: string;
  subjectPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  openGmail: string;
  openEmailApp: string;
  clearDraft: string;
  helper: string;
  externalCue: string;
  gmailCue: string;
  formLabel: string;
  dialogs: ContactDialogCopy;
}

export const contactCopy: Record<Locale, ContactCopy> = {
  en: {
    pageLabel: "[05 // CONTACT]",
    archiveTag: "TECHNICAL EDITORIAL ARCHIVE",
    title: "Open to Collaboration",
    intro:
      "Have a job opportunity, a project in mind, or something technical to discuss? Let’s start a conversation.",
    channelsTitle: "Get in Touch",
    channelsIntro:
      "Reach me by email or connect with me on LinkedIn and GitHub.",
    composerLabel: "[EMAIL DRAFT]",
    composerTitle: "Prepare an Email",
    composerIntro:
      "Choose a template or write your own email.",
    templateLegend: "Template",
    templateHint:
      "Choose a template to get started, or write your own message.",
    selectedTemplate: "Selected",
    subjectLabel: "Subject",
    subjectPlaceholder: "Add a concise subject",
    messageLabel: "Message",
    messagePlaceholder: "Write your message to Annas...",
    openGmail: "Open in Gmail",
    openEmailApp: "Open in Email App",
    clearDraft: "Clear draft",
    helper:
      "Your message opens in Gmail or your email app. You’ll review and send it there.",
    externalCue: "opens in a new tab",
    gmailCue: "opens Gmail in a new tab",
    formLabel: "Email draft composer",
    dialogs: {
      replaceTitle: "Replace draft?",
      replaceDescription:
        "Your current edits will be replaced with the selected template.",
      replaceConfirm: "Replace",
      clearTitle: "Clear draft?",
      clearDescription: "Your current edits will be cleared from the composer.",
      clearConfirm: "Clear",
      cancel: "Cancel",
      tag: "[CONFIRMATION // 01]",
    },
  },
  id: {
    pageLabel: "[05 // KONTAK]",
    archiveTag: "ARSIP TEKNIS & REKAYASA",
    title: "Terbuka untuk Kolaborasi",
    intro:
      "Punya peluang kerja, rencana project, atau topik teknologi yang ingin dibahas? Mari berdiskusi.",
    channelsTitle: "Hubungi Saya",
    channelsIntro:
      "Hubungi saya melalui email atau terhubung dengan saya di LinkedIn dan GitHub.",
    composerLabel: "[DRAF EMAIL]",
    composerTitle: "Siapkan Email",
    composerIntro:
      "Pilih template atau tulis email Anda sendiri.",
    templateLegend: "Template",
    templateHint:
      "Pilih template sebagai awal, atau tulis pesan Anda sendiri.",
    selectedTemplate: "Dipilih",
    subjectLabel: "Subjek",
    subjectPlaceholder: "Tulis subjek ringkas",
    messageLabel: "Pesan",
    messagePlaceholder: "Tulis pesan Anda untuk Annas...",
    openGmail: "Buka di Gmail",
    openEmailApp: "Buka di Aplikasi Email",
    clearDraft: "Kosongkan draf",
    helper:
      "Pesan akan dibuka di Gmail atau aplikasi email Anda. Periksa dan kirim dari sana.",
    externalCue: "dibuka di tab baru",
    gmailCue: "membuka Gmail di tab baru",
    formLabel: "Penyusun draf email",
    dialogs: {
      replaceTitle: "Ganti draf?",
      replaceDescription:
        "Perubahan yang sudah Anda buat akan diganti dengan template yang dipilih.",
      replaceConfirm: "Ganti",
      clearTitle: "Kosongkan draf?",
      clearDescription:
        "Perubahan yang sudah Anda buat akan dikosongkan dari penyusun pesan.",
      clearConfirm: "Kosongkan",
      cancel: "Batal",
      tag: "[KONFIRMASI // 01]",
    },
  },
};

export const contactTemplates: Record<Locale, ContactTemplate[]> = {
  en: [
    {
      id: "project-collaboration",
      label: "Project Collaboration",
      subject: "Project Collaboration — [Project / Company]",
      message:
        "Hi Annas,\n\nI’d like to discuss a collaboration on [project]. The project involves [brief description]. Would you be available to discuss it?\n\nBest regards,\n[Name]",
    },
    {
      id: "job-opportunity",
      label: "Job Opportunity",
      subject: "Job Opportunity — [Position / Company]",
      message:
        "Hi Annas,\n\nWe have an opening for [position] at [company]. Your experience caught our attention, and we’d like to discuss the opportunity with you.\n\nBest regards,\n[Name]",
    },
    {
      id: "freelance-inquiry",
      label: "Freelance Inquiry",
      subject: "Freelance Inquiry — [Project / Company]",
      message:
        "Hi Annas,\n\nI’m looking for help with [project or task]. The scope includes [brief description], with a target timeline of [timeline]. Are you available for freelance work?\n\nBest regards,\n[Name]",
    },
    {
      id: "general-conversation",
      label: "General Conversation",
      subject: "General Conversation — [Topic]",
      message:
        "Hi Annas,\n\nI came across your portfolio and would like to discuss [topic] with you.\n\nBest regards,\n[Name]",
    },
  ],
  id: [
    {
      id: "project-collaboration",
      label: "Kolaborasi Project",
      subject: "Kolaborasi Project — [Project / Perusahaan]",
      message:
        "Halo Annas,\n\nSaya ingin membahas kolaborasi untuk [project]. Project ini berkaitan dengan [deskripsi singkat]. Apakah Anda bersedia berdiskusi lebih lanjut?\n\nSalam,\n[Nama]",
    },
    {
      id: "job-opportunity",
      label: "Peluang Kerja",
      subject: "Peluang Kerja — [Posisi / Perusahaan]",
      message:
        "Halo Annas,\n\nKami sedang membuka posisi [posisi] di [perusahaan]. Kami tertarik dengan pengalaman Anda dan ingin membahas peluang ini lebih lanjut.\n\nSalam,\n[Nama]",
    },
    {
      id: "freelance-inquiry",
      label: "Tawaran Freelance",
      subject: "Tawaran Freelance — [Project / Perusahaan]",
      message:
        "Halo Annas,\n\nSaya membutuhkan bantuan untuk [project atau pekerjaan]. Lingkupnya mencakup [deskripsi singkat], dengan target pengerjaan [waktu]. Apakah Anda tersedia untuk pekerjaan freelance?\n\nSalam,\n[Nama]",
    },
    {
      id: "general-conversation",
      label: "Diskusi Umum",
      subject: "Diskusi Umum — [Topik]",
      message:
        "Halo Annas,\n\nSaya menemukan portfolio Anda dan ingin berdiskusi tentang [topik].\n\nSalam,\n[Nama]",
    },
  ],
};
