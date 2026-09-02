@echo off
title ECP Public Backend
color 0A
echo.
echo  ============================================
echo   ECP App - Public Server (Any Network)
echo  ============================================
echo.
echo  Phone mobile data par bhi kaam karega!
echo  Is window ko BAND mat karo jab app use ho.
echo.
cd /d "%~dp0"

echo [1/2] Laravel backend start ho raha hai...
start "ECP Backend" /MIN cmd /c "php artisan serve --host=127.0.0.1 --port=8000"
timeout /t 5 /nobreak >nul

echo [2/2] Public HTTPS tunnel start ho raha hai...
echo.
echo  Neeche jo URL aaye (https://....) use karo.
echo  Agar pehle wala URL kaam na kare, naya APK build karo.
echo.

:retry
npx --yes localtunnel --port 8000 2>&1
echo.
echo Tunnel band ho gaya. Dobara try ho raha hai...
timeout /t 3 /nobreak >nul
goto retry
