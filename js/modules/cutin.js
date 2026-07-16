// ============================================================
// js/modules/cutin.js
// ============================================================
export function initCutin() {
  const IS_MOBILE = window.matchMedia('(max-width:800px)').matches;
  const PREFERS_REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (IS_MOBILE || PREFERS_REDUCED) return;
  const cutin = document.getElementById('cutinImg');
  if (!cutin) return;
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    cutin.style.transform = `translateY(${scrolled * 0.15}px)`;
  }, { passive: true });
}