# Cricket Scoreboard Fullstack Application

A fullstack cricket scoreboard application with FastAPI backend and React frontend.

## Quick Start

### 1. Start PostgreSQL Database

```bash
docker-compose up -d
```

This will start PostgreSQL on port 5432 with:
- Database: `cricket_db`
- Username: `user`
- Password: `password`

### 2. Connect pgAdmin to PostgreSQL

See [PGADMIN_SETUP.md](./PGADMIN_SETUP.md) for detailed instructions on connecting pgAdmin to your PostgreSQL database.

**Quick Connection Details:**
- Host: `localhost`
- Port: `5432`
- Database: `cricket_db`
- Username: `user`
- Password: `password`

### 3. Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend will run on `http://localhost:8000`

### 4. Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend will run on `http://localhost:3000`

## Database Management

- **PostgreSQL**: Running in Docker container `cricket_postgres`
- **pgAdmin**: See [PGADMIN_SETUP.md](./PGADMIN_SETUP.md) for connection instructions
- **Optional Web pgAdmin**: Uncomment the pgAdmin service in `docker-compose.yml` and access at `http://localhost:5050`

## Project Structure

```
.
├── backend/          # FastAPI backend
│   └── app/
│       ├── database.py
│       ├── main.py
│       ├── models.py
│       └── routes/
├── frontend/         # React frontend
│   └── src/
├── docker-compose.yml
└── PGADMIN_SETUP.md
```
