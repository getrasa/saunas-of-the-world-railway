'use client'

import React from 'react'

interface OrderItem {
  id: number
  name: string
  variant: string
  amount: number
  price: number
  image: string
}

interface OrderSummaryProps {
  items?: OrderItem[]
  showEditButton?: boolean
  onEdit?: () => void
}

export function OrderSummary({
  items = [],
  showEditButton = true,
  onEdit
}: OrderSummaryProps) {
  const defaultItems: OrderItem[] = [
    {
      id: 1,
      name: 'EOS Picco W - Sauna heater for small sauna cabins',
      variant: 'Matt Black, Model 1, 3.5kW',
      amount: 1,
      price: 240,
      image: '/placeholder-product.jpg'
    },
    {
      id: 2,
      name: 'EOS Picco M - Sauna heater for small sauna cabins',
      variant: 'Matt Black, Model 1, 3.5kW',
      amount: 1,
      price: 240,
      image: '/placeholder-product.jpg'
    }
  ]

  const orderItems = items.length > 0 ? items : defaultItems
  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.amount, 0)
  const shippingFee = 0
  const total = subtotal + shippingFee

  return (
    <div className="w-[542px]">
      <div className="bg-white rounded-2xl overflow-hidden">
        {/* Order Summary Header */}
        <div className="border-b border-silver px-[49px] py-[45px]">
          <div className="flex items-end justify-between">
            <h2 className="text-[24px] font-medium">Order Summary</h2>
            <span className="text-[16px] font-medium">{orderItems.length} Items</span>
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
        {orderItems.map((item) => (
          <div key={item.id} className="px-6 py-[33px] flex gap-[47px] border-b border-[#ededed] last:border-b-0">
            <div className="w-[107px] h-[104px] rounded-lg px-[18px] py-1.5 flex items-center justify-center">
              <div className="w-[89px] h-[103px] bg-gray-200 rounded-[111px]"></div>
            </div>
            <div className="flex-1 space-y-2">
              <p className="text-[16px] font-medium text-black">{item.name}</p>
              <p className="text-[12px] text-[#6f6f6f]">{item.variant}</p>
              <p className="text-[12px] text-[#6f6f6f]">Amount: {item.amount}</p>
            </div>
            <div className="text-[16px] font-bold">${item.price}</div>
          </div>
        ))}

        {/* Products Total */}
        <div className="border-t border-[#ededed] px-12 py-[19px] flex items-center justify-between">
          <span className="text-[16px]">Products</span>
          <span className="text-[16px]">${subtotal}</span>
        </div>

        {/* Shipping Fee */}
        <div className="px-12 py-[19px] flex items-center justify-between">
          <span className="text-[16px]">Shipping Fee</span>
          <span className="text-[16px]">${shippingFee}</span>
        </div>

        {/* Total */}
        <div className="border-t border-silver px-12 py-11 flex items-center justify-between">
          <span className="text-[24px] font-medium">Total</span>
          <span className="text-[24px] font-semibold">${total}</span>
        </div>
      </div>
    </div>
  )
}