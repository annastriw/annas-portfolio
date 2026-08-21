export const themePreferences = ["light", "dark", "system"] as const;

export type ThemePreference = (typeof themePreferences)[number];

export const selectableThemes = themePreferences.slice(0, 2);
