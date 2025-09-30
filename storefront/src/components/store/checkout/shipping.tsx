'use client'

import React, { useState } from 'react'
import { Input } from '@lib/components/ui/input'
import { Checkbox } from '@lib/components/ui/checkbox'
import { Button } from '@lib/components/ui/button'
import { Search } from 'lucide-react'

interface ShippingProps {
  onContinue: () => void
}

export function Shipping({ onContinue }: ShippingProps) {
  const [billingAddressSameAsDelivery, setBillingAddressSameAsDelivery] = useState(false)
  const [safeToLeave, setSafeToLeave] = useState(false)

  return (
    <div className="w-full max-w-[850px]">
      <div className="bg-white rounded-2xl overflow-hidden">
        {/* Section Header */}
        <div className="border-b border-silver px-16 py-[39px]">
          <h2 className="text-[32px] font-semibold">Delivery</h2>
        </div>

        {/* Form Content */}
        <div className="px-[61px] py-10 space-y-10">
          <h3 className="text-[24px] font-medium">Where are we sending your order?</h3>

          {/* Name Fields */}
          <div className="space-y-6 w-[708px]">
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  placeholder="First name"
                  className="h-[59px] bg-neutral-100 border-0 rounded-lg px-[19px] text-[16px] placeholder:text-[#6f6f6f]"
                />
              </div>
              <div className="flex-1">
                <Input
                  placeholder="Last name"
                  className="h-[59px] bg-neutral-100 border-0 rounded-lg px-[19px] text-[16px] placeholder:text-[#6f6f6f]"
                />
              </div>
            </div>

            {/* Address Field */}
            <div className="relative">
              <Input
                placeholder="e.g. 1/123 Main Street"
                className="h-[58px] bg-neutral-100 border-0 rounded-lg px-[19px] pr-12 text-[16px] placeholder:text-[#6f6f6f]"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 size-6 text-[#6f6f6f]" />
            </div>
          </div>

          {/* Safe to leave checkbox */}
          <div className="flex items-center gap-[15px]">
            <Checkbox
              id="safe-to-leave"
              checked={safeToLeave}
              onCheckedChange={(checked) => setSafeToLeave(checked as boolean)}
              className="size-5 rounded data-[state=checked]:bg-[#C5AF71] data-[state=checked]:border-[#C5AF71]"
            />
            <label
              htmlFor="safe-to-leave"
              className="text-[16px] text-[#6f6f6f] cursor-pointer"
            >
              Safe to leave at front door if I'm not home.
            </label>
          </div>

          {/* Billing Address Section */}
          <div className="space-y-[26px] w-[708px]">
            <h4 className="text-[16px] font-medium">Billing Address</h4>

            <div className="flex items-center gap-[15px]">
              <Checkbox
                id="billing-same"
                checked={billingAddressSameAsDelivery}
                onCheckedChange={(checked) => setBillingAddressSameAsDelivery(checked as boolean)}
                className="size-5 rounded data-[state=checked]:bg-[#C5AF71] data-[state=checked]:border-[#C5AF71]"
              />
              <label
                htmlFor="billing-same"
                className="text-[16px] text-[#6f6f6f] cursor-pointer"
              >
                Billing address is the same as the delivery address
              </label>
            </div>

            {!billingAddressSameAsDelivery && (
              <div className="relative">
                <Input
                  placeholder="e.g. 1/123 Main Street"
                  className="h-[57px] bg-neutral-100 border-0 rounded-lg px-[19px] pr-12 text-[16px] placeholder:text-[#6f6f6f]"
                />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 size-6 text-[#6f6f6f]" />
              </div>
            )}
          </div>

          {/* Continue Button */}
          <Button
            onClick={onContinue}
            className="w-full h-[49px] bg-black hover:bg-gray-800 text-white text-[16px] font-semibold rounded-[24px]"
          >
            Continue to Payment
          </Button>
        </div>
      </div>
    </div>
  )
}