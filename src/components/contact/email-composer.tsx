"use client";

import { useRef, useState } from "react";
import type { Locale } from "@/lib/i18n/config";
import {
  buildContactEmailLinks,
  contactCopy,
  contactTemplates,
  type ContactTemplateId,
} from "@/content/site/contact";
import {
  useContactDraftStore,
} from "./contact-draft-store";
import { ContactConfirmationDialog } from "./contact-confirmation-dialog";
import styles from "./contact.module.css";

interface EmailComposerProps {
  locale: Locale;
}

export function EmailComposer({ locale }: EmailComposerProps) {
  const copy = contactCopy[locale];
  const templates = contactTemplates[locale];
  const { draft, isEdited, updateFields, applyTemplate, clearDraft } =
    useContactDraftStore();

  const [dialogState, setDialogState] = useState<"replace" | "clear" | null>(
    null,
  );
  const [pendingTemplateId, setPendingTemplateId] =
    useState<ContactTemplateId | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const emailLinks = buildContactEmailLinks({
    subject: draft.subject,
    body: draft.message,
  });

  const handleSelectTemplate = (
    templateId: ContactTemplateId,
    triggerElement: HTMLElement,
  ) => {
    // If draft was modified by user, ask confirmation before replacing
    if (isEdited) {
      triggerRef.current = triggerElement;
      setPendingTemplateId(templateId);
      setDialogState("replace");
      return;
    }

    // Direct apply for untouched or initial draft
    const template = templates.find((item) => item.id === templateId);
    if (!template) return;
    applyTemplate(template);
  };

  const handleClearDraft = (triggerElement: HTMLElement) => {
    // Harmless no-op when completely empty
    if (draft.subject === "" && draft.message === "") {
      return;
    }

    // If draft has manual edits, ask confirmation
    if (isEdited) {
      triggerRef.current = triggerElement;
      setDialogState("clear");
      return;
    }

    // Directly clear untouched generated template
    clearDraft();
  };

  const handleCancelDialog = () => {
    setDialogState(null);
    setPendingTemplateId(null);
    if (triggerRef.current) {
      triggerRef.current.focus();
    }
  };

  const handleConfirmDialog = () => {
    if (dialogState === "replace" && pendingTemplateId) {
      const template = templates.find((item) => item.id === pendingTemplateId);
      if (template) {
        applyTemplate(template);
      }
    } else if (dialogState === "clear") {
      clearDraft();
    }

    setDialogState(null);
    setPendingTemplateId(null);
    if (triggerRef.current) {
      triggerRef.current.focus();
    }
  };

  return (
    <>
      <form
        aria-label={copy.formLabel}
        className={styles.composerForm}
        onSubmit={(event) => event.preventDefault()}
      >
        <div className={styles.templateSection}>
          <fieldset
            aria-describedby={`contact-template-hint-${locale}`}
            className={styles.templateFieldset}
          >
            <legend className={styles.templateLegend}>
              <span>01 /</span> {copy.templateLegend}
            </legend>
            <p
              className={styles.templateHint}
              id={`contact-template-hint-${locale}`}
            >
              <svg
                aria-hidden="true"
                className={styles.templateHintIcon}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                viewBox="0 0 16 16"
              >
                <circle cx="8" cy="8" r="6.25" />
                <path d="M8 7.25v3.75M8 5h.01" strokeLinecap="round" />
              </svg>
              <span className={styles.templateHintText}>{copy.templateHint}</span>
            </p>
            <div className={styles.templateGrid}>
              {templates.map((template, index) => {
                const isSelected = draft.selectedTemplate === template.id;
                const inputId = `contact-template-${locale}-${template.id}`;

                return (
                  <div className={styles.templateOption} key={template.id}>
                    <input
                      checked={isSelected}
                      className={styles.templateInput}
                      id={inputId}
                      name="contact-template"
                      onChange={(event) =>
                        handleSelectTemplate(template.id, event.currentTarget)
                      }
                      onClick={(event) =>
                        handleSelectTemplate(template.id, event.currentTarget)
                      }
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
                      <span
                        aria-hidden={!isSelected}
                        className={styles.templateState}
                      >
                        {isSelected ? copy.selectedTemplate : ""}
                      </span>
                    </label>
                  </div>
                );
              })}
            </div>
          </fieldset>
        </div>

        <div className={styles.fieldGroup}>
          <label
            className={styles.fieldLabel}
            htmlFor={`contact-subject-${locale}`}
          >
            <span>02 /</span> {copy.subjectLabel}
          </label>
          <input
            className={styles.textInput}
            id={`contact-subject-${locale}`}
            name="subject"
            onChange={(event) =>
              updateFields(event.target.value, draft.message)
            }
            placeholder={copy.subjectPlaceholder}
            type="text"
            value={draft.subject}
          />
        </div>

        <div className={styles.fieldGroup}>
          <label
            className={styles.fieldLabel}
            htmlFor={`contact-message-${locale}`}
          >
            <span>03 /</span> {copy.messageLabel}
          </label>
          <textarea
            className={styles.textarea}
            id={`contact-message-${locale}`}
            name="message"
            onChange={(event) =>
              updateFields(draft.subject, event.target.value)
            }
            placeholder={copy.messagePlaceholder}
            rows={7}
            value={draft.message}
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
            <span aria-hidden="true" className={styles.actionArrow}>
              {"\u2197"}
            </span>
            <span className="sr-only"> ({copy.gmailCue})</span>
          </a>
          <a className={styles.secondaryAction} href={emailLinks.mailto}>
            <span>{copy.openEmailApp}</span>
            <span aria-hidden="true" className={styles.actionArrow}>
              {"\u2192"}
            </span>
          </a>
        </div>

        <p className={styles.helperText}>{copy.helper}</p>

        <button
          className={styles.clearAction}
          onClick={(event) => handleClearDraft(event.currentTarget)}
          type="button"
        >
          {copy.clearDraft}
        </button>
      </form>

      {dialogState && (
        <ContactConfirmationDialog
          isOpen={dialogState !== null}
          locale={locale}
          onCancel={handleCancelDialog}
          onConfirm={handleConfirmDialog}
          type={dialogState}
        />
      )}
    </>
  );
}

