import { useEffect, useRef } from 'react'

export default function useCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = -100, my = -100;
    let rx = -100, ry = -100;
    let raf = null;

    const onMove = (e) => { mx = e.clientX; my = e.clientY; };

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    const onOver = (e) => {
      if (e.target.closest('a, button, .ph-subcard, .filter-tab, .proj-bottombar-esc, .work-card, .skill-card, .magnetic')) {
        dot.classList.add('hover'); ring.classList.add('hover');
      } else {
        dot.classList.remove('hover'); ring.classList.remove('hover');
      }
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return { dotRef, ringRef };
}
