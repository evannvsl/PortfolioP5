// ============================================================
// js/main.js — ENTRY POINT
// ============================================================
import { initPreloader } from './modules/preloader.js';
import { initCursor } from './modules/cursor.js';
import { initMagnetic } from './modules/magnetic.js';
import { initTilt } from './modules/tilt.js';
import { initMobileMenu } from './modules/mobilemenu.js';
import { initHeaderScroll } from './modules/header.js';
import { initReveal } from './modules/reveal.js';
import { initSplitWords } from './modules/splitwords.js';
import { initScrambleHover } from './modules/scramblehover.js';
import { initBgGlow } from './modules/bgglow.js';
import { initMatrix } from './modules/matrix.js';
import { initParticles } from './modules/particles.js';
import { initChat } from './modules/chat.js';
import { initEffects } from './modules/effects.js';
import { initScreenShake } from './modules/screenshake.js';
import { initCutin } from './modules/cutin.js';
import { initTicker } from './modules/ticker.js';
import { renderPortfolio } from './modules/portfolio.js';
import { renderSkills } from './modules/skills.js';
import { renderChat } from './modules/chatdata.js';
import { initBattleTransition } from './modules/battle-transition.js';
import { initSkillPopup } from './modules/skill-popup.js';

// Inisialisasi semua modul
document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initCursor();
  initMagnetic();
  initTilt();
  initMobileMenu();
  initHeaderScroll();
  initSplitWords();
  initReveal();        // harus setelah splitWords
  initScrambleHover();
  initBgGlow();
  initMatrix();
  initParticles();
  initChat();
  initEffects();
  initScreenShake();
  initCutin();
  initTicker();
  renderPortfolio();
  renderSkills();
  renderChat();
  initBattleTransition();
  initSkillPopup();
});