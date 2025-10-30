import { sdk } from "~/lib/config"
import { InfraredDetailScene } from "~/components/store/infrared/details/product-detail.scene"
import { getRegion } from "@lib/data/regions"
import { getInfraredContent } from "~/lib/data/infrared-content"
import { HttpTypes } from "@medusajs/types"

export const revalidate = 0

export default async function InfraredDetailsPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
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
  )

  if (!product) {
    return <div>Product not found</div>
  }

  // Fetch related products from same collection
  let relatedProducts: HttpTypes.StoreProduct[] = []

  if (product.collection_id) {
    const { products: collectionProducts } = await sdk.store.product.list(
      {
        collection_id: [product.collection_id],
        region_id: region.id,
        fields: "*variants.calculated_price,+variants.inventory_quantity,+metadata,+options.*",
        limit: 8,
      },
      { next: { tags: ["products"] } }
    )

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
    )

    relatedProducts = otherProducts
      .filter((p) => p.id !== product.id)
      .slice(0, 7)
  }

  // Fetch infrared content from Payload CMS
  const infraredContent = await getInfraredContent(product.id)

  return (
    <InfraredDetailScene
      product={product}
      relatedProducts={relatedProducts}
      countryCode={countryCode}
      infraredContent={infraredContent}
    />
  )
}
