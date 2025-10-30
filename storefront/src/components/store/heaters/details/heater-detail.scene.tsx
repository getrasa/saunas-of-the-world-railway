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
import { addMultipleToCart } from "@lib/data/cart"
import type { HeaterProductMetadata } from "~/types/medusa-product"
import type { HeaterContentData } from "@lib/data/heater-content"
import { toKebabCase } from "~/lib/utils"

interface AccessoryProduct {
  id: string
  handle: string
  variantId: string
  price: number
}

interface HeaterDetailSceneProps {
  product: HttpTypes.StoreProduct
  relatedProducts: HttpTypes.StoreProduct[]
  countryCode: string
  accessoryProducts: Record<string, AccessoryProduct>
  heaterContent: HeaterContentData | null
}

// Helper to convert variant options to a keymap
const optionsAsKeymap = (variant: HttpTypes.StoreProductVariant) => {
  return (variant.options || []).reduce(
    (acc: Record<string, string>, varopt: any) => {
      if (varopt.option?.title && varopt.value) {
        acc[varopt.option.title] = varopt.value
      }
      return acc
    },
    {}
  )
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
  countryCode,
  accessoryProducts,
  heaterContent,
}: HeaterDetailSceneProps) {
  const [quantity, setQuantity] = useState(1)
  const [options, setOptions] = useState<Record<string, string>>({})
  const [accessorySelections, setAccessorySelections] = useState<
    Record<string, string>
  >({})
  const [isAdding, setIsAdding] = useState(false)
  const { refreshCart, openCart } = useCart()

  // Extract product data
  const images = useMemo(() => {
    const imgs = product.images?.map(img => img.url) || []
    return imgs.filter(Boolean) as string[]
  }, [product])

  // Extract metadata
  const metadata = product.metadata as HeaterProductMetadata | undefined

  // Convert product options to optionGroups format (for main product options like Power)
  const mainOptionGroups = useMemo(() => {
    return (product.options || []).map((option) => ({
      title: option.title?.toLowerCase() === "power" ? "Choose Power" : option.title || "",
      options: (option.values || []).map((val) => ({
        id: val.value || "",
        label: val.value || "",
        available: true,
      })),
    }))
  }, [product.options])

  // Create accessory option groups from metadata
  const accessoryOptionGroups = useMemo(() => {
    const groups = []

    // Controllers
    if (metadata?.controllers) {
      try {
        const controllersArray = JSON.parse(metadata.controllers)
        if (Array.isArray(controllersArray) && controllersArray.length > 0) {
          const controllerOptions = [
            { id: "none", label: "No controller", available: true },
            ...controllersArray.map((controller: string) => ({
              id: toKebabCase(controller),
              label: controller,
              available: !!accessoryProducts[toKebabCase(controller)],
            })),
          ]
          groups.push({
            title: "Controller (required)",
            options: controllerOptions,
          })
        }
      } catch (e) {
        console.error("Failed to parse controllers metadata:", e)
      }
    }

    // PEB (Power Extension Box)
    if (metadata?.peb) {
      try {
        const pebArray = JSON.parse(metadata.peb)
        if (Array.isArray(pebArray) && pebArray.length > 0) {
          const pebOptions = [
            { id: "none", label: "No box", available: true },
            ...pebArray.map((peb: string) => ({
              id: toKebabCase(peb),
              label: peb,
              available: !!accessoryProducts[toKebabCase(peb)],
            })),
          ]
          groups.push({
            title: "Power Extension Box (required)",
            options: pebOptions,
          })
        }
      } catch (e) {
        console.error("Failed to parse PEB metadata:", e)
      }
    }

    // Rocks
    if (metadata?.rock_boxes && metadata.rock_boxes > 0) {
      const rockHandle = "rocks"
      const rockOptions = [
        { id: "none", label: "No rocks", available: true },
        {
          id: rockHandle,
          label: `Add rocks (${metadata.rock_boxes}x)`,
          available: !!accessoryProducts[rockHandle],
        },
      ]

      groups.push({
        title: "Rocks",
        options: rockOptions,
      })
    }

    return groups
  }, [metadata, accessoryProducts])

  // Combine all option groups (accessory options first, then Power at the bottom)
  const optionGroups = useMemo(() => {
    return [...accessoryOptionGroups, ...mainOptionGroups]
  }, [mainOptionGroups, accessoryOptionGroups])

  // Initialize accessory selections with "none" defaults
  useEffect(() => {
    const initialSelections: Record<string, string> = {}
    accessoryOptionGroups.forEach((group) => {
      initialSelections[group.title] = "none"
    })
    setAccessorySelections(initialSelections)
  }, [accessoryOptionGroups])

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

  // Calculate total price including accessories
  const price = useMemo(() => {
    // Base product price
    const variant = selectedVariant || product.variants?.[0]
    const baseAmount = (variant as any)?.calculated_price?.calculated_amount
    if (baseAmount == null) return null

    let totalPrice = Math.round(baseAmount)

    // Add accessory prices
    Object.entries(accessorySelections).forEach(([title, selection]) => {
      if (selection === "none") return

      if (title === "Rocks" && selection === "rocks") {
        const rockProduct = accessoryProducts["rocks"]
        if (rockProduct?.price && metadata?.rock_boxes) {
          totalPrice += rockProduct.price * metadata.rock_boxes
        }
      } else {
        const accessory = accessoryProducts[selection]
        if (accessory?.price) {
          totalPrice += accessory.price
        }
      }
    })

    // Multiply by quantity
    return totalPrice * quantity
  }, [
    selectedVariant,
    product.variants,
    accessorySelections,
    accessoryProducts,
    metadata,
    quantity,
  ])

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

  // Handle options change - separate main options from accessory selections
  const handleOptionsChange = (selections: Record<string, string>) => {
    const mainOptions: Record<string, string> = {}
    const accessories: Record<string, string> = {}

    Object.entries(selections).forEach(([title, value]) => {
      // Check if this is an accessory option group
      if (
        title === "Controller (required)" ||
        title === "Power Extension Box (required)" ||
        title === "Rocks"
      ) {
        accessories[title] = value
      } else {
        // Map "Choose Power" back to "Power" for variant matching
        const optionKey = title === "Choose Power" ? "Power" : title
        mainOptions[optionKey] = value
      }
    })

    setOptions(mainOptions)
    setAccessorySelections(accessories)
  }

  // Handle add to cart - add main product and all selected accessories
  const handleAddToCart = async () => {
    const variantId = selectedVariant?.id || product.variants?.[0]?.id

    if (!variantId) {
      console.error("No variant ID found")
      return
    }

    setIsAdding(true)
    try {
      // Build list of items to add
      const items = [{ variantId, quantity }]

      // Add selected accessories
      Object.entries(accessorySelections).forEach(([title, selection]) => {
        if (selection === "none") return

        // Handle rocks - multiply by main product quantity
        if (title === "Rocks" && selection === "rocks") {
          const rockProduct = accessoryProducts["rocks"]
          if (rockProduct?.variantId && metadata?.rock_boxes) {
            items.push({
              variantId: rockProduct.variantId,
              quantity: metadata.rock_boxes * quantity, // Multiply by main product quantity
            })
          }
        } else {
          // Handle controllers and PEB - multiply by main product quantity
          const accessory = accessoryProducts[selection]
          if (accessory?.variantId) {
            items.push({
              variantId: accessory.variantId,
              quantity: quantity, // Multiply by main product quantity
            })
          }
        }
      })

      await addMultipleToCart({
        items,
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

  // Extract advantages - prioritize Payload content, fallback to metadata, then defaults
  const advantages = useMemo(() => {
    if (heaterContent?.advantages && heaterContent.advantages.length > 0) {
      return heaterContent.advantages
    }
    const meta = product.metadata as any
    if (meta?.advantages && Array.isArray(meta.advantages)) {
      return meta.advantages as string[]
    }
    return DEFAULT_ADVANTAGES
  }, [heaterContent, product.metadata])

  // Extract specifications - prioritize Payload content, fallback to metadata
  const specifications = useMemo(() => {
    if (heaterContent?.specifications && Object.keys(heaterContent.specifications).length > 0) {
      return heaterContent.specifications
    }
    const meta = product.metadata as any
    if (meta?.specifications && typeof meta.specifications === "object") {
      return meta.specifications as Record<string, string>
    }
    return {}
  }, [heaterContent, product.metadata])

  // Extract downloads from Payload content
  const downloads = useMemo(() => {
    return heaterContent?.downloads || []
  }, [heaterContent])

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
        const opt = (p.options || []).find(
          (o) => o.title?.toLowerCase() === title.toLowerCase()
        )
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
          Power: getOptionValue("power"),
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
            <HeaterDetailGallery
              images={images}
              productName={product.title || "Product"}
            />

            <HeaterDetailAccordion
              advantages={advantages}
              specifications={specifications}
              downloads={downloads}
            />
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
            onOptionsChange={handleOptionsChange}
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
