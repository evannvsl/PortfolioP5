// ============================================================
// src/utils/transitions.js
// Battle / Close transition system — navigates via react-router
//
// Timeline BattleTransition (total ~1000ms):
//   0ms   — bt-active → panel masuk, shards, slash
//   700ms — bt-leaving → panel keluar (exit animation)
//   1000ms — navigate, reset
//
// Timeline CloseTransition (total ~920ms):
//   0ms   — ct-active → panel masuk, shards
//   660ms — ct-leaving → panel keluar
//   920ms — navigate, reset
// ============================================================

let isTransitioning = false;

export function playBattleTransition(navigate, target) {
  if (isTransitioning) return;
  isTransitioning = true;

  sessionStorage.setItem('skipPreloader', 'true');

  const overlay = document.getElementById('battle-transition');
  if (!overlay) {
    if (navigate && target) navigate(target);
    isTransitioning = false;
    return;
  }

  // Masuk
  overlay.classList.add('bt-active');
  document.body.classList.add('bt-shaking');

  document.body.addEventListener(
    'animationend',
    () => document.body.classList.remove('bt-shaking'),
    { once: true }
  );

  if (navigator.vibrate) navigator.vibrate([40, 30, 80, 30, 60]);

  // Mulai exit animation 700ms setelah masuk
  const EXIT_START = 700;
  const NAVIGATE_DELAY = 1000;

  setTimeout(() => {
    overlay.classList.add('bt-leaving');
  }, EXIT_START);

  setTimeout(() => {
    overlay.classList.remove('bt-active', 'bt-leaving');
    isTransitioning = false;
    if (navigate && target) navigate(target);
  }, NAVIGATE_DELAY);
}

export function playCloseTransition(navigate, target, state) {
  if (isTransitioning) return;
  isTransitioning = true;

  const overlay = document.getElementById('close-transition');
  if (!overlay) {
    if (navigate && target) navigate(target, state);
    isTransitioning = false;
    return;
  }

  // Masuk
  overlay.classList.add('ct-active');
  document.body.classList.add('ct-shaking');

  document.body.addEventListener(
    'animationend',
    () => document.body.classList.remove('ct-shaking'),
    { once: true }
  );

  if (navigator.vibrate) navigator.vibrate([30, 20, 50, 20, 40]);

  // Mulai exit animation 660ms setelah masuk
  const EXIT_START = 660;
  const NAVIGATE_DELAY = 920;

  setTimeout(() => {
    overlay.classList.add('ct-leaving');
  }, EXIT_START);

  setTimeout(() => {
    overlay.classList.remove('ct-active', 'ct-leaving');
    isTransitioning = false;
    if (navigate && target) navigate(target, state);
  }, NAVIGATE_DELAY);
}

export function resetTransitions() {
  const btOverlay = document.getElementById('battle-transition');
  const ctOverlay = document.getElementById('close-transition');
  if (btOverlay) btOverlay.classList.remove('bt-active', 'bt-leaving');
  if (ctOverlay) ctOverlay.classList.remove('ct-active', 'ct-leaving');
  document.body.classList.remove('bt-shaking', 'ct-shaking');
  isTransitioning = false;
}
