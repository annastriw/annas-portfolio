/** Keep the tooltip inside its calendar while its caret follows the actual day. */
export function contributionAnchor(width: number, center: number) {
  const half = Math.min(110, Math.max(0, (width - 16) / 2));
  const x = Math.max(half + 8, Math.min(width - half - 8, center));
  return { x, arrow: Math.max(-half + 12, Math.min(half - 12, center - x)) };
}
