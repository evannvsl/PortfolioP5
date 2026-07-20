// ============================================================
// js/modules/skills.js
// ============================================================

/**
 * renderSkills()
 * – Animates .summary-item progress bars when they scroll into view
 * – Staggers the .skill-card reveal for a cascade effect
 * – Adds data-count animation on .summary-pct numbers
 */
export function renderSkills() {
  animateSummaryBars();
  staggerSkillCards();
  animatePctCounters();
}

/* ── Summary Bars ───────────────────────────────────────── */
function animateSummaryBars() {
  const items = document.querySelectorAll('.summary-item');
  if (!items.length) return;

  const io = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  items.forEach((item, i) => {
    // Stagger each bar slightly
    item.style.transitionDelay = `${i * 80}ms`;
    io.observe(item);
  });
}

/* ── Skill Cards stagger ────────────────────────────────── */
function staggerSkillCards() {
  const cards = document.querySelectorAll('.skill-card');
  if (!cards.length) return;

  cards.forEach((card, i) => {
    // Persona 5 diagonal cascade — column-first stagger
    const col = i % 4;
    const row = Math.floor(i / 4);
    const delay = (col + row) * 60;
    card.style.transitionDelay = `${delay}ms`;
  });
}

/* ── Percentage counter animation ──────────────────────── */
function animatePctCounters() {
  const counters = document.querySelectorAll('.summary-pct');
  if (!counters.length) return;

  const io = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const bar = el.closest('.summary-item')?.querySelector('.summary-bar i');
        const target = parseInt(bar?.style.getPropertyValue('--w') ?? '0', 10);
        let current = 0;
        const step = Math.ceil(target / 30);

        const tick = () => {
          current = Math.min(current + step, target);
          el.textContent = current;
          if (current < target) requestAnimationFrame(tick);
        };

        // Delay counter to sync with bar animation
        setTimeout(() => requestAnimationFrame(tick), 200);
        io.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(el => io.observe(el));
}
