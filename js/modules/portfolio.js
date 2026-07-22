// ============================================================
// js/modules/portfolio.js
// Klik card → battle transition → redirect ke project.html?id=X
// ============================================================
import { playBattleTransition } from './battle-transition.js';

function goToProject(id) {
  playBattleTransition(`project.html?id=${id}`);
}

export function renderPortfolio() {
  const cards = document.querySelectorAll('.work-card[data-project-id]');
  cards.forEach(card => {
    const id = parseInt(card.dataset.projectId, 10);
    if (!id) return;

    card.style.cursor = 'pointer';

    // Click di mana saja pada card → battle transition (kecuali klik link nyata)
    card.addEventListener('click', (e) => {
      if (e.target.closest('a[href]:not([href="#"])')) return;
      goToProject(id);
    });

    // Keyboard accessibility
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `View project details`);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        goToProject(id);
      }
    });
  });
}