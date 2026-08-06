import useHeaderScroll from '../../hooks/useHeaderScroll'
import useMobileMenu from '../../hooks/useMobileMenu'

export default function Header() {
  useHeaderScroll()
  useMobileMenu()

  return (
    <header id="siteHeader">
      <a href="#hero" className="logo">EVANNVSL<span className="dot">.</span></a>
      <button className="menu-toggle" id="menuToggle" aria-label="Toggle menu">
        <span />
        <span />
      </button>
      <nav className="menu" id="menu">
        <a href="#about"><em /> About</a>
        <a href="#portfolio"><em /> Portfolio</a>
        <a href="#skills"><em /> Skills</a>
        <a href="#chat"><em /> QnA</a>
        <a href="#contact"><em /> CONTACT</a>
      </nav>
    </header>
  )
}