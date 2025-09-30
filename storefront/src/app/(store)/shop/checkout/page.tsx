"use client"

import React, { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { CheckoutSteps } from "~/components/store/checkout/checkout-steps"
import { ShoppingBag } from "~/components/store/checkout/shopping-bag"
import { Shipping } from "~/components/store/checkout/shipping"
import { Payment } from "~/components/store/checkout/payment"
import { ThankYou } from "~/components/store/checkout/thank-you"
import { OrderSummary } from "~/components/store/checkout/order-summary"

type CheckoutStep = "shopping-bag" | "shipping" | "payment" | "thank-you"

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("shopping-bag")

  useEffect(() => {
    const step = searchParams.get("step") as CheckoutStep
    if (
      step &&
      ["shopping-bag", "shipping", "payment", "thank-you"].includes(step)
    ) {
      setCurrentStep(step)
    } else {
      setCurrentStep("shopping-bag")
    }
  }, [searchParams])

  const handleStepChange = (step: CheckoutStep) => {
    router.push(`/shop/checkout?step=${step}`)
  }

  const handleContinueFromShoppingBag = () => {
    handleStepChange("shipping")
  }

  const handleContinueFromShipping = () => {
    handleStepChange("payment")
  }

  const handleContinueFromPayment = () => {
    handleStepChange("thank-you")
  }

  const handleEditOrder = () => {
    handleStepChange("shopping-bag")
  }

  return (
    <div className="min-h-screen bg-neutral-100 w-full pb-16">
      {/* Logo and Progress Steps */}
      <div
        className="flex  max-w-[1512px] mx-auto  relative"
      >
        {/* Logo */}
        <div className="absolute left-12 top-4">
          <Image
            src="/images/topbar/logo.png"
            alt="Saunas of the World"
            width={189}
            height={69}
            className="object-contain"
          />
        </div>
        <div
          className="pt-2 w-full flex justify-center items-center"
        >
          <CheckoutSteps
            currentStep={currentStep as "shopping-bag" | "shipping" | "payment"}
          />
        </div>

        {/* Progress Steps - Hide on thank you page */}
      </div>

      <div className="mx-auto max-w-[1512px] px-[52px] pt-8">
        {/* Shopping Bag Step */}
        {currentStep === "shopping-bag" && (
          <div className="flex justify-center">
            <ShoppingBag onContinue={handleContinueFromShoppingBag} />
          </div>
        )}

        {/* Shipping Step */}
        {currentStep === "shipping" && (
          <div className="flex gap-4">
            <Shipping onContinue={handleContinueFromShipping} />
            <OrderSummary onEdit={handleEditOrder} />
          </div>
        )}

        {/* Payment Step */}
        {currentStep === "payment" && (
          <div className="flex gap-4">
            <Payment onContinue={handleContinueFromPayment} />
            <OrderSummary onEdit={handleEditOrder} />
          </div>
        )}

        {/* Thank You Step */}
        {currentStep === "thank-you" && (
          <div className="flex gap-4">
            <ThankYou />
            <OrderSummary showEditButton={false} />
          </div>
        )}
      </div>
    </div>
  )
}
