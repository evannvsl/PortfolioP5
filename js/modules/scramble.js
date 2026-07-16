// ============================================================
// js/modules/scramble.js
// ============================================================
const SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#$%01';

export function scrambleText(el, opts = {}) {
  if (!el) return;
  const speedMul = opts.speed || 1;
  const original = el.dataset.original || (el.dataset.original = el.textContent);
  let frame = 0;
  const length = original.length;
  const queue = [];
  for (let i = 0; i < length; i++) {
    const start = Math.floor(Math.random() * 8 * speedMul);
    const end = start + Math.floor(Math.random() * 10 * speedMul) + 5;
    queue.push({ to: original[i], start, end, char: '' });
  }
  cancelAnimationFrame(el._scrambleRAF);

  function update() {
    let out = ''; let done = 0;
    for (const q of queue) {
      if (frame >= q.end) { out += q.to; done++; }
      else if (frame >= q.start) {
        if (!q.char || Math.random() < 0.35) q.char = q.to === ' ' ? ' ' : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        out += q.char;
      } else { out += q.to === ' ' ? ' ' : '\u00A0'; }
    }
    el.textContent = out; frame++;
    if (done < queue.length) el._scrambleRAF = requestAnimationFrame(update);
    else el.textContent = original;
  }
  update();
}

export function wrapLeadingText(el) {
  if (!el) return null;
  for (const node of Array.from(el.childNodes)) {
    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') {
      const span = document.createElement('span');
      span.className = 'scramble-target';
      span.textContent = node.textContent;
      el.replaceChild(span, node);
      return span;
    }
  }
  return null;
}