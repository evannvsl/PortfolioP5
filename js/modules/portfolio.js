// ============================================================
// js/modules/portfolio.js
// ============================================================
import { openProject } from './projectdetail.js';

export function renderPortfolio() {
  // Cards are hardcoded in HTML — just wire up click handlers
  const cards = document.querySelectorAll('.work-card[data-project-id]');
  cards.forEach(card => {
    const id = parseInt(card.dataset.projectId, 10);
    if (!id) return;

    card.style.cursor = 'pointer';

    // Click anywhere on card opens detail, EXCEPT if user clicks a real <a>
    card.addEventListener('click', (e) => {
      if (e.target.closest('a[href]:not([href="#"])')) return;
      openProject(id);
    });

    // Keyboard accessibility
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `View project details`);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openProject(id);
      }
    });
  });
}