# Start Database - Quick Guide

## ✅ PostgreSQL is Installed!

The PostgreSQL service `postgresql-x64-15` is installed but needs to be started with administrator privileges.

## How to Start the Database

### Option 1: Using PowerShell as Administrator (Recommended)

1. **Right-click on PowerShell** in Start Menu
2. Select **"Run as Administrator"**
3. Run these commands:

```powershell
# Start PostgreSQL service
net start postgresql-x64-15

# Verify it's running
Get-Service postgresql-x64-15
```

You should see `Status: Running`

### Option 2: Using Services Window

1. Press `Windows + R`
2. Type: `services.msc` and press Enter
3. Find **"postgresql-x64-15"** in the list
4. Right-click → **"Start"**
5. Wait a few seconds

### Option 3: Check if Already Running

The service might already be running. Check:

```powershell
Get-Service postgresql-x64-15
```

If Status shows "Running", the database is already started! ✅

## Verify Database is Running

After starting, verify:

```powershell
# Check service status
Get-Service postgresql-x64-15

# Check if port 5432 is listening
Get-NetTCPConnection -LocalPort 5432
```

If you see port 5432 listening, the database is running! ✅

## Next Steps After Starting

1. **Create Database** (if not done):
   - Open pgAdmin 4
   - Create database: `cricket_db`

2. **Update Backend Connection**:
   - Edit `backend/app/database.py` with your PostgreSQL password

3. **Create Tables**:
   ```powershell
   cd C:\cricket_scoreboard_fullstack\backend
   py init_db.py
   ```

## Quick Status Check

Run this to see if database is running:

```powershell
Get-Service postgresql-x64-15 | Format-Table Name,Status,StartType
Get-NetTCPConnection -LocalPort 5432 -ErrorAction SilentlyContinue | Select-Object LocalPort,State
```

---

## Troubleshooting

### "Access is denied"
- You need to run PowerShell as Administrator
- Right-click PowerShell → "Run as Administrator"

### "Service does not exist"
- PostgreSQL installation might not be complete
- Restart your computer and try again

### Service won't start
- Check Windows Event Viewer for errors
- Make sure PostgreSQL installation completed successfully

---

**The database will start automatically on boot once you start it the first time (if set to Automatic).**
