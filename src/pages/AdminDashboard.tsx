import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileText, Users, Shield } from 'lucide-react'
import { adminAPI } from '../lib/api'

interface AdminDashboardProps {
  currentUser: { name: string; role: 'user' | 'admin' }
  actingAs: string
  setActingAs: (email: string) => void
  prototypeImpersonation: boolean
}

interface Application {
  id: number
  user_id: number
  status: string
  form_data: any
  created_at: string
  updated_at: string
  submitted_at: string | null
  user?: {
    name: string
    email: string
  }
}

export default function AdminDashboard({ 
  // currentUser, 
  actingAs: _actingAs, 
  setActingAs: _setActingAs, 
  prototypeImpersonation: _prototypeImpersonation 
}: AdminDashboardProps) {
  const navigate = useNavigate()
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadApplications()
  }, [])

  const loadApplications = async () => {
    try {
      const data = await adminAPI.getAllApplications()
      console.log('📊 Admin: Loaded applications:', data)
      setApplications(data)
    } catch (error) {
      console.error('Failed to load applications:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleView = (id: number) => {
    navigate(`/application/${id}`)
  }

  const handleEdit = (id: number) => {
    navigate(`/application/${id}`)
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '—'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  }

  const getProjectName = (formData: any) => {
    return formData?.projectName || 'Untitled Project'
  }

  const getApplicantName = (app: Application) => {
    return app.user?.name || app.form_data?.primaryContact?.name || 'Unknown'
  }

  const getApplicantEmail = (app: Application) => {
    return app.user?.email || app.form_data?.primaryContact?.email || 'N/A'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading applications...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-6 h-6" />
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              </div>
              <p className="text-blue-100">UDMT Application Portal Management</p>
            </div>
            <a href="/dashboard" className="btn bg-white text-primary hover:bg-gray-100">
              ← Back to Dashboard
            </a>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Applications</p>
                <p className="text-3xl font-bold text-primary">
                  {applications.length}
                </p>
              </div>
              <FileText className="w-12 h-12 text-gray-300" />
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Submitted</p>
                <p className="text-3xl font-bold text-success">
                  {applications.filter((a) => a.status === 'submitted').length}
                </p>
              </div>
              <FileText className="w-12 h-12 text-green-200" />
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Drafts</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {applications.filter((a) => a.status === 'draft').length}
                </p>
              </div>
              <Users className="w-12 h-12 text-yellow-200" />
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="card overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-semibold">All Applications</h2>
          </div>

          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applicant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {getApplicantName(app)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {getApplicantEmail(app)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {getProjectName(app.form_data)}
                    </div>
                    <div className="text-sm text-gray-500">ID: {app.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        app.status === 'submitted'
                          ? 'bg-success/10 text-success'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(app.submitted_at)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button 
                      onClick={() => handleView(app.id)}
                      className="text-primary hover:text-primary-dark font-medium mr-4"
                    >
                      View
                    </button>
                    {app.status === 'draft' && (
                      <button 
                        onClick={() => handleEdit(app.id)}
                        className="text-primary hover:text-primary-dark font-medium"
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
