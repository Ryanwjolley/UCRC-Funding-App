import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Step completion validation
export function validateStepCompletion(stepId: number, formData: any): boolean {
  switch (stepId) {
    case 1: // Welcome - always complete after viewing
      return true
    case 2: // Eligibility - all checkboxes must be checked
      return formData.eligibilityChecks?.every((check: boolean) => check) || false
    case 3: // Applicant Info - required fields
      const primary = formData.primaryContact || {}
      return !!(primary.name && primary.phone && primary.mailingAddress && primary.email)
    case 4: // Project - project type and required fields
      return !!(formData.projectType && formData.projectName && formData.waterBodyName)
    case 5: // Location & Photos - coordinates and photos
      return !!(formData.latitude && formData.longitude && formData.transbasinDiversion !== undefined)
    case 6: // Water Rights
      return !!(formData.waterRightNumber && formData.waterRightFlowRate)
    case 7: // Self-Install - conditional based on project type
      return formData.projectType !== 4 || !!(formData.hasDesignDocs !== undefined && formData.hasCostEstimate !== undefined)
    case 8: // Review & Submit - all certifications
      return formData.certifications?.every((cert: boolean) => cert) || false
    default:
      return false
  }
}
