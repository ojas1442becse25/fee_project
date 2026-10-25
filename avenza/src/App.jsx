import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CareerProvider } from './context/CareerContext'
import MainLayout from './components/layout/MainLayout'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Home from './pages/Home/Home'
import About from './pages/Static/About'
import Features from './pages/Static/Features'
import Contact from './pages/Static/Contact'
import FAQ from './pages/Static/FAQ'
import CareerDiscovery from './pages/CareerDiscovery/CareerDiscovery'
import CareerResultsPage from './pages/CareerResults/CareerResultsPage'
import CareerDetails from './pages/CareerDetails/CareerDetails'
import Login from './pages/Login/Login'
import NotFound from './pages/NotFound/NotFound'
import DashboardLayout from './pages/Dashboard/DashboardLayout'
import DashboardHome from './pages/Dashboard/DashboardHome'
import ProfilePage from './pages/Dashboard/ProfilePage'
import SavedCareers from './pages/Dashboard/SavedCareers'

// App
// ---
// Route tree for the whole application:
//   - Public pages live inside MainLayout (shared navbar)
//   - Multi-page SPA routes: Home, About, Features, Contact, FAQ, Login
//   - Assessment routes: /career-discovery (alias: /career, /assessment)
//   - Recommendations routes: /career-recommendations, /career/results
//   - Dynamic route: /career/:careerSlug (uses useParams)
//   - Protected nested dashboard: /dashboard with index, /profile, /saved-careers
//   - Global state: AuthProvider + CareerProvider (Context API)
//   - 404 catch-all: path="*"
function App() {
  return (
    <Router>
      <AuthProvider>
        <CareerProvider>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="features" element={<Features />} />
              <Route path="contact" element={<Contact />} />
              <Route path="faq" element={<FAQ />} />
              <Route path="career-discovery" element={<CareerDiscovery />} />
              {/* Short aliases for the career assessment */}
              <Route path="career" element={<Navigate to="/career-discovery" replace />} />
              <Route path="assessment" element={<Navigate to="/career-discovery" replace />} />
              {/* Career recommendations routes (static, evaluated before dynamic slug) */}
              <Route path="career-recommendations" element={<CareerResultsPage />} />
              <Route path="recommendations" element={<Navigate to="/career-recommendations" replace />} />
              <Route path="career/results" element={<CareerResultsPage />} />
              {/* Dynamic route - :careerSlug param read with useParams */}
              <Route path="career/:careerSlug" element={<CareerDetails />} />
              <Route path="login" element={<Login />} />

              {/* Convenience direct aliases for dashboard subpages */}
              <Route path="profile" element={<Navigate to="/dashboard/profile" replace />} />
              <Route path="saved-careers" element={<Navigate to="/dashboard/saved-careers" replace />} />

              {/* Protected + nested dashboard routes */}
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<DashboardHome />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="saved-careers" element={<SavedCareers />} />
              </Route>

              {/* 404 - any unknown path */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </CareerProvider>
      </AuthProvider>
    </Router>
  )
}

export default App