import { sdk } from '~/lib/config'
import { NextResponse } from 'next/server'
import type { HeaterProduct } from '~/types/medusa-product'

/**
 * API endpoint to fetch heater products from Medusa
 * Used by the Payload CMS product selector
 */
export async function GET() {
  try {
    const HEATER_CATEGORY_ID = 'pcat_01K4VWWYER0DNWDBBQ3JBSX31R'

    // Fetch heater products from Medusa
    const { products } = await sdk.store.product.list({
      category_id: [HEATER_CATEGORY_ID],
      fields: 'id,title,handle,thumbnail',
      limit: 100, // Adjust if you have more heaters
    }) as { products: HeaterProduct[] }

    // Transform to a simpler format for the selector
    const heaterOptions = products.map((product) => ({
      id: product.id,
      title: product.title || 'Untitled Product',
      handle: product.handle || '',
      thumbnail: product.thumbnail || '',
    }))

    return NextResponse.json({ heaters: heaterOptions })
  } catch (error) {
    console.error('Error fetching heater products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch heater products' },
      { status: 500 }
    )
  }
}
