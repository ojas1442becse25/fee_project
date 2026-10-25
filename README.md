# AVENZA — Intelligent Career Discovery & Recommendation Platform

> **Frontend Engineering-II Project Evaluation-II**  
> An interactive React single-page application engineered to help students and early professionals discover, evaluate, and navigate optimal career pathways backed by intelligent multi-factor matching.

---

## 🌟 Project Overview

**AVENZA** eliminates career guesswork through a data-driven, multi-dimensional assessment engine. Rather than relying on generic questionnaires or unverified claims, AVENZA evaluates cognitive inclinations, academic streams, technical interests, and growth priorities against verified industry trajectories across 50+ career disciplines.

### Key Capabilities
- **3D Career Intelligence Galaxy**: A dedicated Three.js WebGL visualization featuring autonomous orbital motion, 4 angled orbital rings, 6 orbiting career discipline nodes, and a subtle pointer-following hover tilt.
- **Guided Career Discovery Wizard**: A 6-step assessment capturing academic background, cognitive strengths, domains of interest, and career goals.
- **Multi-Factor Recommendation Engine**: A transparent, weighted matching algorithm (`careerMatcher.js`) scoring careers across Stream (25%), Interests (25%), Skills (25%), Goals (15%), and Marks (10%).
- **Dynamic Career Trajectory Pages**: Individual career roadmaps, salary bands, difficulty ratings, required skills, and personalized "Why this matches you" insights.
- **Client-Side Authentication & Dashboard**: Protected dashboard with overview analytics, editable user profile, and bookmarked career management synced to `localStorage`.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Core Framework** | **React 19** (`^19.2.8`) | Modern functional component architecture & hooks |
| **Build Tool** | **Vite 8** (`^8.2.2`) | Ultra-fast HMR and optimized production bundling |
| **Routing** | **React Router v7** (`^7.18.3`) | Declarative client-side routing, nested routes, dynamic slugs, protected guards |
| **3D Graphics** | **Three.js** (`^0.183.1`) | Dedicated WebGL 3D scene (geometries, shaders, orbital physics, particle systems) |
| **Animations** | **Framer Motion** (`^13.2.0`) | Smooth UI transitions, route transitions, and micro-interactions |
| **Icons** | **Lucide React** (`^1.42.0`) | Modern, consistent iconography |
| **Styling** | **Vanilla CSS3** | Custom design system with CSS custom properties, flexbox, CSS Grid, glassmorphism |
| **State Management** | **React Context API** | Global state for Authentication (`AuthContext`) and Career Data (`CareerContext`) |

---

## 🚀 Quick Start & Run Instructions

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm (v9.0.0 or higher)

### Setup & Launch
```bash
# 1. Navigate to the app directory
cd avenza

# 2. Install dependencies
npm install

# 3. Start development server (runs with hot reload)
npm run dev

# 4. Production build validation
npm run build

# 5. Code quality / lint check
npm run lint
```

The application will be accessible at `http://localhost:5173` (or the next available port shown in your terminal).

---

## 🗺️ Complete Route Tree

| Route | Component | Access | Description |
|---|---|---|---|
| `/` | `Home` | Public | Editorial landing page with 3D Career Galaxy, platform statistics, bento features |
| `/about` | `About` | Public | Platform mission, core philosophy, and intelligent matching principles |
| `/features` | `Features` | Public | Interactive breakdown of the recommendation engine and roadmaps |
| `/contact` | `Contact` | Public | Inquiries and student feedback with real-time validated form |
| `/faq` | `FAQ` | Public | Searchable accordion answering common career discovery queries |
| `/career-discovery` | `CareerDiscovery` | Public | 6-step assessment wizard with auto-saved progress |
| `/career-recommendations` | `CareerResultsPage` | Public | Ranked career matches, match percentages, and personalized match criteria |
| `/career/:careerSlug` | `CareerDetails` | Public | Dynamic route displaying complete career graph, roadmap, CTC, and required skills |
| `/login` | `Login` | Public | Client-side authentication (Sign In & Sign Up) with input validation |
| `/dashboard` | `DashboardLayout` | **Protected** | Nested dashboard parent layout with sidebar navigation |
| `/dashboard` (index) | `DashboardHome` | **Protected** | Welcome overview, saved count, active journey stats |
| `/dashboard/profile` | `ProfilePage` | **Protected** | Editable user profile syncing with assessment data |
| `/dashboard/saved-careers`| `SavedCareers` | **Protected** | Bookmarked career paths with direct detail navigation and removal |
| `*` | `NotFound` | Public | Custom 404 fallback page with recovery navigation |

---

## 🧠 State Architecture & Context API

AVENZA follows a clean separation of **Global vs. Local State**:

```
                       ┌────────────────────────────────────────┐
                       │          <BrowserRouter>               │
                       └───────────────────┬────────────────────┘
                                           │
                       ┌───────────────────┴────────────────────┐
                       │          <AuthProvider>                │
                       │   - user { name, email, loggedInAt }   │
                       │   - login(), logout(), updateUser()    │
                       └───────────────────┬────────────────────┘
                                           │
                       ┌───────────────────┴────────────────────┐
                       │          <CareerProvider>              │
                       │   - savedCareers [{ id, matchScore }]  │
                       │   - profile { name, stream, ... }      │
                       │   - toggleSave(), saveProfile()        │
                       └───────────────────┬────────────────────┘
                                           │
            ┌──────────────────────────────┼──────────────────────────────┐
            ▼                              ▼                              ▼
      [Global Hooks]                 [Public Pages]               [Protected Area]
   useAuth(), useSavedCareers()      Home, About, Details         /dashboard/* (via <ProtectedRoute>)
```

### LocalStorage Schema (Single Source of Truth)
- `avenza_auth_user`: Active authenticated session data.
- `avenza_profile`: Completed assessment profile data.
- `avenza_saved_careers`: User bookmarked career list.
- `avenza_assessment_progress`: In-progress assessment draft (cleared on completion).

---

## 🎓 Frontend Engineering-II Syllabus Concept Map

Every core syllabus requirement is genuinely implemented in the production code:

| # | Syllabus Requirement | Practical Implementation in AVENZA | Target File(s) |
|---|---|---|---|
| **1** | **Component Architecture** | Modular, reusable hierarchy across layout, UI, career, and pages | `src/components/**`, `src/pages/**` |
| **2** | **JSX & Rendering** | Semantic markup with dynamic expressions and inline conditional rendering | All `.jsx` files |
| **3** | **Props & Data Flow** | Unidirectional data flow from parents into specialized presentation children | `CareerCard.jsx`, `OptionCard.jsx` |
| **4** | **useState** | Local UI states (step index, mobile toggle, form values, field errors) | `CareerDiscovery.jsx`, `Navbar.jsx`, `Login.jsx` |
| **5** | **useEffect** | Side effects (document title, localStorage sync, window resize, cleanup timers) | `useLocalStorage.js`, `CareerGalaxy3D.jsx` |
| **6** | **useRef** | Direct canvas binding for Three.js, autofocus on step change, scroll triggers | `CareerGalaxy3D.jsx`, `CareerDiscovery.jsx` |
| **7** | **useMemo** | Expensive computations (weighted career match calculation, filtered categories) | `CareerResultsPage.jsx`, `CareerContext.jsx` |
| **8** | **useCallback** | Referential stability for handlers passed through props to prevent re-renders | `useCareerAssessment.js`, `Navbar.jsx` |
| **9** | **Lists & Keys** | Dynamic iteration with deterministic unique keys across grids and roadmaps | `CareerCategories.jsx`, `CareerDetails.jsx` |
| **10** | **Form Handling** | Multi-step wizard, controlled inputs, validation messages, instant error feedback | `AcademicBgStep.jsx`, `Login.jsx` |
| **11** | **Context API** | Global auth and career data sharing without prop drilling | `AuthContext.jsx`, `CareerContext.jsx` |
| **12** | **Custom Hooks** | Encapsulated reusable state logic (`useCareerAssessment`, `useLocalStorage`) | `src/hooks/*.js` |
| **13** | **React Router v7** | Single Page Application navigation, nested layouts, index routes, redirects | `App.jsx`, `MainLayout.jsx` |
| **14** | **Dynamic Routes** | Parameterized routing using `useParams()` to fetch career graph by slug | `CareerDetails.jsx` (`/career/:careerSlug`) |
| **15** | **Protected Routes** | Auth guard wrapper redirecting unauthenticated users to login with state redirect | `ProtectedRoute.jsx` |
| **16** | **Async / Feedback** | Simulated analysis transition screen, loading spinners, and empty states | `LoadingScreen.jsx`, `SavedCareers.jsx` |

---

## 🌌 3D Career Galaxy Design Highlights

The right-side hero visual is an independent **Three.js** component ([CareerGalaxy3D.jsx](file:///d:/Fee%20project/avenza/src/components/home/CareerGalaxy3D.jsx)):
- **Central Luminous Core**: Multi-layered celestial core with a solid glowing sphere (`MeshStandardMaterial`), counter-rotating holographic geodesic shell, and atmospheric aura.
- **4 Orbital Rings**: Distinct geometric rings tilted at realistic 3D angles, each featuring an orbital energy beacon continuously circling its path.
- **6 Career Nodes**: `AI & ML`, `CLOUD / DEV`, `DATA`, `DESIGN`, `CYBER`, and `FINTECH` orbiting on independent planes.
- **Subtle Pointer Tilt**: An outer wrapper applies a smooth 3–5° tilt and restrained shift in the direction of the mouse, smoothly returning to center on exit.
- **Responsive Containment**: Dynamic camera frustum scaling ensures zero clipping or boundary overflow on desktop, tablet, and mobile.

---

## 🔒 Limitations & Honest Technical Disclosures

- **No Remote Backend Required**: All user accounts, saved careers, and assessment results are stored client-side in `localStorage`.
- **Deterministic Match Engine**: Recommendations are calculated locally in `careerMatcher.js` via weighted multi-factor heuristics rather than an external paid LLM API.
- **Safe Environment**: No external API keys, tokens, or credentials are required or committed to the repository.

---

## 👥 Authors & Academic Context

- **Project**: AVENZA Career Discovery & Recommendation Platform
- **Course**: Frontend Engineering-II (FEE-II)
- **Evaluation**: Project Evaluation-II
