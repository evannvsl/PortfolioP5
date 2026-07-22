// ============================================================
// js/modules/skill-popup.js
// Persona 5 style half-page popup untuk skill cards
// Klik skill card → panel slide dari kanan
// ============================================================

let overlay = null;
let panel   = null;
let isOpen  = false;
let totalCards = 0;

// ── Init ────────────────────────────────────────────────────
export function initSkillPopup() {
  overlay = document.getElementById('skill-overlay');
  if (!overlay) return;

  // Render struktur statis sekali
  overlay.innerHTML = `
    <div class="sk-backdrop" aria-hidden="true"></div>
    <div class="sk-panel" role="dialog" aria-modal="true" aria-label="Skill Detail">

      <!-- Top bar -->
      <div class="sk-topbar">
        <div class="sk-topbar-left">
          <span class="sk-num">01</span>
          <span class="sk-slash-dec" aria-hidden="true"></span>
          <span class="sk-category">SKILLSET</span>
        </div>
        <button class="sk-close" aria-label="Close skill detail">
          <span>✕</span>
          <span>ESC</span>
        </button>
      </div>

      <!-- Hero image -->
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
        <span>CONFIDENTIAL</span>
      </div>
    </div>
  `;

  panel = overlay.querySelector('.sk-panel');

  // Event listeners sekali saja
  overlay.querySelector('.sk-backdrop').addEventListener('click', closeSkillPopup);
  overlay.querySelector('.sk-close').addEventListener('click', closeSkillPopup);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isOpen) closeSkillPopup();
  });

  // Pasang click handler pada semua skill cards
  wireSkillCards();

  // Hitung total cards
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

  // Ambil semua data dari DOM card
  const num      = card.querySelector('.sc-bignum')?.textContent?.trim() ?? '01';
  const tag      = card.querySelector('.sc-tag')?.textContent?.trim()    ?? '';
  const title    = card.querySelector('.skill-card-title')?.textContent?.trim() ?? 'SKILL';
  const imgSrc   = card.querySelector('.sc-img')?.src ?? '';
  const imgAlt   = card.querySelector('.sc-img')?.alt ?? '';
  const total    = String(totalCards).padStart(2, '0');

  // Kumpulkan semua badge dengan level-nya
  const badges = [...card.querySelectorAll('.badge')].map(b => ({
    text: b.textContent.trim(),
    lvl:  b.dataset.lvl ?? '3',
  }));

  // Reset closing state
  panel.classList.remove('is-closing');

  // Update statis
  overlay.querySelector('.sk-num').textContent          = num;
  overlay.querySelector('.sk-category').textContent     = tag || 'SKILLSET';
  overlay.querySelector('.sk-hero-bignum').textContent  = num;
  overlay.querySelector('.sk-bottombar-num').textContent = `◆ ${num} / ${total}`;

  const heroImg = overlay.querySelector('.sk-hero-img');
  heroImg.src = imgSrc;
  heroImg.alt = imgAlt;

  // Render body
  overlay.querySelector('.sk-body-content').innerHTML = buildBodyHTML({ title, tag, badges, num });

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
  setTimeout(onCloseEnd, 450); // fallback
}

function onCloseEnd() {
  overlay.classList.remove('is-open');
  panel.classList.remove('is-closing');
  overlay.setAttribute('aria-hidden', 'true');
}

// ── Build body HTML ───────────────────────────────────────────
function buildBodyHTML({ title, tag, badges }) {

  // Kelompokkan badge per level
  const byLevel = { 5: [], 4: [], 3: [], 2: [] };
  badges.forEach(b => {
    const lvl = parseInt(b.lvl, 10);
    if (byLevel[lvl]) byLevel[lvl].push(b.text);
    else byLevel[3].push(b.text);
  });

  const levelLabels = {
    5: '★★★★★  MASTER',
    4: '★★★★☆  ADVANCED',
    3: '★★★☆☆  INTERMEDIATE',
    2: '★★☆☆☆  LEARNING',
  };

  // Hanya tampilkan level yang punya isi
  const sectionsHTML = [5, 4, 3, 2]
    .filter(lvl => byLevel[lvl].length > 0)
    .map(lvl => `
      <div class="sk-level-group">
        <h3 class="sk-section-label">${levelLabels[lvl]}</h3>
        <div class="sk-badges">
          ${byLevel[lvl].map(t =>
            `<span class="badge" data-lvl="${lvl}">${t}</span>`
          ).join('')}
        </div>
      </div>
    `).join('');

  return `
    <div class="sk-body">
      <!-- Title -->
      <div class="sk-title-block">
        <h2 class="sk-title">${title}</h2>
        <span class="sk-tag-inline">◆ ${tag}</span>
      </div>

      <!-- Badges per level -->
      ${sectionsHTML}

      <!-- Legend -->
      <div class="sk-legend">
        <span class="sk-legend-item" data-lvl="5">★★★★★ MASTER</span>
        <span class="sk-legend-item" data-lvl="4">★★★★☆ ADVANCED</span>
        <span class="sk-legend-item" data-lvl="3">★★★☆☆ INTERMEDIATE</span>
        <span class="sk-legend-item" data-lvl="2">★★☆☆☆ LEARNING</span>
      </div>
    </div>
  `;
}
