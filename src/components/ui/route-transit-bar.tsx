"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";

interface RouteTransitBarProps {
  locale?: Locale;
}

const routeInfoMap: Record<
  Locale,
  Record<string, { code: string; label: string }>
> = {
  en: {
    home: { code: "01", label: "HOME" },
    about: { code: "02", label: "ABOUT" },
    projects: { code: "03", label: "PROJECTS" },
    blog: { code: "04", label: "BLOG" },
    contact: { code: "05", label: "CONTACT" },
  },
  id: {
    home: { code: "01", label: "BERANDA" },
    about: { code: "02", label: "TENTANG" },
    projects: { code: "03", label: "PROYEK" },
    blog: { code: "04", label: "BLOG" },
    contact: { code: "05", label: "KONTAK" },
  },
};

const TRANSIT_VISIBLE_DURATION_MS = 1000;

function resolveRouteKey(pathname: string): "home" | "about" | "projects" | "blog" | "contact" {
  if (!pathname) return "home";
  const segments = pathname.split("/").filter(Boolean);
  // segments[0] is locale ('en' or 'id')
  const section = segments[1] || "";
  if (section === "about") return "about";
  if (section === "projects") return "projects";
  if (section === "blog") return "blog";
  if (section === "contact") return "contact";
  return "home";
}

export function RouteTransitBar({ locale = "en" }: RouteTransitBarProps) {
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const [isNavigating, setIsNavigating] = useState(false);
  const [navKey, setNavKey] = useState(0);

  const activeLocale = locale in routeInfoMap ? locale : "en";
  const routes = routeInfoMap[activeLocale];

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsNavigating(true);
    setNavKey((k) => k + 1);
  }

  const routeKey = resolveRouteKey(pathname);
  const currentRoute = routes[routeKey] || routes.home;

  useEffect(() => {
    if (!isNavigating) return;

    const timer = setTimeout(() => {
      setIsNavigating(false);
    }, TRANSIT_VISIBLE_DURATION_MS);

    return () => clearTimeout(timer);
  }, [isNavigating, navKey]);

  if (!isNavigating) return null;

  return (
    <aside
      className="top-right-route-loader"
      role="status"
      aria-live="polite"
      aria-label={
        activeLocale === "id"
          ? `Menuju ${currentRoute.label}`
          : `Navigating to ${currentRoute.label}`
      }
    >
      <div className="route-loader-pill">
        <div className="route-loader-header">
          <span className="route-loader-beacon" aria-hidden="true" />
          <span className="route-loader-tag">
            [ROUTE {"//"} {currentRoute.code}]
          </span>
          <span className="route-loader-label">{currentRoute.label}</span>
        </div>
        <div className="route-loader-track" aria-hidden="true">
          <div className="route-loader-bar" />
        </div>
      </div>
    </aside>
  );
}
