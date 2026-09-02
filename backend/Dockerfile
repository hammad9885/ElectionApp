FROM php:8.3-cli-alpine

RUN apk add --no-cache \
    postgresql-dev \
    sqlite-dev \
    libzip-dev \
    icu-dev \
    oniguruma-dev \
    openssl \
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
RUN composer dump-autoload --optimize \
    && php artisan package:discover --ansi

ENV APP_ENV=production \
    APP_DEBUG=false \
    LOG_CHANNEL=stderr \
    DB_CONNECTION=sqlite \
    DB_DATABASE=/app/database/database.sqlite

RUN chmod +x docker-start.sh \
    && mkdir -p database storage/framework/cache storage/framework/sessions storage/framework/views storage/logs \
    && touch database/database.sqlite

EXPOSE 8080

CMD ["sh", "docker-start.sh"]
