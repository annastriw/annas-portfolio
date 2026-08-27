export interface GitHubDayContribution {
  date: string;
  count: number;
  weekday: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface GitHubWeekContribution {
  days: (GitHubDayContribution | null)[];
}

export interface GitHubYearContribution {
  year: number;
  totalContributions: number;
  weeks: GitHubWeekContribution[];
}

export interface GitHubCommitItem {
  repo: string;
  repoUrl: string;
  message: string;
  sha: string;
  date: string;
  url: string;
}

export interface GitHubTelemetryData {
  username: string;
  profileUrl: string;
  isLive: boolean;
  years: GitHubYearContribution[];
  latestCommits: GitHubCommitItem[];
}

function mapContributionLevel(
  levelStr?: string,
  count = 0,
): 0 | 1 | 2 | 3 | 4 {
  if (levelStr === "FIRST_QUARTILE") return 1;
  if (levelStr === "SECOND_QUARTILE") return 2;
  if (levelStr === "THIRD_QUARTILE") return 3;
  if (levelStr === "FOURTH_QUARTILE") return 4;
  if (levelStr === "NONE") return 0;

  // Fallback if levelStr is missing
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

export async function getGitHubTelemetry(): Promise<GitHubTelemetryData> {
  const username = "annastriw";
  const profileUrl = "https://github.com/annastriw";
  const currentYear = new Date().getFullYear();
  const targetYears = [
    currentYear,
    currentYear - 1,
    currentYear - 2,
    currentYear - 3,
  ];

  const fallbackData: GitHubTelemetryData = {
    username,
    profileUrl,
    isLive: false,
    years: [],
    latestCommits: [],
  };

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return fallbackData;
  }

  try {
    // 1. Fetch 4-year GraphQL contributions in parallel
    const yearPromises = targetYears.map(async (year) => {
      const from = `${year}-01-01T00:00:00Z`;
      const to = `${year}-12-31T23:59:59Z`;
      const query = `query($username: String!, $from: DateTime, $to: DateTime) {
        user(login: $username) {
          contributionsCollection(from: $from, to: $to) {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  contributionLevel
                  date
                  weekday
                }
              }
            }
          }
        }
      }`;

      const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "User-Agent": "annas-portfolio-telemetry",
        },
        body: JSON.stringify({ query, variables: { username, from, to } }),
        next: { revalidate: 3600 },
      });

      if (!res.ok) return null;

      const json = await res.json();
      const calendar =
        json.data?.user?.contributionsCollection?.contributionCalendar;

      if (!calendar) return null;

      const rawWeeks: Array<{
        contributionDays: Array<{
          contributionCount: number;
          contributionLevel?: string;
          date: string;
          weekday: number;
        }>;
      }> = calendar.weeks || [];

      // Normalize each week to 7 days (0: Sun, 1: Mon, ..., 6: Sat)
      const weeks: GitHubWeekContribution[] = rawWeeks.map((w) => {
        const days: (GitHubDayContribution | null)[] = [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
        ];
        for (const d of w.contributionDays) {
          if (d.weekday >= 0 && d.weekday <= 6) {
            days[d.weekday] = {
              date: d.date,
              count: d.contributionCount,
              weekday: d.weekday,
              level: mapContributionLevel(
                d.contributionLevel,
                d.contributionCount,
              ),
            };
          }
        }
        return { days };
      });

      return {
        year,
        totalContributions: calendar.totalContributions || 0,
        weeks,
      };
    });

    // 2. Fetch latest 2 public commits authored by annastriw
    const commitsPromise = (async () => {
      try {
        const res = await fetch(
          `https://api.github.com/search/commits?q=author:${username}&sort=author-date&order=desc&per_page=5`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/vnd.github.cloak-preview+json, application/vnd.github.v3+json",
              "User-Agent": "annas-portfolio-telemetry",
            },
            next: { revalidate: 1800 },
          },
        );

        if (!res.ok) return [];

        const json = await res.json();
        const items: Array<{
          repository?: { full_name?: string; html_url?: string };
          commit?: { message?: string; author?: { date?: string } };
          sha?: string;
          html_url?: string;
        }> = json.items || [];

        const commits: GitHubCommitItem[] = [];
        for (const item of items) {
          if (commits.length >= 2) break;
          const repo = item.repository?.full_name || "annastriw/annas-portfolio";
          const repoUrl = item.repository?.html_url || `https://github.com/${repo}`;
          const message = (item.commit?.message || "Commit update").split("\n")[0];
          const sha = (item.sha || "").slice(0, 7) || "latest";
          const date = item.commit?.author?.date
            ? item.commit.author.date.slice(0, 10)
            : new Date().toISOString().slice(0, 10);
          const url = item.html_url || `${repoUrl}/commit/${item.sha}`;

          commits.push({
            repo,
            repoUrl,
            message,
            sha,
            date,
            url,
          });
        }

        return commits;
      } catch {
        return [];
      }
    })();

    const [yearsResults, latestCommits] = await Promise.all([
      Promise.all(yearPromises),
      commitsPromise,
    ]);

    const validYears = yearsResults.filter(
      (y): y is GitHubYearContribution => y !== null,
    );

    if (validYears.length === 0) {
      return fallbackData;
    }

    return {
      username,
      profileUrl,
      isLive: true,
      years: validYears,
      latestCommits,
    };
  } catch {
    return fallbackData;
  }
}
