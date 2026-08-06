import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import useReveal from '../hooks/useReveal'
import useScrambleHover from '../hooks/useScrambleHover'
import useMagnetic from '../hooks/useMagnetic'
import useTilt from '../hooks/useTilt'
import useEffects from '../hooks/useEffects'
import useScreenShake from '../hooks/useScreenShake'

import Preloader from '../components/layout/Preloader'
import Background from '../components/layout/Background'
import RotatingText from '../components/layout/RotatingText'
import Ticker from '../components/layout/Ticker'
import Footer from '../components/layout/Footer'
import Header from '../components/home/Header'
import Hero from '../components/home/Hero'
import About from '../components/home/About'
import PortfolioSection from '../components/home/PortfolioSection'
import SkillsSection from '../components/home/SkillsSection'
import ChatSection from '../components/home/ChatSection'
import ContactSection from '../components/home/ContactSection'
import SkillPopup from '../components/home/SkillPopup'
import { skillCards } from '../data/skills'

export default function HomePage() {
  const [activeSkill, setActiveSkill] = useState(null)
  const [showSkillPopup, setShowSkillPopup] = useState(false)
  const location = useLocation()

  useEffect(() => {
    document.title = 'evannvsl'
  }, [])

  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [location.state])

  useReveal()
  useScrambleHover()
  useMagnetic()
  useTilt()
  useEffects()
  useScreenShake()

  const openSkill = (card) => {
    setActiveSkill(card)
    setShowSkillPopup(true)
  }

  const closeSkill = () => {
    setShowSkillPopup(false)
  }

  return (
    <>
      <Preloader />
      <Background />
      <RotatingText />
      <Header />
      <Hero />
      <Ticker />
      <About />
      <Ticker reverse />
      <PortfolioSection />
      <Ticker />
      <SkillsSection onOpenSkill={openSkill} />
      <Ticker reverse />
      <ChatSection />
      <Ticker />
      <ContactSection />
      <Footer />

      <SkillPopup
        card={activeSkill || skillCards[0]}
        total={skillCards.length}
        isOpen={showSkillPopup}
        onClose={closeSkill}
      />
    </>
  )
}