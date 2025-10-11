'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useCart } from '~/contexts/cart-context'
import { convertToLocale } from '@lib/util/money'
import { listCartShippingMethods } from '@lib/data/fulfillment'
import { useCheckoutFormContext } from '~/contexts/checkout-form-context'

interface OrderSummaryProps {
  showEditButton?: boolean
  onEdit?: () => void
}

export function OrderSummary({
  showEditButton = true,
  onEdit
}: OrderSummaryProps) {
  const { items, cart } = useCart()
  const { form } = useCheckoutFormContext()
  const selectedShippingMethodId = form.watch('shippingMethodId')
  const [shippingFee, setShippingFee] = useState(0)

  // Get shipping fee from selected method
  useEffect(() => {
    async function loadShippingFee() {
      if (!cart?.id || !selectedShippingMethodId) {
        setShippingFee(0)
        return
      }

      try {
        const options = await listCartShippingMethods(cart.id)
        const selectedOption = options?.find(opt => opt.id === selectedShippingMethodId)
        setShippingFee(selectedOption?.amount || 0)
      } catch (error) {
        console.error('Failed to load shipping fee:', error)
        setShippingFee(0)
      }
    }

    loadShippingFee()
  }, [cart?.id, selectedShippingMethodId])

  const subtotal = cart?.subtotal || 0
  const total = subtotal + shippingFee
  const currencyCode = cart?.currency_code || 'AUD'

  if (!cart || items.length === 0) {
    return (
      <div className="w-[542px]">
        <div className="bg-white rounded-2xl overflow-hidden p-8 text-center">
          <p className="text-gray-600">Your cart is empty</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-[542px]">
      <div className="bg-white rounded-2xl overflow-hidden">
        {/* Order Summary Header */}
        <div className="border-b border-silver px-[49px] py-[45px]">
          <div className="flex items-end justify-between">
            <h2 className="text-[24px] font-medium">Order Summary</h2>
            <span className="text-[16px] font-medium">{items.length} Items</span>
          </div>
        </div>

        {/* Your Order */}
        {showEditButton && (
          <div className="border-b border-[#ededed] px-[49px] py-[17px] flex items-center justify-between">
            <span className="text-[18px] font-medium">Your order</span>
            <button
              onClick={onEdit}
              className="text-[16px] font-medium text-[#7a7a7a] underline hover:text-gray-900 transition-colors"
            >
              Edit
            </button>
          </div>
        )}

        {/* Order Items */}
        {items.map((item) => {
          const productTitle = item.variant?.product?.title || item.title
          const variantTitle = item.variant?.title && item.variant.title !== 'Default' ? item.variant.title : ''
          const thumbnail = item.variant?.product?.thumbnail || item.thumbnail
          const unitPrice = item.unit_price || 0

          return (
            <div key={item.id} className="px-6 py-[33px] flex gap-[47px] border-b border-[#ededed] last:border-b-0">
              <div className="w-[107px] h-[104px] rounded-lg flex items-center justify-center bg-gray-50">
                {thumbnail ? (
                  <Image
                    src={thumbnail}
                    alt={productTitle || 'Product'}
                    width={107}
                    height={104}
                    className="object-contain"
                  />
                ) : (
                  <div className="w-[89px] h-[103px] bg-gray-200 rounded-[111px]" />
                )}
              </div>
              <div className="flex-1 space-y-2">
                <p className="text-[16px] font-medium text-black line-clamp-2">{productTitle}</p>
                {variantTitle && (
                  <p className="text-[12px] text-[#6f6f6f]">{variantTitle}</p>
                )}
                <p className="text-[12px] text-[#6f6f6f]">Amount: {item.quantity}</p>
              </div>
              <div className="text-[16px] font-bold">
                {convertToLocale({ amount: unitPrice, currency_code: currencyCode })}
              </div>
            </div>
          )
        })}

        {/* Products Total */}
        <div className="border-t border-[#ededed] px-12 py-[19px] flex items-center justify-between">
          <span className="text-[16px]">Products</span>
          <span className="text-[16px]">
            {convertToLocale({ amount: subtotal, currency_code: currencyCode })}
          </span>
        </div>

        {/* Shipping Fee */}
        <div className="px-12 py-[19px] flex items-center justify-between">
          <span className="text-[16px]">Shipping Fee</span>
          <span className="text-[16px]">
            {convertToLocale({ amount: shippingFee, currency_code: currencyCode })}
          </span>
        </div>

        {/* Total */}
        <div className="border-t border-silver px-12 py-11 flex items-center justify-between">
          <span className="text-[24px] font-medium">Total</span>
          <span className="text-[24px] font-semibold">
            {convertToLocale({ amount: total, currency_code: currencyCode })}
          </span>
        </div>
      </div>
    </div>
  )
}