export interface Application {
  id: string
  userId: string
  status: 'Draft' | 'Submitted'
  projectName: string
  applicantName: string
  applicantEmail: string
  createdAt: Date
  updatedAt: Date
  submittedAt?: Date
  data: {
    // Page 2: Eligibility
    eligibilityChecks: boolean[]
    
    // Page 3: Applicant
    primaryContact: {
      name: string
      entityName?: string
      phone: string
      mailingAddress: string
      email: string
    }
    secondaryContact?: {
      name: string
      entityName?: string
      phone: string
      mailingAddress: string
      email: string
    }
    participatingDMPP: boolean
    participatedSCPP: boolean
    scppYear?: string
    hasScada: boolean
    scadaDescription?: string
    willingToPartner: boolean
    partnerName?: string
    qualifiedSelfInstall: boolean
    hasSamNumber: boolean
    installQualifications?: string
    
    // Page 4: Project
    projectType: 1 | 2 | 3 | 4
    projectName: string
    measurementType?: string
    measurementSize?: string
    waterBodyName: string
    flowType: string
    onTribalLand: boolean
    deviceMaterial?: string
    agriculturalWater: boolean
    averageFlowRate: number
    flowMeasurementPeriod: string
    maxFlowRate: number
    channelWidth: number
    channelDepth: number
    channelMaterial: string
    flowRange: { min: number; max: number }
    monthsOfOperation: number
    accessRoadImprovements: boolean
    accessDescription?: string
    projectDescription: string
    
    // Page 5: Location
    latitude: number
    longitude: number
    transbasinDiversion: boolean
    locationNotes: string
    photos: {
      upstream: File[]
      downstream: File[]
      side1: File[]
      side2: File[]
      siteAccess: File[]
    }
    
    // Page 6: Water Rights
    waterRightNumber: string
    waterRightFlowRate: string
    waterRightNotes: string
    waterRightDocs?: File[]
    
    // Page 7: Self-Install
    hasDesignDocs: boolean
    designDocs?: File[]
    hasCostEstimate: boolean
    costEstimateDocs?: File[]
    estimatedCost?: number
    
    // Page 8: Review
    certifications: boolean[]
  }
}

export interface User {
  id: string
  email: string
  name: string
  role: 'user' | 'admin' | 'superadmin'
  createdAt: Date
}
