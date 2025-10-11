"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ShoppingCart } from "lucide-react";
import { ProductGallery } from "~/components/store/product-gallery";
import { ProductOptions } from "~/components/store/product-options";
import { QuantitySelector } from "~/components/store/quantity-selector";
import { ProductInfo } from "~/components/store/product-info";
import { HeaterCard, type HeaterProduct } from "~/components/store/heater-card";
import { StockIndicator, type StockStatus } from "~/components/store/stock-indicator";
import { useCart } from "~/contexts/cart-context";
import { addToCart } from "@lib/data/cart";
import { HttpTypes } from "@medusajs/types";
import { isEqual } from "lodash";

type ProductClientProps = {
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

export function ProductClient({ product, relatedProducts, countryCode }: ProductClientProps) {
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
        available: true, // Could be refined based on variant availability
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

  // Calculate price (use selected variant or cheapest variant)
  const price = useMemo(() => {
    const variant = selectedVariant || product.variants?.[0]
    const amount = (variant as any)?.calculated_price?.calculated_amount
    return amount != null ? Math.round(amount) : null
  }, [selectedVariant, product.variants])

  // Determine stock status
  const stockStatus: StockStatus = useMemo(() => {
    const variant = selectedVariant || product.variants?.[0]
    if (!variant) return "out-of-stock"

    // If we don't manage inventory, assume in stock
    if (!variant.manage_inventory) return "in-stock"

    // If we allow back orders, consider as pre-order
    if (variant.allow_backorder) return "pre-order"

    // Check inventory quantity
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

  // Extract advantages from metadata or use defaults
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
    // Return empty object if no specifications in metadata
    return {}
  }, [product.metadata])

  // Convert related products to HeaterProduct format
  const relatedHeaterProducts: HeaterProduct[] = useMemo(() => {
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

      // Extract type, sauna size, and power from product options
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
        type: getOptionValue("type"),
        saunaSize: getOptionValue("sauna size"),
        power: getOptionValue("power"),
        variantId: variant?.id,
      }
    })
  }, [relatedProducts])

  const productInfoSections = [
    {
      title: "Your Advantages",
      content: (
        <ul className="list-disc space-y-2 pl-5 text-sm text-gray-600">
          {advantages.map((advantage, index) => (
            <li key={index}>{advantage}</li>
          ))}
        </ul>
      ),
    },
    ...(Object.keys(specifications).length > 0
      ? [
          {
            title: "Technical Specifications",
            content: (
              <dl className="space-y-2 text-sm">
                {Object.entries(specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <dt className="font-medium text-gray-600">{key}:</dt>
                    <dd className="text-gray-900">{value}</dd>
                  </div>
                ))}
              </dl>
            ),
          },
        ]
      : []),
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
  ]

  const getSelectedOptionsString = () => ""

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-[1512px] px-6 py-8">
        <nav className="mb-6 flex items-center gap-2 text-xs text-gray-500">
          <Link href="/shop" className="hover:text-gray-700">
            Products
          </Link>
          <span>&gt;</span>
          <Link href="/shop/heaters" className="hover:text-gray-700">
            Sauna Heaters
          </Link>
          <span>&gt;</span>
          <span className="font-medium text-black">{product.title}</span>
        </nav>

        <Link
          href="/shop/heaters"
          className="mb-8 inline-flex items-center gap-1 rounded-full border border-black px-3 py-1 text-xs font-semibold transition-colors hover:bg-gray-100"
        >
          <ChevronLeft className="h-3 w-3" />
          Back
        </Link>

        <div className="grid gap-12 lg:grid-cols-[737px_1fr]">
          <div className="flex flex-col gap-12">
            <ProductGallery
              images={images}
              productName={product.title || "Product"}
              selectedOptions={getSelectedOptionsString()}
            />
            <div className="w-full">
              <ProductInfo sections={productInfoSections} />
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div>
              <h1 className="mb-6 text-3xl font-semibold">
                <span className="text-[#C5AF71]">{product.title}</span>
                {product.subtitle && (
                  <span className="text-black"> - {product.subtitle}</span>
                )}
              </h1>
              {product.description && (
                <p className="mb-4 text-gray-600">{product.description}</p>
              )}
              {(product.metadata as any)?.includes && (
                <p className="mb-6 text-black">
                  Include: {(product.metadata as any).includes}
                </p>
              )}

              <div className="flex items-center gap-4">
                {price != null && (
                  <span className="text-3xl font-semibold">${price}</span>
                )}
                <StockIndicator status={stockStatus} />
              </div>
            </div>

            {optionGroups.length > 0 && (
              <>
                <div className="h-px bg-gray-200" />
                <ProductOptions
                  optionGroups={optionGroups}
                  onSelectionChange={setOptions}
                />
              </>
            )}

            <div className="h-px bg-gray-200" />

            <div>
              <h3 className="mb-2 text-base font-medium">Amount</h3>
              <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />
            </div>

            <div className="h-px bg-gray-200" />

            <button
              onClick={handleAddToCart}
              disabled={isAdding || !inStock || !selectedVariant}
              className="flex h-12 w-full items-center justify-center gap-3 rounded-3xl bg-black text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isAdding ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span className="font-semibold">Adding...</span>
                </>
              ) : !selectedVariant && optionGroups.length > 0 ? (
                <span className="font-semibold">Select Options</span>
              ) : !inStock ? (
                <span className="font-semibold">Out of Stock</span>
              ) : (
                <>
                  <ShoppingCart className="h-5 w-5" />
                  <span className="font-semibold">Add to Cart</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {relatedHeaterProducts.length > 0 && (
        <div className="mt-16 bg-neutral-100 px-6 py-16">
          <div className="mx-auto max-w-[1512px]">
            <h2 className="mb-12 text-3xl font-semibold">You may also be interested in</h2>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {relatedHeaterProducts.map((prod) => (
                <Link key={prod.id} href={`/shop/heaters/${prod.id}`}>
                  <HeaterCard product={prod} onAddToCart={() => {}} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


