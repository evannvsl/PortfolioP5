// ============================================================
// js/modules/scramblehover.js
// ============================================================
import { scrambleText, wrapLeadingText } from './scramble.js';

export function initScrambleHover() {
  const wrapped = [];
  document.querySelectorAll('.logo').forEach(el => wrapped.push(wrapLeadingText(el)));
  document.querySelectorAll('nav.menu a').forEach(el => wrapped.push(wrapLeadingText(el)));
  document.querySelectorAll('.btn').forEach(el => wrapped.push(wrapLeadingText(el)));
  document.querySelectorAll('.work-link').forEach(el => wrapped.push(wrapLeadingText(el)));
  document.querySelectorAll('.contact-email').forEach(el => wrapped.push(wrapLeadingText(el)));
  document.querySelectorAll('.contact-socials a').forEach(el => wrapped.push(wrapLeadingText(el)));
  const toTop = document.querySelector('footer .to-top');
  if (toTop) wrapped.push(wrapLeadingText(toTop));

  wrapped.filter(Boolean).forEach(span => {
    const trigger = span.closest('a, button') || span;
    trigger.addEventListener('mouseenter', () => scrambleText(span));
  });
  document.querySelectorAll('.work-card').forEach(card => {
    const h3 = card.querySelector('h3');
    const span = wrapLeadingText(h3);
    if (span) card.addEventListener('mouseenter', () => scrambleText(span));
  });
}