"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { StoreHero } from "~/components/store/store-hero"
import { ProductFilter, type FilterType } from "~/components/store/product/list/product-filter"
import { ProductCard, type ProductCardData } from "~/components/store/product/list/product-card"
import { useCart } from "~/contexts/cart-context"
import { addToCart } from "@lib/data/cart"
import { imageUrls } from "~/lib/imageUrls"

interface HeaterProductListProps {
  products: ProductCardData[]
  countryCode: string
}

export function HeaterListScene({ products, countryCode }: HeaterProductListProps) {
  const { refreshCart, openCart } = useCart()
  const [addingProductId, setAddingProductId] = useState<string | null>(null)
  const [activeFilters, setActiveFilters] = useState<Record<FilterType, string | null>>({
    power: null,
    "room-size": null,
    price: null,
  })

  const handleAddToCart = async (product: ProductCardData) => {
    if (!product.variantId) {
      console.error("No variant ID found for product:", product.id)
      return
    }

    setAddingProductId(product.id)
    try {
      await addToCart({
        variantId: product.variantId,
        quantity: 1,
        countryCode,
      })

      await refreshCart()
      openCart()
    } catch (error) {
      console.error("Failed to add to cart:", error)
    } finally {
      setAddingProductId(null)
    }
  }

  const handleFilterChange = (filters: Record<FilterType, string | null>) => {
    setActiveFilters(filters)
  }

  // Filter products based on active filters
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Power filter
      if (activeFilters.power) {
        const powerFilter = activeFilters.power
        const powers = product.metadata?.power || []
        
        if (powerFilter === "3-6 kW") {
          if (!powers.some(p => p >= 3 && p < 6)) return false
        } else if (powerFilter === "6-9 kW") {
          if (!powers.some(p => p >= 6 && p < 9)) return false
        } else if (powerFilter === "9-12 kW") {
          if (!powers.some(p => p >= 9 && p < 12)) return false
        } else if (powerFilter === "12+ kW") {
          if (!powers.some(p => p >= 12)) return false
        }
      }

      // Room size filter
      if (activeFilters["room-size"]) {
        const sizeFilter = activeFilters["room-size"]
        const sizeTo = product.metadata?.sizeTo
        
        if (!sizeTo) return false
        
        if (sizeFilter === "Up to 6 m³") {
          if (sizeTo > 6) return false
        } else if (sizeFilter === "6-9 m³") {
          if (sizeTo < 6 || sizeTo > 9) return false
        } else if (sizeFilter === "9-12 m³") {
          if (sizeTo < 9 || sizeTo > 12) return false
        } else if (sizeFilter === "12+ m³") {
          if (sizeTo < 12) return false
        }
      }

      // Price filter
      if (activeFilters.price) {
        const priceFilter = activeFilters.price
        const price = product.price
        
        if (priceFilter === "Under $1000") {
          if (price >= 1000) return false
        } else if (priceFilter === "$1000-$1500") {
          if (price < 1000 || price >= 1500) return false
        } else if (priceFilter === "$1500-$2000") {
          if (price < 1500 || price >= 2000) return false
        } else if (priceFilter === "Over $2000") {
          if (price < 2000) return false
        }
      }

      return true
    })
  }, [products, activeFilters])

  return (
    <div className="flex flex-col">
      <StoreHero
        title="EOS Sauna Heaters"
        subtitle="German Engineering, Exceptional Comfort"
        description="Experience premium quality with EOS sauna heaters, combining sleek design, durable materials, and advanced air convection for a perfectly balanced sauna climate."
        backgroundImage={imageUrls.heatersHero}
        ctaText="EXPLORE NOW"
        ctaHref="#products"
        features={[
          "Floor-standing, wall-mounted, or concealed models",
          "Power options from 3 to 72 kW",
          "Ideal for sauna rooms from 3 to 160 m³",
        ]}
      />

      <div className="bg-neutral-100">
        <div className="mx-auto max-w-[1512px]">
          <ProductFilter totalItems={filteredProducts.length} onFilterChange={handleFilterChange} />

          <div
            id="products"
            className="grid grid-cols-1 gap-6 px-6 pb-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filteredProducts.map((product) => (
              <Link key={product.id} href={`/shop/heaters/${product.id}`}>
                <ProductCard 
                  product={product} 
                  onAddToCart={handleAddToCart}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

