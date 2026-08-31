@echo off
REM ============================================
REM  Start Laravel backend on ALL network interfaces
REM  so your phone (on the same Wi-Fi) can reach it.
REM ============================================
echo Starting Laravel backend on 0.0.0.0:8000 ...
echo.
echo IMPORTANT: Your phone must be on the SAME Wi-Fi as this PC.
echo The app uses: http://192.168.110.10:8000
echo.
php artisan serve --host=0.0.0.0 --port=8000
pause
