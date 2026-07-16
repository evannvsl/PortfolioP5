// ============================================================
// js/modules/splitwords.js
// ============================================================
export function initSplitWords() {
  function prepareManualWords(el) {
    const words = el.querySelectorAll(':scope > .word');
    words.forEach((w, i) => {
      if (!w.querySelector(':scope > .word-inner')) {
        const inner = document.createElement('span');
        inner.className = 'word-inner';
        while (w.firstChild) inner.appendChild(w.firstChild);
        w.appendChild(inner);
      }
      w.querySelector(':scope > .word-inner').style.transitionDelay = `${i * 50}ms`;
    });
    el.classList.add('split');
  }
  function splitWords(el) {
    if (el.querySelector(':scope > .word')) { prepareManualWords(el); return; }
    const nodes = Array.from(el.childNodes);
    el.innerHTML = '';
    nodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        const parts = node.textContent.split(/(\s+)/);
        parts.forEach(part => {
          if (part.trim() === '') el.appendChild(document.createTextNode(part));
          else {
            const wrap = document.createElement('span'); wrap.className = 'word';
            const inner = document.createElement('span'); inner.className = 'word-inner'; inner.textContent = part;
            wrap.appendChild(inner); el.appendChild(wrap);
          }
        });
      } else if (node.nodeName === 'BR') el.appendChild(node.cloneNode());
      else {
        const wrap = document.createElement('span'); wrap.className = 'word';
        const inner = document.createElement('span'); inner.className = 'word-inner';
        inner.appendChild(node.cloneNode(true)); wrap.appendChild(inner); el.appendChild(wrap);
      }
    });
    el.querySelectorAll('.word-inner').forEach((w, i) => w.style.transitionDelay = `${i * 50}ms`);
    el.classList.add('split');
  }
  document.querySelectorAll('.section-heading, .contact-heading, .about-statement').forEach(splitWords);
}