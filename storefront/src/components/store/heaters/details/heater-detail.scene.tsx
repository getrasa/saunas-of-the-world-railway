"use client"

import { useState, useMemo, useEffect } from "react"
import { HttpTypes } from "@medusajs/types"
import { isEqual } from "lodash"
import { Breadcrumb } from "~/components/ui/breadcrumb"
import { BackButton } from "~/components/ui/buttons/back.button"
import { ProductDetailLayout } from "~/components/store/product/details/product-detail-layout"
import { type ProductCardData } from "~/components/store/product/list/product-card"
import { type StockStatus } from "~/components/store/stock-indicator"
import { ProductRecommendations } from "~/components/store/product/shared/product-recommendations"
import { HeaterDetailGallery } from "./heater-detail-gallery"
import { HeaterDetailAccordion } from "./heater-detail-accordion"
import { HeaterDetailInfo } from "./heater-detail-info"
import { useCart } from "~/contexts/cart-context"
import { addToCart } from "@lib/data/cart"

interface HeaterDetailSceneProps {
  product: HttpTypes.StoreProduct
  relatedProducts: HttpTypes.StoreProduct[]
  countryCode: string
}

// Helper to convert variant options to a keymap
const optionsAsKeymap = (variant: HttpTypes.StoreProductVariant) => {
  return (variant.options || []).reduce((acc: Record<string, string>, varopt: any) => {
    if (varopt.option?.title && varopt.value) {
      acc[varopt.option.title] = varopt.value
    }
    return acc
  }, {})
}

// Default fallback data
const DEFAULT_ADVANTAGES = [
  "German engineering and manufacturing",
  "5-year warranty on heating elements",
  "Energy-efficient operation",
  "Quick heat-up time",
  "Low maintenance requirements",
]

export function HeaterDetailScene({ 
  product, 
  relatedProducts, 
  countryCode 
}: HeaterDetailSceneProps) {
  const [quantity, setQuantity] = useState(1)
  const [options, setOptions] = useState<Record<string, string>>({})
  const [isAdding, setIsAdding] = useState(false)
  const { refreshCart, openCart } = useCart()

  // Extract product data
  const images = useMemo(() => {
    const imgs = [product.thumbnail, ...(product.images?.map((img: any) => img.url) || [])]
    return imgs.filter(Boolean) as string[]
  }, [product])

  // Convert product options to optionGroups format
  const optionGroups = useMemo(() => {
    return (product.options || []).map((option) => ({
      title: option.title || "",
      options: (option.values || []).map((val) => ({
        id: val.value || "",
        label: val.value || "",
        available: true,
      })),
    }))
  }, [product.options])

  // Auto-select first option if only one variant
  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0])
      setOptions(variantOptions)
    }
  }, [product.variants])

  // Find the selected variant based on options
  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return undefined
    }

    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  // Calculate price
  const price = useMemo(() => {
    const variant = selectedVariant || product.variants?.[0]
    const amount = (variant as any)?.calculated_price?.calculated_amount
    return amount != null ? Math.round(amount) : null
  }, [selectedVariant, product.variants])

  // Determine stock status
  const stockStatus: StockStatus = useMemo(() => {
    const variant = selectedVariant || product.variants?.[0]
    if (!variant) return "out-of-stock"
    if (!variant.manage_inventory) return "in-stock"
    if (variant.allow_backorder) return "pre-order"
    const qty = (variant as any)?.inventory_quantity || 0
    if (qty > 0) return "in-stock"
    return "out-of-stock"
  }, [selectedVariant, product.variants])

  const inStock = stockStatus !== "out-of-stock"

  // Handle add to cart
  const handleAddToCart = async () => {
    const variantId = selectedVariant?.id || product.variants?.[0]?.id

    if (!variantId) {
      console.error("No variant ID found")
      return
    }

    setIsAdding(true)
    try {
      await addToCart({
        variantId,
        quantity,
        countryCode,
      })

      await refreshCart()
      openCart()
    } catch (error) {
      console.error("Failed to add to cart:", error)
    } finally {
      setIsAdding(false)
    }
  }

  // Extract advantages from metadata
  const advantages = useMemo(() => {
    const meta = product.metadata as any
    if (meta?.advantages && Array.isArray(meta.advantages)) {
      return meta.advantages as string[]
    }
    return DEFAULT_ADVANTAGES
  }, [product.metadata])

  // Extract specifications from metadata
  const specifications = useMemo(() => {
    const meta = product.metadata as any
    if (meta?.specifications && typeof meta.specifications === "object") {
      return meta.specifications as Record<string, string>
    }
    return {}
  }, [product.metadata])

  // Breadcrumb items
  const breadcrumbItems = [
    { label: "Products", href: "/shop" },
    { label: "Sauna Heaters", href: "/shop/heaters" },
    { label: product.title || "Product" },
  ]

  // Convert related products to ProductCardData format
  const relatedProductCards: ProductCardData[] = useMemo(() => {
    return relatedProducts.map((p) => {
      const variant = p.variants?.[0]
      const amount = (variant as any)?.calculated_price?.calculated_amount
      const qty = (variant as any)?.inventory_quantity || 0

      let status: StockStatus = "in-stock"
      if (!variant?.manage_inventory || variant?.allow_backorder) {
        status = "in-stock"
      } else if (qty <= 0) {
        status = "out-of-stock"
      }

      // Extract metadata for product card
      const getOptionValue = (title: string) => {
        const opt = (p.options || []).find((o) => o.title?.toLowerCase() === title.toLowerCase())
        return opt?.values?.map((v) => v.value).join(" / ") || "—"
      }

      return {
        id: p.id!,
        name: p.title!,
        description: p.description || "",
        price: amount != null ? Math.round(amount) : 0,
        stockStatus: status,
        image: p.thumbnail || "",
        variantId: variant?.id,
        metadata: {
          "Type Available": getOptionValue("type"),
          "Sauna Size Up To": getOptionValue("sauna size"),
          "Power": getOptionValue("power"),
        },
      }
    })
  }, [relatedProducts])

  return (
    <>
      <ProductDetailLayout>
        <Breadcrumb items={breadcrumbItems} className="mb-6" />

        <BackButton href="/shop/heaters" className="mb-8" />

        <ProductDetailLayout.Grid>
          <ProductDetailLayout.LeftColumn>
            <HeaterDetailGallery images={images} productName={product.title || "Product"} />
            
            <HeaterDetailAccordion advantages={advantages} specifications={specifications} />
          </ProductDetailLayout.LeftColumn>

          <HeaterDetailInfo
            title={product.title || ""}
            subtitle={product.subtitle || ""}
            description={product.description || ""}
            includes={(product.metadata as any)?.includes}
            price={price}
            stockStatus={stockStatus}
            optionGroups={optionGroups}
            selectedVariant={selectedVariant}
            quantity={quantity}
            isAdding={isAdding}
            inStock={inStock}
            onOptionsChange={setOptions}
            onQuantityChange={setQuantity}
            onAddToCart={handleAddToCart}
          />
        </ProductDetailLayout.Grid>
      </ProductDetailLayout>

      <ProductRecommendations
        products={relatedProductCards}
        linkBuilder={(id) => `/shop/heaters/${id}`}
        className="mt-16"
      />
    </>
  )
}

