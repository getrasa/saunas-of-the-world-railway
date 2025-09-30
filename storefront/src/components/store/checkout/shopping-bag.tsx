'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@lib/components/ui/button'
import { Trash2, Plus, Minus } from 'lucide-react'
import { useCart } from '~/contexts/cart-context'
import { convertToLocale } from '@lib/util/money'
import { updateLineItem, deleteLineItem } from '@lib/data/cart'

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

  if (!cart || items.length === 0) {
    return (
      <div className="w-full max-w-[1408px]">
        <div className="bg-white rounded-2xl border border-silver px-16 py-[39px] text-center">
          <h2 className="text-[32px] font-semibold mb-4">Shopping Bag</h2>
          <p className="text-gray-600">Your cart is empty</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-[1408px]">
      {/* Header */}
      <div className="bg-white rounded-t-2xl border-b border-silver px-16 py-[39px]">
        <h2 className="text-[32px] font-semibold">
          Shopping Bag{' '}
          <span className="font-normal">({items.length} item{items.length !== 1 ? 's' : ''})</span>
        </h2>
      </div>

      {/* Items */}
      <div className="bg-white">
        {items.map((item, index) => {
          const isUpdating = updatingItems.has(item.id)
          const productTitle = item.variant?.product?.title || item.title
          const variantTitle = item.variant?.title && item.variant.title !== 'Default' ? item.variant.title : ''
          const thumbnail = item.variant?.product?.thumbnail || item.thumbnail
          const unitPrice = item.unit_price || 0
          const lineTotal = (item.quantity || 0) * unitPrice

          return (
            <div
              key={item.id}
              className={`flex gap-[133px] px-[100px] py-12 ${
                index < items.length - 1 ? 'border-b border-silver' : ''
              } ${isUpdating ? 'opacity-50 pointer-events-none' : ''}`}
            >
              <div className="flex gap-6 flex-1">
                {/* Product Image */}
                <div className="w-[241px] h-[238px] rounded-lg flex items-center justify-center bg-gray-50">
                  {thumbnail ? (
                    <Image
                      src={thumbnail}
                      alt={productTitle || 'Product'}
                      width={241}
                      height={238}
                      className="object-contain"
                    />
                  ) : (
                    <div className="w-[194px] h-[226px] bg-gray-200 rounded-[111px]" />
                  )}
                </div>

                {/* Product Info */}
                <div className="flex-1 space-y-[17px]">
                  <h3 className="text-[24px] font-medium">
                    <span className="text-[#c5af71]">{productTitle}</span>
                    {item.variant?.product?.subtitle && (
                      <span className="text-black"> - {item.variant.product.subtitle}</span>
                    )}
                  </h3>
                  {variantTitle && (
                    <p className="text-[18px] text-[#6f6f6f]">{variantTitle}</p>
                  )}
                  {item.variant?.product?.description && (
                    <p className="text-[16px] text-black line-clamp-2">
                      {item.variant.product.description}
                    </p>
                  )}

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center h-8 w-[100px] border border-gray-300 rounded">
                      <button
                        onClick={() => updateAmount(item.id, (item.quantity || 1) - 1)}
                        disabled={isUpdating}
                        className="flex-1 h-full flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="flex-1 text-center text-[12px]">{item.quantity}</span>
                      <button
                        onClick={() => updateAmount(item.id, (item.quantity || 1) + 1)}
                        disabled={isUpdating}
                        className="flex-1 h-full flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      disabled={isUpdating}
                      className="p-1 hover:bg-gray-100 rounded transition-colors disabled:opacity-50"
                    >
                      <Trash2 className="w-6 h-6 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="text-[24px] font-medium">
                {convertToLocale({ amount: lineTotal, currency_code: currencyCode })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Products Total */}
      <div className="bg-white border-b border-silver px-[167px] py-[43px] flex items-center justify-between">
        <span className="text-[18px]">Products</span>
        <span className="text-[18px]">
          {convertToLocale({ amount: subtotal, currency_code: currencyCode })}
        </span>
      </div>

      {/* Total and Checkout */}
      <div className="bg-white rounded-b-2xl px-40 py-[34px] space-y-[34px]">
        <div className="flex items-center justify-between">
          <span className="text-[18px] font-semibold">Total</span>
          <span className="text-[32px] font-semibold">
            {convertToLocale({ amount: subtotal, currency_code: currencyCode })}
          </span>
        </div>

        <Button
          onClick={onContinue}
          className="w-[634px] h-[49px] bg-black hover:bg-gray-800 text-white text-[16px] font-semibold rounded-[24px]"
        >
          Checkout
        </Button>
      </div>
    </div>
  )
}