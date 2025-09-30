'use client'

import React, { useState } from 'react'
import { Button } from '@lib/components/ui/button'
import { Trash2, Plus, Minus } from 'lucide-react'

interface CartItem {
  id: number
  name: string
  variant: string
  includes: string
  amount: number
  price: number
  image: string
}

interface ShoppingBagProps {
  onContinue: () => void
}

export function ShoppingBag({ onContinue }: ShoppingBagProps) {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'EOS Picco W',
      variant: 'Matt Black, Model 1, 3.5kW',
      includes: 'Include: Wall-mounting. 3,5 m connection cable 4 x 1,5 mm²',
      amount: 1,
      price: 240,
      image: '/placeholder-product.jpg'
    },
    {
      id: 2,
      name: 'EOS Picco W',
      variant: 'Matt Black, Model 1, 3.5kW',
      includes: 'Include: Wall-mounting. 3,5 m connection cable 4 x 1,5 mm²',
      amount: 1,
      price: 240,
      image: '/placeholder-product.jpg'
    }
  ])

  const updateAmount = (id: number, change: number) => {
    setItems(items.map(item =>
      item.id === id
        ? { ...item, amount: Math.max(1, item.amount + change) }
        : item
    ))
  }

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id))
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.amount, 0)

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
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`flex gap-[133px] px-[100px] py-12 ${
              index < items.length - 1 ? 'border-b border-silver' : ''
            }`}
          >
            <div className="flex gap-6 flex-1">
              {/* Product Image */}
              <div className="w-[241px] h-[238px] rounded-lg px-[18px] py-1.5 flex items-center justify-center">
                <div className="w-[194px] h-[226px] bg-gray-200 rounded-[111px]"></div>
              </div>

              {/* Product Info */}
              <div className="flex-1 space-y-[17px]">
                <h3 className="text-[24px] font-medium">
                  <span className="text-[#c5af71]">{item.name} - </span>
                  <span className="text-black">Sauna heater for small sauna cabins</span>
                </h3>
                <p className="text-[18px] text-[#6f6f6f]">{item.variant}</p>
                <p className="text-[16px] text-black">{item.includes}</p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center h-8 w-[100px] border border-gray-300 rounded">
                    <button
                      onClick={() => updateAmount(item.id, -1)}
                      className="flex-1 h-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="flex-1 text-center text-[12px]">{item.amount}</span>
                    <button
                      onClick={() => updateAmount(item.id, 1)}
                      className="flex-1 h-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                  >
                    <Trash2 className="w-6 h-6 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="text-[24px] font-medium">${item.price * item.amount}</div>
          </div>
        ))}
      </div>

      {/* Products Total */}
      <div className="bg-white border-b border-silver px-[167px] py-[43px] flex items-center justify-between">
        <span className="text-[18px]">Products</span>
        <span className="text-[18px]">${subtotal}</span>
      </div>

      {/* Total and Checkout */}
      <div className="bg-white rounded-b-2xl px-40 py-[34px] space-y-[34px]">
        <div className="flex items-center justify-between">
          <span className="text-[18px] font-semibold">Total</span>
          <span className="text-[32px] font-semibold">${subtotal}</span>
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