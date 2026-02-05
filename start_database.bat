@echo off
echo Starting PostgreSQL Database...
echo.

REM Check if running as administrator
net session >nul 2>&1
if %errorLevel% == 0 (
    echo Running as Administrator - Good!
    echo.
) else (
    echo ERROR: This script must be run as Administrator!
    echo.
    echo Right-click this file and select "Run as administrator"
    pause
    exit /b 1
)

echo Starting PostgreSQL service...
net start postgresql-x64-15

if %errorLevel% == 0 (
    echo.
    echo SUCCESS: PostgreSQL database is now running!
    echo.
    echo Database is available on port 5432
    echo You can now:
    echo   1. Open pgAdmin and create the cricket_db database
    echo   2. Update backend/app/database.py with your password
    echo   3. Run: py init_db.py
) else (
    echo.
    echo ERROR: Could not start PostgreSQL service
    echo.
    echo Possible reasons:
    echo   - Service is already running
    echo   - PostgreSQL installation is incomplete
    echo   - Service name might be different
    echo.
    echo Checking service status...
    sc query postgresql-x64-15
)

echo.
pause
