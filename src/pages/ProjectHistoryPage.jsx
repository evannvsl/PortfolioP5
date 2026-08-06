import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { projects } from '../data/projects'
import { playCloseTransition } from '../utils/transitions'

import ProjectTopBar from '../components/project/ProjectTopBar'
import ProjectHero from '../components/project/ProjectHero'
import CategoryBlock from '../components/project/CategoryBlock'
import ProjectModal from '../components/project/ProjectModal'
import ProjectPageLayout from '../components/project/ProjectPageLayout'

export default function ProjectHistoryPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [activeCat, setActiveCat] = useState('all')
  const [query, setQuery] = useState('')
  const [modal, setModal] = useState(null) // { project, item }

  // Page enter curtain reveal
  useEffect(() => {
    sessionStorage.setItem('skipPreloader', 'true')
    document.title = 'Project History & Showcase — evannvsl'

    const reveal = document.getElementById('project-page-reveal')
    if (reveal) {
      reveal.classList.add('revealing')
      const t = setTimeout(() => reveal.classList.remove('revealing'), 500)
      return () => clearTimeout(t)
    }
  }, [])

  // Read query params ?id=1 or ?cat=code
  useEffect(() => {
    const idParam = searchParams.get('id')
    const catParam = searchParams.get('cat')
    if (idParam) {
      const proj = projects.find(p => p.id === parseInt(idParam, 10))
      if (proj) setActiveCat(proj.category)
    } else if (catParam) {
      setActiveCat(catParam)
    }
  }, [searchParams])

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    return projects.filter(proj => {
      const catMatch = activeCat === 'all' || proj.category === activeCat
      if (!catMatch) return false
      if (!q) return true

      const titleMatch = proj.title.toLowerCase().includes(q)
      const descMatch = (proj.desc || '').toLowerCase().includes(q)
      const tagsMatch = (proj.tags || []).some(t => t.toLowerCase().includes(q))
      const stackMatch = (proj.detail?.stack || []).some(s => s.toLowerCase().includes(q))
      const itemsMatch = (proj.detail?.items || []).some(item =>
        item.title.toLowerCase().includes(q) ||
        (item.summary || '').toLowerCase().includes(q) ||
        (item.stack || []).some(st => st.toLowerCase().includes(q))
      )
      return titleMatch || descMatch || tagsMatch || stackMatch || itemsMatch
    })
  }, [activeCat, query])

  const goBack = () => {
    if (modal) {
      setModal(null)
      return
    }
    playCloseTransition(navigate, '/', { scrollTo: 'portfolio' })
  }

  const handleSelectCat = (cat) => {
    setActiveCat(cat)
    if (cat !== 'all') {
      const el = document.getElementById(`cat-${cat}`)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // ESC closes modal, else goes back
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') goBack()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  })

  // Body overflow lock saat modal terbuka
  useEffect(() => {
    document.body.style.overflow = modal ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [modal])

  return (
    <ProjectPageLayout onBack={goBack}>
      <ProjectTopBar activeCat={activeCat} onSelectCat={handleSelectCat} onBack={goBack} />
      <ProjectHero query={query} onQueryChange={setQuery} onClear={() => setQuery('')} />

      <main className="ph-container" id="ph-main">
        <div id="ph-projects-list" className="ph-projects-list">
          {filtered.length === 0 ? (
            <div className="ph-no-results" style={{ textAlign: 'center', padding: '60px 20px' }}>
              <h3 style={{ fontFamily: 'var(--f-display)', fontSize: 24, color: 'var(--red)' }}>PROJECT TIDAK DITEMUKAN</h3>
              <p style={{ fontFamily: 'var(--f-code)', color: 'rgba(255,255,255,0.5)', marginTop: 8 }}>// Silakan coba kata kunci pencarian atau kategori lain</p>
            </div>
          ) : (
            filtered.map(proj => (
              <CategoryBlock
                key={proj.category}
                project={proj}
                onInspect={(project, item) => setModal({ project, item })}
              />
            ))
          )}
        </div>
      </main>

      <ProjectModal
        project={modal?.project || null}
        item={modal?.item || null}
        onClose={() => setModal(null)}
      />
    </ProjectPageLayout>
  )
}
