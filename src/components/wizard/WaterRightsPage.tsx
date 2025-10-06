import { Upload } from 'lucide-react'

interface WaterRightsPageProps {
  formData: any
  updateFormData: (data: any) => void
}

export default function WaterRightsPage({ formData, updateFormData }: WaterRightsPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Water Rights & Authority</h2>
        <p className="text-gray-600">Provide water right information and documentation.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Water Right Number <span className="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            className="input-field"
            value={formData?.waterRightNumber || ''}
            onChange={(e) => updateFormData({ waterRightNumber: e.target.value })}
            required 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Water Right Flow Rate or Volume <span className="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            className="input-field"
            value={formData?.waterRightFlowRate || ''}
            onChange={(e) => updateFormData({ waterRightFlowRate: e.target.value })}
            required 
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notes
          </label>
          <textarea
            className="input-field"
            rows={3}
            placeholder="List additional water rights or notes"
            value={formData?.waterRightNotes || ''}
            onChange={(e) => updateFormData({ waterRightNotes: e.target.value })}
          />
          <p className="text-sm text-gray-500 mt-1">
            List additional water rights or provide relevant notes
          </p>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg p-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Water Right Documents (Optional)
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
          <p className="text-xs text-gray-500 mt-1">PDF, DOC, XLS up to 10MB</p>
        </div>
      </div>
    </div>
  )
}
