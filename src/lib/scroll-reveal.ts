const clamp = (value: number) => Math.max(0, Math.min(1, value));
// Viewport anchors mirror the length-based entry ranges in motion.css.
// The window does not shrink with a short heading or grow with a tall timeline.
export function revealProgress(top: number, _height: number, viewport: number, small = false) {
  return clamp((viewport * 0.94 - top) / Math.max(1, viewport * (small ? 0.38 : 0.41)));
}
export function readingProgress(top: number, viewport: number) {
  return clamp((viewport * 0.9 - top) / Math.max(1, viewport * 0.54));
}
export function titleProgress(top: number, _height: number, viewport: number, small = false) {
  return clamp(
    (viewport * (small ? 0.93 : 0.9) - top) / Math.max(1, viewport * (small ? 0.29 : 0.3)),
  );
}
export function heroExitProgress(top: number, height: number, viewport = height) {
  const start = Math.min(0, viewport - height);
  return clamp((start - top) / Math.max(1, Math.min(height, viewport) * 0.8));
}
export function mountRevealFallback() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};
  const nativeTimeline =
    typeof CSS !== 'undefined' &&
    CSS.supports('animation-timeline: view()') &&
    CSS.supports('animation-range: entry 0px entry 41vh') &&
    CSS.supports('view-timeline-inset: 0 6%');
  const nativeWork = nativeTimeline && CSS.supports('timeline-scope: --work-position');
  const scenes: {
    scene: HTMLElement;
    target: HTMLElement;
    property: string;
    kind?: 'title' | 'exit' | 'media';
  }[] = [];
  if (!nativeWork) {
    document.querySelectorAll<HTMLElement>('[data-motion="work"]').forEach((scene) => {
      const target = scene.querySelector<HTMLElement>('.featured-image');
      if (target) scenes.push({ scene, target, property: '--work-progress', kind: 'media' });
    });
  }
  if (!nativeTimeline) {
    document
      .querySelectorAll<HTMLElement>('.hero')
      .forEach((scene) =>
        scenes.push({ scene, target: scene, property: '--hero-exit-progress', kind: 'exit' }),
      );
    document
      .querySelectorAll<HTMLElement>('.scroll-title')
      .forEach((scene) =>
        scenes.push({ scene, target: scene, property: '--title-progress', kind: 'title' }),
      );
    document
      .querySelectorAll<HTMLElement>('.featured-copy')
      .forEach((scene) => scenes.push({ scene, target: scene, property: '--copy-progress' }));
    document
      .querySelectorAll<HTMLElement>('.timeline-item')
      .forEach((scene) => scenes.push({ scene, target: scene, property: '--experience-progress' }));
  }
  if (!scenes.length) return () => {};
  let frame = 0;
  let active = true;
  const update = () => {
    frame = 0;
    if (!active || document.hidden) return;
    const small = matchMedia('(max-width: 700px)').matches;
    // One input-driven batch; no idle animation loop or React renders.
    const progress = scenes.map(({ target, kind }) => {
      const bounds = target.getBoundingClientRect();
      if (kind === 'exit') return heroExitProgress(bounds.top, bounds.height, innerHeight);
      if (kind === 'title') return titleProgress(bounds.top, bounds.height, innerHeight, small);
      if (kind === 'media') return revealProgress(bounds.top, bounds.height, innerHeight, small);
      return readingProgress(bounds.top, innerHeight);
    });
    scenes.forEach(({ scene, property }, index) =>
      scene.style.setProperty(property, String(progress[index])),
    );
  };
  const schedule = () => {
    if (active && !frame && !document.hidden) frame = requestAnimationFrame(update);
  };
  const visibility = () => {
    if (document.hidden) {
      cancelAnimationFrame(frame);
      frame = 0;
    } else schedule();
  };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  window.addEventListener('pageshow', schedule);
  document.addEventListener('visibilitychange', visibility);
  document.addEventListener('load', schedule, true);
  document.fonts?.ready.then(schedule);
  schedule();
  return () => {
    active = false;
    cancelAnimationFrame(frame);
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', schedule);
    window.removeEventListener('pageshow', schedule);
    document.removeEventListener('visibilitychange', visibility);
    document.removeEventListener('load', schedule, true);
    scenes.forEach(({ scene, property }) => scene.style.removeProperty(property));
  };
}
