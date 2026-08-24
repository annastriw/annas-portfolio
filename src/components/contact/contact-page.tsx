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
      label: "LinkedIn",
      value: siteContact.linkedIn,
      href: siteContact.linkedInUrl,
      external: true,
    },
    {
      label: "GitHub",
      value: siteContact.gitHub,
      href: siteContact.gitHubUrl,
      external: true,
    },
  ];

  return (
    <div className={styles.page}>
      <div className={`${styles.container} ${styles.contactLayout}`}>
        <div className={styles.leftColumn}>
          <header className={styles.intro}>
            <ScrollReveal animationClass="animate-editorial-fade">
              <div className={styles.introInner}>
                <p className={styles.pageLabel}>{copy.pageLabel}</p>
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
                <li className={styles.channelRow}>
                  <div className={styles.emailChannel}>
                    <span className={styles.channelIndex}>01</span>
                    <div className={styles.channelIdentity}>
                      <span className={styles.channelLabel}>Email</span>
                      <span className={styles.channelValue}>{siteContact.email}</span>
                    </div>
                    <div className={styles.channelActions}>
                      <a
                        className={styles.channelAction}
                        href={siteContact.gmailComposeUrl}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <span>{copy.openGmail}</span>
                        <span className={styles.channelArrow} aria-hidden="true">
                          {"\u2197"}
                        </span>
                        <span className="sr-only"> ({copy.gmailCue})</span>
                      </a>
                      <a
                        className={styles.channelAction}
                        href={siteContact.emailUrl}
                      >
                        <span>{copy.openEmailApp}</span>
                        <span className={styles.channelArrow} aria-hidden="true">
                          {"\u2192"}
                        </span>
                      </a>
                    </div>
                  </div>
                </li>
                {channels.map((channel, index) => (
                  <li className={styles.channelRow} key={channel.label}>
                    <a
                      className={styles.channelLink}
                      href={channel.href}
                      rel={channel.external ? "noopener noreferrer" : undefined}
                      target={channel.external ? "_blank" : undefined}
                    >
                      <span className={styles.channelIndex}>
                        {String(index + 2).padStart(2, "0")}
                      </span>
                      <span className={styles.channelIdentity}>
                        <span className={styles.channelLabel}>{channel.label}</span>
                        <span className={styles.channelValue}>{channel.value}</span>
                      </span>
                      <span className={styles.channelArrow} aria-hidden="true">
                        {"\u2197"}
                      </span>
                      <span className="sr-only"> ({copy.externalCue})</span>
                    </a>
                  </li>
                ))}
              </ol>
            </section>
          </ScrollReveal>
        </div>

        <ScrollReveal
          animationClass="animate-editorial-fade"
          className={styles.composerColumn}
          delayMs={80}
        >
          <section aria-labelledby="email-composer-title">
            <div className={styles.composerHeader}>
              <p className={styles.composerLabel}>[{copy.composerLabel}]</p>
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
