'use client'

import React, { useEffect, useState, useMemo } from 'react'
import { Card, CardContent, CardFooter } from '@lib/components/ui/card'
import { Separator } from '@lib/components/ui/separator'
import { useCart } from '~/contexts/cart-context'
import { convertToLocale } from '@lib/util/money'
import { listCartShippingMethods } from '@lib/data/fulfillment'
import { useCheckoutFormContext } from '~/contexts/checkout-form-context'
import { CheckoutSectionHeader } from '../components/checkout-section-header'
import { CheckoutCartItem } from '../components/checkout-cart-item'
import { ScrollableItemList } from '../components/scrollable-item-list'

interface OrderSummaryProps {
  showEditButton?: boolean
  onEdit?: () => void
  showSurcharge?: boolean
}

export function OrderSummary({
  showEditButton = true,
  onEdit,
  showSurcharge = false
}: OrderSummaryProps) {
  const { items, cart } = useCart()
  const { form } = useCheckoutFormContext()
  const selectedShippingMethodId = form.watch('shippingMethodId')
  const [shippingFee, setShippingFee] = useState(0)
  const [isCompanyOrganised, setIsCompanyOrganised] = useState(false)

  // Get shipping fee from selected method
  useEffect(() => {
    async function loadShippingFee() {
      if (!cart?.id || !selectedShippingMethodId) {
        setShippingFee(0)
        setIsCompanyOrganised(false)
        return
      }

      try {
        const options = await listCartShippingMethods(cart.id)
        const selectedOption = options?.find(opt => opt.id === selectedShippingMethodId)
        const isCompanyShipping = selectedShippingMethodId === 'so_01K799XW5HXJQST9CWNH06WQSR'
        setIsCompanyOrganised(isCompanyShipping)
        setShippingFee(selectedOption?.amount || 0)
      } catch (error) {
        console.error('Failed to load shipping fee:', error)
        setShippingFee(0)
        setIsCompanyOrganised(false)
      }
    }

    loadShippingFee()
  }, [cart?.id, selectedShippingMethodId])

  const currencyCode = cart?.currency_code || 'AUD'
  
  // Filter out surcharge items for display
  const productItems = items.filter((item: any) => {
    const isSurcharge = item.title === 'Credit Card Processing Fee (2%)' || 
                        item.metadata?.is_surcharge === true
    return !isSurcharge
  })

  // Calculate surcharge from line items
  const surchargeAmount = useMemo(() => {
    if (!cart?.items) return 0
    
    const surchargeItem = cart.items.find(
      (item: any) => item.title === 'Credit Card Processing Fee (2%)' || item.metadata?.is_surcharge === true
    )
    
    return surchargeItem ? Number(surchargeItem.unit_price || 0) : 0
  }, [cart?.items])

  // Calculate products subtotal (excluding surcharge)
  const productsSubtotal = useMemo(() => {
    return productItems.reduce((sum, item) => {
      const unitPrice = Number(item.unit_price || 0)
      const quantity = Number(item.quantity || 1)
      return sum + (unitPrice * quantity)
    }, 0)
  }, [productItems])

  const total = cart?.total || 0

  if (!cart || productItems.length === 0) {
    return (
      <Card className="w-[542px]">
        <CheckoutSectionHeader title="Order Summary" />
        <CardContent className="text-center py-8">
          <p className="text-gray-600">Your cart is empty</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-[542px]">
      {/* Order Summary Header */}
      <CheckoutSectionHeader 
        title="Order Summary" 
        subtitle={`${productItems.length} Items`}
      />

      {/* Your Order Edit Section */}
      {showEditButton && (
        <>
          <CardContent className="px-[49px] py-4 flex items-center justify-between">
            <span className="text-lg font-medium">Your order</span>
            <button
              onClick={onEdit}
              className="text-base font-medium text-[#7a7a7a] underline hover:text-gray-900 transition-colors cursor-pointer"
            >
              Edit
            </button>
          </CardContent>
          <Separator />
        </>
      )}

      {/* Order Items */}
      <CardContent className="p-0">
        <ScrollableItemList variant="order-summary">
          {productItems.map((item) => {
              const productTitle = item.variant?.product?.title || item.title
              const variantTitle = item.variant?.title && item.variant.title !== 'Default' ? item.variant.title : ''
              const thumbnail = item.variant?.product?.thumbnail || item.thumbnail
              const unitPrice = item.unit_price || 0

              return (
                <CheckoutCartItem
                  key={item.id}
                  id={item.id}
                  thumbnail={thumbnail}
                  title={productTitle || ''}
                  variantTitle={variantTitle}
                  quantity={item.quantity || 1}
                  unitPrice={unitPrice}
                  currencyCode={currencyCode}
                  variant="order-summary"
                  showQuantityControls={false}
                />
              )
            })}
        </ScrollableItemList>
      </CardContent>

      <Separator />

      {/* Show breakdown only on payment step */}
      {showSurcharge ? (
        <>
          {/* Products Total */}
          <CardContent className="px-12 py-4 flex items-center justify-between">
            <span className="text-base">Products</span>
            <span className="text-base">
              {convertToLocale({ amount: productsSubtotal, currency_code: currencyCode })}
            </span>
          </CardContent>

          {/* Credit Card Surcharge - shown above shipping fee */}
          {surchargeAmount > 0 && (
            <CardContent className="px-12 py-4 flex items-center justify-between">
              <span className="text-base">Credit Card Processing Fee (2%)</span>
              <span className="text-base">
                {convertToLocale({ amount: surchargeAmount, currency_code: currencyCode })}
              </span>
            </CardContent>
          )}

          {/* Shipping Fee */}
          <CardContent className="px-12 py-4 flex items-center justify-between">
            <span className="text-base">Shipping Fee</span>
            <span className="text-base">
              {isCompanyOrganised ? (
                <span className="text-[#6f6f6f]">Determined at time of shipping</span>
              ) : (
                convertToLocale({ amount: shippingFee, currency_code: currencyCode })
              )}
            </span>
          </CardContent>

          <Separator />
        </>
      ) : null}

      {/* Total */}
      <CardFooter className="px-12 py-8 flex items-center justify-between">
        <span className="text-xl font-medium">Total</span>
        <span className="text-xl font-semibold">
          {convertToLocale({ amount: total, currency_code: currencyCode })}
        </span>
      </CardFooter>
    </Card>
  )
}
