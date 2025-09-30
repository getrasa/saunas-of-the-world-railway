# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a monorepo for "Saunas of the World" e-commerce platform built with MedusaJS 2.0. It consists of:
- **Backend**: MedusaJS 2.0 commerce backend with admin dashboard
- **Storefront**: Next.js 14 storefront application

The project is pre-configured for deployment on Railway with integrated services (PostgreSQL, Redis, MinIO, MeiliSearch).

## Architecture

### Backend (MedusaJS 2.0)
Located in `backend/`, uses MedusaJS framework for headless commerce:
- **Port**: 9000 (includes admin dashboard at `/app`)
- **Framework**: MedusaJS 2.0 (v2.8.8)
- **Database**: PostgreSQL with MikroORM
- **Caching**: Redis (with fallback to simulated redis)
- **Search**: MeiliSearch for product search
- **Storage**: MinIO for file storage (fallback to local storage)
- **Payments**: Stripe integration
- **Email**: Resend and SendGrid support

### Storefront (Next.js)
Located in `storefront/`, uses Next.js with App Router:
- **Port**: 8000 (configurable)
- **Framework**: Next.js 14 with App Router
- **UI**: Tailwind CSS with shadcn/ui components
- **State**: React hooks and contexts
- **API**: MedusaJS SDK for backend communication

### Key Architecture Patterns

**Backend Structure**:
- `src/modules/` - Custom Medusa modules (email-notifications, minio-file)
- `src/api/` - API routes (admin/, store/)
- `src/subscribers/` - Event subscribers
- `src/workflows/` - Business logic workflows
- `src/scripts/` - Utility scripts (seed data, etc.)

**Storefront Structure**:
- `src/app/(main)/` - Marketing pages (home, about, products)
- `src/app/(store)/` - Store pages (shop, checkout)
- `src/app/[countryCode]/` - Region-specific routes
- `src/lib/data/` - Data fetching layer (cart, products, customer, etc.)
- `src/components/` - Reusable React components
- `src/contexts/` - React contexts for global state

**Data Flow**:
1. Storefront fetches data via `src/lib/data/` layer using MedusaJS SDK
2. Backend serves data through Medusa API routes
3. Search functionality uses MeiliSearch for fast product queries
4. Images served from MinIO bucket storage (or local fallback)

## Commands

### Backend
```bash
cd backend/

# Initial setup (run migrations, seed database)
npm run ib       # or pnpm ib

# Development (starts backend + admin dashboard)
npm run dev      # or pnpm dev

# Build and start (for production testing)
pnpm build && pnpm start

# Seed database manually
npm run seed     # or pnpm seed

# Email template development
npm run email:dev
```

### Storefront
```bash
cd storefront/

# Development (with backend connection check)
npm run dev      # or pnpm dev

# Build for production
npm run build

# Start production server
npm run start

# Lint
npm run lint

# End-to-end tests
npm run test-e2e
```

## Environment Configuration

### Backend `.env`
Key variables (use `.env.template` as reference):
- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_URL` - Redis connection (optional, falls back to simulated)
- `MINIO_ENDPOINT`, `MINIO_ACCESS_KEY`, `MINIO_SECRET_KEY` - MinIO storage
- `MEILISEARCH_HOST`, `MEILISEARCH_ADMIN_KEY` - Product search
- `STRIPE_API_KEY`, `STRIPE_WEBHOOK_SECRET` - Payment processing
- `RESEND_API_KEY`, `RESEND_FROM_EMAIL` - Email notifications

### Storefront `.env.local`
Key variables (use `.env.local.template` as reference):
- `NEXT_PUBLIC_MEDUSA_BACKEND_URL` - Backend API URL (default: http://localhost:9000)
- `NEXT_PUBLIC_BASE_URL` - Storefront URL (default: http://localhost:8000)
- `NEXT_PUBLIC_DEFAULT_REGION` - Default region (e.g., "us")
- `NEXT_PUBLIC_SEARCH_ENDPOINT` - MeiliSearch URL
- `NEXT_PUBLIC_SEARCH_API_KEY` - MeiliSearch search key
- `NEXT_PUBLIC_INDEX_NAME` - MeiliSearch index name (default: "products")

## Development Workflow

1. **Initial Setup**:
   - Set up backend: `cd backend && npm i && npm run ib`
   - Set up storefront: `cd storefront && npm i`
   - Copy and configure `.env` files from templates

2. **Running Locally**:
   - Start backend first: `cd backend && npm run dev`
   - Then start storefront: `cd storefront && npm run dev`
   - Backend will be at http://localhost:9000
   - Admin dashboard at http://localhost:9000/app
   - Storefront at http://localhost:8000

3. **Making Changes**:
   - Backend changes hot-reload automatically
   - Storefront uses Next.js fast refresh
   - Database migrations managed by MikroORM

## Custom Modules

The backend includes two custom Medusa modules:

**1. MinIO File Storage** (`src/modules/minio-file/`):
- Replaces local file storage with MinIO cloud storage
- Automatically creates 'medusa-media' bucket
- Falls back to local storage if MinIO not configured

**2. Email Notifications** (`src/modules/email-notifications/`):
- Resend integration with React Email templates
- Sends order confirmations and other transactional emails
- Templates in `src/modules/email-notifications/templates/`

## Important Notes

- The storefront requires a running backend on port 9000 to function
- Next.js build process needs backend connection to fetch product data
- Image URLs are dynamically configured based on MinIO or local storage
- Medusa modules are conditionally loaded based on environment variables
- The project uses pnpm for backend, npm for storefront (per package.json packageManager)