import { parseArchiveVisit, type ArchiveVisit } from './navigation';

const key = 'portfolio-archive-visit';
const pendingKey = 'portfolio-archive-navigation';
type Entry = { path: string; visit: ArchiveVisit };

function readEntry(value: unknown, path: string): ArchiveVisit | null {
  if (!value || typeof value !== 'object') return null;
  const entry = value as Entry;
  return entry.path === path ? parseArchiveVisit(entry.visit) : null;
}

function saveEntry(path: string, visit: ArchiveVisit) {
  window.history.replaceState({ ...window.history.state, [key]: { path, visit } }, '');
}

function pending(path: string): ArchiveVisit | null {
  try {
    const value = JSON.parse(sessionStorage.getItem(pendingKey) || 'null');
    if (!value || typeof value.time !== 'number' || !Number.isFinite(value.time)) return null;
    const age = Date.now() - value.time;
    if (age < 0 || age > 10000) return null;
    return readEntry(value, path);
  } catch {
    return null;
  }
}

export function archiveSnapshot(path: string): string {
  const visit = pending(path) || readEntry(window.history.state?.[key], path);
  return visit ? JSON.stringify(visit) : '';
}

export function captureArchive(path: string, detailPath: string, visit: ArchiveVisit) {
  saveEntry(path, visit);
  queueReturn(detailPath, visit);
}

export function queueReturn(path: string, visit: ArchiveVisit) {
  try {
    sessionStorage.setItem(pendingKey, JSON.stringify({ path, visit, time: Date.now() }));
  } catch {
    /* The link still navigates normally when storage is unavailable. */
  }
}

export function settleArchiveEntry(path: string): ArchiveVisit | null {
  const visit = pending(path);
  if (visit) {
    saveEntry(path, visit);
    try {
      sessionStorage.removeItem(pendingKey);
    } catch {
      /* Optional visit memory. */
    }
  }
  return visit || readEntry(window.history.state?.[key], path);
}

export function clearArchiveNavigation() {
  try {
    sessionStorage.removeItem(pendingKey);
  } catch {
    /* Optional visit memory. */
  }
  const state = { ...window.history.state };
  delete state[key];
  window.history.replaceState(state, '');
  window.dispatchEvent(new Event('portfolio-archive-reset'));
}
