# How to View PostgreSQL Tables

## Quick Access: pgAdmin Web Interface

The easiest way to view your PostgreSQL tables is through the **pgAdmin web interface**.

### Step 1: Start PostgreSQL and pgAdmin

```powershell
docker-compose up -d
```

This will start:
- PostgreSQL on port `5432`
- pgAdmin web interface on port `5050`

### Step 2: Access pgAdmin

1. Open your web browser
2. Go to: **http://localhost:5050**
3. Login with:
   - **Email**: `admin@admin.com`
   - **Password**: `admin`

### Step 3: Connect to PostgreSQL Database

1. In pgAdmin, you'll see **"Add New Server"** or right-click **"Servers"** → **"Register"** → **"Server..."**

2. **General Tab**:
   - **Name**: `Cricket Scoreboard DB` (or any name)

3. **Connection Tab**:
   - **Host name/address**: `postgres` (⚠️ Use container name, NOT localhost)
   - **Port**: `5432`
   - **Maintenance database**: `cricket_db`
   - **Username**: `user`
   - **Password**: `password`
   - ✅ **Save password** (optional)

4. Click **"Save"**

### Step 4: Create Database Tables (First Time Only)

Before viewing tables, you need to create them. Run this command:

```powershell
cd backend
py init_db.py
```

This will create the `matches` table in your database.

### Step 5: View Tables

Once connected:

1. Expand **Servers** → **Cricket Scoreboard DB**
2. Expand **Databases** → **cricket_db**
3. Expand **Schemas** → **public**
4. Expand **Tables**
5. You'll see your tables (e.g., `matches`)

### Step 6: View Table Data

1. Right-click on a table (e.g., `matches`)
2. Select **"View/Edit Data"** → **"All Rows"**
3. Or use the **Query Tool** to run SQL queries:
   - Right-click the database → **"Query Tool"**
   - Type: `SELECT * FROM matches;`
   - Click **Execute** (▶️)

---

## Alternative: Using pgAdmin Desktop Application

If you have pgAdmin desktop installed:

1. **Open pgAdmin** from your applications
2. **Add New Server**:
   - Right-click "Servers" → "Register" → "Server..."
3. **Connection Details**:
   - **Host**: `localhost` (⚠️ Use localhost for desktop app)
   - **Port**: `5432`
   - **Database**: `cricket_db`
   - **Username**: `user`
   - **Password**: `password`
4. **Create tables first** (if not done): Run `py init_db.py` from the backend directory
5. Follow **Step 5** and **Step 6** above to view tables

---

## Database Connection Details Summary

| Setting | Value |
|---------|-------|
| **Host (Web pgAdmin)** | `postgres` |
| **Host (Desktop pgAdmin)** | `localhost` |
| **Port** | `5432` |
| **Database** | `cricket_db` |
| **Username** | `user` |
| **Password** | `password` |

---

## Expected Tables

Based on your models, you should see:
- **matches** - Contains match information (team_a, team_b, overs, status)

---

## Troubleshooting

### Cannot connect to database
- Make sure PostgreSQL is running: Check with `docker ps`
- Verify port 5432 is not blocked
- Check if containers are running: `docker-compose ps`

### Tables not visible
- Tables need to be created first (run database migrations)
- Check if your application has created the tables
- You can create tables manually using SQL in pgAdmin Query Tool

### pgAdmin web interface not loading
- Check if pgAdmin container is running: `docker ps`
- Verify port 5050 is available
- Try accessing: `http://localhost:5050`

---

## Quick SQL Queries

Once connected, you can run these in pgAdmin Query Tool:

```sql
-- View all tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- View matches table structure
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'matches';

-- View all matches
SELECT * FROM matches;
```
