import { sdk } from "~/lib/config"
import { getRegion } from "@lib/data/regions"
import { HeaterListScene } from "~/components/store/heaters/list/heater-list.scene"
import { type ProductCardData } from "~/components/store/product/list/product-card"
import type { HeaterProduct, StockStatus } from "~/types/medusa-product"

export const revalidate = 0

// Heater category IDs
const HEATER_CATEGORIES = {
  parent: "pcat_01K4VWWYER0DNWDBBQ3JBSX31R",
  finnish: "pcat_01K75PBSBP38K86G089E26XK06",
  bio: "pcat_01K75PCSP9YXP908DXQK8XHFKH",
} as const

type HeaterFilter = "finnish" | "bio"

interface HeatersPageProps {
  searchParams: Promise<{ filter?: string }>
}

export default async function HeatersPage(props: HeatersPageProps) {
  const searchParams = await props.searchParams;
  const countryCode = "au"

  // Determine which subcategory to filter by (default: finnish)
  const filter = (searchParams.filter === "bio" ? "bio" : "finnish") as HeaterFilter
  const categoryId = filter === "bio" ? HEATER_CATEGORIES.bio : HEATER_CATEGORIES.finnish

  const region = await getRegion(countryCode)
  if (!region) {
    return null
  }
  // Fetch heater products filtered by subcategory
  const { products } = await sdk.store.product.list(
    {
      region_id: region.id,
      category_id: [categoryId],
      fields: "*variants.calculated_price,+variants.inventory_quantity,+metadata,+options.*",
      limit: 30,
    },
    { next: { tags: ["products"] } }
  ) as { products: HeaterProduct[] }


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


    // Format metadata for display
    const formatValue = (value: any): string => {
      if (typeof value === "number") return String(value)
      if (typeof value === "string") {
        // Try to parse JSON strings
        try {
          const parsed = JSON.parse(value)
          if (Array.isArray(parsed)) return parsed.join(", ")
          return value
        } catch {
          return value
        }
      }
      return "—"
    }

    // Get all variant powers from options and sort numerically
    const powerNumbers = p.variants
      ?.map(v => {
        // Find the power option value
        const powerOption = v.options?.find(opt => 
          opt.option?.title?.toLowerCase() === "power"
        )
        return powerOption?.value
      })
      .filter(Boolean)
      .map(v => parseFloat(v as string))
      .filter(v => !isNaN(v))
      .sort((a, b) => a - b) || []
    
    const powerDisplay = powerNumbers.length > 0 
      ? powerNumbers.map(v => `${v} kW`).join(" / ") 
      : "—"

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
        "Power": powerDisplay,
        "Size up to": p.metadata?.size_to ? `${p.metadata.size_to} m³` : "—",
        "Rock Boxes": formatValue(p.metadata?.rock_boxes),
      },
      // Metadata for filtering
      metadata: {
        power: powerNumbers,
        sizeFrom: p.metadata?.size_from,
        sizeTo: p.metadata?.size_to,
        rockBoxes: p.metadata?.rock_boxes,
      },
    }
  })

  return <HeaterListScene products={mapped} countryCode={countryCode} />
}
