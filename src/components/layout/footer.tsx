import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  const isId = locale === "id";
  const currentYear = new Date().getFullYear();

  const copy = {
    brandTagline: isId
      ? "Mengubah kebutuhan nyata menjadi produk digital melalui full-stack development dan machine learning engineering."
      : "Turning real needs into practical digital products through full-stack development and machine learning engineering.",
    emailLabel: "EMAIL //",
    linkedinLabel: "LINKEDIN //",
    githubLabel: "GITHUB //",
    contactLabel: "CONTACT //",
    openContact: isId ? "Halaman Kontak" : "Open Contact",
    location: isId ? "Klaten, Jawa Tengah, Indonesia" : "Klaten, Central Java, Indonesia",
    backToTop: isId ? "KEMBALI KE ATAS" : "BACK TO TOP",
  };

  return (
    <footer
      className="editorial-footer-slim bg-(--footer-bg) text-(--footer-foreground) border-t border-(--footer-border) py-8 sm:py-10 transition-colors duration-200"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6 sm:gap-8">
        <ScrollReveal animationClass="animate-editorial-fade">
          {/* Main Colophon Line: Brand Info (Left) + Open Interactive Channels (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6 lg:gap-12 items-start">
            {/* Left Column: Brand Wordmark & Aligned Description */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-(--color-accent) text-xs leading-none" aria-hidden="true">
                  ■
                </span>
                <span className="font-mono text-sm sm:text-base font-semibold tracking-tight text-(--footer-foreground)">
                  annastriwidagdo.me
                </span>
              </div>
              <p className="text-xs text-(--footer-muted) leading-relaxed m-0 max-w-lg">
                {copy.brandTagline}
              </p>
            </div>

            {/* Right Column: Open Typographic Channel Links (No Enclosed Boxes) */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-start gap-x-6 gap-y-2.5 font-mono text-xs">
              {/* Email */}
              <a
                href="mailto:annastriw23@gmail.com"
                className="footer-text-link group inline-flex items-center gap-1.5 text-(--footer-foreground) hover:text-(--color-accent) transition-colors"
                aria-label="Direct Email"
              >
                <span className="text-[10px] text-(--color-accent) font-semibold">
                  {copy.emailLabel}
                </span>
                <span className="relative">
                  annastriw23@gmail.com
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-(--color-accent) transition-all duration-300 group-hover:w-full" aria-hidden="true" />
                </span>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/annastriw"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-text-link group inline-flex items-center gap-1 text-(--footer-foreground) hover:text-(--color-accent) transition-colors"
                aria-label="LinkedIn Profile"
              >
                <span className="text-[10px] text-(--color-accent) font-semibold">
                  {copy.linkedinLabel}
                </span>
                <span>linkedin.com/in/annastriw</span>
                <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true">
                  ↗
                </span>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/annastriw"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-text-link group inline-flex items-center gap-1 text-(--footer-foreground) hover:text-(--color-accent) transition-colors"
                aria-label="GitHub Profile"
              >
                <span className="text-[10px] text-(--color-accent) font-semibold">
                  {copy.githubLabel}
                </span>
                <span>github.com/annastriw</span>
                <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true">
                  ↗
                </span>
              </a>

              {/* Contact Route */}
              <Link
                href={`/${locale}/contact`}
                className="footer-text-link group inline-flex items-center gap-1 text-(--footer-foreground) hover:text-(--color-accent) transition-colors"
                aria-label={isId ? "Halaman Kontak" : "Contact Page"}
              >
                <span className="text-[10px] text-(--color-accent) font-semibold">
                  {copy.contactLabel}
                </span>
                <span>{copy.openContact}</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* Bottom Colophon Sub-bar: Location, Dynamic Copyright + Built with love Signature, Back to top */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-(--footer-border) font-mono text-[11px] text-(--footer-muted) mt-4">
            <div className="flex items-center gap-2">
              <span>{copy.location}</span>
              <span className="text-(--footer-border)">/</span>
              <span>UTC+7</span>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-6">
              <span className="inline-flex items-center gap-1.5">
                <span>© {currentYear} Annas Tri Widagdo · Built with</span>
                <span className="text-(--color-accent) text-xs select-none" aria-label="love">♥︎</span>
              </span>
              <a
                href="#site-header-brand"
                className="hover:text-(--footer-foreground) inline-flex items-center gap-1 text-(--color-accent) font-semibold transition-colors"
                aria-label={isId ? "Kembali ke atas" : "Back to top"}
              >
                <span>{copy.backToTop}</span>
                <span aria-hidden="true">↑</span>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
