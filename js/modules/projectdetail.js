// ============================================================
// js/modules/projectdetail.js
// Persona 5-style project detail overlay
//
// FIX: Struktur HTML overlay dirender SEKALI di initProjectDetail().
//      openProject() hanya mengisi ulang konten di dalam .pd-body,
//      sehingga event listeners pada backdrop & close button
//      tidak pernah dihapus antar pembukaan.
// ============================================================
import { projects } from '../data/projects.js';

let overlay  = null;
let panel    = null;
let isOpen   = false;

// ── Init ────────────────────────────────────────────────────
export function initProjectDetail() {
  overlay = document.getElementById('project-overlay');
  if (!overlay) return;

  // Render struktur statis SEKALI — konten dinamis ada di .pd-body-content
  overlay.innerHTML = `
    <div class="pd-backdrop" aria-hidden="true"></div>
    <div class="pd-panel" role="dialog" aria-modal="true" aria-label="Project Detail">

      <!-- Top bar (statis, hanya num & category diupdate via JS) -->
      <div class="pd-topbar">
        <div class="pd-topbar-left">
          <span class="pd-num">01</span>
          <span class="pd-slash" aria-hidden="true"></span>
          <span class="pd-category">PROJECT</span>
        </div>
        <button class="pd-close" aria-label="Close project detail">
          <span class="pd-close-icon">✕</span>
          <span class="pd-close-label">ESC</span>
        </button>
      </div>

      <!-- Hero image (src diupdate via JS) -->
      <div class="pd-hero-img">
        <img src="" alt="" class="pd-hero-img-el" />
        <div class="pd-img-slash" aria-hidden="true"></div>
        <div class="pd-img-overlay" aria-hidden="true"></div>
      </div>

      <!-- Konten dinamis — hanya bagian ini yang diganti per project -->
      <div class="pd-body-content"></div>

      <!-- Bottom bar -->
      <div class="pd-bottombar" aria-hidden="true">
        <span class="pd-bottombar-num">◆ 01 / 04</span>
        <span>CONFIDENTIAL</span>
      </div>
    </div>
  `;

  panel = overlay.querySelector('.pd-panel');

  // Event listeners dipasang SEKALI di sini — tidak akan kehilangan referensi
  overlay.querySelector('.pd-backdrop').addEventListener('click', closeProject);
  overlay.querySelector('.pd-close').addEventListener('click', closeProject);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) closeProject();
  });
}

// ── Open ─────────────────────────────────────────────────────
export function openProject(id) {
  if (!overlay || !panel) return;

  const project = projects.find(p => p.id === id);
  if (!project) return;

  // Pastikan is-closing sudah bersih sebelum buka
  panel.classList.remove('is-closing');

  // Update bagian statis (topbar, hero image, bottom bar)
  overlay.querySelector('.pd-num').textContent      = project.num;
  overlay.querySelector('.pd-category').textContent = project.securityTag || 'PROJECT';
  overlay.querySelector('.pd-bottombar-num').textContent =
    `◆ ${project.num} / ${String(projects.length).padStart(2, '0')}`;

  const heroImg = overlay.querySelector('.pd-hero-img-el');
  heroImg.src = project.img || '';
  heroImg.alt = project.title;

  // Update konten dinamis
  overlay.querySelector('.pd-body-content').innerHTML = buildBodyHTML(project);

  // Buka overlay
  overlay.classList.add('is-open');
  overlay.removeAttribute('aria-hidden');
  document.body.style.overflow = 'hidden';
  isOpen = true;

  // Scroll panel ke atas saat ganti project
  panel.scrollTop = 0;

  overlay.querySelector('.pd-close').focus();
}

// ── Close ────────────────────────────────────────────────────
export function closeProject() {
  if (!overlay || !isOpen) return;
  isOpen = false;
  document.body.style.overflow = '';

  // Gunakan transitionend karena CSS pakai transition, bukan animation
  panel.classList.add('is-closing');
  panel.addEventListener('transitionend', onCloseTransitionEnd, { once: true });

  // Fallback: kalau transitionend tidak fire (tab hidden, dll) bersihkan manual
  setTimeout(onCloseTransitionEnd, 500);
}

function onCloseTransitionEnd() {
  overlay.classList.remove('is-open');
  panel.classList.remove('is-closing');
  overlay.setAttribute('aria-hidden', 'true');
}

// ── Build body HTML ──────────────────────────────────────────
function buildBodyHTML(p) {
  const d = p.detail || {};

  const stackHTML = (d.stack || [])
    .map(s => `<span class="pd-stack-tag">${s}</span>`)
    .join('');

  const highlightsHTML = (d.highlights || [])
    .map(h => `<li class="pd-highlight-item"><span class="pd-hl-icon">◆</span>${h}</li>`)
    .join('');

  const linksHTML = (() => {
    const btns = [];
    if (d.links?.github) btns.push(`<a href="${d.links.github}" target="_blank" rel="noopener" class="pd-btn pd-btn-ghost">◆ GITHUB</a>`);
    if (d.links?.live)   btns.push(`<a href="${d.links.live}"   target="_blank" rel="noopener" class="pd-btn pd-btn-red">★ LIVE DEMO</a>`);
    return btns.length ? `<div class="pd-links">${btns.join('')}</div>` : '';
  })();

  return `
    <div class="pd-body">
      <!-- Title -->
      <div class="pd-title-block">
        <h2 class="pd-title">${p.title}</h2>
        <div class="pd-meta-row">
          <span class="pd-meta-item"><em>YEAR</em>${d.year || '—'}</span>
          <span class="pd-meta-sep" aria-hidden="true">◆</span>
          <span class="pd-meta-item"><em>ROLE</em>${d.role || '—'}</span>
        </div>
      </div>

      <!-- Tags -->
      <div class="pd-tags">
        ${p.tags.map(t => `<span class="pd-tag">${t}</span>`).join('')}
      </div>

      <!-- Overview -->
      <div class="pd-section">
        <h3 class="pd-section-label">▶ OVERVIEW</h3>
        <p class="pd-overview">${d.overview || ''}</p>
      </div>

      <!-- Stack -->
      <div class="pd-section">
        <h3 class="pd-section-label">▶ TECH STACK</h3>
        <div class="pd-stack">${stackHTML}</div>
      </div>

      <!-- Highlights -->
      <div class="pd-section">
        <h3 class="pd-section-label">▶ HIGHLIGHTS</h3>
        <ul class="pd-highlights">${highlightsHTML}</ul>
      </div>

      ${linksHTML}
    </div>
  `;
}
