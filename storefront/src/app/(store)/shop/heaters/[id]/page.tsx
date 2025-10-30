import { sdk } from "~/lib/config"
import { HeaterDetailScene } from "~/components/store/heaters/details/heater-detail.scene"
import { getRegion } from "@lib/data/regions"
import { getProductsById } from "@lib/data/products"
import { getHeaterContent } from "@lib/data/heater-content"
import type { HeaterProduct, HeaterProductMetadata } from "~/types/medusa-product"

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

  // Fetch accessory products (controllers, PEB, rocks) by product IDs
  const metadata = product.metadata as HeaterProductMetadata | undefined
  console.log("metadata", JSON.stringify(metadata, null, 2))
  const accessoryIds = new Set<string>()

  // Add controller IDs
  if (metadata?.controllers && Array.isArray(metadata.controllers)) {
    metadata.controllers.forEach((controllerId: string) => {
      accessoryIds.add(controllerId)
    })
  }

  // Add PEB IDs
  if (metadata?.peb && Array.isArray(metadata.peb)) {
    metadata.peb.forEach((pebId: string) => {
      accessoryIds.add(pebId)
    })
  }

  // Fetch all accessory products by ID (excluding rocks which we'll handle separately)
  const accessoryProductsList = accessoryIds.size > 0
    ? await getProductsById({
        ids: Array.from(accessoryIds),
        regionId: region.id
      })
    : []

  // Create a map of product ID -> product data
  const accessoryProducts: Record<string, any> = {}
  accessoryProductsList.forEach((product) => {
    if (product.id && product.variants && product.variants.length > 0) {
      const variant = product.variants[0]
      const amount = (variant as any)?.calculated_price?.calculated_amount

      accessoryProducts[product.id] = {
        id: product.id,
        handle: product.handle,
        title: product.title,
        variantId: variant.id,
        price: amount != null ? Math.round(amount) : 0,
      }
    }
  })

  // Separately fetch rocks product if needed (by handle since it's not in metadata as ID)
  if (metadata?.rock_boxes && metadata.rock_boxes > 0) {
    const { products: rocksProducts } = await sdk.store.product.list(
      {
        handle: ["rocks"],
        region_id: region.id,
        fields: "*variants.calculated_price",
      },
      { next: { tags: ["products"] } }
    )

    if (rocksProducts && rocksProducts.length > 0) {
      const rocksProduct = rocksProducts[0]
      const variant = rocksProduct.variants?.[0]
      const amount = (variant as any)?.calculated_price?.calculated_amount

      if (variant) {
        accessoryProducts["rocks"] = {
          id: rocksProduct.id,
          handle: "rocks",
          title: rocksProduct.title,
          variantId: variant.id,
          price: amount != null ? Math.round(amount) : 0,
        }
      }
    }
  }

  // Fetch heater content from Payload CMS
  const heaterContent = await getHeaterContent(product.id)

  return (
    <HeaterDetailScene
      product={product}
      relatedProducts={relatedProducts}
      countryCode={countryCode}
      accessoryProducts={accessoryProducts}
      heaterContent={heaterContent}
    />
  )
}