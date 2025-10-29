import { getPayload } from 'payload'
import config from '@payload-config'

export interface MissionData {
  title: string
  content: string
}

export interface TeamPhotoData {
  title: string
  imageUrl: string
}

export interface TeamMemberData {
  name: string
  bio: string
}

export interface AboutPageData {
  mission: MissionData | null
  teamPhoto: TeamPhotoData | null
  teamMembers: TeamMemberData[]
  footerText: string
}

interface MediaType {
  id: string
  url: string
  alt?: string
}

interface MissionRaw {
  title: string
  content: string
}

interface TeamPhotoRaw {
  title: string
  image: string | MediaType
}

interface TeamMemberRaw {
  name: string
  bio: string
}

interface AboutPageGlobalRaw {
  mission?: MissionRaw
  teamPhoto?: TeamPhotoRaw
  teamMembers?: TeamMemberRaw[]
  footerText?: string
}

export async function getAboutPageData(): Promise<AboutPageData> {
  try {
    const payload = await getPayload({
      config,
    })

    const page = await payload.findGlobal({
      // @ts-expect-error - Payload types will be generated after first build
      slug: 'about-page',
      depth: 2,
    }) as AboutPageGlobalRaw

    // Transform mission section
    let mission: MissionData | null = null
    if (page?.mission) {
      mission = {
        title: page.mission.title || '',
        content: page.mission.content || '',
      }
    }

    // Transform team photo section
    let teamPhoto: TeamPhotoData | null = null
    if (page?.teamPhoto) {
      const image = typeof page.teamPhoto.image === 'object' ? page.teamPhoto.image : null
      
      if (image?.url) {
        teamPhoto = {
          title: page.teamPhoto.title || '',
          imageUrl: image.url,
        }
      }
    }

    // Transform team members
    const teamMembers: TeamMemberData[] = page?.teamMembers
      ? page.teamMembers.map((member: TeamMemberRaw) => ({
          name: member.name || '',
          bio: member.bio || '',
        }))
      : []

    return {
      mission,
      teamPhoto,
      teamMembers,
      footerText: page?.footerText || '',
    }
  } catch (error) {
    console.error('Error fetching about page data:', error)
    return {
      mission: null,
      teamPhoto: null,
      teamMembers: [],
      footerText: '',
    }
  }
}

