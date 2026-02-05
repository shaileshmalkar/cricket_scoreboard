# Start PostgreSQL Database Script
# Right-click and "Run with PowerShell" as Administrator

Write-Host "Starting PostgreSQL Database..." -ForegroundColor Cyan
Write-Host ""

# Check if running as administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "ERROR: This script must be run as Administrator!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Right-click this file and select 'Run with PowerShell' as Administrator" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "Running as Administrator - Good!" -ForegroundColor Green
Write-Host ""

# Try to start the service
Write-Host "Starting PostgreSQL service..." -ForegroundColor Yellow
try {
    Start-Service postgresql-x64-15 -ErrorAction Stop
    Write-Host ""
    Write-Host "SUCCESS: PostgreSQL database is now running!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Database is available on port 5432" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "  1. Open pgAdmin and create the cricket_db database"
    Write-Host "  2. Update backend/app/database.py with your PostgreSQL password"
    Write-Host "  3. Run: py init_db.py"
    Write-Host ""
    
    # Verify it's running
    Start-Sleep -Seconds 2
    $service = Get-Service postgresql-x64-15 -ErrorAction SilentlyContinue
    if ($service -and $service.Status -eq 'Running') {
        Write-Host "Service Status: $($service.Status)" -ForegroundColor Green
        
        # Check port
        $port = Get-NetTCPConnection -LocalPort 5432 -ErrorAction SilentlyContinue
        if ($port) {
            Write-Host "Port 5432 is listening - Database is ready!" -ForegroundColor Green
        }
    }
} catch {
    Write-Host ""
    Write-Host "ERROR: Could not start PostgreSQL service" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host ""
    Write-Host "Checking service status..." -ForegroundColor Yellow
    Get-Service postgresql-x64-15 -ErrorAction SilentlyContinue | Format-Table Name, Status, StartType
}

Write-Host ""
Read-Host "Press Enter to exit"
