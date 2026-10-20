/** Entry progress measured against a viewport inset. Tall media completes when it fills the inset. */
export function revealProgress(top: number, height: number, viewport: number) {
  const inset = viewport * 0.1;
  const distance = Math.min(height, viewport - inset * 2);
  return Math.max(0, Math.min(1, (viewport - inset - top) / Math.max(1, distance)));
}
/** Give even a single-line heading enough scroll distance to reveal at a reading position. */
export function titleProgress(top: number, height: number, viewport: number) {
  return revealProgress(top, Math.max(height, viewport * 0.36), viewport);
}
export function heroExitProgress(top: number, height: number) {
  return Math.max(0, Math.min(1, -top / Math.max(1, height * 0.75)));
}
export function mountRevealFallback() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};
  const nativeTimeline =
    CSS.supports('animation-timeline: view()') &&
    CSS.supports('animation-range: entry 0% entry 100%');
  const nativeWork = nativeTimeline && CSS.supports('timeline-scope: --work-position');
  const scenes: {
    scene: HTMLElement;
    target: HTMLElement;
    property: string;
    kind?: 'title' | 'exit';
  }[] = [];
  if (!nativeWork) {
    document.querySelectorAll<HTMLElement>('[data-motion="work"]').forEach((scene) => {
      const target = scene.querySelector<HTMLElement>('.featured-image');
      if (target) scenes.push({ scene, target, property: '--work-progress' });
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
  const update = () => {
    frame = 0;
    // One input-driven batch; no idle animation loop or React renders.
    const progress = scenes.map(({ target, kind }) => {
      const bounds = target.getBoundingClientRect();
      if (kind === 'exit') return heroExitProgress(bounds.top, bounds.height);
      if (kind === 'title') return titleProgress(bounds.top, bounds.height, innerHeight);
      return revealProgress(bounds.top, bounds.height, innerHeight);
    });
    scenes.forEach(({ scene, property }, index) =>
      scene.style.setProperty(property, String(progress[index])),
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
    scenes.forEach(({ scene, property }) => scene.style.removeProperty(property));
  };
}
