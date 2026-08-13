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
import About from './pages/About'

const SCROLLBAR_ROUTES = ['/hmc', '/multi-stakeholder', '/marketplace', '/fidelity']

function ScrollbarGutter() {
  const { pathname } = useLocation()
  useEffect(() => {
    const needs = SCROLLBAR_ROUTES.includes(pathname)
    document.documentElement.classList.toggle('has-scrollbar', needs)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <ScrollbarGutter />
        <FloatingNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lab" element={<Lab />} />
          <Route path="/hmc" element={<HeroMotoCorp />} />
          <Route path="/multi-stakeholder" element={<MultiStakeholder />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/fidelity" element={<Fidelity />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  )
}
