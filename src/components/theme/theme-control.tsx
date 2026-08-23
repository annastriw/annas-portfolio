"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import type { Locale } from "@/lib/i18n/config";
import { themePreferences, type ThemePreference } from "./theme-config";

const themeCopy: Record<
  Locale,
  {
    legend: string;
    options: Record<ThemePreference, string>;
    codes: Record<ThemePreference, string>;
  }
> = {
  en: {
    legend: "Theme preference",
    options: {
      light: "Light",
      dark: "Dark",
      system: "System",
    },
    codes: {
      light: "01",
      dark: "02",
      system: "03",
    },
  },
  id: {
    legend: "Preferensi tema",
    options: {
      light: "Terang",
      dark: "Gelap",
      system: "Sistem",
    },
    codes: {
      light: "01",
      dark: "02",
      system: "03",
    },
  },
};

function SunIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      className="theme-control-icon"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="3.2" />
      <path d="M8 1.5v1.8M8 12.7v1.8M1.5 8h1.8M12.7 8h1.8M3.4 3.4l1.3 1.3M11.3 11.3l1.3 1.3M3.4 12.6l1.3-1.3M11.3 4.7l1.3-1.3" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      className="theme-control-icon"
      aria-hidden="true"
    >
      <path d="M13.2 9.5A5.5 5.5 0 1 1 6.5 2.8 4.6 4.6 0 0 0 13.2 9.5z" />
    </svg>
  );
}

function SystemIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      className="theme-control-icon"
      aria-hidden="true"
    >
      <rect x="2" y="2.5" width="12" height="8.5" rx="1" />
      <path d="M5.5 14h5M8 11v3" />
    </svg>
  );
}

type ThemeControlProps = {
  locale: Locale;
  className?: string;
};

function subscribeToMount() {
  return () => {};
}

function getMountedSnapshot() {
  return true;
}

function getServerMountedSnapshot() {
  return false;
}

export function ThemeControl({ locale, className = "" }: ThemeControlProps) {
  const isMounted = useSyncExternalStore(
    subscribeToMount,
    getMountedSnapshot,
    getServerMountedSnapshot,
  );
  const { setTheme, theme } = useTheme();
  const copy = themeCopy[locale];
  const selectedTheme = isMounted ? theme : "system";

  return (
    <fieldset className={`editorial-theme-control ${className}`}>
      <legend className="editorial-theme-legend">
        [SYS // {copy.legend.toUpperCase()}]
      </legend>
      <div
        className="editorial-theme-options"
        role="radiogroup"
        aria-label={copy.legend}
      >
        {themePreferences.map((preference) => {
          const isChecked = selectedTheme === preference;
          return (
            <label
              className={`editorial-theme-option ${isChecked ? "editorial-theme-option-checked" : ""}`}
              key={preference}
            >
              <input
                checked={isChecked}
                name="theme-preference"
                onChange={() => setTheme(preference)}
                type="radio"
                value={preference}
                className="sr-only"
                aria-label={`${copy.options[preference]} theme`}
              />
              <span className="theme-option-box">
                <span className="theme-option-icon" aria-hidden="true">
                  {preference === "light" && <SunIcon />}
                  {preference === "dark" && <MoonIcon />}
                  {preference === "system" && <SystemIcon />}
                </span>
                <span className="theme-option-code">{copy.codes[preference]}</span>
                <span className="theme-option-label">
                  {copy.options[preference]}
                </span>
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
