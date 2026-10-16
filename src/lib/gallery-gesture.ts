/** Horizontal intent changes slides; vertical intent stays native page scrolling. */
export function swipeStep(dx: number, dy: number, width: number): -1 | 0 | 1 {
  const threshold = Math.max(36, Math.min(72, width * 0.14));
  if (Math.abs(dx) < threshold || Math.abs(dx) < Math.abs(dy) * 1.4) return 0;
  return dx < 0 ? 1 : -1;
}
