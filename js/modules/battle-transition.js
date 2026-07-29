// ============================================================
// js/modules/battle-transition.js
// Persona 5 Royal — High-Octane Dual Transition System (OPEN & BACK)
// ============================================================

let isTransitioning = false;

/**
 * 1. TRANSISI MASUK / OPEN ("TAKE OVER / BATTLE START")
 * @param {string} targetUrl - URL halaman tujuan (misal: 'project.html')
 */
export function playBattleTransition(targetUrl) {
  if (isTransitioning) return;
  isTransitioning = true;

  sessionStorage.setItem('skipPreloader', 'true');

  const overlay = document.getElementById('battle-transition');
  if (!overlay) {
    if (targetUrl) window.location.href = targetUrl;
    isTransitioning = false;
    return;
  }

  // Aktifkan Overlay & Screen Shake
  overlay.classList.add('bt-active');
  document.body.classList.add('bt-shaking');

  document.body.addEventListener('animationend', () => {
    document.body.classList.remove('bt-shaking');
  }, { once: true });

  // Haptic Feedback / Vibrasi Smartphone (Jika didukung device)
  if (navigator.vibrate) {
    navigator.vibrate([40, 30, 80, 30, 60]);
  }

  // Navigate setelah animasi flash wipe selesai (~1020ms)
  const NAVIGATE_DELAY = 1020;
  setTimeout(() => {
    if (targetUrl) {
      window.location.href = targetUrl;
    } else {
      // Jika demo/uji coba tanpa URL, reset otomatis
      setTimeout(() => resetTransitions(), 600);
    }
  }, NAVIGATE_DELAY);
}

/**
 * 2. TRANSISI KELUAR / BACK ("MISSION COMPLETE / RETURN TO HQ")
 * @param {string} targetUrl - URL halaman tujuan (misal: 'index.html#portfolio')
 */
export function playCloseTransition(targetUrl) {
  if (isTransitioning) return;
  isTransitioning = true;

  const overlay = document.getElementById('close-transition');
  if (!overlay) {
    if (targetUrl) window.location.href = targetUrl;
    isTransitioning = false;
    return;
  }

  // Aktifkan Close Overlay & Screen Shake
  overlay.classList.add('ct-active');
  document.body.classList.add('ct-shaking');

  document.body.addEventListener('animationend', () => {
    document.body.classList.remove('ct-shaking');
  }, { once: true });

  if (navigator.vibrate) {
    navigator.vibrate([30, 20, 50, 20, 40]);
  }

  // Navigate setelah animasi victory wipe (~920ms)
  const NAVIGATE_DELAY = 920;
  setTimeout(() => {
    if (targetUrl) {
      window.location.href = targetUrl;
    } else {
      // Jika demo/uji coba tanpa URL, reset otomatis
      setTimeout(() => resetTransitions(), 600);
    }
  }, NAVIGATE_DELAY);
}

/**
 * Reset semua overlay transisi ke kondisi bersih
 */
export function resetTransitions() {
  const btOverlay = document.getElementById('battle-transition');
  const ctOverlay = document.getElementById('close-transition');
  
  if (btOverlay) btOverlay.classList.remove('bt-active');
  if (ctOverlay) ctOverlay.classList.remove('ct-active');
  
  document.body.classList.remove('bt-shaking', 'ct-shaking');
  isTransitioning = false;
}

/**
 * Init: pastikan overlay bersih saat halaman di-load
 */
export function initBattleTransition() {
  resetTransitions();
}