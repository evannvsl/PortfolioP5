import { useEffect } from 'react'

export default function useTilt(scope) {
  useEffect(() => {
    const IS_MOBILE = window.matchMedia('(max-width:800px)').matches;
    const isTouch = window.matchMedia('(hover:none), (pointer:coarse)').matches;
    if (IS_MOBILE || isTouch) return;

    const root = scope || document;
    const cards = root.querySelectorAll('.work-card');
    if (!cards.length) return;

    const onMove = (card) => (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 8).toFixed(2)}deg) translateY(-8px) scale(1.02)`;
    };
    const onLeave = (card) => () => { card.style.transform = ''; };

    cards.forEach(card => {
      card.addEventListener('mousemove', onMove(card));
      card.addEventListener('mouseleave', onLeave(card));
    });

    return () => {
      cards.forEach(card => {
        card.removeEventListener('mousemove', onMove(card));
        card.removeEventListener('mouseleave', onLeave(card));
      });
    };
  }, [scope]);
}
