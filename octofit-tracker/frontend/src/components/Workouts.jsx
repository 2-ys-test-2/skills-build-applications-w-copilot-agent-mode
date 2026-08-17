import { useEffect, useState } from 'react'

const getApiUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

  if (!codespaceName) {
    return 'http://localhost:8000/api/workouts/'
  }

  return `https://${codespaceName}-8000.app.github.dev/api/workouts/`
}

const normalizeRecords = (payload) => {
  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.results)) {
    return payload.results
  }

  if (Array.isArray(payload?.data)) {
    return payload.data
  }

  if (Array.isArray(payload?.items)) {
    return payload.items
  }

  const nestedArray = Object.values(payload ?? {}).find(Array.isArray)
  return Array.isArray(nestedArray) ? nestedArray : []
}

const readText = (value) => {
  if (value === null || value === undefined || value === '') {
    return '—'
  }

  if (typeof value === 'object') {
    if (value.name) return value.name
    if (value.title) return value.title
    if (value.email) return value.email
    if (value.username) return value.username
    if (value._id) return value._id
    return JSON.stringify(value)
  }

  return String(value)
}

function Workouts() {
  const [records, setRecords] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    let isActive = true

    fetch(getApiUrl())
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        return response.json()
      })
      .then((payload) => {
        if (isActive) {
          setRecords(normalizeRecords(payload))
          setError('')
        }
      })
      .catch((fetchError) => {
        if (isActive) {
          setError(fetchError.message)
          setRecords([])
        }
      })

    return () => {
      isActive = false
    }
  }, [])

  return (
    <section className="card border-0 shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="h4 mb-0">Workouts</h2>
          <span className="status-badge">{records.length} workouts</span>
        </div>

        {error ? (
          <div className="alert alert-warning mb-0">Unable to load workouts: {error}</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped mb-0">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Duration</th>
                  <th>Intensity</th>
                </tr>
              </thead>
              <tbody>
                {records.map((workout, index) => (
                  <tr key={workout._id ?? `${workout.name}-${index}`}>
                    <td>{readText(workout.name)}</td>
                    <td>{readText(workout.type ?? workout.category)}</td>
                    <td>{readText(workout.duration ?? workout.minutes)}</td>
                    <td>{readText(workout.intensity ?? workout.level)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}

export default Workouts
