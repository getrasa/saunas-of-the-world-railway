'use client'

import React, { useEffect } from 'react'
import { CheckCircle } from 'lucide-react'
import { useCheckoutFormContext } from '~/contexts/checkout-form-context'

interface ThankYouProps {
  orderData?: { orderId: string; paymentMethod: string } | null
}

export function ThankYou({ orderData }: ThankYouProps) {
  const { form } = useCheckoutFormContext()
  const formValues = form.getValues()

  const orderNumber = orderData?.orderId || 'PENDING'
  const paymentMethod = orderData?.paymentMethod || form.watch('paymentMethod')
  const isQuotePayment = paymentMethod === 'pay_for_quote'
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
          {isQuotePayment ? (
            <>
              <h3 className="text-[24px] font-medium">We'll send you a quote shortly</h3>
              <p className="text-[16px] font-medium text-[#6f6f6f]">
                Thank you for your order! We'll send you a detailed quote via email within 24 hours. 
                Please pay via bank transfer using the details provided in the email.
              </p>
            </>
          ) : (
            <>
              <h3 className="text-[24px] font-medium">Your payment is being processed</h3>
              <p className="text-[16px] font-medium text-[#6f6f6f]">
                You'll receive a confirmation email with your order number shortly.
              </p>
            </>
          )}
        </div>

        {/* Order Details */}
        <div className="border-t border-silver px-[61px] py-10 space-y-6">
          <h3 className="text-[24px] font-medium">Order Details</h3>

          <div className="space-y-6">
            {/* Contact */}
            <div>
              <h4 className="text-[18px] font-medium mb-2">Contact</h4>
              <div className="text-[12px] text-[#6f6f6f] space-y-1">
                <p>{formValues.email}</p>
                <p>{formValues.phone}</p>
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h4 className="text-[18px] font-medium mb-2">Shipping Address</h4>
              <div className="text-[12px] text-[#6f6f6f] space-y-1">
                <p>{formValues.shippingAddress.firstName} {formValues.shippingAddress.lastName}</p>
                <p>
                  {formValues.shippingAddress.address1}, {formValues.shippingAddress.city}, {formValues.shippingAddress.province}, {formValues.shippingAddress.postalCode}, {formValues.shippingAddress.countryCode}
                </p>
                {formValues.shippingAddress.phone && <p>Phone: {formValues.shippingAddress.phone}</p>}
              </div>
            </div>

            {/* Billing Address */}
            <div>
              <h4 className="text-[18px] font-medium mb-2">Billing Address</h4>
              <div className="text-[12px] text-[#6f6f6f] space-y-1">
                {formValues.billingAddressSameAsShipping ? (
                  <p>Same as shipping address</p>
                ) : formValues.billingAddress ? (
                  <>
                    <p>{formValues.billingAddress.firstName} {formValues.billingAddress.lastName}</p>
                    <p>
                      {formValues.billingAddress.address1}, {formValues.billingAddress.city}, {formValues.billingAddress.province}, {formValues.billingAddress.postalCode}, {formValues.billingAddress.countryCode}
                    </p>
                  </>
                ) : (
                  <p>Same as shipping address</p>
                )}
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
              <p className="text-[12px] text-[#6f6f6f]">
                {isQuotePayment ? 'Pay for Quote (Bank Transfer)' : 'Credit Card'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}