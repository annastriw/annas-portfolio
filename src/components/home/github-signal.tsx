"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/i18n/config";
import type {
  GitHubTelemetryData,
  GitHubYearContribution,
  GitHubWeekContribution,
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

function getMonthPositions(weeks: GitHubWeekContribution[]) {
  let currentMonth = -1;
  const positions: Array<{ month: number; weekIndex: number }> = [];
  weeks.forEach((week, weekIndex) => {
    const firstValidDay = week.days.find((d) => d !== null);
    if (firstValidDay?.date) {
      const month = parseInt(firstValidDay.date.split("-")[1], 10) - 1;
      if (month !== currentMonth && month >= 0 && month <= 11) {
        currentMonth = month;
        positions.push({ month, weekIndex });
      }
    }
  });
  return positions;
}

export function GitHubSignal({ locale, telemetry }: GitHubSignalProps) {
  const isId = locale === "id";
  const { isLive, years, latestCommits, profileUrl } = telemetry;

  // Selected year state (defaults to the first / most recent year)
  const defaultYear = years.length > 0 ? years[0].year : new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<number>(defaultYear);

  const selectedYearData: GitHubYearContribution | undefined =
    years.find((y) => y.year === selectedYear) || years[0];

  const monthPositions = useMemo(() => {
    return selectedYearData ? getMonthPositions(selectedYearData.weeks) : [];
  }, [selectedYearData]);

  const copy = {
    tag: "[03 // GITHUB]",
    subtag: isId ? "AKTIVITAS PENGEMBANGAN" : "DEVELOPMENT SIGNAL",
    title: isId ? "Aktivitas GitHub" : "GitHub Signal",
    subtitle: isId
      ? "Arsip kontribusi kode publik dan commit terbaru di GitHub @annastriw."
      : "Public code contribution archive and recent commit activity for @annastriw on GitHub.",
    visitProfile: isId ? "Lihat Profil GitHub" : "Visit GitHub Profile",
    contributionSignal: isId ? "SINYAL KONTRIBUSI" : "CONTRIBUTION SIGNAL",
    totalContributionsIn: isId ? "kontribusi pada" : "contributions in",
    latestCommitsHeading: isId ? "COMMIT PUBLIK TERAKHIR" : "LATEST COMMITS",
    signalStatusLive: isId ? "SINYAL AKTIF" : "LIVE SIGNAL",
    signalStatusHolding: isId ? "INTEGRASI: MENUNGGU TOKEN" : "INTEGRATION: PENDING API",
    yearSelectorLabel: isId ? "TAHUN ARSIP" : "ARCHIVE YEAR",
    less: isId ? "Sedikit" : "Less",
    more: isId ? "Banyak" : "More",
    fallbackUnavailable: isId
      ? "Data aktivitas sementara tidak tersedia."
      : "Activity data is temporarily unavailable.",
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
            <span>github.com/annastriw</span>
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
            {/* Top Control Bar: Contribution Signal Title + Inline Total + Mobile Year Tabs */}
            <ScrollReveal delayMs={100} animationClass="animate-editorial-fade">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-(--color-border) pb-3">
                {/* Left: Contribution Signal & Inline Total */}
                <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                  <div className="inline-flex items-center gap-2">
                    <span className="text-(--color-accent) font-bold">■</span>
                    <span className="font-semibold text-(--color-foreground) uppercase tracking-wider">
                      {copy.contributionSignal}
                    </span>
                  </div>

                  <span className="text-(--color-border) hidden sm:inline" aria-hidden="true">
                    /
                  </span>

                  <div className="inline-flex items-center gap-1.5 bg-(--color-surface-subtle,var(--color-background)) px-2.5 py-1 border border-(--color-border) rounded-[2px]">
                    <span
                      className="w-2 h-2 rounded-full bg-emerald-500 animate-subtle-beacon shrink-0"
                      aria-hidden="true"
                    />
                    <span className="font-semibold text-(--color-foreground)">
                      {selectedYearData.totalContributions.toLocaleString()}
                    </span>
                    <span className="text-(--color-muted)">
                      {copy.totalContributionsIn} {selectedYear}
                    </span>
                  </div>
                </div>

                {/* Mobile / Tablet Horizontal Year Selector (< lg) */}
                <div
                  className="flex lg:hidden items-center gap-1 p-0.5 border border-(--color-border) bg-(--color-surface-subtle,var(--color-background)) rounded-[2px]"
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
                        className={`px-2.5 py-1 font-mono text-xs font-medium rounded-[2px] transition-all duration-150 cursor-pointer ${
                          isSelected
                            ? "bg-(--color-foreground) text-(--color-background) font-semibold shadow-2xs"
                            : "text-(--color-muted) hover:text-(--color-foreground)"
                        }`}
                      >
                        {yearObj.year}
                      </button>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>

            {/* Matrix Card + Desktop Vertical Year Selector Rail */}
            <ScrollReveal delayMs={150} animationClass="animate-editorial-fade">
              <div className="flex flex-col lg:flex-row gap-3 items-stretch">
                {/* Main Contribution Matrix Card */}
                <div className="github-matrix-card grow min-w-0 border border-(--color-border) bg-(--color-background) p-4 sm:p-5 rounded-[2px] overflow-hidden flex flex-col gap-3">
                  <div className="overflow-x-auto pb-2 scrollbar-thin">
                    <div className="min-w-[680px] sm:min-w-[720px] flex flex-col gap-2">
                      {/* Month Labels Header (Pixel-aligned to 53 week columns) */}
                      <div className="flex items-center pl-7">
                        <div
                          className="grid w-full font-mono text-[10px] text-(--color-muted) uppercase tracking-wider"
                          style={{
                            gridTemplateColumns: "repeat(53, minmax(0, 1fr))",
                            columnGap: "3px",
                          }}
                        >
                          {monthPositions.map((pos) => (
                            <span
                              key={pos.month}
                              style={{ gridColumnStart: pos.weekIndex + 1 }}
                              className="col-span-4 truncate select-none"
                            >
                              {monthNames[locale][pos.month]}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Matrix Grid (Weekday labels + 53 Weeks x 7 Days) */}
                      <div className="flex items-start gap-2">
                        {/* Weekday Labels (Sun to Sat, highlighting Mon, Wed, Fri) */}
                        <div
                          className="grid font-mono text-[9px] text-(--color-muted) shrink-0 w-5 select-none"
                          style={{
                            gridTemplateRows: "repeat(7, minmax(0, 1fr))",
                            rowGap: "3px",
                          }}
                        >
                          <span className="h-2.5 sm:h-3" />
                          <span className="h-2.5 sm:h-3 flex items-center leading-none">
                            {dayNames[locale][1]}
                          </span>
                          <span className="h-2.5 sm:h-3" />
                          <span className="h-2.5 sm:h-3 flex items-center leading-none">
                            {dayNames[locale][3]}
                          </span>
                          <span className="h-2.5 sm:h-3" />
                          <span className="h-2.5 sm:h-3 flex items-center leading-none">
                            {dayNames[locale][5]}
                          </span>
                          <span className="h-2.5 sm:h-3" />
                        </div>

                        {/* 53 Weeks Columns */}
                        <div
                          className="grid grow"
                          style={{
                            gridTemplateColumns: "repeat(53, minmax(0, 1fr))",
                            columnGap: "3px",
                          }}
                        >
                          {selectedYearData.weeks.map((week, wIdx) => (
                            <div
                              key={wIdx}
                              className="grid"
                              style={{
                                gridTemplateRows: "repeat(7, minmax(0, 1fr))",
                                rowGap: "3px",
                              }}
                            >
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
                                  "bg-(--color-border)/35 dark:bg-(--color-border)/40",
                                  "bg-blue-400/40 dark:bg-blue-500/30",
                                  "bg-blue-500/70 dark:bg-blue-400/60",
                                  "bg-blue-600 dark:bg-blue-400",
                                  "bg-(--color-accent)",
                                ];

                                return (
                                  <div
                                    key={dIdx}
                                    title={`${day.date}: ${day.count} ${copy.totalContributionsIn} ${selectedYear}`}
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
                          <span className="w-2.5 h-2.5 rounded-[1px] bg-(--color-border)/35 dark:bg-(--color-border)/40" />
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

                {/* Desktop Compact Vertical Year Selector Rail (>= lg) */}
                <div className="hidden lg:flex flex-col justify-between w-32 shrink-0 border border-(--color-border) bg-(--color-background) p-2.5 rounded-[2px]">
                  <div className="font-mono text-[10px] uppercase font-semibold text-(--color-muted) tracking-wider px-2 py-1 border-b border-(--color-border)/60 mb-2">
                    {copy.yearSelectorLabel}
                  </div>

                  <div className="flex flex-col gap-1.5 grow justify-around" role="tablist" aria-label="GitHub contribution year selector">
                    {years.map((yearObj) => {
                      const isSelected = yearObj.year === selectedYear;
                      return (
                        <button
                          key={yearObj.year}
                          type="button"
                          role="tab"
                          aria-selected={isSelected}
                          onClick={() => setSelectedYear(yearObj.year)}
                          className={`w-full flex items-center justify-between px-2.5 py-2 font-mono text-xs rounded-[2px] transition-all duration-150 cursor-pointer ${
                            isSelected
                              ? "bg-(--color-foreground) text-(--color-background) font-semibold shadow-xs"
                              : "text-(--color-muted) hover:text-(--color-foreground) hover:bg-(--color-surface-subtle,rgba(0,0,0,0.03))"
                          }`}
                        >
                          <span>{yearObj.year}</span>
                          <span
                            className={`text-[10px] tabular-nums ${
                              isSelected ? "opacity-80" : "text-(--color-muted)"
                            }`}
                          >
                            {yearObj.totalContributions}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-2 border-t border-(--color-border)/60 font-mono text-[9px] text-(--color-muted) text-center">
                    TELEMETRY
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
                    {latestCommits.slice(0, 2).map((commit, idx) => (
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
                              {String(idx + 1).padStart(2, "0")} / {commit.repo}
                            </span>
                            <span className="px-1.5 py-0.5 border border-(--color-border) text-[10px] rounded-[2px] shrink-0 font-mono">
                              {commit.sha}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-(--color-foreground) font-normal line-clamp-2 m-0 group-hover:text-(--color-accent) transition-colors">
                            {commit.message}
                          </p>
                        </div>

                        <div className="flex items-center justify-between gap-2 border-t border-(--color-border)/60 pt-2 font-mono text-[11px] text-(--color-muted)">
                          <span>
                            {commit.sha} · {commit.date}
                          </span>
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
          /* Truthful Fallback State (when token or API is unavailable) */
          <ScrollReveal delayMs={150} animationClass="animate-editorial-fade">
            <div className="github-hold-card border border-(--color-border) bg-(--color-background) p-5 sm:p-6 flex flex-col gap-4 rounded-[2px]">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-(--color-border) pb-3 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-(--color-accent) font-bold">■</span>
                  <span className="font-semibold text-(--color-foreground)">GITHUB SIGNAL</span>
                </div>

                <div className="inline-flex items-center gap-2 bg-(--color-surface-subtle,var(--color-background)) px-2.5 py-0.5 border border-(--color-border) rounded-[2px] text-[11px] text-(--color-muted)">
                  <span>{copy.signalStatusHolding}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-xs sm:text-sm text-(--color-muted) m-0 leading-relaxed">
                  {copy.fallbackUnavailable}
                </p>

                <a
                  href={profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-(--color-accent) hover:underline transition-colors shrink-0"
                >
                  <span>github.com/annastriw</span>
                  <span
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  >
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
