"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import type { Locale } from "@/lib/i18n/config";
import { themePreferences, type ThemePreference } from "./theme-config";

const themeCopy: Record<
  Locale,
  { legend: string; options: Record<ThemePreference, string> }
> = {
  en: {
    legend: "Color theme",
    options: {
      light: "Light",
      dark: "Dark",
      system: "System",
    },
  },
  id: {
    legend: "Tema warna",
    options: {
      light: "Terang",
      dark: "Gelap",
      system: "Sistem",
    },
  },
};

type ThemeControlProps = {
  locale: Locale;
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

export function ThemeControl({ locale }: ThemeControlProps) {
  const isMounted = useSyncExternalStore(
    subscribeToMount,
    getMountedSnapshot,
    getServerMountedSnapshot,
  );
  const { setTheme, theme } = useTheme();
  const copy = themeCopy[locale];
  const selectedTheme = isMounted ? theme : "system";

  return (
    <fieldset className="theme-control">
      <legend className="theme-control-label">{copy.legend}</legend>
      <div className="theme-control-options">
        {themePreferences.map((preference) => (
          <label className="theme-control-option" key={preference}>
            <input
              checked={selectedTheme === preference}
              name="theme-preference"
              onChange={() => setTheme(preference)}
              type="radio"
              value={preference}
            />
            <span>{copy.options[preference]}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
