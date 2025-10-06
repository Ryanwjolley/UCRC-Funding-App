import { CheckCircle2 } from 'lucide-react'

interface ReviewPageProps {
  formData: any
  updateFormData: (data: any) => void
}

const certifications = [
  'I certify that this application is accurate and that I meet all the requirements to participate in the UDMT Program.',
  'I will comply with UCRC requests for additional information and understand that the application may be rejected by UCRC without further consideration if I do not provide the requested information.',
  'I acknowledge that UCRC may reject my application for any or no reason allowed by law, and agree that any rejection which is otherwise legal is within the sole discretion and judgment of UCRC.',
  'I understand that to participate in the UDMT Program, I will be required to enter into an implementation agreement with UCRC. I have reviewed the implementation agreement provided with this application and am willing and able to abide by its terms.',
  'I authorize UCRC to share the contents of this application in its entirety with its contractor, Jones and DeMille Engineering, and with the Colorado River Authority of Utah.',
  'If my application is approved, I authorize UCRC to proceed with any administrative or program-related tasks that must be completed before I can enter into an implementation agreement with UCRC.',
  'I understand that Jones & DeMille Engineering is available for assistance with this application.',
]

export default function ReviewPage({ formData, updateFormData }: ReviewPageProps) {
  // Initialize certifications if not set
  const certifications_state = formData.certifications || new Array(certifications.length).fill(false)
  
  const handleCertificationChange = (index: number) => {
    const newCertifications = [...certifications_state]
    newCertifications[index] = !newCertifications[index]
    updateFormData({ certifications: newCertifications })
  }
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Review & Submit</h2>
        <p className="text-gray-600">
          Review your application summary and certify the information before submitting.
        </p>
      </div>

      {/* Application Summary */}
      <div className="card p-6 bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Summary</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Applicant</p>
            <p className="font-medium">[Name from form]</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="font-medium">[Email from form]</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Project</p>
            <p className="font-medium">[Project Title from form]</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Project Type</p>
            <p className="font-medium">[Type from form]</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Water Right</p>
            <p className="font-medium">[Number from form]</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Location</p>
            <p className="font-medium">[Lat, Lng from form]</p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <button className="text-primary hover:underline text-sm font-medium">
            ← Edit Application
          </button>
        </div>
      </div>

      {/* Certifications */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Final Certifications</h3>
        <p className="text-sm text-gray-600">
          Please read and acknowledge each certification below before submitting your application.
        </p>

        {certifications.map((cert, index) => (
          <label
            key={index}
            className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <input
              type="checkbox"
              checked={certifications_state[index] || false}
              onChange={() => handleCertificationChange(index)}
              className="mt-1 checkbox-standard"
            />
            <span className="text-sm text-gray-700 leading-relaxed">{cert}</span>
          </label>
        ))}
      </div>

      <div className="bg-success/10 border border-success/30 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold text-success mb-2">Ready to Submit</h4>
            <p className="text-sm text-gray-700">
              Once you click "Submit Application" below, your application will be locked and sent to the UCRC
              for review. You will receive a confirmation email with a PDF copy of your submission.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
