import { useEffect } from 'react'
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import FloatingNav from './components/layout/FloatingNav'
import Home from './pages/Home'
import Lab from './pages/Lab'
import HeroMotoCorp from './pages/hmc'
import MultiStakeholder from './pages/multi-stakeholder'
import Marketplace from './pages/marketplace'
import Fidelity from './pages/fidelity'
import AiInferenceTools from './pages/ai-inference-tools'
import About from './pages/About'

const SCROLLBAR_ROUTES = ['/hmc', '/multi-stakeholder', '/marketplace', '/fidelity', '/ai-inference-tools']

function ScrollbarGutter() {
  const { pathname } = useLocation()
  useEffect(() => {
    const needs = SCROLLBAR_ROUTES.includes(pathname)
    document.documentElement.classList.toggle('has-scrollbar', needs)
  }, [pathname])
  return null
}

/** Each route starts at the top of its own page — scroll position from the
    previous page shouldn't carry over on navigation. */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <ScrollbarGutter />
        <ScrollToTop />
        <FloatingNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lab" element={<Lab />} />
          <Route path="/hmc" element={<HeroMotoCorp />} />
          <Route path="/multi-stakeholder" element={<MultiStakeholder />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/fidelity" element={<Fidelity />} />
          <Route path="/ai-inference-tools" element={<AiInferenceTools />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  )
}
