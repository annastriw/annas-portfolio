export function needsOpening(home: boolean, opened: boolean, replay: boolean, reduced: boolean) {
  return home && !reduced && (!opened || replay);
}
// Start before hydration; late JavaScript must never add a second two-second wait.
export const openingBootstrap = `(()=>{const r=document.documentElement;const h=['/en','/en/','/id','/id/'].includes(location.pathname);if(!h)return;const handedOff=location.search==='?welcome=done';const replay=location.search==='?intro=1';if(replay||handedOff)history.replaceState(history.state,'',location.pathname+(location.hash||''));if(handedOff){r.dataset.openingBooted='true';try{sessionStorage.setItem('portfolio-opened','true');sessionStorage.removeItem('portfolio-replay-opening')}catch{}return}if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;let play=true;try{play=replay||!sessionStorage.getItem('portfolio-opened')||!!sessionStorage.getItem('portfolio-replay-opening')}catch{}if(play){r.dataset.openingBooted='true';r.dataset.opening='pending';r.dataset.openingAt=String(Date.now());try{sessionStorage.setItem('portfolio-opened','true');sessionStorage.removeItem('portfolio-replay-opening')}catch{}setTimeout(()=>{delete r.dataset.opening;delete r.dataset.openingAt},2000)}})()`;
export const OPENING_DURATION = 2000;

// This runs before hydration. The one-use URL marker also works when storage is blocked.
export const entryBootstrap = `setTimeout(()=>{try{sessionStorage.setItem('portfolio-opened','true');sessionStorage.removeItem('portfolio-replay-opening')}catch{}location.replace('/en/?welcome=done')},${OPENING_DURATION})`;
