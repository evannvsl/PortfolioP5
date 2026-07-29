// ============================================================
// js/project.js
// Script untuk Halaman Project History & Portfolio Showcase
// Mengelola data project (Code, Hardware, Creative, Achievements),
// tab filter, pencarian real-time, inspector modal & battle transition
// ============================================================
import { projects } from './data/projects.js';

// ── Render Projects List ─────────────────────────────────────
function renderProjects(projectsToRender) {
  const container = document.getElementById('ph-projects-list');
  if (!container) return;

  if (!projectsToRender || projectsToRender.length === 0) {
    container.innerHTML = `
      <div class="ph-no-results" style="text-align:center; padding: 60px 20px;">
        <h3 style="font-family: var(--f-display); font-size: 24px; color: var(--red);">PROJECT TIDAK DITEMUKAN</h3>
        <p style="font-family: var(--f-code); color: rgba(255,255,255,0.5); margin-top: 8px;">// Silakan coba kata kunci pencarian atau kategori lain</p>
      </div>
    `;
    return;
  }

  container.innerHTML = projectsToRender.map(project => {
    const d = project.detail || {};
    const items = d.items || [];

    const highlightsHtml = (d.highlights || []).map(h => `
      <li><em>◆</em> <span>${h}</span></li>
    `).join('');

    const stackTagsHtml = (d.stack || []).map(s => `
      <span class="ph-stack-tag">${s}</span>
    `).join('');

    const subCardsHtml = items.map((item, idx) => `
      <article class="ph-subcard" data-cat="${project.category}" data-item-index="${idx}">
        <div class="ph-subcard-top">
          <span class="ph-subcard-role">${item.role || 'Case Study'}</span>
          <span class="ph-subcard-year">${item.year || d.year}</span>
        </div>
        <h4 class="ph-subcard-title">${item.title}</h4>
        <p class="ph-subcard-summary">${item.summary || item.details}</p>
        <div class="ph-subcard-stack">
          ${(item.stack || []).map(st => `<span class="ph-subcard-chip">${st}</span>`).join('')}
        </div>
        <div class="ph-subcard-action">
          <span>INSPECT CASE STUDY</span>
          <i>➜</i>
        </div>
      </article>
    `).join('');

    return `
      <section class="ph-category-block" id="cat-${project.category}" data-cat="${project.category}">
        
        <!-- Category Header -->
        <header class="ph-cat-header">
          <div class="ph-cat-header-left">
            <span class="ph-cat-num-tag">CATEGORY ${project.num} /</span>
            <h2 class="ph-cat-title">${project.title}</h2>
            <p class="ph-cat-subtitle">${project.subtitle || project.desc}</p>
          </div>
          <span class="ph-cat-security-tag">${project.securityTag || 'SECURE LOG'}</span>
        </header>

        <!-- Category Overview & High-level details -->
        <div class="ph-cat-overview-box">
          <div class="ph-cat-overview-text">
            <h4>◆ SINKRONISASI KATEGORI</h4>
            <p>${d.overview || project.desc}</p>
            <div class="ph-highlights-title">TECHNICAL HIGHLIGHTS</div>
            <ul class="ph-highlights-list">
              ${highlightsHtml}
            </ul>
          </div>
          <div class="ph-cat-meta-side">
            <div class="ph-meta-box">
              <span class="ph-meta-lbl">ROLE & EXPERTISE</span>
              <span class="ph-meta-val">${d.role || 'Developer'}</span>
            </div>
            <div class="ph-meta-box">
              <span class="ph-meta-lbl">TIMELINE</span>
              <span class="ph-meta-val">${d.year || '2024'}</span>
            </div>
            <div class="ph-meta-box">
              <span class="ph-meta-lbl">CORE STACK</span>
              <div class="ph-stack-tags">
                ${stackTagsHtml}
              </div>
            </div>
          </div>
        </div>

        <!-- Sub-Projects Case Studies Grid -->
        <div class="ph-subprojects-grid">
          ${subCardsHtml}
        </div>

      </section>
    `;
  }).join('');

  // Re-attach modal listeners to subcards
  attachSubcardListeners();
}

// ── Modal Inspector Logic ────────────────────────────────────
function openModal(catName, itemIndex) {
  const project = projects.find(p => p.category === catName || p.id === parseInt(catName, 10));
  if (!project || !project.detail || !project.detail.items) return;

  const item = project.detail.items[itemIndex];
  if (!item) return;

  const modal = document.getElementById('ph-modal');
  if (!modal) return;

  document.getElementById('modal-cat-tag').textContent = `${project.num} / ${project.title}`;
  document.getElementById('modal-title').textContent = item.title;
  document.getElementById('modal-role').textContent = item.role || project.detail.role;
  document.getElementById('modal-year').textContent = item.year || project.detail.year;
  document.getElementById('modal-summary').textContent = item.summary || item.details;
  document.getElementById('modal-details').textContent = item.details || item.summary;

  const stackContainer = document.getElementById('modal-stack');
  stackContainer.innerHTML = (item.stack || project.detail.stack || []).map(st => `
    <span class="ph-subcard-chip" style="background: rgba(225,6,0,0.1); border-color: rgba(225,6,0,0.3); color: #fff;">${st}</span>
  `).join('');

  const linkBtn = document.getElementById('modal-link-btn');
  if (item.link && item.link !== '#') {
    linkBtn.href = item.link;
    linkBtn.style.display = 'inline-flex';
  } else if (project.detail.links && project.detail.links.github) {
    linkBtn.href = project.detail.links.github;
    linkBtn.style.display = 'inline-flex';
  } else {
    linkBtn.style.display = 'none';
  }

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('ph-modal');
  if (!modal) return;
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function attachSubcardListeners() {
  const cards = document.querySelectorAll('.ph-subcard');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const cat = card.dataset.cat;
      const idx = parseInt(card.dataset.itemIndex, 10);
      openModal(cat, idx);
    });
  });
}

// ── Search & Filter Logic ────────────────────────────────────
function initSearchAndFilter() {
  const searchInput = document.getElementById('ph-search-input');
  const clearBtn = document.getElementById('ph-search-clear');
  const filterTabs = document.querySelectorAll('.filter-tab');

  let activeCat = 'all';

  function applyFilters() {
    const query = (searchInput.value || '').toLowerCase().trim();

    const filtered = projects.filter(proj => {
      // 1. Filter Kategori
      const catMatch = activeCat === 'all' || proj.category === activeCat;
      if (!catMatch) return false;

      // 2. Filter Search Query
      if (!query) return true;

      const titleMatch = proj.title.toLowerCase().includes(query);
      const descMatch = (proj.desc || '').toLowerCase().includes(query);
      const tagsMatch = (proj.tags || []).some(t => t.toLowerCase().includes(query));
      const stackMatch = (proj.detail?.stack || []).some(s => s.toLowerCase().includes(query));
      const itemsMatch = (proj.detail?.items || []).some(item => 
        item.title.toLowerCase().includes(query) || 
        (item.summary || '').toLowerCase().includes(query) ||
        (item.stack || []).some(st => st.toLowerCase().includes(query))
      );

      return titleMatch || descMatch || tagsMatch || stackMatch || itemsMatch;
    });

    renderProjects(filtered);
  }

  // Event tabs
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeCat = tab.dataset.cat;

      // Scroll halus ke section jika memilih kategori khusus
      if (activeCat !== 'all') {
        const targetSection = document.getElementById(`cat-${activeCat}`);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      }

      applyFilters();
    });
  });

  // Event search
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      if (clearBtn) clearBtn.style.display = searchInput.value ? 'block' : 'none';
      applyFilters();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      clearBtn.style.display = 'none';
      applyFilters();
    });
  }
}

// ── Back Navigation & Battle Transition ───────────────────────
function playCloseTransition(targetUrl) {
  sessionStorage.setItem('skipPreloader', 'true');
  const overlay = document.getElementById('close-transition');
  document.body.classList.add('ct-shaking');

  if (overlay) overlay.classList.add('ct-active');

  if (navigator.vibrate) {
    navigator.vibrate([30, 20, 50]);
  }

  setTimeout(() => {
    window.location.href = targetUrl;
  }, 880);
}

function initBackButton() {
  let fired = false;
  function goBack() {
    if (fired) return;
    const modal = document.getElementById('ph-modal');
    if (modal && modal.classList.contains('active')) {
      closeModal();
      return;
    }
    fired = true;
    playCloseTransition('index.html#portfolio');
  }

  const btn = document.getElementById('proj-back');
  if (btn) {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      goBack();
    });
  }

  const logo = document.querySelector('.proj-logo');
  if (logo) {
    logo.addEventListener('click', (e) => {
      e.preventDefault();
      goBack();
    });
  }

  const bottomEsc = document.querySelector('.proj-bottombar-esc');
  if (bottomEsc) {
    bottomEsc.style.cursor = 'pointer';
    bottomEsc.addEventListener('click', (e) => {
      e.preventDefault();
      goBack();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') goBack();
  });
}

function initPageReveal() {
  // Selalu pastikan flag skipPreloader aktif selama user di project.html
  sessionStorage.setItem('skipPreloader', 'true');

  const reveal = document.getElementById('project-page-reveal');
  if (reveal) {
    reveal.classList.add('revealing');
    setTimeout(() => {
      reveal.classList.remove('revealing');
    }, 500);
  }
}

// ── Custom Cursor ─────────────────────────────────────────────
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

  document.addEventListener('mouseover', e => {
    if (e.target.closest('a, button, .ph-subcard, .filter-tab, .proj-bottombar-esc')) {
      dot.classList.add('hover'); ring.classList.add('hover');
    } else {
      dot.classList.remove('hover'); ring.classList.remove('hover');
    }
  });
}

// ── Initialization ────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initPageReveal();
  renderProjects(projects);
  initSearchAndFilter();
  initBackButton();
  initCursor();

  // Close modal listeners
  const closeBtn = document.getElementById('ph-modal-close');
  const backdrop = document.querySelector('.ph-modal-backdrop');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  // Read query params ?id=1 or ?cat=code
  const params = new URLSearchParams(window.location.search);
  const idParam = params.get('id');
  const catParam = params.get('cat');

  if (idParam) {
    const proj = projects.find(p => p.id === parseInt(idParam, 10));
    if (proj) {
      const tab = document.querySelector(`.filter-tab[data-cat="${proj.category}"]`);
      if (tab) tab.click();
    }
  } else if (catParam) {
    const tab = document.querySelector(`.filter-tab[data-cat="${catParam}"]`);
    if (tab) tab.click();
  }
});
