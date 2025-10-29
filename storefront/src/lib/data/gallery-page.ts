import { getPayload } from 'payload'
import config from '@payload-config'

export interface PhotoData {
  url: string
  alt: string
}

export interface ImageGroupData {
  name: string
  photos: PhotoData[]
}

export interface GallerySectionData {
  sectionId: string
  title: string
  description: string
  imageGroups: ImageGroupData[]
}

export interface GalleryPageData {
  sections: GallerySectionData[]
}

interface MediaType {
  id: string
  url: string
  alt?: string
}

interface PhotoItemRaw {
  image: string | MediaType
}

interface ImageGroupRaw {
  name: string
  photos: PhotoItemRaw[]
}

interface GallerySectionRaw {
  sectionId: string
  title: string
  description: string
  imageGroups: ImageGroupRaw[]
}

interface GalleryPageGlobalRaw {
  sections?: GallerySectionRaw[]
}

export async function getGalleryPageData(): Promise<GalleryPageData> {
  try {
    const payload = await getPayload({
      config,
    })

    const page = await payload.findGlobal({
      // @ts-expect-error - Payload types will be generated after first build
      slug: 'gallery-page',
      depth: 2, // Populate media relationships
    }) as GalleryPageGlobalRaw

    // Transform sections
    const sections: GallerySectionData[] = page?.sections
      ? page.sections.map((section: GallerySectionRaw): GallerySectionData => {
          // Transform image groups
          const imageGroups: ImageGroupData[] = section.imageGroups?.map((group: ImageGroupRaw) => {
            // Transform photos - now they're array items with image field
            const photos: PhotoData[] = group.photos
              ?.map((photoItem: PhotoItemRaw): PhotoData | null => {
                const mediaItem = typeof photoItem.image === 'object' ? photoItem.image : null
                
                if (!mediaItem?.url) {
                  return null
                }

                return {
                  url: mediaItem.url,
                  alt: mediaItem.alt || 'Gallery image',
                }
              })
              .filter((photo: PhotoData | null): photo is PhotoData => photo !== null) || []

            return {
              name: group.name || 'Untitled',
              photos,
            }
          }) || []

          return {
            sectionId: section.sectionId || '',
            title: section.title || '',
            description: section.description || '',
            imageGroups,
          }
        })
      : []

    return {
      sections,
    }
  } catch (error) {
    console.error('Error fetching gallery page data:', error)
    return {
      sections: [],
    }
  }
}

