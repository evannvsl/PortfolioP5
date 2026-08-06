import CloseTransition from './CloseTransition'

export default function ProjectPageLayout({ children, onBack }) {
  return (
    <>
      <div id="bg-layer" aria-hidden="true">
        <div className="noise" />
        <div className="scan-line" id="scan1" />
        <div className="scan-line" id="scan2" />
        <div className="bg-grid-overlay" />
      </div>

      <div className="proj-stripe" aria-hidden="true" />

      {children}

      <footer className="proj-bottombar" aria-hidden="true">
        <span className="proj-bottombar-num">◆ PORTFOLIO SHOWCASE LOG</span>
        <span className="proj-bottombar-mid">EVANNVSL.DEV</span>
        <span className="proj-bottombar-esc" onClick={onBack}>
          <span className="proj-bottombar-esc-key">Back</span>
        </span>
      </footer>

      <div id="project-page-reveal" className="ph-page-reveal" aria-hidden="true" />
      <CloseTransition />
    </>
  )
}