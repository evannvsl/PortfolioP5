import { useEffect } from 'react'

export default function useMatrix(scope) {
  useEffect(() => {
    const root = scope || document;
    const el = root.querySelector('#matrixCode') || document.getElementById('matrixCode');
    const IS_MOBILE = window.matchMedia('(max-width:800px)').matches;
    if (!el || IS_MOBILE) return;

    const chars = '0123456789ABCDEF';
    const lines = 12;
    function generate() {
      let code = '';
      for (let i = 0; i < lines; i++) {
        let line = '';
        for (let j = 0; j < 16; j++) line += chars[Math.floor(Math.random() * chars.length)];
        code += line + '<br>';
      }
      el.innerHTML = code;
    }
    generate();
    const iv = setInterval(generate, 1800);
    return () => clearInterval(iv);
  }, [scope]);
}
