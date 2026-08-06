import { useEffect } from 'react'
import { skillCards, skillsSummary } from '../../data/skills'
import SplitWords from '../common/SplitWords'

function useSummaryBars() {
  useEffect(() => {
    const items = document.querySelectorAll('.summary-item');
    if (!items.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    items.forEach(item => io.observe(item));
    return () => io.disconnect();
  }, []);
}

function usePctCounters() {
  useEffect(() => {
    const counters = document.querySelectorAll('.summary-pct');
    if (!counters.length) return;

    const io = new IntersectionObserver(
      (entries) => {
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
          setTimeout(() => requestAnimationFrame(tick), 200);
          io.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function SkillsSection({ onOpenSkill }) {
  useSummaryBars();
  usePctCounters();

  return (
    <section id="skills">
      <div className="section-tag reveal"><span>☣</span> SKILLSET</div>
      <h2 className="section-heading reveal split">
        <SplitWords>MY</SplitWords>
        <br />
        <SplitWords>SKILLS.</SplitWords>
      </h2>

      <div className="skills-summary reveal">
        {skillsSummary.map((item, i) => (
          <div className="summary-item" key={item.label} style={{ transitionDelay: `${i * 80}ms` }}>
            <span className="summary-label">{item.label}</span>
            <div className="summary-bar"><i style={{ '--w': `${item.pct}%` }} /></div>
            <span className="summary-pct">0</span>
          </div>
        ))}
      </div>

      <div className="skills-grid" id="skillsGrid">
        {skillCards.map((card, i) => {
          const col = i % 4;
          const row = Math.floor(i / 4);
          const delay = (col + row) * 60;
          return (
            <div
              className="skill-card reveal"
              data-skill-id={card.id}
              key={card.id}
              role="button"
              tabIndex="0"
              aria-label="View skill detail"
              style={{ transitionDelay: `${delay}ms` }}
              onClick={() => onOpenSkill(card)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onOpenSkill(card);
                }
              }}
            >
              <div className="skill-card-visual">
                <img src={card.img} alt="" className="sc-img" aria-hidden="true" />
                <div className="sc-slash" aria-hidden="true" />
                <div className="sc-halftone" aria-hidden="true" />
                <span className="sc-bignum" aria-hidden="true">{card.num}</span>
                <div className="sc-tag">{card.tag}</div>
              </div>
              <div className="skill-card-body">
                <div className="skill-card-header">
                  <span className="skill-card-icon">♣</span>
                  <span className="skill-card-title">{card.title}</span>
                </div>
                <div className="skill-badges">
                  {card.badges.map(b => (
                    <span className="badge" data-lvl={b.lvl} key={b.name}>{b.name}</span>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="skills-legend reveal">
        <span className="legend-title">LVL</span>
        <span className="legend-item" data-lvl="5">★★★★★ PROFESSIONAL</span>
        <span className="legend-item" data-lvl="4">★★★★☆ ADVANCED</span>
        <span className="legend-item" data-lvl="3">★★★☆☆ INTERMEDIATE</span>
        <span className="legend-item" data-lvl="2">★★☆☆☆ GOOD</span>
        <span className="legend-item" data-lvl="1">★☆☆☆☆ BEGINNER</span>
      </div>
    </section>
  )
}
