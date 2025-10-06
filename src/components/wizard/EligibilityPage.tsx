import { useState } from 'react'
import { AlertCircle } from 'lucide-react'

interface EligibilityPageProps {
  formData: any
  updateFormData: (data: any) => void
}

const eligibilityItems = [
  'Project is located in the Utah portion of the Upper Colorado River System',
  'Applicant has a valid water right and the authority to participate',
  'Project measures source diversions, return flows, and/or reservoir inflow/outflow (not lateral or mainstem)',
  'Applicant will allow installation of real-time measurement equipment',
  'Applicant agrees to make data publicly available',
  'Applicant will provide site access',
  'Applicant agrees to all environmental and regulatory compliance',
  'Applicant has reviewed the implementation agreement and is willing to execute a substantially similar agreement',
  'Applicant agrees to own/maintain equipment past the project period as set forth in the implementation agreement',
  'Applicant accepts a flexible installation window (typically outside of irrigation season)',
  'Applicant will comply with all applicable federal regulations',
  'Applicant agrees to allow UCRC to share the contents of this application',
]

export default function EligibilityPage({ formData, updateFormData }: EligibilityPageProps) {
  const [checks, setChecks] = useState<boolean[]>(formData.eligibilityChecks || Array(12).fill(false))

  const handleCheck = (index: number) => {
    const newChecks = [...checks]
    newChecks[index] = !newChecks[index]
    setChecks(newChecks)
    updateFormData({ eligibilityChecks: newChecks })
  }

  const allChecked = checks.every((c) => c)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Eligibility</h2>
        <p className="text-gray-600">All items must be acknowledged to proceed.</p>
      </div>

      {!allChecked && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-yellow-800">
            You must acknowledge all eligibility requirements before continuing to the next step.
          </p>
        </div>
      )}

      <div className="space-y-4">
        {eligibilityItems.map((item, index) => (
          <label
            key={index}
            className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <input
              type="checkbox"
              checked={checks[index]}
              onChange={() => handleCheck(index)}
              className="mt-1 checkbox-standard"
            />
            <span className="text-gray-700 leading-relaxed">{item}</span>
          </label>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-gray-700 mb-2">
          <strong>Additional Resources:</strong>
        </p>
        <ul className="space-y-1 text-sm">
          <li>
            <a href="#" className="text-primary hover:underline">
              Draft Implementation Agreement
            </a>
          </li>
          <li>
            <a href="#" className="text-primary hover:underline">
              Federal Funding Requirements
            </a>
          </li>
          <li>
            <a href="#" className="text-primary hover:underline">
              Ranking Scoresheet
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
