import { getProductsList } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { HeatersClient } from "./heaters.client"
import type { HeaterProduct } from "~/components/store/heater-card"
import { imageUrls } from "../../../../lib/imageUrls"


export const revalidate = 0

export default async function HeatersPage() {
  // Pick a country for now (no country prefix in this route). You can
  // later rewrite this route under /[countryCode]/... to use params.
  const countryCode = "au"
  const mockProducts: HeaterProduct[] = [
    {
      id: "1",
      name: "EOS Picco W",
      description:
        "Inner and outer shell of chrome steel. 3 exterior designs: polished chrome steel, matt black or anthracite pearl effect finish. Rock store fits approx. 10 kg stones.",
      price: 240,
      stockStatus: "in-stock",
      image: imageUrls.heaterProduct1,
      type: "Floor-standing / Wall-Mounting",
      saunaSize: "4.5 m³",
      power: "3.0 kW / 3.5kW",
    },
    {
      id: "2",
      name: "EOS Bi-O Mat W",
      description:
        "High-quality stainless steel heater with integrated water tank for Finnish and Bio sauna operation. Available in multiple power configurations.",
      price: 450,
      stockStatus: "in-stock",
      image: imageUrls.heaterProduct2,
      type: "Wall-Mounting",
      saunaSize: "8 m³",
      power: "6.0 kW",
    },
    {
      id: "3",
      name: "EOS Cubo",
      description:
        "Compact cubic design with excellent heat distribution. Premium quality heating elements ensure long service life.",
      price: 380,
      stockStatus: "pre-order",
      image: imageUrls.heaterProduct3,
      type: "Floor-standing",
      saunaSize: "6 m³",
      power: "4.5 kW",
    },
    {
      id: "4",
      name: "EOS 34.A",
      description:
        "Classic sauna heater with robust construction. Ideal for commercial and residential use with excellent heat output.",
      price: 680,
      stockStatus: "in-stock",
      image: imageUrls.heaterProduct4,
      type: "Floor-standing",
      saunaSize: "12 m³",
      power: "9.0 kW",
    },
    {
      id: "5",
      name: "EOS Germanius",
      description:
        "Premium tower heater with elegant design. Features advanced air circulation system for optimal sauna climate.",
      price: 920,
      stockStatus: "in-stock",
      image: imageUrls.heaterProduct1,
      type: "Floor-standing",
      saunaSize: "16 m³",
      power: "12.0 kW",
    },
    {
      id: "6",
      name: "EOS Herkules S60",
      description:
        "Heavy-duty commercial heater with superior performance. Built for continuous operation in professional environments.",
      price: 1850,
      stockStatus: "out-of-stock",
      image: imageUrls.heaterProduct2,
      type: "Floor-standing",
      saunaSize: "60 m³",
      power: "30.0 kW",
    },
    {
      id: "7",
      name: "EOS Saunadome II",
      description:
        "Innovative dome design for maximum stone capacity. Creates authentic löyly steam for traditional sauna experience.",
      price: 540,
      stockStatus: "in-stock",
      image: imageUrls.heaterProduct3,
      type: "Wall-Mounting",
      saunaSize: "10 m³",
      power: "7.5 kW",
    },
    {
      id: "8",
      name: "EOS AquaJoy",
      description:
        "Combined sauna heater with integrated aromatherapy system. Perfect for wellness and spa applications.",
      price: 1120,
      stockStatus: "in-stock",
      image: imageUrls.heaterProduct4,
      type: "Floor-standing / Wall-Mounting",
      saunaSize: "20 m³",
      power: "15.0 kW",
    },
    {
      id: "9",
      name: "EOS Mythos S45",
      description:
        "Professional grade heater with stainless steel construction. Features patented air circulation technology.",
      price: 1450,
      stockStatus: "pre-order",
      image: imageUrls.heaterProduct1,
      type: "Floor-standing",
      saunaSize: "45 m³",
      power: "24.0 kW",
    },
    {
      id: "10",
      name: "EOS Core Compact",
      description:
        "Space-saving design without compromising performance. Ideal for smaller residential saunas.",
      price: 320,
      stockStatus: "in-stock",
      image: imageUrls.heaterProduct2,
      type: "Wall-Mounting",
      saunaSize: "3.5 m³",
      power: "3.0 kW",
    },
  ]

  const region = await getRegion(countryCode)
  if (!region) {
    return null
  }

  // Fetch a page of products from Medusa
  const {
    response: { products },
  } = await getProductsList({
    pageParam: 1,
    countryCode,
    queryParams: { limit: 12, fields: "*variants.calculated_price" },
  })
  console.log("PRODUCTS", JSON.stringify(products[4], null, 2))

  // Map Medusa products into HeaterProduct shape consumed by UI
  const mapped: HeaterProduct[] = products.map((p) => ({
    id: p.id!,
    name: p.title!,
    description: p.description || "",
    // Use thumbnail or first image; price requires variant pricing, use 0 as placeholder if absent
    image: p.thumbnail || "",
    price:
      p.variants?.[0]?.calculated_price?.calculated_amount != null
        ? Math.round((p.variants[0] as any).calculated_price.calculated_amount)
        : 0,
    // stockStatus: (p.variants?.[0] as any)?.inventory_quantity > 0
    //   ? ("in-stock" as const)
    //   : ("pre-order" as const),
    stockStatus: "in-stock" as const,
    variantId: p.variants?.[0]?.id,
    type: (() => {
      const vals =
        ((p as any).options || [])
          .find((o: any) => o?.title?.toLowerCase() === "type")
          ?.values?.map((v: any) => String(v?.value || "")) || []
      const toTitle = (s: string) =>
        s.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
      return vals.length ? vals.map(toTitle).join(" / ") : "—"
    })(),
    saunaSize: (() => {
      const vals =
        ((p as any).options || [])
          .find((o: any) => o?.title?.toLowerCase() === "sauna size")
          ?.values?.map((v: any) => String(v?.value || "")) || []
      return vals.length ? vals.join(" / ") : "—"
    })(),
    power: (() => {
      const vals =
        ((p as any).options || [])
          .find((o: any) => o?.title?.toLowerCase() === "power")
          ?.values?.map((v: any) => String(v?.value || "")) || []
      return vals.length ? vals.join(" / ") : "—"
    })(),
  }))

  return <HeatersClient products={mapped} countryCode={countryCode} />
}
