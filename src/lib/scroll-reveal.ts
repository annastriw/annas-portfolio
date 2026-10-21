const clamp = (value: number) => Math.max(0, Math.min(1, value));

/** Only children move; every sensor stays in document flow. */
export function sceneProgress(top: number, viewport: number, small = false) {
  return clamp((viewport * 0.88 - top) / Math.max(1, viewport * (small ? 0.22 : 0.28)));
}
// Media senses its own frame, not the copy above it on a stacked layout.
export function frameProgress(top: number, viewport: number, small = false) {
  return clamp((viewport * 0.94 - top) / Math.max(1, viewport * (small ? 0.32 : 0.44)));
}
export function heroExitProgress(top: number, height: number, viewport = height) {
  const start = Math.min(0, viewport - height);
  return clamp((start - top) / Math.max(1, Math.min(height, viewport) * 0.8));
}
export function mountMotionScenes() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};
  const root = document.documentElement;
  const native =
    typeof CSS !== 'undefined' &&
    typeof CSS.registerProperty === 'function' &&
    CSS.supports('animation-timeline: view()') &&
    CSS.supports('animation-range: entry 0px entry 28vh') &&
    CSS.supports('view-timeline-inset: 0 12%');
  root.dataset.motion = native ? 'native' : 'fallback';
  if (native)
    return () => {
      delete root.dataset.motion;
    };
  let scenes = Array.from(document.querySelectorAll<HTMLElement>('[data-scene]'));
  let frame = 0;
  let active = true;
  const previous = new Map<HTMLElement, string>();
  const update = () => {
    frame = 0;
    if (!active || document.hidden) return;
    const small = matchMedia('(max-width: 700px), (max-height: 600px)').matches;
    // Read all geometry before writing. Input-driven frames only, no React renders.
    const progress = scenes.map((scene) => {
      const { top, height } = scene.getBoundingClientRect();
      return String(
        scene.dataset.scene === 'hero'
          ? heroExitProgress(top, height, innerHeight)
          : scene.dataset.scene === 'work-media' || scene.dataset.scene === 'portrait'
            ? frameProgress(top, innerHeight, small)
            : sceneProgress(top, innerHeight, small),
      );
    });
    scenes.forEach((scene, i) => {
      if (previous.get(scene) === progress[i]) return;
      scene.style.setProperty('--scene-progress', progress[i]);
      previous.set(scene, progress[i]);
    });
  };
  const schedule = () => {
    if (active && !frame && !document.hidden) frame = requestAnimationFrame(update);
  };
  const refresh = () => {
    for (const scene of scenes)
      if (!scene.isConnected) {
        scene.style.removeProperty('--scene-progress');
        previous.delete(scene);
      }
    scenes = Array.from(document.querySelectorAll<HTMLElement>('[data-scene]'));
    schedule();
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
  document.addEventListener('toggle', schedule, true);
  document.addEventListener('portfolio-scenes-changed', refresh);
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
    document.removeEventListener('toggle', schedule, true);
    document.removeEventListener('portfolio-scenes-changed', refresh);
    scenes.forEach((scene) => scene.style.removeProperty('--scene-progress'));
    previous.clear();
    delete root.dataset.motion;
  };
}
