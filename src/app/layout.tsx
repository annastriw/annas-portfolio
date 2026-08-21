import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: "normal",
  variable: "--font-geist-sans",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
  variable: "--font-instrument-serif",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Annas Tri Widagdo",
  description: "Personal portfolio of Annas Tri Widagdo.",
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
