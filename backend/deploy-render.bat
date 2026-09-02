@echo off
echo ============================================
echo  PERMANENT FIX - Render.com (24/7 Cloud)
echo ============================================
echo.
echo Ye ek baar karo - phir PC band ho tab bhi app chalegi!
echo.
echo STEP 1: GitHub par code push karo
echo   git add .
echo   git commit -m "Add cloud backend config"
echo   git push origin main
echo.
echo STEP 2: Render.com par jao
echo   https://dashboard.render.com/select-repo?type=blueprint
echo.
echo STEP 3: Repo connect karo: hammad9885/ElectionApp
echo   Render automatically render.yaml use karega
echo.
echo STEP 4: Deploy complete hone ke baad URL copy karo
echo   Example: https://govt-app-api.onrender.com
echo.
echo STEP 5: mobile-app\eas.json mein URL update karo:
echo   EXPO_PUBLIC_API_URL = https://YOUR-URL.onrender.com/api/v1
echo.
echo STEP 6: Naya APK build:
echo   cd mobile-app
echo   npx eas-cli build --platform android --profile production
echo.
echo Phir app KISI BHI network par chalegi - mobile data bhi!
echo.
pause
