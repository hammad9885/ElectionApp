#!/bin/sh
set -e

mkdir -p database storage/framework/cache storage/framework/sessions storage/framework/views storage/logs bootstrap/cache
touch database/database.sqlite
chmod -R 777 storage bootstrap/cache database 2>/dev/null || true

if [ -z "$APP_KEY" ] || [ "$APP_KEY" = "base64:" ]; then
  export APP_KEY="base64:$(openssl rand -base64 32)"
fi

php artisan config:clear --no-ansi
php artisan migrate --force --no-ansi || true

exec php artisan serve --host=0.0.0.0 --port="${PORT:-8080}" --no-reload
