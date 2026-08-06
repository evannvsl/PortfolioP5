import { useEffect } from 'react'

export default function useScreenShake(scope) {
  useEffect(() => {
    const PREFERS_REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const IS_MOBILE = window.matchMedia('(max-width:800px)').matches;
    if (PREFERS_REDUCED || IS_MOBILE) return;

    const root = scope || document;
    const hero = root.querySelector('#hero') || document.getElementById('hero');
    if (!hero) return;

    const onClick = (e) => {
      if (e.target.closest('a, button')) return;
      document.body.style.animation = 'none'; void document.body.offsetWidth;
      document.body.style.animation = 'screenShake 0.3s cubic-bezier(.36,.07,.19,.97) both';
      setTimeout(() => document.body.style.animation = '', 300);
    };
    hero.addEventListener('click', onClick);

    if (!document.getElementById('shakeStyles')) {
      const style = document.createElement('style');
      style.id = 'shakeStyles';
      style.textContent = `
        @keyframes screenShake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-3px, 0, 0); }
          40%, 60% { transform: translate3d(3px, 0, 0); }
        }
      `;
      document.head.appendChild(style);
    }

    return () => hero.removeEventListener('click', onClick);
  }, [scope]);
}
