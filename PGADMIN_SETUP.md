# Connecting pgAdmin to PostgreSQL

This guide will help you connect pgAdmin to your PostgreSQL database running in Docker.

## Prerequisites

1. Docker and Docker Compose installed
2. pgAdmin installed on your system
   - Download from: https://www.pgadmin.org/download/

## Step 1: Start PostgreSQL Database

Start the PostgreSQL container using Docker Compose:

```bash
docker-compose up -d
```

Verify the container is running:
```bash
docker ps
```

You should see `cricket_postgres` container running on port 5432.

## Step 2: Connect pgAdmin to PostgreSQL

### Option A: Using pgAdmin Desktop Application

1. **Open pgAdmin**
   - Launch pgAdmin from your applications menu

2. **Add New Server**
   - Right-click on "Servers" in the left panel
   - Select "Register" → "Server..."

3. **General Tab**
   - **Name**: `Cricket Scoreboard DB` (or any name you prefer)

4. **Connection Tab**
   - **Host name/address**: `localhost`
   - **Port**: `5432`
   - **Maintenance database**: `cricket_db`
   - **Username**: `user`
   - **Password**: `password`
   - **Save password**: ✓ (optional, for convenience)

5. **Click "Save"**

### Option B: Using pgAdmin Web Interface (if using Docker)

If you prefer to run pgAdmin in Docker, you can add this to your `docker-compose.yml`:

```yaml
  pgadmin:
    image: dpage/pgadmin4
    container_name: cricket_pgadmin
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@admin.com
      PGADMIN_DEFAULT_PASSWORD: admin
    ports:
      - "5050:80"
    depends_on:
      - postgres
    restart: unless-stopped
```

Then access pgAdmin at: `http://localhost:5050`

**Connection details for web interface:**
- Host: `postgres` (container name, not localhost)
- Port: `5432`
- Database: `cricket_db`
- Username: `user`
- Password: `password`

## Step 3: Verify Connection

Once connected, you should be able to:
- See the `cricket_db` database in the left panel
- Expand it to see tables (after running your application migrations)
- Query and manage your database

## Database Connection Details

- **Host**: `localhost` (for desktop pgAdmin) or `postgres` (for Docker pgAdmin)
- **Port**: `5432`
- **Database**: `cricket_db`
- **Username**: `user`
- **Password**: `password`

## Troubleshooting

### Connection Refused
- Ensure PostgreSQL container is running: `docker ps`
- Check if port 5432 is already in use: `netstat -an | findstr 5432` (Windows)

### Authentication Failed
- Verify username and password match the docker-compose.yml settings
- Default credentials: `user` / `password`

### Cannot Connect
- Restart the container: `docker-compose restart postgres`
- Check container logs: `docker logs cricket_postgres`

## Security Note

⚠️ **Important**: The default credentials (`user`/`password`) are for development only. 
For production, change these values in `docker-compose.yml` and update your `.env` file accordingly.
