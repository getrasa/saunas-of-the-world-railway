"use client"

import { useState } from "react"
import Link from "next/link"
import { StoreHero } from "~/components/store/store-hero"
import { ProductCard, type ProductCardData } from "~/components/store/product/list/product-card"
import { useCart } from "~/contexts/cart-context"
import { addToCart } from "@lib/data/cart"
import type { IceBathListHeroData } from "~/lib/data/ice-bath-list-page"

interface IceBathProductListProps {
  products: ProductCardData[]
  countryCode: string
  hero: IceBathListHeroData | null
}

export function IceBathListScene({ products, countryCode, hero }: IceBathProductListProps) {
  const { refreshCart, openCart } = useCart()
  const [addingProductId, setAddingProductId] = useState<string | null>(null)

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

  return (
    <div className="flex flex-col">
      {hero && (
        <StoreHero
          title={hero.title}
          subtitle={hero.subtitle}
          description={hero.description}
          backgroundImage={hero.backgroundImageUrl}
          ctaText={hero.ctaText}
          ctaHref={hero.ctaHref}
          features={hero.features}
        />
      )}

      <div className="bg-neutral-100">
        <div className="mx-auto max-w-[1512px]">
          <div className="px-6 py-8">
            <p className="text-sm text-neutral-600">
              {products.length} {products.length === 1 ? "product" : "products"}
            </p>
          </div>

          <div
            id="products"
            className="grid grid-cols-1 gap-6 px-6 pb-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {products.map((product) => (
              <Link key={product.id} href={`/shop/ice-baths/${product.id}`}>
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
