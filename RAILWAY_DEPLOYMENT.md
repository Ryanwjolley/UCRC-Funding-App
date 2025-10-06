# 🚂 Railway Deployment - Step-by-Step Guide

## ✅ Pre-Deployment Checklist (DONE!)

I've already prepared your code:
- ✅ Added `server:start` script to package.json
- ✅ Updated CORS to use environment variable
- ✅ Created `.env.example` template
- ✅ Created `railway.json` configuration

---

## 📋 Step-by-Step Railway Deployment

### Step 1: Create Railway Account (2 minutes)

1. **Go to**: https://railway.app
2. **Click**: "Login" (top right)
3. **Sign in with**: GitHub (recommended) or Email
4. **Authorize**: Railway to access your GitHub repos
5. **You're in!** You'll see the Railway dashboard

---

### Step 2: Push Your Code to GitHub (5 minutes)

**If you haven't already**, you need your code on GitHub:

```powershell
# Initialize git (if not already)
cd "c:\Users\Ryanj\UCRC Funding App"
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial UDMT app with Railway config"

# Create new repo on GitHub:
# 1. Go to https://github.com/new
# 2. Name it: "udmt-funding-app"
# 3. Keep it public or private (your choice)
# 4. Don't add README or .gitignore (you have them)
# 5. Click "Create repository"

# Then link and push:
git remote add origin https://github.com/YOUR-USERNAME/udmt-funding-app.git
git branch -M main
git push -u origin main
```

**Already on GitHub?** Skip to Step 3!

---

### Step 3: Deploy to Railway (5 minutes)

#### 3.1 Create New Project
1. In Railway dashboard, click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. **Choose**: Your `udmt-funding-app` repository
4. Railway will detect it's a Node.js app

#### 3.2 Configure Build Settings
Railway should auto-detect, but verify:
- **Build Command**: `npm install && npm run server:build`
- **Start Command**: `npm run server:start`
- **Root Directory**: `/` (leave blank)

#### 3.3 Add Environment Variables
Click **"Variables"** tab and add:

```
JWT_SECRET=CHANGE-THIS-TO-A-LONG-RANDOM-STRING-abc123xyz789
NODE_ENV=production
CORS_ORIGIN=*
```

**Important**: Change `JWT_SECRET` to something random and secure!
Example: `JWT_SECRET=7k9Lm2Pq5Rw8Tx4Vy6Az3Bc1Df0Gh9Jl`

#### 3.4 Deploy!
1. Click **"Deploy"** button
2. Watch the logs (you'll see build progress)
3. Wait 2-3 minutes for first deploy

---

### Step 4: Get Your Backend URL (1 minute)

1. Once deployed, click **"Settings"** tab
2. Find **"Domains"** section
3. Click **"Generate Domain"**
4. Railway gives you a URL like:
   ```
   https://udmt-backend-production-abcd.up.railway.app
   ```
5. **Copy this URL** - you'll need it!

---

### Step 5: Test Your Backend (1 minute)

Test the health endpoint:
```powershell
curl https://your-railway-url.up.railway.app/api/health
```

Expected response:
```json
{"status":"ok","message":"UDMT API Server is running"}
```

✅ **If you see this, your backend is LIVE!**

---

### Step 6: Update Frontend to Use Railway Backend (3 minutes)

Now we need to connect your frontend to the Railway backend.

**Option A: Quick Method (Edit code)**
```powershell
# I'll do this for you - just tell me your Railway URL!
```

**Option B: Environment Variable (Better for production)**
You'll set this in Netlify later.

---

## 🎉 After Deployment

Your backend will:
- ✅ Run 24/7 on Railway
- ✅ Auto-restart if it crashes
- ✅ Have persistent SQLite database
- ✅ Be accessible from anywhere
- ✅ Use HTTPS automatically

---

## 💰 Railway Pricing

**Free Tier**:
- $5 in free credits/month
- Enough for ~500 hours/month
- Great for testing and demos

**After Free Credits**:
- ~$5-10/month depending on usage
- Only charged for what you use
- Can set spending limits

---

## 🔧 Troubleshooting

### Build Failed?
- Check the logs in Railway dashboard
- Verify `server:build` script works locally
- Make sure all dependencies are in package.json

### Server Won't Start?
- Check environment variables are set
- Verify `server:start` script works locally
- Look for error messages in Railway logs

### CORS Errors?
- Update `CORS_ORIGIN` in Railway variables
- Set it to your Netlify URL once deployed

---

## 📊 What Happens Next?

Once your Railway backend is deployed:
1. ✅ Copy the Railway URL
2. ✅ Update frontend API configuration
3. ✅ Rebuild frontend: `npm run build`
4. ✅ Deploy frontend to Netlify
5. 🎉 **Complete working app accessible 24/7!**

---

## 🚀 Quick Summary

```
1. Sign up at railway.app (use GitHub)
2. New Project → Deploy from GitHub
3. Choose your repository
4. Add environment variables (JWT_SECRET, NODE_ENV, CORS_ORIGIN)
5. Deploy and wait 2-3 minutes
6. Generate domain and copy URL
7. Test health endpoint
8. Update frontend with Railway URL
```

**Total Time**: ~15 minutes
**Cost**: $0 (free $5 credits)
**Result**: Backend running 24/7!

---

**Ready to start?** I'll guide you through each step!

**Got your Railway URL?** Tell me and I'll update the frontend immediately!
