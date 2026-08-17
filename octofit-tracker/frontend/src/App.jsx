import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

const navItems = [
  { to: '/', label: 'Overview' },
  { to: '/users', label: 'Users' },
  { to: '/activities', label: 'Activities' },
  { to: '/teams', label: 'Teams' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
]

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api`
    : 'http://localhost:8000/api'

  const environmentNote = codespaceName
    ? `Using codespace ${codespaceName} for API requests.`
    : 'VITE_CODESPACE_NAME is not set. Falling back to http://localhost:8000/api.'

  return (
    <div className="app-shell">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container-fluid">
          <span className="navbar-brand fw-bold">OctoFit Tracker</span>
          <div className="navbar-nav d-flex flex-row flex-wrap gap-2">
            {navItems.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `nav-link px-3 py-2 rounded ${isActive ? 'bg-primary-subtle text-primary-emphasis' : 'text-white-50'}`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      <main className="container py-4">
        <div className="alert alert-light border mb-4">
          <strong>API target:</strong> {apiBaseUrl}
          <div className="small text-muted mt-1">{environmentNote}</div>
          <div className="small text-muted mt-1">
            Define VITE_CODESPACE_NAME in .env.local before running the frontend in GitHub Codespaces.
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

function Overview() {
  return (
    <div className="row g-4">
      <div className="col-lg-6">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-body">
            <h1 className="h3 mb-3">Welcome to OctoFit Tracker</h1>
            <p className="text-secondary">
              Monitor student fitness progress, review team standings, and keep the activity log in sync with the backend API.
            </p>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-body">
            <h2 className="h4 mb-3">Quick status</h2>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Users</li>
              <li className="list-group-item">Activities</li>
              <li className="list-group-item">Teams</li>
              <li className="list-group-item">Leaderboard</li>
              <li className="list-group-item">Workouts</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
