import type { Locale } from "@/lib/i18n/config";

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
  location: "Klaten, Central Java, Indonesia",
  timezone: "Asia/Jakarta (UTC+7)",
  status: {
    en: "OPEN TO COLLABORATION",
    id: "TERBUKA UNTUK KOLABORASI",
  },
};

export const contactCopy = {
  en: {
    pageLabel: "[CONTACT // 01]",
    title: "Open to Collaboration",
    intro:
      "Have a project, role, or technical opportunity in mind? Feel free to reach out.",
    channelsTitle: "Direct channels",
    composerLabel: "CORRESPONDENCE / DRAFT",
    composerTitle: "Prepare an email",
    composerIntro: "Choose a template, then edit the subject and message.",
    templateLegend: "Template",
    selectedTemplate: "Selected",
    subjectLabel: "Subject",
    subjectPlaceholder: "Add a concise subject",
    messageLabel: "Message",
    messagePlaceholder: "Write your message to Annas",
    openGmail: "Open in Gmail",
    openEmailApp: "Open in Email App",
    clearDraft: "Clear draft",
    helper: "Choose Gmail or your default email application to continue with this draft.",
    externalCue: "opens in a new tab",
    gmailCue: "opens Gmail in a new tab",
    formLabel: "Email draft composer",
  },
  id: {
    pageLabel: "[KONTAK // 01]",
    title: "Terbuka untuk Kolaborasi",
    intro:
      "Punya proyek, peluang kerja, atau ingin berdiskusi tentang pengembangan software? Silakan hubungi saya.",
    channelsTitle: "Kanal kontak langsung",
    composerLabel: "KORESPONDENSI / DRAF",
    composerTitle: "Siapkan email",
    composerIntro: "Pilih templat, lalu sesuaikan subjek dan pesan.",
    templateLegend: "Templat",
    selectedTemplate: "Dipilih",
    subjectLabel: "Subjek",
    subjectPlaceholder: "Tulis subjek singkat",
    messageLabel: "Pesan",
    messagePlaceholder: "Tulis pesan Anda untuk Annas",
    openGmail: "Buka di Gmail",
    openEmailApp: "Buka di Aplikasi Email",
    clearDraft: "Kosongkan draf",
    helper: "Lanjutkan draf melalui Gmail atau aplikasi email bawaan Anda.",
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
        "Hi Annas,\n\nI'd like to discuss a potential project involving ...\n\nBest,\n[Name]",
    },
    {
      id: "job-opportunity",
      label: "Job Opportunity",
      subject: "Job Opportunity - [Role / Company]",
      message:
        "Hi Annas,\n\nI'm reaching out regarding a potential [Role] opportunity at ...\n\nBest,\n[Name]",
    },
    {
      id: "freelance-inquiry",
      label: "Freelance Inquiry",
      subject: "Freelance Inquiry - [Project / Company]",
      message:
        "Hi Annas,\n\nI'd like to ask about your availability for a freelance project involving ...\n\nBest,\n[Name]",
    },
    {
      id: "general-conversation",
      label: "General Conversation",
      subject: "Conversation - [Topic]",
      message:
        "Hi Annas,\n\nI'd like to start a conversation about ...\n\nBest,\n[Name]",
    },
  ],
  id: [
    {
      id: "project-collaboration",
      label: "Kolaborasi Proyek",
      subject: "Kolaborasi Proyek - [Proyek / Perusahaan]",
      message:
        "Halo Annas,\n\nSaya ingin membahas peluang kolaborasi untuk proyek ...\n\nSalam,\n[Nama]",
    },
    {
      id: "job-opportunity",
      label: "Peluang Kerja",
      subject: "Peluang Kerja - [Peran / Perusahaan]",
      message:
        "Halo Annas,\n\nSaya menghubungi Anda terkait peluang [Peran] di ...\n\nSalam,\n[Nama]",
    },
    {
      id: "freelance-inquiry",
      label: "Tawaran Freelance",
      subject: "Tawaran Freelance - [Proyek / Perusahaan]",
      message:
        "Halo Annas,\n\nSaya ingin menanyakan ketersediaan Anda untuk proyek freelance tentang ...\n\nSalam,\n[Nama]",
    },
    {
      id: "general-conversation",
      label: "Diskusi Umum",
      subject: "Diskusi - [Topik]",
      message:
        "Halo Annas,\n\nSaya ingin berdiskusi tentang ...\n\nSalam,\n[Nama]",
    },
  ],
};
