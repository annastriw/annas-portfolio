import type { Locale } from "@/lib/i18n/config";

interface GitHubSignalProps {
  locale: Locale;
}

// Generate a deterministic 52-week activity distribution grid
function generateActivityWeeks() {
  const weeks: number[][] = [];
  // Deterministic pseudo-random seed generator for static rendering
  let seed = 42;
  function pseudoRandom() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  }

  for (let w = 0; w < 52; w++) {
    const days: number[] = [];
    for (let d = 0; d < 7; d++) {
      const rand = pseudoRandom();
      // 0: none (40%), 1: low (30%), 2: med (18%), 3: high (12%)
      if (rand < 0.38) {
        days.push(0);
      } else if (rand < 0.70) {
        days.push(1);
      } else if (rand < 0.88) {
        days.push(2);
      } else {
        days.push(3);
      }
    }
    weeks.push(days);
  }
  return weeks;
}

const activityWeeks = generateActivityWeeks();

export function GitHubSignal({ locale }: GitHubSignalProps) {
  const isId = locale === "id";

  return (
    <section className="home-github-section" aria-label="GitHub Activity Signal">
      <div className="home-github-container">
        {/* Section Header */}
        <div className="home-section-header">
          <div className="section-header-meta">
            <span className="section-meta-tag">[04 // OPEN SOURCE PRESENCE]</span>
            <span className="section-meta-tag">GITHUB: @annastriw</span>
          </div>
          <div className="section-title-row">
            <h2 className="section-title">
              {isId ? "Aktivitas & Sinyal Repositori GitHub" : "GitHub Activity & Repository Signal"}
            </h2>
            <a
              href="https://github.com/annastriw"
              target="_blank"
              rel="noopener noreferrer"
              className="section-header-link"
            >
              <span>{isId ? "Kunjungi Profil GitHub" : "Visit GitHub Profile"}</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
          <p className="section-subtitle">
            {isId
              ? "Visualisasi kontribusi statis dan aktivitas pengembangan perangkat lunak open-source serta implementasi rekayasa sistem."
              : "Static visualization of open-source software engineering activity, commit cadence, and system implementations."}
          </p>
        </div>

        {/* Heatmap Card */}
        <div className="github-heatmap-card">
          <div className="heatmap-header">
            <div className="heatmap-profile-info">
              <span className="heatmap-badge">■ GITHUB ARCHIVE</span>
              <span className="heatmap-handle">github.com/annastriw</span>
            </div>
            <div className="heatmap-legend">
              <span className="legend-label">{isId ? "Sedikit" : "Less"}</span>
              <span className="legend-cell level-0"></span>
              <span className="legend-cell level-1"></span>
              <span className="legend-cell level-2"></span>
              <span className="legend-cell level-3"></span>
              <span className="legend-label">{isId ? "Banyak" : "More"}</span>
            </div>
          </div>

          {/* Matrix Scroll Container */}
          <div className="heatmap-grid-scroll">
            <div
              className="heatmap-grid"
              role="img"
              aria-label="52-Week GitHub Contribution Activity Matrix"
            >
              {activityWeeks.map((week, wIdx) => (
                <div key={wIdx} className="heatmap-column">
                  {week.map((level, dIdx) => (
                    <span
                      key={dIdx}
                      className={`heatmap-cell level-${level}`}
                      title={`Week ${wIdx + 1}, Day ${dIdx + 1}: Level ${level}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Metric Stats Bar */}
          <div className="heatmap-stats-bar">
            <div className="heatmap-stat-item">
              <span className="stat-label">PUBLIC CODEBASE</span>
              <span className="stat-value">TypeScript / Next.js / Python</span>
            </div>
            <div className="heatmap-stat-item">
              <span className="stat-label">ACTIVITY CADENCE</span>
              <span className="stat-value">52-Week Active Cadence</span>
            </div>
            <div className="heatmap-stat-item">
              <span className="stat-label">TARGET REPOSITORY</span>
              <span className="stat-value">annastriw/annas-portfolio</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
