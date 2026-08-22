import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: "normal",
  display: "swap",
  variable: "--font-geist-sans",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-instrument-serif",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://annastriwidagdo.me"),
  title: {
    default: "Annas Tri Widagdo — Software Engineer & AI Practitioner",
    template: "%s",
  },
  description:
    "Technical editorial portfolio of Annas Tri Widagdo, software engineer and AI practitioner building robust web systems, intelligent products, and deterministic architectures.",
  authors: [{ name: "Annas Tri Widagdo", url: "https://annastriwidagdo.me" }],
  creator: "Annas Tri Widagdo",
  publisher: "Annas Tri Widagdo",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["id_ID"],
    url: "https://annastriwidagdo.me",
    siteName: "Annas Tri Widagdo Portfolio",
    title: "Annas Tri Widagdo — Software Engineer & AI Practitioner",
    description:
      "Technical editorial portfolio of Annas Tri Widagdo, software engineer and AI practitioner.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Annas Tri Widagdo — Software Engineer & AI Practitioner",
    description:
      "Technical editorial portfolio of Annas Tri Widagdo, software engineer and AI practitioner.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      className={`${geistSans.variable} ${instrumentSerif.variable} ${geistMono.variable}`}
      lang="en"
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
