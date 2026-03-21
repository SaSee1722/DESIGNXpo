import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import ScrollToTop from './components/ScrollToTop'
import Registration from './pages/Registration'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
