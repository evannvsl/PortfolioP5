import { useEffect } from 'react'

export default function useEffects(scope) {
  useEffect(() => {
    const PREFERS_REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (PREFERS_REDUCED) return;

    const root = scope || document;
    const breach = root.querySelector('#breach-overlay') || document.getElementById('breach-overlay');
    const chromatic = root.querySelector('#chromatic-layer') || document.getElementById('chromatic-layer');

    const timers = [];

    function triggerBreach() {
      if (breach) {
        breach.classList.remove('active'); void breach.offsetWidth; breach.classList.add('active');
      }
      timers.push(setTimeout(triggerBreach, 6000 + Math.random() * 8000));
    }
    function triggerChromatic() {
      if (chromatic) {
        chromatic.classList.remove('active'); void chromatic.offsetWidth; chromatic.classList.add('active');
      }
      timers.push(setTimeout(triggerChromatic, 9000 + Math.random() * 10000));
    }
    timers.push(setTimeout(triggerBreach, 4000));
    timers.push(setTimeout(triggerChromatic, 7000));

    return () => timers.forEach(clearTimeout);
  }, [scope]);
}
