// ============================================================
// js/modules/portfolio.js (render data)
// ============================================================
import { projects } from '../data/projects.js';

export function renderPortfolio() {
  const grid = document.getElementById('workGrid');
  if (!grid) return;
  grid.innerHTML = '';
  projects.forEach(p => {
    const article = document.createElement('article');
    article.className = 'work-card reveal';
    article.innerHTML = `
      <div class="work-media">
        <div class="work-img-placeholder">
          <div class="work-img-slash"></div>
        </div>
        <span class="work-num">${p.num}</span>
        <div class="work-halftone"></div>
        <div class="work-security-tag">◆ SECURE</div>
      </div>
      <div class="work-info">
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <div class="work-tags">${p.tags.map(t => `<span>${t}</span>`).join('')}</div>
        <a href="${p.link}" class="work-link magnetic">MORE INFORMATION <i>➜</i></a>
      </div>
    `;
    grid.appendChild(article);
  });
}