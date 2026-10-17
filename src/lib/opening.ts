export function needsOpening(home: boolean, opened: boolean, replay: boolean, reduced: boolean) {
  return home && !reduced && (!opened || replay);
}
// Runs before paint: hold the greeting until hydration starts its real animation clock.
export const openingBootstrap = `(()=>{const r=document.documentElement;const h=/^\\/(en|id)\\/?$/.test(location.pathname);if(!h||matchMedia('(prefers-reduced-motion: reduce)').matches)return;let play=true;try{play=!sessionStorage.getItem('portfolio-opened')||!!sessionStorage.getItem('portfolio-replay-opening')}catch{}if(play){r.dataset.opening='pending';setTimeout(()=>{if(r.dataset.opening==='pending')delete r.dataset.opening},4000)}})()`;
