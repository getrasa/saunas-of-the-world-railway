# Heater Content Management - Context

## Problem Statement
Heater product pages need dynamic content for:
- **Your Advantages** - Bulleted list of product benefits
- **Technical Specifications** - Table of technical details (label/value pairs)
- **PDF Downloads** - Downloadable documentation (installation manuals, datasheets, etc.)

Currently, the accordion component exists but has:
- Hardcoded advantages fallback
- Specifications from Medusa metadata (limited structure)
- Placeholder PDF links (non-functional)

## Requirements

### Content Management
1. Content must be managed in **Payload CMS** (not Medusa)
2. Each heater product gets its own content entry
3. Content linked to Medusa products via product ID
4. PDF files uploaded and managed through Payload (drag & drop)

### User Experience
- Admins should be able to easily add/edit content per heater
- PDF downloads open in new browser tab
- Content displays in accordion format (existing UI)
- Graceful fallbacks if content not available

### Future Enhancement (Phase 4)
- Custom dropdown selector to search Medusa products by name
- Auto-populate product ID (instead of manual copy/paste)
- Shows product thumbnail + name for easier selection

## Existing Architecture

### Current File Structure
```
src/
├── collections/
│   ├── Media.ts         # Existing - handles file uploads
│   └── Users.ts         # Existing - admin users
├── globals/
│   └── [various].ts     # Marketing page content
├── lib/data/
│   ├── homepage.ts      # Pattern to follow for fetching
│   └── [others].ts
├── components/store/heaters/details/
│   ├── heater-detail.scene.tsx      # Main component
│   ├── heater-detail-accordion.tsx  # Accordion component
│   ├── heater-detail-gallery.tsx
│   └── heater-detail-info.tsx
└── types/
    └── medusa-product.ts  # HeaterProductMetadata interface
```

### Payload CMS Setup
- **Database**: MongoDB
- **Storage**: S3-compatible (MinIO) for file uploads
- **Collections**: Users, Media
- **Globals**: Homepage, various product/marketing pages
- **Admin UI**: `/admin`

### Media Collection Details
- Handles file uploads via `@payloadcms/storage-s3`
- Files stored in Railway S3 bucket: `bucket-production-2b37.up.railway.app`
- Media objects have `url` property with full S3 URL
- Upload field type with `relationTo: 'media'` creates file upload UI
- Can filter by mimeType (e.g., only PDFs)

### Current Accordion Implementation
Located in `src/components/store/heaters/details/heater-detail-accordion.tsx`:
- Uses reusable `ProductAccordion` component
- Three sections: Advantages, Technical Specifications, PDF Downloads
- Currently accepts: `advantages: string[]`, `specifications: Record<string, string>`
- PDF Downloads section has placeholder links with `#` hrefs

### Data Fetching Pattern
From existing `src/lib/data/homepage.ts`:
```typescript
import { getPayloadHMR } from "@payloadcms/next/utilities"
import configPromise from "@payload-config"

const payload = await getPayloadHMR({ config: configPromise })
const data = await payload.findGlobal({
  slug: 'homepage',
  depth: 2,  // Populates relationships
})
```

For collections, use `payload.find()` instead of `payload.findGlobal()`.

## Design Decisions

### Collection vs Global
**Decision**: Use Collection (not Global)
- **Why**: Each heater needs its own content document
- Globals are singletons (only one instance)
- Collections allow multiple entries queried by criteria

### Collection Name
**Decision**: `heater-content`
- Clear and descriptive
- Matches pattern of hyphenated names
- Alternative considered: `heater-details`, `product-content`

### PDF File Management
**Decision**: Payload Media upload fields (not text URLs)
- **Why**:
  - Users can drag & drop files directly in admin
  - Payload handles S3 upload automatically
  - No manual URL management needed
  - Consistent with existing Media collection pattern
  - Files backed up with CMS content

### Product Linking Strategy
**Phase 1-3**: Manual text field for Medusa product ID
- Simple to implement
- Gets functionality working quickly
- Users copy ID from Medusa admin

**Phase 4**: Custom searchable dropdown
- Better UX for content editors
- Shows product name + thumbnail
- Prevents copy/paste errors
- Auto-populates product name

## Key Files to Modify

### Phase 1
- `src/collections/HeaterContent.ts` (new)
- `src/payload.config.ts` (add import)
- `src/types/payload-types.ts` (new or existing)

### Phase 2
- `src/lib/data/heater-content.ts` (new)
- `src/app/(store)/shop/heaters/[handle]/page.tsx` (modify)

### Phase 3
- `src/components/store/heaters/details/heater-detail.scene.tsx` (modify)
- `src/components/store/heaters/details/heater-detail-accordion.tsx` (modify)

### Phase 4 (Future)
- `src/app/api/medusa/heaters/route.ts` (new)
- `src/components/payload/MedusaProductSelector.tsx` (new)
- `src/collections/HeaterContent.ts` (modify to add custom component)

## Reference Screenshots
User provided 3 screenshots showing:
1. **Your Advantages** - Bulleted list format
2. **Technical Specifications** - Two-column table (label | value)
3. **Downloads** - List of PDF links with labels

Content structure matches proposed implementation.
