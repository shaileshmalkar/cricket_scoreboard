# Fix Error 126 - Vercel Build Issue

## Problem
Error 126: "Command invoked cannot execute" - The `cd frontend &&` syntax doesn't work in Vercel's build environment.

## Solution

I've updated `vercel.json` to remove the `cd` command. Instead, you need to configure Vercel to use the `frontend` directory as the root.

### Option 1: Set Root Directory in Vercel Dashboard (Recommended)

1. Go to your Vercel project: https://vercel.com/shailesh-malkars-projects/cricket-scoreboard
2. Click **"Settings"** → **"General"**
3. Find **"Root Directory"**
4. Click **"Edit"**
5. Set to: `frontend`
6. Click **"Save"**

Now Vercel will:
- Run all commands from the `frontend` directory
- Use `npm install` (no `cd` needed)
- Use `npm run build` (no `cd` needed)
- Output to `dist` (relative to frontend)

### Option 2: Use Updated vercel.json

I've updated `vercel.json` to remove the `cd` commands. But you still need to set the Root Directory in Vercel dashboard to `frontend`.

### Vercel Settings Summary

**In Vercel Dashboard → Settings → General:**
- **Root Directory**: `frontend`

**Build Settings (auto-detected or manual):**
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## Why This Works

Vercel's build environment doesn't support `cd` in the build command the same way a shell does. Instead:
- Set **Root Directory** to `frontend` in Vercel settings
- All commands run from that directory automatically
- No need for `cd` commands

## Next Steps

1. ✅ I've updated `vercel.json` (removed `cd` commands)
2. ⏳ **You need to**: Set Root Directory to `frontend` in Vercel dashboard
3. ⏳ Push the updated `vercel.json` to GitHub
4. ⏳ Redeploy on Vercel

Let me push the updated vercel.json now.
