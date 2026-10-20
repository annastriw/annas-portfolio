/** Computed CSS time tokens may be serialized as seconds even when authored in ms. */
export function motionMilliseconds(value: string, fallback: number) {
  const match = /^\s*(\d*\.?\d+)(ms|s)\s*$/.exec(value);
  if (!match) return fallback;
  return Number(match[1]) * (match[2] === 's' ? 1000 : 1);
}
