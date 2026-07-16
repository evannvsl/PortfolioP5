// ============================================================
// js/modules/effects.js
// ============================================================
export function initEffects() {
  const PREFERS_REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (PREFERS_REDUCED) return;
  const breach = document.getElementById('breach-overlay');
  const chromatic = document.getElementById('chromatic-layer');

  function triggerBreach() {
    if (breach) { breach.classList.remove('active'); void breach.offsetWidth; breach.classList.add('active'); }
    setTimeout(triggerBreach, 6000 + Math.random() * 8000);
  }
  function triggerChromatic() {
    if (chromatic) { chromatic.classList.remove('active'); void chromatic.offsetWidth; chromatic.classList.add('active'); }
    setTimeout(triggerChromatic, 9000 + Math.random() * 10000);
  }
  setTimeout(triggerBreach, 4000);
  setTimeout(triggerChromatic, 7000);
}