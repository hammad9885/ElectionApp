#!/bin/sh
set -e

mkdir -p database storage/framework/cache storage/framework/sessions storage/framework/views storage/logs
touch database/database.sqlite

if [ -z "$APP_KEY" ] || [ "$APP_KEY" = "base64:" ]; then
  export APP_KEY="base64:$(openssl rand -base64 32)"
fi

php artisan config:clear
php artisan migrate --force

exec php artisan serve --host=0.0.0.0 --port="${PORT:-8080}"
