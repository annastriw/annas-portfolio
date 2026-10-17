/** Entry progress measured against a viewport inset. Tall media completes when it fills the inset. */
export function revealProgress(top: number, height: number, viewport: number) {
  const inset = viewport * 0.1;
  const distance = Math.min(height, viewport - inset * 2);
  return Math.max(0, Math.min(1, (viewport - inset - top) / Math.max(1, distance)));
}
export function mountRevealFallback() {
  if (
    CSS.supports('animation-timeline: view()') &&
    CSS.supports('animation-range: entry 0% entry 100%')
  )
    return () => {};
  const elements = document.querySelectorAll<HTMLElement>('[data-motion="wipe"]');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const element = entry.target as HTMLElement;
        const progress = revealProgress(
          entry.boundingClientRect.top,
          entry.boundingClientRect.height,
          innerHeight,
        );
        element.style.clipPath = `inset(0 0 0 ${(1 - progress) * 100}%)`;
      });
    },
    { threshold: Array.from({ length: 101 }, (_, i) => i / 100) },
  );
  elements.forEach((element) => observer.observe(element));
  return () => {
    observer.disconnect();
    elements.forEach((element) => element.style.removeProperty('clip-path'));
  };
}
