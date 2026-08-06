import { useEffect } from 'react'
import { scrambleText } from '../utils/scramble.js'

export default function useReveal(scope) {
  useEffect(() => {
    const root = scope || document;

    // Hero title scramble — struktur sudah dirender di JSX (.scramble-target)
    const heroTargets = root.querySelectorAll('.hero-title .line .scramble-target');
    heroTargets.forEach((target, i) => {
      target.dataset.original = target.textContent;
      setTimeout(() => scrambleText(target, { speed: 1.4 }), i * 220 + 400);
    });

    const els = root.querySelectorAll('.reveal, .spec-row, .contact-socials a, .work-card, .split');
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

    return () => io.disconnect();
  }, [scope]);
}
