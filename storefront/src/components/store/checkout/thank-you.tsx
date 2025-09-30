'use client'

import React from 'react'
import { CheckCircle } from 'lucide-react'

interface ThankYouProps {
  orderNumber?: string
}

export function ThankYou({ orderNumber = 'DMS91820483' }: ThankYouProps) {
  return (
    <div className="w-full max-w-[850px]">
      <div className="bg-white rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="border-b border-silver px-16 py-[39px]">
          <p className="text-[16px] font-medium text-[#6f6f6f] mb-2">
            Order #{orderNumber}
          </p>
          <div className="flex items-center gap-2.5">
            <h2 className="text-[32px] font-semibold">Thank you!</h2>
            <CheckCircle className="w-[25px] h-[25px] text-green-500" />
          </div>
        </div>

        {/* Payment Info */}
        <div className="px-[61px] py-10 space-y-6">
          <h3 className="text-[24px] font-medium">Your payment is being processed</h3>
          <p className="text-[16px] font-medium text-[#6f6f6f]">
            You'll receive a confirmation email with your order number shortly.
          </p>
        </div>

        {/* Order Details */}
        <div className="border-t border-silver px-[61px] py-10 space-y-6">
          <h3 className="text-[24px] font-medium">Order Details</h3>

          <div className="space-y-6">
            {/* Contact */}
            <div>
              <h4 className="text-[18px] font-medium mb-2">Contact</h4>
              <div className="text-[12px] text-[#6f6f6f] space-y-1">
                <p>example@gmail.com</p>
                <p>0458299384</p>
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h4 className="text-[18px] font-medium mb-2">Shipping Address</h4>
              <div className="text-[12px] text-[#6f6f6f] space-y-1">
                <p>Jenny Wu</p>
                <p>100 Example Street,Brisbane, QLD, 4000 Australia</p>
              </div>
            </div>

            {/* Billing Address */}
            <div>
              <h4 className="text-[18px] font-medium mb-2">Billing Address</h4>
              <div className="text-[12px] text-[#6f6f6f] space-y-1">
                <p>Jenny Wu</p>
                <p>100 Example Street,Brisbane, QLD, 4000 Australia</p>
              </div>
            </div>

            {/* Shipping Method */}
            <div>
              <h4 className="text-[18px] font-medium mb-2">Shipping Method</h4>
              <p className="text-[12px] text-[#6f6f6f]">Standard Courier</p>
            </div>

            {/* Payment Method */}
            <div>
              <h4 className="text-[18px] font-medium mb-2">Payment Method</h4>
              <div className="flex items-center gap-2">
                <div className="w-[21px] h-4 bg-gray-300 rounded"></div>
                <p className="text-[12px] text-[#6f6f6f]">Ending with 9883</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}