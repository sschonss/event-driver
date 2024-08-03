FROM php:8.1-cli

RUN apt-get update && apt-get install -y \
    unzip \
    git \
    zip \
    && docker-php-ext-install pdo pdo_mysql sockets \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY . /app

WORKDIR /app

RUN composer install --ignore-platform-req=ext-sockets

CMD ["php", "-S", "0.0.0.0:4000", "-t", "/app"]
