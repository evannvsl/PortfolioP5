import SplitWords from '../common/SplitWords'

export default function ContactSection() {
  return (
    <section id="contact">
      <div className="contact-security-grid" aria-hidden="true" />
      <div className="contact-glitch" aria-hidden="true" />

      <div className="section-tag reveal light"><span>☣</span> CONTACT</div>
      <h2 className="contact-heading reveal split">
        <SplitWords>
          MARI
          BUAT
          <br />
          <span className="accent">SESUATU</span>
          BARENG.
        </SplitWords>
      </h2>
      <a href="mailto:evangalangwry11@gmail.com" className="contact-email reveal magnetic">
        evangalangwry11@gmail.com
      </a>
      <div className="contact-socials reveal">
        <a href="https://github.com/evannvsl" target="_blank" rel="noopener noreferrer" className="reveal reveal-up" style={{ transitionDelay: '0ms' }}>
          GITHUB
        </a>
        <a href="https://www.linkedin.com/in/evan-galang-wiryanto/" target="_blank" rel="noopener noreferrer" className="reveal reveal-up" style={{ transitionDelay: '90ms' }}>
          LINKEDIN
        </a>
        <a href="https://instagram.com/evannvsl" target="_blank" rel="noopener noreferrer" className="reveal reveal-up" style={{ transitionDelay: '180ms' }}>
          INSTAGRAM
        </a>
      </div>
    </section>
  )
}