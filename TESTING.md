# UDMT Application - Testing Documentation

## Testing Checklist

### ✅ 1. Authentication Flow
- [ ] **Login**
  - [ ] Login with valid credentials (admin@example.com / admin123)
  - [ ] Login with valid credentials (applicantA@example.com / user123)
  - [ ] Login with invalid credentials - should show error
  - [ ] JWT token is stored in localStorage
  - [ ] Redirect to dashboard after successful login

- [ ] **Protected Routes**
  - [ ] Unauthenticated users redirected to /login
  - [ ] Authenticated users can access /dashboard
  - [ ] Admin users can access /admin
  - [ ] Non-admin users cannot access /admin (redirect to /dashboard)

- [ ] **Logout**
  - [ ] Token removed from localStorage
  - [ ] Redirect to login page

---

### ✅ 2. Application CRUD Operations
- [ ] **Create Application**
  - [ ] "Start New Application" button works
  - [ ] Creates draft application in database
  - [ ] Redirects to wizard with new application ID
  - [ ] Shows in dashboard applications list

- [ ] **Read/View Application**
  - [ ] Dashboard displays all user's applications
  - [ ] Click "Continue" opens existing draft
  - [ ] Application data loads correctly
  - [ ] Form fields populate with saved data

- [ ] **Update Application**
  - [ ] Auto-save triggers after 2 seconds of inactivity
  - [ ] Manual "Save Draft" button works
  - [ ] Changes persist after navigation
  - [ ] Changes persist after page refresh

- [ ] **Delete Application**
  - [ ] (Not implemented yet - future feature)

---

### ✅ 3. Form Data Persistence (All Steps)
Test that ALL fields save and persist:

- [ ] **Step 1: Welcome**
  - [ ] Read-only page (no form fields)

- [ ] **Step 2: Eligibility**
  - [ ] All 12 checkboxes save state
  - [ ] Checkbox state persists across navigation
  - [ ] All checked = eligibility complete (enables step navigation)

- [ ] **Step 3: Applicant Information**
  - [ ] Primary Contact: name, entityName, phone, email, mailingAddress
  - [ ] Secondary Contact: name, entityName, phone, email, mailingAddress
  - [ ] Program Participation: dmppParticipation

- [ ] **Step 4: Proposed Project**
  - [ ] projectType, projectName, deviceType, deviceSize
  - [ ] waterBodyName, structureType, tribalLand
  - [ ] All additional project fields

- [ ] **Step 5: Location & Photos**
  - [ ] GPS coordinates (latitude, longitude)
  - [ ] Map pin placement updates coordinates
  - [ ] "Use My Location" button works
  - [ ] transbasinDiversion field
  - [ ] locationNotes field

- [ ] **Step 6: Water Rights**
  - [ ] waterRightNumber
  - [ ] waterRightFlowRate
  - [ ] waterRightNotes

- [ ] **Step 7: Self-Installation**
  - [ ] hasDesignDocuments
  - [ ] hasCostEstimate
  - [ ] estimatedCost

- [ ] **Step 8: Review & Submit**
  - [ ] Displays all entered data
  - [ ] Submit button disabled until all steps complete
  - [ ] Submit button enabled when all required fields filled

---

### ✅ 4. Wizard Navigation
- [ ] **Next/Previous Buttons**
  - [ ] "Next" button advances to next step
  - [ ] "Previous" button returns to previous step
  - [ ] Auto-scrolls to top on navigation
  - [ ] Cannot go before step 1
  - [ ] Cannot go past step 8

- [ ] **Progress Bar**
  - [ ] Current step highlighted in blue with ring
  - [ ] Completed steps show green checkmark
  - [ ] Incomplete steps show red alert icon
  - [ ] Progress line fills in for completed steps

- [ ] **Clickable Step Navigation**
  - [ ] Steps 1-2 always clickable
  - [ ] Steps 3-8 locked until eligibility complete
  - [ ] Hover effects work on clickable steps
  - [ ] Disabled steps show "not-allowed" cursor
  - [ ] Tooltips show helpful messages

- [ ] **Step Completion Indicators**
  - [ ] Steps turn green when requirements met
  - [ ] Steps turn red when incomplete
  - [ ] Indicators update in real-time as user types

---

### ✅ 5. Admin Features
- [ ] **Admin Dashboard Access**
  - [ ] Admin user can access /admin
  - [ ] Shows all applications from all users
  - [ ] Displays correct stats (Total, Submitted, Drafts)

- [ ] **Application Management**
  - [ ] View button navigates to application
  - [ ] Edit button navigates to application (drafts only)
  - [ ] View button shown for submitted applications
  - [ ] User info displays correctly (name, email)
  - [ ] Project names display correctly

- [ ] **Admin API**
  - [ ] /api/applications/admin/all endpoint works
  - [ ] Returns user information with applications
  - [ ] Filters by status if provided

---

### ✅ 6. Interactive Map
- [ ] **Map Display**
  - [ ] Map loads correctly with OpenStreetMap tiles
  - [ ] Aerial view toggle works
  - [ ] Default center on Utah (39.32, -111.09)
  - [ ] Map is scrollable and zoomable

- [ ] **Location Features**
  - [ ] Click map to place pin
  - [ ] Pin updates coordinates in form
  - [ ] "Use My Location" button requests GPS
  - [ ] GPS location updates map and coordinates
  - [ ] Coordinates display in form (readonly inputs)

- [ ] **Z-Index Behavior**
  - [ ] Map goes behind sticky header when scrolling
  - [ ] Map doesn't overlap header

---

### ✅ 7. Save & Submit Workflow
- [ ] **Auto-Save**
  - [ ] Triggers 2 seconds after last edit
  - [ ] Shows "Saving..." status
  - [ ] Shows "Saved!" confirmation
  - [ ] Console logs show auto-save activity
  - [ ] Works across all form fields

- [ ] **Manual Save**
  - [ ] "Save Draft" button works
  - [ ] Shows saving status
  - [ ] Application remains in draft status

- [ ] **Submit Application**
  - [ ] "Submit Application" button disabled until complete
  - [ ] Tooltip explains requirements when disabled
  - [ ] Button enables when all steps complete
  - [ ] Submission changes status to "submitted"
  - [ ] Submitted applications show in admin dashboard
  - [ ] Cannot edit submitted applications (unless admin)

---

### ✅ 8. UI/UX Testing
- [ ] **Responsive Design**
  - [ ] Desktop layout works (1920x1080)
  - [ ] Tablet layout works (768x1024)
  - [ ] Mobile layout works (375x667)
  - [ ] Navigation responsive
  - [ ] Forms responsive

- [ ] **Visual Design**
  - [ ] UCRC Blue color scheme (#004F7C)
  - [ ] Consistent spacing and typography
  - [ ] Icons render correctly (Lucide icons)
  - [ ] Cards have proper shadows and borders

- [ ] **Accessibility**
  - [ ] Keyboard navigation works
  - [ ] Focus states visible
  - [ ] ARIA labels present
  - [ ] Required field indicators (red asterisks)

- [ ] **Loading States**
  - [ ] Dashboard shows loading spinner
  - [ ] Wizard shows loading spinner
  - [ ] Admin dashboard shows loading spinner

---

### ✅ 9. Error Handling
- [ ] **API Errors**
  - [ ] Network errors show user-friendly messages
  - [ ] 404 errors handled gracefully
  - [ ] 401 errors redirect to login
  - [ ] 403 errors show access denied

- [ ] **Form Validation**
  - [ ] Required fields marked with red asterisks
  - [ ] Submit blocked if required fields empty
  - [ ] Helpful error messages displayed

- [ ] **Console Errors**
  - [ ] No React errors in console
  - [ ] No TypeScript errors
  - [ ] Only intentional debug logs present

---

### ✅ 10. Database & Backend
- [ ] **Database Schema**
  - [ ] Users table populated with 3 seed users
  - [ ] Applications table stores form_data as JSON
  - [ ] Files table ready for uploads
  - [ ] Audit_log table tracks changes

- [ ] **API Endpoints**
  - [ ] POST /api/auth/login - works
  - [ ] GET /api/auth/profile - works
  - [ ] GET /api/applications - returns user's apps
  - [ ] GET /api/applications/:id - returns single app
  - [ ] POST /api/applications - creates new app
  - [ ] PUT /api/applications/:id - updates app
  - [ ] POST /api/applications/:id/submit - submits app
  - [ ] GET /api/applications/admin/all - returns all apps (admin)

- [ ] **Authentication**
  - [ ] JWT tokens generated correctly
  - [ ] Token verification works
  - [ ] Password hashing works (bcrypt)
  - [ ] Protected routes require valid token

---

## Test Results

### Passed: _____ / _____
### Failed: _____ / _____
### Notes:

---

## Known Issues
1. File uploads not yet implemented
2. Application lifecycle management (review, approval) not implemented
3. Some form fields may need additional validation

---

## Browser Compatibility
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

---

## Performance
- [ ] Initial load time < 2 seconds
- [ ] Page navigation smooth
- [ ] Auto-save doesn't lag input
- [ ] Map interactions smooth
