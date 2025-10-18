'use client'

import React from 'react'
import Image from 'next/image'
import { Trash2, Plus, Minus } from 'lucide-react'
import { convertToLocale } from '@lib/util/money'
import { cn } from '@lib/lib/utils'

interface CheckoutCartItemProps {
  id: string
  thumbnail?: string | null
  title: string
  variantTitle?: string
  description?: string
  quantity: number
  unitPrice: number
  currencyCode: string
  isUpdating?: boolean
  variant?: 'shopping-bag' | 'order-summary'
  showQuantityControls?: boolean
  onUpdateQuantity?: (lineId: string, newQuantity: number) => void
  onRemove?: (lineId: string) => void
}

export function CheckoutCartItem({
  id,
  thumbnail,
  title,
  variantTitle,
  description,
  quantity,
  unitPrice,
  currencyCode,
  isUpdating = false,
  variant = 'shopping-bag',
  showQuantityControls = false,
  onUpdateQuantity,
  onRemove,
}: CheckoutCartItemProps) {
  const imageHeight = variant === 'shopping-bag' ? 120 : 104
  const imageWidth = variant === 'shopping-bag' ? 160 : 107
  const lineTotal = quantity * unitPrice

  return (
    <div
      className={cn(
        'flex',
        variant === 'shopping-bag' ? 'gap-6 px-12 py-6' : 'gap-[47px] px-6 py-[33px]',
        isUpdating && 'opacity-50 pointer-events-none'
      )}
    >
      {/* Product Image */}
      <div
        className={cn(
          'rounded-lg flex items-center justify-center flex-shrink-0',
          thumbnail ? 'bg-white' : 'bg-gray-50',
          variant === 'shopping-bag' ? 'w-[160px] h-[120px]' : 'w-[107px] h-[104px]'
        )}
      >
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={title || 'Product'}
            width={imageWidth}
            height={imageHeight}
            className="object-cover rounded-lg"
            style={{ height: `${imageHeight}px`, width: 'auto' }}
          />
        ) : (
          <div
            className={cn(
              'bg-gray-200 rounded-[111px]',
              variant === 'shopping-bag' ? 'w-[130px] h-[120px]' : 'w-[89px] h-[103px]'
            )}
          />
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1 space-y-1">
        <h3
          className={cn(
            'font-medium',
            variant === 'shopping-bag' ? 'text-lg text-[#c5af71]' : 'text-[16px] text-black'
          )}
        >
          {title}
        </h3>
        {variantTitle && (
          <p className={cn('text-[#6f6f6f]', variant === 'shopping-bag' ? 'text-sm' : 'text-[12px]')}>
            {variantTitle}
          </p>
        )}
        {description && variant === 'shopping-bag' && (
          <p className="text-sm text-black line-clamp-1">
            {description}
          </p>
        )}
        {variant === 'order-summary' && (
          <p className="text-[12px] text-[#6f6f6f]">Amount: {quantity}</p>
        )}

        {/* Quantity Controls (Shopping Bag only) */}
        {showQuantityControls && onUpdateQuantity && onRemove && (
          <div className="flex items-center gap-2 pt-2">
            <div className="flex items-center h-8 w-[100px] border border-gray-300 rounded">
              <button
                onClick={() => onUpdateQuantity(id, quantity - 1)}
                disabled={isUpdating || quantity <= 1}
                className="flex-1 h-full flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50 cursor-pointer"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="flex-1 text-center text-[12px]">{quantity}</span>
              <button
                onClick={() => onUpdateQuantity(id, quantity + 1)}
                disabled={isUpdating}
                className="flex-1 h-full flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50 cursor-pointer"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
            <button
              onClick={() => onRemove(id)}
              disabled={isUpdating}
              className="p-1 hover:bg-gray-100 rounded transition-colors disabled:opacity-50 cursor-pointer"
            >
              <Trash2 className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        )}
      </div>

      {/* Price */}
      <div className={cn('font-medium', variant === 'shopping-bag' ? 'text-lg' : 'text-[16px] font-bold')}>
        {convertToLocale({ 
          amount: variant === 'shopping-bag' ? lineTotal : unitPrice, 
          currency_code: currencyCode 
        })}
      </div>
    </div>
  )
}

