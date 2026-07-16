// ============================================================
// js/modules/bgglow.js
// ============================================================
export function initBgGlow() {
  const glow = document.getElementById('bg-glow');
  const IS_MOBILE = window.matchMedia('(max-width:800px)').matches;
  const PREFERS_REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!glow || IS_MOBILE || PREFERS_REDUCED) return;
  let mouseX = 0, mouseY = 0, currentX = 0, currentY = 0, running = true;
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX / window.innerWidth; mouseY = e.clientY / window.innerHeight;
  });
  document.addEventListener('visibilitychange', () => {
    running = document.visibilityState === 'visible';
    if (running) animateGlow();
  });
  function animateGlow() {
    if (!running) return;
    currentX += (mouseX * 80 - currentX) * 0.03;
    currentY += (mouseY * 80 - currentY) * 0.03;
    glow.style.transform = `translate(${currentX}%, ${currentY}%)`;
    requestAnimationFrame(animateGlow);
  }
  animateGlow();
}