# Avenza — Career Discovery & Recommendation Platform

Avenza is a React single-page application that helps students discover, compare, and save career paths. Users complete a guided multi-step **Career Discovery** assessment, get their **Top 3 career matches**, browse a dynamic career detail page, and save careers to a personal dashboard.

**Stack:** React 19 + Vite · React Router 7 · Framer Motion · lucide-react icons · No backend (data + auth live in the browser/localStorage).

**How data is stored (all frontend-only, four keys):**

| Key | What it holds |
|-----|---------------|
| `avenza_auth_user` | The logged-in user `{ name, email, loggedInAt }` |
| `avenza_profile` | The **single source of truth** for the assessment profile — written by Career Discovery, read by Results / Career Details / Dashboard Journey, edited by My Profile |
| `avenza_saved_careers` | Array of `{ id, matchScore, personalReason }` snapshots captured at save time |
| `avenza_assessment_progress` | The unfinished multi-step form draft (auto-saved, cleared on completion) |

## Running the project

```bash
cd avenza
npm install
npm run dev        # start the dev server (http://localhost:5173)
npm run build      # production build
npm run lint       # eslint
```

## Project structure

```
src/
├── components/
│   ├── layout/       Navbar, MainLayout (OuterLayout with <Outlet/>)
│   ├── auth/         ProtectedRoute
│   ├── home/         Home page sections (Hero, Features, WhyAvenza, Footer...)
│   ├── career/       Assessment step components + CareerCard / CareerResults / ProfileSummary
│   └── ui/           Reusable UI components (Button, OptionCard, MatchScore, SkillTag, Modal, ...)
├── pages/
│   ├── Home/         Landing page
│   ├── Static/       About, Features, Contact, FAQ
│   ├── CareerDiscovery/  Multi-step assessment wizard
│   ├── CareerResults/    Dedicated results page (/career/results)
│   ├── CareerDetails/    Dynamic career page (/career/:careerSlug)
│   ├── Login/        Demo login form
│   ├── Dashboard/    Dashboard layout + Overview / Profile / Saved Careers
│   └── NotFound/     404 page
├── hooks/            useCareerAssessment, useLocalStorage, useSavedCareers, useDocumentTitle
├── context/          AuthContext (AuthProvider + useAuth)
├── data/             careers.js, assessmentQuestions.js (single source of truth)
├── utils/            careerMatcher.js (match-score engine)
└── App.jsx           Route tree
```

## How the app works

1. **Career Discovery** (`/career-discovery`) — a 6 step wizard. One parent (`useCareerAssessment` hook) owns *all* answers; each step component receives values + handlers via props. Go **Back / Continue**, select single + multi options, everything persists to localStorage on refresh. The final summary step shows only **Back** + **Find My Career Matches** (no Continue).
2. **Recommendations** — clicking *Find My Career Matches* validates the profile, saves it to the **single shared profile store** (`avenza_profile`, the same localStorage key My Profile and the Dashboard read), shows a short analyzing transition, then navigates to `/career/results`. `careerMatcher.js` scores all 14 careers with a fixed-weight system (stream 25 · interests 25 · skills 25 · goal 15 · marks 10 = 100) and returns the **Top 3** with a match-score ring, a subtle progress indicator, and **personalized reasons generated from the user's actual selections**.
3. **Career detail** (`/career/:careerSlug`) — dynamic route. Shows salary/growth/difficulty, required skills, roadmap, a personalized "why it matches you" note when a completed assessment exists, and falls back to the 404 page for an unknown slug.
4. **Login + Dashboard** — frontend demo auth (localStorage). The `/dashboard` area is protected: an unauthenticated visitor is redirected to `/login` and sent *back* after logging in. The dashboard has nested pages: Overview (with a **Your Career Journey** panel built from real stored data), Profile (editable — writes the *same* `avenza_profile` key as the assessment), and Saved Careers (cards with the match %, short reason, View Details + Remove).

---

## React syllabus concept map

Every concept is used **in the real app flow** — nothing is decorative. Each row shows where to look.

| # | Concept | Where Avenza uses it | File(s) |
|---|---------|----------------------|---------|
| 1 | **React components** | The whole UI is split into small components: every `.jsx` under `components/` and `pages/` (Navbar, HeroVisual, CareerCard, FormStep, DashboardLayout…). | `src/components/**`, `src/pages/**` |
| 2 | **JSX** | HTML-like markup returned from components — `return ( <button>…</button> )` throughout the app. | any `.jsx`, e.g. `components/ui/Button.jsx` |
| 3 | **Props** | `OptionCard` receives `label/description/icon/selected/onSelect/variant`; `CareerCard` receives `career/rank/isSaved/onToggleSave`; every assessment step receives `formData` + handlers. | `components/ui/OptionCard.jsx`, `components/career/CareerCard.jsx` |
| 4 | **State** | Component state lives in `useState` across the app — navbar menu open/closed, expanded cards, auth user, assessment answers, login form fields. | `components/layout/Navbar.jsx`, `components/career/CareerCard.jsx`, `hooks/useCareerAssessment.js` |
| 5 | **useState** | `isMobileMenuOpen`, `isExpanded`, `isAnalyzing`/`submittedProfile`, `name`/`email`/`password` login fields. | `Navbar.jsx`, `CareerCard.jsx`, `pages/CareerDiscovery/CareerDiscovery.jsx`, `pages/Login/Login.jsx` |
| 6 | **useEffect** | Side effects: write to / restore from localStorage (`useLocalStorage`), auto-save assessment progress, set the document title (`useDocumentTitle`), focus the name input on start, smooth-scroll on step change. | `hooks/useLocalStorage.js`, `hooks/useDocumentTitle.js`, `components/career/AboutYouStep.jsx`, `CareerDiscovery.jsx` |
| 7 | **useRef** | `nameInputRef` auto-focuses the name input when Career Discovery starts; `stepTopRef` scrolls the container into view on each step change. | `AboutYouStep.jsx`, `CareerDiscovery.jsx` |
| 8 | **useMemo** | The Top-3 match calculation only re-runs when the *submitted* profile changes, never on every render (results page + career detail lookup); `savedCareers` is memoized from the saved ids. | `pages/CareerResults/CareerResultsPage.jsx`, `pages/CareerDetails/CareerDetails.jsx`, `hooks/useSavedCareers.js` |
| 9 | **useCallback** | Stable handlers passed to child components so they don't re-render pointlessly: `handleSubmit`/`handleReset`, `login`/`logout`, `toggleSave`, and the form updaters `toggleOption`/`selectOption`/`goNext`/`goBack`. | `CareerDiscovery.jsx`, `useCareerAssessment.js`, `context/AuthContext.jsx`, `useSavedCareers.js` |
| 10 | **Rendering lists** | `.map()` with stable `key`s: education levels, stream/interest/strength/priority option grids, career results, required skills, match reasons, roadmap stages, dashboard sidebar items, saved-career cards. | `AboutYouStep.jsx`, `CareerCard.jsx`, `CareerResults.jsx`, `CareerDetails.jsx`, `DashboardLayout.jsx`, `ProfilePage.jsx` |
| 11 | **Conditional rendering** | Form vs loading vs results (`!results && !isAnalyzing` / `isAnalyzing` / `results`); expandable "More Details"; saved-careers empty vs list; login error message; profile save confirmation. | `CareerDiscovery.jsx`, `CareerCard.jsx`, `pages/Dashboard/SavedCareers.jsx` |
| 12 | **Event handling** | `onClick` (card select, save toggle, mobile menu, expand), `onChange` (text inputs, slider), `onSubmit` (login + profile forms). | across app, e.g. `AboutYouStep.jsx`, `Login.jsx`, `ProfilePage.jsx` |
| 13 | **Forms** | The multi-step Career Discovery form, the Login form, and the editable Dashboard profile form. | `CareerDiscovery.jsx`, `Login.jsx`, `ProfilePage.jsx` |
| 14 | **Controlled components** | Inputs whose `value` comes from state and change through `onChange`/handlers: name field, marks slider, login fields, profile inputs/selects. | `AboutYouStep.jsx`, `components/career/AcademicBgStep.jsx`, `Login.jsx`, `ProfilePage.jsx` |
| 15 | **Component composition** | `FormStep` renders children (the step content) inside a shared header/footer; `DashboardLayout` and `MainLayout` render their sub-page via `<Outlet/>`; `CareerCard` is built from `MatchScore` + `SkillTag`; `ProtectedRoute` wraps `DashboardLayout`. | `components/career/FormStep.jsx`, `components/layout/MainLayout.jsx`, `pages/Dashboard/DashboardLayout.jsx`, `App.jsx` |
| 16 | **Reusable UI components** | The `components/ui/` library is reused across pages: `Button` (variants), `ProgressBar`, `OptionCard` (6 style variants), `MatchScore`, `SkillTag`, `Modal`, `LoadingScreen`. | `src/components/ui/*` |
| 17 | **Lifting state up** | All assessment answers live in the `useCareerAssessment` hook (the parent) and are passed into step components as props — the steps never own the shared data. Likewise the auth user lives in `AuthProvider` and is read by Navbar / ProtectedRoute / Dashboard. | `hooks/useCareerAssessment.js`, `context/AuthContext.jsx` |
| 18 | **Prop drilling basics** | `formData` + handlers flow parent → step → option cards (2–3 levels); saved careers state flows `CareerResults` → `CareerCard`. | `CareerDiscovery.jsx` → step components → `OptionCard`; `CareerResults.jsx` → `CareerCard` |
| 19 | **Custom hooks** | `useCareerAssessment` (owns the whole form), `useLocalStorage` (state synced with localStorage), `useSavedCareers`, `useDocumentTitle`, plus `useAuth` (context hook). | `src/hooks/*`, `src/context/AuthContext.jsx` |
| 20 | **React Router** | `<BrowserRouter>`/`<Routes>`/`<Route>` in `App.jsx`; navigation with `<NavLink>`, `<Link>`, `useNavigate`, `useLocation`. | `src/App.jsx`, `Navbar.jsx`, `Home.jsx`, `Login.jsx` |
| 21 | **Nested routes** | `/dashboard` → `DashboardLayout` (with `<Outlet/>`) → `index` (Overview), `profile`, `saved-careers`. The whole site also nests under `MainLayout`. | `src/App.jsx`, `pages/Dashboard/DashboardLayout.jsx` |
| 22 | **Dynamic routes** | `/career/:careerSlug` renders one of 12 careers. | `src/App.jsx`, `pages/CareerDetails/CareerDetails.jsx` |
| 23 | **Route parameters** | `useParams()` reads `careerSlug` from the URL; the matching career is looked up with `getCareerBySlug`. | `pages/CareerDetails/CareerDetails.jsx`, `data/careers.js` |
| 24 | **Protected routes** | `ProtectedRoute` checks `useAuth()`; if logged out it redirects to `/login` with `state.from` set — after login the user is sent back to the page they asked for. The dashboard section is fully wrapped. | `components/auth/ProtectedRoute.jsx`, `App.jsx`, `pages/Login/Login.jsx` |
| 25 | **404 page** | `path="*"` renders `NotFound` (with Back to Home / Career Discovery buttons). It is also reused when the career slug in the URL matches nothing. | `src/App.jsx`, `pages/NotFound/NotFound.jsx`, `CareerDetails.jsx` |

## Where to look to *explain* each main React feature

- **`useState`, `useEffect`, `useRef`, `useMemo`, `useCallback`** — all five are used in one file: `src/pages/CareerDiscovery/CareerDiscovery.jsx`.
- **Custom hooks** — `src/hooks/useCareerAssessment.js` is the best single example (state + effects + callbacks + localStorage).
- **Controlled forms** — `src/pages/Login/Login.jsx` is the smallest, cleanest example.
- **Routes (nested / dynamic / protected / 404)** — `src/App.jsx` is the full route tree.