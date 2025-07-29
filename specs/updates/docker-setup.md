# Docker Setup for Minerva Frontend (Next.js)

## Overview
This document outlines the complete Docker containerization strategy for the Minerva Next.js frontend, optimized for development, testing, and production environments.

## Next.js Docker Strategy

### Multi-Stage Build Approach
Next.js applications benefit from multi-stage builds to optimize for both development experience and production performance.

## Implementation Plan

### Phase 1: Frontend Dockerfile & Configuration (Week 1)
**Priority: High**

#### Production Dockerfile (Multi-stage)
```dockerfile
# Dependencies stage
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
RUN npm ci --only=production && npm cache clean --force

# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables for build
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create system user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set ownership
RUN chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/api/health || exit 1

CMD ["node", "server.js"]
```

#### Development Dockerfile
```dockerfile
FROM node:18-alpine AS development

WORKDIR /app

# Install dependencies for development
RUN apk add --no-cache libc6-compat curl

# Copy package files
COPY package.json package-lock.json* ./

# Install all dependencies (including dev dependencies)
RUN npm ci

# Copy source code
COPY . .

# Create nextjs user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
RUN chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV NODE_ENV development

# Use Next.js development server with hot reload
CMD ["npm", "run", "dev"]
```

#### Next.js Configuration for Docker
```javascript
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output for Docker
  output: 'standalone',
  
  // Optimize for containerized environments
  experimental: {
    // Reduce memory usage in containers
    isrMemoryCacheSize: 0,
  },
  
  // Environment variable configuration
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  },
  
  // Image optimization for Docker
  images: {
    unoptimized: process.env.NODE_ENV === 'development',
    domains: ['localhost', 'minerva-api.kevinwoodfield.com'],
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

### Phase 2: Docker Compose Integration (Week 1)
**Priority: High**

#### Development Docker Compose
```yaml
# docker-compose.dev.yml
version: '3.8'

services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile.dev
    environment:
      - NODE_ENV=development
      - NEXT_PUBLIC_API_URL=http://localhost:8000
      - NEXT_PUBLIC_GA_MEASUREMENT_ID=${GA_MEASUREMENT_ID}
      - WATCHPACK_POLLING=true  # Enable hot reload in Docker
    volumes:
      - .:/app
      - /app/node_modules
      - /app/.next
    ports:
      - "3000:3000"
    stdin_open: true
    tty: true
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  # Optional: Include backend for full-stack development
  backend:
    image: minerva-backend:dev
    ports:
      - "8000:8000"
    environment:
      - DEBUG=1
      - CORS_ALLOWED_ORIGINS=http://localhost:3000
    depends_on:
      - db
      
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: minerva_dev
      POSTGRES_USER: minerva
      POSTGRES_PASSWORD: minerva_dev_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

#### Production Docker Compose
```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile
      target: runner
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
      - NEXT_PUBLIC_GA_MEASUREMENT_ID=${GA_MEASUREMENT_ID}
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
      - ./nginx/ssl:/etc/nginx/ssl
    depends_on:
      - frontend
    restart: unless-stopped

networks:
  default:
    name: minerva_network
    external: true
```

### Phase 3: Nginx Configuration for Frontend (Week 1)
**Priority: High**

#### Nginx Configuration
```nginx
# nginx/nginx.conf
upstream frontend {
    server frontend:3000;
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # SSL Configuration
    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload";

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/json
        application/javascript
        application/xml+rss
        application/atom+xml
        image/svg+xml;

    # Next.js static assets
    location /_next/static/ {
        alias /app/.next/static/;
        expires 365d;
        add_header Cache-Control "public, immutable";
    }

    # Images and other static assets
    location /images/ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }

    # API routes (proxy to backend)
    location /api/ {
        proxy_pass http://backend:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # All other routes to Next.js
    location / {
        proxy_pass http://frontend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Handle client-side routing
        try_files $uri $uri/ @fallback;
    }

    location @fallback {
        proxy_pass http://frontend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Phase 4: Environment Configuration (Week 1)
**Priority: High**

#### Environment Files
```bash
# .env.local.example
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
AUTH_ENABLED=false
LOGIN_USERNAME=admin
LOGIN_PASSWORD=password

# Development overrides
# .env.development
NEXT_PUBLIC_API_URL=http://localhost:8000
NODE_ENV=development

# Production environment
# .env.production
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NODE_ENV=production
```

#### Docker Environment Variables
```bash
# .env.docker
COMPOSE_PROJECT_NAME=minerva-frontend
DOCKER_BUILDKIT=1
COMPOSE_DOCKER_CLI_BUILD=1

# Build arguments
NEXT_PUBLIC_API_URL=http://localhost:8000
GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Phase 5: Development Workflow (Week 2)
**Priority: High**

#### Makefile for Frontend Operations
```makefile
# Makefile
.PHONY: dev prod test build clean logs shell lint type-check

# Development
dev:
	docker-compose -f docker-compose.dev.yml up --build

dev-detached:
	docker-compose -f docker-compose.dev.yml up -d --build

# Production
prod:
	docker-compose -f docker-compose.prod.yml up -d --build

# Testing
test:
	docker-compose -f docker-compose.dev.yml exec frontend npm test

test-watch:
	docker-compose -f docker-compose.dev.yml exec frontend npm run test:watch

e2e:
	docker-compose -f docker-compose.dev.yml exec frontend npm run cypress:run

# Build operations
build:
	docker build -t minerva-frontend:latest .

build-dev:
	docker build -f Dockerfile.dev -t minerva-frontend:dev .

# Code quality
lint:
	docker-compose -f docker-compose.dev.yml exec frontend npm run lint

lint-fix:
	docker-compose -f docker-compose.dev.yml exec frontend npm run lint:fix

type-check:
	docker-compose -f docker-compose.dev.yml exec frontend npm run type-check

# Utility commands
shell:
	docker-compose -f docker-compose.dev.yml exec frontend sh

logs:
	docker-compose -f docker-compose.dev.yml logs -f frontend

clean:
	docker-compose -f docker-compose.dev.yml down -v
	docker system prune -f
	docker volume prune -f

# Package management
install:
	docker-compose -f docker-compose.dev.yml exec frontend npm install

update:
	docker-compose -f docker-compose.dev.yml exec frontend npm update

# Build and deployment
push:
	docker tag minerva-frontend:latest your-registry/minerva-frontend:latest
	docker push your-registry/minerva-frontend:latest
```

### Phase 6: Performance Optimization (Week 2)
**Priority: Medium**

#### .dockerignore File
```dockerignore
# Dependencies
node_modules
npm-debug.log*

# Build outputs
.next
out
build

# Development files
.env*.local
.env.development

# IDE files
.vscode
.idea
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db

# Git
.git
.gitignore

# Testing
coverage
.nyc_output
cypress/videos
cypress/screenshots

# Logs
logs
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Documentation
README.md
docs/
*.md

# CI/CD
.github
.gitlab-ci.yml
Jenkinsfile
```

#### Health Check API Route
```javascript
// src/app/api/health/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check if the application is responsive
    const healthCheck = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
      version: process.env.npm_package_version || '1.0.0',
    };

    return NextResponse.json(healthCheck);
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 503 }
    );
  }
}
```

## Multi-Repository Docker Orchestration

### Shared Network Configuration
```yaml
# docker-compose.shared.yml (in parent directory)
version: '3.8'

networks:
  minerva_network:
    driver: bridge
    ipam:
      config:
        - subnet: 172.20.0.0/16

services:
  # Shared services like databases, Redis, etc.
  postgres:
    image: postgres:15-alpine
    networks:
      - minerva_network
    environment:
      POSTGRES_DB: minerva
      POSTGRES_USER: minerva
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    networks:
      - minerva_network
    volumes:
      - redis_data:/data
    ports:
      - "6379:6379"

volumes:
  postgres_data:
  redis_data:
```

### Cross-Repository Development Script
```bash
#!/bin/bash
# scripts/dev-full-stack.sh

# Create shared network if it doesn't exist
docker network create minerva_network 2>/dev/null || true

# Start shared services
cd ../
docker-compose -f docker-compose.shared.yml up -d

# Start backend
cd minerva-backend
docker-compose -f docker-compose.dev.yml up -d

# Start frontend
cd ../minerva-frontend
docker-compose -f docker-compose.dev.yml up -d

echo "Full stack is running!"
echo "Frontend: http://localhost:3000"
echo "Backend: http://localhost:8000"
echo "Database: localhost:5432"
```

## Testing Strategy

### Test Environment Configuration
```yaml
# docker-compose.test.yml
version: '3.8'

services:
  frontend-test:
    build:
      context: .
      dockerfile: Dockerfile.dev
    environment:
      - NODE_ENV=test
      - NEXT_PUBLIC_API_URL=http://backend-test:8000
    volumes:
      - .:/app
      - /app/node_modules
    command: npm run test:ci
    depends_on:
      - backend-test

  frontend-e2e:
    build:
      context: .
      dockerfile: Dockerfile.dev
    environment:
      - NODE_ENV=test
      - CYPRESS_baseUrl=http://frontend:3000
    volumes:
      - .:/app
      - /app/node_modules
    command: npm run cypress:run
    depends_on:
      - frontend
      - backend-test

  backend-test:
    image: minerva-backend:test
    environment:
      - DJANGO_SETTINGS_MODULE=minervahome.settings_test
```

### CI/CD Pipeline Configuration
```yaml
# .github/workflows/frontend.yml
name: Frontend CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Create shared network
      run: docker network create minerva_network
    
    - name: Build test image
      run: docker build -f Dockerfile.dev -t minerva-frontend:test .
    
    - name: Run tests
      run: docker run --rm --network minerva_network minerva-frontend:test npm run test:ci
    
    - name: Run linting
      run: docker run --rm minerva-frontend:test npm run lint
      
    - name: Type checking
      run: docker run --rm minerva-frontend:test npm run type-check

  build:
    needs: test
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Build production image
      run: docker build -t minerva-frontend:${{ github.sha }} .
    
    - name: Test production build
      run: docker run --rm -d -p 3000:3000 minerva-frontend:${{ github.sha }}
    
    - name: Push to registry
      if: github.ref == 'refs/heads/main'
      run: |
        echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
        docker push minerva-frontend:${{ github.sha }}
```

## File Structure
```
minerva-frontend/
├── Dockerfile                   # Production Dockerfile
├── Dockerfile.dev              # Development Dockerfile
├── docker-compose.yml          # Base compose file
├── docker-compose.dev.yml      # Development overrides
├── docker-compose.prod.yml     # Production overrides
├── docker-compose.test.yml     # Testing configuration
├── .dockerignore              # Docker ignore file
├── .env.local.example         # Environment template
├── Makefile                   # Common operations
├── nginx/
│   ├── nginx.conf             # Nginx configuration
│   └── ssl/                   # SSL certificates
├── scripts/
│   ├── dev-full-stack.sh      # Full stack development
│   ├── healthcheck.sh         # Health check script
│   └── deploy.sh              # Deployment script
└── next.config.mjs            # Next.js configuration with Docker optimizations
```

This comprehensive Docker setup provides optimal development experience, production performance, and seamless integration with the backend service.