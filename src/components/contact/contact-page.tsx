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
      label: "Email",
      value: siteContact.email,
      href: siteContact.emailUrl,
      external: false,
    },
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
      <header className={styles.intro}>
        <div className={styles.container}>
          <ScrollReveal animationClass="animate-editorial-fade">
            <div className={styles.introInner}>
              <p className={styles.pageLabel}>{copy.pageLabel}</p>
              <h1 className={styles.title}>{copy.title}</h1>
              <p className={styles.lead}>{copy.intro}</p>
            </div>
          </ScrollReveal>
        </div>
      </header>

      <div className={`${styles.container} ${styles.contactLayout}`}>
        <ScrollReveal
          animationClass="animate-editorial-fade"
          className={styles.channelColumn}
        >
          <section aria-labelledby="contact-channels-title">
            <h2 className={styles.sectionTitle} id="contact-channels-title">
              {copy.channelsTitle}
            </h2>
            <ol className={styles.channelList}>
              {channels.map((channel, index) => (
                <li className={styles.channelRow} key={channel.label}>
                  <a
                    className={styles.channelLink}
                    href={channel.href}
                    rel={channel.external ? "noopener noreferrer" : undefined}
                    target={channel.external ? "_blank" : undefined}
                  >
                    <span className={styles.channelMeta}>
                      {String(index + 1).padStart(2, "0")} / {channel.label}
                    </span>
                    <span className={styles.channelValue}>{channel.value}</span>
                    <span className={styles.channelArrow} aria-hidden="true">
                      {channel.external ? "\u2197" : "\u2192"}
                    </span>
                    {channel.external ? (
                      <span className="sr-only"> ({copy.externalCue})</span>
                    ) : null}
                  </a>
                </li>
              ))}
            </ol>
          </section>
        </ScrollReveal>

        <ScrollReveal
          animationClass="animate-editorial-fade"
          className={styles.composerColumn}
          delayMs={80}
        >
          <section aria-labelledby="email-composer-title">
            <div className={styles.composerHeader}>
              <p className={styles.composerLabel}>{copy.composerLabel}</p>
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
