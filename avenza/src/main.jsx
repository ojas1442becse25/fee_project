import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// Global styles for the reusable UI components (Button, Modal,
// ProgressBar, OptionCard, SkillTag, MatchScore, etc.)
import './components/ui/ui.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
