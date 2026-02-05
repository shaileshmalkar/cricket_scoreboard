# PowerShell script to set DATABASE_URL and start backend

# Set DATABASE_URL environment variable for PostgreSQL
$env:DATABASE_URL = "postgresql://user:password@localhost:5432/cricket_db"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Cricket Scoreboard Backend Startup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if PostgreSQL is running
Write-Host "[*] Checking PostgreSQL connection..." -ForegroundColor Yellow
$pgRunning = Test-NetConnection -ComputerName localhost -Port 5432 -InformationLevel Quiet -WarningAction SilentlyContinue

if (-not $pgRunning) {
    Write-Host "[WARNING] PostgreSQL is not running on port 5432!" -ForegroundColor Red
    Write-Host ""
    Write-Host "To start PostgreSQL:" -ForegroundColor Yellow
    Write-Host "  1. Using Docker: docker compose up -d" -ForegroundColor White
    Write-Host "  2. Or install PostgreSQL locally" -ForegroundColor White
    Write-Host ""
    Write-Host "Falling back to SQLite for now..." -ForegroundColor Yellow
    $env:DATABASE_URL = "sqlite:///./cricket_scoreboard.db"
} else {
    Write-Host "[OK] PostgreSQL is running!" -ForegroundColor Green
}

Write-Host ""
Write-Host "DATABASE_URL: $env:DATABASE_URL" -ForegroundColor Cyan
Write-Host ""
Write-Host "[*] Starting FastAPI backend server..." -ForegroundColor Yellow
Write-Host ""

# Start the backend server
Set-Location backend
py -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
