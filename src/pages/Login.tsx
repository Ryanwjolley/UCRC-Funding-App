import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, AlertCircle } from 'lucide-react'
import { authAPI } from '../lib/api'

interface LoginProps {
  setAuth: (value: boolean) => void
  setCurrentUser: (email: string) => void
  setActingAs: (email: string) => void
}

export default function Login({ setAuth, setCurrentUser, setActingAs }: LoginProps) {
  const [email, setEmail] = useState('admin@example.com') // Pre-fill for demo
  const [password, setPassword] = useState('admin123') // Pre-fill for demo
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const data = await authAPI.login(email, password)
      
      setAuth(true)
      setCurrentUser(data.user.email)
      setActingAs(data.user.email)
      
      // Store user data in localStorage for persistence
      localStorage.setItem('udmt_user', JSON.stringify(data.user))
      
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="card p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">UDMT Application Portal</h1>
            <p className="text-gray-600">Utah Diversion Measurement & Telemetry Program</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="your.email@example.com"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="Enter your password"
                required
                disabled={loading}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="btn btn-primary w-full flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5" />
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm font-medium text-blue-900 mb-2">Demo Credentials:</p>
              <p className="text-xs text-blue-800">Admin: admin@example.com / admin123</p>
              <p className="text-xs text-blue-800">User: applicantA@example.com / user123</p>
            </div>
          </form>
        </div>

        <div className="mt-6 text-center text-white text-sm">
          <p>Need assistance? Contact Jones & DeMille Engineering</p>
          <p className="mt-1">Roosevelt: (435) 722-8267 | Vernal: (435) 781-1988</p>
        </div>
      </div>
    </div>
  )
}
