# Heater Content Management - Implementation Plan

## Overview
Implement CMS-driven content management for heater product pages, including advantages, technical specifications, and PDF downloads. Content will be managed in Payload CMS and linked to Medusa products.

## Phased Implementation

### Phase 1: Payload Collection & Types Setup
**Goal: Create backend structure for heater content**

1. **Create HeaterContent Collection** (`src/collections/HeaterContent.ts`)
   - `medusaProductId` field (text, unique, required) - manual entry for now
   - `productName` field (text, required) - for admin reference
   - `advantages` field (array of text items)
   - `specifications` field (array with label/value pairs)
   - `downloads` field (array with label + upload to Media collection)
   - Configure admin UI settings

2. **Register Collection** (`src/payload.config.ts`)
   - Import HeaterContent collection
   - Add to collections array

3. **Update TypeScript Types** (`src/types/payload-types.ts` or similar)
   - Create HeaterContent interface matching collection structure
   - Type for populated downloads with media files

### Phase 2: Data Fetching Layer
**Goal: Fetch heater content from Payload**

1. **Create Data Fetcher** (`src/lib/data/heater-content.ts`)
   - `getHeaterContent(medusaProductId: string)` function
   - Query Payload with depth: 2 to populate file relationships
   - Return typed data with file URLs
   - Handle not found case (return null)

2. **Update Heater Page** (find existing page file in `src/app/(store)/shop/heaters/[handle]/`)
   - Import `getHeaterContent` function
   - Fetch product from Medusa (existing)
   - Fetch heater content from Payload using `product.id`
   - Pass both to HeaterDetailScene component

### Phase 3: Frontend Component Updates
**Goal: Display Payload content in accordion**

1. **Update HeaterDetailScene** (`src/components/store/heaters/details/heater-detail.scene.tsx`)
   - Accept optional `heaterContent` prop
   - Extract advantages/specifications/downloads from heaterContent
   - Use fallback defaults if heaterContent is null
   - Pass downloads to accordion component

2. **Update HeaterDetailAccordion** (`src/components/store/heaters/details/heater-detail-accordion.tsx`)
   - Add `downloads` prop (array with label + file object)
   - Update PDF Downloads section to render real files
   - Use `file.url` for href in links
   - Add `target="_blank"` and `rel="noopener noreferrer"`
   - Add PDF icon/indicator
   - Show message if no downloads available

### Phase 4: Custom Medusa Product Selector ✅ COMPLETED
**Goal: Improve admin UX with product search**

1. **Create API Route** (`src/app/api/medusa/heaters/route.ts`) ✅
   - Fetch heater products from Medusa SDK
   - Filter by heater category ID: `pcat_01K4VWWYER0DNWDBBQ3JBSX31R`
   - Return id, title, handle, thumbnail
   - Limit 100 products

2. **Create Custom Field Component** (`src/components/payload/MedusaProductSelector.tsx`) ✅
   - Client component using `@payloadcms/ui` hooks
   - Uses Payload's built-in `ReactSelect` component (best practice for Payload 3.0)
   - Fetches heaters from API route on mount
   - Searchable dropdown with product names
   - Displays selected product thumbnail and ID
   - Auto-populates productName field using `useFormFields` hook
   - Graceful error handling with manual fallback input

3. **Update HeaterContent Collection** ✅
   - Added custom component to `medusaProductId` field
   - Made productName auto-populated and read-only
   - Updated field labels and descriptions

---

## Implementation Order
1. Phase 1 → Test in Payload admin (create/edit entries manually)
2. Phase 2 → Test data fetching (console.log the results)
3. Phase 3 → Test frontend display (see content on heater pages)
4. Phase 4 → Polish admin experience (when ready)

## Technical Decisions

### Why Collection over Global?
- Each heater gets its own document
- Easy to add/edit/remove individual heater content
- Can query by `medusaProductId` when loading product page
- Follows existing pattern (Media is also a collection)

### PDF Storage
- PDFs uploaded through Payload Media collection
- Stored in S3 (MinIO) via existing `@payloadcms/storage-s3` setup
- Users drag & drop PDFs in admin UI
- Payload handles upload and URL generation
- Frontend uses `file.url` property to link to PDFs

### Data Flow
```
1. User visits /shop/heaters/bio-max-9kw
2. Page fetches product from Medusa by handle
3. Page fetches heater content from Payload by product.id
4. Both passed to HeaterDetailScene
5. Accordion renders Payload content with working PDF links
```
