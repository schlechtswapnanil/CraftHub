$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$backendPython = Join-Path $projectRoot ".venv312\Scripts\python.exe"
$npmCommand = Join-Path $env:ProgramFiles "nodejs\npm.cmd"
$nodeDirectory = Split-Path $npmCommand -Parent

if (-not (Test-Path $backendPython)) {
    throw "Python environment not found: $backendPython. Create it with Python 3.12 and install backend/requirements.txt."
}

if (-not (Test-Path $npmCommand)) {
    throw "Node.js LTS was not found. Install it, then run npm install in frontend/."
}

Write-Host "Starting CraftHub backend and frontend..." -ForegroundColor Cyan
# npm.cmd invokes `node` by name. Ensure the child process can resolve the
# recently installed Node runtime even before a terminal restart updates PATH.
$env:Path = "$nodeDirectory;$env:Path"
Start-Process -FilePath $backendPython -ArgumentList "-m", "uvicorn", "main:app", "--reload", "--port", "8000" -WorkingDirectory (Join-Path $projectRoot "backend")
Start-Process -FilePath $npmCommand -ArgumentList "run", "dev" -WorkingDirectory (Join-Path $projectRoot "frontend")
