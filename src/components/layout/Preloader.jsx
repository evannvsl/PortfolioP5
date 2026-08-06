import { useRef } from 'react'
import { usePreloader } from '../../hooks/usePreloader'

export default function Preloader() {
  usePreloader()
  const numRef = useRef(null)
  const barRef = useRef(null)
  const labelRef = useRef(null)

  return (
    <div id="preloader">
      <div className="pre-count">
        <span id="preNum" ref={numRef}>00</span>
        <span className="pre-percent">%</span>
      </div>
      <div className="pre-label" ref={labelRef}>INITIALIZING SYSTEM</div>
      <div className="security-status">SECURITY PROTOCOL ACTIVE</div>
      <div className="pre-bar-track">
        <div className="pre-bar-fill" id="preBarFill" ref={barRef} />
      </div>
    </div>
  )
}
