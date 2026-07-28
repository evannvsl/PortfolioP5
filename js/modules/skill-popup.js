// ============================================================
// js/modules/skill-popup.js
// Persona 5 style half-page popup untuk skill cards
// Klik skill card → panel slide dari kanan dengan detail menyeluruh
// ============================================================
import { skillDetails } from '../data/skills-detail.js';

let overlay = null;
let panel   = null;
let isOpen  = false;
let totalCards = 0;

// ── Init ────────────────────────────────────────────────────
export function initSkillPopup() {
  overlay = document.getElementById('skill-overlay');
  if (!overlay) return;

  // Render struktur statis overlay
  overlay.innerHTML = `
    <div class="sk-backdrop" aria-hidden="true"></div>
    <div class="sk-panel" role="dialog" aria-modal="true" aria-label="Skill Detail Inspector">

      <!-- Top bar -->
      <div class="sk-topbar">
        <div class="sk-topbar-left">
          <span class="sk-num">01</span>
          <span class="sk-slash-dec" aria-hidden="true"></span>
          <span class="sk-category">SKILLSET INSPECTOR</span>
        </div>
        <button class="sk-close" aria-label="Close skill detail">
          <span>✕</span>
        </button>
      </div>

      <!-- Hero image banner -->
      <div class="sk-hero">
        <img src="" alt="" class="sk-hero-img" />
        <div class="sk-hero-overlay"></div>
        <div class="sk-hero-slash" aria-hidden="true"></div>
        <span class="sk-hero-bignum" aria-hidden="true">01</span>
      </div>

      <!-- Dynamic body content -->
      <div class="sk-body-content"></div>

      <!-- Bottom bar -->
      <div class="sk-bottombar">
        <span class="sk-bottombar-num">◆ 01 / 08</span>
        <span>CONFIDENTIAL SYSTEM PROFILE</span>
      </div>
    </div>
  `;

  panel = overlay.querySelector('.sk-panel');

  // Event listeners
  overlay.querySelector('.sk-backdrop').addEventListener('click', closeSkillPopup);
  overlay.querySelector('.sk-close').addEventListener('click', closeSkillPopup);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isOpen) closeSkillPopup();
  });

  wireSkillCards();
  totalCards = document.querySelectorAll('.skill-card[data-skill-id]').length;
}

// ── Wire skill cards ─────────────────────────────────────────
function wireSkillCards() {
  const cards = document.querySelectorAll('.skill-card[data-skill-id]');
  cards.forEach(card => {
    card.style.cursor = 'pointer';
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `View skill detail`);

    card.addEventListener('click', () => openSkillPopup(card));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openSkillPopup(card);
      }
    });
  });
}

// ── Open ─────────────────────────────────────────────────────
export function openSkillPopup(card) {
  if (!overlay || !panel) return;

  const skillId  = parseInt(card.dataset.skillId, 10) || 1;
  const num      = card.querySelector('.sc-bignum')?.textContent?.trim() ?? String(skillId).padStart(2, '0');
  const tag      = card.querySelector('.sc-tag')?.textContent?.trim() ?? '';
  const title    = card.querySelector('.skill-card-title')?.textContent?.trim() ?? 'SKILL';
  const imgSrc   = card.querySelector('.sc-img')?.src ?? '';
  const imgAlt   = card.querySelector('.sc-img')?.alt ?? '';
  const total    = String(totalCards || 8).padStart(2, '0');

  // Badges dari DOM card
  const badges = [...card.querySelectorAll('.badge')].map(b => ({
    text: b.textContent.trim(),
    lvl:  b.dataset.lvl ?? '3',
  }));

  // Detail tambahan dari dictionary
  const info = skillDetails[skillId] || {
    title: title,
    tag: tag,
    mastery: 85,
    levelText: 'PROFICIENT',
    desc: 'Pengembangan dan penerapan keahlian teknis secara profesional.',
    competencies: ['Penerapan keahlian teknis', 'Analisis dan pemecahan masalah']
  };

  // Reset closing state
  panel.classList.remove('is-closing');

  // Update statis
  overlay.querySelector('.sk-num').textContent          = num;
  overlay.querySelector('.sk-category').textContent     = info.tag || tag || 'SKILLSET';
  overlay.querySelector('.sk-hero-bignum').textContent  = num;
  overlay.querySelector('.sk-bottombar-num').textContent = `◆ ${num} / ${total}`;

  const heroImg = overlay.querySelector('.sk-hero-img');
  heroImg.src = imgSrc;
  heroImg.alt = imgAlt;

  // Render body HTML
  overlay.querySelector('.sk-body-content').innerHTML = buildBodyHTML({ title: info.title || title, info, badges, num });

  // Animasi bar penguasaan setelah render
  setTimeout(() => {
    const barFill = overlay.querySelector('.sk-mastery-fill');
    if (barFill) barFill.style.width = `${info.mastery}%`;
  }, 100);

  // Buka
  overlay.classList.add('is-open');
  overlay.removeAttribute('aria-hidden');
  document.body.style.overflow = 'hidden';
  isOpen = true;
  panel.scrollTop = 0;

  overlay.querySelector('.sk-close').focus();
}

// ── Close ─────────────────────────────────────────────────────
export function closeSkillPopup() {
  if (!overlay || !isOpen) return;
  isOpen = false;
  document.body.style.overflow = '';

  panel.classList.add('is-closing');
  panel.addEventListener('transitionend', onCloseEnd, { once: true });
  setTimeout(onCloseEnd, 400);
}

function onCloseEnd() {
  overlay.classList.remove('is-open');
  panel.classList.remove('is-closing');
  overlay.setAttribute('aria-hidden', 'true');
}

// ── Build Body HTML ───────────────────────────────────────────
function buildBodyHTML({ title, info, badges }) {

  // Grouping badges by level
  const byLevel = { 5: [], 4: [], 3: [], 2: [], 1: [] };
  badges.forEach(b => {
    const lvl = parseInt(b.lvl, 10);
    if (byLevel[lvl]) byLevel[lvl].push(b.text);
    else byLevel[3].push(b.text);
  });

  const levelLabels = {
    5: '★★★★★ PROFESSIONAL / MASTER',
    4: '★★★★☆ ADVANCED EXPERT',
    3: '★★★☆☆ INTERMEDIATE',
    2: '★★☆☆☆ GOOD KNOWLEDGE',
    1: '★☆☆☆☆ BASIC FOUNDATION',
  };

  const sectionsHTML = [5, 4, 3, 2, 1]
    .filter(lvl => byLevel[lvl].length > 0)
    .map(lvl => `
      <div class="sk-level-group">
        <h4 class="sk-section-label">${levelLabels[lvl]}</h4>
        <div class="sk-badges">
          ${byLevel[lvl].map(t =>
            `<span class="badge" data-lvl="${lvl}">✦ ${t}</span>`
          ).join('')}
        </div>
      </div>
    `).join('');

  const compsHTML = (info.competencies || []).map(c => `
    <li class="sk-comp-item">
      <span class="sk-comp-bullet">◆</span>
      <span>${c}</span>
    </li>
  `).join('');

  return `
    <div class="sk-body">
      <!-- Title Block -->
      <div class="sk-title-block">
        <span class="sk-tag-inline">◆ ${info.tag}</span>
        <h2 class="sk-title">${title}</h2>
      </div>

      <!-- Mastery Level Bar -->
      <div class="sk-mastery-box">
        <div class="sk-mastery-header">
          <span class="sk-mastery-label">MASTERY LEVEL</span>
          <span class="sk-mastery-val">${info.mastery}% — ${info.levelText}</span>
        </div>
        <div class="sk-mastery-track">
          <div class="sk-mastery-fill" style="width: 0%;"></div>
        </div>
      </div>

      <!-- Description Section -->
      <div class="sk-section">
        <h4 class="sk-section-label">DESKRIPSI SKILLSET</h4>
        <p class="sk-desc-text">${info.desc}</p>
      </div>

      <!-- Key Competencies Section -->
      <div class="sk-section">
        <h4 class="sk-section-label">CORE COMPETENCY & CAPABILITIES</h4>
        <ul class="sk-comp-list">
          ${compsHTML}
        </ul>
      </div>

      <!-- Technologies & Tools Breakdown -->
      <div class="sk-section">
        <h4 class="sk-section-label">TEKNOLOGI & PERKAKAS TERKAIT</h4>
        ${sectionsHTML}
      </div>

      <!-- Level Legend -->
      <div class="sk-legend">
        <span class="sk-legend-title">LEVEL:</span>
        <span class="sk-legend-item" data-lvl="5">LVL 5: MASTER</span>
        <span class="sk-legend-item" data-lvl="4">LVL 4: ADVANCED</span>
        <span class="sk-legend-item" data-lvl="3">LVL 3: INTERMEDIATE</span>
        <span class="sk-legend-item" data-lvl="2">LVL 2: GOOD</span>
      </div>
    </div>
  `;
}
