import { useEffect } from 'react'

export default function useMagnetic(scope) {
  useEffect(() => {
    const IS_MOBILE = window.matchMedia('(max-width:800px)').matches;
    const isTouch = window.matchMedia('(hover:none), (pointer:coarse)').matches;
    if (IS_MOBILE || isTouch) return;

    const root = scope || document;
    const els = root.querySelectorAll('.magnetic');
    if (!els.length) return;

    const onMove = (el) => (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.25}px, ${y * 0.3}px)`;
    };
    const onLeave = (el) => () => { el.style.transform = 'translate(0,0)'; };

    els.forEach(el => {
      el.addEventListener('mousemove', onMove(el));
      el.addEventListener('mouseleave', onLeave(el));
    });

    return () => {
      els.forEach(el => {
        el.removeEventListener('mousemove', onMove(el));
        el.removeEventListener('mouseleave', onLeave(el));
      });
    };
  }, [scope]);
}
