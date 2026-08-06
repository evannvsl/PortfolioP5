import { projects } from '../../data/projects'

export default function ProjectTopBar({ activeCat, onSelectCat, onBack }) {
  return (
    <header className="proj-topbar">
      <div className="proj-topbar-left">
        <a href="#/" className="proj-logo" aria-label="Kembali ke Beranda" onClick={(e) => { e.preventDefault(); onBack(); }}>
          <span className="proj-brand">EVANNVSL<span className="dot">.</span></span>
        </a>
        <span className="proj-slash" aria-hidden="true" />
        <span className="proj-category">PROJECT HISTORY</span>
      </div>

      <nav className="proj-filter-nav" aria-label="Filter kategori project">
        {projects.map((p, i) => (
          <button
            key={p.category}
            className={`filter-tab${activeCat === p.category ? ' active' : ''}`}
            data-cat={p.category}
            onClick={() => onSelectCat(p.category)}
          >
            <span>{String(i + 1).padStart(2, '0')}. {p.title}</span>
          </button>
        ))}
      </nav>

      <button className="proj-esc-hint" id="proj-back" aria-label="Kembali ke portfolio (atau tekan ESC)" onClick={onBack}>
        <span className="proj-esc-key">x</span>
      </button>
    </header>
  )
}
