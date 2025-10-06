# 🚀 UCRC Funding App - Deployment Guide

## Production Deployment Overview

### Architecture
- **Frontend**: Static React app (Netlify)
- **Backend**: Node.js Express + SQLite (Railway)
- **Database**: SQLite file on Railway volume

---

## ✅ Deployed Services

### Backend (Railway)
- **URL**: https://ucrc-funding-backend-production.up.railway.app
- **Health Check**: `/api/health`
- **Status**: ✅ Live
- **Node Version**: 20.x
- **Environment Variables**:
  - `JWT_SECRET`: change-me-production-secret
  - `NODE_ENV`: production
  - `CORS_ORIGIN`: * (update after frontend deploys)
  - `SEED_DB`: false

**Change CORS after frontend deployment:**
```bash
railway variables --set CORS_ORIGIN=https://your-netlify-domain.netlify.app
railway up
```

### Frontend (Netlify)
- **Deployment Method**: Manual drag & drop of `dist/` folder
- **Build Command** (if using Git integration): `npm run build`
- **Publish Directory**: `dist`
- **Environment Variable**: 
  - `VITE_API_BASE_URL=https://ucrc-funding-backend-production.up.railway.app`

---

## 📦 Frontend Build & Deploy

### 1. Build Production Bundle
```bash
# Ensure .env.production exists with:
# VITE_API_BASE_URL=https://ucrc-funding-backend-production.up.railway.app

npm run build
```

### 2. Deploy to Netlify
1. Go to https://app.netlify.com/drop
2. Drag the `dist/` folder into the upload zone
3. Wait for deployment to complete
4. Test the live URL

### 3. (Optional) Claim Site & Setup Auto-Deploy
- Claim the site to get a better domain name
- Connect GitHub repo for automatic deployments
- Add environment variable `VITE_API_BASE_URL` in Netlify settings

---

## 🔒 Post-Deployment Security

### 1. Update CORS to Specific Domain
```bash
railway variables --set CORS_ORIGIN=https://your-actual-netlify-domain.netlify.app
railway up
```

### 2. Rotate JWT Secret
```bash
# Generate a strong 64-character secret
railway variables --set JWT_SECRET=<your-strong-random-secret>
railway up
```
⚠️ Note: This invalidates all existing sessions. Users must log back in.

### 3. Test Production Endpoints
```bash
# Health check
curl https://ucrc-funding-backend-production.up.railway.app/api/health

# Login test
curl -X POST https://ucrc-funding-backend-production.up.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'
```

---

## 🛠️ Local Development

### Start Both Servers
```bash
npm run start:all
```

Or separately:
```bash
# Terminal 1 - Frontend (port 5174)
npm run dev

# Terminal 2 - Backend (port 3001)
npm run server
```

### Test Credentials
```
Admin:  admin@example.com / admin123
User:   applicantA@example.com / user123
```

---

## 📊 Monitoring & Health Checks

### Backend Health
```bash
curl https://ucrc-funding-backend-production.up.railway.app/api/health
```
Expected: `{"status":"ok","message":"UDMT API Server is running"}`

### Check Railway Logs
```bash
railway logs
```

### Check Railway Variables
```bash
railway variables
```

---

## 🔄 Updating Deployments

### Backend Update (Railway)
```bash
# Make code changes, commit, push
git add .
git commit -m "Update backend"
git push

# Deploy to Railway
railway up
```

### Frontend Update (Netlify)
```bash
# Rebuild
npm run build

# Manual: Drag dist/ to Netlify drop
# Or if Git-connected: push to trigger auto-deploy
git add .
git commit -m "Update frontend"
git push
```

---

## 🗄️ Database Management

### Current Setup
- SQLite file stored on Railway ephemeral filesystem
- Seeding disabled in production (`SEED_DB=false`)
- Initial users created automatically on first run

### Backup Database (via Railway CLI)
```bash
# SSH into Railway service
railway ssh

# Copy database file
cat server/udmt.db > /tmp/backup.db

# Download (from local terminal after exiting SSH)
railway run "cat server/udmt.db" > local-backup.db
```

### Reset Database (⚠️ Destructive)
```bash
railway ssh
rm server/udmt.db
exit
railway up  # Restart to recreate with initial users
```

---

## 📁 Project Structure

```
UCRC Funding App/
├── dist/                    # Production frontend build
├── src/                     # React frontend source
│   ├── components/          # UI components
│   ├── pages/               # Route pages
│   ├── lib/                 # API client & utilities
│   └── types/               # TypeScript types
├── server/                  # Backend Express API
│   ├── src/                 # TypeScript source
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Auth middleware
│   │   ├── database.ts      # SQLite setup
│   │   └── seed.ts          # Sample data
│   ├── dist/                # Compiled JS (gitignored)
│   └── udmt.db              # SQLite database (gitignored)
├── .env.production          # Frontend prod env (gitignored)
├── railway.json             # Railway deployment config
├── nixpacks.toml            # Nixpacks build config (Node 20 + python3)
├── package.json             # Dependencies & scripts
└── README.md                # Main project documentation
```

---

## 🚨 Troubleshooting

### Frontend can't reach backend
- Check CORS_ORIGIN matches frontend domain exactly
- Verify VITE_API_BASE_URL is set correctly
- Check Railway backend is running: `railway status`

### Backend crashes on Railway
- Check logs: `railway logs`
- Verify environment variables are set: `railway variables`
- Ensure Node 20.x is being used (check build logs)

### Database resets unexpectedly
- Railway ephemeral storage: database persists during restarts but not redeployments
- For persistence, consider migrating to Railway Postgres or adding a volume

### Build fails on Railway
- Check nixpacks.toml has `python3` (required for better-sqlite3)
- Verify engines.node is set to `20.x` in package.json
- Check build logs for specific errors

---

## 📚 Related Documentation

- **[README.md](./README.md)**: Project overview, features, development setup
- **[SERVER_README.md](./SERVER_README.md)**: Backend API documentation
- **[RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md)**: Detailed Railway setup (reference)
- **[DEV_SERVER_FIX.md](./DEV_SERVER_FIX.md)**: Local development troubleshooting

---

## ✅ Deployment Checklist

- [x] Backend deployed to Railway
- [x] Backend health check passing
- [x] Environment variables configured
- [x] CORS set to wildcard (temporary)
- [x] Seeding disabled in production
- [x] Frontend built with Railway URL
- [ ] Frontend deployed to Netlify
- [ ] CORS updated to specific domain
- [ ] JWT secret rotated to strong value
- [ ] End-to-end testing complete
- [ ] SSL/HTTPS confirmed
- [ ] Custom domain configured (optional)

---

**Last Updated**: October 6, 2025  
**Backend**: https://ucrc-funding-backend-production.up.railway.app  
**Frontend**: [Pending Netlify deployment]
