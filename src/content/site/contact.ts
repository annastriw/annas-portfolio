import type { Locale } from "@/lib/i18n/config";

export interface ContactInfo {
  email: string;
  emailUrl: string;
  linkedIn: string;
  linkedInUrl: string;
  gitHub: string;
  gitHubUrl: string;
  location: string;
  timezone: string;
  status: Record<Locale, string>;
  colophon: Record<
    Locale,
    {
      title: string;
      positioning: string;
      location: string;
      timezone: string;
      copyright: string;
    }
  >;
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

export const siteContact: ContactInfo = {
  email: "annastriw6@gmail.com",
  emailUrl: "mailto:annastriw6@gmail.com",
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
  colophon: {
    en: {
      title: "Annas Tri Widagdo",
      positioning: "Software Engineer · Full-Stack Developer · Machine Learning Engineer",
      location: "Klaten, Central Java, Indonesia",
      timezone: "UTC+7",
      copyright: "© 2026 Annas Tri Widagdo. All rights reserved.",
    },
    id: {
      title: "Annas Tri Widagdo",
      positioning: "Software Engineer · Full-Stack Developer · Machine Learning Engineer",
      location: "Klaten, Jawa Tengah, Indonesia",
      timezone: "WIB (UTC+7)",
      copyright: "© 2026 Annas Tri Widagdo. Hak cipta dilindungi.",
    },
  },
};

export const contactCopy = {
  en: {
    pageLabel: "[CONTACT]",
    title: "Open to Collaboration",
    intro:
      "Have a project, role, or technical opportunity in mind? Feel free to reach out.",
    channelsTitle: "Contact channels",
    composerLabel: "[EMAIL COMPOSER]",
    composerTitle: "Prepare your email",
    composerIntro: "Choose a starting point, then edit every field.",
    templateLegend: "Choose a template",
    selectedTemplate: "Selected",
    subjectLabel: "Subject",
    subjectPlaceholder: "Add a concise subject",
    messageLabel: "Message",
    messagePlaceholder: "Write your message to Annas",
    openEmailClient: "Open in Email Client",
    clearDraft: "Clear draft",
    helper:
      "This opens your default email application. The website does not send the message directly.",
    externalCue: "opens in a new tab",
    formLabel: "Email draft composer",
  },
  id: {
    pageLabel: "[KONTAK]",
    title: "Terbuka untuk Kolaborasi",
    intro:
      "Punya proyek, peluang kerja, atau ingin berdiskusi tentang pengembangan software? Silakan hubungi saya.",
    channelsTitle: "Kanal kontak",
    composerLabel: "[PENYUSUN EMAIL]",
    composerTitle: "Siapkan email Anda",
    composerIntro: "Pilih draf awal, lalu sesuaikan seluruh isinya.",
    templateLegend: "Pilih templat",
    selectedTemplate: "Dipilih",
    subjectLabel: "Subjek",
    subjectPlaceholder: "Tulis subjek singkat",
    messageLabel: "Pesan",
    messagePlaceholder: "Tulis pesan Anda untuk Annas",
    openEmailClient: "Buka di Aplikasi Email",
    clearDraft: "Kosongkan draf",
    helper:
      "Tombol ini membuka aplikasi email Anda. Pesan tidak dikirim langsung melalui website.",
    externalCue: "dibuka di tab baru",
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

export function buildContactMailto(subject: string, message: string): string {
  const params = new URLSearchParams({ subject, body: message });
  const encodedQuery = params.toString().replace(/\+/g, "%20");
  const mailto = new URL(siteContact.emailUrl);

  mailto.search = encodedQuery;
  return mailto.href;
}
