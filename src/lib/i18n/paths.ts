import { supportedLocales, type Locale } from "./config.ts";

/**
 * Strips the locale segment from the start of a pathname.
 * E.g., "/en/projects" -> "/projects", "/id" -> ""
 */
export function stripLocaleFromPath(pathname: string): string {
  if (!pathname || pathname === "/") return "";
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && supportedLocales.includes(segments[0] as Locale)) {
    segments.shift();
  }
  return segments.length > 0 ? `/${segments.join("/")}` : "";
}

/**
 * Generates a localized path for a given path and target locale.
 * E.g., getLocalizedPath("/en/projects", "id") -> "/id/projects"
 * E.g., getLocalizedPath("/en", "id") -> "/id"
 */
export function getLocalizedPath(pathname: string, targetLocale: Locale): string {
  const strippedPath = stripLocaleFromPath(pathname);
  return `/${targetLocale}${strippedPath}`;
}

/**
 * Builds a localized href from a relative path.
 * E.g. getLocalizedHref("/projects", "en") -> "/en/projects"
 * If the path is an external link (starts with "http" or "mailto:") or an anchor ("#"), it returns the raw href.
 */
export function getLocalizedHref(href: string, locale: Locale): string {
  if (href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:") || href.startsWith("#")) {
    return href;
  }
  const cleanHref = href.startsWith("/") ? href : `/${href}`;
  return `/${locale}${cleanHref === "/" ? "" : cleanHref}`;
}

/**
 * Determines whether a given navigation item href is active for the current pathname.
 * - Home ("/" or "") is active only when pathname exactly matches the localized root (e.g. "/en" or "/en/").
 * - Other routes (e.g. "/projects", "/blog") are active when pathname matches the route exactly or starts with its prefix (e.g. "/en/projects/ukg-system").
 */
export function isRouteActive(itemHref: string, currentPathname: string | null | undefined, locale: Locale): boolean {
  if (!currentPathname) {
    return itemHref === "/" || itemHref === "";
  }

  // Normalize by stripping trailing slashes
  const cleanPathname = currentPathname.replace(/\/+$/, "") || `/${locale}`;
  const localizedHref = getLocalizedHref(itemHref, locale).replace(/\/+$/, "") || `/${locale}`;

  if (itemHref === "/" || itemHref === "") {
    return cleanPathname === localizedHref;
  }

  return cleanPathname === localizedHref || cleanPathname.startsWith(`${localizedHref}/`);
}
