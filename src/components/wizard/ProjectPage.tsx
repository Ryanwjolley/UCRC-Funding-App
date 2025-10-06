interface ProjectPageProps {
  formData: any
  updateFormData: (data: any) => void
}

export default function ProjectPage({ formData, updateFormData }: ProjectPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Proposed Project</h2>
        <p className="text-gray-600">
          Describe the proposed project and the measurement approach.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Project Type <span className="text-red-500">*</span>
        </label>
        <select 
          className="input-field"
          value={formData?.projectType || ''}
          onChange={(e) => updateFormData({ projectType: e.target.value })}
          required
        >
          <option value="">Select a project type</option>
          <option value="New Installation">Existing measurement device that only needs telemetry</option>
          <option value="Rehabilitation">Existing measurement device that needs rehabilitation and telemetry</option>
          <option value="New Device">New measurement device with new telemetry</option>
          <option value="Self Install">Self Installation of measurement device and/or telemetry</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Name/Title <span className="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            className="input-field"
            value={formData?.projectName || ''}
            onChange={(e) => updateFormData({ projectName: e.target.value })}
            required 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Measurement Type <span className="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            className="input-field" 
            placeholder="e.g., meter/flume/weir"
            value={formData?.deviceType || ''}
            onChange={(e) => updateFormData({ deviceType: e.target.value })}
            required 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Measurement Size
          </label>
          <input 
            type="text" 
            className="input-field" 
            placeholder="throat size, width"
            value={formData?.deviceSize || ''}
            onChange={(e) => updateFormData({ deviceSize: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name of Water Body <span className="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            className="input-field"
            value={formData?.waterBodyName || ''}
            onChange={(e) => updateFormData({ waterBodyName: e.target.value })}
            required 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type of Flow Being Measured <span className="text-red-500">*</span>
          </label>
          <select 
            className="input-field"
            value={formData?.structureType || ''}
            onChange={(e) => updateFormData({ structureType: e.target.value })}
            required
          >
            <option value="">Select...</option>
            <option value="Diversion Canal">Diversion</option>
            <option value="Inflow/Outflow">Inflow/Outflow</option>
            <option value="Return">Return</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Is the project on Tribal land?
          </label>
          <select 
            className="input-field"
            value={formData?.tribalLand || ''}
            onChange={(e) => updateFormData({ tribalLand: e.target.value })}
          >
            <option value="">Select...</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Is the water agricultural irrigation water?
          </label>
          <select className="input-field">
            <option value="">Select...</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Average Flow Rate (cfs)
          </label>
          <input type="number" step="0.1" className="input-field" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Maximum Flow Rate (cfs)
          </label>
          <input type="number" step="0.1" className="input-field" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Channel Width (feet)
          </label>
          <input type="number" step="0.1" className="input-field" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Channel Depth (feet)
          </label>
          <input type="number" step="0.1" className="input-field" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Channel Material
          </label>
          <input type="text" className="input-field" placeholder="e.g., concrete, earth" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Months Flow Will Go Through Device
          </label>
          <input type="number" min="1" max="12" className="input-field" />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Typical Flow Measurement Period
          </label>
          <input type="text" className="input-field" placeholder="e.g., April - October" />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Description, Conditions, and Access Notes <span className="text-red-500">*</span>
          </label>
          <textarea className="input-field" rows={4} required />
        </div>
      </div>
    </div>
  )
}
