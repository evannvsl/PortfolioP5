import { useEffect, useRef, useState } from 'react'
import { skillDetails } from '../../data/skills-detail'

const levelLabels = {
  5: '★★★★★ PROFESSIONAL / MASTER',
  4: '★★★★☆ ADVANCED EXPERT',
  3: '★★★☆☆ INTERMEDIATE',
  2: '★★☆☆☆ GOOD KNOWLEDGE',
  1: '★☆☆☆☆ BASIC FOUNDATION'
}

const TOTAL_CARDS = 8

export default function SkillPopup({ card, total, isOpen, onClose }) {
  const [masteryWidth, setMasteryWidth] = useState('0%')
  const panelRef = useRef(null)

  const skillId = card.id;
  const info = skillDetails[skillId] || {
    title: card.title,
    tag: card.tag,
    mastery: 85,
    levelText: 'PROFICIENT',
    desc: 'Pengembangan dan penerapan keahlian teknis secara profesional.',
    competencies: ['Penerapan keahlian teknis', 'Analisis dan pemecahan masalah']
  };

  useEffect(() => {
    if (isOpen) {
      setMasteryWidth('0%')
      const t = setTimeout(() => setMasteryWidth(`${info.mastery}%`), 120);
      return () => clearTimeout(t);
    }
  }, [isOpen, skillId, info.mastery]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    if (isOpen) {
      const onKey = (e) => {
        if (e.key === 'Escape') onClose();
      };
      document.addEventListener('keydown', onKey);
      return () => {
        document.removeEventListener('keydown', onKey);
        document.body.style.overflow = '';
      };
    }
  }, [isOpen, onClose]);

  // Group badges by level
  const byLevel = { 5: [], 4: [], 3: [], 2: [], 1: [] };
  card.badges.forEach(b => {
    const lvl = parseInt(b.lvl, 10);
    if (byLevel[lvl]) byLevel[lvl].push(b.name);
    else byLevel[3].push(b.name);
  });

  const num = String(skillId).padStart(2, '0');
  const totalStr = String(total || TOTAL_CARDS).padStart(2, '0');

  return (
    <div id="skill-overlay" className={isOpen ? 'is-open' : ''} aria-hidden={!isOpen}>
      <div className="sk-backdrop" aria-hidden="true" onClick={onClose} />
      <div className="sk-panel" role="dialog" aria-modal="true" aria-label="Skill Detail Inspector" ref={panelRef}>
        <div className="sk-topbar">
          <div className="sk-topbar-left">
            <span className="sk-num">{num}</span>
            <span className="sk-slash-dec" aria-hidden="true" />
            <span className="sk-category">{info.tag || card.tag || 'SKILLSET'}</span>
          </div>
          <button className="sk-close" aria-label="Close skill detail" onClick={onClose}>
            <span>✕</span>
          </button>
        </div>

        <div className="sk-hero">
          <img src={card.img} alt="" className="sk-hero-img" />
          <div className="sk-hero-overlay" />
          <div className="sk-hero-slash" aria-hidden="true" />
          <span className="sk-hero-bignum" aria-hidden="true">{num}</span>
        </div>

        <div className="sk-body-content">
          <div className="sk-body">
            <div className="sk-title-block">
              <h2 className="sk-title">{info.title || card.title}</h2>
            </div>

            <div className="sk-mastery-box">
              <div className="sk-mastery-header">
                <span className="sk-mastery-label">MASTERY LEVEL</span>
                <span className="sk-mastery-val">{info.mastery}% </span>
              </div>
              <div className="sk-mastery-track">
                <div className="sk-mastery-fill" style={{ width: masteryWidth }} />
              </div>
            </div>

            <div className="sk-section">
              <h4 className="sk-section-label">DESKRIPSI SKILLSET</h4>
              <p className="sk-desc-text">{info.desc}</p>
            </div>

            <div className="sk-section">
              <h4 className="sk-section-label">CORE COMPETENCY & CAPABILITIES</h4>
              <ul className="sk-comp-list">
                {(info.competencies || []).map(c => (
                  <li className="sk-comp-item" key={c}>
                    <span className="sk-comp-bullet">◆</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="sk-section">
              <h4 className="sk-section-label">TEKNOLOGI & PERKAKAS TERKAIT</h4>
              {[5, 4, 3, 2, 1]
                .filter(lvl => byLevel[lvl].length > 0)
                .map(lvl => (
                  <div className="sk-level-group" key={lvl}>
                    <h4 className="sk-section-label">{levelLabels[lvl]}</h4>
                    <div className="sk-badges">
                      {byLevel[lvl].map(t => (
                        <span className="badge" data-lvl={lvl} key={t}>✦ {t}</span>
                      ))}
                    </div>
                  </div>
                ))}
            </div>

            <div className="sk-legend">
              <span className="sk-legend-title">LEVEL:</span>
              <span className="sk-legend-item" data-lvl="5">LVL 5: MASTER</span>
              <span className="sk-legend-item" data-lvl="4">LVL 4: ADVANCED</span>
              <span className="sk-legend-item" data-lvl="3">LVL 3: INTERMEDIATE</span>
              <span className="sk-legend-item" data-lvl="2">LVL 2: GOOD</span>
              <span className="sk-legend-item" data-lvl="1">LVL 1: BEGINNER</span>
            </div>
          </div>
        </div>

        <div className="sk-bottombar">
          <span className="sk-bottombar-num">{num} / {totalStr}</span>
          <span>OK</span>
        </div>
      </div>
    </div>
  )
}
