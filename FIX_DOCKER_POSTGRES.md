# Fix: Cannot Open PostgreSQL - Step by Step Solution

## Problem: Docker is installed but not working

Docker Desktop is installed but not accessible because:
1. Docker Desktop is not running
2. PATH needs to be refreshed
3. Docker Desktop needs to be launched

## Solution: Start Docker Desktop and Containers

### Step 1: Launch Docker Desktop

**Option A: Manual Launch**
1. Press `Windows Key`
2. Type "Docker Desktop"
3. Click on "Docker Desktop" to launch it
4. **Wait 1-2 minutes** for Docker to fully start
5. Look for the Docker whale icon in your system tray (bottom right)
6. When it shows "Docker Desktop is running", proceed to Step 2

**Option B: From File Explorer**
1. Open File Explorer
2. Navigate to: `C:\Program Files\Docker\Docker\`
3. Double-click `Docker Desktop.exe`
4. Wait for it to start

### Step 2: Verify Docker is Running

After Docker Desktop starts, open a **NEW PowerShell window** (important: close and reopen PowerShell) and run:

```powershell
docker --version
```

You should see: `Docker version XX.XX.X, build ...`

If you still get an error, restart your computer after Docker Desktop installation.

### Step 3: Start PostgreSQL and pgAdmin

Once Docker is working, run:

```powershell
cd C:\cricket_scoreboard_fullstack
docker-compose up -d
```

This will:
- Download PostgreSQL image (first time, takes 2-3 minutes)
- Download pgAdmin image (first time, takes 1-2 minutes)
- Start both containers

### Step 4: Verify Containers Are Running

```powershell
docker ps
```

You should see:
```
CONTAINER ID   IMAGE              STATUS
xxxxx          postgres:15-alpine Up X minutes
xxxxx          dpage/pgadmin4    Up X minutes
```

### Step 5: Access pgAdmin

1. Open your web browser
2. Go to: **http://localhost:5050**
3. Login:
   - **Email**: `admin@admin.com`
   - **Password**: `admin`

### Step 6: Connect to PostgreSQL in pgAdmin

1. In pgAdmin, click **"Add New Server"**
2. **General Tab**: Name it `Cricket DB`
3. **Connection Tab**:
   - **Host**: `postgres` ⚠️ (NOT localhost!)
   - **Port**: `5432`
   - **Database**: `cricket_db`
   - **Username**: `user`
   - **Password**: `password`
4. Click **"Save"**

### Step 7: Create Tables

```powershell
cd C:\cricket_scoreboard_fullstack\backend
py init_db.py
```

### Step 8: View Tables

In pgAdmin:
1. Expand: **Servers** → **Cricket DB** → **Databases** → **cricket_db** → **Schemas** → **public** → **Tables**
2. Right-click `matches` → **"View/Edit Data"** → **"All Rows"**

---

## Alternative: Use Local PostgreSQL (Easier!)

If Docker continues to be problematic, **install PostgreSQL locally**:

### Quick Install Steps:

1. **Download PostgreSQL**:
   - https://www.postgresql.org/download/windows/
   - Install with default settings
   - **Remember your password!**

2. **Create Database**:
   - Open pgAdmin (comes with PostgreSQL)
   - Right-click "Databases" → "Create" → "Database..."
   - Name: `cricket_db`

3. **Update Backend**:
   - Edit `backend/app/database.py`
   - Change connection string to use your local PostgreSQL password

4. **Create Tables**:
   ```powershell
   cd backend
   py init_db.py
   ```

5. **View in pgAdmin**:
   - pgAdmin desktop app
   - Navigate to tables as shown above

---

## Common Issues & Fixes

### Issue: "docker: command not found"
**Fix**: 
- Make sure Docker Desktop is running
- Close and reopen PowerShell
- Restart computer if needed

### Issue: "Cannot connect to Docker daemon"
**Fix**:
- Docker Desktop is not running
- Launch Docker Desktop and wait for it to start

### Issue: "Port 5050 already in use"
**Fix**:
```powershell
# Stop existing containers
docker-compose down

# Start again
docker-compose up -d
```

### Issue: "localhost:5050 not opening"
**Fix**:
1. Check if pgAdmin container is running: `docker ps`
2. Check logs: `docker-compose logs pgadmin`
3. Restart: `docker-compose restart pgadmin`

---

## Quick Commands Reference

```powershell
# Check Docker version
docker --version

# Start containers
docker-compose up -d

# View running containers
docker ps

# View logs
docker-compose logs pgadmin
docker-compose logs postgres

# Stop containers
docker-compose down

# Restart containers
docker-compose restart
```

---

## Still Having Issues?

**Try the local PostgreSQL option** - it's simpler and doesn't require Docker!

See `POSTGRES_ALTERNATIVE_SOLUTION.md` for detailed local PostgreSQL setup.
