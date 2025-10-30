import { sdk } from "~/lib/config"
import { getRegion } from "@lib/data/regions"
import { ControlUnitListScene } from "~/components/store/control-units/list/product-list.scene"
import { type ProductCardData } from "~/components/store/product/list/product-card"
import type { StockStatus } from "~/types/medusa-product"
import { getControlUnitListPageData } from "~/lib/data/control-unit-list-page"

export const revalidate = 0

export default async function ControlUnitsPage() {
  const countryCode = "au"

  // Fetch CMS hero data
  const { hero } = await getControlUnitListPageData()

  const region = await getRegion(countryCode)
  if (!region) {
    return null
  }

  // Fetch control unit products
  // TODO: Replace with actual control unit category ID
  const { products } = await sdk.store.product.list(
    {
      region_id: region.id,
      // category_id: ["YOUR_CONTROL_UNIT_CATEGORY_ID"], // Add your control unit category ID here
      category_id: ["pcat_01K5XNZRCBBJMT3MWTHQ9QFZ9N"],
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
        "Compatibility": getOptionValue("compatibility"),
        "Features": getOptionValue("features"),
      },
    }
  })

  return <ControlUnitListScene products={mapped} countryCode={countryCode} hero={hero} />
}
