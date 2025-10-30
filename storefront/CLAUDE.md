# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 e-commerce storefront for "Saunas of the World", built with:
- **Medusa v2** headless commerce backend
- **Payload CMS** for content management (integrated within the storefront)
- **Next.js 15** with App Router, Server Components, and Server Actions
- **Tailwind CSS** for styling
- **TypeScript** throughout

The codebase represents a hybrid architecture combining Medusa's commerce capabilities (products, cart, checkout) with Payload CMS for marketing pages and content.

## Development Commands

### Running the Application
```bash
npm run dev              # Wait for backend, then start dev server on port 8000
npm run build           # Wait for backend, then build for production
npm start               # Start production server
npm run build:next      # Build without waiting for backend
```

### Code Quality
```bash
npm run lint            # Run ESLint
npm run analyze         # Build with bundle analyzer
npm run test-e2e        # Run Playwright e2e tests
```

### Environment Setup
- Copy `.env.local.template` to `.env` (not `.env.local`)
- Required: `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` (checked by `check-env-variables.js`)
- The `npm run dev` and `npm run build` scripts use `await-backend` and `launch-storefront` utilities from `medusajs-launch-utils`

## Architecture Overview

### Dual Route System

The app has **three main routing groups**:

1. **`(main)` group** - Marketing/CMS pages (`/about`, `/services`, `/gallery`, `/products/[category]`)
   - Content fetched from Payload CMS globals
   - Uses custom data layer in `src/lib/data/` (e.g., `homepage.ts`, `about-page.ts`)

2. **`(store)` group** - E-commerce pages (`/shop/*`, `/order/*`)
   - Content fetched from Medusa backend
   - Uses Medusa JS SDK (configured in `src/lib/config.ts`)

3. **`(payload)` group** - Payload CMS admin panel (`/admin`)
   - Managed by Payload CMS
   - Config: `src/payload.config.ts`

### Country Code Middleware

- The middleware (`src/middleware.ts`) manages region/country selection
- **Currently disabled**: Country code injection redirects are commented out (lines 127-130)
- Originally designed to prefix all URLs with country codes like `/us/`, `/gb/`
- When enabled, country code is determined by: URL path → Vercel IP header → `NEXT_PUBLIC_DEFAULT_REGION` env var → first region from Medusa

### Path Aliases

TypeScript paths configured in `tsconfig.json`:
- `@lib/*` → `src/lib/*`
- `@/*` or `~/*` → `src/*`
- `@payload-config` → `src/payload.config.ts`

**Note**: The template's `src/modules/` directory has been removed along with all Headless UI dependencies. All UI components are now in `src/components/`.

### Data Layer Pattern

**Medusa commerce data**: Accessed via SDK in `src/lib/config.ts`:
```typescript
import { sdk } from "@lib/config"
const products = await sdk.store.product.list()
```

**Payload CMS data**: Custom fetch functions in `src/lib/data/`:
- `homepage.ts` - Homepage content
- `saunas-page.ts` - Product category pages
- `footer.ts` - Footer global
- `contact-page.ts` - Contact page
- etc.

These functions query Payload's REST API at `/api/(payload name)` endpoints.

## Key Integrations

### Payload CMS
- **Config**: `src/payload.config.ts`
- **Collections**: Users, Media (in `src/collections/`)
- **Globals**: Homepage, SaunasPage, BathsPage, InfraredPage, EquipmentPage, MaterialsPage, ServicesPage, GalleryPage, AboutPage, ContactPage, FooterGlobal, StoreRangePage, HeaterListPage (in `src/globals/`)
- **Storage**: S3-compatible (MinIO) via `@payloadcms/storage-s3`
- **Database**: MongoDB via `@payloadcms/db-mongodb`
- **Admin UI**: Accessible at `/admin`

### Image Handling
- **Remote patterns** configured in `next.config.js` for:
  - Localhost
  - Railway bucket (`bucket-production-2b37.up.railway.app`)
  - Medusa S3 buckets
  - MinIO endpoint (if `NEXT_PUBLIC_MINIO_ENDPOINT` is set)
- Images from Medusa can be served via backend URL or MinIO

### Payment & Search
- **Payments**: Stripe and PayPal supported (configure via `NEXT_PUBLIC_STRIPE_KEY`, `NEXT_PUBLIC_PAYPAL_CLIENT_ID`)
- **Search**: MeiliSearch integration via `@meilisearch/instant-meilisearch`
  - Search client in `src/lib/search-client.ts`
  - Search actions in `src/modules/search/actions.ts`
  - Can be swapped for Algolia (see README.md)

## Project Structure

```
src/
├── app/
│   ├── (main)/          # Marketing pages (Payload CMS content)
│   ├── (store)/         # E-commerce pages (Medusa content)
│   ├── (payload)/       # CMS admin
│   └── api/             # API routes
├── collections/         # Payload CMS collections
├── globals/             # Payload CMS globals
├── components/          # All UI components (custom, not from template)
│   ├── ui/             # Shared UI components
│   ├── store/          # Store-specific components
│   ├── home/           # Homepage components
│   └── ...             # Other feature components
├── lib/
│   ├── data/           # Data fetching functions (CMS + Medusa)
│   ├── config.ts       # Medusa SDK initialization
│   ├── constants.tsx   # App constants
│   └── util/           # Utility functions
├── types/              # TypeScript type definitions
├── styles/             # Global CSS
└── middleware.ts       # Region/country middleware
```

## Important Notes

### TypeScript & ESLint
- Build errors are **ignored** (`ignoreBuildErrors: true`)
- ESLint errors are **ignored** during builds (`ignoreDuringBuilds: true`)
- This is configured in `next.config.js` - be cautious when making type changes

### Medusa Backend Dependency
- The dev/build scripts wait for Medusa backend to be available via `await-backend`
- If working offline or backend is down, use `npm run build:next` instead

### Content Management
- Marketing pages (home, about, services, products) fetch data from **Payload CMS**
- Commerce features (cart, checkout, account) fetch data from **Medusa**
- When updating page content, check if it comes from Payload globals (edit in `/admin`) or Medusa (edit via Medusa admin)

### S3/MinIO Storage
- Payload CMS uses S3-compatible storage for media uploads
- Config requires: `S3_ENDPOINT`, `S3_BUCKET`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`
- Railway bucket is currently used: `bucket-production-2b37.up.railway.app`

## Common Patterns

### Fetching CMS Content
```typescript
// In src/lib/data/homepage.ts pattern
import { getPayloadHMR } from "@payloadcms/next/utilities"
import configPromise from "@payload-config"

const payload = await getPayloadHMR({ config: configPromise })
const data = await payload.findGlobal({
  slug: 'homepage',
  depth: 2,
})
```

### Fetching Medusa Data
```typescript
import { sdk } from "@lib/config"

// In Server Components or Server Actions
const products = await sdk.store.product.list({
  region_id: regionId,
  // ... filters
})
```

### Server Actions
- Located in `actions.ts` files within each module directory
- Always marked with `"use server"` directive
- Used for cart operations, checkout, account management

### Component Organization
- **Templates** (`templates/`): Page-level components
- **Components** (`components/`): Feature-specific components
- **Common** (`modules/common/`): Shared icons and utilities
