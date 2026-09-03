import type { Locale } from "@/lib/i18n/config";
import { contactCopy, siteContact } from "@/content/site/contact";
import styles from "./contact.module.css";

interface ContactChannelsProps {
  locale: Locale;
}

export function ContactChannels({ locale }: ContactChannelsProps) {
  const copy = contactCopy[locale];

  const channels = [
    {
      index: "01",
      label: "Email",
      value: siteContact.email,
      href: siteContact.gmailComposeUrl,
      cue: copy.gmailCue,
    },
    {
      index: "02",
      label: "LinkedIn",
      value: siteContact.linkedIn,
      href: siteContact.linkedInUrl,
      cue: copy.externalCue,
    },
    {
      index: "03",
      label: "GitHub",
      value: siteContact.gitHub,
      href: siteContact.gitHubUrl,
      cue: copy.externalCue,
    },
  ];

  return (
    <section aria-labelledby="contact-channels-title">
      <div className={styles.channelsHeader}>
        <h2 className={styles.channelsTitle} id="contact-channels-title">
          {copy.channelsTitle}
        </h2>
        <p className={styles.channelsIntro}>{copy.channelsIntro}</p>
      </div>
      <ol className={styles.channelList}>
        {channels.map((channel) => (
          <li className={styles.channelRow} key={channel.index}>
            <a
              className={styles.channelLink}
              href={channel.href}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className={styles.channelIndex}>{channel.index}</span>
              <span className={styles.channelIdentity}>
                <span className={styles.channelLabel}>{channel.label}</span>
                <span className={styles.channelValue}>{channel.value}</span>
              </span>
              <span className={styles.channelArrow} aria-hidden="true">
                {"\u2197"}
              </span>
              <span className="sr-only"> ({channel.cue})</span>
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
