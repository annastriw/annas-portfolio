"use client";

import styles from "./footer.module.css";

interface BackToTopProps {
  label: string;
}

export function BackToTop({ label }: BackToTopProps) {
  const returnToTop = () => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });

    document.getElementById("main-content")?.focus({ preventScroll: true });
  };

  return (
    <button className={styles.backToTop} onClick={returnToTop} type="button">
      <span>{label}</span>
      <span className={styles.backToTopArrow} aria-hidden="true">
        {"\u2191"}
      </span>
    </button>
  );
}
