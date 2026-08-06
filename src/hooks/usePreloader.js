import { useEffect } from 'react'

export function usePreloader() {
  useEffect(() => {
    const pre = document.getElementById('preloader');
    if (!pre) return;

    const shouldSkip = sessionStorage.getItem('skipPreloader') === 'true';

    if (shouldSkip) {
      sessionStorage.removeItem('skipPreloader');
      pre.classList.add('done', 'instant-hide');
      pre.style.display = 'none';
      return;
    }

    const num = document.getElementById('preNum');
    const barFill = document.getElementById('preBarFill');
    const label = document.querySelector('.pre-label');
    if (!num) return;

    const statuses = ['INITIALIZING', 'LOADING SYSTEM', 'SECURITY CHECK', 'DECRYPTING'];
    let statusIndex = 0;
    if (label) label.textContent = statuses[0];
    const statusIv = setInterval(() => {
      statusIndex = (statusIndex + 1) % statuses.length;
      if (label) label.textContent = statuses[statusIndex];
    }, 600);

    const totalDuration = 2500;
    const stepTime = 45;
    const steps = totalDuration / stepTime;
    let step = 0;

    const iv = setInterval(() => {
      step++;
      const progress = Math.min(1, step / steps);
      const eased = 1 - Math.pow(1 - progress, 3);
      const count = Math.floor(eased * 100);
      num.textContent = String(count).padStart(2, '0');
      if (barFill) barFill.style.width = count + '%';
      if (progress >= 1) {
        clearInterval(iv); clearInterval(statusIv);
        if (label) label.textContent = 'READY';
      }
    }, stepTime);

    const finish = () => {
      setTimeout(() => {
        pre.classList.add('done');
        setTimeout(() => { pre.style.display = 'none'; }, 600);
      }, totalDuration + 300);
    };

    if (document.readyState === 'complete') {
      finish();
    } else {
      window.addEventListener('load', finish, { once: true });
    }

    return () => {
      clearInterval(iv);
      clearInterval(statusIv);
      window.removeEventListener('load', finish);
    };
  }, []);
}
