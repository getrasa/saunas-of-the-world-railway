"use client"

import { ProductTitle } from "~/components/store/product/details/product-title"
import { ProductDescription } from "~/components/store/product/details/product-description"
import { ProductPrice } from "~/components/store/product/shared/product-price"
import { AddToCartButton } from "~/components/ui/buttons/add-to-cart.button"
import { ProductDetailLayout } from "~/components/store/product/details/product-detail-layout"
import { StockIndicator, type StockStatus } from "~/components/store/stock-indicator"
import { ProductOptions } from "~/components/store/product/details/product-options"
import { QuantitySelector } from "~/components/store/quantity-selector"

interface ControlUnitDetailInfoProps {
  title: string
  subtitle?: string
  description?: string
  includes?: string
  price: number | null
  stockStatus: StockStatus
  optionGroups: Array<{
    title: string
    options: { id: string; label: string; available: boolean }[]
  }>
  selectedVariant: any
  quantity: number
  isAdding: boolean
  inStock: boolean
  onOptionsChange: (options: Record<string, string>) => void
  onQuantityChange: (quantity: number) => void
  onAddToCart: () => void
}

export function ControlUnitDetailInfo({
  title,
  subtitle,
  description,
  includes,
  price,
  stockStatus,
  optionGroups,
  selectedVariant,
  quantity,
  isAdding,
  inStock,
  onOptionsChange,
  onQuantityChange,
  onAddToCart,
}: ControlUnitDetailInfoProps) {
  return (
    <ProductDetailLayout.RightColumn>
      <div>
        <ProductTitle title={title} subtitle={subtitle} />

        {description && <ProductDescription>{description}</ProductDescription>}

        {includes && <p className="mb-6 text-black">Include: {includes}</p>}

        <div className="flex items-center gap-4">
          <ProductPrice value={price} />
          <StockIndicator status={stockStatus} />
        </div>
      </div>

      {optionGroups.length > 0 && (
        <>
          <ProductDetailLayout.Divider />
          <ProductOptions optionGroups={optionGroups} onSelectionChange={onOptionsChange} />
        </>
      )}

      <ProductDetailLayout.Divider />

      <div>
        <h3 className="mb-2 text-base font-medium">Amount</h3>
        <QuantitySelector quantity={quantity} onQuantityChange={onQuantityChange} />
      </div>

      <ProductDetailLayout.Divider />

      <AddToCartButton
        onClick={onAddToCart}
        disabled={!inStock || !selectedVariant || (optionGroups.length > 0 && !selectedVariant)}
        isLoading={isAdding}
      >
        {!selectedVariant && optionGroups.length > 0
          ? "Select Options"
          : !inStock
          ? "Out of Stock"
          : "Add to Cart"}
      </AddToCartButton>
    </ProductDetailLayout.RightColumn>
  )
}
