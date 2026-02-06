# 🔧 FIX VERCEL DEPLOYMENT - STEP BY STEP

## The Problem
Vercel is trying to build from the repository root, but your frontend code is in the `frontend/` folder.

## The Solution - Set Root Directory in Vercel

### Step 1: Go to Vercel Dashboard
1. Open: https://vercel.com/dashboard
2. Click on your **cricket-scoreboard** project

### Step 2: Update Project Settings
1. Click **Settings** (top menu)
2. Click **General** (left sidebar)
3. Scroll down to find **Root Directory**
4. Click **Edit** next to Root Directory
5. Type: `frontend` (exactly this, no slash, no quotes)
6. Click **Save**

### Step 3: Clear Cache and Redeploy
1. Still in **Settings → General**
2. Scroll to **Clear Build Cache**
3. Click **Clear Build Cache** button
4. Go to **Deployments** tab (top menu)
5. Find the latest deployment
6. Click the **three dots (⋯)** → **Redeploy**
7. Wait for build to complete

## Alternative: Delete and Re-import Project

If the above doesn't work:

1. **Delete** the project in Vercel dashboard
2. Click **Add New** → **Project**
3. **Import Git Repository** → Select `shaileshmalkar/cricket_scoreboard`
4. **IMPORTANT**: When configuring, set:
   - **Root Directory**: `frontend` ⚠️
   - **Framework Preset**: Leave blank or select "Other"
   - **Build Command**: Leave blank (vercel.json handles it)
   - **Output Directory**: Leave blank (vercel.json handles it)
   - **Install Command**: Leave blank (vercel.json handles it)
5. Click **Deploy**

## Why This Is Needed

Your project structure is:
```
cricket_scoreboard/
├── frontend/          ← Your React app is here
│   ├── src/
│   ├── package.json
│   └── dist/          ← Build output goes here
├── backend/
└── vercel.json
```

Vercel needs to know to build from the `frontend` folder, not the root.

## After Setting Root Directory

Once you set Root Directory to `frontend`, Vercel will:
1. Run `npm install` in the `frontend/` folder
2. Run `npm run build` in the `frontend/` folder  
3. Serve files from `frontend/dist/`

This should fix all deployment failures! ✅
