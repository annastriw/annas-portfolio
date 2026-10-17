export function navigationCurrent(path: string, href: string): 'page' | 'location' | undefined {
  const clean = (value: string) => value.split(/[?#]/)[0].replace(/\/+$/, '');
  const current = clean(path);
  const target = clean(href);
  if (current === target) return 'page';
  if (!/^\/(en|id)$/.test(target) && current.startsWith(`${target}/`)) return 'location';
}

export type ArchiveVisit = {
  filter: 'all' | 'web' | 'ml' | 'mobile' | 'interactive';
  slug: string;
  offset: number;
};

export function parseArchiveVisit(value: unknown): ArchiveVisit | null {
  if (!value || typeof value !== 'object') return null;
  const visit = value as ArchiveVisit;
  if (
    !['all', 'web', 'ml', 'mobile', 'interactive'].includes(visit.filter) ||
    typeof visit.slug !== 'string' ||
    !/^[a-z0-9-]{1,80}$/.test(visit.slug) ||
    !Number.isFinite(visit.offset) ||
    Math.abs(visit.offset) > 100000
  )
    return null;
  return { filter: visit.filter, slug: visit.slug, offset: visit.offset };
}
