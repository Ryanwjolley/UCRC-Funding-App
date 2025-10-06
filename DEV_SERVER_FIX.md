# 🎉 UDMT Dev Server Fix Applied

## ✅ Problem Solved

**Issue**: `npm run start:all` was freezing on Windows when using `concurrently` with colored output and named prefixes.

**Root Cause**: Concurrently's output buffering and color formatting was causing the PowerShell terminal to hang on Windows systems.

**Solution**: Changed the concurrently command to use `--raw` flag instead of `--names` and `-c` flags.

---

## 🔧 Changes Made

### 1. **package.json** - Updated `start:all` script
```json
"start:all": "concurrently --kill-others --raw \"npm run dev\" \"npm run server\""
```

**Before**:
```json
"start:all": "concurrently --kill-others --names \"VITE,API\" -c \"blue,green\" \"npm run dev\" \"npm run server\""
```

**Why this works**:
- `--raw` flag passes through output directly without buffering
- No color/name formatting overhead that can cause hangs on Windows
- `--kill-others` ensures all processes stop if one fails

### 2. **start-dev.ps1** - Created PowerShell alternative
Added a native PowerShell script that:
- Checks for port conflicts (3001, 5173)
- Kills existing processes if needed
- Launches servers in separate windows
- Provides clear status messages

---

## 🚀 How to Start Development Now

### Option 1: Using npm (Recommended - Fixed!)
```powershell
npm run start:all
```

This now works correctly and will start:
- Frontend (Vite) on http://localhost:5173
- Backend (Express) on http://localhost:3001

### Option 2: Using PowerShell script (Alternative)
```powershell
npm run start:windows
```

This will open two separate PowerShell windows for frontend and backend.

### Option 3: Manual (Separate Terminals)
**Terminal 1** - Backend:
```powershell
npm run server
```

**Terminal 2** - Frontend:
```powershell
npm run dev
```

---

## ✅ Verification Steps

### 1. Check Backend Health
```powershell
curl http://localhost:3001/api/health
```

Expected response:
```json
{"status":"ok","message":"UDMT API Server is running"}
```

### 2. Open Frontend
Navigate to: http://localhost:5173

### 3. Login
Use test credentials:
- **Admin**: admin@example.com / admin123
- **User**: applicantA@example.com / user123

---

## 🌐 Deploying to Netlify

### Important Note
**Netlify hosts static frontend only**. The backend API (Express.js) requires separate deployment to:
- **Heroku** (easiest for Node.js)
- **Railway.app** (modern alternative)
- **Render.com** (free tier available)
- **AWS EC2/Elastic Beanstalk**
- **DigitalOcean App Platform**

### Frontend Deployment Steps (Netlify)

#### Step 1: Build Production Frontend
```powershell
npm run build
```

This creates `dist/` folder with static files.

#### Step 2: Deploy to Netlify

**Option A: Drag & Drop**
1. Go to https://app.netlify.com/
2. Drag `dist/` folder to Netlify
3. Done! Your frontend is live

**Option B: Netlify CLI**
```powershell
# Install Netlify CLI (if not installed)
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir=dist
```

**Option C: Git Integration** (Recommended for Production)
1. Push code to GitHub/GitLab/Bitbucket
2. Connect repository in Netlify
3. Build settings (already in `netlify.toml`):
   - Build command: `npm run build`
   - Publish directory: `dist`

#### Step 3: Configure Environment Variables in Netlify

After frontend is deployed, you need to point it to your deployed backend:

1. In Netlify dashboard, go to **Site settings** → **Environment variables**
2. Add:
   ```
   VITE_API_URL=https://your-backend-url.com
   ```

3. Update `src/lib/api.ts` to use environment variable:
   ```typescript
   const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
   ```

### Backend Deployment Steps (Example: Heroku)

#### Option 1: Heroku CLI
```powershell
# Install Heroku CLI
# Download from: https://devcenter.heroku.com/articles/heroku-cli

# Login
heroku login

# Create app
heroku create udmt-api

# Set environment variables
heroku config:set JWT_SECRET=your-production-secret-key
heroku config:set NODE_ENV=production

# Deploy
git push heroku main

# Run database migrations (if needed)
heroku run npm run server:build
```

#### Option 2: Railway.app (Easier)
1. Go to https://railway.app/
2. Click "New Project" → "Deploy from GitHub"
3. Select your repository
4. Railway auto-detects Node.js
5. Set environment variables in dashboard
6. Deploy automatically on push

### Required Backend Environment Variables
```env
PORT=3001
JWT_SECRET=your-secure-random-secret-change-this
NODE_ENV=production
DATABASE_URL=./udmt.db (or cloud database URL)
CORS_ORIGIN=https://your-netlify-site.netlify.app
```

---

## 📋 Complete Production Checklist

### Before Deploying

- [ ] Change `JWT_SECRET` in backend `.env`
- [ ] Update CORS settings to allow your Netlify domain
- [ ] Test frontend build locally: `npm run build && npm run preview`
- [ ] Test backend build: `npm run server:build`
- [ ] Remove console.log statements or wrap in `if (process.env.NODE_ENV === 'development')`
- [ ] Set up proper error monitoring (Sentry, LogRocket, etc.)

### After Deploying

- [ ] Test login flow with production URLs
- [ ] Test application creation and submission
- [ ] Test admin dashboard
- [ ] Test auto-save functionality
- [ ] Test interactive map
- [ ] Verify database persistence
- [ ] Set up SSL/HTTPS (usually automatic on Netlify/Heroku)
- [ ] Configure custom domain (optional)

---

## 🐛 Troubleshooting

### Issue: Frontend can't connect to backend after deployment
**Solution**: 
1. Check CORS settings in `server/src/index.ts`
2. Update `VITE_API_URL` in Netlify environment variables
3. Rebuild frontend after updating env vars

### Issue: Database not persisting
**Solution**:
- SQLite file storage is ephemeral on some hosts (Heroku)
- Consider migrating to PostgreSQL for production
- Or use Railway/Render which have persistent filesystems

### Issue: 404 errors on page refresh
**Solution**: Add `_redirects` file to `public/` folder:
```
/*    /index.html   200
```

This is already in the project via `netlify.toml` configuration.

---

## 📚 Related Documentation

- **DOCUMENTATION_INDEX.md** - Master documentation guide
- **PROJECT_SUMMARY.md** - Feature completion summary
- **UDMT_IMPLEMENTATION_UPDATE.md** - Implementation status
- **TEST_REPORT.md** - Testing guide
- **SERVER_README.md** - Backend API documentation

---

## ✅ Summary

**Fixed**: `npm run start:all` now works on Windows without freezing

**Test it now**:
```powershell
npm run start:all
```

Then open http://localhost:5173 and start developing!

For Netlify deployment, remember:
1. Deploy **frontend** to Netlify (`dist/` folder)
2. Deploy **backend** to Heroku/Railway/Render
3. Connect them via environment variables

---

**Fix Applied**: October 6, 2025  
**Status**: ✅ **RESOLVED & TESTED**
