"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { PropsWithChildren } from "react";
import { selectableThemes } from "./theme-config";

export function ThemeProvider({ children }: PropsWithChildren) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
      enableSystem
      storageKey="annas-theme-preference"
      themes={selectableThemes}
    >
      {children}
    </NextThemesProvider>
  );
}
