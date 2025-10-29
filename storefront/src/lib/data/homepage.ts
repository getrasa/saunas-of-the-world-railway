import { getPayload } from 'payload'
import config from '@payload-config'

/**
 * Parse text with **bold** markers and convert to HTML
 */
function parseBoldText(text: string): string {
  // Replace **text** with <strong>text</strong>
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
}

export interface HeroSlideData {
  imageSrc: string
  imageAlt: string
  priority?: boolean
  brightness: number
  tagline: string
  headline: string
  showButton: boolean
  buttonText: string
  path: string
}

export interface WhyUsData {
  title: string
  content: string
  videoUrl: string
  posterUrl?: string
}

export interface OfferingTileData {
  label: string
  imageUrl: string
  brightness: number
  href: string
}

export interface OurOfferingData {
  title: string
  tiles: OfferingTileData[]
}

export interface IndulgeData {
  titleHtml: string
  content: string
  imageUrl: string
}

export interface HomepageData {
  heroSlides: HeroSlideData[]
  whyUs: WhyUsData | null
  ourOffering: OurOfferingData | null
  indulge: IndulgeData | null
}

interface MediaType {
  id: string
  url: string
  alt?: string
}

interface HeroSlideRaw {
  image: string | MediaType
  imageAlt: string
  priority?: boolean
  brightness?: number
  tagline: string
  headline: string
  showButton?: boolean
  buttonText?: string
  buttonPath: string
}

interface WhyUsSectionRaw {
  title: string
  content: string
  video: string | MediaType
  videoPoster?: string | MediaType
}

interface OfferingTileRaw {
  label: string
  image: string | MediaType
  brightness?: number
  href: string
}

interface OurOfferingSectionRaw {
  title: string
  tiles: OfferingTileRaw[]
}

interface IndulgeSectionRaw {
  title: string
  content: string
  image: string | MediaType
}

interface HomepageGlobalRaw {
  heroSlides?: HeroSlideRaw[]
  whyUsSection?: WhyUsSectionRaw
  ourOfferingSection?: OurOfferingSectionRaw
  indulgeSection?: IndulgeSectionRaw
}

export async function getHomepageData(): Promise<HomepageData> {
  try {
    const payload = await getPayload({
      config,
    })

    const homepage = await payload.findGlobal({
      // @ts-expect-error - Payload types will be generated after first build
      slug: 'homepage',
      depth: 2, // Populate the media relationships
    }) as HomepageGlobalRaw

    // Transform hero slides
    const heroSlides: HeroSlideData[] = homepage?.heroSlides
      ? homepage.heroSlides
          .map((slide: HeroSlideRaw): HeroSlideData | null => {
            const image = typeof slide.image === 'object' ? slide.image : null
            
            if (!image || !image.url) {
              console.warn('Hero slide missing image:', slide)
              return null
            }

            return {
              imageSrc: image.url,
              imageAlt: slide.imageAlt || '',
              priority: slide.priority || false,
              brightness: slide.brightness ?? 75,
              tagline: slide.tagline || '',
              headline: slide.headline || '',
              showButton: slide.showButton !== false,
              buttonText: slide.buttonText || 'EXPLORE NOW',
              path: slide.buttonPath || '/',
            }
          })
          .filter((slide: HeroSlideData | null): slide is HeroSlideData => slide !== null)
      : []

    // Transform Why Us section
    let whyUs: WhyUsData | null = null
    if (homepage?.whyUsSection) {
      const section = homepage.whyUsSection
      const video = typeof section.video === 'object' ? section.video : null
      const poster = section.videoPoster && typeof section.videoPoster === 'object' 
        ? section.videoPoster 
        : null

      if (video?.url) {
        whyUs = {
          title: section.title || 'WHY CHOOSE US',
          content: section.content || '',
          videoUrl: video.url,
          posterUrl: poster?.url,
        }
      }
    }

    // Transform Our Offering section
    let ourOffering: OurOfferingData | null = null
    if (homepage?.ourOfferingSection?.tiles) {
      const section = homepage.ourOfferingSection
      const tiles: OfferingTileData[] = section.tiles
        .map((tile: OfferingTileRaw): OfferingTileData | null => {
          const image = typeof tile.image === 'object' ? tile.image : null
          
          if (!image?.url) {
            console.warn('Offering tile missing image:', tile)
            return null
          }

          return {
            label: tile.label,
            imageUrl: image.url,
            brightness: tile.brightness ?? 70,
            href: tile.href || '/',
          }
        })
        .filter((tile: OfferingTileData | null): tile is OfferingTileData => tile !== null)

      ourOffering = {
        title: section.title || 'OUR OFFERING',
        tiles,
      }
    }

    // Transform Indulge section
    let indulge: IndulgeData | null = null
    if (homepage?.indulgeSection) {
      const section = homepage.indulgeSection
      const image = typeof section.image === 'object' ? section.image : null

      if (image?.url) {
        // Parse **bold** text to HTML
        const titleHtml = parseBoldText(section.title || '')

        indulge = {
          titleHtml,
          content: section.content || '',
          imageUrl: image.url,
        }
      }
    }

    return {
      heroSlides,
      whyUs,
      ourOffering,
      indulge,
    }
  } catch (error) {
    console.error('Error fetching homepage data:', error)
    return {
      heroSlides: [],
      whyUs: null,
      ourOffering: null,
      indulge: null,
    }
  }
}

