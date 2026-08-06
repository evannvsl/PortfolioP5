import { useEffect } from 'react'
import { scrambleText, wrapLeadingText } from '../utils/scramble.js'

export default function useScrambleHover(scope) {
  useEffect(() => {
    const root = scope || document;
    const wrapped = [];

    const wrapAll = (selector) => {
      root.querySelectorAll(selector).forEach(el => wrapped.push(wrapLeadingText(el)));
    };

    wrapAll('.logo');
    wrapAll('nav.menu a');
    wrapAll('.btn');
    wrapAll('.work-link');
    wrapAll('.contact-email');
    wrapAll('.contact-socials a');
    const toTop = root.querySelector('footer .to-top');
    if (toTop) wrapped.push(wrapLeadingText(toTop));

    const handlers = [];
    wrapped.filter(Boolean).forEach(span => {
      const trigger = span.closest('a, button') || span;
      const handler = () => scrambleText(span);
      trigger.addEventListener('mouseenter', handler);
      handlers.push([trigger, handler]);
    });

    const cards = root.querySelectorAll('.work-card');
    const cardHandlers = [];
    cards.forEach(card => {
      const h3 = card.querySelector('h3');
      const span = wrapLeadingText(h3);
      if (span) {
        const handler = () => scrambleText(span);
        card.addEventListener('mouseenter', handler);
        cardHandlers.push([card, handler]);
      }
    });

    return () => {
      handlers.forEach(([el, h]) => el.removeEventListener('mouseenter', h));
      cardHandlers.forEach(([el, h]) => el.removeEventListener('mouseenter', h));
    };
  }, [scope]);
}
