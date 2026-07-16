// ============================================================
// js/modules/particles.js
// ============================================================
export function initParticles() {
  const bgLayer = document.getElementById('bg-layer');
  const PREFERS_REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const IS_MOBILE = window.matchMedia('(max-width:800px)').matches;
  if (!bgLayer || PREFERS_REDUCED) return;
  const container = document.createElement('div');
  container.className = 'particle-container';
  bgLayer.appendChild(container);
  const count = IS_MOBILE ? 15 : 40;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (4 + Math.random() * 6) + 's';
    p.style.animationDelay = (Math.random() * 8) + 's';
    const size = 2 + Math.random() * 4;
    p.style.width = size + 'px'; p.style.height = size + 'px';
    container.appendChild(p);
  }
}