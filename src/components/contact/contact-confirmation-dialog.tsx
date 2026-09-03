"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import type { Locale } from "@/lib/i18n/config";
import { contactCopy } from "@/content/site/contact";
import styles from "./contact.module.css";

export interface ContactConfirmationDialogProps {
  isOpen: boolean;
  type: "replace" | "clear";
  locale: Locale;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ContactConfirmationDialog({
  isOpen,
  type,
  locale,
  onConfirm,
  onCancel,
}: ContactConfirmationDialogProps) {
  const copy = contactCopy[locale].dialogs;
  const dialogRef = useRef<HTMLDivElement>(null);
  const cancelBtnRef = useRef<HTMLButtonElement>(null);

  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const title = type === "replace" ? copy.replaceTitle : copy.clearTitle;
  const description =
    type === "replace" ? copy.replaceDescription : copy.clearDescription;
  const confirmLabel =
    type === "replace" ? copy.replaceConfirm : copy.clearConfirm;

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Place initial focus safely on Cancel for destructive/replacement actions
    const focusTimer = setTimeout(() => {
      cancelBtnRef.current?.focus();
    }, 40);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCancel();
        return;
      }

      if (event.key === "Tab" && dialogRef.current) {
        const focusableElements = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onCancel]);

  if (!isOpen || !isMounted || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      className={styles.dialogOverlay}
      onClick={onCancel}
      role="presentation"
    >
      <div
        ref={dialogRef}
        aria-describedby="contact-dialog-desc"
        aria-labelledby="contact-dialog-title"
        aria-modal="true"
        className={styles.dialogContent}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <div className={styles.dialogTag}>
          <span>{copy.tag}</span>
        </div>

        <h3 className={styles.dialogTitle} id="contact-dialog-title">
          {title}
        </h3>

        <p className={styles.dialogDesc} id="contact-dialog-desc">
          {description}
        </p>

        <div className={styles.dialogActions}>
          <button
            ref={cancelBtnRef}
            className={styles.dialogCancelBtn}
            onClick={onCancel}
            type="button"
          >
            {copy.cancel}
          </button>
          <button
            className={styles.dialogConfirmBtn}
            onClick={onConfirm}
            type="button"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
