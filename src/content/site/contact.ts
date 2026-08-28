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
  linkedIn: "linkedin.com/in/annastriw",
  linkedInUrl: "https://www.linkedin.com/in/annastriw",
  gitHub: "github.com/annastriw",
  gitHubUrl: "https://github.com/annastriw",
  location: siteIdentity.location,
  timezone: siteIdentity.timezone,
  status: {
    en: "Open to Collaboration",
    id: "Terbuka untuk Kolaborasi",
  },
};

export const contactCopy = {
  en: {
    pageLabel: "[05 // CONTACT]",
    archiveTag: "TECHNICAL EDITORIAL ARCHIVE",
    title: "Open to Collaboration",
    intro:
      "Have a project, role, or technical inquiry in mind? Feel free to reach out directly through any channel or draft an email below.",
    channelsTitle: "Direct Channels",
    composerLabel: "[EMAIL DRAFT]",
    composerTitle: "Prepare an Email",
    composerIntro:
      "Select a template to start, or compose your own subject and message directly.",
    templateLegend: "Template",
    selectedTemplate: "Selected",
    subjectLabel: "Subject",
    subjectPlaceholder: "Add a concise subject",
    messageLabel: "Message",
    messagePlaceholder: "Write your message to Annas...",
    openGmail: "Open in Gmail",
    openEmailApp: "Open in Email App",
    clearDraft: "Clear draft",
    helper:
      "Drafts open directly in Gmail or your default email application. No messages are sent through this website.",
    externalCue: "opens in a new tab",
    gmailCue: "opens Gmail in a new tab",
    formLabel: "Email draft composer",
  },
  id: {
    pageLabel: "[05 // KONTAK]",
    archiveTag: "ARSIP TEKNIS & REKAYASA",
    title: "Terbuka untuk Kolaborasi",
    intro:
      "Punya tawaran project, peluang role kerja, atau ingin berdiskusi seputar software? Silakan hubungi langsung atau susun draf email di bawah.",
    channelsTitle: "Kanal Langsung",
    composerLabel: "[DRAF EMAIL]",
    composerTitle: "Siapkan Email",
    composerIntro:
      "Pilih template untuk mengisi draf, atau tulis subjek dan pesan Anda sendiri.",
    templateLegend: "Template",
    selectedTemplate: "Dipilih",
    subjectLabel: "Subjek",
    subjectPlaceholder: "Tulis subjek ringkas",
    messageLabel: "Pesan",
    messagePlaceholder: "Tulis pesan Anda untuk Annas...",
    openGmail: "Buka di Gmail",
    openEmailApp: "Buka di Aplikasi Email",
    clearDraft: "Kosongkan draf",
    helper:
      "Draf dibuka langsung di Gmail atau aplikasi email bawaan Anda. Website ini tidak mengirim email secara langsung.",
    externalCue: "dibuka di tab baru",
    gmailCue: "membuka Gmail di tab baru",
    formLabel: "Penyusun draf email",
  },
} satisfies Record<Locale, Record<string, string>>;

export const contactTemplates: Record<Locale, ContactTemplate[]> = {
  en: [
    {
      id: "project-collaboration",
      label: "Project Collaboration",
      subject: "Project Collaboration - [Project / Company]",
      message:
        "Hi Annas,\n\nI'd like to discuss a potential project collaboration regarding ...\n\nBest regards,\n[Name]",
    },
    {
      id: "job-opportunity",
      label: "Job Opportunity",
      subject: "Job Opportunity - [Role / Company]",
      message:
        "Hi Annas,\n\nI'm reaching out regarding a [Role] opportunity at [Company] ...\n\nBest regards,\n[Name]",
    },
    {
      id: "freelance-inquiry",
      label: "Freelance Inquiry",
      subject: "Freelance Inquiry - [Project / Company]",
      message:
        "Hi Annas,\n\nI'd like to ask about your availability for a freelance project regarding ...\n\nBest regards,\n[Name]",
    },
    {
      id: "general-conversation",
      label: "General Conversation",
      subject: "Technical Discussion - [Topic]",
      message:
        "Hi Annas,\n\nI came across your portfolio and would like to connect regarding ...\n\nBest regards,\n[Name]",
    },
  ],
  id: [
    {
      id: "project-collaboration",
      label: "Kolaborasi Project",
      subject: "Kolaborasi Project - [Project / Perusahaan]",
      message:
        "Halo Annas,\n\nSaya ingin membahas peluang kolaborasi project untuk ...\n\nSalam,\n[Nama]",
    },
    {
      id: "job-opportunity",
      label: "Peluang Role",
      subject: "Peluang Role - [Role / Perusahaan]",
      message:
        "Halo Annas,\n\nSaya menghubungi Anda terkait peluang role [Posisi] di [Perusahaan] ...\n\nSalam,\n[Nama]",
    },
    {
      id: "freelance-inquiry",
      label: "Tawaran Freelance",
      subject: "Inquiry Freelance - [Project / Perusahaan]",
      message:
        "Halo Annas,\n\nSaya ingin menanyakan ketersediaan Anda untuk freelance project terkait ...\n\nSalam,\n[Nama]",
    },
    {
      id: "general-conversation",
      label: "Diskusi Umum",
      subject: "Diskusi Teknis - [Topik]",
      message:
        "Halo Annas,\n\nSaya tertarik dengan portofolio Anda dan ingin berdiskusi mengenai ...\n\nSalam,\n[Nama]",
    },
  ],
};
