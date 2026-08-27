import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
  weight: ["400", "500", "600"],
  style: "normal",
  display: "swap",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://annastriwidagdo.me"),
  title: {
    default: "Annas Tri Widagdo - Software Engineer",
    template: "%s",
  },
  description:
    "Technical editorial archive of Annas Tri Widagdo. Fullstack web applications, machine learning integration, and robust software architectures grounded in verified implementation evidence.",
  authors: [{ name: "Annas Tri Widagdo", url: "https://annastriwidagdo.me" }],
  creator: "Annas Tri Widagdo",
  publisher: "Annas Tri Widagdo",
  icons: {
    icon: [
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon.png", sizes: "64x64", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
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
    title: "Annas Tri Widagdo - Software Engineer",
    description:
      "Technical editorial archive of Annas Tri Widagdo. Fullstack web applications, machine learning integration, and robust software architectures grounded in verified implementation evidence.",
    images: [
      {
        url: "/assets/me/pas-foto.webp",
        width: 800,
        height: 1067,
        alt: "Annas Tri Widagdo - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Annas Tri Widagdo - Software Engineer",
    description:
      "Technical editorial archive of Annas Tri Widagdo. Fullstack web applications, machine learning integration, and robust software architectures grounded in verified implementation evidence.",
    images: ["/assets/me/pas-foto.webp"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      className={`${geistSans.variable} ${instrumentSerif.variable} ${geistMono.variable}`}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var rm=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;var s=sessionStorage.getItem('annas_splash_shown');if(s||rm){document.documentElement.classList.add('splash-dismissed');}else{document.documentElement.classList.add('splash-active');}}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
