import { Routes, Route } from 'react-router-dom'

import Cursor from './components/layout/Cursor'
import BattleTransition from './components/layout/BattleTransition'
import HomePage from './pages/HomePage'
import ProjectHistoryPage from './pages/ProjectHistoryPage'

export default function App() {
  return (
    <>
      <Cursor />
      <BattleTransition />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectHistoryPage />} />
      </Routes>
    </>
  )
}
