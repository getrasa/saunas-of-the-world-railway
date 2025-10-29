import { sdk } from "~/lib/config"
import { HeaterDetailScene } from "~/components/store/heaters/details/heater-detail.scene"
import { getRegion } from "@lib/data/regions"
import { getProductsByHandles } from "@lib/data/products"
import type { HeaterProduct, HeaterProductMetadata } from "~/types/medusa-product"
import { toKebabCase } from "~/lib/utils"

export const revalidate = 0

export default async function ProductDetailsPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const countryCode = "au"
  const region = await getRegion(countryCode)

  if (!region) {
    return <div>Region not found</div>
  }

  // Fetch the main product with full details
  const { product } = await sdk.store.product.retrieve(
    params.id,
    { 
      region_id: region.id, 
      fields: "*variants.calculated_price,+variants.inventory_quantity,+images.*,+metadata,+options.*,+collection" 
    },
    { next: { tags: ["products"] } }
  ) as { product: HeaterProduct }

  if (!product) {
    return <div>Product not found</div>
  }

  // Fetch related products from same collection
  let relatedProducts: HeaterProduct[] = []

  if (product.collection_id) {
    const { products: collectionProducts } = await sdk.store.product.list(
      { 
        collection_id: [product.collection_id],
        region_id: region.id,
        fields: "*variants.calculated_price,+variants.inventory_quantity,+metadata,+options.*",
        limit: 8,
      },
      { next: { tags: ["products"] } }
    ) as { products: HeaterProduct[] }
    
    // Filter out the current product and limit to 7
    relatedProducts = collectionProducts
      .filter((p) => p.id !== product.id)
      .slice(0, 7)
  }

  // If no related products from collection, get other products
  if (relatedProducts.length === 0) {
    const { products: otherProducts } = await sdk.store.product.list(
      {
        region_id: region.id,
        fields: "*variants.calculated_price,+variants.inventory_quantity,+metadata,+options.*",
        limit: 8,
      },
      { next: { tags: ["products"] } }
    ) as { products: HeaterProduct[] }
    
    relatedProducts = otherProducts
      .filter((p) => p.id !== product.id)
      .slice(0, 7)
  }

  // Fetch accessory products (controllers, PEB, rocks)
  const metadata = product.metadata as HeaterProductMetadata | undefined
  const accessoryHandles = new Set<string>()

  // Add controller handles
  if (metadata?.controllers) {
    try {
      const controllersArray = JSON.parse(metadata.controllers)
      if (Array.isArray(controllersArray)) {
        controllersArray.forEach((controller: string) => {
          accessoryHandles.add(toKebabCase(controller))
        })
      }
    } catch (e) {
      console.error("Failed to parse controllers metadata:", e)
    }
  }

  // Add PEB handles
  if (metadata?.peb) {
    try {
      const pebArray = JSON.parse(metadata.peb)
      if (Array.isArray(pebArray)) {
        pebArray.forEach((peb: string) => {
          accessoryHandles.add(toKebabCase(peb))
        })
      }
    } catch (e) {
      console.error("Failed to parse PEB metadata:", e)
    }
  }

  // Add rocks handle if rock_boxes is present
  if (metadata?.rock_boxes && metadata.rock_boxes > 0) {
    accessoryHandles.add("rocks")
  }

  // Fetch all accessory products by handle
  const accessoryProductsList = await getProductsByHandles(
    Array.from(accessoryHandles),
    region.id
  )

  // Create a map of handle -> product data
  const accessoryProducts: Record<string, any> = {}
  accessoryProductsList.forEach((product) => {
    if (product.handle && product.variants && product.variants.length > 0) {
      const variant = product.variants[0]
      const amount = (variant as any)?.calculated_price?.calculated_amount

      accessoryProducts[product.handle] = {
        id: product.id,
        handle: product.handle,
        variantId: variant.id,
        price: amount != null ? Math.round(amount) : 0,
      }
    }
  })

  return (
    <HeaterDetailScene
      product={product}
      relatedProducts={relatedProducts}
      countryCode={countryCode}
      accessoryProducts={accessoryProducts}
    />
  )
}