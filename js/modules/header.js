// ============================================================
// js/modules/header.js
// ============================================================
export function initHeaderScroll() {
  const header = document.getElementById('siteHeader');
  if (!header) return;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { header.classList.toggle('scrolled', window.scrollY > 40); ticking = false; });
  }, { passive: true });
}