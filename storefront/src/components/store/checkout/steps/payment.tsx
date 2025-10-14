'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { Input } from '@lib/components/ui/input'
import { Button } from '@lib/components/ui/button'
import { Card, CardContent, CardFooter } from '@lib/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@lib/components/ui/radio-group'
import { Label } from '@lib/components/ui/label'
import { Separator } from '@lib/components/ui/separator'
import { CheckoutSectionHeader } from '../components/checkout-section-header'
import { useCart } from '~/contexts/cart-context'
import { convertToLocale } from '@lib/util/money'
import { useCheckoutFormContext } from '~/contexts/checkout-form-context'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { updateCart, initiatePaymentSession, placeOrder, setShippingMethod } from '@lib/data/cart'

interface PaymentProps {
  onContinue: () => void
  setIsSubmitting: (isSubmitting: boolean) => void
  setSubmitError: (error: string | null) => void
  clearSavedData: () => void
}

// Initialize Stripe
const stripeKey = process.env.NEXT_PUBLIC_STRIPE_KEY
const stripePromise = stripeKey ? loadStripe(stripeKey) : null

// Card element styling
const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#000',
      fontFamily: 'system-ui, sans-serif',
      '::placeholder': {
        color: '#6f6f6f',
      },
    },
    invalid: {
      color: '#ef4444',
    },
  },
}

function PaymentForm({ 
  onContinue, 
  setIsSubmitting, 
  setSubmitError,
  clearSavedData
}: PaymentProps) {
  const { form, isSubmitting, submitError } = useCheckoutFormContext()
  const { register, watch, setValue, formState: { errors }, trigger, getValues } = form
  const { cart, refreshCart } = useCart()
  const stripe = useStripe()
  const elements = useElements()
  
  const [cardComplete, setCardComplete] = useState(false)
  const [cardError, setCardError] = useState<string | null>(null)

  const paymentMethod = watch('paymentMethod')
  const email = watch('email')
  const phone = watch('phone')

  // Clear errors when payment method changes
  useEffect(() => {
    setSubmitError(null)
    setCardError(null)
  }, [paymentMethod, setSubmitError])

  const total = cart?.total || 0
  const currencyCode = cart?.currency_code || 'USD'

  const handleSubmit = async () => {
    // Clear any previous errors
    setSubmitError(null)
    setCardError(null)
    
    // Validate payment step fields
    const isValid = await trigger(['email', 'phone', 'paymentMethod'])
    
    if (!isValid) {
      setSubmitError('Please fill in all required fields')
      return
    }

    // Validate card for credit card payments
    if (paymentMethod === 'credit_card' && (!cardComplete || !stripe || !elements)) {
      setCardError('Please enter valid card details')
      setSubmitError('Please enter valid card details')
      return
    }

    setIsSubmitting(true)

    try {
      // Get form values
      const formData = getValues()

      // Prepare addresses for cart update
      const shippingAddress = {
        first_name: formData.shippingAddress.firstName,
        last_name: formData.shippingAddress.lastName,
        address_1: formData.shippingAddress.address1,
        city: formData.shippingAddress.city,
        postal_code: formData.shippingAddress.postalCode,
        country_code: formData.shippingAddress.countryCode,
        province: formData.shippingAddress.province,
        phone: formData.shippingAddress.phone,
      }

      const billingAddress = formData.billingAddressSameAsShipping
        ? shippingAddress
        : formData.billingAddress
        ? {
            first_name: formData.billingAddress.firstName,
            last_name: formData.billingAddress.lastName,
            address_1: formData.billingAddress.address1,
            city: formData.billingAddress.city,
            postal_code: formData.billingAddress.postalCode,
            country_code: formData.billingAddress.countryCode,
            province: formData.billingAddress.province,
            phone: formData.billingAddress.phone,
          }
        : shippingAddress

      // Update cart with addresses and email
      await updateCart({
        shipping_address: shippingAddress,
        billing_address: billingAddress,
        email: formData.email,
      })

      await refreshCart()

      // Add shipping method to cart before payment
      if (!cart) {
        throw new Error('Cart not found')
      }

      // Get the selected shipping method from form
      const selectedShippingMethodId = formData.shippingMethodId
      
      if (!selectedShippingMethodId) {
        throw new Error('Please select a shipping method')
      }
      
      // Add shipping method to cart
      await setShippingMethod({
        cartId: cart.id,
        shippingMethodId: selectedShippingMethodId,
      })

      // Refresh cart after adding shipping method
      await refreshCart()

      if (paymentMethod === 'credit_card') {
        // Handle Stripe payment
        if (!cart || !stripe || !elements) {
          throw new Error('Payment system not ready')
        }

        // Initiate Stripe payment session
        const paymentCollectionResponse = await initiatePaymentSession(cart, {
          provider_id: 'pp_stripe_stripe',
        })

        // Get the payment session from the response
        const paymentSession = paymentCollectionResponse?.payment_collection?.payment_sessions?.find(
          (s: any) => s.status === 'pending'
        )

        if (!paymentSession?.data?.client_secret) {
          throw new Error('Failed to initialize Stripe payment session')
        }

        // Confirm payment with Stripe
        const cardElement = elements.getElement(CardElement)
        if (!cardElement) {
          throw new Error('Card element not found')
        }

        const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
          paymentSession.data.client_secret as string,
          {
            payment_method: {
              card: cardElement,
              billing_details: {
                name: `${formData.shippingAddress.firstName} ${formData.shippingAddress.lastName}`,
                email: formData.email,
                phone: formData.phone,
                address: {
                  city: formData.billingAddressSameAsShipping 
                    ? formData.shippingAddress.city 
                    : formData.billingAddress?.city,
                  country: formData.billingAddressSameAsShipping
                    ? formData.shippingAddress.countryCode
                    : formData.billingAddress?.countryCode,
                  line1: formData.billingAddressSameAsShipping
                    ? formData.shippingAddress.address1
                    : formData.billingAddress?.address1,
                  postal_code: formData.billingAddressSameAsShipping
                    ? formData.shippingAddress.postalCode
                    : formData.billingAddress?.postalCode,
                  state: formData.billingAddressSameAsShipping
                    ? formData.shippingAddress.province
                    : formData.billingAddress?.province,
                },
              },
            },
          }
        )

        // Check if payment succeeded despite error object
        // This can happen when payment requires_capture or succeeded but returned an error
        const paymentSucceeded = 
          (paymentIntent && (paymentIntent.status === 'requires_capture' || paymentIntent.status === 'succeeded')) ||
          (stripeError?.payment_intent && 
            (stripeError.payment_intent.status === 'requires_capture' || stripeError.payment_intent.status === 'succeeded'))

        if (stripeError && !paymentSucceeded) {
          // Payment truly failed - throw with clear error message
          const errorMessage = stripeError.message || 'Payment failed. Please check your card details and try again.'
          throw new Error(errorMessage)
        }

        // Payment succeeded, complete the order
        clearSavedData()
        await placeOrder() // This will redirect to /order/confirmed/[orderId]
      } else {
        // Handle pay for quote (manual payment)
        if (!cart) {
          throw new Error('Cart not found')
        }

        // Initiate manual payment session
        await initiatePaymentSession(cart, {
          provider_id: 'pp_manual_manual',
        })

        // Complete the order with manual payment (pending)
        clearSavedData()
        await placeOrder() // This will redirect to /order/confirmed/[orderId]
      }
    } catch (error: any) {
      console.error('Payment error:', error)
      setSubmitError(error.message || 'An error occurred during checkout')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-[850px]">
      {/* Section Header */}
      <CheckoutSectionHeader title="Payment" />

      {/* Form Content */}
      <CardContent className="px-[61px] py-8 space-y-6">
        {/* Contact Information */}
        <h3 className="text-xl font-medium">Where should we send your receipt?</h3>

        <div className="w-[708px] space-y-6">
          <div>
            <Input
              {...register('email')}
              type="email"
              placeholder="Email"
              className="h-12 bg-neutral-100 border-0 rounded-lg px-4 text-base placeholder:text-[#6f6f6f]"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Input
              {...register('phone')}
              type="tel"
              placeholder="Phone Number"
              className="h-12 bg-neutral-100 border-0 rounded-lg px-4 text-base placeholder:text-[#6f6f6f]"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="pt-4">
          <h3 className="text-xl font-medium mb-4">Select Payment Method</h3>

          <RadioGroup 
            value={paymentMethod} 
            onValueChange={(value) => setValue('paymentMethod', value as 'credit_card' | 'pay_for_quote')}
            className="w-[708px] space-y-3"
          >
            {/* Credit Card Option */}
            <Label 
              htmlFor="credit_card"
              className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:border-[#C5AF71] transition-colors"
              style={{ borderColor: paymentMethod === 'credit_card' ? '#C5AF71' : '#e5e7eb' }}
            >
              <RadioGroupItem value="credit_card" id="credit_card" />
              <div>
                <p className="text-base font-medium">Credit Card</p>
                <p className="text-sm text-[#6f6f6f]">Pay securely with your credit or debit card</p>
              </div>
            </Label>

            {/* Request Quote Option */}
            <Label 
              htmlFor="pay_for_quote"
              className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:border-[#C5AF71] transition-colors"
              style={{ borderColor: paymentMethod === 'pay_for_quote' ? '#C5AF71' : '#e5e7eb' }}
            >
              <RadioGroupItem value="pay_for_quote" id="pay_for_quote" />
              <div>
                <p className="text-base font-medium">Request Quote</p>
                <p className="text-sm text-[#6f6f6f]">Get a quote and pay via bank transfer</p>
              </div>
            </Label>
          </RadioGroup>
        </div>

        {/* Card Details (only shown for credit card) */}
        {paymentMethod === 'credit_card' && (
          <div className="w-[708px] space-y-4 pt-4">
            <h3 className="text-xl font-medium">Enter your payment details</h3>
            
            <div className="h-12 bg-neutral-100 rounded-lg px-4 flex items-center">
              <CardElement
                options={cardElementOptions}
                onChange={(e) => {
                  setCardComplete(e.complete)
                  setCardError(e.error?.message || null)
                }}
                className="w-full"
              />
            </div>
            {cardError && (
              <p className="text-red-500 text-sm">{cardError}</p>
            )}
          </div>
        )}
      </CardContent>

      <Separator />

      {/* Order Total and Continue Button */}
      <CardFooter className="px-[61px] py-6 flex flex-col gap-6">
        <div className="flex items-start justify-between w-[708px]">
          <div>
            <p className="text-xl font-medium">Order Total</p>
            <p className="text-base font-medium text-[#6f6f6f] mt-2">Including GST and shipping</p>
          </div>
          <p className="text-xl font-semibold">
            {convertToLocale({ amount: total, currency_code: currencyCode })}
          </p>
        </div>

        {/* Error Message Display */}
        {submitError && (
          <div className="w-[728px] bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700 font-medium">
                  {submitError}
                </p>
              </div>
            </div>
          </div>
        )}

        <Button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting || (paymentMethod === 'credit_card' && !cardComplete)}
          className="w-[728px] h-[49px] bg-black hover:bg-gray-800 text-white text-base font-semibold rounded-[24px] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting 
            ? 'Processing...' 
            : paymentMethod === 'credit_card' 
              ? 'Complete Order' 
              : 'Submit Quote Request'
          }
        </Button>
      </CardFooter>
    </Card>
  )
}

// Wrapper component that provides Stripe Elements
export function Payment(props: PaymentProps) {
  // Always wrap in Stripe Elements if Stripe is available
  // The hooks (useStripe, useElements) must be called within Elements provider
  // even if we're not using them yet
  if (stripePromise) {
    return (
      <Elements stripe={stripePromise}>
        <PaymentForm {...props} />
      </Elements>
    )
  }

  // Fallback if Stripe is not configured (shouldn't happen in production)
  return <PaymentForm {...props} />
}
