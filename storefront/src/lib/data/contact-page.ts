import { getPayload } from 'payload'
import config from '@payload-config'

export interface ContactHeroData {
  title: string
  imageUrl: string
}

export interface ContactInfoData {
  address: string
  phone: string
  businessHours: string
}

export interface ContactPageData {
  hero: ContactHeroData | null
  contactInfo: ContactInfoData | null
}

interface MediaType {
  id: string
  url: string
  alt?: string
}

interface ContactHeroRaw {
  title: string
  image: string | MediaType
}

interface ContactInfoRaw {
  address: string
  phone: string
  businessHours: string
}

interface ContactPageGlobalRaw {
  hero?: ContactHeroRaw
  contactInfo?: ContactInfoRaw
}

export async function getContactPageData(): Promise<ContactPageData> {
  try {
    const payload = await getPayload({
      config,
    })

    const page = await payload.findGlobal({
      // @ts-expect-error - Payload types will be generated after first build
      slug: 'contact-page',
      depth: 2,
    }) as ContactPageGlobalRaw

    // Transform hero
    let hero: ContactHeroData | null = null
    if (page?.hero) {
      const image = typeof page.hero.image === 'object' ? page.hero.image : null
      
      if (image?.url) {
        hero = {
          title: page.hero.title || 'Contact Us',
          imageUrl: image.url,
        }
      }
    }

    // Transform contact info
    let contactInfo: ContactInfoData | null = null
    if (page?.contactInfo) {
      contactInfo = {
        address: page.contactInfo.address || '',
        phone: page.contactInfo.phone || '',
        businessHours: page.contactInfo.businessHours || '',
      }
    }

    return {
      hero,
      contactInfo,
    }
  } catch (error) {
    console.error('Error fetching contact page data:', error)
    return {
      hero: null,
      contactInfo: null,
    }
  }
}

