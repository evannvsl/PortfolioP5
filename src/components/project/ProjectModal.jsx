export default function ProjectModal({ project, item, onClose }) {
  if (!project || !item) return null
  const d = project.detail || {}

  const stack = item.stack || d.stack || []
  let link = null
  if (item.link && item.link !== '#') link = item.link
  else if (d.links && d.links.github) link = d.links.github

  return (
    <div id="ph-modal" className="ph-modal active" aria-hidden="false" role="dialog" aria-labelledby="modal-title">
      <div className="ph-modal-backdrop" onClick={onClose} />
      <div className="ph-modal-card">
        <button className="ph-modal-close" id="ph-modal-close" aria-label="Tutup detail modal" onClick={onClose}>
          ✕ ESC
        </button>
        <div className="ph-modal-header">
          <span className="ph-modal-tag" id="modal-cat-tag">{project.num} / {project.title}</span>
          <h2 className="ph-modal-title" id="modal-title">{item.title}</h2>
          <div className="ph-modal-meta">
            <span id="modal-role">{item.role || d.role}</span> ◆ <span id="modal-year">{item.year || d.year}</span>
          </div>
        </div>
        <div className="ph-modal-body">
          <div className="ph-modal-section">
            <h3>◆ RINGKASAN SINKRONISASI</h3>
            <p id="modal-summary">{item.summary || item.details}</p>
          </div>
          <div className="ph-modal-section">
            <h3>◆ DETAIL IMPLEMENASI TEKNIS</h3>
            <p id="modal-details">{item.details || item.summary}</p>
          </div>
          <div className="ph-modal-section">
            <h3>◆ TECH STACK USED</h3>
            <div className="ph-modal-stack" id="modal-stack">
              {stack.map(st => (
                <span className="ph-subcard-chip" style={{ background: 'rgba(225,6,0,0.1)', borderColor: 'rgba(225,6,0,0.3)', color: '#fff' }} key={st}>
                  {st}
                </span>
              ))}
            </div>
          </div>
        </div>
        {link && (
          <div className="ph-modal-footer">
            <a href={link} target="_blank" rel="noopener noreferrer" id="modal-link-btn" className="ph-modal-btn">
              <span>BUKA TAUTAN DEMO / GITHUB ➜</span>
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
