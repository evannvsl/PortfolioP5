// ============================================================
// js/modules/tilt.js
// ============================================================
export function initTilt() {
  const IS_MOBILE = window.matchMedia('(max-width:800px)').matches;
  if (IS_MOBILE) return;
  const isTouch = window.matchMedia('(hover:none), (pointer:coarse)').matches;
  if (isTouch) return;
  document.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 8).toFixed(2)}deg) translateY(-8px) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}