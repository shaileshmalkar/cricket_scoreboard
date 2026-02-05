# Install Node.js to Start Frontend

## ⚠️ Node.js Required

The frontend server requires Node.js to run. Please install it first.

## Quick Installation

### Option 1: Direct Download (Recommended)
1. Visit: **https://nodejs.org/**
2. Download the **LTS (Long Term Support)** version
3. Run the installer
4. **Restart your terminal/PowerShell** after installation
5. Verify installation:
   ```powershell
   node --version
   npm --version
   ```

### Option 2: Using Chocolatey (if installed)
```powershell
choco install nodejs-lts
```

### Option 3: Using Winget (Windows 10/11)
```powershell
winget install OpenJS.NodeJS.LTS
```

## After Installing Node.js

Once Node.js is installed, run these commands:

```powershell
cd frontend
npm install
npm start
```

The frontend will start on: **http://localhost:3000**

## Current Status

- ✅ Backend: Running on http://localhost:8000
- ⏳ Frontend: Waiting for Node.js installation
