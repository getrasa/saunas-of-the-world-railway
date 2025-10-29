import { getPayload } from 'payload'
import config from '@payload-config'

export interface GetInTouchData {
  address: string
  email: string
  phone: string
  businessHours: string
}

export interface FooterLinkData {
  label: string
  href: string
  openInNewTab: boolean
}

export interface FooterData {
  getInTouch: GetInTouchData | null
  categories: FooterLinkData[]
  aboutLinks: FooterLinkData[]
}

interface GetInTouchRaw {
  address: string
  email: string
  phone: string
  businessHours: string
}

interface FooterLinkRaw {
  label: string
  href: string
  openInNewTab?: boolean
}

interface FooterGlobalRaw {
  getInTouch?: GetInTouchRaw
  categories?: FooterLinkRaw[]
  aboutLinks?: FooterLinkRaw[]
}

export async function getFooterData(): Promise<FooterData | null> {
  try {
    const payload = await getPayload({
      config,
    })

    const footer = await payload.findGlobal({
      // @ts-expect-error - Payload types will be generated after first build
      slug: 'footer',
      depth: 1,
    }) as FooterGlobalRaw

    // If no footer data exists yet, return null to trigger fallback
    if (!footer) {
      console.warn('Footer global not found, using fallback defaults')
      return null
    }

    // Transform get in touch section
    let getInTouch: GetInTouchData | null = null
    if (footer.getInTouch) {
      getInTouch = {
        address: footer.getInTouch.address || '',
        email: footer.getInTouch.email || '',
        phone: footer.getInTouch.phone || '',
        businessHours: footer.getInTouch.businessHours || '',
      }
    }

    // Transform categories
    const categories: FooterLinkData[] = footer.categories
      ? footer.categories.map((link: FooterLinkRaw) => ({
          label: link.label || '',
          href: link.href || '/',
          openInNewTab: link.openInNewTab || false,
        }))
      : []

    // Transform about links
    const aboutLinks: FooterLinkData[] = footer.aboutLinks
      ? footer.aboutLinks.map((link: FooterLinkRaw) => ({
          label: link.label || '',
          href: link.href || '/',
          openInNewTab: link.openInNewTab || false,
        }))
      : []

    return {
      getInTouch,
      categories,
      aboutLinks,
    }
  } catch (error) {
    console.error('Error fetching footer data:', error)
    // Return null to trigger fallback defaults in component
    return null
  }
}

