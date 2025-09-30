import { sdk } from "~/lib/config"
import { StoreProduct, HttpTypes } from "@medusajs/types"
import { ProductClient } from "./product.client"
import { imageUrls } from "~/lib/imageUrls"

const mockProduct = {
  id: "1",
  name: "EOS Picco W",
  fullName: "EOS Picco W - Sauna heater for small sauna cabins",
  description: "Very compact, space-saving design. For dry Finnish sauna, recommended for sauna size up to approx. 4,5 m³. Rock store fits approx. 10 kg stones.",
  includes: "Wall-mounting. 3,5 m connection cable 4 x 1,5 mm²",
  price: 240,
  stockStatus: "in-stock" as const,
  images: [
    imageUrls.heaterProduct1,
    imageUrls.heaterProduct2,
    imageUrls.heaterProduct3,
    imageUrls.heaterProduct4,
    imageUrls.heaterProduct1,
  ],
  optionGroups: [
    {
      title: "Controllers",
      options: [
        { id: "matt-black", label: "EmoStyle D", available: true },
        { id: "anthracite", label: "Compact DP", available: true },
        { id: "stainless", label: "No controller", available: true },
      ],
    },
    {
      title: "Choose Model",
      options: [
        { id: "model-1", label: "Rocks 1x", available: true },
        { id: "model-2", label: "No rocks", available: true },
      ],
    },
    {
      title: "Choose Power",
      options: [
        { id: "3kw", label: "3.0 kW", available: true },
        { id: "3.5kw", label: "3.5kW", available: true },
      ],
    },
  ],
  advantages: [
    "German engineering and manufacturing",
    "5-year warranty on heating elements",
    "Energy-efficient operation",
    "Quick heat-up time",
    "Low maintenance requirements",
  ],
  specifications: {
    "Power Output": "3.0 - 3.5 kW",
    "Sauna Room Size": "3 - 4.5 m³",
    Dimensions: "280 x 375 x 280 mm",
    Weight: "11 kg",
    "Stone Capacity": "10 kg",
    "Electrical Connection": "400V 3N~",
    "Control Unit": "Not included (sold separately)",
  },
};

export default async function ProductDetailsPage({ params }: { params: { id: string } }) {
  // Resolve region for calculated prices (using AU as in list page)
  const countryCode = "au"
  let regionId: string | undefined
  try {
    const { regions } = await sdk.store.region.list({})
    const match = regions?.find((r: any) =>
      (r.countries || []).some((c: any) => (c.iso_2 || "").toLowerCase() === countryCode)
    )
    regionId = match?.id
  } catch {}

  const { products } = await sdk.store.product.list(
    { id: [params.id], region_id: regionId, fields: "*variants.calculated_price" },
    { next: { tags: ["products"] } as any }
  )
  const p: StoreProduct | undefined = products?.[0]
  const images: string[] = p
    ? [p.thumbnail, ...(p.images?.map((img: any) => img.url) || [])].filter(Boolean)
    : []
  const variantPrices: number[] = (p?.variants || [])
    .map((v: any) => v?.calculated_price?.calculated_amount as number | undefined)
    .filter((n: number | undefined): n is number => typeof n === "number")
  const price = variantPrices.length ? Math.min(...variantPrices) : null

  const productInfoSections = [
    {
      title: "Your Advantages",
      content: (
        <ul className="list-disc space-y-2 pl-5 text-sm text-gray-600">
          {mockProduct.advantages.map((advantage, index) => (
            <li key={index}>{advantage}</li>
          ))}
        </ul>
      ),
    },
    {
      title: "Technical Specifications",
      content: (
        <dl className="space-y-2 text-sm">
          {Object.entries(mockProduct.specifications).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <dt className="font-medium text-gray-600">{key}:</dt>
              <dd className="text-gray-900">{value}</dd>
            </div>
          ))}
        </dl>
      ),
    },
    {
      title: "PDF Downloads",
      content: (
        <div className="space-y-2">
          <a href="#" className="block text-sm text-[#C5AF71] hover:underline">
            Installation Manual (PDF)
          </a>
          <a href="#" className="block text-sm text-[#C5AF71] hover:underline">
            Technical Datasheet (PDF)
          </a>
          <a href="#" className="block text-sm text-[#C5AF71] hover:underline">
            Warranty Information (PDF)
          </a>
        </div>
      ),
    },
  ];


  return (
    <ProductClient
      title={p?.title ?? null}
      subtitle={p?.subtitle ? p?.subtitle :  null}
      description={p?.description ?? null}
      images={images.length ? images : null}
      price={price != null ? Math.round(price) : null}
    />
  )
}