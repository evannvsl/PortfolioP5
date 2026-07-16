// ============================================================
// js/modules/reveal.js
// ============================================================
import { scrambleText, wrapLeadingText } from './scramble.js';

export function initReveal() {
  // tambahkan varian reveal
  function addVariant(selector, variant) {
    document.querySelectorAll(selector).forEach(el => el.classList.add('reveal', `reveal-${variant}`));
  }
  function staggerVariant(selector, variant, stepMs) {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('reveal', `reveal-${variant}`);
      el.style.transitionDelay = `${i * stepMs}ms`;
    });
  }
  addVariant('.about-copy', 'right');
  addVariant('.about-visual', 'left');
  staggerVariant('.hero-cta .btn', 'scale', 110);
  staggerVariant('.contact-socials a', 'up', 90);

  // hero lines scramble
  document.querySelectorAll('.hero-title .line').forEach((line, i) => {
    const outer = document.createElement('span');
    outer.className = 'line-inner';
    while (line.firstChild) outer.appendChild(line.firstChild);
    line.appendChild(outer);
    const target = wrapLeadingText(outer);
    if (target) setTimeout(() => scrambleText(target, { speed: 1.4 }), i * 220 + 400);
  });

  // Scroll Reveal
  const els = document.querySelectorAll('.reveal, .spec-row, .contact-socials a, .work-card, .split');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.classList.add('in');
        if (el.classList.contains('split')) {
          el.querySelectorAll('.word-inner').forEach((w, i) => {
            if (w.children.length === 0) setTimeout(() => scrambleText(w), i * 55);
          });
        }
        io.unobserve(el);
      }
    });
  }, { threshold: 0.15 });
  els.forEach(el => io.observe(el));
}