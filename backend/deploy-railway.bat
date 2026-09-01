@echo off
echo ============================================
echo  Deploy Govt App Backend to Railway
echo ============================================
echo.
echo Prerequisites:
echo   1. Railway account: https://railway.app
echo   2. Railway CLI installed: npm i -g @railway/cli
echo   3. Logged in: railway login
echo.
echo Steps:
echo   1. cd backend
echo   2. railway init          (new project)
echo   3. railway add -d postgres   (add PostgreSQL database)
echo   4. Set variables in Railway dashboard:
echo        APP_ENV=production
echo        APP_DEBUG=false
echo        APP_KEY=base64:...     (run: php artisan key:generate --show)
echo        DB_CONNECTION=pgsql
echo        DATABASE_URL=...       (auto from Postgres plugin)
echo   5. railway up
echo   6. Copy public URL and update mobile-app/eas.json production env
echo   7. eas build --platform android --profile production
echo.
pause
