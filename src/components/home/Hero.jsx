import useCutin from '../../hooks/useCutin'

export default function Hero() {
  useCutin()

  return (
    <section id="hero">
      <div className="hero-slash" aria-hidden="true" />

      <div className="hero-cutin" aria-hidden="true">
        <img src="/assets/img/avahead.png" alt="Joker Cut-in" className="cutin-img" id="cutinImg" />
        <div className="cutin-flash" />
      </div>

      <div className="hero-inner">
        <p className="hero-kicker reveal">✦ HI IT'S ME</p>
        <h1 className="hero-title reveal">
          <span className="line">
            <span className="line-inner"><span className="scramble-target">EVANNVSL</span></span>
          </span>
          <span className="line accent">
            <span className="line-inner"><span className="scramble-target">AS LOSER.</span></span>
          </span>
        </h1>
        <p className="hero-sub reveal">I Like What I Do, and I Do What I Like </p>
        <div className="hero-cta reveal">
          <a href="#portfolio" className="btn btn-primary magnetic reveal reveal-scale" style={{ transitionDelay: '0ms' }}>
            <span className="scramble-target">PORTFOLIO</span>
          </a>
          <a href="#contact" className="btn btn-ghost magnetic reveal reveal-scale" style={{ transitionDelay: '110ms' }}>
            <span className="scramble-target">HIRE ME</span>
          </a>
        </div>
      </div>

      <div className="hero-scroll">SCROLL <span>⬇</span></div>
      <div className="security-badge">◆ SECURE CONNECTION</div>
    </section>
  )
}