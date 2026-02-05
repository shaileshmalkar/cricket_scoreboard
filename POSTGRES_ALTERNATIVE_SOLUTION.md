# Alternative Solution: Use Local PostgreSQL (No Docker Required)

Since Docker is not working, here's how to set up PostgreSQL locally and view tables using pgAdmin desktop application.

## Option 1: Install PostgreSQL Locally (Recommended)

### Step 1: Download and Install PostgreSQL

1. **Download PostgreSQL**:
   - Visit: https://www.postgresql.org/download/windows/
   - Click "Download the installer"
   - Download PostgreSQL 15 or 16

2. **Run the Installer**:
   - During installation, remember these settings:
     - **Port**: `5432` (default)
     - **Username**: `postgres` (default, or create `user`)
     - **Password**: **Set a password** (remember it!)
     - **Locale**: Default (English, United States)

3. **Complete Installation**:
   - The installer will also install pgAdmin 4 (desktop application)
   - Finish the installation

### Step 2: Create Database

After installation, you can create the database in two ways:

#### Method A: Using pgAdmin (Easiest)

1. **Open pgAdmin** (from Start Menu)
2. **Connect to Server**:
   - It will ask for the password you set during installation
   - Enter your PostgreSQL password
3. **Create Database**:
   - Right-click on "Databases" → "Create" → "Database..."
   - **Name**: `cricket_db`
   - Click "Save"

#### Method B: Using Command Line

1. Open **Command Prompt** or **PowerShell**
2. Navigate to PostgreSQL bin folder (usually):
   ```powershell
   cd "C:\Program Files\PostgreSQL\15\bin"
   ```
3. Run:
   ```powershell
   .\psql.exe -U postgres
   ```
4. Enter your password when prompted
5. Create database:
   ```sql
   CREATE DATABASE cricket_db;
   CREATE USER user WITH PASSWORD 'password';
   GRANT ALL PRIVILEGES ON DATABASE cricket_db TO user;
   \q
   ```

### Step 3: Update Backend Database Connection

Update `backend/app/database.py`:

```python
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Update this line with your PostgreSQL password
POSTGRES_PASSWORD = "YOUR_POSTGRES_PASSWORD"  # Change this!

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    f"postgresql://postgres:{POSTGRES_PASSWORD}@localhost:5432/cricket_db"
)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()
```

**OR** if you created the `user` account:

```python
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://user:password@localhost:5432/cricket_db"
)
```

### Step 4: Create Tables

```powershell
cd C:\cricket_scoreboard_fullstack\backend
py init_db.py
```

### Step 5: View Tables in pgAdmin

1. **Open pgAdmin** (desktop application)
2. **Connect to Server** (if not already connected):
   - Enter your PostgreSQL password
3. **Navigate to Tables**:
   - Expand: **Servers** → **PostgreSQL 15** → **Databases** → **cricket_db** → **Schemas** → **public** → **Tables**
4. **View Data**:
   - Right-click on `matches` table
   - Select **"View/Edit Data"** → **"All Rows"**

---

## Option 2: Use Online Database Tools

If you don't want to install PostgreSQL locally, you can use online tools:

### DBeaver (Free, Desktop Application)

1. **Download DBeaver**:
   - Visit: https://dbeaver.io/download/
   - Download Community Edition (free)

2. **Install and Connect**:
   - Install DBeaver
   - Create new connection → PostgreSQL
   - Connect to your database (if you have one running)

---

## Option 3: Check Docker Desktop Status

If you want to use Docker, make sure:

1. **Docker Desktop is Running**:
   - Open Docker Desktop from Start Menu
   - Wait for it to fully start (whale icon in system tray)
   - Status should show "Docker Desktop is running"

2. **Refresh PATH** (after Docker starts):
   - Close and reopen PowerShell
   - Or restart your computer

3. **Start Containers**:
   ```powershell
   cd C:\cricket_scoreboard_fullstack
   docker-compose up -d
   ```

4. **Verify**:
   ```powershell
   docker ps
   ```

---

## Quick Troubleshooting

### PostgreSQL Not Starting
- Check Windows Services: `services.msc`
- Look for "postgresql-x64-15" service
- Start it if it's stopped

### Can't Connect to Database
- Verify PostgreSQL is running
- Check port 5432 is not blocked
- Verify username and password

### pgAdmin Not Opening
- Check if it's installed with PostgreSQL
- Download separately: https://www.pgadmin.org/download/pgadmin-4-windows/

---

## Recommended: Use Local PostgreSQL

For development, **local PostgreSQL is simpler** than Docker:
- ✅ No Docker required
- ✅ Faster startup
- ✅ Easier to manage
- ✅ pgAdmin comes included

Just install PostgreSQL, create the database, update the connection string, and you're ready!
