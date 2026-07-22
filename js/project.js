// ============================================================
// js/project.js
// Script untuk halaman project.html
// Baca query param ?id= lalu render konten project
// + Animasi page reveal P5 style setelah battle transition
// ============================================================
import { projects } from './data/projects.js';

// ── Page reveal: wipe merah → konten masuk ──────────────────
function initPageReveal() {
  // Inject reveal overlay ke body
  const rev = document.createElement('div');
  rev.id = 'page-reveal';
  rev.innerHTML = `
    <div class="pr-wipe-left"></div>
    <div class="pr-wipe-right"></div>
    <div class="pr-flash"></div>
  `;
  document.body.prepend(rev);

  // Inject CSS inline (agar tidak perlu file terpisah)
  const style = document.createElement('style');
  style.textContent = `
    #page-reveal {
      position: fixed; inset: 0; z-index: 88888;
      pointer-events: none; overflow: hidden;
    }
    /* Wipe kiri: panel merah slide keluar ke kiri */
    .pr-wipe-left {
      position: absolute; top: 0; left: 0;
      width: 55%; height: 100%;
      background: #e10600;
      clip-path: polygon(0 0, 105% 0, 90% 100%, 0 100%);
      transform: translateX(0%);
      animation: prWipeLeft 0.4s 0.05s cubic-bezier(0.86, 0, 0.07, 1) forwards;
    }
    /* Wipe kanan: panel hitam slide keluar ke kanan */
    .pr-wipe-right {
      position: absolute; top: 0; right: 0;
      width: 55%; height: 100%;
      background: #000;
      clip-path: polygon(10% 0, 100% 0, 100% 100%, -5% 100%);
      transform: translateX(0%);
      animation: prWipeRight 0.4s 0.05s cubic-bezier(0.86, 0, 0.07, 1) forwards;
    }
    /* Flash putih tipis di tengah sebelum reveal */
    .pr-flash {
      position: absolute; inset: 0;
      background: #fff;
      opacity: 0.7;
      animation: prFlash 0.25s 0s ease-out forwards;
    }
    @keyframes prWipeLeft {
      from { transform: translateX(0%); }
      to   { transform: translateX(-110%); }
    }
    @keyframes prWipeRight {
      from { transform: translateX(0%); }
      to   { transform: translateX(110%); }
    }
    @keyframes prFlash {
      0%   { opacity: 0.7; }
      100% { opacity: 0; }
    }
    /* Konten utama: fade+slide up saat wipe selesai */
    .proj-page.pr-content-in {
      animation: prContentIn 0.45s 0.3s cubic-bezier(0.16, 0.8, 0.3, 1) both;
    }
    @keyframes prContentIn {
      from { opacity: 0; transform: translateY(28px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .proj-topbar.pr-bar-in {
      animation: prBarIn 0.35s 0.15s cubic-bezier(0.16, 0.8, 0.3, 1) both;
    }
    @keyframes prBarIn {
      from { opacity: 0; transform: translateY(-100%); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .proj-hero.pr-hero-in {
      animation: prHeroIn 0.5s 0.2s cubic-bezier(0.16, 0.8, 0.3, 1) both;
    }
    @keyframes prHeroIn {
      from { opacity: 0; transform: scale(1.06); }
      to   { opacity: 1; transform: scale(1); }
    }
    @media (prefers-reduced-motion: reduce) {
      .pr-wipe-left, .pr-wipe-right, .pr-flash,
      .proj-page.pr-content-in, .proj-topbar.pr-bar-in, .proj-hero.pr-hero-in {
        animation-duration: 0.01ms !important;
      }
    }
  `;
  document.head.appendChild(style);

  // Tambahkan class animasi pada elemen konten
  document.querySelector('.proj-topbar')?.classList.add('pr-bar-in');
  document.querySelector('.proj-hero')?.classList.add('pr-hero-in');
  document.querySelector('.proj-page')?.classList.add('pr-content-in');

  // Hapus overlay setelah animasi selesai (cleanup)
  setTimeout(() => { rev.remove(); }, 900);
}

// ── Custom cursor ───────────────────────────────────────────
function initCursor() {
  const dot  = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mx = -100, my = -100;
  let rx = -100, ry = -100;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  function loop() {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    dot.style.transform  = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  }
  loop();

  document.querySelectorAll('a, button, [role="button"]').forEach(el => {
    el.addEventListener('mouseenter', () => { dot.classList.add('hover'); ring.classList.add('hover'); });
    el.addEventListener('mouseleave', () => { dot.classList.remove('hover'); ring.classList.remove('hover'); });
  });
}

// ── Scan lines init ─────────────────────────────────────────
function initBg() {
  // Scan lines sudah ada di HTML, tidak perlu JS
}

// ── Reveal sections on scroll ───────────────────────────────
function initReveal() {
  const sections = document.querySelectorAll('.proj-section');
  if (!sections.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  sections.forEach(s => io.observe(s));
}

// ── Build page HTML from project data ───────────────────────
function buildPage(project) {
  const d = project.detail || {};

  // ── Top bar
  document.querySelector('.proj-num').textContent      = project.num;
  document.querySelector('.proj-category').textContent = project.securityTag || 'PROJECT';
  document.querySelector('.proj-bottombar-num').textContent =
    `◆ ${project.num} / ${String(projects.length).padStart(2, '0')}`;

  // ── Hero image
  const heroImg = document.querySelector('.proj-hero-img');
  if (heroImg) {
    heroImg.src = project.img || '';
    heroImg.alt = project.title;
  }
  document.querySelector('.proj-hero-num').textContent = project.num;

  // ── Page title (tab)
  document.title = `${project.title} — evannvsl`;

  // ── Title block
  document.querySelector('.proj-title').textContent = project.title;
  document.querySelector('.proj-meta-year').textContent  = d.year || '—';
  document.querySelector('.proj-meta-role').textContent  = d.role || '—';

  // ── Tags
  const tagsEl = document.querySelector('.proj-tags');
  tagsEl.innerHTML = project.tags
    .map(t => `<span class="proj-tag">${t}</span>`)
    .join('');

  // ── Overview
  document.querySelector('.proj-overview').textContent = d.overview || '';

  // ── Stack
  const stackEl = document.querySelector('.proj-stack');
  stackEl.innerHTML = (d.stack || [])
    .map(s => `<span class="proj-stack-tag">${s}</span>`)
    .join('');

  // ── Highlights
  const hlEl = document.querySelector('.proj-highlights');
  hlEl.innerHTML = (d.highlights || [])
    .map(h => `
      <li class="proj-highlight-item">
        <span class="proj-hl-icon">◆</span>
        <span>${h}</span>
      </li>`)
    .join('');

  // ── Links
  const linksEl = document.querySelector('.proj-links');
  const btns = [];
  if (d.links?.github && d.links.github !== '#') {
    btns.push(`<a href="${d.links.github}" target="_blank" rel="noopener" class="proj-btn proj-btn-ghost">◆ GITHUB</a>`);
  }
  if (d.links?.live && d.links.live !== '#') {
    btns.push(`<a href="${d.links.live}" target="_blank" rel="noopener" class="proj-btn proj-btn-red">★ LIVE DEMO</a>`);
  }
  linksEl.innerHTML = btns.join('');

  // Sembunyikan section links jika kosong
  const linksSection = linksEl.closest('.proj-section');
  if (linksSection && btns.length === 0) {
    linksSection.style.display = 'none';
  }
}

// ── Show not-found state ────────────────────────────────────
function showNotFound() {
  const main = document.querySelector('.proj-page');
  if (!main) return;
  main.innerHTML = `
    <div class="proj-not-found">
      <h2>PROJECT NOT FOUND</h2>
      <p>// ID TIDAK DIKENALI DALAM DATABASE</p>
      <a href="index.html" class="proj-btn proj-btn-red">← KEMBALI</a>
    </div>
  `;
}

// ── Closing transition: "battle end" ────────────────────────
function playCloseTransition(targetUrl) {
  const overlay = document.getElementById('close-transition');

  // 1. Screen shake ringan
  document.body.classList.add('ct-shaking');
  document.body.addEventListener('animationend', () => {
    document.body.classList.remove('ct-shaking');
  }, { once: true });

  // 2. Konten retreat (fade+slide down)
  const page    = document.querySelector('.proj-page');
  const topbar  = document.querySelector('.proj-topbar');
  const hero    = document.querySelector('.proj-hero');

  if (page)   { page.style.transition   = 'opacity .2s ease, transform .2s ease'; page.style.opacity   = '0'; page.style.transform   = 'translateY(20px)'; }
  if (topbar) { topbar.style.transition = 'opacity .18s ease, transform .18s ease'; topbar.style.opacity = '0'; topbar.style.transform = 'translateY(-16px)'; }
  if (hero)   { hero.style.transition   = 'opacity .22s ease, transform .22s ease'; hero.style.opacity   = '0'; hero.style.transform   = 'scale(1.04)'; }

  // 3. Jalankan overlay setelah konten mulai retreat
  setTimeout(() => {
    if (overlay) overlay.classList.add('ct-active');
  }, 80);

  // 4. Vibrate mobile
  if (navigator.vibrate) navigator.vibrate([30, 15, 40]);

  // 5. Navigate — total ~850ms
  setTimeout(() => {
    window.location.href = targetUrl;
  }, 850);
}

// ── Back button ──────────────────────────────────────────────
function initBackButton() {
  const btn = document.getElementById('proj-back');
  if (!btn) return;

  let fired = false;
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    if (fired) return;
    fired = true;
    playCloseTransition('index.html#portfolio');
  });
}

// ── Main ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Baca ?id= dari URL
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'), 10);

  const project = id ? projects.find(p => p.id === id) : null;

  if (!project) {
    showNotFound();
  } else {
    buildPage(project);
    initPageReveal();   // P5 wipe reveal setelah battle transition
    initReveal();
  }

  initCursor();
  initBackButton();
  initBg();
});
