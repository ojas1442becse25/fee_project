import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
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
// Route tree for the whole application. Note the nesting:
//   - public pages live inside MainLayout (shared navbar)
//   - /career/results is a static route and must win over the dynamic
//     /career/:careerSlug route (React Router ranks static segments higher)
//   - the career detail route is dynamic (/career/:careerSlug)
//   - the whole /dashboard section is wrapped in ProtectedRoute
//     and is itself a nested route with its own layout + <Outlet/>
//   - the * route catches anything unknown (404 page)
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="features" element={<Features />} />
            <Route path="contact" element={<Contact />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="career-discovery" element={<CareerDiscovery />} />
            {/* /career is a short alias for the assessment */}
            <Route path="career" element={<Navigate to="/career-discovery" replace />} />
            {/* Static results route - declared before the dynamic one */}
            <Route path="career/results" element={<CareerResultsPage />} />
            {/* Dynamic route - the :careerSlug param is read with useParams */}
            <Route path="career/:careerSlug" element={<CareerDetails />} />
            <Route path="login" element={<Login />} />

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
      </AuthProvider>
    </Router>
  )
}

export default App