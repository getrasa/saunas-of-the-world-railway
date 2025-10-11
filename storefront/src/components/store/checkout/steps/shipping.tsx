'use client'

import React from 'react'
import { Input } from '@lib/components/ui/input'
import { Checkbox } from '@lib/components/ui/checkbox'
import { Button } from '@lib/components/ui/button'
import { useCheckoutFormContext } from '~/contexts/checkout-form-context'
import { AddressAutocomplete } from '../components/address-autocomplete'
import { useCart } from '~/contexts/cart-context'

interface ShippingProps {
  onContinue: () => void
}

export function Shipping({ onContinue }: ShippingProps) {
  const { form, isSubmitting } = useCheckoutFormContext()
  const { register, watch, setValue, formState: { errors }, trigger } = form
  const { cart } = useCart()

  const billingAddressSameAsShipping = watch('billingAddressSameAsShipping')
  const safeToLeave = watch('safeToLeave')
  const shippingAddress1 = watch('shippingAddress.address1')
  const billingAddress1 = watch('billingAddress.address1') || ''
  
  // Get available countries from cart region
  const availableCountries = cart?.region?.countries || []

  const handleContinue = async () => {
    // Validate shipping step fields
    const isValid = await trigger([
      'shippingAddress.firstName',
      'shippingAddress.lastName',
      'shippingAddress.address1',
      'shippingAddress.city',
      'shippingAddress.postalCode',
      'shippingAddress.province',
      'shippingAddress.countryCode',
      'billingAddressSameAsShipping',
      ...(!billingAddressSameAsShipping ? [
        'billingAddress.firstName',
        'billingAddress.lastName',
        'billingAddress.address1',
        'billingAddress.city',
        'billingAddress.postalCode',
        'billingAddress.province',
        'billingAddress.countryCode',
      ] as const : [])
    ])

    if (isValid) {
      onContinue()
    }
  }

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
                  {...register('shippingAddress.firstName')}
                  placeholder="First name"
                  className="h-[59px] bg-neutral-100 border-0 rounded-lg px-[19px] text-[16px] placeholder:text-[#6f6f6f]"
                />
                {errors.shippingAddress?.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.shippingAddress.firstName.message}</p>
                )}
              </div>
              <div className="flex-1">
                <Input
                  {...register('shippingAddress.lastName')}
                  placeholder="Last name"
                  className="h-[59px] bg-neutral-100 border-0 rounded-lg px-[19px] text-[16px] placeholder:text-[#6f6f6f]"
                />
                {errors.shippingAddress?.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.shippingAddress.lastName.message}</p>
                )}
              </div>
            </div>

            {/* Address Autocomplete */}
            <AddressAutocomplete
              value={shippingAddress1}
              onChange={(value) => setValue('shippingAddress.address1', value)}
              onAddressSelect={(address) => {
                setValue('shippingAddress.address1', address.address1)
                setValue('shippingAddress.city', address.city)
                setValue('shippingAddress.province', address.province)
                setValue('shippingAddress.postalCode', address.postalCode)
                setValue('shippingAddress.countryCode', address.countryCode)
              }}
              placeholder="e.g. 1/123 Main Street"
              error={errors.shippingAddress?.address1?.message}
            />

            {/* Additional Address Fields */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Input
                  {...register('shippingAddress.city')}
                  placeholder="City"
                  className="h-[59px] bg-neutral-100 border-0 rounded-lg px-[19px] text-[16px] placeholder:text-[#6f6f6f]"
                />
                {errors.shippingAddress?.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.shippingAddress.city.message}</p>
                )}
              </div>
              <div>
                <Input
                  {...register('shippingAddress.province')}
                  placeholder="State/Province"
                  className="h-[59px] bg-neutral-100 border-0 rounded-lg px-[19px] text-[16px] placeholder:text-[#6f6f6f]"
                />
                {errors.shippingAddress?.province && (
                  <p className="text-red-500 text-sm mt-1">{errors.shippingAddress.province.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Input
                  {...register('shippingAddress.postalCode')}
                  placeholder="Postal Code"
                  className="h-[59px] bg-neutral-100 border-0 rounded-lg px-[19px] text-[16px] placeholder:text-[#6f6f6f]"
                />
                {errors.shippingAddress?.postalCode && (
                  <p className="text-red-500 text-sm mt-1">{errors.shippingAddress.postalCode.message}</p>
                )}
              </div>
              <div>
                <select
                  {...register('shippingAddress.countryCode')}
                  className="h-[59px] bg-neutral-100 border-0 rounded-lg px-[19px] text-[16px] text-[#000] w-full"
                >
                  <option value="">Select Country</option>
                  {availableCountries.map((country) => (
                    <option key={country.iso_2} value={country.iso_2}>
                      {country.display_name}
                    </option>
                  ))}
                </select>
                {errors.shippingAddress?.countryCode && (
                  <p className="text-red-500 text-sm mt-1">{errors.shippingAddress.countryCode.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Safe to leave checkbox */}
          <div className="flex items-center gap-[15px]">
            <Checkbox
              id="safe-to-leave"
              checked={safeToLeave}
              onCheckedChange={(checked) => setValue('safeToLeave', checked as boolean)}
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
                checked={billingAddressSameAsShipping}
                onCheckedChange={(checked) => setValue('billingAddressSameAsShipping', checked as boolean)}
                className="size-5 rounded data-[state=checked]:bg-[#C5AF71] data-[state=checked]:border-[#C5AF71]"
              />
              <label
                htmlFor="billing-same"
                className="text-[16px] text-[#6f6f6f] cursor-pointer"
              >
                Billing address is the same as the delivery address
              </label>
            </div>

            {!billingAddressSameAsShipping && (
              <div className="space-y-6">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Input
                      {...register('billingAddress.firstName')}
                      placeholder="First name"
                      className="h-[59px] bg-neutral-100 border-0 rounded-lg px-[19px] text-[16px] placeholder:text-[#6f6f6f]"
                    />
                    {errors.billingAddress?.firstName && (
                      <p className="text-red-500 text-sm mt-1">{errors.billingAddress.firstName.message}</p>
                    )}
                  </div>
                  <div className="flex-1">
                    <Input
                      {...register('billingAddress.lastName')}
                      placeholder="Last name"
                      className="h-[59px] bg-neutral-100 border-0 rounded-lg px-[19px] text-[16px] placeholder:text-[#6f6f6f]"
                    />
                    {errors.billingAddress?.lastName && (
                      <p className="text-red-500 text-sm mt-1">{errors.billingAddress.lastName.message}</p>
                    )}
                  </div>
                </div>

                <AddressAutocomplete
                  value={billingAddress1}
                  onChange={(value) => setValue('billingAddress.address1', value)}
                  onAddressSelect={(address) => {
                    setValue('billingAddress.address1', address.address1)
                    setValue('billingAddress.city', address.city)
                    setValue('billingAddress.province', address.province)
                    setValue('billingAddress.postalCode', address.postalCode)
                    setValue('billingAddress.countryCode', address.countryCode)
                  }}
                  placeholder="e.g. 1/123 Main Street"
                  error={errors.billingAddress?.address1?.message}
                />

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Input
                      {...register('billingAddress.city')}
                      placeholder="City"
                      className="h-[59px] bg-neutral-100 border-0 rounded-lg px-[19px] text-[16px] placeholder:text-[#6f6f6f]"
                    />
                    {errors.billingAddress?.city && (
                      <p className="text-red-500 text-sm mt-1">{errors.billingAddress.city.message}</p>
                    )}
                  </div>
                  <div>
                    <Input
                      {...register('billingAddress.province')}
                      placeholder="State/Province"
                      className="h-[59px] bg-neutral-100 border-0 rounded-lg px-[19px] text-[16px] placeholder:text-[#6f6f6f]"
                    />
                    {errors.billingAddress?.province && (
                      <p className="text-red-500 text-sm mt-1">{errors.billingAddress.province.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Input
                      {...register('billingAddress.postalCode')}
                      placeholder="Postal Code"
                      className="h-[59px] bg-neutral-100 border-0 rounded-lg px-[19px] text-[16px] placeholder:text-[#6f6f6f]"
                    />
                    {errors.billingAddress?.postalCode && (
                      <p className="text-red-500 text-sm mt-1">{errors.billingAddress.postalCode.message}</p>
                    )}
                  </div>
                  <div>
                    <select
                      {...register('billingAddress.countryCode')}
                      className="h-[59px] bg-neutral-100 border-0 rounded-lg px-[19px] text-[16px] text-[#000] w-full"
                    >
                      <option value="">Select Country</option>
                      {availableCountries.map((country) => (
                        <option key={country.iso_2} value={country.iso_2}>
                          {country.display_name}
                        </option>
                      ))}
                    </select>
                    {errors.billingAddress?.countryCode && (
                      <p className="text-red-500 text-sm mt-1">{errors.billingAddress.countryCode.message}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Continue Button */}
          <Button
            onClick={handleContinue}
            disabled={isSubmitting}
            className="w-full h-[49px] bg-black hover:bg-gray-800 text-white text-[16px] font-semibold rounded-[24px] disabled:opacity-50"
          >
            Continue to Payment
          </Button>
        </div>
      </div>
    </div>
  )
}