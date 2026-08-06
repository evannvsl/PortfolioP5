import { useEffect } from 'react'

export default function useBgGlow(scope) {
  useEffect(() => {
    const root = scope || document;
    const glow = root.querySelector('#bg-glow') || document.getElementById('bg-glow');
    const IS_MOBILE = window.matchMedia('(max-width:800px)').matches;
    const PREFERS_REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!glow || IS_MOBILE || PREFERS_REDUCED) return;

    let mouseX = 0, mouseY = 0, currentX = 0, currentY = 0, running = true, raf = null;

    const onMove = (e) => {
      mouseX = e.clientX / window.innerWidth;
      mouseY = e.clientY / window.innerHeight;
    };
    const onVisibility = () => {
      running = document.visibilityState === 'visible';
      if (running) animateGlow();
    };
    function animateGlow() {
      if (!running) return;
      currentX += (mouseX * 80 - currentX) * 0.03;
      currentY += (mouseY * 80 - currentY) * 0.03;
      glow.style.transform = `translate(${currentX}%, ${currentY}%)`;
      raf = requestAnimationFrame(animateGlow);
    }
    animateGlow();

    document.addEventListener('mousemove', onMove);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('visibilitychange', onVisibility);
      cancelAnimationFrame(raf);
    };
  }, [scope]);
}
