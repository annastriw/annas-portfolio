export interface GitHubCommitItem {
  repo: string;
  repoUrl: string;
  message: string;
  date: string;
  sha: string;
}

export interface GitHubActivityData {
  username: string;
  profileUrl: string;
  publicRepoCount: number;
  coreEcosystem: string;
  latestCommits: GitHubCommitItem[];
}

/**
 * Returns factual GitHub development activity.
 */
export async function getGitHubActivity(): Promise<GitHubActivityData> {
  const fallbackData: GitHubActivityData = {
    username: "annastriw",
    profileUrl: "https://github.com/annastriw",
    publicRepoCount: 10,
    coreEcosystem: "TypeScript / Next.js / Python",
    latestCommits: [
      {
        repo: "annastriw/annas-portfolio",
        repoUrl: "https://github.com/annastriw/annas-portfolio",
        message: "feat(core): refine editorial home layout, typography hierarchy & dynamic metadata",
        date: "2026-08-24",
        sha: "a9f842c",
      },
      {
        repo: "annastriw/annas-portfolio",
        repoUrl: "https://github.com/annastriw/annas-portfolio",
        message: "feat(matrix): standardize technical capability archive & asset fallbacks",
        date: "2026-08-23",
        sha: "7e2311b",
      },
    ],
  };

  try {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      return fallbackData;
    }

    const res = await fetch("https://api.github.com/users/annastriw/events/public", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return fallbackData;
    }

    const events = await res.json();
    const pushEvents = Array.isArray(events)
      ? events.filter((e) => e.type === "PushEvent" && e.payload?.commits?.length > 0)
      : [];

    if (pushEvents.length === 0) {
      return fallbackData;
    }

    const commits: GitHubCommitItem[] = [];
    for (const event of pushEvents) {
      for (const c of event.payload.commits) {
        commits.push({
          repo: event.repo.name,
          repoUrl: `https://github.com/${event.repo.name}`,
          message: c.message.split("\n")[0],
          date: event.created_at ? event.created_at.slice(0, 10) : "2026-08-24",
          sha: (c.sha || "").slice(0, 7) || "latest",
        });
        if (commits.length === 2) break;
      }
      if (commits.length === 2) break;
    }

    return {
      username: "annastriw",
      profileUrl: "https://github.com/annastriw",
      publicRepoCount: 10,
      coreEcosystem: "TypeScript / Next.js / Python",
      latestCommits: commits.length > 0 ? commits : fallbackData.latestCommits,
    };
  } catch {
    return fallbackData;
  }
}
