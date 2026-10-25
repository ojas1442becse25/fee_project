# AVENZA Career Discovery — Front End Engineering-II Evaluation-II Guide

> **Project Title:** AVENZA Career Discovery System  
> **Course:** Front End Engineering - II (Evaluation-II)  
> **Framework & Stack:** React 19, React Router v7, Vanilla CSS Design System, Framer Motion, Lucide Icons, Vite  
> **State Management:** React Context API (Auth & Career Profiles) + Local React State (`useState`, `useReducer`, `useRef`)  
> **Persistence & Network:** LocalStorage sync + Fetch API (`dummyjson.com` Quotes API with offline resilience)

---

## Table of Contents
1. [Architecture & File Map](#1-architecture--file-map)
2. [React Concepts Used & Why](#2-react-concepts-used--why)
3. [Feature-by-Feature Code Location & Implementation](#3-feature-by-feature-code-location--implementation)
4. [Step-by-Step Live Demo Guide for Evaluators](#4-step-by-step-live-demo-guide-for-evaluators)
5. [Important Code Snippets & Viva Explanations](#5-important-code-snippets--viva-explanations)
6. [Common Viva Questions & Answers](#6-common-viva-questions--answers)

---

## 1. Architecture & File Map

```
avenza/
├── src/
│   ├── App.jsx                     # Top-level Router tree, Route definitions & Providers
│   ├── main.jsx                    # React 19 root mounting point
│   ├── index.css                   # Global CSS design tokens, reset, typography & variables
│   │
│   ├── context/
│   │   ├── AuthContext.jsx         # Context API: user session, login, logout, updateUser
│   │   └── CareerContext.jsx       # Context API: saved careers, completed profile, saveProfile
│   │
│   ├── hooks/
│   │   ├── useCareerAssessment.js  # Custom hook: multi-step form state & step validation
│   │   ├── useSavedCareers.js      # Custom hook: consumes CareerContext for bookmarks
│   │   ├── useLocalStorage.js      # Custom hook: synchronizes React state with localStorage
│   │   └── useDocumentTitle.js     # Custom hook: updates document title on route change
│   │
│   ├── components/
│   │   ├── auth/
│   │   │   └── ProtectedRoute.jsx  # Route guard for authenticated dashboard pages
│   │   ├── career/
│   │   │   ├── AboutYouStep.jsx    # Step 1: Name input + Education level with validation
│   │   │   ├── AcademicBgStep.jsx  # Step 2: Stream selection + 0-100% marks validation
│   │   │   ├── InterestsStepNew.jsx# Step 3: Multi-select interests with counter badge
│   │   │   ├── StrengthsStep.jsx   # Step 4: Multi-select skills with counter badge
│   │   │   ├── GoalsStepNew.jsx    # Step 5: Priorities, target career field & exams
│   │   │   ├── ProfileSummary.jsx  # Step 6: Assessment summary card & submission CTA
│   │   │   ├── FormStep.jsx        # Step wrapper with progress bar & Back/Continue
│   │   │   ├── CareerCard.jsx      # Career recommendation card with MatchScore & Save
│   │   │   └── CareerResults.jsx   # Grid of recommended careers + restart CTA
│   │   ├── layout/
│   │   │   ├── MainLayout.jsx      # Public layout with shared sticky Navbar + <Outlet/>
│   │   │   ├── Navbar.jsx          # Auth-aware responsive Navbar with saved count badge
│   │   │   └── Navbar.css          # Glassmorphic Navbar styles
│   │   ├── home/
│   │   │   ├── HeroVisual.jsx      # Animated SVG orbit visual with spring physics
│   │   │   ├── CareerCategories.jsx# Clickable category cards linking to dynamic details
│   │   │   ├── HowItWorks.jsx      # 3-step platform guidance
│   │   │   ├── FeaturesSection.jsx # Key platform highlights
│   │   │   ├── StatsSection.jsx    # Platform statistics
│   │   │   ├── WhyAvenza.jsx       # Value proposition
│   │   │   ├── CTASection.jsx      # Bottom call to action leading to /career-discovery
│   │   │   └── Footer.jsx          # Footer links and copyright
│   │   └── ui/
│   │       ├── FormField.jsx       # Accessible reusable form field with inline error alerts
│   │       ├── Button.jsx          # Reusable styled button component
│   │       ├── MatchScore.jsx      # Accessible circular SVG match score indicator (0-100%)
│   │       ├── OptionCard.jsx      # Reusable multi-select / single-select interactive card
│   │       ├── ProgressBar.jsx     # Visual linear progress indicator for multi-step form
│   │       ├── SkillTag.jsx        # Pill tags for required skills and recommended streams
│   │       └── CareerInsight.jsx   # Async Fetch API widget with loading, retry & AbortController
│   │
│   ├── pages/
│   │   ├── Home/Home.jsx           # Landing page with interactive hero and sections
│   │   ├── CareerDiscovery/        # Multi-step assessment host page
│   │   ├── CareerResults/          # Dedicated recommendations route with demo loader & empty state
│   │   ├── CareerDetails/          # Dynamic route (/career/:careerSlug) with roadmap & metrics
│   │   ├── Login/Login.jsx         # Sign In / Create Account with tab switch & validation
│   │   ├── Dashboard/
│   │   │   ├── DashboardLayout.jsx # Nested dashboard layout with sidebar & <Outlet/>
│   │   │   ├── DashboardHome.jsx   # Overview with real stats, journey progress & quote widget
│   │   │   ├── ProfilePage.jsx     # Controlled profile form synced with CareerContext & Auth
│   │   │   └── SavedCareers.jsx    # Bookmarked careers list with real match snapshot
│   │   ├── Static/
│   │   │   ├── About.jsx           # About page with platform mission
│   │   │   ├── Features.jsx        # Platform capabilities breakdown
│   │   │   ├── FAQ.jsx             # Collapsible FAQ accordions
│   │   │   └── Contact.jsx         # Contact form with validation & async submission simulation
│   │   └── NotFound/NotFound.jsx   # 404 Catch-all error page
│   │
│   ├── data/
│   │   ├── assessmentQuestions.js  # Question options, icons, categories, streams
│   │   └── careers.js              # 14 curated careers with salaries, roadmaps, skills
│   └── utils/
│       └── careerMatcher.js        # Recommendation algorithm with stream, interest, skill & marks weights
```

---

## 2. React Concepts Used & Why

| React Concept | Where It Is Used | Why It Is Used |
| :--- | :--- | :--- |
| **Component Composition & Props** | `MainLayout`, `DashboardLayout`, `FormStep`, `FormField` | Encapsulates shared UI structures (navbar, sidebar, progress bar) and passes data/handlers down cleanly via `children` and typed props. |
| **React Router v7 SPA** | `App.jsx`, `Navbar.jsx`, `DashboardLayout.jsx` | Enables client-side multi-page routing without page reloads, supporting browser history, active link styling (`NavLink`), and URL synchronization. |
| **Dynamic Routes (`useParams`)** | `CareerDetails.jsx` (`/career/:careerSlug`) | Renders detailed information for any career dynamically based on the URL parameter without duplicating page files. |
| **Nested Routes & `<Outlet />`** | `DashboardLayout.jsx` (`/dashboard/*`) | Preserves the dashboard sidebar layout while swapping inner views (`Overview`, `My Profile`, `Saved Careers`) smoothly. |
| **Protected Routes (`ProtectedRoute`)** | `ProtectedRoute.jsx` wrapping `/dashboard` | Protects authenticated user routes. Redirects unauthenticated visitors to `/login` while saving `location.state.from` for instant return. |
| **React Context API** | `AuthContext.jsx`, `CareerContext.jsx` | Solves prop drilling for global state: authentication session (`user`), bookmarked careers (`savedCareers`), and completed profile (`profile`). |
| **Global vs. Local State** | Context API vs. `useState` in forms / steps | Global state is shared across pages (saved careers counter, auth status); local state is isolated where it belongs (form draft inputs, active step, modal toggles). |
| **Custom Hooks** | `useCareerAssessment`, `useSavedCareers`, `useLocalStorage`, `useDocumentTitle` | Extracts complex stateful logic and browser synchronization into reusable functions across components. |
| **Controlled Components** | `Login.jsx`, `ProfilePage.jsx`, `Contact.jsx`, `AcademicBgStep.jsx` | React state acts as the single source of truth for input values, enabling real-time validation and input masking. |
| **`useMemo` & `useCallback`** | `careerMatcher.js` consumption, Context actions | `useMemo` avoids recalculating career match scores on unrelated re-renders; `useCallback` prevents child components from re-rendering due to new function references. |
| **`useEffect` & Cleanup** | `CareerInsight.jsx`, `CareerDiscovery.jsx` | Manages side effects (API calls, timers, DOM focus). Implements `AbortController` and `clearTimeout` to prevent memory leaks on unmount. |
| **Conditional Rendering** | Empty states, loading spinners, error alerts | Displays appropriate UI states (`isAnalyzing`, `loading`, `error`, `savedCareers.length === 0`, `isSaved`). |
| **Accessibility (a11y)** | `FormField.jsx`, `MatchScore.jsx` | Uses semantic HTML, `htmlFor`/`id` bindings, `aria-invalid`, `aria-describedby`, and `role="alert"` for inclusive design. |

---

## 3. Feature-by-Feature Code Location & Implementation

### 1. Multi-Page SPA & React Router
- **Route Tree (`src/App.jsx`):**
  - Public routes: `/`, `/about`, `/features`, `/contact`, `/faq`, `/login`
  - Assessment routes: `/career-discovery`, `/career` (alias), `/assessment` (alias)
  - Recommendations routes: `/career-recommendations`, `/career/results`, `/recommendations` (alias)
  - Dynamic detail route: `/career/:careerSlug`
  - Protected nested routes: `/dashboard`, `/dashboard/profile`, `/dashboard/saved-careers`
  - Convenience aliases: `/profile` -> `/dashboard/profile`, `/saved-careers` -> `/dashboard/saved-careers`
  - Catch-all 404: `path="*"` -> `<NotFound />`
- **Dynamic Route Parameter:**
  - In `CareerDetails.jsx`, `const { careerSlug } = useParams();` retrieves the slug from the URL and calls `getCareerBySlug(careerSlug)`. If not found, it renders `<NotFound message="..." />`.

### 2. Context API & State Management
- **AuthContext (`src/context/AuthContext.jsx`):**
  - Manages `user` (`{ name, email, loggedInAt }`), `login(userData)`, `logout()`, `updateUser(fields)`.
  - Stored in `localStorage` (`avenza_auth_user`).
- **CareerContext (`src/context/CareerContext.jsx`):**
  - Manages `savedEntries`, `savedCareers` (with score snapshot), `isSaved(id)`, `toggleSave(career)`, `clearSaved()`.
  - Manages `profile`, `saveProfile(data)`, `clearProfile()`.
  - Stored in `localStorage` (`avenza_saved_careers` and `avenza_profile`).
- **Local State Distinction:**
  - `useCareerAssessment.js`: Multi-step form values during the 6-step assessment are local until finalized.
  - `Login.jsx` & `Contact.jsx`: Form field values, inline errors, and tab state are strictly local.
  - `CareerInsight.jsx`: Quote data and loading states are isolated to the widget.

### 3. Async Operations, Loading & Error Handling
- **External API Request (`src/components/ui/CareerInsight.jsx`):**
  - Uses native `fetch('https://dummyjson.com/quotes/random', { signal })`.
  - Wrapped in `try / catch / finally` with loading spinner and error alert.
  - Uses `AbortController` in `useEffect` cleanup to cancel in-flight requests if unmounted.
  - Features offline fallback resilience (`FALLBACK_QUOTES`) so that viva presentations never fail due to lack of internet.
  - Includes user "New Quote" / "Retry Live" action with debounce to prevent duplicate requests.
- **Assessment Submission (`src/pages/CareerDiscovery/CareerDiscovery.jsx`):**
  - `isAnalyzing` loading state displays `<LoadingScreen />`.
  - Timeout cleanup via `useRef` ensures no state updates occur if the user navigates away.
  - Prevents duplicate submissions with button disabling.

### 4. Form Handling & Validation
- **Login / Register Form (`src/pages/Login/Login.jsx`):**
  - Tab switch between "Sign In" and "Create Account".
  - Field-specific errors: `errors.name`, `errors.email`, `errors.password`.
  - Validates email regex (`EMAIL_RE`), password length (`>= 6`), and name length.
  - Async login simulation with loading spinner on the submit button.
- **Assessment Multi-Step Form (`src/components/career/`):**
  - Step 1: Name required, education level selection.
  - Step 2: Stream selection + numeric marks validation strictly between `0` and `100%`.
  - Steps 3 & 4: Multi-select interests and strengths with real-time selection badges ("3 selected", "Choose at least 1").
  - Step 5: Target career goal and entrance exam validation.
  - Preserves answers when navigating **Back** and **Continue**.
- **Contact Form (`src/pages/Static/Contact.jsx`):**
  - Replaces placeholder with full contact form using reusable `<FormField />`.
  - Name, email, subject, message validation (minimum 10 characters).
  - Async submission state and confirmation alert.

### 5. UI and Functional Bug Fixes
- **Career Match Calculation Fix (`src/utils/careerMatcher.js` & `src/data/careers.js`):**
  - Fixed interest/skill naming mismatch where career tags like "Coding", "Problem Solving", and "Research" were not in the assessment checklist.
  - Added intelligent cross-matching aliases so student selections accurately produce realistic match percentages (75%–98% for strong matches).
- **ESLint Fixes:**
  - Resolved `react-hooks/set-state-in-effect` in `CareerInsight.jsx`.
  - Removed unused `motion` import in `ProgressSteps.jsx`.
  - Fixed unused `label` prop in `MatchScore.jsx` by adding full accessible progressbar attributes.
- **Navigation & Links:**
  - Fixed CTA button in `CTASection.jsx` to navigate to `/career-discovery`.
  - Made category cards in `CareerCategories.jsx` interactive links to dynamic detail pages.
  - Added "Saved" careers count badge to `Navbar.jsx`.
  - Added clean redirect to home on logout in `DashboardLayout.jsx`.

---

## 4. Step-by-Step Live Demo Guide for Evaluators

Follow this sequence during your evaluation to demonstrate all required rubric items:

### Demo Step 1: Multi-Page SPA Navigation
1. Open the home page (`http://localhost:5174/`).
2. Point out the sticky glassmorphic Navbar.
3. Click through the links: **About** -> **Features** -> **FAQ** -> **Contact**.
4. Show that navigation is instant (Client-Side Routing via React Router v7) without browser reloads.

### Demo Step 2: Recommendations Direct URL & Empty State
1. Directly type `http://localhost:5174/career-recommendations` into the browser URL bar.
2. Show the **Empty State card**: "No Career Matches Yet". Explain that direct URL access is handled gracefully instead of crashing or abruptly bouncing the user.
3. Click **"Load Demo Profile (Evaluation Mode)"**.
4. Point out the instant recommendation generation for student *Aarav Sharma* showing ranked matches (e.g. Software Engineer at 92%, AI Engineer at 88%, Data Scientist at 84%).
5. Explain `useMemo` in `CareerResultsPage.jsx` which calculates matches without recalculating on re-render.

### Demo Step 3: Interactive Career Cards & Dynamic Routes
1. On the first card (Software Engineer), click **"Save Career"**. Show the button change to **"Saved"** with a green checkmark.
2. Look at the top Navbar: notice the **"Saved (1)"** badge has reactively updated!
3. Click **"View Details"** on the Software Engineer card.
4. Show the browser URL: `/career/software-engineer`.
5. Point out the dynamic route reading `useParams()` to load:
   - Salary range (`₹8L - ₹25L+`), Growth (`High`), Difficulty (`Medium`).
   - Required skills tags and recommended streams.
   - 4-stage Career Roadmap (Foundation, Degree, Specialize, Career).
   - Personalized Match breakdown showing why this matches Aarav's profile.

### Demo Step 4: Multi-Step Assessment Form & Validation
1. Click **"Career Discovery"** in the Navbar.
2. **Step 1:** Clear the name input and try to click "Continue". Show that the button is disabled and the field error warns "Please enter your name". Type your name, select "12th", and click "Continue".
3. **Step 2:** Choose "PCM". Test the numeric marks input: type `150` or `-5` and show the field error: *"Marks must be between 0% and 100%"*. Set it to `85%` and continue.
4. **Step 3 & 4:** Point out the selection badges. Show that you must pick at least 1 interest and 1 strength. Click **"Back"** to demonstrate that previous inputs (Name, Stream, Marks) are preserved in state! Click **"Continue"** back through.
5. **Step 5:** Choose "Technology" and "JEE".
6. **Step 6:** Show the Profile Summary card. Click **"Find My Career Matches"**.
7. Point out the smooth analyzing transition spinner before navigating to `/career/results`.

### Demo Step 5: Authentication & Protected Dashboard
1. Click **"Login"** in the Navbar.
2. Toggle between **"Sign In"** and **"Create Account"** tabs to demonstrate controlled state.
3. Click "Sign In" with blank fields to show field-specific error messages.
4. Enter `aarav@example.com` and `password123`. Click "Sign In to Dashboard".
5. Show the submission spinner and success message before redirecting to `/dashboard`.
6. On the protected Dashboard:
   - Welcome banner: "Welcome back, Aarav!"
   - Saved careers count matches the globally saved items.
   - **Daily Career Inspiration** widget: show the live quote fetched from the API with Author, and click "New Quote" to show async re-fetch.
   - Click **"My Profile"** in the sidebar (`/dashboard/profile`).
   - Change your name to `Aarav Kumar` and click "Save Profile". Point out that the sidebar user name updates reactively through Context API!

### Demo Step 6: 404 Catch-All Page
1. Type `http://localhost:5174/random-non-existent-page` in the URL bar.
2. Show the dedicated **404 Not Found** page with "Back to Home" and "Career Discovery" recovery buttons.

---

## 5. Important Code Snippets & Viva Explanations

### Snippet 1: Global State with Context API (`src/context/CareerContext.jsx`)
```jsx
export function CareerProvider({ children }) {
  const [savedEntries, setSavedEntries] = useLocalStorage('avenza_saved_careers', []);
  const [profile, setProfile] = useLocalStorage('avenza_profile', null);

  const toggleSave = useCallback((careerOrId) => {
    const isObject = careerOrId && typeof careerOrId === 'object';
    const id = isObject ? careerOrId.id : careerOrId;

    setSavedEntries((prev) => {
      if (prev.some((entry) => entry.id === id)) {
        return prev.filter((entry) => entry.id !== id); // Remove if saved
      }
      return [...prev, { id, matchScore: isObject ? careerOrId.matchScore : undefined }];
    });
  }, [setSavedEntries]);

  return (
    <CareerContext.Provider value={{ savedCareers, savedCount: savedEntries.length, toggleSave, profile, saveProfile }}>
      {children}
    </CareerContext.Provider>
  );
}
```
**Viva Explanation:**
> *"We use React Context API to provide a single source of truth for bookmarked careers and the completed user profile. Whenever `toggleSave` is invoked from a Career Card or Career Details page, all listening components (such as the Navbar badge and the Dashboard) update immediately without passing props through intermediate components."*

---

### Snippet 2: Dynamic Route Parameter (`src/pages/CareerDetails/CareerDetails.jsx`)
```jsx
const CareerDetails = () => {
  const { careerSlug } = useParams();
  const career = getCareerBySlug(careerSlug);

  if (!career) {
    return <NotFound message={`No career found for "${careerSlug}".`} />;
  }

  return (
    <div className="career-detail-page">
      <h1>{career.title}</h1>
      <p>{career.description}</p>
      {/* Roadmap and career data */}
    </div>
  );
};
```
**Viva Explanation:**
> *"The `useParams()` hook from React Router extracts the `:careerSlug` parameter from the active URL (e.g. `/career/software-engineer`). We search our career dataset for a matching slug. If a match is found, we render the details dynamically; if invalid, we render our fallback 404 component."*

---

### Snippet 3: Protected Route Guard (`src/components/auth/ProtectedRoute.jsx`)
```jsx
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};
```
**Viva Explanation:**
> *"ProtectedRoute is a wrapper component that checks the `user` object in `AuthContext`. If the user is unauthenticated, it redirects to `/login` using `<Navigate />` and passes the current location in `state.from`. After the user logs in, the login form redirects them directly back to the page they were trying to access."*

---

### Snippet 4: Async Fetch with Cleanup & AbortController (`src/components/ui/CareerInsight.jsx`)
```jsx
useEffect(() => {
  let ignore = false;
  const controller = new AbortController();

  async function loadInitialInsight() {
    try {
      const response = await fetch('https://dummyjson.com/quotes/random', {
        signal: controller.signal
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      if (!ignore) {
        setInsight({ quote: data.quote, author: data.author });
      }
    } catch (err) {
      if (err.name === 'AbortError') return; // Expected abort on unmount
      if (!ignore) setInsight(FALLBACK_QUOTES[0]); // Offline resilience
    } finally {
      if (!ignore) setLoading(false);
    }
  }

  loadInitialInsight();

  return () => {
    ignore = true;
    controller.abort(); // Cleanup in-flight request on unmount
  };
}, []);
```
**Viva Explanation:**
> *"This demonstrates the Fetch API, async/await, and proper `useEffect` cleanup. We use an `AbortController` and an `ignore` flag in the cleanup function. If the component unmounts before the HTTP request resolves, the fetch is cancelled to prevent memory leaks and state updates on unmounted components."*

---

### Snippet 5: Accessible Reusable Form Control (`src/components/ui/FormField.jsx`)
```jsx
export default function FormField({ id, label, required, error, ...rest }) {
  const hasError = Boolean(error);
  const errorId = `${id}-error`;

  return (
    <div className="form-field-group">
      <label htmlFor={id} className="form-field-label">
        {label} {required && <span aria-hidden="true">*</span>}
      </label>
      <input
        id={id}
        aria-invalid={hasError}
        aria-describedby={hasError ? errorId : undefined}
        className={`form-field-input ${hasError ? 'has-error' : ''}`}
        {...rest}
      />
      {hasError && (
        <p id={errorId} className="form-field-error" role="alert" aria-live="polite">
          {error}
        </p>
      )}
    </div>
  );
}
```
**Viva Explanation:**
> *"The `FormField` component pairs `<label htmlFor={id}>` with `<input id={id}>` for screen readers. When an error occurs, it attaches `aria-invalid="true"` and `aria-describedby`, rendering the error message with `role="alert"` so assistive technologies announce validation failures immediately."*

---

## 6. Common Viva Questions & Answers

### Q1: What is the difference between SPA (Single Page Application) and traditional Multi-Page Websites?
> **Answer:** In traditional websites, every link click requests an entirely new HTML document from the server, causing a blank screen flash and reload. In our React SPA with React Router, a single HTML shell is loaded once. When the user navigates, React Router dynamically mounts and unmounts components without refreshing the page, delivering faster transitions and native app-like responsiveness.

### Q2: Why did you use Context API instead of Redux Toolkit?
> **Answer:** Our application has moderate global state requirements: user session (`user`) and saved careers (`savedCareers`). Context API is built directly into React, requires zero external bundle overhead, and avoids the boilerplate of reducers, actions, and slices needed in Redux. For forms and step-by-step inputs, we keep state local with `useState`, which prevents unnecessary global re-renders.

### Q3: What is the purpose of `useMemo` in `CareerResultsPage.jsx`?
> **Answer:** `calculateMatches` compares the user profile against all 14 career paths and computes stream, interest, skill, goal, and academic score weights. By wrapping this calculation in `useMemo(() => calculateMatches(profile), [profile])`, React caches the result and only recalculates when `profile` actually changes, avoiding expensive operations on unrelated renders.

### Q4: How did you implement browser refresh persistence?
> **Answer:** We created a custom hook `useLocalStorage(key, initialValue)`. It initializes state lazily by reading from `localStorage.getItem(key)` on the first render, and uses a `useEffect` to write updates to `localStorage.setItem(key, JSON.stringify(value))` whenever state changes. As a result, user sessions, assessment progress, and saved careers survive full page refreshes.

### Q5: Why is cleanup needed in `useEffect` for async calls?
> **Answer:** If a user navigates away from a page while an asynchronous `fetch()` or `setTimeout()` is pending, resolving that promise would try to update state on a component that no longer exists in the DOM. This causes memory leaks and console warnings. Using `AbortController.abort()` and `clearTimeout()` in the effect cleanup function cleanly cancels ongoing work.

---

## Evaluation Summary
- **Lint Status:** `npm run lint` -> **0 errors, 0 warnings**
- **Production Build:** `npm run build` -> **Built successfully in < 1s**
- **Routes Tested:** Public pages, dynamic routes (`/career/:careerSlug`), protected dashboard (`/dashboard/*`), aliases, and 404 fallback.
- **State Tested:** Context API global sync, local form states, persistence on refresh, empty states, and mock demo profile.
