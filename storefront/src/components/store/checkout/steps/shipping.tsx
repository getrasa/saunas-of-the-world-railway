'use client'

import React, { useEffect, useState } from 'react'
import { Input } from '@lib/components/ui/input'
import { Checkbox } from '@lib/components/ui/checkbox'
import { Button } from '@lib/components/ui/button'
import { Card, CardContent } from '@lib/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@lib/components/ui/radio-group'
import { Label } from '@lib/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@lib/components/ui/select'
import { useCheckoutFormContext } from '~/contexts/checkout-form-context'
import { AddressAutocomplete } from '../components/address-autocomplete'
import { CheckoutSectionHeader } from '../components/checkout-section-header'
import { useCart } from '~/contexts/cart-context'
import { listCartShippingMethods } from '@lib/data/fulfillment'
import { convertToLocale } from '@lib/util/money'
import { HttpTypes } from '@medusajs/types'

interface ShippingProps {
  onContinue: () => void
}

export function Shipping({ onContinue }: ShippingProps) {
  const { form, isSubmitting } = useCheckoutFormContext()
  const { register, watch, setValue, formState: { errors }, trigger } = form
  const { cart } = useCart()
  const [shippingOptions, setShippingOptions] = useState<HttpTypes.StoreCartShippingOption[]>([])
  const [loadingOptions, setLoadingOptions] = useState(false)

  const billingAddressSameAsShipping = watch('billingAddressSameAsShipping')
  const safeToLeave = watch('safeToLeave')
  const shippingAddress1 = watch('shippingAddress.address1')
  const billingAddress1 = watch('billingAddress.address1') || ''
  const selectedShippingMethodId = watch('shippingMethodId')
  
  // Get available countries from cart region
  const availableCountries = cart?.region?.countries || []

  // Fetch shipping options when cart is available
  useEffect(() => {
    async function loadShippingOptions() {
      if (!cart?.id) return
      
      setLoadingOptions(true)
      try {
        const options = await listCartShippingMethods(cart.id)
        if (options && options.length > 0) {
          setShippingOptions(options)
          // Auto-select first option if none selected
          if (!selectedShippingMethodId) {
            setValue('shippingMethodId', options[0].id)
          }
        }
      } catch (error) {
        console.error('Failed to load shipping options:', error)
      } finally {
        setLoadingOptions(false)
      }
    }

    loadShippingOptions()
  }, [cart?.id, selectedShippingMethodId, setValue])

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
      'shippingMethodId',
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
    <Card className="w-full max-w-[850px]">
      {/* Section Header */}
      <CheckoutSectionHeader title="Delivery" />

      {/* Form Content */}
      <CardContent className="px-[61px] py-8 space-y-8">
          <h3 className="text-[24px] font-medium">Where are we sending your order?</h3>

          {/* Name Fields */}
          <div className="space-y-6 w-[708px]">
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  {...register('shippingAddress.firstName')}
                  placeholder="First name"
                  className="h-12 bg-neutral-100 border-0 rounded-lg px-4 text-base placeholder:text-[#6f6f6f]"
                />
                {errors.shippingAddress?.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.shippingAddress.firstName.message}</p>
                )}
              </div>
              <div className="flex-1">
                <Input
                  {...register('shippingAddress.lastName')}
                  placeholder="Last name"
                  className="h-12 bg-neutral-100 border-0 rounded-lg px-4 text-base placeholder:text-[#6f6f6f]"
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
                  className="h-12 bg-neutral-100 border-0 rounded-lg px-4 text-base placeholder:text-[#6f6f6f]"
                />
                {errors.shippingAddress?.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.shippingAddress.city.message}</p>
                )}
              </div>
              <div>
                <Input
                  {...register('shippingAddress.province')}
                  placeholder="State/Province"
                  className="h-12 bg-neutral-100 border-0 rounded-lg px-4 text-base placeholder:text-[#6f6f6f]"
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
                  className="h-12 bg-neutral-100 border-0 rounded-lg px-4 text-base placeholder:text-[#6f6f6f]"
                />
                {errors.shippingAddress?.postalCode && (
                  <p className="text-red-500 text-sm mt-1">{errors.shippingAddress.postalCode.message}</p>
                )}
              </div>
              <div>
                <Select
                  value={watch('shippingAddress.countryCode') || ''}
                  onValueChange={(value) => setValue('shippingAddress.countryCode', value)}
                >
                  <SelectTrigger className="h-12 bg-neutral-100 border-0 rounded-lg px-4 text-base">
                    <SelectValue placeholder="Select Country" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCountries.map((country) => (
                      <SelectItem key={country.iso_2} value={country.iso_2 || ''}>
                        {country.display_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                      className="h-12 bg-neutral-100 border-0 rounded-lg px-4 text-base placeholder:text-[#6f6f6f]"
                    />
                    {errors.billingAddress?.firstName && (
                      <p className="text-red-500 text-sm mt-1">{errors.billingAddress.firstName.message}</p>
                    )}
                  </div>
                  <div className="flex-1">
                    <Input
                      {...register('billingAddress.lastName')}
                      placeholder="Last name"
                      className="h-12 bg-neutral-100 border-0 rounded-lg px-4 text-base placeholder:text-[#6f6f6f]"
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
                      className="h-12 bg-neutral-100 border-0 rounded-lg px-4 text-base placeholder:text-[#6f6f6f]"
                    />
                    {errors.billingAddress?.city && (
                      <p className="text-red-500 text-sm mt-1">{errors.billingAddress.city.message}</p>
                    )}
                  </div>
                  <div>
                    <Input
                      {...register('billingAddress.province')}
                      placeholder="State/Province"
                      className="h-12 bg-neutral-100 border-0 rounded-lg px-4 text-base placeholder:text-[#6f6f6f]"
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
                      className="h-12 bg-neutral-100 border-0 rounded-lg px-4 text-base placeholder:text-[#6f6f6f]"
                    />
                    {errors.billingAddress?.postalCode && (
                      <p className="text-red-500 text-sm mt-1">{errors.billingAddress.postalCode.message}</p>
                    )}
                  </div>
                  <div>
                    <Select
                      value={watch('billingAddress.countryCode') || ''}
                      onValueChange={(value) => setValue('billingAddress.countryCode', value)}
                    >
                      <SelectTrigger className="h-12 bg-neutral-100 border-0 rounded-lg px-4 text-base">
                        <SelectValue placeholder="Select Country" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableCountries.map((country) => (
                          <SelectItem key={country.iso_2} value={country.iso_2 || ''}>
                            {country.display_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.billingAddress?.countryCode && (
                      <p className="text-red-500 text-sm mt-1">{errors.billingAddress.countryCode.message}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Shipping Options Section */}
          <div className="space-y-4 w-[708px]">
            <h4 className="text-base font-medium">Shipping Method</h4>
            
            {loadingOptions ? (
              <div className="text-base text-[#6f6f6f]">Loading shipping options...</div>
            ) : shippingOptions.length === 0 ? (
              <div className="text-base text-[#6f6f6f]">No shipping options available</div>
            ) : (
              <RadioGroup 
                value={selectedShippingMethodId} 
                onValueChange={(value) => setValue('shippingMethodId', value)}
                className="space-y-3"
              >
                {shippingOptions.map((option) => (
                  <Label
                    key={option.id}
                    htmlFor={option.id}
                    className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      selectedShippingMethodId === option.id
                        ? 'border-[#C5AF71] bg-[#C5AF71]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <RadioGroupItem value={option.id} id={option.id} />
                      <div>
                        <p className="text-base font-medium">{option.name}</p>
                      </div>
                    </div>
                    <div className="text-base font-semibold">
                      {convertToLocale({ 
                        amount: option.amount || 0, 
                        currency_code: cart?.currency_code || 'USD' 
                      })}
                    </div>
                  </Label>
                ))}
              </RadioGroup>
            )}
            {errors.shippingMethodId && (
              <p className="text-red-500 text-sm">{errors.shippingMethodId.message}</p>
            )}
          </div>

          {/* Continue Button */}
          <Button
            onClick={handleContinue}
            disabled={isSubmitting || loadingOptions}
            className="w-full h-[49px] bg-black hover:bg-gray-800 text-white text-base font-semibold rounded-[24px] disabled:opacity-50"
          >
            Continue to Payment
          </Button>
      </CardContent>
    </Card>
  )
}