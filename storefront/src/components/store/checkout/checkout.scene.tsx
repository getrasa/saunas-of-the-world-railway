"use client"

import React, { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Wizard } from "@/components/ui/wizard"
import { CheckoutSteps } from "./checkout-steps"
import { ShoppingBag } from "./steps/shopping-bag"
import { Shipping } from "./steps/shipping"
import { Payment } from "./steps/payment"
import { OrderSummary } from "./steps/order-summary"
import { useCheckoutForm } from "@lib/hooks/useCheckoutForm"
import { CheckoutFormProvider } from "~/contexts/checkout-form-context"

type CheckoutStep = "shopping-bag" | "shipping" | "payment"

export function CheckoutScene() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const stepFromUrl = searchParams.get("step") as CheckoutStep
  const { form, isHydrated, clearSavedData } = useCheckoutForm()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const currentStep = ["shopping-bag", "shipping", "payment"].includes(stepFromUrl)
    ? stepFromUrl
    : "shopping-bag"

  const handleStepChange = (step: string) => {
    router.push(`/order/checkout?step=${step}`)
  }

  // Don't render until form is hydrated from localStorage
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-neutral-100 w-full pb-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading checkout...</p>
        </div>
      </div>
    )
  }

  return (
    <CheckoutFormProvider form={form} isSubmitting={isSubmitting} submitError={submitError}>
      <Wizard initialStep={currentStep} onStepChange={handleStepChange}>
        <div className="min-h-screen bg-neutral-100 w-full pb-16">
          {/* Logo and Progress Steps */}
          <div className="flex items-center max-w-[1512px] mx-auto relative px-12 py-6">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/shop">
                <Image
                  src="/images/topbar/logo.png"
                  alt="Saunas of the World"
                  width={189}
                  height={69}
                  className="object-contain cursor-pointer"
                />
              </Link>
            </div>
            <div className="flex-1 flex justify-center items-center">
              <Wizard.Progress>
                {({ currentStepIndex, steps, goToStep, currentStepId }) => (
                  <CheckoutSteps
                    currentStepIndex={currentStepIndex}
                    currentStepId={currentStepId}
                    steps={steps}
                    onStepClick={goToStep}
                  />
                )}
              </Wizard.Progress>
            </div>
            {/* Spacer to balance logo */}
            <div className="flex-shrink-0 w-[189px]"></div>
          </div>

          <div className="mx-auto max-w-[1512px] px-[52px] pt-4">
            {/* Shopping Bag Step */}
            <Wizard.Step id="shopping-bag">
              <div className="flex justify-center">
                <Wizard.Actions>
                  {({ nextStep }) => (
                    <ShoppingBag onContinue={nextStep} />
                  )}
                </Wizard.Actions>
              </div>
            </Wizard.Step>

            {/* Shipping Step */}
            <Wizard.Step id="shipping">
              <div className="flex gap-4">
                <Wizard.Actions>
                  {({ nextStep, goToStep }) => (
                    <>
                      <Shipping onContinue={nextStep} />
                      <OrderSummary onEdit={() => goToStep("shopping-bag")} showSurcharge={false} />
                    </>
                  )}
                </Wizard.Actions>
              </div>
            </Wizard.Step>

            {/* Payment Step */}
            <Wizard.Step id="payment">
              <div className="flex gap-4">
                <Wizard.Actions>
                  {({ nextStep, goToStep }) => (
                    <>
                      <Payment 
                        onContinue={nextStep}
                        setIsSubmitting={setIsSubmitting}
                        setSubmitError={setSubmitError}
                        clearSavedData={clearSavedData}
                      />
                      <OrderSummary onEdit={() => goToStep("shopping-bag")} showSurcharge={true} />
                    </>
                  )}
                </Wizard.Actions>
              </div>
            </Wizard.Step>
          </div>
        </div>
      </Wizard>
    </CheckoutFormProvider>
  )
}
