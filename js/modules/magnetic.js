// ============================================================
// js/modules/magnetic.js
// ============================================================
export function initMagnetic() {
  const IS_MOBILE = window.matchMedia('(max-width:800px)').matches;
  if (IS_MOBILE) return;
  const isTouch = window.matchMedia('(hover:none), (pointer:coarse)').matches;
  if (isTouch) return;
  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.25}px, ${y * 0.3}px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = 'translate(0,0)'; });
  });
}