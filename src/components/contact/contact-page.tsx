import type { Locale } from "@/lib/i18n/config";
import { contactCopy, siteContact } from "@/content/site/contact";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { EmailComposer } from "./email-composer";
import styles from "./contact.module.css";

interface ContactPageProps {
  locale: Locale;
}

export function ContactPage({ locale }: ContactPageProps) {
  const copy = contactCopy[locale];
  const channels = [
    {
      index: "01",
      label: "Email",
      value: siteContact.email,
      href: siteContact.emailUrl,
      external: false,
    },
    {
      index: "02",
      label: "LinkedIn",
      value: siteContact.linkedIn,
      href: siteContact.linkedInUrl,
      external: true,
    },
    {
      index: "03",
      label: "GitHub",
      value: siteContact.gitHub,
      href: siteContact.gitHubUrl,
      external: true,
    },
  ];

  return (
    <div className={styles.page}>
      <div className={`${styles.container} ${styles.contactLayout}`}>
        {/* Left Column: Editorial Masthead & Direct Channels */}
        <div className={styles.leftColumn}>
          <header className={styles.intro}>
            <ScrollReveal animationClass="animate-editorial-fade">
              <div className={styles.introInner}>
                <div className={styles.tagGroup}>
                  <span className={styles.pageLabel}>{copy.pageLabel}</span>
                  <span className={styles.tagDivider} aria-hidden="true">
                    /
                  </span>
                  <span className={styles.archiveTag}>{copy.archiveTag}</span>
                </div>
                <h1 className={styles.title}>{copy.title}</h1>
                <p className={styles.lead}>{copy.intro}</p>
              </div>
            </ScrollReveal>
          </header>

          <ScrollReveal
            animationClass="animate-editorial-fade"
            className={styles.channelColumn}
            delayMs={80}
          >
            <section aria-labelledby="contact-channels-title">
              <h2 className={styles.sectionTitle} id="contact-channels-title">
                {copy.channelsTitle}
              </h2>
              <ol className={styles.channelList}>
                {channels.map((channel) => (
                  <li className={styles.channelRow} key={channel.label}>
                    <a
                      className={styles.channelLink}
                      href={channel.href}
                      rel={channel.external ? "noopener noreferrer" : undefined}
                      target={channel.external ? "_blank" : undefined}
                    >
                      <span className={styles.channelIndex}>
                        {channel.index}
                      </span>
                      <span className={styles.channelIdentity}>
                        <span className={styles.channelLabel}>
                          {channel.label}
                        </span>
                        <span className={styles.channelValue}>
                          {channel.value}
                        </span>
                      </span>
                      <span className={styles.channelArrow} aria-hidden="true">
                        {"\u2197"}
                      </span>
                      {channel.external && (
                        <span className="sr-only"> ({copy.externalCue})</span>
                      )}
                    </a>
                  </li>
                ))}
              </ol>
            </section>
          </ScrollReveal>
        </div>

        {/* Right Column: Email Draft Composer */}
        <ScrollReveal
          animationClass="animate-editorial-fade"
          className={styles.composerColumn}
          delayMs={120}
        >
          <section aria-labelledby="email-composer-title">
            <div className={styles.composerHeader}>
              <div className={styles.composerTagGroup}>
                <span className={styles.composerLabel}>{copy.composerLabel}</span>
              </div>
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
  );
}
