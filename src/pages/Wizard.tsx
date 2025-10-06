import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Save, Send, Check, AlertCircle } from 'lucide-react'
import { validateStepCompletion } from '../lib/utils'
import { applicationsAPI } from '../lib/api'
import WelcomePage from '../components/wizard/WelcomePage'
import EligibilityPage from '../components/wizard/EligibilityPage'
import ApplicantPage from '../components/wizard/ApplicantPage'
import ProjectPage from '../components/wizard/ProjectPage'
import LocationPage from '../components/wizard/LocationPage'
import WaterRightsPage from '../components/wizard/WaterRightsPage'
import SelfInstallPage from '../components/wizard/SelfInstallPage'
import ReviewPage from '../components/wizard/ReviewPage'

const steps = [
  { id: 1, name: 'Welcome', component: WelcomePage },
  { id: 2, name: 'Eligibility', component: EligibilityPage },
  { id: 3, name: 'Applicant', component: ApplicantPage },
  { id: 4, name: 'Project', component: ProjectPage },
  { id: 5, name: 'Location & Photos', component: LocationPage },
  { id: 6, name: 'Water Rights', component: WaterRightsPage },
  { id: 7, name: 'Self-Install', component: SelfInstallPage },
  { id: 8, name: 'Review & Submit', component: ReviewPage },
]

interface WizardProps {
  currentUser: { name: string; role: 'user' | 'admin' }
  actingAs: string
  isImpersonating: boolean
}

export default function Wizard({ currentUser, actingAs, isImpersonating }: WizardProps) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({})
  const [saveStatus, setSaveStatus] = useState<'saving' | 'saved' | null>(null)
  const [stepCompletion, setStepCompletion] = useState<boolean[]>(Array(8).fill(false))
  const [loading, setLoading] = useState(true)
  const [applicationId, setApplicationId] = useState<string | null>(null)
  const [autoSaveTimer, setAutoSaveTimer] = useState<NodeJS.Timeout | null>(null)

  const isAdminMode = currentUser.role === 'admin' && isImpersonating
  
  // Check if all steps are completed for submit button
  const allStepsCompleted = stepCompletion.every(completed => completed)

  const CurrentStepComponent = steps[currentStep - 1].component

  // Load application data on mount
  useEffect(() => {
    if (id && id !== 'new') {
      loadApplication(id)
    } else {
      setLoading(false)
    }
  }, [id])

  const loadApplication = async (appId: string) => {
    try {
      console.log('📥 Loading application:', appId)
      const app = await applicationsAPI.getById(appId)
      console.log('📦 Loaded application data:', app)
      console.log('📋 Form data:', app.form_data)
      
      setFormData(app.form_data || {})
      setApplicationId(appId)
      
      // Update step completion
      const completion = steps.map((_, index) => 
        validateStepCompletion(index + 1, app.form_data || {})
      )
      setStepCompletion(completion)
      console.log('✅ Application loaded successfully')
    } catch (error) {
      console.error('❌ Failed to load application:', error)
      alert('Failed to load application')
      navigate('/dashboard')
    } finally {
      setLoading(false)
    }
  }

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleStepClick = (stepNumber: number) => {
    // Can always navigate to Welcome and Eligibility
    if (stepNumber <= 2) {
      setCurrentStep(stepNumber)
      window.scrollTo(0, 0)
      return
    }

    // Check if eligibility is complete (all checkboxes checked)
    const eligibilityChecks = (formData as any)?.eligibilityChecks || []
    const eligibilityComplete = eligibilityChecks.length === 12 && eligibilityChecks.every((c: boolean) => c)
    
    // Only allow navigation to other steps if eligibility is complete
    if (eligibilityComplete) {
      setCurrentStep(stepNumber)
      window.scrollTo(0, 0)
    }
  }

  const canNavigateToStep = (stepNumber: number) => {
    // Can always navigate to Welcome and Eligibility
    if (stepNumber <= 2) return true
    
    // Check if eligibility is complete
    const eligibilityChecks = (formData as any)?.eligibilityChecks || []
    return eligibilityChecks.length === 12 && eligibilityChecks.every((c: boolean) => c)
  }

  const handleSave = async () => {
    setSaveStatus('saving')
    
    try {
      if (applicationId) {
        await applicationsAPI.update(applicationId, formData)
      } else {
        const newApp = await applicationsAPI.create(formData)
        setApplicationId(newApp.id.toString())
        navigate(`/application/${newApp.id}`, { replace: true })
      }
      setSaveStatus('saved')
      setTimeout(() => setSaveStatus(null), 2000)
    } catch (error) {
      console.error('Failed to save:', error)
      alert('Failed to save application')
      setSaveStatus(null)
    }
  }

  const handleSubmit = async () => {
    if (!allStepsCompleted) {
      alert('Please complete all required fields before submitting.')
      return
    }

    if (!applicationId) {
      alert('Please save the application first.')
      return
    }

    if (confirm('Are you sure you want to submit this application? It cannot be edited after submission.')) {
      try {
        await applicationsAPI.submit(applicationId)
        alert('Application submitted successfully!')
        navigate('/dashboard')
      } catch (error) {
        console.error('Failed to submit:', error)
        alert('Failed to submit application')
      }
    }
  }

  const updateFormData = (data: any) => {
    setFormData(prevData => {
      const newFormData = { ...prevData, ...data }
      console.log('🔄 Form data updated:', data)
      console.log('� Previous form data:', prevData)
      console.log('📦 New form data state:', newFormData)
      
      // Clear existing auto-save timer
      if (autoSaveTimer) {
        clearTimeout(autoSaveTimer)
      }
      
      // Auto-save after 2 seconds of inactivity
      if (applicationId) {
        const timer = setTimeout(async () => {
          setSaveStatus('saving')
          console.log('💾 Auto-saving application:', applicationId)
          console.log('📤 Sending form data:', newFormData)
          try {
            const result = await applicationsAPI.update(applicationId, newFormData)
            setSaveStatus('saved')
            console.log('✅ Auto-save successful:', result)
            setTimeout(() => setSaveStatus(null), 2000)
          } catch (error) {
            console.error('❌ Auto-save failed:', error)
            setSaveStatus(null)
          }
        }, 2000)
        setAutoSaveTimer(timer)
      } else {
        console.log('⚠️ No application ID, skipping auto-save')
      }
      
      return newFormData
    })
  }

  // Watch formData changes and update step completion
  useEffect(() => {
    if (!loading && Object.keys(formData).length > 0) {
      const newCompletion = steps.map((_, index) => 
        validateStepCompletion(index + 1, formData)
      )
      setStepCompletion(newCompletion)
    }
  }, [formData, loading])

  // Initialize step completion on mount (only if not loading)
  useEffect(() => {
    if (!loading) {
      const completion = steps.map((_, index) => 
        validateStepCompletion(index + 1, formData)
      )
      setStepCompletion(completion)
    }
  }, [formData, loading])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading application...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        {/* Admin Banner */}
        {isAdminMode && (
          <div className="bg-blue-600 text-white px-4 py-2 text-sm">
            <div className="max-w-5xl mx-auto flex items-center justify-between">
              <span>Admin Mode - Editing draft for {actingAs}</span>
              <span className="text-blue-200">Changes will be logged</span>
            </div>
          </div>
        )}
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold text-primary">UDMT Application</h1>
              <p className="text-sm text-gray-500">
                {id === 'new' ? 'New Application' : `Application #${id}`}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={handleSave} className="btn btn-secondary flex items-center gap-2 text-sm">
                <Save className="w-4 h-4" />
                {saveStatus === 'saving'
                  ? 'Saving...'
                  : saveStatus === 'saved'
                  ? 'Saved!'
                  : 'Save Draft'}
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="btn btn-secondary text-sm"
              >
                Exit
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              {steps.map((step, index) => {
                const canNavigate = canNavigateToStep(step.id)
                return (
                  <div key={step.id} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <button
                        onClick={() => handleStepClick(step.id)}
                        disabled={!canNavigate}
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold relative transition-all ${
                          step.id === currentStep
                            ? 'bg-blue-600 text-white ring-2 ring-blue-300'
                            : stepCompletion[step.id - 1]
                            ? 'bg-green-600 text-white'
                            : 'bg-red-600 text-white'
                        } ${
                          canNavigate 
                            ? 'cursor-pointer hover:scale-110 hover:shadow-lg' 
                            : 'cursor-not-allowed opacity-60'
                        }`}
                        aria-label={`Step ${step.id}: ${step.name} — ${
                          step.id === currentStep
                            ? 'Current'
                            : stepCompletion[step.id - 1]
                            ? 'Complete'
                            : 'Incomplete'
                        }`}
                        title={!canNavigate ? 'Complete eligibility requirements first' : `Go to ${step.name}`}
                      >
                        {step.id === currentStep ? (
                          step.id
                        ) : stepCompletion[step.id - 1] ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <AlertCircle className="w-5 h-5" />
                        )}
                      </button>
                      <span className="text-xs mt-1 text-center hidden sm:block">{step.name}</span>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`h-1 flex-1 mx-1 ${
                          step.id < currentStep ? 'bg-success' : 'bg-gray-200'
                        }`}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card p-8">
          <CurrentStepComponent formData={formData} updateFormData={updateFormData} />
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="btn btn-secondary flex items-center gap-2 disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          {currentStep < steps.length ? (
            <button onClick={handleNext} className="btn btn-primary flex items-center gap-2">
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button 
              onClick={handleSubmit} 
              disabled={!allStepsCompleted}
              className="btn btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
              Submit Application
            </button>
          )}
        </div>
      </main>
    </div>
  )
}
