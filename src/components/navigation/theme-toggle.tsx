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
      className={`theme-toggle-btn ${className}`}
      onClick={handleCycleTheme}
      aria-label={copy.buttonLabel(currentLabel)}
      title={copy.buttonLabel(currentLabel)}
    >
      <span className="theme-toggle-prefix" aria-hidden="true">
        THM:
      </span>
      <span className="theme-toggle-value">{currentShort}</span>
    </button>
  );
}
