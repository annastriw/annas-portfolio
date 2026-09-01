"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n/config";
import {
  buildContactEmailLinks,
  contactCopy,
  contactTemplates,
  type ContactTemplateId,
} from "@/content/site/contact";
import styles from "./contact.module.css";

interface EmailComposerProps {
  locale: Locale;
}

export function EmailComposer({ locale }: EmailComposerProps) {
  const copy = contactCopy[locale];
  const templates = contactTemplates[locale];
  const [selectedTemplate, setSelectedTemplate] =
    useState<ContactTemplateId | null>(null);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const emailLinks = buildContactEmailLinks({ subject, body: message });

  const applyTemplate = (templateId: ContactTemplateId) => {
    const template = templates.find((item) => item.id === templateId);
    if (!template) return;

    setSelectedTemplate(template.id);
    setSubject(template.subject);
    setMessage(template.message);
  };

  const clearDraft = () => {
    setSelectedTemplate(null);
    setSubject("");
    setMessage("");
  };

  return (
    <form
      className={styles.composerForm}
      aria-label={copy.formLabel}
      onSubmit={(event) => event.preventDefault()}
    >
      <fieldset className={styles.templateFieldset}>
        <legend className={styles.templateLegend}>
          <span>01 /</span> {copy.templateLegend}
        </legend>
        <div className={styles.templateGrid}>
          {templates.map((template, index) => {
            const isSelected = selectedTemplate === template.id;
            const inputId = `contact-template-${locale}-${template.id}`;

            return (
              <div className={styles.templateOption} key={template.id}>
                <input
                  checked={isSelected}
                  className={styles.templateInput}
                  id={inputId}
                  name="contact-template"
                  onChange={() => applyTemplate(template.id)}
                  type="radio"
                  value={template.id}
                />
                <label
                  className={styles.templateLabel}
                  data-selected={isSelected ? "true" : "false"}
                  htmlFor={inputId}
                >
                  <span className={styles.templateIndex}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.templateName}>{template.label}</span>
                  <span className={styles.templateState} aria-hidden={!isSelected}>
                    {isSelected ? copy.selectedTemplate : ""}
                  </span>
                </label>
              </div>
            );
          })}
        </div>
      </fieldset>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel} htmlFor={`contact-subject-${locale}`}>
          <span>02 /</span> {copy.subjectLabel}
        </label>
        <input
          className={styles.textInput}
          id={`contact-subject-${locale}`}
          name="subject"
          onChange={(event) => setSubject(event.target.value)}
          placeholder={copy.subjectPlaceholder}
          type="text"
          value={subject}
        />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel} htmlFor={`contact-message-${locale}`}>
          <span>03 /</span> {copy.messageLabel}
        </label>
        <textarea
          className={styles.textarea}
          id={`contact-message-${locale}`}
          name="message"
          onChange={(event) => setMessage(event.target.value)}
          placeholder={copy.messagePlaceholder}
          rows={7}
          value={message}
        />
      </div>

      <div className={styles.formActions}>
        <a
          className={styles.primaryAction}
          href={emailLinks.gmail}
          rel="noopener noreferrer"
          target="_blank"
        >
          <span>{copy.openGmail}</span>
          <span className={styles.actionArrow} aria-hidden="true">
            {"\u2197"}
          </span>
          <span className="sr-only"> ({copy.gmailCue})</span>
        </a>
        <a className={styles.secondaryAction} href={emailLinks.mailto}>
          <span>{copy.openEmailApp}</span>
          <span className={styles.actionArrow} aria-hidden="true">
            {"\u2192"}
          </span>
        </a>
      </div>

      <p className={styles.helperText}>{copy.helper}</p>

      <button className={styles.clearAction} onClick={clearDraft} type="button">
        {copy.clearDraft}
      </button>
    </form>
  );
}
