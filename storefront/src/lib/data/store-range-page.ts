import { getPayload } from 'payload'
import config from '@payload-config'

export interface StoreHeroData {
  title: string
  subtitle: string
  description: string
  backgroundImageUrl: string
  ctaText: string
  ctaHref: string
  features: string[]
}

export interface CategoryData {
  id: string
  name: string
  description: string
  imageUrl: string
  href: string
  featured: boolean
  badge?: string
}

export interface StatData {
  value: string
  label: string
}

export interface EosPartnershipData {
  badge: string
  title: string
  content: string
  stats: StatData[]
  imageUrl: string
}

export interface WhyChooseUsCardData {
  title: string
  description: string
}

export interface WhyChooseUsData {
  title: string
  cards: WhyChooseUsCardData[]
}

export interface StoreRangePageData {
  hero: StoreHeroData | null
  categories: CategoryData[]
  eosPartnership: EosPartnershipData | null
  whyChooseUs: WhyChooseUsData | null
}

interface MediaType {
  id: string
  url: string
  alt?: string
}

interface FeatureRaw {
  text: string
}

interface HeroRaw {
  title: string
  subtitle: string
  description: string
  backgroundImage: string | MediaType
  ctaText?: string
  ctaHref?: string
  features?: FeatureRaw[]
}

interface CategoryRaw {
  id: string
  name: string
  description: string
  image: string | MediaType
  href: string
  featured?: boolean
  badge?: string
}

interface StatRaw {
  value: string
  label: string
}

interface EosPartnershipRaw {
  badge?: string
  title: string
  content: string
  stats?: StatRaw[]
  image: string | MediaType
}

interface WhyChooseUsCardRaw {
  title: string
  description: string
}

interface WhyChooseUsRaw {
  title: string
  cards?: WhyChooseUsCardRaw[]
}

interface StoreRangePageGlobalRaw {
  hero?: HeroRaw
  categories?: CategoryRaw[]
  eosPartnership?: EosPartnershipRaw
  whyChooseUs?: WhyChooseUsRaw
}

export async function getStoreRangePageData(): Promise<StoreRangePageData> {
  try {
    const payload = await getPayload({
      config,
    })

    const page = await payload.findGlobal({
      // @ts-expect-error - Payload types will be generated after first build
      slug: 'store-range-page',
      depth: 2,
    }) as StoreRangePageGlobalRaw

    // Transform hero
    let hero: StoreHeroData | null = null
    if (page?.hero) {
      const bgImage = typeof page.hero.backgroundImage === 'object' ? page.hero.backgroundImage : null
      
      if (bgImage?.url) {
        const features = page.hero.features?.map((f: FeatureRaw) => f.text).filter(Boolean) || []
        
        hero = {
          title: page.hero.title || '',
          subtitle: page.hero.subtitle || '',
          description: page.hero.description || '',
          backgroundImageUrl: bgImage.url,
          ctaText: page.hero.ctaText || 'EXPLORE PRODUCTS',
          ctaHref: page.hero.ctaHref || '#categories',
          features,
        }
      }
    }

    // Transform categories
    const categories: CategoryData[] = page?.categories
      ? page.categories
          .map((cat: CategoryRaw): CategoryData | null => {
            const image = typeof cat.image === 'object' ? cat.image : null
            
            if (!image?.url) {
              console.warn('Category missing image:', cat)
              return null
            }

            return {
              id: cat.id || '',
              name: cat.name || '',
              description: cat.description || '',
              imageUrl: image.url,
              href: cat.href || '/',
              featured: cat.featured || false,
              badge: cat.badge,
            }
          })
          .filter((cat: CategoryData | null): cat is CategoryData => cat !== null)
      : []

    // Transform EOS Partnership
    let eosPartnership: EosPartnershipData | null = null
    if (page?.eosPartnership) {
      const section = page.eosPartnership
      const image = typeof section.image === 'object' ? section.image : null
      
      if (image?.url) {
        const stats = section.stats?.map((s: StatRaw) => ({
          value: s.value || '',
          label: s.label || '',
        })) || []

        eosPartnership = {
          badge: section.badge || 'Official EOS Partner',
          title: section.title || '',
          content: section.content || '',
          stats,
          imageUrl: image.url,
        }
      }
    }

    // Transform Why Choose Us
    let whyChooseUs: WhyChooseUsData | null = null
    if (page?.whyChooseUs) {
      const section = page.whyChooseUs
      const cards = section.cards?.map((c: WhyChooseUsCardRaw) => ({
        title: c.title || '',
        description: c.description || '',
      })) || []

      whyChooseUs = {
        title: section.title || '',
        cards,
      }
    }

    return {
      hero,
      categories,
      eosPartnership,
      whyChooseUs,
    }
  } catch (error) {
    console.error('Error fetching store range page data:', error)
    return {
      hero: null,
      categories: [],
      eosPartnership: null,
      whyChooseUs: null,
    }
  }
}

