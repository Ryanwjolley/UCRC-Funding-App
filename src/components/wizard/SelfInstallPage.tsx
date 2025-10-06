import { Upload } from 'lucide-react'

interface SelfInstallPageProps {
  formData: any
  updateFormData: (data: any) => void
}

export default function SelfInstallPage({ formData, updateFormData }: SelfInstallPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Self-Installation (Optional)</h2>
        <p className="text-gray-600">
          If self-installing or if a previous design or cost estimate is available, please attach.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-gray-700">
          <strong>Note:</strong> This section is not required. An independent cost estimate and design may be done
          for each of the projects. The cost reimbursement and rates will be determined during the implementation
          agreement stage and may be capped according to budget restraints.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Do you have design documents?
        </label>
        <select 
          className="input-field"
          value={formData?.hasDesignDocuments || ''}
          onChange={(e) => updateFormData({ hasDesignDocuments: e.target.value })}
        >
          <option value="">Select...</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      <div className="border border-gray-200 rounded-lg p-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Design Documents
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
          <p className="text-xs text-gray-500 mt-1">PDF, DWG, etc. up to 20MB</p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Do you have a cost estimate?
        </label>
        <select 
          className="input-field"
          value={formData?.hasCostEstimate || ''}
          onChange={(e) => updateFormData({ hasCostEstimate: e.target.value })}
        >
          <option value="">Select...</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      <div className="border border-gray-200 rounded-lg p-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Cost Estimate Documents
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
          <p className="text-xs text-gray-500 mt-1">PDF, XLS, etc. up to 10MB</p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Estimated Total Cost
        </label>
        <div className="relative">
          <span className="absolute left-3 top-2.5 text-gray-500">$</span>
          <input 
            type="number" 
            step="0.01" 
            className="input-field pl-7" 
            placeholder="0.00"
            value={formData?.estimatedCost || ''}
            onChange={(e) => updateFormData({ estimatedCost: e.target.value })}
          />
        </div>
      </div>
    </div>
  )
}
