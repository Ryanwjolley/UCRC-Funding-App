# UDMT Development Server Launcher
# This script starts both frontend and backend servers for local development

Write-Host ""
Write-Host "🚀 Starting UDMT Development Servers..." -ForegroundColor Cyan
Write-Host ""

# Function to check if port is in use
function Test-Port {
    param($Port)
    $connection = Test-NetConnection -ComputerName localhost -Port $Port -WarningAction SilentlyContinue -InformationLevel Quiet
    return $connection
}

# Check and kill existing processes on ports 3001 and 5173
Write-Host "🔍 Checking for existing server processes..." -ForegroundColor Yellow

$apiPort = 3001
$frontendPort = 5173

if (Test-Port $apiPort) {
    Write-Host "   ⚠️  Port $apiPort is in use. Attempting to free..." -ForegroundColor Yellow
    Get-Process -Id (Get-NetTCPConnection -LocalPort $apiPort -ErrorAction SilentlyContinue).OwningProcess -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 1
}

if (Test-Port $frontendPort) {
    Write-Host "   ⚠️  Port $frontendPort is in use. Attempting to free..." -ForegroundColor Yellow
    Get-Process -Id (Get-NetTCPConnection -LocalPort $frontendPort -ErrorAction SilentlyContinue).OwningProcess -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 1
}

Write-Host "✅ Ports are ready" -ForegroundColor Green
Write-Host ""

# Start backend server in new window
Write-Host "🖥️  Starting Backend API Server (Port $apiPort)..." -ForegroundColor Cyan
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot'; npm run server"

# Wait for backend to initialize
Start-Sleep -Seconds 3

# Start frontend server in new window
Write-Host "🌐 Starting Frontend Dev Server (Port $frontendPort)..." -ForegroundColor Cyan
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot'; npm run dev"

# Wait for frontend to initialize
Start-Sleep -Seconds 2

Write-Host ""
Write-Host "✅ Both servers should now be starting in separate windows!" -ForegroundColor Green
Write-Host ""
Write-Host "📍 Access the application at:" -ForegroundColor White
Write-Host "   Frontend: http://localhost:$frontendPort" -ForegroundColor Cyan
Write-Host "   Backend:  http://localhost:$apiPort" -ForegroundColor Green
Write-Host "   Health:   http://localhost:$apiPort/api/health" -ForegroundColor Yellow
Write-Host ""
Write-Host "📝 Test Credentials:" -ForegroundColor White
Write-Host "   Admin: admin@example.com / admin123" -ForegroundColor Cyan
Write-Host "   User:  applicantA@example.com / user123" -ForegroundColor Cyan
Write-Host ""
Write-Host "💡 Tip: Close both PowerShell windows to stop the servers" -ForegroundColor Gray
Write-Host ""
