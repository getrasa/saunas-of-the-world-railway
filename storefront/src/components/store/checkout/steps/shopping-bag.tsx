'use client'

import React, { useState } from 'react'
import { Button } from '@lib/components/ui/button'
import { Card, CardContent, CardFooter } from '@lib/components/ui/card'
import { Separator } from '@lib/components/ui/separator'
import { useCart } from '~/contexts/cart-context'
import { convertToLocale } from '@lib/util/money'
import { updateLineItem, deleteLineItem } from '@lib/data/cart'
import { CheckoutSectionHeader } from '../components/checkout-section-header'
import { CheckoutCartItem } from '../components/checkout-cart-item'
import { ScrollableItemList } from '../components/scrollable-item-list'

interface ShoppingBagProps {
  onContinue: () => void
}

export function ShoppingBag({ onContinue }: ShoppingBagProps) {
  const { items, cart, refreshCart } = useCart()
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set())

  const updateAmount = async (lineId: string, newQuantity: number) => {
    if (newQuantity < 1) return

    setUpdatingItems(prev => new Set(prev).add(lineId))
    try {
      await updateLineItem({ lineId, quantity: newQuantity })
      await refreshCart()
    } catch (error) {
      console.error('Failed to update item:', error)
    } finally {
      setUpdatingItems(prev => {
        const next = new Set(prev)
        next.delete(lineId)
        return next
      })
    }
  }

  const removeItem = async (lineId: string) => {
    setUpdatingItems(prev => new Set(prev).add(lineId))
    try {
      await deleteLineItem(lineId)
      await refreshCart()
    } catch (error) {
      console.error('Failed to remove item:', error)
      setUpdatingItems(prev => {
        const next = new Set(prev)
        next.delete(lineId)
        return next
      })
    }
  }

  const subtotal = cart?.subtotal || 0
  const currencyCode = cart?.currency_code || 'USD'

  // Filter out surcharge items for display
  const productItems = items.filter((item: any) => {
    const isSurcharge = item.title === 'Credit Card Processing Fee (2%)' || 
                        item.metadata?.is_surcharge === true
    return !isSurcharge
  })

  if (!cart || productItems.length === 0) {
    return (
      <Card className="w-full max-w-[1408px]">
        <CheckoutSectionHeader title="Shopping Bag" />
        <CardContent className="text-center py-8">
          <p className="text-gray-600">Your cart is empty</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-[1408px]">
      {/* Header */}
      <CheckoutSectionHeader 
        title="Shopping Bag" 
        subtitle={`(${productItems.length} item${productItems.length !== 1 ? 's' : ''})`}
      />

      {/* Items */}
      <CardContent className="p-0">
        <ScrollableItemList variant="shopping-bag">
          {productItems.map((item) => {
              const isUpdating = updatingItems.has(item.id)
              const productTitle = item.variant?.product?.title || item.title
              const variantTitle = item.variant?.title && item.variant.title !== 'Default' ? item.variant.title : ''
              const thumbnail = item.variant?.product?.thumbnail || item.thumbnail
              const description = item.variant?.product?.description || ''
              const unitPrice = item.unit_price || 0

              return (
                <CheckoutCartItem
                  key={item.id}
                  id={item.id}
                  thumbnail={thumbnail}
                  title={productTitle || ''}
                  variantTitle={variantTitle}
                  description={description}
                  quantity={item.quantity || 1}
                  unitPrice={unitPrice}
                  currencyCode={currencyCode}
                  isUpdating={isUpdating}
                  variant="shopping-bag"
                  showQuantityControls={true}
                  onUpdateQuantity={updateAmount}
                  onRemove={removeItem}
                />
              )
            })}
        </ScrollableItemList>
      </CardContent>

      <Separator />

      {/* Products Total */}
      <CardContent className="px-12 py-6 flex items-center justify-between">
        <span className="text-base">Products</span>
        <span className="text-base">
          {convertToLocale({ amount: subtotal, currency_code: currencyCode })}
        </span>
      </CardContent>

      <Separator />

      {/* Total and Checkout */}
      <CardFooter className="px-12 py-6 flex flex-col gap-6">
        <div className="flex items-center justify-between w-full">
          <span className="text-lg font-semibold">Total</span>
          <span className="text-3xl font-semibold">
            {convertToLocale({ amount: subtotal, currency_code: currencyCode })}
          </span>
        </div>

        <div className="flex justify-start w-full">
          <Button
            onClick={onContinue}
            className="w-[634px] h-[49px] bg-black hover:bg-gray-800 text-white text-base font-semibold rounded-[24px] cursor-pointer"
          >
            Checkout
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
