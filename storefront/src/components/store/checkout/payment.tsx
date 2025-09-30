'use client'

import React, { useState } from 'react'
import { Input } from '@lib/components/ui/input'
import { Button } from '@lib/components/ui/button'
import { useCart } from '~/contexts/cart-context'
import { convertToLocale } from '@lib/util/money'

interface PaymentProps {
  onContinue: () => void
}

export function Payment({ onContinue }: PaymentProps) {
  const { cart } = useCart()
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [cardHolder, setCardHolder] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [securityCode, setSecurityCode] = useState('')

  const total = cart?.total || 0
  const currencyCode = cart?.currency_code || 'AUD'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onContinue()
  }

  return (
    <div className="w-full max-w-[850px]">
      <div className="bg-white rounded-2xl overflow-hidden">
        {/* Section Header */}
        <div className="border-b border-silver px-16 py-[39px]">
          <h2 className="text-[32px] font-semibold">Payment</h2>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="px-[61px] py-10 space-y-6">
          {/* Contact Information */}
          <h3 className="text-[24px] font-medium">Where should we send your receipt?</h3>

          <div className="w-[708px] space-y-6">
            <div className="relative">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-[58px] bg-neutral-100 border-0 rounded-lg px-[19px] text-[16px] placeholder:text-[#6f6f6f]"
              />
            </div>

            <div className="relative">
              <Input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="h-[58px] bg-neutral-100 border-0 rounded-lg px-[19px] text-[16px] placeholder:text-[#6f6f6f]"
              />
            </div>
          </div>

          {/* Payment Details */}
          <h3 className="text-[24px] font-medium">Enter your payment details</h3>

          <div className="w-[708px] space-y-6">
            <div className="relative">
              <Input
                type="text"
                placeholder="Card Number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
                maxLength={19}
                className="h-[58px] bg-neutral-100 border-0 rounded-lg px-[19px] text-[16px] placeholder:text-[#6f6f6f]"
              />
            </div>

            <div className="flex gap-6">
              <div className="w-[220px]">
                <Input
                  type="text"
                  placeholder="Card Holder Name"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  required
                  className="h-[58px] bg-neutral-100 border-0 rounded-lg px-[19px] text-[16px] placeholder:text-[#6f6f6f]"
                />
              </div>

              <div className="w-[220px]">
                <Input
                  type="text"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  required
                  maxLength={5}
                  className="h-[58px] bg-neutral-100 border-0 rounded-lg px-[19px] text-[16px] placeholder:text-[#6f6f6f]"
                />
              </div>

              <div className="w-[220px]">
                <Input
                  type="text"
                  placeholder="Security code"
                  value={securityCode}
                  onChange={(e) => setSecurityCode(e.target.value)}
                  required
                  maxLength={4}
                  className="h-[58px] bg-neutral-100 border-0 rounded-lg px-[19px] text-[16px] placeholder:text-[#6f6f6f]"
                />
              </div>
            </div>
          </div>
        </form>

        {/* Order Total and Continue Button */}
        <div className="border-t border-silver px-[61px] py-[31px] space-y-[33px]">
          <div className="flex items-start justify-between w-[708px]">
            <div>
              <p className="text-[24px] font-medium">Order Total</p>
              <p className="text-[16px] font-medium text-[#6f6f6f] mt-2">Including GST</p>
            </div>
            <p className="text-[24px] font-semibold">
              {convertToLocale({ amount: total, currency_code: currencyCode })}
            </p>
          </div>

          <Button
            type="submit"
            onClick={handleSubmit}
            className="w-[728px] h-[49px] bg-black hover:bg-gray-800 text-white text-[16px] font-semibold rounded-[24px]"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}