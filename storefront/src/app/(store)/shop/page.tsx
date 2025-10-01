import { ShopClient } from "./shop.client"
import { imageUrls } from "~/lib/imageUrls"

export const metadata = {
  title: "Shop Products | Saunas of the World",
  description: "Browse our premium selection of sauna heaters, infrared systems, ice baths, and control units. Official EOS partner and distributor.",
}

export interface ProductCategory {
  id: string
  name: string
  description: string
  image: string
  href: string
  featured?: boolean
  badge?: string
}

export default async function ShopPage() {
  const categories: ProductCategory[] = [
    {
      id: "finnish-sauna-heaters",
      name: "Finnish Sauna Heaters",
      description: "The high-quality heart of your sauna. Premium EOS heaters with superior performance and elegant design for authentic Finnish sauna experience.",
      image: imageUrls.electricSaunaHeater,
      href: "/shop/heaters?filter=finnish",
      featured: true,
      badge: "Bestseller",
    },
    {
      id: "bio-sauna-heaters",
      name: "Bi-O Sauna Heaters",
      description: "EOS sauna heaters with integrated vaporizer. Experience the perfect combination of traditional Finnish sauna and gentle bio-sauna climate.",
      image: imageUrls.woodSaunaHeater,
      href: "/shop/heaters?filter=bio",
      featured: true,
    },
    {
      id: "sauna-control-units",
      name: "Sauna Control Units",
      description: "The easy way to control your sauna. Advanced digital controls with precise temperature and timing for the perfect sauna session every time.",
      image: imageUrls.controlUnit,
      href: "/shop/control-units",
    },
    {
      id: "infrared",
      name: "Infrared Systems",
      description: "Comfort and warmth with health benefits. Deep-penetrating infrared heat therapy for relaxation, pain relief, and improved circulation.",
      image: imageUrls.irPanels,
      href: "/shop/infrared",
      badge: "New",
    },
    {
      id: "ice-baths",
      name: "Ice Baths",
      description: "Enhance your wellness routine with cold therapy. Professional-grade ice baths for recovery, inflammation reduction, and mental clarity.",
      image: imageUrls.iceBaths,
      href: "/shop/ice-baths",
      badge: "New",
    },
    {
      id: "steam-generators",
      name: "Steam Generators",
      description: "Premium steam generators and accessories from EOS. Create the perfect spa atmosphere with powerful, reliable steam generation.",
      image: imageUrls.steamGenerators,
      href: "/shop/steam",
    },
  ]

  return <ShopClient categories={categories} />
}

