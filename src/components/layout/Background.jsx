import useParticles from '../../hooks/useParticles'
import useMatrix from '../../hooks/useMatrix'
import useBgGlow from '../../hooks/useBgGlow'

export default function Background() {
  useParticles()
  useMatrix()
  useBgGlow()

  return (
    <>
      <div id="breach-overlay" aria-hidden="true" />
      <div id="chromatic-layer" aria-hidden="true" />

      <div id="bg-layer">
        <div className="noise" />
        <div className="star-pattern" aria-hidden="true" />
        <div className="scan-line" id="scan1" />
        <div className="scan-line" id="scan2" />
        <div className="slash-bg" id="slashBg1" aria-hidden="true" />
        <div className="slash-bg" id="slashBg2" aria-hidden="true" />
        <div className="matrix-code" id="matrixCode" />
      </div>
      <div id="bg-glow" />
    </>
  )
}