"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import type { Locale } from "@/lib/i18n/config";
import { themePreferences, type ThemePreference } from "@/components/theme/theme-config";

interface ThemeToggleProps {
  locale: Locale;
  className?: string;
}

const themeLabels: Record<
  Locale,
  {
    buttonLabel: (current: string) => string;
    options: Record<ThemePreference, string>;
    short: Record<ThemePreference, string>;
  }
> = {
  en: {
    buttonLabel: (current: string) => `Theme: ${current}. Click to change theme.`,
    options: {
      light: "Light",
      dark: "Dark",
      system: "System",
    },
    short: {
      light: "LGT",
      dark: "DRK",
      system: "SYS",
    },
  },
  id: {
    buttonLabel: (current: string) => `Tema: ${current}. Klik untuk mengganti tema.`,
    options: {
      light: "Terang",
      dark: "Gelap",
      system: "Sistem",
    },
    short: {
      light: "TRG",
      dark: "GLP",
      system: "SYS",
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
      className="theme-toggle-icon"
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
      className="theme-toggle-icon"
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
      className="theme-toggle-icon"
      aria-hidden="true"
    >
      <rect x="2" y="2.5" width="12" height="8.5" rx="1" />
      <path d="M5.5 14h5M8 11v3" />
    </svg>
  );
}

function subscribeToMount() {
  return () => {};
}

function getMountedSnapshot() {
  return true;
}

function getServerMountedSnapshot() {
  return false;
}

export function ThemeToggle({ locale, className = "" }: ThemeToggleProps) {
  const isMounted = useSyncExternalStore(
    subscribeToMount,
    getMountedSnapshot,
    getServerMountedSnapshot,
  );
  const { setTheme, theme } = useTheme();
  const currentPreference = (isMounted ? (theme as ThemePreference) : "system") || "system";
  const copy = themeLabels[locale];

  const handleCycleTheme = () => {
    const currentIndex = themePreferences.indexOf(currentPreference);
    const nextIndex = (currentIndex + 1) % themePreferences.length;
    setTheme(themePreferences[nextIndex]);
  };

  const currentLabel = copy.options[currentPreference] || copy.options.system;
  const currentShort = copy.short[currentPreference] || copy.short.system;

  return (
    <button
      type="button"
      className={`editorial-theme-btn ${className}`}
      onClick={handleCycleTheme}
      aria-label={copy.buttonLabel(currentLabel)}
      title={copy.buttonLabel(currentLabel)}
    >
      <span className="theme-btn-tag" aria-hidden="true">
        THM
      </span>
      <span className="theme-btn-icon-wrap" aria-hidden="true">
        {currentPreference === "light" && <SunIcon />}
        {currentPreference === "dark" && <MoonIcon />}
        {currentPreference === "system" && <SystemIcon />}
      </span>
      <span className="theme-btn-code">{currentShort}</span>
    </button>
  );
}
