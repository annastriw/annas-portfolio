"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n/config";
import type {
  GitHubTelemetryData,
  GitHubYearContribution,
} from "@/lib/github/github-data";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface GitHubSignalProps {
  locale: Locale;
  telemetry: GitHubTelemetryData;
}

const monthNames: Record<Locale, string[]> = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  id: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
};

const dayNames: Record<Locale, string[]> = {
  en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  id: ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"],
};

export function GitHubSignal({ locale, telemetry }: GitHubSignalProps) {
  const isId = locale === "id";
  const { isLive, years, latestCommits, profileUrl } = telemetry;

  // Selected year state (defaults to the first/most recent year)
  const defaultYear = years.length > 0 ? years[0].year : new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<number>(defaultYear);

  const selectedYearData: GitHubYearContribution | undefined =
    years.find((y) => y.year === selectedYear) || years[0];

  const copy = {
    tag: "[03 // GITHUB]",
    subtag: isId ? "AKTIVITAS PENGEMBANGAN" : "DEVELOPMENT SIGNAL",
    title: isId ? "Aktivitas GitHub" : "GitHub Signal",
    subtitle: isId
      ? "Arsip kontribusi kode publik dan commit terbaru di GitHub @annastriw."
      : "Public code contribution archive and recent commit activity for @annastriw on GitHub.",
    visitProfile: isId ? "Lihat Profil GitHub" : "Visit GitHub Profile",
    totalContributions: isId ? "kontribusi pada" : "contributions in",
    latestCommitsHeading: isId ? "COMMIT PUBLIK TERAKHIR" : "LATEST PUBLIC COMMITS",
    signalStatusLive: isId ? "SINYAL LANGSUNG" : "LIVE SIGNAL",
    signalStatusHolding: isId ? "INTEGRASI: MENUNGGU TOKEN" : "INTEGRATION: PENDING API",
    noCommitsFallback: isId
      ? "Aktivitas commit publik dapat dilihat langsung pada profil GitHub."
      : "Public commit activity is available directly on the GitHub profile.",
    less: isId ? "Sedikit" : "Less",
    more: isId ? "Banyak" : "More",
    fallbackNote: isId
      ? "Koneksi data langsung ke repositori GitHub @annastriw sedang dalam mode holding."
      : "Direct live data stream to GitHub repository @annastriw is currently in holding mode.",
  };

  return (
    <section
      className="home-github-section py-12 sm:py-16 md:py-20 border-b border-(--color-border)"
      aria-label={copy.title}
    >
      <div className="home-github-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6 sm:gap-8">
        {/* Section Header */}
        <ScrollReveal
          animationClass="animate-editorial-fade"
          className="home-section-header flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="section-header-meta flex items-center gap-3 font-mono text-xs text-(--color-muted)">
              <span className="font-semibold text-(--color-accent)">{copy.tag}</span>
              <span className="text-(--color-border)" aria-hidden="true">
                /
              </span>
              <span>{copy.subtag}</span>
            </div>
            <h2 className="section-title font-serif text-3xl sm:text-4xl text-(--color-foreground) font-normal m-0 tracking-tight">
              {copy.title}
            </h2>
            <p className="section-subtitle text-sm sm:text-base text-(--color-muted) leading-relaxed m-0">
              {copy.subtitle}
            </p>
          </div>

          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="section-header-link group inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-(--color-accent) hover:underline self-start md:self-end transition-colors"
          >
            <span>{copy.visitProfile}</span>
            <span
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            >
              ↗
            </span>
          </a>
        </ScrollReveal>

        {isLive && selectedYearData ? (
          /* Live GitHub Signal Layout */
          <div className="flex flex-col gap-6">
            {/* Top Controls: 4-Year Selector + Live Telemetry Badge + Inline Total */}
            <ScrollReveal delayMs={100} animationClass="animate-editorial-fade">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-(--color-border) pb-4">
                {/* 4-Year Selector Tabs */}
                <div
                  className="flex items-center gap-1 sm:gap-2 p-1 border border-(--color-border) bg-(--color-surface-subtle,var(--color-background)) rounded-[2px]"
                  role="tablist"
                  aria-label="GitHub contribution year selector"
                >
                  {years.map((yearObj) => {
                    const isSelected = yearObj.year === selectedYear;
                    return (
                      <button
                        key={yearObj.year}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        onClick={() => setSelectedYear(yearObj.year)}
                        className={`px-2.5 sm:px-3 py-1 font-mono text-xs font-medium rounded-[2px] transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "bg-(--color-foreground) text-(--color-background) font-semibold shadow-xs"
                            : "text-(--color-muted) hover:text-(--color-foreground)"
                        }`}
                      >
                        {yearObj.year}
                      </button>
                    );
                  })}
                </div>

                {/* Total Contributions Indicator & Live Status */}
                <div className="flex items-center gap-3 font-mono text-xs">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-(--color-border) bg-(--color-background) rounded-[2px]">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-subtle-beacon" aria-hidden="true" />
                    <span className="font-semibold text-(--color-foreground)">
                      {selectedYearData.totalContributions.toLocaleString()}
                    </span>
                    <span className="text-(--color-muted)">
                      {copy.totalContributions} {selectedYear}
                    </span>
                  </div>

                  <a
                    href={profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 text-(--color-muted) hover:text-(--color-accent) border border-transparent hover:border-(--color-border) transition-colors rounded-[2px]"
                  >
                    <span>github.com/annastriw</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* Contribution Matrix Graph (Editorial Visualization) */}
            <ScrollReveal delayMs={150} animationClass="animate-editorial-fade">
              <div className="github-matrix-card border border-(--color-border) bg-(--color-background) p-4 sm:p-5 rounded-[2px] overflow-hidden flex flex-col gap-3">
                <div className="overflow-x-auto pb-2 scrollbar-thin">
                  <div className="min-w-[720px] flex flex-col gap-2">
                    {/* Month Labels Header */}
                    <div className="flex justify-between pl-8 pr-2 font-mono text-[10px] text-(--color-muted) uppercase tracking-wider">
                      {monthNames[locale].map((m, idx) => (
                        <span key={idx}>{m}</span>
                      ))}
                    </div>

                    {/* Matrix Grid (53 Weeks x 7 Days) */}
                    <div className="flex items-start gap-1">
                      {/* Weekday Labels (Mon, Wed, Fri) */}
                      <div className="flex flex-col justify-between h-[100px] py-1 font-mono text-[9px] text-(--color-muted) shrink-0 w-7">
                        <span>{dayNames[locale][1]}</span>
                        <span>{dayNames[locale][3]}</span>
                        <span>{dayNames[locale][5]}</span>
                      </div>

                      {/* Weeks Columns */}
                      <div className="flex gap-1 grow">
                        {selectedYearData.weeks.map((week, wIdx) => (
                          <div key={wIdx} className="flex flex-col gap-1 grow">
                            {week.days.map((day, dIdx) => {
                              if (!day) {
                                return (
                                  <div
                                    key={dIdx}
                                    className="aspect-square w-full rounded-[1px] opacity-0 pointer-events-none"
                                  />
                                );
                              }

                              const levelColors = [
                                "bg-(--color-border)/30",
                                "bg-blue-400/40 dark:bg-blue-500/30",
                                "bg-blue-500/70 dark:bg-blue-400/60",
                                "bg-blue-600 dark:bg-blue-400",
                                "bg-(--color-accent)",
                              ];

                              return (
                                <div
                                  key={dIdx}
                                  title={`${day.date}: ${day.count} ${copy.totalContributions}`}
                                  className={`aspect-square w-full rounded-[1px] ${levelColors[day.level]} transition-colors duration-150 hover:ring-1 hover:ring-(--color-accent) cursor-default`}
                                />
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Color Scale Legend */}
                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-(--color-border)/60 font-mono text-[10px] text-(--color-muted)">
                      <span>{copy.less}</span>
                      <div className="flex gap-1">
                        <span className="w-2.5 h-2.5 rounded-[1px] bg-(--color-border)/30" />
                        <span className="w-2.5 h-2.5 rounded-[1px] bg-blue-400/40 dark:bg-blue-500/30" />
                        <span className="w-2.5 h-2.5 rounded-[1px] bg-blue-500/70 dark:bg-blue-400/60" />
                        <span className="w-2.5 h-2.5 rounded-[1px] bg-blue-600 dark:bg-blue-400" />
                        <span className="w-2.5 h-2.5 rounded-[1px] bg-(--color-accent)" />
                      </div>
                      <span>{copy.more}</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Latest 2 Public Commits */}
            {latestCommits.length > 0 && (
              <ScrollReveal delayMs={200} animationClass="animate-editorial-fade">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 font-mono text-xs text-(--color-muted)">
                    <span className="text-(--color-accent) font-bold">■</span>
                    <span className="font-semibold text-(--color-foreground) uppercase tracking-wider">
                      {copy.latestCommitsHeading}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {latestCommits.map((commit, idx) => (
                      <a
                        key={idx}
                        href={commit.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group border border-(--color-border) bg-(--color-background) p-4 rounded-[2px] hover:border-(--color-accent) transition-all duration-200 flex flex-col justify-between gap-3 shadow-2xs"
                      >
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center justify-between gap-2 font-mono text-xs text-(--color-muted)">
                            <span className="font-semibold text-(--color-foreground) truncate">
                              {commit.repo}
                            </span>
                            <span className="px-1.5 py-0.5 border border-(--color-border) text-[10px] rounded-[2px] shrink-0">
                              {commit.sha}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-(--color-foreground) font-normal line-clamp-2 m-0 group-hover:text-(--color-accent) transition-colors">
                            {commit.message}
                          </p>
                        </div>

                        <div className="flex items-center justify-between gap-2 border-t border-(--color-border)/60 pt-2 font-mono text-[11px] text-(--color-muted)">
                          <span>{commit.date}</span>
                          <span className="text-(--color-accent) font-semibold inline-flex items-center gap-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
                            <span>GitHub</span>
                            <span>↗</span>
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}
          </div>
        ) : (
          /* Minimal Truthful Fallback */
          <ScrollReveal delayMs={150} animationClass="animate-editorial-fade">
            <div className="github-hold-card border border-(--color-border) bg-(--color-background) p-5 sm:p-6 flex flex-col gap-4 rounded-[2px]">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-(--color-border) pb-3 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-(--color-accent) font-bold">■</span>
                  <span className="font-semibold text-(--color-foreground)">GITHUB TELEMETRY</span>
                  <span className="text-(--color-border)">/</span>
                  <span className="text-(--color-muted)">github.com/annastriw</span>
                </div>

                <div className="inline-flex items-center gap-2 bg-(--color-surface-subtle,var(--color-background)) px-3 py-0.5 border border-(--color-border) rounded-[2px]">
                  <span className="w-2 h-2 rounded-full bg-amber-500" aria-hidden="true" />
                  <span className="font-semibold text-(--color-foreground) text-[11px]">
                    {copy.signalStatusHolding}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-center">
                <p className="text-xs sm:text-sm text-(--color-muted) leading-relaxed m-0">
                  {copy.fallbackNote}
                </p>

                <a
                  href={profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 px-4 py-2 border border-(--color-border) bg-(--color-surface-subtle,var(--color-background)) hover:border-(--color-accent) font-mono text-xs font-semibold text-(--color-foreground) transition-all duration-200 rounded-[2px]"
                >
                  <span>github.com/annastriw</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
