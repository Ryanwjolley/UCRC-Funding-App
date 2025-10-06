interface ApplicantPageProps {
  formData: any
  updateFormData: (data: any) => void
}

export default function ApplicantPage({ formData, updateFormData }: ApplicantPageProps) {
  const primaryContact = formData?.primaryContact || {}
  const secondaryContact = formData?.secondaryContact || {}

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Applicant Information</h2>
        <p className="text-gray-600">Contact details and program-related capabilities.</p>
      </div>

      {/* Primary Contact */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Primary Contact for Project</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              className="input-field" 
              value={primaryContact.name || ''}
              onChange={(e) => updateFormData({ 
                primaryContact: { ...primaryContact, name: e.target.value }
              })}
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Entity Name (if applicable)
            </label>
            <input 
              type="text" 
              className="input-field"
              value={primaryContact.entityName || ''}
              onChange={(e) => updateFormData({ 
                primaryContact: { ...primaryContact, entityName: e.target.value }
              })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone <span className="text-red-500">*</span>
            </label>
            <input 
              type="tel" 
              className="input-field"
              value={primaryContact.phone || ''}
              onChange={(e) => updateFormData({ 
                primaryContact: { ...primaryContact, phone: e.target.value }
              })}
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input 
              type="email" 
              className="input-field"
              value={primaryContact.email || ''}
              onChange={(e) => updateFormData({ 
                primaryContact: { ...primaryContact, email: e.target.value }
              })}
              required 
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mailing Address <span className="text-red-500">*</span>
            </label>
            <textarea 
              className="input-field" 
              rows={3}
              value={primaryContact.mailingAddress || ''}
              onChange={(e) => updateFormData({ 
                primaryContact: { ...primaryContact, mailingAddress: e.target.value }
              })}
              required 
            />
          </div>
        </div>
      </div>

      {/* Secondary Contact */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Secondary Contact for Project (Optional)
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input 
              type="text" 
              className="input-field"
              value={secondaryContact.name || ''}
              onChange={(e) => updateFormData({ 
                secondaryContact: { ...secondaryContact, name: e.target.value }
              })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Entity Name (if applicable)
            </label>
            <input 
              type="text" 
              className="input-field"
              value={secondaryContact.entityName || ''}
              onChange={(e) => updateFormData({ 
                secondaryContact: { ...secondaryContact, entityName: e.target.value }
              })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input 
              type="tel" 
              className="input-field"
              value={secondaryContact.phone || ''}
              onChange={(e) => updateFormData({ 
                secondaryContact: { ...secondaryContact, phone: e.target.value }
              })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input 
              type="email" 
              className="input-field"
              value={secondaryContact.email || ''}
              onChange={(e) => updateFormData({ 
                secondaryContact: { ...secondaryContact, email: e.target.value }
              })}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mailing Address
            </label>
            <textarea 
              className="input-field" 
              rows={3}
              value={secondaryContact.mailingAddress || ''}
              onChange={(e) => updateFormData({ 
                secondaryContact: { ...secondaryContact, mailingAddress: e.target.value }
              })}
            />
          </div>
        </div>
      </div>

      {/* Program Participation */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Program Participation</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Are you currently participating in the Utah Demand Management Pilot Program (DMPP)?
          </label>
          <select 
            className="input-field"
            value={formData?.dmppParticipation || ''}
            onChange={(e) => updateFormData({ dmppParticipation: e.target.value })}
          >
            <option>Select an option</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Have you participated or intend to participate in the System Conservation Pilot Program (SCPP)?
          </label>
          <select className="input-field">
            <option>Select an option</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Do you have an existing SCADA or telemetry system?
          </label>
          <select className="input-field">
            <option>Select an option</option>
            <option>Yes</option>
            <option>No</option>
          </select>
          <p className="text-sm text-gray-500 mt-1">
            *A SCADA system is not required to receive funding
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Are you qualified & interested in self-installing part or all of the proposed project?
          </label>
          <select className="input-field">
            <option>Select an option</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
      </div>
    </div>
  )
}
