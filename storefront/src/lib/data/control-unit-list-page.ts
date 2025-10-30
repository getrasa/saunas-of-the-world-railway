import { getPayload } from 'payload'
import config from '@payload-config'

export interface ControlUnitListHeroData {
  title: string
  subtitle: string
  description: string
  backgroundImageUrl: string
  ctaText: string
  ctaHref: string
  features: string[]
}

export interface ControlUnitListPageData {
  hero: ControlUnitListHeroData | null
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

interface ControlUnitListPageGlobalRaw {
  hero?: HeroRaw
}

export async function getControlUnitListPageData(): Promise<ControlUnitListPageData> {
  try {
    const payload = await getPayload({
      config,
    })

    const page = await payload.findGlobal({
      // @ts-expect-error - Payload types will be generated after first build
      slug: 'control-unit-list-page',
      depth: 2,
    }) as ControlUnitListPageGlobalRaw

    // Transform hero
    let hero: ControlUnitListHeroData | null = null
    if (page?.hero) {
      const bgImage = typeof page.hero.backgroundImage === 'object' ? page.hero.backgroundImage : null

      if (bgImage?.url) {
        const features = page.hero.features?.map((f: FeatureRaw) => f.text).filter(Boolean) || []

        hero = {
          title: page.hero.title || '',
          subtitle: page.hero.subtitle || '',
          description: page.hero.description || '',
          backgroundImageUrl: bgImage.url,
          ctaText: page.hero.ctaText || 'EXPLORE NOW',
          ctaHref: page.hero.ctaHref || '#products',
          features,
        }
      }
    }

    return {
      hero,
    }
  } catch (error) {
    console.error('Error fetching control unit list page data:', error)
    return {
      hero: null,
    }
  }
}
