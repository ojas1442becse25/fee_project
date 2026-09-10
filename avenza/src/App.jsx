import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home/Home'
import About from './pages/Static/About'
import Features from './pages/Static/Features'
import Contact from './pages/Static/Contact'
import FAQ from './pages/Static/FAQ'
import CareerRecommendation from './pages/CareerRecommendation/CareerRecommendation'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="features" element={<Features />} />
          <Route path="contact" element={<Contact />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="career-recommendation" element={<CareerRecommendation />} />
          {/* Placeholder for roadmap referenced in results */}
          <Route path="roadmap" element={<div className="placeholder-container"><div className="placeholder-card"><h1>Roadmap feature</h1><p>Coming soon...</p></div></div>} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
