import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { siteContact } from "@/content/site/contact";
import { siteIdentity } from "@/content/site/identity";
import { BackToTop } from "./back-to-top";
import styles from "./footer.module.css";

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  const isId = locale === "id";
  const currentYear = new Date().getFullYear();
  const signature = `\u00A9 ${currentYear} Annas Tri Widagdo. Find the purpose. Build the solution.`;

  const copy = {
    footerNavigation: isId ? "Navigasi footer" : "Footer navigation",
    rolesLabel: isId ? "Peran profesional" : "Professional roles",
    linkedInValue: "/in/annastriwidagdo",
    gitHubValue: "@annastriw",
    openContact: isId ? "Buka Kontak" : "Open Contact",
    backToTop: isId ? "KEMBALI KE ATAS" : "BACK TO TOP",
    newTabCue: isId ? "dibuka di tab baru" : "opens in a new tab",
  };

  return (
    <footer className={styles.footer} role="contentinfo">
      <ScrollReveal className={styles.footerRevealWrapper}>
        <div className={styles.container}>
          <div className={styles.entryRule} aria-hidden="true" />

          <div className={styles.mainGrid}>
            <div className={styles.brandBlock}>
              <Link
                className={styles.wordmark}
                href={`/${locale}`}
                aria-label={isId ? "annastriwidagdo.me - Beranda" : "annastriwidagdo.me - Home"}
              >
                <span className={styles.wordmarkMarker} aria-hidden="true">
                  {"\u25A0"}
                </span>
                <span className={styles.wordmarkText}>annastriwidagdo.me</span>
              </Link>
              <ul className={styles.roleList} aria-label={copy.rolesLabel}>
                {siteIdentity.roles.map((role) => (
                  <li key={role}>{role}</li>
                ))}
              </ul>
            </div>

          <nav className={styles.linkGrid} aria-label={copy.footerNavigation}>
            <a
              className={styles.footerLink}
              data-kind="email"
              href={siteContact.gmailComposeUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className={styles.linkLabel}>EMAIL</span>
              <span className={styles.linkValue}>{siteContact.email}</span>
              <span className={styles.linkArrow} aria-hidden="true">
                {"\u2197"}
              </span>
              <span className="sr-only"> ({copy.newTabCue})</span>
              <span className={styles.linkRule} aria-hidden="true" />
            </a>

            <a
              className={styles.footerLink}
              data-kind="external"
              href={siteContact.linkedInUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className={styles.linkLabel}>LINKEDIN</span>
              <span className={styles.linkValue}>{copy.linkedInValue}</span>
              <span className={styles.linkArrow} aria-hidden="true">
                {"\u2197"}
              </span>
              <span className="sr-only"> ({copy.newTabCue})</span>
              <span className={styles.linkRule} aria-hidden="true" />
            </a>

            <a
              className={styles.footerLink}
              data-kind="external"
              href={siteContact.gitHubUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className={styles.linkLabel}>GITHUB</span>
              <span className={styles.linkValue}>{copy.gitHubValue}</span>
              <span className={styles.linkArrow} aria-hidden="true">
                {"\u2197"}
              </span>
              <span className="sr-only"> ({copy.newTabCue})</span>
              <span className={styles.linkRule} aria-hidden="true" />
            </a>

            <Link
              className={styles.footerLink}
              data-kind="contact"
              href={`/${locale}/contact`}
            >
              <span className={styles.linkLabel}>CONTACT</span>
              <span className={styles.linkValue}>{copy.openContact}</span>
              <span className={styles.linkArrow} aria-hidden="true">
                {"\u2192"}
              </span>
              <span className={styles.linkRule} aria-hidden="true" />
            </Link>
          </nav>
        </div>

        <div className={styles.closingRow}>
          <BackToTop label={copy.backToTop} />
          <p className={styles.signature}>{signature}</p>
        </div>
      </div>
    </ScrollReveal>
  </footer>
);
}
