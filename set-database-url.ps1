# Set DATABASE_URL environment variable permanently for current user

$databaseUrl = "postgresql://user:password@localhost:5432/cricket_db"

# Set for current session
$env:DATABASE_URL = $databaseUrl

# Set permanently for current user
[System.Environment]::SetEnvironmentVariable("DATABASE_URL", $databaseUrl, "User")

Write-Host "========================================" -ForegroundColor Green
Write-Host "DATABASE_URL Environment Variable Set" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Current session: $env:DATABASE_URL" -ForegroundColor Cyan
Write-Host "Permanent (User): $databaseUrl" -ForegroundColor Cyan
Write-Host ""
Write-Host "Note: You may need to restart your terminal or IDE" -ForegroundColor Yellow
Write-Host "      for the permanent setting to take effect." -ForegroundColor Yellow
Write-Host ""
