# Database Setup - Next Steps

## ✅ PostgreSQL Installed Successfully!

PostgreSQL 15 has been installed on your system. Now you need to complete the setup:

## Step 1: Complete PostgreSQL Installation

The installer may have opened a window asking you to:
1. **Set a password** for the `postgres` user
   - **Remember this password!** You'll need it to connect
   - Write it down somewhere safe

2. **Port**: Use default `5432`

3. **Complete the installation**

## Step 2: Start PostgreSQL Service

PostgreSQL usually starts automatically. To verify:

```powershell
Get-Service | Where-Object {$_.Name -like "*postgresql*"}
```

If it's not running, start it:
```powershell
net start postgresql-x64-15
```

## Step 3: Create Database Using pgAdmin

1. **Open pgAdmin 4** (from Start Menu)
   - It was installed with PostgreSQL

2. **Connect to Server**:
   - Enter the password you set during installation
   - Click "Save Password" if you want

3. **Create Database**:
   - Right-click "Databases" → "Create" → "Database..."
   - **Name**: `cricket_db`
   - Click "Save"

## Step 4: Update Backend Connection

Edit `backend/app/database.py` and replace `YOUR_PASSWORD` with the password you set:

```python
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Replace YOUR_PASSWORD with the password you set during PostgreSQL installation
POSTGRES_PASSWORD = "YOUR_PASSWORD"  # ⚠️ CHANGE THIS!

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    f"postgresql://postgres:{POSTGRES_PASSWORD}@localhost:5432/cricket_db"
)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()
```

## Step 5: Create Tables

```powershell
cd C:\cricket_scoreboard_fullstack\backend
py init_db.py
```

You should see: "✅ Database tables created successfully!"

## Step 6: View Tables in pgAdmin

1. In pgAdmin, expand: **Servers** → **PostgreSQL 15** → **Databases** → **cricket_db** → **Schemas** → **public** → **Tables**
2. You should see the `matches` table
3. Right-click `matches` → **"View/Edit Data"** → **"All Rows"**

---

## Quick Commands

```powershell
# Check if PostgreSQL is running
Get-Service | Where-Object {$_.Name -like "*postgresql*"}

# Start PostgreSQL
net start postgresql-x64-15

# Stop PostgreSQL
net stop postgresql-x64-15

# Check if port 5432 is listening
Get-NetTCPConnection -LocalPort 5432
```

---

## Troubleshooting

### Can't remember password?
- You may need to reset it or reinstall PostgreSQL
- Or check if you saved it during installation

### Service not found?
- PostgreSQL might still be installing
- Wait a few minutes and check again
- Restart your computer if needed

### Can't connect?
- Make sure PostgreSQL service is running
- Check the password in `database.py` matches your PostgreSQL password

---

## Database is Ready! 🎉

Once you complete these steps, your database will be running and you can:
- ✅ Create matches from the frontend
- ✅ View tables in pgAdmin
- ✅ Use the backend API
