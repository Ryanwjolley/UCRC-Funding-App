# UDMT Application Portal

> **Status**: ✅ **PROTOTYPE V1.0 COMPLETE** (October 6, 2025)  
> **See**: [DOCUMENTATION_INDEX.md](./DOCUMENTATION_INDEX.md) for complete documentation guide

A full-stack web application for the Utah Diversion Measurement & Telemetry Program (UDMT), built with React, Express.js, TypeScript, and SQLite.

## 📚 Documentation Quick Links

- **📖 [DOCUMENTATION_INDEX.md](./DOCUMENTATION_INDEX.md)** - Complete documentation guide
- **📋 [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - Feature completion summary & demo script
- **🔄 [UDMT_IMPLEMENTATION_UPDATE.md](./UDMT_IMPLEMENTATION_UPDATE.md)** - Implementation status & deviations
- **🧪 [TEST_REPORT.md](./TEST_REPORT.md)** - Comprehensive testing guide (170+ test cases)
- **🔧 [REFACTORING.md](./REFACTORING.md)** - Code improvement recommendations
- **🖥️ [SERVER_README.md](./SERVER_README.md)** - Backend API documentation

## Overview

This application portal collects eligibility information, project details, water rights/authority, and supporting documents for the UDMT Program - a federally funded initiative between the Upper Colorado River Commission (UCRC) and the Colorado River Authority of Utah.

## ✅ Implemented Features (V1.0)

- 🔐 **JWT Authentication** - Email/password login with role-based access
- 📝 **8-Step Application Wizard** - Complete guided form with progress tracking
- 💾 **Auto-Save** - Automatic draft saving every 2 seconds (fully functional)
- 📊 **User Dashboard** - View, create, edit, and manage applications
- 👨‍💼 **Admin Dashboard** - View and manage all user applications
- 🗺️ **Interactive Map** - Leaflet integration with click-to-place markers
- 🌐 **Dual Basemaps** - Toggle between Street (OSM) and Aerial (Esri) views
- 📍 **GPS Location** - Browser geolocation support
- ✅ **Form Validation** - Real-time validation with step completion indicators
- 🎯 **Clickable Navigation** - Direct navigation to completed steps
- 🚪 **Eligibility Gating** - Steps 3-8 unlock after eligibility completion
- 🎨 **Modern UI** - Clean, accessible design with UCRC Blue branding
- 📱 **Responsive Design** - Works on mobile, tablet, and desktop
- 💾 **SQLite Database** - Full data persistence with REST API
- 🔒 **Role-Based Access** - User vs Admin permissions

## 🚀 Tech Stack

### Frontend
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite 5.4.11
- **Styling:** Tailwind CSS 3.4.17
- **Routing:** React Router 6.28.0
- **Maps:** Leaflet 1.9.4 + React Leaflet 4.2.1
- **Icons:** Lucide React 0.468.0

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js 5.1.0
- **Database:** SQLite (better-sqlite3 12.4.1)
- **Authentication:** JWT (jsonwebtoken 9.0.2)
- **Password Hashing:** bcryptjs 2.4.3
- **CORS:** cors 2.8.5

## 🎯 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Navigate to the project folder:
   ```powershell
   cd "c:\Users\Ryanj\UCRC Funding App"
   ```

2. Install dependencies:
   ```powershell
   npm install
   ```

3. **Start both servers** (frontend + backend):
   ```powershell
   npm run start:all
   ```

   > ✅ **Fixed!** If you experienced freezing with `npm run start:all`, this has been resolved. See [DEV_SERVER_FIX.md](./DEV_SERVER_FIX.md) for details.

   This runs:
   - Frontend on `http://localhost:5173`
   - Backend API on `http://localhost:3001`

### Alternative Start Options

**Option 1: PowerShell script** (opens separate windows):
```powershell
npm run start:windows
```

**Option 2: Run servers separately**

**Frontend only:**
```powershell
npm run dev
```

**Backend only:**
```powershell
npm run server
```

### Test Credentials

```
Admin:     admin@example.com / admin123
User A:    applicantA@example.com / user123
User B:    applicantB@example.com / user123
```

### Verify Server Health

```powershell
curl http://localhost:3001/api/health
```

Expected response:
```json
{"status":"ok","message":"UDMT API Server is running"}
```

## 📦 Building for Production

```powershell
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

### Preview Production Build

```powershell
npm run preview
```

## 🚀 Deployment

### ⚠️ Important: Full-Stack Deployment Required

This application has **two parts** that must be deployed separately:

1. **Frontend** (React/Vite) → Netlify, Vercel, or similar
2. **Backend** (Express/SQLite) → Heroku, Railway, Render, or similar

### Frontend Deployment (Netlify)

#### Quick Deploy
```powershell
# 1. Build the frontend
npm run build

# 2. Deploy to Netlify (drag & drop dist/ folder)
# Go to https://app.netlify.com/drop
```

#### Automated Deployment (Recommended)
1. Push code to GitHub
2. Connect repository in Netlify
3. Build settings (already in `netlify.toml`):
   - Build command: `npm run build`
   - Publish directory: `dist`

#### Configure Environment Variables
After deploying, add in Netlify dashboard:
```
VITE_API_URL=https://your-backend-url.com
```

Then update `src/lib/api.ts`:
```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
```

### Backend Deployment Options

**Option 1: Railway.app** (Easiest)
1. Go to https://railway.app/
2. Deploy from GitHub
3. Set environment variables:
   - `JWT_SECRET=your-secure-secret`
   - `NODE_ENV=production`
   - `CORS_ORIGIN=https://your-netlify-site.netlify.app`

**Option 2: Heroku**
```powershell
heroku create udmt-api
heroku config:set JWT_SECRET=your-production-secret
git push heroku main
```

**Option 3: Render.com** (Free tier available)
1. Create new Web Service
2. Connect GitHub repository
3. Set build command: `npm run server:build`
4. Set start command: `npm run server`

### Production Checklist

Before deploying:
- [ ] Change `JWT_SECRET` to a secure random value
- [ ] Update CORS settings to allow your frontend domain
- [ ] Test production build locally: `npm run build && npm run preview`
- [ ] Remove console.log statements
- [ ] Set up error monitoring (Sentry, etc.)

See **[DEV_SERVER_FIX.md](./DEV_SERVER_FIX.md)** for complete deployment guide.

### Netlify (Frontend Only)

Build settings are configured in `netlify.toml`:
- Build command: `npm run build`
- Publish directory: `dist`

**Note**: Backend requires separate deployment (Node.js hosting like Heroku, Railway, or Render).

## 📁 Project Structure

```
├── src/                        # Frontend React app
│   ├── components/
│   │   ├── wizard/             # 8 wizard step components
│   │   │   ├── WelcomePage.tsx
│   │   │   ├── EligibilityPage.tsx
│   │   │   ├── ApplicantPage.tsx
│   │   │   ├── ProjectPage.tsx
│   │   │   ├── LocationPage.tsx
│   │   │   ├── WaterRightsPage.tsx
│   │   │   ├── SelfInstallPage.tsx
│   │   │   └── ReviewPage.tsx
│   │   └── InteractiveMap.tsx  # Leaflet map component
│   ├── pages/
│   │   ├── Login.tsx           # JWT authentication
│   │   ├── Dashboard.tsx       # User dashboard
│   │   ├── AdminDashboard.tsx  # Admin view
│   │   └── Wizard.tsx          # Multi-step wizard
│   ├── lib/
│   │   ├── api.ts              # API client
│   │   └── utils.ts            # Utilities & validation
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces
│   ├── App.tsx                 # Main app with routing
│   ├── main.tsx               # Entry point
│   └── index.css              # Global styles + Tailwind
├── server/                     # Backend Express API
│   ├── src/
│   │   ├── index.ts           # Express server
│   │   ├── database.ts        # SQLite setup
│   │   ├── seed.ts            # Sample data
│   │   ├── middleware/
│   │   │   └── auth.ts        # JWT verification
│   │   └── routes/
│   │       ├── auth.ts        # Login/register
│   │       └── applications.ts # CRUD endpoints
│   ├── uploads/               # File upload directory
│   └── udmt.db               # SQLite database
├── public/                    # Static assets
├── DOCUMENTATION_INDEX.md     # 📚 Documentation guide
├── UDMT.md                    # Original specification
├── UDMT_IMPLEMENTATION_UPDATE.md # Implementation status
├── PROJECT_SUMMARY.md         # Completion summary
├── TEST_REPORT.md            # Testing guide
├── TESTING.md                # Test strategy
├── REFACTORING.md            # Code improvements
├── SERVER_README.md          # Backend docs
├── index.html                # HTML template
├── vite.config.ts            # Vite config
├── tailwind.config.js        # Tailwind config
├── netlify.toml              # Netlify config
└── package.json              # Dependencies
```

## 🔄 Application Flow

1. **Login** - JWT authentication with email/password
2. **Dashboard** - View applications, create new, edit drafts
3. **8-Step Wizard:**
   - **Step 1**: Welcome & Program Information
   - **Step 2**: Eligibility Checklist (12 requirements)
   - **Step 3**: Applicant Information
   - **Step 4**: Proposed Project Details (4 types)
   - **Step 5**: Location & Photos (Interactive map)
   - **Step 6**: Water Rights & Authority
   - **Step 7**: Self-Installation (Conditional)
   - **Step 8**: Review & Submit
4. **Auto-Save** - Data saves every 2 seconds
5. **Submit** - Application status changes to "Submitted"
6. **Admin** - Admins can view/edit all applications

## 🎨 Design System

### Colors
- **Primary:** UCRC Blue `#004F7C`
- **Success:** Green `#10B981`
- **Error:** Red `#EF4444`
- **Warning:** Amber `#F59E0B`
- **Background:** Gray `#F4F4F4`

### Typography
- **Font:** system-ui (native system fonts)
- **Scale:** Responsive text sizing

### Components
- Cards with rounded corners and shadows
- Primary/secondary button styles
- Form inputs with focus states
- Step completion indicators (red/green/blue)
- Progress bars with connectors

## 🧪 Testing

See **[TEST_REPORT.md](./TEST_REPORT.md)** for comprehensive testing guide.

**Quick Test:**
1. Start servers: `npm run start:all`
2. Open http://localhost:5173
3. Login with test credentials
4. Create new application
5. Fill out wizard - watch auto-save
6. Click on map - verify coordinates
7. Navigate between steps - data persists

## ❌ Not Implemented (V1.0)

## ❌ Not Implemented (V1.0)

These features were in the original spec but not implemented in the prototype:

- ❌ **File Uploads** - UI present but not functional
- ❌ **PDF Generation** - No PDF export on submission
- ❌ **Email Notifications** - No email sending
- ❌ **Application Duplication** - Button present but not functional
- ❌ **Archive Functionality** - No soft-delete/archive
- ❌ **User Registration** - Users pre-seeded in database
- ❌ **Password Reset** - Not implemented
- ❌ **Full Audit Logging** - Database structure ready but not tracking

See **[UDMT_IMPLEMENTATION_UPDATE.md](./UDMT_IMPLEMENTATION_UPDATE.md)** for complete feature comparison.

## 📊 Implementation Status

- **Core Features**: ✅ 75% Complete (12/16 critical features)
- **Modified Features**: 🔶 2 (Auth, Database)
- **Partial Features**: ⚠️ 2 (Audit Logging, Impersonation)
- **Not Implemented**: ❌ 5 (File uploads, PDF, Email, Duplication, Archive)

## 🛠️ Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend dev server (port 5173) |
| `npm run server` | Start backend API server (port 3001) |
| `npm run start:all` | Start both servers concurrently |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

### Environment Variables

Backend uses `server/.env`:
```env
PORT=3001
JWT_SECRET=your-secret-key-change-in-production
```

⚠️ **Security**: Change `JWT_SECRET` before production deployment!

## 🔒 API Endpoints

### Authentication
- `POST /api/auth/login` - Login with credentials
- `GET /api/auth/profile` - Get current user

### Applications (User)
- `GET /api/applications` - Get user's applications
- `GET /api/applications/:id` - Get specific application
- `POST /api/applications` - Create application
- `PUT /api/applications/:id` - Update application
- `POST /api/applications/:id/submit` - Submit application
- `DELETE /api/applications/:id` - Delete application

### Applications (Admin)
- `GET /api/applications/admin/all` - Get all applications

See **[SERVER_README.md](./SERVER_README.md)** for detailed API documentation.

## 🎯 Next Steps for Production

### Priority 1 (Critical - 2 weeks)
- [ ] Implement file uploads (multipart forms + storage)
- [ ] Add PDF generation on submission
- [ ] Set up email notifications (SendGrid/AWS SES)
- [ ] Security hardening (JWT secret, rate limiting, CORS)
- [ ] Environment variable management

### Priority 2 (Important - 4 weeks)
- [ ] Complete audit logging
- [ ] Application duplication feature
- [ ] Archive functionality
- [ ] User registration flow
- [ ] Password reset
- [ ] WCAG AA accessibility audit

### Priority 3 (Nice to Have)
- [ ] Search/filter in admin dashboard
- [ ] Pagination for large datasets
- [ ] Data export (CSV/Excel)
- [ ] Advanced analytics
- [ ] Automated testing suite

See **[REFACTORING.md](./REFACTORING.md)** for technical debt and code improvements.

## 📞 Support

For questions or assistance with the UDMT Program, contact Jones & DeMille Engineering:

- **Roosevelt:** (435) 722-8267
- **Vernal:** (435) 781-1988
- **Monticello:** (435) 587-9100
- **Richfield:** (435) 896-8268
- **Price:** (435) 637-8266

## License

Built for the Upper Colorado River Commission (UCRC) and Colorado River Authority of Utah.
