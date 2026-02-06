# Vercel Deployment Instructions

## Quick Fix for 404 Errors

### Step 1: Set Root Directory in Vercel

1. Go to https://vercel.com/dashboard
2. Open your `cricket-scoreboard` project
3. Go to **Settings** → **General**
4. Scroll down to **Root Directory**
5. Set it to: `frontend`
6. Click **Save**

### Step 2: Redeploy

1. Go to **Deployments** tab
2. Click the three dots (⋯) on the latest deployment
3. Click **Redeploy**
4. Wait for build to complete

## Alternative: Delete and Re-import

If the above doesn't work:

1. **Delete** the current project in Vercel
2. Click **Add New** → **Project**
3. **Import** `shaileshmalkar/cricket_scoreboard`
4. When configuring:
   - **Root Directory**: `frontend` ⚠️ **IMPORTANT**
   - **Framework Preset**: Vite (or leave blank)
   - **Build Command**: (leave blank - auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   - **Install Command**: (leave blank - auto-detected)
5. Click **Deploy**

## Current Configuration

- **Root Directory**: Must be set to `frontend` in Vercel dashboard
- **Build Command**: `npm install && npm run build` (runs in frontend folder)
- **Output Directory**: `dist` (relative to frontend folder)
- **Framework**: Vite

The `vercel.json` file is configured to work when root directory is set to `frontend`.
