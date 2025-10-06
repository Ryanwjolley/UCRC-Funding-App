Param(
    [string]$NetlifySiteName = "",
    [switch]$Force
)

Write-Host "=== UCRC Frontend Deployment Wizard ===" -ForegroundColor Cyan

# 1. Check Netlify CLI
if (-not (Get-Command netlify -ErrorAction SilentlyContinue)) {
    Write-Host "Netlify CLI not found. Installing globally..." -ForegroundColor Yellow
    npm install -g netlify-cli | Out-Null
}

# 2. Login (if not already)
$authStatus = netlify status 2>$null | Select-String -Pattern "Logged in as"
if (-not $authStatus) {
    Write-Host "Opening browser for Netlify login..." -ForegroundColor Yellow
    netlify login | Out-Null
}

# 3. Ensure .env.production exists or create interactively
$envFile = Join-Path (Get-Location) ".env.production"
if (-not (Test-Path $envFile)) {
    Write-Host "Creating .env.production (not committed to git)." -ForegroundColor Yellow
    $apiDefault = "https://ucrc-funding-backend-production.up.railway.app"
    $apiInput = Read-Host "Enter VITE_API_BASE_URL (or press Enter for $apiDefault)"
    if ([string]::IsNullOrWhiteSpace($apiInput)) { $apiInput = $apiDefault }
    "VITE_API_BASE_URL=$apiInput" | Out-File $envFile -Encoding UTF8
    Write-Host "Wrote $envFile" -ForegroundColor Green
} else {
    Write-Host ".env.production already present." -ForegroundColor Green
}

# 4. Install deps (skip if node_modules exists unless --Force)
if (-not (Test-Path "node_modules") -or $Force) {
    Write-Host "Installing dependencies..." -ForegroundColor Cyan
    npm ci
} else {
    Write-Host "Dependencies present (skip). Use -Force to reinstall." -ForegroundColor DarkGray
}

# 5. Build
Write-Host "Building production bundle..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) { Write-Error "Build failed"; exit 1 }

# 6. Determine site (if not provided)
$siteFlag = ""
if (-not [string]::IsNullOrWhiteSpace($NetlifySiteName)) {
    $siteFlag = "--site $NetlifySiteName"
} else {
    Write-Host "If this is first deploy choose 'Create & configure a new site'." -ForegroundColor Yellow
}

# 7. Deploy (draft first) to confirm
Write-Host "Deploying a draft (deploy preview)..." -ForegroundColor Cyan
netlify deploy --dir=dist $siteFlag --message "Draft deploy $(Get-Date -Format o)" | Tee-Object -Variable draftOut

$draftUrl = ($draftOut | Select-String -Pattern "Draft URL: (.*)" | ForEach-Object { $_.Matches[0].Groups[1].Value })
if ($draftUrl) { Write-Host "Draft deployed: $draftUrl" -ForegroundColor Green }

$promote = Read-Host "Promote this draft to production? (y/N)"
if ($promote -match '^[Yy]') {
    Write-Host "Deploying production..." -ForegroundColor Cyan
    netlify deploy --prod --dir=dist $siteFlag --message "Production deploy $(Get-Date -Format o)"
} else {
    Write-Host "Skipped production deploy. Run with -Force or rerun script to promote later." -ForegroundColor Yellow
}

Write-Host "=== Done ===" -ForegroundColor Cyan
