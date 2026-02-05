# How to Start the Database

## Quick Start Guide

### Option 1: Using Docker (If Docker Desktop is Running)

#### Step 1: Make Sure Docker Desktop is Running

1. **Check Docker Desktop**:
   - Look for the Docker whale icon in your system tray (bottom right)
   - Open Docker Desktop application
   - Wait until it shows **"Docker Desktop is running"**
   - If it's still starting, wait 2-5 minutes

#### Step 2: Start the Database

Open PowerShell in the project directory and run:

```powershell
cd C:\cricket_scoreboard_fullstack
docker-compose up -d
```

This will:
- ✅ Start PostgreSQL database on port 5432
- ✅ Start pgAdmin web interface on port 5050
- ✅ Create the `cricket_db` database

#### Step 3: Verify Database is Running

```powershell
docker ps
```

You should see two containers:
- `cricket_postgres` (PostgreSQL)
- `cricket_pgadmin` (pgAdmin)

#### Step 4: Access Database

**Option A: Using pgAdmin Web Interface**
- Open browser: **http://localhost:5050**
- Login: `admin@admin.com` / `admin`
- Add server: Host `postgres`, Port `5432`, Database `cricket_db`, User `user`, Password `password`

**Option B: Using Command Line**
```powershell
docker exec -it cricket_postgres psql -U user -d cricket_db
```

---

### Option 2: Using Local PostgreSQL (Recommended if Docker Not Working)

#### Step 1: Install PostgreSQL

1. **Download**: https://www.postgresql.org/download/windows/
2. **Install** with default settings
3. **Set a password** (remember it!)
4. **Port**: 5432 (default)

#### Step 2: Start PostgreSQL Service

PostgreSQL usually starts automatically. To check:

1. Press `Windows + R`
2. Type: `services.msc`
3. Find **"postgresql-x64-15"** (or similar)
4. Right-click → **Start** (if not running)

#### Step 3: Create Database

**Using pgAdmin (Easiest)**:
1. Open **pgAdmin 4** from Start Menu
2. Enter your PostgreSQL password
3. Right-click **"Databases"** → **"Create"** → **"Database..."**
4. Name: `cricket_db`
5. Click **"Save"**

**Using Command Line**:
```powershell
# Navigate to PostgreSQL bin folder
cd "C:\Program Files\PostgreSQL\15\bin"

# Connect to PostgreSQL
.\psql.exe -U postgres

# Create database
CREATE DATABASE cricket_db;
CREATE USER user WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE cricket_db TO user;
\q
```

#### Step 4: Update Backend Connection

Edit `backend/app/database.py`:

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

#### Step 5: Create Tables

```powershell
cd C:\cricket_scoreboard_fullstack\backend
py init_db.py
```

---

## Common Commands

### Docker Commands

```powershell
# Start database
docker-compose up -d

# Stop database
docker-compose down

# View running containers
docker ps

# View logs
docker-compose logs postgres
docker-compose logs pgadmin

# Restart database
docker-compose restart
```

### Local PostgreSQL Commands

```powershell
# Start PostgreSQL service
net start postgresql-x64-15

# Stop PostgreSQL service
net stop postgresql-x64-15

# Check if running
Get-Service | Where-Object {$_.Name -like "*postgresql*"}
```

---

## Troubleshooting

### Docker: "Cannot connect to Docker daemon"
**Fix**: Docker Desktop is not running. Launch Docker Desktop and wait for it to start.

### Docker: "Port 5432 already in use"
**Fix**: Another PostgreSQL is running. Stop it or use a different port.

### Local: "Service not found"
**Fix**: PostgreSQL is not installed. Install it first.

### Local: "Password authentication failed"
**Fix**: Check the password in `backend/app/database.py` matches your PostgreSQL password.

---

## Quick Check: Is Database Running?

### For Docker:
```powershell
docker ps | findstr postgres
```

### For Local PostgreSQL:
```powershell
Get-NetTCPConnection -LocalPort 5432 -ErrorAction SilentlyContinue
```

If you see output, the database is running! ✅

---

## Recommended Approach

**If Docker is working**: Use `docker-compose up -d` (easiest)

**If Docker is not working**: Install local PostgreSQL (simpler for development)
