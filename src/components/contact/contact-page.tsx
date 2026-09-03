import type { Locale } from "@/lib/i18n/config";
import { contactCopy } from "@/content/site/contact";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ContactChannels } from "./contact-channels";
import { EmailComposer } from "./email-composer";
import styles from "./contact.module.css";

interface ContactPageProps {
  locale: Locale;
}

export function ContactPage({ locale }: ContactPageProps) {
  const copy = contactCopy[locale];

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Projects-Hub-aligned Editorial Masthead */}
        <header className={styles.masthead}>
          <ScrollReveal animationClass="animate-editorial-fade">
            <div className={styles.tagGroup}>
              <span className={styles.pageLabel}>{copy.pageLabel}</span>
            </div>
            <h1 className={styles.title}>{copy.title}</h1>
            <p className={styles.lead}>{copy.intro}</p>
          </ScrollReveal>
        </header>

        {/* Main 2-Column Content Layout */}
        <div className={styles.contentGrid}>
          {/* Left Column: Direct Channels */}
          <div className={styles.leftColumn}>
            <ScrollReveal
              animationClass="animate-editorial-fade"
              delayMs={60}
            >
              <ContactChannels locale={locale} />
            </ScrollReveal>
          </div>

          {/* Right Column: Email Draft Composer */}
          <div className={styles.rightColumn}>
            <ScrollReveal
              animationClass="animate-editorial-fade"
              delayMs={100}
            >
              <section aria-labelledby="email-composer-title">
                <div className={styles.composerHeader}>
                  <h2 className={styles.composerTitle} id="email-composer-title">
                    {copy.composerTitle}
                  </h2>
                  <p className={styles.composerIntro}>{copy.composerIntro}</p>
                </div>
                <EmailComposer locale={locale} />
              </section>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
