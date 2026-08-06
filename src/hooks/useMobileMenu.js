import { useEffect } from 'react'

export default function useMobileMenu(scope) {
  useEffect(() => {
    const root = scope || document;
    const toggle = root.querySelector('#menuToggle') || document.getElementById('menuToggle');
    const menu = root.querySelector('#menu') || document.getElementById('menu');
    if (!toggle || !menu) return;

    let scrollY = 0;

    function openMenu() {
      scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0'; document.body.style.right = '0';
      toggle.classList.add('open'); menu.classList.add('open');
    }
    function closeMenu() {
      document.body.style.position = ''; document.body.style.top = '';
      document.body.style.left = ''; document.body.style.right = '';
      window.scrollTo(0, scrollY);
      toggle.classList.remove('open'); menu.classList.remove('open');
    }

    const onToggle = () => {
      menu.classList.contains('open') ? closeMenu() : openMenu();
    };
    const onResize = () => {
      if (window.innerWidth > 800 && menu.classList.contains('open')) closeMenu();
    };

    toggle.addEventListener('click', onToggle);
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    window.addEventListener('resize', onResize);

    return () => {
      toggle.removeEventListener('click', onToggle);
      menu.querySelectorAll('a').forEach(a => a.removeEventListener('click', closeMenu));
      window.removeEventListener('resize', onResize);
      closeMenu();
    };
  }, [scope]);
}
