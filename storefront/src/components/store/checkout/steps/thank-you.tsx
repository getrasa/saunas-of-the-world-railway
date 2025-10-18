import React from 'react'
import { CheckCircle } from 'lucide-react'
import { HttpTypes } from '@medusajs/types'

interface ThankYouProps {
  order: HttpTypes.StoreOrder
  isBankTransfer?: boolean
}

export function ThankYou({ order, isBankTransfer = false }: ThankYouProps) {
  const shippingAddress = order.shipping_address
  const billingAddress = order.billing_address
  return (
    <div className="w-full max-w-[850px]">
      <div className="bg-white rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="border-b border-silver px-16 py-[39px]">
          <p className="text-[16px] font-medium text-[#6f6f6f] mb-2">
            Order #{order.display_id || order.id}
          </p>
          <div className="flex items-center gap-2.5">
            <h2 className="text-[32px] font-semibold">Thank you!</h2>
            <CheckCircle className="w-[25px] h-[25px] text-green-500" />
          </div>
        </div>

        {/* Payment Info */}
        <div className="px-[61px] py-10 space-y-6">
          {isBankTransfer ? (
            <>
              <h3 className="text-[24px] font-medium">We'll send you payment details shortly</h3>
              <p className="text-[16px] font-medium text-[#6f6f6f]">
                Thank you for your order! We'll send you bank transfer details via email within 24 hours. 
                Once payment is confirmed, we'll process your order.
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
                <p>{order.email}</p>
                {shippingAddress?.phone && <p>{shippingAddress.phone}</p>}
              </div>
            </div>

            {/* Shipping Address */}
            {shippingAddress && (
              <div>
                <h4 className="text-[18px] font-medium mb-2">Shipping Address</h4>
                <div className="text-[12px] text-[#6f6f6f] space-y-1">
                  <p>{shippingAddress.first_name} {shippingAddress.last_name}</p>
                  <p>
                    {shippingAddress.address_1}
                    {shippingAddress.address_2 && `, ${shippingAddress.address_2}`}
                    {`, ${shippingAddress.city}, ${shippingAddress.province}, ${shippingAddress.postal_code}, ${shippingAddress.country_code?.toUpperCase()}`}
                  </p>
                  {shippingAddress.phone && <p>Phone: {shippingAddress.phone}</p>}
                </div>
              </div>
            )}

            {/* Billing Address */}
            {billingAddress && (
              <div>
                <h4 className="text-[18px] font-medium mb-2">Billing Address</h4>
                <div className="text-[12px] text-[#6f6f6f] space-y-1">
                  <p>{billingAddress.first_name} {billingAddress.last_name}</p>
                  <p>
                    {billingAddress.address_1}
                    {billingAddress.address_2 && `, ${billingAddress.address_2}`}
                    {`, ${billingAddress.city}, ${billingAddress.province}, ${billingAddress.postal_code}, ${billingAddress.country_code?.toUpperCase()}`}
                  </p>
                </div>
              </div>
            )}

            {/* Shipping Method */}
            <div>
              <h4 className="text-[18px] font-medium mb-2">Shipping Method</h4>
              <p className="text-[12px] text-[#6f6f6f]">
                {order.shipping_methods?.[0]?.name || 'Standard Courier'}
              </p>
            </div>

            {/* Payment Method */}
            <div>
              <h4 className="text-[18px] font-medium mb-2">Payment Method</h4>
              <p className="text-[12px] text-[#6f6f6f]">
                {isBankTransfer ? 'Bank Transfer' : 'Credit Card'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}