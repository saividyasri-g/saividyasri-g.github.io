import { HashRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import FloatingNav from './components/layout/FloatingNav'
import Home from './pages/Home'
import HeroMotoCorp from './pages/hmc'
import About from './pages/About'

export default function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <FloatingNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hmc" element={<HeroMotoCorp />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  )
}
