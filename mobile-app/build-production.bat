@echo off
echo ============================================
echo  Build Production APK (Cloud API)
echo ============================================
echo.
echo BEFORE building:
echo   1. Deploy backend to Railway (see backend\deploy-railway.bat)
echo   2. Update eas.json - production.env.EXPO_PUBLIC_API_URL
echo      with your Railway URL + /api/v1
echo.
set /p CONTINUE="Railway URL set in eas.json? (y/n): "
if /i not "%CONTINUE%"=="y" exit /b 1
cd /d "%~dp0"
npx eas-cli build --platform android --profile production --non-interactive
pause
