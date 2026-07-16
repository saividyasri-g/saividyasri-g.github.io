import { HashRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Home from './pages/Home'
import HeroMotoCorp from './pages/hmc'

export default function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hmc" element={<HeroMotoCorp />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  )
}
