// ============================================================
// js/modules/battle-transition.js
// Persona 5 Royal — Battle Start Transition
//
// Sequence:
//   0ms   — overlay aktif, screen shake
//   80ms  — slash sweep merah diagonal
//   200ms — panel hitam crash kiri + kanan
//   420ms — red eye spotlight
//   540ms — "TAKE YOUR HEART" text slam
//   750ms — halftone burst
//   950ms — white flash wipe
//  1200ms — navigate ke URL tujuan
// ============================================================

let isPlaying = false;

/**
 * Mainkan battle transition lalu navigate ke URL tujuan.
 * @param {string} targetUrl - URL halaman tujuan
 */
export function playBattleTransition(targetUrl) {
  if (isPlaying) return;
  isPlaying = true;

  const overlay = document.getElementById('battle-transition');
  if (!overlay) {
    // Fallback: langsung navigate kalau overlay tidak ada
    window.location.href = targetUrl;
    return;
  }

  // ── 1. Aktifkan overlay + screen shake ───────────────────
  overlay.classList.add('bt-active');
  document.body.classList.add('bt-shaking');

  // Hapus shake class setelah selesai agar tidak mengganggu
  document.body.addEventListener('animationend', () => {
    document.body.classList.remove('bt-shaking');
  }, { once: true });

  // ── 2. Sound-like vibrate (hanya mobile) ────────────────
  if (navigator.vibrate) {
    navigator.vibrate([40, 20, 60, 10, 30]);
  }

  // ── 3. Navigate setelah semua animasi selesai ────────────
  // Total sequence ~ 1150ms, kasih buffer 100ms
  const NAVIGATE_DELAY = 1150;

  setTimeout(() => {
    window.location.href = targetUrl;
  }, NAVIGATE_DELAY);
}

/**
 * Init: pastikan overlay ada di DOM dan event listener siap.
 * Dipanggil dari main.js sekali saja.
 */
export function initBattleTransition() {
  // Sudah dibuat di HTML, tidak perlu inject DOM di sini
  // Tapi pastikan class 'bt-active' bersih saat load
  const overlay = document.getElementById('battle-transition');
  if (overlay) {
    overlay.classList.remove('bt-active');
  }
}
