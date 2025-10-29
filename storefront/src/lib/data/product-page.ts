import { getPayload } from 'payload'
import config from '@payload-config'

/**
 * Parse text with **bold** markers and convert to HTML
 */
function parseBoldText(text: string): string {
  return text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
}

export interface HeroData {
  title: string
  imageUrl: string
}

export interface ProductData {
  variant: 'left' | 'right'
  title: string
  description: string
  imageUrl: string
  stretchHorizontally: boolean
  showButton: boolean
  buttonText: string
  buttonHref: string
  openInNewTab: boolean
}

export interface HealthWellbeingData {
  title: string
  benefits: string[]
}

export interface ProductPageData {
  hero: HeroData | null
  products: ProductData[]
  healthWellbeing: HealthWellbeingData | null
}

interface MediaType {
  id: string
  url: string
  alt?: string
}

interface HeroRaw {
  title: string
  image: string | MediaType
}

interface ProductRaw {
  variant: 'left' | 'right'
  title: string
  description: string
  image: string | MediaType
  stretchHorizontally?: boolean
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

interface ProductPageGlobalRaw {
  hero?: HeroRaw
  products?: ProductRaw[]
  healthWellbeing?: HealthWellbeingRaw
}

/**
 * Generic function to fetch product page data from any product page global
 */
export async function getProductPageData(slug: string): Promise<ProductPageData> {
  try {
    const payload = await getPayload({
      config,
    })

    const page = await payload.findGlobal({
      // @ts-expect-error - Payload types will be generated after first build
      slug,
      depth: 2,
    }) as ProductPageGlobalRaw

    // Transform hero
    let hero: HeroData | null = null
    if (page?.hero) {
      const image = typeof page.hero.image === 'object' ? page.hero.image : null
      
      if (image?.url) {
        hero = {
          title: page.hero.title || '',
          imageUrl: image.url,
        }
      }
    }

    // Transform products
    const products: ProductData[] = page?.products
      ? page.products
          .map((product: ProductRaw): ProductData | null => {
            const image = typeof product.image === 'object' ? product.image : null
            
            if (!image?.url) {
              console.warn('Product missing image:', product)
              return null
            }

            return {
              variant: product.variant || 'left',
              title: product.title || '',
              description: product.description || '',
              imageUrl: image.url,
              stretchHorizontally: product.stretchHorizontally || false,
              showButton: product.showButton !== false,
              buttonText: product.buttonText || 'Explore',
              buttonHref: product.buttonHref || '/',
              openInNewTab: product.openInNewTab || false,
            }
          })
          .filter((product: ProductData | null): product is ProductData => product !== null)
      : []

    // Transform health & wellbeing
    let healthWellbeing: HealthWellbeingData | null = null
    if (page?.healthWellbeing?.benefits) {
      const benefits = page.healthWellbeing.benefits
        .map((benefit: BenefitRaw) => parseBoldText(benefit.text))
        .filter(Boolean)

      healthWellbeing = {
        title: page.healthWellbeing.title || '',
        benefits,
      }
    }

    return {
      hero,
      products,
      healthWellbeing,
    }
  } catch (error) {
    console.error(`Error fetching ${slug} data:`, error)
    return {
      hero: null,
      products: [],
      healthWellbeing: null,
    }
  }
}

// Specific exports for each page
export const getBathsPageData = () => getProductPageData('baths-page')
export const getInfraredPageData = () => getProductPageData('infrared-page')
export const getEquipmentPageData = () => getProductPageData('equipment-page')
export const getMaterialsPageData = () => getProductPageData('materials-page')

