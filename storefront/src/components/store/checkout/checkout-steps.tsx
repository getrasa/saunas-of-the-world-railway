'use client'

import React from 'react'
import { cn } from '@lib/lib/utils'

interface CheckoutStepsProps {
  currentStep: 'shopping-bag' | 'shipping' | 'payment'
}

export function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  const steps = [
    { id: 'shopping-bag', label: 'Shopping Bag', number: '1' },
    { id: 'shipping', label: 'Shipping', number: '2' },
    { id: 'payment', label: 'Payment', number: '3' }
  ]

  const currentStepIndex = steps.findIndex(step => step.id === currentStep)

  return (
    <div className="flex items-center justify-center gap-2 py-8">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className="flex items-center gap-2">
            <div className="relative size-[26px]">
              <div className={cn(
                "absolute inset-0 rounded-full",
                index <= currentStepIndex
                  ? "bg-[#C5AF71]"
                  : "border-2 border-gray-300"
              )}></div>
              <span className={cn(
                "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-medium",
                index === 2 ? "text-[16px]" : "text-[18px]",
                index <= currentStepIndex ? "text-white" : "text-gray-500"
              )}>
                {step.number}
              </span>
            </div>
            <span className={cn(
              "font-medium",
              index === 2 ? "text-[16px]" : "text-[18px]",
              index <= currentStepIndex ? "text-black" : "text-gray-500"
            )}>
              {step.label}
            </span>
          </div>

          {index < steps.length - 1 && (
            <div className={cn(
              "h-[1px] w-[158px]",
              index < currentStepIndex ? "bg-[#C5AF71]" : "bg-gray-300"
            )}></div>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}