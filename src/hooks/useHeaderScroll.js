import { useEffect } from 'react'

export default function useHeaderScroll(scope) {
  useEffect(() => {
    const root = scope || document;
    const header = root.querySelector('#siteHeader') || document.getElementById('siteHeader');
    if (!header) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        header.classList.toggle('scrolled', window.scrollY > 40);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [scope]);
}
