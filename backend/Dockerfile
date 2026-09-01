FROM php:8.3-cli-alpine

RUN apk add --no-cache \
    postgresql-dev \
    sqlite-dev \
    libzip-dev \
    icu-dev \
    oniguruma-dev \
    && docker-php-ext-install \
    pdo \
    pdo_pgsql \
    pdo_sqlite \
    zip \
    intl \
    mbstring \
    bcmath

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist

COPY . .
RUN composer dump-autoload --optimize

RUN touch database/database.sqlite \
    && php artisan package:discover --ansi

EXPOSE 8080

CMD php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=${PORT:-8080}
