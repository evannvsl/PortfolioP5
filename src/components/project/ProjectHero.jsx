export default function ProjectHero({ query, onQueryChange, onClear }) {
  return (
    <header className="ph-hero">
      <div className="ph-hero-bg">
        <div className="ph-hero-grid" />
        <div className="ph-hero-glow" />
      </div>

      <div className="ph-hero-content">
        <div className="ph-hero-kicker">
          <span className="ph-kicker-dot" />
          <span>ARCHIVE LOG // 2022 — NOW</span>
        </div>

        <h1 className="ph-hero-title">
          PROJECT <span className="accent">HISTORY.</span>
        </h1>

        <p className="ph-hero-sub">
          Kumpulan karya, riset keamanan siber, rekayasa perangkat keras, sinematografi visual, hingga pencapaian kompetisi.
        </p>

        <div className="ph-stats-bar">
          <div className="ph-stat-card">
            <span className="ph-stat-num">04</span>
            <span className="ph-stat-lbl">CATEGORIES</span>
          </div>
          <div className="ph-stat-card">
            <span className="ph-stat-num">12+</span>
            <span className="ph-stat-lbl">CASE STUDIES</span>
          </div>
          <div className="ph-stat-card">
            <span className="ph-stat-num">100%</span>
            <span className="ph-stat-lbl">SECURE ARCHITECTURE</span>
          </div>
          <div className="ph-stat-card">
            <span className="ph-stat-num">2026</span>
            <span className="ph-stat-lbl">ACTIVE STATUS</span>
          </div>
        </div>

        <div className="ph-search-bar">
          <span className="ph-search-icon">🔍︎</span>
          <input
            type="text"
            id="ph-search-input"
            placeholder="Search..."
            aria-label="Cari project history"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
          />
          {query && (
            <button
              id="ph-search-clear"
              className="ph-search-clear"
              aria-label="Bersihkan pencarian"
              onClick={onClear}
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
