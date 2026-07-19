// ============================================================
// js/modules/ticker.js
// ============================================================
export function initTicker() {
  const slots = document.querySelectorAll('.p5-ticker');
  if (!slots.length) return;

  const items = [
    { text: 'EVANNVSL', type: 'black', icon: '◆' },
    { text: 'CREATIVE DEVELOPER', type: 'red', icon: '★' },
    { text: 'TAKE YOUR HEART', type: 'white', icon: '◆' },
    { text: 'DESIGN & CODE', type: 'black', icon: '★' },
    { text: 'PHANTOM THIEF', type: 'red', icon: '◆' },
    { text: 'WEB ARCHITECT', type: 'white', icon: '★' },
    { text: 'COOP RANK MAX', type: 'black', icon: '◆' },
    { text: 'SYSTEM ONLINE', type: 'red', icon: '★' }
  ];

  slots.forEach((slot, idx) => {
    slot.innerHTML = '';

    const track = document.createElement('div');
    track.className = 'p5-ticker-track';

    // Render items exactly 2 times so we can translate -50% for a perfect seamless loop.
    // The second half is a clone of the first — when the track shifts -50% it wraps
    // back to the start with no gap and no jump.
    for (let rep = 0; rep < 2; rep++) {
      items.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = `p5-ticker-item type-${item.type}`;

        const innerEl = document.createElement('div');
        innerEl.className = 'p5-ticker-item-inner';

        if (item.icon) {
          const iconEl = document.createElement('span');
          iconEl.className = 'ticker-item-icon';
          iconEl.textContent = item.icon;
          innerEl.appendChild(iconEl);
        }

        const textEl = document.createElement('span');
        textEl.className = 'ticker-item-text';
        textEl.textContent = item.text;
        innerEl.appendChild(textEl);

        itemEl.appendChild(innerEl);
        track.appendChild(itemEl);
      });
    }

    slot.appendChild(track);

    // Alternate direction for rows
    if (idx % 2 === 1) {
      slot.classList.add('p5-ticker-reverse');
    }
  });
}