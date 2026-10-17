export type ContributionDay = { date: string; level: number; count: number | null };

/** Read public cells and their associated GitHub tooltip; never infer counts from color. */
export function parseContributions(html: string): ContributionDay[] {
  const counts = new Map<string, number>();
  for (const match of html.matchAll(/<tool-tip\b([^>]*)>([\s\S]*?)<\/tool-tip>/g)) {
    const target = match[1].match(/\bfor="([^"]+)"/)?.[1];
    const text = match[2].replace(/<[^>]*>/g, '').trim();
    const value = text.match(/^(No|[\d,]+) contributions?\b/i)?.[1];
    if (target && value)
      counts.set(target, value.toLowerCase() === 'no' ? 0 : Number(value.replaceAll(',', '')));
  }
  return Array.from(html.matchAll(/<td\b[^>]*data-date=[^>]+>/g))
    .flatMap(([tag]) => {
      const date = tag.match(/data-date="([^"]+)"/)?.[1];
      const level = Number(tag.match(/data-level="(\d)"/)?.[1]);
      const id = tag.match(/\bid="([^"]+)"/)?.[1];
      if (
        !date ||
        !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
        !Number.isInteger(level) ||
        level < 0 ||
        level > 4
      )
        return [];
      return [{ date, level, count: (id ? counts.get(id) : undefined) ?? null }];
    })
    .sort((a, b) => a.date.localeCompare(b.date));
}
