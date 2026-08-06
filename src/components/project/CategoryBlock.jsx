export default function CategoryBlock({ project, onInspect }) {
  const d = project.detail || {}
  const items = d.items || []

  return (
    <section className="ph-category-block" id={`cat-${project.category}`} data-cat={project.category}>
      <header className="ph-cat-header">
        <div className="ph-cat-header-left">
          <span className="ph-cat-num-tag">CATEGORY {project.num} /</span>
          <h2 className="ph-cat-title">{project.title}</h2>
          <p className="ph-cat-subtitle">{project.subtitle || project.desc}</p>
        </div>
        <span className="ph-cat-security-tag">{project.securityTag || 'SECURE LOG'}</span>
      </header>

      <div className="ph-cat-overview-box">
        <div className="ph-cat-overview-text">
          <h4>◆ SINKRONISASI KATEGORI</h4>
          <p>{d.overview || project.desc}</p>
          <div className="ph-highlights-title">TECHNICAL HIGHLIGHTS</div>
          <ul className="ph-highlights-list">
            {(d.highlights || []).map((h, i) => (
              <li key={i}><em>◆</em> <span>{h}</span></li>
            ))}
          </ul>
        </div>
        <div className="ph-cat-meta-side">
          <div className="ph-meta-box">
            <span className="ph-meta-lbl">ROLE & EXPERTISE</span>
            <span className="ph-meta-val">{d.role || 'Developer'}</span>
          </div>
          <div className="ph-meta-box">
            <span className="ph-meta-lbl">TIMELINE</span>
            <span className="ph-meta-val">{d.year || '2024'}</span>
          </div>
          <div className="ph-meta-box">
            <span className="ph-meta-lbl">CORE STACK</span>
            <div className="ph-stack-tags">
              {(d.stack || []).map(s => (
                <span className="ph-stack-tag" key={s}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="ph-subprojects-grid">
        {items.map((item, idx) => (
          <article
            className="ph-subcard"
            data-cat={project.category}
            data-item-index={idx}
            key={idx}
            onClick={() => onInspect(project, item)}
            role="button"
            tabIndex="0"
            aria-label={`Inspect case study: ${item.title}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onInspect(project, item)
              }
            }}
          >
            <div className="ph-subcard-top">
              <span className="ph-subcard-role">{item.role || 'Case Study'}</span>
              <span className="ph-subcard-year">{item.year || d.year}</span>
            </div>
            <h4 className="ph-subcard-title">{item.title}</h4>
            <p className="ph-subcard-summary">{item.summary || item.details}</p>
            <div className="ph-subcard-stack">
              {(item.stack || []).map(st => (
                <span className="ph-subcard-chip" key={st}>{st}</span>
              ))}
            </div>
            <div className="ph-subcard-action">
              <span>INSPECT CASE STUDY</span>
              <i>➜</i>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
