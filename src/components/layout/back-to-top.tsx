"use client";

import styles from "./footer.module.css";

interface BackToTopProps {
  label: string;
}

export function BackToTop({ label }: BackToTopProps) {
  const returnToTop = () => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });

    const main = document.getElementById("main-content");
    if (main) {
      main.focus({ preventScroll: true });
    }
  };

  return (
    <button
      className={styles.backToTop}
      onClick={returnToTop}
      type="button"
      aria-label={label}
    >
      <span>{label}</span>
      <span className={styles.backToTopArrow} aria-hidden="true">
        {"\u2191"}
      </span>
    </button>
  );
}
