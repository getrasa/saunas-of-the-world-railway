import { sdk } from "~/lib/config"
import { getRegion } from "@lib/data/regions"
import { IceBathListScene } from "~/components/store/ice-baths/list/product-list.scene"
import { type ProductCardData } from "~/components/store/product/list/product-card"
import type { StockStatus } from "~/types/medusa-product"
import { getIceBathListPageData } from "~/lib/data/ice-bath-list-page"

export const revalidate = 0

export default async function IceBathsPage() {
  const countryCode = "au"

  // Fetch CMS hero data
  const { hero } = await getIceBathListPageData()

  const region = await getRegion(countryCode)
  if (!region) {
    return null
  }

  // Fetch ice bath products
  // TODO: Replace with actual ice bath category ID
  const { products } = await sdk.store.product.list(
    {
      region_id: region.id,
      // category_id: ["YOUR_ICE_BATH_CATEGORY_ID"], // Add your ice bath category ID here
      fields: "*variants.calculated_price,+variants.inventory_quantity,+metadata,+options.*",
      limit: 30,
    },
    { next: { tags: ["products"] } }
  )

  // Map Medusa products into ProductCardData shape
  const mapped: ProductCardData[] = products.map((p) => {
    const variant = p.variants?.[0]
    const amount = (variant as any)?.calculated_price?.calculated_amount
    const qty = (variant as any)?.inventory_quantity || 0

    let status: StockStatus = "in-stock"
    if (!variant?.manage_inventory || variant?.allow_backorder) {
      status = "in-stock"
    } else if (qty <= 0) {
      status = "out-of-stock"
    }

    // Extract options for display
    const getOptionValue = (title: string) => {
      const opt = (p.options || []).find(
        (o) => o.title?.toLowerCase() === title.toLowerCase()
      )
      return opt?.values?.map((v) => v.value).join(" / ") || "—"
    }

    return {
      id: p.id!,
      name: p.title!,
      description: p.description || "",
      image: p.thumbnail || "",
      price: amount != null ? Math.round(amount) : 0,
      stockStatus: status,
      variantId: variant?.id,
      // Options for display on the card
      options: {
        "Capacity": getOptionValue("capacity"),
        "Dimensions": getOptionValue("dimensions"),
      },
    }
  })

  return <IceBathListScene products={mapped} countryCode={countryCode} hero={hero} />
}
