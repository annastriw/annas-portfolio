/** A small dead band prevents caption flicker while a pinch settles at fitted size. */
export function zoomHidesCaptions(zoom: number, hidden: boolean) {
  if (!Number.isFinite(zoom) || zoom <= 0) return hidden;
  return hidden ? zoom > 1.01 : zoom > 1.04;
}
