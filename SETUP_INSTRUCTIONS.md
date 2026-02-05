# Setup Instructions

## Current Status

✅ **Backend Server**: Starting on `http://localhost:8000`
- Python dependencies installed
- Server should be running

❌ **Frontend Server**: Node.js not found
- Node.js needs to be installed to run the frontend

## Backend Server

The backend server is running using:
```bash
py -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Access it at: `http://localhost:8000`
API docs at: `http://localhost:8000/docs`

## Frontend Server Setup

### Install Node.js

1. **Download Node.js**:
   - Visit: https://nodejs.org/
   - Download the LTS (Long Term Support) version
   - Run the installer

2. **Verify Installation**:
   ```powershell
   node --version
   npm --version
   ```

3. **Install Frontend Dependencies**:
   ```powershell
   cd frontend
   npm install
   ```

4. **Start Frontend Server**:
   ```powershell
   npm start
   ```

   The frontend will run on: `http://localhost:3000`

## Alternative: Manual Terminal Commands

If you prefer to run servers manually in separate terminals:

### Terminal 1 - Backend:
```powershell
cd C:\cricket_scoreboard_fullstack\backend
py -m uvicorn app.main:app --reload
```

### Terminal 2 - Frontend (after installing Node.js):
```powershell
cd C:\cricket_scoreboard_fullstack\frontend
npm install
npm start
```

## PostgreSQL Database

Make sure PostgreSQL is running:
```powershell
docker-compose up -d
```

Check status:
```powershell
docker ps
```
