import type { Locale } from "@/lib/i18n/config";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface GitHubSignalProps {
  locale: Locale;
}

export function GitHubSignal({ locale }: GitHubSignalProps) {
  const isId = locale === "id";

  const copy = {
    tag: "[03 // GITHUB]",
    subtag: isId ? "AKTIVITAS PENGEMBANGAN" : "DEVELOPMENT ACTIVITY",
    title: isId ? "Aktivitas GitHub" : "GitHub Activity",
    subtitle: isId
      ? "Aktivitas repository dan commit terbaru akan ditampilkan setelah integrasi data GitHub diaktifkan."
      : "Live repository activity and recent commits will appear here once the GitHub data connection is enabled.",
    visitProfile: isId ? "Lihat Profil GitHub" : "Visit GitHub Profile",
    telemetryTitle: "GITHUB INTEGRATION SIGNAL",
    telemetryHandle: "github.com/annastriw",
    statusBadge: isId ? "INTEGRASI: MENUNGGU API" : "INTEGRATION: PENDING API",
    statusNote: isId
      ? "Koneksi data langsung ke repository @annastriw sedang disiapkan dan akan diaktifkan pada pembaruan mendatang."
      : "Direct data stream to @annastriw public repositories is queued and will be activated in an upcoming update.",
    hubLabel: isId ? "PUSAT REPOSITORY" : "REPOSITORY HUB",
  };

  return (
    <section
      className="home-github-section py-8 sm:py-12 md:py-14 border-b border-(--color-border)"
      aria-label={copy.title}
    >
      <div className="home-github-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6 sm:gap-8">
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal animationClass="animate-editorial-fade" className="home-section-header flex flex-col md:flex-row md:items-end justify-between gap-4">
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
            href="https://github.com/annastriw"
            target="_blank"
            rel="noopener noreferrer"
            className="section-header-link group inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-(--color-accent) hover:underline self-start md:self-end transition-colors"
          >
            <span>{copy.visitProfile}</span>
            <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true">
              ↗
            </span>
          </a>
        </ScrollReveal>

        {/* Truthful Editorial Hold State Container with Scroll Reveal */}
        <ScrollReveal delayMs={150} animationClass="animate-editorial-fade">
          <div className="github-hold-card border border-(--color-border) bg-(--color-background) p-5 sm:p-6 flex flex-col gap-4 rounded-[2px] hover:border-(--color-accent) transition-colors duration-300">
            {/* Top Telemetry Rail */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-(--color-border) pb-3 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="text-(--color-accent) font-bold">■</span>
                <span className="font-semibold text-(--color-foreground)">{copy.telemetryTitle}</span>
                <span className="text-(--color-border)">/</span>
                <span className="text-(--color-muted)">{copy.telemetryHandle}</span>
              </div>

              <div className="inline-flex items-center gap-2 bg-(--color-surface-subtle,var(--color-background)) px-3 py-0.5 border border-(--color-border) rounded-[2px]">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-subtle-beacon" aria-hidden="true" />
                <span className="font-semibold text-(--color-foreground) text-[11px]">
                  {copy.statusBadge}
                </span>
              </div>
            </div>

            {/* Editorial Information Spread */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-center">
              <div className="flex flex-col gap-1 max-w-xl">
                <span className="font-mono text-xs text-(--color-accent) font-semibold uppercase tracking-wider">
                  {copy.hubLabel}
                </span>
                <p className="text-xs sm:text-sm text-(--color-muted) leading-relaxed m-0">
                  {copy.statusNote}
                </p>
              </div>

              <a
                href="https://github.com/annastriw"
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
      </div>
    </section>
  );
}
