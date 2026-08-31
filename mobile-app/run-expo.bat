@echo off
REM ============================================
REM  Start Expo so you can open the app on your
REM  phone using the Expo Go app.
REM ============================================
echo Starting Expo dev server...
echo.
echo STEP 1: Install "Expo Go" from Play Store on your phone
echo STEP 2: Make sure phone and PC are on the SAME Wi-Fi
echo STEP 3: Scan the QR code shown here with your phone camera
echo          (Android) or Expo Go app (iOS)
echo.
npx expo start --lan
pause
