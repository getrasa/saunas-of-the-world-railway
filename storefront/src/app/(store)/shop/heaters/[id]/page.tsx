import { sdk } from "~/lib/config"
import { StoreProduct, HttpTypes } from "@medusajs/types"
import { ProductClient } from "./product.client"
import { getRegion } from "@lib/data/regions"
import { getProductsList } from "@lib/data/products"

export default async function ProductDetailsPage({ params }: { params: { id: string } }) {
  // Resolve region for calculated prices (using AU as in list page)
  const countryCode = "au"
  const region = await getRegion(countryCode)

  // Fetch the main product with full details
  const { products } = await sdk.store.product.list(
    { 
      id: [params.id], 
      region_id: region?.id, 
      fields: "*variants.calculated_price,+variants.inventory_quantity" 
    },
    { next: { tags: ["products"] } as any }
  )
  
  const product: StoreProduct | undefined = products?.[0]

  if (!product) {
    return <div>Product not found</div>
  }

  // Fetch related products from same collection
  let relatedProducts: HttpTypes.StoreProduct[] = []
  if (product.collection_id) {
    const { response } = await getProductsList({
      queryParams: {
        collection_id: [product.collection_id],
        limit: 8,
        fields: "*variants.calculated_price,+variants.inventory_quantity",
      } as any,
      countryCode,
    })
    relatedProducts = response.products.filter((p) => p.id !== product.id).slice(0, 7)
  }

  // If no related products from collection, get recent products
  if (relatedProducts.length === 0) {
    const { response } = await getProductsList({
      queryParams: {
        limit: 8,
        fields: "*variants.calculated_price,+variants.inventory_quantity",
      },
      countryCode,
    })
    relatedProducts = response.products.filter((p) => p.id !== product.id).slice(0, 7)
  }

  return (
    <ProductClient
      product={product}
      relatedProducts={relatedProducts}
      countryCode={countryCode}
    />
  )
}