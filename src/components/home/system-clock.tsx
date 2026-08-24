"use client";

import { useSyncExternalStore } from "react";

function formatJakarta12Hour(date: Date): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Jakarta",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).format(date);
  } catch {
    const hours = (date.getUTCHours() + 7) % 24;
    const ampm = hours >= 12 ? "PM" : "AM";
    const h12 = hours % 12 || 12;
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${pad(h12)}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())} ${ampm}`;
  }
}

function subscribe(callback: () => void) {
  const interval = setInterval(callback, 1000);
  return () => clearInterval(interval);
}

function getSnapshot() {
  return formatJakarta12Hour(new Date());
}

function getServerSnapshot() {
  return "--:--:-- --";
}

export function SystemClock() {
  const time = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <div
      className="hero-clock-display inline-flex items-baseline gap-1 font-mono text-xs text-(--color-muted)"
      aria-label={`Current time in Klaten (UTC+7): ${time}`}
    >
      <span>UTC+7 ·</span>
      <span
        className="font-medium text-(--color-foreground) tabular-nums"
        suppressHydrationWarning
      >
        {time}
      </span>
    </div>
  );
}
