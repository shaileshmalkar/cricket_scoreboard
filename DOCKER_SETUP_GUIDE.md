# Docker Setup Guide - Fix localhost:5050 Not Opening

## Problem: localhost:5050 Not Opening

The pgAdmin web interface at `http://localhost:5050` won't open because **Docker is not installed** or **containers are not running**.

## Solution 1: Install Docker Desktop (Recommended)

### Step 1: Install Docker Desktop

1. **Download Docker Desktop for Windows**:
   - Visit: https://www.docker.com/products/docker-desktop/
   - Click "Download for Windows"
   - Run the installer

2. **Installation Requirements**:
   - Windows 10 64-bit: Pro, Enterprise, or Education (Build 19041 or higher)
   - OR Windows 11 64-bit
   - WSL 2 feature enabled (Docker Desktop will guide you)

3. **After Installation**:
   - Restart your computer if prompted
   - Launch Docker Desktop from Start Menu
   - Wait for Docker to start (whale icon in system tray)

### Step 2: Start PostgreSQL and pgAdmin

Once Docker Desktop is running:

```powershell
cd C:\cricket_scoreboard_fullstack
docker-compose up -d
```

### Step 3: Verify Containers Are Running

```powershell
docker ps
```

You should see:
- `cricket_postgres` (PostgreSQL)
- `cricket_pgadmin` (pgAdmin)

### Step 4: Access pgAdmin

Open your browser and go to: **http://localhost:5050**

Login with:
- **Email**: `admin@admin.com`
- **Password**: `admin`

---

## Solution 2: Use pgAdmin Desktop Application (No Docker Required)

If you don't want to install Docker, you can use pgAdmin desktop application with a local PostgreSQL installation.

### Step 1: Install PostgreSQL Locally

1. **Download PostgreSQL**:
   - Visit: https://www.postgresql.org/download/windows/
   - Download the installer
   - During installation, remember:
     - **Port**: `5432` (default)
     - **Username**: `postgres` (or create `user`)
     - **Password**: Set a password (remember it!)

2. **Create Database**:
   - Open pgAdmin (comes with PostgreSQL)
   - Or use command line:
   ```sql
   CREATE DATABASE cricket_db;
   ```

### Step 2: Install pgAdmin Desktop

If not installed with PostgreSQL:
- Download from: https://www.pgadmin.org/download/pgadmin-4-windows/

### Step 3: Connect to Local PostgreSQL

1. Open pgAdmin desktop application
2. Add New Server:
   - **Host**: `localhost`
   - **Port**: `5432`
   - **Database**: `cricket_db`
   - **Username**: `postgres` (or your username)
   - **Password**: Your PostgreSQL password

### Step 4: Update Backend Database URL

Update `backend/app/database.py`:

```python
DATABASE_URL = "postgresql://postgres:YOUR_PASSWORD@localhost:5432/cricket_db"
```

---

## Solution 3: Use Online Database Tools (Quick Alternative)

If you just want to view tables quickly, you can use online tools:

1. **DBeaver** (Free, Desktop):
   - Download: https://dbeaver.io/download/
   - Connect to PostgreSQL
   - No Docker needed if you have local PostgreSQL

2. **Postico** (Mac) or **pgAdmin Desktop** (Windows)

---

## Quick Troubleshooting Checklist

- [ ] Docker Desktop is installed and running
- [ ] Docker Desktop shows "Docker is running" status
- [ ] Containers are started: `docker ps` shows both containers
- [ ] Port 5050 is not blocked by firewall
- [ ] Browser is trying `http://localhost:5050` (not https)
- [ ] No other application is using port 5050

---

## Verify Docker Installation

After installing Docker Desktop, verify it works:

```powershell
docker --version
docker-compose --version
```

Both commands should show version numbers.

---

## Start Services After Docker Installation

```powershell
# Navigate to project directory
cd C:\cricket_scoreboard_fullstack

# Start containers
docker-compose up -d

# Check status
docker ps

# View logs if issues
docker-compose logs pgadmin
docker-compose logs postgres
```

---

## Still Having Issues?

1. **Check Docker Desktop Status**:
   - Look for Docker icon in system tray
   - Right-click → "Troubleshoot"

2. **Check Container Logs**:
   ```powershell
   docker-compose logs pgadmin
   ```

3. **Restart Containers**:
   ```powershell
   docker-compose down
   docker-compose up -d
   ```

4. **Check Port Availability**:
   ```powershell
   netstat -ano | findstr ":5050"
   ```

---

## Alternative: Use pgAdmin Desktop Only

If Docker continues to be problematic, you can:
1. Install PostgreSQL locally
2. Use pgAdmin desktop application
3. Connect to local PostgreSQL
4. View tables without needing Docker

This is simpler but requires local PostgreSQL installation.
