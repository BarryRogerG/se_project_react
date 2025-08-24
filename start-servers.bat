@echo off
echo Starting WTWR Application Servers...
echo.

echo Starting Mock API Server (Port 3001)...
start "Mock API Server" cmd /k "npm run server"

echo Waiting 3 seconds for API server to start...
timeout /t 3 /nobreak > nul

echo Starting React Development Server (Port 3000)...
start "React Dev Server" cmd /k "npm run dev"

echo.
echo Both servers are starting...
echo - Mock API Server: http://localhost:3001
echo - React App: http://localhost:3000
echo.
echo Press any key to close this window...
pause > nul
