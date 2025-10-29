import { ProductRangeScene } from "~/components/store/product-range/product-range.scene"
import { getStoreRangePageData } from "~/lib/data/store-range-page"

export const metadata = {
  title: "Shop Products | Saunas of the World",
  description: "Browse our premium selection of sauna heaters, infrared systems, ice baths, and control units. Official EOS partner and distributor.",
}

export default async function ShopPage() {
  const data = await getStoreRangePageData()

  return <ProductRangeScene data={data} />
}

