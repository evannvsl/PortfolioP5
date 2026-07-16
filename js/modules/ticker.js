// ============================================================
// js/modules/ticker.js
// ============================================================
export function initTicker() {
  const slots = document.querySelectorAll('.p5-ticker');
  if (!slots.length) return;
  const words = ['◆ EVANNVSL', 'PHANTOM THIEF', '◆ TAKE YOUR HEART', 'PERSONA 5 STYLE', '◆ AS LOSER'];
  slots.forEach((slot, idx) => {
    const track = document.createElement('div');
    track.className = 'p5-ticker-track';
    for (let rep = 0; rep < 2; rep++) {
      words.forEach(w => {
        const span = document.createElement('span');
        const parts = w.split(' ');
        if (parts[0] === '◆') {
          span.innerHTML = `<em>◆</em> ${parts.slice(1).join(' ')}`;
        } else {
          span.textContent = w;
        }
        track.appendChild(span);
      });
    }
    slot.appendChild(track);
    if (idx % 2 === 1) slot.classList.add('p5-ticker-reverse');
  });
}