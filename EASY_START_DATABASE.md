# Easy Way to Start Database - I've Created Scripts For You!

## ✅ I've Created Start Scripts!

I've created two scripts in your project folder that will start the database:

1. **`start_database.bat`** - Double-click to run
2. **`start_database.ps1`** - PowerShell script

## 🚀 Easiest Way to Start Database

### Method 1: Use the Batch File (Easiest!)

1. **Go to your project folder**: `C:\cricket_scoreboard_fullstack`
2. **Find**: `start_database.bat`
3. **Right-click** on `start_database.bat`
4. **Select**: "Run as administrator"
5. **Click "Yes"** when Windows asks for permission
6. **Done!** The database will start

### Method 2: Use PowerShell Script

1. **Right-click** on `start_database.ps1`
2. **Select**: "Run with PowerShell" (as Administrator)
3. **Click "Yes"** when Windows asks for permission
4. **Done!**

### Method 3: Manual Command (If Scripts Don't Work)

1. **Right-click** on PowerShell in Start Menu
2. **Select**: "Run as Administrator"
3. **Run**:
   ```powershell
   net start postgresql-x64-15
   ```

## ✅ Verify Database is Running

After running the script, verify:

```powershell
Get-Service postgresql-x64-15
```

You should see: `Status: Running`

## 🔍 Check if Database is Already Running

The database might already be running! Check:

```powershell
Get-Service postgresql-x64-15
Get-NetTCPConnection -LocalPort 5432
```

If you see port 5432 listening, the database is already started! ✅

## 📝 What the Scripts Do

The scripts I created will:
- ✅ Check if you're running as administrator
- ✅ Start the PostgreSQL service
- ✅ Verify it's running
- ✅ Show you the next steps

## ⚠️ If Scripts Don't Work

If the scripts show errors, it might mean:
1. PostgreSQL installation isn't complete
2. Service name is different
3. PostgreSQL needs to be configured first

**Solution**: Complete the PostgreSQL installation wizard if it's still open, or reinstall PostgreSQL.

---

## 🎯 Quick Summary

**Just right-click `start_database.bat` → "Run as administrator" → Done!**

The scripts are ready in your project folder. Just run one of them as administrator and the database will start!
