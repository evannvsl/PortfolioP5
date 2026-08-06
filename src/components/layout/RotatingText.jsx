export default function RotatingText() {
  return (
    <div className="rotating-text" aria-hidden="true">
      <svg viewBox="0 0 100 100">
        <path id="circlePath" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
        <text>
          <textPath href="#circlePath">TAKE YOUR HEART • PHANTOM THIEVES • </textPath>
        </text>
      </svg>
    </div>
  )
}