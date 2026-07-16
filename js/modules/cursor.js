// ============================================================
// js/modules/cursor.js
// ============================================================
export function initCursor() {
  const IS_MOBILE = window.matchMedia('(max-width:800px)').matches;
  if (IS_MOBILE) return;
  const isTouch = window.matchMedia('(hover:none), (pointer:coarse)').matches;
  if (isTouch) return;
  const dot = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    dot.style.left = mouseX + 'px'; dot.style.top = mouseY + 'px';
  });
  function loop() {
    ringX += (mouseX - ringX) * 0.18; ringY += (mouseY - ringY) * 0.18;
    ring.style.left = ringX + 'px'; ring.style.top = ringY + 'px';
    requestAnimationFrame(loop);
  }
  loop();

  document.querySelectorAll('a, button, .work-card, .magnetic, .input-send').forEach(el => {
    el.addEventListener('mouseenter', () => { dot.classList.add('hover'); ring.classList.add('hover'); });
    el.addEventListener('mouseleave', () => { dot.classList.remove('hover'); ring.classList.remove('hover'); });
  });
}