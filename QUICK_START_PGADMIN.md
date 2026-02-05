# Quick Start: Access pgAdmin at localhost:5050

## ✅ Docker Desktop Installed!

Now follow these steps:

## Step 1: Launch Docker Desktop

1. **Open Docker Desktop** from your Start Menu
   - Search for "Docker Desktop" and launch it
   - Wait for Docker to fully start (you'll see a whale icon in system tray)
   - Status should show "Docker Desktop is running"

2. **If prompted to restart**: Restart your computer if Docker asks

## Step 2: Start PostgreSQL and pgAdmin

Once Docker Desktop is running, open PowerShell and run:

```powershell
cd C:\cricket_scoreboard_fullstack
docker-compose up -d
```

This will:
- Download PostgreSQL image (first time only)
- Download pgAdmin image (first time only)
- Start both containers

## Step 3: Verify Containers Are Running

```powershell
docker ps
```

You should see two containers:
- `cricket_postgres` (PostgreSQL)
- `cricket_pgadmin` (pgAdmin)

## Step 4: Access pgAdmin

1. Open your web browser
2. Go to: **http://localhost:5050**
3. Login with:
   - **Email**: `admin@admin.com`
   - **Password**: `admin`

## Step 5: Connect to Database

1. In pgAdmin, click **"Add New Server"** (or right-click "Servers" → "Register" → "Server...")
2. **General Tab**: Name it `Cricket Scoreboard DB`
3. **Connection Tab**:
   - **Host**: `postgres` ⚠️ (Use container name, NOT localhost)
   - **Port**: `5432`
   - **Database**: `cricket_db`
   - **Username**: `user`
   - **Password**: `password`
4. Click **"Save"**

## Step 6: Create Tables (First Time)

Before viewing tables, create them:

```powershell
cd C:\cricket_scoreboard_fullstack\backend
py init_db.py
```

## Step 7: View Tables

1. In pgAdmin, expand: **Servers** → **Cricket Scoreboard DB** → **Databases** → **cricket_db** → **Schemas** → **public** → **Tables**
2. Right-click `matches` → **"View/Edit Data"** → **"All Rows"**

---

## Troubleshooting

### Docker Desktop Not Starting
- Make sure WSL 2 is enabled (Docker will guide you)
- Restart your computer if needed
- Check Windows updates

### localhost:5050 Still Not Opening
1. Check if containers are running: `docker ps`
2. Check container logs: `docker-compose logs pgadmin`
3. Restart containers: `docker-compose restart`

### Can't Connect to Database in pgAdmin
- Make sure you're using `postgres` as host (not `localhost`)
- Verify PostgreSQL container is running: `docker ps`
- Check logs: `docker-compose logs postgres`

---

## Quick Commands Reference

```powershell
# Start containers
docker-compose up -d

# Stop containers
docker-compose down

# View running containers
docker ps

# View logs
docker-compose logs pgadmin
docker-compose logs postgres

# Restart containers
docker-compose restart
```
