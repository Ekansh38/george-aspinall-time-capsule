import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Landing from './components/Landing'
import TimeCapsule from './components/TimeCapsule'
import ChapterPage from './pages/ChapterPage'
import CustomCursor from './components/CustomCursor'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route path="/capsule" element={<TimeCapsule />} />
        <Route path="/chapter/:id" element={<ChapterPage />} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <BrowserRouter>
      <CustomCursor />
      <AnimatedRoutes />
    </BrowserRouter>
  )
}

export default App
