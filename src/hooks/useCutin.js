import { useEffect } from 'react'

export default function useCutin(scope) {
  useEffect(() => {
    const IS_MOBILE = window.matchMedia('(max-width:800px)').matches;
    const PREFERS_REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (IS_MOBILE || PREFERS_REDUCED) return;

    const root = scope || document;
    const cutin = root.querySelector('#cutinImg') || document.getElementById('cutinImg');
    if (!cutin) return;

    const onScroll = () => {
      cutin.style.transform = `translateY(${window.scrollY * 0.15}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [scope]);
}
