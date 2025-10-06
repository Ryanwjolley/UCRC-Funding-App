import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Wizard from './pages/Wizard'
import AdminDashboard from './pages/AdminDashboard'

// Prototype seed users
const SEED_USERS = {
  'admin@example.com': { name: 'Admin User', role: 'admin' as const },
  'applicantA@example.com': { name: 'Applicant A', role: 'user' as const },
  'applicantB@example.com': { name: 'Applicant B', role: 'user' as const },
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState<string>('admin@example.com')
  const [actingAs, setActingAs] = useState<string>('admin@example.com')
  
  const PROTOTYPE_IMPERSONATION = true // Feature flag
  
  const getCurrentUserData = () => SEED_USERS[actingAs as keyof typeof SEED_USERS]
  const isAdmin = () => getCurrentUserData()?.role === 'admin'
  const isImpersonating = () => currentUser !== actingAs

  // Debug logging
  console.log('App state:', { isAuthenticated, currentUser, actingAs, userData: getCurrentUserData() })

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={
            <Login 
              setAuth={setIsAuthenticated} 
              setCurrentUser={setCurrentUser}
              setActingAs={setActingAs}
            />
          } 
        />
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? (
            <Dashboard 
              currentUser={getCurrentUserData() || { name: 'Unknown User', role: 'user' }}
              actingAs={actingAs}
              setActingAs={setActingAs}
              isImpersonating={isImpersonating()}
              prototypeImpersonation={PROTOTYPE_IMPERSONATION}
            />
          ) : (
            <Navigate to="/login" />
          )} 
        />
        <Route 
          path="/application/:id?" 
          element={isAuthenticated ? (
            <Wizard 
              currentUser={getCurrentUserData()}
              actingAs={actingAs}
              isImpersonating={isImpersonating()}
            />
          ) : (
            <Navigate to="/login" />
          )} 
        />
        <Route 
          path="/admin" 
          element={isAuthenticated && isAdmin() ? (
            <AdminDashboard 
              currentUser={getCurrentUserData()}
              actingAs={actingAs}
              setActingAs={setActingAs}
              prototypeImpersonation={PROTOTYPE_IMPERSONATION}
            />
          ) : (
            <Navigate to="/dashboard" />
          )} 
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}

export default App
