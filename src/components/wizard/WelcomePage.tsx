import { Info } from 'lucide-react'

export default function WelcomePage() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary mb-4">
          Utah Diversion Measurement & Telemetry Program
        </h2>
        <p className="text-lg text-gray-600">Application Portal</p>
      </div>

      <div className="prose max-w-none">
        <p className="text-gray-700 leading-relaxed">
          The Utah Diversion Measurement and Telemetry Program (the UDMT Program) is a federally funded,
          collaborative initiative between the Upper Colorado River Commission (UCRC) and the Colorado River
          Authority of Utah (Authority) with support from Jones and DeMille Engineering (JDE). The intent of
          this Program is to enhance water monitoring infrastructure across the Upper Colorado River Basin
          within the State of Utah by installing real-time measurement and telemetry devices on diversion
          structures.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-6">
          <div className="flex items-start gap-3">
            <Info className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-primary mb-2">Important Information</h3>
              <p className="text-sm text-gray-700 mb-3">
                Additional information on the program can be found at:{' '}
                <a
                  href="http://www.ucrcommission.com/agencies-programs/utah-diversion-measurement-telemetry-program/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  UCRC Website
                </a>
              </p>
              <p className="text-sm text-gray-700">
                This application portal collects eligibility information, project details, water-rights/authority
                and supporting documents. Data from approved projects will be made publicly available through the
                Utah Division of Water Rights (DWRi) and the UCRC data portal as part of program requirements.
              </p>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
          Jones & DeMille Engineering Support
        </h3>
        <p className="text-gray-700 mb-4">
          Jones and DeMille Engineering (JDE) has been contracted to support the UCRC in the implementation
          of the UDMT Program and is available to assist applicants in submitting applications for their proposed
          projects. If an applicant needs assistance, please reach out to JDE for support.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Roosevelt</h4>
            <p className="text-sm text-gray-600">
              520 West Hwy 40<br />
              Roosevelt, UT 84066<br />
              (435) 722-8267
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Vernal</h4>
            <p className="text-sm text-gray-600">
              38 West 100 North<br />
              Vernal, UT 84078<br />
              (435) 781-1988
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Monticello</h4>
            <p className="text-sm text-gray-600">
              696 North Main<br />
              Monticello, UT 84535<br />
              (435) 587-9100
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Richfield</h4>
            <p className="text-sm text-gray-600">
              1535 South 100 West<br />
              Richfield, UT 84701<br />
              (435) 896-8268
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Price</h4>
            <p className="text-sm text-gray-600">
              1675 South Hwy 10<br />
              Price, UT 84501<br />
              (435) 637-8266
            </p>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 my-6">
          <p className="text-sm text-gray-700">
            <strong>Please note:</strong> UCRC may require applicants to submit additional information which goes
            beyond the scope of what is submitted with this application if the application cannot be fully evaluated
            without the additional information. UCRC may refuse to proceed with evaluating a proposed project if the
            requested additional information is not provided by the applicant. In addition, UCRC may reject an
            application for any or no reason allowed by law.
          </p>
        </div>
      </div>
    </div>
  )
}
