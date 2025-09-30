"use client"

import React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Wizard } from "@/components/ui/wizard"
import { CheckoutSteps } from "./checkout-steps"
import { ShoppingBag } from "./steps/shopping-bag"
import { Shipping } from "./steps/shipping"
import { Payment } from "./steps/payment"
import { ThankYou } from "./steps/thank-you"
import { OrderSummary } from "./steps/order-summary"

type CheckoutStep = "shopping-bag" | "shipping" | "payment" | "thank-you"

export function CheckoutScene() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const stepFromUrl = searchParams.get("step") as CheckoutStep

  const currentStep = ["shopping-bag", "shipping", "payment", "thank-you"].includes(stepFromUrl)
    ? stepFromUrl
    : "shopping-bag"

  const handleStepChange = (step: string) => {
    router.push(`/shop/checkout?step=${step}`)
  }

  return (
    <Wizard initialStep={currentStep} onStepChange={handleStepChange}>
      <div className="min-h-screen bg-neutral-100 w-full pb-16">
        {/* Logo and Progress Steps */}
        <div className="flex max-w-[1512px] mx-auto relative">
          {/* Logo */}
          <div className="absolute left-12 top-4">
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
          <div className="pt-2 w-full flex justify-center items-center">
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
        </div>

        <div className="mx-auto max-w-[1512px] px-[52px] pt-8">
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
                    <OrderSummary onEdit={() => goToStep("shopping-bag")} />
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
                    <Payment onContinue={nextStep} />
                    <OrderSummary onEdit={() => goToStep("shopping-bag")} />
                  </>
                )}
              </Wizard.Actions>
            </div>
          </Wizard.Step>

          {/* Thank You Step */}
          <Wizard.Step id="thank-you">
            <div className="flex gap-4">
              <ThankYou />
              <OrderSummary showEditButton={false} />
            </div>
          </Wizard.Step>
        </div>
      </div>
    </Wizard>
  )
}
