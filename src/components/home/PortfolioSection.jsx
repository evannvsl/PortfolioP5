import { useNavigate } from 'react-router-dom'
import { playBattleTransition } from '../../utils/transitions'
import SplitWords from '../common/SplitWords'

const workCards = [
  {
    id: 1,
    num: '01',
    img: '/assets/img/futaba sakura.jpeg',
    alt: 'Code and Security',
    securityTag: 'WASPADALAH',
    title: 'CODE | DATA & SECURITY',
    desc: 'Membangun sistem web yang aman dari bawah ke atas — mulai dari arsitektur database, enkripsi data sensitif, hingga penetration testing. Setiap baris kode ditulis dengan mempertimbangkan potensi celah dan serangan siber.',
    stats: [{ em: '4+', label: 'PROJECTS' }, { em: '2024' }],
    tags: ['WEB', 'APPS', 'DATABASE', 'SECURITY', 'CRYPTOGRAPHY']
  },
  {
    id: 2,
    num: '02',
    img: '/assets/img/gif/kid.gif',
    alt: 'Tech and Hardware',
    securityTag: 'BERSIAPLAH',
    title: 'TECH & HARDWARE',
    desc: 'Dari breadboard ke produk jadi — eksplorasi di dunia embedded systems, robotika, dan fabrikasi fisik. Menggabungkan logika pemrograman mikrokontroler dengan desain elektronik dan 3D printing.',
    stats: [{ em: '6+', label: 'BUILDS' }, { em: '2023' }],
    tags: ['ARDUINO', 'ROBOTICS', '3D PRINTING', 'ELECTRONICS']
  },
  {
    id: 3,
    num: '03',
    img: '/assets/img/Kasumi p5.png',
    alt: 'Creative and Artistic',
    securityTag: 'MY MINE GWEHJ',
    title: 'CREATIVE & ART',
    desc: 'Di sini teknik bertemu ekspresi. Koleksi karya sinematografi, fotografi, motion graphics, dan desain visual — setiap karya punya konsep dan identitasnya sendiri.',
    stats: [{ em: '20+', label: 'WORKS' }, { em: '2022–NOW' }],
    tags: ['CINEMATOGRAPHY', 'VIDEO EDITING', 'GRAPHIC DESIGN', 'MOTION']
  },
  {
    id: 4,
    num: '04',
    img: '/assets/img/gif/edogawa.gif',
    alt: 'My Achievements',
    securityTag: 'WELL WELL WELL',
    featured: true,
    title: 'MY ACHIEVEMENTS',
    desc: 'Kumpulan pencapaian dari kompetisi, sertifikasi, dan riset selama masa studi. Setiap entri adalah bukti nyata — bukan sekadar klaim — dari komitmen terhadap pengembangan diri di bidang teknologi.',
    counters: [
      { num: '3+', label: 'CERTIFICATION' },
      { num: '5+', label: 'COMPETITION' },
      { num: '2+', label: 'RESEARCH' }
    ],
    tags: ['COMPETITION', 'AWARD', 'CERTIFICATION', 'RESEARCH']
  }
]

function WorkCard({ card, onNavigate }) {
  const handleClick = () => {
    onNavigate(card.id)
  }
  const handleKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onNavigate(card.id)
    }
  }

  const inner = (
    <>
      <div className="work-media">
        <div className="work-img-placeholder">
          <img src={card.img} alt={card.alt} className="work-img" />
        </div>
        <div className="work-img-slash" aria-hidden="true" />
        <span className="work-num" aria-hidden="true">{card.num}</span>
        <div className="work-halftone" aria-hidden="true" />
        <span className="work-security-tag">{card.securityTag}</span>
      </div>
      <div className={card.featured ? 'work-info wf-info' : 'work-info'}>
        <div className="work-info-top">
          <h3>{card.title}</h3>
        </div>
        <p>{card.desc}</p>

        {card.featured && (
          <div className="wf-counters" aria-hidden="true">
            {card.counters.map(c => (
              <div className="wf-counter" key={c.label}>
                <span className="wfc-num">{c.num}</span>
                <span className="wfc-label">{c.label}</span>
              </div>
            ))}
          </div>
        )}

        {!card.featured && (
          <div className="work-stats" aria-hidden="true">
            <span className="work-stat"><em>{card.stats[0].em}</em> {card.stats[0].label}</span>
            <span className="work-stat-sep">◆</span>
            <span className="work-stat"><em>{card.stats[1].em}</em></span>
          </div>
        )}

        <div className="work-tags">
          {card.tags.map(t => <span key={t}>{t}</span>)}
        </div>
        <span className="work-link">MORE INFORMATION <i>➜</i></span>
      </div>
    </>
  )

  if (card.featured) {
    return (
      <article
        className="work-card work-card--featured reveal"
        data-project-id={card.id}
        role="button"
        tabIndex="0"
        aria-label="View project details"
        onClick={handleClick}
        onKeyDown={handleKey}
      >
        <div className="wf-badge" aria-hidden="true">◆ FEATURED</div>
        <div className="work-card--featured-inner">{inner}</div>
      </article>
    )
  }

  return (
    <article
      className="work-card reveal"
      data-project-id={card.id}
      role="button"
      tabIndex="0"
      aria-label="View project details"
      onClick={handleClick}
      onKeyDown={handleKey}
    >
      {inner}
    </article>
  )
}

export default function PortfolioSection() {
  const navigate = useNavigate()

  const onNavigate = (id) => {
    playBattleTransition((path) => navigate(path), `/projects?id=${id}`)
  }

  return (
    <section id="portfolio">
      <div className="section-tag reveal"><span>☣</span> PORTFOLIO</div>
      <div className="portfolio-header reveal">
        <h2 className="section-heading reveal split">
          <SplitWords>PROJECT</SplitWords>
          <br />
          <SplitWords>HISTORY.</SplitWords>
        </h2>
        <div className="portfolio-header-meta">
          <span className="phm-count">67</span>
          <span className="phm-divider" />
          <span className="phm-year">2022 — NOW</span>
        </div>
      </div>

      <div className="work-grid">
        {workCards.slice(0, 3).map(card => (
          <WorkCard key={card.id} card={card} onNavigate={onNavigate} />
        ))}
      </div>

      <WorkCard card={workCards[3]} onNavigate={onNavigate} />
    </section>
  )
}