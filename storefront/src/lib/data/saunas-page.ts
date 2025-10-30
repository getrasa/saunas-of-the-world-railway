import { getPayload } from 'payload'
import config from '@payload-config'

/**
 * Parse text with **bold** markers and convert to JSX
 */
function parseBoldText(text: string): string {
  // Replace **text** with <b>text</b>
  return text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
}

export interface HeroData {
  title: string
  imageUrl: string
  brightness: number
}

export interface ShowcaseData {
  variant: 'left' | 'right'
  title: string
  description: string
  imageUrl: string
  showButton: boolean
  buttonText: string
  buttonHref: string
  openInNewTab: boolean
}

export interface HealthWellbeingData {
  title: string
  benefits: string[] // HTML strings with bold tags
}

export interface KeyConsiderationData {
  title: string
  content: string
}

export interface KeyConsiderationsData {
  introText: string
  hydration: KeyConsiderationData
  listenToBody: KeyConsiderationData
  healthConditions: KeyConsiderationData
}

export interface SaunasPageData {
  hero: HeroData | null
  showcases: ShowcaseData[]
  healthWellbeing: HealthWellbeingData | null
  keyConsiderations: KeyConsiderationsData | null
}

interface MediaType {
  id: string
  url: string
  alt?: string
}

interface HeroRaw {
  title: string
  image: string | MediaType
  brightness?: number
}

interface ShowcaseRaw {
  variant: 'left' | 'right'
  title: string
  description: string
  image: string | MediaType
  showButton?: boolean
  buttonText?: string
  buttonHref?: string
  openInNewTab?: boolean
}

interface BenefitRaw {
  text: string
}

interface HealthWellbeingRaw {
  title: string
  benefits: BenefitRaw[]
}

interface KeyConsiderationRaw {
  title: string
  content: string
}

interface KeyConsiderationsRaw {
  introText: string
  hydration: KeyConsiderationRaw
  listenToBody: KeyConsiderationRaw
  healthConditions: KeyConsiderationRaw
}

interface SaunasPageGlobalRaw {
  hero?: HeroRaw
  showcases?: ShowcaseRaw[]
  healthWellbeing?: HealthWellbeingRaw
  keyConsiderations?: KeyConsiderationsRaw
}

export async function getSaunasPageData(): Promise<SaunasPageData> {
  try {
    const payload = await getPayload({
      config,
    })

    const saunasPage = await payload.findGlobal({
      // @ts-expect-error - Payload types will be generated after first build
      slug: 'saunas-page',
      depth: 2, // Populate the media relationships
    }) as SaunasPageGlobalRaw

    // Transform hero section
    let hero: HeroData | null = null
    if (saunasPage?.hero) {
      const image = typeof saunasPage.hero.image === 'object' ? saunasPage.hero.image : null

      if (image?.url) {
        hero = {
          title: saunasPage.hero.title || 'Saunas',
          imageUrl: image.url,
          brightness: saunasPage.hero.brightness ?? 70,
        }
      }
    }

    // Transform showcases
    const showcases: ShowcaseData[] = saunasPage?.showcases
      ? saunasPage.showcases
          .map((showcase: ShowcaseRaw): ShowcaseData | null => {
            const image = typeof showcase.image === 'object' ? showcase.image : null
            
            if (!image?.url) {
              console.warn('Showcase missing image:', showcase)
              return null
            }

            return {
              variant: showcase.variant || 'left',
              title: showcase.title || '',
              description: showcase.description || '',
              imageUrl: image.url,
              showButton: showcase.showButton !== false,
              buttonText: showcase.buttonText || 'Explore',
              buttonHref: showcase.buttonHref || '/',
              openInNewTab: showcase.openInNewTab || false,
            }
          })
          .filter((showcase: ShowcaseData | null): showcase is ShowcaseData => showcase !== null)
      : []

    // Transform health & wellbeing section
    let healthWellbeing: HealthWellbeingData | null = null
    if (saunasPage?.healthWellbeing?.benefits) {
      const benefits = saunasPage.healthWellbeing.benefits
        .map((benefit: BenefitRaw) => parseBoldText(benefit.text))
        .filter(Boolean)

      healthWellbeing = {
        title: saunasPage.healthWellbeing.title || '',
        benefits,
      }
    }

    // Transform key considerations section
    let keyConsiderations: KeyConsiderationsData | null = null
    if (saunasPage?.keyConsiderations) {
      const section = saunasPage.keyConsiderations
      
      keyConsiderations = {
        introText: section.introText || '',
        hydration: {
          title: section.hydration?.title || 'Hydration',
          content: section.hydration?.content || '',
        },
        listenToBody: {
          title: section.listenToBody?.title || 'Listen to Your Body',
          content: section.listenToBody?.content || '',
        },
        healthConditions: {
          title: section.healthConditions?.title || 'Health Conditions',
          content: section.healthConditions?.content || '',
        },
      }
    }

    return {
      hero,
      showcases,
      healthWellbeing,
      keyConsiderations,
    }
  } catch (error) {
    console.error('Error fetching saunas page data:', error)
    return {
      hero: null,
      showcases: [],
      healthWellbeing: null,
      keyConsiderations: null,
    }
  }
}

