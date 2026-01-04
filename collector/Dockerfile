FROM node:18-alpine

WORKDIR /app

# Copy root package.json for workspace setup
COPY package*.json ./

# Copy common package
COPY common ./common

# Copy collector package
COPY collector ./collector

# Ensure OpenSSL libs for Prisma on musl
RUN apk add --no-cache openssl

# Build common package first
WORKDIR /app/common
RUN npm install \
    && npm run prisma:generate \
    && npm run build

# Install collector dependencies and link common
WORKDIR /app/collector
RUN npm install && \
    rm -rf node_modules/common && \
    ln -s /app/common node_modules/common

CMD ["npm", "run", "dev"]
