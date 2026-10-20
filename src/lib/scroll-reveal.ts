/** Entry progress measured against a viewport inset. Tall media completes when it fills the inset. */
export function revealProgress(top: number, height: number, viewport: number) {
  const inset = viewport * 0.1;
  const distance = Math.min(height, viewport - inset * 2);
  return Math.max(0, Math.min(1, (viewport - inset - top) / Math.max(1, distance)));
}
export function mountRevealFallback() {
  if (
    matchMedia('(prefers-reduced-motion: reduce)').matches ||
    (CSS.supports('animation-timeline: view()') &&
      CSS.supports('animation-range: entry 0% entry 100%') &&
      CSS.supports('timeline-scope: --work-position'))
  )
    return () => {};
  const scenes = Array.from(document.querySelectorAll<HTMLElement>('[data-motion="work"]'))
    .map((scene) => ({ scene, media: scene.querySelector<HTMLElement>('.featured-image') }))
    .filter((item) => item.media !== null);
  if (!scenes.length) return () => {};
  let frame = 0;
  const update = () => {
    frame = 0;
    // Batch geometry reads before writes; at most three featured images, no React renders.
    const progress = scenes.map(({ media }) => {
      const bounds = media!.getBoundingClientRect();
      return revealProgress(bounds.top, bounds.height, innerHeight);
    });
    scenes.forEach(({ scene }, index) =>
      scene.style.setProperty('--work-progress', String(progress[index])),
    );
  };
  const schedule = () => {
    if (!frame && !document.hidden) frame = requestAnimationFrame(update);
  };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  window.addEventListener('pageshow', schedule);
  document.addEventListener('visibilitychange', schedule);
  schedule();
  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', schedule);
    window.removeEventListener('pageshow', schedule);
    document.removeEventListener('visibilitychange', schedule);
    scenes.forEach(({ scene }) => scene.style.removeProperty('--work-progress'));
  };
}
