import { useNavigate } from 'react-router-dom'
import { Plus, FileText, Eye, Copy, LogOut, Users } from 'lucide-react'
import { useState, useEffect } from 'react'
import { applicationsAPI, authAPI } from '../lib/api'

interface DashboardProps {
  currentUser: { name: string; role: 'user' | 'admin' }
  actingAs: string
  setActingAs: (email: string) => void
  isImpersonating: boolean
  prototypeImpersonation: boolean
}

export default function Dashboard({ 
  currentUser, 
  actingAs, 
  setActingAs, 
  isImpersonating, 
  prototypeImpersonation 
}: DashboardProps) {
  const navigate = useNavigate()
  const [applications, setApplications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const SEED_USERS = {
    'admin@example.com': 'Admin User',
    'applicantA@example.com': 'Applicant A',
    'applicantB@example.com': 'Applicant B',
  }

  // Fetch applications on mount
  useEffect(() => {
    loadApplications()
  }, [])

  const loadApplications = async () => {
    try {
      setLoading(true)
      const data = await applicationsAPI.getAll()
      setApplications(data)
    } catch (error) {
      console.error('Failed to load applications:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateNew = async () => {
    try {
      const newApp = await applicationsAPI.create({})
      navigate(`/application/${newApp.id}`)
    } catch (error) {
      console.error('Failed to create application:', error)
    }
  }

  const handleDuplicate = async (appId: string) => {
    try {
      const app = await applicationsAPI.getById(appId)
      const duplicated = await applicationsAPI.create(app.form_data)
      navigate(`/application/${duplicated.id}`)
    } catch (error) {
      console.error('Failed to duplicate application:', error)
    }
  }

  const handleLogout = () => {
    authAPI.logout()
    navigate('/login')
  }

  const handleRoleSwitch = (email: string) => {
    setActingAs(email)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-primary">UDMT Application Portal</h1>
              <p className="text-sm text-gray-600">Utah Diversion Measurement & Telemetry Program</p>
            </div>
            <div className="flex items-center gap-4">
              {prototypeImpersonation && currentUser.role === 'admin' && (
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <select 
                    value={actingAs}
                    onChange={(e) => handleRoleSwitch(e.target.value)}
                    className="text-sm border border-gray-300 rounded px-2 py-1"
                  >
                    <option value="admin@example.com">Admin</option>
                    <option value="applicantA@example.com">Applicant A</option>
                    <option value="applicantB@example.com">Applicant B</option>
                  </select>
                </div>
              )}
              {currentUser.role === 'admin' && (
                <button
                  onClick={() => navigate('/admin')}
                  className="btn btn-secondary text-sm"
                >
                  Admin Dashboard
                </button>
              )}
              <button
                onClick={handleLogout}
                className="btn btn-secondary flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Impersonation Banner */}
        {isImpersonating && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-yellow-600" />
                <span className="text-yellow-800 font-medium">
                  Viewing as {SEED_USERS[actingAs as keyof typeof SEED_USERS]}
                </span>
              </div>
              <button
                onClick={() => setActingAs('admin@example.com')}
                className="text-yellow-800 hover:text-yellow-900 text-sm font-medium"
              >
                Exit Impersonation
              </button>
            </div>
          </div>
        )}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">My Applications</h2>
            <button
              onClick={handleCreateNew}
              className="btn btn-primary flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create New Application
            </button>
          </div>

          {loading ? (
            <div className="card p-12 text-center">
              <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600">Loading applications...</p>
            </div>
          ) : applications.length > 0 ? (
            <div className="card overflow-hidden">
              <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Project Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applications.map((app) => {
                  const projectName = app.form_data?.projectName || 'Untitled Application'
                  const status = app.status.charAt(0).toUpperCase() + app.status.slice(1)
                  
                  return (
                  <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{projectName}</div>
                          <div className="text-sm text-gray-500">ID: {app.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          app.status === 'submitted'
                            ? 'bg-success/10 text-success'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(app.updated_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        {app.status === 'draft' ? (
                          <button
                            onClick={() => navigate(`/application/${app.id}`)}
                            className="text-primary hover:text-primary-dark font-medium"
                          >
                            Edit
                          </button>
                        ) : (
                          <button
                            onClick={() => navigate(`/application/${app.id}`)}
                            className="text-gray-600 hover:text-gray-900 flex items-center gap-1"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </button>
                        )}
                        <button 
                          onClick={() => handleDuplicate(app.id.toString())}
                          className="text-gray-600 hover:text-gray-900 flex items-center gap-1"
                        >
                          <Copy className="w-4 h-4" />
                          Duplicate
                        </button>
                      </div>
                    </td>
                  </tr>
                )})}
              </tbody>
            </table>
          </div>
          ) : (
            <div className="card p-12 text-center">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
              <p className="text-gray-500 mb-6">Get started by creating your first application</p>
              <button
                onClick={handleCreateNew}
                className="btn btn-primary inline-flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Create New Application
              </button>
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="card p-6 bg-blue-50 border-blue-200">
          <h3 className="font-semibold text-primary mb-2">Program Information</h3>
          <p className="text-sm text-gray-700 mb-4">
            The Utah Diversion Measurement and Telemetry Program enhances water monitoring
            infrastructure across the Upper Colorado River Basin within Utah.
          </p>
          <a
            href="http://www.ucrcommission.com/agencies-programs/utah-diversion-measurement-telemetry-program/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline font-medium"
          >
            Learn more about the UDMT Program →
          </a>
        </div>
      </main>
    </div>
  )
}
