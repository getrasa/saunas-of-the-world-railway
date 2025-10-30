import { getPayload } from 'payload'
import config from '@payload-config'

/**
 * Media type as returned by Payload
 */
interface MediaType {
  id: string
  url: string
  alt?: string
  filename?: string
  mimeType?: string
}

/**
 * Raw control unit content data from Payload (before transformation)
 */
interface ControlUnitContentRaw {
  id: string
  medusaProductId: string
  productName: string
  advantages?: Array<{
    advantage: string
    id?: string
  }>
  specifications?: Array<{
    label: string
    value: string
    id?: string
  }>
  downloads?: Array<{
    label: string
    file: string | MediaType
    id?: string
  }>
}

/**
 * Transformed control unit content data (ready for frontend consumption)
 */
export interface ControlUnitContentData {
  id: string
  medusaProductId: string
  productName: string
  advantages: string[]
  specifications: Record<string, string>
  downloads: Array<{
    label: string
    fileUrl: string
    filename?: string
  }>
}

/**
 * Fetch control unit content from Payload CMS by Medusa product ID
 *
 * @param medusaProductId - The Medusa product ID (e.g., prod_01HXXX...)
 * @returns ControlUnitContentData or null if not found
 */
export async function getControlUnitContent(
  medusaProductId: string
): Promise<ControlUnitContentData | null> {
  try {
    const payload = await getPayload({
      config,
    })

    const result = await payload.find({
      // @ts-expect-error - Payload types will be generated after first build
      collection: 'control-unit-content',
      where: {
        medusaProductId: {
          equals: medusaProductId,
        },
      },
      depth: 2, // Populate the media relationships
      limit: 1,
    })

    if (!result.docs || result.docs.length === 0) {
      return null
    }

    const raw = result.docs[0] as unknown as ControlUnitContentRaw

    // Transform advantages array
    const advantages = raw.advantages
      ? raw.advantages.map((item) => item.advantage).filter(Boolean)
      : []

    // Transform specifications array to object
    const specifications: Record<string, string> = {}
    if (raw.specifications) {
      raw.specifications.forEach((spec) => {
        if (spec.label && spec.value) {
          specifications[spec.label] = spec.value
        }
      })
    }

    // Transform downloads array
    const downloads = raw.downloads
      ? raw.downloads
          .map((download) => {
            const file = typeof download.file === 'object' ? download.file : null

            if (!file || !file.url) {
              console.warn('Download missing file:', download)
              return null
            }

            return {
              label: download.label,
              fileUrl: file.url,
              filename: file.filename,
            }
          })
          .filter((download): download is NonNullable<typeof download> => download !== null)
      : []

    return {
      id: raw.id,
      medusaProductId: raw.medusaProductId,
      productName: raw.productName,
      advantages,
      specifications,
      downloads,
    }
  } catch (error) {
    console.error(
      `Error fetching control unit content for product ${medusaProductId}:`,
      error
    )
    return null
  }
}
